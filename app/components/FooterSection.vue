<template>
  <footer class="card text-center mt-auto w-full flex flex-col gap-1">
    <!-- 一言 -->
    <p v-if="showHitokoto && quote" class="text-text-muted text-sm m-0 italic">
      「{{ quote }}」<span v-if="from" class="ml-1.5">—— {{ from }}</span>
    </p>

    <!-- 访问统计 -->
    <p v-if="hasStats" class="text-text-muted text-xs m-0">
      👁️ {{ stats?.visitors }} · 📊 {{ stats?.pageviews }}
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
import { computed, onMounted, ref } from "vue";
import { useFetch } from "#imports";
import { siteConfig } from "~/config";
import type { UmamiStatsDTO } from "~/types/api";
const contact = siteConfig.footer;
const quote = ref("");
const from = ref("");
const showHitokoto = siteConfig.footer.hitokoto.enable;

/**
 * umami 关闭时不调用 useFetch，零请求。
 * 不用 `skip`：Nuxt 的 `skip` 与 `default` 在 vue-tsc 下类型重载冲突
 * （default 泛型槽被推断为 Ref<undefined>，TS2769）。
 */
const stats = siteConfig.umami.enable
  ? useFetch<UmamiStatsDTO>("/api/stats", {
      server: false,
      lazy: true,
      default: () => ({ pageviews: 0, visitors: 0 }),
    }).data
  : ref<UmamiStatsDTO>({ pageviews: 0, visitors: 0 });

/** 与旧行为一致：仅当有非零数据时展示统计行 */
const hasStats = computed(() => stats.value.pageviews > 0 || stats.value.visitors > 0);

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

onMounted(() => {
  if (showHitokoto) fetchHitokoto();
});
</script>
