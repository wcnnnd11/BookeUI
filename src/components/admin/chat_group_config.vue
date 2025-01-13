<template>
  <div class="chat_group_config_view">
    <gvb_title title="群聊设置">
    </gvb_title>
    <div class="chat_group" v-if="isShow" style="margin-top: 20px">
      <a-form :model="form" :label-col-props="{span:6}" :wrapper-col-props="{span:18}">
        <a-form-item label="匿名群聊">
          <a-switch v-model="form.isAnonymous"></a-switch>
          <template #extra>开启后，无需登录也能聊</template>
        </a-form-item>
        <a-form-item label="显示时间">
          <a-switch v-model="form.isShowTime"></a-switch>
          <template #extra>悬浮消息，显示时间</template>
        </a-form-item>
        <a-form-item label="初始条数">
          <a-input-number v-model="form.defaultLimit" placeholder="初始条数"/>
          <template #extra>聊天记录的条数</template>
        </a-form-item>
        <a-form-item label="欢迎语">
          <a-input v-model="form.welcomeTitle" placeholder="欢迎语"/>
          <template #extra>聊天室名称</template>
        </a-form-item>
        <a-form-item label="显示人数">
          <a-switch v-model="form.isOnlinePeople"></a-switch>
          <template #extra>开启后，显示在线人数</template>
        </a-form-item>
        <a-form-item label="可发图片">
          <a-switch v-model="form.isSendImage"></a-switch>
          <template #extra>开启后，可发送图片</template>
        </a-form-item>
        <a-form-item label="粘贴上传">
          <a-switch v-model="form.isPaste"></a-switch>
          <template #extra>开启后，可在输入框粘贴图片</template>
        </a-form-item>
        <a-form-item label="支持MD">
          <a-switch v-model="form.isMd"></a-switch>
          <template #extra>用户可输入markdown语法</template>
        </a-form-item>
        <a-form-item label="文本长度">
          <a-input-number v-model="form.contentLength" placeholder="文本长度"/>
          <template #extra>可输入聊天内容的最大长度</template>
        </a-form-item>
      </a-form>
      <a-button type="primary" @click="updateConfig">更新设置</a-button>
    </div>
  </div>

</template>
<script setup lang="ts">
import Gvb_title from "@/components/common/gvb_title.vue";
import {reactive, ref} from "vue";
import type {chatGroupConfigType} from "@/api/chat_api";
import {settingsInfoApi, settingsInfoUpdateApi} from "@/api/settings_api";
import {Message} from "@arco-design/web-vue";
import type {baseResponse} from "@/api";

const form = reactive<chatGroupConfigType>({
  isAnonymous: true,
  isShowTime: false,
  defaultLimit: 50,
  welcomeTitle: "书中",
  isOnlinePeople: true,
  isSendImage: false,
  isPaste: false,
  isSendFile: false,
  isMd: false,
  contentLength: 100,
})

const isShow = ref(false)

async function getConfig() {
  let res = await settingsInfoApi("chat_group") as baseResponse<chatGroupConfigType>
  isShow.value = true
  if (res.code) Message.error(res.msg)
  Object.assign(form, res.data)
}

getConfig()

async function updateConfig() {
  let res = await settingsInfoUpdateApi("chat_group", form)
  if (res.code) Message.error(res.msg)
  Message.success(res.msg)
  await getConfig()
}
</script>
<style lang="scss">

</style>