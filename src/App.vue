<script setup lang="ts">
import FormDesign from './components/naiveui/FormDesign.vue';
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface';
/* 阻止火狐浏览器在  draggable组件时拖动 打开新窗口 */
document.body.ondrop = function(event) {
  event.preventDefault();
  event.stopPropagation();
};
</script>

<template>
  <n-config-provider >
    <n-message-provider :max="3">
      <FormDesign />
    </n-message-provider>
  </n-config-provider>
</template>

<style>
#app {

}
</style>
