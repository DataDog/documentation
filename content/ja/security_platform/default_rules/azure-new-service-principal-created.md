---
aliases:
  - /ja/848-4cc-725
  - /ja/security_monitoring/default_rules/848-4cc-725
  - /ja/security_monitoring/default_rules/azure-new-service-principal-created
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
  - ログの検出
scope: azure
security: attack
source: azure
tactic: TA0003-persistence
title: Azure の新しいサービスプリンシパルが作成されました
type: security_rules
---
## **目的**

Azure で新しいサービスプリンシパルが作成されたことを検出します。これは永続性メカニズムに適用されます。

## **戦略**

`@evt.name` が `"Add service principal"` および `Success` の `@evt.outcome` である Azure Active Directory ログを監視します。

## **トリアージと対応*

1. `@properties.targetResources` の新しいサービスプリンシパルを検出します。
2. ユーザー (`{{$usr.name}}`) に確認して、サービスプリンシパルが正当かどうかを判断します。