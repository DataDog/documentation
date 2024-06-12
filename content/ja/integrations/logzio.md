---
app_id: logz-io
app_uuid: a637cc4e-f31f-4b35-9fff-76a8e7557d66
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: logz-io.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10009
    source_type_name: Logz.io
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Logz.io
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- event management
- ai/ml
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/logzio/README.md
display_on_public_website: true
draft: false
git_integration_title: logzio
integration_id: logz-io
integration_title: Logz.io
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: logzio
public_title: Logz.io
short_description: サービスとしての AI 駆動型 ELK
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Event Management
  - Category::AI/ML
  - Supported OS::macOS
  configuration: README.md#Setup
  description: サービスとしての AI 駆動型 ELK
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Logz.io
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Logz.io は、ログ、メトリクス、トレースを収集・分析する統合 SaaS プラットフォームです。このプラットフォームには、トラブルシューティングの改善、応答時間の短縮、コスト管理を支援する AI 機能が含まれています。

このインテグレーションにより、以下のことが可能になります。

- Logz.io のアラートを Datadog でリアルタイムに表示

![import_alert_from_logz][1]

- アラートイベントをダッシュボードに組み込んで、メトリクスとの相関関係を識別

![dashboard][2]

## 計画と使用

### インフラストラクチャーリスト

次の手順に従って Datadog にアラートをインポートします。

1. [Datadog API キー][3]を使用して、Logz.io に新しいアラートエンドポイントを作成します。
2. Logz.io で、特定のクエリに対する新しいアラートを作成します。

より詳細な設定方法は、[Logz.io と Datadog によるログ相関][4]をご覧ください。

## リアルユーザーモニタリング

### データセキュリティ

Logz.io チェックには、メトリクスは含まれません。

### ヘルプ

Logz.io チェックには、イベントは含まれません。

### ヘルプ

Logz.io チェックには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/logzio/images/import_alert_from_logz.jpg
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/logzio/images/dashboard.png
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: http://logz.io/blog/log-correlation-datadog
[5]: https://docs.datadoghq.com/ja/help/