<template>
  <div class="site_config">
    <div class="left">
      <div class="site_info">
        <gvb_title title="站点配置"></gvb_title>
        <a-form ref="formRef" :model="siteForm" :label-col-props="{span: isLaptops1?5:4}" :wrapper-col-props="{span:18}">
          <a-form-item field="title" label="网站标题" :rules="[{required:true,message:'请输入网站标题'}]"
                       :validate-trigger="['blur']">
            <a-input v-model="siteForm.title" placeholder="网站标题"></a-input>
          </a-form-item>
          <a-form-item field="slogan" label="slogan" :rules="[{required:true,message:'请输入slogan'}]"
                       :validate-trigger="['blur']">
            <a-input v-model="siteForm.slogan" placeholder="slogan"></a-input>
          </a-form-item>
          <a-form-item field="slogan_en" label="slogan-en" :rules="[{required:true,message:'请输入英文slogan'}]"
                       :validate-trigger="['blur']">
            <a-input v-model="siteForm.slogan_en" placeholder="英文slogan"></a-input>
          </a-form-item>
          <a-form-item field="bei_an" label="备案号">
            <a-input v-model="siteForm.bei_an" placeholder="备案号"></a-input>
          </a-form-item>
          <a-form-item field="version" label="版本号">
            <a-input v-model="siteForm.version" placeholder="版本号"></a-input>
          </a-form-item>
          <a-form-item field="created_at" label="建站日期">
            <a-input v-model="siteForm.created_at" placeholder="建站日期"></a-input>
          </a-form-item>
          <a-form-item field="qq_image" label="qq二维码">
            <gvb_upload_image v-model="siteForm.qq_image" placeholder="qq二维码"></gvb_upload_image>
          </a-form-item>
          <a-form-item field="wechat_image" label="微信二维码">
            <gvb_upload_image v-model="siteForm.wechat_image" placeholder="微信二维码"></gvb_upload_image>
          </a-form-item>
        </a-form>
      </div>
      <div class="site_config_update">
        <a-button type="primary" @click="siteInfoUpdate">更新</a-button>
      </div>
    </div>
    <div class="right">
      <div class="user_info">
        <gvb_title title="用户信息"></gvb_title>
        <a-form :model="siteForm" :label-col-props="{span: 3}" :wrapper-col-props="{span:20}">
          <a-form-item label="昵称">
            <a-input v-model="siteForm.name" placeholder="昵称"></a-input>
          </a-form-item>
          <a-form-item label="工作">
            <a-input v-model="siteForm.job" placeholder="工作"></a-input>
          </a-form-item>
          <a-form-item label="地址">
            <a-input v-model="siteForm.addr" placeholder="地址"></a-input>
          </a-form-item>
          <a-form-item label="邮箱">
            <a-input v-model="siteForm.email" placeholder="邮箱"></a-input>
          </a-form-item>
        </a-form>
      </div>
      <div class="link_info">
        <gvb_title title="链接信息"></gvb_title>
        <a-form :model="siteForm" :label-col-props="{span:isLaptops1?4:3}" :wrapper-col-props="{span:isLaptops1?19:20}">
          <a-form-item label="哔哩哔哩">
            <a-input v-model="siteForm.bilibili_url" placeholder="哔哩哔哩"></a-input>
          </a-form-item>
          <a-form-item label="gitee">
            <a-input v-model="siteForm.gitee_url" placeholder="gitee"></a-input>
          </a-form-item>
          <a-form-item label="github">
            <a-input v-model="siteForm.github_url" placeholder="github"></a-input>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Gvb_title from "@/components/common/gvb_title.vue";
import {reactive, ref} from "vue";
import type {siteInfoType} from "@/api/settings_api";
import Gvb_upload_image from "@/components/common/gvb_upload_image.vue";
import {siteInfoUpdateApi} from "@/api/settings_api";
import {siteInfoApi} from "@/api/settings_api";
import {Message} from "@arco-design/web-vue";

const isLaptops1 = isLaptops

const siteForm = reactive<siteInfoType>({
  addr: "",
  bei_an: "",
  bilibili_url: "",
  created_at: "",
  email: "",
  gitee_url: "",
  github_url: "",
  job: "",
  name: "",
  qq_image: "",
  slogan: "",
  slogan_en: "",
  title: "",
  version: "",
  web: "",
  wechat_image: "",
})

async function getData(){
  let res =await siteInfoApi()
  Object.assign(siteForm,res.data)
}

getData()

const formRef = ref()

async function siteInfoUpdate() {
    let validationResult = await formRef.value.validate();
    console.log("Validation result:", validationResult); // 如果验证成功，通常返回 undefined 或 true
    let res = await siteInfoUpdateApi(siteForm);
    console.log("API response:", res);
    if (res.code) {
      Message.error(res.msg || "更新失败");
      return;
    }
    Message.success(res.msg || "更新成功");
}



</script>
<style lang="scss">
.site_config {
  display: flex;

  .left {
    width: 50%;
    .site_config_update{
      margin-top: 10px;
    }
  }
  .arco-form{
    margin-top: 10px;
  }

  .right {
    width: 50%;
  }
}



</style>