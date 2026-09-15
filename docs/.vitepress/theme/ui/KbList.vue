<template>
  <ul class="kl-list" :class="{ plain }">
    <li v-for="(item, i) in items" :key="i">
      <slot name="item" :item="item" :index="i">{{ item }}</slot>
    </li>
  </ul>
</template>

<script setup>
// 有序 / 无序列表：默认带紫色序号圆；plain 为无序号项目符号列表
defineProps({
  items: { type: Array, default: () => [] },
  plain: { type: Boolean, default: false },
})
</script>

<style scoped>
.kl-list {
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: klitem;
}
.kl-list li {
  padding: 8px 0 8px 32px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  position: relative;
  counter-increment: klitem;
}
.kl-list li:last-child { border-bottom: none; }
.kl-list li::before {
  content: counter(klitem);
  position: absolute;
  left: 0;
  top: 8px;
  width: 22px;
  height: 22px;
  background: var(--kb-purple, #7c3aed);
  color: #fff;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.kl-list.plain li::before { display: none; }
.kl-list.plain li { padding-left: 0; }
</style>
