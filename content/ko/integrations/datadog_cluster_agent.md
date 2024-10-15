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
integration_version: 3.1.1
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

호스트에서 실행 중인 에이전트의 경우 다음 지침에 따라 설치하고 구성하세요. 컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][2]에 다음 지침을 적용하는 방법이 안내되어 있습니다.

### 설치

Datadog-Cluster-Agent 점검은 [Datadog 에이전트][2] 패키지에 포함됩니다.
서버에 추가 설치할 필요가 없습니다.

### 설정

1. 에이전트의 설정 디렉터리의 루트에 있는 `conf.d/`폴더의 `datadog_cluster_agent.d/conf.yaml` 파일을 편집하여 datadog_cluster_agent 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [datadog_cluster_agent.d/conf.yaml 샘플][3]을 참조하세요.

2. [에이전트를 다시 시작합니다][4].

### 검증

[에이전트의 상태 하위 명령을 실행][5]하고 점검 섹션에서 `datadog_cluster_agent`를 검색합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "datadog_cluster_agent" >}}


### 이벤트

Datadog-Cluster-Agent 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "datadog_cluster_agent" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.


[1]: https://docs.datadoghq.com/ko/agent/cluster_agent/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/datadog_checks/datadog_cluster_agent/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/assets/service_checks.json
[8]: https://docs.datadoghq.com/ko/help/