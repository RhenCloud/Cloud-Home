<template>
    <section class="card panel">
        <h2>个人简介</h2>
        <p class="muted">关于我 · About Me</p>

        <div class="about-grid info-grid">
            <article v-if="age" class="about-card info-card">
                <div class="about-head">
                    <span class="icon">🎂</span>
                    <h3>年龄</h3>
                </div>
                <p class="muted">{{ age }} 岁</p>
            </article>

            <article v-if="profile?.gender" class="about-card info-card">
                <div class="about-head">
                    <span class="icon">⚧️</span>
                    <h3>性别</h3>
                </div>
                <p class="muted">{{ profile.gender }}</p>
            </article>

            <article v-if="profile?.pronouns" class="about-card info-card">
                <div class="about-head">
                    <span class="icon">🗣️</span>
                    <h3>代词</h3>
                </div>
                <p class="muted">{{ profile.pronouns }}</p>
            </article>

            <article v-if="profile?.location" class="about-card info-card">
                <div class="about-head">
                    <span class="icon">📍</span>
                    <h3>地区</h3>
                </div>
                <p class="muted">{{ profile.location }}</p>
            </article>
        </div>

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
import { computed } from "vue";

const props = defineProps({
    items: Array,
    profile: Object,
});

const age = computed(() => {
    if (!props.profile?.birthday) return null;
    const birthDate = new Date(props.profile.birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});
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
.info-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
}
.about-grid + .about-grid {
    margin-top: 10px;
}
@media (max-width: 720px) {
    .about-grid {
        grid-template-columns: 1fr;
    }
    .info-grid {
        display: flex;
        gap: 10px;
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
.info-card {
    flex: 1 1 140px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 14px;
}
.info-card .about-head {
    margin-bottom: 0;
}
.info-card .about-head h3 {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
    margin: 0;
}
.info-card .icon {
    font-size: 18px;
}
.info-card .muted {
    margin: 0;
    text-align: right;
    white-space: nowrap;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
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
