import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'
import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true })

createApp(App).mount('#app')
