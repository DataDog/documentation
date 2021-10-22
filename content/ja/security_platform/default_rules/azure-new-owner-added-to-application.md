---
aliases:
  - /ja/ofj-lse-l1a
  - /ja/security_monitoring/default_rules/ofj-lse-l1a
  - /ja/security_monitoring/default_rules/azure-new-owner-added-to-application
disable_edit: true
integration_id: azure.activedirectory
kind: documentation
rule_category:
  - ログの検出
scope: azure.activedirectory
security: attack
source: azure
tactic: TA0003-persistence
title: Azure Active Directory アプリケーションに Azure の新しいオーナーが追加されました
type: security_rules
---
### 目標
永続化メカニズムとして使用できる Active Directory アプリケーションの新しいオーナーとしてユーザーが追加されたことを検出します。

### 戦略
Azure Active Directory ログで `@evt.name: "Add owner to application"` に `success` の `@evt.outcome` がないかを監視します。

### トリアージと対応
1. Active Directory アプリケーションのオーナー (`@properties.targetResources`) として追加されているユーザーの異常なアクティビティの証拠を確認します。
2. ユーザーがアプリケーションに追加される正当な理由があるかどうかを判別します。