<template>
    <main class="page">
        <HeroSection :profile="profile" />
        <SocialLinks :links="socialLinks" />
        <AboutSection :items="about" :profile="profile" />
    </main>
</template>

<script setup>
import HeroSection from "~/components/HeroSection.vue";
import SocialLinks from "~/components/SocialLinks.vue";
import AboutSection from "~/components/AboutSection.vue";
import siteConfig from "~/config/siteConfig";

const profile = siteConfig.profile;
const socialLinks = siteConfig.socialLinks;
const about = siteConfig.about;

definePageMeta({
    order: 0,
    label: "首页",
});
</script>
