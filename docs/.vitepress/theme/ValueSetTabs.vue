<template>
  <div class="vs-tabs-bar">
    <div class="vs-tabs-inner">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="vs-tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="switchTab(tab.id)"
      >
        <svg v-if="tab.id==='intro'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <svg v-if="tab.id==='overview'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        <svg v-if="tab.id==='detail'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
        <svg v-if="tab.id==='translate'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
        <span>{{ tab.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const tabs = [
  { id: 'intro', label: '值集简介' },
  { id: 'overview', label: '涉及菜单概览' },
  { id: 'detail', label: '涉及详细逻辑' },
  { id: 'translate', label: '值集翻译方式汇总' },
]

const activeTab = ref('intro')

function applyTabVisibility() {
  const sectionIds = tabs.map(t => t.id)
  sectionIds.forEach(id => {
    const el = document.getElementById('vs-' + id)
    if (el) {
      el.style.display = id === activeTab.value ? '' : 'none'
    }
  })
}

function switchTab(id) {
  activeTab.value = id
}

watch(activeTab, () => {
  applyTabVisibility()
})

onMounted(() => {
  applyTabVisibility()
})
</script>

<style scoped>
.vs-tabs-bar {
  position: sticky;
  top: 56px;
  z-index: 100;
  background: #FFFFFF;
  margin-bottom: 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.vs-tabs-inner {
  display: flex;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
}
.vs-tabs-inner::-webkit-scrollbar { display: none; }
.vs-tab-btn {
  padding: 12px 22px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: all 0.2s ease;
  white-space: nowrap;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  height: 44px;
  line-height: 1;
}
.vs-tab-btn:hover {
  color: #7C3AED;
  background: rgba(124,58,237,0.06);
}
.vs-tab-btn.active {
  color: #7C3AED;
  font-weight: 700;
  border-bottom-color: #7C3AED;
  background: rgba(124,58,237,0.08);
}
.vs-tab-btn svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
</style>
