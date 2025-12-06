import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Sites from "../views/Sites.vue";
import Projects from "../views/Projects.vue";
import Friends from "../views/Friends.vue";

const routes: RouteRecordRaw[] = [
    { path: "/", name: "Home", component: Home, meta: { order: 0, label: "首页" } },
    { path: "/about", name: "About", component: About, meta: { order: 1, label: "关于" } },
    { path: "/sites", name: "Sites", component: Sites, meta: { order: 2, label: "网站" } },
    { path: "/projects", name: "Projects", component: Projects, meta: { order: 3, label: "项目" } },
    { path: "/friends", name: "Friends", component: Friends, meta: { order: 4, label: "友链" } },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
