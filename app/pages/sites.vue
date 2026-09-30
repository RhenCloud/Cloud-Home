<template>
  <main class="page">
    <SitesSection :sites="sites" />
  </main>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
import SitesSection from "~/components/SitesSection.vue";
import { siteConfig } from "~/config";

const sites = siteConfig.sites;

definePageMeta({
  order: 2,
  label: "网站",
});
</script>
