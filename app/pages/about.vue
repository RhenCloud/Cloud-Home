<template>
  <main class="page">
    <HeroSection :profile="profile" />
    <SkillsSection :skills="skills" />
    <Suspense>
      <template #default>
        <StatsSection :github="github" :wakatime="wakatime" />
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
import { onMounted, reactive } from "vue";
import { useRuntimeConfig, definePageMeta } from "#imports";
import HeroSection from "~/components/HeroSection.vue";
import SkillsSection from "~/components/SkillsSection.vue";
import StatsSection from "~/components/StatsSection.vue";
import siteConfig from "@/config/siteConfig";

const profile = siteConfig.profile;
const skills = siteConfig.skills;
const wakatime = siteConfig.wakatime;
const config = useRuntimeConfig();
const githubToken = config.public.githubToken ?? "";

type GithubHeatmap = {
  username: string;
  heatmapUrl: string;
  languages?: { name: string; percent: number }[];
};

const github = reactive<GithubHeatmap>({
  ...siteConfig.github,
  heatmapUrl: `https://ghchart.rshah.org/${siteConfig.github.username}`,
  languages: [],
});

definePageMeta({
  order: 1,
  label: "关于",
});

onMounted(() => {
  fetchGithubMeta();
});

async function fetchGithubMeta() {
  try {
    const headers: HeadersInit = {};
    if (githubToken) {
      headers.Authorization = `Bearer ${githubToken}`;
    }
    const resp = await fetch(
      `https://api.github.com/users/${github.username}/repos?per_page=100&sort=updated`,
      {
        headers,
      }
    );
    const data = await resp.json();
    if (!Array.isArray(data)) return;
    type GithubRepo = { language?: string };
    const repos = data as GithubRepo[];
    const counts: Record<string, number> = {};
    repos.forEach((repo) => {
      if (!repo.language) return;
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    });
    const total = Object.values(counts).reduce((sum, value) => sum + value, 0) || 1;
    const parsed = Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    github.languages = parsed.map((item) => ({
      name: item.name,
      percent: Math.round((item.count / total) * 100),
    }));
  } catch (error) {
    console.error("Failed to fetch GitHub metadata:", error);
  }
}
</script>
