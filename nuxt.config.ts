import { defineNuxtConfig } from "nuxt/config";
import siteConfig from "./app/config/siteConfig";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-12-12",
  srcDir: "app/",
  modules: ["@nuxt/image", "@nuxt/eslint"],

  // eslint: {
  //   config: {
  //     extends: ["plugin:nuxt/recommended", "prettier"],
  //     plugins: ["prettier"],
  //     rules: {
  //       "prettier/prettier": "error",
  //     },
  //     stylistic: true
  //   },
  // },

  // 禁用 Vue Router 的非关键警告
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("ion-"),
    },
  },

  // Tailwind CSS 集成
  css: ["~/styles.global.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  routeRules: {
    "/": { prerender: true },
    "/about": { isr: 3600 },
    "/sites": { prerender: true },
    "/projects": { prerender: true },
    "/friends": { prerender: true },
  },

  app: {
    head: {
      title: siteConfig.siteMeta.title,
      link: [
        { rel: "icon", href: siteConfig.siteMeta.icon },
        // Font Awesome CDN 预加载和优化
        {
          rel: "preload",
          as: "style",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css?font-display=swap",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          as: "font",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-solid-900.woff2?font-display=swap",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          as: "font",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-brands-400.woff2?font-display=swap",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      ],
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      // routes: ["/sitemap.xml", "/rss.xml"],
    },
    minify: true,
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
    githubToken: process.env.NUXT_PUBLIC_GITHUB_TOKEN ?? "",
    umamiApiKey: process.env.UMAMI_API_KEY ?? "",
  },
});
