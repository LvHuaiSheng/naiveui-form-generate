<template>
  <div class="form-config-container">
    <n-form >
      <n-form-item label="表单布局">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-switch
                v-model:value="data.inline"
            >
              <template #checked>
                行内表单
              </template>
              <template #unchecked>
                默认
              </template>
            </n-switch>
          </template>
          推荐使用【栅格布局】实现行内表单
        </n-tooltip>
      </n-form-item>
      <n-form-item label="标签显示位置">
        <n-radio-group v-model:value="data.labelPlacement" button-style="solid" @change="changeLabelPlacement" >
          <n-radio-button value="top">上</n-radio-button>
          <n-radio-button value="left">左</n-radio-button>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="标签宽度">
        <n-radio-group v-model:value="labelWidthType" button-style="solid" @change="changeLabelWidthType" >
          <n-radio-button value="auto" :disabled="data.labelPlacement==='left'">自动</n-radio-button>
          <n-radio-button value="custom" :disabled="data.labelPlacement==='top'">自定义</n-radio-button>
        </n-radio-group>
        <n-input-number v-if="labelWidthType==='custom'" v-model:value="data.labelWidth"/>
      </n-form-item>

      <n-form-item label="标签对齐方式">
        <n-radio-group v-model:value="data.labelAlign" button-style="solid" >
          <n-radio-button value="left">左对齐</n-radio-button>
          <n-radio-button value="right" :disabled="data.labelPlacement==='left'">右对齐</n-radio-button>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="组件尺寸">
        <n-radio-group v-model:value="data.size" button-style="solid">
          <n-radio-button value="large">大</n-radio-button>
          <n-radio-button value="medium">默认</n-radio-button>
          <n-radio-button value="small">小</n-radio-button>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="隐藏必填标记">
        <n-switch
          v-model:value="data.hideRequiredMark"
        >
          <template #checked>
            隐藏
          </template>
          <template #unchecked>
            显示
          </template>
        </n-switch>
      </n-form-item>
<!--      <n-form-item label="显示标签文本">
        <n-switch
            v-model:value="data.showLabel"
        >
          <template #checked>
            显示
          </template>
          <template #unchecked>
            隐藏
          </template>
        </n-switch>
      </n-form-item>-->
    </n-form>
  </div>
</template>

<script lang="ts">
import { WidgetForm } from '../config/naiveui'
import {defineComponent, PropType, reactive, ref, toRefs, watch} from 'vue'

export default defineComponent({
  name: 'NaiveFormConfig',
  props: {
    config: {
      type: Object as PropType<WidgetForm['config']>,
      required: true
    }
  },
  emits: ['update:config'],
  setup(props, context) {
    const state = reactive({
      labelWidthType: 'auto',
    })

    const data = ref(props.config)
    watch(data, () => context.emit('update:config', data))
    return {
      ...toRefs(state),
      data,
      changeLabelPlacement (e: Event) {
        state.labelWidthType = (e.target as HTMLInputElement).value
        if (data.value.labelPlacement==='top'){
          state.labelWidthType = 'auto'
          data.value.labelWidth = 'auto'
        }else{
          state.labelWidthType = 'custom'
          data.value.labelAlign = 'left'
          data.value.labelWidth = 80
        }
      },
      changeLabelWidthType (e: Event) {
        state.labelWidthType = (e.target as HTMLInputElement).value
      }
    }
  }
})
</script>
