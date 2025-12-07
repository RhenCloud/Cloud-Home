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
        <Transition name="fade-down">
            <main class="app-body" v-if="!hideComponents" key="content">
                <router-view />
            </main>
        </Transition>
        <Transition name="fade-up">
            <PageSwitcher v-if="!hideComponents" key="switcher" />
        </Transition>
        <Transition name="fade-down">
            <FooterSection v-if="!hideComponents" :contact="contact" key="footer" />
        </Transition>
        <!-- 音乐播放器 -->
        <MusicPlayer />
    </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import PageSwitcher from "./components/PageSwitcher.vue";
import FooterSection from "./components/FooterSection.vue";
import MusicPlayer from "./components/MusicPlayer.vue";
import siteConfig from "./config/siteConfig";

const contact = siteConfig.footer;
const bg = siteConfig.appearance.background;
const isMobile = ref(false);
const hideComponents = ref(false);

// 检测是否为移动设备
const checkIfMobile = () => {
    isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
});

const getBackgroundImage = () => {
    if (!bg.enable) return undefined;

    // 根据屏幕尺寸选择图片
    const image = isMobile.value && bg.mobileImage ? bg.mobileImage : bg.image;

    if (!image) return undefined;

    return image.startsWith("http") ? image : `/${image}`;
};

const backgroundStyle = computed(() => {
    const imageUrl = getBackgroundImage();

    if (!imageUrl) return {};

    return {
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        filter: `blur(${bg.blur}px)`,
    };
});

const overlayStyle = computed(() => {
    if (!bg.enable || !getBackgroundImage()) return {};
    return { backgroundColor: bg.overlay };
});
</script>

<style scoped>
.app-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
}

.background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 0;
}

.background-toggle {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: auto;
    padding: 8px 12px;
    border-radius: 50px;
    background: linear-gradient(135deg, rgba(124, 193, 255, 0.15), rgba(124, 193, 255, 0.05));
    border: 1.5px solid rgba(124, 193, 255, 0.3);
    color: #7cc1ff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    backdrop-filter: blur(12px);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 0 8px 32px rgba(124, 193, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    font-family: inherit;
}

.background-toggle:hover {
    background: linear-gradient(135deg, rgba(124, 193, 255, 0.25), rgba(124, 193, 255, 0.1));
    border-color: rgba(124, 193, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(124, 193, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.background-toggle:active {
    transform: translateY(0px);
    box-shadow: 0 4px 16px rgba(124, 193, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.background-toggle.active {
    background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 107, 107, 0.05));
    border-color: rgba(255, 107, 107, 0.4);
    color: #ff6b6b;
}

.background-toggle.active:hover {
    background: linear-gradient(135deg, rgba(255, 107, 107, 0.3), rgba(255, 107, 107, 0.1));
    border-color: rgba(255, 107, 107, 0.6);
    box-shadow: 0 12px 40px rgba(255, 107, 107, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.toggle-icon {
    display: inline-block;
    font-size: 16px;
}

.toggle-label {
    font-size: 12px;
    letter-spacing: 0.5px;
}

@media (max-width: 640px) {
    .background-toggle {
        bottom: 16px;
        right: 16px;
        padding: 8px 10px;
        font-size: 12px;
    }

    .toggle-label {
        display: none;
    }

    .toggle-icon {
        font-size: 14px;
    }
}

.app-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
}

/* 过渡动画 */
/* 上段组件：向上淡出，向下淡入 */
.fade-up-enter-active,
.fade-up-leave-active {
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.fade-up-enter-from {
    opacity: 0;
    transform: translateY(-20px);
}

.fade-up-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

/* 下段组件：向下淡出，向上淡入 */
.fade-down-enter-active,
.fade-down-leave-active {
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.fade-down-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.fade-down-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>
