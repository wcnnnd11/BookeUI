<template>
  <div class="article_list_view">
    <Gvb_article_update v-model:visible="updateVisible" :data="recordData" @ok="getList"></Gvb_article_update>
    <Gvb_article_drawer v-model:visible="createVisible"></Gvb_article_drawer>
    <Gvb_article_content_drawer v-model:visible="articleContentVisible"
                                :id="articleUpdateId || ''"></Gvb_article_content_drawer>
    <gvb_table
        :url="articleListApi"
        :columns="columns"
        default-delete
        add-label="发布文章"
        no-confirm
        ref="gvbTable"
        :default-params="params"
        @edit="editArticleInfo"
        @add="createVisible=true"
        search-placeholder="搜索文章标题">
      <template #banner_url="{record}:{record: articleType}">
        <a-image :src="record.banner_url" height="50px" style="border-radius: 5px"></a-image>
      </template>
      <template #data="{record}:{record: articleType}">
        <div class="article_data_col">
        <span>
           <i class="fa fa-eye"></i>
        <span>{{ record.look_count }}</span>
        </span>
          <span>
                   <i class="fa fa-thumbs-o-up"></i>
        <span>{{ record.digg_count }}</span>
       </span>
          <span>
                   <i class="fa fa-comments"></i>
        <span>{{ record.comment_count }}</span>
        </span>
          <span>
          <i class="fa fa-star"></i>
        <span>{{ record.collects_count }}</span>
      </span>
        </div>
      </template>
      <template #tags="{record}:{record: articleType}">
        <div class="article_tags_col">
          <a-tag v-for="(item, index) in record.tags" :color="colorList[index]">{{ item }}</a-tag>
        </div>
      </template>
      <template #title="{record}:{record: articleType}">
        <div class="article_title_col" v-html="record.title"></div>
      </template>
      <template #action_middle="{record}:{record: articleType}">
        <a-button type="outline" @click="WarningMsg">编辑正文</a-button>
      </template>
    </gvb_table>
  </div>
</template>
<!--:filter-group="filterGroup"-->
<!--关闭筛选，缺少后端接口-->
<!--:default-params="params"-->
<!--这个是开关我的发布，但后端写的有问题，无法筛选出来-->
<script setup lang="ts">
import Gvb_table from "@/components/admin/gvb_table.vue";
import {reactive, ref} from "vue";
import {articleListApi, type articleUpdateType} from "@/api/article_api";
import type {articleType} from "@/api/article_api";
import Gvb_article_update from "@/components/common/gvb_article_update.vue";
import 'md-editor-v3/lib/style.css'
import Gvb_article_drawer from "@/components/common/gvb_article_drawer.vue";
import Gvb_article_content_drawer from "@/components/common/gvb_article_content_drawer.vue";
import type {paramsType} from "@/api";
import {Message} from "@arco-design/web-vue";

interface Props {
  is_user: boolean
}

const props = defineProps<Props>()
const isUser = props.is_user ?? false;
const gvbTable = ref()

//  我的发布
const params = reactive<paramsType & { is_user: boolean }>({
  is_user: isUser
})

const columns = [
  {title: '标题', slotName: 'title'},
  {title: '分类', dataIndex: 'category'},
  {title: '封面', slotName: 'banner_url'},
  {title: '作者', dataIndex: 'user_nick_name'},
  {title: '标签', slotName: 'tags'},
  {title: '文章数据', slotName: 'data'},
  {title: '上传时间', slotName: 'created_at'},
  {title: '操作', slotName: 'action'},
]
const colorList = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray'
]

const createVisible = ref(false)
const updateVisible = ref(false)
const articleContentVisible = ref(false)
const articleUpdateId = ref<string | undefined>(undefined)

// 编辑正文有问题，先warning
function WarningMsg() {
  Message.warning("存在未知问题（可能是包没适配好），该功能目前不可使用")
}

// 原line:50的@click调用，先改成warning
function editArticleContent(record: articleType) {
  articleContentVisible.value = true
  articleUpdateId.value = record.id
}

const recordData = reactive<articleUpdateType>({
  id: ""
})

function editArticleInfo(record: articleType) {
  updateVisible.value = true
  recordData.abstract = record.abstract
  recordData.banner_id = record.banner_id
  recordData.category = record.category
  recordData.id = record.id
  recordData.link = record.link
  recordData.source = record.source
  recordData.tags = record.tags
  recordData.title = record.title
}

function getList() {
  gvbTable.value.getList()
}


// const filterGroup: filterOptionType[] = [
//   {
//     label: "文章分类",
//     column: "category",
//     source: articleCategoryListApi,
//   },
//   {
//     label: "文章标签",
//     column: "tag",
//     source: tagOptionsApi,
//   }
// ]

</script>
<style lang="scss">
@mixin marginRight($width) {
  margin-right: $width;
  &:last-child {
    margin-right: 0;
  }
}

.article_list_view {
  .article_data_col {
    > span {
      color: var(--color-text-2);
      @include marginRight(10px);


      i {
        margin-right: 5px;
      }
    }
  }

  .article_tags_col {
    .arco-tag {
      @include marginRight(5px);
    }
  }

  .article_title_col {
    em {
      color: rgb(var(--red-6));
    }
  }
}

@media screen and (min-width: 1200px) and (max-width: 1800px) {
  .arco-table-th:nth-child(7){
    display: none;
  }
  .arco-table-td:nth-child(7){
    display: none;
  }
}
</style>