<template>
    <section class="card panel">
        <h2>友情链接</h2>
        <p class="muted">欢迎互换友链 · Friends</p>
        <div class="actions">
            <button class="primary" @click="openForm = !openForm">{{ openForm ? "收起申请" : "申请友链" }}</button>
        </div>
        <form v-if="openForm" class="friend-form" @submit.prevent="submitForm">
            <label>
                网站名称 *
                <input v-model="form.name" required placeholder="Exmaple Site" />
            </label>
            <label>
                网站链接 *
                <input v-model="form.url" type="url" required placeholder="https://example.com" />
            </label>
            <label>
                网站描述
                <input v-model="form.desc" placeholder="可选" />
            </label>
            <label>
                联系邮箱 *
                <input v-model="form.email" type="email" required placeholder="you@example.com" />
            </label>
            <label>
                头像链接
                <input v-model="form.avatar" type="url" placeholder="可选，展示头像" />
            </label>
            <div class="form-actions">
                <button type="submit" class="primary" :disabled="loading">
                    {{ loading ? "提交中..." : "提交申请" }}
                </button>
                <span class="muted" v-if="message">{{ message }}</span>
            </div>
        </form>
        <div class="card-grid">
            <article v-for="f in displayedFriends" :key="f.url" class="info-card">
                <div class="card-head">
                    <div class="title-wrap">
                        <img v-if="f.avatar" class="avatar" :src="f.avatar" :alt="f.name" loading="lazy" />
                        <h3>{{ f.name }}</h3>
                    </div>
                    <span class="pill tertiary">友链</span>
                </div>
                <p class="muted">{{ f.desc || "一个有趣的站点" }}</p>
                <a :href="f.url" target="_blank" rel="noreferrer" class="link-btn">访问 →</a>
            </article>
        </div>
    </section>
    <Teleport to="body">
        <div v-if="showDialog" class="dialog-backdrop" @click.self="closeDialog">
            <div class="dialog-card">
                <h3>{{ dialogTitle }}</h3>
                <p class="muted">{{ dialogText }}</p>
                <div class="dialog-actions">
                    <button class="primary" @click="closeDialog">好的</button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
const props = defineProps({ friends: { type: Array, default: () => [] } });
const openForm = ref(false);
const loading = ref(false);
const message = ref("");
const showDialog = ref(false);
const dialogTitle = ref("");
const dialogText = ref("");
const form = reactive({
    name: "",
    url: "",
    desc: "",
    email: "",
    avatar: "",
});
const displayedFriends = ref([]);

const shuffle = (list) => {
    const arr = [...list];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

watch(
    () => props.friends,
    (val) => {
        displayedFriends.value = shuffle(val || []);
    },
    { immediate: true }
);

const submitForm = async () => {
    loading.value = true;
    message.value = "";
    try {
        const resp = await fetch("/api/send-mail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: form.name,
                url: form.url,
                desc: form.desc,
                email: form.email,
                avatar: form.avatar,
            }),
        });
        if (!resp.ok) throw new Error("send failed");
        Object.keys(form).forEach((k) => (form[k] = ""));
        message.value = "提交成功，已发送申请邮件";
        openForm.value = false;
        dialogTitle.value = "提交成功";
        dialogText.value = "已发送申请邮件，感谢你的提交，将会尽快审核并在通过后通过邮件联系。";
        showDialog.value = true;
    } catch (e) {
        message.value = "提交失败，请稍后重试";
        dialogTitle.value = "提交失败";
        dialogText.value = "邮件发送失败，请稍后重试或检查网络连接。";
        showDialog.value = true;
        console.error(e);
    } finally {
        loading.value = false;
    }
};

const closeDialog = () => {
    showDialog.value = false;
};
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
.actions {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    flex-wrap: wrap;
}
.primary {
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid rgba(124, 193, 255, 0.5);
    background: rgba(124, 193, 255, 0.12);
    color: #e8eefc;
    cursor: pointer;
}
.tip {
    font-size: 12px;
}
.friend-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 10px;
    margin-bottom: 12px;
    padding: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(124, 193, 255, 0.06));
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
}
.friend-form label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 14px;
    color: #e8eefc;
    font-weight: 600;
}
.friend-form input {
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.06);
    color: inherit;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.friend-form input::placeholder {
    color: rgba(232, 238, 252, 0.7);
}
.friend-form input:focus {
    outline: none;
    border-color: rgba(124, 193, 255, 0.8);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0 2px rgba(124, 193, 255, 0.25);
}
.form-actions {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-end;
}
.form-actions .primary {
    min-width: 120px;
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
    background: linear-gradient(135deg, rgba(244, 151, 218, 0.12), rgba(255, 255, 255, 0.02));
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 14px 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.info-card:hover {
    transform: translateY(-3px);
    border-color: rgba(244, 151, 218, 0.55);
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
    background: rgba(244, 151, 218, 0.16);
    color: #f497da;
    font-size: 12px;
}
.pill.tertiary {
    background: rgba(155, 140, 252, 0.14);
    color: #9b8cfc;
}
.link-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 10px;
    color: #f497da;
    font-weight: 600;
}
.avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid rgba(255, 255, 255, 0.14);
}
.dialog-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}
.dialog-card {
    min-width: 280px;
    max-width: 420px;
    background: linear-gradient(135deg, rgba(244, 151, 218, 0.12), rgba(255, 255, 255, 0.05));
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 14px;
    padding: 16px 18px;
    box-shadow: 0 16px 46px rgba(0, 0, 0, 0.28);
}
.dialog-card h3 {
    margin: 0 0 8px;
}
.dialog-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
}
</style>
