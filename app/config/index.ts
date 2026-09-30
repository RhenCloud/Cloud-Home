import type { SiteConfig } from "~/types/site";
import { about, github, profile, skills, socialLinks } from "./profile";
import { friends, projects, sites } from "./content";
import {
  appearance,
  comments,
  footer,
  header,
  music,
  siteMeta,
  umami,
  wakapi,
} from "./site.config";

export const siteConfig = {
  profile,
  socialLinks,
  about,
  skills,
  github,
  siteMeta,
  appearance,
  music,
  umami,
  wakapi,
  comments,
  header,
  footer,
  sites,
  projects,
  friends,
} satisfies SiteConfig;

export { about, github, profile, skills, socialLinks } from "./profile";
export { friends, projects, sites } from "./content";
export {
  appearance,
  comments,
  footer,
  header,
  music,
  siteMeta,
  umami,
  wakapi,
} from "./site.config";
export type * from "~/types/site";

export default siteConfig;
