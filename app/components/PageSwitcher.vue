<template>
  <header
    class="page-switcher fixed left-1/2 z-50 mx-auto grid w-fit max-w-[calc(100%-2rem)] -translate-x-1/2 grid-cols-1 items-center justify-items-center rounded-2xl border border-white/10 bg-linear-to-br from-white/8 to-white/3 px-4 py-2 shadow-md-dark backdrop-blur-xl transition-[top,box-shadow,transform,background-color] duration-200 ease-out"
    :style="headerStyle"
  >
    <nav class="flex flex-nowrap gap-2 justify-center" aria-label="主导航">
      <button
        v-for="item in pages"
        :key="item.name"
        :class="{
          'border-primary/40 bg-primary/10 text-primary shadow-lg shadow-primary/15':
            item.name === route.name,
        }"
        class="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 px-2.5 py-1.5 cursor-pointer text-text-primary shadow-md-dark transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg-dark hover:bg-linear-to-br hover:from-primary/6"
        @click="router.push({ name: item.name })"
      >
        {{ item.label }}
      </button>
    </nav>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const scrollY = ref(0);

const updateScrollY = () => {
  scrollY.value = window.scrollY || window.pageYOffset || 0;
};

onMounted(() => {
  updateScrollY();
  window.addEventListener("scroll", updateScrollY, { passive: true });
  window.addEventListener("resize", updateScrollY, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateScrollY);
  window.removeEventListener("resize", updateScrollY);
});

const pages = [
  { name: "index", label: "首页" },
  { name: "about", label: "关于" },
  { name: "sites", label: "网站" },
  { name: "projects", label: "项目" },
  { name: "friends", label: "友链" },
  // { name: "comments", label: "留言" },
];

const headerStyle = computed(() => {
  const maxOffset = 16;
  const minOffset = 4;
  const settleDistance = 320;
  const progress = Math.min(scrollY.value / settleDistance, 1);
  const top = maxOffset - (maxOffset - minOffset) * progress;

  return {
    top: `${top}px`,
  };
});
</script>
