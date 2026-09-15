<template>
  <div class="kl-warn"><i v-if="icon" class="fa-solid fa-triangle-exclamation"></i><slot /></div>
</template>

<script setup>
// 红色警告框（禁止 / 风险 / 易错点）
defineProps({ icon: { type: Boolean, default: true } })
</script>

<style scoped>
.kl-warn {
  background: #fef2f2;
  border-left: 3px solid #ef4444;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 13px;
  color: #991b1b;
  margin: 8px 0;
}
.kl-warn :deep(p) { margin: 0; }
.kl-warn i { margin-right: 6px; }
</style>
