import { defineNuxtPlugin } from "#app";
import siteConfig from "~/config/siteConfig";

type NeteaseMiniPlayerGlobal = {
  init?: () => void;
};

type NeteaseWindow = Window & {
  NeteaseMiniPlayer?: NeteaseMiniPlayerGlobal;
  __NETEASE_MUSIC_CONFIG__?: unknown;
};

export default defineNuxtPlugin(() => {
  if (import.meta.server) return;

  // 检查配置是否启用了音乐播放器
  if (!siteConfig.music?.enable) {
    return;
  }

  // 在本地开发环境禁用网易音乐播放器，避免网络超时
  // if (
  //     typeof window !== "undefined" &&
  //     (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  // ) {
  //     console.log("Netease Music Player disabled on localhost");
  //     return;
  // }

  const cssHref = "/css/netease-mini-player-v2.css";
  const scriptSrc = "/js/netease-mini-player-v2.js";

  const ensureStyle = () => {
    if (document.querySelector(`link[href="${cssHref}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssHref;
    link.onerror = () => {
      console.warn("Failed to load Netease music player styles");
    };
    document.head.appendChild(link);
  };

  const ensureScript = () =>
    new Promise<void>((resolve) => {
      // 检查全局对象是否已存在，表示脚本已加载
      const anyWin = window as NeteaseWindow;
      if (anyWin.NeteaseMiniPlayer) {
        resolve();
        return;
      }

      const existing = document.querySelector(
        `script[src="${scriptSrc}"]`
      ) as HTMLScriptElement | null;
      if (existing) {
        // 脚本已存在但未加载，等待它加载
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => resolve(), { once: true });
        return;
      }

      // 脚本不存在，创建并加载
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        console.warn("Failed to load Netease music player script");
        resolve();
      };
      document.body.appendChild(script);
    });

  const initPlayer = () => {
    const anyWin = window as NeteaseWindow;

    // 将 siteConfig 的音乐配置传递给全局 window 对象
    if (!anyWin.__NETEASE_MUSIC_CONFIG__) {
      anyWin.__NETEASE_MUSIC_CONFIG__ = siteConfig.music;
    }

    if (anyWin.NeteaseMiniPlayer?.init) {
      try {
        anyWin.NeteaseMiniPlayer.init();
      } catch (error) {
        console.warn("Failed to initialize Netease music player:", error);
      }
    }
  };

  // 使用超时机制防止永久挂起
  const timeout = setTimeout(() => {
    console.warn("Netease music player initialization timeout");
  }, 15000);

  ensureStyle();
  ensureScript().then(() => {
    clearTimeout(timeout);
    initPlayer();
  });
});
