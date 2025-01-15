<template>
  <div class="gvb_banner">
    <div class="head">
      <div class="slogan">{{ data.slogan }}</div>
      <div class="abstract">
        <VueTyped :strings="data.abstract" loop>
          <span class="typing"></span>
        </VueTyped>
      </div>
    </div>
    <a-carousel
        :auto-play="{interval: data.banner_time * 1000}"
        indicator-type="dot"
        show-arrow="hover"
    >
      <a-carousel-item v-for="item in data.banners">
        <img class="banner_image" alt="" :src="item.path"/>
      </a-carousel-item>
    </a-carousel>
  </div>
</template>
<script setup lang="ts">
import {reactive} from "vue";
import {menuDetailApi, type menuType} from "@/api/menu_api";
import VueTyped from "vue3typed/libs/typed/index.vue"

const data = reactive<menuType>({
  title: "",
  path: "",
  slogan: "",
  abstract: [],
  banner_time: 7,
  abstract_time: 7,
  banners: [],
  created_at: "",
  id: 0,
  sort: 0,
})

async function getData() {
  const key = `menus__${location.pathname}`
  const val = sessionStorage.getItem(key)
  if (val !== null) {
    try {
      const jsonData = JSON.parse(val)
      console.log(jsonData)
      Object.assign(data, jsonData)
      return
    } catch (e) {
    }
  }
  let res = await menuDetailApi(location.pathname)
  Object.assign(data, res.data)
  sessionStorage.setItem(key, JSON.stringify(data))

}

getData()
</script>

<style lang="scss">
.gvb_banner {
  width: 100%;
  height: 700px;

  .head {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    color: white;

    .slogan {
      font-size: 30px;
      font-weight: 400;
      text-align: center;
      margin-bottom: 10px;
    }

    .abstract {

      font-size: 18px;
      text-align: center;
    }

  }

  .arco-carousel {
    height: 100%;

    .banner_image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>