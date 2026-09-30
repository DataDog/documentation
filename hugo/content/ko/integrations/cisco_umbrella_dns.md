---
app_id: cisco-umbrella-dns
app_uuid: 9f98de10-9c98-4601-ae36-cbe25c4be018
assets:
  dashboards:
    Cisco Umbrella DNS - DNS Traffic: assets/dashboards/cisco_umbrella_dns_dns_traffic.json
    Cisco Umbrella DNS - Proxied Traffic: assets/dashboards/cisco_umbrella_dns_proxied_traffic.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10441
    source_type_name: cisco_umbrella_dns
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- 네트워크
- security
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_umbrella_dns/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_umbrella_dns
integration_id: cisco-umbrella-dns
integration_title: Cisco Umbrella DNS
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cisco_umbrella_dns
public_title: Cisco Umbrella DNS
short_description: Cisco Umbrella DNS 프록시 및 DNS 트래픽을 시각화하고 Cloud SIEM에 연결하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::로그 수집
  - Category::Network
  - Category::Security
  - 제출한 데이터 유형::로그
  - 제공::통합
  configuration: README.md#Setup
  description: Cisco Umbrella DNS 프록시 및 DNS 트래픽을 시각화하고 Cloud SIEM에 연결하세요.
  media:
  - caption: Cisco Umbrella DNS - DNS 트래픽
    image_url: images/cisco_umbrella_dns_dns_traffic.png
    media_type: image
  - caption: Cisco Umbrella DNS - 프록시 트래픽
    image_url: images/cisco_umbrella_dns_proxied_traffic.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Umbrella DNS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

[Cisco Umbrella][1]는 네트워크 DNS 보안 모니터링을 위한 강력한 플랫폼입니다. Umbrella의 DNS 계층 보안은 빠르고 간편한 보안 강화 방법을 제공하여 네트워크 안팎의 사용자에게 향상된 가시성과 보안을 제공합니다. Umbrella DNS 계층 보안은 모든 포트 또는 프로토콜을 통한 위협이 네트워크 또는 엔드포인트에 도달하기 전에 차단함으로써 1억 명 이상의 사용자에게 가장 안전하고 안정적이며 빠른 인터넷 환경을 제공하는 것을 목표로 합니다.

Cisco Umbrella DNS 통합은 DNS 및 Proxy  로그를 수집하여 Datadog으로 전송합니다. 기본 로그 파이프라인을 사용하여 로그를 분석하고 보강하여 검색 및 분석이 용이하도록 합니다. 이 통합에는 총 DNS 요청 수, 허용/차단된 도메인 수, 상위 차단 카테고리, 시간 경과에 따른 프록시 트래픽 등을 시각화하는 여러 대시보드가 ​​포함되어 있습니다. Datadog Cloud SIEM을 사용하는 경우, Umbrella DNS 로그는 위협 인텔리전스를 통해 분석되어 일반적인 공격 대상과 일치하는지 확인합니다. DNS 로그는 위협 추적 및 조사 과정에서 다른 출처의 로그를 보완하는 데에도 유용합니다.

## 설정

### 구성

#### Cisco Umbrella DNS 구성하기

1. 크리덴셜을 사용하여 [**Umbrella**][2]에 로그인합니다.
2. 왼쪽 패널에서 **Admin**을 선택합니다.
3. **API Keys**를 선택합니다.
4. 새 API Key를 생성합니다.
5. API 키에 `reports.aggregations:read` 및 `reports.granularEvents:read` 키 범위를 적용합니다.
6. 다음 구성 단계에서 사용될 API Key와 Key Secret을 복사합니다.

#### Cisco Umbrella DNS Datadog 통합 구성하기

Cisco Umbrella DNS 이벤트를 로그로 Datadog에 전달하도록 Datadog 엔드포인트를 구성합니다.

1. `Cisco Umbrella DNS`로 이동합니다.
2. Cisco Umbrella DNS 크리덴셜을 추가합니다.

| Cisco Umbrella DNS 파라미터 | 설명                                                                |
| ----------------------------- | -------------------------------------------------------------------------- |
| API Key                       | Cisco Umbrella의 API Key.                                           |
| Key Secret                    | Cisco Umbrella의 Key Secret.                                        |

## 수집한 데이터

### 로그

통합을 통해 Cisco Umbrella DNS 및 Proxy 로그를 수집하여 Datadog에 전달합니다.

### 메트릭

Cisco Umbrella DNS 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Cisco Umbrella DNS 통합은 이벤트를 포함하지 않습니다.

## 지원

추가 지원이 필요하시면 [Datadog 지원팀][3]에 문의하세요.

[1]: https://umbrella.cisco.com/
[2]: https://login.umbrella.com/
[3]: https://docs.datadoghq.com/ko/help/