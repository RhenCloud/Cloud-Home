<template>
    <section class="card flex flex-col gap-2.5">
        <h2 class="m-0 mb-1">GitHub</h2>
        <div class="mt-3">
            <h3 class="m-0 mb-1">提交热力图</h3>
            <p class="text-text-muted text-sm m-0 mb-3 block">我的提交热力图 · Acitivity Heatmap</p>
            <img :src="github.heatmapUrl" alt="GitHub Heatmap" loading="lazy"
                class="rounded-xl border border-white/10 hover:border-primary/30 transition-all duration-200"
                class="w-full rounded-2xl border border-white/10" />
        </div>
        <div class="mt-3">
            <h3 class="m-0 mb-1">常用语言</h3>
            <p class="text-text-muted text-sm m-0 mb-3 block">我常用的语言 · Languages</p>
            <ul class="list-none p-0 m-0 flex flex-col gap-2.5">
                <li v-for="lang in topLanguages" :key="lang.name"
                    class="bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <div class="flex items-center gap-2 font-semibold mb-1.5">
                        <span class="w-2.5 h-2.5 rounded-full inline-block"
                            :style="{ background: colorFor(lang.name) }"></span>
                        <span class="text-text-primary">{{ lang.name }}</span>
                        <span class="text-text-muted text-sm">{{ lang.percent }}%</span>
                    </div>
                    <div class="h-2 rounded-full bg-white/5 overflow-hidden">
                        <span class="block h-full rounded-full transition-all duration-300"
                            :style="barStyle(lang)"></span>
                    </div>
                </li>
            </ul>
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
