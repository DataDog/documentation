---
aliases:
  - /ja/rrb-osy-cuu
  - /ja/security_monitoring/default_rules/rrb-osy-cuu
  - /ja/security_monitoring/default_rules/azure_portal_brute_force_login
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
  - ログの検出
security: attack
source: azure
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Azure Portal への総当たりログイン
type: security_rules
---
## 目標

ユーザーが総当たり攻撃によるアカウント乗っ取り (ATO) の被害に遭った場合に検知します。

## 戦略

Azure Active Directory Sign-in ログを監視し、`@evt.category` が `SignInLogs` と等しく、`@evt.outcome` が `failure` と等しいことを検出します。

## トリアージと対応

1. ログを調べ、これが有効なログイン試行かを確認します。
2. ユーザーに対するセキュリティ侵害が認められる場合、ユーザーの認証情報をローテーションします。