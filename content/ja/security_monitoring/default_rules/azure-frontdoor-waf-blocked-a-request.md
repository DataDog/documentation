---
aliases:
  - /ja/4af-ed1-fc0
disable_edit: true
kind: documentation
rule_category:
  - ログの検出
security: attack
source: azure
tactic: TA0001-initial-access
technique: T1190-exploit-public-facing-application
title: Azure Frontdoor WAF によるリクエストのブロック
type: security_rules
---
### 目標
Azure Frontdoor Web アプリケーション ファイアウォール (WAF) が、IP アドレスからのリクエストをブロックしたことを検出します。

### 戦略
このルールにより、Frontdoor Web アプリケーション ファイアウォールログ用の Azure アクティビティログを監視して、`@evt.name` が `Microsoft.Network/FrontDoor/WebApplicationFirewallLog/Write` の値を持ち、`@properties.action` が `Block` の値を持ったことを検出できます。

### トリアージと対応
1. このリクエストはブロックされるべきであるかを確認します。
2. IP ダッシュボードに移動し、この IP アドレスで作成された他のリクエストを調査します。