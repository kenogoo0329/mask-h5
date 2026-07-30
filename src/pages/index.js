import HelloWorld from './HelloWorld.vue'
import WeChatServices from './WeChatServices.vue'

export const pages = [
  {
    id: 'hello-world',
    name: 'Hello World',
    description: '基础示例页面',
    component: HelloWorld,
    themeColor: '#ffffff',
  },
  {
    id: 'wechat-services',
    name: '微信服务',
    description: '微信服务页面还原',
    component: WeChatServices,
    themeColor: '#ededed',
  },
]
