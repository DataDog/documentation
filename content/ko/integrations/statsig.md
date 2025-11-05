---
app_id: statsig
app_uuid: 57fb9235-151d-4ed9-b15e-a3e6f918dcca
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: statsig.log_event.count
      metadata_path: metadata.csv
      prefix: statsig.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10180
    source_type_name: Statsig
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Statsig
  sales_email: support@statsig.com
  support_email: support@statsig.com
categories:
- 설정 및 배포
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/statsig/README.md
display_on_public_website: true
draft: false
git_integration_title: statsig
integration_id: statsig
integration_title: Statsig
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: statsig
public_title: Statsig
short_description: Datadog에서 Statsig 변경 모니터링
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Datadog에서 Statsig 변경 모니터링
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/feature-monitoring-statsig-datadog-marketplace/
  support: README.md#Support
  title: Statsig
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Datadog-Statsig 통합은 Statsig가 이벤트와 메트릭을 전송하여 제품과 서비스를 모니터링하고, 기능 게이트 롤아웃이나 구성 변경이 나머지 생태계에 미치는 영향을 시각화할 수 있도록 지원합니다.

## 설정

### 설치

Statsig 통합을 설정하는 데 설치가 필요하지 않습니다.

### 구성

1. Datadog API 키를 복사합니다.
2. [Statsig 콘솔에서 통합 탭으로 이동합니다][1].
3. Datadog 카드를 클릭합니다.
4. 상위 필드에 API 키를 붙여넣기하고 확인을 클릭합니다.

## 수집한 데이터

Statsig 통합은 Datadog에서 어떠한 데이터도 수집하지 않습니다.

### 메트릭
{{< get-metrics-from-git "statsig" >}}


### 서비스 점검

Statsig 통합에는 서비스 점검이 포함되지 않습니다.

### 이벤트

Statsig 통합은 Statsig에서 Datadog로 구성 변경 이벤트를 전송합니다. 예를 들어 업데이트된 기능 게이트나 새로운 통합을 전송합니다.

## 트러블슈팅

도움이 필요하세요? [Statsig 지원팀][3]에 문의하거나 [Statsig 웹사이트][4]를 참조하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Marketplace에서 Statsig 제공 내역을 통해 기능 릴리스를 모니터링하세요.][5]

[1]: https://console.statsig.com/integrations
[2]: https://github.com/DataDog/integrations-extras/blob/master/statsig/metadata.csv
[3]: mailto:support@statsig.com
[4]: https://www.statsig.com/contact
[5]: https://www.datadoghq.com/blog/feature-monitoring-statsig-datadog-marketplace/