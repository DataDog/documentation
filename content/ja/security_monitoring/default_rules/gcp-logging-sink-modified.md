---
aliases:
  - /ja/e74-752-b34
disable_edit: true
kind: ドキュメント
rule_category:
  - ログの検出
scope: gcp.project
security: コンプライアンス
source: gcp
title: GCP ロギングシンクの変更
type: security_rules
---
### 目標
GCP Logging シンクへの変更があったことを検出します。これにより監査ログが Datadog に送信されなくなる可能性があります。

### 戦略
GCP 管理アクティビティ監査ログをモニターし、以下のメソッドがいつ呼び出されたかを判断します。

* `google.logging.v2.ConfigServiceV2.UpdateSink`
* `google.logging.v2.ConfigServiceV2.DeleteSink`

### トリアージと対応
1. シンクをチェックし、適切に構成されていることを確認します。