<template>
  <div class="kl-formula-box">
    <div v-if="label" class="kl-formula-label">{{ label }}</div>
    <div class="kl-formula-code"><slot /></div>
  </div>
</template>

<script setup>
// 紫色公式 / 计算逻辑框（用于金额、比例等公式展示）
defineProps({ label: { type: String, default: '' } })
</script>

<style scoped>
.kl-formula-box {
  background: #faf5ff;
  border-left: 3px solid #7c3aed;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 13px;
  color: #4c1d95;
  margin: 8px 0;
}
.kl-formula-label {
  font-size: 11px;
  font-weight: 600;
  color: #7c3aed;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.kl-formula-code {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #5b21b6;
  line-height: 1.6;
  white-space: pre-wrap;
}
</style>
