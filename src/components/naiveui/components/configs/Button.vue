<template>
  <n-form-item label="文字" >
    <n-input v-model:value="data.options.text" />
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
  <n-form-item
      label="显示属性">
    <n-space item-style="display: flex;" align="center">
      <n-checkbox
          v-model:checked="data.options.block"
      >块级
      </n-checkbox>
      <n-checkbox
          v-model:checked="data.options.bordered"
      >显示边框
      </n-checkbox>
      <n-checkbox
          v-model:checked="data.options.dashed"
      >虚线边框
      </n-checkbox>
      <n-checkbox
          v-model:checked="data.options.circle"
      >圆形
      </n-checkbox>
      <n-checkbox
          v-model:checked="data.options.ghost"
      >透明
      </n-checkbox>
      <n-checkbox
          v-model:checked="data.options.strong"
      >文字加粗
      </n-checkbox>
      <n-checkbox
          v-model:checked="data.options.textBtn"
      >文本按钮
      </n-checkbox>
    </n-space>
  </n-form-item>
  <n-form-item>
    <template #label>
      颜色设置
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-icon size="18">
            <SvgIcon iconClass="question" style="margin-right: 10px;" />
          </n-icon>
        </template>
        注意：设置该项后 【类型】 将失效
      </n-tooltip>
    </template>
    <n-grid x-gap="2" :cols="3">
      <n-gi>
        <n-form-item label="背景" path="color">
          <n-color-picker v-model:value="data.options.color" :modes="['hex']"/>
        </n-form-item>

      </n-gi>
      <n-gi>
        <n-form-item label="文字" path="textColor">
          <n-color-picker v-model:value="data.options.textColor" :modes="['hex']"/>
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item >
          <n-button @click="resetColors">重置</n-button>
        </n-form-item>
      </n-gi>
    </n-grid>
  </n-form-item>
  <n-form-item label="操作属性">
    <n-checkbox
        v-model:checked="data.options.disabled"
    >禁用
    </n-checkbox>
    <n-checkbox
        v-model:checked="data.options.loading"
    >加载状态
    </n-checkbox>
  </n-form-item>
</template>
<script lang="ts">
import {defineComponent, reactive, ref, toRefs, watch} from 'vue'
export default defineComponent({
  name: 'Alert',
  components:{

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
      data.value.options.color=null
      data.value.options.textColor=null
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
