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
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
- 클라우드
- oracle
- 메트릭
custom_kind: 통합
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
short_description: OCI Load Balancer는 수신 트래픽을 여러 컴퓨팅 인스턴스에 분산하여 높은 신뢰성과 가용성을 제공합니다.
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
  description: OCI Load Balancer는 수신 트래픽을 여러 컴퓨팅 인스턴스에 분산하여 높은 신뢰성과 가용성을 제공합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI Load Balancer
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 개요

Oracle Cloud Infrastructure (OCI) Flexible Load Balancer는 회복성과 성능을 향상하기 위해 여러 컴퓨팅 리소스에 애플리케이션 연결을 분산하도록 설계된 클라우드 네이티브 서비스입니다.

본 통합으로 [`oci_lbaas`][1] 및 [`oci_nlb`][2] 네임스페이스에서 메트릭과 태그를 수집하여 Load Balancer 서비스의 처리량, 성능, 상태를 모니터링하고 알림을 받을 수 있습니다.

## 설정

### 설치

[Oracle Cloud Infrastructure][3] 통합을 설정한 후 `oci_lbaas` 및 `oci_nlb` 네임스페이스가 [Connector Hub][4]에 포함되어 있는지 확인하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "oci_load_balancer" >}}


### 이벤트

OCI 데이터베이스 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

OCI 데이터베이스 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.


[1]: https://docs.oracle.com/en-us/iaas/Content/Balance/Reference/loadbalancermetrics.htm
[2]: https://docs.oracle.com/en-us/iaas/Content/NetworkLoadBalancer/Metrics/metrics.htm
[3]: https://docs.datadoghq.com/ko/integrations/oracle_cloud_infrastructure/
[4]: https://cloud.oracle.com/connector-hub/service-connectors
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_load_balancer/metadata.csv
[6]: https://docs.datadoghq.com/ko/help/