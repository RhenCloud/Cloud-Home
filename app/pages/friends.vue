<template>
  <main class="page">
    <FriendsSection :friends="friends" />
  </main>
</template>

<script setup>
import FriendsSection from "~/components/FriendsSection.vue";
import siteConfig from "~/config/siteConfig";

const friends = siteConfig.friends;

definePageMeta({
  order: 4,
  label: "友链",
});
</script>
