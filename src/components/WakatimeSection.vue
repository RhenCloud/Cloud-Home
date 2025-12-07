<template>
    <section class="card" v-if="showComponent && (weeklyData || allTimeData)">
        <div class="header">
            <h2>Wakatime</h2>
            <div class="tabs">
                <button class="tab-button" :class="{ active: activeTab === 'weekly' }" @click="activeTab = 'weekly'">
                    最近7天
                </button>
                <button
                    class="tab-button"
                    :class="{ active: activeTab === 'allTime' }"
                    @click="activeTab = 'allTime'"
                    v-if="allTimeData"
                >
                    所有时间
                </button>
            </div>
        </div>

        <div class="stats-wrap">
            <h3>编码统计</h3>
            <p class="muted">{{ activeTab === "weekly" ? "最近7天 · Last 7 Days" : "所有时间 · All Time" }}</p>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-value">{{
                        currentData.total_seconds ? formatTime(currentData.total_seconds) : "N/A"
                    }}</span>
                    <span class="stat-label">总时间</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{{
                        currentData.daily_average ? formatTime(currentData.daily_average) : "N/A"
                    }}</span>
                    <span class="stat-label">日均</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{{ currentData.days_including_holidays || "N/A" }}</span>
                    <span class="stat-label">活跃天数</span>
                </div>
            </div>
        </div>

        <div class="lang-wrap" v-if="currentData.languages && currentData.languages.length">
            <h3>编程语言</h3>
            <p class="muted">语言使用统计 · Languages</p>
            <div class="lang-chart">
                <ul class="list lang-list">
                    <li v-for="lang in topLanguages" :key="lang.name" class="lang-row">
                        <div class="lang-label">
                            <span class="dot" :style="{ background: colorFor(lang.name) }"></span>
                            <span class="lang-name">{{ lang.name }}</span>
                            <span class="lang-percent">{{ lang.percent }}%</span>
                        </div>
                        <div class="lang-bar">
                            <span class="lang-bar-fill" :style="barStyle(lang)"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="status-wrap" v-if="statusData">
            <h3>当前状态</h3>
            <p class="muted">实时状态 · Current Status</p>
            <div class="status-item">
                <span class="status-indicator" :class="{ active: statusData.is_coding }"></span>
                <span class="status-text">{{ statusData.is_coding ? "正在编码" : "未在编码" }}</span>
                <span class="status-project" v-if="statusData.project">{{ statusData.project }}</span>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const props = defineProps({ wakatime: Object });
const wakatime = props.wakatime;

const weeklyData = ref(null);
const allTimeData = ref(null);
const statusData = ref(null);
const showComponent = ref(true);
const activeTab = ref("weekly");

const palette = ["#7cc1ff", "#6bdba6", "#ffd166", "#f497da", "#9b8cfc", "#5ce1e6", "#ffa3a3"];

const currentData = computed(() => {
    return activeTab.value === "weekly" ? weeklyData.value : allTimeData.value;
});

const topLanguages = computed(() => {
    if (!currentData.value || !currentData.value.languages) return [];
    return currentData.value.languages.slice(0, 5);
});

const colorFor = (name) => {
    const idx = currentData.value.languages.findIndex((l) => l.name === name);
    return palette[(idx >= 0 ? idx : 0) % palette.length];
};

const barStyle = (lang) => ({
    width: `${Math.max(8, lang.percent)}%`,
    background: colorFor(lang.name),
});

const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
};

const fetchWakatimeData = async () => {
    if (!wakatime.enable) return;

    try {
        const params = new URLSearchParams();
        if (wakatime.apiUrl && wakatime.apiUrl !== "https://wakatime.com/api/v1") {
            params.append("apiUrl", wakatime.apiUrl);
        }
        const url = `/api/wakatime${params.toString() ? `?${params.toString()}` : ""}`;
        console.log("Fetching Wakatime data from:", url);
        const response = await fetch(url);
        console.log("Response status:", response.status);
        console.log("Response headers:", Object.fromEntries(response.headers.entries()));

        if (response.ok) {
            const data = await response.json();
            console.log("Wakatime data:", data);
            weeklyData.value = data.weekly;
            allTimeData.value = data.allTime;
            statusData.value = data.status;
        } else {
            const errorText = await response.text();
            console.error("API Error:", response.status, errorText);
            if (response.status === 500 && errorText.includes("Wakatime API Key not configured")) {
                console.warn("Wakatime API Key not configured - hiding component");
                showComponent.value = false;
                return;
            }
            throw new Error(`API returned ${response.status}: ${errorText}`);
        }
    } catch (error) {
        console.error("Failed to fetch Wakatime data:", error);
        // 在开发环境中，如果 API 不可用，设置一些示例数据
        if (import.meta.env.DEV) {
            console.log("Using mock data for development");
            weeklyData.value = {
                total_seconds: 36000,
                daily_average: 5142,
                days_including_holidays: 7,
                languages: [
                    { name: "TypeScript", percent: 45.2, total_seconds: 16272 },
                    { name: "Vue", percent: 30.1, total_seconds: 10836 },
                    { name: "JavaScript", percent: 15.3, total_seconds: 5508 },
                    { name: "Python", percent: 9.4, total_seconds: 3384 },
                ],
            };
            allTimeData.value = {
                total_seconds: 864000,
                daily_average: 2800,
                days_including_holidays: 308,
                languages: [
                    { name: "JavaScript", percent: 35.2, total_seconds: 304128 },
                    { name: "TypeScript", percent: 28.1, total_seconds: 242688 },
                    { name: "Python", percent: 20.3, total_seconds: 175392 },
                    { name: "Vue", percent: 10.1, total_seconds: 87296 },
                    { name: "CSS", percent: 6.3, total_seconds: 54432 },
                ],
            };
            statusData.value = { is_coding: false };
        }
    }
};

onMounted(() => {
    fetchWakatimeData();
});
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
    border: 1px solid var(--border);
    background: var(--card-bg);
    color: var(--text);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.875rem;
}

.tab-button:hover {
    background: var(--hover-bg);
}

.tab-button.active {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
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
    background: var(--card-bg);
    border-radius: 8px;
    border: 1px solid var(--border);
}

.stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--text);
    margin-bottom: 0.5rem;
}

.stat-label {
    font-size: 0.875rem;
    color: var(--muted);
}

.status-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: var(--card-bg);
    border-radius: 8px;
    border: 1px solid var(--border);
    margin-top: 1rem;
}

.status-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--muted);
}

.status-indicator.active {
    background: #6bdba6;
}

.status-text {
    font-weight: 500;
}

.status-project {
    color: var(--muted);
    font-size: 0.875rem;
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
</style>
