---
aliases:
  - /ja/lb6-1tt-tv9
  - /ja/security_monitoring/default_rules/lb6-1tt-tv9
  - /ja/security_monitoring/default_rules/azure-active-directory-risky-sign-in
disable_edit: true
integration_id: azure-active-directory
kind: documentation
rule_category:
  - ログの検出
scope: azure-active-directory
source: azure
title: Azure Active Directory Risky Sign-In
type: security_rules
---
## 目標
Azure Identity Protection が Azure Active Directory ログインをリスクありと分類するたびに検出します。

## 戦略
Azure Active Directory のサインインアクティビティ (`@evt.name:"Sign-in activity"`) を監視し、Azure がユーザーがリスクありまたは侵害されたと識別したときにシグナルを生成します (`@properties.riskState:"atRisk" または "confirmedCompromised"`)。

## トリアージと対応
1. `{{@usr.id}}` のロケーション (`@network.client.geoip.subdivision.name`) を分析して、通常のロケーションからログインしているかどうかを確認します。
2. ログインアクティビティが正当でない場合は、`{{@usr.id}}` アカウントを無効にします。
3. `{{@usr.id}}` が所有するデバイスを調査します。