<template>
  <div class="gvb_message_record_component" v-if="recordData.userID">
    <div class="record_list">
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
    <div class="message_record">
      <a-textarea placeholder="请输入聊天内容" @keydown.enter.ctrl="messagePublish"
                  v-model="messagePublishData.content" auto-size
                  style="height: 100%"></a-textarea>
      <a-button type="primary" @click="messagePublish">回复</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {nextTick, reactive, ref, watch} from "vue";
import type {messageRecordType, messageType, messageParams} from "@/api/message_api";
import type {listDataType} from "@/api";
import {messageUserMeRecordApi} from "@/api/message_api";
import {useStore} from "@/stores";
import {messagePublishApi} from "@/api/message_api";
import type {messagePublishType, userRecordRequestType} from "@/api/message_api";
import {Message} from "@arco-design/web-vue";

interface Props {
  userID: number
}

const props = defineProps<Props>()


const store = useStore()
const params = reactive<messageParams>({
  page: 1,
  limit: 10,
  nickName: undefined,
})


const messageRecordData = reactive<listDataType<messageRecordType>>({
  list: [],
  count: 0
})

// 先添加了send_user_id，还在排查问题中
const messagePublishData = reactive<messagePublishType>({
  content: "",
  rev_user_id: props.userID,
  send_user_id: store.userInfo.user_id,
})

const recordData = reactive<userRecordRequestType>({
  userID: props.userID,
  limit: 50
})

async function getRecordData() {
  let res = await messageUserMeRecordApi(recordData)
  // 判断谁算右边 => isMe
  // 以user1为准
  const list: messageRecordType[] = []
  res.data.list.forEach((item) => {
    if (item.send_user_id === store.userInfo.user_id) {
      item.isMe = true
    } else {
      item.isMe = false
    }
    list.push(item)
  })
  messageRecordData.list = list
  messageRecordData.count = res.data.count
}


async function messagePublish() {
  if (messagePublishData.content === "") {
    Message.warning("消息内容不能为空")
    return
  }


  let res = await messagePublishApi(messagePublishData)
  if (res.code) Message.error(res.msg)
  Message.success(res.msg)
  messagePublishData.content = ""
  getRecordData()

  nextTick(() => {
    setTimeout(() => {
      let dom = document.querySelector(".record_list") as HTMLDivElement
      dom.scrollTo({
        top: dom.scrollHeight,
        behavior: "smooth" // 平滑
      })
    }, 500)
  })

}


watch(() => props.userID, () => {
  if (props.userID !== 0) {
    recordData.userID = props.userID
    messagePublishData.rev_user_id = props.userID
    getRecordData()
  }
})


</script>
<style lang="scss">
.gvb_message_record_component {
  width: 100%;
  height: calc(100vh - 130px);;

  .record_list {
    padding: 20px;
    height: calc(100% - 200px);
    overflow-y: auto;

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
            left: -20px;
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

  .message_record {
    border-top: 1px solid var(--bg);
    padding: 10px 20px;
    position: relative;
    height: 200px;

    button {
      position: absolute;
      right: 30px;
      bottom: 20px;
    }
  }


}
</style>