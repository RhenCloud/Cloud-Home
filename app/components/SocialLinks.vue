<template>
  <section class="card flex flex-col gap-2.5">
    <h2 class="m-0 mb-1 text-lg font-semibold">社交链接</h2>
    <p class="text-text-muted text-sm m-0 mb-3 block">社交账号 · Links</p>
    <div class="flex flex-wrap gap-2.5">
      <template v-for="link in links" :key="link.url">
        <NuxtLink
          :to="link.url"
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-text-primary text-sm font-medium transition-all duration-200 hover:bg-primary/20 hover:border-primary/40 hover:text-primary hover:-translate-y-1"
        >
          <span v-if="iconFor(link)" class="inline-flex items-center justify-center w-5 h-5">
            <Icon v-if="iconFor(link).name" :name="iconFor(link).name" width="20" height="20" />
          </span>
          <span>{{ link.name }}</span>
        </NuxtLink>
      </template>
    </div>
  </section>
</template>

<script setup>
defineProps({
  links: {
    type: Array,
    required: true,
  },
});

const iconMap = {
  bilibili: "fa6-brands:bilibili",
  github: "fa6-brands:github",
  blog: "fa6-solid:rss",
  email: "fa6-solid:envelope",
  mail: "fa6-solid:envelope",
  telegram: "fa6-brands:telegram",
  twitter: "fa6-brands:x-twitter",
  x: "fa6-brands:x-twitter",
  linkedin: "fa6-brands:linkedin",
  youtube: "fa6-brands:youtube",
  facebook: "fa6-brands:facebook",
  instagram: "fa6-brands:instagram",
  reddit: "fa6-brands:reddit",
  discord: "fa6-brands:discord",
  weibo: "fa6-brands:weibo",
  zhihu: "fa6-brands:zhihu",
  wechat: "fa6-brands:weixin",
  weixin: "fa6-brands:weixin",
  qq: "fa6-brands:qq",
};

const iconFor = (link) => {
  const key = (link.name || "").toLowerCase();
  if (iconMap[key]) return { name: iconMap[key] };
  if (link.icon) return { src: link.icon };
  return null;
};
</script>
