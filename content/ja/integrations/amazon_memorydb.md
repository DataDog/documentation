---
app_id: amazon-memorydb
app_uuid: 1e1fabb3-32b3-4d8e-866d-79b8d09207e7
assets:
  dashboards:
    amazon-memorydb: assets/dashboards/amazon_memorydb_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.memorydb.cpuutilization
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.memorydb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10425
    source_type_name: Amazon MemoryDB
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- AWS
- クラウド
- モニター
- data stores
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_memorydb
integration_id: amazon-memorydb
integration_title: Amazon MemoryDB
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_memorydb
public_title: Amazon MemoryDB
short_description: Amazon MemoryDB は、フルマネージドの Redis 互換のインメモリデータベースサービスです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::Metrics
  - Category::Data Stores
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon MemoryDB は、フルマネージドの Redis 互換のインメモリデータベースサービスです。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/amazon-memorydb-integration/
  support: README.md#Support
  title: Amazon MemoryDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Amazon MemoryDB for Redis は、高いインメモリパフォーマンスと複数アベイラビリティゾーンにわたる耐久性を兼ね備えた、堅牢なインメモリデータベースサービスです。

このインテグレーションを有効にすると、Datadog にすべての MemoryDB メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `MemoryDB` が有効になっていることを確認します。
2. [Datadog - Amazon MemoryDB インテグレーション][3]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_memorydb" >}}


### イベント

Amazon MemoryDB インテグレーションには、イベントは含まれません。

### サービスチェック

Amazon MemoryDB インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog で Amazon MemoryDB を監視する][6]

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-memorydb
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_memorydb/assets/metrics/metric-spec.yaml
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://www.datadoghq.com/blog/amazon-memorydb-integration/