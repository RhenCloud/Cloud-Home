import { defineEventHandler, createError, readBody } from "h3";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { useRuntimeConfig } from "#imports";

type MailConfig = {
    smtpHost?: string;
    smtpPort?: number | string;
    smtpUser?: string;
    smtpPass?: string;
    senderEmail?: string;
    adminEmail?: string;
    smtpSecure?: boolean;
};

type SendMailPayload = {
    name?: string;
    url?: string;
    desc?: string;
    email?: string;
    avatar?: string;
    message?: string;
};

const ensureValue = (value?: string, fallback = "未填写") => (value?.trim() ? value.trim() : fallback);

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;
    if (method === "OPTIONS") {
        event.node.res.statusCode = 200;
        return { status: "ok" };
    }

    if (method !== "POST") {
        throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
    }

    const payload = (await readBody<SendMailPayload>(event)) || {};
    const { name, url, desc, email, avatar, message } = payload;

    if (!name?.trim() || !url?.trim() || !email?.trim()) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing required fields: name, url, and email",
        });
    }

    const config = useRuntimeConfig() as MailConfig;
    const { smtpHost, smtpPort: configSmtpPort, smtpUser, smtpPass, senderEmail, adminEmail, smtpSecure } = config;

    const smtpPort = Number(configSmtpPort ?? 465);
    if (!smtpHost || !smtpUser || !smtpPass || !senderEmail || !adminEmail) {
        throw createError({ statusCode: 500, statusMessage: "SMTP server is not fully configured" });
    }

    const secure = typeof smtpSecure === "boolean" ? smtpSecure : smtpPort === 465;
    const smtpOptions: SMTPTransport.Options = {
        host: smtpHost,
        port: smtpPort,
        secure,
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
    };

    const transporter = nodemailer.createTransport(smtpOptions);
    const friendEntry = `{
    name: "${ensureValue(name).replace(/"/g, '\\"')}",
    url: "${ensureValue(url).replace(/"/g, '\\"')}",
    desc: "${ensureValue(desc).replace(/"/g, '\\"')}",
    avatar: "${ensureValue(avatar).replace(/"/g, '\\"')}",
},`;

    const htmlMessage = `
        <p>一个新的友链申请已提交，以下是可直接复制到项目中的配置：</p>
        <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; overflow: auto;">
<code>${friendEntry}</code>
        </pre>
        <hr style="margin: 20px 0;" />
        <p><strong>申请者信息：</strong></p>
        <p><strong>名称：</strong>${ensureValue(name)}</p>
        <p><strong>邮箱：</strong>${ensureValue(email)}</p>
        <p><strong>站点：</strong><a href="${ensureValue(url)}">${ensureValue(url)}</a></p>
        <p><strong>描述：</strong>${ensureValue(desc)}</p>
        <p><strong>头像：</strong>${ensureValue(avatar)}</p>
        <p><strong>想说的话：</strong>${ensureValue(message)}</p>
        <p><strong>时间：</strong>${new Date().toISOString()}</p>
    `;

    const info = await transporter.sendMail({
        from: senderEmail,
        to: adminEmail,
        replyTo: email,
        subject: `友链申请 / 联系表单 · ${ensureValue(name)}`,
        html: htmlMessage,
    });

    return {
        message: "Mail sent",
        id: info.messageId,
    };
});
