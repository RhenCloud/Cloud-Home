<template>
  <section class="card">
    <div class="header">
      <h2 class="m-0 mb-1 font-semibold">开发统计</h2>
      <div class="tabs">
        <button
          class="tab-button"
          :class="{ active: activeTab === 'github' }"
          @click="activeTab = 'github'"
        >
          GitHub
        </button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'wakatime' }"
          @click="activeTab = 'wakatime'"
        >
          Wakatime
        </button>
      </div>
    </div>

    <!-- GitHub 内容 -->
    <div v-if="activeTab === 'github'">
      <div class="heatmap">
        <h3>提交热力图</h3>
        <p class="muted">我的提交热力图 · Activity Heatmap</p>
        <NuxtImg :src="github.heatmapUrl" alt="GitHub Heatmap" loading="lazy" />
      </div>
      <div class="lang-wrap">
        <h3>常用语言</h3>
        <p class="muted">我常用的语言 · Languages</p>
        <div class="lang-chart">
          <ul class="list lang-list">
            <li v-for="lang in githubLanguages" :key="lang.name" class="lang-row">
              <div class="lang-label">
                <span class="dot" :style="{ background: colorFor(lang.name, 'github') }" />
                <span class="lang-name">{{ lang.name }}</span>
                <span class="lang-percent">{{ lang.percent }}%</span>
              </div>
              <div class="lang-bar">
                <span class="lang-bar-fill" :style="barStyle(lang, 'github')" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Wakatime 内容 -->
    <div v-if="activeTab === 'wakatime'">
      <div class="stats-wrap">
        <h3>编码统计</h3>
        <p class="muted">
          {{ wakatimeActiveTab === "weekly" ? "最近7天 · Last 7 Days" : "所有时间 · All Time" }}
        </p>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-value">{{
              currentWakatimeData?.total_seconds
                ? formatTime(currentWakatimeData.total_seconds)
                : "N/A"
            }}</span>
            <span class="stat-label">总时间</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{
              currentWakatimeData?.daily_average
                ? formatTime(currentWakatimeData.daily_average)
                : "N/A"
            }}</span>
            <span class="stat-label">日均</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{
              currentWakatimeData?.days_including_holidays ?? "N/A"
            }}</span>
            <span class="stat-label">统计天数</span>
          </div>
        </div>
      </div>

      <div
        v-if="currentWakatimeData?.languages && currentWakatimeData.languages.length"
        class="lang-wrap"
      >
        <h3>编程语言</h3>
        <p class="muted">语言使用统计 · Languages</p>
        <div class="lang-chart">
          <ul class="list lang-list">
            <li v-for="lang in wakatimeLanguages" :key="lang.name" class="lang-row">
              <div class="lang-label">
                <span class="dot" :style="{ background: colorFor(lang.name, 'wakatime') }" />
                <span class="lang-name">{{ lang.name }}</span>
                <span class="lang-percent">{{ lang.percent }}%</span>
              </div>
              <div class="lang-bar">
                <span class="lang-bar-fill" :style="barStyle(lang, 'wakatime')" />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="allTimeData" class="wakatime-tabs">
        <div class="wakatime-mini-tabs">
          <button
            class="wakatime-tab-button"
            :class="{ active: wakatimeActiveTab === 'weekly' }"
            @click="wakatimeActiveTab = 'weekly'"
          >
            最近7天
          </button>
          <button
            class="wakatime-tab-button"
            :class="{ active: wakatimeActiveTab === 'allTime' }"
            @click="wakatimeActiveTab = 'allTime'"
          >
            所有时间
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useFetch } from "#imports";
import type { WakapiConfig } from "~/types/site";
import type { GithubStats, LangStat, WakatimeResponse } from "~/types/api";

const props = withDefaults(
  defineProps<{
    github?: GithubStats;
    wakapi?: WakapiConfig;
  }>(),
  {
    github: () => ({ username: "", heatmapUrl: "" }),
    wakapi: () => ({ enable: false, apiUrl: "", username: "" }),
  }
);
const github = props.github;
const wakapi = props.wakapi;

const activeTab = ref("github");
const wakatimeActiveTab = ref<"weekly" | "allTime">("weekly");

/**
 * wakapi 关闭时不调用 useFetch，零请求。
 * 不用 `skip`：Nuxt 的 `skip` 与 `default` 在 vue-tsc 下类型重载冲突
 * （default 泛型槽被推断为 Ref<undefined>，TS2769）。
 */
const wakaData = wakapi.enable
  ? useFetch<WakatimeResponse>("/api/wakatime", {
      server: false,
      lazy: true,
      default: () => ({ weekly: null, allTime: null }),
    }).data
  : ref<WakatimeResponse>({ weekly: null, allTime: null });

const weeklyData = computed(() => wakaData.value.weekly);
const allTimeData = computed(() => wakaData.value.allTime);

const githubPalette = ["#7cc1ff", "#6bdba6", "#ffd166", "#f497da", "#9b8cfc", "#5ce1e6", "#ffa3a3"];
const wakatimePalette = [
  "#7cc1ff",
  "#6bdba6",
  "#ffd166",
  "#f497da",
  "#9b8cfc",
  "#5ce1e6",
  "#ffa3a3",
];

const githubLanguages = computed<LangStat[]>(() =>
  Array.isArray(github.languages) ? github.languages.slice(0, 5) : []
);

const currentWakatimeData = computed(() => {
  return wakatimeActiveTab.value === "weekly" ? weeklyData.value : allTimeData.value;
});

const wakatimeLanguages = computed(() => {
  if (!currentWakatimeData.value || !currentWakatimeData.value.languages) return [];
  return currentWakatimeData.value.languages.slice(0, 5);
});

type StatsTab = "github" | "wakatime";

const colorFor = (name: string, type: StatsTab): string => {
  const palette = type === "github" ? githubPalette : wakatimePalette;
  const languages: LangStat[] =
    type === "github" ? github.languages || [] : currentWakatimeData.value?.languages || [];
  const idx = languages.findIndex((l) => l.name === name);
  return palette[(idx >= 0 ? idx : 0) % palette.length] as string;
};

const barStyle = (lang: LangStat, type: StatsTab) => ({
  width: `${Math.max(8, lang.percent ?? 0)}%`,
  background: colorFor(lang.name, type),
});

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
}

.tab-button {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: #e8eefc;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.tab-button:hover {
  background: rgba(255, 255, 255, 0.08);
}

.tab-button.active {
  background: #7cc1ff;
  color: white;
  border-color: #7cc1ff;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #e8eefc;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #a8b3cf;
}

.wakatime-tabs {
  margin-top: 1rem;
}

.wakatime-mini-tabs {
  display: flex;
  gap: 0.25rem;
  justify-content: center;
}

.wakatime-tab-button {
  padding: 0.25rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: #e8eefc;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.75rem;
}

.wakatime-tab-button:hover {
  background: rgba(255, 255, 255, 0.08);
}

.wakatime-tab-button.active {
  background: #6bdba6;
  color: white;
  border-color: #6bdba6;
}

.lang-wrap {
  margin-top: 12px;
}

.lang-chart {
  display: block;
}

.lang-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.lang-row {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 8px 10px;
}

.lang-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.lang-name {
  color: #e8eefc;
}

.lang-percent {
  color: #a8b3cf;
  font-size: 0.9rem;
}

.lang-bar {
  margin-top: 6px;
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.lang-bar-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s ease;
}

.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 6px;
}

.heatmap {
  margin-top: 12px;
}

.heatmap img {
  width: 100%;
  display: block;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
