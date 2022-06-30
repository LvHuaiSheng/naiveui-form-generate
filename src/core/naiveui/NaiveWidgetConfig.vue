<template>
  <n-form layout="vertical" v-if="data" :key="data.key">
    <n-form-item label="字段标识" v-if="data.type !== 'grid'">
      <n-input v-model:value="data.model" />
    </n-form-item>

    <n-form-item label="标题" v-if="data.type !== 'grid'&&!data.hideLabel">
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
    <n-form-item
      label="默认内容"
      v-if="
        hasKey('defaultValue') &&
          (data.type === 'input' ||
            data.type === 'password' ||
            data.type === 'textarea' ||
            data.type === 'text' ||
            data.type === 'rate' ||
            data.type === 'switch' ||
            data.type === 'slider')
      "
    >
      <n-input
        v-if="
          data.type === 'input'
        "
        v-model:value="data.options.defaultValue"
      />
      <n-input type="textarea"
        v-if="data.type === 'text'"
        v-model:value="data.options.defaultValue"
      />
      <n-rate
        v-if="data.type === 'rate'"
        v-model:value="data.options.defaultValue"
        :count="data.options.max"
        :allowHalf="data.options.allowHalf"
        :allowClear="data.options.allowClear"
      />
      <n-switch
        v-if="data.type === 'switch'"
        v-model:value="data.options.defaultValue"
      />
      <template v-if="data.type === 'slider'">
        <n-input-number
          v-if="!data.options.range"
          v-model:value.number="data.options.defaultValue"
        />
        <template v-if="data.options.range">
          <n-input-number
            v-model:value.number="data.options.defaultValue[0]"
            :max="data.options.max"
          />
          <n-input-number
            v-model:value.number="data.options.defaultValue[1]"
            :max="data.options.max"
          />
        </template>
      </template>
    </n-form-item>

    <n-form-item label="最大长度" v-if="hasKey('maxlength')">
      <n-input v-model:value.number="data.options.maxlength" />
    </n-form-item>
    <n-form-item label="最小长度" v-if="hasKey('minlength')">
      <n-input v-model:value.number="data.options.rules.min" />
    </n-form-item>
    <n-form-item
        label="显示属性"
        v-if="
          hasKey('showCount') ||
            hasKey('round')
        "
    >
      <n-checkbox
          v-if="hasKey('showCount')"
          v-model:checked="data.options.showCount"
      >显示字数</n-checkbox
      >
      <n-checkbox
          v-if="hasKey('round')"
          v-model:checked="data.options.round"
      >圆角</n-checkbox
      >
    </n-form-item>
    <n-form-item label="输入框类型" v-if="data.type === 'input'">
      <n-radio-group v-model:value="data.options.type">
        <n-radio-button value="text" label="单行文本"/>
        <n-radio-button value="textarea" label="多行文本"/>
        <n-radio-button value="password" label="密码框"/>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="最大值" v-if="hasKey('max')">
      <n-input-number v-model:value.number="data.options.max" />
    </n-form-item>

    <n-form-item label="最小值" v-if="hasKey('min')">
      <n-input-number v-model:value.number="data.options.min" />
    </n-form-item>

    <n-form-item label="步长" v-if="hasKey('step')">
      <n-input-number v-model:value.number="data.options.step" :min="0" />
    </n-form-item>

    <n-form-item label="前缀" v-if="hasKey('prefix')">
      <n-input v-model:value="data.options.prefix" />
    </n-form-item>

    <n-form-item label="后缀" v-if="hasKey('suffix')">
      <n-input v-model:value="data.options.suffix" />
    </n-form-item>

    <n-form-item label="选中时的内容" v-if="hasKey('checkedChildren')">
      <n-input v-model:value="data.options.checkedChildren" />
    </n-form-item>

    <n-form-item label="非选中时的内容" v-if="hasKey('unCheckedChildren')">
      <n-input v-model:value="data.options.unCheckedChildren" />
    </n-form-item>

    <n-form-item label="双滑块模式" v-if="hasKey('range')">
      <n-switch
        v-model:value="data.options.range"
        @change="handleSliderModeChange"
      />
    </n-form-item>
    <n-form-item label="垂直" v-if="hasKey('vertical')">
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-switch
              v-model:value="data.options.vertical"
          />
        </template>
        如需启用垂直，则必须设置组件的宽度、高度
      </n-tooltip>
    </n-form-item>
    <n-form-item label="反向坐标轴" v-if="hasKey('reverse')">
      <n-switch v-model:value="data.options.reverse" />
    </n-form-item>

    <n-form-item label="是否显示切换按钮" v-if="hasKey('visibilityToggle')">
      <n-switch
        v-model:value="data.options.visibilityToggle"
      >
        <template #checked>
          显示
        </template>
        <template #unchecked>
          隐藏
        </template>
      </n-switch>
    </n-form-item>

    <n-form-item label="是否自适应内容高度" v-if="hasKey('autoSize')">
      <n-switch
        v-model:value="data.options.autoSize"
      >
        <template #checked>
          是
        </template>
        <template #unchecked>
          否
        </template>
      </n-switch>
    </n-form-item>

    <n-form-item label="行数" v-if="hasKey('rows') && !data.options.autosize">
      <n-input-number v-model:value="data.options.rows" :min="0" />
    </n-form-item>

    <n-form-item label="是否允许半选" v-if="hasKey('allowHalf')">
      <n-switch
        checked-children="是"
        un-checked-children="否"
        v-model:value="data.options.allowHalf"
      >
        <template #checked>
          是
        </template>
        <template #unchecked>
          否
        </template>
      </n-switch>
    </n-form-item>

    <n-form-item label="布局方式" v-if="data.type === 'radio'">
      <n-radio-group button-style="solid" v-model:value="data.options.groupType">
        <n-radio-button value="radioGroup">单选组</n-radio-button>
        <n-radio-button value="buttonGroup">按钮组</n-radio-button>
      </n-radio-group>
    </n-form-item>

    <n-form-item label="模式" v-if="data.type === 'select'">
      <n-radio-group
        button-style="solid"
        v-model:value="data.options.multiple"
        @change="handleSelectModeChange"
      >
        <n-radio-button :value="false">单选</n-radio-button>
        <n-radio-button :value="true">多选</n-radio-button>
      </n-radio-group>
    </n-form-item>

    <n-form-item label="是否可搜索" v-if="hasKey('filterable')">
      <n-switch
        checked-children="是"
        un-checked-children="否"
        v-model:value="data.options.filterable"
      >
        <template #checked>
          是
        </template>
        <template #unchecked>
          否
        </template>
      </n-switch>
    </n-form-item>

    <n-form-item label="选项" v-if="hasKey('options')">
      <div>
        <n-radio-group button-style="solid" v-model:value="data.options.remote">
          <n-radio-button :value="false">静态数据</n-radio-button>
          <n-radio-button :value="true">远端数据</n-radio-button>
        </n-radio-group>
        <n-space
            v-if="data.options.remote"
            direction="vertical"
            style="margin-top: 10px;"
        >

          <n-input-group>
            <n-input-group-label>远端方法</n-input-group-label>
            <n-input  v-model:value="data.options.remoteFunc"/>
          </n-input-group>

          <n-input-group>
            <n-input-group-label>标签</n-input-group-label>
            <n-input  v-model:value="data.options.props.label"/>
          </n-input-group>

          <n-input-group>
            <n-input-group-label>值</n-input-group-label>
            <n-input  v-model:value="data.options.props.value"/>
          </n-input-group>
        </n-space>
        <template v-else>
          <template
              v-if="
            data.type === 'radio' ||
              (data.type === 'select' && data.options.mode === null)
          "
          >
            <n-radio-group v-model:value="data.options.defaultValue">
              <Draggable
                  tag="ul"
                  item-key="index"
                  ghostClass="ghost"
                  handle=".drag-item"
                  :group="{ name: 'options' }"
                  :list="data.options.options"
              >
                <template #item="{ element, index }">
                  <div>
                    <n-radio :value="element.value" style="margin-right: 0px;">
                      <n-input
                          size="small"
                          :style="{
                        width: data.options.showLabel ? '90px' : '180px'
                      }"
                          v-model:value="element.value"
                      />
                      <n-input
                          size="small"
                          :style="{
                        width: data.options.showLabel ? '90px' : '0',
                        padding: data.options.showLabel ? '0 7px' : '0',
                        border: data.options.showLabel
                          ? '1px solid #d9d9d9'
                          : 'none'
                      }"
                          v-model:value="element.label"
                      />
                    </n-radio>
                    <SvgIcon
                        style="margin: 0; cursor: move;"
                        iconClass="item"
                        className="drag-item"
                    />
                    <n-button
                        type="primary"
                        shape="circle"
                        size="small"
                        style="margin-left: 10px;"
                        @click="handleOptionsRemove(index)"
                    >
                      <template #icon>
                        <SvgIcon iconClass="delete" />
                      </template>
                    </n-button>
                  </div>
                </template>
              </Draggable>
            </n-radio-group>
          </template>

          <template
              v-if="
            data.type === 'checkbox' ||
              (data.type === 'select' && data.options.mode !== null)
          "
          >
            <n-checkbox-group v-model:value="data.options.defaultValue">
              <Draggable
                  tag="ul"
                  item-key="index"
                  ghostClass="ghost"
                  handle=".drag-item"
                  :group="{ name: 'options' }"
                  :list="data.options.options"
              >
                <template #item="{ element, index }">
                  <li>
                    <n-checkbox :value="element.value" style="margin-right: 0;">
                      <n-input
                          size="small"
                          :style="{
                        width: data.options.showLabel ? '90px' : '180px'
                      }"
                          v-model:value="element.value"
                      />
                      <n-input
                          size="small"
                          :style="{
                        width: data.options.showLabel ? '90px' : '0',
                        padding: data.options.showLabel ? '0 7px' : '0',
                        border: data.options.showLabel
                          ? '1px solid #d9d9d9'
                          : 'none'
                      }"
                          v-model:value="element.label"
                      />
                    </n-checkbox>
                    <SvgIcon
                        style="margin: 0; cursor: move;"
                        iconClass="item"
                        className="drag-item"
                    />
                    <n-button
                        type="primary"
                        text
                        round
                        size="small"
                        style="margin-left: 10px;"
                        @click="handleOptionsRemove(index)"
                    >
                      <template #icon>
                        <SvgIcon style="margin-top: 3px" iconClass="delete" />
                      </template>
                    </n-button>
                  </li>
                </template>
              </Draggable>
            </n-checkbox-group>
          </template>
          <div style="margin-top: 5px;">
            <n-button text type="primary" size="small" @click="handleInsertOption"
            >添加选项</n-button>
          </div>
        </template>
      </div>
    </n-form-item>

    <template v-if="data.type === 'time'">
      <n-form-item label="默认值">
        <n-time-picker
          style="width: 100%;"
          v-model:value="data.options.defaultValue"
          :format="data.options.format"
          :placeholder="data.options.placeholder"
        />
      </n-form-item>
    </template>

    <template v-if="data.type === 'date'">
      <n-form-item label="默认值">
        <n-date-picker
          style="width: 100%;"
          v-model:value="data.options.defaultValue"
          :format="data.options.format"
          :placeholder="data.options.placeholder"
        />
      </n-form-item>
      <n-form-item label="组件类型">
        <n-radio-group v-model:value="data.options.type" @change="changeDateType">
          <n-radio-button value="date" label="日期"/>
          <n-radio-button value="month" label="月份"/>
          <n-radio-button value="quarter" label="季度"/>
          <n-radio-button value="year" label="年份"/>
        </n-radio-group>
      </n-form-item>
    </template>

    <template v-if="data.type === 'time' || data.type === 'date'">
      <n-form-item label="格式">
        <n-input v-model:value="data.options.format" />
      </n-form-item>
      <n-form-item label="绑定值格式">
        <n-input v-model:value="data.options.valueFormat" />
      </n-form-item>
    </template>

    <template v-if="data.type === 'img-upload'">
      <n-form-item label="是否支持多选">
        <n-switch
          checked-children="是"
          un-checked-children="否"
          v-model:value="data.options.multiple"
        >
          <template #checked>
            是
          </template>
          <template #unchecked>
            否
          </template>
        </n-switch>
      </n-form-item>

      <n-form-item label="模式">
        <n-radio-group
          button-style="solid"
          v-model:value="data.options.listType"
        >
          <n-radio-button value="text">text</n-radio-button>
          <n-radio-button value="picture">picture</n-radio-button>
          <n-radio-button value="picture-card">picture-card</n-radio-button>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="文件参数名">
        <n-input v-model:value="data.options.name" />
      </n-form-item>

      <n-form-item label="上传地址">
        <n-input v-model:value="data.options.action" />
      </n-form-item>

      <n-form-item label="接受上传的文件类型(多个使用 , 隔开)">
        <n-input v-model:value="data.options.accept" />
      </n-form-item>

      <n-form-item label="最大上传数量">
        <n-input-number v-model:value.number="data.options.maxCount" :min="1" />
      </n-form-item>

      <n-form-item label="上传请求方法">
        <n-radio-group button-style="solid" v-model:value="data.options.method">
          <n-radio-button value="post">POST</n-radio-button>
          <n-radio-button value="put">PUT</n-radio-button>
          <n-radio-button value="get">GET</n-radio-button>
          <n-radio-button value="delete">DELETE</n-radio-button>
        </n-radio-group>
      </n-form-item>
    </template>

    <n-form-item label="远端数据" v-if="data.type === 'cascader'">
      <n-space direction="vertical">
        <n-input
          v-model:value="data.options.remoteFunc"
          size="small"
          addon-before="远端方法"
        />
        <n-input
          v-model:value="data.options.props.label"
          size="small"
          addon-before="标签"
        />
        <n-input
          v-model:value="data.options.props.value"
          size="small"
          addon-before="值"
        />
        <n-input
          v-model:value="data.options.props.children"
          size="small"
          addon-before="子选项"
        />
      </n-space>
    </n-form-item>

    <template v-if="data.type === 'grid'">
      <n-form-item label="栅格列数">
        <n-input-number v-model:value="data.options.cols" :min="1" />
      </n-form-item>
      <n-form-item label="横向间隔槽">
        <n-input-number v-model:value="data.options.xGap" :min="0" />
      </n-form-item>
      <n-form-item label="纵向间隔槽">
        <n-input-number v-model:value="data.options.yGap" :min="0" />
      </n-form-item>
      <n-form-item label="列配置项" class="fc-form-item-block">
        <Draggable
          tag="ul"
          item-key="index"
          ghostClass="ghost"
          handle=".drag-item"
          :group="{ name: 'options' }"
          :list="data.columns"
        >
          <template #item="{ element, index }">
            <li style="margin-bottom: 5px;display: flex;">
              <div style="padding-top: 4px">
                <SvgIcon iconClass="item" className="drag-item" />
              </div>
              <n-input-number
                placeholder="栅格值"
                size="small"
                v-model:value="element.span"
                :min="0"
                :max="24"
              />
              <n-button text
                type="primary"
                round
                size="small"
                style="margin-left: 5px;"
                @click="handleOptionsRemove(index)"
              >
                <template #icon>
                  <SvgIcon iconClass="delete" />
                </template>
              </n-button>
            </li>
          </template>
        </Draggable>

        <div>
          <n-button text type="primary" size="small" @click="handleInsertColumn">
            添加列
          </n-button>
        </div>
      </n-form-item>
<!--      <n-form-item label="子元素是否可具有响应式宽度">
        <n-switch
            v-model:value="data.options.itemResponsive"
        >
          <template #checked>
            是
          </template>
          <template #unchecked>
            否
          </template>
        </n-switch>
      </n-form-item>-->
      <n-space align="center">
        <n-form-item label="是否默认折叠">
          <n-switch
              v-model:value="data.options.collapsed"
          >
            <template #checked>
              是
            </template>
            <template #unchecked>
              否
            </template>
          </n-switch>
        </n-form-item>
        <n-form-item label="默认展示的行数">
          <n-input-number v-model:value="data.options.collapsedRows" :min="1" :disabled="!data.options.collapsed"/>
        </n-form-item>
      </n-space>
    </template>

    <template v-if="data.type !== 'grid'">
      <n-form-item
        label="操作属性"
        v-if="
          hasKey('rules') ||
            hasKey('readonly') ||
            hasKey('disabled') ||
            hasKey('allowClear')
        "
      >
        <n-checkbox
          v-if="hasKey('rules')"
          v-model:checked="data.options.rules.required"
          >必填</n-checkbox
        >
        <n-checkbox
          v-if="hasKey('readonly')"
          v-model:checked="data.options.readonly"
          >只读</n-checkbox
        >
        <n-checkbox
          v-if="hasKey('disabled')"
          v-model:checked="data.options.disabled"
          >禁用</n-checkbox
        >
        <n-checkbox
          v-if="hasKey('allowClear')"
          v-model:checked="data.options.allowClear"
          >清除</n-checkbox
        >
      </n-form-item>
      <template v-if="data.type==='alert'">
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
    </template>
  </n-form>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRefs, watch} from 'vue'
import Draggable from 'vuedraggable'
import SvgIcon from '../../components/SvgIcon.vue'

export default defineComponent({
  name: 'NaiveWidgetConfig',
  components: {
    Draggable,
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
      ]
    })

    watch(
      () => props.select,
      val => (data.value = val)
    )

    watch(data, val => context.emit('update:select', val))

    const hasKey = (key: string) =>
      Object.keys(data.value.options).includes(key)

    const handleInsertColumn = () => {
      data.value.columns.push({
        span: 12,
        list: []
      })
    }

    const handleInsertOption = () => {
      const index = data.value.options.options.length + 1
      data.value.options.options.push({
        label: `Option ${index}`,
        value: `Option ${index}`
      })
    }

    const handleOptionsRemove = (index: number) => {
      if (data.value.type === 'grid') {
        data.value.columns.splice(index, 1)
      } else {
        data.value.options.options.splice(index, 1)
      }
    }

    const handleSelectModeChange = (event: any) => {
      const { value } = event.target
      if (value === null) {
        data.value.options.defaultValue.length
          ? (data.value.options.defaultValue =
              data.value.options.defaultValue[0])
          : (data.value.options.defaultValue = null)
      } else {
        if (data.value.options.defaultValue) {
          if (!(data.value.options.defaultValue instanceof Array)) {
            data.value.options.defaultValue = [data.value.options.defaultValue]
          }
        } else {
          data.value.options.defaultValue = []
        }
      }
    }

    const handleSliderModeChange = (checked: boolean) => {
      checked
        ? (data.value.options.defaultValue = [0, 0])
        : (data.value.options.defaultValue = 0)
    }
    const changeDateType = (e: Event)=> {
      let value = (e.target as HTMLInputElement).value
      switch (value) {
        case 'date':
          data.value.options.format='yyyy-MM-dd';
          break
        case 'month':
          data.value.options.format='yyyy-MM';
          break
        case 'quarter':
          data.value.options.format='yyyy-第Q季度';
          break
        case 'year':
          data.value.options.format='yyyy';
          break
      }
    }

    return {
      ...toRefs(state),
      data,
      hasKey,
      handleInsertColumn,
      handleInsertOption,
      handleOptionsRemove,
      handleSelectModeChange,
      handleSliderModeChange,
      changeDateType
    }
  }
})
</script>
