<template>
    <section class="card">
        <h2>GitHub</h2>
        <div class="heatmap">
            <h3>提交热力图</h3>
            <p class="muted">我的提交热力图 · Acitivity Heatmap</p>
            <img :src="github.heatmapUrl" alt="GitHub Heatmap" loading="lazy" />
        </div>
        <div class="lang-wrap">
            <h3>常用语言</h3>
            <p class="muted">我常用的语言 · Languages</p>
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
    </section>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({ github: Object });
const github = props.github;

const palette = ["#7cc1ff", "#6bdba6", "#ffd166", "#f497da", "#9b8cfc", "#5ce1e6", "#ffa3a3"];

const topLanguages = computed(() => (Array.isArray(github.languages) ? github.languages.slice(0, 5) : []));

const colorFor = (name) => {
    const idx = github.languages.findIndex((l) => l.name === name);
    return palette[(idx >= 0 ? idx : 0) % palette.length];
};
const barStyle = (lang) => ({
    width: `${Math.max(8, lang.percent)}%`,
    background: colorFor(lang.name),
});
</script>

<style scoped>
.panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
h2 {
    margin: 0 0 4px;
}
h3 {
    margin: 0 0 4px;
}
.muted {
    margin: 0 0 12px;
    display: block;
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
@media (max-width: 640px) {
    .lang-chart {
        grid-template-columns: 1fr;
    }
    .pie {
        margin: 0 auto;
    }
}
</style>
