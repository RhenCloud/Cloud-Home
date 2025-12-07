<template>
    <footer class="card footer">
        <p class="muted" v-if="showHitokoto && quote">
            「{{ quote }}」<span v-if="from" class="from">—— {{ from }}</span>
        </p>
        <p class="muted stats" v-if="showStats && !statsError">
            👁️ {{ visitors }} visitors · 📊 {{ pageviews }} pageviews
        </p>
        <!-- <p class="muted stats" v-if="showStats && statsError">🔒 由于启用了隐私保护拓展，禁用状态统计</p> -->
        <p class="muted beian" v-if="contact.beian">
            <a :href="contact.beianLink || 'https://beian.miit.gov.cn/'" target="_blank" rel="noreferrer">
                {{ contact.beian }}
            </a>
        </p>
        <div class="custom-html" v-if="contact.customHtml" v-html="contact.customHtml"></div>
    </footer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import siteConfig from "../config/siteConfig";
const props = defineProps({ contact: Object });
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
        const apiKey = import.meta.env.VITE_UMAMI_API_KEY;

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

<style scoped>
.footer {
    text-align: center;
    margin-top: 8px;
}

.from {
    margin-left: 6px;
}

.beian {
    font-size: 12px;
    margin: 6px 0;
    letter-spacing: 0.2px;
}

.beian a {
    color: inherit;
    opacity: 0.85;
    padding: 3px 8px;
    border-radius: 8px;
    transition: color 0.2s ease, background 0.2s ease, opacity 0.2s ease;
}

.beian a:hover {
    color: var(--accent, #7cc1ff);
    background: rgba(124, 193, 255, 0.1);
    opacity: 1;
}

.custom-html {
    margin-top: 6px;
}

.stats {
    font-size: 12px;
    margin: 6px 0;
    letter-spacing: 0.2px;
}
</style>
