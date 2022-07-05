<template>
  <n-form-item label="源项标题">
    <n-input v-model:value="data.options.sourceTitle" />
  </n-form-item>
  <n-form-item label="目标项标题">
    <n-input v-model:value="data.options.targetTitle" />
  </n-form-item>
  <n-form-item label="是否可搜索">
    <n-switch
        checked-children="是"
        un-checked-children="否"
        v-model:value="data.options.filterable"
    >
      <template #checked>
        是
      </template>
      <template #unchecked>
        否
      </template>
    </n-switch>
  </n-form-item>
  <n-form-item label="开启虚拟滚动（停用动画）">
    <n-switch
        checked-children="是"
        un-checked-children="否"
        v-model:value="data.options.virtualScroll"
    >
      <template #checked>
        是
      </template>
      <template #unchecked>
        否
      </template>
    </n-switch>
  </n-form-item>
  <n-form-item label="选项">
    <n-checkbox-group v-model:value="data.options.defaultValue" style="margin-top: 10px;">
      <n-dynamic-input v-model:value="data.options.options" :on-create="handleInsertOption" show-sort-button>
        <template #default="{ value }">
          <div style="display: flex; align-items: center; width: 100%">
            <n-checkbox
                :value="value.value"
                style="margin-right: 5px"
            />
            <n-input v-model:value="value.label" type="text" style="margin-right: 12px; width: 160px"/>
            <n-input v-model:value="value.value" type="text" />
          </div>
        </template>
      </n-dynamic-input>
    </n-checkbox-group>
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
  name: 'RichtextEditorWidget',
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

    const handleInsertOption = () => {
      const length = data.value.options.options.length + 1
      return {
        label: `Option ${length}`,
        value: `Option ${length}`
      }
    }

    return {
      data,
      handleInsertOption,
    }
  }
})

</script>

<style scoped lang="less">
/deep/ .n-dynamic-input .n-dynamic-input-item .n-dynamic-input-item__action{
  margin: 0 0 0 10px;
}
</style>
