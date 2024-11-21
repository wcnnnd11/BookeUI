<template>
  <div class="promotion_list_view">
    <promotion_create v-model:visible="visible" :record="recordData" @ok="gvbTable.getList()"></promotion_create>

    <gvb_table
        :url="promotionListApi"
        :columns="columns"
        default-delete
        add-label="φ(*￣0￣)"
        no-confirm
        ref="gvbTable"
        @add="add"
        @edit="edit"
        search-placeholder="搜索广告名称">

      <template #images="{record}:{record: promotionType}">
        <a-image
            height="60px" style="border-radius: 5px" :src="record.images"></a-image>
      </template>
      <template #href="{record}:{record: promotionType}">
        <a-link :href="record.href" target="_blank">{{ record.href }}</a-link>
      </template>
      <template #is_show="{record}:{record: promotionType}">
        <a-tag v-if="record.is_show" color="arcoblue">显示</a-tag>
        <a-tag v-else>不显示</a-tag>
      </template>
    </gvb_table>
  </div>
</template>
<script setup lang="ts">
import Gvb_table from "@/components/admin/gvb_table.vue";
import {reactive, ref} from "vue";
import {defaultPromotionForm, type promotionCreateType, promotionListApi} from "@/api/promotion_api";
import type {promotionType} from "@/api/promotion_api";
import Promotion_create from "@/components/admin/promotion_create.vue";

const gvbTable = ref()


const columns = [
  {title: '标题', dataIndex: 'title'},
  {title: '图片', slotName: 'images'},
  {title: '链接', slotName: 'href'},
  {title: '是否显示', slotName: 'is_show'},
  {title: '更新时间', slotName: 'created_at'},
  {title: '操作', slotName: 'action'},
]

const visible = ref(false)

const recordData = reactive<promotionType>({
  href:"",
  images:"",
  is_show:false,
  title:"",
})

function edit(record:promotionType){
  Object.assign(recordData,record)

  visible.value = true
}

function add(){
  Object.assign(recordData,defaultPromotionForm)
  recordData.id=undefined
  visible.value = true
}


</script>