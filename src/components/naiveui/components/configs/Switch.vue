<template>
  <n-form-item label="默认内容">
    <n-switch v-model:value="data.options.defaultValue"/>
  </n-form-item>
  <n-form-item label="选中时的内容">
    <n-input v-model:value="data.options.checkedChildren" />
  </n-form-item>

  <n-form-item label="非选中时的内容">
    <n-input v-model:value="data.options.unCheckedChildren" />
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
import { defineComponent, ref, watch} from 'vue'

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
