<template>
  <div class="gvb_table">

    <div class="gvb_table_head">

      <div class="action_create" v-if="!props.noAdd">
        <a-button type="primary" @click="add">{{ addLabel }}</a-button>
      </div>

      <div class="action_group" v-if="!noActionGroup">
        <a-select placeholder="操作" style="width:120px" allow-clear
                  :options="actionOptions"
                  v-model="actionValue"></a-select>
        <a-popconfirm content="真的要消失吗?" v-if="!props.noConfirm" @ok="actionMethod">
          <a-button type="primary" status="danger" v-if="actionValue !== undefined && actionValue !== ''">神雷诺，启动!
          </a-button>
        </a-popconfirm>
        <a-button v-else type="primary" status="danger" v-if="actionValue !== undefined && actionValue !== ''"
                  @click="actionMethod">
          神雷诺，启动!
        </a-button>

      </div>

      <div class="action_search">
        <a-input-search
            :placeholder="searchPlaceholder"
            v-model="params.key"
            @keydown.enter="search"
            @search="search">

        </a-input-search>
      </div>

      <slot name="action_other_search"></slot>


      <div class="action_filter" v-if="filterGroup.length">
        <a-select
            :placeholder="item.label"
            :options="item.options"
            allow-clear
            @change="filterChange(item, $event)"
            v-for="item in filterGroup"></a-select>
      </div>

      <slot name="action_slot"></slot>

      <div class="action_flush">
        <a-button @click="flush">
          <IconRefresh></IconRefresh>
        </a-button>
      </div>

    </div>


    <a-spin class="gvb_table_data" :loading="isLoading" tip="正在发掘...">
      <div>
        <div class="gvb_table_source">
          <a-table :row-key=rowKey :columns="props.columns" :data="data.list"
                   :row-selection="props.noCheck ?  undefined: rowSelection"
                   v-model:selectedKeys="selectedKeys" :pagination="false">

            <template #columns>
              <template v-for="item in props.columns">
                <a-table-column v-if="item.render" :title="item.title as string">
                  <template #cell="data">
                    <component :is="item.render(data) as Component"></component>
                  </template>
                </a-table-column>

                <a-table-column v-else-if="!item.slotName" :title="item.title as string"
                                :data-index="item.dataIndex"></a-table-column>
                <a-table-column :title="item.title as string" v-else>
                  <template #cell="{record}" v-if="item.slotName === 'action'">
                    <div class="gvb_cell_actions">
                      <slot name="action_left" :record="record"></slot>
                      <a-button v-if="!props.noEdit" type="primary" @click="edit(record)">编辑</a-button>
                      <slot name="action_middle" :record="record"></slot>
                      <a-popconfirm v-if="!props.noDelete" content="要消失吗?" @ok="remove(record)">
                        <a-button status="danger" type="primary">删除</a-button>
                      </a-popconfirm>
                      <slot name="action_right" :record="record"></slot>

                    </div>
                  </template>
                  <template #cell="{record}" v-else-if="item.slotName === 'created_at'">
                    <span>{{ dateTimeFormat(record.created_at) }}</span>
                  </template>

                  <template v-else #cell="{record}">
                    <slot :name="item.slotName" :record="record"></slot>
                  </template>
                </a-table-column>
              </template>
            </template>
          </a-table>
        </div>
        <div class="gvb_table_page" v-if="!props.noPage">
          <a-pagination :total="data.count" @change="pageChange" v-model:current="params.page"
                        :default-page-size="params.limit" show-total show-jumper/>
        </div>
      </div>

    </a-spin>


  </div>
</template>

<script setup lang="ts">
import {IconRefresh} from "@arco-design/web-vue/es/icon";
import {type Component, reactive, ref} from "vue";
import {type baseResponse, defaultOptionApi, type listDataType} from "@/api";
import type {paramsType} from "@/api";
import {Message, type TableColumnData, type TableData, type TableRowSelection} from "@arco-design/web-vue";
import {dateTimeFormat} from "@/utils/date";
import {defaultDeleteApi} from "@/api";
import type {optionType} from "@/types";

export interface actionOptionType {
  label: string;
  value?: number;
  callback?: (idList: (number | string)[]) => Promise<boolean>
}

type filterFunc = (params?: paramsType) => Promise<baseResponse<optionType[]>>

export interface filterOptionType {
  label: string;
  value?: number;
  column: string;
  source: optionType[] | string | filterFunc;
  options?: optionType[] // 可以是一个现成的数据，也可以是一个url地址，也可以是一个函数
}

interface Props {
  url: (params: paramsType) => Promise<baseResponse<listDataType<any>>>
  columns: TableColumnData[]
  limit?: number
  rowKey?: string
  addLabel?: string
  defaultDelete?: boolean  // 是否启用默认删除
  noActionGroup?: boolean // 不启用操作组
  actionGroup?: actionOptionType[] // 操作数组
  noCheck?: boolean // 不能选择
  filterGroup?: filterOptionType[] //过滤组
  noConfirm?: boolean // 关闭二次确认
  noAdd?: boolean // 没有添加
  noEdit?: boolean // 没有编辑
  noDelete?: boolean // 没有删除
  searchPlaceholder?: string//模糊匹配的提示词
  defaultParams?: paramsType & any // 默认第一次查询参数
  noPage?: boolean // 不要分页

}

const props = defineProps<Props>()

const {
  limit = 10,
  rowKey = "id",
  addLabel = "添加",
  searchPlaceholder = "挖掘"
} = props

export type RecordType<T> = T & {}

const emits = defineEmits<{
  (e: "add"): void // 添加的事件
  (e: "edit", record: RecordType<any>): void// 编辑的事件
  (e: "remove", idList: (number | string)[]): void// 删除的事件，单删，批量删除
}>()

const selectedKeys = ref<number[] | string[]>([]);
const rowSelection = reactive<TableRowSelection>({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});

// 操作组
const actionOptions = ref<actionOptionType[]>([
  {label: "遮蔽风沙吧", value: 0},
])

function initActionGroup() {
  if (!props.actionGroup) return
  for (let i = 0; i < props.actionGroup.length; i++) {
    actionOptions.value.push({
      label: props.actionGroup[i].label,
      value: i + 1,
      callback: props.actionGroup[i].callback
    })
  }
}

initActionGroup()
const actionValue = ref<number | undefined | "">(undefined)

function actionMethod() {

  if (actionValue.value === "") {
    return;
  }
  // 判断是不是1
  if (actionValue.value === 0) {
    // 批量删除
    if (selectedKeys.value.length === 0) {
      Message.warning("选择目标")
      return
    }
    removeIdData(selectedKeys.value)
    return;
  }
  const action = actionOptions.value[actionValue.value as number]
  if (!action.callback) {
    return;
  }
  action.callback(selectedKeys.value).then(res => {
    if (res) {
      selectedKeys.value = []
      getList()
      return
    }
  })
}

// 过滤组
const filterGroup = ref<filterOptionType[]>([])

async function initFilterGroup() {


  if (!props.filterGroup) return
  for (let i = 0; i < props.filterGroup.length; i++) {
    // 处理source的数据
    const item = props.filterGroup[i]
    let source: optionType[] = []
    switch (typeof item.source) {
      case "function":
        let res1 = await (item.source as filterFunc)()
        source = res1.data
        break
      case "object":
        source = (item.source as optionType[])
        break
      case "string":
        // 请求接口
        let res2 = await defaultOptionApi(item.source as string)
        source = Array.isArray(res2.data) ? res2.data : [res2.data];
        break
    }
    filterGroup.value.push({
      label: item.label,
      value: i,
      column: item.column,
      options: source,
      source: item.source,
    })
  }
}

initFilterGroup()

function filterChange(item: any, val: any) {
  console.log(item.column, val)
  getList({[item.column]: val})
}


function add() {
  emits("add")
}

function edit(record: RecordType<any>) {
  emits("edit", record);
}

// 从列表里面匹配路径
const urlRegex = /return useAxios.get\("(.*?)",.*?\)/

// 删除单个
async function remove(record: RecordType<any>) {
  let id = record[rowKey]
  removeIdData([id])
}

// 批量删除
async function removeIdData(idList: (number | string)[]) {
  if (props.defaultDelete) {
    let regexResult = urlRegex.exec(props.url.toString())
    if (regexResult === null || regexResult.length !== 2) {
      return
    }
    let res = await defaultDeleteApi(regexResult[1], idList)
    if (res.code) {
      Message.error(res.msg)
      return
    }
    Message.success(res.msg)
    selectedKeys.value = []
    getList()
    return;
  }
  emits("remove", idList)

}

const data = reactive<listDataType<any>>({
  list: [],
  count: 0,
})

const params = reactive<paramsType>({
  page: 1,
  limit: limit,
  key: "",  // 这个参数有问题，无法搜索

})


const isLoading = ref(false)

// 过滤失败了，好像不是role这个参数
async function getList(p?: paramsType & any) {
  if (p) {
    Object.assign(params, p)
  }
  isLoading.value = true
  let res = await props.url(params)
  isLoading.value = false

  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list
  data.count = res.data.count
}


function pageChange() {
  getList()
}

// 搜索页数到第1页
function search() {
  params.page = 1
  getList()
}

// 刷新
function flush() {
  Message.success("刷新成功")
  getList()
}

getList(props.defaultParams)

function clearData() {
  data.list = []
  data.count = 0
}


defineExpose({
  getList,
  clearData,
})


</script>

<style lang="scss">
.gvb_table {
  background-color: var(--color-bg-1);
  border-radius: 5px;

  .gvb_table_head {
    padding: 20px 20px 10px 20px;
    border-bottom: 1px solid var(--bg);
    display: flex;
    align-items: center;
    position: relative;

    > div {
      margin-right: 10px;
    }

    .action_group {
      display: flex;

      button {
        margin-left: 10px;
      }
    }

    .action_filter {
      display: flex;

      > .arco-select {
        margin-left: 10px;

      }
    }

    .action_flush {
      position: absolute;
      right: 20px;
      margin-right: 0;

      button {
        padding: 0 10px;
      }
    }
  }

  .gvb_table_data {
    width: 100%;
    padding: 20px 20px 20px 20px;

    .gvb_table_source {
      .gvb_cell_actions {
        > button {
          margin-right: 10px;

          &:last-child {
            margin-right: 0;
          }
        }
      }

    }

    .gvb_table_page {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }

}
</style>