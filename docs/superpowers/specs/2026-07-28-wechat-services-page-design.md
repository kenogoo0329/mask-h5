# 微信服务页面设计文档

## 目标

基于 `template_pic/微信上侧.png` 1:1 还原微信"服务"页面的上侧部分，新增为一个独立的预览页面。收付款和钱包图标使用 SVG 手绘实现。

## 参考图片

- `template_pic/微信上侧.png`

## 页面信息

| 属性 | 值 |
|------|-----|
| 页面名称 | 微信服务 |
| 文件路径 | `src/pages/WeChatServices.vue` |
| 注册 ID | `wechat-services` |

## 页面结构

```
<div class="page">                    <!-- 整体浅灰背景 -->
  <div class="nav-bar">               <!-- 导航栏 -->
    <BackArrow />                     <!-- 左侧返回箭头 SVG -->
    <h1 class="nav-title">服务</h1>   <!-- 中间标题 -->
    <MoreDots />                      <!-- 右侧三个圆点 SVG -->
  </div>

  <div class="service-card">          <!-- 绿色大卡片 -->
    <div class="service-item">        <!-- 左侧：收付款 -->
      <ScanCheckIcon />               <!-- 手绘 SVG：四角框+对勾 -->
      <span class="service-name">收付款</span>
    </div>
    <div class="service-item">        <!-- 右侧：钱包 -->
      <WalletIcon />                  <!-- 手绘 SVG：钱包轮廓+扣 -->
      <span class="service-name">钱包</span>
      <span class="service-amount">¥0.86</span>
    </div>
  </div>
</div>
```

## 视觉规格

| 元素 | 规格 |
|------|------|
| **页面背景** | `#F5F5F5`（微信浅灰） |
| **导航栏** | 高度 44px，背景 `#F5F5F5`，flex 水平排列，items 垂直居中 |
| **返回箭头** | 黑色 `#000000`，24×24 SVG，stroke-width 2，stroke-linecap round |
| **标题"服务"** | 黑色 `#000000`，17px，font-weight 600，绝对水平居中 |
| **三个圆点** | 黑色 `#000000`，三个直径 4px 的实心圆，横向间距 4px，右侧距边缘 16px |
| **绿色卡片** | 背景 `#07C160`，margin 16px，圆角 16px，padding 上下 48px、左右 24px |
| **内部两栏** | flex 布局，`justify-content: space-around`，每栏 flex-col 垂直居中 |
| **收付款图标** | 白色线条 SVG（`stroke="white"`），约 48×48，四角 L 形角标 + 中间对勾 |
| **钱包图标** | 白色线条 SVG（`stroke="white"`），约 48×48，矩形钱包轮廓 + 右侧半圆扣 |
| **"收付款"/"钱包"** | 白色 `#FFFFFF`，16px，font-weight 500，图标下方 margin-top 12px |
| **"¥0.86"** | 白色半透明 `rgba(255,255,255,0.75)`，14px，margin-top 4px |

## 图标 SVG 设计

### 收付款图标（ScanCheckIcon）

- 整体 viewBox="0 0 48 48"
- 四个角：L 形线条，形成扫描框的四个角
- 中间：对勾（check mark）线条
- 所有线条：白色，stroke-width 2.5，stroke-linecap round

### 钱包图标（WalletIcon）

- 整体 viewBox="0 0 48 48"
- 主体：圆角矩形钱包轮廓
- 右侧：一个圆形/半圆形扣（或短线段表示扣）
- 所有线条：白色，stroke-width 2.5，stroke-linecap round

## 注册方式

在 `src/pages/index.js` 中新增：

```js
import WeChatServices from './WeChatServices.vue'

export const pages = [
  // ... 现有页面
  {
    id: 'wechat-services',
    name: '微信服务',
    description: '微信服务页面上侧还原',
    component: WeChatServices,
  },
]
```

## 安全区适配

导航栏顶部增加 `padding-top: env(safe-area-inset-top, 0px)`，确保刘海屏设备不遮挡内容。

## 不在本次范围内

- 微信下侧的服务网格（金融理财、生活服务、交通出行等）
- 页面交互（收付款/钱包点击进入子页面）
- 数据动态化（钱包金额写死为 ¥0.86）
- 页面动画/过渡效果
