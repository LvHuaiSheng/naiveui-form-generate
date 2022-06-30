export interface Rules {
  trigger: string
  enum: string
  len?: number
  max?: number
  message: string
  min?: number
  pattern: string
  required: boolean
  type: string
}

export interface WidgetForm {
  list: any[]
  config: {
    size: string
    hideRequiredMark: boolean
    inline: boolean
    groupType: string
    labelAlign: string
    labelWidth: any
    labelPlacement: string
  }
}
const rules: Rules = {
  trigger: 'blur',
  enum: '',
  len: undefined,
  max: undefined,
  message: '',
  min: undefined,
  pattern: '',
  required: false,
  type: 'any' // 类型为any的时候，input空字符也将校验通过
}
const getRules=(defaultType:string)=>{
  let rules: Rules = {
    trigger: 'blur',
    enum: '',
    len: undefined,
    max: undefined,
    message: '',
    min: undefined,
    pattern: '',
    required: false,
    type: 'any' // 类型为any的时候，input空字符也将校验通过
  }
  rules.type = defaultType
  return rules
}


export const widgetForm: WidgetForm = {
  list: [],
  config: {
    size: 'medium',
    hideRequiredMark: false,
    groupType: 'radioGroup',
    inline: false,
    labelAlign: 'left',
    labelWidth: 'auto',
    labelPlacement: 'top',
  }
}

export const basicComponents = [
  {
    label: '文本输入',
    type: 'input',
    options: {
      width: '100%',
      type:'text',
      defaultValue: '',
      placeholder: '',
      maxlength: null,
      showCount: false,
      prefix: '',
      suffix: '',
      disabled: false,
      allowClear: false,
      readonly: false,
      round:false,
      rules:getRules('string'),
    }
  },
  {
    label: '数字输入',
    type: 'number',
    options: {
      width: '',
      defaultValue: 0,
      min: 0,
      max: 100,
      step: 1,
      readonly: false,
      disabled: false,
      rules:getRules('number'),
    }
  },
  {
    label: '单选框组',
    type: 'radio',
    options: {
      defaultValue: '',
      width: '',
      groupType: 'radioGroup',
      remote: false,
      showLabel: false,
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      options: [
        {
          value: 'Option 1',
          label: 'Option 1'
        },
        {
          value: 'Option 2',
          label: 'Option 2'
        },
        {
          value: 'Option 3',
          label: 'Option 3'
        }
      ],
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      disabled: false,
      rules:getRules('string'),
    }
  },
  {
    label: '多选框组',
    type: 'checkbox',
    options: {
      defaultValue: [],
      width: '',
      inline: true,
      remote: false,
      showLabel: false,
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      options: [
        {
          label: 'Option 1',
          value: 'Option 1'
        },
        {
          label: 'Option 2',
          value: 'Option 2'
        },
        {
          label: 'Option 3',
          value: 'Option 3'
        }
      ],
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      disabled: false,
      rules:getRules('array'),
    }
  },
  {
    label: '时间选择器',
    type: 'time',
    options: {
      defaultValue: null,
      width: '',
      placeholder: '请选择时间',
      format: 'HH:mm:ss',
      valueFormat: 'HH:mm:ss',
      readonly: false,
      allowClear: true,
      disabled: false,
      rules:getRules('string'),
    }
  },
  {
    label: '日期选择器',
    type: 'date',
    options: {
      defaultValue: null,
      width: '',
      placeholder: '请选择时间',
      format: 'yyyy-MM-dd',
      readonly: false,
      type: 'date',
      allowClear: true,
      disabled: false,
      rules:getRules('string'),
    }
  },
  {
    label: '评分',
    type: 'rate',
    options: {
      defaultValue: null,
      max: 5,
      allowClear: true,
      allowHalf: false,
      disabled: false,
      rules:getRules('number'),
    }
  },
  {
    label: '下拉选择框',
    type: 'select',
    options: {
      defaultValue: [],
      width: '200px',
      placeholder: '请选择',
      multiple:false,
      remote: false,
      showLabel: false,
      filterable: false,
      allowClear: false,
      disabled: false,
      props: {
        label: 'label',
        value: 'value'
      },
      options: [
        {
          label: 'Option 1',
          value: 'Option 1'
        },
        {
          label: 'Option 2',
          value: 'Option 2'
        },
        {
          label: 'Option 3',
          value: 'Option 3'
        }
      ],
      remoteOptions: [],
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      rules:getRules('string'),
    }
  },
  {
    label: '开关',
    type: 'switch',
    options: {
      defaultValue: false,
      disabled: false,
      checkedChildren: '',
      unCheckedChildren: '',
      rules:getRules('boolean'),
    }
  },
  {
    label: '滑块',
    type: 'slider',
    options: {
      defaultValue: 0,
      width: '',
      height: '',
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
      range: false,
      vertical: false,
      reverse: false,
      rules:getRules('number'),
    }
  },
  {
    label: '颜色选择器',
    type: 'color',
    options: {
      defaultValue: 0,
      width: '',
      height: '',
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
      range: false,
      vertical: false,
      reverse: false,
      rules:getRules('number'),
    }
  },
]

export const advanceComponents = [
  {
    label: '树形选择',
    type: 'selectTree',
    dev:true,
    options: {
      defaultValue: [],
      width: '200px',
      placeholder: '',
      disabled: false,
      allowClear: false,
      remote: true,
      remoteOptions: [],
      props: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      remoteFunc:
          'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      rules:getRules('string')
    }
  },
  {
    label: '图片',
    type: 'img-upload',
    dev:true,
    options: {
      defaultValue: [],
      name: 'file',
      action: 'http://example.com/upload',
      method: 'post',
      listType: 'text',
      accept: 'image/*',
      maxCount: 3,
      multiple: false,
      disabled: false,
      rules
    }
  },
  {
    label: '富文本编辑器',
    type: 'richtext-editor',
    options: {
      defaultValue: '',
      width: '',
      disabled: false
    }
  },
  {
    label: '穿梭框',
    type: 'transfer',
    dev:true,
    options: {
      defaultValue: '',
      width: '',
      disabled: false
    }
  },
  {
    label: '级联选择器',
    type: 'cascader',
    dev:true,
    options: {
      defaultValue: [],
      width: '200px',
      placeholder: '',
      disabled: false,
      allowClear: false,
      remote: true,
      remoteOptions: [],
      props: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      rules
    }
  },
  {
    label: '树形组件',
    type: 'tree',
    dev:true,
    options: {
      defaultValue: 'This is a tree',
    }
  },
  {
    label: '静态表格',
    type: 'table',
    dev:true,
    options: {
      defaultValue: 'This is a table',
    }
  },
  {
    label: '动态表格',
    type: 'dynamicTable',
    dev:true,
    options: {
      defaultValue: 'This is a dynamicTable',
    }
  },
]
export const otherComponents = [
  {
    label: '文字',
    type: 'text',
    options: {
      defaultValue: 'This is a text',
      width:'',
      height:'',
    }
  },
  {
    label: '警告信息',
    hideLabel:true,
    type: 'alert',
    options: {
      title: 'This is a alert',
      content: 'This is a alert',
      type: 'default',
      width:'',
      height:'',
      showIcon: true,
      closable: false,
    }
  },
]

export const layoutComponents = [
  {
    label: '栅格布局',
    type: 'grid',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      cols:24,
      xGap: 0,
      yGap: 0,
      collapsed: false,
      collapsedRows: 1,
      responsive: 'self',
      itemResponsive: false,
      justify: 'start',
      align: 'top'
    }
  }
]
