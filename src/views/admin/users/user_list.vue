<template>
  <div>
    <gvb_table :url="userListApi"
               :columns="columns"
               default-delete
               add-label="创建用户"
               :filter-group="filterGroup"
               @add="add"
               @edit="edit"
               :action-group="actionGroup"
               @remove="remove">
      <template #avatar="{record}">
        <a-avatar :image-url="record.avatar"></a-avatar>
      </template>
<!--      <template #action_middle="{record}">-->
<!--        <a-button>测试位置{{ record.id }}</a-button>-->
<!--      </template>-->
    </gvb_table>
  </div>
</template>
<script setup lang="ts">
// no-confirm  关闭二次确认
// no-check  关闭选择
// no-add  关闭添加用户
// no-edit 关闭编辑
// no-delete  关闭删除

import Gvb_table, {type actionOptionType} from "@/components/admin/gvb_table.vue";
import {userListApi} from "@/api/user_api";
import type {userInfoType} from "@/api/user_api";
import {ref} from "vue";
import type {filterOptionType} from "@/components/admin/gvb_table.vue";
import {roleIdListApi} from "@/api/role_api";

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