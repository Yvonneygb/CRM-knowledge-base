<template>
  <div class="smm-container">
    <!-- 头部说明 -->
    <div class="smm-header">
      <h2>📤 源MD管理</h2>
      <p class="smm-desc">点击某菜单的<strong>「上传」</strong>直接弹出窗口选择 .md 文件，载入后在该菜单右侧显示文件名；点击文件名在<strong>新窗口预览</strong>，确认无误后点<strong>「更新」</strong>才真正提交，自动更新对应菜单页的<strong>源码分析区块</strong>并保留手工整理的<strong>业务介绍/流程图</strong>。</p>
    </div>

    <!-- 后端连接状态 -->
    <div class="smm-alert" :class="backendReady ? 'ok' : 'warn'">
      <span v-if="backendReady">✅ 后端服务已连接（{{ apiBase }}）。点「更新」才会真正提交。</span>
      <span v-else>⚠️ 未检测到后端服务地址。当前只能「上传」载入预览，无法「更新」提交。请确认后端已部署并配置 <code>VITE_UPLOAD_API_URL</code>。</span>
    </div>

    <!-- 全局更新密钥 -->
    <div class="smm-field smm-secret">
      <label class="smm-label">🔑 更新密钥（管理员提供，仅「更新」提交时需要）</label>
      <input v-model="uploadSecret" type="password" class="smm-input" placeholder="KB_UPLOAD_SECRET" autocomplete="off" />
    </div>

    <!-- 区块说明 -->
    <div class="smm-rule">
      <div class="smm-rule-title">更新范围说明</div>
      <div class="smm-rule-body">
        <div><span class="dot red"></span><b>将被更新</b>：重点逻辑 key-logic、界面逻辑 detail-logic、权限、FAQ、更新记录、历史</div>
        <div><span class="dot green"></span><b>将保留</b>：业务介绍 biz-intro、业务流程图 biz-flow（手工整理内容）</div>
      </div>
    </div>

    <!-- 批量上传区 -->
    <div class="smm-batch">
      <div class="smm-batch-head">
        <h3>📦 批量上传（多文件）</h3>
        <span class="smm-batch-hint">选择多个 .md 文件，按文件名 <code>一级-二级-三级.md</code> 自动匹配菜单并载入其右侧。确认后点「更新全部」统一提交。</span>
      </div>
      <input ref="batchInput" type="file" accept=".md,.markdown,text/markdown" multiple @change="onBatchChange" class="smm-file" />
      <div v-if="batchFiles.length" class="smm-batch-list">
        <div v-for="bf in batchFiles" :key="bf.name" class="smm-batch-item">
          <span class="smm-batch-name">{{ bf.name }}</span>
          <span v-if="bf.matched" class="smm-batch-target">→ {{ bf.pagePath }}</span>
          <span v-else class="smm-batch-bad">⚠️ 无法匹配菜单</span>
          <span v-if="bf.state === 'done'" class="smm-batch-done">✅ {{ bf.result }}</span>
          <span v-if="bf.state === 'err'" class="smm-batch-err">❌ {{ bf.result }}</span>
          <span v-if="bf.state === 'ready'" class="smm-batch-ready">已载入暂存，待更新</span>
          <button v-if="bf.state === 'ready' && bf.matched" class="smm-btn-mini" :disabled="batchLoading" @click="updateBatchOne(bf)">更新</button>
        </div>
      </div>
      <div class="smm-batch-actions" v-if="batchFiles.length">
        <button class="smm-btn smm-btn-sub" :disabled="batchLoading || !batchHasReadyMatched" @click="runBatch">
          {{ batchLoading ? `更新中 ${batchDone}/${batchTotal}…` : '🔄 更新全部（提交）' }}
        </button>
        <button class="smm-btn smm-btn-ghost" :disabled="batchLoading" @click="clearBatch">清空</button>
      </div>
    </div>

    <!-- 菜单树 -->
    <div class="smm-tree-head">
      <h3>🌳 菜单树（按一级 → 二级 → 三级）</h3>
      <div class="smm-tree-tools">
        <button class="smm-link" @click="expandAll">全部展开</button>
        <span class="smm-sep">·</span>
        <button class="smm-link" @click="collapseAll">全部折叠</button>
        <span class="smm-sep">·</span>
        <span class="smm-count">共 {{ totalLeaves }} 个菜单</span>
      </div>
    </div>

    <div class="smm-tree" v-if="tree">
      <div v-for="lv1 in tree" :key="lv1.name" class="smm-lv1">
        <div class="smm-row smm-lv1-row" @click="toggle(lv1)">
          <span class="smm-caret" :class="{ open: lv1.open }">▶</span>
          <span class="smm-folder">📁</span>
          <span class="smm-node-name">{{ lv1.name }}</span>
          <span class="smm-leaf-count">{{ lv1.leafCount }}</span>
        </div>
        <div v-show="lv1.open" class="smm-children">
          <div v-for="lv2 in lv1.children" :key="lv2.name" class="smm-lv2">
            <div class="smm-row smm-lv2-row" @click="toggle(lv2)">
              <span class="smm-caret" :class="{ open: lv2.open }">▶</span>
              <span class="smm-folder">📂</span>
              <span class="smm-node-name">{{ lv2.name }}</span>
              <span class="smm-leaf-count">{{ lv2.leafCount }}</span>
            </div>
            <div v-show="lv2.open" class="smm-children">
              <div v-for="leaf in lv2.children" :key="leaf.path" class="smm-lv3">
                <div class="smm-row smm-lv3-row">
                  <span class="smm-caret-placeholder"></span>
                  <span class="smm-file">📄</span>
                  <span class="smm-node-name smm-leaf-name">{{ leaf.name }}</span>
                  <span class="smm-leaf-path">{{ leaf.path }}</span>

                  <!-- 已上传：显示文件名（可点击预览）+ 更新 + 移除 -->
                  <template v-if="loadedFiles[leaf.path]">
                    <span class="smm-filetag" title="点击在新窗口预览" @click.stop="openPreviewInNewWindow(leaf)">
                      <span class="smm-filetag-doc">📄</span>{{ loadedFiles[leaf.path].fileName }}
                    </span>
                    <button class="smm-btn-mini smm-btn-update-mini" :disabled="singleLoading===leaf.path" @click.stop="submitFor(leaf)">
                      {{ singleLoading===leaf.path ? '更新中…' : '🔄 更新' }}
                    </button>
                    <button class="smm-btn-mini smm-btn-remove" title="移除" @click.stop="removeLoaded(leaf)">✕</button>
                  </template>
                  <!-- 未上传：显示上传按钮 -->
                  <button v-else class="smm-btn smm-btn-mini" @click.stop="uploadFor(leaf)">上传</button>

                  <!-- 行内更新说明（已上传时） -->
                  <input v-if="loadedFiles[leaf.path]" v-model="notes[leaf.path]" class="smm-note-input"
                    placeholder="更新说明(可选)" @click.stop @keydown.stop @input="saveToStorage" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 全局更新结果 -->
    <div v-if="globalMsg" class="smm-msg" :class="globalMsgType">{{ globalMsg }}</div>

    <!-- 上传日志 -->
    <div class="smm-log" v-if="logs.length > 0">
      <h3>📋 最近更新日志</h3>
      <table class="smm-table">
        <thead>
          <tr><th>时间</th><th>页面</th><th>更新区块</th><th>说明</th><th>状态</th></tr>
        </thead>
        <tbody>
          <tr v-for="(l, i) in logs" :key="i">
            <td>{{ l.time }}</td>
            <td class="smm-mono">{{ l.file }}</td>
            <td>{{ (l.changedSections || []).join(', ') }}</td>
            <td>{{ l.note || '—' }}</td>
            <td><span class="smm-status">{{ l.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'

// ---------------- 内置菜单清单 ----------------
const ALL_PAGES = [
  '产品中心/产品资料/产品SM状态变更申请','产品中心/产品资料/产品分类','产品中心/产品资料/产品列表',
  '产品中心/产品资料/产品变更列表','产品中心/产品资料/产品图册','产品中心/产品资料/产品图片上传',
  '产品中心/产品资料/产品推广等级维护','产品中心/产品资料/产品推广等级要求配置',
  '产品中心/价目表/价目表查询','产品中心/价目表/责任制内结价定价基础参数配置',
  '产品中心/价目表/责任制内结价定价瓷砖参数配置','产品中心/价目表/跨事业部产品产品销售申请',
  '产品中心/价目表/跨事业部产品销售清单','产品中心/库存/事业部库存查询','产品中心/库存/库存查询',
  '产品中心/说明书/产品说明书','产品中心/说明书/说明书查阅数据',
  '家装管理/家装往来/家装核销发票上传','家装管理/家装往来/家装要货订单','家装管理/项目交付/家装折扣政策申请',
  '家装管理/项目往来/家装真实性核销',
  '工程管理/合同与折扣/工程折扣单','工程管理/合同与折扣/工程自营签收','工程管理/合同与折扣/项目合同失效',
  '工程管理/服务费/工程服务费兑现','工程管理/服务费/工程服务费报销','工程管理/服务费/服务费业务背景',
  '工程管理/项目交付/工程取消核销与发票作废','工程管理/项目交付/工程合同产品变更','工程管理/项目交付/工程折扣延期',
  '工程管理/项目交付/工程折扣政策失效','工程管理/项目交付/工程折扣政策申请','工程管理/项目交付/工程要货订单',
  '工程管理/项目交付/工程要货订单报表','工程管理/项目交付/折扣单报表','工程管理/项目交付/折扣政策明细查询（内部）',
  '工程管理/项目交付/提货时间变更','工程管理/项目交付/有效延期申请','工程管理/项目交付/紧急要货报表',
  '工程管理/项目交付/紧急要货插单','工程管理/项目交付/订单紧急要货',
  '工程管理/项目合同/经销商工程合同','工程管理/项目合同/自营工程合同',
  '工程管理/项目商机/价格保护函','工程管理/项目商机/单体项目报备','工程管理/项目商机/工程项目档案',
  '工程管理/项目商机/工程项目结案','工程管理/项目商机/战略报备变更','工程管理/项目商机/战略经理变更',
  '工程管理/项目商机/战略项目报备','工程管理/项目商机/报备生失效申请','工程管理/项目商机/报备解冻申请',
  '工程管理/项目商机/项目进度更新',
  '工程管理/项目往来/工程折扣政策','工程管理/项目往来/工程服务费预提','工程管理/项目往来/工程核销发票上传',
  '工程管理/项目往来/工程真实性核销','工程管理/项目往来/项目到款引入','工程管理/项目往来/项目到款认领',
  '工程管理/项目往来/项目到款认领撤销',
  '开发管理/值集配置/装修等级',
  '点将管理/单店培训点将管理/单店点将执行','点将管理/单店培训点将管理/单店点将管理',
  '点将管理/基础管理/档案审批','点将管理/基础管理/讲师排期','点将管理/基础管理/讲师档案',
  '点将管理/特训营管理/活动点将执行','点将管理/特训营管理/特训营点将执行','点将管理/特训营管理/特训营点将管理',
  '点将管理/特训营管理/特训营管理','点将管理/策划师点将/活动点将管理',
  '点将管理/经销商点将/单店点将','点将管理/经销商点将/活动点将','点将管理/经销商点将/特训营',
  '点将管理/经销商点将/设计点将','点将管理/设计师点将/设计师点将执行','点将管理/设计师点将/设计师点将管理',
  '点将管理/设计师点将/设计师饱和度',
  '电子合同管理/品牌方/合同签署异常处理','电子合同管理/基础管理/合同模板管理','电子合同管理/经销商/合同管理',
  '经销合同管理/合同管理/合同任务完成率','经销合同管理/合同管理/合同任务完成率明细报表',
  '经销合同管理/合同管理/年度营销政策','经销合同管理/合同管理/经销合同归档',
  '经销合同管理/报表中心/经销合同销售区域报表',
  '经销合同管理/销售合同/保证金减免申请','经销合同管理/销售合同/合同保证金','经销合同管理/销售合同/年度经销合同',
  '经销合同管理/销售合同/经销合同变更','经销合同管理/销售合同/认缴概况','经销合同管理/销售合同/认缴申请',
  '财务管理/对账单/客户金税发票号码查询','财务管理/对账单/广告费余额查询','财务管理/对账单/待兑现折扣折让对账单',
  '财务管理/对账单/政策性补贴申请','财务管理/对账单/法人对账单','财务管理/对账单/经销商余额明细查询',
  '财务管理/对账单/额度内市场推广服务费对账单','财务管理/对账单/额度外预算总额',
  '财务管理/调整单/广告费调整申请单','财务管理/调整单/政策性补贴申请','财务管理/调整单/销售提价兑现',
  '财务管理/预提与冲销/工程服务费冲销','财务管理/预提与冲销/额度内冲销报表','财务管理/预提与冲销/额度内预提报表',
  '门店管理/广告投放/广告投放申请','门店管理/广告投放/广告报销发票兑现','门店管理/广告投放/广告费报销',
  '门店管理/样品及长库龄管理/样品及长库龄折扣政策','门店管理/样品及长库龄管理/样品及长库龄折扣政策失效',
  '门店管理/样品及长库龄管理/样品及长库龄要货订单',
  '门店管理/装修报表/兑现汇总','门店管理/装修报表/门店装修申请与进度更新报表','门店管理/装修报表/门店装修额度外报表',
  '门店管理/装修报表/门店验收与报销单报表','门店管理/装修报表/门额度内兑现统计报表',
  '门店管理/门店报表/出库单计算广告费明细报表','门店管理/门店报表/店面额度内兑现余额表','门店管理/门店报表/户外广告分布',
  '门店管理/门店报表/门店区域分布','门店管理/门店报表/门店统计分析','门店管理/门店报表/额度外占用预算明细',
  '门店管理/门店档案/新建门店申请','门店管理/门店档案/门店变更申请','门店管理/门店档案/门店档案',
  '门店管理/门店装修/门头展板兑现','门店管理/门店装修/门头展板报销申请单','门店管理/门店装修/门店装修申请与进度更新',
  '门店管理/门店装修/门店装修申请关闭','门店管理/门店装修/门店装修申请变更','门店管理/门店装修/门店装修额度内兑现',
  '门店管理/门店装修/门店装修额度外兑现','门店管理/门店装修/门店验收与报销单','门店管理/门店装修/额度内兑现批量复核',
  '门店管理/门店设置/经销商额度外限额','门店管理/门店设置/门头展板报销标准','门店管理/门店设置/门头验收信息设置',
  '门店管理/门店设置/门店照片设置','门店管理/门店设置/门店装修标准',
  '问题反馈/问题反馈','问题反馈/问题回复'
]

const SEP = '-'

// ---------------- 树状结构 ----------------
function buildTree() {
  const root = []
  const map = { name: 'ROOT', children: [] }
  const index = new Map()
  for (const p of ALL_PAGES) {
    const parts = p.split('/')
    let level = map
    let curPath = ''
    for (let i = 0; i < parts.length; i++) {
      curPath = curPath ? curPath + '/' + parts[i] : parts[i]
      let child = level.children.find(c => c.name === parts[i])
      if (!child) {
        child = {
          name: parts[i],
          path: curPath,
          children: [],
          isLeaf: i === parts.length - 1,
          open: true,
          leafCount: 0
        }
        level.children.push(child)
      }
      if (child.isLeaf) index.set(curPath, child)
      level = child
    }
  }
  function count(n) {
    if (n.isLeaf) { n.leafCount = 1; return 1 }
    n.leafCount = n.children.reduce((s, c) => s + count(c), 0)
    return n.leafCount
  }
  count(map)
  root.push(...map.children)
  return { root, index }
}

const { root, index } = buildTree()
const tree = root
const totalLeaves = ALL_PAGES.length

function toggle(node) { if (!node.isLeaf) node.open = !node.open }
function expandAll() { walk(n => { if (!n.isLeaf) n.open = true }) }
function collapseAll() { walk(n => { if (!n.isLeaf) n.open = false }) }
function walk(fn) {
  (function rec(list) {
    for (const n of list) { fn(n); rec(n.children) }
  })(tree)
}

// ---------------- 每菜单的已载入文件 与 预览 ----------------
const loadedFiles = reactive({})   // path -> { fileName, content }
const notes = reactive({})         // path -> 更新说明
const singleLoading = reactive({}) // path -> bool（更新中）

// ---------------- localStorage 持久化（上传后即保存，刷新不丢失） ----------------
const STORAGE_KEY = 'smm_loaded_files_v1'

function saveToStorage() {
  try {
    const payload = { files: loadedFiles, notes: notes }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch (e) {
    console.warn('本地保存失败（可能超过 localStorage 容量）：', e.message)
  }
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const data = JSON.parse(raw)
    if (data && data.files) {
      for (const path of Object.keys(data.files)) {
        loadedFiles[path] = data.files[path]
      }
    }
    if (data && data.notes) {
      for (const path of Object.keys(data.notes)) {
        notes[path] = data.notes[path]
      }
    }
  } catch (e) {
    console.warn('本地数据恢复失败：', e.message)
  }
}

function uploadFor(leaf) {
  // 动态创建一个隐藏 file input 并触发点击，弹出系统文件选择窗口
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.md,.markdown,text/markdown'
  input.style.display = 'none'
  document.body.appendChild(input)
  input.addEventListener('change', () => {
    const file = input.files && input.files[0]
    if (!file) { input.remove(); return }
    const reader = new FileReader()
    reader.onload = () => {
      loadedFiles[leaf.path] = { fileName: file.name, content: reader.result }
      saveToStorage() // 上传后即保存到本地
      input.remove()
    }
    reader.readAsText(file, 'utf-8')
  })
  input.click()
}

// 点击文件名 → 在新浏览器窗口打开 MD 预览
function openPreviewInNewWindow(leaf) {
  const item = loadedFiles[leaf.path]
  if (!item) return
  const html = md.render(item.content)
  const w = window.open('', '_blank', 'width=960,height=720')
  if (!w) { alert('浏览器阻止了弹出窗口，请允许本站弹出窗口后重试。'); return }
  w.document.write('<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8"><title>预览 · ' +
    escapeHtml(leaf.name) + '</title>' +
    '<style>body{font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;max-width:820px;margin:32px auto;padding:0 24px;line-height:1.8;color:#1F2937;font-size:15px}h1,h2,h3,h4{margin-top:28px;line-height:1.4;color:#1E293B}code{background:#F3F4F6;padding:2px 6px;border-radius:4px;font-family:ui-monospace,Menlo,monospace;font-size:0.9em}pre{background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:14px;overflow:auto}pre code{background:none;padding:0}blockquote{border-left:4px solid #C4B5FD;margin-left:0;padding-left:16px;color:#6D28D9}table{border-collapse:collapse;width:100%}th,td{border:1px solid #E2E8F0;padding:8px 12px;text-align:left}th{background:#F5F3FF}img{max-width:100%}a{color:#6D28D9}.top{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #E2E8F0;padding-bottom:10px;margin-bottom:20px}.file-name{color:#64748B;font-size:13px}</style></head><body>' +
    '<div class="top"><strong>📄 ' + escapeHtml(item.fileName) + '</strong><span class="file-name">' +
    escapeHtml(leaf.path) + '</span></div>' + html + '</body></html>')
  w.document.close()
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

function removeLoaded(leaf) {
  delete loadedFiles[leaf.path]
  delete notes[leaf.path]
  saveToStorage() // 移除后同步保存
}

// ---------------- 更新（提交） ----------------
async function submitFor(leaf) {
  const item = loadedFiles[leaf.path]
  if (!item) return
  if (!uploadSecret.value.trim()) { showMsg('err', '请先在「🔑 更新密钥」处填写管理员提供的密钥。'); return }
  if (!apiBase) { showMsg('err', '后端服务地址未配置，无法提交。请确认后端已部署并配置 VITE_UPLOAD_API_URL。'); return }
  singleLoading[leaf.path] = true
  showMsg('')
  try {
    const data = await uploadOne(leaf.path, item.content, notes[leaf.path] || '')
    showMsg('ok', `✅ 更新成功：${data.file}，区块 ${(data.changedSections||[]).join(', ')}。正在自动发布。`)
    loadLogs()
  } catch (err) {
    showMsg('err', `❌ 更新失败：${err.message}`)
  } finally {
    singleLoading[leaf.path] = false
  }
}

async function uploadOne(pagePath, content, note) {
  const resp = await fetch(`${apiBase}/api/upload-md`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Upload-Secret': uploadSecret.value
    },
    body: JSON.stringify({ pagePath: '/' + pagePath + '/', content, note: note || '' })
  })
  const data = await resp.json()
  if (!resp.ok) throw new Error(data.error || `HTTP ${resp.status}`)
  if (data.error) throw new Error(data.error)
  return data
}

// ---------------- 全局消息 ----------------
const globalMsg = ref('')
const globalMsgType = ref('ok')
function showMsg(type, msg) { globalMsgType.value = type || 'ok'; globalMsg.value = msg || '' }

// ---------------- 批量 ----------------
const batchInput = ref(null)
const batchFiles = ref([])
const batchLoading = ref(false)
const batchDone = ref(0)
const batchTotal = ref(0)

function parsePathFromName(name) {
  const base = name.replace(/\.(md|markdown)$/i, '').trim()
  const parts = base.split(SEP).map(s => s.trim()).filter(Boolean)
  if (parts.length !== 3) return null
  return parts.join('/')
}

function onBatchChange(e) {
  const files = Array.from(e.target.files || [])
  const list = files.map(f => {
    const p = parsePathFromName(f.name)
    return {
      file: f,
      name: f.name,
      pagePath: p && index.has(p) ? p : null,
      matched: !!(p && index.has(p)),
      state: 'ready',
      result: ''
    }
  })
  batchFiles.value = batchFiles.value.concat(list)
  e.target.value = ''
}

function clearBatch() {
  batchFiles.value = []
  batchDone.value = 0
  batchTotal.value = 0
}

async function updateBatchOne(bf) {
  if (!apiBase) { alert('后端服务地址未配置，无法提交。'); return }
  if (!uploadSecret.value.trim()) { alert('请先在「🔑 更新密钥」填写管理员提供的密钥。'); return }
  bf.state = 'loading'
  const text = await bf.file.text().catch(() => '')
  try {
    const data = await uploadOne(bf.pagePath, text, `批量上传（${bf.name}）`)
    bf.state = 'done'
    bf.result = `已更新 ${(data.changedSections||[]).join(', ')}`
  } catch (err) {
    bf.state = 'err'
    bf.result = err.message
  }
  loadLogs()
}

const batchHasReadyMatched = computed(() => batchFiles.value.some(f => f.state === 'ready' && f.matched))

async function runBatch() {
  if (!apiBase) { alert('后端服务地址未配置，无法提交。'); return }
  if (!uploadSecret.value.trim()) { alert('请先在「🔑 更新密钥」填写管理员提供的密钥。'); return }
  const pending = batchFiles.value.filter(f => f.state === 'ready')
  if (!pending.length) return
  const okFiles = pending.filter(f => f.matched)
  if (!okFiles.length) { alert('没有可匹配到菜单的文件。请按「一级-二级-三级.md」命名。'); return }
  batchLoading.value = true
  batchTotal.value = pending.length
  batchDone.value = 0
  for (const f of pending) {
    if (!f.matched) {
      f.state = 'err'
      f.result = '文件名无法匹配菜单（需 一级-二级-三级.md）'
      batchDone.value++
      continue
    }
    const text = await f.file.text().catch(() => '')
    try {
      const data = await uploadOne(f.pagePath, text, `批量上传（${f.name}）`)
      f.state = 'done'
      f.result = `已更新 ${(data.changedSections||[]).join(', ')}`
    } catch (err) {
      f.state = 'err'
      f.result = err.message
    }
    batchDone.value++
  }
  batchLoading.value = false
  loadLogs()
}

// ---------------- markdown 渲染（用于新窗口预览） ----------------
const md = new MarkdownIt({ html: true, linkify: true, breaks: true })

// ---------------- 后端地址与日志 ----------------
const uploadSecret = ref('')
const getApiBase = () => {
  if (typeof window === 'undefined') return null
  const injected = window.KB_UPLOAD_URL || window.KB_API_URL
  if (injected) return injected.replace(/\/$/, '')
  const host = window.location.hostname
  return (host === 'localhost' || host === '127.0.0.1') ? 'http://localhost:3456' : null
}
const apiBase = getApiBase()
const backendReady = computed(() => !!apiBase)

const logs = ref([])
async function loadLogs() {
  if (!apiBase) return
  try {
    const resp = await fetch(`${apiBase}/api/upload-log`, {
      headers: { 'X-Upload-Secret': uploadSecret.value || '__none__' }
    })
    if (resp.ok) {
      const data = await resp.json()
      logs.value = data
    }
  } catch (_) {}
}

onMounted(() => {
  loadFromStorage() // 恢复上次上传的文件（刷新后仍在）
  loadLogs()
})
</script>

<style scoped>
.smm-container { max-width: 980px; margin: 0 auto; font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif; color: #1F2937; }
.smm-header { margin-bottom: 16px; }
.smm-header h2 { margin: 0 0 6px; font-size: 1.5rem; color: #1E293B; }
.smm-desc { margin: 0; font-size: 0.85rem; color: #64748B; line-height: 1.7; }
.smm-desc code, .smm-batch-hint code { background: rgba(124,58,237,0.1); color: #6D28D9; padding: 1px 5px; border-radius: 4px; font-size: 0.8em; }
.smm-alert { padding: 10px 14px; border-radius: 10px; font-size: 0.82rem; margin-bottom: 14px; }
.smm-alert.ok { background: #ECFDF5; border: 1px solid #A7F3D0; color: #047857; }
.smm-alert.warn { background: #FFFBEB; border: 1px solid #FDE68A; color: #92400E; }
.smm-alert code { background: rgba(0,0,0,0.06); padding: 1px 5px; border-radius: 4px; }
.smm-secret { margin-bottom: 10px; }

.smm-field { margin-bottom: 14px; }
.smm-label { display: block; font-size: 0.83rem; font-weight: 700; color: #334155; margin-bottom: 6px; }
.smm-input, .smm-note-input {
  box-sizing: border-box; border: 1px solid #CBD5E1; border-radius: 8px;
  padding: 9px 12px; font-size: 0.83rem; color: #1F2937; background: #F8FAFC;
}
.smm-input { width: 100%; }
.smm-input:focus, .smm-note-input:focus { outline: none; border-color: #7C3AED; background: #fff; }

.smm-rule { border: 1px solid #E9D5FF; background: #FAF5FF; border-radius: 10px; padding: 12px 14px; margin-bottom: 18px; }
.smm-rule-title { font-size: 0.8rem; font-weight: 800; color: #7C3AED; margin-bottom: 8px; }
.smm-rule-body { font-size: 0.78rem; color: #334155; line-height: 1.9; }
.dot { display: inline-block; width: 9px; height: 9px; border-radius: 50%; margin-right: 7px; }
.dot.red { background: #EF4444; }
.dot.green { background: #10B981; }

/* 批量上传 */
.smm-batch { border: 1px solid #DBEAFE; background: #F0F9FF; border-radius: 12px; padding: 14px 16px; margin-bottom: 20px; }
.smm-batch-head { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; }
.smm-batch-head h3 { margin: 0; font-size: 1rem; color: #0C4A6E; }
.smm-batch-hint { font-size: 0.75rem; color: #64748B; }
.smm-batch-list { margin: 10px 0; display: flex; flex-direction: column; gap: 6px; }
.smm-batch-item { display: flex; align-items: center; gap: 10px; font-size: 0.8rem; background: #fff; border: 1px solid #E2E8F0; border-radius: 8px; padding: 7px 10px; flex-wrap: wrap; }
.smm-batch-name { font-family: ui-monospace, Menlo, monospace; font-size: 0.75rem; color: #1E293B; }
.smm-batch-target { color: #0D9488; font-size: 0.75rem; }
.smm-batch-bad { color: #DC2626; font-size: 0.75rem; }
.smm-batch-done { color: #059669; font-size: 0.75rem; }
.smm-batch-err { color: #DC2626; font-size: 0.75rem; }
.smm-batch-ready { color: #B45309; font-size: 0.72rem; background: #FEF3C7; border-radius: 4px; padding: 1px 6px; }
.smm-batch-actions { display: flex; gap: 10px; margin-top: 6px; }

/* 菜单树 */
.smm-tree-head { display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; margin-bottom: 10px; }
.smm-tree-head h3 { margin: 0; font-size: 1.1rem; color: #1E293B; }
.smm-tree-tools { font-size: 0.78rem; color: #64748B; }
.smm-link { background: none; border: none; color: #6D28D9; cursor: pointer; font-size: 0.78rem; padding: 0; }
.smm-link:hover { text-decoration: underline; }
.smm-sep { margin: 0 4px; color: #CBD5E1; }
.smm-count { color: #94A3B8; }

.smm-tree { border: 1px solid #E2E8F0; border-radius: 12px; padding: 8px 10px; background: #FCFCFD; }
.smm-row { display: flex; align-items: center; gap: 6px; padding: 5px 8px; border-radius: 8px; cursor: default; flex-wrap: wrap; }
.smm-lv1-row { font-weight: 800; font-size: 0.9rem; color: #312E81; cursor: pointer; }
.smm-lv2-row { font-weight: 700; font-size: 0.84rem; color: #4338CA; cursor: pointer; margin-left: 14px; }
.smm-lv3-row { font-size: 0.8rem; color: #334155; margin-left: 28px; }
.smm-lv3-row:hover { background: #F5F3FF; }
.smm-caret { font-size: 0.6rem; color: #94A3B8; transition: transform .15s; width: 12px; text-align: center; }
.smm-caret.open { transform: rotate(90deg); }
.smm-caret-placeholder { width: 12px; }
.smm-folder, .smm-file { font-size: 0.8rem; }
.smm-node-name { margin-right: 4px; }
.smm-leaf-name { font-weight: 600; color: #1E293B; }
.smm-leaf-path { color: #94A3B8; font-size: 0.68rem; font-family: ui-monospace, Menlo, monospace; flex: 1; }
.smm-leaf-count { background: #EDE9FE; color: #6D28D9; font-size: 0.65rem; font-weight: 700; border-radius: 999px; padding: 1px 8px; margin-left: 6px; }
.smm-children { margin-left: 8px; }

.smm-btn-mini { margin-left: 6px; padding: 3px 10px; font-size: 0.72rem; border: 1px solid #C4B5FD; background: #fff; color: #6D28D9; border-radius: 6px; cursor: pointer; white-space: nowrap; }
.smm-btn-mini:hover { background: #F5F3FF; }
.smm-btn-update-mini { background: #FFF1F2; border-color: #FDA4AF; color: #BE123C; }
.smm-btn-update-mini:hover { background: #FFE4E6; }
.smm-btn-remove { background: #fff; border-color: #E2E8F0; color: #94A3B8; padding: 3px 7px; }
.smm-btn-remove:hover { background: #FEF2F2; color: #DC2626; border-color: #FCA5A5; }

/* 已上传文件名标签 */
.smm-filetag {
  display: inline-flex; align-items: center; gap: 4px;
  background: #ECFDF5; border: 1px solid #6EE7B7; color: #065F46;
  font-size: 0.72rem; font-weight: 700; border-radius: 6px; padding: 2px 9px;
  cursor: pointer; white-space: nowrap; max-width: 200px; overflow: hidden; text-overflow: ellipsis;
}
.smm-filetag:hover { background: #D1FAE5; }
.smm-filetag-doc { font-size: 0.7rem; }

/* 行内更新说明 */
.smm-note-input { width: 130px; padding: 3px 8px; font-size: 0.72rem; border-radius: 6px; margin-left: 6px; }

/* 全局消息 */
.smm-msg { margin-top: 16px; padding: 12px 16px; border-radius: 10px; font-size: 0.85rem; line-height: 1.6; }
.smm-msg.ok { background: #ECFDF5; border: 1px solid #A7F3D0; color: #047857; }
.smm-msg.err { background: #FEF2F2; border: 1px solid #FECACA; color: #B91C1C; }

.smm-log { margin-top: 24px; }
.smm-log h3 { font-size: 1.05rem; color: #1E293B; margin: 0 0 10px; }
.smm-table { width: 100%; border-collapse: collapse; font-size: 0.75rem; background: #fff; border-radius: 10px; overflow: hidden; border: 1px solid #E8ECF0; }
.smm-table th { background: #F5F3FF; color: #7C3AED; padding: 8px 10px; text-align: left; }
.smm-table td { padding: 7px 10px; border-top: 1px solid #F1F5F9; color: #334155; }
.smm-mono { font-family: ui-monospace, Menlo, monospace; font-size: 0.7rem; }
.smm-status { color: #059669; font-weight: 700; }
</style>
