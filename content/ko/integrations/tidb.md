---
app_id: tidb
app_uuid: 79e5c6d7-c494-4df7-98bc-c639e211c0b8
assets:
  dashboards:
    TiDB Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: tidb_cluster.tidb_executor_statement_total
      metadata_path: metadata.csv
      prefix: tidb_cluster
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10172
    source_type_name: TiDB
  logs:
    source: tidb
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: PingCAP
  sales_email: xuyifan02@pingcap.com
  support_email: xuyifan02@pingcap.com
categories:
- 데이터 스토어
- cloud
- 로그 수집
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/tidb/README.md
display_on_public_website: true
draft: false
git_integration_title: tidb
integration_id: tidb
integration_title: TiDB
integration_version: 2.1.0
is_public: true
manifest_version: 2.0.0
name: tidb
public_title: TiDB
short_description: TiDB 클러스터를 위한 통합
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
  - "\b카테고리::클라우드"
  - Category::Log Collection
  - 제공::통합
  configuration: README.md#Setup
  description: TiDB 클러스터를 위한 통합
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TiDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[TiDB][1] 클러스터를 Datadog를 연결하여 다음을 수행합니다.

- 클러스터의 핵심 TiDB 메트릭을 수집합니다.
- TiDB/TiKV/TiFlash 로그, 느린 쿼리 로그 등 클러스터의 로그를 수집하세요.
- 제공된 대시보드에서 클러스터 성능을 시각화합니다.

> **참고**:
>
> - 이 통합을 위해서는 TiDB 4.0 이상이 필요합니다. 
> TiDB 클라우드의 경우 [TiDB 클라우드 통합][2]을 참조하세요.

## 설정

### 설치

먼저, [Datadog Agent][3]를 다운로드하여 실행합니다.

그런 다음 TiDB 점검을 수동으로 설치합니다. [환경에 따라 지침이 다릅니다][4].

`datadog-agent integration install -t datadog-tidb==<INTEGRATION_VERSION>`을 실행합니다.

### 구성

##### 메트릭 수집

1. Agent 구성 디렉터리 루트의 `conf.d/` 폴더에 있는 `tidb.d/conf.yaml` 파일을 편집하여 TiDB 성능 데이터 수집을 시작합니다. 사용 가능한 모든 구성 옵션은 [샘플 tidb.d/conf.yaml][5]을 참조하세요.

  [샘플 tidb.d/conf.yaml][5]은 PD 인스턴스만 구성합니다. TiDB 클러스터의 다른 인스턴스는 수동으로 구성해야 합니다. 예는 다음과 같습니다.

  ```yaml
  init_config:

  instances:

    - pd_metric_url: http://localhost:2379/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01

    - tidb_metric_url: http://localhost:10080/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01

    - tikv_metric_url: http://localhost:20180/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01

    - tiflash_metric_url: http://localhost:8234/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01

    - tiflash_proxy_metric_url: http://localhost:20292/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01
  ```

3. [Agent를 재시작합니다][6].

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. 이 구성 블록을 `tidb.d/conf.yaml` 파일에 추가하여 TiDB 로그 수집을 시작하세요.

   ```yaml
   logs:
    # pd log
    - type: file
      path: "/tidb-deploy/pd-2379/log/pd*.log"
      service: "tidb-cluster"
      source: "pd"

    # tikv log
    - type: file
      path: "/tidb-deploy/tikv-20160/log/tikv*.log"
      service: "tidb-cluster"
      source: "tikv"

    # tidb log
    - type: file
      path: "/tidb-deploy/tidb-4000/log/tidb*.log"
      service: "tidb-cluster"
      source: "tidb"
      exclude_paths:
        - /tidb-deploy/tidb-4000/log/tidb_slow_query.log
    - type: file
      path: "/tidb-deploy/tidb-4000/log/tidb_slow_query*.log"
      service: "tidb-cluster"
      source: "tidb"
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_datetime
          pattern: '#\sTime:'
      tags:
        - "custom_format:tidb_slow_query"

    # tiflash log
    - type: file
      path: "/tidb-deploy/tiflash-9000/log/tiflash*.log"
      service: "tidb-cluster"
      source: "tiflash"
   ```

   클러스터의 구성에 따라 `path` 및 `service`를 변경합니다. 

   다음 명령을 사용하여 모든 로그 경로를 표시합니다:

   ```shell
   # show deploying directories
   tiup cluster display <YOUR_CLUSTER_NAME>
   # find specific logging file path by command arguments
   ps -fwwp <TIDB_PROCESS_PID/PD_PROCESS_PID/etc.>
   ```

3. [Agent를 재시작합니다][6].

### 검증

[Agent의 상태 하위 명령][7]을 실행하고 확인 섹션에서 `tidb`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "tidb" >}}


> `metrics` 구성 옵션을 사용하여 TiDB 클러스터에서 추가 메트릭을 수집할 수 있습니다.

### 이벤트

TiDB 점검에는 어떠한 이벤트도 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "tidb" >}}


## 트러블슈팅

### macOS에서 TiKV 및 TiFlash 인스턴스에 대한 누락된 CPU 및 메모리 메트릭

다음과 같은 경우에는 TiKV 및 TiFlash 인스턴스에 대해 CPU 및 메모리 메트릭이 제공되지 않습니다:

- macOS에서 [tiup 플레이그라운드][10]로 TiKV 또는 TiFlash 인스턴스를 실행합니다.
- 새 Apple M1 머신에서 [docker-compose up][11]을 사용하여 TiKV 또는 TiFlash 인스턴스를 실행합니다.

### 너무 많은 메트릭

TiDB 검사는 기본적으로 Datadog 의 `distribution` 메트릭 유형을 사용하도록 설정합니다. 이 데이터 부분은 상당히 크고 많은 리소스를 소모할 수 있습니다. `tidb.yml` 파일에서 이 동작을 수정할 수 있습니다.

- `send_distribution_buckets: false`

TiDB 클러스터에는 중요한 메트릭이 많기 때문에, TiDB 검사는 기본적으로 `max_returned_metrics`을 `10000`로 설정합니다. 필요한 경우 `tidb.yml` 파일에서 `max_returned_metrics`을 줄일 수 있습니다.

- `max_returned_metrics: 1000`

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의해주세요.

[1]: https://docs.pingcap.com/tidb/stable
[2]: https://docs.datadoghq.com/ko/integrations/tidb_cloud/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/agent/guide/community-integrations-installation-with-docker-agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/tidb/datadog_checks/tidb/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/tidb/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/tidb/assets/service_checks.json
[10]: https://docs.pingcap.com/tidb/stable/tiup-playground
[11]: https://github.com/DataDog/integrations-extras/tree/master/tidb/tests/compose
[12]: https://docs.datadoghq.com/ko/help/