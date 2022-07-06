<template>
  <n-form-item label="标题" >
    <n-input v-model:value="data.options.title" />
  </n-form-item>

  <n-form-item label="最大值">
    <n-input-number v-model:value.number="data.options.max" />
  </n-form-item>

  <n-form-item label="类型">
    <n-radio-group v-model:value="data.options.type" button-style="solid">
      <n-radio-button value="default">默认</n-radio-button>
      <n-radio-button value="info">信息</n-radio-button>
      <n-radio-button value="success">成功</n-radio-button>
      <n-radio-button value="warning">警告</n-radio-button>
      <n-radio-button value="error">错误</n-radio-button>
    </n-radio-group>
  </n-form-item>
  <n-form-item label="标签颜色">
    <template #label>
      标签颜色
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-icon size="18">
            <SvgIcon iconClass="question" style="margin-right: 10px;" />
          </n-icon>
        </template>
        注意：设置该项后 【类型】 将失效
      </n-tooltip>
    </template>
    <n-grid x-gap="2" :cols="4">
      <n-gi>
        <n-form-item label="背景" path="color">
          <n-color-picker v-model:value="data.options.color.color" :modes="['hex']"/>
        </n-form-item>

      </n-gi>
      <n-gi>
        <n-form-item label="边框" path="borderColor">
          <n-color-picker v-model:value="data.options.color.borderColor" :modes="['hex']"/>
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="文字" path="textColor">
          <n-color-picker v-model:value="data.options.color.textColor" :modes="['hex']"/>
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item >
          <n-button @click="resetColors">重置</n-button>
        </n-form-item>
      </n-gi>
    </n-grid>
  </n-form-item>
  <n-form-item
      label="显示属性">
    <n-checkbox
        v-model:checked="data.options.showLabel"
    >显示标签
    </n-checkbox>
    <n-checkbox
        v-model:checked="data.options.round"
    >圆角
    </n-checkbox>
    <n-checkbox
        v-model:checked="data.options.closable"
    >允许关闭
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
import {defineComponent, reactive, ref, toRefs, watch} from 'vue'
import SvgIcon from '../../../../components/SvgIcon.vue'
export default defineComponent({
  name: 'Alert',
  components:{
    SvgIcon
  },
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
    const resetColors =()=>{
      data.value.options.color.color=null
      data.value.options.color.borderColor=null
      data.value.options.color.textColor=null
    }
    return {
      data,
      resetColors
    }
  }
})

</script>


<style scoped>

</style>
