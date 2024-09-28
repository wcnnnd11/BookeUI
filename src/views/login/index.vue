<template>
  <div class="gvb_login">
  </div>
    <div class="gvb_login_mask">
    <div class="gvb_display_windows">
      <div class="gvb_display_image">
      </div>
    </div>
    <div class="gvb_login_windows">
      <gvb_login_form @ok="ok"></gvb_login_form>
    </div>
    </div>

</template>
<script setup lang="ts">
import Gvb_login_form from "@/components/common/gvb_login_form.vue";
import router from "@/router";



function ok(){
  let back = window.history.state.back
  // 拿不到之前的数据就跳转首页
  if (back===null){
    router.push({name:"index"})
    return
  }
  router.push(back)
}


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
      rgba(112,105,93 ,0.5),
      rgba(192,214,419,0.5 ),
      rgb(129, 127, 127,0.5));


  .gvb_display_windows{
    left: 0;
    width: 63%;
    height: 100%;
    position: absolute;


    .gvb_display_image{
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

    }


  }


  .gvb_login_windows{
    right: 0;
    width: 34%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;



    // 输入信息判定的提示框
    .arco-form-item-message{
      color: #0707e3;
    }

  }


}
</style>