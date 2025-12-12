<template>
    <div class="pager">
        <button :disabled="currentIndex <= 0" @click="goPrev">上一页</button>
        <div class="dots">
            <button
                v-for="item in pages"
                :key="item.name"
                :class="{ active: item.name === route.name }"
                @click="router.push({ name: item.name })"
            >
                {{ item.label }}
            </button>
        </div>
        <button :disabled="currentIndex >= pages.length - 1" @click="goNext">下一页</button>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const pages = [
    { name: "index", label: "首页" },
    { name: "about", label: "关于" },
    { name: "sites", label: "网站" },
    { name: "projects", label: "项目" },
    { name: "friends", label: "友链" },
];

const currentIndex = computed(() => pages.findIndex((item) => item.name === route.name));

const goPrev = () => {
    if (currentIndex.value > 0) {
        router.push({ name: pages[currentIndex.value - 1].name });
    }
};

const goNext = () => {
    if (currentIndex.value < pages.length - 1) {
        router.push({ name: pages[currentIndex.value + 1].name });
    }
};
</script>

<style scoped>
.pager {
    margin: 16px auto 24px;
    max-width: 960px;
    width: 100%;
    padding: 12px 16px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 12px;
    align-items: center;
}
button {
    background: rgba(255, 255, 255, 0.08);
    color: inherit;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    padding: 8px 12px;
    cursor: pointer;
}
button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
}
.dots {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
}
.dots button {
    padding: 8px 10px;
}
.dots .active {
    border-color: var(--accent, #7cc1ff);
    color: var(--accent, #7cc1ff);
}
@media (max-width: 640px) {
    .pager {
        grid-template-columns: 1fr;
    }
    .dots {
        justify-content: center;
    }
}
</style>
