<template>
    <section class="card panel flex flex-col gap-2.5">
        <h2 class="m-0 mb-1 text-lg font-semibold">我的网站</h2>

        <p class="text-sm text-white/60 mb-3">正在运行的站点 · Websites</p>

        <div class="grid grid-cols-1 gap-4 w-full max-w-[1100px] mx-auto sm:grid-cols-2">
            <article
                v-for="site in sites"
                :key="site.url"
                class="rounded-[14px] border border-white/10 bg-gradient-to-br from-white/5 to-white/0 px-4 py-3.5 transition-all duration-200 hover:-translate-y-[3px] hover:border-blue-400/50 w-[290px] h-[145px] flex flex-col"
            >
                <div class="flex items-center justify-between mb-1.5">
                    <h3 class="font-medium truncate">
                        {{ site.name }}
                    </h3>

                    <span class="rounded-full px-2.5 py-1 text-xs bg-sky-400/15 text-green-300"> 在线 </span>
                </div>

                <p class="text-sm text-white/60 flex-1 overflow-hidden truncate-lines-2 mb-2">
                    {{ site.desc }}
                </p>

                <NuxtLink
                    :to="site.url"
                    class="inline-flex items-center gap-1.5 mt-auto shrink-0 font-semibold text-blue-300 hover:text-blue-400 transition-all duration-200 hover:gap-2"
                >
                    查看 →
                </NuxtLink>
            </article>
        </div>
    </section>
</template>

<script setup>
defineProps({
    sites: {
        type: Array,
        default: () => [],
    },
});
</script>
