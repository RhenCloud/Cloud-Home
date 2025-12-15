<template>
    <footer class="card text-center mt-auto w-full flex flex-col gap-1">
        <!-- 一言 -->
        <p class="text-text-muted text-sm m-0 italic" v-if="showHitokoto && quote">
            「{{ quote }}」<span v-if="from" class="ml-1.5">—— {{ from }}</span>
        </p>

        <!-- 访问统计 -->
        <p class="text-text-muted text-xs m-0" v-if="showStats && !statsError">
            👁️ {{ visitors }} · 📊 {{ pageviews }}
        </p>

        <!-- 备案信息 -->
        <p class="text-text-muted text-xs m-0" v-if="contact.beian">
            <a :href="contact.beianLink || 'https://beian.miit.gov.cn/'" target="_blank" rel="noreferrer"
                class="opacity-85 transition-all duration-200 hover:text-primary hover:opacity-100">
                {{ contact.beian }}
            </a>
        </p>

        <!-- 框架与技术栈信息 -->
        <p class="text-text-muted text-xs m-0">
            Powered by
            <a href="https://nuxt.com" target="_blank" rel="noreferrer"
                class="text-primary hover:text-accent transition-colors">Nuxt 4</a>
            ·
            <a href="https://tailwindcss.com" target="_blank" rel="noreferrer"
                class="text-primary hover:text-accent transition-colors">Tailwind CSS</a>
            ·
            <a href="https://vuejs.org" target="_blank" rel="noreferrer"
                class="text-primary hover:text-accent transition-colors">Vue 3</a>
        </p>

        <!-- 自定义 HTML -->
        <div v-if="contact.customHtml" v-html="contact.customHtml"></div>
    </footer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRuntimeConfig } from "#imports";
import siteConfig from "~/config/siteConfig";
const props = defineProps({ contact: Object });
const config = useRuntimeConfig();
const quote = ref("");
const from = ref("");
const pageviews = ref(0);
const visitors = ref(0);
const statsError = ref(true);
const showHitokoto = siteConfig.footer?.hitokoto?.enable;
const showStats = ref(siteConfig.umami?.enable);

const buildHitokotoUrl = () => {
    const type = siteConfig.footer?.hitokoto?.type;
    const url = new URL("https://v1.hitokoto.cn/");
    if (Array.isArray(type)) {
        type.filter(Boolean).forEach((t) => url.searchParams.append("c", t));
    } else if (typeof type === "string") {
        type.split("&")
            .map((t) => t.trim())
            .filter(Boolean)
            .forEach((t) => url.searchParams.append("c", t));
    }
    return url.toString();
};

const fetchHitokoto = async () => {
    try {
        const resp = await fetch(buildHitokotoUrl());
        const data = await resp.json();
        quote.value = data.hitokoto || "";
        from.value = data.from || "";
    } catch (e) {
        console.warn("Hitokoto fetch failed", e);
    }
};

const fetchStats = async () => {
    try {
        if (!siteConfig.umami?.apiBase || !siteConfig.umami?.websiteId) {
            return;
        }
        const apiBase = siteConfig.umami.apiBase;
        const websiteId = siteConfig.umami.websiteId;
        const apiKey = config.public.umamiApiKey;

        if (!apiKey) return;

        // 获取统计数据
        const endAt = Date.now();
        const startAt = new Date(siteConfig.siteMeta.startDate).getTime();

        const resp = await fetch(`${apiBase}/v1/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        if (!resp.ok) {
            console.warn(`Stats API returned ${resp.status}`);
            statsError.value = true;
            return;
        }

        const data = await resp.json();
        if (data) {
            statsError.value = false;
            pageviews.value = data.pageviews;
            visitors.value = data.visitors;
        }

        if (pageviews.value === 0 && visitors.value === 0) {
            showStats.value = false;
        }
    } catch (e) {
        statsError.value = true;
        console.debug("Stats fetch failed (this is normal if blocked by ad blocker):", e.message);
    }
};

onMounted(() => {
    if (showHitokoto) fetchHitokoto();
    if (showStats.value) fetchStats();
});
</script>
