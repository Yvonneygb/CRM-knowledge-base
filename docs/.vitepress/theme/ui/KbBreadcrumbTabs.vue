<template>
  <div class="kb-tabs-bar">
    <div class="kb-tabs-inner">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="kb-tab-btn"
        :class="{ active: active === tab.id }"
        @click="select(tab.id)"
      >
        <i v-if="tab.icon" :class="tab.icon"></i>
        <span>{{ tab.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

// 面包屑 / 分段切换 Tab。
// mode="section"（默认）：自动按 tab.id 切换页面中对应 <section id="xxx"> 的可见性，
//   适合「业务介绍 / 重点逻辑 / FAQ…」式单页多段布局。
// mode="free"：仅 emit change，由父组件自行决定行为。
const props = defineProps({
  tabs: { type: Array, required: true }, // [{ id, label, icon? }]
  modelValue: { type: String, default: '' },
  mode: { type: String, default: 'section' },
})
const emit = defineEmits(['update:modelValue', 'change'])

const active = ref(props.modelValue || (props.tabs[0] && props.tabs[0].id) || '')

watch(
  () => props.modelValue,
  (v) => { if (v) active.value = v }
)

function select(id) {
  active.value = id
  emit('update:modelValue', id)
  emit('change', id)
  if (props.mode === 'section') applyVisibility()
}

function applyVisibility() {
  props.tabs.forEach((t) => {
    const el = document.getElementById(t.id)
    if (el) el.style.display = t.id === active.value ? '' : 'none'
  })
}

onMounted(() => { if (props.mode === 'section') applyVisibility() })
watch(() => props.tabs, () => { if (props.mode === 'section') applyVisibility() })
</script>

<style scoped>
.kb-tabs-bar {
  position: sticky;
  top: 56px;
  z-index: 100;
  background: #fff;
  border-bottom: none;
  padding: 0;
  margin-bottom: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
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
  color: #6b7280;
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
  color: var(--kb-purple, #7c3aed);
  background: rgba(124, 58, 237, 0.06);
}
.kb-tab-btn.active {
  color: var(--kb-purple, #7c3aed);
  font-weight: 700;
  border-bottom-color: var(--kb-purple, #7c3aed);
  background: rgba(124, 58, 237, 0.08);
}
.kb-tab-btn i { font-size: 0.85rem; width: 16px; text-align: center; }
</style>
