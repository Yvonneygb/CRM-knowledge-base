# 订单-创建常规订单

<div id="biz-intro">
<div class="tab-pad">
<div class="kl-wrap">
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">业务是什么</span>
<h2>创建常规订单</h2>
<p>经销商通过 CRM/订单门户手工创建常规销售订单，经保存→提交→OA审批→同步EBS→发货出库的完整链路完成下单</p>
</div>
<div class="biz-2col-inner">
<div class="kl-col-box">
<h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0 0 10px;">为何要创建常规订单</h4>
<p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">解决两个业务诉求</p>
<ul style="font-size:0.78rem;color:#374151;line-height:1.8;padding-left:16px;margin:0;">
<li><strong>日常补货</strong> — 经销商按实际销售需求向公司下达采购订单</li>
<li><strong>价格管控</strong> — 通过促销政策/工程合同锁定折扣，确保价格合规</li>
</ul>
</div>
<div class="kl-col-box alt">
<h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0 0 10px;">创建基于什么</h4>
<p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">核心前置数据</p>
<ul style="font-size:0.78rem;color:#374151;line-height:1.8;padding-left:16px;margin:0;">
<li><strong>经销商主数据</strong> — 带出渠道、产品线、交易公司、签约方式</li>
<li><strong>促销政策/工程合同</strong> — 锁定折扣比例与封顶量</li>
<li><strong>审批设置</strong> — 按四要素匹配审批流配置</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</div>

<div id="biz-flow">
<div class="tab-pad">
<div class="kl-wrap">
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">流程</span>
<h2>创建常规订单全链路流程</h2>
<p>经销商登录 → 选择经销商 → 选渠道/产品线/业务类型 → 选开票单位 → 新建订单行 → 保存 → 提交 → OA审批 → 同步EBS → 发货</p>
</div>
<pre style="background:#1E1E1E !important;border-radius:8px !important;padding:16px !important;overflow-x:auto;"><code style="color:#D4D4D4 !important;font-size:0.82rem !important;">经销商登录CRM/订单门户
      │
      ▼
选择「订单-创建常规订单」(routine_order.html?mode=new)
      │
      ▼
①选择经销商(弹窗 LNK_ACCNT) —— 带出:渠道/产品线/交易公司/签约方式/币种/订单日期/扣款方式
      │
      ▼
②选择渠道→产品线→业务类型 → 选开票单位(弹窗 LNK_BILL_ACCOUNT,交易公司范围内)
      │
      ▼
③可选:添加促销政策(弹窗,选后清空订单行) / 选择合同(工程、家装渠道) / 选收件人(收货地址)
      │
      ▼
④新建订单行(产品选择弹窗 /portal/orderProduct/queryByExamplePage) → 设置申请数量
      ▼
⑤【保存】校验通过 → 生成订单编号(单据编码-流水号) → 状态=New(草稿)
      │
      ▼
⑥【提交】(submitSaleOrderApplyLock,分布式锁) → 各类提交校验 → 二次确认(BI配套率/折扣提货比例等)
      ▼
⑦状态=Submitted(已提交) → 抛OA审批(OrderLHApprovalCFG)
      ▼
⑧OA审批通过 → Approved(审核通过) → 同步EBS → 发货/出库
      ▲
      │ 审批拒绝 Rejected / 审核退回 approvedReturn / EBS退回 EbsReturn → 回到编辑态可重新提交</code></pre>
</div>
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">上游依赖</span>
<h2>本菜单依赖的上游模块</h2>
</div>
<table class="kl-table striped">
<thead><tr><th>上游模块</th><th>依赖类型</th><th>依赖说明</th><th>依赖成立条件</th></tr></thead>
<tbody>
<tr><td>经销商主数据（LNK_ACCNT）</td><td>数据依赖</td><td>选择经销商，带出渠道可选范围、产品线、交易公司、签约方式、币种、扣款方式、事业部(deptId)、计合同折扣/计广告费属性</td><td>经销商资料有效，客户分类1/2、所属事业部已维护</td></tr>
<tr><td>开票单位（LNK_BILL_ACCOUNT）</td><td>数据依赖</td><td>订单开票单位选择，带出法人客户信息、同控人信息</td><td>开票单位状态=Agree(已审核)，且属于所选经销商+交易公司范围</td></tr>
<tr><td>交易公司（LNK_ORG_COMPANY）</td><td>数据依赖</td><td>按经销商事业部+签约方式自动带出可选交易公司</td><td>签约方式有效，交易公司类型匹配</td></tr>
<tr><td>价目表（LNK_PRICE_LIST_ITEM）</td><td>数据依赖</td><td>订单行产品标准单价、整箱包装数、产品渠道、产品线来源</td><td>事业部价目表生效且含该产品</td></tr>
<tr><td>促销政策（LNK_DCT_POLICY_HEAD）</td><td>数据依赖</td><td>折扣政策选择，锁定折扣比例、封顶量、适用产品</td><td>政策生效、币种/渠道/业务类型/经销商区域匹配</td></tr>
<tr><td>产品资料（LNK_PROD）</td><td>数据依赖</td><td>产品编号、名称、型号、规格、颜色、体积、重量、单位、产品渠道、产品线、生命状态</td><td>产品有效，产品渠道包含订单渠道</td></tr>
<tr><td>工程合同（LNK_PROJECT_CONTRACT）</td><td>数据依赖</td><td>工程/家装渠道可选合同载体，带出工程项目名称、合同有效期、项目所在地、是否战略</td><td>合同状态=APPROVED(已批准)</td></tr>
<tr><td>收货地址（LNK_ACCT_ADDR）</td><td>数据依赖</td><td>收件人、收件电话、收货地址选择</td><td>地址类型=C(收货地址)、isEffective=Y</td></tr>
<tr><td>审批设置（LNK_APPROVAL_CFG）</td><td>配置依赖</td><td>保存时校验存在匹配的审批设置(订单类型+渠道+产品线+业务类型)、扣定金管控</td><td>审批设置已维护，四要素匹配</td></tr>
<tr><td>单据编码配置（LNK_ENCODING_CFG）</td><td>配置依赖</td><td>订单编号前缀(单据编码)来源</td><td>按事业部+订单类型已维护单据编号</td></tr>
<tr><td>客户账户/余额（LNK_BILL_ACCOUNT 信用管控）</td><td>数据依赖</td><td>信用管控经销商提交时校验账户余额</td><td>开票单位信用管控=Y</td></tr>
</tbody>
</table>
</div>
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">下游影响</span>
<h2>本菜单产生的下游影响</h2>
</div>
<ul style="font-size:0.85rem;color:#374151;line-height:2;padding-left:20px;margin:0;">
<li><strong>影响1：订单流转至 OA 审批</strong> — 提交后通过审批配置 OrderLHApprovalCFG 发起 OA 流程，状态变为 Submitted，OA 审核状态 lHreviweStatus 推进（PushFail 时可重推 OA）</li>
<li><strong>影响2：同步至 EBS（ERP）</strong> — 审批通过后的常规订单通过 synOrderToEbs 推送到 EBS，生成 EBS 订单头/订单行；EBS 退回则状态 EbsReturn，EBS 发货同步为 EbsSynchronization</li>
<li><strong>影响3：出库/发货</strong> — 审核通过后抛转生产、出库，订单行记录已发数量 lHbilleQty、未发货数量 lHunbilleQty、未发货金额，发货后状态流转至部分发货/已完成</li>
<li><strong>影响4：折扣政策封顶量占用</strong> — 有促销政策订单提交时占用政策产品封顶量(checkPolicyOrder / applyNum)，审核拒绝时回滚</li>
<li><strong>影响5：定金预占/扣定金</strong> — 扣定金经销商订单提交时按审批设置/定金比例预占定金，扣定金审核(deductSubscribtionApproval)通过后才实际扣减</li>
<li><strong>影响6：余额账户</strong> — 订单金额影响出库余额(obbalance)与客户账户余额校验</li>
</ul>
</div>
</div>
</div>
</div>

<div id="key-logic">
<div class="tab-pad">
<div class="kl-wrap">
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">核心</span>
<h2>重点逻辑1：订单编号生成规则</h2>
</div>
<p style="font-size:0.85rem;color:#374151;line-height:1.8;margin:0 0 12px;"><strong>业务意义：</strong>保证每个订单有唯一、可追溯的单号，格式与事业部单据编码一致</p>
<KbSubTitle title="具体逻辑" />
<ul style="font-size:0.85rem;color:#374151;line-height:2;padding-left:20px;margin:0;">
<li><strong>第1点：</strong>保存时若订单id为空（新建），按 事业部(deptId)+订单类型(orderType) 查询单据编码配置 LHEncodingCFG，未配置则报错"找不到单据编号,请联系相关人员维护"</li>
<li><strong>第2点：</strong>取当前日期"yyMM"（如 2026-09 → "2609"），调用流水号服务生成序号 num</li>
<li><strong>第3点：</strong>拼接订单编号 = 单据编码 + '-' + 流水号（如 <code>DD-2609XXXX</code>），写入订单头 ORDER_NO</li>
<li><strong>第4点：</strong>来源=OFD（外围系统）时使用固定前缀 "OFD-" 生成</li>
</ul>
</div>
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">联动</span>
<h2>重点逻辑2：选择经销商带出订单默认信息</h2>
</div>
<p style="font-size:0.85rem;color:#374151;line-height:1.8;margin:0 0 12px;"><strong>业务意义：</strong>减少手工录入，保证订单头信息与经销商主数据、开票数据一致</p>
<KbSubTitle title="具体逻辑" />
<ul style="font-size:0.85rem;color:#374151;line-height:2;padding-left:20px;margin:0;">
<li><strong>第1点：</strong>经销商弹窗选中后回填 acctId/acctCode/acctName/币种(lHcurrency)，并查询经销商详情(/portal/accnt/queryById)获取 deptId(事业部)、客户分类1/2、计合同折扣/计广告费属性</li>
<li><strong>第2点：</strong>按经销商自动带出渠道可选范围(lovChannelFilter，按订单类型+客户分类1/2+事业部过滤)、签约方式(setContractWay)、产品线(getProdLine)</li>
<li><strong>第3点：</strong>自动带出交易公司（经销→销售主体CompanyType=Sales；直销→工程主体CompanyType=Project；内部+展厅→强制Sales类型）</li>
<li><strong>第4点：</strong>币种、汇率(lHexchangeRate)由经销商带出后查询(via /portal/accnt/queryById)；计合同折扣/计广告费取经销商主数据属性</li>
<li><strong>第5点：</strong>新建时切换经销商会清空渠道/产品线/业务类型/开票单位/促销政策/收件人/交易公司等联动字段</li>
</ul>
</div>
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">联动</span>
<h2>重点逻辑3：渠道与产品线变更清空订单行</h2>
</div>
<p style="font-size:0.85rem;color:#374151;line-height:1.8;margin:0 0 12px;"><strong>业务意义：</strong>不同渠道/产品线对应不同价格体系与产品范围，变更后旧行必须清理避免脏数据</p>
<KbSubTitle title="具体逻辑" />
<ul style="font-size:0.85rem;color:#374151;line-height:2;padding-left:20px;margin:0;">
<li><strong>第1点：</strong>编辑态改变产品或渠道，弹窗提示"改变XX，订单行数据会清空"</li>
<li><strong>第2点：</strong>确认后标记 orderProdLineOrSalesChange=true，前端清空订单行表格、套件数据、总金额/总体积/总数量/折扣率，并清空已选促销政策</li>
<li><strong>第3点：</strong>保存(commitOrder)时若标记为 true，先调 batchDeleteByOrderId 删除原订单行再保存新头</li>
<li><strong>第4点：</strong>改变促销政策同样触发订单行清空（仅状态 New/Rejected/EbsReturn 且已保存过的订单）</li>
</ul>
</div>
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">核心</span>
<h2>重点逻辑4：促销政策与订单行价格计算</h2>
</div>
<p style="font-size:0.85rem;color:#374151;line-height:1.8;margin:0 0 12px;"><strong>业务意义：</strong>折扣政策决定订单行折后单价、应用折扣率、封顶量、是否计广告费，是价格管控核心</p>
<KbSubTitle title="具体逻辑" />
<ul style="font-size:0.85rem;color:#374151;line-height:2;padding-left:20px;margin:0;">
<li><strong>第1点：</strong>促销政策弹窗(/portal/lHPolicy/queryOrderPolicyByExamplePage)按订单类型+渠道+业务类型+经销商+币种过滤可选政策，选中回填 lHpromotionPolicyID/lHpromotionPolicy/折扣有效期/计广告费</li>
<li><strong>第2点：</strong>有政策订单新建订单行走政策树(getOrderPolicyTree→queryPcyItemProdByExamplePage)，按政策封顶量控制产品数量；无政策订单走普通产品选择</li>
<li><strong>第3点：</strong>【计算价格】按钮调 /portal/lHPolicy/calPriceOrderItem 按政策重算价格，无政策订单行编辑时按价目表更新价格</li>
<li><strong>第4点：</strong>订单行价格字段：标准单价(含安装)lHdealerPrice、安装单价 installPrice、标准单价(不含安装) exInstallPrice、折后单价(含/不含安装)、总金额(含/不含安装)、应用折扣率 lHfinalDiscount、暂扣定金金额 depositAdvanceAmount</li>
<li><strong>第5点：</strong>选择政策后订单行需满足政策要求（封顶量校验 checkMaxNum：任一政策等级校验通过即通过），否则报"产品数量不满足促销政策要求"</li>
</ul>
</div>
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">校验</span>
<h2>重点逻辑5：订单行数量管控</h2>
</div>
<p style="font-size:0.85rem;color:#374151;line-height:1.8;margin:0 0 12px;"><strong>业务意义：</strong>控制下单数量合法性（整箱/起订/库存/封顶/可转数量）</p>
<KbSubTitle title="具体逻辑" />
<ul style="font-size:0.85rem;color:#374151;line-height:2;padding-left:20px;margin:0;">
<li><strong>第1点：</strong>订单行添加/编辑弹窗数量需为正整数（常规单），DMS 端 Retail/Hardware/Online 渠道且启用整箱包装时必须为"整箱包装数"的倍数（样品类豁免）</li>
<li><strong>第2点：</strong>转单产生的订单行(lHOriginalRowQTY)编辑时申请数量不能大于原订单可转数量</li>
<li><strong>第3点：</strong>有折扣政策的行编辑，数量需通过 lHDctpolicylevel/checkMaxNum 封顶量校验</li>
<li><strong>第4点：</strong>提交时对常规/计划/配件/广告/废料/转卖/出口/礼品等类型校验"可供数量"（checkOrderQuantityControl，按月+产品起订量/生产周期/标准交付日期）</li>
<li><strong>第5点：</strong>提交前校验订单行产品生命状态(已淘汰产品 Z5 需二次确认，常规订单非淘汰产品提交时折扣率+1个点，由参数配置控制)</li>
</ul>
</div>
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">核心</span>
<h2>重点逻辑6：提交二次确认机制</h2>
</div>
<p style="font-size:0.85rem;color:#374151;line-height:1.8;margin:0 0 12px;"><strong>业务意义：</strong>部分校验仅作提醒（不阻断），用户确认后仍可提交，避免影响正常下单</p>
<KbSubTitle title="具体逻辑" />
<ul style="font-size:0.85rem;color:#374151;line-height:2;padding-left:20px;margin:0;">
<li><strong>第1点：</strong>提交接口(/portal/lHSaleOrder/submitSaleOrderApply)在命中"需提示"场景时返回 needConfirm(动态flag名称)+提示文案，前端弹 confirm</li>
<li><strong>第2点：</strong>用户确认后携带该 flag 再次调用同一接口（递归提交，confirmFlags 累加，仅在首次提交时重置）</li>
<li><strong>第3点：</strong>已支持的确认点：biConfirmFlag(BI配套率提醒)、discGoodsRatioControlFlag(超过折扣产品提货比例)、confirmFlag(成品/出口退货渠道校验)、companyConfirmFlag(退货单行合同交易公司与订单头不一致)等</li>
</ul>
</div>
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">核心</span>
<h2>重点逻辑7：扣定金管控</h2>
</div>
<p style="font-size:0.85rem;color:#374151;line-height:1.8;margin:0 0 12px;"><strong>业务意义：</strong>对信用管控/审批设置要求的经销商执行定金预占与实际扣减</p>
<KbSubTitle title="具体逻辑" />
<ul style="font-size:0.85rem;color:#374151;line-height:2;padding-left:20px;margin:0;">
<li><strong>第1点：</strong>保存/计算时结合审批设置(LHIsDeposit、DepositScale)与开票单位信用管控(lHisCreditControl)设置订单头"整单扣定金 lHdepositOrNot / 部分扣定金 itemKontSign"</li>
<li><strong>第2点：</strong>提交时 lhDepositService.decideOrderDepositInfo 按审批设置/定金比例计算订单行暂扣定金金额 depositAdvanceAmount、定金比例 depositScale</li>
<li><strong>第3点：</strong>【扣定金审核】(deductSubscribtionApproval)仅状态=Submitted 且订单产品线=卫浴/瓷砖且 OA 审核状态=Reviewed/WithoutReview 时可操作，通过后正式扣减定金</li>
<li><strong>第4点：</strong>订单头展示定金比例、定金金额、整单扣定金、部分扣定金、扣定金经销商等字段</li>
</ul>
</div>
</div>
</div>
</div>

<div id="detail-logic">
<div class="tab-pad">
<div class="kl-wrap">
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">界面模块1</span>
<h2>订单头-基本信息</h2>
<p>Vue 传统页面（非 hlod 低代码页面），字段来源：前端 routine_order.html 表单 + 后端 LNK_SALE_ORDER（LHSaleOrder 实体）</p>
</div>
<table class="kl-table striped">
<thead><tr><th>字段名</th><th>数据库列名</th><th>组件</th><th>业务释义</th><th>取值/赋值逻辑</th></tr></thead>
<tbody>
<tr><td>订单编号</td><td>LNK_SALE_ORDER.ORDER_NO</td><td>文本框</td><td>系统生成唯一订单号</td><td>新建时后端按 单据编码-流水号 生成；新建态为空；常显只读</td></tr>
<tr><td>经销商</td><td>LNK_SALE_ORDER.ACCT_ID / ACCT_NAME</td><td>弹窗选择框</td><td>下单经销商</td><td>弹窗(选择经销商)回填 acctId/acctCode/acctName；必输</td></tr>
<tr><td>经销商编码</td><td>LNK_SALE_ORDER.ACCT_CODE</td><td>文本框</td><td>经销商主数据编码</td><td>随经销商带出；常显只读</td></tr>
<tr><td>交易公司</td><td>LNK_SALE_ORDER.TRADE_COMPANY_ID / TRADE_COMPANY_NAME</td><td>下拉/文本框</td><td>开票/结算主体公司</td><td>默认按 事业部+签约方式 自动带出首个；可改时弹列表选择</td></tr>
<tr><td>开票单位</td><td>LNK_SALE_ORDER.BILL_ID / BILL_ID_NAME</td><td>弹窗选择框</td><td>开票单位（法人客户）</td><td>前置：先选经销商+交易公司；弹窗按 交易公司+开票状态Agree+经销商 过滤；必输</td></tr>
<tr><td>订单类型</td><td>LNK_SALE_ORDER.ORDER_TYPE</td><td>值集下拉（ORDER_TYPE）</td><td>固定=Common(常规)</td><td>initData 固定 orderType='Common'</td></tr>
<tr><td>渠道</td><td>LNK_SALE_ORDER.SALES_CHANNEL</td><td>下拉选择框</td><td>销售渠道（零售/工程/家装/电商等）</td><td>由 经销商+订单类型+客户分类+事业部 过滤(lovChannelFilter)；change 触发清行；必输</td></tr>
<tr><td>余额账户</td><td>LNK_SALE_ORDER.BALANCE_ID / BALANCE_NAME</td><td>文本框</td><td>经销商出库余额账户</td><td>后端 setOrderBalance 按经销商带出</td></tr>
<tr><td>订单状态</td><td>LNK_SALE_ORDER.STATUS</td><td>值集下拉（ORDER_STATUS）</td><td>订单流转状态</td><td>新建=New，提交=Submitted，审批通过=Approved 等</td></tr>
<tr><td>系统同步信息</td><td>LNK_SALE_ORDER.LH_SYNCHRONOUS_MESSAGE</td><td>多行文本框</td><td>EBS/OA同步结果信息</td><td>后端同步EBS/OA后回写</td></tr>
<tr><td>产品线</td><td>LNK_SALE_ORDER.ORDER_PROD_LINE</td><td>下拉选择框</td><td>订单产品线（卫浴/瓷砖/定制等）</td><td>getProdLine 按 事业部+订单类型=Common 查询；change触发清行；必输</td></tr>
<tr><td>期望到达日期</td><td>LNK_SALE_ORDER.LH_EXPECTED_ARRIVED_DATE</td><td>日期选择</td><td>期望到货日期</td><td>可选范围：昨天~一年内；必输；提交时校验不大于折扣政策/合同有效期</td></tr>
<tr><td>OA审核状态</td><td>LNK_SALE_ORDER.LH_REVIWE_STATUS</td><td>值集下拉</td><td>OA流程审核状态</td><td>提交后OA回调；PushFail 时显示"重推OA"链接</td></tr>
<tr><td>业务类型</td><td>LNK_SALE_ORDER.LH_BU_TYPE</td><td>下拉选择框</td><td>业务类型（常规/样品/冲差等）</td><td>值集 LH_BU_TYPE 按订单类型=Common 过滤；必输</td></tr>
<tr><td>订单日期</td><td>LNK_SALE_ORDER.SUBMISSION_DATE</td><td>日期</td><td>订单提交日期</td><td>提交时后端 setOrderSubmissionDateAndStatus 置为当前日期</td></tr>
<tr><td>扣款方式</td><td>LNK_SALE_ORDER.LH_ADVERTING_MONEY_TYPE</td><td>值集下拉</td><td>扣款方式=扣货款</td><td>新建默认 'PayForGoods'(扣货款)</td></tr>
<tr><td>签约方式</td><td>LNK_SALE_ORDER.CONTRACT_WAY</td><td>值集</td><td>经销/直销</td><td>按经销商分类自动匹配</td></tr>
<tr><td>所属事业部</td><td>LNK_SALE_ORDER.BUSINESS_DEPARTMENT / DEPT_ID</td><td>文本框</td><td>订单所属事业部</td><td>随经销商带出(depId→orgName)</td></tr>
<tr><td>币种</td><td>LNK_SALE_ORDER.LH_CURRENCY</td><td>文本框</td><td>订单币种</td><td>随经销商带出；影响促销政策与产品价格币种过滤</td></tr>
<tr><td>汇率</td><td>LNK_SALE_ORDER.LH_EXCHANGE_RATE</td><td>文本框</td><td>币种汇率</td><td>后端 queryExchangeRate 带出</td></tr>
<tr><td>含运费</td><td>LNK_SALE_ORDER.INCLUDE_FREIGHT_FLAG</td><td>复选框</td><td>是否含运费，Y=含</td><td>后端 setOrderIncludeFreightFlag 按经销商基础资料回写</td></tr>
</tbody>
</table>
</div>
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">界面模块2</span>
<h2>订单头-折扣政策/合同/收货/其他信息</h2>
</div>
<table class="kl-table striped">
<thead><tr><th>字段名</th><th>数据库列名</th><th>组件</th><th>业务释义</th><th>取值/赋值逻辑</th></tr></thead>
<tbody>
<tr><td>促销政策</td><td>LNK_SALE_ORDER.LH_PROMOTION_POLICY / LH_PROMOTION_POLICY_ID</td><td>弹窗选择框</td><td>选择的促销政策</td><td>前置：经销商+渠道；弹窗按 订单类型+渠道+业务类型+经销商+币种 过滤；变换后清空订单行</td></tr>
<tr><td>折扣有效期</td><td>LNK_SALE_ORDER.LH_DISCOUNT_END_TIME</td><td>日期</td><td>政策有效结束日期</td><td>随促销政策带出</td></tr>
<tr><td>扣定金经销商</td><td>LNK_SALE_ORDER.DEPOSIT_DEALER_FLAG</td><td>复选框</td><td>是否扣定金经销商</td><td>由审批设置/经销商基础资料带出</td></tr>
<tr><td>出库余额</td><td>LNK_SALE_ORDER.OBBALANCE</td><td>文本框</td><td>订单出库余额</td><td>后端 setOBBalance 带出</td></tr>
<tr><td>合同编号</td><td>LNK_SALE_ORDER.LH_CONTRACT_ID / LH_CONTRACT_NO</td><td>弹窗选择框</td><td>工程合同编号</td><td>仅渠道=工程/家装且需选合同时可点；前置：开票单位、未选促销政策</td></tr>
<tr><td>工程项目名称</td><td>LNK_SALE_ORDER.LH_CONTRACT_NAME</td><td>文本框</td><td>工程/项目名称</td><td>随合同带出</td></tr>
<tr><td>合同有效期</td><td>LNK_SALE_ORDER.LH_PROJECT_END_TIME</td><td>日期</td><td>合同有效结束日期</td><td>随合同带出</td></tr>
<tr><td>项目所在地</td><td>LNK_SALE_ORDER.PROJECT_LOCATION</td><td>文本框</td><td>项目所在地</td><td>随合同带出</td></tr>
<tr><td>合同名称</td><td>LNK_SALE_ORDER.CONTRACT_NAME</td><td>文本框</td><td>合同名称</td><td>随合同带出</td></tr>
<tr><td>是否战略</td><td>LNK_SALE_ORDER.IS_STRATEGY</td><td>复选框</td><td>是否战略合同</td><td>随合同带出</td></tr>
<tr><td>收件人</td><td>LNK_SALE_ORDER.LH_CONSIGNEE_ID / CONSIGNEE</td><td>弹窗选择框</td><td>收货人</td><td>弹窗按 经销商+地址类型C+有效 过滤；必输</td></tr>
<tr><td>收件人电话</td><td>LNK_SALE_ORDER.CONSIGNEE_PHONE</td><td>文本框</td><td>收货人电话</td><td>随收件人带出</td></tr>
<tr><td>收件人地址</td><td>LNK_SALE_ORDER.CONSIGNEE_ADDRESS</td><td>文本框</td><td>收货地址</td><td>随收件人带出；提交时若含运费二次确认</td></tr>
<tr><td>总体积</td><td>LNK_SALE_ORDER.LH_TOTAL_VOLUME</td><td>文本框</td><td>订单行总体积</td><td>订单行增删改后由 saveTotalVolumeAndTotalNum 汇总</td></tr>
<tr><td>总数量</td><td>LNK_SALE_ORDER.LH_TOTAL_NUM</td><td>文本框</td><td>订单行总数量</td><td>同上汇总</td></tr>
<tr><td>总金额</td><td>LNK_SALE_ORDER.TOTAL_AMOUNT</td><td>文本框</td><td>订单总金额(含安装)</td><td>订单行汇总后回填</td></tr>
<tr><td>折扣类型</td><td>LNK_SALE_ORDER.LH_DISCOUNT_TYPE</td><td>值集</td><td>折扣类型</td><td>新建默认 'SameDiscount'(折扣不变)</td></tr>
<tr><td>折扣率</td><td>LNK_SALE_ORDER.LH_DISCOUNT_RATE</td><td>文本框</td><td>订单折扣率</td><td>随政策/全年折扣展示</td></tr>
<tr><td>定金比例</td><td>LNK_SALE_ORDER.DEPOSIT_SCALE</td><td>文本框</td><td>定金比例</td><td>提交时按审批设置/政策计算</td></tr>
<tr><td>定金金额</td><td>LNK_SALE_ORDER.DEPOSIT_SUM</td><td>文本框</td><td>定金金额</td><td>提交时计算</td></tr>
<tr><td>整单扣定金</td><td>LNK_SALE_ORDER.LH_DEPOSIT_OR_NOT</td><td>复选框</td><td>整单扣定金标识</td><td>后端按审批设置+信用管控设置</td></tr>
<tr><td>部分扣定金</td><td>LNK_SALE_ORDER.ITEM_KONT_SIGN</td><td>复选框</td><td>部分扣定金标识</td><td>后端按审批设置设置</td></tr>
<tr><td>备注</td><td>LNK_SALE_ORDER.REMARKS</td><td>多行文本框</td><td>订单备注</td><td>手工录入</td></tr>
<tr><td>关闭原因</td><td>LNK_SALE_ORDER.LH_RETURN_REASON</td><td>多行文本框</td><td>订单关闭/退回原因</td><td>后端/审批退回时写</td></tr>
</tbody>
</table>
</div>
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">界面模块3</span>
<h2>明细-订单行（明细基本信息）</h2>
<p>表对象：LNK_SALE_ORDER_ITEM（LHSaleOrderItem），查询接口 /portal/lHSaleOrderItem/queryByExamplePage（入参 orderId）</p>
</div>
<table class="kl-table striped">
<thead><tr><th>字段名</th><th>数据库列名</th><th>组件</th><th>业务释义</th><th>取值/赋值逻辑</th></tr></thead>
<tbody>
<tr><td>序号</td><td>-</td><td>表格序号</td><td>行序号</td><td>自动</td></tr>
<tr><td>产品编号</td><td>LNK_SALE_ORDER_ITEM.PROD_CODE</td><td>表格列</td><td>产品编码</td><td>产品选择弹窗带出</td></tr>
<tr><td>产品名称</td><td>LNK_SALE_ORDER_ITEM.PROD_NAME</td><td>表格列</td><td>产品名称</td><td>产品选择弹窗带出</td></tr>
<tr><td>产品线</td><td>LNK_SALE_ORDER_ITEM.LH_PROD_LINE</td><td>表格列</td><td>产品所属产品线</td><td>产品资料带出</td></tr>
<tr><td>产品型号</td><td>LNK_SALE_ORDER_ITEM.LH_MODEL</td><td>表格列</td><td>产品型号</td><td>产品资料带出</td></tr>
<tr><td>整箱包装数</td><td>LNK_SALE_ORDER_ITEM.PACKAGE_NUMBER</td><td>表格列</td><td>整箱包装数</td><td>产品资料带出；DMS端整箱数量校验依据</td></tr>
<tr><td>申请数量</td><td>LNK_SALE_ORDER_ITEM.QTY</td><td>编辑列/行编辑</td><td>下单数量</td><td>新建默认1；正整数；校验见重点逻辑5</td></tr>
<tr><td>标准单价(含安装)</td><td>LNK_SALE_ORDER_ITEM.LH_DEALER_PRICE</td><td>表格列</td><td>价目表标准单价</td><td>价目表带出；保存/计算价格后按政策或价格表</td></tr>
<tr><td>安装单价</td><td>LNK_SALE_ORDER_ITEM.INSTALL_PRICE</td><td>表格列</td><td>安装费单价</td><td>价目表带出</td></tr>
<tr><td>标准单价(不含安装)</td><td>LNK_SALE_ORDER_ITEM.EX_INSTALL_PRICE</td><td>表格列</td><td>不含安装标准单价</td><td>标准单价-安装单价</td></tr>
<tr><td>包安装否</td><td>LNK_SALE_ORDER_ITEM.PACKAGE_INSTALL</td><td>复选框列</td><td>是否包安装</td><td>产品/价目表带出；包安装时订单类型若禁止则提交拒绝</td></tr>
<tr><td>工程方单价</td><td>LNK_SALE_ORDER_ITEM.LH_PROJECT_PRICE</td><td>表格列</td><td>工程方价</td><td>价目表带出</td></tr>
<tr><td>计合同折扣(原/新)</td><td>LNK_SALE_ORDER_ITEM.NEXT_REBATES / NEXT_YEAR_DISCOUNT_FLAG</td><td>是/否标签列</td><td>是否计合同折扣</td><td>(原)=价目表值；(新)=结合订单头+价目表最终生效值</td></tr>
<tr><td>计广告费(原/新)</td><td>LNK_SALE_ORDER_ITEM.ADVERTISING_MONEY / AD_FLAG</td><td>是/否标签列</td><td>是否计广告费</td><td>(原)=价目表值；(新)=最终生效值</td></tr>
<tr><td>计开单折扣(原/新)</td><td>LNK_SALE_ORDER_ITEM.LH_DISCOUNT_MONEY / DISCOUNT_POLICY_FLAG</td><td>是/否标签列</td><td>是否计开单折扣</td><td>(原)=价目表值；(新)=最终生效值</td></tr>
<tr><td>定金比例</td><td>LNK_SALE_ORDER_ITEM.DEPOSIT_SCALE</td><td>表格列</td><td>行定金比例</td><td>提交/扣定金审核计算</td></tr>
<tr><td>暂扣定金金额</td><td>LNK_SALE_ORDER_ITEM.DEPOSIT_ADVANCE_AMOUNT</td><td>表格列</td><td>行暂扣定金</td><td>提交时计算</td></tr>
<tr><td>应用折扣率</td><td>LNK_SALE_ORDER_ITEM.LH_FINAL_DISCOUNT</td><td>表格列</td><td>行生效折扣率</td><td>政策/价格计算</td></tr>
<tr><td>折后单价(含安装)</td><td>LNK_SALE_ORDER_ITEM.LH_DISCOUNT_PRICE</td><td>表格列</td><td>折后含安装单价</td><td>标准单价×折扣率</td></tr>
<tr><td>折后单价(不含安装)</td><td>LNK_SALE_ORDER_ITEM.EX_DISCOUNT_PRICE</td><td>表格列</td><td>折后不含安装单价</td><td>标准单价(不含安装)×折扣率</td></tr>
<tr><td>总金额(含安装)</td><td>LNK_SALE_ORDER_ITEM.LH_DEALER_AMOUNT</td><td>表格列</td><td>行总金额</td><td>折后单价×数量</td></tr>
<tr><td>安装金额</td><td>LNK_SALE_ORDER_ITEM.INSTALL_AMOUNT</td><td>表格列</td><td>行安装金额</td><td>安装单价×数量</td></tr>
<tr><td>总金额(不含安装)</td><td>LNK_SALE_ORDER_ITEM.EX_DEALER_AMOUNT</td><td>表格列</td><td>行不含安装总金额</td><td>折后单价(不含安装)×数量</td></tr>
<tr><td>已发数量</td><td>LNK_SALE_ORDER_ITEM.LH_BILLE_QTY</td><td>表格列</td><td>已出库数量</td><td>出库同步回写</td></tr>
<tr><td>未发货数量</td><td>LNK_SALE_ORDER_ITEM.LH_UNBILLE_QTY</td><td>表格列</td><td>未发货数量</td><td>申请数量-已发数量</td></tr>
<tr><td>未发货金额</td><td>LNK_SALE_ORDER_ITEM.UN_SHIP_AMOUNT</td><td>表格列</td><td>未发货金额</td><td>计算回写</td></tr>
<tr><td>未释放定金金额</td><td>LNK_SALE_ORDER_ITEM.UNRELEASE_DEPOSIT_AMT</td><td>表格列</td><td>未释放定金</td><td>扣定金/发货释放回写</td></tr>
<tr><td>取消数量</td><td>LNK_SALE_ORDER_ITEM.LH_CANCEL_QTY</td><td>表格列</td><td>取消数量</td><td>取消操作回写</td></tr>
<tr><td>已审核未发运数量</td><td>LNK_SALE_ORDER_ITEM.APPROVAL_QUANTITY</td><td>表格列</td><td>已审核未发运数量</td><td>审批/发运回写</td></tr>
<tr><td>产品规格</td><td>LNK_SALE_ORDER_ITEM.PROD_STANDARD</td><td>表格列</td><td>产品规格</td><td>产品资料带出</td></tr>
<tr><td>颜色</td><td>LNK_SALE_ORDER_ITEM.LH_PROD_COLOR</td><td>表格列</td><td>产品颜色</td><td>产品资料带出</td></tr>
<tr><td>体积/重量</td><td>LNK_SALE_ORDER_ITEM.LH_VOLUME / LH_PROD_WIGHT</td><td>表格列</td><td>单件体积/重量</td><td>产品资料带出</td></tr>
<tr><td>总体积/总重量</td><td>LNK_SALE_ORDER_ITEM.LH_TO_VOLUME / LH_PROD_TO_WIGHT</td><td>表格列</td><td>行总体积/重量</td><td>体积×数量</td></tr>
<tr><td>单位</td><td>LNK_SALE_ORDER_ITEM.LH_PROD_UNIT</td><td>表格列</td><td>计量单位</td><td>产品资料带出</td></tr>
<tr><td>订单日期</td><td>LNK_SALE_ORDER_ITEM.CREATED</td><td>表格列</td><td>行创建时间</td><td>系统时间</td></tr>
<tr><td>创建人</td><td>LNK_SALE_ORDER_ITEM.FRIST_NAME</td><td>表格列</td><td>行创建人</td><td>添加人</td></tr>
<tr><td>是否有效</td><td>LNK_SALE_ORDER_ITEM.LH_VALIDATE_OR_NOT</td><td>表格列</td><td>行是否有效</td><td>Y/N，转单新增行标记</td></tr>
<tr><td>来源</td><td>LNK_SALE_ORDER_ITEM.LH_ROW_SOURCE</td><td>表格列</td><td>行来源</td><td>手工/产品库/转单等</td></tr>
<tr><td>备注</td><td>LNK_SALE_ORDER_ITEM.LH_COMMENTS</td><td>表格列</td><td>行备注</td><td>行编辑弹窗录入</td></tr>
<tr><td>后台处理消息</td><td>LNK_SALE_ORDER_ITEM.LH_PROCESS_MESSAGE</td><td>表格列</td><td>后台处理信息</td><td>系统回写</td></tr>
<tr><td>是否扣定金</td><td>LNK_SALE_ORDER_ITEM.LH_IS_DEPOSIT_OR_NOT</td><td>复选框列</td><td>行是否扣定金</td><td>setKouSaleAndSign 按订单头/政策回写</td></tr>
<tr><td>尾差</td><td>LNK_SALE_ORDER_ITEM.TAIL_DIFFERENCE</td><td>表格列</td><td>四舍五入尾差</td><td>价格计算回写</td></tr>
<tr><td>生命状态</td><td>LNK_SALE_ORDER_ITEM.SM_STATE</td><td>表格列</td><td>产品生命周期状态</td><td>产品资料带出；提交前校验（Z5淘汰需确认）</td></tr>
<tr><td>操作(编辑/移除)</td><td>-</td><td>按钮列</td><td>行编辑/移除</td><td>状态∈New/Rejected/EbsReturn且非Submitted且来源非Emps显示</td></tr>
</tbody>
</table>
</div>
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">选择弹窗</span>
<h2>各弹窗汇总</h2>
</div>
<table class="kl-table striped">
<thead><tr><th>弹窗</th><th>选择模式</th><th>查询接口</th><th>关键过滤条件</th><th>回填字段</th></tr></thead>
<tbody>
<tr><td>选择经销商</td><td>单选</td><td>POST /portal/accnt/queryByExamplePage</td><td>类型=Dealer，事业部=登录人事业部</td><td>acctId/acctCode/acctName/lHcurrency(币种)</td></tr>
<tr><td>选择开票单位</td><td>单选</td><td>POST /portal/billAccount/queryByExamplePage</td><td>经销商+交易公司，开票状态=Agree，客户二级类型&lt;&gt;'106'</td><td>billId/billIdName/billIdCode/controllerNo/controllerShortName(同控人)/billAcctId</td></tr>
<tr><td>添加产品</td><td>单选/多选</td><td>POST /portal/orderProduct/queryByExamplePage</td><td>事业部+产品线+渠道+经销商+订单类型+订单ID</td><td>产品资料字段+金额/数量回写订单头</td></tr>
<tr><td>添加促销政策</td><td>单选</td><td>POST /portal/lHPolicy/queryOrderPolicyByExamplePage</td><td>政策有效期内、币种=订单币种、订单类型/渠道/业务类型匹配</td><td>lHpromotionPolicyID/lHpromotionPolicy(政策名)/lHdiscountEndTime(折扣有效期)/lHadvertisingMoney(计广告费)</td></tr>
<tr><td>选择合同</td><td>单选</td><td>POST /portal/lhProjectContract/queryByExamplePage</td><td>经销商、合同状态=APPROVED</td><td>lHcontractId/lHcontractNo(合同编号)/lHcontractName(工程项目名称)/合同名称/是否战略</td></tr>
<tr><td>选择收件人</td><td>单选</td><td>POST /portal/acctaddress/queryOrderOptAcctAddrPage</td><td>经销商、地址类型=C、isEffective=Y</td><td>lHConsigneeId(收货地址ID)/consignee(收件人)/consigneePhone(电话)/consigneeAddress(地址)</td></tr>
<tr><td>关联退货单</td><td>单选</td><td>POST /portal/lHSaleOrder/queryReturnOrderPage</td><td>经销商+开票单位+交易公司、状态=Approved、业务类型=Adjust</td><td>orderNo → 订单头 associatedReturn</td></tr>
</tbody>
</table>
</div>
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">其他按钮</span>
<h2>页面按钮汇总</h2>
</div>
<table class="kl-table striped">
<thead><tr><th>按钮名称</th><th>按钮作用</th><th>显隐条件/可点击条件</th><th>影响</th></tr></thead>
<tbody>
<tr><td>作废</td><td>作废订单（状态置 Invalid/Cancelled）</td><td>非编辑态；来源非YinGe/JINHUA；sourceDataBase≠2；状态∈New/Rejected/EbsReturn/approvedReturn</td><td>调 updateSaleOrder 更新订单，状态流转</td></tr>
<tr><td>编辑</td><td>进入编辑态</td><td>非编辑态且来源非Emps；状态∈New/Rejected/EbsReturn</td><td>可编辑范围按渠道/状态放开字段</td></tr>
<tr><td>保存</td><td>保存订单头</td><td>编辑态；除工程渠道部分事业部外</td><td>校验必输→commitOrder→saveSalesOrder</td></tr>
<tr><td>取消</td><td>撤销编辑恢复备份</td><td>编辑态且非新建</td><td>恢复 form.backup 数据</td></tr>
<tr><td>提交</td><td>提交订单（抛OA）</td><td>非编辑态；状态∈New/Rejected/EbsReturn；非Emps；有政策需价格已计算</td><td>提交校验+二次确认→Submitted→抛OA</td></tr>
<tr><td>打印</td><td>打印订单</td><td>详情态(readonlyFlag+exportFlag)；部门∈指定物流部门</td><td>展厅单走 exhibitionHallPrint，其余 orderPrint</td></tr>
<tr><td>扣定金审核</td><td>扣定金审核通过</td><td>状态=Submitted 且产品线∈CuBathroom/CuCeramicTile 且 OA审核状态∈Reviewed/WithoutReview</td><td>调 deductSubscribtionApproval 正式扣定金</td></tr>
<tr><td>审核拒绝</td><td>拒绝接单</td><td>同扣定金审核条件</td><td>弹拒绝原因→saveSalesOrder 状态置 Rejected</td></tr>
<tr><td>优先发货</td><td>申请优先发货</td><td>状态=Approved 且 lHPriorityShipping=N</td><td>调 orderPushOA 推送优先发货审批</td></tr>
<tr><td>报错重推</td><td>重推EBS同步</td><td>详情态+权限orderPushFailRetry=Y+来源Link+状态=EbsSynchronization</td><td>调 retryInValAndErrorToEbs 重推EBS</td></tr>
<tr><td>重推OA</td><td>重推OA流程</td><td>头-OA审核状态旁链接 lHreviweStatus=PushFail 且有新增权限</td><td>调 pushFailPushOA</td></tr>
<tr><td>计算价格</td><td>按促销政策重算订单行价格</td><td>有政策且非编辑态且状态∈New/Rejected；或状态=EbsReturn；且来源非Emps</td><td>调 calPriceOrderItem 重算价格</td></tr>
<tr><td>新建</td><td>新增订单行</td><td>有新增权限；状态∈New/Rejected/EbsReturn、无政策行、来源非Emps、非工程渠道限制</td><td>打开添加产品弹窗选择产品</td></tr>
<tr><td>订单复制</td><td>复制当前订单为新订单</td><td>需订单头已存在</td><td>弹窗重选经销商/交易公司/开票单位/期望到达日期→saveSalesOrder(copyId) 生成新草稿</td></tr>
</tbody>
</table>
</div>
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">保存校验</span>
<h2>保存时校验规则</h2>
</div>
<table class="kl-table striped">
<thead><tr><th>序号</th><th>校验名称</th><th>校验类型</th><th>详细逻辑</th></tr></thead>
<tbody>
<tr><td>1</td><td>交易公司不能为空</td><td>阻断性报错</td><td>saveSalesOrder 第一步即校验 tradeCompanyName 非空，否则抛"交易公司不能为空！"</td></tr>
<tr><td>2</td><td>合同与订单信息一致性</td><td>阻断性报错</td><td>checkOrderWithContract 校验订单所选合同/政策与订单头信息一致</td></tr>
<tr><td>3</td><td>版本并发控制</td><td>阻断性报错</td><td>非新建时 orderVersionControl 校验订单版本，本地与库内不一致则报并发冲突</td></tr>
<tr><td>4</td><td>渠道合法性</td><td>阻断性报错</td><td>chreckSalesChannel 校验销售渠道在合法配置内</td></tr>
<tr><td>5</td><td>交易公司、币种校验与汇率查询</td><td>阻断性报错</td><td>checkTradeCompany/checkCurrency 校验所选交易公司与币种合法，queryExchangeRate 按币种取汇率</td></tr>
<tr><td>6</td><td>出口客户管控</td><td>阻断性报错</td><td>checkAccount 校验出口客户(outAccount=Y)不能下常规订单</td></tr>
<tr><td>7</td><td>期望到达日期与地址</td><td>阻断性报错</td><td>checkLHexpectedArrivedDate 校验期望到达日期不为空且在允许范围；checkAddress 校验收货地址格式与省市区级联</td></tr>
<tr><td>8</td><td>整箱包装数</td><td>阻断性报错</td><td>checkPackageNumber 校验订单行数量符合产品整箱包装数要求（样品豁免）</td></tr>
<tr><td>9</td><td>开票单位校验与出库余额</td><td>阻断性报错</td><td>chackBillCode 校验开票单位信息完整；setOBBalance 设置出库余额</td></tr>
<tr><td>10</td><td>审批设置必须存在</td><td>阻断性报错</td><td>getApprovalHead 按 订单类型+渠道+产品线+业务类型 查找审批设置，未维护报错</td></tr>
</tbody>
</table>
</div>
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">提交校验</span>
<h2>提交时校验规则</h2>
</div>
<table class="kl-table striped">
<thead><tr><th>序号</th><th>校验名称</th><th>校验类型</th><th>详细逻辑</th></tr></thead>
<tbody>
<tr><td>1</td><td>订单版本与可提交状态</td><td>阻断性报错</td><td>orderVersionControl 校验版本；checkOrderCanSubmit 校验订单状态处于可提交状态(New/Rejected/EbsReturn等)</td></tr>
<tr><td>2</td><td>BI 捆绑销售配套率提醒（二次确认）</td><td>弹窗强制提醒</td><td>常规/计划单且事业部开启捆绑销售校验时调 BI 接口获取配套率提醒，BI 返回需提醒则返回 needConfirm=biConfirmFlag</td></tr>
<tr><td>3</td><td>经销商可选产品清单校验</td><td>阻断性报错</td><td>按员工类型+订单类型+经销商判断是否启用可选清单管控，启用则校验订单行产品均在经销商可选清单内</td></tr>
<tr><td>4</td><td>可供数量校验</td><td>阻断性报错</td><td>常规/计划/配件/广告/废料/转卖/出口/礼品类型校验每个产品在期望到达月的可供数量</td></tr>
<tr><td>5</td><td>产品上下架/价目表状态</td><td>阻断性报错</td><td>非退货类订单 verifyProStatus 校验产品处于上架状态且价目表有效</td></tr>
<tr><td>6</td><td>全年折扣率校验</td><td>阻断性报错</td><td>无促销政策且非折扣/广告/礼品/退货等类型、无折扣申请单来源且非造易时 verifyFullYearDiscount 校验全年折扣率</td></tr>
<tr><td>7</td><td>折扣政策校验</td><td>阻断性报错</td><td>checkPolicyStatus 校验政策未失效；有政策订单行需满足封顶量要求(checkPolicyOrder)；checkDiscount 校验计合同折扣行的全年折扣匹配</td></tr>
<tr><td>8</td><td>折扣产品提货比例提醒（二次确认）</td><td>弹窗强制提醒</td><td>非定制单超过折扣产品提货比例时返回 needConfirm=discGoodsRatioControlFlag，用户确认后继续</td></tr>
<tr><td>9</td><td>快递免运费标识校验</td><td>阻断性报错</td><td>checkFreeFreight 校验快递免运费标记是否可置Y（含经销商并发锁）</td></tr>
<tr><td>10</td><td>出货单/退货关联校验（仅退货类订单）</td><td>阻断性报错</td><td>工程/家装渠道退货订单行出库单必填、出库单号一致、销退来源、产品渠道一致性校验</td></tr>
<tr><td>11</td><td>信用管控账户余额校验</td><td>阻断性报错</td><td>开票单位信用管控=lHisCreditControl=Y时通过 EBS 同步接口校验可用额度，小于订单总额报"账户余额不足!"</td></tr>
<tr><td>12</td><td>预付定金预占与审批</td><td>阻断性报错/钉钉告警</td><td>decideOrderDepositInfo 按审批设置计算定金，预占定金(unFreezeDeposit 失败回滚)；OrderLHApprovalCFG 发起 OA 审批</td></tr>
</tbody>
</table>
</div>
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">状态机</span>
<h2>订单状态机流转图</h2>
</div>
<pre style="background:#1E1E1E !important;border-radius:8px !important;padding:16px !important;overflow-x:auto;"><code style="color:#D4D4D4 !important;font-size:0.82rem !important;">        ┌─────────────┐  保存    ┌─────────────┐
        │  New 草稿    │◄────────┤  编辑/新增行  │
        └──────┬──────┘          └─────────────┘
               │ 提交(submitSaleOrderApply)
               ▼
      ┌────────────────┐   OA审批   ┌───────────┐
      │ Submitted 已提交 │──────────►│ Approved  │──► 同步EBS(EbsSynchronization)──►发货(部分发货/已完成)
      └────────┬───────┘           └───────────┘
               │ 审核拒绝 / OA退回           │ EBS退回
               ▼                            ▼
      ┌────────────────┐          ┌────────────────┐
      │ Rejected 审核拒绝│◄─────────│ EbsReturn EBS退回│
      │ approvedReturn │          └────────────────┘
      └───────┬────────┘                 ▲
              │ 可重新编辑/提交           │
              └──────────────────────────┘
      作废(updateSaleOrder)──► Invalid(已作废)/Cancelled(已取消)</code></pre>
<table class="kl-table striped">
<thead><tr><th>状态机名称</th><th>状态释义</th><th>可执行的操作</th></tr></thead>
<tbody>
<tr><td>New</td><td>草稿（新建默认）</td><td>编辑、新增/删除订单行、保存、提交、作废、复制</td></tr>
<tr><td>Rejected</td><td>审核拒绝（OA拒绝）</td><td>编辑、修改订单行、重新提交、作废；若 OA 已审查(Reviewed)不可作废</td></tr>
<tr><td>EbsReturn</td><td>EBS退回</td><td>编辑、修改订单行、重新提交、作废</td></tr>
<tr><td>approvedReturn</td><td>审核退回</td><td>编辑、重新提交、作废</td></tr>
<tr><td>Submitting</td><td>提交中（异步提交瞬间态）</td><td>等待异步结果，失败回滚 New</td></tr>
<tr><td>Submitted</td><td>已提交（待OA审批）</td><td>扣定金审核、审核拒绝、等待审批；明细不可编辑</td></tr>
<tr><td>Approved</td><td>审核通过</td><td>优先发货、同步EBS、打印；经EBS同步后流转发货</td></tr>
<tr><td>EbsSynchronization</td><td>EBS发货同步中</td><td>报错重推EBS（EBS同步异常回滚时显示）</td></tr>
<tr><td>Partially Shipped</td><td>部分发货</td><td>继续发货、关闭</td></tr>
<tr><td>Closed</td><td>已完成</td><td>只读</td></tr>
<tr><td>PartCancelled</td><td>部分取消</td><td>查看</td></tr>
<tr><td>Cancelled / Invalid</td><td>已取消/已作废</td><td>只读</td></tr>
</tbody>
</table>
</div>
</div>
</div>
</div>

<div id="faq">
<div class="tab-pad">
<div class="kl-wrap">
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">报错一览表</span>
<h2>常见报错汇总</h2>
</div>
<table class="kl-table striped">
<thead><tr><th>序号</th><th>报错信息</th><th>提示节点</th><th>根因与解决方案</th><th>等级</th></tr></thead>
<tbody>
<tr><td>01</td><td>交易公司不能为空！</td><td>保存</td><td>未选择/未带出交易公司；检查经销商是否绑定交易公司、签约方式是否匹配</td><td>阻断性报错</td></tr>
<tr><td>02</td><td>找不到单据编号,请联系相关人员维护</td><td>保存(新建)</td><td>LNK_ENCODING_CFG 未按 事业部+订单类型 维护单据编码</td><td>阻断性报错</td></tr>
<tr><td>03</td><td>审批设置并没维护：[订单类型][渠道][产品线][业务类型]</td><td>保存</td><td>LNK_APPROVAL_CFG 未维护对应四要素审批设置</td><td>阻断性报错</td></tr>
<tr><td>04</td><td>请先选择经销商</td><td>弹窗打开</td><td>未选经销商即点弹窗按钮</td><td>toast提醒</td></tr>
<tr><td>05</td><td>请先选择交易公司</td><td>开票单位弹窗</td><td>未选交易公司</td><td>toast提醒</td></tr>
<tr><td>06</td><td>请先选择开票单位</td><td>合同弹窗</td><td>合同选择前置开票单位</td><td>toast提醒</td></tr>
<tr><td>07</td><td>只有工程和家装渠道才可以选择</td><td>合同弹窗</td><td>非工程/家装渠道</td><td>toast提醒</td></tr>
<tr><td>08</td><td>折扣政策和合同信息只能二选一</td><td>合同弹窗</td><td>已选促销政策</td><td>toast提醒</td></tr>
<tr><td>09</td><td>请先选择渠道</td><td>促销政策弹窗</td><td>未选渠道</td><td>toast提醒</td></tr>
<tr><td>10</td><td>请选择经销商带出币种字段</td><td>促销政策弹窗</td><td>币种为空</td><td>toast提醒</td></tr>
<tr><td>11</td><td>请先保存订单头信息</td><td>新建/编辑订单行</td><td>订单头未先保存</td><td>toast提醒</td></tr>
<tr><td>12</td><td>申请数量不能大于原订单可转数量</td><td>行编辑</td><td>转单行数量超可转量</td><td>阻断性报错</td></tr>
<tr><td>13</td><td>产品数量不满足促销政策要求,请检查!</td><td>行编辑</td><td>数量不满足政策封顶量</td><td>阻断性报错</td></tr>
<tr><td>14</td><td>此客户为出口客户，仅能下出口订单！</td><td>保存</td><td>出口客户(outAccount=Y)下常规单</td><td>阻断性报错</td></tr>
<tr><td>15</td><td>请完成必输信息的填写！</td><td>保存</td><td>必输字段未填</td><td>toast提醒</td></tr>
<tr><td>16</td><td>该订单不能复制</td><td>订单复制</td><td>原订单复制校验未通过</td><td>阻断性报错</td></tr>
<tr><td>17</td><td>订单所选折扣政策被其他订单占用，请稍后再试！</td><td>提交</td><td>同一促销政策被并发提交占用(Redis锁)</td><td>阻断性报错</td></tr>
<tr><td>18</td><td>该订单经销商正在下"快递免运费"订单，请稍后再试！</td><td>提交</td><td>同经销商并发免运费单(Redis锁)</td><td>阻断性报错</td></tr>
<tr><td>19</td><td>订单行产品[xx]存在异常（如：价格存在异动），请删除重新添加！</td><td>提交</td><td>errorProdCode 非空，价目表价格异动/上下架</td><td>阻断性报错</td></tr>
<tr><td>20</td><td>账户余额不足!</td><td>提交</td><td>信用管控开票单位可用额度 &lt; 订单总额</td><td>阻断性报错</td></tr>
<tr><td>21</td><td>折扣政策有效结束日期是xxxx-xx-xx，请修改期望到达日期小于折扣政策有效结束日期！</td><td>提交</td><td>期望到达日期晚于政策结束日</td><td>阻断性报错</td></tr>
<tr><td>22</td><td>合同有效结束日期是xxxx-xx-xx，请修改期望到达日期小于合同有效结束日期！</td><td>提交</td><td>期望到达日期晚于合同结束日</td><td>阻断性报错</td></tr>
<tr><td>23</td><td>订单审批设置类型未维护，请联系管理员进行维护！</td><td>提交</td><td>审批设置不存在</td><td>阻断性报错</td></tr>
<tr><td>24</td><td>当前状态不可进行此操作</td><td>提交/改单</td><td>状态非可编辑/可提交状态</td><td>阻断性报错</td></tr>
</tbody>
</table>
</div>
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">常见问题</span>
<h2>常见问题与排查</h2>
</div>
<KbSubTitle title="问题1：新建订单弹不出经销商" />
<p style="font-size:0.85rem;color:#374151;line-height:1.8;margin:0 0 8px;"><strong>原因：</strong>登录人无对应事业部经销商数据，或经销商类型错误(非Dealer)、未绑定部门。</p>

```sql
SELECT ROW_ID, ACCT_CODE, ACCT_NAME, ACCT_TYPE, DEPT_ID, LH_VALIDATE_OR_NOT
  FROM LNK_ACCNT WHERE ACCT_TYPE='Dealer' AND DEPT_ID=:登录人事业部 AND LH_VALIDATE_OR_NOT='Y';
```

<KbSubTitle title="问题2：促销政策弹窗无数据" />
<p style="font-size:0.85rem;color:#374151;line-height:1.8;margin:0 0 8px;"><strong>原因：</strong>政策未生效、币种/渠道/业务类型/经销商区域不匹配、无有效经销合同。</p>

```sql
SELECT ROW_ID, POLICY_NAME, START_DATE, END_DATE, CURRENCY, ORDER_TYPE, SALES_CHANNEL, BU_TYPE, STATUS
  FROM LNK_DCT_POLICY_HEAD
 WHERE ORDER_TYPE=:Common AND SALES_CHANNEL=:渠道 AND STATUS='Effective'
   AND START_DATE<=SYSDATE AND END_DATE>=SYSDATE;
```

<KbSubTitle title="问题3：添加产品弹窗无产品" />
<p style="font-size:0.85rem;color:#374151;line-height:1.8;margin:0 0 8px;"><strong>原因：</strong>按 事业部+产品线+渠道+经销商 过滤无匹配产品，产品未上架、已停售或产品渠道不包含订单渠道。</p>

```sql
SELECT PROD_CODE, PROD_NAME, LH_PROD_CHANNEL, LH_PROD_LINE, DEPT_ID, SM_STATE, LH_VALIDATE_OR_NOT
  FROM LNK_PROD
 WHERE DEPT_ID=:事业部 AND LH_PROD_LINE=:产品线 AND LH_VALIDATE_OR_NOT='Y'
   AND LH_PROD_CHANNEL LIKE '%'||:渠道||'%';
```

<KbSubTitle title="问题4：提交提示库存不足或数量超限" />
<p style="font-size:0.85rem;color:#374151;line-height:1.8;margin:0 0 8px;"><strong>原因：</strong>可供数量校验(checkOrderQuantityControl)按产品起订量/生产周期/标准交付/可供量校验月度可供。</p>

```sql
SELECT PROD_CODE, MINIMUM_ORDER, PRODUCE_CYCLE_DAYS, STANDARD_DELIVERY_DATE
  FROM LNK_PROD_DATA_EXT WHERE PROD_CODE=:产品编码;
```

<KbSubTitle title="问题5：提交后有二次确认弹窗说明什么" />
<p style="font-size:0.85rem;color:#374151;line-height:1.8;margin:0 0 8px;"><strong>原因：</strong>BI 配套率提醒、折扣产品提货比例超限、退货渠道不一致等业务提醒；确认后携带 flag 继续提交</p>
<p style="font-size:0.85rem;color:#374151;line-height:1.8;margin:0;"><strong>解决思路：</strong>确认业务无误后点确定继续；如不确定可取消后核查。</p>

<KbSubTitle title="问题6：状态为 Rejected 但无法作废/编辑" />
<p style="font-size:0.85rem;color:#374151;line-height:1.8;margin:0 0 8px;"><strong>原因：</strong>Rejected 且 OA 已审查(Reviewed)；或来源=YinGe/JINHUA、sourceDataBase=2</p>
<p style="font-size:0.85rem;color:#374151;line-height:1.8;margin:0;"><strong>解决思路：</strong>来源/数据源受限单据需走人工处理；普通单重新编辑后提交。</p>
</div>
</div>
</div>
</div>

<div id="changelog">
<div class="tab-pad">
<div class="kl-wrap">
<div class="kl-card">
<div class="biz-kl-hdr">
<span class="biz-tag">更新记录</span>
<h2>页面更新历史</h2>
</div>
<table class="kl-table striped">
<thead><tr><th>日期</th><th>提交ID</th><th>提交人</th><th>提交内容</th></tr></thead>
<tbody>
<tr><td>2026-09-15</td><td>初始版本</td><td>AI助手</td><td>创建「订单-创建常规订单」知识库页面，包含业务介绍、流程图、7个重点逻辑、4个界面模块、7个弹窗、14个按钮、10个保存校验、12个提交校验、状态机、24个报错FAQ与6个常见问题</td></tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
