<template>
  <div
    class="my-4 mx-auto max-w-3xl w-full px-4 py-3 grid grid-cols-[auto_1fr_auto] gap-3 items-center"
  >
    <button
      :disabled="currentIndex <= 0"
      class="bg-white/10 text-text-primary border border-white/15 rounded-2xl px-3 py-2 cursor-pointer transition-all duration-200 hover:bg-primary/20 hover:border-primary/40 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
      @click="goPrev"
    >
      上一页
    </button>
    <div class="flex gap-2 flex-wrap justify-center">
      <button
        v-for="item in pages"
        :key="item.name"
        :class="{
          'bg-primary/30 border-primary/60 text-primary shadow-lg shadow-primary/25':
            item.name === route.name,
        }"
        class="px-2.5 py-2 bg-white/10 text-text-primary border border-white/15 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-white/15 hover:border-primary/40"
        @click="router.push({ name: item.name })"
      >
        {{ item.label }}
      </button>
    </div>
    <button
      :disabled="currentIndex >= pages.length - 1"
      class="bg-white/10 text-text-primary border border-white/15 rounded-2xl px-3 py-2 cursor-pointer transition-all duration-200 hover:bg-primary/20 hover:border-primary/40 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
      @click="goNext"
    >
      下一页
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const pages = [
  { name: "index", label: "首页" },
  { name: "about", label: "关于" },
  { name: "sites", label: "网站" },
  { name: "projects", label: "项目" },
  { name: "friends", label: "友链" },
  { name: "comments", label: "留言" },
];

const currentIndex = computed(() => pages.findIndex((item) => item.name === route.name));

const goPrev = () => {
  if (currentIndex.value > 0) {
    router.push({ name: pages[currentIndex.value - 1].name });
  }
};

const goNext = () => {
  if (currentIndex.value < pages.length - 1) {
    router.push({ name: pages[currentIndex.value + 1].name });
  }
};
</script>
