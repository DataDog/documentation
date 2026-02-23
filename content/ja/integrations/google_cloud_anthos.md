---
app_id: google-cloud-anthos
app_uuid: ae7e2e76-77be-446b-a7e4-b341ba20473a
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: gcp.anthos.kube_node_status_capacity
      metadata_path: metadata.csv
      prefix: gcp.anthos.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 345
    source_type_name: Google Cloud Anthos
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- クラウド
- オーケストレーション
- google cloud
- ログの収集
custom_kind: インテグレーション
dependencies: []
description: Anthos クラスターからメトリクスとログを収集し、 Datadog で分析します。
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_anthos/
draft: false
git_integration_title: google_cloud_anthos
has_logo: true
integration_id: google-cloud-anthos
integration_title: Google Cloud Anthos
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_anthos
public_title: Google Cloud Anthos
short_description: モダンなアプリケーションを大規模に構築し、実行します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Orchestration
  - Category::Google Cloud
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: モダンなアプリケーションを大規模に構築し、実行します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud Anthos
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Google Cloud Anthos は、 Google Cloud によるコントロール プレーンを備え、オンプレミス、エッジ、複数のパブリック クラウドにまたがってインフラとアプリケーションを扱える開発プラットフォームです。

Datadog の Google Cloud Platform インテグレーションを使用して、 Google Cloud Anthos からメトリクスを収集します。

## セットアップ

### メトリクスの収集

#### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

### ログ収集

Google Cloud Anthos のログは Google Cloud Logging で収集し、 Cloud Pub/Sub トピック経由で Dataflow ジョブに送信できます。まだ設定していない場合は、 [Datadog Dataflow テンプレートでロギングを設定する][2] を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_anthos" >}}


### イベント

Google Cloud Anthos インテグレーションには、イベントは含まれていません。

### サービスチェック

Google Cloud Anthos インテグレーションには、サービス チェックは含まれていません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://cloud.google.com/architecture/partners/monitoring-anthos-with-datadog#collecting_logs_with_stackdriver_logging
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_anthos/google_cloud_anthos_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/