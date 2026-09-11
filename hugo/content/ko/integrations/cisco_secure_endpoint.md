---
app_id: cisco-secure-endpoint
app_uuid: 9636c2eb-34f6-4aa4-a236-c39e47b21c79
assets:
  dashboards:
    Cisco Secure Endpoint - Audit: assets/dashboards/cisco_secure_endpoint_audit.json
    Cisco Secure Endpoint - Event: assets/dashboards/cisco_secure_endpoint_event.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18601889
    source_type_name: Cisco Secure Endpoint
  logs:
    source: cisco-secure-endpoint
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- security
- 클라우드
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_secure_endpoint/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_secure_endpoint
integration_id: cisco-secure-endpoint
integration_title: Cisco Secure Endpoint
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cisco_secure_endpoint
public_title: Cisco Secure Endpoint
short_description: Cisco Secure Endpoint Audit 및 Event 로그에 관한 인사이트를 얻으세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Category::Cloud
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Cisco Secure Endpoint Audit 및 Event 로그에 대한 인사이트를 얻어보세요.
  media:
  - caption: Cisco Secure Endpoint - 감사
    image_url: images/cisco_secure_endpoint_audit.png
    media_type: 이미지
  - caption: Cisco Secure Endpoint - 이벤트
    image_url: images/cisco_secure_endpoint_event.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Secure Endpoint
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 개요

[Cisco Secure Endpoint][1]는 엔드포인트에 관한 위협을 방어하기 위해 포괄적 보호, 탐지, 대응, 사용자 액세스 범위를 제공하는 단일 에이전트 솔루션입니다. Cisco Secure Endpoint는 실시간으로 악의적인 활동을 탐지하고 무력화하여 디지털 자산을 강력하게 보호합니다.

본 통합은 다음 로그를 수집합니다.
- 감사: 감사 로그는 Cisco Secure Endpoint 콘솔에서 사용자가 실행한 활동 정보를 제공합니다.
- 이벤트: 이벤트 로그는 보안 이벤트를 추적하여 잠재적인 위협을 신속하게 탐지, 대응, 분석하는 데 필수적입니다.

Cisco Secure Endpoint 통합 기능은 Cisco Cisco Secure Endpoint의 감사 및 이벤트 로그에 관한 인사이트를 확보하고 필요한 조치를 신속하게 취할 수 있도록 기본 대시보드를 제공합니다. 또한, 잠재적 보안 위협을 효과적으로 모니터링하고 대응할 수 있도록 기본 탐지 규칙도 제공합니다.

**주의사항**: 개인 정보를 포함한 데이터가 수집될 수 있는 이 통합 기능의 사용은 Datadog과의 계약에 따라 이루어집니다. Cisco는 통합 기능을 사용함으로써 전송되는 개인 정보를 포함한 모든 최종 사용자 정보의 개인정보보호, 보안 또는 무결성에 대해 책임을 지지 않습니다.

## 설정

### Cisco Secure Endpoint에서 API 자격 증명 생성하기

1. Cisco Secure Endpoint Console에 로그인하고 좌측 메뉴 패널로 이동합니다.
2. `Administration`을 선택한 다음 `Organization Settings`을 선택합니다.
3. `Features` 섹션의 `Configure API Credentials`를 클릭하여 새 API 자격 증명을 생성합니다.
4. `Legacy API Credentials (version 0 and 1)` 섹션 우측의 `New API Credentials` 버튼을 클릭합니다.
5. 팝업 모달에 다음 정보를 추가합니다.
    - 애플리케이션 이름: 원하는 이름을 입력합니다.
    - 범위: `Read-only`를 선택합니다.
    - `Create`를 클릭합니다.
    - **Create**을 클릭하면 리디렉션된 페이지에 클라이언트 ID(타사 API 클라이언트 ID 등)와 API 키 값이 표시됩니다.

### Cisco Secure Endpoint 계정을 Datadog에 연결

1. Cisco Secure Endpoint 자격 증명을 추가합니다.

    | 파라미터 | 설명  |
    | ---------- | ------------ |
    | API 도메인 이름 | Cisco Secure Endpoint Cloud의 API 도메인 이름은 'api.\<region\>.amp.cisco.com'입니다. Cisco Secure Endpoint 서버의 리전에 따라 'region' 부분을 조정합니다. Cisco Secure Endpoint가 VPC(Virtual Private Cloud)에서 호스팅된다면 API 도메인 이름을 직접 입력합니다. |
    | 클라이언트 ID | Cisco Secure Endpoint 클라이언트 ID입니다. |
    | API 키 | Cisco Secure Endpoint의 API 키입니다. |
    | 엔드포인트 세부 정보 가져오기 | Cisco Secure Endpoint 이벤트 로그용 엔드포인트 메타데이터를 수집하려면 기본값을 'True'로 그대로 둡니다. 그렇지 않으면 'false'로 설정합니다. |

2. Save 버튼을 클릭하여 설정을 저장합니다.

## 수집한 데이터

### 로그

Cisco Secure Endpoint 통합은 Cisco Secure Endpoint 감사 및 이벤트 로그를 수집하여 Datadog에 전달합니다.

### 메트릭

Cisco Secure Endpoint 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Cisco Secure Endpoint 통합은 이벤트를 포함하지 않습니다.

## 지원

추가 지원이 필요하시면 [Datadog 지원팀][2]에 문의하세요.

[1]: https://www.cisco.com/site/in/en/products/security/endpoint-security/secure-endpoint/index.html
[2]: https://docs.datadoghq.com/ko/help/