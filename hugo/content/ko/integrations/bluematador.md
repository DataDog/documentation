---
app_id: blue-matador
app_uuid: b1cfb279-ab1a-4f63-a04f-9c6508d06588
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: bluematador.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10071
    source_type_name: Blue Matador
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Blue Matador
  sales_email: support@bluematador.com
  support_email: support@bluematador.com
categories:
- events
- 자동화
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bluematador/README.md
display_on_public_website: true
draft: false
git_integration_title: bluematador
integration_id: blue-matador
integration_title: Blue Matador
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: 2.0.0
name: bluematador
public_title: Blue Matador
short_description: Blue Matador 수백 개의 알림을 자동으로 설정하고 역동적으로 유지 관리합니다.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Automation
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Blue Matador 수백 개의 알림을 자동으로 설정하고 역동적으로 유지 관리합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Blue Matador
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Blue Matador와 Datadog 통합을 이용하면 Blue Matador 이벤트를 Datadog의 이벤트 스트림으로 전송할 수 있습니다.

![eventstream_from_blue_matador][1]

기존 대시보드를 개선하거나 Datadog에서 수집 중인 메트릭 간의 상관 관계를 수립할 때 사용할 수 있습니다.

![dashboard][2]

Blue Matador에서 모니터링하면서 Datadog로 가져올 수 있는 이벤트와 메트릭의 전체 목록을 보려면 Blue Matador의 [모니터 페이지][3]를 참고하세요.

## 설정

Datadog로 Blue Matador 이벤트를 가져오려면 [Datadog API 키][4]를 사용해 Blue Matador에 새 알림 메서드를 생성하세요.

**참고**: 기존 이벤트는 Datadog로 가져오지 않으나 새 이벤트는 실시간으로 나타납니다.

## 수집한 데이터

### 메트릭

Blue Matador 통합에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

모든 이벤트는 Datadog 이벤트 스트림으로 전송됩니다.

### 서비스 검사

Blue Matador 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? 이 통합의 [유지 관리자][5]에게 연락하세요.

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bluematador/images/eventstream.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bluematador/images/dashboard.png
[3]: https://www.bluematador.com/monitored-events
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://github.com/DataDog/integrations-extras/blob/master/bluematador/manifest.json