<template>
  <n-form-item label="默认值">
    <n-date-picker
        style="width: 100%;"
        v-model:value="data.options.defaultValue"
        :format="data.options.format"
        :placeholder="data.options.placeholder"
    />
  </n-form-item>
  <n-form-item label="组件类型">
    <n-radio-group v-model:value="data.options.type" @change="changeDateType">
      <n-radio-button value="date" label="日期"/>
      <n-radio-button value="month" label="月份"/>
      <n-radio-button value="quarter" label="季度"/>
      <n-radio-button value="year" label="年份"/>
    </n-radio-group>
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

    const changeDateType = (e: Event)=> {
      let value = (e.target as HTMLInputElement).value
      switch (value) {
        case 'date':
          data.value.options.format='yyyy-MM-dd';
          break
        case 'month':
          data.value.options.format='yyyy-MM';
          break
        case 'quarter':
          data.value.options.format='yyyy-第Q季度';
          break
        case 'year':
          data.value.options.format='yyyy';
          break
      }
    }

    return {
      data,
      changeDateType
    }
  }
})

</script>


<style scoped>

</style>
