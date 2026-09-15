import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/CRM-knowledge-base/',
  title: 'CRM 知识库',
  description: 'CRM 经销商管理系统业务逻辑梳理与排查知识库',
  head: [
    ['link', { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📋</text></svg>' }]
  ],
  themeConfig: {
    outline: false,
    nav: [
      { text: '📦 订单管理', link: '/订单/创建常规订单/' }
    ],
    sidebar: {
      '/订单/': [
        {
          text: '订单',
          items: [
            { text: '创建常规订单', link: '/订单/创建常规订单/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Yvonneygb/CRM-knowledge-base' }
    ]
  }
})
