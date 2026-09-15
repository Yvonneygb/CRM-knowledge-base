<template>
  <div class="kl-two-col">
    <div class="kl-col-box" :class="leftType">
      <div v-if="leftTitle" class="kl-col-title">{{ leftTitle }}</div>
      <div class="kl-col-items"><slot name="left">{{ left }}</slot></div>
    </div>
    <div class="kl-col-box" :class="rightType">
      <div v-if="rightTitle" class="kl-col-title">{{ rightTitle }}</div>
      <div class="kl-col-items"><slot name="right">{{ right }}</slot></div>
    </div>
  </div>
</template>

<script setup>
// 两栏对比：常用于「通过 / 不通过」「本质 / 误区」等对照
defineProps({
  leftTitle: { type: String, default: '' },
  rightTitle: { type: String, default: '' },
  left: { type: String, default: '' },
  right: { type: String, default: '' },
  leftType: { type: String, default: 'pass' }, // pass | cancel | gray | info | warn
  rightType: { type: String, default: 'cancel' },
})
</script>

<style scoped>
.kl-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 8px 0;
}
.kl-col-box {
  border-radius: 10px;
  padding: 14px 16px;
  font-size: 13px;
  line-height: 1.6;
}
.kl-col-box.pass { background: #f0fdf4; border: 1px solid #86efac; color: #166534; }
.kl-col-box.cancel { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
.kl-col-box.gray { background: #f9fafb; border: 1px solid #e5e7eb; color: #374151; }
.kl-col-box.info { background: #eff6ff; border: 1px solid #93c5fd; color: #1e40af; }
.kl-col-box.warn { background: #fffbeb; border: 1px solid #fcd34d; color: #92400e; }
.kl-col-title {
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 6px;
}
.kl-col-items { font-size: 13px; line-height: 1.7; }
@media (max-width: 768px) {
  .kl-two-col { grid-template-columns: 1fr; }
}
</style>
