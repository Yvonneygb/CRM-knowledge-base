// 知识库通用 UI 组件库 —— 统一设计系统（紫色 #7C3AED 主色）
// 所有组件均自带 scoped 样式并引用 custom.css 中的 --kb-* 设计令牌。
import KbCard from './KbCard.vue'
import KbBadge from './KbBadge.vue'
import KbTip from './KbTip.vue'
import KbWarn from './KbWarn.vue'
import KbFormula from './KbFormula.vue'
import KbHighlight from './KbHighlight.vue'
import KbQuote from './KbQuote.vue'
import KbList from './KbList.vue'
import KbTable from './KbTable.vue'
import KbSectionTitle from './KbSectionTitle.vue'
import KbSubTitle from './KbSubTitle.vue'
import KbSteps from './KbSteps.vue'
import KbTimeline from './KbTimeline.vue'
import KbFlow from './KbFlow.vue'
import KbHero from './KbHero.vue'
import KbRoleCard from './KbRoleCard.vue'
import KbTwoCol from './KbTwoCol.vue'
import KbBreadcrumbTabs from './KbBreadcrumbTabs.vue'

export const uiComponents = {
  KbCard,
  KbBadge,
  KbTip,
  KbWarn,
  KbFormula,
  KbHighlight,
  KbQuote,
  KbList,
  KbTable,
  KbSectionTitle,
  KbSubTitle,
  KbSteps,
  KbTimeline,
  KbFlow,
  KbHero,
  KbRoleCard,
  KbTwoCol,
  KbBreadcrumbTabs,
}

// 直接在 enhanceApp 中调用：app.use(kbUiPlugin)
export const kbUiPlugin = {
  install(app) {
    Object.entries(uiComponents).forEach(([name, comp]) => {
      app.component(name, comp)
    })
  },
}
