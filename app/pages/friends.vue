<template>
  <main class="page">
    <FriendsSection :friends="friends" />
  </main>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
import FriendsSection from "~/components/FriendsSection.vue";
import { siteConfig } from "~/config";

const friends = siteConfig.friends;

definePageMeta({
  order: 4,
  label: "友链",
});
</script>
