---
aliases:
  - /ja/e07-736-rty
  - /ja/security_monitoring/default_rules/e07-736-rty
  - /ja/security_monitoring/default_rules/salesforce-anomalous-amount-of-records-deleted
disable_edit: true
integration_id: salesforce
kind: documentation
rule_category:
  - ログの検出
scope: salesforce
security: attack
source: salesforce
tactic: TA0040-impact
technique: T1485-data-destruction
title: Salesforce レコードの削除量異常
type: security_rules
---
### 目標
Salesforce で削除されたレコードの量が大きく増加したことを検知します。

### 戦略
ベースラインの Salesforce ログを調査し、成功した (`@evt.outcome:Success`) 削除操作 (`@operation:Delete`) に大きな増加があるかどうか判断します。

### トリアージと対応
1. ユーザーによる Salesforce レコードの削除が正当であるかどうか判断します。