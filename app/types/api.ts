/** 自有 /api/* 代理端点的响应契约（前端消费侧）。 */

/* ---------------- 共享 ---------------- */

export interface LangStat {
  name: string;
  percent?: number;
  count?: number;
}

/* ---------------- /api/github ---------------- */

/** 服务端聚合仓库语言后的原始载荷。 */
export interface GithubLanguagesDTO {
  languages: LangStat[];
}

/** 下发给 StatsSection 的完整 GitHub 视图（heatmap 由前端拼接）。 */
export interface GithubStats {
  username: string;
  heatmapUrl: string;
  languages?: LangStat[];
}

/* ---------------- /api/wakatime（Wakapi 的 WakaTime v1 兼容层） ---------------- */

/**
 * 字段与 wakatime.com 官方一致（由 Wakapi compat 层原样透传）。
 * 注意：days_including_holidays 是"区间总天数"（周=7，all-time=自首次活动以来的跨度），
 * 并非真正的活跃天数，UI 标签按"统计天数"呈现。
 */
export interface WakaStatsDTO {
  from?: string;
  to?: string;
  total_seconds?: number;
  daily_average?: number;
  days_including_holidays?: number;
  languages?: LangStat[];
}

export interface WakatimeResponse {
  weekly: WakaStatsDTO | null;
  allTime: WakaStatsDTO | null;
}

/* ---------------- /api/stats（Umami 代理） ---------------- */

export interface UmamiStatsDTO {
  pageviews: number;
  visitors: number;
}
