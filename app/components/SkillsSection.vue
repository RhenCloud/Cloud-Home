<template>
  <section class="card flex flex-col gap-2.5">
    <div>
      <h2 class="m-0 mb-1 font-semibold">技能专长</h2>
      <p class="text-text-muted text-sm m-0 mb-3">我常用的工具与技术 · Skills & Technologies</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <article
        v-for="group in skills"
        :key="group.title"
        class="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-3.5 shadow-md-dark transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg-dark hover:bg-gradient-to-br hover:from-primary/8"
      >
        <header class="mb-3">
          <h3 class="text-base font-semibold m-0">{{ group.title }}</h3>
        </header>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="item in group.items"
            :key="item"
            class="inline-flex items-center p-1.5 rounded-2xl bg-primary/14 border border-primary/18 transition-all duration-200 hover:bg-primary/24 hover:border-primary/40 hover:scale-110"
          >
            <NuxtImg
              :src="iconSrc(item)"
              :alt="item"
              :title="item"
              loading="lazy"
              class="w-7 h-7 rounded-2xl"
            />
          </span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({ skills: { type: Array, default: () => [] } });
const iconSrc = (id) => `https://skillicons.dev/icons?i=${encodeURIComponent(id)}&theme=dark`;
</script>
