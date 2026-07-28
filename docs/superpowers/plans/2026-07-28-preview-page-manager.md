# 预览页面管理工具 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有单页面 App.vue 重构为页面管理容器，支持通过卡片列表预览和切换多个页面。

**Architecture：** App.vue 作为容器维护 `currentPageId` 状态，条件渲染页面列表或具体页面。所有子页面注册在 `src/pages/index.js`，新增页面只需在注册表添加一行。

**Tech Stack：** Vue 3 (Composition API `<script setup>`), Vite 5, 纯 CSS (无 UI 库)

---

## 文件结构

| 文件 | 操作 | 职责 |
|------|------|------|
| `src/pages/HelloWorld.vue` | 创建 | 现有 HelloWorld 页面内容迁移至此 |
| `src/pages/index.js` | 创建 | 页面注册表，集中导出 `pages` 数组 |
| `src/App.vue` | 重写 | 页面管理容器：列表渲染、页面切换、返回导航 |
| `src/main.js` | 不变 | 入口文件，无需改动 |
| `src/styles/main.css` | 不变 | 全局样式，无需改动 |

---

### Task 1: 创建 `src/pages/HelloWorld.vue`

**Files:**
- Create: `src/pages/HelloWorld.vue`

- [ ] **Step 1: 将现有 App.vue 内容迁移到新文件**

  新建 `src/pages/HelloWorld.vue`，内容如下：

  ```vue
  <script setup></script>

  <template>
    <div class="hello">
      <h1 class="hello__title">Hello World</h1>
    </div>
  </template>

  <style scoped>
  .hello {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px)
      env(safe-area-inset-bottom, 0px) env(safe-area-inset-left, 0px);
  }

  .hello__title {
    font-size: 32px;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: 0.5px;
  }
  </style>
  ```

- [ ] **Step 2: 提交**

  ```bash
  git add src/pages/HelloWorld.vue
  git commit -m "feat: extract HelloWorld page to src/pages/HelloWorld.vue"
  ```

---

### Task 2: 创建页面注册表 `src/pages/index.js`

**Files:**
- Create: `src/pages/index.js`

- [ ] **Step 1: 创建注册表并导出 `pages` 数组**

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

- [ ] **Step 2: 提交**

  ```bash
  git add src/pages/index.js
  git commit -m "feat: add page registry in src/pages/index.js"
  ```

---

### Task 3: 重写 `src/App.vue` 为页面管理容器

**Files:**
- Modify: `src/App.vue`（完整重写）

- [ ] **Step 1: 实现容器逻辑与模板**

  将 `src/App.vue` 替换为以下内容：

  ```vue
  <script setup>
  import { computed, ref } from 'vue'
  import { pages } from './pages/index.js'

  const currentPageId = ref(null)

  const currentPage = computed(() =>
    pages.find((p) => p.id === currentPageId.value)
  )
  </script>

  <template>
    <div class="app">
      <!-- 页面预览列表 -->
      <div v-if="!currentPageId" class="preview-list">
        <div class="preview-list__header">
          <h1 class="preview-list__title">页面预览</h1>
          <p class="preview-list__subtitle">点击卡片查看页面</p>
        </div>

        <div v-if="pages.length" class="preview-list__grid">
          <div
            v-for="page in pages"
            :key="page.id"
            class="preview-card"
            @click="currentPageId = page.id"
          >
            <h2 class="preview-card__name">{{ page.name }}</h2>
            <p v-if="page.description" class="preview-card__desc">
              {{ page.description }}
            </p>
          </div>
        </div>

        <div v-else class="preview-list__empty">
          <p>暂无页面</p>
          <p>请在 src/pages/index.js 中添加页面配置</p>
        </div>
      </div>

      <!-- 具体页面 -->
      <template v-else>
        <div class="page-view">
          <div class="back-bar" @click="currentPageId = null">
            <svg
              class="back-bar__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 19l-7-7 7-7"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="back-bar__text">返回</span>
          </div>
          <component :is="currentPage.component" />
        </div>
      </template>
    </div>
  </template>

  <style scoped>
  .app {
    min-height: 100%;
  }

  /* ===== 预览列表 ===== */
  .preview-list {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: env(safe-area-inset-top, 0px) 16px env(safe-area-inset-bottom, 0px);
    gap: 24px;
  }

  .preview-list__header {
    text-align: center;
  }

  .preview-list__title {
    font-size: 24px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 4px;
  }

  .preview-list__subtitle {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
  }

  .preview-list__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    width: 100%;
    max-width: 400px;
  }

  @media (min-width: 480px) {
    .preview-list__grid {
      grid-template-columns: repeat(2, 1fr);
      max-width: 560px;
    }
  }

  .preview-card {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 20px;
    cursor: pointer;
    transition: background 0.2s ease;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .preview-card:active {
    background: rgba(255, 255, 255, 0.14);
  }

  .preview-card__name {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 4px;
  }

  .preview-card__desc {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
  }

  .preview-list__empty {
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
    font-size: 16px;
    line-height: 1.6;
  }

  /* ===== 页面视图 ===== */
  .page-view {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  .back-bar {
    height: 44px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    gap: 4px;
    cursor: pointer;
    flex-shrink: 0;
    padding-top: env(safe-area-inset-top, 0px);
  }

  .back-bar__icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }

  .back-bar__text {
    font-size: 15px;
    color: #ffffff;
  }
  </style>
  ```

- [ ] **Step 2: 提交**

  ```bash
  git add src/App.vue
  git commit -m "feat: rewrite App.vue as page manager container"
  ```

---

### Task 4: 构建验证

**Files:** 无需修改文件

- [ ] **Step 1: 运行生产构建**

  ```bash
  npm run build
  ```

  **Expected:**
  - Exit code 0
  - `dist/` 目录生成
  - 无 TypeScript/Vite 报错

- [ ] **Step 2: 启动开发服务器并浏览器验证**

  ```bash
  npm run dev
  ```

  打开 http://localhost:5173/ 验证：

  1. **列表页**：深色背景，显示"页面预览"标题 + 副标题，下方有一张"Hello World"卡片
  2. **点击卡片**：切换到 HelloWorld 页面（白色"Hello World"文字居中），顶部显示"返回"按钮
  3. **点击返回**：回到列表页
  4. **PWA 注册**：DevTools → Application → Service Workers 确认 SW 已注册

---

## Self-Review

**1. Spec coverage:**

| 设计文档要求 | 实现任务 |
|-------------|---------|
| App.vue 容器 + `currentPageId` 状态 | Task 3 Step 1 |
| 条件渲染：列表 / 页面 | Task 3 Step 1 (`v-if="!currentPageId"` / `v-else`) |
| 卡片网格布局（单列/双列响应式） | Task 3 Step 1 (`.preview-list__grid` + `@media`) |
| 卡片样式（半透明背景、圆角、点击态） | Task 3 Step 1 (`.preview-card`) |
| 空状态提示 | Task 3 Step 1 (`.preview-list__empty`) |
| 返回按钮（固定顶部、SVG 箭头+文字） | Task 3 Step 1 (`.back-bar`) |
| 页面注册表 `pages/index.js` | Task 2 Step 1 |
| 子页面独立为 `.vue` 文件 | Task 1 Step 1 |
| 安全区适配 `env(safe-area-inset-*)` | Task 1 & Task 3 |
| 移动端优先 | Task 3 (单列默认，大屏双列) |

无遗漏。

**2. Placeholder scan:** 无 TBD、TODO、"implement later"、"add appropriate error handling" 等占位符。所有步骤包含完整代码。

**3. Type consistency：** `currentPageId` 为 `string | null`，`pages` 数组结构一致（`id`, `name`, `description`, `component`），计算属性 `currentPage` 使用 `find()` 匹配 ID，无命名冲突。
