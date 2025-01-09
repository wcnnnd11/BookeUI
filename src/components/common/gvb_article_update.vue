<template>
  <div>
    <a-modal
        width="isLaptops1 ? '40%':'30%'"
        :title="title"
        modal-class="gvb_article_modal_body"
        :visible="props.visible" @cancel="emits('update:visible', false)"
        :on-before-ok="okHandler">
      <a-form ref="formRef" :model="form" :label-col-props="{span:isLaptops1?5:4}" :wrapper-col-props="{span:isLaptops1?19:20}">
        <a-form-item field="title" label="文章标题" :rules="[{required:true,message:'请输入文章标题'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.title" placeholder="文章标题"></a-input>
        </a-form-item>
        <a-form-item field="abstract" label="文章简介">
          <a-textarea v-model="form.abstract" placeholder="文章简介" :auto-size="{minRows: 4, maxRows: 5}"></a-textarea>
        </a-form-item>
        <a-form-item field="category" label="文章分类">
          <a-select placeholder="文章分类" v-model="form.category" allow-create :options="categoryOptions"></a-select>
        </a-form-item>
        <a-form-item field="tags" label="文章标签">
          <a-select placeholder="文章标签" multiple v-model="form.tags" allow-create :options="tagOptions"></a-select>
        </a-form-item>
        <a-form-item label="文章封面">
          <a-select v-model="form.banner_id" placeholder="选择封面" @change="bannerChange" allow-clear>
            <a-option v-for="item in imageIdList" :value="item.id" :key="item.id">
              <div class="banner_image_div">
                <img height="40" :src="item.path" alt=""> {{ item.name }}
              </div>
            </a-option>
            <template #label="{ data }">
              <img :src="coverSrc(data.value).value" style="height: 30px; border-radius: 5px" alt="封面"/>
              <span style="margin-left: 10px">{{ data.label }}</span>
            </template>
          </a-select>
          <a-button type="outline" style="margin-left: 10px" @click="randomCover">随机</a-button>
        </a-form-item>
        <a-form-item label="原文地址">
          <a-input v-model="form.link" placeholder="原文地址"></a-input>
        </a-form-item>
        <a-form-item label="文章来源">
          <a-input v-model="form.source" placeholder="文章来源"></a-input>
        </a-form-item>
        <a-form-item label="预览" v-if="form.title && form.banner_url && form.category" content-class="preview_body">
          <Gvb_article_item :data="form"></Gvb_article_item>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import type {articleDataType, articleUpdateType} from "@/api/article_api";
// import {articleCategoryListApi} from "@/api/article_api";
// import {tagOptionsApi} from "@/api/tag_api";
import type {optionType} from "@/types";
import {imageIdListApi} from "@/api/image_api";
import type {imageIdType} from "@/api/image_api";
import {articleUpdateApi} from "@/api/article_api";
import {Message} from "@arco-design/web-vue";
import Gvb_article_item from "@/components/common/gvb_article_item.vue";
import {Random} from "mockjs";
import {computed} from "vue";

const isLaptops1 = isLaptops

const categoryOptions = ref<optionType[]>([])
const tagOptions = ref<optionType[]>([])

/*
  先关闭，和之前article_list中的情况一样，后端没有写全
 */
/*
async function getArticleCategory() {
  let res = await articleCategoryListApi()
  categoryOptions.value = res.data
}

getArticleCategory()

async function getTags() {
  let res = await tagOptionsApi()
  tagOptions.value = res.data
}
getTags()
*/

const imageIdList = ref<imageIdType[]>([])

async function getList() {
  let res = await imageIdListApi()
  imageIdList.value = Array.isArray(res.data) ? res.data : [res.data];

}

getList()

function bannerChange(val: any) {
  const image = imageIdList.value.find((item) => item.id === val)
  form.banner_url = (image as imageIdType).path
}


interface Props {
  visible: boolean
  data: articleUpdateType
  title?: string
  type?: "add" | "update"
}

const props = defineProps<Props>()
const {title = "文章更新", type = "update"} = props

const form = reactive<articleUpdateType & articleDataType>({
  id: "",
  collects_count: Random.integer(0, 100),
  comment_count: Random.integer(0, 100),
  created_at: new Date().toDateString(),
  digg_count: Random.integer(0, 100),
  look_count: Random.integer(0, 100),
})

watch(() => props.data, () => {
  Object.assign(form, props.data)

}, {deep: true, immediate: true})


const emits = defineEmits(["update:visible", "ok"])

const formRef = ref()

const coverSrc = (value: number) => {
  return computed((): string => {
    return (imageIdList.value.find((item) => item.id === value) as imageIdType).path
  })
}

function randomCover() {
  const image: imageIdType = Random.pick(imageIdList.value)
  form.banner_id = image.id
  form.banner_url = image.path
}


async function okHandler() {
  let v = await formRef.value.validate()
  if (v) return
  if (type === "update") {
    let res = await articleUpdateApi(form)
    if (res.code) {
      Message.error(res.msg)
      return
    }
    Message.success(res.msg)
    emits("update:visible", false)
    emits("ok")
  }
  if (type === "add") {
    emits("update:visible", false)
    emits("ok", form)
  }

}


</script>
<style lang="scss">
.banner_image_div {
  display: flex;
  align-items: center;
  padding: 5px 0;

  img {
    margin-right: 5px;
    border-radius: 5px;
  }
}

.preview_body {
  max-width: inherit;
}

.gvb_article_modal_body .arco-modal-body {
  overflow-x: hidden;
}
</style>