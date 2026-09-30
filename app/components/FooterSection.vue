<template>
  <footer class="card text-center mt-auto w-full flex flex-col gap-1">
    <!-- 一言 -->
    <p v-if="showHitokoto && quote" class="text-text-muted text-sm m-0 italic">
      「{{ quote }}」<span v-if="from" class="ml-1.5">—— {{ from }}</span>
    </p>

    <!-- 访问统计 -->
    <p v-if="showStats && !statsError" class="text-text-muted text-xs m-0">
      👁️ {{ visitors }} · 📊 {{ pageviews }}
    </p>

    <!-- 备案信息 -->
    <p v-if="contact?.beian" class="text-text-muted text-xs m-0">
      <NuxtLink
        :to="contact.beianLink || '/'"
        class="opacity-85 transition-all duration-200 hover:text-primary hover:opacity-100"
      >
        {{ contact.beian }}
      </NuxtLink>
    </p>

    <!-- 框架与技术栈信息 -->
    <p class="text-text-muted text-xs m-0">
      Powered by
      <a
        href="https://nuxt.com"
        target="_blank"
        rel="noreferrer"
        class="text-primary hover:text-accent transition-colors"
        >Nuxt 4</a
      >
      ·
      <a
        href="https://tailwindcss.com"
        target="_blank"
        rel="noreferrer"
        class="text-primary hover:text-accent transition-colors"
        >Tailwind CSS</a
      >
      ·
      <a
        href="https://vuejs.org"
        target="_blank"
        rel="noreferrer"
        class="text-primary hover:text-accent transition-colors"
        >Vue 3</a
      >
    </p>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="contact?.customHtml" v-html="contact.customHtml" />
  </footer>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRuntimeConfig } from "#imports";
import { siteConfig } from "~/config";
const contact = siteConfig.footer;
const config = useRuntimeConfig();
const quote = ref("");
const from = ref("");
const pageviews = ref(0);
const visitors = ref(0);
const statsError = ref<boolean>(true);
const showHitokoto = siteConfig.footer.hitokoto.enable;
const showStats = ref<boolean>(siteConfig.umami.enable);

const buildHitokotoUrl = (): string => {
  const type = siteConfig.footer.hitokoto.type;
  const url = new URL("https://v1.hitokoto.cn/");
  if (Array.isArray(type)) {
    type.filter(Boolean).forEach((t) => url.searchParams.append("c", t));
  } else if (typeof type === "string") {
    type
      .split("&")
      .map((t) => t.trim())
      .filter(Boolean)
      .forEach((t) => url.searchParams.append("c", t));
  }
  return url.toString();
};

const fetchHitokoto = async (): Promise<void> => {
  try {
    const resp = await fetch(buildHitokotoUrl());
    const data = (await resp.json()) as { hitokoto?: string; from?: string };
    quote.value = data.hitokoto || "";
    from.value = data.from || "";
  } catch (e) {
    console.warn("Hitokoto fetch failed", e);
  }
};

const fetchStats = async (): Promise<void> => {
  try {
    if (!siteConfig.umami.apiBase || !siteConfig.umami.websiteId) {
      return;
    }
    const apiBase = siteConfig.umami.apiBase;
    const websiteId = siteConfig.umami.websiteId;
    const apiKey = config.public.umamiApiKey;

    if (!apiKey) return;

    // 获取统计数据
    const endAt = Date.now();
    const startAt = new Date(siteConfig.siteMeta.startDate).getTime();

    const resp = await fetch(
      `${apiBase}/v1/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!resp.ok) {
      console.warn(`Stats API returned ${resp.status}`);
      statsError.value = true;
      return;
    }

    const data = (await resp.json()) as { pageviews?: number; visitors?: number };
    if (data) {
      statsError.value = false;
      pageviews.value = data.pageviews ?? 0;
      visitors.value = data.visitors ?? 0;
    }

    if (pageviews.value === 0 && visitors.value === 0) {
      showStats.value = false;
    }
  } catch (e) {
    statsError.value = true;
    console.debug(
      "Stats fetch failed (this is normal if blocked by ad blocker):",
      (e as Error).message
    );
  }
};

onMounted(() => {
  if (showHitokoto) fetchHitokoto();
  if (showStats.value) fetchStats();
});
</script>
