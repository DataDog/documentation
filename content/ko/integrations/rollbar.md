---
app_id: rollbar
app_uuid: 63175032-65a1-4bc8-82da-251a27005f1f
assets:
  integration:
    auto_install: true
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 137
    source_type_name: Rollbar
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- issue tracking
- notifications
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rollbar
integration_id: rollbar
integration_title: Rollbar
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rollbar
public_title: Rollbar
short_description: Datadog 이벤트 스트림에 예외, 오류 및 코드 배포를 전송하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::로그 수집
  - Category::Issue Tracking
  - Category::알림
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog 이벤트 스트림에 예외, 오류 및 코드 배포를 전송하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Rollbar
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
![Rollbar error event][1]

## 개요

Rollbar는 개발자가 더 향상된 소프트웨어를 더 빠르게 빌드할 수 있도록 해줍니다. Rollbar를 사용하면 개발자는 단 한 곳에서 모든 프레임워크, 플랫폼 및 환경의 예외를 확인할 수 있습니다.

Rollbar를 Datadog에 연결하면 다음 이점을 누릴 수 있습니다.

- 이벤트 탐색기에서 예외, 오류, 코드 배포에 대한 알림을 받습니다.
- 심각도, 환경, 호스트, 사용자 등별로 알림을 필터링합니다.
- 그래프에서 예외 검색하기
- 팀과 예외에 관해 논의하기
- 디버깅 문제로 더 적은 시간을 소비합니다.

## 설정

### 설치

1. [Rollbar 통합 타일][2]로 이동하여 **통합 설치**를 클릭합니다.
2. 통합 타일에서 기존 API 키를 선택하거나 이 통합에 대한 새로운 키를 생성합니다.

### 구성

설정은 Rollbar에서 프로젝트별로 구성됩니다.

1. Rollbar에서 프로젝트 페이지로 이동합니다.
2. 더하기 버튼 **\[ + \]**을 클릭하여 통합을 프로젝트에 추가합니다.

   ![Rollbar 프로젝트 페이지][3]

3. 목록에서 Datadog를 선택합니다.
4. Datadog의 Rollbar 통합 타일에서 API 키를 복사하여 Rollbar의 API 키 상자에 붙여넣기합니다.

이때 "테스트 알림 전송" 버튼을 클릭하여 설정이 적절한지 확인합니다. 클릭한 다음,  [이벤트 탐색기][4]에서 Rollbar의 이벤트를 확인할 수 있습니다.

## 수집한 데이터

### 메트릭

Rollbar 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Rollbar 통합은 예외, 오류 및 코드 배포를 Datadog에 이벤트로 푸시합니다.

### 서비스 점검

Rollbar 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: images/rollbar_error.png
[2]: https://app.datadoghq.com/account/settings#integrations/rollbar
[3]: images/rollover_project.png
[4]: https://app.datadoghq.com/event/explorer
[5]: https://docs.datadoghq.com/ko/help/