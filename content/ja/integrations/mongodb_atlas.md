---
"app_id": "mongodb-atlas"
"app_uuid": "d7f734da-a1f7-4e3f-a590-ea154018a8d8"
"assets":
  "dashboards":
    "MongoDB-Atlas-Overview": assets/dashboards/MongoDB-Atlas-Overview_dashboard.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": mongodb.atlas.connections.current
      "metadata_path": metadata.csv
      "prefix": mongodb.atlas.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "230"
    "source_type_name": MongoDB Atlas
  "monitors":
    "[MongoDB Atlas] CPU usage is higher than average on host: {{host.name}}": assets/monitors/high_cpu.json
    "[MongoDB Atlas] Efficiency of queries is degrading": assets/monitors/query_efficiency.json
    "[MongoDB Atlas] Memory usage is higher than average on host: {{host.name}}": assets/monitors/memory.json
    "[MongoDB Atlas] Read Latency is higher than average for host: {{host.name}}": assets/monitors/read_latency.json
    "[MongoDB Atlas] Write Latency is higher than average for host: {{host.name}}": assets/monitors/write_latency.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- metrics
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/mongodb_atlas/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "mongodb_atlas"
"integration_id": "mongodb-atlas"
"integration_title": "MongoDB Atlas"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "mongodb_atlas"
"public_title": "MongoDB Atlas"
"short_description": "MongoDB Atlas"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Metrics"
  "configuration": "README.md#Setup"
  "description": MongoDB Atlas
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/monitor-atlas-performance-metrics-with-datadog/"
  - "resource_type": その他
    "url": "https://www.mongodb.com/products/platform/atlas-for-government"
  "support": "README.md#Support"
  "title": MongoDB Atlas
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要

MongoDB Atlas は、算出メトリクスを Datadog にプッシュして、以下のことができます。

- MongoDB Atlas のキーメトリクスを視覚化できます。
- MongoDB Atlas のパフォーマンスをアプリケーションの他の部分と関連付けることができます。

このインテグレーションには、すぐに使えるモニターとダッシュボードが含まれており、Atlas の健全性およびパフォーマンスのメトリクスの表示、スループットメトリクスの監視、読み取りおよび書き込み操作の平均レイテンシーの経時的な追跡、現在の接続数が上限に近づいた場合にアラートを出すモニターの作成が可能です。

**注**: MongoDB Atlas インテグレーションは M10+ クラスターでのみ利用可能です。

## セットアップ

### インストール

MongoDB Atlas インテグレーションは、Atlas ポータルにログインすることによってインストールできます。

### 構成

1. Datadog [API キー][1]を取得または作成します。
2. [Atlas ポータル][2]の **Integrations** -> **Datadog Settings** で、Datadog API キーを入力します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mongodb_atlas" >}}


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
[5]: https://docs.datadoghq.com/help/
[6]: https://www.datadoghq.com/blog/monitor-atlas-performance-metrics-with-datadog/
[7]: https://www.mongodb.com/products/platform/atlas-for-government

