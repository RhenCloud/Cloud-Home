<template>
    <div class="card panel flex flex-col gap-2.5">
        <h2 class="m-0 mb-1 text-lg font-semibold">友情链接</h2>
        <p class="text-text-muted text-sm m-0 mb-3 block">欢迎互换友链 · Friends</p>
        <div class="grid grid-cols-1 gap-4 w-full max-w-[1100px] mx-auto sm:grid-cols-2">
            <article v-for="f in displayedFriends" :key="f.url"
                class="rounded-[14px] border border-white/10 bg-gradient-to-br from-white/5 to-white/0 px-4 py-3.5 transition-all duration-200 hover:-translate-y-[3px] hover:border-pink-400/50 w-[290px] h-[145px] flex flex-col">
                <div class="flex items-center justify-between mb-1.5">
                    <div class="flex items-center gap-2 min-w-0">
                        <img v-if="f.avatar" :src="f.avatar" :alt="f.name" loading="lazy"
                            class="w-12 h-12 rounded-full object-cover border border-white/15" />
                        <h3 class="m-0 font-semibold text-base whitespace-nowrap overflow-hidden text-ellipsis">
                            {{ f.name }}
                        </h3>
                    </div>
                    <span class="rounded-full px-2.5 py-1 text-xs bg-purple-400/15 text-purple-300">友链</span>
                </div>

                <p class="text-sm text-white/60 flex-1 overflow-hidden truncate-lines-2 mb-2">
                    {{ f.desc || "一个有趣的站点" }}
                </p>

                <a :href="f.url" target="_blank" rel="noreferrer"
                    class="inline-flex items-center gap-1.5 mt-auto shrink-0 font-semibold text-pink-300 hover:text-pink-400 transition-all duration-200 hover:gap-2">
                    访问 →
                </a>
            </article>
        </div>
    </div>
    <section class="card flex flex-col gap-2.5">
        <div class="flex justify-center items-center align-center flex-wrap">
            <button @click="openForm"
                class="px-3 py-2 rounded-2xl border border-primary/50 bg-primary/12 text-text-primary cursor-pointer transition-all duration-200 hover:bg-primary/20 hover:border-primary/80 hover:shadow-lg hover:shadow-primary/25">
                申请友链
            </button>
        </div>
    </section>
    <Teleport to="body">
        <div v-if="showDialog" class="fixed inset-0 bg-black/45 backdrop-blur-sm flex items-center justify-center z-50"
            @click.self="closeDialog">
            <div
                class="min-w-[280px] max-w-[420px] bg-gradient-to-br from-pink-500/12 to-white/8 border border-white/15 rounded-2xl p-4 shadow-xl">
                <h3 class="m-0 mb-2">{{ dialogTitle }}</h3>
                <p class="text-text-muted text-sm mb-4">{{ dialogText }}</p>
                <div class="flex justify-end">
                    <button @click="closeDialog"
                        class="px-3 py-2 rounded-2xl border border-primary/50 bg-primary/12 text-text-primary cursor-pointer hover:bg-primary/20 transition-all">
                        好的
                    </button>
                </div>
            </div>
        </div>
    </Teleport>

    <!-- 申请友链模态弹窗 -->
    <Teleport to="body">
        <div v-if="showFormModal"
            class="fixed inset-0 bg-black/45 backdrop-blur-sm flex items-center justify-center z-50"
            @click.self="showFormModal = false">
            <div
                class="w-[92%] max-w-[540px] bg-gradient-to-br from-white/8 to-primary/6 border border-white/15 rounded-2xl p-6 shadow-xl">
                <h3 class="m-0 mb-4 text-center">申请友链</h3>

                <div class="mb-4 text-sm text-text-primary">
                    <div class="mb-2 font-semibold">请在申请前在你站点添加以下信息（示例 JSON）：</div>
                    <pre
                        class="bg-white/6 border border-white/10 rounded-lg p-3 text-xs overflow-auto"><code>{{ exampleJson }}</code></pre>
                </div>

                <form @submit.prevent="submitForm" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label class="flex flex-col gap-1 text-sm text-text-primary font-semibold sm:col-span-2">
                        网站名称 *
                        <input v-model="form.name" required placeholder="网站名称"
                            class="px-2.5 py-2 rounded-xl border border-white/20 bg-white/8 text-text-primary focus:outline-none" />
                    </label>

                    <!-- URL 与 Email 同行 -->
                    <label class="flex flex-col gap-1 text-sm text-text-primary font-semibold">
                        网站链接 *
                        <input v-model="form.url" type="url" required placeholder="https://example.com"
                            class="px-2.5 py-2 rounded-xl border border-white/20 bg-white/8 text-text-primary focus:outline-none" />
                    </label>
                    <label class="flex flex-col gap-1 text-sm text-text-primary font-semibold">
                        联系邮箱 *
                        <input v-model="form.email" type="email" required placeholder="example@example.com"
                            class="px-2.5 py-2 rounded-xl border border-white/20 bg-white/8 text-text-primary focus:outline-none" />
                    </label>

                    <!-- 描述 与 头像 同行 -->
                    <label class="flex flex-col gap-1 text-sm text-text-primary font-semibold">
                        网站描述
                        <input v-model="form.desc" placeholder="可选"
                            class="px-2.5 py-2 rounded-xl border border-white/20 bg-white/8 text-text-primary focus:outline-none" />
                    </label>
                    <label class="flex flex-col gap-1 text-sm text-text-primary font-semibold">
                        头像链接
                        <input v-model="form.avatar" type="url" placeholder="可选，展示头像"
                            class="px-2.5 py-2 rounded-xl border border-white/20 bg-white/8 text-text-primary focus:outline-none" />
                    </label>

                    <label class="flex flex-col gap-1 text-sm text-text-primary font-semibold sm:col-span-2">
                        想说的话
                        <div class="flex items-center gap-2">
                            <textarea v-model="form.message" placeholder="可选，最多50字" maxlength="50"
                                class="flex-1 px-2.5 py-2 rounded-xl border border-white/20 bg-white/8 text-text-primary h-24 resize-none"></textarea>
                        </div>
                    </label>

                    <div class="sm:col-span-2 flex items-center justify-center gap-3 mt-2">
                        <button type="button" @click="showFormModal = false"
                            class="px-3 py-2 rounded-2xl border border-white/10 bg-white/6">
                            取消
                        </button>
                        <button type="submit" :disabled="loading"
                            class="px-3 py-2 rounded-2xl border border-primary/50 bg-primary/12 text-text-primary disabled:opacity-50">
                            {{ loading ? "提交中..." : "提交" }}
                        </button>
                    </div>
                    <div class="sm:col-span-2">
                        <span class="text-text-muted text-sm">{{ message }}</span>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { reactive, ref, watch, computed } from "vue";
import siteConfig from "../config/siteConfig";
const props = defineProps({ friends: { type: Array, default: () => [] } });
const showFormModal = ref(false);
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
    message: "",
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

const exampleJson = computed(() => {
    const name = siteConfig.profile?.name || siteConfig.siteMeta?.title || "";
    const url = siteConfig.siteMeta?.url || "";
    const desc = siteConfig.profile?.bio || "";
    const email = siteConfig.profile.email || "";
    const avatarRaw = siteConfig.profile?.avatar || "";
    const avatar = resolveUrl(avatarRaw);
    return JSON.stringify({ name, url, desc, email, avatar }, null, 2);
});

const openForm = () => {
    showFormModal.value = true;
};

// resolve possible local paths to absolute URLs using site meta URL
const resolveUrl = (p) => {
    if (!p) return "";
    const s = String(p).trim();
    if (/^https?:\/\//i.test(s) || /^\/\//.test(s)) return s;
    const base = (siteConfig.siteMeta && siteConfig.siteMeta.url) ? String(siteConfig.siteMeta.url).replace(/\/$/, "") : "";
    if (!base) return s;
    if (s.startsWith("/")) return base + s;
    return base + "/" + s;
};

const submitForm = async () => {
    loading.value = true;
    message.value = "";
    try {
        const resp = await fetch("/api/send-mail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (!resp.ok) throw new Error("send failed");
        form.name = "";
        form.url = "";
        form.desc = "";
        form.email = "";
        form.avatar = "";
        form.message = "";
        message.value = "提交成功，已发送申请邮件";
        showFormModal.value = false;
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
