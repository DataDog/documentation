---
aliases:
  - /ja/gh5-qhe-h9m
  - /ja/security_monitoring/default_rules/gh5-qhe-h9m
  - /ja/security_monitoring/default_rules/m365-sharepoint-shared-file-with-guest
disable_edit: true
integration_id: microsoft-365
kind: documentation
rule_category:
  - ログの検出
source: microsoft-365
title: Microsoft 365 SharePoint オブジェクトのゲストとの共有
type: security_rules
---
### 目標
ユーザーが Microsoft 365 Sharepoint ドキュメントをゲストと共有したことを検出します。

### 戦略
このルールは、`TargetUserOrGroupType` が `Guest` の場合、イベント名 `SharingInvitationCreated` の Microsoft 365 ログを監視します。

### トリアージと対応
1. このドキュメントを外部ユーザーと共有する必要があるかどうかを判断します。