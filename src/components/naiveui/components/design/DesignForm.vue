<template>
  <div class="widget-form-container">
    <div v-if="!widgetForm.list" class="form-empty">从左侧拖拽来添加字段</div>
    <n-form
      :inline="widgetForm.config.inline"
      :labelAlign="widgetForm.config.labelAlign"
      :label-placement="widgetForm.config.labelPlacement"
      :labelWidth="widgetForm.config.labelWidth"
      :show-require-mark="!widgetForm.config.hideRequiredMark"
      :show-label="widgetForm.config.showLabel"
    >
      <Draggable
        class="widget-form-list"
        item-key="key"
        ghostClass="ghost"
        handle=".drag-widget"
        :animation="200"
        :group="{ name: 'people' }"
        :list="widgetForm.list"
        @add="handleMoveAdd"
      >
        <template #item="{ element, index }">
          <transition-group name="fade" tag="div">
            <template v-if="element.type === 'grid'">
              <n-grid v-if="element.key"
                      :key="element.key"
                      :class="{ active: widgetFormSelect?.key === element.key }"
                      :x-gap="element.options.xGap ?? 0"
                      :y-gap="element.options.yGap ?? 0"
                      :cols="element.options.cols?? 24"
                      :collapsed="element.options.collapsed"
                      :collapsed-rows="element.options.collapsedRows"
                      :responsive="element.options.responsive"
                      :item-responsive="element.options.itemResponsive"
                      @click="handleItemClick(element)"
                      class="widget-col widget-view">
                <n-gi  v-for="(col, colIndex) of element.columns"
                       :key="colIndex"
                       :span="col.span ?? 0">

                  <Draggable
                      class="widget-col-list"
                      item-key="key"
                      ghostClass="ghost"
                      handle=".drag-widget"
                      :animation="200"
                      :group="{ name: 'people' }"
                      :no-transition-on-drag="true"
                      :list="col.list"
                      @add="handleColMoveAdd($event, element, colIndex)"
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
                </n-gi>
              </n-grid>
            </template>
            <template v-else-if="element.type === 'table'">
<!--              <g-table :element="element" :elementIndex="index" v-model:widgetForm="widgetForm" v-model:widgetFormSelect="widgetFormSelect"/>-->
              <n-table v-if="element.key"
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
                      @contextmenu.prevent="rightClick($event,element,colIndex,tdIndex)"  :class="{CellHide:td.hide}">
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
                              @copy="handleCopyClick(index, td.list)"
                              @delete="handleDeleteClick(index, td.list)"
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
              </n-table>
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
                  <li @click="handlerDeleteRow" v-if="showDeleteRowMenu">
                    删除行
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
            <template v-else>
              <DesignFormItem
                :widgetForm="widgetForm"
                v-if="element.key"
                :key="element.key"
                :element="element"
                :config="widgetForm.config"
                :selectWidget="widgetFormSelect"
                @click="handleItemClick(element)"
                @copy="handleCopyClick(index, widgetForm.list)"
                @delete="handleDeleteClick(index, widgetForm.list)"
              />
            </template>
          </transition-group>
        </template>
      </Draggable>
    </n-form>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, nextTick, PropType, reactive, toRefs} from 'vue'
import Draggable from 'vuedraggable'
import { v4 } from 'uuid'
import DesignFormItem from './DesignFormItem.vue'
import SvgIcon from '../../../../components/SvgIcon.vue'
import { WidgetForm } from '../../config/naiveui'
import GTable from '../custom/table/GTable.vue'
import {merge} from "lodash";
const handleListInsert = (key: string, list: any[], obj: any) => {
  const newList: any[] = []
  list.forEach(item => {
    if (item.key === key) {
      newList.push(item)
      newList.push(obj)
    } else {
      if (item.type==='table'){
        item.columns = item.columns.map((tr: any) => (
            tr.map((td: any) => ({
              ...td,
              list: handleListInsert(key, td.list, obj)
            }))
        ))
      }else if (item.columns) {
        item.columns = item.columns.map((col: any) => ({
          ...col,
          list: handleListInsert(key, col.list, obj)
        }))
      }
      newList.push(item)
    }
  })
  console.log('newList=',newList)
  return newList
}

const handleListDelete = (key: string, list: any[]) => {
  const newList: any[] = []
  list.forEach(item => {
    if (item.key !== key) {
      if (item.type==='table'){
        item.columns = item.columns.map((tr: any) => (
            tr.map((td: any) => ({
              ...td,
              list: handleListDelete(key, td.list)
            }))
        ))
      }else if (item.columns) {
        item.columns = item.columns.map((col: any) => ({
          ...col,
          list: handleListDelete(key, col.list)
        }))
      }
      newList.push(item)
    }
  })
  return newList
}
let td = {col:1,row:1,hide:false,list:[]};
let tr = [td,td];
export default defineComponent({
  name: 'WidgetForm',
  components: {
    SvgIcon,
    Draggable,
    DesignFormItem,
    GTable
  },
  props: {
    widgetForm: {
      type: Object as PropType<WidgetForm>,
      required: true
    },
    widgetFormSelect: {
      type: Object
    }
  },
  emits: ['update:widgetForm', 'update:widgetFormSelect'],
  setup(props, context) {
    const handleItemClick = (row: any) => {
      context.emit('update:widgetFormSelect', row)
    }

    const handleCopyClick = (index: number, list: any[]) => {
      const key = v4().replaceAll('-', '')
      const oldList = JSON.parse(JSON.stringify(props.widgetForm.list))

      let copyData = {
        ...list[index],
        key,
        model: `${list[index].type}_${key}`,
        rules: list[index].rules ?? []
      }

      if (
        list[index].type === 'radio' ||
        list[index].type === 'checkbox' ||
        list[index].type === 'select'
      ) {
        copyData = {
          ...copyData,
          options: {
            ...copyData.options,
            options: copyData.options.options.map((item: any) => ({ ...item }))
          }
        }
      }

      context.emit('update:widgetForm', {
        ...props.widgetForm,
        list: handleListInsert(list[index].key, oldList, copyData)
      })

      context.emit('update:widgetFormSelect', copyData)
    }

    const handleDeleteClick = (index: number, list: any[]) => {
      const oldList = JSON.parse(JSON.stringify(props.widgetForm.list))

      if (list.length - 1 === index) {
        if (index === 0) {
          nextTick(() => context.emit('update:widgetFormSelect', null))
        } else {
          context.emit('update:widgetFormSelect', list[index - 1])
        }
      } else {
        context.emit('update:widgetFormSelect', list[index + 1])
      }

      context.emit('update:widgetForm', {
        ...props.widgetForm,
        list: handleListDelete(list[index].key, oldList)
      })
    }

    const handleMoveAdd = (event: any) => {
      const { newIndex } = event

      const key = v4().replaceAll('-', '')
      const list = JSON.parse(JSON.stringify(props.widgetForm.list))

      list[newIndex] = {
        ...list[newIndex],
        key,
        model: `${list[newIndex].type}_${key}`,
        rules: []
      }

      if (
        list[newIndex].type === 'radio' ||
        list[newIndex].type === 'checkbox' ||
        list[newIndex].type === 'select'
      ) {
        list[newIndex] = {
          ...list[newIndex],
          options: {
            ...list[newIndex].options,
            options: list[newIndex].options.options.map((item: any) => ({
              ...item
            }))
          }
        }
      }

      if (list[newIndex].type === 'grid') {
        list[newIndex] = {
          ...list[newIndex],
          columns: list[newIndex].columns.map((item: any) => ({ ...item }))
        }
      }

      context.emit('update:widgetForm', { ...props.widgetForm, list })

      context.emit('update:widgetFormSelect', list[newIndex])
    }

    const handleColMoveAdd = (
      event: any,
      row: any,
      index: string | number | symbol
    ) => {
      const { newIndex, oldIndex, item } = event
      const list = JSON.parse(JSON.stringify(props.widgetForm.list))

      if (item.className.includes('data-grid')) {
        item.tagName === 'DIV' &&
          list.splice(oldIndex, 0, row.columns[index].list[newIndex])
        row.columns[index].list.splice(newIndex, 1)
        return false
      }

      const key = v4().replaceAll('-', '')

      row.columns[index].list[newIndex] = {
        ...row.columns[index].list[newIndex],
        key,
        model: `${row.columns[index].list[newIndex].type}_${key}`,
        rules: []
      }

      if (
        row.columns[index].list[newIndex].type === 'radio' ||
        row.columns[index].list[newIndex].type === 'checkbox' ||
        row.columns[index].list[newIndex].type === 'select'
      ) {
        row.columns[index].list[newIndex] = {
          ...row.columns[index].list[newIndex],
          options: {
            ...row.columns[index].list[newIndex].options,
            options: row.columns[index].list[
              newIndex
            ].options.options.map((item: any) => ({ ...item }))
          }
        }
      }

      context.emit('update:widgetFormSelect', row.columns[index].list[newIndex])
    }
    const state =  reactive({
      positionX:0,
      positionY:0,
      showContextMenu:false,
      currentRowIndex:0,
      currentColIndex:0,
      currentElement:null,
    })
    const showRightColMenu = computed(() => {
      if(state.showContextMenu){
        const col = state.currentElement.columns[state.currentRowIndex][state.currentColIndex].col;
        const td = state.currentElement.columns[state.currentRowIndex][state.currentColIndex+col];
        return (td&&td.row<2&&td.col<2&&!td.hide);
      }else{
        return false;
      }
    })
    const showDownRowMenu = computed(() => {
      if(state.showContextMenu){
        const row = state.currentElement.columns[state.currentRowIndex][state.currentColIndex].row;
        let td = undefined;
        if(typeof state.currentElement.columns[state.currentRowIndex+row] !== 'undefined'){
          td = state.currentElement.columns[state.currentRowIndex+row][state.currentColIndex];
        }
        return (td&&td.row<2&&td.col<2&&!td.hide);
      }else{
        return false;
      }
    })
    const showResetTableMenu = computed(() => {
      if(state.showContextMenu){
        const col = state.currentElement.columns[state.currentRowIndex][state.currentColIndex].col;
        const td = state.currentElement.columns[state.currentRowIndex][state.currentColIndex];
        return (td&&!td.hide&&(td.row>1||td.col>1));
      }else{
        return false;
      }
    })
    const showDeleteRowMenu = computed(() => {
      if(state.showContextMenu){
        return state.currentElement.columns.length>1
      }else{
        return false;
      }
    })
    const hideRightContextMenu=()=>{
      state.showContextMenu = false;
    }
    // 添加监听取消右键菜单
    document.addEventListener("click", hideRightContextMenu, true);
    document.addEventListener("contextmenu", hideRightContextMenu, true);

    const rightClick=(e,row,rowIndex,colIndex)=>{
      state.positionX = e.clientX;
      state.positionY = e.clientY;
      state.currentElement = row;
      state.currentRowIndex = rowIndex;
      state.currentColIndex = colIndex;
      state.showContextMenu = true;
    }
    //向右合并单元格
    const handlerRightCol =()=>{
      let col = state.currentElement.columns[state.currentRowIndex][state.currentColIndex].col;
      let row = state.currentElement.columns[state.currentRowIndex][state.currentColIndex].row;
      if(row>1){
        for(let i =0;i<row;i++){
          state.currentElement.columns[state.currentRowIndex+i][state.currentColIndex+col].hide=true;
          state.currentElement.columns[state.currentRowIndex][state.currentColIndex].col=col+1;
        }
      }else{
        state.currentElement.columns[state.currentRowIndex][state.currentColIndex+col].hide=true;
        state.currentElement.columns[state.currentRowIndex][state.currentColIndex].col=col+1;
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
      let col = state.currentElement.columns[state.currentRowIndex][state.currentColIndex].col;
      let row = state.currentElement.columns[state.currentRowIndex][state.currentColIndex].row;
      if(col>1){
        for(let i =0;i<col;i++){
          state.currentElement.columns[state.currentRowIndex+row][state.currentColIndex+i].hide=true;
          state.currentElement.columns[state.currentRowIndex][state.currentColIndex].row=row+1;
        }
      }else{
        state.currentElement.columns[state.currentRowIndex+row][state.currentColIndex].hide=true;
        state.currentElement.columns[state.currentRowIndex][state.currentColIndex].row=row+1;
      }
      // let nextCol = this.columns[state.currentRowIndex+1][state.currentColIndex].col;
      // let nextRow = this.columns[state.currentRowIndex+1][state.currentColIndex].row;
      // if(nextCol<2&nextRow<2){

      // }else{
      //     alert('请先拆分下方单元格！');
      // }
    }
    const handlerResetTable=()=>{
      let col = state.currentElement.columns[state.currentRowIndex][state.currentColIndex].col;
      let row = state.currentElement.columns[state.currentRowIndex][state.currentColIndex].row;
      if(col===1&&row===1)return;

      for(let i = 0;i<row;i++){
        for(let j = 0;j<col;j++){
          state.currentElement.columns[state.currentRowIndex+i][state.currentColIndex+j].hide = false;
        }
      }
      state.currentElement.columns[state.currentRowIndex][state.currentColIndex].row=1;
      state.currentElement.columns[state.currentRowIndex][state.currentColIndex].col=1;
    }
    // 删除行
    const handlerDeleteRow=()=>{
      state.currentElement.columns.splice(state.currentRowIndex,1)
    }
    //追加行
    const handlerAppendCol=()=>{
      let lastTrLen = state.currentElement.columns[state.currentElement.columns.length-1].length
      let trs = []
      for (let i = 0; i < lastTrLen; i++) {
        trs.push(td)
      }
      const _tr = merge(JSON.parse(JSON.stringify(trs)))
      state.currentElement.columns.splice(state.currentRowIndex+1, 0, _tr);
    }
    const handlerAppendRow=()=>{
      tr.push(td);
      state.currentElement.columns.forEach(item=>{
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
      // console.log('JSON.stringify(props.widgetForm.list[index])=',JSON.stringify(props.widgetForm.list[props.elementIndex]))
      const list = JSON.parse(JSON.stringify(props.widgetForm.list))
      // const list = JSON.parse(JSON.stringify(data))
      //
      if (item.className.includes('data-grid')) {
        item.tagName === 'DIV' &&
        list.splice(oldIndex, 0, row.columns[index][tdIndex].list[newIndex])
        row.columns[index][tdIndex].list.splice(newIndex, 1)
        return false
      }

      const key = v4().replaceAll('-', '')
      console.log('JSS=',JSON.stringify(row.columns))
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
    return {
      ...toRefs(state),
      handleItemClick,
      handleCopyClick,
      handleDeleteClick,
      handleMoveAdd,
      handleColMoveAdd,
      handleTdMoveAdd,
      // 静态表格相关
      hideRightContextMenu,
      showRightColMenu,
      showDownRowMenu,
      showResetTableMenu,
      showDeleteRowMenu,
      rightClick,
      handlerRightCol,
      handlerDownRow,
      handlerDeleteRow,
      handlerResetTable,
      handlerAppendCol,
      handlerAppendRow,
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
