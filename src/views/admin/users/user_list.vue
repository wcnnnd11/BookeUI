<template>
  <div>
    <gvb_table :url="userListApi" :columns="columns" default-delete add-label="创建用户" @add="add" @edit="edit" @remove="remove">
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

function add(){

}

function edit(record:userInfoType){

}

function remove(idList:number[]){

}
</script>