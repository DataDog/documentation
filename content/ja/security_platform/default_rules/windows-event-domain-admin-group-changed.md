---
aliases:
  - /ja/p9l-g28-nxb
  - /ja/security_monitoring/default_rules/p9l-g28-nxb
  - /ja/security_monitoring/default_rules/windows-event-domain-admin-group-changed
disable_edit: true
integration_id: windows
kind: documentation
rule_category:
  - ログの検出
scope: windows
security: attack
source: windows
tactic: TA0003-persistence
technique: T1098-account-manipulation
title: Windows ドメインの管理者グループ変更について
type: security_rules
---
### 目標
ドメイン管理者グループが変更された場合に検知する。

### 戦略
`@evt.id` が 4737 および `@Event.EventData.Data.TargetUserName:"Domain Admins"` の場合に、Windows イベントログのモニタリングを行います。

### トリアージと対応
`{{@Event.EventData.Data.SubjectUserName}}` に、`Domain Admins` グループの変更を行う正当な理由があるかを検証します。