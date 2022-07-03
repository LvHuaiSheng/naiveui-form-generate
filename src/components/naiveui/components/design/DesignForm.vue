<template>
  <div class="widget-form-container">
    <div v-if="!widgetForm.list" class="form-empty">从左侧拖拽来添加字段</div>
    <n-form
      :inline="widgetForm.config.inline"
      :labelAlign="widgetForm.config.labelAlign"
      :label-placement="widgetForm.config.labelPlacement"
      :labelWidth="widgetForm.config.labelWidth"
      :show-require-mark="!widgetForm.config.hideRequiredMark"
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
              <g-table :element="element" :widgetForm="widgetForm" :widgetFormSelect="widgetFormSelect"/>
            </template>
            <template v-else>
              <DesignFormItem
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
import { defineComponent, nextTick, PropType } from 'vue'
import Draggable from 'vuedraggable'
import { v4 } from 'uuid'
import DesignFormItem from './DesignFormItem.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { WidgetForm } from '../../config/naiveui'
import GTable from '../custom/table/GTable.vue'
const handleListInsert = (key: string, list: any[], obj: any) => {
  const newList: any[] = []
  list.forEach(item => {
    if (item.key === key) {
      newList.push(item)
      newList.push(obj)
    } else {
      if (item.columns) {
        item.columns = item.columns.map((col: any) => ({
          ...col,
          list: handleListInsert(key, col.list, obj)
        }))
      }
      newList.push(item)
    }
  })
  return newList
}

const handleListDelete = (key: string, list: any[]) => {
  const newList: any[] = []
  list.forEach(item => {
    if (item.key !== key) {
      if (item.columns) {
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
    const handleTdMoveAdd = (
      event: any,
      row: any,
      index: string | number | symbol,
      tdIndex: string | number | symbol
    ) => {
      console.log('row.columns[index]=',JSON.stringify(row.columns[index]))
      console.log('row.columns[index]222=',JSON.stringify(row.columns[index][tdIndex]))

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

    return {
      handleItemClick,
      handleCopyClick,
      handleDeleteClick,
      handleMoveAdd,
      handleColMoveAdd,
      handleTdMoveAdd,
    }
  }
})
</script>
