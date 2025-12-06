# Cloud Home

一个基于 Vue 的个人主页模板，内置友链申请、网站展示、项目展示、友链随机展示、自定义配置，支持 Vercel 部署与邮件通知。

## 特性

- 🎨 个性化主页：头像、社交链接、技能、站点/项目列表可配置。
- 🔗 友链模块：支持申请表单、邮件通知、随机顺序展示。
- 📱 响应式设计：适配桌面与移动端。
- ⚙️ Serverless 部署支持

## 技术栈

- 前端：Vue 3 + HTML + CSS
- 构建：Vite
- 部署：Vercel（静态构建 + Serverless Functions）

## 配置指南

### 站点配置文件 (`src/config/siteConfig.ts`)

本项目的所有静态内容配置均集中在 `src/config/siteConfig.ts` 文件中。

```typescript
const siteConfig: SiteConfig = {
    profile: {
        name: "Example User", // 你的名字
        title: "I'm a software developer.", // 你的简介，可为空
        avatar: "avatar.webp", // 你的头像，可为public目录下的文件或外部链接
        bio: "Hello World", // 你的喜欢的一句话，可为空
    },

    // 社交链接，预定义的社交链接可在 `src/components/SocialLink.vue` 中查阅
    socialLinks: [
        { name: "GitHub", url: "https://github.com/ExampleUser" },
        { name: "Email", url: "mailto:you@example.com" },
        { name: "Telegram", url: "https://t.me/ExampleUser" },
        { name: "Bilibili", url: "https://space.bilibili.com/1502883335" },
        { name: "Blog", url: "https://blog.example.com" },
    ],

    github: {
        username: "ExampleUser", // 你的 GitHub 用户名
    },

    // 个人介绍卡片
    about: [
        { title: "Example", desc: "Example description", icon: "🧠" },
        { title: "Example", desc: "Example description", icon: "🛠️" },
        { title: "Example", desc: "Example description", icon: "🎬" },
        { title: "Example", desc: "Example description", icon: "🎮" },
    ],

    siteMeta: {
        title: "RhenCloud", // 网站标题
        icon: "favicon.ico", // 网站图标，可为public目录下的文件或外部链接
    },

    // 技能图标展示，详见https://github.com/tandpfun/skill-icons#icons-list
    skills: [
        { title: "前端", items: ["css", "html", "javascript", "typescript", "vue"] },
        { title: "后端 / 云", items: ["cpp", "cloudflare", "docker", "java", "mysql", "nodejs", "python", "vercel"] },
        { title: "工具", items: ["ae", "au", "git", "github", "md", "ps", "pr", "vscode"] },
        { title: "操作系统", items: ["arch", "linux", "windows"] },
    ],

    sites: [
        {
            name: "Example Site 1",
            desc: "Example Site 1",
            url: "https://example1.com",
        },
        {
            name: "Example Site 2",
            desc: "Example Site 2",
            url: "https://example2.com",
        },
    ],

    projects: [
        { name: "Example Project 1", url: "https://github.com/ExampleUser/example-project-1", desc: "Example Project 1" },
        { name: "Example Project 2", url: "https://github.com/ExampleUser/example-project-2", desc: "Example Project 2" },
    ],

    friends: [
        {
            name: "Example Site 1",
            desc: "Example Site 1",
            url: "https://example1.com",
            avatar: "https://example1.com/avatar.png",
        },
        {
            name: "Example Site 2",
            desc: "Example Site 2",
            url: "https://example2.com",
            avatar: "https://example2.com/avatar.png",
        },
    ],

    footer: {
        beian: "备案号", // 备案号，留空则不显示
        beianLink: "https://beian.miit.gov.cn/", // 备案号链接，一般无需修改
        showHitokoto: true, // 是否显示一言
        hitokotoType: "a&b&c&d&j", // 一言类型，详见 https://developer.hitokoto.cn/sentence/#%E5%8F%A5%E5%AD%90%E7%B1%BB%E5%9E%8B-%E5%8F%82%E6%95%B0
        customHtml: '', // 自定义 HTML 代码，如统计代码等
    },
};
```

### 其他配置

- **404 页面**：修改 `public/404.html` 来自定义 404 错误页面的样式与内容。
- **友链展示逻辑**：`FriendsSection.vue` 默认使用随机顺序渲染 `siteConfig.friends`，如需固定顺序请修改该组件。

## 环境变量（邮件发送）

在 Vercel 控制台或本地 `.env` 配置：

- `VITE_GITHUB_TOKEN`: 具有仓库读取权限的 GitHub Token，用于绕过 GitHub API 速率限制。
- `SMTP_HOST`: 邮件服务器主机名
- `SMTP_PORT`: 端口（如 465 或 587）
- `SMTP_USER`: 发件人邮箱账号
- `SMTP_PASS`: 邮箱授权码或密码
- `MAIL_FROM`: 发件人地址（通常同 SMTP_USER）
- `ADMIN_EMAIL`: 接收通知的邮箱地址
- `SMTP_SECURE`：是否启用 SSL/TLS 加密（默认 `true`）

## 本地开发

```bash
pnpm install
pnpm dev
```

访问 `http://localhost:5173/`。

## 构建

```bash
pnpm build
```

产物输出到 `dist/`。

## 部署到 Vercel

1. 导入仓库到 Vercel。
2. 设置上文的环境变量。

## API

- `POST /api/send-mail`：友链申请邮件发送。请求体示例：

```json
{
    "name": "RhenCloud",
    "url": "https://example.com",
    "desc": "个人博客",
    "email": "you@example.com",
    "avatar": "https://example.com/avatar.png"
}
```

## 许可

MIT License.
