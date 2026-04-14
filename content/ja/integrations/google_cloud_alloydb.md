---
app_id: google-cloud-alloydb
app_uuid: aa103fc1-cc2c-4996-a250-d77061a57291
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: gcp.alloydb.cluster.storage.usage
      metadata_path: metadata.csv
      prefix: gcp.alloydb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 356
    source_type_name: Google Cloud AlloyDB
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- クラウド
- google cloud
- data stores
- ログの収集
custom_kind: インテグレーション
dependencies: []
description: クエリ数、実行回数、アップロードされたバイト数および行数などを追跡
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_alloydb/
draft: false
git_integration_title: google_cloud_alloydb
has_logo: true
integration_id: google-cloud-alloydb
integration_title: Google Cloud AlloyDB
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_alloydb
public_title: Google Cloud AlloyDB
short_description: AlloyDB は、高負荷なトランザクションワークロードに対応したフルマネージドの PostgreSQL 互換データベースです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Google Cloud
  - Category::Data Stores
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: AlloyDB は、高負荷なトランザクションワークロードに対応したフルマネージドの PostgreSQL 互換データベースです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud AlloyDB
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

AlloyDB は、要求の厳しいトランザクションワークロードに対応した、PostgreSQL 互換のフルマネージド型データベースです。
オープンソースの PostgreSQL と 100% の互換性を保ちながら、エンタープライズクラスの性能と可用性を提供します。

Google AlloyDB からメトリクスを取得して、以下のことができます。

- AlloyDB クラスターのパフォーマンスを視覚化する。
- AlloyDB インスタンスのパフォーマンスとデータベースを関連付ける。

## セットアップ

### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

### ログ収集

Google AlloyDB のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだ設定していない場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google AlloyDB のログを Google Cloud Logging から Pub/Sub トピックへエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google AlloyDB のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google-cloud-alloydb" >}}


### イベント

Google AlloyDB インテグレーションには、イベントは含まれません。

### サービスチェック

Google AlloyDB インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_alloydb/google_cloud_alloydb_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/