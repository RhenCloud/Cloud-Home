<template>
    <section class="card panel">
        <div class="head">
            <h2>技能专长</h2>
            <p class="muted">我常用的工具与技术 · Skills & Technologies</p>
        </div>
        <div class="grid">
            <article v-for="group in skills" :key="group.title" class="skill-card">
                <header>
                    <h3>{{ group.title }}</h3>
                </header>
                <div class="tags">
                    <span v-for="item in group.items" :key="item" class="tag">
                        <img :src="iconSrc(item)" :alt="item" :title="item" loading="lazy" />
                    </span>
                </div>
            </article>
        </div>
    </section>
</template>

<script setup>
defineProps({ skills: { type: Array, default: () => [] } });
const iconSrc = (id) => `https://skillicons.dev/icons?i=${encodeURIComponent(id)}&theme=dark`;
</script>

<style scoped>
.panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.head h2 {
    margin: 0 0 4px;
}
.head p {
    margin: 0 0 12px;
}
.grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(260px, 1fr));
    gap: 12px;
}
@media (max-width: 640px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
.skill-card {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02));
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 12px 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.skill-card:hover {
    transform: translateY(-2px);
    border-color: rgba(124, 193, 255, 0.4);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.24);
}
.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
}
.tag {
    display: inline-flex;
    align-items: center;
    padding: 6px;
    border-radius: 12px;
    background: rgba(124, 193, 255, 0.14);
    border: 1px solid rgba(124, 193, 255, 0.18);
}
.tag img {
    width: 28px;
    height: 28px;
    border-radius: 8px;
}
</style>
