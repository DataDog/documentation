---
app_id: google-cloud-firestore
app_uuid: 16876032-6aa7-44a6-bc39-4c6d9a7f90c7
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: gcp.firestore.document.write_count
      metadata_path: metadata.csv
      prefix: gcp.firestore.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 268
    source_type_name: Google Cloud Firestore
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- cloud
- data stores
- google cloud
- ログの収集
- モバイル
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_firestore
integration_id: google-cloud-firestore
integration_title: Google Cloud Firestore
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_firestore
public_title: Google Cloud Firestore
short_description: Firebase と Google Cloud が提供する、モバイルと Web とサーバー開発向けの柔軟でスケーラブルなデータベースです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Data Stores
  - Category::Google Cloud
  - Category::Log Collection
  - Category::Mobile
  - Offering::Integration
  configuration: README.md#Setup
  description: Firebase と Google Cloud が提供する、モバイルと Web とサーバー開発向けの柔軟でスケーラブルなデータベースです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud Firestore
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Google Cloud Firestore は、Firebase と Google Cloud Platform によるモバイル、Web、およびサーバー開発に対応した柔軟で拡張性の高いデータベースです。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud Firestore からメトリクスを収集できます。

## セットアップ

### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### ログ収集

Google Cloud Firestore のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Cloud Firestore のログを Google Cloud Logging から Pub/Sub トピックへエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Cloud Firestore のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_firestore" >}}


### イベント

Google Cloud Firestore インテグレーションには、イベントは含まれません。

### サービスチェック

Google Cloud Firestore インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_firestore/google_cloud_firestore_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/