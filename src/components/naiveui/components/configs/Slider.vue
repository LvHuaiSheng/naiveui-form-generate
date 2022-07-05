<template>
  <n-form-item label="默认内容">
    <n-input-group v-if="data.options.range">
      <n-input-number v-model:value.number="data.options.defaultValue[0]" :style="{ width: '33%' }" />
      <n-input-number v-model:value.number="data.options.defaultValue[1]" :style="{ width: '33%' }" />
    </n-input-group>
    <n-input-number v-else v-model:value.number="data.options.defaultValue"/>
  </n-form-item>
  <n-form-item label="最大值">
    <n-input-number v-model:value.number="data.options.max" />
  </n-form-item>

  <n-form-item label="最小值">
    <n-input-number v-model:value.number="data.options.min" />
  </n-form-item>

  <n-form-item label="步长">
    <n-input-number v-model:value.number="data.options.step" :min="0" />
  </n-form-item>

  <n-form-item label="组件属性">
    <n-space item-style="display: flex;" align="center">
      <n-checkbox
          v-model:checked="data.options.range" @change="handleSliderModeChange"
      >双滑块模式
      </n-checkbox>
      <n-tooltip trigger="hover">
          <template #trigger>
            <n-checkbox
                v-model:checked="data.options.vertical"
            >垂直
             </n-checkbox>
          </template>
        启用垂直，则必须设置组件的固定宽度、高度
      </n-tooltip>
      <n-checkbox
          v-model:checked="data.options.reverse"
      >反向坐标轴
      </n-checkbox>
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
    <n-space item-style="display: flex;" align="center">
      <n-checkbox
          v-model:checked="data.options.rules.required"
      >必填
      </n-checkbox
      >
      <n-checkbox
          v-model:checked="data.options.disabled"
      >禁用
      </n-checkbox>
    </n-space>
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

    const handleSliderModeChange = (checked: boolean) => {
      checked
          ? (data.value.options.defaultValue = [0, 0])
          : (data.value.options.defaultValue = 0)
    }
    return {
      data,
      handleSliderModeChange,
    }
  }
})

</script>


<style scoped>

</style>
