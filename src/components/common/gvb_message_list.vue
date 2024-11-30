<template>
  <div class="gvb_message_list">
    <div :class="{item: true , active: active === item.userID}" @click="checkItem(item)" v-for="item in props.data">
      <img class="avatar" :src="item.avatar" alt="">
      <div class="nickName">
        <a-typography-paragraph
            :ellipsis="{
          rows:1,
          showTooltip:true,
          css:true
          }"
        >{{ item.nickName }}
        </a-typography-paragraph>
      </div>
      <div class="count">{{ item.count }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import type {messageType} from "@/api/message_api";
import {useRoute} from "vue-router";


const route = useRoute()

interface Props {
  data: messageType[];
}

const props = defineProps<Props>()

const emits = defineEmits(["check"])

const active = ref<number>(Number(route.query.user_id))
console.log(active.value)

function checkItem(record: messageType) {
  active.value = record.userID
  emits("check", record)
}

</script>
<style lang="scss">
.gvb_message_list {
  width: 100%;

  .item {
    width: 100%;
    height: 60px;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    .nickName {
      width: 8rem;

      .arco-typography {
        margin-bottom: 0;
      }
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    &.active {
      background-color: var(--color-fill-2);
      border-radius: 5px;
    }
  }

}
</style>