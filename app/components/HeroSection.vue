<template>
  <section class="card grid grid-cols-[120px_1fr] gap-4 items-center hover:shadow-lg-dark group">
    <div class="relative">
      <div
        class="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"
      />
      <NuxtImg
        class="relative w-30 h-30 rounded-full object-cover border-2 border-primary/40 shadow-md-dark bg-white transition-transform duration-300 group-hover:scale-105"
        :src="profile.avatar"
        alt="avatar"
        loading="eager"
      />
    </div>
    <div class="overflow-hidden">
      <h1 class="text-2xl font-bold">{{ profile.name }}</h1>
      <p class="text-text-muted text-sm mt-1">{{ profile.title }}</p>
      <p class="mt-2 line-clamp-2">{{ profile.bio }}</p>
    </div>
  </section>
</template>

<script setup>
import siteConfig from "../config/siteConfig";

const { profile } = defineProps({
  profile: {
    type: Object,
    required: false,
    default: () => siteConfig.profile || {},
  },
});
</script>
