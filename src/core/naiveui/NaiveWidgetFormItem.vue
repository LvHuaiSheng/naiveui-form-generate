<template>
  <div class="widget-item-container">
    <n-form-item
      class="widget-view"
      v-if="element"
      :key="element.key"
      :class="{ active: selectWidget?.key === element.key }"
      :label="!element.hideLabel?element.label:''"
      :rules="element.options.rules"
      :show-require-mark="!config.hideRequiredMark && (element.options.rules?element.options.rules.required:false)"
    >
      <template v-if="element.type === 'input'">
        <n-input
          :type="element.options.type"
          :size="config.size"
          v-model:value="element.options.defaultValue"
          :style="{ width: element.options.width }"
          :placeholder="element.options.placeholder"
          :maxlength="parseInt(element.options.maxlength)"
          :disabled="element.options.disabled"
          :clearable="element.options.allowClear"
          :round="element.options.round"
          :show-count="element.options.showCount"
          show-password-on="click"
        >
            <template #prefix v-if="element.options.prefix">
              {{element.options.prefix}}
            </template>
            <template #suffix v-if="element.options.suffix">
              {{element.options.suffix}}
            </template>
          <template #count="{ value }">
            {{ value.length }}{{element.options.maxlength?' / '+element.options.maxlength:''}}
          </template>
        </n-input>
      </template>

      <template v-if="element.type === 'number'">
        <n-input-number
                        :clearable="element.options.allowClear"
                        v-model:value="element.options.defaultValue"
                        :size="config.size"
                        :style="{ width: element.options.width }"
                        :max="element.options.max"
                        :min="element.options.min"
                        :disabled="element.options.disabled"
                        :round="element.options.round"/>
      </template>

      <template v-if="element.type === 'radio'">
        <n-radio-group v-model:value="element.options.defaultValue"
                       :size="config.size"
                       :disabled="element.options.disabled">
          <n-space v-if="element.options.groupType==='radioGroup'">
            <n-radio  v-for="item of element.options.options"
                      :key="item.value"
                      :value="item.value">
              {{ element.options.showLabel ? item.label : item.value }}
            </n-radio>
          </n-space>
          <n-radio-button v-if="element.options.groupType==='buttonGroup'"  v-for="item of element.options.options"
                          :key="item.value"
                          :value="item.value">
            {{ element.options.showLabel ? item.label : item.value }}
          </n-radio-button>
        </n-radio-group>
      </template>

      <template v-if="element.type === 'checkbox'">
        <n-checkbox-group
          v-model:value="element.options.defaultValue"
          :style="{ width: element.options.width }"
          :disabled="element.options.disabled"
        >
          <n-checkbox
            v-for="item of element.options.options"
            :key="item.value"
            :value="item.value"

            >{{
              element.options.showLabel ? item.label : item.value
            }}</n-checkbox
          >
        </n-checkbox-group>
      </template>

      <template v-if="element.type === 'time'">
<!--        <n-time-picker v-model:value="element.options.defaultValue" :format="element.options.format" />-->
        <n-time-picker
          :size="config.size"
          v-model:value="element.options.defaultValue"
          :placeholder="element.options.placeholder"
          :inputReadOnly="element.options.readonly"
          :clearable="element.options.allowClear"
          :format="element.options.format"
          :valueFormat="element.options.valueFormat"
          :disabled="element.options.disabled"
          :style="{ width: element.options.width }"
        />
      </template>

      <template v-if="element.type === 'date'">
        <n-date-picker
          :size="config.size"
          v-model:value="element.options.defaultValue"
          :placeholder="element.options.placeholder"
          :inputReadOnly="element.options.readonly"
          :clearable="element.options.allowClear"
          :format="element.options.format"
          :type="element.options.type"
          :disabled="element.options.disabled"
          :style="{ width: element.options.width }"
        />
      </template>

      <template v-if="element.type === 'rate'">
        <n-rate
          v-model:value="element.options.defaultValue"
          :count="element.options.max"
          :allowHalf="element.options.allowHalf"
          :allowClear="element.options.allowClear"
          :readonly="element.options.disabled"
        />
      </template>

      <template v-if="element.type === 'select'">
        <n-select
          :size="config.size"
          v-model:value="element.options.defaultValue"
          :placeholder="element.options.placeholder"
          :filter-option="handleFilterOption"
          :clearable="element.options.allowClear"
          :filterable="element.options.filterable"
          :disabled="element.options.disabled"
          :options="element.options.options"
          :multiple="element.options.multiple"
          :label-field="element.options.props.label"
          :value-field="element.options.props.value"
          :style="{ width: element.options.width }"
        >
        </n-select>
      </template>
      <template v-if="element.type === 'selectTree'">
        <n-tree-select
            v-model:value="element.options.defaultValue"
            :options="element.options.options"
            :placeholder="element.options.placeholder"
            :size="config.size"
            :multiple="element.options.multiple"
            :filterable="element.options.filterable"
            :check-strategy="element.options.checkStrategy"
            :clearable="element.options.allowClear"
            :label-field="element.options.props.label"
            :key-field="element.options.props.value"
            :disabled="element.options.disabled"
            :style="{ width: element.options.width }"
        />
      </template>
      <template v-if="element.type === 'switch'">
        <n-switch
          :size="config.size"
          v-model:value="element.options.defaultValue"
          :disabled="element.options.disabled"
        >
          <template #checked>
            {{element.options.checkedChildren}}
          </template>
          <template #unchecked>
            {{element.options.unCheckedChildren}}
          </template>
        </n-switch>
      </template>

      <template v-if="element.type === 'slider'">
          <n-slider
              v-model:value="element.options.defaultValue"
              :min="element.options.min"
              :max="element.options.max"
              :step="element.options.step"
              :range="element.options.range"
              :vertical="element.options.vertical"
              :reverse="element.options.reverse"
              :disabled="element.options.disabled"
              :style="{ width: element.options.width,height: element.options.height }"
          />
      </template>

      <template v-if="element.type === 'color'">
        <n-color-picker v-model:value="element.options.defaultValue"
                        :size="config.size"
                        :modes="element.options.modes"
                        :disabled="element.options.disabled"
                        :show-alpha="element.options.showAlpha"
                        :show-preview="element.options.showPreview"
                        :placement="element.options.placement"
                        :style="{ width: element.options.width }"/>
      </template>
      <template v-if="element.type === 'transfer'">
        <n-transfer ref="transfer" v-model:value="element.options.defaultValue"
                    :size="config.size"
                    :filterable="element.options.filterable"
                    :disabled="element.options.disabled"
                    :source-title="element.options.sourceTitle"
                    :target-title="element.options.targetTitle"
                    :virtual-scroll="element.options.virtualScroll"
                    :options="element.options.options"
                    :style="{ width: element.options.width }"
                    />
      </template>

      <template v-if="element.type === 'text'">
        <div :style="{ width: element.options.width,height:element.options.height }">
          <span>{{ element.options.defaultValue }}</span>
        </div>
      </template>
      <template v-if="element.type === 'alert'">
        <n-alert :title="element.options.title"
                 :type="element.options.type"
                 :showIcon="element.options.showIcon"
                 :closable="element.options.closable"
                 :style="{ width: element.options.width,height:element.options.height }">
          {{element.options.content}}
        </n-alert>
      </template>

      <template v-if="element.type === 'upload'">
        <n-upload
          :name="element.options.file"
          :action="element.options.action"
          :accept="element.options.accept"
          :max="element.options.maxCount"
          :defaultUpload="element.options.defaultUpload"
          :directory="element.options.directory"
          :directoryDnd="element.options.directoryDnd"
          :showDownloadButton="element.options.showDownloadButton"
          :showFileList="element.options.showFileList"
          :showRetryButton="element.options.showRetryButton"
          :showRemoveButton="element.options.showRemoveButton"
          :showCancelButton="element.options.showCancelButton"
          :showPreviewButton="element.options.showPreviewButton"
          :file-list="element.options.defaultValue"
          :listType="element.options.listType"
          :multiple="element.options.multiple"
          :disabled="element.options.disabled"
        >
          <SvgIcon
            v-if="element.options.listType === 'image-card'"
            iconClass="insert"
          />
          <n-button v-else>
            <SvgIcon iconClass="img-upload" style="margin-right: 10px;" />
            点击上传
          </n-button>
        </n-upload>
      </template>

      <template v-if="element.type === 'richtext-editor'">
        <RichTextEditor
          :value="element.options.defaultValue"
          :disable="element.options.disabled"
          :style="{ width: element.options.width }"
        />
      </template>

      <template v-if="element.type === 'cascader'">
        <n-cascader
          :size="config.size"
          v-model:value="element.options.defaultValue"
          :options="element.options.options"
          :placeholder="element.options.placeholder"
          :allowClear="element.options.allowClear"
          :disabled="element.options.disabled"
          :style="{ width: element.options.width }"
        />
      </template>
      <template v-if="element.type === 'table'">
        <n-table :size="config.size"
                 :class="'table-'+element.options.theme"
                 :bordered="element.options.bordered"
                 :bottom-bordered="element.options.bottomBordered"
                 :single-column="element.options.singleColumn"
                 :single-line="element.options.singleLine"
                 :striped="element.options.striped"
                 :style="{ width: element.options.width,height: element.options.height }">
          <thead>
          <tr>
            <th>Abandon</th>
            <th>Abormal</th>
            <th>Abolish</th>
            <th>...</th>
            <th>万事开头难</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>放弃</td>
            <td>反常的</td>
            <td>彻底废除</td>
            <td>...</td>
            <td>干！我刚才背的是啥</td>
          </tr>
          <tr>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
          </tr>
          </tbody>
        </n-table>
      </template>
      <template v-if="element.type === 'transfer'">

      </template>
    </n-form-item>
    <div class="widget-view-action" v-if="selectWidget?.key === element.key">
      <SvgIcon iconClass="copy" @click.stop="$emit('copy')" />
      <SvgIcon iconClass="delete" @click.stop="$emit('delete')" />
    </div>

    <div class="widget-view-drag" v-if="selectWidget?.key === element.key">
      <SvgIcon iconClass="move" className="drag-widget" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import SvgIcon from '../../components/SvgIcon.vue'
import RichTextEditor from '../../components/RichTextEditor.vue'
import { WidgetForm } from '../../config/naiveui'

export default defineComponent({
  name: 'NaiveWidgetFormItem',
  components: {
    SvgIcon,
    RichTextEditor
  },
  props: {
    config: {
      type: Object as PropType<WidgetForm['config']>,
      required: true
    },
    element: {
      type: Object,
      required: true
    },
    selectWidget: {
      type: Object
    }
  },
  emits: ['copy', 'delete'],
  setup() {
    const handleFilterOption = (input: string, option: { label: string }) =>
      option.label.toLowerCase().includes(input)

    return {
      handleFilterOption
    }
  }
})
</script>
