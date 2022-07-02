export enum CodeType {
  Form = 'form',
  Model = 'model'
}

export enum PlatformType {
  NaiveUi,
}

export enum ComponentType {
  Input = 'input',
  Number = 'number',
  Radio = 'radio',
  Checkbox = 'checkbox',
  Time = 'time',
  Date = 'date',
  Rate = 'rate',
  Select = 'select',
  Switch = 'switch',
  Slider = 'slider',
  Color = 'color',
  // 高级组件
  Upload = 'upload',
  RichtextEditor = 'richtext-editor',
  Cascader = 'cascader',
  Tree = 'tree',
  Table = 'table',
  DynamicTable = 'dynamicTable',
  SelectTree = 'selectTree',
  Transfer = 'transfer',
}

export function checkComponent(test: any): test is ComponentType {
  return (Object.values(ComponentType).indexOf(test) !== -1);
}
