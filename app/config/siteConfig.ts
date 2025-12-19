const siteConfig = {
  profile: {
    name: "RhenCloud",
    title: "I'm RhenCloud.",
    avatar: "/avatar.webp", // public/avatar.webp
    bio: "趁世界还未重启之前 约一次爱恋",
    email: "i@rhen.cloud",
    birthday: "2010-03-28",
    // gender: "女",
    pronouns: "她",
    location: "中国 · 天津",
  },

  socialLinks: [
    { name: "GitHub", url: "https://github.com/RhenCloud" },
    { name: "Email", url: "mailto:i@rhen.cloud" },
    { name: "Telegram", url: "https://t.me/RhenCloud" },
    { name: "Bilibili", url: "https://space.bilibili.com/1502883335" },
    { name: "Blog", url: "https://blog.rhen.cloud" },
  ],

  github: {
    username: "RhenCloud",
  },

  about: [
    { title: "Pro-LGBT", desc: "我相信性别多样性是人们应有的自由和权利。", icon: "🧠" },
    { title: "Developer", desc: "专注后端 / 云原生，热爱自动化与高可用。", icon: "🛠️" },
    { title: "Anime Fan", desc: "二次元爱好者，享受故事与想象力。", icon: "🎬" },
    { title: "Just For Fun", desc: "我喜欢尝试新鲜事物，折腾小众技术", icon: "🎮" },
  ],

  siteMeta: {
    title: "RhenCloud",
    url: "https://rhen.cloud",
    icon: "/favicon.svg", // public/favicon.svg
    startDate: "2025-12-06",
  },

  appearance: {
    background: {
      enable: true,
      // URL 支持：可使用外部 URL 或本地路径
      // 例如: "https://example.com/bg.jpg" 或 "background.webp"
      image: "background.webp", // 背景图片 URL 或本地路径（桌面端）
      mobileImage: "https://www.loliapi.com/acg/pe/", // 移动端背景图片（可选，不设置则使用 image）
      blur: 0, // 背景模糊程度 (0-100)
      overlay: "rgba(70, 59, 82, 0.4)", // 背景遮罩颜色与透明度
    },
  },

  music: {
    enable: true,
    // 浮动模式播放器（推荐）- 用于播放网易云歌单
    mode: "floating", // "floating" 或 "embed"
    // 歌单ID：从网易云音乐链接获取，如 https://music.163.com/#/playlist?id=14273792576
    playlistId: "14366453940", // 例如: "14273792576"
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
    enable: true,
    url: "https://cloud.umami.is/script.js",
    websiteId: "ddcd51c3-ccc7-45e4-81e6-11567027f69b",
    apiBase: "https://api.umami.is",
  },

  wakatime: {
    enable: true,
    apiUrl: "https://wakapi.rhen.cloud/api/v1",
  },

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
      name: "个人主页",
      desc: "个人主页",
      url: "https://rhen.cloud",
    },
    {
      name: "我的博客",
      desc: "分享与记录",
      url: "https://blog.rhen.cloud",
    },
    {
      name: "来视奸我",
      desc: "使用Sleepy项目搭建的视奸网站",
      url: "https://sleepy.rhen.cloud",
    },
    {
      name: "网站监控",
      desc: "网站运行状态监控",
      url: "https://status.rhen.cloud",
    },
  ],

  projects: [
    { name: "Cloud Home", url: "https://github.com/RhenCloud/cloud-home", desc: "个人主页模板" },
    {
      name: "ILP",
      url: "https://github.com/RhenCloud/ILP",
      desc: "跨平台、多网站、模块化的小说下载器",
    },
    {
      name: "ILP-C++",
      url: "https://github.com/RhenCloud/ILP-Cpp",
      desc: "跨平台、多网站、模块化的小说下载器",
    },
  ],

  friends: [
    {
      name: "wuxian",
      desc: "wuxian's web",
      url: "https://www.alxian.cn",
      avatar: "https://www.alxian.cn/_next/image?url=%2Fimages%2Favatar.jpg&w=256&q=75",
    },
    {
      name: "鈴奈咲桜のBlog",
      desc: "一个普普通通的Blog",
      url: "https://blog.sakura.ink",
      avatar: "https://q2.qlogo.cn/headimg_dl?dst_uin=2731443459&spec=5",
    },
  ],

  comments: {
    enable: true,
    // twikoo: {
    //     url: "https://twikoo.rhen.cloud",
    // },
    giscus: {
      repo: "RhenCloud/Cloud-Home",
      repoId: "R_kgDOQjx8rQ",
      category: "Announcements",
      categoryId: "DIC_kwDOQjx8rc4Cz4Qb",
      mapping: "pathname",
      reactionsEnabled: "1",
      emitMetadata: "0",
      inputPosition: "bottom",
      theme: "preferred_color_scheme",
    },
  },

  footer: {
    beian: "津ICP备2025039003号-1",
    beianLink: "https://beian.miit.gov.cn/",
    customHtml: '<span style="opacity:.8">© 2025 <a href="https://rhen.cloud">RhenCloud</a></span>',
    hitokoto: {
      enable: true,
      type: "a&b&c&d&j",
    },
  },
};

export default siteConfig;
