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
    showLabel: boolean
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
    showLabel: true,
  }
}

export const basicComponents = [
  {
    label: '文本输入',
    type: 'input',
    options: {
      width: '100%',
      type:'text',
      showLabel: true,
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
      showLabel: true,
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
      showLabel: true,
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
      showLabel: true,
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
      showLabel: true,
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
      showLabel: true,
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
      showLabel: true,
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
      showLabel: true,
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
      showLabel: true,
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
      showLabel: true,
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
      showLabel: true,
      defaultValue: '',
      width: '',
      disabled: false,
      showAlpha: true,
      showPreview: false,
      placement: 'bottom-start',
      modes: ['hex'],
      rules:getRules('number'),
    }
  },
]
export const advanceComponents = [
  {
    label: '树形选择',
    type: 'selectTree',
    options: {
      showLabel: true,
      defaultValue: [],
      width: '',
      placeholder: '请选择',
      disabled: false,
      allowClear: false,
      remote: false,
      multiple: false,
      filterable: false,
      checkStrategy: 'all',
      remoteOptions: [],
      props: {
        label: 'label',
        value: 'value'
      },
      options: [
        {
          index: 0,
          parentKey:null,
          key:'1',
          label: 'Option 1',
          value: 'Option 1',
          children:[
            {
              parentKey: '1',
              key:'1-1',
              label: '1-1',
              value: '1-1',
            }
          ],
        },
        {
          index: 1,
          parentKey: null,
          key:'2',
          label: 'Option 2',
          value: 'Option 2',
          children:[
            {
              parentKey: '2',
              key:'2-1',
              label: '2-1',
              value: '2-1',
            }
          ],
        },
        {
          index: 2,
          parentKey: null,
          key:'3',
          label: 'Option 3',
          value: 'Option 3',
          children:[
            {
              parentKey: '3',
              key:'3-1',
              label: '3-1',
              value: '3-1',
            }
          ],
        }
      ],
      remoteFunc:
          'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      rules:getRules('string')
    }
  },
  {
    label: '上传',
    type: 'upload',
    options: {
      showLabel: true,
      defaultValue: [],
      defaultUpload:true,
      directory:false,
      directoryDnd:false,
      showDownloadButton:false,
      showFileList:true,
      showRetryButton:true,
      showRemoveButton:true,
      showCancelButton:true,
      showPreviewButton:true,
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
      showLabel: true,
      defaultValue: '',
      width: '',
      disabled: false,
      rules:getRules('string')
    }
  },
  {
    label: '穿梭框',
    type: 'transfer',
    options: {
      showLabel: true,
      defaultValue: '',
      width: '',
      disabled: false,
      filterable:false,
      virtualScroll:false,
      sourceTitle:'源项',
      targetTitle:'目标项',
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
      rules:getRules('array')
    }
  },
  {
    label: '级联选择器',
    type: 'cascader',
    dev:true,
    options: {
      showLabel: true,
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
      options: [
        {
          id:'1',
          label: 'Option 1',
          value: 'Option 1',
          children:[
            {
              id:'1-1',
              label: '1-1',
              value: '1-1',
            }
          ],
        },
        {
          id:'2',
          label: 'Option 2',
          value: 'Option 2',
          children:[
            {
              id:'2-1',
              label: '2-1',
              value: '2-1',
            }
          ],
        },
        {
          id:'3',
          label: 'Option 3',
          value: 'Option 3',
          children:[
            {
              id:'3-1',
              label: '3-1',
              value: '3-1',
            }
          ],
        }
      ],
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
      showLabel: true,
      defaultValue: 'This is a tree',
    }
  },
  {
    label: '动态表格',
    type: 'dynamicTable',
    dev:true,
    options: {
      showLabel: true,
      defaultValue: 'This is a dynamicTable',
    }
  },
]
export const otherComponents = [
  {
    type: 'text',
    label:'文字',
    hideLabel:true,
    options: {
      showLabel: false,
      text:'文字',
      style:{
        width:'100%',
        height:'',
        textAlign:'center',
        fontWeight:'400',
        fontSize:'20px',
        lineHeight:'1.5'
      },
    }
  },
  {
    type: 'divider',
    label:'分割线',
    hideLabel:true,
    options: {
      showLabel: false,
      text:'分割线',
      dashed:false,
      titlePlacement:'center',
      vertical:false,
    }
  },
  {
    label: '警告信息',
    hideLabel:true,
    type: 'alert',
    options: {
      showLabel: false,
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
  },
  {
    label: '静态表格',
    type: 'table',
    columns: [
      [
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
      ],
      [
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
      ],
      [
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
      ],
      [
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
      ],
      [
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
      ],
      [
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
      ],
      [
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
      ],
      [
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
        {col:1, row:1, hide:false, list: []},
      ],
    ],
    options: {
      theme:'theme1',
      width:'210mm',
      height:'297mm',
      disabled: false,
      bordered:true,
      bottomBordered:false,
      singleColumn:false,
      singleLine:false,
      striped:true,
    }
  },
  // {
  //   label: '静态表格',
  //   type: 'table',
  //   dev:true,
  //   options: {
  //     defaultValue: 'This is a table',
  //     theme:'theme1',
  //     width:'210mm',
  //     height:'297mm',
  //     disabled: false,
  //     bordered:true,
  //     bottomBordered:false,
  //     singleColumn:false,
  //     singleLine:false,
  //     striped:false,
  //     layoutArray:[

  //   }
  // },
]
