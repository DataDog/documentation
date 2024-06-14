---
app_id: cortex
app_uuid: 15baccdd-d89c-4591-ab45-e6378d8c174f
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: cortex.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10178
    source_type_name: cortex
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Cortex
  sales_email: support@getcortexapp.com
  support_email: support@getcortexapp.com
categories:
- 인시던트
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cortex/README.md
display_on_public_website: true
draft: false
git_integration_title: cortex
integration_id: cortex
integration_title: Cortex
integration_version: ''
is_public: true
kind: 통합
manifest_version: 2.0.0
name: cortex
public_title: Cortex
short_description: Cortex 대시보드에서 바로 Datadog 인시던트를 생성하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Incidents
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Cortex 대시보드에서 바로 Datadog 인시던트를 생성하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cortex
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Cortex][1] 통합을 사용하면 Cortex 대시보드에서 바로 Datadog 인시던트를 트리거할 수 있습니다.

## 설정

이 통합을 설정하려면 Cortex 계정과 Datadog API 및 애플리케이션 키를 보유하고 있어야 합니다.

### 설정

1. 현재 고객이 아니라면 Cortex에 데모를 요청하세요.
2. [Datadog API 키][2]를 생성합니다.
3. [Datadog 애플리케이션 키][3]를 생성하세요.
4. [Cortex Datadog 통합][4]에 Datadog API 및 애플리케이션 키를 추가하세요.

### 검증

1. [Cortex 홈페이지][5]로 이동합니다.
2. 기존 서비스를 클릭하거나 [새 서비스를 생성하세요][6].
3. "통합(INTEGRATIONS)" 아래의 사이드바에서 "모두 보기(See all)"를 클릭한 다음 "Datadog"를 고릅니다.
4. "인시던트(Incidents)" 위의 빨간색 "인시던트 트리거(Trigger Incident)" 버튼을 클릭합니다.
5. 형식에 정보를 작성하고 녹색 "인시던트 트리거(Trigger Incident)" 버튼을 클릭합니다.
6. "인시던트가 트리거되었습니다. 여기를 클릭해 Datadog에서 봅니다(Incident has been triggered! Click here to see it in Datadog)."라는 메시지가 화면에 나타납니다.
7. 추가로, 새로운 인시던트가 "인시던트(Incidents)" 아래에 표시됩니다.

## 수집한 데이터

### 메트릭

Cortex는 메트릭을 포함하지 않습니다.

### 서비스 점검

Cortex는 서비스 점검을 포함하지 않습니다.

### 이벤트

Cortex는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [support@getcortexapp.com][7]에 문의하세요.

[1]: https://www.getcortexapp.com/
[2]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#api-keys
[3]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#application-keys
[4]: https://app.getcortexapp.com/admin/settings/datadog
[5]: https://app.getcortexapp.com/admin/index
[6]: https://app.getcortexapp.com/admin/service/new
[7]: mailto:support@getcortexapp.com