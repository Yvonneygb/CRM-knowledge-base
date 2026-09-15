import KbCard from './KbCard.vue'
import KbSubTitle from './KbSubTitle.vue'
import KbBadge from './KbBadge.vue'
import KbTable from './KbTable.vue'

export const uiComponents = {
  KbCard,
  KbSubTitle,
  KbBadge,
  KbTable,
}

export const kbUiPlugin = {
  install(app) {
    Object.entries(uiComponents).forEach(([name, comp]) => {
      app.component(name, comp)
    })
  },
}
