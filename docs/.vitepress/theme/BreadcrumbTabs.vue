<template>
  <div class="kb-tabs-bar">
    <div class="kb-tabs-inner">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="kb-tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <svg v-if="tab.id==='biz-intro'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>

        <svg v-if="tab.id==='biz-flow'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="6" height="6"/><rect x="15" y="3" width="6" height="6"/><rect x="15" y="15" width="6" height="6"/><rect x="3" y="15" width="6" height="6"/><line x1="9" y1="6" x2="15" y2="6"/><line x1="6" y1="9" x2="6" y2="15"/><line x1="18" y1="9" x2="18" y2="15"/><line x1="9" y1="18" x2="15" y2="18"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        <svg v-if="tab.id==='key-logic'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <svg v-if="tab.id==='detail-logic'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
        <svg v-if="tab.id==='permission'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
        <svg v-if="tab.id==='faq'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
        <svg v-if="tab.id==='changelog'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><line x1="1.05" y1="12" x2="7" y2="12"/><line x1="17" y1="12" x2="22.96" y2="12"/></svg>
        <svg v-if="tab.id==='history'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span>{{ tab.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const tabs = [
  { id: 'biz-intro', label: '业务介绍', icon: 'fa-solid fa-building' },
  { id: 'biz-flow', label: '业务流', icon: 'fa-solid fa-diagram-next' },
  { id: 'key-logic', label: '重点逻辑', icon: 'fa-solid fa-star' },
  { id: 'detail-logic', label: '详细逻辑', icon: 'fa-solid fa-file-code' },
  { id: 'permission', label: '权限控制', icon: 'fa-solid fa-shield-halved' },
  { id: 'faq', label: '常见问题FAQ', icon: 'fa-solid fa-circle-question' },
  { id: 'changelog', label: '更新记录', icon: 'fa-solid fa-code-commit' },
  { id: 'history', label: '历史排查记录', icon: 'fa-solid fa-clock-rotate-left' },
]

const activeTab = ref('biz-intro')

function applyTabVisibility() {
  const sectionIds = tabs.map(t => t.id)
  sectionIds.forEach(id => {
    const el = document.getElementById(id)
    if (el) {
      el.style.display = id === activeTab.value ? '' : 'none'
    }
  })
  // faq-qa-section belongs to the FAQ tab (其他常见问题 / Q1-Q6)
  const faqQa = document.getElementById('faq-qa')
  if (faqQa) {
    faqQa.style.display = activeTab.value === 'faq' ? '' : 'none'
  }
}

watch(activeTab, () => {
  applyTabVisibility()
  // 切换 tab 时清除报错弹窗的 :target 锚点,避免返回该 tab 时残留弹窗冒出
  if (typeof location !== 'undefined' && location.hash.startsWith('#err-detail')) {
    history.replaceState(null, '', location.pathname + location.search)
  }
})

onMounted(() => {
  applyTabVisibility()
})
</script>

<style scoped>
.kb-tabs-bar {
  position: sticky;
  top: 56px;
  z-index: 100;
  background: #FFFFFF;
  border-bottom: none;
  padding: 0 0;
  margin-bottom: 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.kb-tabs-inner {
  display: flex;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
}
.kb-tabs-inner::-webkit-scrollbar { display: none; }

.kb-tab-btn {
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
.kb-tab-btn:hover {
  color: #7C3AED;
  background: rgba(124,58,237,0.06);
}
.kb-tab-btn.active {
  color: #7C3AED;
  font-weight: 700;
  border-bottom-color: #7C3AED;
  background: rgba(124,58,237,0.08);
}
.kb-tab-btn svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
.kb-tab-btn i {
  font-size: 0.85rem;
  width: 16px;
  text-align: center;
}
</style>
