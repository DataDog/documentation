---
app_id: perimeterx
app_uuid: 47527216-ad8e-454b-8291-494f05c2d5c9
assets:
  dashboards:
    PerimeterX Overview: assets/dashboards/PerimeterX_Bot_Defender_Dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: perimeterx.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10105
    source_type_name: PerimeterX
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: PerimeterX
  sales_email: support@perimeterx.com
  support_email: support@perimeterx.com
categories:
- 로그 수집
- 보안
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/perimeterx/README.md
display_on_public_website: true
draft: false
git_integration_title: perimeterx
integration_id: perimeterx
integration_title: PerimeterX
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: perimeterx
public_title: PerimeterX
short_description: PerimeterX 로그 및 메트릭을 Datadog와 통합하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - 카테고리::보안
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: PerimeterX 로그 및 메트릭을 Datadog와 통합하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: PerimeterX
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 통합을 통해 [PerimeterX][1] 고객은 PerimeterX 관련 로그 및 이벤트를 Datadog로 전달할 수 있습니다.

## 설정

모든 설정은 PerimeterX에서 수행합니다. 타사 통합의 경우 [PerimeterX 설명서][2]를 참조하세요.

### 설치

호스트에 설치할 필요가 없습니다.

### 구성

1. [Datadog 포털][3]에서 새 통합 API 키를 생성합니다.
2. [PerimeterX 지원][4]으로 지원 티켓을 열고 Datadog 로그 내보내기 통합을 요청하세요. 지원 팀에서는 다음 정보가 필요합니다.
   - Datadog 통합 API 키
   - 메트릭 및/또는 로그 전송을 원하는지 여부
   - Datadog에 전달해야 할 PerimeterX 애플리케이션 ID

### 검증

PerimeterX 지원팀에서 Datadog 통합이 완료되었음을 확인하면 다음 단계를 수행하여 통합이 예상대로 작동하는지 확인합니다.

1. Datadog 포털에 로그인합니다.
2. 로그 -> 검색으로 이동합니다.
3. "Source:perimeterx" 필터 쿼리로 검색을 수행합니다.
4. PerimeterX에서 로그를 수신 중인지 확인합니다(로그 시작 표시까지 몇 분이 소요될 수 있음).

## 수집한 데이터

### 메트릭

PerimeterX에는 [요청][5]에 대한 메트릭이 포함되어 있지 않습니다.

### 서비스 점검

PerimeterX에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

PerimeterX에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][6]에 문의하세요.

[1]: https://www.perimeterx.com/
[2]: https://edocs.humansecurity.com/docs/configuring-the-export-via-portal
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: mailto:support@perimeterx.com
[5]: https://docs.perimeterx.com/pxconsole/docs/data-schema-metrics
[6]: https://docs.datadoghq.com/ko/help/