<template>
    <section class="card hero">
        <img class="avatar" :src="profile.avatar" alt="avatar" />
        <div>
            <h1>{{ profile.name }}</h1>
            <p class="muted">{{ profile.title }}</p>
            <p>{{ profile.bio }}</p>
        </div>
    </section>
</template>

<script setup>
defineProps({ profile: Object });
</script>

<style scoped>
.hero {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 16px;
    align-items: center;
}
.avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--accent);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
    background: #fff;
}
</style>
