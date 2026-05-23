# AGENTS.md

本文件用于指导 AI Coding Agents 在本仓库内高效、安全、一致地工作。优先遵循现有实现与仓库约定；除非必要，不要引入新架构。

## 项目概览

- 这是一个 Nuxt.js + TypeScript + Tailwind CSS + Bun 项目。
- 默认使用 Bun 作为包管理器与运行时。
- 优先采用 SSR 与 Nuxt conventions。
- 优先使用 Composition API。
- TypeScript 必须保持 strict mode。


## 环境与工具链

- 优先通过 `nix develop` 或 `nix shell` 补全缺失工具，不要假设系统已全局安装 node、npm、pnpm。
- 如果缺少开发工具，优先补充 `flake.nix`，或补充 `shell.nix` / devShell。
- 默认使用 Bun：
	- 安装依赖：`bun install`
	- 运行脚本：`bun run <script>`
	- 避免使用 npm、pnpm、yarn
- 优先保证开发环境可复现，避免依赖本机隐式状态。
- 常用命令：

```bash
nix develop
bun install
bun run dev
bun run build
bun run lint
```

## DevOps

- Docker 已支持，构建入口见 [Dockerfile](Dockerfile)，本地联动服务见 [docker-compose.yml](docker-compose.yml)。默认使用 `docker compose up --build` 启动整套环境。
- Nix flake 已支持，开发环境以 [flake.nix](flake.nix) 为准；优先通过 `nix develop` 进入可复现 shell，再执行 Bun 命令。
- GitHub Actions 已配置 CI，检查顺序与本地一致：安装依赖、`bun run lint`、`bun run typecheck`、`bun run build`。
- 自动格式化使用 `bun run format`，修改代码后优先执行，保证 Prettier 与 Tailwind 排版一致。
- 自动 lint 与自动 typecheck 依赖仓库脚本和 CI；本地修改后优先跑 `bun run lint` 和 `bun run typecheck`，避免把问题留到流水线。

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

- composables 放在 `/composables`。
- server routes 放在 `/server/api`。
- shared types 放在 `/types`。
- 通用工具函数放在 `/utils`。
- 页面逻辑保持轻量，复杂业务下沉到 composables / server / utils。
- 避免在 components 中写复杂业务逻辑。
- 优先使用 `useFetch`、`useAsyncData` 与 Nuxt auto imports。
- Tailwind class 要保持可读性，避免过长 class chain。
- 优先使用语义化 wrapper components，而不是把样式逻辑散落在页面里。

## AI Agent 行为规则

- 修改代码前先阅读现有实现与相邻调用点。
- 修改前优先搜索已有 utility / composable / server helper，避免重复造轮子。
- 优先遵循现有代码风格，不要强行引入新的架构风格。
- 最小化修改范围，优先做局部且可验证的改动。
- 不要随意增加依赖；新增依赖必须说明原因。
- 不要破坏 SSR、hydration 或 Nuxt 自动导入约定。
- 不要绕过 TypeScript 类型系统。
- 不要通过关闭 lint、typecheck 或 build 来“修复”问题。

## 测试与质量

- 所有改动应尽量通过 typecheck、lint、build。
- 修改后优先运行：

```bash
bun run lint
bun run typecheck
bun run build
```

- 如果某个检查失败，先修复根因，再继续扩大修改。

## 维护原则

- 保持本文件短小、可执行、面向 AI Agent。
- 只记录仓库中不容易通过扫描直接发现、但会影响正确性的约定。
- 细节说明优先链接到其他文档，不在此处重复展开。
