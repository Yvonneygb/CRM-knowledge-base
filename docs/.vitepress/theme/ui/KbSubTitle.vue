<template>
  <h4 class="kl-sub-title"><slot>{{ title }}</slot></h4>
</template>

<script setup>
// 紫色左边线小标题（模块内子标题）
defineProps({ title: { type: String, default: '' } })
</script>

<style scoped>
.kl-sub-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--kb-purple, #7c3aed);
  margin: 20px 0 8px 0;
  padding-left: 10px;
  border-left: 3px solid var(--kb-purple, #7c3aed);
  line-height: 1.4;
}
</style>
