<template>
  <div class="fc-style">
    <n-form
      ref="generateForm"
      :model="model"
      :rules="rules"
      :inline="widgetForm.config.inline"
      :labelAlign="widgetForm.config.labelAlign"
      :label-placement="widgetForm.config.labelPlacement"
      :labelWidth="widgetForm.config.labelWidth"
      :show-require-mark="!widgetForm.config.hideRequiredMark"
      :show-label="widgetForm.config.showLabel"
    >
      <template v-for="(element, index) of widgetForm.list">
        <template v-if="element.type === 'grid'">
          <n-grid
              v-if="element.key"
              :key="element.key"
              :x-gap="element.options.xGap ?? 0"
              :y-gap="element.options.yGap ?? 0"
              :cols="element.options.cols?? 24"
              :collapsed="element.options.collapsed"
              :collapsed-rows="element.options.collapsedRows"
              :responsive="element.options.responsive"
              :item-responsive="element.options.itemResponsive"
          >
            <n-gi v-for="(col, colIndex) of element.columns" :key="colIndex" :span="col.span ?? 0">
              <GenerateFormItem
                v-for="colItem of col.list"
                :model="model"
                :key="colItem.key"
                :element="colItem"
                :config="data.config"
                :disabled="disabled"
              />
            </n-gi>
          </n-grid>
        </template>
        <template v-else-if="element.type === 'table'">
          <!--              <g-table :element="element" :elementIndex="index" v-model:widgetForm="widgetForm" v-model:widgetFormSelect="widgetFormSelect"/>-->
          <n-table v-if="element.key"
                   :key="element.key"
                   :class="' table-'+element.options.theme"
                   :bordered="element.options.bordered"
                   :bottom-bordered="element.options.bottomBordered"
                   :single-column="element.options.singleColumn"
                   :single-line="element.options.singleLine"
                   :striped="element.options.striped"
                   :style="{ width: element.options.width,height: element.options.height }">
            <tbody>
            <tr v-for="(col,colIndex) in element.columns" :key="colIndex">
              <td v-for="(td,tdIndex) in col" :key="'td_'+tdIndex" :colspan="td.col" :rowspan="td.row" :class="{CellHide:td.hide}">
                <div class="widget-col-list">
                  <GenerateFormItem
                      v-for="colItem of td.list"
                      :model="model"
                      :key="colItem.key"
                      :element="colItem"
                      :config="data.config"
                      :disabled="disabled"
                  />
                </div>
              </td>
            </tr>
            </tbody>
          </n-table>
        </template>
        <GenerateFormItem
          v-else
          :model="model"
          :key="element.key"
          :element="widgetForm.list[index]"
          :config="data.config"
          :disabled="disabled"
        />
      </template>
    </n-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch,ref  } from 'vue'
import { FormInst,useMessage } from 'naive-ui'
import GenerateFormItem from './GenerateFormItem.vue'
import { naiveui } from '../../config'

export default defineComponent({
  name: 'GenerateForm',
  components: {
    GenerateFormItem
  },
  props: {
    data: {
      type: Object,
      default: naiveui.widgetForm
    },
    value: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const message = useMessage()
    const generateForm = ref<FormInst | null>(null)
    const state = reactive({
      // generateForm: null as any,
      model: {} as any,
      rules: {} as any,
      widgetForm:
        (props.data && JSON.parse(JSON.stringify(props.data))) ??
          naiveui.widgetForm
    })

    const generateModel = (list: any[]) => {
      for (let index = 0; index < list.length; index++) {
        const model = list[index].model
        if (!model) {
          return
        }
        if (list[index].type === 'grid') {
          list[index].columns.forEach((col: any) => generateModel(col.list))
        } else {
          if (props.value && Object.keys(props.value).includes(model)) {
            state.model[model] = props.value[model]
          } else {
            state.model[model] = list[index].options.defaultValue
          }
          state.rules[model] = list[index].options.rules
        }
      }
      console.log('rules=',state.rules)
    }

    const generateOptions = (list: any[]) => {
      list.forEach(item => {
        if (item.type === 'grid') {
          item.columns.forEach((col: any) => generateOptions(col.list))
        } else {
          if (item.options.remote && item.options.remoteFunc) {
            fetch(item.options.remoteFunc)
              .then(resp => resp.json())
              .then(json => {
                if (json instanceof Array) {
                  item.options.remoteOptions = json.map(data => ({
                    label: data[item.options.props.label],
                    value: data[item.options.props.value],
                    children: data[item.options.props.children]
                  }))
                }
              })
          }
        }
      })
    }

    watch(
      () => props.data,
      val => {
        state.widgetForm =
          (val && JSON.parse(JSON.stringify(val))) ?? naiveui.widgetForm
        state.model = {}
        state.rules = {}
        generateModel(state.widgetForm.list)
        generateOptions(state.widgetForm.list)
      },
      { deep: true, immediate: true }
    )

    onMounted(() => {
      generateModel(state.widgetForm?.list ?? [])
      generateOptions(state.widgetForm?.list ?? [])
    })

    const getData = () => {
      return new Promise((resolve, reject) => {
        generateForm.value?.validate((errors) => {
          console.log('errors=',errors)
          if (!errors) {
            resolve(state.model)
          } else {
            message.error('验证失败')
          }
        })
            .catch((error: Error) => {
              reject(error)
            })
      })
    }

    const reset = () => {
      generateForm.value?.restoreValidation()
    }

    return {
      ...toRefs(state),
      getData,
      generateForm,
      reset
    }
  }
})
</script>
