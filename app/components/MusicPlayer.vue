<template>
    <div v-if="music.enable && (music.playlistId || music.songId)" class="netease-mini-player"
        :data-playlist-id="music.mode === 'floating' ? music.playlistId : undefined"
        :data-song-id="music.mode === 'embed' ? music.songId : undefined" :data-embed="music.mode === 'embed'"
        :data-position="music.position" :data-lyric="music.lyric" :data-theme="music.theme"
        :data-autoplay="music.autoplay" :data-default-minimized="music.defaultMinimized"
        :data-auto-pause="music.autoPause" :data-api-urls="JSON.stringify(music.apiUrls)"></div>
</template>

<script setup lang="ts">
import siteConfig from "~/config/siteConfig";

const music = siteConfig.music;
</script>

<!-- <style scoped>
/* 音乐播放器样式由 NeteaseMiniPlayer 提供 */
/* 使用 display: contents 使外层容器不占用空间 */
/* 确保播放器浮动定位，不影响页面布局 */
:deep(.netease-mini-player) {
    position: fixed !important;
    z-index: 999 !important;
}
</style> -->
