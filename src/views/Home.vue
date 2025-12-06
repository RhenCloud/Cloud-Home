<template>
    <main class="page">
        <HeroSection :profile="profile" />
        <SocialLinks :links="socialLinks" />
        <AboutSection :items="about" :profile="profile" />
    </main>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import HeroSection from "../components/HeroSection.vue";
import SocialLinks from "../components/SocialLinks.vue";
import AboutSection from "../components/AboutSection.vue";
import siteConfig from "../config/siteConfig";

const profile = siteConfig.profile;
const socialLinks = siteConfig.socialLinks;
const siteMeta = siteConfig.siteMeta;
const about = siteConfig.about;

onMounted(() => {
    document.title = siteMeta.title;
    const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
    link.rel = "icon";
    link.href = siteMeta.icon;
    document.head.appendChild(link);
});
</script>

<style scoped>
.page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}
</style>
