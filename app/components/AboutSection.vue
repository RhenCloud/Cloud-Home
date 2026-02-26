<template>
  <section class="card main-section flex flex-col gap-2.5">
    <h2 class="m-0 mb-1">个人简介</h2>
    <p class="text-text-muted text-sm m-0 mb-3 block">关于我 · About Me</p>

    <div class="flex flex-wrap justify-center gap-2 sm:gap-3.5">
      <article
        v-if="age"
        class="flex-1 min-w-28 sm:min-w-35 flex items-center justify-between gap-2 bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-2 sm:p-2.5 sm:px-3.5 px-2.5 shadow-md-dark transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg-dark hover:bg-linear-to-br hover:from-primary/6"
      >
        <div class="flex items-center gap-2">
          <span class="text-lg sm:text-xl leading-none">🎂</span>
          <h3 class="m-0 text-xs sm:text-sm font-semibold text-white/90">年龄</h3>
        </div>
        <p
          class="text-text-muted text-xs m-0 text-right whitespace-nowrap font-medium text-white/60"
        >
          {{ age }} 岁
        </p>
      </article>

      <article
        v-if="profile?.gender"
        class="flex-1 min-w-28 sm:min-w-35 flex items-center justify-between gap-2 bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-2 sm:p-2.5 sm:px-3.5 px-2.5 shadow-md-dark transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg-dark"
      >
        <div class="flex items-center gap-2">
          <span class="text-lg sm:text-xl leading-none">⚧️</span>
          <h3 class="m-0 text-xs sm:text-sm font-semibold text-white/90">性别</h3>
        </div>
        <p
          class="text-text-muted text-xs m-0 text-right whitespace-nowrap font-medium text-white/60"
        >
          {{ profile.gender }}
        </p>
      </article>

      <article
        v-if="profile?.pronouns"
        class="flex-1 min-w-28 sm:min-w-35 flex items-center justify-between gap-2 bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-2 sm:p-2.5 sm:px-3.5 px-2.5 shadow-md-dark transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg-dark"
      >
        <div class="flex items-center gap-2">
          <span class="text-lg sm:text-xl leading-none">🗣️</span>
          <h3 class="m-0 text-xs sm:text-sm font-semibold text-white/90">代词</h3>
        </div>
        <p
          class="text-text-muted text-xs m-0 text-right whitespace-nowrap font-medium text-white/60"
        >
          {{ profile.pronouns }}
        </p>
      </article>

      <article
        v-if="profile?.location"
        class="flex-1 min-w-28 sm:min-w-35 flex items-center justify-between gap-2 bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-2 sm:p-2.5 sm:px-3.5 px-2.5 shadow-md-dark transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg-dark"
      >
        <div class="flex items-center gap-2">
          <span class="text-lg sm:text-xl leading-none">📍</span>
          <h3 class="m-0 text-xs sm:text-sm font-semibold text-white/90">地区</h3>
        </div>
        <p
          class="text-text-muted text-xs m-0 text-right whitespace-nowrap font-medium text-white/60"
        >
          {{ profile.location }}
        </p>
      </article>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2.5">
      <article
        v-for="item in items"
        :key="item.title"
        class="bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-3 shadow-md-dark transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg-dark"
      >
        <div class="flex items-center gap-2 mb-1.5">
          <span class="text-2xl leading-none">{{ item.icon }}</span>
          <h3 class="m-0 text-base font-semibold">{{ item.title }}</h3>
        </div>
        <p class="text-text-muted text-sm m-0">{{ item.desc }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  profile: {
    type: Object,
    default: () => ({}),
  },
});

const age = computed(() => {
  if (!props.profile?.birthday) return null;
  const birthDate = new Date(props.profile.birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});
</script>
