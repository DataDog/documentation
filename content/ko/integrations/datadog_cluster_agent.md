---
app_id: datadog-cluster-agent
app_uuid: b6c2b71b-38c9-4769-86ad-516953849236
assets:
  dashboards:
    Datadog Cluster Agent - Overview: assets/dashboards/datadog_cluster_agent_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: datadog.cluster_agent.api_requests
      metadata_path: metadata.csv
      prefix: datadog.cluster_agent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10108
    source_type_name: Datadog 클러스터 에이전트
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 컨테이너
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/README.md
display_on_public_website: true
draft: false
git_integration_title: datadog_cluster_agent
integration_id: datadog-cluster-agent
integration_title: Datadog 클러스터 에이전트
integration_version: 5.4.0
is_public: true
manifest_version: 2.0.0
name: datadog_cluster_agent
public_title: Datadog 클러스터 에이전트
short_description: Datadog 클러스터 에이전트 메트릭 추적하기
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
  - Category::Containers
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog 클러스터 에이전트 메트릭 추적하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Datadog 클러스터 에이전트
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

본 점검은 Datadog 에이전트로 [Datadog 클러스터 에이전트][1]를 모니터링합니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [자동탐지 통합 템플릿][2]을 참조하세요.

### 설치

Datadog 클러스터 에이전트 점검은 [Datadog 에이전트][2] 패키지에 포함됩니다.
서버에 추가 설치할 필요가 없습니다.

### 구성
Datadog 클러스터 에이전트 점검은 대부분의 시나리오에서 [자동탐지][3] 기능으로 자동으로 자체 설정됩니다. 점검은 클러스터 에이전트 포드와 동일한 노드의 Datadog 에이전트 포드에서 실행됩니다. 클러스터 에이전트 자체에서는 실행되지 않습니다.

점검을 추가로 설정해야 하는 경우:

1. 에이전트의 설정 디렉토리의 루트에 있는 `conf.d/`폴더의 `datadog_cluster_agent.d/conf.yaml` 파일을 편집하여 datadog_cluster_agent 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [datadog_cluster_agent.d/conf.yaml 샘플][4]을 참조하세요.

2. [에이전트를 재시작하세요][5].

### 검증

[에이전트의 상태 하위 명령을 실행][6]하고 점검 섹션에서 `datadog_cluster_agent`를 검색합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "datadog_cluster_agent" >}}


### 이벤트

Datadog-Cluster-Agent 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "datadog_cluster_agent" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.


[1]: https://docs.datadoghq.com/ko/agent/cluster_agent/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ko/getting_started/containers/autodiscovery/
[4]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/datadog_checks/datadog_cluster_agent/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/assets/service_checks.json
[9]: https://docs.datadoghq.com/ko/help/