---
app_id: oci-vpn
app_uuid: 5dc51055-a401-4489-82d9-2b37e881985c
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.vpn.bytes_received
      - oci.vpn.bytes_sent
      - oci.vpn.packets_error
      - oci.vpn.packets_received
      - oci.vpn.packets_sent
      - oci.vpn.tunnel_state
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 38638772
    source_type_name: OCI VPN
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 네트워크
- 클라우드
- oracle
- 메트릭
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_vpn
integration_id: oci-vpn
integration_title: OCI VPN
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_vpn
public_title: OCI VPN
short_description: OCI VPN은 암호화된 가상 사설망(VPN) 연결을 통해 온프레미스 네트워크를 Oracle Cloud로 안전하게
  확장합니다.
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
  description: OCI VPN은 암호화된 가상 사설망(VPN) 연결을 통해 온프레미스 네트워크를 Oracle Cloud로 안전하게 확장합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI VPN
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 개요

Oracle Cloud Infrastructure(OCI) 사이트 간 가상 사설망(VPN)은 업계 표준 IPSec 프로토콜을 사용하여, 기존 인터넷 연결을 통해 기업 네트워크와 사이트에서 OCI로 사설·보안 연결을 제공하도록 합니다.

이 통합을 통해 [oci_vpn][1] 네임스페이스에서 메트릭을 수집하여 VPN 상태, 처리량 및 오류를 모니터링하고 알림을 보낼 수 있습니다.

## 설정

### 설치

[Oracle Cloud Infrastructure][2] 통합을 설정한 후 위에 언급된 모든 네임스페이스가 [Connector Hub][3]에 포함되어 있는지 확인하세요.


## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "oci_vpn" >}}


### 서비스 점검

OCI VPN은 서비스 점검을 포함하지 않습니다.

### 이벤트

OCI VPN은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.


[1]: https://docs.oracle.com/en-us/iaas/Content/Network/Reference/ipsecmetrics.htm
[2]: https://docs.datadoghq.com/ko/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_vpn/metadata.csv
[5]: https://docs.datadoghq.com/ko/help/