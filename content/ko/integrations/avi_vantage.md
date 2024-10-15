---
app_id: avi-vantage
app_uuid: a3f11e6a-fdb7-421d-ad5c-dbfa987b8df8
assets:
  dashboards:
    Avi Vantage - Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - avi_vantage.controller_stats.avg_cpu_usage
      - avi_vantage.pool_healthscore
      - avi_vantage.service_engine_healthscore
      - avi_vantage.virtual_service_healthscore
      metadata_path: metadata.csv
      prefix: avi_vantage.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10189
    source_type_name: Avi Vantage
  monitors:
    Avi Vantage - Error Rate Monitor: assets/monitors/error_rate_monitor.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- 네트워크
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/avi_vantage/README.md
display_on_public_website: true
draft: false
git_integration_title: avi_vantage
integration_id: avi-vantage
integration_title: Avi Vantage
integration_version: 4.2.1
is_public: true
manifest_version: 2.0.0
name: avi_vantage
public_title: Avi Vantage
short_description: Avi Vantage 인스턴스의 상태와 성능을 모니터링하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - "\b카테고리::클라우드"
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Avi Vantage 인스턴스의 상태와 성능을 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Avi Vantage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 검사는 Datadog Agent를 통해 [Avi Vantage][1]를 모니터링합니다.

## 설정

호스트에서 실행 중인 에이전트의 경우 다음 지침에 따라 설치하고 구성하세요. 컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][2]에 다음 지침을 적용하는 방법이 안내되어 있습니다.

### 설치

Avi Vantage 검사는 [Datadog Agent][3] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

### 설정

1. Agent의 설정 디렉터리 루트에 있는 `conf.d/` 폴더에서 `avi_vantage.d/conf.yaml` 파일을 편집하여 avi_vantage 성능 데이터를 수집할 수 있습니다. 사용 가능한 모든 설정 옵션은 [샘플 avi_vantage.d/conf.yaml][4]을 참조하세요.

2. [에이전트를 재시작합니다][5].

### 검증

[Agent의 상태 하위 명령을 실행하고][6] Checks 섹션에서 `avi_vantage`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "avi_vantage" >}}


### 이벤트

Avi Vantage는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://avinetworks.com/why-avi/multi-cloud-load-balancing/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/datadog_checks/avi_vantage/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/assets/service_checks.json
[9]: https://docs.datadoghq.com/ko/help/