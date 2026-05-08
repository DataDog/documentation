---
app_id: snmp-juniper
app_uuid: 783d0088-b478-4b3c-9654-ec4fbfefc18d
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10146
    source_type_name: Juniper Networks
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 네트워크
- 알림
- snmp
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snmp_juniper/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_juniper
integration_id: snmp-juniper
integration_title: Juniper Networks
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_juniper
public_title: Juniper Networks
short_description: Juniper 네트워크 디바이스에서 메트릭을 수집하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Notifications
  - Category::SNMP
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Juniper 네트워크 디바이스에서 메트릭을 수집하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-juniper-network-devices-with-datadog/
  support: README.md#Support
  title: Juniper Networks
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Juniper Networks는 라우터, 스위치, 네트워크 관리 소프트웨어, 네트워크 보안 제품 등 네트워킹 제품을 개발하고 판매합니다. Juniper 통합을 구성하고 다음을 포함한 디바이스에서 SNMP 메트릭을 수집하세요.

- Juniper EX Ethernet Switches
- Juniper MX Routers
- Juniper SRX Firewalls

모니터링된 메트릭에 관한 자세한 내용은 [수집된 NDM 데이터][1] 섹션을 참고하세요.

## 설정

SNMP 통합을 설치하고 구성하려면 [Network Device Monitoring][2] 문서를 참고하세요.

## 벤더 프로필

이 통합에 지원되는 특정 공급업체 프로필은 [네트워크 공급업체][3] 페이지에서 확인할 수 있습니다.

## 수집한 데이터

### 메트릭

모니터링된 메트릭에 관한 자세한 내용은 [수집된 NDM 데이터][1] 섹션을 참고하세요.

### 서비스 점검

Juniper는 서비스 점검을 포함하지 않습니다.

### 이벤트

Juniper는 이벤트를 포함하지 않습니다.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog으로 SNMP 모니터링][4]
- [Datadog을 사용하여 Juniper 네트워크 디바이스 모니터링][5]

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][6]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/network_monitoring/devices/data/
[2]: https://docs.datadoghq.com/ko/network_monitoring/devices/setup/
[3]: https://docs.datadoghq.com/ko/network_monitoring/devices/supported_devices/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[5]: https://www.datadoghq.com/blog/monitor-juniper-network-devices-with-datadog/
[6]: https://docs.datadoghq.com/ko/help/