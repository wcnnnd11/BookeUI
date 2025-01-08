<template>
  <div class="gvb_chat_group_components">

    <a-spin :loading="loading">
      <div class="head">
        <div class="title">
          {{ config.welcomeTitle }}
        </div>
        <div class="outline">
          在线人数：{{ config.isOnlinePeople ? chatData.onlineCount : '∞' }}
        </div>

        <div class="manage">
          <IconRefresh style="cursor: pointer" @click="flush"></IconRefresh>
          <a-checkbox v-model="isManage">管理模式</a-checkbox>
          <a-button v-if="isManage"
                    size="mini" type="primary"
                    status="danger"
                    style="margin-left: 10px"
                    @click="removeChatGroup">删除
          </a-button>
        </div>
      </div>
      <div class="record_list">
        <a-checkbox-group :v-model="selectIDList" @change="handleChange">
          <template v-for="item in chatRecordData.list" >
            <div :class="{msg:true,isManage:isManage}">
              <a-checkbox :value="item.id" v-if="isManage"></a-checkbox>
              <div class="date" v-if="config.isShowTime">{{ dateTimeFormat(item.created_at) }}</div>
              <div v-if="item.msg_type === 2" :class="{message: true, isMe: item.isMe}">
                <img class="avatar" :src="'/'+item.avatar" alt="">
                <div class="message-main">
                  <div class="message-user">{{ item.nick_name }}</div>
                  <div class="message-content">
                    <div class="content">
                      <div :class="{'text-message':true,isMd:config.isMd}">
                        <template v-if="!config.isMd">
                          {{ item.content }}
                        </template>
                        <template v-else>
                          <MdPreview v-model="item.content" :editorId="'md__'+item.id"></MdPreview>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="item.msg_type === 1 || item.msg_type === 0"
                   :class="'system '+'system_'+item.msg_type.toString() ">
                <div class="txt-message">{{ item.content }}</div>
              </div>
            </div>
          </template>
        </a-checkbox-group>
      </div>

      <div class="footer">
        <div class="menu">
          <div class="icon" v-if="config.isSendImage" @click="sendImageEvent">
            <IconImage></IconImage>
          </div>
          <div class="icon" v-if="config.isSendFile" @click="sendFileEvent">
            <IconFile></IconFile>
          </div>
        </div>
        <div class="inRoom" v-if="!socket">
          <a-button type="primary" @click="websocketConnect">进入聊天室</a-button>
        </div>
        <a-textarea v-if="!config.isMd" show-word-limit
                    :max-length="config.contentLength"
                    @keydown.enter.ctrl="sendData"
                    v-model="content"
                    auto-size placeholder="聊天内容"
                    style="height: 100%"></a-textarea>
        <MdEditor v-else v-model="content" placeholder="聊天内容" :max-length="config.contentLength" :toolbars="[]"
                  :footers="[]" :on-upload-img="onUploadImg" :preview="false"></MdEditor>
        <a-button type="primary" class="send_button" @click="sendData">发送</a-button>
      </div>
    </a-spin>


  </div>


</template>
<script setup lang="ts">
import {nextTick, reactive, ref} from "vue";
import type {listDataType} from "@/api";
import {type chatMessageType, chatRecordApi, chatRemoveApi} from "@/api/chat_api";
import type {chatType} from "@/api/chat_api";
import type {paramsType} from "@/api";
import {Message} from "@arco-design/web-vue";
import {settingsInfoApi} from "@/api/settings_api";
import type {chatGroupConfigType} from "@/api/chat_api";
import {IconImage, IconFile} from "@arco-design/web-vue/es/icon";
import type {baseResponse} from "@/api";
import {IconRefresh} from "@arco-design/web-vue/es/icon";
import {dateTimeFormat} from "@/utils/date";
import {MdEditor, MdPreview} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {onUploadImg} from "@/api/image_api";


// 数组的值一直空的，改成手动更新，可以解决这个问题，添加如下代码
function handleChange(selectedValues: number[]) {
  console.log("手动更新选中值：", selectedValues)
  selectIDList.value = selectedValues
}


const params = reactive<paramsType>({
  page: 1,
  limit: 50,
})

const chatRecordData = reactive<listDataType<chatType>>({
  list: [],
  count: 0
})

async function getData() {
  let res = await chatRecordApi(params)
  chatRecordData.list = res.data.list
  // 此处将数据反转，新消息在下面，不用改动后端了
  chatRecordData.list.reverse()
  chatRecordData.count = res.data.count
}

const config = reactive<chatGroupConfigType>({
  isAnonymous: true,
  isShowTime: false,
  defaultLimit: 50,
  welcomeTitle: "书中",
  isOnlinePeople: true,
  isSendImage: false,
  isPaste: false,
})

const loading = ref(true)

async function getConfig() {
  let res = await settingsInfoApi("chat_group") as baseResponse<chatGroupConfigType>
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(config, res.data)

  params.limit = config.defaultLimit

  await getData()
  loading.value = false
}

getConfig()

const isManage = ref(false)
const selectIDList = ref<number[]>([])

async function flush() {
  await getConfig()
  await getData()
  Message.success("刷新成功")
}

async function removeChatGroup() {
  //加一个判断，删除的数组不为空
  if (selectIDList.value.length === 0) {
    Message.warning("请先选择要删除的记录")
    return
  }

  let res = await chatRemoveApi(selectIDList.value)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  selectIDList.value = []
  await getData()
}


function sendImageEvent() {
  Message.warning("该功能不会写 (;´༎ຶД༎ຶ`) ")

}

function sendFileEvent() {
  Message.warning("该功能不会写 (;´༎ຶД༎ຶ`) ")

}


let socket = ref<WebSocket>()

let index = 0

const chatData = reactive({
  nickName: "",
  onlineCount: 0,
})

// 即时通讯，websocket
function websocketConnect() {
  // 建立websocket连接
  // websocket没有跨域，此处 "WebSocket(`ws://${location.host}/ws/api/chat_groups`)" 直接写后端地址
  socket.value = new WebSocket(`ws://${location.host}/ws/api/chat_groups`)
  // 接收消息
  socket.value.onmessage = function (event) {
    let _data = event.data
    let jsonData = JSON.parse(_data) as chatMessageType
    if (index === 0) {
      // 第一条消息
      chatData.nickName = jsonData.nick_name
      index++
      chatData.onlineCount = jsonData.online_count as number

      // return
    }
    chatData.onlineCount = jsonData.online_count as number

    chatRecordData.list.push({
      avatar: jsonData.avatar,
      content: jsonData.content,
      created_at: jsonData.created_at,
      msg_type: jsonData.msg_type,
      nick_name: jsonData.nick_name,
      isMe: chatData.nickName === jsonData.nick_name,
    })
    index++

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

  // 连接成功之后的回调
  socket.value.onopen = function (ev) {
    Message.success("成功进入聊天室")
    // 发送进入聊天室的消息
    socket.value?.send(
        JSON.stringify({
          content: "", // 进入聊天室不需要内容
          msg_type: 1, // 消息类型为 1（InRoomMsg）
        })
    )
  }

  // 错误
  socket.value.onerror = function (ev) {
    Message.error("进入聊天室失败")

  }
  // 服务端关闭
  socket.value.onclose = function (ev) {
    Message.success("连接断开")
    socket.value = null

  }
}

const content = ref("")

function sendData() {
  socket.value?.send(JSON.stringify({
    content: content.value,
    msg_type: 2,
  }))
  content.value = ""
}


</script>
<style lang="scss">
.gvb_chat_group_components {
  background-color: var(--color-bg-1);
  width: 100%;
  height: 100%;
  border-radius: 5px;

  .arco-spin {
    width: 100%;
  }


  .head {
    justify-content: center;
    border-bottom: 1px solid var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 60px;
    position: relative;

    .title {
      font-size: 16px;
      font-weight: 600;
    }

    .outline {
      margin-top: 5px;
      color: var(--color-text-2);
    }

    .manage {
      position: absolute;
      right: 10px;
      display: flex;
      align-items: center;
    }

  }

  .record_list {
    overflow-y: auto;
    padding: 20px;
    max-height: calc(100vh - 400px);

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

          &.isMd{
            white-space: inherit;
            word-break: inherit;

          }

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

          .md-editor {
            background-color: inherit;

            .md-editor-preview-wrapper {
              padding: 0;

              img {
                border: inherit;
              }
            }

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
              right: -19px;
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

    .system {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;


      .txt-message {
        padding: 4px 5px;
        background-color: var(--color-fill-2);
        border-radius: 5px;
        color: var(--color-text-2);

      }
    }

    .msg {
      position: relative;

      &.isManage {
        background-color: var(--color-fill-1);
        border-radius: 5px;
      }

      .arco-checkbox {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .arco-checkbox-group {
      width: 100%;
    }

    .date {
      position: absolute;
      right: 0;
      top: 0;
      color: var(--color-text-3);
      font-size: 12px;
      transform: scale(0.6);
      transform-origin: top right;
    }

  }


  .footer {
    height: 210px;
    border-top: 1px solid var(--bg);
    padding: 20px;
    position: relative;


    .menu {
      display: flex;
      align-items: center;
      position: absolute;
      top: -32px;
      border-top: 1px solid var(--bg);
      border-right: 1px solid var(--bg);
      left: 0;
      background-color: var(--color-bg-1);

      .icon {
        font-size: 18px;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }

    .inRoom {
      position: absolute;
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      background-color: var(--login_bg);

    }

    .send_button {
      position: absolute;
      left: 30px;
      bottom: 30px;
    }

    .md-editor {
      height: 100%;
    }
  }


}

</style>