---
app_id: hasura-cloud
app_uuid: d7eb9597-f00b-48dc-9100-7afda5fe4bce
assets:
  dashboards:
    Hasura Cloud Datadog Integration Dashboard: assets/dashboards/hasura_cloud.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - hasura_cloud.requests_per_minute
      - hasura_cloud.average_execution_time
      - hasura_cloud.success_rate
      metadata_path: metadata.csv
      prefix: hasura_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10175
    source_type_name: Hasura Cloud
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Hasura
  sales_email: support@hasura.io
  support_email: support@hasura.io
categories:
- 클라우드
- 로그 수집
- 추적
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/hasura_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: hasura_cloud
integration_id: hasura-cloud
integration_title: Hasura Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: hasura_cloud
public_title: Hasura Cloud
short_description: Hasura Cloud 프로젝트 모니터링
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Log Collection
  - Category::Tracing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Hasura Cloud 프로젝트 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Hasura Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Hasura Cloud][1]는 확장 가능하고 가용성이 높으며 전 세계에 분산되어 있습니다,
안전하고 프로덕션에 바로 사용할 수 있는 GraphQL API를 데이터 소스를 통해 제공합니다.

Datadog 통합은 Hasura Cloud의 관찰 가능성 기능입니다.
Hasura Cloud 프로젝트 운영 로그, 메트릭, 트레이스를 Datadog 대시보드로 내보내는 기능입니다. 

## 설정

Hasura Cloud 프로젝트에 Hasura Cloud Datadog 통합을 설정하려면, Hasura Cloud에 Datadog API 키와 지역을 제공하세요.

Hasura Cloud 프로젝트를 위해 Datadog 통합을 설정하는 방법은 [Hasura Cloud 설명서[2]를 참조하세요.

위의 작업이 완료되면 Datadog의 [로그 섹션][3]으로 이동하여 다음 최상위 필드에 대한 패싯을 생성합니다.

* `operation_name`
* `operation_type`
* `error_code`
* `is_error`

로그에서 패싯을 생성하는 방법에 대한 자세한 정보는 [Datadog 로그 패싯 설명서][4]를 참조하세요.

로그, 메트릭, 트레이스는 프로젝트가 트래픽을 수신하면 자동으로 Datadog로 전송됩니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "hasura-cloud" >}}


### 서비스 점검

Hasura Cloud 통합은 서비스 점검에 포함되어 있지 않습니다.

### 이벤트

 Hasura Cloud 통합은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://hasura.io/cloud/
[2]: https://hasura.io/docs/latest/observability/integrations/datadog/
[3]: https://app.datadoghq.com/logs
[4]: https://docs.datadoghq.com/ko/logs/explorer/facets/#create-facets
[5]: https://docs.datadoghq.com/ko/help/