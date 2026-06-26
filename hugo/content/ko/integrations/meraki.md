---
app_id: meraki
app_uuid: c34bd865-7ddf-4336-9cf2-02e1a2f05bbd
assets:
  dashboards:
    meraki: assets/dashboards/meraki_overview.json
  integration:
    auto_install: false
    metrics:
      check:
      - meraki.devStatus
      - snmp.devStatus
      metadata_path: metadata.csv
      prefix: meraki.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 602
    source_type_name: Meraki
  monitors:
    A Meraki Device Uplink is Failing: assets/monitors/uplink_device_is_failing.json
    A Meraki Device is in an Alerting State: assets/monitors/device_is_in_alert_state.json
    Abnormally High Latency on a Meraki Uplink: assets/monitors/high_latency_on_uplink.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 네트워크
- 로그 수집
- 보안
- snmp
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: meraki
integration_id: meraki
integration_title: Cisco Meraki
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: meraki
public_title: Cisco Meraki
short_description: 네트워크 디바이스 모니터링, 로그, Cloud 보안 정보와 이벤트 관리(SIEM)로 Cisco Meraki 환경
  모니터링
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Log Collection
  - Category::Security
  - Category::SNMP
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 네트워크 디바이스 모니터링, 로그, Cloud 보안 정보와 이벤트 관리(SIEM)로 Cisco Meraki 환경 모니터링
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 설명서
    url: https://docs.datadoghq.com/network_monitoring/devices/
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-meraki/
  support: README.md#Support
  title: Cisco Meraki
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->

## 개요

<div class="alert alert-info">Cisco Meraki용 네트워크 디바이스 모니터링은 현재 평가판입니다.</div>

본 메트릭 통합은 [네트워크 디바이스 모니터링][1] 메트릭, 네트워크 이벤트 로그, [클라우드 보안 정보와 이벤트 관리(SIEM)][2]를 위한 보안 이벤트 로그를 수집하여 Cisco Meraki 환경에 대한 포괄적인 가시성을 제공합니다.

**네트워크 디바이스 모니터링**

[네트워크 디바이스 모니터링][1]은 잠재적인 병목 현상과 디바이스 설정 오류를 식별하여 네트워크 인프라스트럭처의 전반적인 서비스 상태를 기준에 맞게 유지할 수 있도록 도와드립니다.

본 통합은 다음 장치에 대해 메트릭을 수집합니다.

* _MR(무선 액세스 포인트):_ 클라이언트 카운트, 연결 상태 및 처리량 등의 메트릭을 추적합니다.
* _MS(스위치):_ 포트 상태, 트래픽, 오류율 등의 스위치 성능 메트릭을 모니터링합니다.
* _MX(보안 어플라이언스):_ VPN 상태, 방화벽 규칙 및 전반적인 디바이스 성능에 대한 메트릭을 수집합니다.

본 통합으로 Meraki 환경의 디바이스 태그와 메타데이터를 동적으로 가져와 특정 디바이스 그룹, 위치 또는 장치 유형으로 쉽게 드릴다운할 수 있습니다.

**보안 이벤트 로그**

[보안 이벤트 로그][3]는 이벤트에서 침입 탐지, 방화벽 규칙 위반, 멀웨어 위협 탐지 등의 경고를 제공해 드리며, 잠재적인 보안 위협을 식별하고 대응하도록 도와드립니다.

실시간 위협 탐지 및 사고 대응을 위해 자체 규칙을 생성하거나 [기본으로 제공되는 Cloud 보안 정보와 이벤트 관리(SIEM) 규칙][4]을 활용하세요.

**네트워크 이벤트 로그**

[네트워크 이벤트 로그][5]는 네트워크 관리자가 히스토리 네트워크 이벤트를 분석하고 문제를 효율적으로 해결하도록 도와드립니다.

본 로그는 다음 토픽을 추적합니다.

* _설정 변경 사항:_ 네트워크 설정 변경 사항을 추적하여 규정을 준수하고 연결 문제를 해결합니다.
* _클라이언트 연결:_ 사용자 연결 인사이트를 얻기 위해 무선 액세스 포인트와의 클라이언트 연결을 모니터링합니다.
* _네트워크 상태 이벤트:_ 특정 스위치의 높은 패킷 손실 등, 네트워크 서비스 상태에 영향을 미치는 문제를 식별 및 해결합니다.

<br />

본 통합에 포함된 권장 모니터링 외에도 추가 모니터링을 설정하여 관리자에게 중요한 이벤트를 알려 사전 예방적인 네트워크 관리가 가능합니다.

Meraki 클라우드 컨트롤러에서 메트릭을 수집하려면 Meraki 프로필로 [SNMP 통합][6]을 설정하세요.


## 설정

### 설치

1. 앱에서 [Meraki 통합 타일][7]을 엽니다.
1. **+ 계정 추가**를 클릭합니다.
1. Meraki 계정의 이름을 선택합니다.
1. Meraki API 키를 추가합니다. Meraki API 키 생성 방법에 대한 지침은 [Cisco Meraki 대시보드 API][8]에서 확인할 수 있습니다.

### Meraki API 키 생성

1. Meraki 대시보드로 이동합니다.
2. 조직 > 설정 > 대시보드 API 액세스로 이동하여 API 액세스를 활성화합니다.
3. Meraki 대시보드의 내 프로필 페이지로 이동하여 키를 생성합니다.

### 메트릭 수집

NDM 메트릭 수집을 설정하려면 Meraki의 API 키가 필요합니다.

#### 디바이스 태그 필터

디바이스 태그 필터를 사용하면 NDM 내에서
모니터링할 디바이스를 지정할 수 있습니다. 쉼표로 구분하여 다중 태그를
지정할 수 있습니다. 태그를 지정하지 않으면 모든 디바이스가
모니터링됩니다.

### 로그 수집

네트워크 이벤트 로그 및 보안 이벤트 로그 수집을 설정하려면 Meraki의 API 키가 필요합니다.

자세한 내용은 [Cisco Meraki 대시보드 API][9]를 참조하세요.

## 수집한 데이터

### 메트릭

<div class="alert alert-info">네트워크 레벨, 디바이스 레벨, 업링크 레벨, 인터페이스(스위치 포트) 레벨 메트릭 및 태그를 포함한 네트워크 디바이스 모니터링의 Meraki 디바이스(MR, MS, MX)에 대한 데이터는 베타 버전입니다.


포트 트래픽 및 사용량에 대한 스위치 레벨 포트 메트릭은 사용할 수 없습니다.</div>

Meraki 프로필로 [SNMP 통합][6]을 설정하여 Meraki 디바이스에서 메트릭(다음 표에서 `snmp.` 접두사가 붙은 항목)을 수집합니다. 또는 [커스텀 프로필][10]을 생성하여 추가 메트릭을 수집합니다. `meraki.` 접두사가 붙은 메트릭은 앞의 지침에 따라 활성화된 Datadog Meraki 통합으로 수집됩니다.

{{< get-metrics-from-git "meraki" >}}

### 이벤트

Meraki 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Meraki 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅
Datadog 서버에서 Meraki에 액세스하는 데 문제가 발생하는 경우가 있습니다. Datadog IP를 IP 주소 허용 목록에 추가하여 크롤링이 정상적으로 작동하는지 확인하세요.

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [네트워크 디바이스 모니터링][12]
- [Datadog으로 Cisco Meraki 모니터링][13]

[1]: https://app.datadoghq.com/devices
[2]: https://app.datadoghq.com/security/home
[3]: https://developer.cisco.com/meraki/api/get-network-appliance-security-events/
[4]: https://app.datadoghq.com/logs/pipelines?search=meraki
[5]: https://developer.cisco.com/meraki/api/get-network-events/
[6]: https://docs.datadoghq.com/ko/integrations/snmp/
[7]: https://app.datadoghq.com/integrations/meraki
[8]: https://documentation.meraki.com/zGeneral_Administration/Other_Topics/The_Cisco_Meraki_Dashboard_API
[9]: https://documentation.meraki.com/General_Administration/Other_Topics/Cisco_Meraki_Dashboard_API#Enable_API_access
[10]: https://docs.datadoghq.com/ko/network_monitoring/devices/guide/build-ndm-profile/
[11]: https://docs.datadoghq.com/ko/help/
[12]: https://docs.datadoghq.com/ko/network_monitoring/devices/
[13]: https://www.datadoghq.com/blog/monitor-meraki/