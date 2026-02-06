---
app_id: google-cloud-functions
app_uuid: 3101d455-ff1e-432e-a60b-58d8ecc4009a
assets:
  dashboards:
    gcp_cloudfunctions: assets/dashboards/gcp_cloudfunctions.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: gcp.cloudfunctions.function.execution_count
      metadata_path: metadata.csv
      prefix: gcp.cloudfunctions.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 196
    source_type_name: Google Cloud Functions
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- google cloud
- log collection
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_functions
integration_id: google-cloud-functions
integration_title: Google Cloud Functions
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_functions
public_title: Google Cloud Functions
short_description: 小さく単一目的の関数を作成できる、イベント駆動の非同期コンピュート ソリューションです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::クラウド
  - Category::Google Cloud
  - Category::ログの収集
  - Offering::Integration
  configuration: README.md#Setup
  description: 小さく単一目的の関数を作成できる、イベント駆動の非同期コンピュート ソリューションです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud Functions
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Google Cloud Functions は、単一目的の小規模な関数を作成できる、軽量、イベントベース、かつ非同期のコンピューティングソリューションです。

Google Functions からメトリクスを取得して、以下のことができます。

- 関数のパフォーマンスを視覚化。
- 関数のパフォーマンスをアプリケーションと関連付け。

## セットアップ

### メトリクスの収集

#### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### ログ収集

Google Cloud Function のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Cloud Function のログを Google Cloud Logging から Pub/Sub トピックへエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Cloud Function のログを絞り込みます。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_functions" >}}


### イベント

Google Cloud Functions インテグレーションには、イベントは含まれません。

### サービスチェック

Google Cloud Functions インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_functions/google_cloud_functions_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/