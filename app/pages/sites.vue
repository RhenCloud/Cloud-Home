<template>
    <main class="page">
        <SitesSection :sites="sites" />
    </main>
</template>

<script setup>
import SitesSection from "~/components/SitesSection.vue";
import siteConfig from "~/config/siteConfig";

const sites = siteConfig.sites;

definePageMeta({
    order: 2,
    label: "网站",
});
</script>
