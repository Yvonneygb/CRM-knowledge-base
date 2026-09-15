<template>
  <div class="biz-steps">
    <template v-for="(step, i) in steps" :key="i">
      <div class="biz-step-item">
        <div class="biz-step-circle">{{ i + 1 }}</div>
        <h5>{{ step.title }}</h5>
        <small v-if="step.desc">{{ step.desc }}</small>
      </div>
      <div v-if="i < steps.length - 1" class="biz-step-arrow">
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    </template>
  </div>
</template>

<script setup>
// 水平步骤流程（如业务操作步骤）
defineProps({
  steps: { type: Array, default: () => [] }, // [{ title, desc? }]
})
</script>

<style scoped>
.biz-steps {
  display: flex;
  align-items: center;
  gap: 0;
  margin: 16px 0 20px;
  overflow-x: auto;
  padding-bottom: 4px;
}
.biz-step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 140px;
  flex: 1;
}
.biz-step-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #ede9fe;
  border: 2.5px solid var(--kb-purple, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1rem;
  color: var(--kb-purple, #7c3aed);
  margin-bottom: 10px;
}
.biz-step-item h5 {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 4px;
  text-align: center;
}
.biz-step-item small {
  font-size: 0.75rem;
  color: #9ca3af;
  text-align: center;
}
.biz-step-arrow {
  font-size: 1.2rem;
  color: #d1d5db;
  margin: 0 4px;
  flex-shrink: 0;
  margin-bottom: 18px;
}
</style>
