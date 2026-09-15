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
        <span>{{ tab.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  // 各业务页的章节切换配置；缺省为「逻辑/排查」类文档的标准 5 段式
  tabs: {
    type: Array,
    default: () => ([
      { id: 'logic', label: '逻辑说明' },
      { id: 'faq', label: '常见问题FAQ' },
      { id: 'troubleshoot', label: '故障排查' },
      { id: 'history', label: '历史记录' },
      { id: 'related', label: '相关文档' },
    ]),
  },
  defaultTab: {
    type: String,
    default: '',
  },
})

const activeTab = ref(props.defaultTab || (props.tabs[0] && props.tabs[0].id) || '')

function applyTabVisibility() {
  props.tabs.forEach((t) => {
    const el = document.getElementById(t.id)
    if (el) {
      el.style.display = t.id === activeTab.value ? '' : 'none'
    }
  })
}

watch(activeTab, () => {
  applyTabVisibility()
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
