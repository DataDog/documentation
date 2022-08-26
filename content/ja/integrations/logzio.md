---
app_id: logz-io
app_uuid: a637cc4e-f31f-4b35-9fff-76a8e7557d66
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: logz-io.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Logz.io
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 不明
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- monitoring
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/logzio/README.md
display_on_public_website: true
draft: false
git_integration_title: logzio
integration_id: logz-io
integration_title: Logz.io
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: logzio
oauth: {}
public_title: Logz.io
short_description: サービスとしての AI 駆動型 ELK
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::モニタリング
  configuration: README.md#Setup
  description: サービスとしての AI 駆動型 ELK
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Logz.io
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

より詳細な設定方法は、[Logz.io と Datadog によるログ相関][4]をご覧ください。

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
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: http://logz.io/blog/log-correlation-datadog
[5]: https://docs.datadoghq.com/ja/help/