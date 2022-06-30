import {CodeType, PlatformType} from '../enums'

export default function (
    widgetForm: any,
    codeType: CodeType,
    platformType: PlatformType
) {
    if (codeType === CodeType.Form) {
        return `<template>
    <naiveui-generate-form ref="generateFormRef" :data="widgetForm"></naiveui-generate-form>
    <n-button type="primary" @click="handleSubmit">提交</n-button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      generateFormRef: null,
      widgetForm: ${JSON.stringify(widgetForm)}
    })

    const handleSubmit = () => {
      state.generateFormRef.getData().then(data => {
        console.log(data)
        // data success
        // data 表单数据
      }).catch(error => {
        // data failed
      })
    }

    return {
      ...toRefs(state),
      handleSubmit
    }
  }
})
</script>
    `
    }
    if (codeType === CodeType.Model) {
        return `<n-modal
        v-model:show="modalVisible"
        preset="dialog"
        title="弹窗表单"
        positive-text="Copy"
        negative-text="取消"
        style="width: 800px"
        @positive-click="handleCopyClick(dataCodeTemplate)"
    >
    <div>
        <naiveui-generate-form ref="generateFormRef" :data="widgetForm"></naiveui-generate-form>
    </div>
    <template #action>
        <n-button @click="handleClose">关闭</n-button>
        <n-button type="primary" @click="handleSubmit">提交</n-button>
    </template>
</n-modal>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      generateFormRef: null,
      modalVisible: false,
      widgetForm: ${JSON.stringify(widgetForm)}
    })

    const handleClose = () => {
     state.modalVisible=false
    }
    const handleSubmit = () => {
      state.generateFormRef.getData().then(data => {
        console.log(data)
        // data success
        // data 表单数据
      }).catch(error => {
        // data failed
      })
    }

    return {
      ...toRefs(state),
      handleSubmit,
      handleClose,
    }
  }
})
</script>
    `
    }
}
