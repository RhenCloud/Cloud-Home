<template>
  <main class="page">
    <HeroSection :profile="profile" />
    <SkillsSection :skills="skills" />
    <Suspense>
      <template #default>
        <StatsSection :github="github" :wakapi="wakapi" />
      </template>
      <template #fallback>
        <div class="card" style="text-align: center; padding: 40px">
          <p>加载统计数据中...</p>
        </div>
      </template>
    </Suspense>
  </main>
</template>

<script setup lang="ts">
import { definePageMeta, useFetch } from "#imports";
import { computed } from "vue";
import HeroSection from "~/components/HeroSection.vue";
import SkillsSection from "~/components/SkillsSection.vue";
import StatsSection from "~/components/StatsSection.vue";
import { siteConfig } from "~/config";
import type { GithubLanguagesDTO, GithubStats } from "~/types/api";

const profile = siteConfig.profile;
const skills = siteConfig.skills;
const wakapi = siteConfig.wakapi;

const heatmapUrl = `https://ghchart.rshah.org/${siteConfig.github.username}`;

const { data: githubMeta } = useFetch<GithubLanguagesDTO | null>("/api/github", {
  default: () => null,
});

const github = computed<GithubStats>(() => ({
  username: siteConfig.github.username,
  heatmapUrl,
  languages: githubMeta.value?.languages ?? [],
}));

definePageMeta({
  order: 1,
  label: "关于",
});
</script>
