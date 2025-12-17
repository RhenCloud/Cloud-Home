<template>
    <section class="card flex flex-col gap-2.5">
        <h2 class="m-0 mb-1 text-lg font-semibold">社交链接</h2>
        <p class="text-text-muted text-sm m-0 mb-3 block">社交账号 · Links</p>
        <div class="flex flex-wrap gap-2.5">
            <a v-for="link in links" :key="link.url" :href="link.url" target="_blank" rel="noreferrer"
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-text-primary text-sm font-medium transition-all duration-200 hover:bg-primary/20 hover:border-primary/40 hover:text-primary hover:-translate-y-1">
                <span v-if="iconFor(link)" class="inline-flex items-center justify-center w-5 h-5">
                    <i v-if="iconFor(link).fa" :class="iconFor(link).fa"></i>
                    <img v-else :src="iconFor(link).src" :alt="link.name" loading="lazy" class="w-full h-full" />
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
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css?font-display=swap";
    link.crossOrigin = "anonymous";
    link.referrerPolicy = "no-referrer";
    document.head.appendChild(link);
});
</script>
