---
aliases:
  - /ja/8pu-lqe-4ze
disable_edit: true
kind: documentation
rule_category:
  - ログの検出
security: コンプライアンス
source: azure
title: Azure ユーザーが外部ユーザーを招待
type: security_rules
---
## 目標

外部ユーザーへ招待が送信されたことを検出します。

## 戦略

Azure Active Directory Audit ログを監視し、`@evt.name` が `Invite external user` と等しく、`@evt.outcome` が `success` と等しいことを検出します。

## トリアージと対応

1. 招待を確認し、その受信者と招待が有効であるかを判断します。