<template>
  <div class="biz-hero">
    <div v-if="num !== null && num !== undefined" class="biz-hero-num">{{ num }}</div>
    <div class="biz-hero-body">
      <h1>{{ title }}</h1>
      <p><slot>{{ desc }}</slot></p>
    </div>
  </div>
</template>

<script setup>
// 业务介绍大卡：扁平白卡 + 大号编号，置于页面顶部
defineProps({
  num: { type: [String, Number], default: null },
  title: { type: String, default: '' },
  desc: { type: String, default: '' },
})
</script>

<style scoped>
.biz-hero {
  background: #fff;
  border: 1.5px solid #ede9fe;
  border-top: 4px solid var(--kb-purple, #7c3aed);
  border-radius: 16px;
  padding: 40px 48px 36px;
  margin-bottom: 28px;
  display: flex;
  align-items: flex-start;
  gap: 32px;
}
.biz-hero-num {
  font-size: 72px;
  font-weight: 900;
  color: #ede9fe;
  line-height: 1;
  flex-shrink: 0;
  font-family: 'Courier New', monospace;
  letter-spacing: -4px;
  user-select: none;
}
.biz-hero-body { flex: 1; }
.biz-hero h1 {
  font-size: 1.9rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 10px;
  letter-spacing: 0.01em;
}
.biz-hero p {
  color: #475569;
  font-size: 1rem;
  margin: 0;
  line-height: 1.8;
}
@media (max-width: 768px) {
  .biz-hero { padding: 24px; gap: 16px; }
  .biz-hero-num { font-size: 48px; }
}
</style>
