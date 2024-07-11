---
app_id: couchbase
app_uuid: e7fac1cd-65ba-4a58-af73-ee5f160cc6f9
assets:
  dashboards:
    couchbase: assets/dashboards/couchbase_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: couchbase.ram.used
      metadata_path: metadata.csv
      prefix: couchbase.
    process_signatures:
    - beam.smp couchbase
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 59
    source_type_name: Couchbase
  logs:
    source: couchdb
  saved_views:
    couchbase_processes: assets/saved_views/couchbase_processes.json
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
- https://github.com/DataDog/integrations-core/blob/master/couchbase/README.md
display_on_public_website: true
draft: false
git_integration_title: couchbase
integration_id: couchbase
integration_title: CouchBase
integration_version: 3.2.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: couchbase
public_title: CouchBase
short_description: Couchbase 활동과 성능 메트릭을 추적하고 그래프화하세요.
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
  description: Couchbase 활동과 성능 메트릭을 추적하고 그래프화하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CouchBase
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Couchbase 바이트 읽기][1]

## 개요

분주한 버킷을 식별하고 캐시 실패율 등을 추적하세요. 이 에이전트 점검은 다음과 같은 메트릭을 수집합니다.

- 데이터가 사용하는 하드 디스크 및 메모리
- 현재 연결
- 총 개체
- 초당 운영
- 디스크 작성 대기열 크기 

이 외에도 더 많은 사항을 추적할 수 있습니다.

## 설정

### 설치

Couchbase 점검이 [Datadog 에이전트][2] 패키지에 포함되어 있으므로 Couchbase 노드에 아무 것도 설치할 필요가 없습니다.

### 설정

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

##### 메트릭 수집

1.  [에이전트의 설정 디렉터리][1] 루트에 있는 `conf.d/` 폴더에서 `couchbase.d/conf.yaml` 파일을 편집하여 Couchbase 데이터 수집을 시작하세요. 사용 가능한 모든 설정 옵션은 [sample couchbase.d/conf.yaml][2]을 참조하세요.

   ```yaml
   init_config:

   instances:
     ## @param server - string - required
     ## The server's url.
     #
     - server: http://localhost:8091
   ```

2. [에이전트트 다시 시작합니다][3].

#### 로그 수집

_에이전트 버전 > 6.0 이상 사용 가능_

1. Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

2. 이 설정 블록을 `couchbase.d/conf.yaml` 파일에 추가하여 Couchbase 로그 수집을 시작하세요.

   ```yaml
   logs:
     - type: file
       path: /opt/couchbase/var/lib/couchbase/logs/couchdb.log
       source: couchdb
   ```

   `path` 및 `service` 파라미터 값을 변경하고 환경에 맞게 설정하세요. 사용 가능한 모든 설정 옵션은 [sample couchbase.d/conf.yaml][2]을 참조하세요.

3. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `couchbase`                          |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"server": "http://%%host%%:8091"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트의 `상태` 하위 명령][3]을 실행하고 점검 섹션에서 `couchbase`를 찾습니다. 

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "couchbase" >}}


### 이벤트

Couchbase 점검은 클러스터가 다시 밸런싱될 때마다 Datadog에 이벤트를 전송합니다.

### 서비스 점검
{{< get-service-checks-from-git "couchbase" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

## 참고 자료

- [핵심 Couchbase 메트릭을 모니터링합니다][5].


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/couchbase/images/couchbase_graph.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ko/help/
[5]: https://www.datadoghq.com/blog/monitoring-couchbase-performance-datadog