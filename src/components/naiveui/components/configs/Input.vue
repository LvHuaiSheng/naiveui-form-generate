<template>
  <n-form-item
      label="默认内容">
    <n-input v-model:value="data.options.defaultValue"/>
  </n-form-item>
  <n-form-item label="最大长度">
    <n-input v-model:value.number="data.options.maxlength"/>
  </n-form-item>
  <n-form-item
      label="显示属性">
    <n-checkbox
        v-model:checked="data.options.showLabel"
    >显示标签
    </n-checkbox>
    <n-checkbox
        v-model:checked="data.options.showCount"
    >显示字数
    </n-checkbox
    >
    <n-checkbox
        v-model:checked="data.options.round"
    >圆角
    </n-checkbox
    >
  </n-form-item>
  <n-form-item label="输入框类型">
    <n-radio-group v-model:value="data.options.type">
      <n-radio-button value="text" label="单行文本"/>
      <n-radio-button value="textarea" label="多行文本"/>
      <n-radio-button value="password" label="密码框"/>
    </n-radio-group>
  </n-form-item>
  <n-form-item label="前缀">
    <n-input v-model:value="data.options.prefix"/>
  </n-form-item>

  <n-form-item label="后缀">
    <n-input v-model:value="data.options.suffix"/>
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
    <n-checkbox
        v-model:checked="data.options.allowClear"
    >清除
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
