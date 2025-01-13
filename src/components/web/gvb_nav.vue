<template>
  <div class="gvb_nav">
    <div class="gvb_nav_container">
      <div class="left">
        <div class="logo">
          <div class="slogan">博书</div>
          <div class="en_slogan">BOOKE</div>

        </div>
        <div class="nav">
          <template v-for="item in navList">
            <a target="_blank" :href="item.path" v-if="item.path.startsWith('http')"
               :title="item.title">{{ item.title }}</a>
            <router-link :to="item.path" v-else>{{ item.title }}</router-link>
          </template>
        </div>
        <div class="search">
          <IconSearch></IconSearch>
        </div>
      </div>
      <div class="right">
        <div class="login" v-if="!store.isLogin">
          <router-link :to="{name:'login'}">登录</router-link>
        </div>
        <div class="user_info" v-else>
          <gvb_user_info_menu></gvb_user_info_menu>

        </div>
        <div class="theme">
          <Gvb_theme></Gvb_theme>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {IconSearch} from "@arco-design/web-vue/es/icon";
import Gvb_theme from "@/components/common/gvb_theme.vue";
import {useStore} from "@/stores"
import Gvb_user_info_menu from "@/components/common/gvb_user_info_menu.vue";
import {menuNameListApi} from "@/api/menu_api";
import type {menuNameType} from "@/api/menu_api";

const store = useStore();

const navList = ref<menuNameType[]>([]);

async function getData() {

  const val = sessionStorage.getItem("navList")
  if (val !== null) {
    try {
      navList.value = JSON.parse(val)
      return
    } catch (e) {
    }

  }

  let res = await menuNameListApi()
  navList.value = res.data

  sessionStorage.setItem("navList", JSON.stringify(navList.value))
}

getData()

</script>
<style lang="scss">
.gvb_nav {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: white;
  font-family: 幼圆;

  a {
    text-decoration: none;
    color: var(--color-text-1);
  }

  .gvb_nav_container {
    width: 80%;
    height: 60px;
    display: flex;
    align-items: center;

    .left {
      width: 70%;
      display: flex;
      align-items: center;

      .logo {
        margin-right: 40px;

        .slogan {
          font-size: 20px;
        }

        .en_slogan {
          font-size: 16px;
          margin-top: 1px;
          color: var(--color-text-2);
        }
      }

      .nav {
        > a {
          margin-right: 20px;
          font-size: 15px;

        }
      }

      .search {
        svg {
          cursor: pointer;
        }
      }
    }

    .right {
      width: 30%;
      display: flex;
      justify-content: end;

      .theme {
        margin-left: 20px;
        display: flex;
        align-items: center;

        svg {
          cursor: pointer;
        }
      }

      .login {
        font-size: 15px;
      }
    }

  }
}
</style>