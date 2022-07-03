
<template>
  <td v-for="(td,tdIndex) in trItem"
      :key="tdIndex"
      :colspan="td.col"
      :rowspan="td.row"
      @contextmenu.prevent="rightClick($event,trIndex,tdIndex)"
      :class={CellHide:td.hide}
  >
    <slot/>
  </td>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, reactive, ref, toRefs, watch} from "vue";
import {WidgetForm} from "../../../config/naiveui";
import { merge } from 'lodash'
import {naiveui} from "../../../config";
let td = {col:1,row:1,hide:false,columns:[]};
let tr = [td,td];
export default defineComponent({
  name: 'GTable',
  props: {
    config: {
      type: Object as PropType<WidgetForm['config']>,
      required: true
    },
    element: {
      type: Object,
      required: true
    },
  },
  setup(props, context){
    const data = ref<any>(props.element)
    watch(
        () => props.element,
        val => (data.value = val)
    )
    watch(data, val => context.emit('update:element', val))

    const state =  reactive({
      positionX:0,
      positionY:0,
      showContextMenu:false,
      currentRowIndex:0,
      currentColIndex:0,
    })

    const showRightColMenu = computed(() => {
      if(state.showContextMenu){
        const col = data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex].col;
        const td = data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex+col];
        return (td&&td.row<2&&td.col<2&&!td.hide);
      }else{
        return false;
      }
    })
    const showDownRowMenu = computed(() => {
      if(state.showContextMenu){
        const row = data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex].row;
        let td = undefined;
        if(typeof data.value.options.layoutArray[state.currentRowIndex+row] !== 'undefined'){
          td = data.value.options.layoutArray[state.currentRowIndex+row][state.currentColIndex];
        }
        return (td&&td.row<2&&td.col<2&&!td.hide);
      }else{
        return false;
      }
    })
    const showResetTableMenu = computed(() => {
      if(state.showContextMenu){
        const col = data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex].col;
        const td = data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex+col];
        return (td&&td.row<2&&td.col<2&&!td.hide);
      }else{
        return false;
      }
    })

    const rightClick=(e,rowIndex,colIndex)=>{
      state.positionX = e.clientX;
      state.positionY = e.clientY;
      state.showContextMenu = true;
      state.currentRowIndex = rowIndex;
      state.currentColIndex = colIndex;
    }

    const hideRightContextMenu=()=>{
          state.showContextMenu = false;
    }


    //向右合并单元格
    const handlerRightCol =()=>{
      let col = data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex].col;
      let row = data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex].row;
      if(row>1){
        for(let i =0;i<row;i++){
          data.value.options.layoutArray[state.currentRowIndex+i][state.currentColIndex+col].hide=true;
          data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex].col=col+1;
        }
      }else{
        data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex+col].hide=true;
        data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex].col=col+1;
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
      let col = data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex].col;
      let row = data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex].row;
      if(col>1){
        for(let i =0;i<col;i++){
          data.value.options.layoutArray[state.currentRowIndex+row][state.currentColIndex+i].hide=true;
          data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex].row=row+1;
        }
      }else{
        data.value.options.layoutArray[state.currentRowIndex+row][state.currentColIndex].hide=true;
        data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex].row=row+1;
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
      let col = data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex].col;
      let row = data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex].row;
      if(col===1&&row===1)return;

      for(let i = 0;i<row;i++){
        for(let j = 0;j<col;j++){
          data.value.options.layoutArray[state.currentRowIndex+i][state.currentColIndex+j].hide = false;
        }
      }
      data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex].row=1;
      data.value.options.layoutArray[state.currentRowIndex][state.currentColIndex].col=1;
    }
    //追加行
    const handlerAppendCol=()=>{
      console.log(tr);
      const _tr = merge(JSON.parse(JSON.stringify(tr)))
      data.value.options.layoutArray.push(_tr);
    }
    const handlerAppendRow=()=>{
      tr.push(td);
      data.value.options.layoutArray.forEach(item=>{
        const _td = merge(JSON.parse(JSON.stringify(td)))
        item.push(_td);
      })
    }

    return{
      ...toRefs(state),
      data,
      showRightColMenu,
      showDownRowMenu,
      showResetTableMenu,
      rightClick,
      hideRightContextMenu,
      handlerDownRow,
      handlerRightCol,
      handlerResetTable,
      handlerAppendCol,
      handlerAppendRow
    }
  }

})
</script>

<style scoped>
.CellHide{
  display: none;
}
</style>
