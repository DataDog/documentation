---
app_id: google-cloud-dataflow
app_uuid: 27fcc215-6351-4e39-8320-19fe03ed7634
assets:
  dashboards:
    google_cloud_dataflow: assets/dashboards/google_cloud_dataflow.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: gcp.dataflow.job.total_vcpu_time
      metadata_path: metadata.csv
      prefix: gcp.dataflow.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 265
    source_type_name: Google Cloud Dataflow
  monitors:
    Job backlog time is high: assets/monitors/backlog_monitor.json
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
description: Google Cloud Dataflow のキーメトリクスを追跡
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_dataflow/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
  tag: ブログ
  text: Datadog による Dataflow パイプラインの監視
git_integration_title: google_cloud_dataflow
has_logo: true
integration_id: google-cloud-dataflow
integration_title: Google Cloud Dataflow
integration_version: ''
is_public: true
manifest_version: 2.0.0
monitors:
  Job backlog time is high: assets/monitors/backlog_monitor.json
name: google_cloud_dataflow
public_title: Google Cloud Dataflow
short_description: リアル タイム処理と履歴データ処理の両方に対応し、データの変換とエンリッチメントを行うマネージド サービスです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Google Cloud
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: リアル タイム処理と履歴データ処理の両方に対応し、データの変換とエンリッチメントを行うマネージド サービスです。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
  support: README.md#Support
  title: Google Cloud Dataflow
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Google Cloud Dataflow は、ストリーム (リアルタイム) モードとバッチ (履歴) モードのどちらでも、同等の信頼性と表現力でデータを変換し、強化することができる、フルマネージド型のサービスです。

Datadog Google Cloud インテグレーションを使用して、Google Cloud Dataflow からメトリクスを収集できます。

## セットアップ

### メトリクスの収集

#### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### ログ収集

Google Cloud Dataflow のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Cloud Dataflow のログを Google Cloud Logging から Pub/Sub へエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Cloud Dataflow のログを絞り込みます。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_dataflow" >}}


<div class="alert alert-warning">
Google Cloud Dataflow を使って Apache Beam パイプラインのメトリクスを監視する場合、Gauge の静的メソッドから生成されたメトリクスは収集されないことに注意してください。これらのメトリクスを監視する必要がある場合は、<a href="https://micrometer.io/docs">Micrometer</a> を使用できます。
</div>


### イベント

Google Cloud Dataflow インテグレーションには、イベントは含まれません。

### サービスチェック

Google Cloud Dataflow インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_dataflow/google_cloud_dataflow_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/