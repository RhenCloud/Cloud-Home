import { defineNuxtConfig } from "nuxt/config";
import siteConfig from "./src/config/siteConfig";

export default defineNuxtConfig({
    compatibilityDate: "2025-12-12",
    srcDir: "src/",
    css: ["~/styles.css"],
    app: {
        head: {
            title: siteConfig.siteMeta.title,
            link: [{ rel: "icon", href: siteConfig.siteMeta.icon }],
        },
    },
    nitro: {
        prerender: {
            crawlLinks: true,
            routes: ["/sitemap.xml", "/rss.xml"],
        },
    },
    runtimeConfig: {
        smtpHost: process.env.SMTP_HOST ?? "",
        smtpPort: Number(process.env.SMTP_PORT ?? 465),
        smtpUser: process.env.SMTP_USER ?? "",
        smtpPass: process.env.SMTP_PASS ?? "",
        senderEmail: process.env.SENDER_EMAIL ?? "",
        adminEmail: process.env.ADMIN_EMAIL ?? "",
        smtpSecure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : undefined,
        wakatimeApiKey: process.env.WAKATIME_API_KEY ?? "",
        wakatimeApiUrl: process.env.WAKATIME_API_URL ?? "https://wakatime.com/api/v1",
        public: {
            githubToken: process.env.NUXT_PUBLIC_GITHUB_TOKEN ?? "",
            umamiApiKey: process.env.NUXT_PUBLIC_UMAMI_API_KEY ?? "",
        },
    },
});
