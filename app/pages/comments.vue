<template>
    <section class="container mx-auto py-8">
        <p v-if="!giscus || !giscus.repo" class="text-sm text-red-500 mb-4">Giscus 未配置。</p>
        <ClientOnly>
            <section class="card panel flex flex-col gap-2.5">
                <h2 class="m-0 mb-1 text-lg font-semibold">留言板</h2>
                <p class="text-sm text-white/60 mb-3">在这里留下想说的话吧 · Comments</p>
                <div class="giscus-wrapper">
                    <component v-if="GiscusComponent" :is="GiscusComponent" :repo="giscus.repo" :repo-id="giscus.repoId"
                        :category="giscus.category" :category-id="giscus.categoryId" :mapping="giscus.mapping"
                        :strict="giscus.strict" :reactions-enabled="giscus.reactionsEnabled"
                        :emit-metadata="giscus.emitMetadata" :input-position="giscus.inputPosition"
                        :theme="'/css/giscus.css'" lang="zh-CN" class="giscus" />
                    <div v-else id="giscus-container" class="giscus" />
                </div>
            </section>
        </ClientOnly>
    </section>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
import { onMounted, shallowRef, markRaw } from "vue";
import siteConfig from "~/config/siteConfig";

const giscus = siteConfig.comments.giscus || {};
const GiscusComponent = shallowRef(null as any);

async function tryUseOfficialComponent() {
    try {
        const mod = await import("@giscus/vue");
        const comp = mod.default ?? mod;
        if (comp) GiscusComponent.value = markRaw(comp);
        return !!comp;
    } catch (e) {
        console.error("Failed to import Giscus component:", e);
        return false;
    }
}


onMounted(async () => {
    // 如果没有配置 giscus，显示提示（由模板处理）
    if (!siteConfig.comments.enable) return;
    if (!giscus || !giscus.repo) return;
    const ok = await tryUseOfficialComponent();
});

definePageMeta({
    order: 5,
    label: "留言",
});
</script>

<style scoped>
.container {
    max-width: 880px;
    padding-left: 1rem;
    padding-right: 1rem;
}

h1 {
    color: #e6eef8;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.35);
}
</style>

<!-- <style src="../styles/giscus.css"></style> -->