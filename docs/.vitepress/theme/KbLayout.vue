<template>
  <div class="kb-layout">
    <!-- 顶部导航栏 -->
    <header class="kb-topbar">
      <div class="kb-logo-area">
        <div class="kb-logo-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 20h20M3 10l9-7 9 7M5 10v10h4v-6h6v6h4V10" />
          </svg>
        </div>
        <span class="kb-logo-title">新门户系统知识库</span>
      </div>
      <div class="kb-topbar-right">
        <a :href="withBase('/源MD管理/')" class="kb-md-entry" title="上传 AI 生成的最新 MD，自动更新知识库">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          源MD管理
        </a>
      </div>
    </header>

    <!-- 一级菜单栏 -->
    <nav class="kb-primary-nav">
      <div
        v-for="item in primaryNav"
        :key="item.id"
        class="kb-primary-item"
        :class="{ active: expandedPanel === item.id }"
        @click="togglePanel(item.id)"
        :title="item.label"
      >
        <div class="kb-primary-icon">
          <svg v-if="item.id === '家装管理'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <svg v-if="item.id === '工程管理'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 20h20M3 10l9-7 9 7M5 10v10" />
            <rect x="7" y="14" width="4" height="6" />
            <rect x="13" y="11" width="4" height="9" />
          </svg>
          <svg v-if="item.id === '门店管理'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 21h18M3 7v1a3 3 0 006 0V7m0 1a3 3 0 006 0V7m0 1a3 3 0 006 0V7H3l2-4h14l2 4" />
            <path d="M5 21V10.85M19 21V10.85" />
          </svg>
          <svg v-if="item.id === '财务管理'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v2M12 16v2M16 12h-8" />
            <path d="M9 9l6 6M15 9l-6 6" />
          </svg>
          <svg v-if="item.id === '开发管理'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
          </svg>
          <svg v-if="item.id === '经销合同管理'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <path d="M14 2v6h6"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <line x1="10" y1="9" x2="9" y2="9"/>
          </svg>
          <svg v-if="item.id === '点将管理'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="3"/>
            <line x1="12" y1="2" x2="12" y2="6"/>
            <line x1="12" y1="18" x2="12" y2="22"/>
            <line x1="2" y1="12" x2="6" y2="12"/>
            <line x1="18" y1="12" x2="22" y2="12"/>
          </svg>
          <svg v-if="item.id === '产品中心'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
          <svg v-if="item.id === '电子合同管理'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <path d="M14 2v6h6"/>
            <path d="M10 13l2-2 4 4"/>
          </svg>
          <svg v-if="item.id === '问题反馈'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        </div>
        <span>{{ item.label }}</span>
      </div>
    </nav>

    <!-- 二级侧边栏面板 -->
    <transition name="panel-slide">
      <aside class="kb-secondary-panel" v-if="expandedPanel">
        <div class="kb-panel-header">
          <span class="kb-panel-title">{{ expandedPanel }}</span>
          <button class="kb-panel-close" @click="expandedPanel = null">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="kb-panel-body">
          <template v-for="group in secondaryNav[expandedPanel]" :key="group.label">
            <div class="kb-nav-group">
              <div class="kb-nav-group-title" @click="toggleGroup(group.label)">
                <svg v-if="group.label === '项目往来'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                <svg v-if="group.label === '家装往来'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v12a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18"/><path d="M9 10h6"/><path d="M9 14h6"/></svg>
                <svg v-if="group.label === '服务费'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                <svg v-if="group.label === '项目交付'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h5v8h-5"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                <svg v-if="group.label === '项目合同'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M9 15l6-6"/><path d="M9 9l6 6"/></svg>
                <svg v-if="group.label === '门店设置'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 7v1a3 3 0 006 0V7m0 1a3 3 0 006 0V7m0 1a3 3 0 006 0V7H3l2-4h14l2 4"/><path d="M5 21V10.85M19 21V10.85"/></svg>
                <svg v-if="group.label === '门店档案'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="9" y2="9"/></svg>
                <svg v-if="group.label === '门店装修'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/><circle cx="12" cy="6" r="1"/><path d="M15 12l-6 6"/><path d="M15 18l-6-6"/></svg>
                <svg v-if="group.label === '门店报表'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                <svg v-if="group.label === '广告投放'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 3v4M8 3v4M4 7h16"/><line x1="9" y1="13" x2="15" y2="13"/></svg>
                <svg v-if="group.label === '装修报表'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><polyline points="3 9 12 15 21 9"/><line x1="12" y1="15" x2="12" y2="21"/></svg>
                <svg v-if="group.label === '样品及长库龄管理'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3l-1 5h7l-1-5"/><rect x="3" y="8" width="18" height="13" rx="2"/><circle cx="9" cy="14" r="2"/><circle cx="15" cy="14" r="2"/></svg>
                <svg v-if="group.label === '预提与冲销'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v6a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                <svg v-if="group.label === '值集配置'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="10" y1="6.5" x2="14" y2="6.5"/><line x1="10" y1="17.5" x2="14" y2="17.5"/><line x1="6.5" y1="10" x2="6.5" y2="14"/><line x1="17.5" y1="10" x2="17.5" y2="14"/></svg>
                <svg v-if="group.label === '项目商机'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>
                <svg v-if="group.label === '合同与折扣'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><line x1="15" y1="12" x2="9" y2="18"/><circle cx="9.5" cy="12.5" r="1"/><circle cx="14.5" cy="17.5" r="1"/></svg>
                <svg v-if="group.label === '销售合同'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <svg v-if="group.label === '合同管理'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                <svg v-if="group.label === '报表中心'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                <svg v-if="group.label === '特训营管理'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 17l3-5 4 2 5-7 5 4 3-4"/><circle cx="12" cy="12" r="1"/></svg>
                <svg v-if="group.label === '策划师点将'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <svg v-if="group.label === '单店培训点将管理'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                <svg v-if="group.label === '基础管理'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                <svg v-if="group.label === '经销商点将'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <svg v-if="group.label === '设计师点将'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                <svg v-if="group.label === '产品资料'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <svg v-if="group.label === '价目表'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                <svg v-if="group.label === '库存'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
                <svg v-if="group.label === '说明书'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
                <svg v-if="group.label === '基础管理'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                <svg v-if="group.label === '经销商'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <svg v-if="group.label === '品牌方'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                <span>{{ group.label }}</span>
                <svg class="kb-arrow-svg" :class="{ rotated: expandedGroup === group.label }" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              <transition name="group-expand">
                <div class="kb-nav-group-items" v-if="expandedGroup === group.label">
                  <template v-for="sub in group.items" :key="sub.label">
                    <div
                      class="kb-nav-item"
                      :class="{ active: currentPath.includes(sub.link.replace(/\/$/, '')) }"
                      @click="navigateTo(sub.link)"
                    >
                      <svg v-if="sub.label === '服务费业务背景'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="10" y1="6.5" x2="14" y2="6.5"/><line x1="10" y1="17.5" x2="14" y2="17.5"/><line x1="6.5" y1="10" x2="6.5" y2="14"/><line x1="17.5" y1="10" x2="17.5" y2="14"/></svg>
                      <svg v-if="sub.label === '家装真实性核销'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      <svg v-if="sub.label === '家装要货订单'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                      <svg v-if="sub.label === '家装折扣政策'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/><path d="M17 7l-5 5"/><path d="M12 12l5 5"/></svg>
                      <svg v-if="sub.label === '工程服务费报销'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                      <svg v-if="sub.label === '工程服务费兑现'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/><circle cx="7" cy="8" r="1"/><circle cx="17" cy="16" r="1"/></svg>
                      <svg v-if="sub.label === '工程要货订单'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                      <svg v-if="sub.label === '工程折扣政策申请'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/></svg>
                      <svg v-if="sub.label === '工程折扣政策失效'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="5.5" y1="5.5" x2="18.5" y2="18.5"/></svg>
                      <svg v-if="sub.label === '折扣单报表'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>
                      <svg v-if="sub.label === '工程合同产品变更'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
                      <svg v-if="sub.label === '工程取消核销与发票作废'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><line x1="9.5" y1="14.5" x2="14.5" y2="19.5"/><line x1="14.5" y1="14.5" x2="9.5" y2="19.5"/></svg>
                      <svg v-if="sub.label === '工程折扣延期'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>
                      <svg v-if="sub.label === '紧急要货插单'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                      <svg v-if="sub.label === '提货时间变更'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></svg>
                      <svg v-if="sub.label === '折扣政策明细查询（内部）'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                      <svg v-if="sub.label === '有效延期申请'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 109-9 9 9 0 00-9 9z"/><polyline points="12 7 12 12 15 14"/><path d="M3 12l2 2 2-2"/></svg>
                      <svg v-if="sub.label === '紧急要货报表'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                      <svg v-if="sub.label === '工程要货订单报表'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                      <svg v-if="sub.label === '报备生失效申请'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><line x1="9.5" y1="14.5" x2="14.5" y2="19.5"/><line x1="14.5" y1="14.5" x2="9.5" y2="19.5"/></svg>
                      <svg v-if="sub.label === '报备解冻申请'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="4.5" y1="4.5" x2="19.5" y2="19.5"/><line x1="19.5" y1="4.5" x2="4.5" y2="19.5"/></svg>
                      <svg v-if="sub.label === '工程项目结案'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <svg v-if="sub.label === '单体项目报备'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                      <svg v-if="sub.label === '工程项目档案'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
                      <svg v-if="sub.label === '战略经理变更'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <svg v-if="sub.label === '价格保护函'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      <svg v-if="sub.label === '项目进度更新'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                      <svg v-if="sub.label === '战略报备变更'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                      <svg v-if="sub.label === '样品及长库龄要货订单'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3l-1 5h7l-1-5"/><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 11v4"/><circle cx="9" cy="11" r="1"/><circle cx="15" cy="15" r="1"/><path d="M8 15l2 2"/><path d="M14 11l2 2"/></svg>
                      <svg v-if="sub.label === '工程服务费预提'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15l3 3 3-3"/></svg>
                      <svg v-if="sub.label === '自营工程合同'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                      <svg v-if="sub.label === '项目到款引入'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M19 15l-7 7-7-7"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/></svg>
                      <svg v-if="sub.label === '项目到款认领'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 00-2-2v0a2 2 0 00-2 2v0"/><path d="M14 10V4a2 2 0 00-2-2v0a2 2 0 00-2 2v6"/><path d="M10 10.5V6a2 2 0 00-2-2v0a2 2 0 00-2 2v8"/><path d="M18 8a2 2 0 114 0v6a8 8 0 11-16 0v-4a2 2 0 014 0"/></svg>
                      <svg v-if="sub.label === '项目到款认领撤销'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
                      <svg v-if="sub.label === '工程服务费冲销'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v6a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/><line x1="9" y1="14" x2="15" y2="20"/><line x1="15" y1="14" x2="9" y2="20"/></svg>
                      <svg v-if="sub.label === '额度内冲销报表'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                      <svg v-if="sub.label === '额度内预提报表'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/><rect x="9" y="11" width="10" height="2"/><rect x="9" y="15" width="8" height="2"/><rect x="9" y="19" width="6" height="2"/></svg>
                      <svg v-if="sub.label === '广告费调整申请单'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 11-5.8-1.6"/></svg>
                      <svg v-if="sub.label === '政策性补贴申请'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>
                      <svg v-if="sub.label === '销售提价兑现'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <svg v-if="sub.label === '经销商余额明细查询'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h7"/><path d="M16 16h6"/><path d="M19 13v6"/><circle cx="12" cy="12" r="2"/></svg>
                      <svg v-if="sub.label === '客户金税发票号码查询'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>
                      <svg v-if="sub.label === '待兑现折扣折让对账单'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H9"/><path d="M14 9h-1"/></svg>
                      <svg v-if="sub.label === '额度内市场推广服务费对账单'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
                      <svg v-if="sub.label === '额度外预算总额'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      <svg v-if="sub.label === '法人对账单'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                      <svg v-if="sub.label === '广告费余额查询'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                      <svg v-if="sub.label === '样品及长库龄折扣政策'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/><path d="M4 4l6 6"/></svg>
                      <svg v-if="sub.label === '工程折扣政策'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M8 12h8"/><circle cx="12" cy="8" r="2"/><path d="M8 16l4-4 4 4"/></svg>
                      <svg v-if="sub.label === '工程核销发票上传'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>
                      <svg v-if="sub.label === '工程真实性核销'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      <svg v-if="sub.label === '装修等级'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                      <svg v-if="sub.label === '门头展板报销标准'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                      <svg v-if="sub.label === '经销商额度外限额'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                      <svg v-if="sub.label === '门店照片设置'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      <svg v-if="sub.label === '门店装修标准'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                      <svg v-if="sub.label === '门头验收信息设置'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <svg v-if="sub.label === '门店变更申请'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
                      <svg v-if="sub.label === '门店档案'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
                      <svg v-if="sub.label === '新建门店申请'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      <span>{{ sub.label }}</span>
                    </div>
                  </template>
                </div>
              </transition>
            </div>
          </template>
        </div>
      </aside>
    </transition>

    <!-- 主内容区域 -->
    <main class="kb-main-content" :class="{ shifted: expandedPanel }">
      <div class="kb-content-wrapper">
        <Content class="kb-page-content" />
      </div>
    </main>

    <!-- 悬浮问答组件 -->
    <FloatingQA />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, withBase } from 'vitepress'
import { Content } from 'vitepress'
import FloatingQA from './FloatingQA.vue'

const router = useRouter()

const primaryNav = [
  { id: '家装管理', label: '家装管理', icon: 'fa-solid fa-building' },
  { id: '工程管理', label: '工程管理', icon: 'fa-solid fa-helmet-safety' },
  { id: '门店管理', label: '门店管理', icon: 'fa-solid fa-store' },
  { id: '财务管理', label: '财务管理', icon: 'fa-solid fa-coins' },
  { id: '经销合同管理', label: '经销合同管理', icon: 'fa-solid fa-file-contract' },
  { id: '点将管理', label: '点将管理', icon: 'fa-solid fa-bullseye' },
  { id: '产品中心', label: '产品中心', icon: 'fa-solid fa-box' },
  { id: '电子合同管理', label: '电子合同管理', icon: 'fa-solid fa-file-signature' },
  { id: '问题反馈', label: '问题反馈', icon: 'fa-solid fa-comments' },
  { id: '开发管理', label: '开发管理', icon: 'fa-solid fa-code' },
]

const secondaryNav = {
  '家装管理': [
    {
      label: '项目往来',
      icon: 'fa-solid fa-arrow-right-arrow-left',
      items: [
        { label: '家装真实性核销', link: '/家装管理/项目往来/家装真实性核销/', icon: 'fa-solid fa-shield-halved' },
      ]
    },
    {
      label: '家装往来',
      icon: 'fa-solid fa-receipt',
      items: [
        { label: '家装核销发票上传', link: '/家装管理/家装往来/家装核销发票上传/', icon: 'fa-solid fa-file-invoice' },
        { label: '家装要货订单', link: '/家装管理/家装往来/家装要货订单/', icon: 'fa-solid fa-cart-shopping' },
      ]
    },
    {
      label: '项目交付',
      icon: 'fa-solid fa-truck-fast',
      items: [
        { label: '家装折扣政策申请', link: '/家装管理/项目交付/家装折扣政策申请/', icon: 'fa-solid fa-percent' },
      ]
    }
  ],
  '工程管理': [
    {
      label: '项目合同',
      icon: 'fa-solid fa-file-contract',
      items: [
        { label: '自营工程合同', link: '/工程管理/项目合同/自营工程合同/', icon: 'fa-solid fa-file-signature' },
        { label: '经销商工程合同', link: '/工程管理/项目合同/经销商工程合同/', icon: 'fa-solid fa-handshake' },
      ]
    },
    {
      label: '合同与折扣',
      icon: 'fa-solid fa-file-invoice-dollar',
      items: [
        { label: '工程折扣单', link: '/工程管理/合同与折扣/工程折扣单/', icon: 'fa-solid fa-tags' },
        { label: '项目合同失效', link: '/工程管理/合同与折扣/项目合同失效/', icon: 'fa-solid fa-file-circle-xmark' },
        { label: '工程自营签收', link: '/工程管理/合同与折扣/工程自营签收/', icon: 'fa-solid fa-clipboard-check' },
      ]
    },
    {
      label: '服务费',
      icon: 'fa-solid fa-money-bill-transfer',
      items: [
        { label: '服务费业务背景', link: '/工程管理/服务费/服务费业务背景/', icon: 'fa-solid fa-diagram-project' },
        { label: '工程服务费报销', link: '/工程管理/服务费/工程服务费报销/', icon: 'fa-solid fa-receipt' },
        { label: '工程服务费兑现', link: '/工程管理/服务费/工程服务费兑现/', icon: 'fa-solid fa-hand-holding-dollar' },
      ]
    },
    {
      label: '项目交付',
      icon: 'fa-solid fa-truck-fast',
      items: [
        { label: '工程要货订单', link: '/工程管理/项目交付/工程要货订单/', icon: 'fa-solid fa-box-urgent' },
        { label: '工程折扣政策申请', link: '/工程管理/项目交付/工程折扣政策申请/', icon: 'fa-solid fa-percent' },
        { label: '工程折扣政策失效', link: '/工程管理/项目交付/工程折扣政策失效/', icon: 'fa-solid fa-ban' },
        { label: '折扣单报表', link: '/工程管理/项目交付/折扣单报表/', icon: 'fa-solid fa-table' },
        { label: '工程合同产品变更', link: '/工程管理/项目交付/工程合同产品变更/', icon: 'fa-solid fa-retweet' },
        { label: '工程取消核销与发票作废', link: '/工程管理/项目交付/工程取消核销与发票作废/', icon: 'fa-solid fa-file-xmark' },
        { label: '工程折扣延期', link: '/工程管理/项目交付/工程折扣延期/', icon: 'fa-solid fa-clock' },
        { label: '紧急要货插单', link: '/工程管理/项目交付/紧急要货插单/', icon: 'fa-solid fa-bolt' },
        { label: '提货时间变更', link: '/工程管理/项目交付/提货时间变更/', icon: 'fa-solid fa-calendar-check' },
        { label: '订单紧急要货', link: '/工程管理/项目交付/订单紧急要货/', icon: 'fa-solid fa-truck-bolt' },
        { label: '折扣政策明细查询（内部）', link: '/工程管理/项目交付/折扣政策明细查询（内部）/', icon: 'fa-solid fa-search' },
        { label: '有效延期申请', link: '/工程管理/项目交付/有效延期申请/', icon: 'fa-solid fa-clock-rotate-left' },
        { label: '紧急要货报表', link: '/工程管理/项目交付/紧急要货报表/', icon: 'fa-solid fa-chart-line' },
        { label: '工程要货订单报表', link: '/工程管理/项目交付/工程要货订单报表/', icon: 'fa-solid fa-table-list' },
      ]
    },
    {
      label: '项目商机',
      icon: 'fa-solid fa-bullseye',
      items: [
        { label: '报备生失效申请', link: '/工程管理/项目商机/报备生失效申请/', icon: 'fa-solid fa-file-xmark' },
        { label: '报备解冻申请', link: '/工程管理/项目商机/报备解冻申请/', icon: 'fa-solid fa-snowflake' },
        { label: '工程项目结案', link: '/工程管理/项目商机/工程项目结案/', icon: 'fa-solid fa-circle-check' },
        { label: '单体项目报备', link: '/工程管理/项目商机/单体项目报备/', icon: 'fa-solid fa-box' },
        { label: '工程项目档案', link: '/工程管理/项目商机/工程项目档案/', icon: 'fa-solid fa-archive' },
        { label: '战略经理变更', link: '/工程管理/项目商机/战略经理变更/', icon: 'fa-solid fa-user-tie' },
        { label: '价格保护函', link: '/工程管理/项目商机/价格保护函/', icon: 'fa-solid fa-shield-halved' },
        { label: '项目进度更新', link: '/工程管理/项目商机/项目进度更新/', icon: 'fa-solid fa-chart-line' },
        { label: '战略报备变更', link: '/工程管理/项目商机/战略报备变更/', icon: 'fa-solid fa-pen-to-square' },
        { label: '战略项目报备', link: '/工程管理/项目商机/战略项目报备/', icon: 'fa-solid fa-chess-rook' },
      ]
    },
    {
      label: '项目往来',
      icon: 'fa-solid fa-arrow-right-arrow-left',
      items: [
        { label: '工程服务费预提', link: '/工程管理/项目往来/工程服务费预提/', icon: 'fa-solid fa-file-invoice-dollar' },
        { label: '项目到款引入', link: '/工程管理/项目往来/项目到款引入/', icon: 'fa-solid fa-arrow-down-to-line' },
        { label: '项目到款认领', link: '/工程管理/项目往来/项目到款认领/', icon: 'fa-solid fa-hand-pointer' },
        { label: '项目到款认领撤销', link: '/工程管理/项目往来/项目到款认领撤销/', icon: 'fa-solid fa-rotate-left' },
        { label: '工程折扣政策', link: '/工程管理/项目往来/工程折扣政策/', icon: 'fa-solid fa-gavel' },
        { label: '工程核销发票上传', link: '/工程管理/项目往来/工程核销发票上传/', icon: 'fa-solid fa-file-invoice' },
        { label: '工程真实性核销', link: '/工程管理/项目往来/工程真实性核销/', icon: 'fa-solid fa-shield-halved' },
      ]
    }
  ],
  '门店管理': [
    {
      label: '门店设置',
      icon: 'fa-solid fa-store-alt',
      items: [
        { label: '门头展板报销标准', link: '/门店管理/门店设置/门头展板报销标准/', icon: 'fa-solid fa-sign' },
        { label: '经销商额度外限额', link: '/门店管理/门店设置/经销商额度外限额/', icon: 'fa-solid fa-chart-bar' },
        { label: '门店照片设置', link: '/门店管理/门店设置/门店照片设置/', icon: 'fa-solid fa-camera' },
        { label: '门店装修标准', link: '/门店管理/门店设置/门店装修标准/', icon: 'fa-solid fa-paint-roller' },
        { label: '门头验收信息设置', link: '/门店管理/门店设置/门头验收信息设置/', icon: 'fa-solid fa-clipboard-check' },
      ]
    },
    {
      label: '门店档案',
      icon: 'fa-solid fa-folder-open',
      items: [
        { label: '门店变更申请', link: '/门店管理/门店档案/门店变更申请/', icon: 'fa-solid fa-rotate' },
        { label: '门店档案', link: '/门店管理/门店档案/门店档案/', icon: 'fa-solid fa-folder' },
        { label: '新建门店申请', link: '/门店管理/门店档案/新建门店申请/', icon: 'fa-solid fa-plus-circle' },
      ]
    },
    {
      label: '门店装修',
      icon: 'fa-solid fa-tools',
      items: [
        { label: '门头展板兑现', link: '/门店管理/门店装修/门头展板兑现/', icon: 'fa-solid fa-dollar-sign' },
        { label: '额度内兑现批量复核', link: '/门店管理/门店装修/额度内兑现批量复核/', icon: 'fa-solid fa-check-double' },
        { label: '门店验收与报销单', link: '/门店管理/门店装修/门店验收与报销单/', icon: 'fa-solid fa-clipboard-list' },
        { label: '门店装修额度内兑现', link: '/门店管理/门店装修/门店装修额度内兑现/', icon: 'fa-solid fa-coins' },
        { label: '门店装修额度外兑现', link: '/门店管理/门店装修/门店装修额度外兑现/', icon: 'fa-solid fa-credit-card' },
        { label: '门店装修申请变更', link: '/门店管理/门店装修/门店装修申请变更/', icon: 'fa-solid fa-pen-to-square' },
        { label: '门店装修申请关闭', link: '/门店管理/门店装修/门店装修申请关闭/', icon: 'fa-solid fa-ban' },
        { label: '门店装修申请与进度更新', link: '/门店管理/门店装修/门店装修申请与进度更新/', icon: 'fa-solid fa-file-pen' },
        { label: '门头展板报销申请单', link: '/门店管理/门店装修/门头展板报销申请单/', icon: 'fa-solid fa-file-invoice' },
      ]
    },
    {
      label: '样品及长库龄管理',
      icon: 'fa-solid fa-flask',
      items: [
        { label: '样品及长库龄要货订单', link: '/门店管理/样品及长库龄管理/样品及长库龄要货订单/', icon: 'fa-solid fa-flask' },
        { label: '样品及长库龄折扣政策', link: '/门店管理/样品及长库龄管理/样品及长库龄折扣政策/', icon: 'fa-solid fa-tags' },
        { label: '样品及长库龄折扣政策失效', link: '/门店管理/样品及长库龄管理/样品及长库龄折扣政策失效/', icon: 'fa-solid fa-ban' },
      ]
    },
    {
      label: '门店报表',
      icon: 'fa-solid fa-table',
      items: [
        { label: '门店统计分析', link: '/门店管理/门店报表/门店统计分析/', icon: 'fa-solid fa-chart-bar' },
        { label: '出库单计算广告费明细报表', link: '/门店管理/门店报表/出库单计算广告费明细报表/', icon: 'fa-solid fa-file-invoice' },
        { label: '店面额度内兑现余额表', link: '/门店管理/门店报表/店面额度内兑现余额表/', icon: 'fa-solid fa-coins' },
        { label: '额度外占用预算明细', link: '/门店管理/门店报表/额度外占用预算明细/', icon: 'fa-solid fa-file-lines' },
        { label: '户外广告分布', link: '/门店管理/门店报表/户外广告分布/', icon: 'fa-solid fa-map' },
        { label: '门店区域分布', link: '/门店管理/门店报表/门店区域分布/', icon: 'fa-solid fa-location-dot' },
      ]
    },
    {
      label: '广告投放',
      icon: 'fa-solid fa-bullhorn',
      items: [
        { label: '广告报销发票兑现', link: '/门店管理/广告投放/广告报销发票兑现/', icon: 'fa-solid fa-receipt' },
        { label: '广告费报销', link: '/门店管理/广告投放/广告费报销/', icon: 'fa-solid fa-file-invoice-dollar' },
        { label: '广告投放申请', link: '/门店管理/广告投放/广告投放申请/', icon: 'fa-solid fa-pen-to-square' },
      ]
    },
    {
      label: '装修报表',
      icon: 'fa-solid fa-chart-pie',
      items: [
        { label: '门额度内兑现统计报表', link: '/门店管理/装修报表/门额度内兑现统计报表/', icon: 'fa-solid fa-chart-line' },
        { label: '兑现汇总', link: '/门店管理/装修报表/兑现汇总/', icon: 'fa-solid fa-layer-group' },
        { label: '门店验收与报销单报表', link: '/门店管理/装修报表/门店验收与报销单报表/', icon: 'fa-solid fa-file-lines' },
        { label: '门店装修额度外报表', link: '/门店管理/装修报表/门店装修额度外报表/', icon: 'fa-solid fa-sack-dollar' },
        { label: '门店装修申请与进度更新报表', link: '/门店管理/装修报表/门店装修申请与进度更新报表/', icon: 'fa-solid fa-pen-to-square' },
      ]
    }
  ],
  '经销合同管理': [
    {
      label: '销售合同',
      icon: 'fa-solid fa-file-signature',
      items: [
        { label: '认缴申请', link: '/经销合同管理/销售合同/认缴申请/', icon: 'fa-solid fa-pen-to-square' },
        { label: '保证金减免申请', link: '/经销合同管理/销售合同/保证金减免申请/', icon: 'fa-solid fa-hand-holding-dollar' },
        { label: '合同保证金', link: '/经销合同管理/销售合同/合同保证金/', icon: 'fa-solid fa-lock' },
        { label: '经销合同变更', link: '/经销合同管理/销售合同/经销合同变更/', icon: 'fa-solid fa-rotate' },
        { label: '年度经销合同', link: '/经销合同管理/销售合同/年度经销合同/', icon: 'fa-solid fa-file-contract' },
        { label: '认缴概况', link: '/经销合同管理/销售合同/认缴概况/', icon: 'fa-solid fa-chart-pie' },
      ]
    },
    {
      label: '合同管理',
      icon: 'fa-solid fa-folder-tree',
      items: [
        { label: '合同任务完成率', link: '/经销合同管理/合同管理/合同任务完成率/', icon: 'fa-solid fa-check-double' },
        { label: '合同任务完成率明细报表', link: '/经销合同管理/合同管理/合同任务完成率明细报表/', icon: 'fa-solid fa-table-list' },
        { label: '经销合同归档', link: '/经销合同管理/合同管理/经销合同归档/', icon: 'fa-solid fa-box-archive' },
        { label: '年度营销政策', link: '/经销合同管理/合同管理/年度营销政策/', icon: 'fa-solid fa-ruler-combined' },
      ]
    },
    {
      label: '报表中心',
      icon: 'fa-solid fa-chart-bar',
      items: [
        { label: '经销合同销售区域报表', link: '/经销合同管理/报表中心/经销合同销售区域报表/', icon: 'fa-solid fa-map-location-dot' },
      ]
    }
  ],
  '点将管理': [
    {
      label: '特训营管理',
      icon: 'fa-solid fa-campground',
      items: [
        { label: '特训营管理', link: '/点将管理/特训营管理/特训营管理/', icon: 'fa-solid fa-campground' },
        { label: '特训营点将管理', link: '/点将管理/特训营管理/特训营点将管理/', icon: 'fa-solid fa-pen-to-square' },
        { label: '特训营点将执行', link: '/点将管理/特训营管理/特训营点将执行/', icon: 'fa-solid fa-play' },
        { label: '活动点将执行', link: '/点将管理/特训营管理/活动点将执行/', icon: 'fa-solid fa-person-running' },
      ]
    },
    {
      label: '策划师点将',
      icon: 'fa-solid fa-user-tie',
      items: [
        { label: '活动点将管理', link: '/点将管理/策划师点将/活动点将管理/', icon: 'fa-solid fa-list-check' },
      ]
    },
    {
      label: '单店培训点将管理',
      icon: 'fa-solid fa-chalkboard-user',
      items: [
        { label: '单店点将管理', link: '/点将管理/单店培训点将管理/单店点将管理/', icon: 'fa-solid fa-pen-to-square' },
        { label: '单店点将执行', link: '/点将管理/单店培训点将管理/单店点将执行/', icon: 'fa-solid fa-play' },
      ]
    },
    {
      label: '基础管理',
      icon: 'fa-solid fa-gear',
      items: [
        { label: '讲师档案', link: '/点将管理/基础管理/讲师档案/', icon: 'fa-solid fa-id-card' },
        { label: '档案审批', link: '/点将管理/基础管理/档案审批/', icon: 'fa-solid fa-check-circle' },
        { label: '讲师排期', link: '/点将管理/基础管理/讲师排期/', icon: 'fa-solid fa-calendar-days' },
      ]
    },
    {
      label: '经销商点将',
      icon: 'fa-solid fa-shop',
      items: [
        { label: '单店点将', link: '/点将管理/经销商点将/单店点将/', icon: 'fa-solid fa-store' },
        { label: '活动点将', link: '/点将管理/经销商点将/活动点将/', icon: 'fa-solid fa-party-horn' },
        { label: '设计点将', link: '/点将管理/经销商点将/设计点将/', icon: 'fa-solid fa-palette' },
        { label: '特训营', link: '/点将管理/经销商点将/特训营/', icon: 'fa-solid fa-campground' },
      ]
    },
    {
      label: '设计师点将',
      icon: 'fa-solid fa-paint-brush',
      items: [
        { label: '设计师饱和度', link: '/点将管理/设计师点将/设计师饱和度/', icon: 'fa-solid fa-chart-simple' },
        { label: '设计师点将管理', link: '/点将管理/设计师点将/设计师点将管理/', icon: 'fa-solid fa-pen-to-square' },
        { label: '设计师点将执行', link: '/点将管理/设计师点将/设计师点将执行/', icon: 'fa-solid fa-play' },
      ]
    }
  ],
  '产品中心': [
    {
      label: '产品资料',
      icon: 'fa-solid fa-folder-open',
      items: [
        { label: '产品列表', link: '/产品中心/产品资料/产品列表/', icon: 'fa-solid fa-list' },
        { label: '产品分类', link: '/产品中心/产品资料/产品分类/', icon: 'fa-solid fa-sitemap' },
        { label: '产品变更列表', link: '/产品中心/产品资料/产品变更列表/', icon: 'fa-solid fa-rotate' },
        { label: '产品SM状态变更申请', link: '/产品中心/产品资料/产品SM状态变更申请/', icon: 'fa-solid fa-pen-to-square' },
        { label: '产品图册', link: '/产品中心/产品资料/产品图册/', icon: 'fa-solid fa-images' },
        { label: '产品图片上传', link: '/产品中心/产品资料/产品图片上传/', icon: 'fa-solid fa-upload' },
        { label: '产品推广等级维护', link: '/产品中心/产品资料/产品推广等级维护/', icon: 'fa-solid fa-star' },
        { label: '产品推广等级要求配置', link: '/产品中心/产品资料/产品推广等级要求配置/', icon: 'fa-solid fa-sliders' },
      ]
    },
    {
      label: '价目表',
      icon: 'fa-solid fa-tags',
      items: [
        { label: '价目表查询', link: '/产品中心/价目表/价目表查询/', icon: 'fa-solid fa-search-dollar' },
        { label: '跨事业部产品产品销售申请', link: '/产品中心/价目表/跨事业部产品产品销售申请/', icon: 'fa-solid fa-shuffle' },
        { label: '跨事业部产品销售清单', link: '/产品中心/价目表/跨事业部产品销售清单/', icon: 'fa-solid fa-table-list' },
        { label: '责任制内结价定价瓷砖参数配置', link: '/产品中心/价目表/责任制内结价定价瓷砖参数配置/', icon: 'fa-solid fa-cubes' },
        { label: '责任制内结价定价基础参数配置', link: '/产品中心/价目表/责任制内结价定价基础参数配置/', icon: 'fa-solid fa-wrench' },
      ]
    },
    {
      label: '库存',
      icon: 'fa-solid fa-warehouse',
      items: [
        { label: '库存查询', link: '/产品中心/库存/库存查询/', icon: 'fa-solid fa-magnifying-glass' },
        { label: '事业部库存查询', link: '/产品中心/库存/事业部库存查询/', icon: 'fa-solid fa-building' },
      ]
    },
    {
      label: '说明书',
      icon: 'fa-solid fa-book-open',
      items: [
        { label: '产品说明书', link: '/产品中心/说明书/产品说明书/', icon: 'fa-solid fa-book' },
        { label: '说明书查阅数据', link: '/产品中心/说明书/说明书查阅数据/', icon: 'fa-solid fa-chart-line' },
      ]
    }
  ],
  '电子合同管理': [
    {
      label: '基础管理',
      icon: 'fa-solid fa-gear',
      items: [
        { label: '合同模板管理', link: '/电子合同管理/基础管理/合同模板管理/', icon: 'fa-solid fa-file-code' },
      ]
    },
    {
      label: '经销商',
      icon: 'fa-solid fa-shop',
      items: [
        { label: '合同管理', link: '/电子合同管理/经销商/合同管理/', icon: 'fa-solid fa-file-contract' },
      ]
    },
    {
      label: '品牌方',
      icon: 'fa-solid fa-tag',
      items: [
        { label: '合同签署异常处理', link: '/电子合同管理/品牌方/合同签署异常处理/', icon: 'fa-solid fa-triangle-exclamation' },
      ]
    }
  ],
  '问题反馈': [
    {
      label: '问题反馈',
      icon: 'fa-solid fa-comment-dots',
      items: [
        { label: '问题反馈', link: '/问题反馈/问题反馈/', icon: 'fa-solid fa-pen-to-square' },
        { label: '问题回复', link: '/问题反馈/问题回复/', icon: 'fa-solid fa-reply' },
      ]
    }
  ],
  '开发管理': [
    {
      label: '值集配置',
      icon: 'fa-solid fa-table-list',
      items: [
        { label: '装修等级', link: '/开发管理/值集配置/装修等级/', icon: 'fa-solid fa-paint-roller' },
      ]
    }
  ],
  '财务管理': [
    {
      label: '预提与冲销',
      icon: 'fa-solid fa-receipt',
      items: [
        { label: '工程服务费冲销', link: '/财务管理/预提与冲销/工程服务费冲销/', icon: 'fa-solid fa-scissors' },
        { label: '额度内冲销报表', link: '/财务管理/预提与冲销/额度内冲销报表/', icon: 'fa-solid fa-table' },
        { label: '额度内预提报表', link: '/财务管理/预提与冲销/额度内预提报表/', icon: 'fa-solid fa-chart-bar' },
      ]
    },
    {
      label: '调整单',
      icon: 'fa-solid fa-sliders',
      items: [
        { label: '广告费调整申请单', link: '/财务管理/调整单/广告费调整申请单/', icon: 'fa-solid fa-bullhorn' },
        { label: '政策性补贴申请', link: '/财务管理/调整单/政策性补贴申请/', icon: 'fa-solid fa-award' },
        { label: '销售提价兑现', link: '/财务管理/调整单/销售提价兑现/', icon: 'fa-solid fa-check-circle' },
      ]
    },
    {
      label: '对账单',
      icon: 'fa-solid fa-file-invoice',
      items: [
        { label: '经销商余额明细查询', link: '/财务管理/对账单/经销商余额明细查询/', icon: 'fa-solid fa-wallet' },
        { label: '客户金税发票号码查询', link: '/财务管理/对账单/客户金税发票号码查询/', icon: 'fa-solid fa-receipt' },
        { label: '待兑现折扣折让对账单', link: '/财务管理/对账单/待兑现折扣折让对账单/', icon: 'fa-solid fa-file-contract' },
        { label: '额度内市场推广服务费对账单', link: '/财务管理/对账单/额度内市场推广服务费对账单/', icon: 'fa-solid fa-file-invoice-dollar' },
        { label: '额度外预算总额', link: '/财务管理/对账单/额度外预算总额/', icon: 'fa-solid fa-coins' },
        { label: '法人对账单', link: '/财务管理/对账单/法人对账单/', icon: 'fa-solid fa-building' },
        { label: '广告费余额查询', link: '/财务管理/对账单/广告费余额查询/', icon: 'fa-solid fa-ad' },
        { label: '政策性补贴申请', link: '/财务管理/对账单/政策性补贴申请/', icon: 'fa-solid fa-award' },
      ]
    }
  ]
}

const currentPath = computed(() => {
  // 确保路径以 / 开头，用于匹配
  const path = router.route.path
  return path.endsWith('/') ? path : path + '/'
})

function togglePanel(id) {
  if (expandedPanel.value === id) {
    expandedPanel.value = null
  } else {
    expandedPanel.value = id
    expandedGroup.value = secondaryNav[id]?.[0]?.label || null
  }
}

function toggleGroup(label) {
  expandedGroup.value = expandedGroup.value === label ? null : label
}

function navigateTo(link) {
  // 使用 withBase 确保 GitHub Pages base 路径正确
  router.go(withBase(link))
}

function resolvePanel(path) {
  if (path.includes('/家装管理/')) return '家装管理'
  if (path.includes('/工程管理/')) return '工程管理'
  if (path.includes('/门店管理/')) return '门店管理'
  if (path.includes('/财务管理/')) return '财务管理'
  if (path.includes('/经销合同管理/')) return '经销合同管理'
  if (path.includes('/点将管理/')) return '点将管理'
  if (path.includes('/产品中心/')) return '产品中心'
  if (path.includes('/电子合同管理/')) return '电子合同管理'
  if (path.includes('/问题反馈/')) return '问题反馈'
  if (path.includes('/开发管理/')) return '开发管理'
  return null
}

function resolveGroup(path) {
  if (path.includes('/家装管理/家装往来/')) return '家装往来'
  if (path.includes('/家装管理/项目交付/')) return '项目交付'
  if (path.includes('/家装管理/')) return '项目往来'
  if (path.includes('/工程管理/服务费/')) return '服务费'
  if (path.includes('/工程管理/项目交付/')) return '项目交付'
  if (path.includes('/工程管理/项目合同/')) return '项目合同'
  if (path.includes('/工程管理/合同与折扣/')) return '合同与折扣'
  if (path.includes('/工程管理/项目往来/')) return '项目往来'
  if (path.includes('/工程管理/项目商机/')) return '项目商机'
  if (path.includes('/门店管理/门店设置/')) return '门店设置'
  if (path.includes('/门店管理/门店档案/')) return '门店档案'
  if (path.includes('/门店管理/门店装修/')) return '门店装修'
  if (path.includes('/门店管理/门店报表/')) return '门店报表'
  if (path.includes('/门店管理/广告投放/')) return '广告投放'
  if (path.includes('/门店管理/装修报表/')) return '装修报表'
  if (path.includes('/门店管理/')) return '样品及长库龄管理'
  if (path.includes('/财务管理/调整单/')) return '调整单'
  if (path.includes('/财务管理/对账单/')) return '对账单'
  if (path.includes('/财务管理/')) return '预提与冲销'
  if (path.includes('/电子合同管理/品牌方/')) return '品牌方'
  if (path.includes('/电子合同管理/经销商/')) return '经销商'
  if (path.includes('/电子合同管理/')) return '基础管理'
  if (path.includes('/问题反馈/')) return '问题反馈'
  if (path.includes('/开发管理/')) return '值集配置'
  return null
}

const expandedPanel = ref(null)
const expandedGroup = ref('项目往来')

onMounted(() => {
  const p = currentPath.value
  // 根路径自动跳转到家装真实性核销（使用 withBase 确保 base 路径正确）
  if (p === '/' || p === '/index.html' || p === '/system-knowledge-base/' || p === '/system-knowledge-base/index.html') {
    router.go(withBase('/家装管理/项目往来/家装真实性核销/'))
    return
  }
  // 根据当前路径展开侧边栏
  const panel = resolvePanel(p)
  if (panel) expandedPanel.value = panel
  const group = resolveGroup(p)
  if (group) expandedGroup.value = group
})
</script>

<style scoped>
.kb-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #FFFFFF;
}

/* ===== 顶部导航栏 — 白底紫高亮 ===== */
.kb-topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 200;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.kb-logo-area {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.kb-logo-area:hover { opacity: 0.85; }

.kb-logo-mark {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #7C3AED;
  border-radius: 8px;
  color: #fff;
  box-shadow: 0 0 12px rgba(124,58,237,0.25);
}
.kb-logo-mark svg {
  width: 22px;
  height: 22px;
}

.kb-logo-title {
  font-weight: 700;
  font-size: 1.1rem;
  color: rgb(17, 24, 39);
  letter-spacing: 0.02em;
}

/* ===== 一级菜单栏 — 白底 ===== */
.kb-primary-nav {
  position: fixed;
  top: 56px;
  left: 0;
  bottom: 0;
  width: 88px;
  background: #F5F7FA;
  border-right: 1px solid #E5E7EB;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 8px;
  z-index: 150;
}

.kb-primary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 10px;
  margin: 0;
  color: #6B7280;
  width: 100%;
  white-space: nowrap;
}
.kb-primary-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.kb-primary-icon svg {
  width: 22px;
  height: 22px;
}
.kb-primary-item i {
  font-size: 1.3rem;
}
.kb-primary-item span {
  font-size: 0.78rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
}
.kb-primary-item:hover {
  background: rgba(124,58,237,0.08);
  color: #7C3AED;
}
.kb-primary-item.active {
  background: rgba(124,58,237,0.12);
  color: #7C3AED;
}

/* ===== 二级侧边栏面板 — 白底 ===== */
.kb-secondary-panel {
  position: fixed;
  top: 56px;
  left: 88px;
  bottom: 0;
  width: 200px;
  background: #FFFFFF;
  border-right: 1px solid #E5E7EB;
  z-index: 140;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(0,0,0,0.04);
}

.kb-panel-header {
  padding: 16px 16px 12px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.kb-panel-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: rgb(17,24,39);
}
.kb-panel-close {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: #F5F7FA;
  color: #6B7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  transition: all 0.2s;
}
.kb-panel-close:hover { background: #FEF2F2; color: #DC2626; }

.kb-panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.kb-nav-group { margin-bottom: 4px; }
.kb-nav-group-title {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  color: rgb(17,24,39);
  transition: all 0.2s;
}
.kb-nav-group-title:hover { background: rgba(124,58,237,0.08); }

.kb-arrow-svg {
  margin-left: auto;
  transition: transform 0.2s ease;
}
.kb-arrow-svg.rotated { transform: rotate(180deg); }

.kb-nav-group-items { padding: 4px 0; }

.kb-nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px 10px 28px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  color: #6B7280;
  transition: all 0.2s;
  border-radius: 8px;
  margin: 2px 6px;
}
.kb-nav-item i { font-size: 0.75rem; }
.kb-nav-item:hover { background: rgba(124,58,237,0.08); color: #7C3AED; }
.kb-nav-item.active { background: rgba(124,58,237,0.12); color: #7C3AED; font-weight: 600; }

/* ===== 主内容区域 — 白底 ===== */
.kb-main-content {
  margin-left: 88px;
  margin-top: 56px;
  min-height: calc(100vh - 56px);
  background: #FFFFFF;
  transition: margin-left 0.3s ease;
  padding: 0;
}
.kb-main-content.shifted {
  margin-left: 288px;
}

.kb-content-wrapper {
  width: 100%;
  max-width: 100%;
}

.kb-page-content {
  width: 100%;
}

/* ===== 动效 ===== */
.panel-slide-enter-active { transition: all 0.3s ease; }
.panel-slide-leave-active { transition: all 0.2s ease; }
.panel-slide-enter-from { transform: translateX(-100%); opacity: 0; }
.panel-slide-leave-to { transform: translateX(-100%); opacity: 0; }

.group-expand-enter-active { transition: all 0.2s ease; }
.group-expand-leave-active { transition: all 0.15s ease; }
.group-expand-enter-from { opacity: 0; }
.group-expand-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .kb-primary-nav { width: 56px; padding: 12px 4px; }
  .kb-secondary-panel { left: 56px; width: 180px; }
  .kb-main-content { margin-left: 56px; padding: 16px 12px; }
  .kb-main-content.shifted { margin-left: 236px; }
  .kb-primary-item span { display: none; }
}

/* ===== 知识库全局内容样式 ===== */

/* 统一底色白/浅灰交替 */
.kl-wrap .kl-card:nth-child(odd)  { background: #FFFFFF; }
.kl-wrap .kl-card:nth-child(even) { background: #FBFCFC; }

/* 重点逻辑全宽容器 */
.kl-wrap {
  padding: 0;
  max-width: 100%;
  width: 100%;
}
.kl-wrap .kl-card {
  width: 100%;
  max-width: 100%;
  padding: 24px 10%;
  border: none;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  margin-bottom: 0;
  box-sizing: border-box;
}

/* 卡片头部 */
.kl-card-header { margin-bottom: 12px; }

/* 卡片标题 */
.kl-card-title {
  font-size: 16px;
  font-weight: 700;
  color: #1F2937;
  margin: 0;
  line-height: 1.4;
}

/* 小标题（带紫色左边线） */
.kl-sub-title {
  font-size: 13px;
  font-weight: 700;
  color: #7C3AED;
  margin: 0 0 8px 0;
  padding-left: 10px;
  border-left: 3px solid #7C3AED;
  line-height: 1.4;
}

/* 列表 */
.kl-list {
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: klitem;
}
.kl-list li {
  padding: 8px 0 8px 32px;
  border-bottom: 1px solid #F3F4F6;
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  position: relative;
  counter-increment: klitem;
}
.kl-list li:last-child { border-bottom: none; }
.kl-list li::before {
  content: counter(klitem);
  position: absolute;
  left: 0;
  top: 8px;
  width: 22px;
  height: 22px;
  background: #7C3AED;
  color: #FFFFFF;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* 列表（无序号，只有项目符号） */
.kl-list.plain li::before { display: none; }
.kl-list.plain li { padding-left: 0; }

/* 副标题段落 */
.kl-sub-section {
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 16px 0 8px 0;
  padding-bottom: 4px;
  border-bottom: 1px solid #F3F4F6;
}

/* 标签 badge */
.kl-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(124,58,237,0.1);
  color: #7C3AED;
  vertical-align: middle;
  line-height: 1.6;
}
.kl-badge.red    { background: rgba(220,38,38,0.1);  color: #DC2626; }
.kl-badge.orange { background: rgba(234,88,12,0.1); color: #EA580C; }
.kl-badge.green  { background: rgba(22,163,74,0.1);  color: #16A34A; }
.kl-badge.yellow{ background: rgba(234,179,8,0.12); color: #B45309; }

/* 橙色实操提示 */
.kl-tip {
  background: #FEF3C7;
  border-left: 3px solid #F59E0B;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 13px;
  color: #92400E;
  margin: 8px 0;
  line-height: 1.6;
}

/* 警告/错误 */
.kl-warn {
  background: #FEF2F2;
  border-left: 3px solid #EF4444;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 13px;
  color: #991B1B;
  margin: 8px 0;
}
/* 公式框 */
.kl-formula-box {
  background: #FAF5FF;
  border-left: 3px solid #7C3AED;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 13px;
  color: #4C1D95;
  margin: 8px 0;
}
.kl-formula-label {
  font-size: 11px;
  font-weight: 600;
  color: #7C3AED;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.kl-formula-code {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #5B21B6;
  line-height: 1.6;
}

/* 高亮文字 */
.kl-highlight { background: rgba(124,58,237,0.12); color: #7C3AED; padding: 0 4px; border-radius: 4px; }
.kl-highlight-deep { background: rgba(124,58,237,0.2); color: #6D28D9; padding: 0 4px; border-radius: 4px; }
.kl-strong { font-weight: 700; color: #1F2937; }

/* 两栏对比 */
.kl-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 8px 0;
}
.kl-col-box {
  border-radius: 10px;
  padding: 14px 16px;
  font-size: 13px;
  line-height: 1.6;
}
.kl-col-box.pass   { background: #F0FDF4; border: 1px solid #86EFAC; color: #166534; }
.kl-col-box.cancel { background: #FEF2F2; border: 1px solid #FECACA; color: #991B1B; }
.kl-col-box.gray   { background: #F9FAFB; border: 1px solid #E5E7EB; color: #374151; }
.kl-col-box.info   { background: #EFF6FF; border: 1px solid #93C5FD; color: #1E40AF; }
.kl-col-box.warn   { background: #FFFBEB; border: 1px solid #FCD34D; color: #92400E; }
.kl-col-title {
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 6px;
}
.kl-col-items {
  font-size: 13px;
  line-height: 1.7;
}

/* 描述文字 */
.kl-desc {
  font-size: 14px;
  color: #4B5563;
  line-height: 1.7;
  margin: 6px 0;
}

/* 序号圆 */
.kl-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #7C3AED;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
  margin-right: 8px;
  vertical-align: middle;
}

/* Section 大标题 */
.kl-section-title {
  font-size: 15px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;
}

/* 表格 */
.kl-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin: 8px 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #E5E7EB;
}
.kl-table th {
  background: #F3F4F6;
  color: #374151;
  font-weight: 600;
  text-align: left;
  padding: 8px 12px;
  border-bottom: 1px solid #E5E7EB;
}
.kl-table td {
  padding: 8px 12px;
  color: #374151;
  border-bottom: 1px solid #F3F4F6;
  vertical-align: top;
}
.kl-table tr:last-child td { border-bottom: none; }

/* 通用 kb-module-alt */
.kb-module-alt {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

/* ===== 详细逻辑 dlm-* 模块体系 ===== */
.dlm-wrap {
  padding: 0;
  max-width: 100%;
  width: 100%;
}
.dlm-card {
  width: 100%;
  padding: 24px 10%;
  box-sizing: border-box;
  border-radius: 0;
  margin-bottom: 0;
}
.dlm-card:not(.alt) { background: #FFFFFF; }
.dlm-card.alt       { background: #FBFCFC; }

/* 模块标题行 */
.dlm-mod-header {
  font-size: 17px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 4px;
  line-height: 1.4;
}
.dlm-mod-sub {
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #E5E7EB;
}
.dlm-mod-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #7C3AED;
  color: #FFFFFF;
  font-size: 13px;
  font-weight: 700;
  margin-right: 8px;
  flex-shrink: 0;
  vertical-align: middle;
}

/* 小标题（复用 key-logic 风格） */
.dlm-sub-title {
  font-size: 13px;
  font-weight: 700;
  color: #7C3AED;
  margin: 20px 0 8px 0;
  padding-left: 10px;
  border-left: 3px solid #7C3AED;
  line-height: 1.4;
}

/* 状态机流转 */
.dlm-flow {
  display: flex;
  align-items: center;
  gap: 0;
  flex-wrap: wrap;
  margin: 8px 0;
}
.dlm-flow-node {
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  line-height: 1.4;
  flex-shrink: 0;
}
.dlm-flow-new      { background: #EFF6FF; border: 2px solid #93C5FD; color: #1E40AF; }
.dlm-flow-run      { background: #FEF3C7; border: 2px solid #FCD34D; color: #92400E; }
.dlm-flow-approved { background: #F0FDF4; border: 2px solid #86EFAC; color: #166534; }
.dlm-flow-rejected{ background: #FEF2F2; border: 2px solid #FCA5A5; color: #991B1B; }
.dlm-flow-any     { background: #F3F4F6; border: 2px solid #D1D5DB; color: #374151; }
.dlm-flow-cancel  { background: #F9FAFB; border: 2px solid #E5E7EB; color: #374151; }
.dlm-flow-arrow {
  padding: 0 12px;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  flex-shrink: 0;
}

/* 状态行 */
.dlm-state-row {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #F3F4F6;
}
.dlm-state-row:last-child { border-bottom: none; }
.dlm-state-badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
  margin-top: 2px;
}
.dlm-state-info {
  flex: 1;
  font-size: 13px;
  color: #374151;
  line-height: 1.6;
}

/* ===== biz-intro 样式 ===== */
.biz-hero {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: #FFFFFF;
  padding: 48px 32px;
  border-radius: 16px;
  margin-bottom: 24px;
  text-align: center;
}
.biz-hero h2 {
  margin: 0 0 8px;
  font-size: 1.8rem;
  font-weight: 800;
}
.biz-hero p { margin: 0; font-size: 1rem; opacity: 0.9; }
.biz-section { margin-bottom: 32px; }
.biz-section h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #E0E7FF;
}
.biz-tag-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.biz-tag {
  background: #EEF2FF; color: #4338CA; border-radius: 20px;
  padding: 4px 14px; font-size: 0.8rem; font-weight: 600;
}
.biz-flow-chart { margin: 16px 0; }
.biz-flow-step {
  display: flex; align-items: flex-start; gap: 12px;
  margin-bottom: 12px; padding: 12px; background: #F8FAFC;
  border-radius: 8px; border-left: 3px solid #3B82F6;
}
.biz-flow-num {
  width: 24px; height: 24px; border-radius: 50%;
  background: #3B82F6; color: #fff; font-size: 12px;
  font-weight: 700; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.biz-flow-content { flex: 1; }
.biz-flow-content strong { display: block; margin-bottom: 2px; color: #1E293B; }
.biz-flow-content span { font-size: 0.85rem; color: #64748B; }
.biz-roles { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 12px 0; }
.biz-role {
  padding: 12px; border-radius: 8px; font-size: 0.85rem;
  border-left: 3px solid;
}
.biz-role.blue { background: #EFF6FF; border-color: #3B82F6; }
.biz-role.purple { background: #F5F3FF; border-color: #7C3AED; }
.biz-role.orange { background: #FFF7ED; border-color: #F97316; }
.biz-formula {
  background: #1E293B; color: #E2E8F0; border-radius: 12px;
  padding: 20px 24px; font-family: 'Courier New', monospace;
  font-size: 0.9rem; margin: 16px 0; line-height: 1.8;
}
.biz-formula-label { color: #93C5FD; font-size: 0.75rem; margin-bottom: 8px; }
.biz-timeline { margin: 16px 0; }
.biz-tl-item {
  display: flex; gap: 12px; margin-bottom: 8px; align-items: flex-start;
}
.biz-tl-dot {
  width: 10px; height: 10px; border-radius: 50%; margin-top: 5px; flex-shrink: 0;
}
.biz-tl-text { font-size: 0.85rem; color: #374151; }

/* ===== biz-flow 样式 ===== */
.bf-stage {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 16px;
  margin: 24px 0;
}
.bf-stage-col {
  border-radius: 14px;
  padding: 20px 16px;
  position: relative;
}
.bf-stage-col.blue { background: #EFF6FF; border: 1px solid #BFDBFE; }
.bf-stage-col.purple { background: #F5F3FF; border: 1px solid #DDD6FE; }
.bf-stage-col.green { background: #F0FDF4; border: 1px solid #BBF7D0; }
.bf-col-title {
  font-size: 0.85rem; font-weight: 700; margin-bottom: 12px;
  padding-bottom: 8px; border-bottom: 1px solid rgba(0,0,0,0.08);
}
.bf-item {
  display: flex; align-items: flex-start; gap: 8px;
  margin-bottom: 10px; font-size: 0.82rem;
}
.bf-icon { font-size: 0.9rem; flex-shrink: 0; margin-top: 1px; }
.bf-icon.blue { color: #3B82F6; }
.bf-icon.purple { color: #7C3AED; }
.bf-icon.green { color: #16A34A; }
.bf-text { color: #374151; line-height: 1.4; }
.bf-arrow-col {
  display: flex; flex-direction: column; justify-content: center;
  align-items: center; gap: 8px;
}
.bf-arrow {
  font-size: 1.4rem; color: #9CA3AF;
}
.bf-sub-label {
  font-size: 0.7rem; color: #9CA3AF; text-align: center;
}
.bf-conditions {
  background: #F8FAFC; border: 1px solid #E2E8F0;
  border-radius: 12px; padding: 16px 20px; margin-top: 24px;
}
.bf-cond-title {
  font-size: 0.85rem; font-weight: 700; color: #374151;
  margin-bottom: 10px;
}
.bf-cond-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.bf-cond-table th {
  background: #F1F5F9; color: #475569; font-weight: 600;
  text-align: left; padding: 6px 10px;
}
.bf-cond-table td {
  padding: 5px 10px; border-bottom: 1px solid #F1F5F9;
  color: #374151;
}

/* ===== key-logic 样式（与 scoped 版本一致）====== */

.kl-wrap {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
}

.kl-wrap .kl-card {
  width: 100%;
  max-width: 100%;
  padding: 24px 10%;
  border: none;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  margin-bottom: 0;
}

.kl-wrap .kl-card.alt {
  background: #FAFAFC;
}

.kl-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.kl-card-title {
  flex: 1;
  margin: 0;
}

.kl-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #7C3AED;
  color: #FFFFFF;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}

.kl-badge {
  display: inline-block;
  background: #EDE9FE;
  color: #6D28D9;
  border-radius: 4px;
  padding: 1px 6px;
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  font-weight: 600;
}

.kl-tip {
  background: #FEF3C7;
  border-left: 4px solid #F59E0B;
  border-radius: 0 8px 8px 0;
  padding: 12px 16px;
  font-size: 0.85rem;
  color: #78350F;
  margin-top: 12px;
}

.kl-formula-box {
  background: #1E293B;
  color: #E2E8F0;
  border-radius: 8px;
  padding: 16px 20px;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  margin-top: 12px;
  line-height: 1.8;
}

.kl-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 12px;
}

.kl-col-box {
  background: #F8FAFC;
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 0.83rem;
  line-height: 1.6;
}

.kl-sub-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F1F5F9;
}

.kl-sub-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #7C3AED;
  margin: 0 0 8px;
}

.kl-warn {
  background: #FEF2F2;
  border-left: 4px solid #EF4444;
  border-radius: 0 8px 8px 0;
  padding: 10px 14px;
  font-size: 0.82rem;
  color: #991B1B;
  margin-top: 10px;
}

.kl-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
  font-size: 0.83rem;
}

.kl-table th {
  background: #F5F3FF;
  color: #6D28D9;
  font-weight: 700;
  text-align: left;
  padding: 8px 10px;
  border-bottom: 2px solid #DDD6FE;
}

.kl-table td {
  padding: 7px 10px;
  border-bottom: 1px solid #F1F5F9;
  color: #374151;
  vertical-align: top;
}

.kl-table tr:last-child td {
  border-bottom: none;
}

.kl-section-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #1E293B;
  margin: 0 0 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #E0E7FF;
}
</style>
