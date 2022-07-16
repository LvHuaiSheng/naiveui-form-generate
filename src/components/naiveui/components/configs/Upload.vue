<template>
  <n-form-item label="模式">
    <n-radio-group
        button-style="solid"
        v-model:value="data.options.listType"
    >
      <n-radio-button value="text">text</n-radio-button>
      <n-radio-button value="image">image</n-radio-button>
      <n-radio-button value="image-card">image-card</n-radio-button>
    </n-radio-group>
  </n-form-item>
  <n-form-item label="文件参数名">
    <n-input v-model:value="data.options.name" />
  </n-form-item>

  <n-form-item label="上传地址">
    <n-input v-model:value="data.options.action" />
  </n-form-item>

  <n-form-item label="接受上传的文件类型(多个使用 , 隔开)">
    <n-input v-model:value="data.options.accept" />
  </n-form-item>
  <n-form-item label="最大上传数量">
    <n-input-number v-model:value.number="data.options.maxCount" :min="1" />
  </n-form-item>

  <n-form-item label="上传请求方法">
    <n-radio-group button-style="solid" v-model:value="data.options.method">
      <n-radio-button value="post">POST</n-radio-button>
      <n-radio-button value="put">PUT</n-radio-button>
      <n-radio-button value="get">GET</n-radio-button>
      <n-radio-button value="delete">DELETE</n-radio-button>
    </n-radio-group>
  </n-form-item>

  <n-form-item label="上传属性">
    <n-space item-style="display: flex;" align="center">
      <n-checkbox v-model:checked="data.options.showFileList">显示列表</n-checkbox>
      <n-checkbox v-model:checked="data.options.multiple">多选</n-checkbox>
      <n-checkbox v-model:checked="data.options.defaultUpload">否默认上传</n-checkbox>
      <n-checkbox v-model:checked="data.options.directory">目录上传</n-checkbox>
      <n-checkbox v-model:checked="data.options.directoryDnd">目录拖拽上传</n-checkbox>
    </n-space>
  </n-form-item>
  <n-form-item label="操作属性">
    <n-space item-style="display: flex;" align="center">
      <n-checkbox v-model:checked="data.options.showDownloadButton">显示下载按钮</n-checkbox>
      <n-checkbox v-model:checked="data.options.showRetryButton">显示重新上传按钮</n-checkbox>
      <n-checkbox v-model:checked="data.options.showRemoveButton">显示删除按钮</n-checkbox>
      <n-checkbox v-model:checked="data.options.showCancelButton">是否显示取消按钮</n-checkbox>
      <n-checkbox v-model:checked="data.options.showPreviewButton">是否允许显示预览按钮</n-checkbox>
    </n-space>
  </n-form-item>
  <n-form-item
      label="显示属性">
    <n-checkbox
        v-model:checked="data.options.showLabel"
    >显示标签
    </n-checkbox>
  </n-form-item>
  <n-form-item label="操作属性">
    <n-checkbox
        v-model:checked="data.options.rules.required"
    >必填
    </n-checkbox
    >
    <n-checkbox
        v-model:checked="data.options.disabled"
    >禁用
    </n-checkbox>
  </n-form-item>
</template>
<script lang="ts">
import {defineComponent, ref, watch} from 'vue'

export default defineComponent({
  name: 'InputWidget',
  props: {
    select: {
      type: Object
    }
  },
  emits: ['update:select'],
  setup(props, context) {
    const data = ref<any>(props.select)
    watch(
        () => props.select,
        val => (data.value = val)
    )
    watch(data, val => context.emit('update:select', val))
    return {
      data,
    }
  }
})

</script>


<style scoped>

</style>
