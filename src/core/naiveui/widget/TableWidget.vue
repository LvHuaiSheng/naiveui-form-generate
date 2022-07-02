<template>

  <n-form-item label="常用宽高">
    <n-space style="margin-left: 3px">
      <n-tag class="hoverTag" v-for="(item,index) in whTemplateList" :key="index" type="primary"
             @click="changeWhType(item)">
        {{item.label}}
      </n-tag>
    </n-space>
  </n-form-item>

  <n-form-item label="展示主题">
    <n-radio-group v-model:value="data.options.theme">
      <n-radio-button value="default">默认主题</n-radio-button>
      <n-radio-button value="theme1">合同主题</n-radio-button>
    </n-radio-group>
  </n-form-item>

  <n-form-item label="表格属性">
    <n-space item-style="display: flex;" align="center">
      <n-checkbox
          v-model:checked="data.options.bordered"
      >是否显示边框
      </n-checkbox>
      <n-checkbox
          v-model:checked="data.options.bottomBordered"
      >表格底部是否有边框
      </n-checkbox>
      <n-checkbox
          v-model:checked="data.options.singleColumn"
      >是否不设定行的分割线
      </n-checkbox>
      <n-checkbox
          v-model:checked="data.options.singleLine"
      >是否不设定列的分割线
      </n-checkbox>
      <n-checkbox
          v-model:checked="data.options.striped"
      >是否使用斑马线条纹
      </n-checkbox>
    </n-space>
  </n-form-item>
  <n-form-item label="操作属性">
    <n-checkbox
        v-model:checked="data.options.disabled"
    >禁用
    </n-checkbox>
  </n-form-item>
</template>
<script lang="ts">
import {defineComponent, reactive, ref, watch,toRefs} from 'vue'

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
    const state = reactive({
      whTemplateList:[
        {label:'A3 [297mm * 420mm]',value:'A3'},
        {label:'A4 [210mm * 297mm]',value:'A4'},
        {label:'A5 [148mm * 210mm]',value:'A5'},
        {label:'A6 [105mm * 148mm]',value:'A6'},
      ]
    })
    const changeWhType  = (item)=>{
      switch (item.value) {
          case 'A3':
            data.value.options.width='297mm';
            data.value.options.height='420mm';
            break
          case 'A4':
            data.value.options.width='210mm';
            data.value.options.height='297mm';
            break
          case 'A5':
            data.value.options.width='148mm';
            data.value.options.height='210mm';
            break
          case 'A6':
            data.value.options.width='105mm';
            data.value.options.height='148mm';
            break
      }
    }
    return {
      ...toRefs(state),
      data,
      changeWhType,
    }
  }
})

</script>


<style scoped lang="less">
.hoverTag{
  cursor: pointer;
  &:hover {
    outline-offset: 0;
    outline: 1px solid;
  }
}
</style>
