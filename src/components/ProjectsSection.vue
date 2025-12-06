<template>
    <section class="card panel">
        <h2>项目作品</h2>
        <p class="muted">一些正在维护或已发布的项目 · Projects</p>
        <div class="card-grid">
            <article v-for="p in projects" :key="p.url" class="info-card">
                <div class="card-head">
                    <h3>{{ p.name }}</h3>
                    <span class="pill secondary">项目</span>
                </div>
                <p class="muted">{{ p.desc }}</p>
                <a :href="p.url" target="_blank" rel="noreferrer" class="link-btn">查看仓库 →</a>
            </article>
        </div>
    </section>
</template>

<script setup>
defineProps({ projects: Array });
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
.card-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(320px, 1fr));
    gap: 16px;
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
}
@media (max-width: 720px) {
    .card-grid {
        grid-template-columns: 1fr;
    }
}
.info-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01));
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 14px 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.info-card:hover {
    transform: translateY(-3px);
    border-color: rgba(255, 209, 102, 0.5);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);
}
.card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
}
.pill {
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(255, 209, 102, 0.16);
    color: #ffd166;
    font-size: 12px;
}
.pill.secondary {
    background: rgba(124, 193, 255, 0.14);
    color: #7cc1ff;
}
.link-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 10px;
    color: #ffd166;
    font-weight: 600;
}
</style>
