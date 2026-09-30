import { defineEventHandler, getQuery, createError, setResponseHeader } from "h3";
import { useRuntimeConfig } from "#imports";
import type { WakatimeResponse } from "~/types/api";

/** 允许的上游主机白名单（Q19-C）；地址只能来自服务端 runtimeConfig，query 参数一律忽略。 */
const ALLOWED_HOSTS = new Set(["wakatime.com", "api.wakatime.com", "wakapi.rhen.cloud"]);

const UPSTREAM_TIMEOUT_MS = 8000;

function isAllowedUrl(raw: string): boolean {
  try {
    return ALLOWED_HOSTS.has(new URL(raw).hostname);
  } catch {
    return false;
  }
}

export default defineEventHandler(async (event): Promise<WakatimeResponse> => {
  if (event.method !== "GET") {
    throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
  }

  // 忽略任何客户端传入的 apiUrl/query，上游地址只信服务端配置（消除 SSRF 面）
  void getQuery(event);

  const config = useRuntimeConfig();
  const apiKey = config.wakapiApiKey;
  const apiUrl = config.wakapiApiUrl;

  if (!apiKey || !apiUrl) {
    return { weekly: null, allTime: null };
  }
  if (!isAllowedUrl(apiUrl)) {
    console.error("Wakapi upstream host not allowed:", apiUrl);
    throw createError({ statusCode: 500, statusMessage: "Failed to fetch coding stats" });
  }

  // WakaTime v1 规范：Basic base64("<api_key>:")，冒号不可省
  const auth = "Basic " + Buffer.from(`${apiKey}:`).toString("base64");
  const headers = { Authorization: auth };

  try {
    const [weeklyRes, allTimeRes] = await Promise.all([
      fetch(`${apiUrl}/users/current/stats/last_7_days`, {
        headers,
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      }),
      fetch(`${apiUrl}/users/current/stats/all_time`, {
        headers,
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      }),
    ]);

    if (!weeklyRes.ok) {
      throw new Error(`upstream stats: ${weeklyRes.status}`);
    }
    const weeklyData = (await weeklyRes.json()) as { data?: WakatimeResponse["weekly"] };
    const allTimeData = allTimeRes.ok
      ? ((await allTimeRes.json()) as { data?: WakatimeResponse["allTime"] })
      : null;

    // 同源代理响应无需 CORS；短缓存配合 ISR 降低上游压力
    setResponseHeader(event, "Cache-Control", "public, max-age=60");

    return { weekly: weeklyData.data ?? null, allTime: allTimeData?.data ?? null };
  } catch (error) {
    console.error("Wakapi proxy error:", error);
    throw createError({ statusCode: 500, statusMessage: "Failed to fetch coding stats" });
  }
});
