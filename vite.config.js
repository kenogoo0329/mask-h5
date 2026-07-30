import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/mask-h5/',
  server: {
    allowedHosts: true,
    host: true,
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'pwa-assets/favicon.ico',
        'pwa-assets/apple-touch-icon-180x180.png',
      ],
      manifest: {
        name: 'H5 PWA App',
        short_name: 'H5 App',
        description: '一个纯前端 H5 PWA 应用示例',
        theme_color: '#07C160',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/mask-h5/',
        start_url: '/mask-h5/',
        icons: [
          {
            src: 'pwa-assets/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-assets/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-assets/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === self.location.origin,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'app-runtime',
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
})
