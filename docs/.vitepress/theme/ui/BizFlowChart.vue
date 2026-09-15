<template>
  <div class="bf-fc-svg-wrap">
    <svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#16A34A"/>
        </marker>
        <marker id="arr-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#9CA3AF"/>
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
      <rect x="50" y="20" width="1100" height="95" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="42" text-anchor="middle" fill="#1D4ED8" font-size="13" font-weight="600">上游支撑</text>
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
      <line x1="80" y1="115" x2="80" y2="155" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
      <rect x="40" y="155" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="80" y="182" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
      <line x1="120" y1="177" x2="160" y2="177" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="160" y="155" width="110" height="44" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="215" y="182" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">选择经销商</text>
      <line x1="270" y1="177" x2="310" y2="177" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="310" y="155" width="160" height="44" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="390" y="182" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">选渠道/产品线/业务类型</text>
      <line x1="470" y1="177" x2="510" y2="177" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="510" y="155" width="110" height="44" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="565" y="182" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">选开票单位</text>
      <line x1="620" y1="177" x2="660" y2="177" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="660" y="155" width="110" height="44" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="715" y="182" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">新建订单行</text>
      <line x1="770" y1="177" x2="810" y2="177" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="810" y="150" width="100" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
      <text x="860" y="174" text-anchor="middle" fill="#FFFFFF" font-size="14" font-weight="700">★ 保存 ★</text>
      <text x="860" y="194" text-anchor="middle" fill="#DCFCE7" font-size="11">校验→生成订单编号</text>
      <line x1="910" y1="177" x2="950" y2="177" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="950" y="150" width="100" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
      <text x="1000" y="174" text-anchor="middle" fill="#FFFFFF" font-size="14" font-weight="700">★ 提交 ★</text>
      <text x="1000" y="194" text-anchor="middle" fill="#DCFCE7" font-size="11">分布式锁→二次确认</text>
      <line x1="1000" y1="204" x2="1000" y2="240" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <polygon points="1000,240 1080,280 1000,320 920,280" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="1000" y="284" text-anchor="middle" fill="#7C3AED" font-size="12" font-weight="600">⚖ OA审批通过？</text>
      <line x1="1000" y1="320" x2="1000" y2="370" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="935" y="370" width="130" height="30" rx="4" fill="#DCFCE7" stroke="#16A34A" stroke-width="1"/>
      <text x="1000" y="390" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">审批通过 ✓</text>
      <line x1="1000" y1="400" x2="1000" y2="440" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="940" y="440" width="120" height="44" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="1000" y="467" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">同步EBS</text>
      <line x1="1000" y1="484" x2="1000" y2="530" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="940" y="530" width="120" height="44" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="1000" y="557" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">发货/出库</text>
      <line x1="1000" y1="574" x2="1000" y2="620" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="945" y="620" width="110" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="1000" y="647" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
      <line x1="1080" y1="280" x2="1130" y2="280" stroke="#EF4444" stroke-width="2" marker-end="url(#arr-red)"/>
      <rect x="1100" y="265" width="90" height="28" rx="4" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
      <text x="1145" y="284" text-anchor="middle" fill="#DC2626" font-size="11" font-weight="600">拒绝 ✗</text>
      <line x1="1145" y1="265" x2="1145" y2="220" stroke="#EF4444" stroke-width="1.5"/>
      <line x1="1145" y1="220" x2="1050" y2="220" stroke="#EF4444" stroke-width="1.5"/>
      <line x1="1050" y1="220" x2="1050" y2="204" stroke="#EF4444" stroke-width="1.5" marker-end="url(#arr-red)"/>
      <rect x="200" y="370" width="200" height="30" rx="4" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
      <text x="300" y="390" text-anchor="middle" fill="#DC2626" font-size="11" font-weight="600">审批拒绝/审核退回/EBS退回 → 回到编辑态</text>
      <rect x="50" y="620" width="850" height="65" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="475" y="642" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
      <rect x="100" y="650" width="130" height="28" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="165" y="669" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">OA审批流程</text>
      <rect x="250" y="650" width="130" height="28" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="315" y="669" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">EBS订单同步</text>
      <rect x="400" y="650" width="130" height="28" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="465" y="669" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">出库/发货</text>
      <rect x="550" y="650" width="130" height="28" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="615" y="669" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">折扣政策占用</text>
      <rect x="700" y="650" width="130" height="28" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="765" y="669" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">定金预占/扣减</text>
    </svg>
  </div>
</template>

<script setup>
</script>
