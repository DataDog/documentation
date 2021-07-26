---
aliases:
  - /ja/60f-89d-fee
disable_edit: true
kind: ドキュメント
rule_category:
  - ログの検出
scope: gcp.cloudsql.database
security: コンプライアンス
source: gcp
title: GCP Cloud SQL データベースの変更
type: security_rules
---
### 目標
Cloud SQL DB が変更されたことを検出します。

### 戦略
この規則により、GCP Cloud SQL 管理アクティビティ監査ログをモニターし、以下のメソッドがいつ呼び出されたかを判断できます。

* `cloudsql.instances.create`
* `cloudsql.instances.create`
* `cloudsql.users.update`

### トリアージと対応
1. Cloud SQL DB をチェックし、正しいアクセス許可で適切に構成されていることを確認します。