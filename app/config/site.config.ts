import type {
  AppearanceConfig,
  CommentsConfig,
  FooterConfig,
  HeaderConfig,
  MusicConfig,
  SiteMetaConfig,
  UmamiConfig,
  WakapiConfig,
} from "~/types/site";

export const siteMeta = {
  title: "RhenCloud",
  description: "RhenCloud的个人主页，分享技术、生活、兴趣。",
  keywords: ["Technology", "Blog", "Development", "Programming"],
  author: "RhenCloud",
  url: "https://rhen.cloud",
  favicon: "/favicon.svg", // public/favicon.svg
  startDate: "2025-12-06",
  lang: "zh-CN",
} satisfies SiteMetaConfig;

export const appearance = {
  background: {
    enable: true,
    // URL 支持：可使用外部 URL 或本地路径
    // 例如: "https://example.com/bg.jpg" 或 "background.webp"
    image: "background.webp", // 背景图片 URL 或本地路径（桌面端）
    mobileImage: "https://www.loliapi.com/acg/pe/", // 移动端背景图片（可选，不设置则使用 image）
    blur: 0, // 背景模糊程度 (0-100)
    overlay: "rgba(70, 59, 82, 0.4)", // 背景遮罩颜色与透明度
  },
} satisfies AppearanceConfig;

export const music = {
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
} satisfies MusicConfig;

export const umami = {
  enable: true,
  url: "https://cloud.umami.is/script.js",
  websiteId: "ddcd51c3-ccc7-45e4-81e6-11567027f69b",
  apiBase: "https://api.umami.is",
} satisfies UmamiConfig;

export const wakapi = {
  enable: false,
  apiUrl: "https://wakapi.rhen.cloud/api/v1",
  username: "RhenCloud",
} satisfies WakapiConfig;

export const comments = {
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
} satisfies CommentsConfig;

export const header = {
  customHtml:
    '<script charset="UTF-8" id="MXA_COLLECT" src="//mxana.tacool.com/sdk.js"></script>\n<script>MXA.init({ id: "c2-sNzz1Cx4" })</script>',
} satisfies HeaderConfig;

export const footer = {
  beian: "津ICP备2025039003号-1",
  beianLink: "https://beian.miit.gov.cn/",
  customHtml: '<span style="opacity:.8">© 2025 <a href="https://rhen.cloud">RhenCloud</a></span>',
  hitokoto: {
    enable: true,
    type: "a&b&c&d&j",
  },
} satisfies FooterConfig;
