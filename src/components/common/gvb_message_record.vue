<template>
  <div class="gvb_message_record_component" v-if="recordData.userID">
    <div class="head" v-if="isHead">
      <div class="title">与{{ props.nickName }}的聊天</div>
      <div class="manage">
        <IconRefresh style="cursor: pointer; margin-right: 5px" @click="flush"></IconRefresh>
        <a-checkbox v-model="isManage">管理模式</a-checkbox>
        <a-button v-if="isManage && selectIDList.length" size="mini" style="margin-left: 10px" type="primary"
                  status="danger"
                  @click="removeChatGroup">删除
        </a-button>
      </div>
    </div>
    <div :class="{record_list: true, isHead: isHead}">
      <a-checkbox-group v-model="selectIDList">
        <div :class="{message: true, isMe: item.isMe, isManage: isManage}" v-for="item in messageRecordData.list">
          <a-checkbox :value="item.rev_user_id" v-if="isManage"></a-checkbox>
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
      </a-checkbox-group>
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
import {type messageRecordType, type messageParams, messageRemoveApi} from "@/api/message_api";
import type {listDataType} from "@/api";
import {messageUserMeRecordApi} from "@/api/message_api";
import {useStore} from "@/stores";
import {messagePublishApi} from "@/api/message_api";
import type {messagePublishType, userRecordRequestType} from "@/api/message_api";
import {Message} from "@arco-design/web-vue";
import {IconRefresh} from "@arco-design/web-vue/es/icon";

interface Props {
  userID: number
  nickName?: string
  isHead?: boolean
}

const props = defineProps<Props>()
const {isHead = false} = props

const store = useStore()
const params = reactive<messageParams>({
  page: 1,
  limit: 10,
  nickName: undefined,
})

const isManage = ref<boolean>(false)

const selectIDList = ref<number[]>([])

function flush() {
  getRecordData()
  Message.success("刷新成功")
}

async function removeChatGroup() {
  let res = await messageRemoveApi(selectIDList.value)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  selectIDList.value = []
  await getRecordData()

}

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
    item.isMe = item.send_user_id === store.userInfo.user_id;
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
  await getRecordData()

  await nextTick(() => {
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
}, {immediate: true})

</script>
<style lang="scss">
.gvb_message_record_component {
  width: 100%;
  height: calc(100vh - 130px);;

  .head {
    height: 60px;
    width: 100%;
    border-bottom: 1px solid var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    position: relative;

    .manage {
      position: absolute;
      right: 20px;
      display: flex;
      align-items: center;
    }
  }

  .record_list {
    overflow-y: auto;
    height: calc(100% - 200px);
    &.isHead{
      height: calc(100% - 260px);
    }

    .arco-checkbox-group{
      width: 100%;
    }

    .message {
      display: flex;
      margin-bottom: 20px;
      padding: 0 20px;
      position: relative;

      &:first-child {
        margin-top: 20px;
      }

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
            left: -19px;
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

      .arco-checkbox {
        position: absolute;
        right: -10px;
        top: 50%;
        transform: translateY(-50%);
      }

      &.isManage {
        background-color: var(--color-fill-1);
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