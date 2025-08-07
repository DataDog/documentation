---
app_id: cisco-duo
app_uuid: 8d3e0e2f-df52-4a12-a976-3ded71553a3a
assets:
  dashboards:
    Cisco Duo - Activity Logs: assets/dashboards/cisco_duo_activity_logs.json
    Cisco Duo - Administrator Logs: assets/dashboards/cisco_duo_administrator_logs.json
    Cisco Duo - Authentication Logs: assets/dashboards/cisco_duo_authentication_logs.json
    Cisco Duo - Offline Enrollment Logs: assets/dashboards/cisco_duo_offline_enrollment_logs.json
    Cisco Duo - Telephony Logs: assets/dashboards/cisco_duo_telephony_logs.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6576439
    source_type_name: cisco-duo
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- 보안
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_duo/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_duo
integration_id: cisco-duo
integration_title: Cisco Duo
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cisco_duo
public_title: Cisco Duo
short_description: Cisco Duo 로그에서 인사이트를 얻으세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::로그 수집
  - Category::Security
  - 제출한 데이터 유형::로그
  - 제공::통합
  configuration: README.md#Setup
  description: Cisco Duo 로그에서 인사이트를 얻으세요.
  media:
  - caption: Cisco Duo - 인증 로그
    image_url: images/cisco_duo_authentication_logs.png
    media_type: image
  - caption: Cisco Duo - 활동 로그
    image_url: images/cisco_duo_activity_logs.png
    media_type: image
  - caption: Cisco Duo - 관리자 로그
    image_url: images/cisco_duo_administrator_logs.png
    media_type: image
  - caption: Cisco Duo - 텔레포니 로그
    image_url: images/cisco_duo_telephony_logs.png
    media_type: image
  - caption: Cisco Duo - 오프라인 등록 로그
    image_url: images/cisco_duo_offline_enrollment_logs.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Duo
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 개요

[Cisco Duo][1]는 다단계 인증(MFA) 및 보안 액세스 솔루션입니다. 사용자가 애플리케이션이나 시스템에 액세스하기 전 모바일 앱과 같은 두 번째 인증 수단으로 신원을 확인하도록 요청하여 보안 레이어를 추가합니다. Duo는 원격 액세스의 보안을 강화하는 데 자주 사용되며, 비밀번호가 유출되더라도 무단 액세스를 방지하도록 도와드립니다.

본 통합은 다음 로그를 수집합니다.
- 인증
- Activity
- 관리자
- 텔레포니
- 오프라인 등록

Cisco Duo 통합은 다단계 인증(MFA) 및 보안 액세스 로그를 원활하게 수집하여 Datadog으로 전송해 분석합니다. 기본 제공 로그 파이프라인을 활용하면 해당 로그를 파싱 및 보강하여 쉽게 검색 및 분석할 수 있습니다. 이 통합은 즉시 사용 가능한 대시보드로 부정 인증 이벤트, 인증 활동 타임라인, 액세스한 위치, 인증 장치 등 다양한 항목에 대한 인사이트를 제공합니다.

## 설정

### 구성

#### Cisco Duo API 자격 증명 가져오기

1. [**Duo account**][2]에 가입합니다.
2. [**Duo Admin Panel**][3]에 로그인합니다.
3. **Applications**으로 이동합니다.
4. 애플리케이션 목록에서 **Protect an Application**를 클릭하고 _Admin API_ 엔트리를 찾습니다.
6. **Protect**를 클릭하여 애플리케이션을 구성하고 `integration key`, `secret key`, `API hostname`를 불러옵니다. 해당 정보는 Cisco Duo 통합을 구성하는 데 사용됩니다.
7. _Grant read log_ 권한을 선택했는지 확인하고 **Save Changes**를 클릭합니다.

#### Cisco Duo Datadog 통합 구성

Datadog 엔드포인트를 구성하여 Cisco Duo 로그를 Datadog으로 포워딩합니다.

1. `Cisco Duo`로 이동합니다.
2. Cisco Duo 자격 증명을 추가합니다.

| Cisco Duo 파라미터 | 설명  |
| -------------------- | ------------ |
| 호스트                 | Cisco Duo의 API 호스트 이름입니다. `https://api-XXXXXXXX.duosecurity.com` 의 `XXXXXXXX` 부분입니다.  |
| 통합 키      | Cisco Duo의 통합 키입니다.    |
| 시크릿 키           | Cisco Duo의 시크릿 키입니다.         |

## 수집한 데이터

### 로그

Cisco Duo 통합은 Cisco Duo 인증, 활동, 관리자, 텔레포니 및 오프라인 등록 로그를 수집하여 Datadog에 전달합니다.

### 메트릭

Cisco Duo 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Cisco Duo 통합은 이벤트를 포함하지 않습니다.

## 지원

추가로 도움이 필요하면 [Datadog 지원 팀][4]에 문의하세요.

[1]: https://duo.com/
[2]: https://signup.duo.com/
[3]: https://admin.duosecurity.com/
[4]: https://docs.datadoghq.com/ko/help/