import { defineEventHandler, createError, setResponseHeader } from "h3";
import { useRuntimeConfig } from "#imports";
import { siteConfig } from "~/config";
import type { GithubLanguagesDTO } from "~/types/api";

const UPSTREAM_TIMEOUT_MS = 8000;
const TOP_N = 5;

/**
 * GitHub 仓库语言聚合代理：token 仅存在于服务端 runtimeConfig，
 * 客户端不再接触。上游失败时返回 null（200），保证 ISR/预渲染不被外部 API 拖垮。
 */
export default defineEventHandler(async (event): Promise<GithubLanguagesDTO | null> => {
  if (event.method !== "GET") {
    throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
  }

  const config = useRuntimeConfig();

  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (config.githubToken) {
      headers.Authorization = `Bearer ${config.githubToken}`;
    }

    const username = siteConfig.github.username;
    const resp = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
      { headers, signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS) }
    );
    if (!resp.ok) {
      console.warn(`GitHub upstream: ${resp.status}`);
      return null;
    }

    const repos = (await resp.json()) as { language?: string | null }[];
    if (!Array.isArray(repos)) return null;

    const counts = new Map<string, number>();
    for (const repo of repos) {
      if (!repo.language) continue;
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }
    const total = [...counts.values()].reduce((sum, n) => sum + n, 0);
    if (total === 0) return { languages: [] };

    const languages = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, TOP_N)
      .map(([name, count]) => ({ name, percent: Math.round((count / total) * 100) }));

    setResponseHeader(event, "Cache-Control", "public, max-age=600");
    return { languages };
  } catch (error) {
    console.warn("GitHub proxy failed:", error);
    return null;
  }
});
