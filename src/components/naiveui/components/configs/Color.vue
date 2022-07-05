<template>
  <n-form-item label="默认值">
    <n-color-picker v-model:value="data.options.defaultValue"
                    :show-alpha="data.options.showAlpha"
                    :show-preview="data.options.showPreview"
                    :placement="data.options.placement"/>
  </n-form-item>
  <n-form-item
      label="显示属性">
    <n-checkbox
        v-model:checked="data.options.showLabel"
    >显示标签
    </n-checkbox>
  </n-form-item>
  <n-form-item>
    <template #label>
      可用模式
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-icon size="18">
            <SvgIcon iconClass="question" style="margin-right: 10px;" />
          </n-icon>
        </template>
        颜色选择器支持颜色的格式<br/>注意一旦你在某个模式下选择了值，颜色选择器值的格式将跟随这个格式
      </n-tooltip>
    </template>
    <n-checkbox-group v-model:value="data.options.modes">
      <n-space item-style="display: flex;">
        <n-checkbox value="rgb" label="rgb" />
        <n-checkbox value="hex" label="hex" />
        <n-checkbox value="hsl" label="hsl" />
        <n-checkbox value="hsv" label="hsv" />
      </n-space>
    </n-checkbox-group>
  </n-form-item>

  <n-form-item label="是否可调节alpha通道">
    <n-switch
        checked-children="是"
        un-checked-children="否"
        v-model:value="data.options.showAlpha"
    >
      <template #checked>
        是
      </template>
      <template #unchecked>
        否
      </template>
    </n-switch>
  </n-form-item>
  <n-form-item label="是否展示颜色预览块">
    <n-switch
        checked-children="是"
        un-checked-children="否"
        v-model:value="data.options.showPreview"
    >
      <template #checked>
        是
      </template>
      <template #unchecked>
        否
      </template>
    </n-switch>
  </n-form-item>
  <n-form-item label="面板的弹出位置">
    <n-select v-model:value="data.options.placement" :options="colorPlacementOptions"></n-select>
  </n-form-item>

  <n-form-item label="操作属性">
    <n-space item-style="display: flex;" align="center">
      <n-checkbox
          v-model:checked="data.options.rules.required"
      >必填
      </n-checkbox
      >
      <n-checkbox
          v-model:checked="data.options.disabled"
      >禁用
      </n-checkbox>
    </n-space>
  </n-form-item>
</template>
<script lang="ts">
import {defineComponent, reactive, ref, toRefs, watch} from 'vue'
import SvgIcon from '../../../../components/SvgIcon.vue'
export default defineComponent({
  name: 'InputWidget',
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

    const state = reactive({
      colorPlacementOptions: [
        {label: 'top-start', value: 'top-start'},
        {label: 'top', value: 'top'},
        {label: 'top-end', value: 'top-end'},
        {label: 'right-start', value: 'right-start'},
        {label: 'right', value: 'right'},
        {label: 'right-end', value: 'right-end'},
        {label: 'bottom-start', value: 'bottom-start'},
        {label: 'bottom', value: 'bottom'},
        {label: 'bottom-end', value: 'bottom-end'},
        {label: 'left-start', value: 'left-start'},
        {label: 'left', value: 'left'},
        {label: 'left-end', value: 'left-end'},
      ],
    })
    return {
      ...toRefs(state),
      data,
    }
  }
})

</script>


<style scoped>

</style>
