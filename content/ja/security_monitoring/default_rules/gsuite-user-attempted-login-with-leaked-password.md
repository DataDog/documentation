---
aliases:
  - /ja/dc3-7b8-f07
disable_edit: true
kind: ドキュメント
rule_category:
  - ログの検出
scope: gsuite
security: threat-intel
source: gsuite
title: 漏洩パスワード使用したユーザーによるログインの試み
type: security_rules
---
### 目標
侵害されていると知られているパスワードでユーザーがログインを試みたことを検出します。

### 戦略
このルールにより、この Google Activity API 呼び出しをモニターして、攻撃者が漏洩したパスワードでログインを試みた際に検出できます。

* [漏洩パスワード][1]

### トリアージと対応
1. 侵害されたパスワードを所有している組織内のユーザーを特定します。
2. ユーザーに連絡して、このパスワードを再利用した可能性のあるアカウントや Google でパスワードをロテーションするように促します。また、ユーザーが強力なパスワードのガイドラインを理解していることを確認します。

[1]: https://developers.google.com/admin-sdk/reports/v1/appendix/activity/login#account_disabled_password_leak