
<template>
  <table v-if="element.key"
         :key="element.key"
         :class="(widgetFormSelect?.key === element.key?'active':'') +' table-'+element.options.theme"
         :bordered="element.options.bordered"
         :bottom-bordered="element.options.bottomBordered"
         :single-column="element.options.singleColumn"
         :single-line="element.options.singleLine"
         :striped="element.options.striped"
         :style="{ width: element.options.width,height: element.options.height }"
         @click="handleItemClick(element)"
         class="widget-col widget-view">
    <tbody>
    <tr v-for="(col,colIndex) in element.columns" :key="colIndex">
      <td v-for="(td,tdIndex) in col" :key="'td_'+tdIndex" :colspan="td.col" :rowspan="td.row"
          @contextmenu.prevent="rightClick($event,colIndex,tdIndex)"  :class="{CellHide:td.hide}">
        <Draggable
            class="widget-col-list"
            item-key="key"
            ghostClass="ghost"
            handle=".drag-widget"
            :animation="200"
            :group="{ name: 'people' }"
            :no-transition-on-drag="true"
            :list="td.list"
            @add="handleTdMoveAdd($event, element, colIndex,tdIndex)"
        >
          <template #item="{ element, index }">
            <transition-group name="fade" tag="div">
              <DesignFormItem
                  v-if="element.key"
                  :key="element.key"
                  :element="element"
                  :config="widgetForm.config"
                  :selectWidget="widgetFormSelect"
                  @click.stop="handleItemClick(element)"
                  @copy="handleCopyClick(index, col.list)"
                  @delete="handleDeleteClick(index, col.list)"
              />
            </transition-group>
          </template>
        </Draggable>
        <div
            class="widget-view-action widget-col-action"
            v-if="widgetFormSelect?.key === element.key"
        >
          <SvgIcon
              iconClass="delete" class-name="delete"
              @click.stop="handleDeleteClick(index, widgetForm.list)"
          />
        </div>

        <div
            class="widget-view-drag widget-col-drag"
            v-if="widgetFormSelect?.key === element.key"
        >
          <SvgIcon iconClass="move" className="drag-widget" />
        </div>
      </td>
    </tr>
    </tbody>
  </table>
  <div v-show="showContextMenu" class="right-menu" :style="{ top:  + positionY+'px',left:  + positionX+'px', }">
    <ul style="list-style-type: none">
      <li @click="handlerRightCol" v-if="showRightColMenu">
        向右合并单元格
      </li>
      <li @click="handlerDownRow" v-if="showDownRowMenu">
        向下合并单元格
      </li>
      <li @click="handlerResetTable" v-if="showResetTableMenu">
        拆分单元格
      </li>
      <li @click="handlerAppendCol">
        追加行
      </li>
      <li @click="handlerAppendRow">
        追加列
      </li>
    </ul>
  </div>

</template>

<script lang="ts">
import {computed, defineComponent, PropType, reactive, ref, toRefs, watch} from "vue";
import {WidgetForm} from "../../../config/naiveui";
import Draggable from 'vuedraggable'
import { merge } from 'lodash'
import SvgIcon from '../../../../../components/SvgIcon.vue'
import {naiveui} from "../../../config";
import GenerateFormItem from '../../generate/GenerateFormItem.vue'
import {v4} from "uuid";
import DesignFormItem from "../../design/DesignFormItem.vue";
let td = {col:1,row:1,hide:false,columns:[]};
let tr = [td,td];
export default defineComponent({
  name: 'GTable',
  components:{
    Draggable,
    SvgIcon,
    GenerateFormItem,
    DesignFormItem
  },
  props: {
    widgetForm: {
      type: Object as PropType<WidgetForm>,
      required: true
    },
    element: {
      type: Object,
      required: true
    },
    widgetFormSelect: {
      type: Object
    },
  },
  emits: ['update:widgetForm', 'update:widgetFormSelect'],
  setup(props, context){
    const data = ref<any>(props.element)
    const widgetForm = ref<any>(props.widgetForm)
    watch(
        () => props.element,
        val => (data.value = val)
    )
    watch(
        () => props.widgetForm,
        val => (widgetForm.value = val)
    )
    watch(data, val => context.emit('update:element', val))
    watch(widgetForm, val => context.emit('update:widgetForm', val))

    const state =  reactive({
      positionX:0,
      positionY:0,
      showContextMenu:false,
      currentRowIndex:0,
      currentColIndex:0,
    })

    const showRightColMenu = computed(() => {
      if(state.showContextMenu){
        const col = data.value.columns[state.currentRowIndex][state.currentColIndex].col;
        const td = data.value.columns[state.currentRowIndex][state.currentColIndex+col];
        return (td&&td.row<2&&td.col<2&&!td.hide);
      }else{
        return false;
      }
    })
    const showDownRowMenu = computed(() => {
      if(state.showContextMenu){
        const row = data.value.columns[state.currentRowIndex][state.currentColIndex].row;
        let td = undefined;
        if(typeof data.value.columns[state.currentRowIndex+row] !== 'undefined'){
          td = data.value.columns[state.currentRowIndex+row][state.currentColIndex];
        }
        return (td&&td.row<2&&td.col<2&&!td.hide);
      }else{
        return false;
      }
    })
    const showResetTableMenu = computed(() => {
      if(state.showContextMenu){
        const col = data.value.columns[state.currentRowIndex][state.currentColIndex].col;
        const td = data.value.columns[state.currentRowIndex][state.currentColIndex];
        console.log('td=',td)
        return (td&&!td.hide&&(td.row>1||td.col>1));
      }else{
        return false;
      }
    })

    const rightClick=(e,rowIndex,colIndex)=>{
      state.positionX = e.clientX;
      state.positionY = e.clientY;
      state.currentRowIndex = rowIndex;
      state.currentColIndex = colIndex;
      state.showContextMenu = true;
    }

    const hideRightContextMenu=()=>{
          state.showContextMenu = false;
    }
    // 添加监听取消右键菜单
    document.addEventListener("click", hideRightContextMenu, true);
    document.addEventListener("contextmenu", hideRightContextMenu, true);


    //向右合并单元格
    const handlerRightCol =()=>{
      let col = data.value.columns[state.currentRowIndex][state.currentColIndex].col;
      let row = data.value.columns[state.currentRowIndex][state.currentColIndex].row;
      if(row>1){
        for(let i =0;i<row;i++){
          data.value.columns[state.currentRowIndex+i][state.currentColIndex+col].hide=true;
          data.value.columns[state.currentRowIndex][state.currentColIndex].col=col+1;
        }
      }else{
        data.value.columns[state.currentRowIndex][state.currentColIndex+col].hide=true;
        data.value.columns[state.currentRowIndex][state.currentColIndex].col=col+1;
      }
      // let nextCol = this.columns[state.currentRowIndex][state.currentColIndex+col].col;
      // let nextRow = this.columns[state.currentRowIndex][state.currentColIndex+col].row;
      // if(nextCol<2&nextRow<2){

      // }else{
      //     alert('请先拆分右侧单元格！');
      // }


    },
    //向下合并单元格
    handlerDownRow=()=>{
      let col = data.value.columns[state.currentRowIndex][state.currentColIndex].col;
      let row = data.value.columns[state.currentRowIndex][state.currentColIndex].row;
      if(col>1){
        for(let i =0;i<col;i++){
          data.value.columns[state.currentRowIndex+row][state.currentColIndex+i].hide=true;
          data.value.columns[state.currentRowIndex][state.currentColIndex].row=row+1;
        }
      }else{
        data.value.columns[state.currentRowIndex+row][state.currentColIndex].hide=true;
        data.value.columns[state.currentRowIndex][state.currentColIndex].row=row+1;
      }
      // let nextCol = this.columns[state.currentRowIndex+1][state.currentColIndex].col;
      // let nextRow = this.columns[state.currentRowIndex+1][state.currentColIndex].row;
      // if(nextCol<2&nextRow<2){

      // }else{
      //     alert('请先拆分下方单元格！');
      // }
    }
    const handlerResetTable=()=>{
      //debugger;
      let col = data.value.columns[state.currentRowIndex][state.currentColIndex].col;
      let row = data.value.columns[state.currentRowIndex][state.currentColIndex].row;
      if(col===1&&row===1)return;

      for(let i = 0;i<row;i++){
        for(let j = 0;j<col;j++){
          data.value.columns[state.currentRowIndex+i][state.currentColIndex+j].hide = false;
        }
      }
      data.value.columns[state.currentRowIndex][state.currentColIndex].row=1;
      data.value.columns[state.currentRowIndex][state.currentColIndex].col=1;
    }
    //追加行
    const handlerAppendCol=()=>{
      console.log(tr);
      const _tr = merge(JSON.parse(JSON.stringify(tr)))
      data.value.columns.push(_tr);
    }
    const handlerAppendRow=()=>{
      tr.push(td);
      data.value.columns.forEach(item=>{
        const _td = merge(JSON.parse(JSON.stringify(td)))
        item.push(_td);
      })
    }
    const handleTdMoveAdd = (
        event: any,
        row: any,
        index: string | number | symbol,
        tdIndex: string | number | symbol
    ) => {
      const { newIndex, oldIndex, item } = event
      const list = JSON.parse(JSON.stringify(props.widgetForm.list[index]))

      if (item.className.includes('data-grid')) {
        item.tagName === 'DIV' &&
        list.splice(oldIndex, 0, row.columns[index][tdIndex].list[newIndex])
        row.columns[index][tdIndex].list.splice(newIndex, 1)
        return false
      }

      const key = v4().replaceAll('-', '')

      row.columns[index][tdIndex].list[newIndex] = {
        ...row.columns[index][tdIndex].list[newIndex],
        key,
        model: `${row.columns[index][tdIndex].list[newIndex].type}_${key}`,
        rules: []
      }

      if (
          row.columns[index][tdIndex].list[newIndex].type === 'radio' ||
          row.columns[index][tdIndex].list[newIndex].type === 'checkbox' ||
          row.columns[index][tdIndex].list[newIndex].type === 'select'
      ) {
        row.columns[index][tdIndex].list[newIndex] = {
          ...row.columns[index][tdIndex].list[newIndex],
          options: {
            ...row.columns[index][tdIndex].list[newIndex].options,
            options: row.columns[index][tdIndex].list[
                newIndex
                ].options.options.map((item: any) => ({ ...item }))
          }
        }
      }
      context.emit('update:widgetFormSelect', row.columns[index][tdIndex].list[newIndex])
    }
    const handleItemClick = (row: any) => {
      context.emit('update:widgetFormSelect', row)
    }

    return{
      ...toRefs(state),
      data,
      widgetForm,
      showRightColMenu,
      showDownRowMenu,
      showResetTableMenu,
      rightClick,
      hideRightContextMenu,
      handlerDownRow,
      handlerRightCol,
      handlerResetTable,
      handlerAppendCol,
      handlerAppendRow,
      handleTdMoveAdd,
      handleItemClick
    }
  }

})
</script>

<style scoped>
.right-menu{
  background-color:#ffffff;
  z-index:100;
  width:200px;
  position: fixed;
  border: 1px solid #ccc;
  box-shadow: 3px 3px 8px #999;
  border-radius: 3px;
  padding: 8px 0;
}
.right-menu ul{
  margin:0px;
  padding:0px;
}
.right-menu ul li{
  padding:0 15px;
  height:30px;
  line-height: 30px;
}
.right-menu ul li:hover{
  cursor: pointer;
  background-color: #ccc;
}

.CellHide{
  display: none;
}
</style>
