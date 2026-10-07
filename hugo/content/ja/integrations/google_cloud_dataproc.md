---
app_id: google-cloud-dataproc
app_uuid: 85672a18-7845-4038-a688-ee86a126f3aa
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: gcp.dataproc.cluster.hdfs.datanodes
      metadata_path: metadata.csv
      prefix: gcp.dataproc.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 266
    source_type_name: Google Cloud Dataproc
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- cloud
- google cloud
- ログの収集
custom_kind: インテグレーション
dependencies: []
description: Google Cloud Dataproc のキーメトリクスを追跡
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_dataproc/
draft: false
git_integration_title: google_cloud_dataproc
has_logo: true
integration_id: google-cloud-dataproc
integration_title: Google Cloud Dataproc
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_dataproc
public_title: Google Cloud Dataproc
short_description: Apache Spark と Hadoop クラスターをコスト効率よく運用できるマネージド クラウド サービスです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Google Cloud
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Apache Spark と Hadoop クラスターをコスト効率よく運用できるマネージド クラウド サービスです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud Dataproc
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

<div class="alert alert-info">
<a href="https://docs.datadoghq.com/data_jobs/">Data Jobs Monitoring</a> は、Dataproc クラスター上の Spark ジョブの観測、トラブルシューティング、コスト最適化を支援します。
</div>

Google Cloud Dataproc は、Apache Spark と Apache Hadoop のクラスターを簡単かつコスト効率よく実行するための高速で使いやすいフルマネージド型のクラウドサービスです。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud Dataproc からメトリクスを収集できます。

## セットアップ

### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### ログ収集

Google Cloud Dataproc のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Cloud Dataproc のログを Google Cloud Logging から Pub/Sub トピックへエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Cloud Dataproc のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_dataproc" >}}


### イベント

Google Cloud Dataproc インテグレーションには、イベントは含まれません。

### サービスチェック

Google Cloud Dataproc インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_dataproc/google_cloud_dataproc_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/