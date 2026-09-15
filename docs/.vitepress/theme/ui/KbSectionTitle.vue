<template>
  <h2 class="kl-section-title"><slot>{{ title }}</slot></h2>
</template>

<script setup>
// 章节大标题（带下划线分隔）
defineProps({ title: { type: String, default: '' } })
</script>

<style scoped>
.kl-section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}
</style>
