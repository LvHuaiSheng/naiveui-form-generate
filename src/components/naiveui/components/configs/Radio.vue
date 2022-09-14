<template>
  <n-form-item label="布局方式">
    <n-radio-group button-style="solid" v-model:value="data.options.groupType">
      <n-radio-button value="radioGroup">单选组</n-radio-button>
      <n-radio-button value="buttonGroup">按钮组</n-radio-button>
    </n-radio-group>
  </n-form-item>
  <n-form-item label="选项">
    <div>
      <n-radio-group button-style="solid" v-model:value="data.options.remote">
        <n-radio-button :value="false">静态数据</n-radio-button>
        <n-radio-button :value="true">远端数据</n-radio-button>
      </n-radio-group>
      <n-space
          v-if="data.options.remote"
          direction="vertical"
          style="margin-top: 10px;"
      >

        <n-input-group>
          <n-input-group-label>远端方法</n-input-group-label>
          <n-input  v-model:value="data.options.remoteFunc"/>
        </n-input-group>

        <n-input-group>
          <n-input-group-label>标签</n-input-group-label>
          <n-input  v-model:value="data.options.props.label"/>
        </n-input-group>

        <n-input-group>
          <n-input-group-label>值</n-input-group-label>
          <n-input  v-model:value="data.options.props.value"/>
        </n-input-group>
      </n-space>
      <template v-else>
        <n-radio-group v-model:value="data.options.defaultValue" style="margin-top: 10px;">
          <n-dynamic-input v-model:value="data.options.options" :on-create="handleInsertOption" show-sort-button>
            <template #default="{ value }">
              <div style="display: flex; align-items: center; width: 100%">
                <n-radio
                    :value="value.value"
                    style="margin-right: 5px"
                />
                <n-input v-model:value="value.label" type="text" style="margin-right: 12px; width: 160px"/>
                <n-input v-model:value="value.value" type="text" />
              </div>
            </template>
          </n-dynamic-input>
        </n-radio-group>

      </template>
    </div>
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
import Draggable from 'vuedraggable'
import SvgIcon from '../../../../components/SvgIcon.vue'
export default defineComponent({
  components:{
    Draggable,
    SvgIcon,
  },
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

    const handleInsertOption = () => {
      const length = data.value.options.options.length + 1
      return {
        label: `Option ${length}`,
        value: `Option ${length}`
      }
    }

    const handleOptionsRemove = (index: number) => {
      if (data.value.type === 'grid') {
        data.value.columns.splice(index, 1)
      } else {
        data.value.options.options.splice(index, 1)
      }
    }

    return {
      data,
      handleInsertOption,
      handleOptionsRemove,
    }
  }
})

</script>


<style scoped lang="less">
:deep(.n-dynamic-input .n-dynamic-input-item .n-dynamic-input-item__action){
  margin: 0 0 0 10px;
}
</style>
