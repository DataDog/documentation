---
app_id: rbltracker
app_uuid: 4b512bd9-ca9d-4d6a-b4f2-5fec54ce75bc
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: rbltracker.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10007
    source_type_name: RBLTracker
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: RBL Tracker
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- security
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rbltracker/README.md
display_on_public_website: true
draft: false
git_integration_title: rbltracker
integration_id: rbltracker
integration_title: RBLTracker
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rbltracker
public_title: RBLTracker
short_description: RBLTracker는 사용하기 쉬운 실시간 블랙리스트 모니터링을 제공합니다.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Security
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: RBLTracker는 사용하기 쉬운 실시간 블랙리스트 모니터링을 제공합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: RBLTracker
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 개요

RBLTracker는 이메일, 웹사이트, 소셜 미디어에 대한 사용하기 쉬운 실시간 블랙리스트 모니터링을 제공합니다.

다음과 같이 [RBLTracker][1] 계정을 Datadog에 연결합니다.

- RBLTracker에서 대시보드로 목록 등록 이벤트를 푸시합니다.
- RBLTracker에서 대시보드로 목록 해제 이벤트를 푸시합니다.

## 설정

다음과 같이 웹훅을 사용하여 RBLTracker를 설정합니다.

1. Datadog의 **통합 -> APIs** 섹션에서 [API 키를 복사][2]합니다.
2. [RBLTracker][1]에서 RBLTracker 포털의 **관리 -> 연락처** 섹션에서 새 Datadog 연락처 유형을 생성합니다.
3. Datadog **API 키**를 붙여넣습니다.
4. (옵션) 새 연락처에 대한 연락처 일정을 조정합니다.

RBLTracker는 목록 등록 및 해제 알림을 Datadog 이벤트 대시보드로 전송합니다. 전체 통합 지침을 확인하려면 [Datadog 연락처 유형 추가하기][3]를 참조하세요.

## 수집한 데이터

### 메트릭

RBLTracker 점검에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

RBLTracker 목록 등록/해제 이벤트를 [Datadog 이벤트 스트림][4]에 푸시합니다.

### 서비스 점검

RBLTracker 점검은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://rbltracker.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://rbltracker.com/docs/adding-a-datadog-contact-type
[4]: https://docs.datadoghq.com/ko/events/
[5]: https://docs.datadoghq.com/ko/help/