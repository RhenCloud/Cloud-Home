<template>
  <section class="card relative main-section flex flex-col gap-2.5">
    <h2 class="m-0 mb-1 text-lg font-semibold">社交链接</h2>
    <p class="text-text-muted text-sm m-0 mb-3 block">社交账号 · Links</p>
    <div class="relative">
      <!-- <button
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
      </button> -->

      <div ref="container" class="relative flex flex-wrap gap-2.5">
        <template v-for="link in links" :key="link.url">
          <NuxtLink
            :to="link.url"
            class="social-link-chip inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-1"
          >
            <span
              v-if="iconFor(link)"
              class="inline-flex items-center justify-center w-5 h-5 shrink-0"
            >
              <Icon :name="iconFor(link).name" width="20" height="20" />
            </span>
            <span class="whitespace-nowrap">{{ link.name }}</span>
          </NuxtLink>
        </template>
      </div>

      <div
        v-if="pgpInfo.publicKey"
        class="mt-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl"
      >
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="m-0 text-sm font-semibold text-white">PGP 公钥</p>
            <p class="m-0 mt-1 break-all text-xs text-text-muted">
              指纹：{{ formatFingerprint(pgpInfo.fingerprint) || "未提供指纹" }}
            </p>
          </div>

          <div class="flex items-center gap-2">
            <a
              v-if="pgpInfo.keyUrl"
              :href="pgpInfo.keyUrl"
              target="_blank"
              rel="noreferrer"
              class="social-link-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
            >
              查看公钥
            </a>
            <button
              type="button"
              class="social-link-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
              @click="copyPgpPublicKey"
            >
              复制公钥
            </button>
          </div>
        </div>

        <p v-if="copyFeedback" class="m-0 mt-2 text-xs text-text-muted">{{ copyFeedback }}</p>
      </div>

      <!-- <button
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
      </button> -->
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import siteConfig from "~/config/siteConfig";

defineProps({
  links: {
    type: Array,
    required: true,
  },
});

const container = ref(null);
const showOnlyIcons = ref(false);
const copyFeedback = ref("");

const pgpInfo = computed(() => {
  const pgp = siteConfig.profile?.pgp || {};
  return {
    fingerprint: pgp.fingerprint || "",
    publicKey: pgp.publicKey || "",
    keyUrl: pgp.keyUrl || "",
  };
});

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

const formatFingerprint = (fingerprint) => {
  if (!fingerprint) return "";
  return fingerprint.match(/.{1,4}/g)?.join(" ") || fingerprint;
};

async function copyPgpPublicKey() {
  if (!pgpInfo.value.publicKey || !navigator.clipboard) return;
  await navigator.clipboard.writeText(pgpInfo.value.publicKey);
  copyFeedback.value = "已复制公钥";
  window.setTimeout(() => {
    copyFeedback.value = "";
  }, 1600);
}

function updateScrollButtons() {
  const el = container.value;
  if (!el) return;
  // 检测是否需要换行（内容高度大于一行）
  const hasOverflow = el.scrollHeight > el.clientHeight + 5;
  showOnlyIcons.value = hasOverflow;
}

// function scrollByAmount(amount) {
//   const el = container.value;
//   if (!el) return;
//   el.scrollBy({ left: amount, behavior: "smooth" });
//   setTimeout(updateScrollButtons, 300);
// }

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
.social-link-chip {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(124, 193, 255, 0.12));
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: rgba(250, 253, 255, 0.98);
  text-shadow: 0 1px 2px rgba(15, 22, 41, 0.4);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    0 10px 28px rgba(8, 14, 28, 0.16);
  backdrop-filter: blur(12px) saturate(160%);
}

.social-link-chip:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(124, 193, 255, 0.2));
  border-color: rgba(124, 193, 255, 0.58);
  color: #f6fbff;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    0 14px 30px rgba(124, 193, 255, 0.18);
}

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
