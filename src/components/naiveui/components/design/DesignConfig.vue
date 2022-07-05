<template>

  <n-form layout="vertical" v-if="data" :key="data.key">
    <n-form-item label="字段标识" v-if="data.type !== 'grid'">
      <n-input v-model:value="data.model" />
    </n-form-item>

    <n-form-item label="标题" v-if="hasKey('label')&&data.type !== 'grid'&&!data.hideLabel">
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
import SvgIcon from '../../../../components/SvgIcon.vue'
import { NSpace,NButton,NInput, useMessage,FormInst } from 'naive-ui'
import { v4 } from 'uuid'
import {ComponentType,checkComponent} from '../../enums'
import type {RowData} from '../../types/NaiveWidgetTypes'
import type { DataTableColumns } from 'naive-ui'
export default defineComponent({
  name: 'DesignConfig',
  components: {
    Draggable,
    SvgIcon,
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
    })
    const hasKey = (key: string) =>
      Object.keys(data.value.options).includes(key)

    return {
      ...toRefs(state),
      treeDataFormRef,
      data,
      hasKey,
      checkComponent,
    }
  }
})
</script>
