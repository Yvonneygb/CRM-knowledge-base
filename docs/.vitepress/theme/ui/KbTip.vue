<template>
  <div class="kl-tip"><i v-if="icon" class="fa-solid fa-lightbulb"></i><slot /></div>
</template>

<script setup>
// 橙色实操提示框（注意事项 / 操作建议）
defineProps({ icon: { type: Boolean, default: true } })
</script>

<style scoped>
.kl-tip {
  background: #fef3c7;
  border-left: 3px solid #f59e0b;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 13px;
  color: #92400e;
  margin: 8px 0;
  line-height: 1.6;
}
.kl-tip :deep(p) { margin: 0; }
.kl-tip i { margin-right: 6px; }
</style>
