---
aliases:
  - /ja/f72-zu8-tjj
disable_edit: true
kind: documentation
rule_category:
  - ログの検出
security: コンプライアンス
source: azure
title: Azure ポリシーの割り当ての作成
type: security_rules
---
## 目標

Azure ポリシーの割り当てが作成されたことを検出します。

## 戦略

Azure アクティビティログを監視し、`@evt.name` が `MICROSOFT.AUTHORIZATION/POLICYASSIGNMENTS/WRITE` と等しく、`@evt.outcome` が `Success` と等しいことを検出します。

## トリアージと対応

1. ポリシーの割り当てを調べて、Azure リソースに一方的な変更が加えられたかどうかを判断します。