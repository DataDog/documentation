---
app_id: datazoom
app_uuid: 3c289cc6-b148-4e99-98ae-66c01386f767
assets:
  dashboards:
    Datazoom Overview: assets/dashboards/datazoom_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: datazoom.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10260
    source_type_name: Datazoom
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/datazoom/README.md
display_on_public_website: true
draft: false
git_integration_title: datazoom
integration_id: datazoom
integration_title: Datazoom
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: datazoom
public_title: Datazoom
short_description: 로그 탐색기에서 Datazoom 컬렉터(Collector) 데이터를 확인합니다.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 로그 탐색기에서 Datazoom 컬렉터(Collector) 데이터를 확인합니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-datazoom/
  support: README.md#Support
  title: Datazoom
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Datazoom은 컬렉터 에코시스템을 통해 엔드포인트에서 데이터를 수집하는 비디오 데이터 플랫폼입니다.

[Datazoom Datadog 커넥터][1]는 컬렉터(Collector) 데이터를 Datadog으로 전송하며, [로그 탐색기][2] 데이터를 쿼리할 수 있습니다.

Datazoom은 정보 수준에서 데이터 세트를 전송합니다.

## 설정

### 설치

Datazoom 통합은 Datadog으로 로그를 내보냅니다. Datadog에 설치할 필요가 없습니다.

### 설정

- Datazoom Datadog 커넥터를 설정하는 방법에 대한 자세한 내용을 확인하려면 Datazoom의 통합 [문서][1]를 참조하세요.

### 대시보드

[Datazoom 로그 대시보드][3]를 참조하세요.

## 수집한 데이터

### 메트릭

Datazoom은 메트릭을 포함하지 않습니다.

### 서비스 점검

Datazoom은 서비스 점검을 포함하지 않습니다.

### 이벤트

Datazoom은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [블로그: Datadog으로 Datazoom 텔레메트리 모니터링하기][5]

[1]: https://help.datazoom.io/hc/en-us/articles/360042494512-Datadog
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/dashboard/lists/preset/3?q=datazoom
[4]: https://docs.datadoghq.com/ko/help/
[5]: https://www.datadoghq.com/blog/monitor-datazoom/