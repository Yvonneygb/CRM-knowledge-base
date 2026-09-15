import DefaultTheme from 'vitepress/theme'
import { inBrowser } from 'vitepress/client'
import KbLayout from './KbLayout.vue'
import BreadcrumbTabs from './BreadcrumbTabs.vue'
import { kbUiPlugin } from './ui/index.js'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: KbLayout,
  enhanceApp({ app, router }) {
    app.component('BreadcrumbTabs', BreadcrumbTabs)
    app.use(kbUiPlugin)

    if (inBrowser) {
      window.KB_API_URL = (import.meta && import.meta.env && import.meta.env.VITE_QA_API_URL) || null
      window.KB_UPLOAD_URL = (import.meta && import.meta.env && import.meta.env.VITE_UPLOAD_API_URL) || null

      if (!document.getElementById('font-awesome-css')) {
        var fontAwesomeLink = document.createElement('link')
        fontAwesomeLink.id = 'font-awesome-css'
        fontAwesomeLink.rel = 'stylesheet'
        fontAwesomeLink.href = 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css'
        document.head.appendChild(fontAwesomeLink)
      }

      router.onAfterRouteChanged = (to) => {
        if (to.path === '/' || to.path === '') {
          window.location.replace('/订单/创建常规订单/')
        }
        setTimeout(window.setupModalHandlers, 100)
      }

      window.loadPrism = function() {
        if (window.Prism) return Promise.resolve(window.Prism)
        return new Promise(function(resolve) {
          var script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js'
          script.onload = function() {
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

      window.setupModalHandlers = function() {
        window.loadPrism().then(function(Prism) {
          setTimeout(function() {
            var codeSections = ['#key-logic', '#detail-logic']
            codeSections.forEach(function(sel) {
              var el = document.querySelector(sel)
              if (el) {
                el.querySelectorAll('pre code.language-sql').forEach(function(block) {
                  Prism.highlightElement(block)
                })
              }
            })
            document.querySelectorAll('.error-detail-overlay pre code.language-sql').forEach(function(block) {
              Prism.highlightElement(block)
            })
          }, 50)
        })

        document.querySelectorAll('.view-btn').forEach(function(btn) {
          btn.addEventListener('click', function(e) {
            e.preventDefault()
            var targetId = this.getAttribute('href').replace('#', '')
            var overlay = document.getElementById(targetId)
            if (overlay) {
              overlay.style.display = 'flex'
              document.body.style.overflow = 'hidden'
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

        document.querySelectorAll('.error-detail-overlay').forEach(function(overlay) {
          overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
              overlay.style.display = 'none'
              document.body.style.overflow = ''
            }
          })
        })

        document.querySelectorAll('button.copy').forEach(function(btn) {
          btn.setAttribute('title', '复制')
        })
        setTimeout(function() {
          document.querySelectorAll('button.copy').forEach(function(btn) {
            btn.setAttribute('title', '复制')
          })
        }, 400)
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.setupModalHandlers)
      } else {
        window.setupModalHandlers()
      }
    }
  }
}
