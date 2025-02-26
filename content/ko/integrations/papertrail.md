---
app_id: papertrail
app_uuid: 630c6ff6-e853-4ef7-8be4-371a55269208
assets:
  integration:
    auto_install: true
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 147
    source_type_name: PaperTrail
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- event management
- notifications
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: papertrail
integration_id: papertrail
integration_title: Papertrail
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: papertrail
public_title: 페이퍼트레일
short_description: Datadog 이벤트 스트림에서 Papertrail를 확인하고 검색하고 논의하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Event Management
  - Category::알림
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog 이벤트 스트림에서 Papertrail를 확인하고 검색하고 논의하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Papertrail
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
![Papertrail 예시][1]

## 개요

Papertrail 및 Datadog를 다음 경우에 사용합니다.

- 자유 형식의 로그 데이터를 실행 가능한 메트릭으로 전환합니다.
- 운영 지식의 사일로화를 방지합니다. 로그 기반의 메트릭와 앱/시스템 수준 메트릭을 확인하고 연계하세요.

## 설정

### 설치

Papertrail에서 메트릭 을 캡처하려면,

1. Papertrail의 [이벤트 뷰어][2]에서 그래프화해야하는 로그 이벤트에 대한 검색을 저장합니다.
2. 검색의 이름을 입력하고 **알람 저장 및 설정** 버튼을 클릭합니다.
3. 그래프화 및 메트릭에서 Datadog를 선택합니다.
    ![Papertrail 알림][3]

4. 알림 빈도 및 기타 세부 정보를 선택합니다.
5. Datadog API 키를 제공하고 메트릭 이름을 입력한 다음 선택적으로 태그를 입력하여 메트릭과 연결합니다.
    ![Papertrail 알림][4]

6. **알림 생성** 버튼을 클릭합니다.

Papertrail은 선택한 간격으로 Datadog를 업데이트합니다.

### 구성

이 통합에 대해 설정 단계가 필요하지 않습니다.

## 수집한 데이터

### 메트릭

 Papertrail 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Papertrail 통합은 이벤트를 수집합니다.

### 서비스 점검

Papertrail 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: images/papertrailexample.png
[2]: https://papertrailapp.com/events
[3]: images/papertrailnotify.png
[4]: images/papertraildetails.png
[5]: https://docs.datadoghq.com/ko/help/