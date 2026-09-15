<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="01" title="创建常规订单" desc="经销商通过CRM/订单门户手工创建常规销售订单的完整业务流程" />
<KbCard title="业务介绍">
<!-- 空白:待补充 -->
</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
## 业务流程

### 业务流程图

```text
经销商登录CRM/订单门户
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
      │ 审批拒绝 Rejected / 审核退回 approvedReturn / EBS退回 EbsReturn → 回到编辑态可重新提交
```

### 上游依赖

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 经销商主数据（LNK_ACCNT） | 数据依赖 | 选择经销商，带出渠道可选范围、产品线、交易公司、签约方式、币种、扣款方式、事业部(deptId)、计合同折扣/计广告费属性 | 经销商资料有效，客户分类1/2、所属事业部已维护 |
| 开票单位（LNK_BILL_ACCOUNT） | 数据依赖 | 订单开票单位选择，带出法人客户信息、同控人信息 | 开票单位状态=Agree(已审核)，且属于所选经销商+交易公司范围 |
| 交易公司（LNK_ORG_COMPANY / LNK_BILL_ACCOUNT） | 数据依赖 | 按经销商事业部+签约方式(销售主体/工程主体)自动带出可选交易公司 | 签约方式有效，交易公司类型匹配 |
| 价目表（LNK_PRICE_LIST / LNK_PRICE_LIST_ITEM） | 数据依赖 | 订单行产品标准单价、整箱包装数、产品渠道、产品线来源 | 事业部价目表生效且含该产品 |
| 促销政策（LNK_DCT_POLICY_HEAD / LNK_DCT_POLICY_ITEM） | 数据依赖 | 折扣政策选择，锁定折扣比例、封顶量、适用产品；选择后订单行价格按政策计算 | 政策生效、币种/渠道/业务类型/经销商区域匹配，且生效期内 |
| 产品资料（LNK_PROD / LNK_PROD_DATA_EXT） | 数据依赖 | 产品编号、名称、型号、规格、颜色、体积、重量、单位、产品渠道、产品线、生命状态(smState) | 产品有效，产品渠道包含订单渠道 |
| 工程合同（LNK_PROJECT_CONTRACT） | 数据依赖 | 工程/家装渠道可选合同载体，带出工程项目名称、合同有效期、项目所在地、是否战略 | 合同状态=APPROVED(已批准)，且与所选开票单位、经销商一致 |
| 收货地址（LNK_ACCT_ADDR） | 数据依赖 | 收件人、收件电话、收货地址选择 | 地址类型=C(收货地址)、isEffective=Y |
| 审批设置（LNK_APPROVAL_CFG / LHApprovalCFG） | 配置依赖 | 保存时校验存在匹配的审批设置(订单类型+渠道+产品线+业务类型)、扣定金管控 | 审批设置已维护，四要素匹配 |
| 单据编码配置（LNK_ENCODING_CFG） | 配置依赖 | 订单编号前缀(单据编码)来源 | 按事业部+订单类型已维护单据编号 |
| 渠道参数配置（getLnkSysPropertyFilterCfgByType） | 配置依赖 | 经销商可下单渠道过滤，控制"电商"渠道可选性 | 参数配置存在(订单类型+客户分类+事业部) |
| 客户账户/余额（LNK_BILL_ACCOUNT 信用管控） | 数据依赖 | 信用管控经销商提交时校验账户余额 | 开票单位信用管控=Y |

### 下游影响

- 影响1：订单流转至 OA 审批 / 门户
  - 提交后通过审批配置 OrderLHApprovalCFG 发起 OA 流程，状态变为 Submitted，OA 审核状态 lHreviweStatus 推进（PushFail 时可重推 OA）
- 影响2：同步至 EBS（ERP）
  - 审批通过后的常规订单通过 synOrderToEbs 推送到 EBS，生成 EBS 订单头/订单行；EBS 退回则状态 EbsReturn，EBS 发货同步为 EbsSynchronization
- 影响3：出库/发货
  - 审核通过后抛转生产、出库，订单行记录已发数量 lHbilleQty、未发货数量 lHunbilleQty、未发货金额，发货后状态流转至部分发货/已完成
- 影响4：折扣政策封顶量占用
  - 有促销政策订单提交时占用政策产品封顶量(checkPolicyOrder / applyNum)，审核拒绝时回滚
- 影响5：定金预占/扣定金
  - 扣定金经销商订单提交时按审批设置/定金比例预占定金，扣定金审核(deductSubscribtionApproval)通过后才实际扣减
- 影响6：余额账户
  - 订单金额影响出库余额(obbalance)与客户账户余额校验

---

</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
## 重点逻辑

<KbCard num="1" title="订单编号生成规则 核心">

<KbQuote>保证每个订单有唯一、可追溯的单号，格式与事业部单据编码一致</KbQuote>

**具体逻辑**：

- 1、第1点：保存时若订单id为空（新建），按 事业部(deptId)+订单类型(orderType) 查询单据编码配置 LHEncodingCFG，未配置则报错"找不到单据编号,请联系相关人员维护"
- 2、第2点：取当前日期"yyMM"（如 2026-09 → "2609"），调用流水号服务生成序号 num
- 3、第3点：拼接订单编号 = 单据编码 + '-' + 流水号（如 `DD-2609XXXX`），写入订单头 ORDER_NO
- 4、第4点：来源=OFD（外围系统）时使用固定前缀 "OFD-" 生成

</KbCard>

<KbCard num="2" title="选择经销商带出订单默认信息 联动">

<KbQuote>减少手工录入，保证订单头信息与经销商主数据、开票数据一致</KbQuote>

**具体逻辑**：

- 1、第1点：经销商弹窗选中后回填 acctId/acctCode/acctName/币种(lHcurrency)，并查询经销商详情(/portal/accnt/queryById)获取 deptId(事业部)、客户分类1/2、计合同折扣/计广告费属性
- 2、第2点：按经销商自动带出渠道可选范围(lovChannelFilter，按订单类型+客户分类1/2+事业部过滤)、签约方式(setContractWay：外部客户供应商→直销，内部客户展厅/直营工程/直营家装/公司内部/直营电商→直销，其余→经销)、产品线(getProdLine，按事业部+订单类型Common过滤)
- 3、第3点：自动带出交易公司（经销→销售主体CompanyType=Sales；直销→工程主体CompanyType=Project；内部+展厅→强制Sales类型），经销商资料可改交易公司(comments=Y)时用开票单位表列表可切换
- 4、第4点：币种、汇率(lHexchangeRate)由经销商带出后查询(via /portal/accnt/queryById)；计合同折扣/计广告费 lHrebatesMoney/lHadvertisingMoney 取经销商主数据属性
- 5、第5点：新建时切换经销商会清空渠道/产品线/业务类型/开票单位/促销政策/收件人/交易公司等联动字段

</KbCard>

<KbCard num="3" title="渠道与产品线变更清空订单行 联动">

<KbQuote>不同渠道/产品线对应不同价格体系与产品范围，变更后旧行必须清理避免脏数据</KbQuote>

**具体逻辑**：

- 1、第1点：编辑态改变产品或渠道，弹窗提示"改变XX，订单行数据会清空"
- 2、第2点：确认后标记 orderProdLineOrSalesChange=true，前端清空订单行表格、套件数据、总金额/总体积/总数量/折扣率，并清空已选促销政策
- 3、第3点：保存(commitOrder)时若标记为 true，先调 batchDeleteByOrderId 删除原订单行再保存新头
- 4、第4点：改变促销政策同样触发订单行清空（仅状态 New/Rejected/EbsReturn 且已保存过的订单）

</KbCard>

<KbCard num="4" title="促销政策与订单行价格计算 核心">

<KbQuote>折扣政策决定订单行折后单价、应用折扣率、封顶量、是否计广告费，是价格管控核心</KbQuote>

**具体逻辑**：

- 1、第1点：促销政策弹窗(/portal/lHPolicy/queryOrderPolicyByExamplePage)按订单类型+渠道+业务类型+经销商+币种过滤可选政策，选中回填 lHpromotionPolicyID/lHpromotionPolicy/折扣有效期/计广告费
- 2、第2点：有政策订单新建订单行走政策树(getOrderPolicyTree→queryPcyItemProdByExamplePage)，按政策封顶量控制产品数量(可换/不可换)；无政策订单走普通产品选择(/portal/orderProduct/queryByExamplePage 或关联退货单 queryByExampleReturnPage)
- 3、第3点：【计算价格】按钮调 /portal/lHPolicy/calPriceOrderItem 按政策重算价格（用于草稿/审批拒绝/审核退回且政策未失效时），无政策订单(New/Rejected/EbsReturn)行编辑时按价目表更新价格
- 4、第4点：订单行价格字段：标准单价(含安装)lHdealerPrice、安装单价 installPrice、标准单价(不含安装) exInstallPrice、折后单价(含/不含安装)、总金额(含/不含安装)、应用折扣率 lHfinalDiscount、暂扣定金金额 depositAdvanceAmount；含运费时单价+运费(freight)
- 5、第5点：选择政策后订单行需满足政策要求（封顶量校验 checkMaxNum：任一政策等级校验通过即通过），否则报"产品数量不满足促销政策要求"

</KbCard>

<KbCard num="5" title="订单行数量管控 校验">

<KbQuote>控制下单数量合法性（整箱/起订/库存/封顶/可转数量）</KbQuote>

**具体逻辑**：

- 1、第1点：订单行添加/编辑弹窗数量需为正整数（常规单），DMS 端 Retail/Hardware/Online 渠道且启用整箱包装时必须为"整箱包装数"的倍数（样品类豁免）
- 2、第2点：转单产生的订单行(lHOriginalRowQTY)编辑时申请数量不能大于原订单可转数量
- 3、第3点：有折扣政策的行编辑，数量需通过 lHDctpolicylevel/checkMaxNum 封顶量校验
- 4、第4点：提交时对常规/计划/配件/广告/废料/转卖/出口/礼品等类型校验"可供数量"（checkOrderQuantityControl，按月+产品起订量/生产周期/标准交付日期）
- 5、第5点：提交前校验订单行产品生命状态(已淘汰产品 Z5 需二次确认，常规订单非淘汰产品提交时折扣率+1个点，由参数配置控制)

</KbCard>

<KbCard num="6" title="提交二次确认机制 核心">

<KbQuote>部分校验仅作提醒（不阻断），用户确认后仍可提交，避免影响正常下单</KbQuote>

**具体逻辑**：

- 1、第1点：提交接口(/portal/lHSaleOrder/submitSaleOrderApply)在命中"需提示"场景时返回 needConfirm(动态flag名称)+提示文案，前端弹 confirm
- 2、第2点：用户确认后携带该 flag 再次调用同一接口（递归提交，confirmFlags 累加，仅在首次提交时重置）
- 3、第3点：已支持的确认点：biConfirmFlag(BI配套率提醒，常规/计划单且事业部开启捆绑销售校验)、discGoodsRatioControlFlag(超过折扣产品提货比例)、confirmFlag(成品/出口退货渠道校验)、companyConfirmFlag(退货单行合同交易公司与订单头不一致)等

</KbCard>

<KbCard num="7" title="扣定金管控 核心">

<KbQuote>对信用管控/审批设置要求的经销商执行定金预占与实际扣减</KbQuote>

**具体逻辑**：

- 1、第1点：保存/计算时结合审批设置(LHIsDeposit、DepositScale)与开票单位信用管控(lHisCreditControl)设置订单头"整单扣定金 lHdepositOrNot / 部分扣定金 itemKontSign"
- 2、第2点：提交时 lhDepositService.decideOrderDepositInfo 按审批设置/定金比例计算订单行暂扣定金金额 depositAdvanceAmount、定金比例 depositScale
- 3、第3点：【扣定金审核】(deductSubscribtionApproval)仅状态=Submitted 且订单产品线=卫浴/瓷砖(CuBathroom/CuCeramic Tile)且 OA 审核状态=Reviewed/WithoutReview 时可操作，通过后正式扣减定金
- 4、第4点：订单头展示定金比例、定金金额、整单扣定金、部分扣定金、扣定金经销商等字段
---

</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
## 详细逻辑

### 界面模块1：订单头-基本信息

> Vue 传统页面（非 hlod 低代码页面），字段来源：前端 routine_order.html 表单 + 后端 LNK_SALE_ORDER（LHSaleOrder 实体）
>
> 表对象：LNK_SALE_ORDER（订单头），公共字段 id/created/lastUpdated 由 BasicModel 提供

| 字段名 | 数据库列名 | 组件 | 业务释义 | 显隐条件 | 取值/赋值逻辑 |
|-------|-----------|------|---------|---------|-------------|
| 订单编号 | LNK_SALE_ORDER.ORDER_NO | 文本框 | 系统生成唯一订单号 | 常显，只读 | 新建时后端按 单据编码-流水号 生成（见重点逻辑1）；新建态为空 |
| 经销商 | LNK_SALE_ORDER.ACCT_ID / ACCT_NAME | 弹窗选择框 | 下单经销商 | 常显；编辑时可选（isAcctName） | 弹窗(选择经销商)回填 acctId/acctCode/acctName；必输 |
| 经销商编码 | LNK_SALE_ORDER.ACCT_CODE | 文本框 | 经销商主数据编码 | 常显，只读 | 随经销商带出 |
| 交易公司 | LNK_SALE_ORDER.TRADE_COMPANY_ID / TRADE_COMPANY_NAME | 下拉/文本框 | 开票/结算主体公司 | 常显；经销商可改交易公司时可选 | 默认按 事业部+签约方式 自动带出首个；可改时弹"/portal/billAccount/queryByExamplePage"列表选择 |
| ④开票单位 | LNK_SALE_ORDER.BILL_ID / BILL_ID_NAME | 弹窗选择框 | 开票单位（法人客户） | 常显 | 前置：先选经销商+交易公司；弹窗按 交易公司+开票状态Agree+经销商 过滤，回填 billId/billIdName/billIdCode/同控人；必输 |
| 订单类型 | LNK_SALE_ORDER.ORDER_TYPE | 值集下拉（ORDER_TYPE） | 固定=Common(常规) | 常显，只读 | initData 固定 orderType='Common' |
| ①渠道 | LNK_SALE_ORDER.SALES_CHANNEL | 下拉选择框 | 销售渠道（零售/工程/家装/电商等） | 常显；按权限可编辑 | 由 经销商+订单类型+客户分类+事业部 过滤(lovChannelFilter)，可选范围含专人配置；change 触发清行；必输 |
| 余额账户 | LNK_SALE_ORDER.BALANCE_ID / BALANCE_NAME | 文本框 | 经销商出库余额账户 | 常显，只读 | 后端 setOrderBalance 按经销商带出 |
| 订单状态 | LNK_SALE_ORDER.STATUS | 值集下拉（ORDER_STATUS） | 订单流转状态 | 常显，只读 | 新建=New，提交=Submitted，审批通过=Approved 等（见状态机）；orderStatusTips 由参数 ORDER_DETAIL_MESSAGE 提示 |
| 系统同步信息 | LNK_SALE_ORDER.LH_SYNCHRONOUS_MESSAGE | 多行文本框 | EBS/OA同步结果信息 | 常显，只读 | 后端同步EBS/OA后回写 |
| EBS报错反馈时间 | LNK_SALE_ORDER.LH_SYNC_TO_EBS_RESULT_ERROR_DATE | 文本框 | EBS报错反馈时间 | 常显，只读 | 后端同步返回 |
| 自动重推EBS时间 | LNK_SALE_ORDER.LH_SYNC_TO_EBS_DATE | 文本框 | 自动重推EBS时间 | 常显，只读 | 定时/重推任务回写 |
| ②产品线 | LNK_SALE_ORDER.ORDER_PROD_LINE | 下拉选择框 | 订单产品线（卫浴/瓷砖/定制等） | 常显 | getProdLine 按 事业部+订单类型=Common 查询 LNK_ORDER_PROD_LINE_SET 填充；卫浴定制排序前置；change触发清行；必输 |
| ⑤期望到达日期 | LNK_SALE_ORDER.LH_EXPECTED_ARRIVED_DATE | 日期选择 | 期望到货日期 | 常显 | 可选范围：昨天~一年内(pickerDateOptions)；必输；提交时校验不大于折扣政策/合同有效期 |
| OA审核状态 | LNK_SALE_ORDER.LH_REVIWE_STATUS | 值集下拉（LH_ORDER_REVIWE_STATUS） | OA流程审核状态 | 常显，只读 | 提交后OA回调；PushFail 时显示"重推OA"链接 |
| ③业务类型 | LNK_SALE_ORDER.LH_BU_TYPE | 下拉选择框 | 业务类型（常规/样品/冲差等） | 常显 | 值集 LH_BU_TYPE 按订单类型=Common 过滤(getSubLovArray)；卫浴/瓷砖事业部过滤掉"样品"；必输 |
| 订单日期 | LNK_SALE_ORDER.SUBMISSION_DATE | 日期 | 订单提交日期 | 常显，只读 | 提交时后端 setOrderSubmissionDateAndStatus 置为当前日期 |
| 扣款方式 | LNK_SALE_ORDER.LH_ADVERTING_MONEY_TYPE | 值集下拉（LH_ADV_MONEY_TYPE） | 扣款方式=扣货款 | 常显，只读 | 新建默认 'PayForGoods'(扣货款) |
| 签约方式 | LNK_SALE_ORDER.CONTRACT_WAY | 值集（LH_CONTRACT_WAY） | 经销/直销 | 常显，只读 | 按经销商分类自动匹配(orderContractWayDomainService.matchContractWay) |
| 关联退货单 | LNK_SALE_ORDER.ASSOCIATED_RETURN | 弹窗选择框 | 关联成品退货单（调整申请） | 常显 | 前置：经销商+开票单位；弹窗按 经销商+开票单位+交易公司+状态Approved+业务类型Adjust 过滤 LNK_SALE_ORDER 退货单 |
| 所属事业部 | LNK_SALE_ORDER.BUSINESS_DEPARTMENT / DEPT_ID | 文本框 | 订单所属事业部 | 常显，只读 | 随经销商带出(depId→orgName) |
| 币种 | LNK_SALE_ORDER.LH_CURRENCY | 文本框（值集CURRENCY） | 订单币种 | 常显，只读 | 随经销商带出；影响促销政策与产品价格币种过滤 |
| 汇率 | LNK_SALE_ORDER.LH_EXCHANGE_RATE | 文本框 | 币种汇率 | 常显，只读 | 后端 queryExchangeRate 带出 |
| 含运费 | LNK_SALE_ORDER.INCLUDE_FREIGHT_FLAG | 复选框 | 是否含运费，Y=含 | 常显，只读 | 后端 setOrderIncludeFreightFlag 按经销商基础资料回写；提交时含运费需二次确认地址 |
| 管理主控人编码/简称、审计披露主控人编码/名称 | LNK_SALE_ORDER（controllerId 关联）+ CorpClientControl | 文本框 | 法人客户同控人信息 | 常显，只读 | 开票单位(billAcctId)变化时调 /action/portal/CorpClientControl/queryByExamplePage 按 type=manage/auditAnnounce 展示 |

### 界面模块2：订单头-折扣政策/合同/收货/其他信息

> 表对象：LNK_SALE_ORDER

| 字段名 | 数据库列名 | 组件 | 业务释义 | 显隐条件 | 取值/赋值逻辑 |
|-------|-----------|------|---------|---------|-------------|
| 促销政策 | LNK_SALE_ORDER.LH_PROMOTION_POLICY / LH_PROMOTION_POLICY_ID | 弹窗选择框 | 选择的促销政策 | 常显；编辑时可改（isNull） | 前置：经销商+渠道；弹窗按 订单类型+渠道+业务类型+经销商+币种 过滤；变换后清空订单行；可选择清除(需编辑态)；计算价格按钮用于重算 |
| 折扣有效期 | LNK_SALE_ORDER.LH_DISCOUNT_END_TIME | 日期 | 政策有效结束日期 | 常显，只读 | 随促销政策带出 |
| 扣定金经销商 | LNK_SALE_ORDER.DEPOSIT_DEALER_FLAG | 复选框 | 是否扣定金经销商 | 常显，只读 | 由审批设置/经销商基础资料带出 |
| 出库余额 | LNK_SALE_ORDER.OBBALANCE | 文本框 | 订单出库余额 | 常显，只读 | 后端 setOBBalance 带出 |
| 合同编号 | LNK_SALE_ORDER.LH_CONTRACT_ID / LH_CONTRACT_NO | 弹窗选择框 | 工程合同编号 | 常显 | 仅渠道=工程/家装且需选合同时可点；前置：开票单位、未选促销政策（政策与合同二选一）；弹窗按 经销商+合同状态APPROVED 过滤 LNK_PROJECT_CONTRACT |
| 工程项目名称 | LNK_SALE_ORDER.LH_CONTRACT_NAME | 文本框 | 工程/项目名称 | 常显，只读 | 随合同带出 |
| 合同有效期 | LNK_SALE_ORDER.LH_PROJECT_END_TIME | 日期 | 合同有效结束日期 | 常显，只读 | 随合同带出 |
| 项目所在地 | LNK_SALE_ORDER.PROJECT_LOCATION | 文本框 | 项目所在地 | 常显，只读 | 随合同带出 |
| 合同名称 | LNK_SALE_ORDER.CONTRACT_NAME | 文本框 | 合同名称 | 常显，只读 | 随合同带出 |
| 是否战略 | LNK_SALE_ORDER.IS_STRATEGY | 复选框 | 是否战略合同 | 常显，只读 | 随合同带出 |
| ⑥收件人 | LNK_SALE_ORDER.LH_CONSIGNEE_ID / CONSIGNEE | 弹窗选择框 | 收货人 | 常显 | 弹窗按 经销商+地址类型C+有效 过滤 LNK_ACCT_ADDR，回填收件人/电话/地址；必输 |
| 收件人电话 | LNK_SALE_ORDER.CONSIGNEE_PHONE | 文本框 | 收货人电话 | 常显，只读 | 随收件人带出 |
| 收件人地址 | LNK_SALE_ORDER.CONSIGNEE_ADDRESS | 文本框 | 收货地址 | 常显，只读 | 随收件人带出；提交时若含运费二次确认 |
| 总体积 | LNK_SALE_ORDER.LH_TOTAL_VOLUME | 文本框 | 订单行总体积 | 常显，只读 | 订单行增删改后由 saveTotalVolumeAndTotalNum 汇总 |
| 总数量 | LNK_SALE_ORDER.LH_TOTAL_NUM | 文本框 | 订单行总数量 | 常显，只读 | 同上汇总 |
| 总金额 | LNK_SALE_ORDER.TOTAL_AMOUNT | 文本框 | 订单总金额(含安装) | 常显，只读 | 订单行汇总后回填，前端 roundingOff 保留小数 |
| 折扣类型 | LNK_SALE_ORDER.LH_DISCOUNT_TYPE | 值集（LH_DISCOUNT_TYPE） | 折扣类型 | 常显，只读 | 新建默认 'SameDiscount'(折扣不变) |
| 折扣率 | LNK_SALE_ORDER.LH_DISCOUNT_RATE | 文本框 | 订单折扣率 | 常显，只读 | 随政策/全年折扣展示 |
| 定金比例 | LNK_SALE_ORDER.DEPOSIT_SCALE | 文本框 | 定金比例 | 常显，只读 | 提交时按审批设置/政策计算 |
| 定金金额 | LNK_SALE_ORDER.DEPOSIT_SUM | 文本框 | 定金金额 | 常显，只读 | 提交时计算 |
| 整单扣定金 | LNK_SALE_ORDER.LH_DEPOSIT_OR_NOT | 复选框 | 整单扣定金标识 | 常显，只读 | 后端按审批设置+信用管控设置 |
| 部分扣定金 | LNK_SALE_ORDER.ITEM_KONT_SIGN | 复选框 | 部分扣定金标识 | 常显，只读 | 后端按审批设置设置 |
| 备注 | LNK_SALE_ORDER.REMARKS | 多行文本框 | 订单备注 | 常显；可编辑 | 手工录入（审核拒绝等场景记录原因） |
| 关闭原因 | LNK_SALE_ORDER.LH_RETURN_REASON | 多行文本框 | 订单关闭/退回原因 | 常显，只读 | 后端/审批退回时写 |
| 发货要求 | LNK_SALE_ORDER.GO_DEMAND | 多行文本框 | 发货要求 | 常显，只读 | 上游工程/合同带出 |
| 回款要求 | LNK_SALE_ORDER.BACK_DEMAND | 多行文本框 | 回款要求 | 常显，只读 | 上游工程/合同带出 |
| 项目经理处理意见 | LNK_SALE_ORDER.MANAGE_OPINION | 多行文本框 | 项目经理意见 | 常显，只读 | 工程审批环节回写 |
| 意向确认日期 | LNK_SALE_ORDER.INTEREST_CONFIRM_DATE | 文本框 | 工程意向单确认日期 | 常显，只读 | 上游工程带出 |
| 工程意向单 | LNK_SALE_ORDER.PROJECT_INTENTION_ORDER | 复选框 | 是否工程意向单 | 常显，只读 | 上游工程带出 |
| 意向发货 | LNK_SALE_ORDER.INTENTION_IS_DELIVERY | 复选框 | 是否意向发货 | 常显，只读 | 上游工程带出 |
| 线上店铺名称 | LNK_SALE_ORDER.ONLINE_PLATFORM_NAME | 文本框 | 电商店铺名称 | 常显，只读 | 电商订单带出 |
| 线上平台订单号 | LNK_SALE_ORDER.ONLINE_PLATFORM_ORDER_NUMBER | 文本框 | 电商平台订单号 | 常显，只读 | 电商订单带出 |
| 外部订单编号 | LNK_SALE_ORDER.LH_OUT_SYSTEM_OD | 文本框 | 外部系统订单号 | 常显，只读 | 外围系统来源订单带出 |
| ERP回传状态 | LNK_SALE_ORDER.ERP_STATUS | 文本框 | ERP回传状态 | 常显，只读 | EBS同步结果回写 |

### 界面模块3：明细-订单行（明细基本信息）

> 表对象：LNK_SALE_ORDER_ITEM（LHSaleOrderItem），查询接口 /portal/lHSaleOrderItem/queryByExamplePage（入参 orderId）
>
> 顶部工具栏按钮：【计算价格】【新建】；行内操作：编辑、移除；行编辑弹窗：产品名称+申请数量+备注

| 字段名 | 数据库列名 | 组件 | 业务释义 | 显隐条件 | 取值/赋值逻辑 |
|-------|-----------|------|---------|---------|-------------|
| 序号 | - | 表格序号 | 行序号 | 常显 | 自动 |
| 产品编号 | LNK_SALE_ORDER_ITEM.PROD_CODE | 表格列 | 产品编码 | 常显 | 产品选择弹窗带出 |
| 产品名称 | LNK_SALE_ORDER_ITEM.PROD_NAME | 表格列 | 产品名称 | 常显 | 产品选择弹窗带出 |
| 产品线 | LNK_SALE_ORDER_ITEM.LH_PROD_LINE | 表格列（值集LH_PROD_LINE） | 产品所属产品线 | 常显 | 产品资料带出 |
| 产品型号 | LNK_SALE_ORDER_ITEM.LH_MODEL | 表格列 | 产品型号 | 常显 | 产品资料带出 |
| 整箱包装数 | LNK_SALE_ORDER_ITEM.PACKAGE_NUMBER | 表格列 | 整箱包装数 | 常规单显示 | 产品资料带出；DMS端整箱数量校验依据 |
| 申请数量 | LNK_SALE_ORDER_ITEM.QTY | 编辑列/行编辑 | 下单数量 | 常显，可编辑 | 新建默认1；正整数；合作校验见重点逻辑5 |
| 标准单价(含安装) | LNK_SALE_ORDER_ITEM.LH_DEALER_PRICE | 表格列 | 价目表标准单价 | 常显，只读 | 价目表带出；保存/计算价格后按政策或价格表 |
| 安装单价 | LNK_SALE_ORDER_ITEM.INSTALL_PRICE | 表格列 | 安装费单价 | 常显，只读 | 价目表带出 |
| 标准单价(不含安装) | LNK_SALE_ORDER_ITEM.EX_INSTALL_PRICE | 表格列 | 不含安装标准单价 | 常显，只读 | 标准单价-安装单价 |
| 包安装否 | LNK_SALE_ORDER_ITEM.PACKAGE_INSTALL | 复选框列 | 是否包安装 | 常显，只读 | 产品/价目表带出；包安装时订单类型若禁止则提交拒绝 |
| 工程方单价 | LNK_SALE_ORDER_ITEM.LH_PROJECT_PRICE | 表格列 | 工程方价 | 常显，只读 | 价目表带出 |
| 计合同折扣(原/新) | LNK_SALE_ORDER_ITEM.NEXT_REBATES / NEXT_YEAR_DISCOUNT_FLAG | 是/否标签列 | 是否计合同折扣 | 常显 | (原)=价目表值；(新)=结合订单头+价目表最终生效值 |
| 计广告费(原/新) | LNK_SALE_ORDER_ITEM.ADVERTISING_MONEY / AD_FLAG | 是/否标签列 | 是否计广告费 | 常显 | (原)=价目表值；(新)=最终生效值 |
| 计开单折扣(原/新) | LNK_SALE_ORDER_ITEM.LH_DISCOUNT_MONEY / DISCOUNT_POLICY_FLAG | 是/否标签列 | 是否计开单折扣 | 常显 | (原)=价目表值；(新)=最终生效值 |
| 定金比例 | LNK_SALE_ORDER_ITEM.DEPOSIT_SCALE | 表格列 | 行定金比例 | 常显，只读 | 提交/扣定金审核计算 |
| 暂扣定金金额 | LNK_SALE_ORDER_ITEM.DEPOSIT_ADVANCE_AMOUNT | 表格列 | 行暂扣定金 | 常显，只读 | 提交时计算 |
| 应用折扣率 | LNK_SALE_ORDER_ITEM.LH_FINAL_DISCOUNT | 表格列 | 行生效折扣率 | 常显，只读 | 政策/价格计算 |
| 折后单价(含安装) | LNK_SALE_ORDER_ITEM.LH_DISCOUNT_PRICE | 表格列 | 折后含安装单价 | 常显，只读 | 标准单价×折扣率 |
| 折后单价(不含安装) | LNK_SALE_ORDER_ITEM.EX_DISCOUNT_PRICE | 表格列 | 折后不含安装单价 | 常显，只读 | 标准单价(不含安装)×折扣率 |
| 总金额(含安装) | LNK_SALE_ORDER_ITEM.LH_DEALER_AMOUNT | 表格列 | 行总金额 | 常显，只读 | 折后单价×数量 |
| 安装金额 | LNK_SALE_ORDER_ITEM.INSTALL_AMOUNT | 表格列 | 行安装金额 | 常显，只读 | 安装单价×数量 |
| 总金额(不含安装) | LNK_SALE_ORDER_ITEM.EX_DEALER_AMOUNT | 表格列 | 行不含安装总金额 | 常显，只读 | 折后单价(不含安装)×数量 |
| 已发数量 | LNK_SALE_ORDER_ITEM.LH_BILLE_QTY | 表格列 | 已出库数量 | 常显，只读 | 出库同步回写 |
| 未发货数量 | LNK_SALE_ORDER_ITEM.LH_UNBILLE_QTY | 表格列 | 未发货数量 | 常显，只读 | 申请数量-已发数量 |
| 未发货金额 | LNK_SALE_ORDER_ITEM.UN_SHIP_AMOUNT | 表格列 | 未发货金额 | 常显，只读 | 计算回写 |
| 未释放定金金额 | LNK_SALE_ORDER_ITEM.UNRELEASE_DEPOSIT_AMT | 表格列 | 未释放定金 | 常显，只读 | 扣定金/发货释放回写 |
| 取消数量 | LNK_SALE_ORDER_ITEM.LH_CANCEL_QTY | 表格列 | 取消数量 | 常显，只读 | 取消操作回写 |
| 已审核未发运数量 | LNK_SALE_ORDER_ITEM.APPROVAL_QUANTITY | 表格列 | 已审核未发运数量 | 常显，只读 | 审批/发运回写 |
| 产品规格 | LNK_SALE_ORDER_ITEM.PROD_STANDARD | 表格列 | 产品规格 | 常显 | 产品资料带出 |
| 颜色 | LNK_SALE_ORDER_ITEM.LH_PROD_COLOR | 表格列 | 产品颜色 | 常显 | 产品资料带出 |
| 体积/重量 | LNK_SALE_ORDER_ITEM.LH_VOLUME / LH_PROD_WIGHT | 表格列 | 单件体积/重量 | 常显 | 产品资料带出 |
| 总体积/总重量 | LNK_SALE_ORDER_ITEM.LH_TO_VOLUME / LH_PROD_TO_WIGHT | 表格列 | 行总体积/重量 | 常显 | 体积×数量 |
| 单位 | LNK_SALE_ORDER_ITEM.LH_PROD_UNIT | 表格列 | 计量单位 | 常显 | 产品资料带出 |
| 订单日期 | LNK_SALE_ORDER_ITEM.CREATED | 表格列 | 行创建时间 | 常显 | 系统时间 |
| 创建人 | LNK_SALE_ORDER_ITEM.FRIST_NAME | 表格列 | 行创建人 | 常显 | 添加人 |
| 是否有效 | LNK_SALE_ORDER_ITEM.LH_VALIDATE_OR_NOT | 表格列 | 行是否有效 | 常显 | Y/N，转单新增行标记 |
| 来源 | LNK_SALE_ORDER_ITEM.LH_ROW_SOURCE | 表格列（LH_ITEM_SOURCE_TYPE） | 行来源 | 常显 | 手工/产品库/转单等 |
| 备注 | LNK_SALE_ORDER_ITEM.LH_COMMENTS | 表格列 | 行备注 | 常显，可编辑 | 行编辑弹窗录入 |
| 后台处理消息 | LNK_SALE_ORDER_ITEM.LH_PROCESS_MESSAGE | 表格列 | 后台处理信息 | 常显，只读 | 系统处理回写 |
| 是否扣定金 | LNK_SALE_ORDER_ITEM.LH_IS_DEPOSIT_OR_NOT | 复选框列 | 行是否扣定金 | 常显，只读 | setKouSaleAndSign 按订单头/政策回写 |
| 尾差 | LNK_SALE_ORDER_ITEM.TAIL_DIFFERENCE | 表格列 | 四舍五入尾差 | 常显，只读 | 价格计算回写 |
| 生命状态 | LNK_SALE_ORDER_ITEM.SM_STATE | 表格列 | 产品生命周期状态 | 常显 | 产品资料带出；提交前校验（Z5淘汰需确认） |
| 操作(编辑/移除) | - | 按钮列 | 行编辑/移除 | 状态∈New/Rejected/EbsReturn且非Submitted且来源非Emps显示 | 编辑需数量校验；有政策行移除用 deleteByPolicyItemId |

### 界面模块4：明细-套装列表（Tab）

> 表对象：LNK_PROD_SUIT_HEAD（套装头）/ LNK_PROD_SUIT_ITEM（套装行），查询 /portal/orderProdSuit/queryOrderProdSuit（orderId入参）

| 字段名 | 数据库列名 | 组件 | 业务释义 | 显隐条件 | 取值/赋值逻辑 |
|-------|-----------|------|---------|---------|-------------|
| 组合套装名称 | LNK_PROD_SUIT_HEAD.PROD_SUIT_NAME | 表格列 | 套装名称 | 常显 | order-suit-dialog 新建/编辑 |
| 状态 | LNK_PROD_SUIT_HEAD.STATUS | 表格列（子值集） | 套装状态 | 常显 | 值集 LNK_PROD_SUIT_HEAD.STATUS |
| 套装备注 | LNK_PROD_SUIT_HEAD.REMARK | 表格列 | 备注 | 常显 | 录入 |
| 数量 | LNK_PROD_SUIT_HEAD.QTY | 表格列 | 套装数量 | 常显 | 新建/编辑 |
| 操作(编辑/移除) | - | 按钮列 | 编辑/移除套装 | 需先保存订单头 | 移除调 /portal/orderProdSuit/deleteOrderProdSuit |
| 套装明细(展开) | LNK_PROD_SUIT_ITEM | 展开子表 | 套装内产品明细 | 展开行查看 | /portal/productSuitItem/queryByExamplePage 按 headId+orderId 查询 |

### 选择弹窗

#### 弹窗1：选择经销商（单选）

| 入参 | | | | 数据范围 |
|------|------|------|------|---------|
| 字段名 | 中文名 | 释义 | 示例 | |
| deptId | 所属事业部 | 登录人事业部 | W-2SJI1CSVW | 弹窗内可选经销商范围：状态有效且类型=经销商AcctType=Dealer，且归属当前登录事业部（needDept/openid） |
| acctType | 客户类型 | 固定=Dealer | Dealer | 只查经销商账户 |

- 弹窗内过滤字段：经销商简称lHacctAbbr、经销商编码acctCode、经销商名称acctName、鼎捷服务商编码lHoldAcctCode
- 查询接口：POST /portal/accnt/queryByExamplePage
- 回填：选中行 → 订单头 acctId/acctCode/acctName/lHcurrency(币种)

> 查询SQL（来源：accnt 查询接口，LNK_ACCNT 经销商主数据）：

```sql
SELECT T.ROW_ID AS ID,
       T.ACCT_CODE,
       T.ACCT_NAME,
       T.LH_ACCT_ABBR AS ACCT_NAME_SHOW,
       T.LH_OLD_ACCT_CODE
  FROM LNK_ACCNT T
 WHERE T.ACCT_TYPE = 'Dealer'
   AND T.DEPT_ID = :当前登录事业部
   AND (T.ACCT_CODE LIKE '%'||:keyword||'%'
     OR T.ACCT_NAME LIKE '%'||:keyword||'%'
     OR T.LH_ACCT_ABBR LIKE '%'||:keyword||'%'
     OR T.LH_OLD_ACCT_CODE LIKE '%'||:keyword||'%')
ORDER BY T.ROW_ID DESC
```

#### 弹窗2：选择开票单位（单选）

| 入参 | | | | 数据范围 |
|------|------|------|------|---------|
| 字段名 | 中文名 | 释义 | 示例 | |
| tradeCompanyId | 交易公司ID | 订单头交易公司 | - | 弹窗内可选开票单位范围：属于所选经销商+交易公司，且开票单位状态=Agree(已审核)，且法人客户二级类型<>106（剔除特殊法人） |
| acctId | 经销商ID | 订单头经销商 | - | 同上 |
| billAcctStatus | 开票状态 | 固定=Agree | Agree | 仅已审核开票单位可选 |
| lHcorporateClientSecondType | 客户二级类型 | 过滤<>'106' | 106 | 页面额外条件 |

- 弹窗内过滤字段：开票单位billAcctName、纳税人识别号creditNo、法人客户编码billAcctCode、类型billAcctType、发票类型billLnvoiceType
- 查询接口：POST /portal/billAccount/queryByExamplePage
- 回填：选中行 → 订单头 billId(开票单位ID)/billIdName/billIdCode/controllerNo/controllerShortName(同控人)/billAcctId

> 查询SQL（来源：billAccount 查询接口，LNK_BILL_ACCOUNT 开票单位）:

```sql
SELECT T.ROW_ID AS ID,
       T.BILL_ACCT_NAME,
       T.CREDIT_NO,
       T.BILL_ACCT_CODE,
       T.BILL_ACCT_TYPE,
       T.BILL_LNVOICE_TYPE,
       T.LH_TAX_RATE
  FROM LNK_BILL_ACCOUNT T
 WHERE T.ACCNT_ID = :经销商ID
   AND T.TRADE_COMPANY_ID = :交易公司ID
   AND T.BILL_ACCT_STATUS = 'Agree'
   AND NVL(T.LH_CORPORATE_CLIENT_SECOND_TYPE,' ') <> '106'
ORDER BY T.ROW_ID DESC
```

#### 弹窗3：添加产品（单选/多选）

> 无促销政策模式：表格每行【添加】逐条加入（可对行内子套餐）；有促销政策模式：左侧政策产品树+多选行【确定】；有关联退货单时切换为可拆退货数量

| 入参 | | | | 数据范围 |
|------|------|------|------|---------|
| 字段名 | 中文名 | 释义 | 示例 | |
| deptId(parameter1) | 事业部ID | 经销商事业部 | W-2SJI1CSVW | 弹窗内可选产品范围：按 事业部+产品线+渠道+经销商+订单类型+订单ID 过滤，产品的产品渠道包含订单渠道、产品有效 |
| productLine(parameter2) | 产品线 | 订单产品线 | CuBathroom | 同上 |
| saleChannel(parameter3) | 销售渠道 | 订单渠道 | Retail | 同上；产品渠道与订单渠道匹配 |
| acctId(parameter4) | 经销商ID | 订单经销商 | - | 经销商可选产品/价格范围 |
| orderType(parameter5) | 订单类型 | Common | Common | 产品适用范围 |
| orderId(parameter6) | 订单ID | 当前订单 | - | 排除已添加产品/按订单价目表 |
| currency | 币种 | 订单币种 | CNY | 价格币种过滤 |

- 弹窗内过滤字段：产品名称prodName、产品编号prodCode、产品线lHprodLine、产品规格prodStandard、套件编码setCode、套件名称setName、型号lHmodel
- 查询接口：
  - 无政策：POST /portal/orderProduct/queryByExamplePage
  - 有关联退货单：POST /portal/orderProduct/queryByExampleReturnPage（增加 associatedReturn）
  - 有促销政策：POST /portal/lHPolicy/getOrderPolicyTree（政策树）+ /portal/lHPolicy/queryPcyItemProdByExamplePage（政策产品明细）
  - 添加全部：POST /portal/orderProduct/addAllRows
- 保存接口：逐行 /portal/lHSaleOrderItem/upsertVersion；政策模式 /portal/lHPolicy/savePolicyOrderItemProd
- 回填：金额/数量回写订单头 totalAmount/lHtotalVolume/lHtotalNum（saveAfter→saveLineAfter 回调刷新）

> 查询SQL（无促销政策-产品选择来源，LNK_PROD 产品主数据）：

```sql
SELECT P.PROD_CODE, P.PROD_NAME, P.LH_MODEL, P.PROD_STANDARD,
       P.PACKAGE_NUMBER, P.LH_PROD_LINE, P.LH_PROD_UNIT,
       P.LH_VOLUME, P.LH_PROD_WIGHT, P.LH_PROD_COLOR, P.SM_STATE
  FROM LNK_PROD P
 WHERE P.DEPT_ID = :事业部ID
   AND P.LH_PROD_LINE = :产品线
   AND P.LH_PROD_CHANNEL LIKE '%'||:销售渠道||'%'
   AND P.LH_VALIDATE_OR_NOT = 'Y'
   AND P.SM_STATE = 'Z1'              -- 正常销售状态
   AND (P.PROD_CODE LIKE '%'||:keyword||'%' OR P.PROD_NAME LIKE '%'||:keyword||'%')
ORDER BY REGEXP_REPLACE(P.PROD_CODE, '[^A-Z]')
```

#### 弹窗4：添加促销政策（单选）

| 入参 | | | | 数据范围 |
|------|------|------|------|---------|
| 字段名 | 中文名 | 释义 | 示例 | |
| orderType | 订单类型 | Common | Common | 弹窗内可选政策范围：政策有效期内、币种=订单币种、订单类型/渠道/业务类型匹配政策、经销商区域在政策适用区域内、有有效经销合同 |
| salesChannel | 渠道 | 订单渠道 | Retail | 同上 |
| lHbuType | 业务类型 | 订单业务类型 | - | 同上 |
| acctId | 经销商ID | 订单经销商 | - | 同上方：需有效经销合同、区域匹配 |
| currency | 币种 | 订单币种 | CNY | 政策币种匹配 |

- 弹窗内过滤字段：促销政策编号id、促销政策名称policyName
- 查询接口：POST /portal/lHPolicy/queryOrderPolicyByExamplePage
- 回填：选中行 → 订单头 lHpromotionPolicyID/lHpromotionPolicy(政策名)/lHdiscountEndTime(折扣有效期)/lHadvertisingMoney(计广告费)

> 查询SQL（促销政策可选范围，LNK_DCT_POLICY_HEAD 政策头 + 区域/合同关联）：

```sql
SELECT P.ROW_ID, P.POLICY_NAME, P.START_DATE, P.END_DATE
  FROM LNK_DCT_POLICY_HEAD P
 WHERE P.ORDER_TYPE = :订单类型
   AND P.SALES_CHANNEL = :渠道
   AND NVL(P.BU_TYPE, :业务类型) = :业务类型
   AND P.CURRENCY = :币种
   AND P.START_DATE <= SYSDATE AND P.END_DATE >= SYSDATE   -- 生效期内
   AND P.STATUS = 'Effective'                               -- 政策生效状态
   AND (P.POLICY_NAME LIKE '%'||:keyword||'%' OR P.ROW_ID LIKE '%'||:keyword||'%')
ORDER BY P.START_DATE DESC
```

#### 弹窗5：选择合同（单选）

| 入参 | | | | 数据范围 |
|------|------|------|------|---------|
| 字段名 | 中文名 | 释义 | 示例 | |
| acctId | 经销商ID | 订单经销商 | - | 弹窗内可选合同范围：属于所选经销商、合同状态=APPROVED(已批准) |
| contractStatus | 合同状态 | 固定=APPROVED | APPROVED | 仅已批准合同可选 |

- 弹窗内过滤字段：合同编号contractNo、工程项目名称projectName
- 查询接口：POST /portal/lhProjectContract/queryByExamplePage
- 前置校验：仅工程/家装渠道可选择；未选促销政策（折扣政策与合同二选一）
- 回填：选中行 → 订单头 lHcontractId/lHcontractNo(合同编号)/lHcontractName(工程项目名称)，并补齐合同名称、是否战略

> 查询SQL（工程合同可选范围，LNK_PROJECT_CONTRACT）：

```sql
SELECT C.ROW_ID, C.CONTRACT_NO, C.PROJECT_NAME, C.PROJECT_END_TIME,
       C.PROJECT_LOCATION, C.IS_STRATEGY, C.CONTRACT_NAME
  FROM LNK_PROJECT_CONTRACT C
 WHERE C.ACCT_ID = :经销商ID
   AND C.CONTRACT_STATUS = 'APPROVED'
   AND (C.CONTRACT_NO LIKE '%'||:keyword||'%' OR C.PROJECT_NAME LIKE '%'||:keyword||'%')
ORDER BY C.CREATED DESC
```

#### 弹窗6：选择收件人（单选）

| 入参 | | | | 数据范围 |
|------|------|------|------|---------|
| 字段名 | 中文名 | 释义 | 示例 | |
| acctId | 经销商ID | 订单经销商 | - | 弹窗内可选收货地址范围：属于所选经销商、地址类型=C(收货地址)、isEffective=Y(有效) |
| addressType | 地址类型 | 固定=C | C | 仅收货地址 |
| isEffective | 是否有效 | 固定=Y | Y | 仅有效地址 |

- 弹窗内过滤字段：收货人姓名consignee、收货人电话mobilePhone、收货人地址fullAddr、项目编码srcId
- 查询接口：POST /portal/acctaddress/queryOrderOptAcctAddrPage
- 回填：选中行 → 订单头 lHConsigneeId(收货地址ID)/consignee(收件人)/consigneePhone(电话)/consigneeAddress(地址)；提交时刷新地址级联省份/市/区

> 查询SQL（收货地址可选范围，LNK_ACCT_ADDR）：

```sql
SELECT A.ROW_ID, A.CONSIGNEE, A.MOBILE_PHONE, A.FULL_ADDR, A.PROVINCE, A.CITY, A.DISTRICT, A.ADDR
  FROM LNK_ACCT_ADDR A
 WHERE A.ACCT_ID = :经销商ID
   AND A.ADDRESS_TYPE = 'C'
   AND A.IS_EFFECTIVE = 'Y'
ORDER BY A.ROW_ID DESC
```

#### 弹窗7：关联退货单（单选）

| 入参 | | | | 数据范围 |
|------|------|------|------|---------|
| 字段名 | 中文名 | 释义 | 示例 | |
| acctId | 经销商ID | 订单经销商 | - | 弹窗内可选退货单范围：属于所选经销商+开票单位+交易公司、订单状态=Approved(审核通过)、业务类型=Adjust(冲差/调整) |
| billId | 开票单位ID | 订单开票单位 | - | 同上 |
| tradeCompanyId | 交易公司ID | 订单交易公司 | - | 同上 |
| status | 订单状态 | 固定=Approved | Approved | 仅审核通过的退货单 |
| lHbuType | 业务类型 | 固定=Adjust | Adjust | 仅冲差调整类 |

- 弹窗内过滤字段：关联退货单orderNo
- 查询接口：POST /portal/lHSaleOrder/queryReturnOrderPage
- 回填：选中行 orderNo → 订单头 associatedReturn；该值再传入添加产品弹窗切换为退货单产品查询(queryByExampleReturnPage)并控制可退数量

> 查询SQL（关联退货单可选范围，LNK_SALE_ORDER 订单头，订单类型=成品退货Return）：

```sql
SELECT O.ORDER_NO, O.ROW_ID
  FROM LNK_SALE_ORDER O
 WHERE O.ACCT_ID = :经销商ID
   AND O.BILL_ID = :开票单位ID
   AND O.TRADE_COMPANY_ID = :交易公司ID
   AND O.STATUS = 'Approved'
   AND O.LH_BU_TYPE = 'Adjust'
   AND O.ORDER_TYPE = 'Return'
ORDER BY O.CREATED DESC
```

### 导入

- 本菜单为常规订单手工创建，无批量导入功能（批量导入由「订单-常规订单导入」/ LHSaleOrderImportController 承载，不在本页面）。

### 其他按钮

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 作废 | 作废订单（状态置 Invalid/Cancelled） | 详情页头 | 非编辑态；来源非YinGe/JINHUA；sourceDataBase≠2；状态∈New/Rejected/EbsReturn/approvedReturn；Rejected 且 lHreviweStatus=Reviewed 不可作废 | 调 updateSaleOrder 更新订单，状态流转 |
| 编辑 | 进入编辑态 | 详情页头 | 非编辑态且来源非Emps；状态∈New/Rejected/EbsReturn（disabledEditHead） | 可编辑范围按渠道/状态放开字段 |
| 保存 | 保存订单头 | 详情页头(编辑态) | 编辑态；除工程渠道部分事业部外 | 校验必输→commitOrder→saveSalesOrder |
| 取消 | 撤销编辑恢复备份 | 详情页头(编辑态) | 编辑态且非新建 | 恢复 form.backup 数据 |
| 提交 | 提交订单（抛OA） | 详情页头 | 非编辑态；状态∈New/Rejected/EbsReturn；非Emps；有政策需价格已计算(lHPriceSign=N且政策id) | 提交校验+二次确认→Submitted→抛OA |
| 打印 | 打印订单 | 详情页头 | 详情态(readonlyFlag+exportFlag)；部门∈指定物流部门；工程渠道部分事业部除外 | 展厅单走 exhibitionHallPrint，其余 orderPrint |
| 扣定金审核 | 扣定金审核通过 | 详情页头 | 状态=Submitted 且产品线∈CuBathroom/CuCeramicTile 且 OA审核状态∈Reviewed/WithoutReview | 调 deductSubscribtionApproval 正式扣定金 |
| 审核拒绝 | 拒绝接单 | 详情页头 | 同扣定金审核条件 | 弹拒绝原因→saveSalesOrder 状态置 Rejected |
| 优先发货 | 申请优先发货 | 详情页头 | 状态=Approved 且 lHPriorityShipping=N | 调 orderPushOA 推送优先发货审批 |
| 报错重推 | 重推EBS同步 | 详情页头 | 详情态+权限orderPushFailRetry=Y+来源Link+状态=EbsSynchronization | 调 retryInValAndErrorToEbs 重推EBS |
| 重推OA | 重推OA流程 | 头-OA审核状态旁链接 | lHreviweStatus=PushFail 且有新增权限 | 调 pushFailPushOA |
| 计算价格 | 按促销政策重算订单行价格 | 明细基本信息工具栏 | 有政策且非编辑态且状态∈New/Rejected，或状态EbsReturn | 调 calPriceOrderItem 重算价格 |
| 新建 | 新增订单行 | 明细基本信息工具栏 | 有新增权限；状态∈New/Rejected/EbsReturn、无政策行、来源非Emps、非工程渠道限制 | 打开添加产品弹窗选择产品 |
| 订单复制 | 复制当前订单为新订单 | 详情页（order-copy-dialog） | 需订单头已存在 | 弹窗重选经销商/交易公司/开票单位/期望到达日期→saveSalesOrder(copyId) 生成新草稿 |

#### 按钮1：作废（详情页头）

- **触发条件**：非编辑态；来源不在[YinGe,JINHUA]、sourceDataBase≠2；状态∈New/Rejected/EbsReturn/approvedReturn；Rejected 且 OA 已审核(Reviewed)不可作废
- **执行逻辑**：
  - 第1点：前端直接调 /portal/lHSaleOrder/updateSaleOrder 提交当前订单头
  - 第2点：后端 updateSaleOrder 校验可编辑状态后按作废逻辑更新（状态置已作废/关闭）
  - 第3点：成功后刷新订单头及订单行明细
- **接口调用**：POST /portal/lHSaleOrder/updateSaleOrder

#### 按钮2：提交（详情页头）

- **触发条件**：非编辑态；状态∈New/Rejected/EbsReturn 且来源非Emps；若选择促销政策需已计算价格(lHPriceSign=N)；工程渠道+卫浴/瓷砖/橱柜/定制/赛唯雅事业部不可提交
- **执行逻辑**：
  - 第1点：前端校验收件人、期望到达日期已填
  - 第2点：含运费时二次确认收货地址
  - 第3点：调 checkSaleOrderItemSmState 校验订单行产品生命状态（淘汰产品Z5需弹窗确认）
  - 第4点：调 /portal/lHSaleOrder/submitSaleOrderApply（参数 orderId/orderUpdateTime/动态确认flags）走后端提交校验与状态流转
  - 第5点：返回 needConfirm 时二次确认并递归携带 flag 提交
  - 第6点：提交成功后 errorProdCode 非空则提示是否更新价格(updateProPrice)
- **接口调用**：POST /portal/lHSaleOrder/submitSaleOrderApply
- **排查SQL**：

```sql
-- 订单当前状态
SELECT ORDER_NO, STATUS, LH_REVIWE_STATUS, VERSION, LAST_UPDATED
  FROM LNK_SALE_ORDER WHERE ROW_ID = :订单ID;
-- 订单行产品生命状态
SELECT ITEM.PROD_CODE, ITEM.SM_STATE
  FROM LNK_SALE_ORDER_ITEM ITEM
 WHERE ITEM.ORDER_ID = :订单ID;
```

#### 按钮3：扣定金审核 / 审核拒绝（详情页头）

- **触发条件**：状态=Submitted；订单产品线∈[CuBathroom 卫浴, CuCeramic Tile 瓷砖]；OA审核状态∈[Reviewed, WithoutReview]；工程渠道+部分事业部除外
- **执行逻辑**：
  - 第1点：扣定金审核：调 /portal/lHSaleOrder/deductSubscribtionApproval，通过后正式扣减定金并刷新
  - 第2点：审核拒绝：弹"拒绝原因"输入备注 → 调 saveSalesOrder 将状态置 Rejected
- **接口调用**：POST /portal/lHSaleOrder/deductSubscribtionApproval；POST /portal/lHSaleOrder/saveSalesOrder
- **排查SQL**：

```sql
SELECT ORDER_NO, STATUS, ORDER_PROD_LINE, LH_REVIWE_STATUS, ITEM_KONT_SIGN, DEPOSIT_SCALE
  FROM LNK_SALE_ORDER WHERE ROW_ID = :订单ID;
```

#### 按钮4：计算价格（明细基本信息工具栏）

- **触发条件**：有促销政策(lHpromotionPolicyID非空) 且 非编辑态 且 状态∈New/Rejected；或状态=EbsReturn；且来源非Emps；工程渠道限制除外
- **执行逻辑**：调 /portal/lHPolicy/calPriceOrderItem（订单ID+版本）重算订单行价格/折扣率/暂扣定金，成功后刷新订单头与行
- **接口调用**：POST /portal/lHPolicy/calPriceOrderItem

#### 按钮5：订单复制（order-copy-dialog 弹窗）

- **触发条件**：订单头已存在（有 orderNo/id）
- **执行逻辑**：
  - 第1点：弹窗将当前订单复制为 form，可重选经销商/交易公司/开票单位/期望到达日期（重选后清空并重新 getAcct/getCompany）
  - 第2点：提交组装参数 {订单+id清空+status=New+copyId=原订单id+copydeptId}
  - 第3点：调 saveSalesOrder，后端 confirmCopyOrder 校验可复制；copySign=N 报"该订单不能复制"
  - 第4点：成功后跳转新订单详情(mode=detail&id=新订单id)
- **接口调用**：POST /portal/lHSaleOrder/saveSalesOrder

### 保存校验

- 校验1：交易公司不能为空 —— 阻断性报错，保存头必填

  - 详细逻辑

    - 第1点：saveSalesOrder 第一步即校验 tradeCompanyName 非空，否则抛"交易公司不能为空！"

  - 系统体现：阻断性报错（前端$message）

- 校验2：合同与订单信息一致性 —— 业务一致性

  - 详细逻辑

    - 第1点：checkOrderWithContract 校验订单所选合同/政策与订单头信息一致

  - 系统体现：阻断性报错

- 校验3：版本并发控制 —— 防并发覆盖

  - 详细逻辑

    - 第1点：非新建时 orderVersionControl 校验订单版本，本地与库内不一致则报并发冲突
    - 第2点：checkOrderCanUpdate 校验当前状态可编辑（见状态机可编辑状态集）

  - 系统体现：阻断性报错

- 校验4：渠道合法性 —— 数据正确性

  - 详细逻辑

    - 第1点：chreckSalesChannel 校验销售渠道在合法配置内（渠道参数配置 getLnkSysPropertyFilterCfgByType）

  - 系统体现：阻断性报错

- 校验5：交易公司、币种校验与汇率查询 —— 数据正确性

  - 详细逻辑

    - 第1点：checkTradeCompany/checkCurrency 校验所选交易公司与币种合法，queryExchangeRate 按币种取汇率

  - 系统体现：阻断性报错

- 校验6：出口客户管控 —— 业务规则

  - 详细逻辑

    - 第1点：checkAccount 校验出口客户(outAccount=Y)不能下常规订单（前端亦有拦截）

  - 系统体现：阻断性报错（前端 message "此客户为出口客户，仅能下出口订单！"）

- 校验7：期望到达日期与地址 —— 数据正确性

  - 详细逻辑

    - 第1点：checkLHexpectedArrivedDate 校验期望到达日期不为空且在允许范围
    - 第2点：checkAddress 校验收货地址格式与省市区级联

  - 系统体现：阻断性报错

- 校验8：整箱包装数 —— 数量合规性

  - 详细逻辑

    - 第1点：checkPackageNumber 校验订单行数量符合产品整箱包装数要求（样品豁免）

  - 系统体现：阻断性报错

- 校验9：开票单位校验与出库余额 —— 数据完整性

  - 详细逻辑

    - 第1点：chackBillCode 校验开票单位信息完整；setOBBalance 设置出库余额

  - 系统体现：阻断性报错

- 校验10：审批设置必须存在 —— 业务配置

  - 详细逻辑

    - 第1点：getApprovalHead 按 订单类型+渠道+产品线+业务类型 查找审批设置，未维护报"审批设置并没维护：[xxx][xxx][xxx][xxx]"

  - 系统体现：阻断性报错

  - 排查SQL：

    ```sql
    -- 查找匹配的审批设置
    SELECT * FROM LNK_APPROVAL_CFG
     WHERE ORDER_TYPE = :订单类型 AND PROD_CHANNEL = :渠道
       AND ORDER_PROD_LINE = :产品线 AND BU_TYPE = :业务类型;
    ```

### 提交校验

- 校验1：订单版本与可提交状态 —— 并发/状态正确性

  - 详细逻辑

    - 第1点：orderVersionControl 校验版本
    - 第2点：checkOrderCanSubmit 校验订单状态处于可提交状态(New/Rejected/EbsReturn等)

  - 系统体现：阻断性报错

- 校验2：BI 捆绑销售配套率提醒（二次确认） —— 业务提醒

  - 详细逻辑

    - 第1点：常规/计划单且事业部开启捆绑销售校验(lhBundleSalesCheck=Y)时调 BI 接口获取配套率提醒
    - 第2点：BI 返回需提醒(comment_YN=Y)则返回 needConfirm=biConfirmFlag，用户确认后可继续

  - 系统体现：弹窗强制提醒（确认后可提交）

- 校验3：经销商可选产品清单校验 —— 产品合规

  - 详细逻辑

    - 第1点：按员工类型+订单类型+经销商判断是否启用可选清单管控(checkProdChooseControlFiltr)
    - 第2点：启用则校验订单行产品均在经销商可选清单内(checkProdCanChooseControl)

  - 系统体现：阻断性报错

- 校验4：可供数量校验 —— 库存/产能

  - 详细逻辑

    - 第1点：常规/计划/配件/广告/废料/转卖/出口/礼品类型校验每个产品在期望到达月的可供数量(checkOrderQuantityControl：起订量/生产周期/标准交付)

  - 系统体现：阻断性报错

- 校验5：产品上下架/价目表状态 —— 数据正确性

  - 详细逻辑

    - 第1点：非退货类订单 verifyProStatus 校验产品处于上架状态且价目表有效
    - 第2点：errorProdCode 非空报"订单行产品[xx]存在异常（如：价格存在异动），请删除重新添加！"

  - 系统体现：阻断性报错

- 校验6：全年折扣率校验 —— 价格合规

  - 详细逻辑

    - 第1点：无促销政策且非折扣/广告/礼品/退货等类型、无折扣申请单来源且非造易时 verifyFullYearDiscount 校验全年折扣率
    - 第2点：常规单无政策时按配置对非淘汰产品价格上浮1个点

  - 系统体现：阻断性报错

- 校验7：折扣政策校验 —— 政策合规

  - 详细逻辑

    - 第1点：checkPolicyStatus 校验政策未失效；有政策订单行需满足封顶量要求(checkPolicyOrder)
    - 第2点：checkDiscount 校验计合同折扣行的全年折扣匹配

  - 系统体现：阻断性报错

- 校验8：折扣产品提货比例提醒（二次确认） —— 业务提醒

  - 详细逻辑

    - 第1点：非定制单超过折扣产品提货比例时返回 needConfirm=discGoodsRatioControlFlag，用户确认后继续

  - 系统体现：弹窗强制提醒（确认后可提交）

- 校验9：快递免运费标识校验 —— 业务合规

  - 详细逻辑

    - 第1点：checkFreeFreight 校验快递免运费标记是否可置Y（含经销商并发锁）

  - 系统体现：阻断性报错

- 校验10：出货单/退货关联校验（仅退货类订单） —— 业务合规

  - 详细逻辑

    - 第1点：工程/家装渠道退货订单行出库单必填、出库单号一致、销退来源、产品渠道一致性校验（非常规单不适用，备用于关联退货场景）

  - 系统体现：阻断性报错

- 校验11：信用管控账户余额校验 —— 资金合规

  - 详细逻辑

    - 第1点：开票单位信用管控=lHisCreditControl=Y时通过 EBS 同步接口校验可用额度（X_AVAILABLE_AMOUNT），小于订单总额报"账户余额不足!"

  - 系统体现：阻断性报错

- 校验12：预付定金预占与审批 —— 资金流转

  - 详细逻辑

    - 第1点：decideOrderDepositInfo 按审批设置计算定金，预占定金(unFreezeDeposit 失败回滚)
    - 第2点：OrderLHApprovalCFG 发起 OA 审批，异常推送钉钉告警

  - 系统体现：阻断性报错/钉钉告警

### 状态机

#### 状态机流转图

```text
        ┌─────────────┐  保存    ┌─────────────┐
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
      作废(updateSaleOrder)──► Invalid(已作废)/Cancelled(已取消)
```

#### 状态机列表

| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| New | 草稿（新建默认） | 编辑、新增/删除订单行、保存、提交、作废、复制 |
| Rejected | 审核拒绝（OA拒绝） | 编辑、修改订单行、重新提交、作废；若 OA 已审查(Reviewed)不可作废 |
| EbsReturn | EBS退回 | 编辑、修改订单行、重新提交、作废 |
| approvedReturn | 审核退回 | 编辑、重新提交、作废 |
| Submitting | 提交中（异步提交瞬间态） | 等待异步结果，失败回滚 New |
| Submitted | 已提交（待OA审批） | 扣定金审核、审核拒绝、等待审批；明细不可编辑 |
| Approved | 审核通过 | 优先发货、同步EBS、打印；经EBS同步后流转发货 |
| EbsSynchronization | EBS发货同步中 | 报错重推EBS（EBS同步异常回滚时显示） |
| Partially Shipped | 部分发货 | 继续发货、关闭 |
| Closed | 已完成 | 只读 |
| PartCancelled | 部分取消 | 查看 |
| Cancelled / Invalid | 已取消/已作废 | 只读 |
| ZAOYICreated | 造易草稿 | 造易系统处理 |
| E3Fail | E3同步失败 | 重推E3 |

> 前端可编辑状态集（OrderStatusEnum.editStatusSet）：New、EbsReturn、Rejected、approvedReturn、CSSApprove、CSSReject

---

</div>
</div>
</div>

<div id="permission" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="权限控制">
<!-- 空白:待补充 -->
</KbCard>
</div>
</div>
</div>

<div id="faq" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
## 常见问题FAQ

### 报错一览表

| 序号 | 报错信息 | 提示节点 | 根因与解决方案 | 等级 | 详细逻辑解析 |
|------|---------|---------|-------------|------|-------------|
| 01 | 交易公司不能为空！ | 保存 | 未选择/未带出交易公司；检查经销商是否绑定交易公司、签约方式是否匹配 | 阻断性报错 | 查看 §01 |
| 02 | 找不到单据编号,请联系相关人员维护 | 保存(新建) | LNK_ENCODING_CFG 未按 事业部+订单类型 维护单据编码 | 阻断性报错 | 查看 §02 |
| 03 | 审批设置并没维护：[订单类型][渠道][产品线][业务类型] | 保存 | LNK_APPROVAL_CFG 未维护对应四要素审批设置 | 阻断性报错 | 查看 §03 |
| 04 | 请先选择经销商 | 弹窗打开(开票/促销/合同/收件人) | 未选经销商即点弹窗按钮 | toast提醒 | 查看 §04 |
| 05 | 请先选择交易公司 | 开票单位弹窗 | 未选交易公司 | toast提醒 | 查看 §05 |
| 06 | 请先选择开票单位 | 合同弹窗 | 合同选择前置开票单位 | toast提醒 | 查看 §06 |
| 07 | 只有工程和家装渠道才可以选择 | 合同弹窗 | 非工程/家装渠道 | toast提醒 | 查看 §07 |
| 08 | 折扣政策和合同信息只能二选一 | 合同弹窗 | 已选促销政策 | toast提醒 | 查看 §08 |
| 09 | 请先选择渠道 | 促销政策弹窗 | 未选渠道 | toast提醒 | 查看 §09 |
| 10 | 请选择经销商带出币种字段 | 促销政策弹窗 | 币种为空 | toast提醒 | 查看 §10 |
| 11 | 请先保存订单头信息 | 新建/编辑订单行 | 订单头未先保存 | toast提醒 | 查看 §11 |
| 12 | 申请数量不能大于原订单可转数量 | 行编辑 | 转单行数量超可转量 | 阻断性报错 | 查看 §12 |
| 13 | 产品数量不满足促销政策要求,请检查! | 行编辑 | 数量不满足政策封顶量 | 阻断性报错 | 查看 §13 |
| 14 | 此客户为出口客户，仅能下出口订单！ | 保存 | 出口客户(outAccount=Y)下常规单 | 阻断性报错 | 查看 §14 |
| 15 | 请完成必输信息的填写！ | 保存 | 必输字段(渠道/产品线/业务类型/开票单位/期望到达日期/收件人)未填 | toast提醒 | 查看 §15 |
| 16 | 该订单不能复制 | 订单复制 | 原订单复制校验未通过 | 阻断性报错 | 查看 §16 |
| 17 | 订单所选折扣政策被其他订单占用，请稍后再试！ | 提交 | 同一促销政策被并发提交占用(Redis锁) | 阻断性报错 | 查看 §17 |
| 18 | 该订单经销商正在下"快递免运费"订单，请稍后再试！ | 提交 | 同经销商并发免运费单(Redis锁) | 阻断性报错 | 查看 §18 |
| 19 | 订单行产品[xx]存在异常（如：价格存在异动），请删除重新添加！ | 提交 | errorProdCode 非空，价目表价格异动/上下架 | 阻断性报错 | 查看 §19 |
| 20 | 账户余额不足! | 提交 | 信用管控开票单位可用额度 < 订单总额 | 阻断性报错 | 查看 §20 |
| 21 | 折扣政策有效结束日期是xxxx-xx-xx，请修改期望到达日期小于折扣政策有效结束日期！ | 提交 | 期望到达日期晚于政策结束日 | 阻断性报错 | 查看 §21 |
| 22 | 合同有效结束日期是xxxx-xx-xx，请修改期望到达日期小于合同有效结束日期！ | 提交 | 期望到达日期晚于合同结束日 | 阻断性报错 | 查看 §22 |
| 23 | 订单审批设置类型未维护，请联系管理员进行维护！ | 提交 | 审批设置不存在 | 阻断性报错 | 查看 §23 |
| 24 | 当前状态不可进行此操作 | 提交/改单 | 状态非可编辑/可提交状态 | 阻断性报错 | 查看 §24 |

#### 报错详细逻辑解析

##### §01 交易公司不能为空！ 【保存-交易公司】

- **报错条件**：点击保存时，订单头 tradeCompanyName（交易公司名称）为 null
- **触发路径**：保存按钮 → validateFormData → commitOrder → POST /portal/lHSaleOrder/saveSalesOrder → LHSaleOrderServiceImpl.saveSalesOrder
- **详细逻辑**：
  - 第1点：saveSalesOrder 方法入口第一处校验：`if (lhSaleOrder.getTradeCompanyName() == null) throw new BasicServiceException("交易公司不能为空！")`
  - 第2点：交易公司由前端初始化（新建时 getTradeCompany 自动带出首个匹配交易公司）；若经销商未绑定交易公司、签约方式不匹配、组织公司无相应类型记录，前端带不出交易公司则保存必触发
  - 第3点：经销商资料"可更改交易公司"(LNK_ACCNT.COMMENTS=Y)时走 billAccount 列表；否则走 lHOrgCompany 按 事业部+公司类型 匹配
- **系统体现**：阻断性报错（保存失败）
- **排查SQL**：

```sql
-- 1.经销商是否绑定事业部/交易公司
SELECT ROW_ID, ACCT_CODE, ACCT_NAME, DEPT_ID, COMMENTS, CONTRACT_WAY
  FROM LNK_ACCNT WHERE ROW_ID = :经销商ID;
-- 2.事业部下是否存在该签约方式对应的交易公司（经销=Sales/直销=Project）
SELECT ROW_ID, ACCT_ID, ACCT_NAME, COMPANY_TYPE
  FROM LNK_ORG_COMPANY
 WHERE DEPT_ID = :经销商事业部ID AND COMPANY_TYPE = :Sales或Project;
```

##### §02 找不到单据编号,请联系相关人员维护 【保存-单号】

- **报错条件**：新建订单保存时，按 事业部(deptId)+订单类型(orderType)=Common 查不到单据编码配置
- **触发路径**：新建 → 保存 → saveSalesOrder → setOrderNumber → lhEncodingCFGService.getEncodingByOrderType
- **详细逻辑**：
  - 第1点：`LHEncodingCFG encodingByOrderType = lhEncodingCFGService.getEncodingByOrderType(deptId, orderType)`
  - 第2点：返回 null 则 `throw new Exception("找不到单据编号,请联系相关人员维护")`
  - 第3点：正常时取单据编码 docuCode + 流水号(日期 yyMM + 序号) 拼接，如 `DD-2609XXX`
- **系统体现**：阻断性报错（订单无法生成编号，保存失败）
- **排查SQL**：

```sql
-- 检查单据编码配置是否存在
SELECT ROW_ID, DOCU_CODE, DEPARTMENT_ID, ORDER_TYPE
  FROM LNK_ENCODING_CFG
 WHERE DEPARTMENT_ID = :事业部ID AND ORDER_TYPE = 'Common';
```

##### §03 审批设置并没维护：[订单类型][渠道][产品线][业务类型] 【保存-审批】

- **报错条件**：保存时按 订单类型+销售渠道+产品线+业务类型 四要素找不到审批设置记录
- **触发路径**：保存 → saveSalesOrder → lhSaleOrderService.getApprovalHead
- **详细逻辑**：
  - 第1点：`LHApprovalCFG appInfoByOrder = lhSaleOrderService.getApprovalHead(lhSaleOrder)`
  - 第2点：null 时抛错，错误信息将四要素 LOV 名称拼出（ORDER_TYPE/LH_PROD_CHANNEL/LH_PROD_LINE/LH_BU_TYPE）
  - 第3点：审批设置还承载扣定金管控(LHIsDeposit、DepositScale)和后续 OA 审批配置，缺失会导致无法走审批流
- **系统体现**：阻断性报错（保存失败）
- **排查SQL**：

```sql
-- 按四要素查找审批设置
SELECT * FROM LNK_APPROVAL_CFG
 WHERE ORDER_TYPE='Common' AND PROD_CHANNEL=:渠道
   AND ORDER_PROD_LINE=:产品线 AND BU_TYPE=:业务类型;
```

##### §04 请先选择经销商 【弹窗-前置】

- **报错条件**：未选择经销商(dealerDialog 未回填 acctId)时，点击 开票单位/促销政策/合同/收件人 任一弹窗按钮
- **触发路径**：点击弹窗按钮 → dialogControl(self, acctId, type) / billIdNameController
- **详细逻辑**：
  - 第1点：`if (acctId) { 打开对应弹窗 } else { $message.error('请先选择经销商') }`
  - 第2点：经销商是开票单位、促销政策、合同、收件人所有弹窗的共同前置条件（决定数据范围）
- **系统体现**：toast 提醒（不打开弹窗）
- **排查SQL**：无需 SQL（纯前端交互前置校验）；确认订单头 ACCT_ID 是否为空即可

##### §05 请先选择交易公司 【开票单位弹窗-前置】

- **报错条件**：点击开票单位弹窗时 acctId 已有值，但 tradeCompanyId 为空
- **触发路径**：点击开票单位搜索 → billIdNameController(self, acctId, tradeCompanyId, 'billFirmDialog')
- **详细逻辑**：
  - 第1点：`if (acctId && tradeCompanyId) { that.form.billFirmDialog = true }`
  - 第2点：`else if (!acctId){ 提示请先选择经销商 } else if(!tradeCompanyId){ 提示请先选择交易公司 }`
  - 第3点：开票单位数据范围依赖交易公司（同一经销商+交易公司下的已审核开票单位），故必须先有交易公司
- **系统体现**：toast 提醒
- **排查SQL**：

```sql
-- 确认订单头交易公司已带出
SELECT TRADE_COMPANY_ID, TRADE_COMPANY_NAME FROM LNK_SALE_ORDER WHERE ROW_ID = :订单ID;
```

##### §06 请先选择开票单位 【合同弹窗-前置】

- **报错条件**：点击合同弹窗时，订单头 billId(开票单位) 为空
- **触发路径**：点击合同搜索 → dialogControl(self, acctId, 'contractDialog')
- **详细逻辑**：
  - 第1点：contractDialog 分支先校验 billId：`if (!that.form.data.billId) { 提示请先选择开票单位; return false }`
  - 第2点：合同的可选范围需匹配开票单位（法人客户），同时保证发票主体与合同主体一致
- **系统体现**：toast 提醒（不打开合同弹窗）
- **排查SQL**：

```sql
-- 确认开票单位已选
SELECT BILL_ID, BILL_ID_NAME FROM LNK_SALE_ORDER WHERE ROW_ID = :订单ID;
```

##### §07 只有工程和家装渠道才可以选择 【合同弹窗-渠道】

- **报错条件**：点击合同弹窗时，订单渠道 salesChannel 不属于 [Project 工程, HomeDecoration 家装]
- **触发路径**：dialogControl contractDialog 分支
- **详细逻辑**：
  - 第1点：`if (!['Project', 'HomeDecoration'].includes(that.form.data.salesChannel)) { 提示只有工程和家装渠道才可以选择; return false }`
  - 第2点：工程项目合同仅适用于工程、家装渠道的订单，其他渠道（零售/电商等）不需要也不允许挂工程合同
- **系统体现**：toast 提醒
- **排查SQL**：无需 SQL；确认渠道是否为 Project/HomeDecoration

##### §08 折扣政策和合同信息只能二选一 【合同弹窗-互斥】

- **报错条件**：订单头已选择促销政策(lHpromotionPolicy 非空)时点击合同弹窗
- **触发路径**：dialogControl contractDialog 分支
- **详细逻辑**：
  - 第1点：`if (that.form.data.lHpromotionPolicy) { 提示折扣政策和合同信息只能二选一; return false }`
  - 第2点：同一订单不能同时享受促销政策折扣与工程合同折扣（价格计算互斥），两者只能挂其一
- **系统体现**：toast 提醒（不打开合同弹窗）
- **排查SQL**：

```sql
-- 确认是否已挂促销政策
SELECT LH_PROMOTION_POLICY_ID, LH_PROMOTION_POLICY, LH_CONTRACT_NO
  FROM LNK_SALE_ORDER WHERE ROW_ID = :订单ID;
```

##### §09 请先选择渠道 【促销政策弹窗-前置】

- **报错条件**：点击促销政策弹窗时，订单渠道 salesChannel 为空
- **触发路径**：dialogControl promotionPolicyDialog 分支
- **详细逻辑**：
  - 第1点：`if (that.form.data && !that.form.data.salesChannel) { 提示请先选择渠道; return }`
  - 第2点：促销政策按渠道过滤（政策头 SALES_CHANNEL 匹配订单渠道），无渠道无法确定可选政策范围
- **系统体现**：toast 提醒
- **排查SQL**：无需 SQL；确认渠道已选（渠道为必输字段之一）

##### §10 请选择经销商带出币种字段 【促销政策弹窗-币种】

- **报错条件**：点击促销政策弹窗（beforeOpenPromotionPolicy）时订单头 lHcurrency 为空
- **触发路径**：促销政策输入框搜索按钮 → beforeOpenPromotionPolicy
- **详细逻辑**：
  - 第1点：`if (!this.form.data.lHcurrency) { 提示请选择经销商带出币种字段; return false }`
  - 第2点：政策弹窗查询时按币种过滤(defaultFilterRaw: CURRENCY=订单币种)，币种缺失则政策候选未知
  - 第3点：币种 lHcurrency 由选择经销商时从 LNK_ACCNT.CURRENCY 带出；若经销商主数据未维护币种则为空
- **系统体现**：toast 提醒
- **排查SQL**：

```sql
-- 检查经销商币种是否维护
SELECT ROW_ID, ACCT_CODE, CURRENCY FROM LNK_ACCNT WHERE ROW_ID = :经销商ID;
```

##### §11 请先保存订单头信息 【订单行操作-前置】

- **报错条件**：订单头 orderNo 为空时点击 新建/编辑/移除 订单行
- **触发路径**：newProduct() / orderLineEditor() / deleteClick()
- **详细逻辑**：
  - 第1点：`if (this.form.data.orderNo && !this.form.isEditing) { 打开产品选择弹窗/行编辑 } else { 提示请先保存订单头信息; 先保存 }`
  - 第2点：订单行(upsertVersion)依赖订单头已有 orderNo/orderId，订单头未保存无法新增/编辑订单行（新建时点新建会先自动保存头）
- **系统体现**：toast 提醒（并自动执行保存逻辑）
- **排查SQL**：

```sql
-- 确认订单头已生成
SELECT ORDER_NO, ROW_ID AS ORDER_ID FROM LNK_SALE_ORDER WHERE ROW_ID = :订单ID;
```

##### §12 申请数量不能大于原订单可转数量 【行编辑-数量】

- **报错条件**：编辑转单来源订单行时，新数量 qTY ≥ 原订单可转数量 lHOriginalRowQTY
- **触发路径**：行编辑弹窗点确定 → orderLineEditorConfirm
- **详细逻辑**：
  - 第1点：`if (scope.fmdt.lHOriginalRowQTY != 0 && 非空 && qTY >= lHOriginalRowQTY) { 提示申请数量不能大于原订单可转数量; return }`
  - 第2点：lHOriginalRowQTY 为从原单(折扣单/计划单转常规)带来的可转数量，转单行数量只减不增，防止超转
- **系统体现**：行内校验 error，阻断保存该行
- **排查SQL**：

```sql
-- 转单行原始可转数量与当前数量
SELECT ORDER_ID, PROD_CODE, QTY, LH_ORIGINAL_ROW_QTY
  FROM LNK_SALE_ORDER_ITEM WHERE ROW_ID = :订单行ID;
```

##### §13 产品数量不满足促销政策要求,请检查! 【行编辑-封顶量】

- **报错条件**：有折扣政策的订单行(lHDctpolicyItemId 非空)编辑数量后，封顶量校验不通过
- **触发路径**：行编辑确定 → lHDctpolicylevel/checkMaxNum
- **详细逻辑**：
  - 第1点：构造 policyLevel{itemId:政策行ID, usercorpid, orderId, orderLineId, cappingQuantity:新数量} 调 POST /portal/lHDctpolicylevel/checkMaxNum
  - 第2点：返回 true（任一政策等级校验通过）才允许更新行(selProd.addMethod)；返回 false 则提示"产品数量不满足促销政策要求"
  - 第3点：折扣政策按产品/型号/全产品等级设置封顶量，超量需调整数量或选其他政策
- **系统体现**：阻断性报错（行数量不保存）
- **排查SQL**：

```sql
-- 查看政策行封顶量（lHDctpolicyItemId）
SELECT ROW_ID, POLICY_HEAD_ID, PROD_CODE, CAPPING_QTY, POLICY_ITEM_TYPE
  FROM LNK_DCT_POLICY_ITEM WHERE ROW_ID = :订单行政策行ID;
```

##### §14 此客户为出口客户，仅能下出口订单！ 【保存-出口客户】

- **报错条件**：经销商基础资料 outAccount='Y'（出口客户）时保存常规订单
- **触发路径**：保存 → commitOrder（前端） / saveSalesOrder → checkAccount（后端）
- **详细逻辑**：
  - 第1点：前端 commitOrder：`if (that.acctInfo.outAccount === 'Y') { 提示此客户为出口客户，仅能下出口订单; return Promise.reject() }`
  - 第2点：后端 lHSaleOrderService.checkAccount(lhSaleOrder) 再做兜底拦截
  - 第3点：出口客户只能走「出口常规订单」等出口类订单类型，不允许下内销常规订单
- **系统体现**：toast 提醒（阻断保存）
- **排查SQL**：

```sql
-- 检查经销商是否出口客户
SELECT ROW_ID, ACCT_CODE, ACCT_NAME, OUT_ACCOUNT FROM LNK_ACCNT WHERE ROW_ID = :经销商ID;
```

##### §15 请完成必输信息的填写！ 【保存-必输】

- **报错条件**：保存时表单必输字段校验失败（acctName经销商标识/billIdName开票单位/salesChannel渠道/orderProdLine产品线/lHbuType业务类型/lHexpectedArrivedDate期望到达日期/lHAdvertingMoneyType扣款方式/consignee收件人）
- **触发路径**：保存 → validateFormData → this.$refs.form.validate
- **详细逻辑**：
  - 第1点：form.rules 定义上述字段 required 校验（trigger blur/change）
  - 第2点：validate 回调 valid=false 时 `$message.error('请完成必输信息的填写！')` 并 return，不执行 commitOrder
  - 第3点：valid=true 时清错后执行 commitOrder(保存头) 与 validatepromotionPolicy
- **系统体现**：toast 提醒（保存不执行）
- **排查SQL**：无需 SQL；逐项确认头字段是否已填

##### §16 该订单不能复制 【订单复制-校验】

- **报错条件**：order-copy-dialog 提交复制时，后端 confirmCopyOrder 判定原订单不可复制
- **触发路径**：复制弹窗确定 → saveSalesOrder(copyId=原订单id) → confirmCopyOrder
- **详细逻辑**：
  - 第1点：saveSalesOrder 中 `if (copyId 非空) { lHSaleOrderService.confirmCopyOrder(lhSaleOrder); if (copySign等于'N') { return lhSaleOrder } }`
  - 第2点：confirmCopyOrder 校验原订单是否允许复制（如订单状态、来源、促销政策复制限制 validatepromotionPolicy 等），不允许则置 copySign='N'
  - 第3点：前端收到 result.copyId 非空且 copySign=='N' 则报"该订单不能复制"并跳转原订单详情
- **系统体现**：阻断性报错（不生成新订单）
- **排查SQL**：

```sql
-- 查看原订单复制信息
SELECT ORDER_NO, STATUS, SOURCE, COPY_ID, COPY_SIGN FROM LNK_SALE_ORDER WHERE ROW_ID = :订单ID;
```

##### §17 订单所选折扣政策被其他订单占用，请稍后再试！ 【提交-政策锁】

- **报错条件**：提交时给促销政策 Redis 分布式锁 tryLock 失败
- **触发路径**：提交 → submitSaleOrderApplyLock
- **详细逻辑**：
  - 第1点：订单有促销政策(lHpromotionPolicyID 非空)时，`localKey = OAPI_ORDER_SUBMIT_POLICY_PREFIX + 政策ID`，取 redisson 锁
  - 第2点：`lock.tryLock()` 失败（同一政策正被其他订单提交占用）则 `throw new BasicServiceException("订单所选折扣政策被其他订单占用，请稍后再试！")`
  - 第3点：锁在 finally 释放，防止同一政策并发提交导致封顶量超占
- **系统体现**：阻断性报错（提交失败，重试即可）
- **排查SQL**：无需 SQL；重试提交或等前序提交完成后操作。可核对政策头是否正被占用：

```sql
SELECT ROW_ID, POLICY_NAME, STATUS FROM LNK_DCT_POLICY_HEAD WHERE ROW_ID = :促销政策ID;
```

##### §18 该订单经销商正在下"快递免运费"订单，请稍后再试！ 【提交-免运费锁】

- **报错条件**：提交且需免运费校验时，经销商维度的免运费 Redis 分布式锁 tryLock 失败
- **触发路径**：提交 → submitSaleOrderApplyLock → needCheckFreeFreight
- **详细逻辑**：
  - 第1点：`needCheckFreeFreight(freeFreightFlag, orderType, isServery, placeOrderType)` 为 true 时按经销商加锁 `OAPI_ORDER_SUBMIT_FREE_FREIGHT + acctId`
  - 第2点：tryLock 失败说明同经销商存在其他正在提交的"快递免运费"订单，抛"该订单经销商xxx正在下'快递免运费'订单，请稍后再试！"
  - 第3点：防止同一经销商同时产生多张含免运费的订单造成运费数据不一致
- **系统体现**：阻断性报错（稍后再试）
- **排查SQL**：无需 SQL；重试提交。核对订单含运费标志：

```sql
SELECT ORDER_NO, FREE_FREIGHT_FLAG, INCLUDE_FREIGHT_FLAG, ACCT_ID
  FROM LNK_SALE_ORDER WHERE ROW_ID = :订单ID;
```

##### §19 订单行产品[xx]存在异常（如：价格存在异动），请删除重新添加！ 【提交-产品校验】

- **报错条件**：提交时 errorProdCode（异常产品编码集合）非空
- **触发路径**：提交 → submitSaleOrderApply → verifyProStatus（非退货类单）等
- **详细逻辑**：
  - 第1点：非退货类订单 `lHSaleOrderService.verifyProStatus(lhSaleOrder, "UpperShelf")` 校验产品上架状态与价目表状态
  - 第2点：校验发现的异常产品编码被写入 lhSaleOrder.errorProdCode
  - 第3点：`if (errorProdCode 非空) throw new BizException("订单行产品[xx]存在异常（如：价格存在异动），请删除重新添加！")`
  - 第4点：同时 submitSaleOrderApply 成功返回时 errorProdCode 非空会触发前端 changeProPrice 提示"价格调整，是否更新价格"
- **系统体现**：阻断性报错（提交失败，需删除异常产品行重新添加）
- **排查SQL**：

```sql
-- 排查订单行产品的上架/价目表状态
SELECT ITEM.PROD_CODE, P.SM_STATE, P.LH_VALIDATE_OR_NOT,
       (SELECT COUNT(1) FROM LNK_PRICE_LIST_ITEM PLI WHERE PLI.PROD_ID = ITEM.PROD_ID AND PLI.STATUS='Effective') AS PRICE_CNT
  FROM LNK_SALE_ORDER_ITEM ITEM
  LEFT JOIN LNK_PROD P ON P.PROD_CODE = ITEM.PROD_CODE
 WHERE ITEM.ORDER_ID = :订单ID;
```

##### §20 账户余额不足! 【提交-余额】

- **报错条件**：开票单位信用管控=lHisCreditControl=Y 且提交时 EBS 返回可用额度 < 订单总额
- **触发路径**：提交 → checkVerifyOrderBalance → synBillAccntToEbs → X_AVAILABLE_AMOUNT 对比 totalAmount
- **详细逻辑**：
  - 第1点：checkSaleOrderService.checkVerifyOrderBalance 判定是否需校验余额（常规单+开票单位信用管控）
  - 第2点：调 EBS 接口 synBillAccntToEbs(param 含 orgName=广东乐华恒业家居售后服务有限公司, balanceId, orderType=查询, dealerAmount, projectAmount, sourceType=ORDER, 合同号) 查 X_RETURN_STATUS 与 X_AVAILABLE_AMOUNT
  - 第3点：`amount = X_AVAILABLE_AMOUNT.compareTo(totalAmount); if (amount < 0) throw "账户余额不足!"`
  - 第4点：X_RETURN_STATUS 非 S 或 X_AVAILABLE_AMOUNT 为空时抛"查询该订单的余额账户失败！"
- **系统体现**：阻断性报错（提交失败，需还款/调整金额）
- **排查SQL**：

```sql
-- 开票单位信用管控与订单总额
SELECT B.ROW_ID, B.BILL_ACCT_NAME, B.LH_IS_CREDIT_CONTROL,
       O.TOTAL_AMOUNT, O.BILL_ID
  FROM LNK_SALE_ORDER O
  JOIN LNK_BILL_ACCOUNT B ON B.ROW_ID = O.BILL_ID
 WHERE O.ROW_ID = :订单ID;
```

##### §21 折扣政策有效结束日期是xxxx-xx-xx，请修改期望到达日期小于折扣政策有效结束日期！ 【提交-政策有效期】

- **报错条件**：订单头挂促销政策且期望到达日期 > 政策有效结束日期
- **触发路径**：提交 → checkDiscountAndContractDate（保存接口 hasCheckDiscountAndContractDate 亦可能触发）
- **详细逻辑**：
  - 第1点：按 lHpromotionPolicyID 查政策 endDate
  - 第2点：`arrivedDate.after(discountEndTime)` 时抛"折扣政策有效结束日期是xxx，请修改期望到达日期小于折扣政策有效结束日期！"
  - 第3点：确保客户期望到货日在政策有效期内，避免政策过期造成折扣失效
- **系统体现**：阻断性报错（需调整期望到达日期）
- **排查SQL**：

```sql
-- 政策结束日期与订单期望到达日期
SELECT O.LH_PROMOTION_POLICY_ID, P.END_DATE AS POLICY_END_DATE,
       O.LH_EXPECTED_ARRIVED_DATE
  FROM LNK_SALE_ORDER O
  LEFT JOIN LNK_DCT_POLICY_HEAD P ON P.ROW_ID = O.LH_PROMOTION_POLICY_ID
 WHERE O.ROW_ID = :订单ID;
```

##### §22 合同有效结束日期是xxxx-xx-xx，请修改期望到达日期小于合同有效结束日期！ 【提交-合同有效期】

- **报错条件**：订单头挂工程合同且期望到达日期 > 合同有效结束日期
- **触发路径**：提交 → checkDiscountAndContractDate
- **详细逻辑**：
  - 第1点：订单头 lHProjectEndTime（合同有效期）非空时校验
  - 第2点：`arrivedDate.after(projectEndTime)` 时抛"合同有效结束日期是xxx，请修改期望到达日期小于合同有效结束日期！"
  - 第3点：保证发货期望在合同有效期内
- **系统体现**：阻断性报错
- **排查SQL**：

```sql
-- 合同有效期与订单期望到达日期
SELECT O.LH_CONTRACT_NO, O.LH_PROJECT_END_TIME, O.LH_EXPECTED_ARRIVED_DATE
  FROM LNK_SALE_ORDER O WHERE O.ROW_ID = :订单ID;
```

##### §23 订单审批设置类型未维护，请联系管理员进行维护！ 【提交-审批】

- **报错条件**：提交时按 订单类型+渠道+产品线+业务类型 四要素找不到审批设置
- **触发路径**：提交 → submitSaleOrderApply → lhSaleOrderService.getApprovalHead
- **详细逻辑**：
  - 第1点：`LHApprovalCFG appInfoByOrder = lhSaleOrderService.getApprovalHead(lhSaleOrder)`
  - 第2点：null 时 `throw new Exception("订单审批设置类型未维护，请联系管理员进行维护！")`
  - 第3点：审批设置缺失导致无法发起 OA 审批（OrderLHApprovalCFG），阻断提交
- **系统体现**：阻断性报错
- **排查SQL**：

```sql
-- 按四要素查找审批设置
SELECT * FROM LNK_APPROVAL_CFG
 WHERE ORDER_TYPE='Common' AND PROD_CHANNEL=:渠道
   AND ORDER_PROD_LINE=:产品线 AND BU_TYPE=:业务类型;
```

##### §24 当前状态不可进行此操作 【状态-通用】

- **报错条件**：订单当前状态不在允许编辑/提交的状态集合内执行 保存(改单) 或 提交
- **触发路径**：改单 checkOrderCanUpdate / 提交 checkOrderCanSubmit
- **详细逻辑**：
  - 第1点：可编辑状态集（后端 editStatusSet）：New、EbsReturn、Rejected、approvedReturn、CSSApprove、CSSReject
  - 第2点：改单时 checkOrderCanUpdate 校验状态在可编辑集内；提交时 checkOrderCanSubmit 校验状态∈New/Rejected/EbsReturn 等
  - 第3点：一旦进入 Submitted/Approved 等流转态，普通改单/提交被拒绝
- **系统体现**：阻断性报错
- **排查SQL**：

```sql
-- 查看当前订单状态
SELECT ORDER_NO, STATUS, LH_REVIWE_STATUS, SOURCE, SOURCE_DATA_BASE, VERSION
  FROM LNK_SALE_ORDER WHERE ROW_ID = :订单ID;
```

### 常见问题

- 问题1：新建订单弹不出经销商
  - 原因：登录人无对应事业部经销商数据，或经销商类型错误(非Dealer)、未绑定部门。排查 SQL：
    ```sql
    SELECT ROW_ID, ACCT_CODE, ACCT_NAME, ACCT_TYPE, DEPT_ID, LH_VALIDATE_OR_NOT
      FROM LNK_ACCNT WHERE ACCT_TYPE='Dealer' AND DEPT_ID=:登录人事业部 AND LH_VALIDATE_OR_NOT='Y';
    ```
  - 解决思路：检查经销商资料（部门、状态、类型），或联系管理员核对登录人事业部范围。

- 问题2：促销政策弹窗无数据
  - 原因：政策未生效、币种/渠道/业务类型/经销商区域不匹配、无有效经销合同。排查 SQL：
    ```sql
    SELECT ROW_ID, POLICY_NAME, START_DATE, END_DATE, CURRENCY, ORDER_TYPE, SALES_CHANNEL, BU_TYPE, STATUS
      FROM LNK_DCT_POLICY_HEAD
     WHERE ORDER_TYPE=:Common AND SALES_CHANNEL=:渠道 AND STATUS='Effective'
       AND START_DATE<=SYSDATE AND END_DATE>=SYSDATE;
    ```
  - 解决思路：核对政策四要素与经销商区域、币种一致性，确认经销合同有效。

- 问题3：添加产品弹窗无产品
  - 原因：按 事业部+产品线+渠道+经销商 过滤无匹配产品，产品未上架、已停售或产品渠道不包含订单渠道。排查 SQL：
    ```sql
    SELECT PROD_CODE, PROD_NAME, LH_PROD_CHANNEL, LH_PROD_LINE, DEPT_ID, SM_STATE, LH_VALIDATE_OR_NOT
      FROM LNK_PROD
     WHERE DEPT_ID=:事业部 AND LH_PROD_LINE=:产品线 AND LH_VALIDATE_OR_NOT='Y'
       AND LH_PROD_CHANNEL LIKE '%'||:渠道||'%';
    ```
  - 解决思路：核对产品上架状态、渠道、产品线归属。

- 问题4：提交提示"库存不足"或数量超限
  - 原因：可供数量校验(checkOrderQuantityControl)按产品起订量/生产周期/标准交付/可供量校验月度可供。排查 SQL：
    ```sql
    -- 查看产品扩展的可供控制参数
    SELECT PROD_CODE, MINIMUM_ORDER, PRODUCE_CYCLE_DAYS, STANDARD_DELIVERY_DATE
      FROM LNK_PROD_DATA_EXT WHERE PROD_CODE=:产品编码;
    ```
  - 解决思路：调整期望到达月份、拆分数量或联系生产计划部调整供量。

- 问题5：提交后有二次确认弹窗说明什么
  - 原因：BI 配套率提醒、折扣产品提货比例超限、退货渠道不一致等业务提醒；确认后携带 flag 继续提交
  - 解决思路：确认业务无误后点确定继续；如不确定可取消后核查。

- 问题6：状态为 Rejected 但无法作废/编辑
  - 原因：Rejected 且 OA 已审查(Reviewed)；或来源=YinGe/JINHUA、sourceDataBase=2
  - 解决思路：来源/数据源受限单据需走人工处理；普通单重新编辑后提交。

---

</div>
</div>
</div>

<div id="changelog" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
## 更新记录

| 日期 | 提交ID | 提交人 | 提交内容 |
|------|-------|-------|---------|
| | | | （暂无2026年提交记录） |
</div>
</div>
</div>

<div id="history" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="历史排查记录">
<!-- 空白:待补充 -->
</KbCard>
</div>
</div>
</div>
