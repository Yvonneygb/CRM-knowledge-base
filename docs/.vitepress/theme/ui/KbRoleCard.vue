<template>
  <div class="biz-role-card">
    <div class="biz-role-badge" :class="color">{{ badge }}</div>
    <h5>{{ title }}</h5>
    <p><slot>{{ desc }}</slot></p>
  </div>
</template>

<script setup>
// 角色卡：用于角色职责说明（扁平卡片 + 彩色徽章）
defineProps({
  badge: { type: String, default: '角' },
  title: { type: String, default: '' },
  desc: { type: String, default: '' },
  color: {
    type: String,
    default: 'purple',
    validator: (v) =>
      ['blue', 'purple', 'green', 'orange', 'red', 'cyan', 'gray'].includes(v),
  },
})
</script>

<style scoped>
.biz-role-card {
  border: 1.5px solid #ede9fe;
  border-radius: 12px;
  padding: 14px 16px;
  background: #fafafa;
}
.biz-role-badge {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.8rem;
  color: #fff;
  margin-bottom: 10px;
}
.biz-role-badge.blue { background: #3b82f6; }
.biz-role-badge.purple { background: #7c3aed; }
.biz-role-badge.green { background: #16a34a; }
.biz-role-badge.orange { background: #f97316; }
.biz-role-badge.red { background: #ef4444; }
.biz-role-badge.cyan { background: #0891b2; }
.biz-role-badge.gray { background: #6b7280; }
.biz-role-card h5 {
  font-size: 0.88rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 6px;
}
.biz-role-card p {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}
</style>
