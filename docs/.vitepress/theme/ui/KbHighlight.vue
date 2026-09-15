<template>
  <span class="kl-highlight" :class="{ deep }"><slot /></span>
</template>

<script setup>
// 行内高亮文字（强调关键词）
defineProps({ deep: { type: Boolean, default: false } })
</script>

<style scoped>
.kl-highlight {
  background: rgba(124, 58, 237, 0.12);
  color: #7c3aed;
  padding: 0 4px;
  border-radius: 4px;
  font-weight: 600;
}
.kl-highlight.deep { background: rgba(124, 58, 237, 0.2); color: #6d28d9; }
</style>
