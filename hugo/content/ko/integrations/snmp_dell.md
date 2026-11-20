---
app_id: snmp-dell
app_uuid: 2d90389f-0e85-49a8-8fd9-715ff1836a23
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10147
    source_type_name: Dell
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_dell/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_dell
integration_id: snmp-dell
integration_title: Dell Inc.
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_dell
public_title: Dell Inc.
short_description: Dell 디바이스에서 메트릭을 수집하세요.
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
  description: Dell 디바이스에서 메트릭을 수집하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Support
  title: Dell Inc.
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Dell Inc.는 중소기업과 대기업을 위한 고성능 네트워킹용 컴퓨터와 네트워크 하드웨어를 개발하는 기술 회사입니다. Dell 하드웨어에서 모니터링 및 알림을 위해 수집할 메트릭에는 다음이 포함됩니다.

* Dell PowerEdge
* Dell iDRAC
* Dell EMC Isilon

Dell 디바이스에서 수집된 모든 메트릭의 전체 목록은 [Network Device Monitoring 문서][1]를 참고하세요.

## 설정

SNMP 통합을 설치하고 구성하려면 [Network Device Monitoring][2] 문서를 참고하세요.

## 벤더 프로필

이 통합에 지원되는 특정 공급업체 프로필은 [네트워크 공급업체][3] 페이지에서 확인할 수 있습니다.

## 수집한 데이터

### 메트릭

모니터링되는 메트릭에 대한 자세한 내용은 [Network Device Monitoring 문서][1]를 참고하세요.

### 서비스 점검

Dell 통합은 서비스 점검을 포함하지 않습니다.

### 이벤트

Dell 통합은 이벤트를 포함하지 않습니다.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

* [Datadog으로 SNMP 모니터링][4]

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/network_monitoring/devices/data
[2]: https://docs.datadoghq.com/ko/network_monitoring/devices/setup
[3]: https://docs.datadoghq.com/ko/network_monitoring/devices/supported_devices/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[5]: https://docs.datadoghq.com/ko/help/