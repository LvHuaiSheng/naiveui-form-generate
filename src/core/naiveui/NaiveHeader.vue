<template>
  <n-layout-header class="btn-bar">
    <n-space justify="end">
      <slot></slot>
      <n-button
        v-if="$attrs.uploadJson"
        text
        size="small"
        @click="$emit('uploadJson')"
      >
        <template #icon>
          <SvgIcon iconClass="upload" />
        </template>
        导入JSON
      </n-button>
      <n-button
        v-if="$attrs.clearable"
        text
        size="small"
        @click="$emit('clearable')"
      >
        <template #icon>
          <SvgIcon iconClass="clearable" />
        </template>
        清空
      </n-button>
      <n-button
        v-if="$attrs.preview"
        text
        size="small"
        @click="$emit('preview')"
      >
        <template #icon>
          <SvgIcon iconClass="preview" />
        </template>
        预览
      </n-button>
      <n-button
        v-if="$attrs.generateJson"
        text
        size="small"
        @click="$emit('generateJson')"
      >
        <template #icon>
          <SvgIcon iconClass="generate-json" />
        </template>
        生成JSON
      </n-button>
      <n-button
        v-if="$attrs.generateCode"
        text
        size="small"
        @click="$emit('generateCode')"
      >
        <template #icon>
          <SvgIcon iconClass="generate-code" />
        </template>
        生成代码
      </n-button>
    </n-space>
  </n-layout-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SvgIcon from '../../components/SvgIcon.vue'

export default defineComponent({
  name: 'NaiveHeader',
  components: {
    SvgIcon
  },
  emits: ['uploadJson', 'clearable', 'preview', 'generateJson', 'generateCode']
})
</script>
