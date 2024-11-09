<template>
  <div class="gvb_login">
  </div>
  <div class="gvb_login_mask">
    <div class="gvb_display_windows">
      <div class="gvb_display_image">
        <login_display></login_display>
      </div>
    </div>
    <div class="gvb_login_windows">
      <gvb_login_form @ok="ok" :qq-redirect-path="back"></gvb_login_form>
    </div>
  </div>

</template>
<script setup lang="ts">
import Gvb_login_form from "@/components/common/gvb_login_form.vue";
import router from "@/router";
import {useRoute} from "vue-router";
import {qqLoginApi} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
import {useStore} from "@/stores";
import login_display from "@/global/login_display.vue";



interface routerQuery {
  flag?: string
  code?: string
}
interface historyState {
  back: string
}
const back = (window.history.state as historyState).back
const store = useStore();
const route = useRoute();

function ok() {
  let back = window.history.state.back
  // 拿不到之前的数据就跳转首页
  if (back === null) {
    router.push({name: "index"})
    return
  }
  router.push(back)
}
async function init(query: routerQuery) {
  if (!query.code || !query.flag) {
    return
  }
  let res = await qqLoginApi(query.code)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  store.setToken(res.data)

  // 重定向到点击登录的页面
  let path = localStorage.getItem("redirectPath")
  if (path === null) {
    path = "/"
  }
  router.push(path)
}

init(route.query)


</script>
<style lang="scss">

.gvb_login {
  background-image: url("/image/login.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  filter: blur(5px); /* 应用模糊效果 */
  position: relative;

}

.gvb_login_mask {
  top: 20%;
  left: 20%;
  width: 60%;
  height: 60%;
  position: absolute;

  border-radius: 5px;
  border-bottom: 1px solid var(--line);
  border-right: 1px solid var(--line);
  //box-shadow: 50px 50px 100px var(--shadow);


  //颜色渐变效果，背景
  background: linear-gradient(to right bottom,
      rgba(112, 105, 93, 0.5),
      rgba(192, 214, 419, 0.5),
      rgb(129, 127, 127, 0.5));


  .gvb_display_windows {
    left: 0;
    width: 63%;
    height: 100%;
    position: absolute;


    .gvb_display_image {
      top: 2.5%;
      left: 2.5%;
      height: 95%;
      width: 97.5%;
      position: absolute;
      border-radius: 2.5%;
      background-image: url("/image/login.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      display: flex;
      justify-content: center;
      align-items: center;

    }


  }


  .gvb_login_windows {
    right: 0;
    width: 34%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;


    // 输入信息判定的提示框
    .arco-form-item-message {
      color: #0707e3;
    }
  }
}
</style>