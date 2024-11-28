<template>
  <div>
    <a-modal title="聊天" width="40%" :visible="props.visible" :footer="false" body-class="gvb_message_record_modal_body" @cancel="close">
      <gvb_message_record :userID="props.userID"></gvb_message_record>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import Gvb_message_record from "@/components/common/gvb_message_record.vue";

interface Props {
  visible: boolean
  userID: number
}

const props = defineProps<Props>()
const emits = defineEmits(["update:visible"])

function close() {
  emits("update:visible", false)
}
</script>

<style lang="scss">
.gvb_message_record_modal_body{
  padding: 0;
}
</style>