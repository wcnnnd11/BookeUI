<template>
  <div>
    <gvb_table :url="userListApi"
               :columns="columns"
               default-delete
               no-check
               add-label="创建用户"
               :filter-group="filterGroup"
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

import Gvb_table, {type actionOptionType} from "@/components/admin/gvb_table.vue";
import {userListApi} from "@/api/user_api";
import type {userInfoType} from "@/api/user_api";
import {ref} from "vue";
import type {filterOptionType} from "@/components/admin/gvb_table.vue";

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

const filterGroup: filterOptionType[] = ref([
  {
    label: "想要什么？",
    value: 0,
    column: "role",
    options: [
      {
        label: "管理员",
        value: 1,
      },
      {
        label: "普通用户",
        value: 2,
      },
      {
        label: "游客",
        value: 3,
      }
    ]
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