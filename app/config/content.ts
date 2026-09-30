import type { FriendEntry, ProjectEntry, SiteEntry } from "~/types/site";

export const sites = [
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
    url: "https://pay.rhen.cloud",
  },
] satisfies SiteEntry[];

export const projects = [
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
] satisfies ProjectEntry[];

export const friends = [
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
    avatar: "https://bu.dusays.com/2026-08-20/6a867e915d145.jpg",
  },
  {
    name: "IrisDream",
    desc: "Mi estas ĉar vi estas.",
    url: "https://iris-dream.top/",
    avatar: "https://iris-dream.top/img/avatar.png",
  },
] satisfies FriendEntry[];
