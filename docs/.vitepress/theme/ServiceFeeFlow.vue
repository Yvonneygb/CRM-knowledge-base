<template>
  <div class="svc-flow-page">
    <!-- 页面标题区 -->
    <div class="svc-hero">
      <div class="svc-hero-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 1v22"/>
          <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
        </svg>
      </div>
      <div class="svc-hero-text">
        <h1>服务费业务流</h1>
        <p class="svc-hero-desc">工程管理 · 服务费模块全景 — 报销→兑现、预提→冲销的双链路闭环</p>
      </div>
    </div>

    <!-- 核心公式卡片 -->
    <div class="svc-formula-card">
      <div class="svc-formula-label">服务费核心公式</div>
      <div class="svc-formula-content">
        <span class="svc-f-var">工程服务费</span>
        <span class="svc-f-op">=</span>
        <span class="svc-f-group"><span class="svc-f-var">工程方金额</span><span class="svc-f-op">−</span><span class="svc-f-var">经销商金额</span></span>
      </div>
      <div class="svc-formula-detail">
        = (工程方单价 × 数量) − (经销商单价 × 数量)
      </div>
      <div class="svc-formula-tags">
        <span class="svc-tag">工程方金额 = 工程方单价 × 数量</span>
        <span class="svc-tag">经销商金额 = 经销商单价 × 数量</span>
      </div>
    </div>

    <!-- 流程总览 — 双链路图 -->
    <div class="svc-flow-section">
      <h2 class="svc-section-title">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h5v8h-5"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
        双链路闭环流程
      </h2>
      <div class="svc-flow-diagram">
        <!-- 左链：报销→兑现 -->
        <div class="svc-chain svc-chain-left">
          <div class="svc-chain-label">链路 A · 报销兑现链</div>
          <div class="svc-chain-flow">
            <div class="svc-flow-node svc-node-start" @click="showDetail('报销')">
              <div class="svc-node-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
              </div>
              <div class="svc-node-title">服务费报销</div>
              <div class="svc-node-desc">基于签收明细行报销</div>
              <div class="svc-node-arrow">→</div>
            </div>
            <div class="svc-flow-node svc-node-mid" @click="showDetail('兑现')">
              <div class="svc-node-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              </div>
              <div class="svc-node-title">服务费兑现</div>
              <div class="svc-node-desc">报销单→兑现→推送ERP付款</div>
            </div>
          </div>
          <div class="svc-chain-connector">
            <svg viewBox="0 0 400 30" class="svc-connector-svg">
              <line x1="0" y1="15" x2="400" y2="15" stroke="#7C3AED" stroke-width="2" stroke-dasharray="6 4"/>
              <text x="200" y="12" fill="#6B7280" font-size="11" text-anchor="middle">审批通过后可参与兑现</text>
            </svg>
          </div>
          <div class="svc-chain-state svc-chain-state-a">
            <div class="svc-state-tag svc-state-new">新建</div>
            <div class="svc-state-arrow-svg">
              <svg viewBox="0 0 24 8" width="30" height="10"><line x1="0" y1="4" x2="24" y2="4" stroke="#7C3AED" stroke-width="1.5"/><polyline points="20 1 24 4 20 7" fill="none" stroke="#7C3AED" stroke-width="1.5"/></svg>
            </div>
            <div class="svc-state-tag svc-state-run">已提交(RUN)</div>
            <div class="svc-state-arrow-svg">
              <svg viewBox="0 0 24 8" width="30" height="10"><line x1="0" y1="4" x2="24" y2="4" stroke="#7C3AED" stroke-width="1.5"/><polyline points="20 1 24 4 20 7" fill="none" stroke="#7C3AED" stroke-width="1.5"/></svg>
            </div>
            <div class="svc-state-tag svc-state-approved">审批通过</div>
            <div class="svc-state-or">/</div>
            <div class="svc-state-tag svc-state-rebut">驳回</div>
          </div>
        </div>

        <!-- 右链：预提→冲销 -->
        <div class="svc-chain svc-chain-right">
          <div class="svc-chain-label">链路 B · 预提冲销链</div>
          <div class="svc-chain-flow">
            <div class="svc-flow-node svc-node-start" @click="showDetail('预提')">
              <div class="svc-node-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15l3 3 3-3"/></svg>
              </div>
              <div class="svc-node-title">服务费预提</div>
              <div class="svc-node-desc">基于合同金额预提</div>
              <div class="svc-node-arrow">→</div>
            </div>
            <div class="svc-flow-node svc-node-mid" @click="showDetail('冲销')">
              <div class="svc-node-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v6a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/><line x1="9" y1="14" x2="15" y2="20"/><line x1="15" y1="14" x2="9" y2="20"/></svg>
              </div>
              <div class="svc-node-title">服务费冲销</div>
              <div class="svc-node-desc">冲销预提/兑现金额</div>
            </div>
          </div>
          <div class="svc-chain-connector">
            <svg viewBox="0 0 400 30" class="svc-connector-svg">
              <line x1="0" y1="15" x2="400" y2="15" stroke="#7C3AED" stroke-width="2" stroke-dasharray="6 4"/>
              <text x="200" y="12" fill="#6B7280" font-size="11" text-anchor="middle">预提金额可被冲销</text>
            </svg>
          </div>
          <div class="svc-chain-state svc-chain-state-b">
            <div class="svc-state-tag svc-state-new">新建</div>
            <div class="svc-state-arrow-svg">
              <svg viewBox="0 0 24 8" width="30" height="10"><line x1="0" y1="4" x2="24" y2="4" stroke="#7C3AED" stroke-width="1.5"/><polyline points="20 1 24 4 20 7" fill="none" stroke="#7C3AED" stroke-width="1.5"/></svg>
            </div>
            <div class="svc-state-tag svc-state-run">已提交(RUN)</div>
            <div class="svc-state-arrow-svg">
              <svg viewBox="0 0 24 8" width="30" height="10"><line x1="0" y1="4" x2="24" y2="4" stroke="#7C3AED" stroke-width="1.5"/><polyline points="20 1 24 4 20 7" fill="none" stroke="#7C3AED" stroke-width="1.5"/></svg>
            </div>
            <div class="svc-state-tag svc-state-approved">审批通过</div>
            <div class="svc-state-or">/</div>
            <div class="svc-state-tag svc-state-rebut">驳回</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 数据表关系图 -->
    <div class="svc-table-section">
      <h2 class="svc-section-title">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        数据表流转关系
      </h2>
      <div class="svc-table-diagram">
        <!-- 报销链数据表 -->
        <div class="svc-table-chain">
          <div class="svc-table-card svc-table-head-card">
            <div class="svc-table-name">FIN_SVC_EXP_ACC_HEAD</div>
            <div class="svc-table-label">报销头表</div>
          </div>
          <div class="svc-table-arrow-down">
            <svg viewBox="0 0 20 40" width="20" height="40"><line x1="10" y1="0" x2="10" y2="36" stroke="#7C3AED" stroke-width="1.5"/><polyline points="6 32 10 36 14 32" fill="none" stroke="#7C3AED" stroke-width="1.5"/></svg>
          </div>
          <div class="svc-table-card svc-table-line-card">
            <div class="svc-table-name">FIN_SVC_EXP_ACC_LINE</div>
            <div class="svc-table-label">报销行表（关联签收明细）</div>
            <div class="svc-table-field">DIFFBILL_LINE_ID → 签收差异行</div>
          </div>
          <div class="svc-table-arrow-down">
            <svg viewBox="0 0 20 40" width="20" height="40"><line x1="10" y1="0" x2="10" y2="36" stroke="#7C3AED" stroke-width="1.5"/><polyline points="6 32 10 36 14 32" fill="none" stroke="#7C3AED" stroke-width="1.5"/></svg>
          </div>
          <div class="svc-table-card svc-table-cash-card">
            <div class="svc-table-name">EPM_EXPENSE_TO_CASH</div>
            <div class="svc-table-label">兑现记录表</div>
          </div>
        </div>

        <!-- 预提冲销链数据表 -->
        <div class="svc-table-chain">
          <div class="svc-table-card svc-table-wh-head-card">
            <div class="svc-table-name">EXPENSE_WITHHOLDING_HEAD</div>
            <div class="svc-table-label">预提头表</div>
          </div>
          <div class="svc-table-arrow-down">
            <svg viewBox="0 0 20 40" width="20" height="40"><line x1="10" y1="0" x2="10" y2="36" stroke="#7C3AED" stroke-width="1.5"/><polyline points="6 32 10 36 14 32" fill="none" stroke="#7C3AED" stroke-width="1.5"/></svg>
          </div>
          <div class="svc-table-card svc-table-wo-card">
            <div class="svc-table-name">EXPENSE_WRITEOFF_IN_QUOTA</div>
            <div class="svc-table-label">冲销记录表</div>
            <div class="svc-table-field">冲销预提金额 / 冲销兑现金额</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 模块详情卡片 -->
    <div class="svc-detail-section">
      <h2 class="svc-section-title">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
        各模块核心逻辑
      </h2>
      <div class="svc-detail-grid">
        <!-- 报销 -->
        <div class="svc-detail-card svc-detail-exp" :class="{ expanded: activeDetail === '报销' }" @click="showDetail('报销')">
          <div class="svc-detail-header">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
            <span>工程服务费报销</span>
          </div>
          <div class="svc-detail-body" v-if="activeDetail === '报销'">
            <div class="svc-detail-row"><span class="svc-detail-key">数据来源</span><span class="svc-detail-val">签收差异处理明细行 (DRP_DIFFPROCBILL_LINE)</span></div>
            <div class="svc-detail-row"><span class="svc-detail-key">关联字段</span><span class="svc-detail-val">DIFFBILL_LINE_ID → 签收差异行ID</span></div>
            <div class="svc-detail-row"><span class="svc-detail-key">审批通过后</span><span class="svc-detail-val">更新签收明细报销状态；可参与兑现</span></div>
            <div class="svc-detail-row"><span class="svc-detail-key">计算公式</span><span class="svc-detail-val">报销金额 = 工程方金额 − 经销商金额</span></div>
            <div class="svc-detail-row svc-detail-link-row"><span class="svc-detail-key">详细页面</span><a class="svc-detail-link" href="/工程管理/服务费/工程服务费报销/">查看完整文档 →</a></div>
          </div>
          <div class="svc-detail-expand-hint" v-else>点击展开详情</div>
        </div>

        <!-- 兑现 -->
        <div class="svc-detail-card svc-detail-cash" :class="{ expanded: activeDetail === '兑现' }" @click="showDetail('兑现')">
          <div class="svc-detail-header">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            <span>工程服务费兑现</span>
          </div>
          <div class="svc-detail-body" v-if="activeDetail === '兑现'">
            <div class="svc-detail-row"><span class="svc-detail-key">前置条件</span><span class="svc-detail-val">报销单已审批通过</span></div>
            <div class="svc-detail-row"><span class="svc-detail-key">审批通过后</span><span class="svc-detail-val">推送ERP付款；更新兑现状态</span></div>
            <div class="svc-detail-row"><span class="svc-detail-key">数据表</span><span class="svc-detail-val">EPM_EXPENSE_TO_CASH（兑现记录）</span></div>
            <div class="svc-detail-row svc-detail-link-row"><span class="svc-detail-key">详细页面</span><a class="svc-detail-link" href="/工程管理/服务费/工程服务费兑现/">查看完整文档 →</a></div>
          </div>
          <div class="svc-detail-expand-hint" v-else>点击展开详情</div>
        </div>

        <!-- 预提 -->
        <div class="svc-detail-card svc-detail-wh" :class="{ expanded: activeDetail === '预提' }" @click="showDetail('预提')">
          <div class="svc-detail-header">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15l3 3 3-3"/></svg>
            <span>工程服务费预提</span>
          </div>
          <div class="svc-detail-body" v-if="activeDetail === '预提'">
            <div class="svc-detail-row"><span class="svc-detail-key">数据来源</span><span class="svc-detail-val">基于合同金额预提</span></div>
            <div class="svc-detail-row"><span class="svc-detail-key">审批通过后</span><span class="svc-detail-val">记录预提金额；可被冲销</span></div>
            <div class="svc-detail-row"><span class="svc-detail-key">数据表</span><span class="svc-detail-val">EXPENSE_WITHHOLDING_HEAD（预提头）</span></div>
            <div class="svc-detail-row svc-detail-link-row"><span class="svc-detail-key">详细页面</span><a class="svc-detail-link" href="/工程管理/项目往来/工程服务费预提/">查看完整文档 →</a></div>
          </div>
          <div class="svc-detail-expand-hint" v-else>点击展开详情</div>
        </div>

        <!-- 冲销 -->
        <div class="svc-detail-card svc-detail-wo" :class="{ expanded: activeDetail === '冲销' }" @click="showDetail('冲销')">
          <div class="svc-detail-header">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v6a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/><line x1="9" y1="14" x2="15" y2="20"/><line x1="15" y1="14" x2="9" y2="20"/></svg>
            <span>工程服务费冲销</span>
          </div>
          <div class="svc-detail-body" v-if="activeDetail === '冲销'">
            <div class="svc-detail-row"><span class="svc-detail-key">冲销对象</span><span class="svc-detail-val">冲销预提金额 / 冲销兑现金额</span></div>
            <div class="svc-detail-row"><span class="svc-detail-key">审批通过后</span><span class="svc-detail-val">冲销预提→可重新预提；冲销兑现→回退报销</span></div>
            <div class="svc-detail-row"><span class="svc-detail-key">数据表</span><span class="svc-detail-val">EXPENSE_WRITEOFF_IN_QUOTA（冲销记录）</span></div>
            <div class="svc-detail-row"><span class="svc-detail-key">定时任务</span><span class="svc-detail-val">ExpenseWriteoffInQuotaJob 定时执行冲销</span></div>
            <div class="svc-detail-row svc-detail-link-row"><span class="svc-detail-key">详细页面</span><a class="svc-detail-link" href="/财务管理/预提与冲销/工程服务费冲销/">查看完整文档 →</a></div>
          </div>
          <div class="svc-detail-expand-hint" v-else>点击展开详情</div>
        </div>
      </div>
    </div>

    <!-- 审批流程 -->
    <div class="svc-approval-section">
      <h2 class="svc-section-title">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
        统一审批流程
      </h2>
      <div class="svc-approval-flow">
        <div class="svc-approval-node svc-ap-new">
          <div class="svc-ap-dot"></div>
          <span>新建 (NEW)</span>
        </div>
        <div class="svc-approval-arrow">
          <svg viewBox="0 0 40 12" width="40" height="12"><line x1="2" y1="6" x2="34" y2="6" stroke="#7C3AED" stroke-width="2"/><polyline points="30 2 34 6 30 10" fill="none" stroke="#7C3AED" stroke-width="2"/></svg>
        </div>
        <div class="svc-approval-node svc-ap-run">
          <div class="svc-ap-dot svc-ap-dot-run"></div>
          <span>审批中 (RUN)</span>
        </div>
        <div class="svc-approval-branch">
          <div class="svc-branch-line svc-branch-approve">
            <div class="svc-approval-arrow">
              <svg viewBox="0 0 40 12" width="40" height="12"><line x1="2" y1="6" x2="34" y2="6" stroke="#10B981" stroke-width="2"/><polyline points="30 2 34 6 30 10" fill="none" stroke="#10B981" stroke-width="2"/></svg>
            </div>
            <div class="svc-approval-node svc-ap-approved">
              <div class="svc-ap-dot svc-ap-dot-approved"></div>
              <span>审批通过 (APPROVED)</span>
            </div>
          </div>
          <div class="svc-branch-line svc-branch-rebut">
            <div class="svc-approval-arrow">
              <svg viewBox="0 0 40 12" width="40" height="12"><line x1="2" y1="6" x2="34" y2="6" stroke="#EF4444" stroke-width="2"/><polyline points="30 2 34 6 30 10" fill="none" stroke="#EF4444" stroke-width="2"/></svg>
            </div>
            <div class="svc-approval-node svc-ap-rebut">
              <div class="svc-ap-dot svc-ap-dot-rebut"></div>
              <span>驳回 (REBUT)</span>
            </div>
            <div class="svc-approval-arrow svc-arrow-back">
              <svg viewBox="0 0 40 12" width="40" height="12"><line x1="34" y1="6" x2="2" y2="6" stroke="#6B7280" stroke-width="1.5"/><polyline points="6 2 2 6 6 10" fill="none" stroke="#6B7280" stroke-width="1.5"/></svg>
            </div>
            <div class="svc-approval-node svc-ap-back">
              <span>重新编辑提交</span>
            </div>
          </div>
          <div class="svc-branch-line svc-branch-interrupt">
            <div class="svc-approval-arrow">
              <svg viewBox="0 0 40 12" width="40" height="12"><line x1="2" y1="6" x2="34" y2="6" stroke="#F59E0B" stroke-width="2"/><polyline points="30 2 34 6 30 10" fill="none" stroke="#F59E0B" stroke-width="2"/></svg>
            </div>
            <div class="svc-approval-node svc-ap-interrupt">
              <div class="svc-ap-dot svc-ap-dot-interrupt"></div>
              <span>终止 (INTERRUPT)</span>
            </div>
            <div class="svc-approval-arrow svc-arrow-delete">
              <svg viewBox="0 0 40 12" width="40" height="12"><line x1="34" y1="6" x2="2" y2="6" stroke="#DC2626" stroke-width="1.5"/><polyline points="6 2 2 6 6 10" fill="none" stroke="#DC2626" stroke-width="1.5"/></svg>
            </div>
            <div class="svc-approval-node svc-ap-delete">
              <span>可删除</span>
            </div>
          </div>
        </div>
      </div>
      <div class="svc-approval-note">所有4个服务费模块均集成 HZERO 工作流引擎，审批触发方法 <code>onUserSubmit</code>，回调方法 <code>wfComplete</code></div>
    </div>

    <!-- 交叉关系 — 服务费与回款 -->
    <div class="svc-cross-section">
      <h2 class="svc-section-title">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
        与回款认领的交叉关系
      </h2>
      <div class="svc-cross-diagram">
        <div class="svc-cross-center">
          <div class="svc-cross-hub">签收差异处理行<br/>DRP_DIFFPROCBILL_LINE</div>
        </div>
        <div class="svc-cross-left">
          <div class="svc-cross-card svc-cross-exp">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
            <span>服务费报销行</span>
            <div class="svc-cross-arrow-left">
              <svg viewBox="0 0 80 20" width="80" height="20"><line x1="80" y1="10" x2="4" y2="10" stroke="#7C3AED" stroke-width="1.5"/><polyline points="8 6 4 10 8 14" fill="none" stroke="#7C3AED" stroke-width="1.5"/></svg>
            </div>
          </div>
          <div class="svc-cross-card svc-cross-cash">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            <span>兑现记录</span>
          </div>
        </div>
        <div class="svc-cross-right">
          <div class="svc-cross-card svc-cross-allot">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 00-2-2v0a2 2 0 00-2 2v0"/><path d="M14 10V4a2 2 0 00-2-2v0a2 2 0 00-2 2v6"/><path d="M10 10.5V6a2 2 0 00-2-2v0a2 2 0 00-2 2v8"/><path d="M18 8a2 2 0 114 0v6a8 8 0 11-16 0v-4a2 2 0 014 0"/></svg>
            <span>回款认领明细</span>
            <div class="svc-cross-arrow-right">
              <svg viewBox="0 0 80 20" width="80" height="20"><line x1="0" y1="10" x2="76" y2="10" stroke="#7C3AED" stroke-width="1.5"/><polyline points="72 6 76 10 72 14" fill="none" stroke="#7C3AED" stroke-width="1.5"/></svg>
            </div>
          </div>
          <div class="svc-cross-card svc-cross-cancel">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
            <span>认领撤销明细</span>
          </div>
        </div>
        <div class="svc-cross-warning">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span>撤销认领校验链：撤销后报销单可结算工程服务费 ≥ 0，否则不允许撤销</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeDetail = ref(null)

function showDetail(name) {
  activeDetail.value = activeDetail.value === name ? null : name
}
</script>

<style scoped>
.svc-flow-page {
  padding: 0;
  max-width: 100%;
  color: #000;
  font-family: "DengXian", "等线", -apple-system, "Segoe UI", sans-serif;
}

/* ===== Hero ===== */
.svc-hero {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 32px 24px 24px;
  background: #FFFFFF;
}
.svc-hero-icon svg {
  width: 48px;
  height: 48px;
}
.svc-hero h1 {
  font-size: 2rem;
  font-weight: 900;
  color: rgb(17, 24, 39);
  margin: 0;
  line-height: 1.2;
}
.svc-hero-desc {
  font-size: 0.875rem;
  font-weight: 400;
  color: #6B7280;
  margin: 4px 0 0;
}

/* ===== Formula Card ===== */
.svc-formula-card {
  background: #F5F7FA;
  border-radius: 16px;
  padding: 24px 32px;
  margin: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.svc-formula-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #7C3AED;
  letter-spacing: 0.05em;
}
.svc-formula-content {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.25rem;
  font-weight: 700;
}
.svc-f-var { color: #7C3AED; }
.svc-f-op { color: #000; font-weight: 900; }
.svc-f-group { display: flex; align-items: center; gap: 8px; }
.svc-formula-detail {
  font-size: 0.9rem;
  font-weight: 400;
  color: #6B7280;
}
.svc-formula-tags {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.svc-tag {
  font-size: 0.8rem;
  font-weight: 400;
  color: #6B7280;
  background: #FFFFFF;
  padding: 4px 12px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
}

/* ===== Section Title ===== */
.svc-section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(17, 24, 39);
  margin: 0 24px 16px;
  padding-top: 24px;
}
.svc-section-title svg { flex-shrink: 0; }

/* ===== Flow Diagram — 双链路 ===== */
.svc-flow-section {
  background: #FFFFFF;
  padding-bottom: 24px;
}
.svc-flow-diagram {
  display: flex;
  gap: 24px;
  margin: 0 24px;
  flex-wrap: wrap;
}
.svc-chain {
  flex: 1;
  min-width: 280px;
  background: #F5F7FA;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.svc-chain-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #7C3AED;
  text-align: center;
  letter-spacing: 0.05em;
}
.svc-chain-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.svc-flow-node {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px solid transparent;
  min-width: 160px;
}
.svc-flow-node:hover {
  border-color: #7C3AED;
  box-shadow: 0 4px 12px rgba(124,58,237,0.15);
}
.svc-node-title {
  font-size: 1rem;
  font-weight: 700;
  color: rgb(17, 24, 39);
  text-align: center;
}
.svc-node-desc {
  font-size: 0.8rem;
  font-weight: 400;
  color: #6B7280;
  text-align: center;
}
.svc-node-arrow {
  font-size: 1.2rem;
  font-weight: 900;
  color: #7C3AED;
  margin-top: 4px;
}
.svc-chain-connector {
  text-align: center;
}
.svc-connector-svg {
  width: 100%;
  height: 30px;
}

/* ===== 状态流转标签 ===== */
.svc-chain-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
}
.svc-state-tag {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
}
.svc-state-new { background: #F5F7FA; color: #6B7280; }
.svc-state-run { background: rgba(124,58,237,0.12); color: #7C3AED; }
.svc-state-approved { background: rgba(16,185,129,0.12); color: #10B981; }
.svc-state-rebut { background: rgba(239,68,68,0.12); color: #EF4444; }
.svc-state-or { color: #6B7280; font-weight: 400; font-size: 0.75rem; }
.svc-state-arrow-svg { display: flex; align-items: center; }

/* ===== 数据表关系图 ===== */
.svc-table-section {
  background: #F5F7FA;
  padding-bottom: 24px;
}
.svc-table-diagram {
  display: flex;
  gap: 32px;
  margin: 0 24px;
  justify-content: center;
  flex-wrap: wrap;
}
.svc-table-chain {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.svc-table-card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 14px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 220px;
  border: 1px solid #E5E7EB;
  transition: all 0.2s;
}
.svc-table-card:hover {
  border-color: #7C3AED;
  box-shadow: 0 2px 8px rgba(124,58,237,0.1);
}
.svc-table-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: #7C3AED;
  text-align: center;
}
.svc-table-label {
  font-size: 0.75rem;
  font-weight: 400;
  color: #6B7280;
  text-align: center;
}
.svc-table-field {
  font-size: 0.7rem;
  font-weight: 400;
  color: #6B7280;
  text-align: center;
  font-family: monospace;
}
.svc-table-arrow-down {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ===== 详情卡片 ===== */
.svc-detail-section {
  background: #FFFFFF;
  padding-bottom: 24px;
}
.svc-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 0 24px;
}
.svc-detail-card {
  background: #F5F7FA;
  border-radius: 16px;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1.5px solid transparent;
}
.svc-detail-card:hover {
  border-color: #7C3AED;
}
.svc-detail-card.expanded {
  background: #FFFFFF;
  border-color: #7C3AED;
  box-shadow: 0 4px 16px rgba(124,58,237,0.15);
}
.svc-detail-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  font-weight: 700;
  color: rgb(17, 24, 39);
}
.svc-detail-body {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.svc-detail-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 0.85rem;
}
.svc-detail-key {
  font-weight: 600;
  color: #7C3AED;
  min-width: 80px;
  flex-shrink: 0;
}
.svc-detail-val {
  font-weight: 400;
  color: #000;
}
.svc-detail-expand-hint {
  font-size: 0.75rem;
  font-weight: 400;
  color: #6B7280;
  margin-top: 8px;
}
.svc-detail-link-row { margin-top: 8px; }
.svc-detail-link {
  color: #7C3AED;
  font-weight: 600;
  font-size: 0.85rem;
  text-decoration: none;
  transition: opacity 0.2s;
}
.svc-detail-link:hover { opacity: 0.75; }

/* ===== 审批流程 ===== */
.svc-approval-section {
  background: #F5F7FA;
  padding-bottom: 24px;
}
.svc-approval-flow {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 24px;
  flex-wrap: wrap;
}
.svc-approval-node {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 8px;
  background: #FFFFFF;
}
.svc-ap-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #6B7280;
}
.svc-ap-dot-run { background: #7C3AED; }
.svc-ap-dot-approved { background: #10B981; }
.svc-ap-dot-rebut { background: #EF4444; }
.svc-ap-dot-interrupt { background: #F59E0B; }
.svc-ap-new { color: #6B7280; }
.svc-ap-run { color: #7C3AED; }
.svc-ap-approved { color: #10B981; }
.svc-ap-rebut { color: #EF4444; }
.svc-ap-interrupt { color: #F59E0B; }
.svc-ap-back { color: #6B7280; font-weight: 400; font-size: 0.75rem; }
.svc-ap-delete { color: #DC2626; font-weight: 400; font-size: 0.75rem; }

.svc-approval-branch {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 8px;
}
.svc-branch-line {
  display: flex;
  align-items: center;
  gap: 8px;
}
.svc-approval-note {
  margin: 16px 24px 0;
  font-size: 0.8rem;
  font-weight: 400;
  color: #6B7280;
}
.svc-approval-note code {
  font-family: monospace;
  background: rgba(124,58,237,0.08);
  color: #7C3AED;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

/* ===== 交叉关系 ===== */
.svc-cross-section {
  background: #FFFFFF;
  padding-bottom: 32px;
}
.svc-cross-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 0 24px;
  flex-wrap: wrap;
  position: relative;
}
.svc-cross-center {
  flex-shrink: 0;
}
.svc-cross-hub {
  background: #7C3AED;
  color: #FFFFFF;
  border-radius: 16px;
  padding: 16px 24px;
  font-size: 0.9rem;
  font-weight: 700;
  text-align: center;
  min-width: 180px;
  line-height: 1.4;
}
.svc-cross-left, .svc-cross-right {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.svc-cross-card {
  background: #F5F7FA;
  border-radius: 12px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  color: rgb(17, 24, 39);
  min-width: 140px;
}
.svc-cross-arrow-left, .svc-cross-arrow-right {
  display: flex;
  align-items: center;
}
.svc-cross-warning {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(239,68,68,0.08);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #DC2626;
  margin: 16px 24px 0;
}

@media (max-width: 768px) {
  .svc-detail-grid { grid-template-columns: 1fr; }
  .svc-flow-diagram { flex-direction: column; }
  .svc-table-diagram { flex-direction: column; }
  .svc-cross-diagram { flex-direction: column; }
  .svc-approval-flow { flex-direction: column; align-items: flex-start; }
}
</style>
