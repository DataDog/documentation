---
app_id: snmp-american-power-conversion
app_uuid: 6b5325b8-443d-42e0-8545-f7dc42acacb4
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10329
    source_type_name: American Power Conversion
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_american_power_conversion/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_american_power_conversion
integration_id: snmp-american-power-conversion
integration_title: American Power Conversion
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_american_power_conversion
public_title: American Power Conversion
short_description: American Power Conversion 네트워크 디바이스에서 SNMP 메트릭을 수집하세요.
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
  description: American Power Conversion 네트워크 디바이스에서 SNMP 메트릭을 수집하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Support
  title: American Power Conversion
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

APC는 서지 보호, 배터리 백업 전원을 포함한 IT 물리적 인프라 제품을 제공합니다.

APC 통합을 구성하고 APC Uninterruptible Power Supply (UPS) 제품과 같은 디바이스에서 SNMP 메트릭을 수집합니다.

모니터링된 메트릭에 대한 자세한 내용은 [수집된 SNMP 데이터][1] 섹션을 참고하세요.

## 설정

SNMP 통합을 설치하고 구성하려면 [Network Device Monitoring][2] 문서를 참고하세요.

## 수집한 데이터

### 메트릭

모니터링된 메트릭에 대한 자세한 내용은 [수집된 SNMP 데이터][1] 섹션을 참고하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

* [Datadog으로 SNMP 모니터링][4]



[1]: https://docs.datadoghq.com/ko/network_monitoring/devices/data/
[2]: https://docs.datadoghq.com/ko/network_monitoring/devices/setup
[3]: https://docs.datadoghq.com/ko/help/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/