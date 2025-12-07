<template>
    <div class="pager">
        <button :disabled="currentIndex <= 0" @click="goPrev">上一页</button>
        <div class="dots">
            <button
                v-for="r in ordered"
                :key="r.name"
                :class="{ active: r.name === route.name }"
                @click="router.push({ name: r.name })"
            >
                {{ r.meta.label || r.name }}
            </button>
        </div>
        <button :disabled="currentIndex >= ordered.length - 1" @click="goNext">下一页</button>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const ordered = computed(() =>
    router
        .getRoutes()
        .filter((r) => typeof r.meta?.order === "number")
        .sort((a, b) => a.meta.order - b.meta.order)
);

const currentIndex = computed(() => ordered.value.findIndex((r) => r.name === route.name));

const goPrev = () => {
    if (currentIndex.value > 0) router.push({ name: ordered.value[currentIndex.value - 1].name });
};
const goNext = () => {
    if (currentIndex.value < ordered.value.length - 1)
        router.push({ name: ordered.value[currentIndex.value + 1].name });
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
