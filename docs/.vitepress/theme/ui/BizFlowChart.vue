<template>
  <div class="bf-fc-svg-wrap">
    <svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1200 620" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#16A34A"/>
        </marker>
        <marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#3B82F6"/>
        </marker>
        <marker id="arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#EF4444"/>
        </marker>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/>
        </filter>
      </defs>

      <!-- ========== 上游支撑（正上方横带） ========== -->
      <rect x="50" y="20" width="1100" height="95" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="42" text-anchor="middle" fill="#1D4ED8" font-size="13" font-weight="600">上游支撑</text>

      <!-- 7 张子卡片横向平铺 -->
      <rect x="150" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="210" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">经销商主数据</text>

      <rect x="280" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="340" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">开票单位</text>

      <rect x="410" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="470" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">交易公司</text>

      <rect x="540" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="600" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">价目表</text>

      <rect x="670" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="730" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">促销政策</text>

      <rect x="800" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="860" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">产品资料</text>

      <rect x="930" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="990" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">审批设置</text>

      <!-- 上游→开始：蓝色虚线箭头 -->
      <line x1="80" y1="115" x2="80" y2="155" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>

      <!-- ========== 主流程 ========== -->
      <!-- 开始 -->
      <rect x="40" y="155" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="80" y="182" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>

      <!-- 开始→核心节点 -->
      <line x1="120" y1="177" x2="160" y2="177" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>

      <!-- 核心高亮节点：创建常规订单（7个内部步骤合并为1个节点） -->
      <rect x="160" y="150" width="160" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
      <text x="240" y="174" text-anchor="middle" fill="#FFFFFF" font-size="14" font-weight="700">★ 创建常规订单 ★</text>
      <text x="240" y="194" text-anchor="middle" fill="#DCFCE7" font-size="10">选经销商·渠道·产品线·开票单位·订单行·保存·提交</text>

      <!-- 核心节点→判断 -->
      <line x1="320" y1="177" x2="360" y2="177" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>

      <!-- 判断节点：OA审批通过？ -->
      <polygon points="440,140 520,177 440,214 360,177" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="440" y="174" text-anchor="middle" fill="#7C3AED" font-size="12" font-weight="600">⚖ OA审批</text>
      <text x="440" y="190" text-anchor="middle" fill="#7C3AED" font-size="12" font-weight="600">通过？</text>

      <!-- 通过分支：向下 -->
      <line x1="440" y1="214" x2="440" y2="250" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="405" y="250" width="70" height="28" rx="4" fill="#DCFCE7" stroke="#16A34A" stroke-width="1"/>
      <text x="440" y="269" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">通过 ✓</text>

      <!-- 通过→同步EBS -->
      <line x1="440" y1="278" x2="440" y2="310" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="380" y="310" width="120" height="44" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="440" y="337" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">同步EBS</text>

      <!-- 同步EBS→发货/出库 -->
      <line x1="440" y1="354" x2="440" y2="390" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="380" y="390" width="120" height="44" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="440" y="417" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">发货/出库</text>

      <!-- 发货→结束 -->
      <line x1="440" y1="434" x2="440" y2="475" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="385" y="475" width="110" height="40" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="440" y="500" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>

      <!-- 结束→下游：绿色虚线箭头 -->
      <line x1="440" y1="515" x2="440" y2="550" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>

      <!-- 拒绝分支：从菱形右点向右 -->
      <line x1="520" y1="177" x2="600" y2="177" stroke="#EF4444" stroke-width="2" marker-end="url(#arr-red)"/>
      <rect x="600" y="162" width="90" height="28" rx="4" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
      <text x="645" y="181" text-anchor="middle" fill="#DC2626" font-size="11" font-weight="600">拒绝 ✗</text>

      <!-- 拒绝返回路径：L形（先上再左） -->
      <line x1="645" y1="162" x2="645" y2="130" stroke="#EF4444" stroke-width="1.5"/>
      <line x1="645" y1="130" x2="240" y2="130" stroke="#EF4444" stroke-width="1.5"/>
      <line x1="240" y1="130" x2="240" y2="150" stroke="#EF4444" stroke-width="1.5" marker-end="url(#arr-red)"/>

      <!-- 拒绝说明标签 -->
      <rect x="560" y="200" width="200" height="28" rx="4" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
      <text x="660" y="219" text-anchor="middle" fill="#DC2626" font-size="11" font-weight="600">审批拒绝/审核退回/EBS退回</text>
      <line x1="660" y1="200" x2="660" y2="190" stroke="#EF4444" stroke-width="1.5"/>

      <!-- ========== 下游影响（正下方横带） ========== -->
      <rect x="50" y="550" width="1100" height="60" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="572" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>

      <!-- 5 张子卡片横向平铺 -->
      <rect x="100" y="580" width="130" height="22" rx="4" fill="#FFFFFF" stroke="#16A34A" stroke-width="1"/>
      <text x="165" y="595" text-anchor="middle" fill="#166534" font-size="10" font-weight="600">OA审批流程</text>

      <rect x="250" y="580" width="130" height="22" rx="4" fill="#FFFFFF" stroke="#16A34A" stroke-width="1"/>
      <text x="315" y="595" text-anchor="middle" fill="#166534" font-size="10" font-weight="600">EBS订单同步</text>

      <rect x="400" y="580" width="130" height="22" rx="4" fill="#FFFFFF" stroke="#16A34A" stroke-width="1"/>
      <text x="465" y="595" text-anchor="middle" fill="#166534" font-size="10" font-weight="600">出库/发货</text>

      <rect x="550" y="580" width="130" height="22" rx="4" fill="#FFFFFF" stroke="#16A34A" stroke-width="1"/>
      <text x="615" y="595" text-anchor="middle" fill="#166534" font-size="10" font-weight="600">折扣政策占用</text>

      <rect x="700" y="580" width="130" height="22" rx="4" fill="#FFFFFF" stroke="#16A34A" stroke-width="1"/>
      <text x="765" y="595" text-anchor="middle" fill="#166534" font-size="10" font-weight="600">定金预占/扣减</text>
    </svg>
  </div>
</template>

<script setup>
</script>
