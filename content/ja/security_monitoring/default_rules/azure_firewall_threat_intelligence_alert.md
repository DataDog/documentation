---
aliases:
  - /ja/6ir-aj0-eec
disable_edit: true
kind: documentation
rule_category:
  - ログの検出
security: threat-intel
source: azure
title: Azure Firewall の脅威インテリジェンスアラート
type: security_rules
---
## 目標

Azure のファイアーウォール用脅威インテリジェンスアラートを受信したことを検出します。

## 戦略

Azure Network Diagnostic ログを監視し、`@evt.name` が `AzureFirewallThreatIntelLog` と等しいことを検出します。

## トリアージと対応

1. 脅威インテリジェンスログを確認します。
2. この IP アドレスからのアクティビティを検査します。