const siteConfig = {
  profile: {
    name: "RhenCloud",
    title: "I'm RhenCloud.",
    avatar: "/avatar-1.webp", // public/avatar.webp
    bio: "趁世界还未重启之前 约一次爱恋",
    email: "i@rhen.cloud",
    pgp: {
      fingerprint: "4A0D0DE4379AEB4562ED5EC0A574A617378C4E0B",
      publicKey: `-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEaaqxVRYJKwYBBAHaRw8BAQdAGfMGv3ZrFvyC3aB69rrCe7hj19VXqfn+fxQ4
R1xxsK+0GFJoZW5DbG91ZCA8aUByaGVuLmNsb3VkPoiyBBMWCgBaGxSAAAAAAAQA
Dm1hbnUyLDIuNSsxLjExLDIsMQIbAwULCQgHAgIiAgYVCgkICwIEFgIDAQIeBwIX
gBYhBEoNDeQ3mutFYu1ewKV0phc3jE4LBQJpuBlSAhkBAAoJEKV0phc3jE4L3cYB
AOVr0OASfXF7fv7hE9u82CYtCB3o70bc+hF0cvqdHn+RAQCfEgw5iQo0GA2BfhPK
U1VKL71dm/QxGJ12n9Q2SsWwDrQgUmhlbkNsb3VkIDxyaGVuY2xvdWRAc2lpd2F5
Lm9yZz6IrwQTFgoAVxYhBEoNDeQ3mutFYu1ewKV0phc3jE4LBQJpuBjzGxSAAAAA
AAQADm1hbnUyLDIuNSsxLjExLDIsMQIbAwULCQgHAgIiAgYVCgkICwIEFgIDAQIe
BwIXgAAKCRCldKYXN4xOC+OtAP9UIlQwEBDKeOVvBTknykmrN2XfPH+9BBd5YUC+
l44rAQEAmjzieQWLCwz8D9Ythya+6rRE0eXa6Kd0cL8Stwe9wwq4MwRpqrFVFgkr
BgEEAdpHDwEBB0D7rYWSdRC5vUBQw1FgX83X0WZOSRPYhzi1o1PkEE0GxIiUBBgW
CgA8FiEESg0N5Dea60Vi7V7ApXSmFzeMTgsFAmmqsVUbFIAAAAAABAAObWFudTIs
Mi41KzEuMTEsMiwxAhsgAAoJEKV0phc3jE4LKp4BAIsaNWogAP0TxrRseS3zk+BE
/K5sdmIt4nJNYVC91keVAQC2PFhdfbVRIbisJ7k6atOPrjKSeUMKHhYbQWky0ptB
C7g4BGmqsVUSCisGAQQBl1UBBQEBB0CQAYihK+4Qeq0jMXhko5JFhztIcGM3muKb
tjY4KCPQYgMBCAeIlAQYFgoAPBYhBEoNDeQ3mutFYu1ewKV0phc3jE4LBQJpqrFV
GxSAAAAAAAQADm1hbnUyLDIuNSsxLjExLDIsMQIbDAAKCRCldKYXN4xOC1QLAQCx
e7ogTB50YVDIMF7A8iQMm9Kn29vjsLftSBsTDzUB4gD+NeGyST5c81RIbNf0eWUk
En5WfP0rfILKDkvm8jD0/AU=
=7KnD
-----END PGP PUBLIC KEY BLOCK-----`,
      keyUrl: "/rhencloud.asc",
    },
    birthday: "2010-03-28",
    // gender: "女",
    pronouns: "她",
    location: "中国 · 天津",
  },

  socialLinks: [
    { name: "GitHub", url: "https://github.com/RhenCloud" },
    { name: "Email", url: "mailto:i@rhen.cloud" },
    { name: "Matrix", url: "https://matrix.to/#/@RhenCloud:matrix.org" },
    { name: "Bilibili", url: "https://space.bilibili.com/1502883335" },
    { name: "Blog", url: "https://blog.rhen.cloud" },
    { name: "Telegram", url: "https://t.me/RhenCloud" },
    // { name: "Twitter", url: "https://x.com/RhenCloud75" },
  ],

  github: {
    username: "RhenCloud",
  },

  about: [
    // { title: "Pro-LGBT", desc: "我相信性别多样性是人们应有的自由和权利。", icon: "🧠" },
    { title: "Night Owl", desc: "灵感通常在深夜降临。", icon: "🌙" },
    { title: "Developer", desc: "专注后端 / 云原生，热爱自动化与高可用。", icon: "🛠️" },
    { title: "Anime Fan", desc: "二次元爱好者，享受故事与想象力。", icon: "🎬" },
    { title: "Just For Fun", desc: "我喜欢尝试新鲜事物，折腾小众技术", icon: "🎮" },
  ],

  siteMeta: {
    title: "RhenCloud",
    description: "RhenCloud的个人主页，分享技术、生活、兴趣。",
    keywords: ["Technology", "Blog", "Development", "Programming"],
    author: "RhenCloud",
    url: "https://rhen.cloud",
    favicon: "/favicon.svg", // public/favicon.svg
    startDate: "2025-12-06",
    lang: "zh-CN",
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

  wakapi: {
    enable: false,
    apiUrl: "https://wakapi.rhen.cloud/api/v1",
    username: "RhenCloud",
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
    {
      name: "我很可爱，请给我钱",
      desc: "我的捐赠页面",
      url: "https://pay.rhen.cloud"
    }
  ],

  projects: [
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
    {
      name: "Cloud-Home",
      url: "https://github.com/RhenCloud/Cloud-Home",
      desc: "个人主页模板",
    },
    {
      name: "Cloud-Blog",
      url: "https://github.com/RhenCloud/Cloud-Blog",
      desc: "个人博客模板",
    },
    {
      name: "SleepyXposed",
      url: "https://github.com/ReCloudStudio/SleepyXposed",
      desc: "基于Xposed的Sleepy客户端",
    },
    {
      name: "WebHooker",
      url: "https://github.com/ReCloudStudio/WebHooker",
      desc: "GitHub -> Discord Webhook 转发器",
    },
  ],

  friends: [
    {
      name: "XFJの主页✨",
      desc: "我永远喜欢哈次捏米库！！！",
      url: "https://minecraftxfj.top",
      avatar: "https://cdn.jsdelivr.net/gh/XFJ-YYQF/Picture@main/img/home192.webp",
    },
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
    {
      name: "雾小蒜の小窝",
      desc: "共寻繁星，逐光前行！",
      url: "https://ciallovo.top",
      avatar: "https://ciallovo.top/assets/pic/icon.webp",
    },
    {
      name: "香草的日记",
      desc: "与你的日常，便是奇迹！分享技术与日常。",
      url: "https://www.xcnahida.cn",
      avatar: "https://www.xcnahida.cn/favicon.ico",
    },
    {
      name: "Nekro’s SEKAI",
      desc: "自留地 / 日常记录 / 经验分享",
      url: "https://www.nekro.top/",
      avatar: "https://avatars.githubusercontent.com/u/90670998?v=4",
    },
    {
      name: "Bbzv🍥🏳️‍⚧️",
      desc: "生如夏花之绚烂，死如秋叶之静美",
      url: "https://bbzv.de5.net/",
      avatar: "https://bu.dusays.com/2026/08/20/6a867e915d145.jpg",
    },
  ],

  comments: {
    enable: false,
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

  header: {
    customHtml:
      '<script charset="UTF-8" id="MXA_COLLECT" src="//mxana.tacool.com/sdk.js"></script>\n<script>MXA.init({ id: "c2-sNzz1Cx4" })</script>',
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
