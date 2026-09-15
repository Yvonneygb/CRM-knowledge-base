import DefaultTheme from 'vitepress/theme'
import { inBrowser } from 'vitepress/client'
import KbLayout from './KbLayout.vue'
import BreadcrumbTabs from './BreadcrumbTabs.vue'
import KbSectionTabs from './KbSectionTabs.vue'
import ValueSetTabs from './ValueSetTabs.vue'
import ServiceFeeFlow from './ServiceFeeFlow.vue'
import VitePressRedirect from './VitePressRedirect.vue'
import SourceMdManager from './SourceMdManager.vue'
import { kbUiPlugin } from './ui/index.js'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: KbLayout,
  enhanceApp({ app, router }) {
    app.component('BreadcrumbTabs', BreadcrumbTabs)
    app.component('KbSectionTabs', KbSectionTabs)
    app.component('ValueSetTabs', ValueSetTabs)
    app.component('ServiceFeeFlow', ServiceFeeFlow)
    app.component('VitePressRedirect', VitePressRedirect)
    app.component('SourceMdManager', SourceMdManager)

    // 注册通用 UI 设计系统组件库（Kb*）
    app.use(kbUiPlugin)

    // 根路径重定向到第一个知识库页面
    if (inBrowser) {
      // 注入 AI 问答后端 API 地址（云端部署时由环境变量指定）
      window.KB_API_URL = (import.meta && import.meta.env && import.meta.env.VITE_QA_API_URL) || null
      // 注入源MD管理上传后端 API 地址（缺省复用 KB_API_URL 同一后端）
      window.KB_UPLOAD_URL = (import.meta && import.meta.env && import.meta.env.VITE_UPLOAD_API_URL) || null

      // Font Awesome CDN - 动态加载图标库
      if (!document.getElementById('font-awesome-css')) {
        var fontAwesomeLink = document.createElement('link')
        fontAwesomeLink.id = 'font-awesome-css'
        fontAwesomeLink.rel = 'stylesheet'
        fontAwesomeLink.href = 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css'
        document.head.appendChild(fontAwesomeLink)
      }

      router.onAfterRouteChanged = (to) => {
        if (to.path === '/' || to.path === '') {
          window.location.replace('/家装管理/项目往来/家装真实性核销/')
        }
      }

      // 动态加载PrismJS
      window.loadPrism = function() {
        if (window.Prism) return Promise.resolve(window.Prism)
        return new Promise(function(resolve) {
          var script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js'
          script.onload = function() {
            // 加载SQL语言支持
            var sqlScript = document.createElement('script')
            sqlScript.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-sql.min.js'
            sqlScript.onload = function() {
              resolve(window.Prism)
            }
            document.head.appendChild(sqlScript)
          }
          document.head.appendChild(script)
        })
      }

      // Modal弹层交互处理（处理.view-btn点击和.close-btn关闭）
      window.setupModalHandlers = function() {
        // 确保Prism已加载
        window.loadPrism()

        // 全局高亮：页面加载时高亮 key-logic + detail-logic 区域的 SQL 代码块
        window.loadPrism().then(function(Prism) {
          setTimeout(function() {
            // 重点逻辑 + 详细逻辑区域的代码块
            var codeSections = ['#key-logic', '#detail-logic']
            codeSections.forEach(function(sel) {
              var el = document.querySelector(sel)
              if (el) {
                el.querySelectorAll('pre code.language-sql').forEach(function(block) {
                  Prism.highlightElement(block)
                })
              }
            })
            // FAQ 弹层内的代码块（已有）
            document.querySelectorAll('.error-detail-overlay pre code.language-sql').forEach(function(block) {
              Prism.highlightElement(block)
            })
          }, 50)
        })

        // 绑定查看按钮 → 显示对应弹层
        document.querySelectorAll('.view-btn').forEach(function(btn) {
          btn.addEventListener('click', function(e) {
            e.preventDefault()
            var targetId = this.getAttribute('href').replace('#', '')
            var overlay = document.getElementById(targetId)
            if (overlay) {
              overlay.style.display = 'flex'
              document.body.style.overflow = 'hidden'
              // 高亮弹层内的SQL代码
              window.loadPrism().then(function(Prism) {
                setTimeout(function() {
                  overlay.querySelectorAll('pre code.language-sql').forEach(function(block) {
                    Prism.highlightElement(block)
                  })
                }, 50)
              })
            }
          })
        })

        // 绑定关闭按钮 → 隐藏弹层
        document.querySelectorAll('.error-detail-overlay .close-btn').forEach(function(btn) {
          btn.addEventListener('click', function(e) {
            e.preventDefault()
            var overlay = this.closest('.error-detail-overlay')
            if (overlay) {
              overlay.style.display = 'none'
              document.body.style.overflow = ''
            }
          })
        })

        // 点击遮罩层背景 → 关闭弹层
        document.querySelectorAll('.error-detail-overlay').forEach(function(overlay) {
          overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
              overlay.style.display = 'none'
              document.body.style.overflow = ''
            }
          })
        })

        // 复制按钮汉化：title 统一为"复制"(可见文字由 custom.css button.copy::after 控制)
        document.querySelectorAll('button.copy').forEach(function(btn) {
          btn.setAttribute('title', '复制')
        })
        // hydration 后 VitePress 可能重置 title,延迟再应用一次确保生效
        setTimeout(function() {
          document.querySelectorAll('button.copy').forEach(function(btn) {
            btn.setAttribute('title', '复制')
          })
        }, 400)
      }

      // 首次加载时执行
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.setupModalHandlers)
      } else {
        window.setupModalHandlers()
      }

      // 路由变化后重新执行（处理SPA导航）
      router.onAfterRouteChanged = (to) => {
        setTimeout(window.setupModalHandlers, 100)
      }
    }
  }
}
