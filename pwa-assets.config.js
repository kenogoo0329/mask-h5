import { defineConfig } from '@vite-pwa/assets-generator/config'
import { minimal2023Preset } from '@vite-pwa/assets-generator/presets/minimal-2023'

export default defineConfig({
  preset: minimal2023Preset,
  images: ['public/pwa-assets/source.svg'],
})
