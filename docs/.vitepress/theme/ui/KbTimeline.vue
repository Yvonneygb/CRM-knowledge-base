<template>
  <div class="biz-tl">
    <div v-for="(item, i) in items" :key="i" class="biz-tl-item">
      <div class="biz-tl-date">{{ item.date }}</div>
      <h6>{{ item.title }}</h6>
      <p v-if="item.desc">{{ item.desc }}</p>
    </div>
  </div>
</template>

<script setup>
// 竖向时间轴（如历史排查记录）
defineProps({
  items: { type: Array, default: () => [] }, // [{ date, title, desc? }]
})
</script>

<style scoped>
.biz-tl {
  border-left: 2px solid #ede9fe;
  padding-left: 24px;
  margin: 16px 0 20px;
}
.biz-tl-item {
  position: relative;
  margin-bottom: 20px;
}
.biz-tl-item::before {
  content: '';
  position: absolute;
  left: -31px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--kb-purple, #7c3aed);
  border: 2.5px solid #fff;
  box-shadow: 0 0 0 2px var(--kb-purple, #7c3aed);
}
.biz-tl-date {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--kb-purple, #7c3aed);
  margin-bottom: 4px;
}
.biz-tl-item h6 {
  font-size: 0.88rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 4px;
}
.biz-tl-item p {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}
</style>
