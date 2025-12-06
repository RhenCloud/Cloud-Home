<template>
    <section class="card panel">
        <h2>社交链接</h2>
        <p class="muted">社交账号 · Links</p>
        <div class="chips">
            <a v-for="link in links" :key="link.url" :href="link.url" target="_blank" rel="noreferrer">
                <span v-if="iconFor(link)" class="icon">
                    <i v-if="iconFor(link).fa" :class="iconFor(link).fa"></i>
                    <img v-else :src="iconFor(link).src" :alt="link.name" loading="lazy" />
                </span>
                <span>{{ link.name }}</span>
            </a>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from "vue";
const props = defineProps({ links: Array });

const iconMap = {
    bilibili: "fa-brands fa-bilibili",
    github: "fa-brands fa-github",
    blog: "fa-solid fa-rss",
    email: "fa-solid fa-envelope",
    mail: "fa-solid fa-envelope",
    telegram: "fa-brands fa-telegram",
    twitter: "fa-brands fa-x-twitter",
    x: "fa-brands fa-x-twitter",
    linkedin: "fa-brands fa-linkedin",
    youtube: "fa-brands fa-youtube",
    facebook: "fa-brands fa-facebook",
    instagram: "fa-brands fa-instagram",
    reddit: "fa-brands fa-reddit",
    discord: "fa-brands fa-discord",
    weibo: "fa-brands fa-weibo",
    zhihu: "fa-brands fa-zhihu",
    wechat: "fa-brands fa-weixin",
    weixin: "fa-brands fa-weixin",
    qq: "fa-brands fa-qq",
};

const iconFor = (link) => {
    const key = (link.name || "").toLowerCase();
    if (iconMap[key]) return { fa: iconMap[key] };
    if (link.icon) return { src: link.icon };
    return null;
};

onMounted(() => {
    const id = "fa-cdn";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
    link.crossOrigin = "anonymous";
    link.referrerPolicy = "no-referrer";
    document.head.appendChild(link);
});
</script>

<style scoped>
h2 {
    margin: 0 0 4px;
}
.muted {
    margin: 0 0 12px;
    display: block;
}
.chips {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
}
.icon {
    display: inline-flex;
    width: 18px;
    height: 18px;
    align-items: center;
    justify-content: center;
}
.icon i,
.icon img {
    width: 18px;
    height: 18px;
}
</style>
