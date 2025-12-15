<template>
    <section class="card flex flex-col gap-2.5">
        <h2 class="m-0 mb-1 gradient-text">我的网站</h2>
        <p class="text-text-muted text-sm m-0 mb-3 block">正在运行的站点 · Websites</p>
        <div class="w-full -mx-[1.125rem] -mb-[1.125rem]">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-[1.125rem] pb-[1.125rem]">
                <article
                    v-for="site in sites"
                    :key="site.url"
                    class="bg-gradient-to-br from-white/5 to-white/1 border border-white/10 rounded-2xl p-3.5 shadow-md-dark transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-lg-dark hover:bg-gradient-to-br hover:from-yellow-500/6"
                >
                    <div class="flex items-center justify-between mb-1.5">
                        <h3 class="m-0 font-semibold text-base">{{ site.name }}</h3>
                        <span class="px-2.5 py-1 rounded-full bg-green-500/14 text-green-300 text-xs font-medium"
                            >在线</span
                        >
                    </div>
                    <p class="text-text-muted text-sm m-0 mb-2.5">{{ site.desc }}</p>
                    <a
                        :href="site.url"
                        target="_blank"
                        rel="noreferrer"
                        class="inline-flex items-center gap-1.5 mt-2.5 text-blue-400 font-semibold text-sm hover:text-blue-300 transition-all duration-200 hover:gap-2"
                        >查看 →</a
                    >
                </article>
            </div>
        </div>
    </section>
</template>

<script setup>
defineProps({ sites: Array });
</script>
