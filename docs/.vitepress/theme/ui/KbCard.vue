<template>
  <section class="kb-card" :class="{ alt, 'no-hover': !hover }">
    <header v-if="num || title || $slots.header" class="kl-card-header">
      <span v-if="num !== null && num !== undefined" class="kl-num">{{ num }}</span>
      <div v-if="title || $slots.header" class="kl-card-title-wrap">
        <slot name="header">
          <h3 class="kl-card-title">{{ title }}</h3>
        </slot>
      </div>
      <slot name="actions" />
    </header>
    <div class="kl-card-body">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  // 紫色编号圆（如步骤序号）
  num: { type: [String, Number], default: null },
  // 卡片标题
  title: { type: String, default: '' },
  // 浅紫渐变变体（用于强调卡片）
  alt: { type: Boolean, default: false },
  // 是否启用 hover 抬升效果
  hover: { type: Boolean, default: true },
})
</script>

<style scoped>
.kb-card {
  width: 100%;
  max-width: 100%;
  padding: 24px 10%;
  border: none;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  margin-bottom: 0;
  background: #fff;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  box-sizing: border-box;
}
.kb-card.no-hover:hover { box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06); transform: none; }
.kb-card:not(.no-hover):hover {
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.15);
  transform: translateY(-1px);
}
.kb-card.alt {
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  border-left: 3px solid #a78bfa !important;
}
.kl-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.kl-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--kb-purple, #7c3aed);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}
.kl-card-title-wrap { flex: 1; min-width: 0; }
.kl-card-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.4;
}
.kl-card-body { font-size: 14px; color: #374151; line-height: 1.7; }
</style>
