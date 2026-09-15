#!/usr/bin/env python3
"""
流程图规范 §九 验证脚本
用法: python3 validate_flowchart.py <svg_file>
退出码: 0=通过, 1=不通过
"""
import sys
import re

# §9.5 三问：以下动词出现在节点文本中，说明可能是操作步骤而非独立单据
# 注意：这些动词出现在副标题中是允许的（如核心节点的副标题）
OPERATION_VERBS = [
    '选择', '选', '填', '保存', '提交', '录入', '上传',
    '新建', '添加', '设置', '输入', '点击', '勾选', '确认'
]

# §9.7 判断节点只用于影响后续业务走向的关键决策
INVALID_JUDGMENT_KEYWORDS = [
    '必填项', '为空', '重复', '校验', '格式'
]

# 上游/下游横带中的子卡片名称（这些是模块名，不是操作步骤）
# 如果这些名称出现在横带子卡片中，不应算作操作步骤
BAND_CARD_KEYWORDS = [
    '经销商主数据', '开票单位', '交易公司', '价目表', '促销政策',
    '产品资料', '审批设置', '单据编码', '客户账户',
    'OA审批流程', 'EBS订单同步', '出库/发货', '折扣政策占用',
    '定金预占/扣减'
]

def extract_node_texts(svg_content):
    """从 SVG 中提取所有 <text> 标签的内容"""
    return re.findall(r'<text[^>]*>([^<]+)</text>', svg_content)

def is_band_card(text):
    """判断是否为上游/下游横带的子卡片"""
    for kw in BAND_CARD_KEYWORDS:
        if kw in text:
            return True
    return False

def is_band_title(text):
    """判断是否为横带标题"""
    return any(kw in text for kw in ['上游支撑', '下游影响', '上游', '下游'])

def is_legend(text):
    """判断是否为图例"""
    return any(kw in text for kw in ['主流程步骤', '开始/结束', '判断', '上游支撑服务', '审批拒绝'])

def is_subtitle(text):
    """判断是否为核心节点的副标题（font-size=10）"""
    # 副标题通常包含操作动词的列表
    return any(verb in text for verb in OPERATION_VERBS) and '·' in text

def check_node_count(node_texts):
    """§9.8 检查清单：主线节点数是否控制在 5~9 个"""
    main_nodes = []
    for text in node_texts:
        text = text.strip()
        # 跳过横带标题、图例
        if is_band_title(text) or is_legend(text):
            continue
        # 跳过横带子卡片
        if is_band_card(text):
            continue
        # 跳过副标题
        if is_subtitle(text):
            continue
        main_nodes.append(text)
    
    unique_nodes = list(set(main_nodes))
    
    if len(unique_nodes) < 5:
        print(f"⚠️  主线节点数偏少: {len(unique_nodes)} 个（建议 5~9 个）")
        print(f"    节点: {unique_nodes}")
        return False
    elif len(unique_nodes) > 9:
        print(f"❌ 主线节点数过多: {len(unique_nodes)} 个（超过 9 个，违反 §9.8）")
        print(f"    节点: {unique_nodes}")
        return False
    else:
        print(f"✅ 主线节点数: {len(unique_nodes)} 个（符合 5~9 个）")
        print(f"    节点: {unique_nodes}")
        return True

def check_operation_verbs(node_texts):
    """§9.3 检查：是否把操作步骤拆成独立节点"""
    violations = []
    for text in node_texts:
        text = text.strip()
        # 跳过横带子卡片（模块名可能含"设置"等词）
        if is_band_card(text):
            continue
        # 跳过副标题（副标题就是操作步骤列表，允许）
        if is_subtitle(text):
            continue
        # 跳过横带标题、图例
        if is_band_title(text) or is_legend(text):
            continue
        
        for verb in OPERATION_VERBS:
            if verb in text:
                violations.append((text, verb))
                break
    
    if violations:
        print(f"❌ 发现 {len(violations)} 个可能违反 §九 的节点（含操作动词）:")
        for text, verb in violations:
            print(f"    '{text}' 包含 '{verb}'")
        print(f"    → 这些节点可能是表单内部操作步骤，应合并为 1 个核心节点")
        return False
    else:
        print(f"✅ 未发现操作步骤被拆成独立节点")
        return True

def check_judgment_nodes(svg_content):
    """§9.7 检查：判断菱形是否代表业务走向决策"""
    polygon_texts = re.findall(r'<polygon[^/]*?/>.*?<text[^>]*>([^<]+)</text>', svg_content, re.DOTALL)
    
    violations = []
    for text in polygon_texts:
        text = text.strip()
        for kw in INVALID_JUDGMENT_KEYWORDS:
            if kw in text:
                violations.append((text, kw))
                break
    
    if violations:
        print(f"❌ 发现 {len(violations)} 个判断节点包含表单校验关键词:")
        for text, kw in violations:
            print(f"    '{text}' 包含 '{kw}'")
        print(f"    → 表单校验逻辑应放到「重点逻辑」Tab，不应设为判断节点")
        return False
    else:
        if polygon_texts:
            print(f"✅ 判断节点均为业务走向决策")
        return True

def check_viewbox(svg_content):
    """§12 检查：viewBox 高度是否足够"""
    vb_match = re.search(r'viewBox="(\d+)\s+(\d+)\s+(\d+)\s+(\d+)"', svg_content)
    if not vb_match:
        print("⚠️  未找到 viewBox 属性")
        return True
    
    vb_height = int(vb_match.group(4))
    has_max_height = 'max-height:none' in svg_content
    
    if not has_max_height:
        print(f"⚠️  缺少 style='max-height:none'，可能被全局 CSS 截断")
    
    print(f"✅ viewBox 高度: {vb_height}, max-height:none 已设置")
    return True

def main():
    if len(sys.argv) < 2:
        print("用法: python3 validate_flowchart.py <svg_file>")
        sys.exit(1)
    
    filepath = sys.argv[1]
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"❌ 文件不存在: {filepath}")
        sys.exit(1)
    
    print("=" * 60)
    print("流程图规范 §九 验证")
    print(f"文件: {filepath}")
    print("=" * 60)
    print()
    
    node_texts = extract_node_texts(content)
    
    all_pass = True
    
    if not check_node_count(node_texts):
        all_pass = False
    
    if not check_operation_verbs(node_texts):
        all_pass = False
    
    if not check_judgment_nodes(content):
        all_pass = False
    
    check_viewbox(content)
    
    print()
    print("=" * 60)
    if all_pass:
        print("✅ 所有检查通过，可以推送")
        sys.exit(0)
    else:
        print("❌ 检查未通过，请修复后再推送")
        sys.exit(1)

if __name__ == '__main__':
    main()
