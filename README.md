# H5 PWA App

一个纯前端 H5 移动端 PWA 应用示例,支持用户通过浏览器"添加到主屏幕",在手机桌面生成带自定义图标和名称的类原生 App。.

## 技术栈

- **构建工具**: Vite 5
- **框架**: Vue 3
- **PWA**: vite-plugin-pwa(自动生成 manifest + Service Worker)
- **图标生成**: @vite-pwa/assets-generator(从 SVG 生成多尺寸 PNG)

## 本地开发

```bash
# 安装依赖
npm install

# 生成 PWA 图标(首次或更新 source.svg 后执行)
npm run generate-pwa-assets

# 启动开发服务器(localhost 下 Service Worker 可用)
npm run dev

# 生产构建(产出 dist/ 纯静态文件)
npm run build

# 预览生产构建
npm run preview
```

开发服务器启动后访问 http://localhost:5173/ 。

## 目录结构

```
项目根目录/
├── index.html              # HTML 入口(移动端 viewport + iOS meta + 图标引用)
├── package.json
├── vite.config.js          # Vite + vite-plugin-pwa 配置
├── pwa-assets.config.js    # 图标生成器配置
├── public/
│   └── pwa-assets/
│       ├── source.svg                  # 占位图标 SVG 源
│       ├── pwa-192x192.png             # 生成的多尺寸图标
│       ├── pwa-512x512.png
│       ├── maskable-icon-512x512.png   # Android 自适应图标
│       ├── apple-touch-icon-180x180.png # iOS 桌面图标
│       └── favicon.ico
└── src/
    ├── main.js             # Vue 挂载 + PWA 注册
    ├── App.vue             # HelloWorld 页面 + iOS 添加桌面引导
    └── styles/main.css     # 移动端全局样式
```

## 自定义应用

| 想改什么 | 改哪里 |
|----------|--------|
| 应用名称 | `vite.config.js` 里 `manifest.name` / `short_name` |
| 应用图标 | 替换 `public/pwa-assets/source.svg` 后跑 `npm run generate-pwa-assets` |
| 主题色 | `vite.config.js` 的 `theme_color` + `src/styles/main.css` 的 CSS 变量 |
| 加页面 | 安装 `vue-router`,PWA 配置无需改动 |

## 远程访问与部署

PWA 的 Service Worker 要求 **HTTPS**(localhost 例外),因此远程访问必须用 HTTPS 地址。以下方案均满足要求。

### 方案一:内网穿透(临时调试,即时生效)

适合让手机临时访问本机 dev server,无需先 build。

#### localtunnel(最快,无需注册)

```bash
npx localtunnel --port 5173
# 输出类似:your url is: https://random-words.loca.lt
```

手机浏览器打开该 HTTPS 地址即可。每次重启 URL 会变,适合临时调试。

#### cloudflared(更稳定,需 Cloudflare 账号)

```bash
# Windows 安装
winget install --id Cloudflare.cloudflared

# 启动隧道
cloudflared tunnel --url http://localhost:5173
# 输出 https://xxx.trycloudflare.com
```

速度和稳定性优于 localtunnel。

### 方案二:公网静态托管(长期使用,推荐)

把 `npm run build` 产出的 `dist/` 部署到以下平台,获得永久 HTTPS 地址。

| 平台 | 免费额度 | 自定义域名 | 部署方式 |
|------|----------|-----------|----------|
| Cloudflare Pages | 无限请求 + 500 次构建/月 | 免费 | 连 GitHub 自动构建 |
| Vercel | 100GB 流量/月 | 免费 | 连 GitHub 自动构建 |
| Netlify | 100GB 流量/月 + 300 分钟构建 | 免费 | 连 GitHub 自动构建 |
| GitHub Pages | 无限(仅静态) | 仅 `username.github.io/repo` | git push |

#### Vercel 部署

```bash
npm i -g vercel
vercel          # 首次部署,按提示登录并确认
vercel --prod   # 部署到生产环境
```

Vercel 会自动识别 Vite,build 命令为 `npm run build`,输出目录 `dist`。

#### Cloudflare Pages 部署

1. 把项目推到 GitHub
2. 登录 https://pages.cloudflare.com -> Create project -> Connect to Git
3. 选择仓库,填写:
   - 构建命令:`npm run build`
   - 输出目录:`dist`
4. 点击 Deploy,等待完成得到 `https://xxx.pages.dev`

### 部署到子路径的注意事项

如果部署到非根路径(如 GitHub Pages 的 `https://user.github.io/repo/`),需要修改 `vite.config.js`:

```js
export default defineConfig({
  base: '/repo/',  // 子路径
  plugins: [
    VitePWA({
      // ...
      manifest: {
        scope: '/repo/',
        start_url: '/repo/',
        // icons 路径会自动加上 base,无需手动改
      },
    }),
  ],
})
```

## PWA 验证

部署后,用 Chrome DevTools 验证:

- **Application -> Manifest**:查看应用名称、图标、display 模式是否正确
- **Application -> Service Workers**:确认 SW 已注册并激活
- **Application -> Storage**:查看缓存条目
- **Lighthouse**:跑一次 PWA 审计,确认各项达标

## 平台兼容性说明

| 平台/浏览器 | 安装方式 | 备注 |
|-------------|----------|------|
| Android Chrome | 自动弹安装提示 / 菜单添加 | 体验最接近原生 App |
| Android Edge/Firefox | 菜单添加 | |
| iOS Safari | 手动:分享 -> 添加到主屏幕 | 无自动提示,页面内有引导卡片 |
| iOS Chrome/微信内置 | 不支持 | 需先"在 Safari 中打开" |
| 桌面 Chrome/Edge | 地址栏右侧安装按钮 | 可装到任务栏 |

## 已知限制

- iOS Safari 会在用户 7 天不访问后清理 Service Worker 缓存
- iOS 微信/QQ 内置浏览器不支持添加桌面,需引导用户在系统浏览器打开
- Service Worker 必须在 HTTPS 或 localhost 下运行
