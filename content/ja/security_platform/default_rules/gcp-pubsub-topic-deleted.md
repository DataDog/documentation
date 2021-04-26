---
aliases:
  - /ja/f68-e1e-db8
  - /ja/security_monitoring/default_rules/f68-e1e-db8
  - /ja/security_monitoring/default_rules/gcp-pubsub-topic-deleted
disable_edit: true
kind: documentation
rule_category:
  - ログの検出
scope: gcp.pubsub.topic
security: コンプライアンス
source: gcp
title: GCP Pub/Sub トピックの削除
type: security_rules
---
### 目標
GCP Pub/Sub サブスクリプションが削除されたことを検出します。これにより監査ログが Datadog に送信されなくなる可能性があります。

### 戦略
GCP 管理アクティビティ監査ログをモニターし、以下のメソッドがいつ呼び出されたかを判断します。

* `google.pubsub.v1.Publisher.DeleteTopic`

### トリアージと対応
1. サブスクリプションをチェックし、適切に構成されていることを確認します。