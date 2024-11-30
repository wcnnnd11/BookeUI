<template>
  <div class="home_view">
    <div class="welcome">
      <div class="title">
        早安，{{ store.userInfo.nick_name }}<br>
        这里还要修改，样式想改成动态的
      </div>
      <div class="weather"></div>
      <div class="statistics">
        <span>
           <span class="icon">
            <IconUserGroup></IconUserGroup>
          </span>
          用户总数：{{ statisticsData.user_count }}
        </span>
        <span>
           <span class="icon">
            <IconBook></IconBook>
          </span>
          文章总数：{{ statisticsData.article_count }}
        </span>
        <span>
           <span class="icon">
            <IconMessage></IconMessage>
          </span>
          群聊消息：{{ statisticsData.chat_group_count }}
        </span>
        <span>
           <span class="icon">
            <IconBulb></IconBulb>
          </span>
          今日登录：{{ statisticsData.now_login_count }}
        </span>
      </div>
      <div class="link">
        <div>
          <span>ε=ε=ε=(~￣▽￣)~</span>
        </div>
        <div>
          <span>个人博客，兴趣使然</span>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="left">
        <gvb_card title="快捷入口" class="quick_entry">

          <div class="item" v-for="item in quickEntryList"
               :style="{'--icon_bg':item.bg,'--icon_color':item.color}">
            <div class="icon" @click="goLink(item)">
              <component :is="item.font"></component>
            </div>
            <div class="text">{{ item.text }}</div>

          </div>

        </gvb_card>
        <gvb_card class="statistics" title=数据统计>
          <login_data_charts></login_data_charts>
        </gvb_card>
      </div>
      <div class="right">
        <gvb_card title=更新日志 class="update_log">
          <div class="item" v-for="(item,index) in updateLogList">
            <span>
              <span class="index">{{ index + 1 }}.</span>
              <span class="content"><a-typography-paragraph
                  :ellipsis="{
                rows:1,
                showTooltip:true,
                css:true
              }"
              >{{ item.title }}</a-typography-paragraph></span>

            </span>
            <span class="date">{{ relativeCurrentTime(item.title) }}</span>

          </div>
        </gvb_card>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {reactive} from "vue";
import Gvb_card from "@/components/common/gvb_card.vue";
import type {Component} from "vue";
import {IconSettings} from "@arco-design/web-vue/es/icon";
import {relativeCurrentTime} from "@/utils/date";
import router from "@/router";
import Login_data_charts from "@/components/charts/login_data_charts.vue";
import type {statisticsType} from "@/api/data_api.js";
import {statisticsApi} from "@/api/data_api.js";
import {useStore} from "@/stores";
import {IconUserGroup, IconBook, IconMessage, IconBulb, IconUser} from "@arco-design/web-vue/es/icon";

const store = useStore()

const statisticsData = reactive<statisticsType>({
  article_count: 0,
  chat_group_count: 0,
  message_count: 0,
  now_login_count: 0,
  now_sign_count: 0,
  user_count: 0,
})

async function getData() {
  let res = await statisticsApi()
  Object.assign(statisticsData, res.data)
}

getData()

interface quickEntryType {
  bg: string, //背景色
  color: string //文字色
  font: Component
  text: string //文字
  name?: string //路由名称
  link?: string //可以跳外部链接
}

let quickEntryList: quickEntryType[] = [
  {
    bg: "#d2ecff",
    color: "#69c0ff",
    font: IconSettings,
    text: "日志列表",
    name: "log_list",
  },
  {
    bg: "#d2ecff",
    color: "#69c0ff",
    font: IconBook,
    text: "文章列表",
    name: "article_list",
  },
  {
    bg: "#d2ecff",
    color: "#69c0ff",
    font: IconUserGroup,
    text: "用户列表",
    name: "user_list",
  },
]


if (store.isGeneral || store.isTourist) {
  quickEntryList = [
    {
      bg: "#d2ecff",
      color: "#69c0ff",
      font: IconUser,
      text: "个人信息",
      name: "user_info",
    }
  ]
}

function goLink(item: quickEntryType) {
  if (item.name) {
    router.push({
      name: item.name
    })
    return
  }
  if (item.link) {
    window.open(item.link, "_blank")
  }
}

interface updateLogType {
  id?: number
  title: string
  created_at: string
}

const updateLogList: updateLogType[] = [
  {
    title: "刷友好度规划",
    created_at: "2023-10-05 00:00:00"

  }
]


</script>

<style lang="scss">
.home_view {
  .welcome {
    width: 100%;
    background-image: url("/");
    background-repeat: no-repeat;
    background-position: right;
    background-color: var(--color-bg-1);
    padding: 10px 0 30px 20px;
    border-bottom: 5px;
    background-size: 20%;

    .link {
      margin: 30px 0 20px 0;

      > div {
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }
      }

    }

    .title {
      margin-top: 10px;
      font-size: 22px;
      font-weight: 400;

    }

    .weather {
      margin: 20px 0 10px 0;
    }

    .statistics {
      margin: 20px 0 10px 0;
      font-size: 16px;

      > span {
        margin-right: 20px;
      }
    }

    .line {
      margin: 30px 0 20px 0;

      a {
        text-decoration: none;
        color: var(--active);
      }
    }
  }

  .main {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .left {
      width: 70%;

      .quick_entry {
        .body {
          display: flex;
        }

        .item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-right: 30px;

          &:last-child {
            margin-right: 0;
          }

          .icon {
            background-color: var(--icon_bg);
            color: var(--icon_color);
            border-radius: 10px;
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            transition: all .3s;
            cursor: pointer;

            svg {
              transition: all .3s;
            }

            &:hover {
              transform: scale(1.05);

              svg {
                transform: scale(1.20);

              }
            }
          }

          .text {
            margin-top: 5px;
            color: var(--color-text-2);

          }
        }

      }

      .statistics {
        margin-top: 20px;
      }

    }

    .right {
      width: calc(30% - 20px);

      .update_log {
        .item {
          display: flex;
          justify-content: space-between;
          color: var(--color-text-2);
          height: 40px;
          align-items: center;

          > span {
            display: flex;
            align-items: center;
            white-space: nowrap;

            .index {
              margin-right: 10px;
            }
          }

          .content {
            display: flex;

            .arco-typography {
              margin-bottom: 0;
              display: inline-block;
            }
          }
        }
      }

    }
  }


}

</style>