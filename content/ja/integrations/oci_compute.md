---
app_id: oci-compute
app_uuid: 55a43db4-b342-461d-a0f9-e29b62b9f0a7
assets:
  dashboards:
    OCI-Compute-Overview: assets/dashboards/oci-compute-overview-dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.computeagent.cpu_utilization
      - oci.computeagent.disk_bytes_read
      - oci.computeagent.disk_bytes_written
      - oci.computeagent.disk_iops_read
      - oci.computeagent.disk_iops_written
      - oci.computeagent.load_average
      - oci.computeagent.memory_allocation_stalls
      - oci.computeagent.memory_utilization
      - oci.computeagent.networks_bytes_in
      - oci.computeagent.networks_bytes_out
      - oci.rdma_infrastructure_health.rdma_rx_bytes
      - oci.rdma_infrastructure_health.rdma_rx_packets
      - oci.rdma_infrastructure_health.rdma_tx_bytes
      - oci.rdma_infrastructure_health.rdma_tx_packets
      - oci.compute_infrastructure_health.health_status
      - oci.compute_infrastructure_health.instance_status
      - oci.compute_infrastructure_health.maintenance_status
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 23763231
    source_type_name: OCI Compute
  monitors:
    A Compute Instance is Experiencing a Health Event: assets/monitors/oci-compute-health-event.json
    A Compute Instance is approaching CPU saturation: assets/monitors/oci-compute-cpu.json
    A Compute Instance is down: assets/monitors/oci-instance-down.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
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
git_integration_title: oci_compute
integration_id: oci-compute
integration_title: OCI Compute
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_compute
public_title: OCI Compute
short_description: Oracle Cloud Infrastructure (OCI) は、どんなワークロードにも対応できる、柔軟で高性能かつ安全なコンピュートを提供します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Cloud
  - Category::Oracle
  - Category::Metrics
  - Category::OS & System
  - Offering::Integration
  configuration: README.md#Setup
  description: Oracle Cloud Infrastructure (OCI) は、どんなワークロードにも対応できる、柔軟で高性能かつ安全なコンピュートを提供します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI Compute
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Oracle Cloud Infrastructure (OCI) は、AI や機械学習 (ML) をはじめ、計算集約型の処理、エンタープライズ、クラウド ネイティブ アプリケーションなど、幅広いワークロードに向けて、柔軟で高性能かつ安全なコンピュートを提供します。


このインテグレーションを利用すると、[仮想マシン][1] と [ベア メタル インスタンス][2] の健全性、容量、スループット、状態、パフォーマンスを監視し、アラートを設定できます。

次の Compute ネームスペースからメトリクスとタグを収集します。
- [`oci_computeagent`][3]
- [`oci_rdma_infrastructure_health`][4]
- [`oci_compute_infrastructure_health`][5]

## セットアップ

### インストール

[Oracle Cloud Infrastructure][6] インテグレーションを設定したら、`oci_computeagent`、`oci_rdma_infrastructure_health`、`oci_compute_infrastructure_health` の各ネームスペースが [Connector Hub][7] に含まれていることを確認してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_compute" >}}


### イベント

OCI Compute インテグレーションには、イベントは含まれません。

### サービスチェック

OCI Compute インテグレーションには、サービス チェックは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。



[1]: https://www.oracle.com/cloud/compute/virtual-machines/
[2]: https://www.oracle.com/cloud/compute/bare-metal/
[3]: https://docs.oracle.com/en-us/iaas/Content/Compute/References/computemetrics.htm#Availabl
[4]: https://docs.oracle.com/en-us/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_compute_rdma_network
[5]: https://docs.oracle.com/en-us/iaas/Content/Compute/References/infrastructurehealthmetrics.htm#infrastructurehealth
[6]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[7]: https://cloud.oracle.com/connector-hub/service-connectors
[8]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_compute/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/