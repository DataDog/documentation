---
aliases:
  - /ja/x8x-2yk-m3b
  - /ja/security_monitoring/default_rules/x8x-2yk-m3b
  - /ja/security_monitoring/default_rules/sqreen-security-incident-detected
disable_edit: true
integration_id: sqreen
kind: documentation
rule_category:
  - ログの検出
source: sqreen
title: Sqreen により検出されるセキュリティインシデント
type: security_rules
---
### 目標
アプリケーションの脅威を検出

### 戦略
このルールで、Sqreen により作成されたすべてのセキュリティインシデントにシグナルを作成します。

### トリアージと対応
1. [Sqreen ダッシュボード][1]でインシデントをレビューします。

[1]: https://my.sqreen.com/incidents