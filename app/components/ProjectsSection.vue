<template>
    <section class="card panel flex flex-col gap-2.5">
        <h2 class="m-0 mb-1 text-lg font-semibold">项目作品</h2>
        <p class="text-sm text-white/60 mb-3">一些正在维护或已发布的项目 · Projects</p>
        <div class="grid grid-cols-1 gap-4 w-full max-w-[1100px] mx-auto sm:grid-cols-2">
            <article
                v-for="p in projects"
                :key="p.url"
                class="rounded-[14px] border border-white/10 bg-gradient-to-br from-white/5 to-white/0 px-4 py-3.5 transition-all duration-200 hover:-translate-y-[3px] hover:border-yellow-400/50 w-[290px] h-[145px] flex flex-col"
            >
                <div class="flex items-center justify-between mb-1.5">
                    <h3 class="font-medium truncate">
                        {{ p.name }}
                    </h3>

                    <span class="rounded-full px-2.5 py-1 text-xs bg-sky-400/15 text-sky-300"> 项目 </span>
                </div>

                <p class="text-sm text-white/60 flex-1 overflow-hidden truncate-lines-2 mb-2">
                    {{ p.desc }}
                </p>

                <NuxtLink
                    :to="p.url"
                    class="inline-flex items-center gap-1.5 mt-auto shrink-0 font-semibold text-yellow-300 hover:text-yellow-400 transition-all duration-200 hover:gap-2"
                >
                    查看仓库 →
                </NuxtLink>
            </article>
        </div>
    </section>
</template>

<script setup>
defineProps({
    projects: {
        type: Array,
        default: () => [],
    },
});
</script>
