import { defineEventHandler, createError, readBody, getRequestIP } from "h3";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { useRuntimeConfig } from "#imports";

type SendMailPayload = {
  name?: string;
  url?: string;
  desc?: string;
  email?: string;
  avatar?: string;
  message?: string;
  /** 蜜罐字段：对真人隐藏，机器人填充即视为垃圾提交 */
  website?: string;
};

const ensureValue = (value?: string, fallback = "未填写") =>
  value?.trim() ? value.trim() : fallback;

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isHttpUrl = (raw?: string): raw is string => {
  if (!raw) return false;
  try {
    const { protocol } = new URL(raw);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
};

/**
 * 简易内存速率限制：Nitro 2.13.4（当前最新版）不支持 routeRules.rate，
 * 故在处理器内实现 IP 维度 + 全局限流。单实例语义，重启后计数清零。
 */
const RATE_WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_IP = 5;
const MAX_GLOBAL = 20;
const hitsByIp = new Map<string, number[]>();
const globalHits: number[] = [];

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  for (const [key, times] of hitsByIp) {
    const kept = times.filter((t) => now - t < RATE_WINDOW_MS);
    if (kept.length === 0) hitsByIp.delete(key);
    else hitsByIp.set(key, kept);
  }
  while (globalHits.length > 0 && now - (globalHits[0] as number) >= RATE_WINDOW_MS) {
    globalHits.shift();
  }
  if (globalHits.length >= MAX_GLOBAL) return true;
  const ipHits = hitsByIp.get(ip) ?? [];
  if (ipHits.length >= MAX_PER_IP) return true;
  ipHits.push(now);
  hitsByIp.set(ip, ipHits);
  globalHits.push(now);
  return false;
};

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
  }

  const payload = (await readBody<SendMailPayload>(event)) || {};
  const { name, url, desc, email, avatar, message, website } = payload;

  // 蜜罐命中：返回与成功一致的响应体，不给机器人可辨识的信号
  if (ensureValue(website, "") !== "未填写") {
    return { message: "Mail sent" };
  }

  if (!name?.trim() || !url?.trim() || !email?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields: name, url, and email",
    });
  }

  if (!isHttpUrl(url)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid site URL" });
  }

  if (isRateLimited(getRequestIP(event, { xForwardedFor: true }) ?? "unknown")) {
    throw createError({
      statusCode: 429,
      statusMessage: "Too many requests, please try again later",
    });
  }

  const config = useRuntimeConfig();
  const {
    smtpHost,
    smtpPort: configSmtpPort,
    smtpUser,
    smtpPass,
    senderEmail,
    adminEmail,
    smtpSecure,
  } = config;

  const smtpPort = Number(configSmtpPort ?? 465);
  if (!smtpHost || !smtpUser || !smtpPass || !senderEmail || !adminEmail) {
    throw createError({ statusCode: 500, statusMessage: "SMTP server is not fully configured" });
  }

  const secure =
    smtpSecure !== undefined && smtpSecure !== "" ? smtpSecure === "true" : smtpPort === 465;
  const smtpOptions: SMTPTransport.Options = {
    host: smtpHost,
    port: smtpPort,
    secure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  };

  // 用 JSON.stringify 生成配置片段，引号/转义由序列化器负责，再整体 HTML 转义
  const friendEntry = escapeHtml(
    `{
    name: ${JSON.stringify(ensureValue(name))},
    url: ${JSON.stringify(ensureValue(url))},
    desc: ${JSON.stringify(ensureValue(desc))},
    avatar: ${JSON.stringify(ensureValue(avatar))},
},`
  );

  const safeUrl = isHttpUrl(url) ? url : "";
  const safeAvatar = isHttpUrl(avatar) ? avatar : "";
  const siteCell = safeUrl
    ? `<a href="${escapeHtml(safeUrl)}">${escapeHtml(safeUrl)}</a>`
    : escapeHtml(ensureValue(url));
  const avatarCell = safeAvatar
    ? `<a href="${escapeHtml(safeAvatar)}">${escapeHtml(safeAvatar)}</a>`
    : escapeHtml(ensureValue(avatar));

  const htmlMessage = `
        <p>一个新的友链申请已提交，以下是可直接复制到项目中的配置：</p>
        <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; overflow: auto;">
<code>${friendEntry}</code>
        </pre>
        <hr style="margin: 20px 0;" />
        <p><strong>申请者信息：</strong></p>
        <p><strong>名称：</strong>${escapeHtml(ensureValue(name))}</p>
        <p><strong>邮箱：</strong>${escapeHtml(ensureValue(email))}</p>
        <p><strong>站点：</strong>${siteCell}</p>
        <p><strong>描述：</strong>${escapeHtml(ensureValue(desc))}</p>
        <p><strong>头像：</strong>${avatarCell}</p>
        <p><strong>想说的话：</strong>${escapeHtml(ensureValue(message))}</p>
        <p><strong>时间：</strong>${new Date().toISOString()}</p>
    `;

  const transporter = nodemailer.createTransport(smtpOptions);

  try {
    const info = await transporter.sendMail({
      from: senderEmail,
      to: adminEmail,
      replyTo: email,
      subject: `友链申请 / 联系表单 · ${ensureValue(name).slice(0, 80)}`,
      html: htmlMessage,
    });
    return { message: "Mail sent", id: info.messageId };
  } catch (error) {
    // 完整错误只进服务端日志，响应统一脱敏
    console.error("send-mail SMTP failure:", error);
    throw createError({ statusCode: 500, statusMessage: "Failed to send mail" });
  }
});
