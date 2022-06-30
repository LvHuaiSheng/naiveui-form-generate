<template>
  <div class="fc-style">
    <n-layout has-sider position="absolute">
      <n-layout-sider bordered width="240">
        <div class="components">
          <ComponentGroup
              title="基础组件"
              :fields="basicFields"
              :list="naiveui.basicComponents"
          />
          <ComponentGroup
              title="高级组件"
              :fields="advanceFields"
              :list="naiveui.advanceComponents"
          />
          <ComponentGroup
              title="布局组件"
              :fields="layoutFields"
              :list="naiveui.layoutComponents"
          />
          <ComponentGroup
              title="其它组件"
              :fields="otherFields"
              :list="naiveui.otherComponents"
          />
        </div>
      </n-layout-sider>
      <n-layout >
        <NaiveHeader style="height: 42px;line-height: 50px;border-bottom: 1px solid #e4e7ed;text-align: right;padding: 0 10px;"
            v-bind="$props"
            @preview="() => (previewVisible = true)"
            @uploadJson="() => (uploadJsonVisible = true)"
            @generateJson="handleGenerateJson"
            @generateCode="handleGenerateCode"
            @clearable="handleClearable"
        >
          <slot name="header"></slot>
        </NaiveHeader>
        <n-layout has-sider position="absolute" style="top: 45px;">
          <NaiveWidgetForm
              ref="widgetFormRef"
              v-model:widgetForm="widgetForm"
              v-model:widgetFormSelect="widgetFormSelect"
          />
        </n-layout>
      </n-layout>
      <n-layout-sider
          bordered
          class="widget-config-container"
          content-style="border-left: 1px solid #e4e7ed"
          width="400"
      >
        <n-layout-header>
          <n-tabs type="line">
            <n-tab name="字段属性"  @click="configTab = 'widget'">
              &nbsp;字段属性
            </n-tab>
            <n-tab name="表单属性"  @click="configTab = 'form'">
              表单属性
            </n-tab>
          </n-tabs>
        </n-layout-header>
        <n-layout-content class="config-content">
          <NaiveWidgetConfig
              v-show="configTab === 'widget'"
              v-model:select="widgetFormSelect"
          />
          <NaiveFormConfig
              v-show="configTab === 'form'"
              v-model:config="widgetForm.config"
          />
        </n-layout-content>
      </n-layout-sider>
    </n-layout>
    <n-modal
        v-model:show="uploadJsonVisible"
        title="导入JSON"
        preset="dialog"
        style="width:800px"
        positive-text="确定"
        negative-text="取消"
        @positive-click="handleUploadJson"
    >
      <n-alert
          type="info"
          style="margin-bottom: 10px"
      >JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可</n-alert>
      <CodeEditor v-model:value="jsonEg" language="json" />
    </n-modal>
    <n-modal v-model:show="previewVisible" preset="dialog" title="预览" style="width: 800px">
<!--      <template #header>-->
<!--        <div>标题</div>-->
<!--      </template>-->
      <div>
        <NaiveGenerateForm
            style="margin-top: 20px"
            ref="generateFormRef"
            :data="widgetForm"
        />
      </div>
      <template #action>
        <div>
          <n-space>
            <n-button @click="handleReset">重置校验</n-button>
            <n-button type="primary" @click="handleGetData">获取数据</n-button>
          </n-space>
        </div>
      </template>
    </n-modal>


    <n-modal
        v-model:show="generateJsonVisible"
        preset="dialog"
        title="生成JSON"
        positive-text="Copy"
        negative-text="关闭"
        style="width: 800px"
        @positive-click="handleCopyClick(generateJsonTemplate)"
    >
      <div>
        <CodeEditor :value="generateJsonTemplate" language="json" readonly />
      </div>
    </n-modal>

    <n-modal
        v-model:show="dataJsonVisible"
        preset="dialog"
        title="获取数据"
        positive-text="Copy"
        negative-text="关闭"
        style="width: 800px"
        @positive-click="handleCopyClick(dataJsonTemplate)"
    >
      <CodeEditor :value="dataJsonTemplate" language="json" readonly />
    </n-modal>

    <n-modal
        v-model:show="dataCodeVisible"
        preset="dialog"
        title="生产代码"
        positive-text="Copy"
        negative-text="关闭"
        style="width: 800px"
        @positive-click="handleCopyClick(dataCodeTemplate)"
    >
      <n-tabs
          type="card"
          v-model:value="codeLanguage"
          :tabBarStyle="{ margin: 0 }"
      >
        <n-tab-pane tab="页面表单" :name="codeType.Form">
          <CodeEditor :value="dataCodeTemplate" language="html" readonly />
        </n-tab-pane>
        <n-tab-pane tab="弹窗表单" :name="codeType.Model">
          <CodeEditor :value="dataCodeTemplate" language="html" readonly />
        </n-tab-pane>
      </n-tabs>
    </n-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, toRefs, watchEffect } from 'vue'
import { useMessage } from 'naive-ui'
import { merge } from 'lodash'
import CodeEditor from '../../components/CodeEditor.vue'
import ComponentGroup from '../../components/ComponentGroup.vue'
import NaiveHeader from './NaiveHeader.vue'
import NaiveWidgetForm from './NaiveWidgetForm.vue'
import NaiveGenerateForm from './NaiveGenerateForm.vue'
import NaiveWidgetConfig from './NaiveWidgetConfig.vue'
import NaiveFormConfig from './NaiveFormConfig.vue'
import { naiveui } from '../../config'
import { copy } from '../../utils'
import { CodeType, PlatformType } from '../../enums'
import generateCode from '../../utils/generateCode'
import { WidgetForm } from '../../config/naiveui'

export default defineComponent({
  name: 'DesignForm',
  components: {
    NaiveHeader,
    ComponentGroup,
    CodeEditor,
    NaiveWidgetForm,
    NaiveGenerateForm,
    NaiveWidgetConfig,
    NaiveFormConfig
  },
  props: {
    preview: {
      type: Boolean,
      default: true
    },
    generateCode: {
      type: Boolean,
      default: true
    },
    generateJson: {
      type: Boolean,
      default: true
    },
    uploadJson: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    basicFields: {
      type: Array as PropType<Array<string>>,
      default: () => [
        'input',
        'number',
        'radio',
        'checkbox',
        'time',
        'date',
        'rate',
        'select',
        'switch',
        'slider',
        'text',
        'color',
      ]
    },
    advanceFields: {
      type: Array as PropType<Array<string>>,
      default: () => [
          'img-upload',
        'richtext-editor',
        'cascader',
        'tree',
        'table',
        'dynamicTable',
        'selectTree',
        'transfer',
      ]
    },
    layoutFields: {
      type: Array as PropType<Array<string>>,
      default: () => ['grid']
    },
    otherFields: {
      type: Array as PropType<Array<string>>,
      default: () => ['text','alert']
    }
  },
  setup() {
    const message = useMessage()
    const state = reactive({
      naiveui,
      codeType: CodeType,
      widgetForm: JSON.parse(JSON.stringify(naiveui.widgetForm)),
      widgetFormSelect: undefined,
      generateFormRef: null as any,
      configTab: 'widget',
      previewVisible: false,
      uploadJsonVisible: false,
      dataJsonVisible: false,
      dataCodeVisible: false,
      generateJsonVisible: false,
      generateCodeVisible: false,
      generateJsonTemplate: JSON.stringify(naiveui.widgetForm, null, 2),
      dataJsonTemplate: '',
      dataCodeTemplate: '',
      codeLanguage: CodeType.Form,
      jsonEg: JSON.stringify(naiveui.widgetForm, null, 2)
    })

    const handleUploadJson = () => {
      try {
        setJson(JSON.parse(state.jsonEg))
        state.uploadJsonVisible = false
        message.success('上传成功')
      } catch (error) {
        message.error('上传失败')
      }
    }

    const handleCopyClick = (text: string) => {
      copy(text)
      message.success('Copy成功')
    }

    const handleGetData = () => {
      state.generateFormRef.getData().then((res: any) => {
        state.dataJsonTemplate = JSON.stringify(res, null, 2)
        state.dataJsonVisible = true
      })
    }

    const handleGenerateJson = () =>
        (state.generateJsonTemplate = JSON.stringify(
            state.widgetForm,
            null,
            2
        )) && (state.generateJsonVisible = true)

    const handleGenerateCode = () => {
      state.codeLanguage = CodeType.Form
      state.dataCodeVisible = true
    }

    watchEffect(() => {
      if (state.dataCodeVisible) {
        state.dataCodeTemplate = generateCode(
            state.widgetForm,
            state.codeLanguage,
            PlatformType.NaiveUi
        )!
      }
    })

    const handleClearable = () => {
      state.widgetForm.list = []
      merge(state.widgetForm, JSON.parse(JSON.stringify(naiveui.widgetForm)))
      state.widgetFormSelect = undefined
    }

    const handleReset = () => state.generateFormRef.reset()

    const getJson = () => state.widgetForm

    const setJson = (json: WidgetForm) => {
      state.widgetForm.list = []
      merge(state.widgetForm, json)
      if (json.list.length) {
        state.widgetFormSelect = json.list[0]
      }
    }

    const getTemplate = (codeType: CodeType) =>
        generateCode(state.widgetForm, codeType, PlatformType.NaiveUi)

    const clear = () => handleClearable()

    return {
      ...toRefs(state),
      handleUploadJson,
      handleCopyClick,
      handleGetData,
      handleGenerateJson,
      handleGenerateCode,
      handleClearable,
      handleReset,
      getJson,
      setJson,
      getTemplate,
      clear
    }
  }
})
</script>
