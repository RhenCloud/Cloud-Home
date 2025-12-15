import type { Config } from "tailwindcss";

export default {
    content: ["./app/**/*.{vue,js,ts}", "./app/components/**/*.vue", "./app/pages/**/*.vue", "./app/layouts/**/*.vue"],
    theme: {
        extend: {
            colors: {
                // 自定义颜色变量（对应现有的 CSS 变量）
                primary: "rgb(124, 193, 255)",
                accent: "rgb(124, 193, 255)",
                "surface-primary": "rgb(15, 22, 41)",
                "surface-secondary": "rgb(27, 43, 75)",
                "text-primary": "rgb(232, 238, 252)",
                "text-secondary": "rgb(159, 172, 200)",
                "text-muted": "rgb(104, 120, 152)",
            },
            fontFamily: {
                sans: ['"Inter"', "system-ui", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "sans-serif"],
            },
            spacing: {
                "safe-x": "max(1rem, env(safe-area-inset-left))",
                "safe-y": "max(1rem, env(safe-area-inset-top))",
            },
            boxShadow: {
                "sm-dark": "0 4px 12px rgba(0, 0, 0, 0.15)",
                "md-dark": "0 8px 24px rgba(0, 0, 0, 0.18)",
                "lg-dark": "0 12px 32px rgba(0, 0, 0, 0.22)",
                "xl-dark": "0 16px 48px rgba(0, 0, 0, 0.25)",
            },
            backgroundImage: {
                "gradient-dark": "radial-gradient(circle at 20% 20%, #1b2b4b, #0f1629)",
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
} satisfies Config;
