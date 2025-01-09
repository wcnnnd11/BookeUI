<template>
  <Gvb_config title="邮箱配置"
              name="email"
              :left-width="isLaptops1 ? 47:37"
              :right-with="isLaptops1 ? 53:63"
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
import type {emailType} from "@/api/settings_api";

const isLaptops1 = isLaptops

const column: configColumnType<emailType>[] = [
  {label: "邮箱域名", field: "host", rules: [{required: true, message: '请输入邮箱域名'}]},
  {label: "邮箱端口", type: "number", field: "port", rules: [{required: true, message: '请输入邮箱端口'}]},
  {label: "发信邮箱", field: "user", rules: [{required: true, message: '请输入发信邮箱'}]},
  {label: "密码", field: "password", iptType: "password", rules: [{required: true, message: '请输入密码'}]},
  {label: "发信名称", field: "default_from_email", rules: [{required: true, message: '请输入发信名称'}]},
  {label: "ssl", field: "use_ssl", type: "boolean"},
  {label: "tls", field: "user_tls", type: "boolean"},
]


const helpList = [
  {
    title: "邮箱域名，邮箱端口",
    abs: "每个邮箱服务的smtp域名和端口都不一样，请仔细检查",
    content: `
    参考链接：<a href="https://blog.csdn.net/weixin_45932157/article/details/110540628" target="_blank">https://blog.csdn.net/weixin_45932157/article/details/110540628</a>
    `
  },
  {
    title: '发信邮箱与密码',
    abs: '密码不一定是你的邮箱登录密码',
    content: '<img src="https://i-blog.csdnimg.cn/blog_migrate/881b2192675cd49f990fee3ec4c2278c.png" alt="不是吧哥们，tm图片怎么又不显示，我吐了 || (ノ｀Д)ノ  ||">'
  },
  {
    title: '发信名称',
    abs: '实际发给用户的邮件上对应的显示名称',
    content: '',
  },
  {
    title: 'ssl',
    abs: '是否启用ssl传输',
    content: '启用ssl之后，对应的端口后可能需要做出调整',
  }
]


</script>