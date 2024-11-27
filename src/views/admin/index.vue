<template>
  <div class="gvb_admin">
    <aside :class="{collapsed: store.collapsed}">
      <Gvb_logo></Gvb_logo>
      <Gvb_menu></Gvb_menu>
    </aside>
    <main>
      <div class="gvb_head">
        <Gvb_bread_crumb></Gvb_bread_crumb>
        <div class="gvb_function_area">
          <IconHome class="action_icon" @click="goIndex"></IconHome>
          <Gvb_theme></Gvb_theme>
          <Gvb_user_info_menu></Gvb_user_info_menu>
        </div>
      </div>
      <Gvb_tabs></Gvb_tabs>
      <div class="gvb_container">
        <router-view v-slot="{Component}">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>
    </main>

  </div>
</template>
<script setup lang="ts">
import Gvb_menu from "@/components/admin/gvb_menu.vue";
import Gvb_bread_crumb from "@/components/admin/gvb_bread_crumb.vue";
import Gvb_logo from "@/components/admin/gvb_logo.vue";
import Gvb_theme from "@/components/common/gvb_theme.vue";
import type {Component} from "vue";
import {useRoute, useRouter} from "vue-router";
import {IconMenu, IconUser} from "@arco-design/web-vue/es/icon";
import Gvb_tabs from "@/components/admin/gvb_tabs.vue";
import {IconHome, IconDown,} from '@arco-design/web-vue/es/icon';
import {useStore} from "@/stores";
import Gvb_user_info_menu from "@/components/common/gvb_user_info_menu.vue";

const store = useStore()
const route = useRoute()
const router = useRouter()
function goIndex() {
  router.push({
    name: "index"
  })
}

</script>
<style scoped>
.gvb_admin {
  display: flex;
  color: var(--color-text-2);
  height: 100vh;


  aside {
    width: 240px;
    border-right: 1px solid var(--bg);
    height: 100vh;
    background-color: var(--color-bg-1);
    position: relative;
    transition: all .3s;

  }

  aside.collapsed {
    width: 49px;


    & ~ main {
      width: calc(100% - 49px);
    }
  }

  main {
    width: calc(100% - 240px);
    overflow-x: hidden;
    overflow-y: auto;
    transition: all .3s;


    .gvb_head {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid var(--bg);
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      align-items: center;
      background-color: var(--color-bg-1);


      .gvb_function_area {
        display: flex;
        align-items: center;


        .action_icon {
          margin-right: 10px;
          cursor: pointer;
          font-size: 16px;
          transition: color .3s;

          &:hover {
            color: var(--active);
          }
        }


      }
    }

    .gvb_container {
      background-color: var(--bg);
      min-height: calc(100vh - 90px);
      padding: 20px;
    }


  }
}


</style>