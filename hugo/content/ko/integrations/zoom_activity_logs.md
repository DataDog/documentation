---
app_id: zoom-activity-logs
app_uuid: 2297e963-5129-4711-bf04-767d5c929f5e
assets:
  dashboards:
    zoom-activity-logs: assets/dashboards/zoom_activity_logs_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10394
    source_type_name: Zoom Activity Logs
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
git_integration_title: zoom_activity_logs
integration_id: zoom-activity-logs
integration_title: Zoom Activity Logs
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: zoom_activity_logs
public_title: Zoom Activity Log
short_description: Zoom에서 작업 및 활동 로그 소비
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
  - 지원되는 OS::Linux
  - 지원되는 OS::Windows
  - 지원되는 OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Zoom에서 작업 및 활동 로그 소비
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Zoom Activity Log
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 개요
이 통합은 Zoom Activity Log 컬렉션을 활성화하여 Zoom 계정 내 활동을 캡처합니다. 이를 통해 다음과 같은 작업이 가능합니다.

- 환경 내 다른 서비스에서 데이터와 Zoom 이벤트를 상호 참조합니다.
- Zoom 이벤트 데이터를 사용해 커스텀 위젯과 대시보드를 빌드합니다.
- 실시간 사용 가능한 로그 파이프라인을 사용해 [Cloud SIEM][1] 탐지 규칙을 설정합니다.

Datadog의 Zoom 통합에서는 [로그인 및 로그아웃 활동][1] 및 [작업 로그][2]를 사용하여 로그를 수집하기 때문에 관리자 및 사용자 활동에 관한 인사이트를 얻을 수 있습니다. 여기에는 다음이 포함됩니다.
  - 새로운 사용자 추가
  - 계정 설정 변경
  - 레코딩 삭제
  - 로그인 및 로그아웃 활동


## 설정

### 설치

1. 통합 페이지로 이동하여 "Zoom Activity Log" 통합을 검색합니다.
3. 타일을 클릭합니다.
4. 통합을 설치할 계정을 추가하려면 "Add Account" 버튼을 클릭합니다.
5. 모달에서 지침을 읽은 후 "Authorize" 버튼을 클릭하면 Zoom 로그인 페이지로 이동합니다.
6. Zoom 관리자 계정을 사용해 Zoom에 로그인합니다. 
7. 감사 데이터를 확인할 수 있는  
`report:read:admin` 범위에 액세스를 요청하는 화면이 나타나면 "Accept"를 클릭합니다.
8. 새 계정을 사용하면 Datadog Zoom Activity Log 타일로 다시 리디렉션됩니다. 'Account Name'을 기억하기 쉬운 이름으로 변경하는 것이 좋습니다.


## 권한

Zoom용 Datadog는 다음 OAuth 범위를 필요로 합니다. 자세한 정보는 [Zoom OAuth 범위 설명서][3]를 참조하세요.

### 사용자 수준 범위

| 범위                   | 요청 이유                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------------|
| `report:read:admin`          | 새 사용자 추가, 계절 설정 변경, 레코딩 삭제와 같은 이벤트를 포함하는 감사 관리자 및 사용자 활동 로그를 읽습니다. Zoom 계정 아래에서 사용자의 로그인/로그아웃 활동을 읽습니다.                        |


### 앱 제거하기
Zoom Activity Log 통합을 설치 제거하려면 Zoom Activity Log 타일로 이동한 다음 계정 표에 나타나는 기존 계정을 모두 삭제합니다.


## 수집한 데이터

### 메트릭

Zoom Activity Log는 메트릭을 포함하지 않습니다.

### 서비스 점검

Zoom Activity Log는 서비스 점검을 포함하지 않습니다.

### 로그
Zoom Activity Log는 Zoom [로그인 및 로그아웃 활동][1] 및 [작업 로그][2] 엔드포인트에서 데이터를 수집합니다.

### 이벤트

Zoom Activity Log는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.


[1]: https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/reportSignInSignOutActivities
[2]: https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/reportOperationLogs
[3]: https://developers.zoom.us/docs/integrations/oauth-scopes-granular/#reports
[4]: https://docs.datadoghq.com/ko/help/