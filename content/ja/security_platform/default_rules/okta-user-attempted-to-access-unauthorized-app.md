---
aliases:
  - /ja/59a-cl0-v2r
  - /ja/security_monitoring/default_rules/59a-cl0-v2r
  - /ja/security_monitoring/default_rules/okta-user-attempted-to-access-unauthorized-app
disable_edit: true
integration_id: okta
kind: documentation
rule_category:
  - ログの検出
source: okta
title: Okta ユーザーが未承認アプリへのアクセスを試行
type: security_rules
---
### 目標
ユーザーのアプリへのアクセスが拒否されたことを検出します。

### 戦略
このルールにより、以下の Okta イベントを監視して、ユーザーがアプリへのアクセスを拒否されたことを検出できます。

* `app.generic.unauth_app_access_attempt`

### トリアージと対応
1. ユーザーにこのアプリへのアクセス権があるかどうかを判定します。
2. ユーザーに連絡し、このアプリへのアクセスを実際に試行したのか、アカウントが不正に使用されたのかを確認します。