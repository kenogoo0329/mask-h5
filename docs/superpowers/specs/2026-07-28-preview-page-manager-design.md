# 预览页面管理工具设计文档

## 目标

为 H5 PWA 项目添加一个页面预览管理工具。开发者和测试人员可以通过卡片列表快速浏览、切换和预览项目中的所有页面，后续新增页面只需在注册表中添加一行配置即可。

## 方案概述

采用**轻量级条件渲染方案**，不引入 vue-router 等额外依赖。

- `App.vue` 作为容器，维护 `currentPageId` 状态
- `currentPageId === null` 时渲染页面预览列表
- `currentPageId` 有值时渲染对应页面，并在顶部显示"返回列表"按钮
- 所有页面集中注册在 `src/pages/index.js`

## 文件结构

```
src/
├── main.js              # 不变
├── styles/
│   └── main.css         # 不变
├── App.vue              # 页面管理容器（列表 + 页面切换 + 返回导航）
└── pages/
    ├── HelloWorld.vue   # 现有页面独立为组件
    └── index.js         # 页面注册表
```

## App.vue 容器设计

### 状态

| 状态名 | 类型 | 初始值 | 说明 |
|--------|------|--------|------|
| `currentPageId` | `string \| null` | `null` | 当前显示的页面 ID，`null` 表示显示列表 |

### 模板结构

```
<div class="app-container">
  <!-- 页面列表 -->
  <PreviewList v-if="!currentPageId" :pages="pages" @select="currentPageId = $event" />

  <!-- 具体页面 -->
  <template v-else>
    <!-- 固定返回按钮 -->
    <BackButton @click="currentPageId = null" />
    <!-- 动态组件 -->
    <component :is="currentPageComponent" />
  </template>
</div>
```

### 计算属性

- `currentPageComponent`：根据 `currentPageId` 从 `pages` 数组中查找对应的 `component`

## 页面列表（PreviewList）

### 布局

- 深色背景 `#2e3546`
- 内容区垂直居中
- 卡片网格：移动端单列，大屏（>480px）双列
- 网格间距 16px

### 单张卡片

- 背景：`rgba(255, 255, 255, 0.08)`
- 圆角：16px
- 内边距：20px
- 文字：白色
  - 页面名称：18px，font-weight 600
  - 描述：14px，`rgba(255, 255, 255, 0.6)`
- 点击态：背景变为 `rgba(255, 255, 255, 0.14)`
- 过渡：`background 0.2s ease`

### 空状态

当 `pages` 数组为空时，居中显示：

> 暂无页面  
> 请在 `src/pages/index.js` 中添加页面配置

文字颜色 `rgba(255, 255, 255, 0.4)`，字号 16px。

## 页面注册机制（`src/pages/index.js`）

```js
import HelloWorld from './HelloWorld.vue'

export const pages = [
  {
    id: 'hello-world',
    name: 'Hello World',
    description: '基础示例页面',
    component: HelloWorld,
  },
]
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | `string` | 是 | 唯一标识，用于状态匹配 |
| `name` | `string` | 是 | 列表卡片上显示的页面名称 |
| `description` | `string` | 否 | 列表卡片上显示的简短描述 |
| `component` | `Component` | 是 | Vue 组件对象 |

### 新增页面流程

1. 新建 `src/pages/XxxPage.vue`
2. 在 `src/pages/index.js` 中 `import` 该组件
3. 在 `pages` 数组中新增一条记录

## 子页面规范

- 每个子页面是一个独立的 `.vue` 单文件组件
- 子页面**不负责导航逻辑**（返回按钮由 App.vue 统一提供）
- 子页面只需专注自身业务内容和样式
- 样式建议使用 `scoped`

## 返回按钮

- 固定在页面顶部左侧
- 高度 44px，与系统状态栏对齐
- 包含：左箭头 SVG + "返回" 文字
- 文字颜色：白色，15px
- 点击后 `currentPageId = null`，回到列表
- 背景透明，不影响下方页面内容

## 视觉风格

- **背景色**：延续全局深色 `#2e3546`
- **卡片**：半透明白色背景 + 圆角 + 模糊效果（可选）
- **文字**：白色系，层级通过透明度区分
- **安全区**：保留 `env(safe-area-inset-*)` 适配
- **移动端优先**：所有尺寸和交互针对移动端优化

## 不在本次范围内

- 页面搜索/筛选功能
- 页面分类/分组
- 页面收藏/最近访问
- URL 路由同步（刷新后回到列表页）
- 页面性能统计或加载时间显示
- 多语言支持
