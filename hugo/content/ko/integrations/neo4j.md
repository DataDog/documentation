---
app_id: neo4j
app_uuid: f2657bb8-ded4-48f3-8095-f703cc203149
assets:
  dashboards:
    Neo4j V4 Dashboard: assets/dashboards/Neo4j4.xDefaultDashboard.json
    Neo4j V5 Cluster Dashboard: assets/dashboards/Neo4j5ClusterDashboard.json
    Neo4j V5 Dashboard: assets/dashboards/Neo4j5DefaultDashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: neo4j.dbms.page_cache.hits
      metadata_path: metadata.csv
      prefix: neo4j.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10202
    source_type_name: Neo4j
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Neo4j
  sales_email: support@neotechnology.com
  support_email: support@neotechnology.com
categories:
- 데이터 스토어
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/neo4j/README.md
display_on_public_website: true
draft: false
git_integration_title: neo4j
integration_id: neo4j
integration_title: Neo4j
integration_version: 3.0.3
is_public: true
manifest_version: 2.0.0
name: neo4j
public_title: Neo4j
short_description: Neo4j 수집 메트릭
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
  - 카테고리::데이터 저장
  - 제공::통합
  configuration: README.md#Setup
  description: Neo4j 수집 메트릭
  media:
  - caption: Neo4j 5 대시보드
    image_url: images/Neo4j_5_Dashboard.png
    media_type: image
  - caption: Neo4j 5 데이터베이스
    image_url: images/neo4j_graph.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Neo4j
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Neo4j][1]는 네이티브 그래프 스토리지, 고급 보안, 확장 가능한 속도 최적화 아키텍처, ACID 규정 준수를 결합하여 관계 기반 쿼리 의 예측 가능성과 무결성을 보장하는 엔터프라이즈급 그래프 데이터베이스입니다. Neo4j는 보다 자연스럽고 연결된 상태로 데이터를 저장 및 관리하며, 데이터 상호관계를 유지함으로써 초고속 쿼리, 심층적인 분석 컨텍스트, 수정이 가능한 데이터 모델을 제공합니다.

Neo4j 메트릭을 통해 데이터베이스 관리자는 Neo4j 배포를 모니터링하고 확인할 수 있습니다. DBA는 메모리 사용량(힙 및 페이지 캐시), 트랜잭션 수, 클러스터 상태, 데이터베이스 크기(노드 수, 관계형 및 속성 포함), 쿼리 성능을 이해합니다.

이러한 통합을 통해, 즉시 사용 가능한 대시보드에서 중요한 Neo4j 메트릭를 시각화하여 DBA가 문제를 해결하고 Neo4j 데이터베이스의 상태를 모니터링 및 확인할 수 있습니다.


## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [오토파일럿 통합 템플릿][3]을 참조하세요.

### 설치

neo4j를 설치하려면 호스트에서 다음을 확인하세요.

1. [Datadog 에이전트][3]를 다운로드하여 설치합니다.
2. neo4j를 설치하려면 호스트에서 다음을 확인하세요.

   ```shell
   datadog-agent integration install -t datadog-neo4j==<INTEGRATION_VERSION>
   ```

### 구성

1. 에이전트 설정 디렉터리 루트에 있는 `conf.d/` 폴더에서 `neo4j.d/conf.yaml` 파일을 편집하여 neo4j 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 neo4j.d/conf.yaml][4]을 참조하세요.

2. Datadog는 포트 5000에서 dogstatsd_stats_port 및 expvar_port에 대해 수신 대기합니다. neo4j.conf 파일에서 server.discovery.listen_address 및 server.discovery.advertised_address를 5000이 아닌 다른 포트를 사용하도록 변경해야 합니다.

3. [Agent를 재시작합니다][5].

### 검증

[에이전트 의 상태 하위 명령][6]을 실행하고 점검 섹션에서 `neo4j`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "neo4j" >}}


### 서비스 점검

서비스 점검 `neo4j.prometheus.health`은 기본 점검에 제출됩니다. 

### 이벤트

Neo4j에는 이벤트가 포함되어 있지 않습니다.


## 트러블슈팅

도움이 필요하세요? [Neo4j 지원팀][10]에 문의하세요.

[1]: https://neo4j.com/
[2]: https://docs.datadoghq.com/ko/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/datadog_checks/neo4j/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://neo4j.com/docs/operations-manual/4.4/monitoring/metrics/reference/
[8]: https://neo4j.com/docs/operations-manual/5/monitoring/metrics/reference/
[9]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/metadata.csv
[10]: mailto:support@neo4j.com