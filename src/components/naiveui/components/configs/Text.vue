<template>
  <n-form-item label="文字" >
    <n-input v-model:value="data.options.text" />
  </n-form-item>
  <n-form-item label="对齐方式">
    <n-radio-group v-model:value="data.options.style.textAlign" button-style="solid">
      <n-radio-button value="left">左对齐</n-radio-button>
      <n-radio-button value="center">居中</n-radio-button>
      <n-radio-button value="right">右对齐</n-radio-button>
    </n-radio-group>
  </n-form-item>
  <n-form-item label="文字粗细">
    <n-radio-group v-model:value="data.options.style.fontWeight" button-style="solid">
      <n-radio-button value="400">正常</n-radio-button>
      <n-radio-button value="600">加粗</n-radio-button>
    </n-radio-group>
  </n-form-item>
  <n-form-item label="文字大小" >
    <n-input v-model:value="data.options.style.fontSize" />
  </n-form-item>
  <n-form-item label="行高" >
    <n-input v-model:value="data.options.style.lineHeight" />
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

    const state = reactive({
      verifyOptions:[
        {label:'字符串',value:'6px'},
        {label:'数字',value:'8'},
        {label:'布尔值',value:'9'},
        {label:'方法',value:'method'},
        {label:'正则表达式',value:'regexp'},
        {label:'整数',value:'integer'},
        {label:'浮点数',value:'float'},
        {label:'数组',value:'array'},
        {label:'对象',value:'object'},
        {label:'枚举',value:'enum'},
        {label:'日期',value:'date'},
        {label:'URL地址',value:'url'},
        {label:'十六进制',value:'hex'},
        {label:'邮箱地址',value:'email'},
        {label:'任意类型',value:'any'},
      ],
    })

    return {
      ...toRefs(state),
      data,
    }
  }
})

</script>


<style scoped>

</style>
