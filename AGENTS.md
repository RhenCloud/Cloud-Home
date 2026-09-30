# AGENTS.md

本文件用于指导 AI Coding Agents 在本仓库内高效、安全、一致地工作。优先遵循现有实现与仓库约定；除非必要，不要引入新架构。

## 项目概览

- 这是一个 Nuxt 4 + TypeScript + Tailwind CSS v4 + Bun 项目（个人主页，Cloudflare Pages 部署，Nitro preset `cloudflare-pages`）。
- 默认使用 Bun 作为包管理器与运行时。
- 优先采用 SSR 与 Nuxt conventions。
- 优先使用 Composition API；组件脚本统一 `<script setup lang="ts">` + 泛型 `defineProps`。
- TypeScript 保持 strict（Nuxt 默认 tsconfig 含 `noUncheckedIndexedAccess`，索引访问需显式收窄）。

## 环境与工具链

- 安装依赖：`bun install`；运行脚本：`bun run <script>`。
- 避免使用 npm、pnpm、yarn。
- 不要使用 `bunx vue-tsc`（会拉取与本地 typescript ~5.9 不兼容的新版）；typecheck 走 package.json 脚本即可。
- 常用命令：

```bash
bun install
bun run dev
bun run check   # lint + format:check + typecheck + build 全链
```

## DevOps

- GitHub Actions（`.github/workflows/lint-format.yml`）：所有分支 push/PR 跑 `bun run check`；自动格式化 job 仅在 push 到 `main` 时触发。
- 本仓库 `bun run check` / CI 用默认 preset 构建，**不等于** Cloudflare 环境。cloudflare-pages preset 下 og-image 对 takumi 渲染器走 wasm 绑定，必须保留 `@takumi-rs/wasm`（与 `@takumi-rs/core` 同版本锁定）；本地验证 CF 构建用 `NITRO_PRESET=cloudflare-pages bun run build`。
- 自动格式化使用 `bun run format`，修改代码后优先执行，保证 Prettier 与 Tailwind 排版一致。
- 本项目无 Docker / Nix 配置；不要假设存在 `flake.nix` 或容器编排文件。
- 密钥一律走环境变量注入（见 `.env.example` 与 README 的变量对照表），禁止写入仓库。

## TypeScript 规范

- 参考规范：[TypeScript 风格指南](https://siiway.org/zh/dev/ts-style.html)
- 默认使用 `const`，禁止 `var`。
- 避免 `any`；必要时先收窄类型，再使用显式断言。
- 优先使用 `type`，仅在需要扩展或声明合并时使用 `interface`。
- 不要使用 `enum`，优先使用 literal union。
- 避免大型类，优先函数式与组合式设计。
- 公共 API 必须显式声明返回类型。
- 文件名使用 kebab-case。
- composables 使用 `useXxx` 命名。
- Vue 组件使用 PascalCase 命名。
- 避免默认导出，Nuxt 特殊约定除外。
- 保持 import 顺序稳定，依赖 ESLint + Prettier 自动格式化。

## Nuxt / Vue 约定

- 站点配置按领域拆分在 `app/config/`（profile.ts / content.ts / site.config.ts），一律通过 barrel 导入：`import { siteConfig } from "~/config"`。新增顶层键须同步补进 `app/types/site.ts` 并在对应领域文件用 `satisfies` 约束。
- 共享类型放 `app/types/`（site.ts 配置侧、api.ts 服务端 API 响应侧）；server 路由同样以 `~/types/...` 导入。
- server routes 放在 `server/api/`。所有第三方密钥（GitHub / Umami / Wakapi / SMTP）只在服务端 runtimeConfig 私有区读取，客户端永远不可见。
- 数据获取优先 `useFetch` / `useAsyncData`。注意 Nuxt 4.2 的 `useFetch` 泛型与 `skip` 选项在 vue-tsc 下重载冲突（TS2769）：需要条件获取时用三元条件调用（enable 时 `useFetch(...)`，否则本地 `ref` 兜底），不要使用 `skip`。
- 页面逻辑保持轻量，复杂业务下沉到 server routes。
- Tailwind class 要保持可读性；重复卡片样式使用 `app/styles.global.css` 中的组件类（`.info-card` / `.friend-card` / `.stat-chip` / `.panel-title` / `.panel-subtitle`），颜色与阴影 token 定义在 `@theme` 块（Tailwind v4 无 tailwind.config.ts）。

## AI Agent 行为规则

- 修改代码前先阅读现有实现与相邻调用点。
- 修改前优先搜索已有 utility / composable / server helper，避免重复造轮子。
- 优先遵循现有代码风格，不要强行引入新的架构风格。
- 最小化修改范围，优先做局部且可验证的改动。
- 不要随意增加依赖；新增依赖必须说明原因。
- 不要破坏 SSR、hydration 或 Nuxt 自动导入约定。
- 不要绕过 TypeScript 类型系统。
- 不要通过关闭 lint、typecheck 或 build 来"修复"问题。

## 测试与质量

- 仓库无测试框架；质量门禁即 `bun run check`（lint → format:check → typecheck → build）。
- 所有改动必须全链通过后再提交。
- 如果某个检查失败，先修复根因，再继续扩大修改。

## 维护原则

- 保持本文件短小、可执行、面向 AI Agent。
- 只记录仓库中不容易通过扫描直接发现、但会影响正确性的约定。
- 细节说明优先链接到其他文档，不在此处重复展开。
