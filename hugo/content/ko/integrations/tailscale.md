---
app_id: tailscale
app_uuid: e3f4a5cf-3594-43fc-9d4e-4e86b9c91ea2
assets:
  dashboards:
    tailscale-overview: assets/dashboards/tailscale_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10420
    source_type_name: Tailscale
  monitors:
    High Physical Traffic Received by Destination: assets/monitors/physical_traffic_received.json
    High Virtual Traffic Received by Destination: assets/monitors/virtual_traffic_received.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 보안
- log collection
- network
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/tailscale/README.md
display_on_public_website: true
draft: false
git_integration_title: tailscale
integration_id: tailscale
integration_title: Tailscale
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: tailscale
public_title: Tailscale
short_description: Datadog에서 Tailscale 감사 및 네트워크 흐름 로그를 확인하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 카테고리::보안
  - Category::Log Collection
  - Category::Network
  - 제출한 데이터 유형::로그
  - 제공::통합
  configuration: README.md#Setup
  description: Datadog에서 Tailscale 감사 및 네트워크 흐름 로그를 확인하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-tailscale-with-datadog/
  support: README.md#Support
  title: Tailscale
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Tailscale][1]은 네트워크 연결을 간소화하고 보안을 강화하는 P2P VPN 서비스입니다.

이 통합으로 다음 작업을 할 수 있습니다.

1. Tailscale 데이터 보존 관리
2. 커스텀 위젯 및 대시보드를 생성합니다.
3. 스택 내 다른 서비스의 데이터와 Tailscale 이벤트를 교차 참조

이 통합은 Tailscale에서 두 가지 로그 유형을 스트리밍합니다.

[Configuration Audit Logs][2]:

구성 감사 로그를 통해 테일넷에서 누가 언제 무엇을 했는지 파악할 수 있습니다. 이 로그에는 작업 유형, 수행자, 대상 리소스, 시간 등 테일넷 구성을 수정하는 작업이 기록됩니다.

[Network Flow logs][3]:

네트워크 흐름 로그를 통해 Tailscale 네트워크에서 어떤 노드가 다른 노드와 언제 연결되었는지 확인할 수 있습니다. 네트워크 로그를 내보내 장기 보관, 보안 분석, 위협 탐지, 인시던트 조사를 수행할 수 있습니다.

Datadog은 Tailscale 로그를 파싱한 후, 물리 및 가상 트래픽의 보안 관련 이벤트에 대한 인사이트를 기본 Tailscale 개요 대시보드에 표시합니다.

## 설정

로그 스트리밍을 활성화하는 방법:

1. Tailscale 어드민 콘솔에 로그인합니다.
2. Logs 탭으로 이동합니다.
3. **Start streaming...** 버튼을 선택합니다.
4. 메뉴에서 Datadog을 선택하고 URL + 토큰 또는 [API 키][4]를 추가합니다.
5. **Start streaming** 버튼을 선택합니다.

## 수집한 데이터

### 메트릭

Tailscale은 메트릭을 포함하지 않습니다.

### 서비스 점검

Tailscale은 서비스 점검을 포함하지 않습니다.

### 이벤트

Tailscale은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog으로 Tailscale 프라이빗 네트워크 상태 모니터링][6]

[1]: https://tailscale.com/
[2]: https://tailscale.com/kb/1203/audit-logging/
[3]: https://tailscale.com/kb/1219/network-flow-logs/
[4]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[5]: https://docs.datadoghq.com/ko/help/
[6]: https://www.datadoghq.com/blog/monitor-tailscale-with-datadog/