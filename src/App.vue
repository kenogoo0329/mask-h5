<script setup>
import { ref } from 'vue'

const activeCard = ref('main')

function selectCard(card) {
  activeCard.value = card
}
</script>


<template>
  <div class="page">
    <!-- 顶部深色区域 -->
    <div class="top-section">
      <!-- 状态栏 -->
      <div class="status-bar">
        <span class="status-time">23:39</span>
        <div class="status-icons">
          <svg class="icon-signal" viewBox="0 0 18 12" fill="none">
            <rect x="14" y="2" width="3" height="10" rx="0.5" fill="white" />
            <rect x="9" y="4" width="3" height="8" rx="0.5" fill="white" />
            <rect x="4" y="6" width="3" height="6" rx="0.5" fill="white" />
            <rect x="0" y="8" width="2" height="4" rx="0.5" fill="white" />
          </svg>
          <svg class="icon-wifi" viewBox="0 0 16 12" fill="none">
            <path d="M8 0L0 8h2l6-6 6 6h2L8 0z" fill="white" />
            <path d="M8 4L3 9h2l3-3 3 3h2L8 4z" fill="white" />
          </svg>
          <div class="icon-battery">
            <span class="battery-percent">71%</span>
            <div class="battery-shell">
              <div class="battery-body">
                <div class="battery-fill" style="width: 71%"></div>
              </div>
              <div class="battery-cap"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 导航栏 -->
      <div class="nav-bar">
        <div class="nav-back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div class="nav-title">账户总览</div>
        <div class="nav-more">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="6" cy="12" r="1.5" fill="white" />
            <circle cx="12" cy="12" r="1.5" fill="white" />
            <circle cx="18" cy="12" r="1.5" fill="white" />
          </svg>
        </div>
      </div>

      <!-- 通知条 -->
      <div class="notification">
        <div class="notify-avatar"></div>
        <div class="notify-text">你的账户入账825.69元</div>
      </div>

      <!-- 资产卡片区 -->
      <div class="asset-cards">
        <div
          class="asset-card asset-card--main"
          :class="{
            'is-active': activeCard === 'main',
            'is-inactive': activeCard === 'sub',
          }"
          @click="selectCard('main')"
        >
          <div class="card-inner">
            <div class="asset-label">总资产</div>
            <div class="asset-amount-row">
              <span class="asset-amount">854,486.59</span>
              <svg class="asset-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div class="asset-btn" :class="{ 'is-hidden': activeCard !== 'main' }">查看收益</div>
          </div>
        </div>
        <div
          class="asset-card asset-card--sub"
          :class="{
            'is-active': activeCard === 'sub',
            'is-inactive': activeCard === 'main',
          }"
          @click="selectCard('sub')"
        >
          <div class="card-inner">
            <div class="sub-label">本月剩余应还</div>
            <div class="sub-amount">0</div>
            <div class="sub-extra" :class="{ 'is-hidden': activeCard !== 'sub' }">总负债 0</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 白色内容卡片 -->
    <div class="content-sheet">
      <div class="quick-money">活钱 854,486.59</div>

      <div class="list">
        <div class="list-item">
          <div class="item-left">
            <span class="item-title">直接可用</span>
            <svg class="item-arrow-down" width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div class="item-right">
            <span class="item-desc amount">854,486.59</span>
            <svg class="item-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="#CCCCCC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>

        <div class="list-item">
          <span class="item-title">快速赎回</span>
          <div class="item-right">
            <span class="item-desc">最高7日年化收益率1.62%</span>
            <svg class="item-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="#CCCCCC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>

        <div class="section-label">投资</div>

        <div class="list-item">
          <span class="item-title">理财</span>
          <div class="item-right">
            <span class="item-desc">买理财，来招行</span>
            <svg class="item-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="#CCCCCC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>

        <div class="list-item">
          <span class="item-title">基金</span>
          <div class="item-right">
            <span class="item-desc">手把手投资入门，新手专享</span>
            <svg class="item-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="#CCCCCC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>

        <div class="list-item">
          <span class="item-title">存款</span>
          <div class="item-right">
            <span class="item-desc">多种期限，保本保息</span>
            <svg class="item-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="#CCCCCC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>

        <div class="list-item">
          <span class="item-title">黄金</span>
          <div class="item-right">
            <span class="item-desc">进入黄金专区</span>
            <svg class="item-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="#CCCCCC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>

        <div class="list-item">
          <span class="item-title">保险</span>
          <div class="item-right">
            <span class="item-desc">首份保单，轻松入门</span>
            <svg class="item-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="#CCCCCC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 Tab Bar -->
    <div class="tab-bar">
      <div class="tab-item">
        <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span class="tab-label">首页</span>
      </div>
      <div class="tab-item">
        <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
        <span class="tab-label">社区</span>
      </div>
      <div class="tab-item tab-item--active">
        <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="#2B6AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
        <span class="tab-label">理财</span>
      </div>
      <div class="tab-item">
        <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
        </svg>
        <span class="tab-label">生活</span>
      </div>
      <div class="tab-item">
        <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span class="tab-label">我的</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  background: #2e3546;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

/* ===== 顶部深色区 ===== */
.top-section {
  flex-shrink: 0;
  padding-top: env(safe-area-inset-top, 0px);
}

/* 状态栏 */
.status-bar {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  color: #fff;
}

.status-time {
  font-size: 15px;
  font-weight: 600;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 5px;
}

.icon-signal {
  width: 18px;
  height: 12px;
}

.icon-wifi {
  width: 16px;
  height: 12px;
}

.icon-battery {
  display: flex;
  align-items: center;
  gap: 2px;
}

.battery-percent {
  font-size: 12px;
  font-weight: 600;
}

.battery-shell {
  display: flex;
  align-items: center;
}

.battery-body {
  width: 22px;
  height: 11px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 2px;
  padding: 1px;
}

.battery-fill {
  height: 100%;
  background: #fff;
  border-radius: 1px;
}

.battery-cap {
  width: 1.5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 0 1px 1px 0;
  margin-left: 1px;
}

/* 导航栏 */
.nav-bar {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
}

.nav-back,
.nav-more {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-title {
  font-size: 17px;
  font-weight: 500;
  color: #fff;
}

/* 通知条 */
.notification {
  display: flex;
  align-items: center;
  padding: 8px 16px 12px;
  gap: 8px;
}

.notify-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    #ff6b9d 0%,
    #feca57 30%,
    #48dbfb 60%,
    #a29bfe 100%
  );
  flex-shrink: 0;
}

.notify-text {
  color: #fff;
  font-size: 14px;
}

/* 资产卡片区 */
.asset-cards {
  display: flex;
  padding: 4px 16px 32px;
  perspective: 800px;
}

.asset-card {
  flex: 1;
  min-height: 110px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 14px 16px;
  transition: all 0.45s cubic-bezier(0.32, 0.72, 0, 1);
  cursor: pointer;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
  transform-style: preserve-3d;
}

.asset-card.is-active {
  flex: 2.2;
  z-index: 2;
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateZ(30px) scale(1.02);
}

.asset-card--main.is-active {
  margin-right: -20px;
}

.asset-card--sub.is-active {
  margin-left: -20px;
}

.asset-card.is-inactive {
  flex: 0.55;
  z-index: 0;
  opacity: 0.45;
  transform: translateZ(-30px) scale(0.88);
}

.card-inner {
  min-width: 140px;
  white-space: nowrap;
}

.asset-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.asset-amount-row {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
}

.asset-amount {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.5px;
}

.asset-arrow {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.asset-btn {
  display: inline-flex;
  align-items: center;
  margin-top: 8px;
  padding: 3px 10px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 12px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
  height: 24px;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.asset-btn.is-hidden {
  opacity: 0;
  visibility: hidden;
}

.sub-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.sub-amount {
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  margin-top: 4px;
}

.sub-extra {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 8px;
  height: 20px;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.sub-extra.is-hidden {
  opacity: 0;
  visibility: hidden;
}

/* ===== 白色内容卡片 ===== */
.content-sheet {
  background: #fff;
  border-radius: 24px 24px 0 0;
  margin-top: -24px;
  padding-top: 16px;
  flex: 1;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.12);
  position: relative;
  z-index: 1;
}

.quick-money {
  text-align: center;
  color: #2b6aff;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 12px;
}

/* 列表 */
.list-item {
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
}

.item-left {
  display: flex;
  align-items: center;
  gap: 4px;
}

.item-title {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
}

.item-arrow-down {
  width: 10px;
  height: 6px;
  flex-shrink: 0;
}

.item-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.item-desc {
  font-size: 14px;
  color: #999999;
  white-space: nowrap;
}

.item-desc.amount {
  color: #1a1a1a;
  font-weight: 500;
}

.item-chevron {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* 分组标签 */
.section-label {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: #c68b5e;
  font-size: 13px;
  font-weight: 500;
  border-bottom: 1px solid #f2f2f2;
}

/* ===== 底部 Tab Bar ===== */
.tab-bar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 56px;
  background: #fff;
  border-top: 1px solid #f2f2f2;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  flex-shrink: 0;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  flex: 1;
  height: 100%;
}

.tab-icon {
  width: 22px;
  height: 22px;
}

.tab-label {
  font-size: 10px;
  color: #999999;
}

.tab-item--active .tab-label {
  color: #2b6aff;
}
</style>
