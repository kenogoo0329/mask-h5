# 微信服务页面 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 基于微信上侧截图 1:1 还原微信服务页面，新增为独立预览页面，图标使用 SVG 手绘。

**Architecture：** 新建 `src/pages/WeChatServices.vue` 单文件组件，包含导航栏和绿色服务卡片，所有图标内联为 SVG。在 `src/pages/index.js` 中注册新页面。

**Tech Stack：** Vue 3 (Composition API `<script setup>`), Vite 5, 纯 CSS + 内联 SVG

---

## 文件结构

| 文件 | 操作 | 职责 |
|------|------|------|
| `src/pages/WeChatServices.vue` | 创建 | 微信服务页面组件（导航栏 + 绿色卡片 + 手绘 SVG 图标） |
| `src/pages/index.js` | 修改 | 导入并注册新页面到 `pages` 数组 |
| `src/App.vue` | 不变 | 页面管理容器，无需改动 |
| `src/main.js` | 不变 | 入口文件，无需改动 |

---

### Task 1: 创建 `src/pages/WeChatServices.vue`

**Files:**
- Create: `src/pages/WeChatServices.vue`

- [ ] **Step 1: 实现页面组件**

  ```vue
  <script setup></script>

  <template>
    <div class="page">
      <!-- 导航栏 -->
      <div class="nav-bar">
        <svg
          class="nav-bar__back"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M15 19l-7-7 7-7"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h1 class="nav-bar__title">服务</h1>
        <div class="nav-bar__more">
          <span class="nav-bar__dot"></span>
          <span class="nav-bar__dot"></span>
          <span class="nav-bar__dot"></span>
        </div>
      </div>

      <!-- 绿色服务卡片 -->
      <div class="service-card">
        <div class="service-item">
          <!-- 收付款图标：四角框 + 对勾 -->
          <svg
            class="service-icon"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <!-- 左上角 -->
            <path
              d="M6 16V10a4 4 0 014-4h6"
              stroke="white"
              stroke-width="2.5"
              stroke-linecap="round"
            />
            <!-- 右上角 -->
            <path
              d="M32 6h6a4 4 0 014 4v6"
              stroke="white"
              stroke-width="2.5"
              stroke-linecap="round"
            />
            <!-- 左下角 -->
            <path
              d="M6 32v6a4 4 0 004 4h6"
              stroke="white"
              stroke-width="2.5"
              stroke-linecap="round"
            />
            <!-- 右下角 -->
            <path
              d="M32 42h6a4 4 0 004-4v-6"
              stroke="white"
              stroke-width="2.5"
              stroke-linecap="round"
            />
            <!-- 中间对勾 -->
            <path
              d="M16 24l5 5 11-11"
              stroke="white"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="service-name">收付款</span>
        </div>

        <div class="service-item">
          <!-- 钱包图标 -->
          <svg
            class="service-icon"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <!-- 钱包主体 -->
            <rect
              x="6"
              y="12"
              width="36"
              height="24"
              rx="4"
              stroke="white"
              stroke-width="2.5"
            />
            <!-- 钱包盖 -->
            <path
              d="M6 18h36"
              stroke="white"
              stroke-width="2.5"
            />
            <!-- 钱包扣 -->
            <circle
              cx="34"
              cy="24"
              r="4"
              stroke="white"
              stroke-width="2.5"
            />
          </svg>
          <span class="service-name">钱包</span>
          <span class="service-amount">¥0.86</span>
        </div>
      </div>
    </div>
  </template>

  <style scoped>
  .page {
    min-height: 100%;
    background-color: #f5f5f5;
  }

  /* ===== 导航栏 ===== */
  .nav-bar {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-top: env(safe-area-inset-top, 0px);
    background-color: #f5f5f5;
  }

  .nav-bar__back {
    position: absolute;
    left: 8px;
    width: 24px;
    height: 24px;
  }

  .nav-bar__title {
    font-size: 17px;
    font-weight: 600;
    color: #000000;
  }

  .nav-bar__more {
    position: absolute;
    right: 16px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .nav-bar__dot {
    width: 4px;
    height: 4px;
    background-color: #000000;
    border-radius: 50%;
  }

  /* ===== 绿色服务卡片 ===== */
  .service-card {
    background-color: #07c160;
    margin: 16px;
    border-radius: 16px;
    padding: 48px 24px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .service-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .service-icon {
    width: 48px;
    height: 48px;
  }

  .service-name {
    margin-top: 12px;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
  }

  .service-amount {
    margin-top: 4px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.75);
  }
  </style>
  ```

- [ ] **Step 2: 提交**

  ```bash
  git add src/pages/WeChatServices.vue
  git commit -m "feat: add WeChat services page with hand-drawn SVG icons"
  ```

---

### Task 2: 注册新页面到 `src/pages/index.js`

**Files:**
- Modify: `src/pages/index.js`

- [ ] **Step 1: 导入并注册新页面**

  将 `src/pages/index.js` 修改为：

  ```js
  import HelloWorld from './HelloWorld.vue'
  import WeChatServices from './WeChatServices.vue'

  export const pages = [
    {
      id: 'hello-world',
      name: 'Hello World',
      description: '基础示例页面',
      component: HelloWorld,
    },
    {
      id: 'wechat-services',
      name: '微信服务',
      description: '微信服务页面上侧还原',
      component: WeChatServices,
    },
  ]
  ```

- [ ] **Step 2: 提交**

  ```bash
  git add src/pages/index.js
  git commit -m "feat: register WeChat services page in page registry"
  ```

---

### Task 3: 构建验证

**Files:** 无需修改文件

- [ ] **Step 1: 运行生产构建**

  ```bash
  npm run build
  ```

  **Expected:**
  - Exit code 0
  - 无报错

- [ ] **Step 2: 浏览器验证**

  ```bash
  npm run dev
  ```

  打开 http://localhost:5173/ 验证：

  1. **列表页**：出现两张卡片——"Hello World"和"微信服务"
  2. **点击"微信服务"**：进入微信服务页面
  3. **页面内容验证**：
     - 顶部导航栏：左侧黑色返回箭头、中间"服务"标题、右侧三个黑圆点
     - 导航栏背景为浅灰色 `#F5F5F5`
     - 绿色卡片背景为 `#07C160`，圆角 16px
     - 左侧：白色收付款图标（四角框+对勾）+ "收付款"文字
     - 右侧：白色钱包图标（矩形+扣）+ "钱包"文字 + "¥0.86"
     - 所有图标和文字均为白色
  4. **点击返回**：回到列表页

---

## Self-Review

**1. Spec coverage:**

| 设计文档要求 | 实现任务 |
|-------------|---------|
| 浅灰背景 `#F5F5F5` | Task 1 Step 1 (`.page`) |
| 导航栏（返回箭头、服务标题、三个圆点） | Task 1 Step 1 (`.nav-bar` 及子元素) |
| 绿色卡片 `#07C160` | Task 1 Step 1 (`.service-card`) |
| 收付款图标（四角框+对勾 SVG） | Task 1 Step 1 (第一个 `<svg>`) |
| 钱包图标（矩形+扣 SVG） | Task 1 Step 1 (第二个 `<svg>`) |
| 文字样式（白色、字号、透明度） | Task 1 Step 1 (`.service-name`, `.service-amount`) |
| 安全区适配 | Task 1 Step 1 (`.nav-bar` padding-top) |
| 页面注册 | Task 2 Step 1 |

无遗漏。

**2. Placeholder scan:** 无 TBD、TODO 等占位符。所有步骤包含完整代码。

**3. Type consistency：** `pages` 数组字段一致（`id`, `name`, `description`, `component`），无命名冲突。
