<template>
  <Gvb_config title="jwt配置"
              name="jwt"
              :left-width="isLaptops1 ? 50:40"
              :right-with="isLaptops1 ? 50:60"
              :column="column"
              :help-data="helpList">

  </Gvb_config>
</template>
<script setup lang="ts">
import Gvb_config from "@/components/admin/gvb_config.vue";
import type {configColumnType} from "@/types";
import type {jwtType} from "@/api/settings_api";

const isLaptops1 = isLaptops

const column: configColumnType<jwtType>[] = [
  {label: "秘钥", field: "secret", iptType: "password", rules: [{required: true, message: '请输入密钥'}]},
  {label: "颁发人", field: "issuer", rules: [{required: true, message: '请输入颁发人'}]},
  {label: "过期时间", field: "expires", type: "number"},
]

const helpList = [
  {
    title: "密钥",
    abs: "用于jwt加解秘，请妥善保管",
    content: ``
  },
  {
    title: '过期时间',
    abs: '单位小时',
    content: ''
  },
]


</script>