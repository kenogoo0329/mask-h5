<script setup>
import { ref } from 'vue'
import wechatBottom from '../../template_pic/微信下侧.png'
import wechatBase from '../../template_pic/微信底侧.png'

const amount = ref('0.86')
</script>

<template>
  <div class="page">
    <!-- 导航栏 -->
    <div class="nav-bar">
      <svg class="nav-bar__back" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 19l-7-7 7-7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <h1 class="nav-bar__title">服务</h1>
      <div class="nav-bar__more">
        <span class="nav-bar__dot"></span>
        <span class="nav-bar__dot"></span>
        <span class="nav-bar__dot"></span>
      </div>
    </div>

    <div class="content-wrap">
      <!-- 绿色服务卡片（上侧） -->
      <div class="service-card">
        <div class="service-item">
          <svg class="service-icon" viewBox="0 0 48 48" fill="none">
            <path d="M6 14V6h8" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M34 6h8v8" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 34v8h8" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M34 42h8v-8" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 24l5 5 11-11" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="service-text">
            <span class="service-name">收付款</span>
          </div>
        </div>
        <div class="service-item">
          <svg class="service-icon" viewBox="0 0 48 48" fill="none">
            <rect x="6" y="6" width="36" height="36" rx="4" stroke="white" stroke-width="2.5"/>
            <path d="M6 16h36" stroke="white" stroke-width="2.5"/>
            <circle cx="36" cy="24" r="6" stroke="white" stroke-width="2.5"/>
          </svg>
          <div class="service-text">
            <span class="service-name">钱包</span>
            <span class="service-amount">¥<span class="amount-input" contenteditable @input="amount = $event.target.innerText" @keydown.enter.prevent>{{ amount }}</span></span>
          </div>
        </div>
      </div>

      <!-- 下侧截图 -->
      <img :src="wechatBottom" class="bottom-image" alt="微信服务下侧" />

      <!-- 底侧截图 -->
      <img :src="wechatBase" class="base-image" alt="微信服务底侧" />
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  background-color: #ededed;
}

/* ===== 导航栏 ===== */
.nav-bar {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: env(safe-area-inset-top, 0px);
  background-color: #ededed;
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

/* ===== 内容容器 ===== */
.content-wrap {
  padding: 16px;
  padding-bottom: 0;
}

/* ===== 绿色服务卡片 ===== */
.service-card {
  background-color: #07c160;
  border-radius: 16px;
  padding: 0 24px;
  margin-bottom: 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 140px;
}

.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
}

.service-icon {
  width: 44px;
  height: 44px;
}

.service-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  min-height: 42px;
}

.service-name {
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  line-height: 21px;
}

.service-amount {
  margin-top: 2px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 18px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  width: fit-content;
}

.amount-input {
  display: inline;
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px;
  outline: none;
  min-width: 1ch;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
}

/* ===== 下侧截图 ===== */
.bottom-image {
  display: block;
  width: 100%;
  border-radius: 0;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* ===== 底侧截图 ===== */
.base-image {
  display: block;
  width: 100%;
  border-radius: 0 0 12px 12px;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}
</style>
