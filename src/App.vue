<template>
    <div class="app-shell">
        <main class="app-body">
            <router-view />
        </main>
        <PageSwitcher />
        <FooterSection :contact="contact" />
    </div>
</template>

<script setup>
import PageSwitcher from "./components/PageSwitcher.vue";
import FooterSection from "./components/FooterSection.vue";
import siteConfig from "./config/siteConfig";

const contact = siteConfig.footer;
</script>

<style scoped>
.app-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
.app-body {
    flex: 1;
    display: flex;
    flex-direction: column;
}
</style>
