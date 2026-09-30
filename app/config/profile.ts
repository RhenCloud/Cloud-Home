import type { AboutItem, GithubConfig, ProfileConfig, SkillGroup, SocialLink } from "~/types/site";

export const profile = {
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
} satisfies ProfileConfig;

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/RhenCloud" },
  { name: "Email", url: "mailto:i@rhen.cloud" },
  { name: "Matrix", url: "https://matrix.to/#/@RhenCloud:matrix.org" },
  { name: "Bilibili", url: "https://space.bilibili.com/1502883335" },
  { name: "Blog", url: "https://blog.rhen.cloud" },
  { name: "Telegram", url: "https://t.me/RhenCloud" },
  // { name: "Twitter", url: "https://x.com/RhenCloud75" },
] satisfies SocialLink[];

export const about = [
  // { title: "Pro-LGBT", desc: "我相信性别多样性是人们应有的自由和权利。", icon: "🧠" },
  { title: "Night Owl", desc: "灵感通常在深夜降临。", icon: "🌙" },
  { title: "Developer", desc: "专注后端 / 云原生，热爱自动化与高可用。", icon: "🛠️" },
  { title: "Anime Fan", desc: "二次元爱好者，享受故事与想象力。", icon: "🎬" },
  { title: "Just For Fun", desc: "我喜欢尝试新鲜事物，折腾小众技术", icon: "🎮" },
] satisfies AboutItem[];

export const skills = [
  { title: "前端", items: ["css", "html", "javascript", "typescript", "vue"] },
  {
    title: "后端 / 云",
    items: ["cpp", "cloudflare", "docker", "java", "mysql", "nodejs", "python", "vercel"],
  },
  { title: "工具", items: ["ae", "au", "git", "github", "md", "ps", "pr", "vscode"] },
  { title: "操作系统", items: ["arch", "linux", "windows"] },
] satisfies SkillGroup[];

export const github = {
  username: "RhenCloud",
} satisfies GithubConfig;
