<template>
  <n-form-item label="模式">
    <n-radio-group
        button-style="solid"
        v-model:value="data.options.multiple"
        @change="handleSelectModeChange"
    >
      <n-radio-button :value="false">单选</n-radio-button>
      <n-radio-button :value="true">多选</n-radio-button>
    </n-radio-group>
  </n-form-item>
  <n-form-item label="选中策略">
    <n-radio-group v-model:value="data.options.checkStrategy">
      <n-radio-button value="all">
        All
      </n-radio-button>
      <n-radio-button value="parent">
        Parent
      </n-radio-button>
      <n-radio-button value="child">
        Child
      </n-radio-button>
    </n-radio-group>
  </n-form-item>
  <n-form-item label="选项" >
    <div style="width: 100%">
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
        <div style="margin-top: 10px">
          <n-button @click="addTreeData()" type="primary">添加</n-button>
          <n-data-table style="margin-top: 10px;" id="selectTree-target"
                        :columns="treeDataColumns"
                        :data="data.options.options"
                        :row-key="rowKey"
                        :min-height="100"
                        :max-height="500"
                        default-expand-all
          />
          <n-drawer
              v-model:show="showTreeDataDriwer"
              width="100%"
              height="200px"
              placement="right"
              :trap-focus="false"
              :block-scroll="false"
              to="#selectTree-target"
          >
            <n-drawer-content>
              <n-form
                  ref="treeDataFormRef"
                  :label-width="80"
                  :model="treeData"
                  :rules="treeRules"
              >
                <n-form-item label="Label" path="label">
                  <n-input v-model:value="treeData.label" placeholder="请输入" />
                </n-form-item>
                <n-form-item label="Value" path="value">
                  <n-input v-model:value="treeData.value" placeholder="请输入" />
                </n-form-item>
              </n-form>
              <template #footer>
                <n-space>
                  <n-button @click="showTreeDataDriwer = false">取消</n-button>
                  <n-button type="primary" @click="submitTreeData">确定</n-button>
                </n-space>
              </template>
            </n-drawer-content>
          </n-drawer>
        </div>
      </template>
    </div>
  </n-form-item>
  <n-form-item label="操作属性">
    <n-checkbox
        v-model:checked="data.options.rules.required"
    >必填
    </n-checkbox
    >
    <n-checkbox
        v-model:checked="data.options.disabled"
    >禁用
    </n-checkbox>
    <n-checkbox
        v-model:checked="data.options.allowClear"
    >清除
    </n-checkbox>
  </n-form-item>
</template>
<script lang="ts">
import {defineComponent, h, reactive, ref, watch,toRefs} from 'vue'
import Draggable from 'vuedraggable'
import SvgIcon from "../../../components/SvgIcon.vue";
import {RowData} from "../types/NaiveWidgetTypes";
import {DataTableColumns, FormInst, NButton, NSpace} from "naive-ui";
import {v4} from "uuid";
export default defineComponent({
  components:{
    Draggable,
    SvgIcon,
  },
  name: 'InputWidget',
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
    watch(data, val => context.emit('update:select', val))

    const treeDataColumns = ({
                               add,
                               edit,
                               remove,
                             }: {
      add: (rowData: RowData,rowIndex: number) => void
      edit: (rowData: RowData,rowIndex: number) => void
      remove: (rowData: RowData,rowIndex: number) => void
    }): DataTableColumns<RowData> => {
      return [
        {
          title: 'Label',
          key: 'label',
        },
        {
          title: 'Value',
          key: 'value',
        },
        {
          title: '操作',
          key: 'action',
          render(row,index) {
            return h(NSpace, {}, [
              h(NButton, {strong: true, tertiary: true, size: 'small',text:true,type:'primary', onClick: () => edit(row,index)}, {default: () => '编辑'}),
              h(NButton, {strong: true, tertiary: true, size: 'small',text:true,type:'primary', onClick: () => add(row,index)}, {default: () => '添加下级'}),
              h(NButton, {strong: true, tertiary: true, size: 'small',text:true,type:'error', onClick: () => remove(row,index)}, {default: () => '删除'})
            ])
          }
        }
      ]
    }
    const treeData: RowData ={
      parentKey:null,
      key: '',
      label:'',
      value:'',
    }
    const state = reactive({
      showTreeDataType:'add',
      showTreeDataDriwer:false,
      treeData,
      parentTreeData:null,
      treeRules: {
        label: {
          required: true,
          message: '请输入',
          trigger: ['input', 'blur']
        },
        value: {
          required: true,
          message: '请输入',
          trigger: ['input', 'blur']
        }
      },
      treeDataColumns: treeDataColumns({
        add (rowData) {
          state.parentTreeData = rowData
          state.treeData = {
            parentKey:rowData.key,
            key: v4().replaceAll('-', ''),
            label:'',
            value:'',
          }
          state.showTreeDataDriwer=true
          state.showTreeDataType='add'
        },
        edit (rowData,rowIndex) {
          state.parentTreeData = getParentTreeInfo(rowData.parentKey)
          state.treeData = Object.assign({},rowData)
          state.showTreeDataDriwer=true
          state.showTreeDataType='edit'
        },
        remove (rowData,rowIndex) {
          if (rowData.parentKey){
            let parentTreeData = getParentTreeInfo(rowData.parentKey)
            parentTreeData?.children?.forEach((v,i)=>{
              if (v.key===rowData.key){
                parentTreeData.children.splice(i,1)
              }
            })
          }else {
            let index = getTreeFirstIndex(rowData.key)
            if (index!=undefined) data.value.options.options.splice(index,1)
          }
        }
      }),
      rowKey: (row: RowData) => row.key
    })

    // 获取父级tree（naiveui不提供父级信息，此步也没有存库，无奈只能循环取）
    const getParentTreeInfo = (parentKey:string) => {
      let parent = null;
      eachOptions(data.value.options.options)
      function eachOptions(children) {
        children.forEach(v=>{
          if (v.key===parentKey){
            parent=v
            return
          }
          if (v.children){
            eachOptions(v.children)
          }
        })
      }
      return parent
    }
    // 获取根据key获取tree的一级索引 （目前用于一级tree的删除）
    const getTreeFirstIndex = (key:string) => {
      for (let i = 0; i <data.value.options.options.length; i++) {
        if (data.value.options.options[i].key===key){
          return i;
        }
      }
    }

    const handleSelectModeChange = (event: any) => {
      const { value } = event.target
      if (value!=='true') {
        data.value.options.rules.type='string'
        data.value.options.defaultValue.length
            ? (data.value.options.defaultValue =
                data.value.options.defaultValue[0])
            : (data.value.options.defaultValue = null)
      } else {
        data.value.options.rules.type='array'
        if (data.value.options.defaultValue) {
          if (!(data.value.options.defaultValue instanceof Array)) {
            data.value.options.defaultValue = [data.value.options.defaultValue]
          }
        } else {
          data.value.options.defaultValue = []
        }
      }
    }

    const addTreeData = ()=>{
      state.parentTreeData = null
      state.treeData = {
        parentKey:null,
        key: v4().replaceAll('-', ''),
        label:'',
        value:'',
      }
      state.showTreeDataDriwer=true
    }
    const submitTreeData = (e: MouseEvent)=> {
      e.preventDefault()
      treeDataFormRef.value?.validate((errors) => {
        if (!errors) {
          if (state.parentTreeData){
            if (state.showTreeDataType==='add'){
              if (!state.parentTreeData.children) state.parentTreeData.children = []
              state.parentTreeData.children.push(state.treeData)
            }else {
              state.parentTreeData.children.forEach((v,i)=>{
                if (v.key===state.treeData.key){
                  state.parentTreeData.children.splice(i,1,state.treeData)
                }
              })
            }
          }else{
            data.value.options.options.push(state.treeData)
          }
          state.showTreeDataDriwer=false
        } else {
          console.log(errors)
        }
      })
    }
    return {
      ...toRefs(state),
      data,
      treeDataFormRef,
      handleSelectModeChange,
      addTreeData,
      submitTreeData,
    }
  }
})

</script>


<style scoped lang="less">
/deep/ .n-dynamic-input .n-dynamic-input-item .n-dynamic-input-item__action{
  margin: 0 0 0 10px;
}
</style>
