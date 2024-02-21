---
app_id: mongodb-atlas
app_uuid: d7f734da-a1f7-4e3f-a590-ea154018a8d8
assets:
  dashboards:
    MongoDB-Atlas-Overview: assets/dashboards/MongoDB-Atlas-Overview_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: mongodb.atlas.connections.current
      metadata_path: metadata.csv
      prefix: mongodb.atlas.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: MongoDB Atlas
  monitors:
    '[MongoDB Atlas] CPU usage is higher than average on host: {{host.name}}': assets/monitors/high_cpu.json
    '[MongoDB Atlas] Efficiency of queries is degrading': assets/monitors/query_efficiency.json
    '[MongoDB Atlas] Memory usage is higher than average on host: {{host.name}}': assets/monitors/memory.json
    '[MongoDB Atlas] Read Latency is higher than average for host: {{host.name}}': assets/monitors/read_latency.json
    '[MongoDB Atlas] Write Latency is higher than average for host: {{host.name}}': assets/monitors/write_latency.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- メトリクス
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/mongodb_atlas/README.md
display_on_public_website: true
draft: false
git_integration_title: mongodb_atlas
integration_id: mongodb-atlas
integration_title: MongoDB Atlas
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: mongodb_atlas
oauth: {}
public_title: MongoDB Atlas
short_description: MongoDB Atlas
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Metrics
  configuration: README.md#Setup
  description: MongoDB Atlas
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: MongoDB Atlas
---

## 概要

MongoDB Atlas は、算出メトリクスを Datadog にプッシュして、以下のことができます。

- MongoDB Atlas のキーメトリクスを視覚化できます。
- MongoDB Atlas のパフォーマンスをアプリケーションの他の部分と関連付けることができます。

**注: このインテグレーションは、M10+ クラスターでの未利用可能です。**

## セットアップ

### APM に Datadog Agent を構成する

MongoDB Atlas インテグレーションは、Atlas ポータルにログインすることによってインストールできます。

### 構成

1. Datadog [API キー][1]を取得または作成します。
2. [Atlas ポータル][2]の **Integrations** -> **Datadog Settings** で、Datadog API キーを入力します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mongodb_atlas" >}}


### イベント

MongoDB Atlas は、Datadog に[アラート][4]をイベントとしてプッシュできます。

### サービスのチェック

MongoDB Atlas インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://docs.atlas.mongodb.com/tutorial/monitoring-integrations/#procedure
[3]: https://github.com/DataDog/integrations-extras/blob/master/mongodb_atlas/metadata.csv
[4]: https://www.mongodb.com/blog/post/push-your-mongodb-atlas-alerts-to-datadog
[5]: https://docs.datadoghq.com/ja/help/