---
aliases:
  - /ja/ypa-4t4-zo4
  - /ja/security_monitoring/default_rules/ypa-4t4-zo4
  - /ja/security_monitoring/default_rules/azure-add-owner-service-principal
disable_edit: true
integration_id: azure.activedirectory
kind: documentation
rule_category:
  - ログの検出
scope: azure.activedirectory
security: attack
source: azure
tactic: TA0003-persistence
title: Azure の新しいオーナーがサービスプリンシパルに追加されました
type: security_rules
---
## **目的**

新しいオーナーがサービスプリンシパルに追加されたことを検出します。これは、特権の昇格または永続性に適用されます。

## **戦略**

`@evt.name` が `"Add owner to service principal"` および `Success` の `@evt.outcome` である Azure Active Directory ログを監視します。

## **トリアージと対応*

1. ユーザーが `@properties.targetResources` のサービスプリンシパルに追加されたことを検出します。
2. ユーザー (`{{$usr.name}}`) に確認して、オーナーの追加が正当かどうかを判断します。