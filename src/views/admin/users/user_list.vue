<template>
  <div>
    <user_create v-model:visible="visible" @ok="createOk"></user_create>
    <a-modal title="编辑用户" v-model:visible="updateVisible" :on-before-ok="updateUserOk">
      <a-form ref="formRef" :model="updateUserForm">
        <a-form-item field="nick_name" label="昵称"
                     :rules="[{required:true,message:'请输入昵称'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="updateUserForm.nick_name" placeholder="昵称"></a-input>
        </a-form-item>
        <a-form-item field="role" label="权限">
          <a-select v-model="updateUserForm.role" :options="roleOptions" placeholder="选择角色"></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <gvb_message_record_modal :visible="messageVisible" :userID="userID"></gvb_message_record_modal>
    <gvb_table :url="userListApi"
               :columns="columns"
               default-delete
               add-label="φ(*￣0￣)？"
               ref="gvbTable"
               :filter-group="filterGroup"
               search-placeholder="找到朋友名字或者昵称"
               @add="visible=true"
               @edit="edit"
               :action-group="actionGroup">
      <template #avatar="{record}">
        <a-avatar @click="checkMessage(record)" :image-url="record.avatar"></a-avatar>
      </template>
      <template #ip="{record}:{record:userInfoType}">
        <span>{{ record.ip }} ({{ record.addr }})</span>
      </template>
      <!--      <template #action_middle="{record}">-->
      <!--        <a-button>测试位置{{ record.id }}</a-button>-->
      <!--      </template>-->
    </gvb_table>
  </div>
</template>
<!-- no-confirm  关闭二次确认-->
<!-- no-check  关闭选择-->
<!-- no-add  关闭添加用户-->
<!-- no-edit 关闭-->
<!-- no-delete  关闭删除-->
<script setup lang="ts">
import Gvb_table, {type actionOptionType} from "@/components/admin/gvb_table.vue";
import {userListApi} from "@/api/user_api";
import type {userInfoType} from "@/api/user_api";
import {reactive, ref} from "vue";
import type {filterOptionType} from "@/components/admin/gvb_table.vue";
import {roleIdListApi} from "@/api/role_api";
import type {RecordType} from "@/components/admin/gvb_table.vue";
import User_create from "@/components/admin/user_create.vue";
import type {userUpdateRequest} from "@/api";
import {roleOptions} from "@/global/global";
import {userUpdateApi} from "@/api";
import {Message} from "@arco-design/web-vue";
import Gvb_message_record_modal from "@/components/common/gvb_message_record_modal.vue";

const columns = [
  {title: '昵称', dataIndex: 'nick_name'},
  {title: '用户名', dataIndex: 'user_name'},
  {title: '头像', slotName: 'avatar'},
  {title: '邮箱', dataIndex: 'email'},
  {title: '角色', dataIndex: 'role'},
  {title: 'IP', dataIndex: 'ip'},
  {title: '注册时间', slotName: 'created_at'},
  {title: '操作', slotName: 'action'},
]
const filterGroup = ref<filterOptionType[]>([
  {
    label: "想要什么？",
    column: "role",
    source: roleIdListApi,
  }
])
const actionGroup: actionOptionType[] = [
  {
    label: "战吼：没想好",
    callback: async (idList: (number | string)[]): Promise<boolean> => {
      return true
    }
  }
]

const visible = ref(false)

function createOk() {
  gvbTable.value.getList()
}

const gvbTable = ref()
const updateVisible = ref(false)
const updateUserForm = reactive<userUpdateRequest>({
  nick_name: "",
  role: 0,
  user_id: 0
})

function edit(record: RecordType<userInfoType>): void {
  updateUserForm.user_id = record.id
  updateUserForm.role = record.role_id
  updateUserForm.nick_name = record.nick_name
  updateVisible.value = true
}

const formRef = ref()

async function updateUserOk() {
  let val = await formRef.value.validate()
  if (val) return false

  let res = await userUpdateApi(updateUserForm)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  gvbTable.value.getList()
  return true
}

const messageVisible= ref(false)
const userID = ref(0)

function checkMessage(record:userInfoType){
  messageVisible.value = true
  userID.value = record.id
}


</script>