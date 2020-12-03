---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - AWS
  - cloud
  - 処理
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/appkeeper/README.md'
display_name: AppKeeper
draft: true
git_integration_title: appkeeper
guid: 3cde5eb5-eadb-4065-8235-fb035abc34be
integration_id: appkeeper
integration_title: AppKeeper
is_public: false
kind: インテグレーション
maintainer: rd-pd-1@sios.com
manifest_version: 1.0.0
metric_prefix: AppKeeper.
metric_to_check: ''
name: AppKeeper
public_title: Datadog-AppKeeper インテグレーション
short_description: Datadog からのアラートに基づき Appkeeper でサービスを再起動
support: contrib
supported_os:
  - linux
  - windows
---
## 概要

Datadog から Synthetics などの通知を受け取ると、SIOS AppKeeper で不具合が生じている Amazon EC2 サービスが自動的に再起動するため、高額な人為的介入の必要性を排除できます。

Datadog でアラートが見つかると、AppKeeper Recovery API を介してサービスを再起動します。

## セットアップ

### ステップ 1. SIOS AppKeeper API キーを取得する

AppKeeper GUI から SIOS AppKeeper API キーを取得します。

![スナップショット][1]

### ステップ 2. Datadog インテグレーションダッシュボードで Webhook を定義する

![スナップショット][2]

### ステップ 3. ペイロードとカスタムヘッダーを定義する

![スナップショット][3]

1. **URL**: "https://api.appkeeper.sios.com/v2/integration/{AWS_account_ID}/actions/recover" を入力します
2. モニタリングインスタンスのインスタンス ID とサービス名を **Payload** に入力します
3. **Custom Headers** の "**appkeeper-integration-token**" に AppKeeper API トークンを入力します

AppKeeper インテグレーションの詳細については、Appkeeper の[ドキュメント][4]を参照してください。

## 収集データ

### メトリクス

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/get_token2.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/datadog_webhook.jpg
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/payload_header.jpg
[4]: https://sioscoati.zendesk.com/hc/en-us/articles/900000978443-Integration
[5]: https://docs.datadoghq.com/ja/help/