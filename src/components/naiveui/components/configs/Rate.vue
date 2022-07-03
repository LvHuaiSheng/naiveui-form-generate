<template>
  <n-form-item label="默认值">
    <n-rate
        v-model:value="data.options.defaultValue"
        :count="data.options.max"
        :allowHalf="data.options.allowHalf"
        :allowClear="data.options.allowClear"
    />
  </n-form-item>
  <n-form-item label="最大值">
    <n-input-number v-model:value.number="data.options.max" />
  </n-form-item>
  <n-form-item label="是否允许半选">
    <n-switch
        checked-children="是"
        un-checked-children="否"
        v-model:value="data.options.allowHalf"
    >
      <template #checked>
        是
      </template>
      <template #unchecked>
        否
      </template>
    </n-switch>
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
