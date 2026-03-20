---
app_id: snmp-cisco
app_uuid: 91202d4a-1af4-4c64-88e4-5ba02b23c69f
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10136
    source_type_name: Cisco
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_cisco/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_cisco
integration_id: snmp-cisco
integration_title: Cisco
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_cisco
public_title: Cisco
short_description: Cisco 네트워크 디바이스에서 SNMP 메트릭을 수집하세요.
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
  description: Cisco 네트워크 디바이스에서 SNMP 메트릭을 수집하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Support
  title: Cisco
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Cisco는 IT, 네트워킹, 사이버 보안 솔루션 분야의 세계적인 선두 기업입니다. 통합 솔루션을 설치하여 라우터, 스위치, 음성 장비, 보안 장비 등 모든 Cisco 어플라이언스를 모니터링하세요.

다음을 포함한 Cisco 어플라이언스에서 SNMP 메트릭을 수집합니다.

- Cisco Catalyst
- [Cisco Adaptive Security Appliance][1] (ASA)
- [Cisco Meraki][2] 
    **참고**: 추가 이벤트는 [Meraki 통합 타일][3]을 통해 Meraki에서 수집할 수 있습니다.
- Cisco Nexus
- Cisco ICM
- Cisco ISR
- [Cisco SD-WAN][4]
- Cisco UC 가상 머신

**참고**: 이 통합에 지원되는 추가 공급업체 프로필은 [네트워크 공급업체][5] 페이지에서 확인할 수 있습니다.

## 설정

SNMP 통합을 설치하고 구성하려면 [Network Device Monitoring][6] 문서를 참고하세요.

## 수집한 데이터

### 메트릭

모니터링되는 메트릭에 대한 자세한 내용은 [SNMP 통합 타일][7]을 참고하세요.

### 서비스 점검

Snmp Cisco는 서비스 점검을 포함하지 않습니다.

### 이벤트

Snmp Cisco는 이벤트를 포함하지 않습니다.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

* [Datadog으로 SNMP 모니터링][8]

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/crest_data_systems_cisco_asa/
[2]: https://docs.datadoghq.com/ko/integrations/meraki/
[3]: https://app.datadoghq.com/account/settings#integrations/meraki
[4]: https://docs.datadoghq.com/ko/integrations/cisco_sdwan/
[5]: https://docs.datadoghq.com/ko/network_monitoring/devices/supported_devices/
[6]: https://docs.datadoghq.com/ko/network_monitoring/devices/setup
[7]: https://app.datadoghq.com/account/settings#integrations/snmp
[8]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[9]: https://docs.datadoghq.com/ko/help/