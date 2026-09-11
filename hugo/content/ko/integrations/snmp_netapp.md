---
app_id: snmp-netapp
app_uuid: d50aeab6-c26b-49df-aeb1-910d5d1a3e48
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10333
    source_type_name: NetApp
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_netapp/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_netapp
integration_id: snmp-netapp
integration_title: NetApp
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_netapp
public_title: NetApp
short_description: NetApp 네트워크 디바이스에서 SNMP 메트릭을 수집하세요.
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
  description: NetApp 네트워크 디바이스에서 SNMP 메트릭을 수집하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Support
  title: NetApp
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

NetApp은 데이터와 애플리케이션을 관리하기 위한 온라인 및 물리적 클라우드 데이터 서비스를 제공하는 클라우드 데이터 관리 및 데이터 서비스 기업입니다.

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



[1]: https://docs.datadoghq.com/ko/network_monitoring/devices/data
[2]: https://docs.datadoghq.com/ko/network_monitoring/devices/setup
[3]: https://docs.datadoghq.com/ko/help/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/