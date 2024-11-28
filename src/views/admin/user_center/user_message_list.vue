<template>
  <div class="user_message_list_view">
    <div class="user_menu">
      <gvb_message_list @check="messageUserCheck" :data="messageData.list"></gvb_message_list>
    </div>
    <gvb_message_record :userID="userID"></gvb_message_record>

  </div>
</template>
<script setup lang="ts">
import Gvb_message_record from "@/components/common/gvb_message_record.vue";
import Gvb_message_list from "@/components/common/gvb_message_list.vue";
import {reactive, ref} from "vue";
import {type messageType, messageUserListByMeApi} from "@/api/message_api";
import type {listDataType} from "@/api";


const messageData = reactive<listDataType<messageType>>({
  list: [],
  count: 0,
})

async function getMessageData() {
  let res = await messageUserListByMeApi()
  messageData.list = res.data.list
  messageData.count = res.data.count
}

getMessageData()

const userID = ref<number>(0)

async function messageUserCheck(data: messageType) {
  userID.value = data.userID
}


</script>
<style lang="scss">
.user_message_list_view {
  display: flex;

  > div {
    background-color: var(--color-bg-1);
    height: calc(100vh - 130px);
    border-radius: 5px;
    color: var(--color-text-2);
    overflow-x: hidden;
    overflow-y: auto;


  }

  .user_menu {
    width: 280px;
    margin-left: 5px;
    padding: 20px;
  }

  .gvb_message_record_component {
    width: calc(100vw - 320px);
    margin-left: 20px;
  }
}
</style>