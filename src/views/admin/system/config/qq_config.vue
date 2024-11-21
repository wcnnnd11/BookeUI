<template>
  <Gvb_config title="QQ配置"
              name="qq"
              :left-width="45"
              :right-with="55"
              :label-span="4"
              :wrapper-span="20"
              :column="column"
              :help-data="helpList">
    <template #alert>
      <a-alert style="margin-top: 20px">
        (〃￣︶￣)人(￣︶￣〃) (;´༎ຶД༎ຶ`) <( ￣^￣)(θ(θ☆( >_<)☆θ)θ)
      </a-alert>
    </template>

  </Gvb_config>
</template>
<script setup lang="ts">
import Gvb_config from "@/components/admin/gvb_config.vue";
import type {configColumnType} from "@/types";
import type {qqType} from "@/api/settings_api";

const column:configColumnType<qqType>[] = [
  {label: "appID", field: "app_id", rules: [{required: true, message: '请输入appID'}], placeholder: "appID"},
  {label: "appKey", iptType: "password", field: "key", rules: [{required: true, message: '请输入appKey'}], placeholder: "appKey"},
  {label: "回调地址", field: "redirect", rules: [{required: true, message: '请输入回调地址'}], placeholder: "回调地址"},

]

const helpList = [
  {
    title: "appID,appKey",
    abs: "QQ互联中去申请",
    content: `
<p>先去qq互联(https:/connect.qq.com/)进行实名认证</p>
<p>然后创建一个网站应用，等待审核(被刷了N次了，没有demo啊啊啊啊啊)</p>
<p>通过后可以获得appID,appKey</p>
   `
  },
  {
    title: '回调地址',
    abs: 'QQ登录成功后回调的地址',
    content: '不是被刷就是被刷的路上，先弄个demo吧 || (ノ｀Д)ノ  ||'
  },
]


</script>