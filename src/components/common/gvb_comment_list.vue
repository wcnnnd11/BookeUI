<template>


  <div class="gvb_comment_list_components">
    <div class="add_comment">
      <a-textarea placeholder="输入评论内容" @keydown.enter.ctrl="createComment"
                  v-model="addCommentForm.content" :auto-size="{minRows: 6, maxRows: 6}"></a-textarea>
      <a-button @click="createComment" type="primary">发布评论</a-button>
    </div>
    <a-comment
        :author="item.user.nick_name"
        :content="item.content"
        :datetime="relativeCurrentTime(item.created_at)"
        v-for="item in data.list"
        :avatar="item.user.avatar"
    >
      <template #actions>
        <span class="action" @click="applyShow(item)"><IconMessage/> 回复 </span>
        <a-popconfirm content="是否删除这条评论?" @ok="deleteComment(item)">
          <span class="action"><IconDelete/> 删除 </span>
        </a-popconfirm>
      </template>
      <a-comment
          :avatar="store.userInfo.avatar"
          v-if="item.isApply"
      >
        <template #content>
          <div class="apply_comment">
            <a-input @keydown.enter.ctrl="applyComment(item)" :placeholder="'回复'+item.user.nick_name"
                     v-model="item.applyContent"></a-input>
            <a-button type="primary" style="margin-left: 10px" @click="applyComment(item)">回复</a-button>
          </div>
        </template>
      </a-comment>
      <a-comment
          :author="sub.user.nick_name"
          :content="sub.content"
          :datetime="relativeCurrentTime(sub.created_at)"
          v-for="sub in item.sub_comments"
          :avatar="sub.user.avatar"
      >
        <a-popconfirm v-if="store.isAdmin || store.userInfo.user_id === item.user_id" content="是否删除这条评论?" @ok="deleteComment(item)">
          <span class="action"><IconDelete/> 删除 </span>
        </a-popconfirm>
      </a-comment>
    </a-comment>
  </div>
</template>
<script setup lang="ts">
import type {commentAddType, commentType} from "@/api/comment_api";
import type {listDataType,paramsType} from "@/api";
import {relativeCurrentTime} from "@/utils/date";
import {reactive, watch} from "vue";
import {commentListApi, commentCreateApi, commentDeleteApi} from "@/api/comment_api";
import {IconDelete} from "@arco-design/web-vue/es/icon";
import {Message} from "@arco-design/web-vue";
import {useStore} from "@/stores";
import {IconMessage} from "@arco-design/web-react/icon";
import router from "@/router";
import {useRoute} from "vue-router";



const route = useRoute()
const articleID = ref<string>(route.query.id as string)
function checkItem(record: commentArticleType) {
  articleID.value = record.id
  router.push({
    query: {
      id: record.id
    }
  })
}


interface Props {
  articleId: string
}

const props = defineProps<Props>()
const data = reactive<listDataType<commentType>>({
  list: [],
  count: 0
})

const params = reactive<paramsType>({})

async function getData() {
  let res = await commentListApi(props.articleId, params)
  data.list = res.data.list
  data.count = res.data.count

}

// 删除评论
async function deleteComment(record: commentType) {
  let res = await commentDeleteApi(record.id)
  if (res.code) Message.error(res.msg)
  Message.success(res.msg)
  await getData()
}

// 发布评论
const addCommentForm = reactive<commentAddType>({
  article_id: "",
  content: "",
  parent_comment_id: undefined,
})

async function createComment() {
  if (!store.isLogin) {
    Message.warning("请登录")
    return
  }
  if (addCommentForm.article_id === "") {
    Message.warning("请选择文章")
    return
  }
  if (addCommentForm.content.trim() === "") {
    Message.warning("评论内容不能为空")
    return
  }
  let res = await commentCreateApi(addCommentForm)
  if (res.code) Message.error(res.msg)
  Message.success(res.msg)
  addCommentForm.content = ""
  await getData()
}

// 回复评论

function applyShow(record: commentType) {
  record.isApply = !record.isApply
  if (!record.isApply){
    return
  }
  nextTick(()=>{
    let dom = document.querySelector(`.comment_apply_ipt__${record.id.toString()} input`) as HTMLInputElement
    dom.focus()
  })
}

async function applyComment(record: commentType) {
  if (!store.isLogin) {
    Message.warning("请登录")
    return
  }
  if (record.applyContent.trim() === "") {
    Message.warning("回复内容不能为空")
    return
  }

  const data: commentAddType = {
    article_id: record.article_id,
    content: record.applyContent,
    parent_comment_id: record.id
  }

  let res = await commentCreateApi(data)
  if (res.code) Message.error(res.msg)
  Message.success(res.msg)
  record.applyContent = ""
  await getData()

}


// 评论点赞
async function commentDigg(record: commentType) {
  let res = await commentDiggApi(record.id)
  if (res.code) Message.error(res.msg)
  Message.success(res.msg)
  record.digg_count++
}


</script>