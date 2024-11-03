<template>
  <div>
    <gvb_table :url="userListApi"
               :columns="columns"
               default-delete
               no-check
               add-label="创建用户"
               @add="add"
               @edit="edit"
               :action-group="actionGroup"
               @remove="remove">
      <template #avatar="{record}">
        <a-avatar :image-url="record.avatar"></a-avatar>
      </template>
    </gvb_table>
  </div>
</template>
<script setup lang="ts">

import Gvb_table from "@/components/admin/gvb_table.vue";
import {userListApi} from "@/api/user_api";
import type {userInfoType} from "@/api/user_api";
import type {optionType} from "@/components/admin/gvb_table.vue";

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
const actionGroup: optionType[] = [
  {
    label: "战吼：对以下目标“”",
    callback: async (idList: (number | string)[]): Promise<boolean> => {
      return true
    }
  }
]


function add() {
  console.log("add")
}

function edit(record: userInfoType) {
  console.log(record)

}

function remove(idList: number[]) {
  console.log(idList)

}
</script>