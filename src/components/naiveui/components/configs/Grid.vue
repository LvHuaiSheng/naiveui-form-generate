<template>
  <n-form-item label="栅格列数">
    <n-input-number v-model:value="data.options.cols" :min="1" />
  </n-form-item>
  <n-form-item label="横向间隔槽">
    <n-input-number v-model:value="data.options.xGap" :min="0" />
  </n-form-item>
  <n-form-item label="纵向间隔槽">
    <n-input-number v-model:value="data.options.yGap" :min="0" />
  </n-form-item>
  <n-form-item label="列配置项" class="fc-form-item-block">
    <n-dynamic-input v-model:value="data.columns" :on-create="handleInsertColumn" show-sort-button>
      <template #default="{ value }">
        <n-input-number
            placeholder="栅格值"
            v-model:value="value.span"
            :min="0"
            :max="data.options.cols"
        />
      </template>
    </n-dynamic-input>

  </n-form-item>
  <!--      <n-form-item label="子元素是否可具有响应式宽度">
          <n-switch
              v-model:value="data.options.itemResponsive"
          >
            <template #checked>
              是
            </template>
            <template #unchecked>
              否
            </template>
          </n-switch>
        </n-form-item>-->
</template>
<script lang="ts">
import {defineComponent, ref, watch} from 'vue'
import SvgIcon from '../../../../components/SvgIcon.vue'
export default defineComponent({
  name: 'GridWidget',
  components:{
    SvgIcon
  },
  props: {
    select: {
      type: Object
    }
  },
  emits: ['update:select'],
  setup(props, context) {
    const data = ref<any>(props.select)
    watch(
        () => props.select,
        val => (data.value = val)
    )
    watch(data, val => context.emit('update:select', val))

    const handleInsertColumn = () => {
      return{
        span: 12,
        list: []
      }
    }

    const handleOptionsRemove = (index: number) => {
      data.value.columns.splice(index, 1)
    }

    return {
      data,
      handleInsertColumn,
      handleOptionsRemove
    }
  }
})

</script>


<style scoped>

</style>
