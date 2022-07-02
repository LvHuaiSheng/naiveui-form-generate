<template>
  <n-form-item label="默认值">
    <n-time-picker
        style="width: 100%;"
        v-model:value="data.options.defaultValue"
        :format="data.options.format"
        :placeholder="data.options.placeholder"
    />
  </n-form-item>
  <n-form-item label="格式">
    <n-input v-model:value="data.options.format" />
  </n-form-item>
  <n-form-item label="绑定值格式">
    <n-input v-model:value="data.options.valueFormat" />
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
