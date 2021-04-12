---
aliases:
  - /ja/020-008-4aa
disable_edit: true
kind: documentation
rule_category:
  - ログの検出
source: okta
title: Okta API トークンの作成または有効化
type: security_rules
---
### 目標
Okta API トークンが新規作成されたことを検出します。

### 戦略
このルールにより、以下の Okta イベントを監視して、新しい Okta API トークンが作成されたことを検出できます。

* `system.api_token.create`

### トリアージと対応
1. API トークンを作成したユーザーに連絡し、この API トークンが必要であることを確認します。