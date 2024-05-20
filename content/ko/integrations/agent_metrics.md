---
app_id: datadog-agent
app_uuid: 4af17310-84ad-4bac-b05d-85917bc378cb
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: datadog.agent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Agent Metrics
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/agent_metrics/README.md
display_on_public_website: true
draft: false
git_integration_title: agent_metrics
integration_id: datadog-agent
integration_title: Agent Metrics
integration_version: ''
is_public: true
kind: 통합
manifest_version: 2.0.0
name: agent_metrics
public_title: Agent Metrics
short_description: agent_metrics description.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  configuration: README.md#Setup
  description: agent_metrics description.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Agent Metrics
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Datadog Agent의 내부 메트릭으로 Datadog에서 시각화 및 모니터를 생성합니다.

**참고:** 이 통합으로 수집된 메트릭 목록은 부 Agent 버전에 따라 변경될 수 있습니다. 이러한 변경 사항은 Agent의 변경 로그에 언급되지 않을 수 있습니다.

## 설정

### 설치

[go_expvar][1] 검사를 기반으로 하는 Agent Metrics 통합은 [Datadog Agent][2] 패키지에 포함되어 있으므로 서버에 다른 것을 설치할 필요가 없습니다.

### 설정

1. [Agent의 설정 디렉터리][4] 루트의 `conf.d/`  폴더에 있는 [`go_expvar.d/agent_stats.yaml.example`][3] 파일의 이름을 `go_expvar.d/agent_stats.yaml`로 변경합니다.

2. [Agent를 재시작합니다][5].

### 검증

[Agent의 상태 하위 명령을 실행][6]하고 Checks 섹션에서 `go_expvar`을 찾으세요.

## 수집한 데이터

### 메트릭

Agent Metrics 통합은 [`agent_stats.yaml.example`][3]에 정의된 메트릭을 수집합니다.

### 이벤트

Agent Metrics 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Agent Metrics 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/go_expvar/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/go_expvar.d/agent_stats.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ko/help/