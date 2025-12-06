<template>
    <section class="card panel">
        <h2>我的网站</h2>
        <p class="muted">正在运行的站点 · Websites</p>
        <div class="card-grid">
            <article v-for="site in sites" :key="site.url" class="info-card">
                <div class="card-head">
                    <div class="title-wrap">
                        <h3>{{ site.name }}</h3>
                    </div>
                    <span class="pill">在线</span>
                </div>
                <p class="muted">{{ site.desc || "点击访问了解更多" }}</p>
                <a :href="site.url" target="_blank" rel="noreferrer" class="link-btn">查看 →</a>
            </article>
        </div>
    </section>
</template>

<script setup>
defineProps({ sites: Array });
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
    background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 14px 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.info-card:hover {
    transform: translateY(-3px);
    border-color: rgba(124, 193, 255, 0.4);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);
}
.card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 8px;
}
.title-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
}
.title-wrap h3 {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.pill {
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(124, 193, 255, 0.12);
    color: #7cc1ff;
    font-size: 12px;
}
.link-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 10px;
    color: #7cc1ff;
    font-weight: 600;
}
</style>
