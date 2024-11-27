<template>
  <div class="message_list_view">
    <div class="user_list_menu">
      <div class="head">
        <a-input-search placeholder="搜索用户名" v-model="params.nickName" @search="getMessageData" @keydown.enter="getMessageData"></a-input-search>
      </div>
      <gvb_message_list @check="messageCheck" :data="messageData.list"></gvb_message_list>

      <div class="page">
        <a-pagination simple :total="messageData.count" @change="getMessageData" v-model:current="params.page" :page-size="params.limit"></a-pagination>
      </div>
    </div>
    <div class="user_menu" v-if="messageUserData.list.length">
      <gvb_message_list @check="messageUserCheck" :data="messageUserData.list"></gvb_message_list>
    </div>
    <div class="user_record_menu" v-if="messageRecordData.list.length">
      <div :class="{message: true, isMe: item.isMe}" v-for="item in messageRecordData.list">
        <img class="avatar" :src="item.send_user_avatar" alt="">
        <div class="message-main">
          <div class="message-user">{{ item.send_user_nick_name }}</div>
          <div class="message-content">
            <div class="content">
              <div class="txt-message">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
import type {messageRecordType, messageType,messageParams} from "@/api/message_api";
import Gvb_message_list from "@/components/common/gvb_message_list.vue";
import {messageUserListApi, messageUserRecordApi, messageUserListByUserApi} from "@/api/message_api";
import type {listDataType} from "@/api";

const params = reactive<messageParams>({
  page: 1,
  limit: 10,
  nickName: undefined,
})

const messageData = reactive<listDataType<messageType>>({
  list: [],
  count: 0,
})

const messageUserData = reactive<listDataType<messageType>>({
  list: [],
  count: 0,
})

const user1 = ref<number>(0)
const user2 = ref<number>(0)

async function getMessageData() {
  let res = await messageUserListApi(params)
  messageData.list = res.data.list
  messageData.count = res.data.count
}

getMessageData()

async function messageCheck(data: messageType) {
  // 可以把之前的数据全部清空掉
  messageUserData.list = []
  messageRecordData.list = []

  let res = await messageUserListByUserApi(data.userID)
  messageUserData.list = res.data.list
  messageUserData.count = res.data.count
  user1.value = data.userID
}

const messageRecordData = reactive<listDataType<messageRecordType>>({
  list: [],
  count: 0
})

async function messageUserCheck(data: messageType) {
  user2.value = data.userID
  messageRecordData.list = []
  let res = await messageUserRecordApi(user1.value, user2.value)
  console.log(res)
  // 判断谁算右边 => isMe
  // 以user1为准
  const list: messageRecordType[] = []
  res.data.list.forEach((item) => {
    if (item.send_user_id === user1.value) {
      item.isMe = true
    } else {
      item.isMe = false
    }
    list.push(item)
  })

  messageRecordData.list = list
  messageRecordData.count = res.data.count
}

</script>
<style lang="scss">
.message_list_view {
  display: flex;

  > div {
    background-color: var(--color-bg-1);
    height: calc(100vh - 130px);
    border-radius: 5px;
    color: var(--color-text-2);
    cursor: pointer;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .user_list_menu {
    width: 280px;
    padding: 20px;

    .head {
      margin-bottom: 10px;
    }

    .page{
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }

  }

  .user_menu {
    width: 280px;
    margin-left: 20px;
    padding: 20px ;

  }

  .user_record_menu {
    width: calc(100% - 600px);
    margin-left: 20px;
    padding: 20px;

    .message {
      display: flex;
      margin-bottom: 20px;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      .message-main {
        margin-left: 10px;

        .message-content {
          margin-top: 5px;

          .content {
            display: flex;
            margin-left: 5px;
          }
        }

        .txt-message {
          background-color: var(--color-fill-2);
          border-radius: 5px;
          padding: 10px;
          position: relative;
          width: fit-content;
          min-height: 41px;
          white-space: break-spaces;
          word-break: break-all;

          &:before {
            content: "";
            display: block;
            position: absolute;
            //left: -32px;
            //top: 6px;
            //border-width: 10px 20px;
            left:-19.5px;
            top: 6px;
            border-width: 5px 10px;

            border-style: solid;
            border-color: transparent var(--color-fill-2) transparent transparent;
          }
        }
      }


      &.isMe {
        justify-content: right;
        flex-direction: row-reverse;

        .message-main {
          margin-left: 0;
          margin-right: 10px;

          .message-user {
            text-align: right;
          }

          .txt-message {
            &:before {
              content: "";
              display: block;
              position: absolute;
              right: -20px;
              left: inherit;
              top: 6px;
              border-width: 5px 10px;
              border-style: solid;
              border-color: transparent transparent transparent var(--color-fill-2);
            }
          }
        }
      }
    }
  }
}
</style>