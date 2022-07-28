<template>

  <n-form layout="vertical" v-if="data" :key="data.key">
    <n-form-item label="字段标识" v-if="data.type !== 'grid'">
      <n-input v-model:value="data.model" />
    </n-form-item>

    <n-form-item label="标题" v-if="data.type !== 'grid'&&data.options.showLabel">
      <n-input v-model:value="data.label" />
    </n-form-item>

    <n-form-item label="宽度" v-if="hasKey('width')">
      <n-input v-model:value="data.options.width" />
    </n-form-item>

    <n-form-item label="高度" v-if="hasKey('height')">
      <n-input v-model:value="data.options.height" />
    </n-form-item>

    <n-form-item label="占位内容" v-if="hasKey('placeholder')">
      <n-input v-model:value="data.options.placeholder" />
    </n-form-item>

    <component  v-if="checkComponent(data.type)" :is="data.type" :select="data"/>
    <template v-if="hasKey('click') || hasKey('change') || hasKey('input') ">
      <h4>事件处理</h4>
      <n-form-item label="change事件" v-if="hasKey('change')">
        <n-button type="info" dashed @click="editEventCode('change')">编辑代码</n-button>
      </n-form-item>
      <n-form-item label="click事件" v-if="hasKey('click')">
        <n-button type="info" dashed @click="editEventCode('click')">编辑代码</n-button>
      </n-form-item>
      <n-alert
          type="warning"
          style="margin-bottom: 10px"
      >注意：此功能在设计状态时无效，可点击预览查看效果</n-alert>
    </template>
    <template v-if="hasKey('rules')">
      <h4>验证规则</h4>

      <n-form-item label="触发时机">
        <n-radio-group
            v-model:value="data.options.rules.trigger"
            button-style="solid"
        >
          <n-radio-button value="blur">Blur</n-radio-button>
          <n-radio-button value="change">Change</n-radio-button>
          <n-radio-button :value="['blur', 'change']">All</n-radio-button>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="枚举类型">
        <n-input v-model:value="data.options.rules.enum" />
      </n-form-item>
      <n-form-item label="校验文案">
        <n-input v-model:value="data.options.rules.message" />
      </n-form-item>

      <n-form-item label="正则表达式">
        <n-input v-model:value="data.options.rules.pattern" />
      </n-form-item>

      <n-form-item label="校验类型">
        <n-select v-model:value="data.options.rules.type" :options="verifyOptions"></n-select>
      </n-form-item>
    </template>
  </n-form>
  <n-modal
      v-model:show="showEventCode"
      :title="editEventHeader"
      preset="dialog"
      style="width:800px"
      positive-text="保存"
      negative-text="取消"
      @positive-click="handleSaveEventCode"
  >
    <n-alert
        type="info"
        style="margin-bottom: 10px"
    ><n-space>
      使用示例
      <n-button text type="primary" @click="setTestEvent('dynamicDisabled')">动态禁用/启用</n-button>
      <n-button text type="primary" @click="setTestEvent('dynamicSetValue')">动态赋值</n-button>
      <n-button text type="primary" @click="setTestEvent('dynamicRequired')">必填项修改</n-button>
      <n-button text type="primary" @click="setTestEvent('dynamicHideLabel')">Label动态显隐</n-button>

      (提示：仅支持Javascript语法)
      </n-space></n-alert>
    <div class="code-bord">function {{eventType}}(e,view,form){
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-icon size="18">
            <SvgIcon iconClass="question" style="margin-right: 10px;" />
          </n-icon>
        </template>
        e：naiveui组件的对应事件入参（如input传入的将是change后的value）<br/>
        view：视图组件信息（更多操作查看src/components/naiveui/config/naiveui.ts）<br/>
        form：表单信息
      </n-tooltip>
    </div>
    <CodeEditor v-model:value="eventCode" language="javascript" />
    <div class="code-bord">}</div>
  </n-modal>
</template>

<script lang="ts">
import {h, defineComponent, reactive, ref, toRefs, watch, onMounted, computed} from 'vue'
import Draggable from 'vuedraggable'
import Input from '../configs/Input.vue'
import Number from '../configs/Number.vue'
import Radio from '../configs/Radio.vue'
import Checkbox from '../configs/Checkbox.vue'
import Time from '../configs/Time.vue'
import Date from '../configs/Date.vue'
import Rate from '../configs/Rate.vue'
import Select from '../configs/Select.vue'
import Switch from '../configs/Switch.vue'
import Slider from '../configs/Slider.vue'
import Color from '../configs/Color.vue'
import SelectTree from '../configs/SelectTree.vue'
import Upload from '../configs/Upload.vue'
import RichtextEditor from '../configs/RichtextEditor.vue'
import Transfer from '../configs/Transfer.vue'
import Grid from '../configs/Grid.vue'
import Table from '../configs/Table.vue'
import Alert from '../configs/Alert.vue'
import Text from '../configs/Text.vue'
import Divider from '../configs/Divider.vue'
import Cascader from '../configs/Cascader.vue'
import Tree from '../configs/Tree.vue'
import DynamicTags from '../configs/DynamicTags.vue'
import Button from '../configs/Button.vue'
import SvgIcon from '../../../../components/SvgIcon.vue'
import { NSpace,NButton,NInput, useMessage,FormInst } from 'naive-ui'
import { v4 } from 'uuid'
import {ComponentType,checkComponent} from '../../enums'
import type {RowData} from '../../types/NaiveWidgetTypes'
import type { DataTableColumns } from 'naive-ui'
import CodeEditor from '../../components/CodeEditor.vue'

export default defineComponent({
  name: 'DesignConfig',
  components: {
    Draggable,
    SvgIcon,
    CodeEditor,
    Input,
    Number,
    Radio,
    Checkbox,
    Time,
    Date,
    Rate,
    Select,
    Switch,
    Slider,
    Color,
    SelectTree,
    Upload,
    RichtextEditor,
    Transfer,
    Grid,
    Table,
    Alert,
    Text,
    Divider,
    Cascader,
    Tree,
    DynamicTags,
    Button,
  },
  props: {
    select: {
      type: Object
    }
  },
  emits: ['update:select'],
  setup(props, context) {
    const data = ref<any>(props.select)
    const treeDataFormRef = ref<FormInst | null>(null)
    watch(
      () => props.select,
      val => (data.value = val)
    )
    // onMounted(() => {
    //   item.mComponent = () => import(`@/views/workplace/${item.path}.vue`)
    // })
    watch(data, val => context.emit('update:select', val))

    const state = reactive({
      verifyOptions:[
        {label:'字符串',value:'string'},
        {label:'数字',value:'number'},
        {label:'布尔值',value:'boolean'},
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
      colorPlacementOptions:[
        {label:'top-start',value:'top-start'},
        {label:'top',value:'top'},
        {label:'top-end',value:'top-end'},
        {label:'right-start',value:'right-start'},
        {label:'right',value:'right'},
        {label:'right-end',value:'right-end'},
        {label:'bottom-start',value:'bottom-start'},
        {label:'bottom',value:'bottom'},
        {label:'bottom-end',value:'bottom-end'},
        {label:'left-start',value:'left-start'},
        {label:'left',value:'left'},
        {label:'left-end',value:'left-end'},
      ],
      eventType:null,
      editEventHeader:'',
      showEventCode:false,
      eventCode:``,
    })
    const hasKey = (key: string) =>
      Object.keys(data.value.options).includes(key)

    const setTestEvent = (type) => {
      let code = ''
      switch (type) {
        case 'dynamicDisabled':
          code='let widget = view.getWidget(\'字段标识\')\nif (widget){\n  widget.options.disabled = !widget.options.disabled\n}'
          break
        case 'dynamicHideLabel':
          code='let widget = view.getWidget(\'字段标识\')\nif (widget){\n  widget.options.showLabel = false\n}'
          break
        case 'dynamicSetValue':
          code=`form['字段标识'] = '新值'`
          break
        case 'dynamicRequired':
          code='let widget = view.getWidget(\'字段标识\')\nif (widget){\n  widget.options.rules.required = true\n }'
          break
      }
      state.eventCode = code
    }
    const editEventCode = (eventType) => {
      state.editEventHeader = eventType+ '事件'
      state.eventType = eventType
      state.eventCode =  data.value.options[eventType]
      state.showEventCode = true
    }
    const handleSaveEventCode = () => {
      data.value.options[state.eventType]=state.eventCode
    }
    return {
      ...toRefs(state),
      treeDataFormRef,
      data,
      hasKey,
      checkComponent,
      editEventCode,
      handleSaveEventCode,
      setTestEvent,
    }
  }
})
</script>
