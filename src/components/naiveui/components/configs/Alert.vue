<template>
  <n-form-item label="标题" >
    <n-input v-model:value="data.options.title" />
  </n-form-item>
  <n-form-item label="内容" >
    <n-input type="textarea" v-model:value="data.options.content" />
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
  <n-form-item label="显示图标">
    <n-switch
        checked-children="是"
        un-checked-children="否"
        v-model:value="data.options.showIcon"
    >
      <template #checked>
        是
      </template>
      <template #unchecked>
        否
      </template>
    </n-switch>
  </n-form-item>
  <n-form-item label="允许关闭">
    <n-switch
        checked-children="是"
        un-checked-children="否"
        v-model:value="data.options.closable"
    >
      <template #checked>
        是
      </template>
      <template #unchecked>
        否
      </template>
    </n-switch>
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
    return {
      data,
    }
  }
})

</script>


<style scoped>

</style>
