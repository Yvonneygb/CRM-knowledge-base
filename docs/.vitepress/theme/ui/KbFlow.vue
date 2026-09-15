<template>
  <div class="dlm-flow">
    <template v-for="(node, i) in nodes" :key="i">
      <div class="dlm-flow-node" :class="`dlm-flow-${node.type || 'any'}`">
        <i v-if="node.icon" :class="node.icon" style="margin-right:6px"></i>{{ node.label }}
      </div>
      <div v-if="i < nodes.length - 1" class="dlm-flow-arrow">
        <i class="fa-solid fa-arrow-right"></i>
      </div>
    </template>
  </div>
</template>

<script setup>
// 状态机流转：用不同语义色区分节点状态
// type: new(新建/蓝) run(进行中/橙) approved(通过/绿) rejected(驳回/红) any(灰) cancel(取消/浅灰)
defineProps({
  nodes: { type: Array, default: () => [] }, // [{ label, type?, icon? }]
})
</script>

<style scoped>
.dlm-flow {
  display: flex;
  align-items: center;
  gap: 0;
  flex-wrap: wrap;
  margin: 8px 0;
}
.dlm-flow-node {
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  line-height: 1.4;
  flex-shrink: 0;
}
.dlm-flow-new { background: #eff6ff; border: 2px solid #93c5fd; color: #1e40af; }
.dlm-flow-run { background: #fef3c7; border: 2px solid #fcd34d; color: #92400e; }
.dlm-flow-approved { background: #f0fdf4; border: 2px solid #86efac; color: #166534; }
.dlm-flow-rejected { background: #fef2f2; border: 2px solid #fca5a5; color: #991b1b; }
.dlm-flow-any { background: #f3f4f6; border: 2px solid #d1d5db; color: #374151; }
.dlm-flow-cancel { background: #f9fafb; border: 2px solid #e5e7eb; color: #374151; }
.dlm-flow-arrow {
  padding: 0 12px;
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
  flex-shrink: 0;
}
</style>
