# Cloud Home

一款基于 Nuxt 4 的个人主页模板，内置友链申请、网站展示、项目展示、友链随机展示、自定义配置，支持 Vercel 部署与邮件通知。

## 特性

- 🎨 个性化主页：头像、社交链接、技能、站点/项目列表可配置。
- 🔗 友链模块：支持申请表单、邮件通知、随机顺序展示。
- 📱 响应式设计：适配桌面与移动端。
- ⚙️ Serverless 部署支持

## 技术栈

- 前端：Nuxt 4 + Tailwind CSS
- 构建 / 运行：Nuxt 4 + Nitro
- 部署：Vercel（Nuxt 构建 + Nitro 函数）

## TODO

- [ ] 增加主题色配置
- [ ] 增加追番模块
- [ ] 增加留言板模块

## 致谢

排名不分先后

- [Skill Icons](https://github.com/tandpfun/skill-icons)：技能图标库，本项目的技能图标来源。
- [Netease Mini Player](https://github.com/numakkiyu/NeteaseMiniPlayer)：迷你网易云播放器组件，为本项目的音乐播放功能提供支持。（本项目使用[本人fork的版本](https://github.com/RhenCloud/NeteaseMiniPlayer)）

感谢以上开源项目原作者与维护者的贡献。

## 配置指南

### 站点配置文件 (`src/config/siteConfig.ts`)

本项目的所有静态内容配置均集中在 `src/config/siteConfig.ts` 文件中。

```typescript
const siteConfig: SiteConfig = {
  profile: {
    name: "Example User", // 你的名字
    title: "I'm a software developer.", // 你的简介，可为空
    avatar: "/avatar.webp", // 你的头像，可为public目录下的文件或外部链接
    bio: "Hello World", // 你的喜欢的一句话，可为空
    birthday: "xxxx-xx-xx", // 你的生日，可为空
    gender: "", // 你的性别，可为空
    pronouns: "", // 你希望别人如何称呼你，可为空
    location: "", // 你的居住地，可为空
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
    title: "Example Title", // 网站标题
    icon: "/favicon.ico", // 网站图标，可为public目录下的文件或外部链接
    startDate: "xxxx-xx-xx", // 网站创建日期
  },

  music: {
    // 是否启用音乐播放器
    enable: true,
    // floating - 浮动模式播放器（推荐）- 用于播放网易云歌单
    // embed - 嵌入模式播放器 - 用于播放网易云单曲
    mode: "floating", // "floating" 或 "embed"
    // 歌单ID：从网易云音乐链接获取，如 https://music.163.com/#/playlist?id=14273792576
    playlistId: undefined, // 例如: "14273792576"
    // 歌曲ID：仅在嵌入模式下使用
    songId: undefined, // 例如: "554242291"
    // 播放器位置（浮动模式）: "bottom-left" | "bottom-right" | "top-left" | "top-right"
    position: "bottom-left",
    // 是否显示歌词
    lyric: true,
    // 主题: "light" | "dark" | "auto"
    theme: "dark",
    // 是否自动播放
    autoplay: false,
    // 是否默认以黑胶唱片状态启动（仅浮动模式）
    defaultMinimized: true,
    // 标签页非激活时是否自动暂停
    autoPause: false,
    // Music API 配置
    apiUrls: ["https://www.bilibili.uno/api", "https://meting-api.wangcy.site/api"],
  },

  umami: {
    enable: true, // 是否启用 Umami 分析
    url: "https://cloud.umami.is/script.js", // Umami 分析脚本 URL，一般无需修改
    websiteId: "YOUR_WEBSITE_ID", // Umami 网站 ID
    apiBase: "https://api.umami.is", // Umami API 地址，一般无需修改
  },

  wakatime: {
    enable: true, // 是否启用 Wakatime 统计
    apiUrl: "https://wakatime.com/api/v1", // Wakatime API 地址，默认官方地址
  },

  // 技能图标展示，详见https://github.com/tandpfun/skill-icons#icons-list
  skills: [
    { title: "前端", items: ["css", "html", "javascript", "typescript", "vue"] },
    {
      title: "后端 / 云",
      items: ["cpp", "cloudflare", "docker", "java", "mysql", "nodejs", "python", "vercel"],
    },
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
    {
      name: "Example Project 1",
      url: "https://github.com/ExampleUser/example-project-1",
      desc: "Example Project 1",
    },
    {
      name: "Example Project 2",
      url: "https://github.com/ExampleUser/example-project-2",
      desc: "Example Project 2",
    },
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
    customHtml: "", // 自定义 HTML 代码，如统计代码等
    hitokoto: {
      enable: true, // 是否启用一言
      type: "a&b&c&d&j", // 一言类型，详见 https://developer.hitokoto.cn/sentence/#%E5%8F%A5%E5%AD%90%E7%B1%BB%E5%9E%8B-%E5%8F%82%E6%95%B0
    },
  },
};
```

### 其他配置

- **404 页面**：修改 `public/404.html` 来自定义 404 错误页面的样式与内容。
- **友链展示逻辑**：`FriendsSection.vue` 默认使用随机顺序渲染 `siteConfig.friends`，如需固定顺序请修改该组件。

## 环境变量

在 Vercel 控制台或本地 `.env` 配置：

- `NUXT_GITHUB_TOKEN`: 具有仓库读取权限的 GitHub Token，用于绕过 GitHub API 速率限制。（可选，仅服务端）
- `NUXT_UMAMI_API_KEY`: Umami API Key，用于页脚访问统计。（可选，仅服务端）
- `NUXT_WAKAPI_API_KEY`: Wakapi API Key，用于编码统计。（可选，仅服务端）
- `NUXT_WAKAPI_API_URL`: Wakapi API 地址，覆盖默认 `https://wakapi.rhen.cloud/api/v1`（可选）。
- `SMTP_HOST`: 邮件服务器主机名
- `SMTP_PORT`: 端口（如 465 或 587）
- `SMTP_USER`: 发件人邮箱账号
- `SMTP_PASS`: 邮箱授权码或密码
- `SENDER_EMAIL`: 发件人地址（通常同 SMTP_USER）
- `ADMIN_EMAIL`: 接收通知的邮箱地址
- `SMTP_SECURE`：是否强制启用 SSL/TLS（留空则按端口 465 自动推断）。
- `NUXT_OG_IMAGE_SECRET`: OG 图片签名密钥（可选；未配置时由模块自行生成）。

> 所有密钥均以 `NUXT_` 前缀声明为 Nitro 私有配置，**绝不会下发到浏览器**。SMTP 相关变量保持无前缀，由 `nuxt.config.ts` 显式读取。

### 旧变量名 → 新变量名对照

如果你从旧版本部署升级，请重命名以下环境变量（旧名已不再被读取）：

| 旧变量名                    | 新变量名              |
| --------------------------- | --------------------- |
| `NUXT_PUBLIC_GITHUB_TOKEN`  | `NUXT_GITHUB_TOKEN`   |
| `NUXT_PUBLIC_UMAMI_API_KEY` | `NUXT_UMAMI_API_KEY`  |
| `WAKATIME_API_KEY`          | `NUXT_WAKAPI_API_KEY` |
| `WAKATIME_API_URL`          | `NUXT_WAKAPI_API_URL` |

## 本地开发

```bash
pnpm install
pnpm dev
```

访问 `http://localhost:3000/`。

## 构建

```bash
pnpm build
```

产物输出到 Nuxt 的 `.output/` 目录，该目录同时包含静态资源与 Nitro 服务器入口。

## 部署到 Vercel

1. 导入仓库到 Vercel。
2. 设置上文的环境变量。

## API

雁型的 Nitro 路由位于 `server/api`，依旧暴露同样的 `/api` 前缀。

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
