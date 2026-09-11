---
app_id: oci-queue
app_uuid: d17dfabb-5838-487d-89f0-6324c5246cf5
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.queue.consumer_lag
      - oci.queue.messages_count
      - oci.queue.messages_in_queue_count
      - oci.queue.queue_size
      - oci.queue.request_success
      - oci.queue.requests_latency
      - oci.queue.requests_throughput
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39303336
    source_type_name: OCI Queue
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- メッセージキュー
- クラウド
- oracle
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_queue
integration_id: oci-queue
integration_title: OCI Queue
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_queue
public_title: OCI Queue
short_description: OCI Queue は、フル マネージドのキュー サービスを提供し、アプリケーション間のスケーラブルで疎結合な通信を可能にします。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Message Queues
  - Category::Cloud
  - Category::Oracle
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI Queue は、フルマネージド型のキューサービスを提供し、アプリケーション間のスケーラブルな非同期通信を可能にします。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI Queue
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Oracle Cloud Infrastructure (OCI) Queue は、サーバーレス方式で非同期かつ疎結合な通信を実現するサービスです。

このインテグレーションは、[oci_queue][1] ネームスペースからメトリクスを収集し、キューの健全性とサイズを監視してアラートを設定できます。

## セットアップ

### インストール

[Oracle Cloud Infrastructure][2] インテグレーションを設定した後、上記に記載のネームスペースが [Connector Hub][3] に含まれていることを確認してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_queue" >}}


### サービスチェック

OCI Queue にはサービス チェックは含まれません。

### イベント

OCI Queue にはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.oracle.com/en-us/iaas/Content/queue/metrics.htm
[2]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_queue/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/