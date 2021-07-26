---
aliases:
  - /ja/34e-bda-42c
disable_edit: true
kind: documentation
rule_category:
  - ログの検出
security: コンプライアンス
source: azure
title: Azure ネットワークセキュリティグループが全世界に公開
type: security_rules
---
### 目標
Azure ネットワークセキュリティグループが、IP アドレスからのインバウンドトラフィックを許可したことを検出します。

### 戦略
このルールにより、Azure アクティビティログでネットワークの変化を監視し `@evt.name` が `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/WRITE` の値を、`@properties.securityRules.properties.direction` が `Inbound` の値を、`@properties.securityRules.properties.access` が `Allow` の値を、そして `@properties.securityRules.properties.sourceAddressPrefix` が `0.0.0.0/0` または `*` の値を持った時に検出することができます。

### トリアージと対応
1. どの仮想マシンがこのセキュリティグループと関連付けられているかを調査します。
2. このセキュリティグループおよび仮想マシンが、IP アドレスからのインバウンドトラフィックを許可すべきかどうかを決定します。