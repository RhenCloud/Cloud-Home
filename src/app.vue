<template>
    <div class="app-shell" :style="backgroundStyle">
        <div class="background-overlay" :style="overlayStyle"></div>
        <button
            class="background-toggle"
            @click="hideComponents = !hideComponents"
            :title="hideComponents ? '显示内容' : '隐藏内容'"
            :class="{ active: hideComponents }"
        >
            <span class="toggle-icon">{{ hideComponents ? "👁️" : "🙈" }}</span>
            <span class="toggle-label">{{ hideComponents ? "显示" : "隐藏" }}</span>
        </button>
        <div class="content-stack">
            <Transition name="fade-down">
                <main class="app-body" v-if="!hideComponents" key="content">
                    <NuxtPage />
                </main>
            </Transition>
            <Transition name="fade-up">
                <PageSwitcher v-if="!hideComponents" key="switcher" />
            </Transition>
            <Transition name="fade-down">
                <FooterSection v-if="!hideComponents" :contact="contact" key="footer" />
            </Transition>
        </div>
        <MusicPlayer />
    </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import PageSwitcher from "~/components/PageSwitcher.vue";
import FooterSection from "~/components/FooterSection.vue";
import MusicPlayer from "~/components/MusicPlayer.vue";
import siteConfig from "~/config/siteConfig";

const contact = siteConfig.footer;
const bg = siteConfig.appearance.background;
const isMobile = ref(false);
const hideComponents = ref(false);

const checkIfMobile = () => {
    isMobile.value = typeof window !== "undefined" && window.innerWidth <= 768;
};

onMounted(() => {
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    // const script = document.createElement("script");
    // script.src = "/js/netease-mini-player-v2.js";
    // document.head.appendChild(script);
});

const getBackgroundImage = () => {
    if (!bg.enable) return undefined;

    const image = isMobile.value && bg.mobileImage ? bg.mobileImage : bg.image;

    if (!image) return undefined;

    return image.startsWith("http") ? image : `/${image}`;
};

const backgroundStyle = computed(() => ({ backgroundColor: "#0f1629" }));

const overlayStyle = computed(() => {
    const imageUrl = getBackgroundImage();

    if (!bg.enable || !imageUrl) return {};

    return {
        backgroundImage: `linear-gradient(${bg.overlay}, ${bg.overlay}), url('${imageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        filter: bg.blur ? `blur(${bg.blur}px)` : undefined,
    };
});
</script>

<!-- <style>
@import "/css/netease-mini-player-v2.css";
</style> -->
