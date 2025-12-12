<template>
    <section class="card">
        <div class="header">
            <h2>开发统计</h2>
            <div class="tabs">
                <button class="tab-button" :class="{ active: activeTab === 'github' }" @click="activeTab = 'github'">
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
                <img :src="github.heatmapUrl" alt="GitHub Heatmap" loading="lazy" />
            </div>
            <div class="lang-wrap">
                <h3>常用语言</h3>
                <p class="muted">我常用的语言 · Languages</p>
                <div class="lang-chart">
                    <ul class="list lang-list">
                        <li v-for="lang in githubLanguages" :key="lang.name" class="lang-row">
                            <div class="lang-label">
                                <span class="dot" :style="{ background: colorFor(lang.name, 'github') }"></span>
                                <span class="lang-name">{{ lang.name }}</span>
                                <span class="lang-percent">{{ lang.percent }}%</span>
                            </div>
                            <div class="lang-bar">
                                <span class="lang-bar-fill" :style="barStyle(lang, 'github')"></span>
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
                            currentWakatimeData?.total_seconds ? formatTime(currentWakatimeData.total_seconds) : "N/A"
                        }}</span>
                        <span class="stat-label">总时间</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">{{
                            currentWakatimeData?.daily_average ? formatTime(currentWakatimeData.daily_average) : "N/A"
                        }}</span>
                        <span class="stat-label">日均</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">{{ currentWakatimeData?.days_including_holidays ?? "N/A" }}</span>
                        <span class="stat-label">活跃天数</span>
                    </div>
                </div>
            </div>

            <div class="lang-wrap" v-if="currentWakatimeData?.languages && currentWakatimeData.languages.length">
                <h3>编程语言</h3>
                <p class="muted">语言使用统计 · Languages</p>
                <div class="lang-chart">
                    <ul class="list lang-list">
                        <li v-for="lang in wakatimeLanguages" :key="lang.name" class="lang-row">
                            <div class="lang-label">
                                <span class="dot" :style="{ background: colorFor(lang.name, 'wakatime') }"></span>
                                <span class="lang-name">{{ lang.name }}</span>
                                <span class="lang-percent">{{ lang.percent }}%</span>
                            </div>
                            <div class="lang-bar">
                                <span class="lang-bar-fill" :style="barStyle(lang, 'wakatime')"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="wakatime-tabs" v-if="allTimeData">
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

            <div class="status-wrap" v-if="statusData">
                <h3>当前状态</h3>
                <p class="muted">实时状态 · Current Status</p>
                <div class="status-item">
                    <span class="status-indicator" :class="{ active: statusData.is_coding }"></span>
                    <span class="status-text">{{ statusData.is_coding ? "正在编码" : "未在编码" }}</span>
                    <span class="status-project" v-if="statusData.project">{{ statusData.project }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";

const props = defineProps({ github: Object, wakatime: Object });
const github = props.github;
const wakatime = props.wakatime;

const activeTab = ref("github");
const wakatimeActiveTab = ref("weekly");

const weeklyData = ref(null);
const allTimeData = ref(null);
const statusData = ref(null);
const showComponent = ref(true);

const githubPalette = ["#7cc1ff", "#6bdba6", "#ffd166", "#f497da", "#9b8cfc", "#5ce1e6", "#ffa3a3"];
const wakatimePalette = ["#7cc1ff", "#6bdba6", "#ffd166", "#f497da", "#9b8cfc", "#5ce1e6", "#ffa3a3"];

const githubLanguages = computed(() => (Array.isArray(github.languages) ? github.languages.slice(0, 5) : []));

const currentWakatimeData = computed(() => {
    return wakatimeActiveTab.value === "weekly" ? weeklyData.value : allTimeData.value;
});

const wakatimeLanguages = computed(() => {
    if (!currentWakatimeData.value || !currentWakatimeData.value.languages) return [];
    return currentWakatimeData.value.languages.slice(0, 5);
});

const colorFor = (name, type) => {
    const palette = type === "github" ? githubPalette : wakatimePalette;
    const languages = type === "github" ? github.languages : currentWakatimeData.value?.languages || [];
    const idx = languages.findIndex((l) => l.name === name);
    return palette[(idx >= 0 ? idx : 0) % palette.length];
};

const barStyle = (lang, type) => ({
    width: `${Math.max(8, lang.percent)}%`,
    background: colorFor(lang.name, type),
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
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
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

.status-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    margin-top: 1rem;
}

.status-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #a8b3cf;
}

.status-indicator.active {
    background: #6bdba6;
}

.status-text {
    font-weight: 500;
}

.status-project {
    color: #a8b3cf;
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
