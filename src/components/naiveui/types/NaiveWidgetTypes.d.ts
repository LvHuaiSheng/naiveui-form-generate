export type RowData=  {
    parentKey: string | null // 父级key
    key: string // key
    label: any
    value: any,
    children?:Array<RowData> | [] //下级数据
}

