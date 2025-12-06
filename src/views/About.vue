<template>
    <main class="page">
        <HeroSection :profile="profile" />
        <SkillsSection :skills="skills" />
        <GithubSection :github="github" />
    </main>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import HeroSection from "../components/HeroSection.vue";
import SkillsSection from "../components/SkillsSection.vue";
import GithubSection from "../components/GithubSection.vue";
import siteConfig from "../config/siteConfig";

const profile = siteConfig.profile;
const siteMeta = siteConfig.siteMeta;
const skills = siteConfig.skills;

const github = reactive({
    ...siteConfig.github,
    heatmapUrl: `https://ghchart.rshah.org/${siteConfig.github.username}`,
});

// 修改此处：使用 VITE_ 前缀
const githubToken = import.meta.env.VITE_GITHUB_TOKEN ?? "";

console.log(githubToken);

onMounted(() => {
    document.title = siteMeta.title;
    const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
    link.rel = "icon";
    link.href = siteMeta.icon;
    document.head.appendChild(link);
    fetchGithubMeta();
});

async function fetchGithubMeta() {
    try {
        const headers = githubToken ? { Authorization: `Bearer ${githubToken}` } : {};
        const resp = await fetch(`https://api.github.com/users/${github.username}/repos?per_page=100&sort=updated`, {
            headers,
        });
        const repos = await resp.json();
        if (!Array.isArray(repos)) return;
        const counts = repos.reduce((acc, repo) => {
            if (!repo.language) return acc;
            acc[repo.language] = (acc[repo.language] || 0) + 1;
            return acc;
        }, {});
        const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
        const parsed = Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 4);
        github.languages = parsed.map((item) => ({
            name: item.name,
            percent: Math.round((item.count / total) * 100),
        }));
    } catch (error) {
        console.error("Failed to fetch GitHub metadata:", error);
    }
}
</script>
