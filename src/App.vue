<script setup>
import { computed, ref } from 'vue'
import { pages } from './pages/index.js'

const currentPageId = ref(null)

const currentPage = computed(() =>
  pages.find((p) => p.id === currentPageId.value)
)
</script>

<template>
  <div class="app">
    <!-- 页面预览列表 -->
    <div v-if="!currentPageId" class="preview-list">
      <div v-if="pages.length" class="preview-list__grid">
        <div
          v-for="page in pages"
          :key="page.id"
          class="preview-card"
          @click="currentPageId = page.id"
        >
          <h2 class="preview-card__name">{{ page.name }}</h2>
          <p v-if="page.description" class="preview-card__desc">
            {{ page.description }}
          </p>
        </div>
      </div>

      <div v-else class="preview-list__empty">
        <p>暂无页面</p>
        <p>请在 src/pages/index.js 中添加页面配置</p>
      </div>
    </div>

    <!-- 具体页面 -->
    <template v-else>
      <div class="page-view">
        <div class="back-bar" @click="currentPageId = null">
          <svg
            class="back-bar__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 19l-7-7 7-7"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="back-bar__text">返回</span>
        </div>
        <component :is="currentPage.component" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.app {
  min-height: 100%;
}

/* ===== 预览列表 ===== */
.preview-list {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 16px env(safe-area-inset-bottom, 0px);
  gap: 24px;
}

.preview-list__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  width: 100%;
  max-width: 400px;
  margin-top: 16px;
}

@media (min-width: 480px) {
  .preview-list__grid {
    grid-template-columns: repeat(2, 1fr);
    max-width: 560px;
  }
}

.preview-card {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: background 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.preview-card:active {
  background: rgba(255, 255, 255, 0.14);
}

.preview-card__name {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
}

.preview-card__desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.preview-list__empty {
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 16px;
  line-height: 1.6;
}

/* ===== 页面视图 ===== */
.page-view {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.back-bar {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 4px;
  cursor: pointer;
  flex-shrink: 0;
  padding-top: env(safe-area-inset-top, 0px);
  background-color: #ededed;
}

.back-bar__icon {
  display: none;
}

.back-bar__text {
  display: none;
}
</style>
