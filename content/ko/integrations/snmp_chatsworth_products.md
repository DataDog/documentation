---
app_id: snmp-chatsworth-products
app_uuid: 344b37df-ba82-4352-b277-ba1f1ccf716f
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10330
    source_type_name: Chatsworth Products
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_chatsworth_products/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_chatsworth_products
integration_id: snmp-chatsworth-products
integration_title: Chatsworth Products
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_chatsworth_products
public_title: Chatsworth Products
short_description: Chatsworth Products 네트워크 디바이스에서 SNMP 메트릭을 수집하세요.
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
  description: Chatsworth Products 네트워크 디바이스에서 SNMP 메트릭을 수집하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Support
  title: Chatsworth Products
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Chatsworth Products(CPI)는 IT 및 산업 장비를 보호하도록 설계된 제품과 솔루션을 생산하는 글로벌 제조업체입니다.

Chatsworth Products 통합을 구성하고 Chatsworth PDU와 같은 디바이스에서 SNMP 메트릭을 수집합니다.

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