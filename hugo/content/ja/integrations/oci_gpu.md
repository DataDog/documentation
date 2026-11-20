---
app_id: oci-gpu
app_uuid: 01953de5-89a5-7c6e-9e7e-b466510d511f
assets:
  dashboards:
    OCI GPU Overview: assets/dashboards/oci_gpu_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.gpu_infrastructure_health.gpu_utilization
      - oci.gpu_infrastructure_health.gpu_temperature
      - oci.gpu_infrastructure_health.gpu_power_draw
      - oci.gpu_infrastructure_health.gpu_memory_utilization
      - oci.gpu_infrastructure_health.gpu_ecc_single_bit_errors
      - oci.gpu_infrastructure_health.gpu_ecc_double_bit_errors
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 40524701
    source_type_name: OCI GPU
  monitors:
    GPU temperature is high: assets/monitors/oci-gpu-temp.json
author:
  homepage: https://www.datadoghq.com/
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
  vendor_id: datadog
categories:
- ai/ml
- クラウド
- oracle
- モニター
- OS & システム
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_gpu
integration_id: oci-gpu
integration_title: OCI GPU
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_gpu
public_title: OCI GPU
short_description: OCI GPU は、AI、ML、HPC ワークロード向けにオンデマンドの高性能コンピューティングを提供します。
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Cloud
  - Category::Oracle
  - Category::Metrics
  - Category::OS & System
  - Offering::Integration
  - Supported OS::Linux
  configuration: README.md#Setup
  description: OCI GPU は、AI、ML、HPC ワークロード向けにオンデマンドの高性能コンピューティングを提供します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI GPU
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

高性能コンピューティング ワークロードの最適なパフォーマンスと信頼性を確保するには、Oracle Cloud Infrastructure (OCI) GPU インスタンスの監視が不可欠です。このインテグレーションは、gpu_infrastructure_health ネームスペースを通じて包括的な GPU メトリクスを提供し、GPU の健全性と利用状況のさまざまな側面を追跡できるようにします。


このインテグレーションを利用すると、[GPU インスタンス][1]の健全性、容量、スループット、状態、パフォーマンスを監視し、アラートを設定できます。

[gpu_infrastructure_health][2] ネームスペースからメトリクスとタグを収集します。


## セットアップ

[Oracle Cloud Infrastructure][3] インテグレーションを設定した後、上記に記載のネームスペースが [Connector Hub][4] に含まれていることを確認してください。


## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_gpu" >}}


### サービスチェック

OCI GPU にはサービス チェックは含まれません。

### イベント

OCI GPU にはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。



[1]: https://www.oracle.com/cloud/compute/#gpu
[2]: https://docs.oracle.com/en-us/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute
[3]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[4]: https://cloud.oracle.com/connector-hub/service-connectors
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_gpu/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/