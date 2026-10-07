---
app_id: google-cloud-tpu
app_uuid: c20f781b-e1d0-438e-b33d-0bc4bb4c6d0a
assets:
  dashboards:
    google-cloud-tpu-overview: assets/dashboards/google_cloud_tpu_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - gcp.tpu.cpu.utilization
      - gcp.tpu.memory.usage
      - gcp.tpu.network.received_bytes_count
      - gcp.tpu.network.sent_bytes_count
      - gcp.tpu.accelerator.duty_cycle
      - gcp.tpu.instance.uptime_total
      - gcp.gke.node.accelerator.tensorcore_utilization
      - gcp.gke.node.accelerator.duty_cycle
      - gcp.gke.node.accelerator.memory_used
      - gcp.gke.node.accelerator.memory_total
      - gcp.gke.node.accelerator.memory_bandwidth_utilization
      - gcp.gke.container.accelerator.tensorcore_utilization
      - gcp.gke.container.accelerator.duty_cycle
      - gcp.gke.container.accelerator.memory_used
      - gcp.gke.container.accelerator.memory_total
      - gcp.gke.container.accelerator.memory_bandwidth_utilization
      metadata_path: metadata.csv
      prefix: gcp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 275
    source_type_name: Google Cloud TPU
  monitors:
    Container Duty Cycle Low Percentage: assets/monitors/tpu_container_low_duty_cycle_percentage.json
    Container Memory Bandwidth Low Utilization: assets/monitors/tpu_container_memory_bandwidth_under_utilization.json
    Container Tensorcore Utilization Low Utilization: assets/monitors/tpu_container_tensorcore_under_utilization.json
    Node Duty Cycle Low Percentage: assets/monitors/tpu_node_low_duty_cycle_percentage.json
    Node Memory Bandwidth Low Utilization: assets/monitors/tpu_node_memory_bandwidth_under_utilization.json
    Node Tensorcore Utilization Low Utilization: assets/monitors/tpu_node_tensorcore_under_utilization.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- モニター
- google cloud
- ログの収集
- ai/ml
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_tpu
integration_id: google-cloud-tpu
integration_title: Google Cloud TPU
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_tpu
public_title: Google Cloud TPU
short_description: ML モデル開発のために、スケーラブルで使いやすいクラウドリソースを活用した Tensor Processing Unit の利点。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Google Cloud
  - Category::Log Collection
  - Category::AI/ML
  - Offering::Integration
  configuration: README.md#Setup
  description: ML モデル開発のために、スケーラブルで使いやすいクラウドリソースを活用した Tensor Processing Unit の利点。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud TPU
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Google Cloud TPU 製品は、スケーラブルで使いやすいクラウドコンピューティングリソースを通じて Tensor Processing Unit (TPU) を利用できるようにします。ML 研究者、ML エンジニア、開発者、データサイエンティストの誰もが最先端の ML (機械学習) モデルを実行できます。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud TPU からメトリクスを収集できます。

## セットアップ

### インストール

Google Cloud TPU を使用するには、[Google Cloud Platform インテグレーション][1]を設定するだけです。

### ログ収集

Google Cloud TPU のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Cloud TPU のログを Google Cloud Logging から Pub/Sub トピックへエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Cloud TPU のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google-cloud-tpu" >}}


### イベント

Google Cloud TPU インテグレーションには、イベントは含まれません。

### サービスチェック

Google Cloud TPU インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_tpu/google_cloud_tpu_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/