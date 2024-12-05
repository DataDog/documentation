---
app_id: cassandra
app_uuid: a930364f-ac97-4483-92d6-5a982da7b1c0
assets:
  dashboards:
    cassandra-overview: assets/dashboards/cassandra_overview.json
    cassandra-overview-screenboard: assets/dashboards/cassandra_overview_screenboard.json
    cassandra-read: assets/dashboards/cassandra_read.json
    cassandra-sstables: assets/dashboards/cassandra_sstable.json
    cassandra-write: assets/dashboards/cassandra_write.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cassandra.load.count
      metadata_path: metadata.csv
      prefix: cassandra.
    process_signatures:
    - java org.apache.cassandra.service.CassandraDaemon
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 33
    source_type_name: Cassandra
  logs:
    source: cassandra
  saved_views:
    cassandra_processes: assets/saved_views/cassandra_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- data stores
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cassandra/README.md
display_on_public_website: true
draft: false
git_integration_title: cassandra
integration_id: cassandra
integration_title: Cassandra
integration_version: 1.18.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: cassandra
public_title: Cassandra
short_description: 클러스터 성능, 용량, 전반적인 상태 등을 추적하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Category::로그 수집
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 클러스터 성능, 용량, 전반적인 상태 등을 추적하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cassandra
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Cassandra default dashboard][1]

## 개요

실시간으로 Cassandra에서 메트릭을 받아 다음을 수행할 수 있습니다.

- Cassandra 상태를 가시화하고 모니터링합니다.
- Cassandra 페일오버와 이벤트에 대한 알림을 받습니다.

## 설정

### 설치

Cassandra 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있으므로 Cassandra 노드에 아무 것도 설치할 필요가 없습니다. 이 통합을 위해 Oracle의 JDK를 사용하는 것이 좋습니다.

**참고**: 이 점검에는 인스턴트당 350개 메트릭 제한이 적용됩니다. 반환되는 메트릭의 수는 [상태 페이지][3]에 나와 있습니다. 아래 설정을 편집하여 관심 있는 메트릭을 지정할 수 있습니다. 메트릭을 커스터마이즈하는 방법을 알아보려면 상세한 지침을 [JMX 설명서][4]를 참조하세요. 더 많은 메트릭을 모니터링해야 한다면 [Datadog 지원팀][5]에 문의해 주세요.

### 설정

##### 메트릭 수집

1. `cassandra.d/conf.yaml` 파일의 기본 설정은 [Cassandra 메트릭](#metrics) 수집을 활성화합니다. 사용 가능한 모든 설정 옵션은 [sample cassandra.d/conf.yaml][6]을 참조하세요.

2. [ Agent를 다시 시작][7]합니다.

##### 로그 수집

_에이전트 버전 > 6.0 이상 사용 가능_

컨테이너화된 환경의 경우 [쿠버네티스(Kubernetes) 로그 수집][8] 또는 [도커(Docker) 로그 수집][9] 페이지의 지침을 따르세요.

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml` 파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. 이 설정 블록을 `cassandra.d/conf.yaml` 파일에 추가하여 Cassandra 로그 수집을 시작하세요.

   ```yaml
     logs:
       - type: file
         path: /var/log/cassandra/*.log
         source: cassandra
         service: myapplication
         log_processing_rules:
            - type: multi_line
              name: log_start_with_date
              # pattern to match: DEBUG [ScheduledTasks:1] 2019-12-30
              pattern: '[A-Z]+ +\[[^\]]+\] +\d{4}-\d{2}-\d{2}'
   ```

    `path` 및 `service` 파라미터 값을 변경하고 환경에 맞게 설정하세요. 사용 가능한 모든 설정 옵션은 [sample cassandra.d/conf.yaml][6]을 참조하세요.

   스택트레이스가 적절하게 단일 로그로 집계되었는지 확인하려면 [멀티라인 프로세싱 규칙][10]을 추가할 수 있습니다.

3. [ Agent를 다시 시작][7]합니다.

### 검증

[에이전트 상태 하위 명령을 실행하고][3] 점검 섹션 아래에서 `cassandra`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "cassandra" >}}


### 이벤트

Cassandra 점검은 이벤트를 포함하지 않습니다.

### 서비스 검사
{{< get-service-checks-from-git "cassandra" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

- [Cassandra 성능 메트릭을 모니터링하는 방법][11]
- [Cassandra 메트릭을 수집하는 방법][12]
- [Datadog를 사용한 Cassandra 모니터링][13]




<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## Cassandra Nodetool 통합

![Cassandra default dashboard][14]

## 개요

이 점검은 [jmx 통합][15]을 통해 사용할 수 없는 Cassandra 클러스터에 대한 메트릭을 수집합니다. `nodetool` 유틸리티를 사용해 수집하세요.

## 설정

### 설치

Cassandra Nodetool 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있으므로 Cassandra 노드에 아무 것도 설치할 필요가 없습니다.

### 설정

아래 지침에 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설정하세요. 컨테이너화된 환경의 경우 [컨테이너화](#containerized) 섹션을 참조하세요.

<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->

#### 호스트

1. [에이전트 설정 디렉터리][16] 루트에 있는 `conf.d/` 폴더에서 `cassandra_nodetool.d/conf.yaml` 파일을 편집하세요. 사용 가능한 모든 설정 옵션은 [sample cassandra_nodetool.d/conf.yaml][17]을 참조하세요.

   ```yaml
   init_config:

   instances:
     ## @param keyspaces - list of string - required
     ## The list of keyspaces to monitor.
     ## An empty list results in no metrics being sent.
     #
     - keyspaces:
         - "<KEYSPACE_1>"
         - "<KEYSPACE_2>"
   ```

2. [ Agent를 다시 시작][7]합니다.

#### 로그 수집

Cassandra 통합이 Cassandra Nodetool 로그를 수집합니다. [Cassandra 로그 수집 지침][18]을 참조하세요. 

<!-- xxz tab xxx -->
<!-- xxx tab "컨테이너화된 환경" xxx -->

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 포드에서 공식 [프로모테우스 엑스포터][19]를 사용하세요. 그런 다음 에이전트의 자동탐지를 사용해 포드를 찾고 엔드포인트를 쿼리하세요.

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### 검증

[에이전트의 `status` 하위 명령을 실행하고][3] 점검 섹션 아래에서 `cassandra_nodetool`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "cassandra_nodetool" >}}


### 이벤트

Cassandra_nodetool 점검은 이벤트를 포함하지 않습니다.

### 서비스 검사
{{< get-service-checks-from-git "cassandra_nodetool" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

- [Cassandra 성능 메트릭을 모니터링하는 방법][11]
- [Cassandra 메트릭을 수집하는 방법][12]
- [Datadog를 사용한 Cassandra 모니터링][13]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra/images/cassandra_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ko/integrations/java/
[5]: https://docs.datadoghq.com/ko/help/
[6]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ko/containers/kubernetes/log/
[9]: https://docs.datadoghq.com/ko/containers/docker/log/
[10]: https://docs.datadoghq.com/ko/agent/logs/advanced_log_collection/?tab=exclude_at_match#multi-line-aggregation
[11]: https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics
[12]: https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics
[13]: https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog
[14]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra_nodetool/images/cassandra_dashboard.png
[15]: https://github.com/DataDog/integrations-core/tree/master/cassandra
[16]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[17]: https://github.com/DataDog/integrations-core/blob/master/cassandra_nodetool/datadog_checks/cassandra_nodetool/data/conf.yaml.example
[18]: https://github.com/DataDog/integrations-core/tree/master/cassandra#log-collection
[19]: https://github.com/prometheus/jmx_exporter