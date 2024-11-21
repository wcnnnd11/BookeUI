<template>
<div class="gvb_title">
  {{props.title}}

</div>
</template>
<script setup lang="ts">
const props = defineProps({
  title:{type:String}
})
</script>
<style scoped lang="scss">
.gvb_title{
  font-size: 16px;
  font-weight: 900;
  font-family: 幼圆;
  display: flex;
  align-items: center;

  &::before{
    width: 3px;
    height: 1.2rem;
    margin-right: 5px;
    content: "";
    display: inline-block;
    background-color: var(--active);
  }

}
</style>