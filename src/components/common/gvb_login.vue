<template>
  <div>
    <a-modal width="400px" class="gvb_login_model" :visible="props.visible" title="用户登录" :footer="false"
             @cancel="close">
      <gvb_login_form ref="gvbLoginForm" @ok="close"></gvb_login_form>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import Gvb_login_form from "@/components/common/gvb_login_form.vue";
import {ref} from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
  }
})
const emits = defineEmits(["update:visible"]);
const gvbLoginForm = ref()

function close() {
  emits("update:visible", false)
  gvbLoginForm.value.formReset();
}

</script>
<style lang="scss">
.gvb_login_model {
  .arco-modal-header {
    display: none;
  }
}
</style>
