<template>
  <blockquote class="kb-quote"><slot /></blockquote>
</template>

<script setup>
// 引用块：紫色左边线，用于补充说明 / 引用来源
</script>

<style scoped>
.kb-quote {
  border-left: 3px solid var(--kb-purple, #7c3aed);
  background: rgba(124, 58, 237, 0.06);
  border-radius: 0 4px 4px 0;
  padding: 12px 16px;
  margin: 12px 0;
  color: #6b7280;
  font-size: 0.9rem;
}
.kb-quote :deep(p) { margin: 0; }
</style>
