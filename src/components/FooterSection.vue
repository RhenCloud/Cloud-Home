<template>
    <footer class="card footer">
        <p class="muted" v-if="showHitokoto && quote">
            「{{ quote }}」<span v-if="from" class="from">—— {{ from }}</span>
        </p>
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
const props = defineProps({ contact: Object });
const quote = ref("");
const from = ref("");
const showHitokoto = props.contact?.showHitokoto !== false;

const buildHitokotoUrl = () => {
    const url = new URL("https://v1.hitokoto.cn/");
    const type = props.contact?.hitokotoType;
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

onMounted(() => {
    if (showHitokoto) fetchHitokoto();
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
</style>
