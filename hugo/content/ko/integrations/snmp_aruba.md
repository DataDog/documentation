---
app_id: snmp-aruba
app_uuid: 39ecfe88-b733-43f6-b8c5-99450430b776
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10354
    source_type_name: Aruba
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 알림
- 네트워크
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snmp_aruba/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_aruba
integration_id: snmp-aruba
integration_title: Aruba
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_aruba
public_title: Aruba
short_description: Aruba 네트워크 디바이스에서 SNMP 메트릭을 수집하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 카테고리::알림
  - Category::Network
  - 제공::통합
  configuration: README.md#Setup
  description: Aruba 네트워크 디바이스에서 SNMP 메트릭을 수집하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Support
  title: Aruba
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Aruba Networks는 Hewlett Packard Enterprise의 무선 네트워킹 자회사로, 유선, 무선 및 SD-WAN 솔루션을 제공합니다. Aruba 통합을 구성하고 Aruba 스위치 및 액세스 포인트와 같은 디바이스에서 SNMP 메트릭을 수집하세요.

모니터링된 메트릭에 대한 자세한 내용은 [수집된 SNMP 데이터][1] 섹션을 참고하세요.

## 설정

SNMP 통합을 설치하고 구성하려면 [Network Device Monitoring][2] 문서를 참고하세요.

## 벤더 프로필

이 통합에 지원되는 특정 공급업체 프로필은 [네트워크 공급업체][3] 페이지에서 확인할 수 있습니다.

## 수집한 데이터

### 메트릭

모니터링된 메트릭에 대한 자세한 내용은 [수집된 SNMP 데이터][1] 섹션을 참고하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

* [Datadog으로 SNMP 모니터링][5]



[1]: https://docs.datadoghq.com/ko/network_monitoring/devices/data
[2]: https://docs.datadoghq.com/ko/network_monitoring/devices/setup
[3]: https://docs.datadoghq.com/ko/network_monitoring/devices/supported_devices/
[4]: https://docs.datadoghq.com/ko/help/
[5]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/