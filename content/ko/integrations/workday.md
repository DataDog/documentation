---
app_id: workday
app_uuid: 011547b7-572e-481a-988a-69c1ad8c6779
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10381
    source_type_name: Workday
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- 보안
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: workday
integration_id: workday
integration_title: Workday User Activity Logs
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: workday
public_title: Workday User Activity Logs
short_description: Datadog에서 규정 준수 및 Cloud SIEM 분석을 위한 Workday 로그를 확인하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - 카테고리::보안
  - 제출한 데이터 유형::로그
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Datadog에서 규정 준수 및 Cloud SIEM 분석을 위한 Workday 로그를 확인하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Workday User Activity Logs
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

이 통합으로 Workday User Activity Logs를 수집하여 Workday 테넌트 내의 사용자 활동을 파악할 수 있습니다. 구체적인 작업은 다음과 같습니다.

- Workday 데이터 보존을 관리합니다.
- 커스텀 위젯 및 대시보드를 생성합니다.
- [기본 Logs Pipeline][2]을 사용하여 [Cloud SIEM][1] 탐지 규칙을 설정합니다.
- Workday 이벤트를 스택 전반의 다른 서비스 데이터와 교차 확인합니다.

Datadog의 Workday 통합은 [Workday의 User Activity Logging API][3]를 사용하여 로그를 수집합니다. 이를 통해 생성된 로그는 다음 인사이트를 제공합니다.

- Workday에서 요청을 생성하는 사용자가 누구인지
- 어떤 유형의 요청인지
- 전체 요청 건수
- 이벤트와 관련된 기타 메타데이터(예: 디바이스 유형, IP 주소 등)

## 설정

### 설치

**1단계: 테넌트 수준에서 User Activity Logging 활성화**

1. **Edit Tenant Setup - System** 작업에 액세스하여 **Enable User Activity Logging** 체크박스가 선택되어 있는지 확인합니다.
2. **Edit Tenant Setup - Security** 작업에 액세스하여 **OAuth 2.0 Clients Enabled** 체크박스가 선택되어 있는지 확인합니다.

**2단계: Integration System User 생성**

1. **Create Integration System User** 작업에 액세스합니다.
   - Username: < ISU_Datadog >
   - Session Timeout Minutes: 0(세션 만료 비활성화)
   - Don't Allow UI Sessions: Yes(이 체크박스 선택)
2. **Create Security Group** 작업에 액세스합니다.
   - Type of Tenanted Security Group: Integration System Security Group (Unconstrained)
   - Name: < ISSG_Datadog_Monitoring >
3. 방금 생성한 그룹에 대한 **Edit Integration System Security Group** (Unconstrained) 작업에 액세스합니다.
   - Integration System Users: < ISU_Datadog >
4. 도메인 System Auditing에 대한 **View Domain** 작업에 액세스합니다.
5. System Auditing 관련 작업 메뉴에서 Domain > Edit Security Policy Permissions를 선택합니다.
6. 두 테이블에 생성한 Remote Security Monitoring을 추가합니다.
   - Report/Task Permissions 테이블: View access
   - Integration Permissions 테이블: Get access
7. Activate Pending Security Policy Changes 작업에 액세스하여 변경한 사항을 활성화합니다.

**3단계: 테넌트에 통합하기 위한 API 클라이언트 등록**

1. **Register API Clients for Integrations** 작업에 액세스하여 클라이언트를 등록합니다.
   - Client Name: < Datadog User Activity Monitor >
   - Non-Expiring Refresh Tokens: Yes
   - Scope: System

**4단계: Datadog에서 모니터를 설정하기 위해 필요한 구성 값 가져오기**

1. View API Clients 작업에 액세스하고 API Clients for Integrations 탭을 선택한 후 다음 설정을 확인합니다.
   - Client Grant Type: Authorization Code Grant
   - Access Token Type: Bearer
2. 다음 네 가지 값을 복사하여 저장합니다(처음 두 값은 페이지 맨 위에 있습니다).
   - Workday REST API Endpoint
   - Token Endpoint
   - Client ID
   - Client Secret
3. Client 관련 작업 메뉴에서 **API Client > Manage Refresh Token for Integrations**를 선택합니다.
   - Workday Account:< ISU_Datadog >
4. **Generate New Refresh Token** 체크박스를 선택한 다음 해당 토큰을 저장합니다.
5. Datadog 통합을 생성합니다.
   - 저장한 값을  Datadog Configuration 탭에 입력합니다.
   - URL의 도메인 부분을 입력합니다: **https://DOMAIN/**

## 수집한 데이터

### 메트릭

Workday는 메트릭을 포함하지 않습니다.

### 로그

### 이벤트

Workday 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "workday" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://app.datadoghq.com/security/home
[2]: https://app.datadoghq.com/logs/pipelines?search=workday
[3]: https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#privacy/v1/get-/activityLogging
[4]: https://github.com/DataDog/integrations-internal-core/blob/master/workday/assets/service_checks.json
[5]: https://docs.datadoghq.com/ko/help/