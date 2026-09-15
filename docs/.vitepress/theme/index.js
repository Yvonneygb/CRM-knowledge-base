import DefaultTheme from 'vitepress/theme'
import { kbUiPlugin } from './ui/index.js'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(kbUiPlugin)
  }
}
