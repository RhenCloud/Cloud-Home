<template>
  <div
    v-if="music.enable && (music.playlistId || music.songId)"
    class="netease-mini-player"
    :data-playlist-id="music.mode === 'floating' ? music.playlistId : undefined"
    :data-song-id="music.mode === 'embed' ? music.songId : undefined"
    :data-embed="music.mode === 'embed'"
    :data-position="music.position"
    :data-lyric="music.lyric"
    :data-theme="music.theme"
    :data-autoplay="music.autoplay"
    :data-default-minimized="music.defaultMinimized"
    :data-auto-pause="music.autoPause"
    :data-api-urls="JSON.stringify(music.apiUrls)"
  />
</template>

<script setup lang="ts">
import { siteConfig } from "~/config";

const music = siteConfig.music;
</script>
