---
app_id: sentry
app_uuid: c5e6ea68-6042-405f-abda-1e4fced494ee
assets:
  integration:
    auto_install: true
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 56
    source_type_name: Sentry
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- collaboration
- issue tracking
- event management
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: sentry
integration_id: sentry
integration_title: Sentry
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sentry
public_title: Sentry
short_description: Datadog 이벤트 스트림에서 Sentry 예외를 참조하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Category::Issue Tracking
  - Category::Event Management
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog 이벤트 스트림에서 Sentry 예외를 참조하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/datadog-sentry-integration-collaborative-bug-fixing/
  support: README.md#Troubleshooting
  title: Sentry
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
![sentry event][1]

## 개요

Sentry는 자체 호스트 및 클라우드 기반 애플리케이션 성능 모니터링 및 오류 추적 기능을 제공하여 소프트웨어 팀이 더 명확하게 상태를 확인하고 더 빠르게 문제를 해결하고 지속적으로 학습할 수 있도록 지원합니다. 

Datadog Sentry 통합은 자동으로 Sentry 이벤트를 Datadog 이벤트 스트림에 전달하여 오류 및 버그 수정에 대한 검색 및 의견을 제시하고 Sentry 오류를 메트릭 및 다른 시스템 데이터와 연계하도록 해줍니다.

## 설정

### 설치

Sentry 통합 설정:

1. Sentry에 로그인합니다.
2. **설정 > 프로젝트**로 이동하여 적절한 프로젝트를 선택합니다.
3. 왼쪽에서 **레거시 통합**을 선택합니다.
4. **웹훅 통합**까지 아래로 스크롤하여 슬라이더 토글을 클릭하여 활성화한 다음 **플러그인 설정**을 클릭합니다.
5. **콜백 URL'** 아래의 통합 타일에서 복사한 콜백 URL을 입력합니다.
6. **Save changes**를 클릭합니다.
7. 필요한 경우 **플러그인 활성화**를 클릭하여 통합을 활성화합니다.

기본적으로 Sentry는 새로운 예외가 발생할 때마다 (이미 기록된 새로운 인스턴스 예외가 아닌) 이벤트 데이터로 웹훅을 호출합니다. 또 다른 트리거나 추가 트리거가 필요한 경우 프로젝트 설정의 경고 섹션에서 설정할 수 있습니다.

### 오류에 호스트 이름 추가(선택 사항)

간혹 Sentry가 보고하는 서버 이름이 Datadog에서 인식하는 호스트 이름과 일치하지 않을 수 있습니다. 이 문제를 해결하려면 각 이벤트에 첨부된 `server_name` 태그에 대해 커스텀 값을 설정하세요.

Sentry의 기본값 `server_name`을 유지하면서 다른 호스트 이름을 사용하려면 이벤트에서 `hostname` 태그를 설정합니다. 특정 언어를 사용하려면 [태그 커스터마이즈][2]에 대한 Sentry 설명서를 참조하세요.

## 트러블슈팅

### Datadog에서 누락된 Sentry 오류

Sentry 오류가 Datadog에서 누락된 경우 Sentry 웹훅이 트리거되지 않는 것일 수 있습니다. 다음과 같은 시나리오가 원인일 수 있습니다.

**경고가 규칙이 트리거될 때만 전송됨**:<br>
예를 들어 규칙 조건이 " 이벤트 첫 확인 시"인 경우 새 이슈가 만들어질 때까지 경고가 전송되지 않습니다. 프로젝트에서 수신하는 고유한 이슈의 개수에 따라 다소 시간이 걸릴 수 있습니다.

**알림 통합이 비활성화됨**:<br>
규칙 동작에서 알림 통합이 특정 서비스로 활성화되어 있거나 "모든 활성화된 서비스" 아래에 포함되어 있는지 확인합니다.

## 참고 자료

- [Datadog-Sentry 통합을 통한 공동 버그 수정][3]

[1]: images/sentry.png
[2]: https://docs.sentry.io/platforms/java/enriching-events/tags/
[3]: https://www.datadoghq.com/blog/datadog-sentry-integration-collaborative-bug-fixing/