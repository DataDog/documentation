---
aliases:
  - /ja/nl3-tm7-ujl
  - /ja/security_monitoring/default_rules/nl3-tm7-ujl
  - /ja/security_monitoring/default_rules/sqreen-users-logged-in-new-country
disable_edit: true
integration_id: sqreen
kind: documentation
rule_category:
  - ログの検出
source: sqreen
title: ユーザーが新しい国からアプリケーションにログインしました
type: security_rules
---
### 目標
ユーザーが、Sqreen を使用しているアプリケーションに新しい国からログインしたことを検出します。

### 戦略
このルールにより、Sqreen を使用しているアプリケーションにユーザーが新しい国からログインしたことを監視できます。

### トリアージと対応
1. [Sqreen ダッシュボード][1]でユーザーアクティビティをレビューします。

[1]: https://my.sqreen.com/application/goto/users/