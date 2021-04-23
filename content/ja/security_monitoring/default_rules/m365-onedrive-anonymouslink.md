---
aliases:
  - /ja/7n1-x5b-ds7
disable_edit: true
kind: documentation
rule_category:
  - ログの検出
source: microsoft-365
title: Microsoft 365 OneDrive 匿名リンクが作成されました
type: security_rules
---
### 目標
ユーザーが OneDrive で Microsoft 365 ドキュメントの匿名リンクを作成したことを検出します。これにより、認証されていないユーザーがリンクを持っていれば、このドキュメントにアクセスできるようになります。

### 戦略
このルールは、Microsoft 365 ログでイベント名 `AnonymousLinkCreated` を監視します。

### トリアージと対応
1. このドキュメントを匿名で利用できるようにするかどうかを決定します。