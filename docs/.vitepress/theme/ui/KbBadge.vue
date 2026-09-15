<template>
  <span class="kl-badge" :class="type"><slot>{{ text }}</slot></span>
</template>

<script setup>
// 状态徽章 / 标签：紫色为主，支持 red/orange/green/yellow 语义色
defineProps({
  type: {
    type: String,
    default: 'purple',
    validator: (v) => ['purple', 'red', 'orange', 'green', 'yellow'].includes(v),
  },
  text: { type: String, default: '' },
})
</script>

<style scoped>
.kl-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  vertical-align: middle;
  line-height: 1.6;
  background: rgba(124, 58, 237, 0.1);
  color: #7c3aed;
}
.kl-badge.red { background: rgba(220, 38, 38, 0.1); color: #dc2626; }
.kl-badge.orange { background: rgba(234, 88, 12, 0.1); color: #ea580c; }
.kl-badge.green { background: rgba(22, 163, 74, 0.1); color: #16a34a; }
.kl-badge.yellow { background: rgba(234, 179, 8, 0.12); color: #b45309; }
</style>
