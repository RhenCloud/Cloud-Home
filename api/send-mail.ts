import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS 处理
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // if (req.method === "OPTIONS") {
    //     return res.status(200).end();
    // }

    // if (req.method === "GET") {
    //     return res.status(200).json({ status: "ok", message: "use POST to send mail" });
    // }

    // if (req.method !== "POST") {
    //     return res.status(405).json({ error: "Method Not Allowed" });
    // }

    try {
        const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        const { name, email, site, desc, avatar } = data || {};
        if (!name || !email || !desc) {
            return res.status(400).json({ error: "Missing required fields: name, email, desc" });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 465),
            secure: Number(process.env.SMTP_PORT || 465) === 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: "友链申请 / 联系表单",
            html: `
                <p><strong>名称：</strong>${name}</p>
                <p><strong>邮箱：</strong>${email}</p>
                <p><strong>站点：</strong>${site || "未填写"}</p>
                <p><strong>描述：</strong>${desc}</p>
                <p><strong>头像：</strong>${avatar || "未填写"}</p>
                <p><strong>时间：</strong>${new Date().toISOString()}</p>
            `,
        });

        return res.status(200).json({
            message: "Mail sent",
            id: info.messageId,
        });
    } catch (err) {
        return res.status(500).json({ error: "Send mail failed", detail: (err as Error).message });
    }
}
