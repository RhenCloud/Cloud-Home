<template>
  <section class="card flex flex-col gap-2.5">
    <h2 class="m-0 mb-1 text-lg font-semibold">社交链接</h2>
    <p class="text-text-muted text-sm m-0 mb-3 block">社交账号 · Links</p>
    <div class="relative">
      <button
        v-show="canScrollLeft"
        aria-label="向左滚动"
        class="scroll-arrow left flex items-center justify-center"
        @click="scrollLeft"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div
        ref="container"
        class="flex flex-nowrap gap-2.5 overflow-x-auto social-links-scroll py-1"
      >
        <template v-for="link in links" :key="link.url">
          <NuxtLink
            :to="link.url"
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-text-primary text-sm font-medium transition-all duration-200 hover:bg-primary/20 hover:border-primary/40 hover:text-primary hover:-translate-y-1"
          >
            <span v-if="iconFor(link)" class="inline-flex items-center justify-center w-5 h-5">
              <Icon v-if="iconFor(link).name" :name="iconFor(link).name" width="20" height="20" />
            </span>
            <span>{{ link.name }}</span>
          </NuxtLink>
        </template>
      </div>

      <button
        v-show="canScrollRight"
        aria-label="向右滚动"
        class="scroll-arrow right flex items-center justify-center"
        @click="scrollRight"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

defineProps({
  links: {
    type: Array,
    required: true,
  },
});

const container = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);

const iconMap = {
  bilibili: "simple-icons:bilibili",
  github: "simple-icons:github",
  blog: "fa6-solid:book",
  email: "fa6-solid:envelope",
  mail: "fa6-solid:envelope",
  telegram: "simple-icons:telegram",
  twitter: "simple-icons:twitter",
  x: "simple-icons:x",
  linkedin: "simple-icons:linkedin",
  youtube: "simple-icons:youtube",
  facebook: "simple-icons:facebook",
  instagram: "simple-icons:instagram",
  reddit: "simple-icons:reddit",
  discord: "simple-icons:discord",
  weibo: "simple-icons:sinaweibo",
  zhihu: "simple-icons:zhihu",
  wechat: "simple-icons:wechat",
  weixin: "simple-icons:wechat",
  qq: "simple-icons:qq",
  matrix: "simple-icons:matrix",
};

const iconFor = (link) => {
  const key = (link.name || "").toLowerCase();
  if (iconMap[key]) return { name: iconMap[key] };
  if (link.icon) return { src: link.icon };
  return null;
};

function updateScrollButtons() {
  const el = container.value;
  if (!el) return;
  canScrollLeft.value = el.scrollLeft > 0;
  canScrollRight.value = el.scrollWidth - el.clientWidth - el.scrollLeft > 1;
}

function scrollByAmount(amount) {
  const el = container.value;
  if (!el) return;
  el.scrollBy({ left: amount, behavior: "smooth" });
  setTimeout(updateScrollButtons, 300);
}

function scrollLeft() {
  scrollByAmount(-200);
}

function scrollRight() {
  scrollByAmount(200);
}

onMounted(() => {
  updateScrollButtons();
  const el = container.value;
  if (el) el.addEventListener("scroll", updateScrollButtons, { passive: true });
  window.addEventListener("resize", updateScrollButtons);
});

onBeforeUnmount(() => {
  const el = container.value;
  if (el) el.removeEventListener("scroll", updateScrollButtons);
  window.removeEventListener("resize", updateScrollButtons);
});
</script>

<style scoped>
.social-links-scroll {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.social-links-scroll::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.scroll-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--color-text-primary, #fff);
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.scroll-arrow.left {
  left: 6px;
}
.scroll-arrow.right {
  right: 6px;
}
.scroll-arrow:hover {
  transform: translateY(-50%) scale(1.05);
}
.scroll-arrow[style*="display: none"] {
  visibility: hidden;
}
</style>
