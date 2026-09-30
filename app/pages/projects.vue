<template>
  <main class="page">
    <ProjectsSection :projects="projects" />
  </main>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
import ProjectsSection from "~/components/ProjectsSection.vue";
import { siteConfig } from "~/config";

const projects = siteConfig.projects;

definePageMeta({
  order: 3,
  label: "项目",
});
</script>
