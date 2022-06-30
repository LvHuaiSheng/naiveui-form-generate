import { State } from '../store';

type selectItem = Array<{
  value: string;
  formItemConfig: {
    [key: string]: any;
  };
}>;

export const options: selectItem = [
  {
    value: '0',
    formItemConfig: {
      label: 'input',
      name: undefined,
      rules: [],
      clearable: false,
      maxlength: undefined,
      minlength: undefined,
      type: 'text',
      size: 'medium',
    },
  },
  {
    value: '1',
    formItemConfig: {
      label: 'inputNumber',
      name: undefined,
      rules: [],
      clearable: false,
      max: undefined,
      min: undefined,
      type: 'text',
      size: 'medium',
      step: 1,
      showButton: true,
    },
  },
  {
    value: '2',
    formItemConfig: {
      label: 'radio',
      name: undefined,
      rules: [],
      size: 'medium',
      options: [],
    },
  },
  {
    value: '3',
    formItemConfig: {
      label: 'rate',
      name: undefined,
      rules: [],
      size: 'medium',
      count: 5,
      allowHalf: false,
    },
  },
  {
    value: '4',
    formItemConfig: {
      label: 'select',
      name: undefined,
      rules: [],
      size: 'medium',
      multiple: false,
      placeholder: '请选择',
      clearable: false,
      options: [],
    },
  },
  {
    value: '5',
    formItemConfig: {
      label: 'slider',
      name: undefined,
      rules: [],
      max: 100,
      min: 0,
      step: 1,
      range: false,
      reverse: false,
      vertical: false,
      tooltip: true,
    },
  },
  {
    value: '6',
    formItemConfig: {
      label: 'switch',
      name: undefined,
      rules: [],
      round: true,
      size: 'medium',
    },
  },
  {
    value: '7',
    formItemConfig: {
      label: 'timePicker',
      name: undefined,
      rules: [],
      actions: [],
      clearable: false,
      format: 'HH:mm:ss',
      size: 'medium',
      placeholder: undefined,
      use12Hours: false,
    },
  },
  {
    value: '12',
    formItemConfig: {
      label: 'datePicker',
      name: undefined,
      rules: [],
      actions: [],
      clearable: false,
      format: '',
      size: 'medium',
      placeholder: undefined,
      type: 'date',
      startPlaceholder: undefined,
      endPlaceholder: undefined,
      separator: undefined,
    },
  },
  {
    value: '8',
    formItemConfig: {
      label: 'treeSelect',
      name: undefined,
      rules: [],
      size: 'medium',
      clearable: false,
    },
  },
  {
    value: '9',
    formItemConfig: {
      label: 'upload',
      name: undefined,
      rules: [],
      accept: undefined,
      action: undefined,
      defaultUpload: true,
      data: [],
      headers: [],
      listType: 'text',
      max: undefined,
      method: 'POST',
      multiple: false,
      fileName: 'file',
      withCredentials: false,
      showCancelButton: true,
      showDownloadButton: false,
      showRemoveButton: true,
      showRetryButton: true,
      showFileList: true,
    },
  },
  {
    value: '10',
    formItemConfig: {
      label: 'colorPicker',
      name: undefined,
      rules: [],
      size: 'medium',
      modes: [],
      showAlpha: true,
      actions: [],
    },
  },
  {
    value: '11',
    formItemConfig: {
      label: 'checkbox',
      name: undefined,
      rules: [],
      max: undefined,
      min: undefined,
      options: [],
    },
  },
];

export const LayoutOptions: selectItem = [
  {
    value: '13',
    formItemConfig: {
      label: 'divider',
      name: 'divider',
      dashed: false,
      vertical: false,
      titlePlacement: 'center',
    },
  },
];

export const initialFormState: State['formConfig'] = {
  labelPlacement: 'top',
  labelAlign: 'left',
  labelWidth: 'auto',
  showRequireMark: false,
  size: 'medium',
  inline: false,
  showFeedback: true,
  showLabel: true,
  requireMarkPlacement: 'right',
  model: 'formValue',
};

export const UI_NAME = 'naive-ui';
export const PREFIX = 'n';

export const getItemConfig = (
  value: string,
): {
  [key: string]: any;
} => {
  const mergeOptions = [...options, ...LayoutOptions];
  const config = mergeOptions.find(item => item.value === value);
  if (config !== undefined) {
    return config.formItemConfig;
  }
  return {};
};

export const ruleOptions: Array<{
  value: string;
  label: string;
}> = [
  {
    label: 'Required verification',
    value: '0',
  },
  {
    label: 'Mobile phone number verification',
    value: '1',
  },
  {
    label: 'ID card verification',
    value: '2',
  },
];
