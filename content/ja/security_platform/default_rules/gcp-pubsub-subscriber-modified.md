---
aliases:
  - /ja/a7b-dbc-bdd
  - /ja/security_monitoring/default_rules/a7b-dbc-bdd
  - /ja/security_monitoring/default_rules/gcp-pubsub-subscriber-modified
disable_edit: true
integration_id: gcp.pubsub.subscription
kind: documentation
rule_category:
  - ログの検出
scope: gcp.pubsub.subscription
security: コンプライアンス
source: gcp
title: GCP Pub/Sub サブスクライバーの変更
type: security_rules
---
### 目標
GCP Pub/Sub サブスクリプションへの変更があったことを検出します。これにより監査ログが Datadog に送信されなくなる可能性があります。

### 戦略
GCP 管理アクティビティ監査ログをモニターし、以下のメソッドがいつ呼び出されたかを判断します。

* `google.pubsub.v1.Subscriber.UpdateSubscription`
* `google.pubsub.v1.Subscriber.DeleteSubscription`

### トリアージと対応
1. サブスクリプションをチェックし、適切に構成されていることを確認します。