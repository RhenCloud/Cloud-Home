<template>
    <section class="card panel">
        <h2>个人简介</h2>
        <p class="muted">关于我 · About Me</p>
        <div class="about-grid">
            <article v-for="item in items" :key="item.title" class="about-card">
                <div class="about-head">
                    <span class="icon">{{ item.icon }}</span>
                    <h3>{{ item.title }}</h3>
                </div>
                <p class="muted">{{ item.desc }}</p>
            </article>
        </div>
    </section>
</template>

<script setup>
defineProps({ items: Array });
</script>

<style scoped>
.panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
h2 {
    margin: 0 0 4px;
}
.muted {
    margin: 0 0 12px;
    display: block;
}
.about-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(240px, 1fr));
    gap: 14px;
}
@media (max-width: 720px) {
    .about-grid {
        grid-template-columns: 1fr;
    }
}
.about-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 12px 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.about-card:hover {
    transform: translateY(-2px);
    border-color: rgba(124, 193, 255, 0.4);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.24);
}
.about-head {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
}
.icon {
    font-size: 20px;
    line-height: 1;
}
</style>
