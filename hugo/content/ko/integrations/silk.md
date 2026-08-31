---
app_id: silk
app_uuid: 1f436ae6-e063-408f-ad35-37ee37fa2183
assets:
  dashboards:
    Silk - Overview: assets/dashboards/silk_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: silk.system.capacity.free
      metadata_path: metadata.csv
      prefix: silk.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10250
    source_type_name: Silk
  monitors:
    Latency is high: assets/monitors/latency_high.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- 데이터 스토어
- 프로비저닝
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/silk/README.md
display_on_public_website: true
draft: false
git_integration_title: silk
integration_id: silk
integration_title: Silk
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: silk
public_title: Silk
short_description: Silk 성능과 시스템 상태를 모니터링합니다.
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
  - "\b카테고리::클라우드"
  - 카테고리::데이터 저장
  - 카테고리::프로비저닝
  - 제공::통합
  configuration: README.md#Setup
  description: Silk 성능과 시스템 상태를 모니터링합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Silk
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

본 점검은 Datadog Agent를 통해 [Silk][1]를 모니터링합니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [오토파일럿 통합 템플릿][3]을 참조하세요.

### 설치

Silk 점검은 [Datadog Agent][3] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

### 구성

1. Agent 구성 디렉터리 루트의 `conf.d/` 폴더에 있는 `silk.d/conf.yaml` 파일을 편집하여 Silk 성능 데이터 수집을 시작합니다. 사용 가능한 모든 구성 옵션은 [샘플 silk.d/conf.yaml][4]을 참조하세요.

2. [Agent를 재시작합니다][5].

### 검증

[Agent 상태 하위 명령을 실행][6]하고 Checks 섹션에서 `silk`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "silk" >}}


### 이벤트

Silk 통합은 Silk 서버에서 발생하는 이벤트를 기록합니다. 이벤트 레벨은 다음과 같이 매핑됩니다.

| Silk                      | Datadog                            |
|---------------------------|------------------------------------|
| `INFO`                    | `info`                             |
| `ERROR`                   | `error`                            |
| `WARNING`                 | `warning`                          |
| `CRITICAL`                | `error`                            |


### 서비스 점검
{{< get-service-checks-from-git "silk" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.


[1]: https://silk.us/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/silk/datadog_checks/silk/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/silk/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/silk/assets/service_checks.json
[9]: https://docs.datadoghq.com/ko/help/