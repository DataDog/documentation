---
app_id: couchdb
app_uuid: 0a7006e2-c76d-4ef0-8af7-347bad2db768
assets:
  dashboards:
    couchdb: assets/dashboards/CouchDB-overview_dashboard.json
    couchdb-v1: assets/dashboards/CouchDBv1-overview_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - couchdb.couchdb.request_time.n
      - couchdb.couchdb.request_time
      metadata_path: metadata.csv
      prefix: couchdb.
    process_signatures:
    - couchjs
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 20
    source_type_name: CouchDB
  saved_views:
    couchdb_processes: assets/saved_views/couchdb_processes.json
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
- https://github.com/DataDog/integrations-core/blob/master/couch/README.md
display_on_public_website: true
draft: false
git_integration_title: couch
integration_id: couchdb
integration_title: CouchDB
integration_version: 6.2.1
is_public: true
custom_kind: 통합
manifest_version: 2.0.0
name: couch
public_title: CouchDB
short_description: CouchDB 활동과 성능 메트릭을 추적하고 그래프화하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: CouchDB 활동과 성능 메트릭을 추적하고 그래프화하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CouchDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![CouchDB 대시보드][1]

## 개요

Datadog의 CouchDB 데이터를 캡처하여 다음 이점을 누릴 수 있습니다.

- 핵심 CouchDB 메트릭을 시각화합니다.
- CouchDB 성능을 나머지 애플리케이션과 연계합니다.

성능을 이유로 사용하는 CouchDB 버전이 캐시됩니다. 그러므로 동일한 에이전트가 포함된 다른 버전을 사용해 CouchDB 인스턴스를 모니터링할 수 없습니다.

## 설정

### 설치

CouchDB 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있습니다. 그러므로 CouchDB 서버에 아무 것도 설치할 필요가 없습니다.

### 설정

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 Agent에 대해 이 검사를 설정하려면:

##### 메트릭 수집

1. [에이전트 설정 디렉터리][1]의 루트에 있는 `conf.d/` 폴더에서 `couch.d/conf.yaml` 파일을 편집하여 CouchDB 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션의 경우 [sample couch.d/conf.yaml][2]를 참조하세요.

   ```yaml
   init_config:

   instances:
     ## @param server - string - required
     ## The Couch server's url.
     #
     - server: http://localhost:5984
   ```

   **참고**: `db_include` 및 `db_exclude`를 제공하여 에이전트가 메트릭을 수집해야 하는 소스와 그렇지 않은 소스를 통제하세요.

2. [에이전트를 재시작합니다][3].

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

1. Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

2. 이 설정 블록을 `couch.d/conf.yaml` 파일에 추가하여 CouchDB 로그 수집을 시작하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/couchdb/couch.log
       source: couchdb
       service: couch
   ```

   `path` 및 `service` 파라미터 값을 변경하고 환경에 맞게 설정하세요. 사용 가능한 모든 설정 옵션은 [sample couch.d/conf.yaml][2]을 참조하세요.

3. [에이전트를 재시작합니다][3].

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `couch`                              |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"server": "http://%%host%%:5984"}` |

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "couchdb", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행하고][3] 점검 섹션 아래에서 `couch`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "couch" >}}


### 이벤트

Couch 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "couch" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

## 참고 자료

- [Datadog를 사용해 CouchDB 성능 모니터링][5]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/couch/images/couchdb_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ko/help/
[5]: https://www.datadoghq.com/blog/monitoring-couchdb-with-datadog