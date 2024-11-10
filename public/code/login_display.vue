<template>
  <div class="login-display">
    <div class="quote-box">
      <div v-for="(quote, index) in lyrics" :key="index" class="quote-item">
        <p>{{ quote }}</p>
      </div>
      <!-- 歌名和原唱 -->
      <div class="song-info">
        <p class="song-title">《On My Own》</p>
        <p class="artist-name">——Blitz Kids</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "LoginDisplay",
  setup() {
    // 歌词内容
    const lyrics = [
      "To save me",
      "Don't leave me on my own",
      "Until I'm fully grown",
      "I'm not gonna be the only one",
      "To reap what I don't sow"
    ];

    return {lyrics};
  },
});
</script>

<style scoped lang="scss">
.login-display {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .quote-box {
    position: relative;
    z-index: 2;
    height: 100%;
    width: 100%;
    padding: 20px; /* 增加一些内边距，避免歌词与边缘太近 */
    color: var(--color-neutral-10);
    font-weight: bolder;
    font-size: 18px;
    text-align: center;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-style: italic;
    min-height: 300px; /* 确保有足够的空间显示歌名 */
  }

  .song-info {
    position: absolute;
    bottom: 20px; /* 增加底部间距，确保与底部有一定距离 */
    right: 10px;
    color: white;
    text-align: right;
    font-size: 14px;
    z-index: 10;
  }

  .song-title {
    font-weight: bolder;
    font-size: 18px;
  }

  .artist-name {
    font-style: italic;
    font-size: 14px;
  }

}
</style>
