<template>
  <div class="user_info_view">
    <div class="left">
      <gvb_cropper ref="clipperRef"
                   :type="clipperData.type"
                   :allow-type-list="clipperData.allowTypeList"
                   :limit-size="clipperData.limitSize"
                   :fixed-number="clipperData.fixedNumber"
                   :fixed-number-aider="clipperData.fixedNumberAider"
                   :preview-width="clipperData.previewWidth"
                   @confirm="onConfirm"/>
      <gvb_title title="用户信息"></gvb_title>
      <a-form ref="formRef" :model="form" :label-col-props="{span:isLaptops1? 6:4}"
              :wrapper-col-props="{span:isLaptops1? 18:20}">
        <a-form-item label="用户名">
          <span>{{ form.user_name }}</span>
        </a-form-item>
        <a-form-item label="头像">
          <a-avatar @click="showCropper" :image-url="form.avatar"></a-avatar>
        </a-form-item>
        <a-form-item field="nick_name" label="昵称"
                     :rules="[{required:true,message:'请输入昵称'}]"
                     :validate-trigger="['blur']">
          <a-input @change="userInfoUpdate" v-model="form.nick_name" placeholder="昵称"></a-input>
        </a-form-item>

        <a-form-item label="我的签名">
          <a-textarea @change="userInfoUpdate" v-model="form.sign" placeholder="我的签名"
                      :auto-size="{minRows:3,maxRows:3}"></a-textarea>
        </a-form-item>
        <a-form-item label="我的博客">
          <a-input @change="userInfoUpdate" v-model="form.link" placeholder="我的博客"></a-input>
        </a-form-item>

        <a-form-item label="邮箱">
          <span>{{ form.email }}</span>
        </a-form-item>
        <a-form-item label="当前角色">
          <span>{{ form.role }}</span>
        </a-form-item>
        <a-form-item label="注册来源">
          <span>{{ form.sign_status }}</span>
        </a-form-item>
        <a-form-item label="用户积分">
          <span>{{ form.integral }}</span>
        </a-form-item>
      </a-form>
      <gvb_title title="操作"></gvb_title>

      <gvb_update_password v-model:visible="updatePasswordVisible"></gvb_update_password>
      <gvb_bind_email v-model:visible="bindEmailVisible"></gvb_bind_email>

      <div class="action_group">
        <a-button @click="bindEmailVisible=true" type="primary">绑定邮箱</a-button>
        <a-button @click="updatePasswordVisible=true" type="primary">修改密码</a-button>
        <a-button type="primary" status="danger" @click="logOut">注销退出</a-button>
      </div>
    </div>

    <div class="right">
      <gvb_title title="预览"></gvb_title>
      <div class="user_info_preview" style="width: 200px">
        <gvb_user_info_preview :data="{
          avatar:form.avatar,
          nick_name:form.nick_name,
          sign:form.sign,
          link:form.link,
          collects_count:Random.integer(1,200),
          comment_count:Random.integer(1,200),
          digg_count:Random.integer(1,200),
          look_count:Random.integer(1,200),
        }"></gvb_user_info_preview>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
import {userInfoApi, type userInfoType, userInfoUpdateApi} from "@/api/user_api";
import Gvb_title from "@/components/common/gvb_title.vue";
import type {userInfoUpdateType} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
import Gvb_update_password from "@/components/common/gvb_update_password.vue";
import Gvb_bind_email from "@/components/common/gvb_bind_email.vue";
import Gvb_cropper from "@/components/common/gvb_cropper.vue";
import Gvb_user_info_preview from "@/components/common/gvb_user_info_preview.vue";
import {Random} from "mockjs";
import {useStore} from "@/stores";
import router from "@/router";

const isLaptops1 = isLaptops

const store = useStore()
function logOut() {
  store.logout();
  router.push({ name: "index" }).then(() => {
    Message.success("已退出登录")
  })
}



//定义interface类型
interface IClipper {
  type: string//上传类型
  allowTypeList: string[]//接收允许上传的图片类型
  limitSize: number//限制大小
  fixedNumber: number[] //截图框的宽高比例
  fixedNumberAider?: number[] //侧边栏收起截图框的宽高比例
  previewWidth: number //预览宽度
  previewWidthAider?: number //侧边栏收起预览宽度
}

const clipperData = ref<IClipper>({
  type: '',
  allowTypeList: [],
  limitSize: 1,
  fixedNumber: [],
  previewWidth: 0
})
const clipperRef = ref()

function showCropper() {
  clipperData.value = {
    type: 'browserLogo', // 该参数可根据实际要求修改类型
    allowTypeList: ['png', 'jpg', 'jpeg',], // 允许上传的图片格式
    limitSize: 1, // 限制的大小
    fixedNumber: [1, 1],  // 截图比例，可根据实际情况进行修改
    previewWidth: 100 // 预览宽度
  }
  // 打开裁剪组件
  clipperRef.value.uploadFile()
}


function onConfirm(val: string) {
  form.avatar = val
  userInfoUpdate()
}


const formRef = ref()

const form = reactive<userInfoType>({
  id: 0,
  created_at: "",
  nick_name: "",
  user_name: "",
  avatar: "",
  email: "",
  tel: "",
  addr: "",
  token: "",
  ip: "",
  role: "",
  role_id: 0,
  sign_status: "",
  integral: 0,
  sign: "",
  link: "",
})


async function getData() {
  let res = await userInfoApi()
  Object.assign(form, res.data)
}

async function userInfoUpdate() {
  let val = await formRef.value.validate()
  if (val) return

  let data: userInfoUpdateType = {
    link: form.link,
    nick_name: form.nick_name,
    sign: form.sign,
    avatar: form.avatar
  }
  let res = await userInfoUpdateApi(data)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}

getData()

const updatePasswordVisible = ref(false)
const bindEmailVisible = ref(false)

</script>

<style lang="scss">
.user_info_view {
  display: flex;
  background-color: var(--color-bg-1);
  padding: 20px;
  border-radius: 5px;
  height: calc(100vh - 130px);

  .left {
    width: 40%;

    .arco-form {
      margin-top: 10px;
    }

    .action_group {
      margin-top: 10px;

      > button {
        margin-right: 10px;
      }
    }
  }

  .right {
    margin-left: 20px;
    width: calc(60% - 20px);
  }
}


</style>/