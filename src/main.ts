import { createApp } from "vue";
import { VueUmamiPlugin } from "@jaseeey/vue-umami-plugin";
import App from "./App.vue";
import router from "./router";
import "./styles.css";
import siteConfig from "./config/siteConfig";

const app = createApp(App);

if (process.env.NODE_ENV !== "development") {
    if (siteConfig.umami?.enable) {
        app.use(VueUmamiPlugin({ websiteID: siteConfig.umami.websiteId, scriptSrc: siteConfig.umami.url, router }));
    }
}

app.use(router).mount("#app");
