---
app_id: lacework
app_uuid: e23af0ca-003e-4b3d-b6c5-24894b710750
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: lacework.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10079
    source_type_name: Lacework
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 보안
- 로그 수집
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/lacework/README.md
display_on_public_website: true
draft: false
git_integration_title: lacework
integration_id: lacework
integration_title: Lacework
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: lacework
public_title: Lacework
short_description: Lacework는 모든 클라우드 환경을 위한 보안 플랫폼입니다.
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - 카테고리::보안
  - Category::Log Collection
  - 제공::통합
  configuration: README.md#Setup
  description: Lacework는 모든 클라우드 환경을 위한 보안 플랫폼입니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Lacework
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Datadog-Lacework 통합을 사용하여 Lacework 로그 및 이벤트 를 Datadog로 전달합니다.

## 설정

모든 설정은 Lacework 대시보드에서 발생합니다. 설정 방법에 대한 자세한 내용은 [Lacework 설명서][1]에서 확인할 수 있습니다. Datadog는 Lacework 로그를 감지하면 자동으로 올바른 로그 처리 파이프라인을 활성화합니다.

### 설치

1. Lacework에서 _설정_으로 이동하여 _통합_을 선택합니다.
2. 왼쪽 패널의 _발신_ 섹션에서 Datadog를 선택합니다.
3. 다음 세부 정보를 입력하세요.

   - **이름**: 통합의 이름을 입력합니다. 예: `Datadog-Lacework`.
   - **Datadog 유형**: Datadog로 전송된 로그 유형을 선택합니다.

    | Datadog 유형     | 설명                                                |
    | ---------------- | ---------------------------------------------------------- |
    | `Logs Details` | Lacework 상세 로그를 Datadog 로그 플랫폼으로 전송합니다. |
    | `Logs Summary` | Datadog 로그 플랫폼에 Lacework 요약을 보냅니다.     |
    | `Events Summary` | Datadog 이벤트 플랫폼에 Lacework 요약을 보냅니다.   |

   - **Datadog 사이트**:
     - Datadog 미국 지역을 사용하는 경우 `com`을 선택합니다.
     - Datadog EU 지역을 사용하는 경우 `eu`를 선택합니다.
   - **API 키**: [Datadog API 키][2]를 입력합니다.
   - **알림 보안 수준**: 전달한 로그의 최소 로그 심각도 수준을 선택합니다.

## 수집한 데이터

### 메트릭

Lacework 통합은 메트릭을 수집하지 않습니다.

### 서비스 점검

Lacework 통합은 서비스 점검을 포함하지 않습니다.

### 로그 수집

Lacework 통합이 로그를 전송하도록 설정할 수 있습니다.

### 이벤트

Lacework 통합은 이벤트를 전송하는 데 설정할 수 있습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.lacework.net/onboarding/datadog
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.datadoghq.com/ko/help/