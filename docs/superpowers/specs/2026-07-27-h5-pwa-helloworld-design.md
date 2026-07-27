# H5 PWA HelloWorld 应用设计文档

## 目标

搭建一个纯前端的 H5 移动端网页应用,支持用户通过浏览器"添加到主屏幕",在手机桌面生成带自定义图标和名称的类原生 App。首个页面为 HelloWorld。

## 可行性结论

完全可行。核心技术为 PWA (Progressive Web App),包含 `manifest.json` + Service Worker,浏览器原生支持,无需后端。

## 技术栈

- **构建工具**: Vite 5
- **框架**: Vue 3 (单文件组件)
- **PWA**: `vite-plugin-pwa` (自动生成 manifest + Service Worker)
- **图标生成**: `@vite-pwa/assets-generator` (从 SVG 生成多尺寸 PNG)
- **语言**: JavaScript (后续可升级 TypeScript)

## 目录结构

```
项目根目录/
├── index.html              # HTML 入口,含 iOS meta 标签
├── package.json            # 依赖与脚本
├── vite.config.js          # Vite + PWA 插件配置
├── public/
│   └── pwa-assets/
│       └── source.svg      # 占位图标 SVG 源
├── src/
│   ├── main.js             # Vue 应用挂载 + PWA 注册
│   ├── App.vue             # HelloWorld 根组件 + iOS 引导
│   └── styles/
│       └── main.css        # 全局移动端样式
```

## PWA 配置要点

- `registerType: 'autoUpdate'`
- `manifest`:
  - `name`: "H5 PWA App"
  - `short_name`: "H5 App"
  - `display: 'standalone'`
  - `theme_color` / `background_color`: #42b883 (Vue 绿)
  - `icons`: 192/512 + 512 maskable
- `workbox`: precache 产物 + 图片运行时缓存

## 移动端体验细节

- viewport 禁止缩放 (`user-scalable=no`)
- 适配刘海屏: `env(safe-area-inset-*)`
- 去除点击高亮、300ms 延迟
- iOS 状态栏主题色: `apple-mobile-web-app-status-bar-style`

## iOS 引导添加桌面

- 检测 iOS Safari 且非 standalone 模式时显示引导卡片
- 提示: 分享 -> 添加到主屏幕
- standalone 模式下自动隐藏

## 运行与验证

- `npm install`
- `npm run dev` (localhost 下 Service Worker 可用)
- `npm run build` 产出 `dist/`
- `npm run preview` 预览生产构建
- Chrome DevTools -> Application -> Manifest 验证

## 不在本次范围内

- 后端接口、登录系统
- 多页面路由
- 复杂离线策略
- 单元测试
