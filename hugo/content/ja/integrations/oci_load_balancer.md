---
app_id: oci-load-balancer
app_uuid: 4a90a892-952b-4b20-8152-c2d53da59a7d
assets:
  dashboards:
    OCI-Load-Balancer-Overview: assets/dashboards/oci-load-balancer-overview-dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.lbaas.accepted_connections
      - oci.lbaas.accepted_sslhandshake
      - oci.lbaas.active_connections
      - oci.lbaas.active_sslconnections
      - oci.lbaas.backend_servers
      - oci.lbaas.backend_timeouts
      - oci.lbaas.bytes_received
      - oci.lbaas.bytes_sent
      - oci.lbaas.closed_connections
      - oci.lbaas.failed_sslclient_cert_verify
      - oci.lbaas.failed_sslhandshake
      - oci.lbaas.handled_connections
      - oci.lbaas.http_requests
      - oci.lbaas.http_responses
      - oci.lbaas.http_responses_200
      - oci.lbaas.http_responses_2xx
      - oci.lbaas.http_responses_3xx
      - oci.lbaas.http_responses_4xx
      - oci.lbaas.http_responses_502
      - oci.lbaas.http_responses_504
      - oci.lbaas.http_responses_5xx
      - oci.lbaas.http_responses_200
      - oci.lbaas.http_responses_2xx
      - oci.lbaas.http_responses_3xx
      - oci.lbaas.http_responses_4xx
      - oci.lbaas.http_responses_502
      - oci.lbaas.http_responses_504
      - oci.lbaas.http_responses_5xx
      - oci.lbaas.invalid_header_responses
      - oci.lbaas.keep_alive_connections
      - oci.lbaas.peak_bandwidth
      - oci.lbaas.response_time_first_byte
      - oci.lbaas.response_time_http_header
      - oci.lbaas.unhealthy_backend_servers
      - oci.nlb.active_connections
      - oci.nlb.egress_packets_dropped_by_sl
      - oci.nlb.healthy_backends_per_nlb
      - oci.nlb.ingress_packets_dropped_by_sl
      - oci.nlb.nlbvtap_fwd_drops
      - oci.nlb.nlbvtap_received_bytes
      - oci.nlb.nlbvtap_received_packets
      - oci.nlb.nlbvtap_transmitted_bytes
      - oci.nlb.nlbvtap_transmitted_packets
      - oci.nlb.new_connections
      - oci.nlb.new_connections_tcp
      - oci.nlb.new_connections_udp
      - oci.nlb.processed_bytes
      - oci.nlb.processed_packets
      - oci.nlb.unhealthy_backends_per_nlb
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 24434732
    source_type_name: OCI Load Balancer
  monitors:
    A Load Balancer is experiencing an abnormally high error rate: assets/monitors/high-error-volume.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ネットワーク
- クラウド
- oracle
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_load_balancer
integration_id: oci-load-balancer
integration_title: OCI Load Balancer
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_load_balancer
public_title: OCI Load Balancer
short_description: OCI Load Balancer は、複数のコンピュート インスタンスに受信トラフィックを分散し、高い信頼性と可用性を実現します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Cloud
  - Category::Oracle
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI Load Balancer は、複数のコンピュート インスタンスに受信トラフィックを分散し、高い信頼性と可用性を実現します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI Load Balancer
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Oracle Cloud Infrastructure (OCI) Flexible Load Balancer は、アプリケーションの接続を複数のコンピュート リソースに分散し、レジリエンスとパフォーマンスを強化するように設計されたクラウド ネイティブ サービスです。

このインテグレーションでは、[`oci_lbaas`][1] および [`oci_nlb`][2] のネーム スペースからメトリクスとタグを収集することで、Load Balancer Services のスループット、パフォーマンス、健全性を監視し、アラートを設定できます。

## セットアップ

### インストール

[Oracle Cloud Infrastructure][3] インテグレーションをセット アップしたら、`oci_lbaas` および `oci_nlb` のネーム スペースが [Connector Hub][4] に含まれていることを確認してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_load_balancer" >}}


### イベント

OCI Database インテグレーションには、イベントは含まれません。

### サービスチェック

OCI Database インテグレーションには、サービス チェックは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。


[1]: https://docs.oracle.com/en-us/iaas/Content/Balance/Reference/loadbalancermetrics.htm
[2]: https://docs.oracle.com/en-us/iaas/Content/NetworkLoadBalancer/Metrics/metrics.htm
[3]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[4]: https://cloud.oracle.com/connector-hub/service-connectors
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_load_balancer/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/