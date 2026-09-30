import { defineEventHandler, createError, setResponseHeader } from "h3";
import { useRuntimeConfig } from "#imports";
import { siteConfig } from "~/config";
import type { UmamiStatsDTO } from "~/types/api";

const UPSTREAM_TIMEOUT_MS = 8000;

/**
 * Umami 统计代理：Bearer key 仅留在服务端（密钥不下发客户端）。
 * 上游失败或未配置时返回 null，前端据此隐藏统计行。
 */
export default defineEventHandler(async (event): Promise<UmamiStatsDTO | null> => {
  if (event.method !== "GET") {
    throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
  }

  const config = useRuntimeConfig();
  const { apiBase, websiteId } = siteConfig.umami;
  if (!config.umamiApiKey || !apiBase || !websiteId) {
    return null;
  }

  try {
    const endAt = Date.now();
    const startAt = new Date(siteConfig.siteMeta.startDate).getTime();
    const url = `${apiBase}/v1/websites/${encodeURIComponent(
      websiteId
    )}/stats?startAt=${startAt}&endAt=${endAt}`;

    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${config.umamiApiKey}` },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    if (!resp.ok) {
      console.warn(`Umami upstream: ${resp.status}`);
      return null;
    }

    const data = (await resp.json()) as { pageviews?: number; visitors?: number };
    setResponseHeader(event, "Cache-Control", "public, max-age=60");
    return { pageviews: data.pageviews ?? 0, visitors: data.visitors ?? 0 };
  } catch (error) {
    console.warn("Umami proxy failed:", error);
    return null;
  }
});
