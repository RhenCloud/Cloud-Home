export interface PgpConfig {
  fingerprint: string;
  publicKey: string;
  keyUrl: string;
}

export interface ProfileConfig {
  name: string;
  title: string;
  avatar: string;
  bio: string;
  email: string;
  pgp: PgpConfig;
  birthday: string;
  gender?: string;
  pronouns: string;
  location: string;
}

export interface SocialLink {
  name: string;
  url: string;
  /** 可选：显式指定 iconify 图标名，缺省时按 name 查内置映射 */
  icon?: string;
}

export interface AboutItem {
  title: string;
  desc: string;
  icon: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface GithubConfig {
  username: string;
}

export interface SiteMetaConfig {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  url: string;
  favicon: string;
  startDate: string;
  lang: string;
}

export interface AppearanceConfig {
  background: {
    enable: boolean;
    image: string;
    mobileImage: string;
    blur: number;
    overlay: string;
  };
}

export type MusicMode = "floating" | "embed";
export type PlayerPosition = "bottom-left" | "bottom-right" | "top-left" | "top-right";
export type PlayerTheme = "light" | "dark" | "auto";

export interface MusicConfig {
  enable: boolean;
  mode: MusicMode;
  playlistId: string;
  songId?: string;
  position: PlayerPosition;
  lyric: boolean;
  theme: PlayerTheme;
  autoplay: boolean;
  defaultMinimized: boolean;
  autoPause: boolean;
  apiUrls: string[];
}

export interface UmamiConfig {
  enable: boolean;
  url: string;
  websiteId: string;
  apiBase: string;
}

export interface WakapiConfig {
  enable: boolean;
  apiUrl: string;
  username: string;
}

export interface GiscusConfig {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: string;
  reactionsEnabled: string;
  emitMetadata: string;
  inputPosition: string;
  theme: string;
}

export interface CommentsConfig {
  enable: boolean;
  giscus: GiscusConfig;
}

export interface HeaderConfig {
  customHtml: string;
}

export interface FooterConfig {
  beian: string;
  beianLink: string;
  customHtml: string;
  hitokoto: {
    enable: boolean;
    type: string;
  };
}

export interface SiteEntry {
  name: string;
  desc: string;
  url: string;
}

export interface ProjectEntry {
  name: string;
  url: string;
  desc: string;
}

export interface FriendEntry {
  name: string;
  desc: string;
  url: string;
  avatar: string;
}

export interface SiteConfig {
  profile: ProfileConfig;
  socialLinks: SocialLink[];
  about: AboutItem[];
  skills: SkillGroup[];
  github: GithubConfig;
  siteMeta: SiteMetaConfig;
  appearance: AppearanceConfig;
  music: MusicConfig;
  umami: UmamiConfig;
  wakapi: WakapiConfig;
  comments: CommentsConfig;
  header: HeaderConfig;
  footer: FooterConfig;
  sites: SiteEntry[];
  projects: ProjectEntry[];
  friends: FriendEntry[];
}
