<script setup></script>

<template>
  <div class="hello">
    <h1 class="hello__title">Hello World</h1>
  </div>
</template>

<style scoped>
.hello {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px)
    env(safe-area-inset-bottom, 0px) env(safe-area-inset-left, 0px);
}

.hello__title {
  font-size: 32px;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: 0.5px;
}
</style>
