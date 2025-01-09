<template>
  <Gvb_config title="七牛云配置"
              name="qiniu"
              :left-width="isLaptops1 ? 55:45"
              :right-with="isLaptops1 ? 45:55"
              :label-span="5"
              :wrapper-span="19"
              :column="column"
              :help-data="helpList">
    <template #alert>
      <a-alert style="margin-top: 20px">
        \(￣︶￣*\))(👉ﾟヮﾟ)👉👈(ﾟヮﾟ👈)((/*￣︶￣)/
      </a-alert>
    </template>
  </Gvb_config>

</template>
<script setup lang="ts">
import Gvb_config from "@/components/admin/gvb_config.vue";
import type {configColumnType} from "@/types";
import type {qiniuType} from "@/api/settings_api";

const isLaptops1 = isLaptops


const column: configColumnType<qiniuType>[] = [
  {field: "access_key", label: "access_key", rules: [{required: true, message: '请输入access_key'}]},
  {
    field: "secret_key",
    iptType: "password",
    label: "secret_key",
    rules: [{required: true, message: '请输入secret_key'}]
  },
  {field: "bucket", label: "存储桶", rules: [{required: true, message: '请输入存储桶'}]},
  {field: "cdn", label: "域名", rules: [{required: true, message: '请输入域名'}]},
  {field: "zone", label: "地区", rules: [{required: true, message: '请输入地区'}]},
  {field: "prefix", label: "图片前缀"},
  {field: "size", label: "大小限制", type: "number"},
  {field: "enable", label: "是否启用", type: "boolean"},
]

const helpList = [
  {
    title: "access_key，secret_key",
    abs: "个人中心->秘钥管理",
    content: `
    参考链接：<img src="//" alt="这里应该是个图片，但是我测试的端口是127开头访问不了的(ノへ￣、)">
    `
  },
  {
    title: 'bucket',
    abs: '对象存储->空间管理',
    content: '<img src="//" alt="这里也应该是个图片，但是我测试的端口是127开头访问不了的(ノへ￣、)">'
  },
  {
    title: '域名',
    abs: '七牛云的对象存储域名，后面加上 " / " ',
    content: '',
  },
  {
    title: '地区',
    abs: '填写地区对应的代码',
    content: '华东-浙江  z0' +
        '<br/>' +
        '华北-河北  z1' +
        '<br/>' +
        '华南-广东  z2' +
        '<br/>' +
        '北美-洛杉矶  na0' +
        '<br/>' +
        '亚太-新加坡（原东南亚） as0' +
        '<br/>' +
        '华东-浙江2  ca-east-2' +
        '<br/>' +
        '亚太-河内' +
        '<br/>' +
        '亚太-胡志明' +
        '<br/>' +
        '西北-陕西1',
  },
  {
    title: '图片前缀',
    abs: '可以理解为图片上传到哪个目录',
    content: '',
  },
  {
    title: '大小限制',
    abs: '限制图片上传的大小单位',
    content: '',
  },
]


</script>