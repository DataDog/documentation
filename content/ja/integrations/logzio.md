---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/logzio/README.md'
display_name: Logz.io
draft: false
git_integration_title: logzio
guid: 0e44f9bd-8c7b-426a-a0ba-8f4302808191
integration_id: logz-io
integration_title: Logz.io
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.2
name: logzio
public_title: Datadog-Logz.io インテグレーション
short_description: サービスとしての AI 駆動型 ELK
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Logz.io アラートと統合して、発生中のイベントをリアルタイムに確認します。

- Datadog にアラートをインポート

![import_alert_from_logz][1]

- イベントをダッシュボードに組み込んで、メトリクスとの相関関係を識別

![dashboard][2]

## セットアップ

### インストール

次の手順に従って Datadog にアラートをインポートします。

1. [Datadog API キー][3]を使用して、Logz.io に新しいアラートエンドポイントを作成します。
2. Logz.io で、特定のクエリに対する新しいアラートを作成します。

セットアップの詳細については、[logz.io の Datadog ドキュメント][4]を参照してください。

## 収集データ

### メトリクス

Logz.io チェックには、メトリクスは含まれません。

### イベント

Logz.io チェックには、イベントは含まれません。

### サービスのチェック

Logz.io チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/logzio/images/import_alert_from_logz.jpg
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/logzio/images/dashboard.png
[3]: https://app.datadoghq.com/account/settings#api
[4]: http://logz.io/blog/log-correlation-datadog
[5]: https://docs.datadoghq.com/ja/help/