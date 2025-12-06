<template>
    <main class="page">
        <ProjectsSection :projects="projects" />
    </main>
</template>

<script setup>
import ProjectsSection from "../components/ProjectsSection.vue";
import siteConfig from "../config/siteConfig";

const projects = siteConfig.projects;
</script>
