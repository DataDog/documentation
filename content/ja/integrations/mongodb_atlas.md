---
app_id: mongodb-atlas
app_uuid: d7f734da-a1f7-4e3f-a590-ea154018a8d8
assets:
  dashboards:
    MongoDB-Atlas-Overview: assets/dashboards/MongoDB-Atlas-Overview_dashboard.json
    MongoDB-Atlas-Vector-Search-Overview: assets/dashboards/MongoDB-Atlas-Vector-Search-Overview_dashboard.json
    MongoDB-dbStats-collStats-Dashboard: assets/dashboards/MongoDB-Atlas-dbStats-collStats_dashboard.json
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
    source_type_id: 230
    source_type_name: MongoDB Atlas
  monitors:
    CPU usage is higher than expected: assets/monitors/high_cpu.json
    Memory usage is higher than normal: assets/monitors/memory.json
    Query efficiency is degrading: assets/monitors/query_efficiency.json
    Read latency is higher than expected: assets/monitors/read_latency.json
    Write latency is higher than expected: assets/monitors/write_latency.json
author:
  homepage: https://www.mongodb.com
  name: MongoDB
  sales_email: field@mongodb.com
  support_email: frank.sun@mongodb.com
categories:
- ai/ml
- モニター
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/mongodb_atlas/README.md
display_on_public_website: true
draft: false
git_integration_title: mongodb_atlas
integration_id: mongodb-atlas
integration_title: MongoDB Atlas
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: mongodb_atlas
public_title: MongoDB Atlas
short_description: Atlas の読み取り/書き込みパフォーマンス、Vector Search メトリクスなどを追跡します。
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
  - Category::AI/ML
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Atlas の読み取り/書き込みパフォーマンス、Vector Search のメトリクスなどを追跡します。
  media:
  - caption: MongoDB Atlas 概要ダッシュボード
    image_url: images/mongodb_atlas_dashboard.png
    media_type: image
  - caption: MongoDB Atlas Vector Search 概要ダッシュボード
    image_url: images/mongodb_atlas_vector_search_dashboard.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-atlas-performance-metrics-with-datadog/
  - resource_type: その他
    url: https://www.mongodb.com/products/platform/atlas-for-government
  support: README.md#Support
  title: MongoDB Atlas
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要

MongoDB Atlas は、算出メトリクスを Datadog にプッシュして、以下のことができます。

- MongoDB Atlas のキーメトリクスを視覚化できます。
- MongoDB Atlas Vector Search のメトリクスを視覚化できます。
- MongoDB Atlas の全体的なパフォーマンスをアプリケーションの他の部分と相関付けることができます。

このインテグレーションには、すぐに使えるモニターと専用ダッシュボードが含まれており、Atlas の健全性およびパフォーマンスのメトリクスを表示することができます。また、スループットメトリクスの監視、読み取りおよび書き込み操作の平均レイテンシーの経時的な追跡、現在の接続数が上限に近づいた場合にアラートを出すモニターの作成が可能です。

MongoDB Atlas Vector Search のメトリクスを使用すれば、Atlas Vector Search を安心して使用して、インデックス作成、検索、高性能な生成 AI アプリケーションの構築を行うことができます。

**注**: MongoDB Atlas インテグレーションは M10+ クラスターでのみ利用可能です。

## セットアップ

### インストール

MongoDB Atlas インテグレーションは、Atlas ポータルにログインすることによってインストールできます。

### 構成

1. Datadog [API キー][1]を取得または作成します。
2. [Atlas ポータル][2]の **Integrations** -> **Datadog Settings** で、Datadog API キーを入力します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mongodb-atlas" >}}


### イベント

MongoDB Atlas は、Datadog に[アラート][4]をイベントとしてプッシュできます。

### サービスチェック

MongoDB Atlas インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した MongoDB Atlas の監視][6]
- [MongoDB Atlas for Government][7]

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://docs.atlas.mongodb.com/tutorial/monitoring-integrations/#procedure
[3]: https://github.com/DataDog/integrations-extras/blob/master/mongodb_atlas/metadata.csv
[4]: https://www.mongodb.com/docs/atlas/configure-alerts/#std-label-notification-options
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://www.datadoghq.com/blog/monitor-atlas-performance-metrics-with-datadog/
[7]: https://www.mongodb.com/products/platform/atlas-for-government