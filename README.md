# naiveui-form-generate

<p align="center">基于naiveui、typescript的表单生成器，支持复杂表格Tree等常用组件</p>
<p align="center">
  <a href="./LICENSE"><img allt="MIT License" src="https://badgen.net/badge/license/MIT/blue"/></a>
  <a href="./LICENSE"><img allt="MIT License" src="https://badgen.net/badge/naive-ui/^2.30.6/green"/></a>
  <a href="./LICENSE"><img allt="MIT License" src="https://badgen.net/badge/vue/^3.2.25/green"/></a>
  <a href="./LICENSE"><img allt="MIT License" src="https://badgen.net/badge/vite/^2.9.9/green"/></a>
</p>


### 简介

[NaiveUi Form Generate](https://gitee.com/sourcenet/naiveui-form-generate)，一个基于 Vue3.0、Vite、Naive UI 表单生成器。

### 预览

[预览地址](http://nge.sourcenet.cc/naiveui-form-generate)

### 特别提示
推荐从Gitee仓库拉取代码，[NaiveUi Form Generate](https://gitee.com/sourcenet/naiveui-form-generate)，GitHub提交老是被墙，代码也许不是最新的

### 功能/计划 
🕙筹划 🔲筹备 🚧进行中 ✅完成

> 支持组件常用事件（组件可在线设计的属性都可在事件内动态修改，如：动态显隐、必填、校验规则、样式等等）
- ✅ click事件
- ✅ change事件 
- 🔲 focus事件
- 🔲 hover事件
- 🔲 blur事件
- 🚧  select事件
- 🔲 update事件
- 🔲 form提交前事件
- 🔲 form保存后事件

> 基础组件
- ✅ 单行/多行/密码输入组件
- ✅ 数字组件
- ✅ 单选
- ✅ 多选
- ✅ 时间选择
- ✅ 日期选择（年份、月份、季度等）
- ✅ 评分
- ✅ 开关
- ✅ 滑块（横向、竖向）
- ✅ 颜色选择器

> 高级组件
- ✅ 树形选择
- ✅ 文件上传
- ✅ 穿梭框
- ✅ 级联选择
- ✅ 树形组件
- ✅ 富文本编辑器
- ✅ 动态标签
- 🕙 动态表格（主要用作子表的使用，支持弹窗/抽屉/行内编辑等多种样式）

> 布局组件
- ✅ naiveui的新版栅格布局
- 🚧   静态表格（可启用原生样式，实现线上、线下合同表单的一比一样式）
- 🕙  标签页

> 其它组件
- ✅ 普通文本
- ✅ Alert组件
- ✅ Divider分割线
- ✅ 按钮

> 其它优化
- 🚀 单个组件化封装（typescript）
- 🚀 细节优化
- 更多......

### 文档
- 待编写

### 构建

```shell
# 克隆项目
#github
git clone https://github.com/LvHuaiSheng/naiveui-form-generate.git

#gitee
git clone https://gitee.com/sourcenet/naiveui-form-generate.git

# 进入项目目录
cd naiveui-form-generate

# 安装依赖(建议使用pnpm: https://pnpm.io/zh/installation)
pnpm i # 或者 npm i

# 启动
npm run dev
```

### 发布

```shell
# 构建测试环境
npm run build:test

# 构建github pages环境
npm run build:github

# 构建生产环境
npm run build
```

### 其他指令


### 规范

#### git commit 规范

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中
- `mod` 不确定分类的修改
- `release` 发布


