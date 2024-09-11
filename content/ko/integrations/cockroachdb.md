---
app_id: cockroachdb
app_uuid: 7368f005-2333-4dc5-a2b5-14419e4995d1
assets:
  dashboards:
    CockroachDB Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cockroachdb.sys.uptime
      metadata_path: metadata.csv
      prefix: cockroachdb.
    process_signatures:
    - cockroach
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10036
    source_type_name: CockroachDB
  logs:
    source: cockroachdb
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 캐싱(caching)
- cloud
- 데이터 저장
- 로그 수집
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cockroachdb/README.md
display_on_public_website: true
draft: false
git_integration_title: cockroachdb
integration_id: cockroachdb
integration_title: CockroachDB
integration_version: 3.3.0
is_public: true
custom_kind: 통합
manifest_version: 2.0.0
name: cockroachdb
public_title: CockroachDB
short_description: CockroachDB 클러스터의 전반적인 서비스 상태 및 성능을 모니터링하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::캐싱(Caching)
  - 카테고리::클라우드
  - 카테고리::데이터 저장
  - 카테고리::로그 수집
  - 지원 OS::Linux
  - 지원 OS::Windows
  - 지원 OS::macOS
  - Submitted Data Type::Metrics
  - 제출한 데이터 유형::로그
  configuration: README.md#Setup
  description: CockroachDB 클러스터의 전반적인 서비스 상태 및 성능을 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CockroachDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

CockroachDB는 [CockroachDB][1] 클러스터의 전반적인 서비스 상태 및 성능 모니터링을 점검합니다.

## 설정

### 설치

CockroachDB 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있기 때문에 
서버에 추가로 설치할 필요가 없습니다.

버전 1.9.0부터 본 개방형 메트릭 기반 통합에는 최신 모드( `openmetrics_endpoint`가 대상 엔드포인트를 가리키도록 설정하여 활성화됨)와 레거시 모드(`prometheus_url`를 대신 설정하여 활성화됨)가 존재합니다. 최신 기능을 모두 사용하려면 Datadog은 최신 모드를 활성화할 것을 권장합니다. 최신 모드를 사용하려면 파이썬(Python) 3이 필요합니다. 자세한 내용을 확인하려면 [개방형 메트릭 기반 통합의 최신 및 레거시 버전 관리][3]를 참조하세요.

호스트에서 파이썬(Python) 3을 사용할 수 없거나 레거시 모드를 사용하려면 다음 [설정][4]을 참조하세요.

### 설정

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

##### 메트릭 수집

1. [Agent의 설정 디렉터리][1] 루트에서 `conf.d/` 폴더에 있는 `cockroachdb.d/conf.yaml` 파일을 편집하여 CockroachDB 성능 데이터 수집을 시작하세요. 멀티 노드 클러스터의 경우 각 노드당 따로 독립 점검 인스턴트를 설정해야 합니다. 사용 가능한 모든 설정 옵션은 [cockroachdb.d/conf.yaml 샘플][2]을 참조하세요.

   ```yaml
   init_config:

   instances:
       ## @param openmetrics_endpoint - string - required
       ## The URL exposing metrics in the OpenMetrics format.
       #
     - openmetrics_endpoint: http://localhost:8080/_status/vars
   ```

2. [에이전트를 재시작합니다][3].

##### 로그 수집

_에이전트 버전 6.0 이상에서 사용 가능_

1. 로그 수집은 기본적으로 Datadog 에이전트에서 비활성화되어 있습니다. `datadog.yaml`에서 활성화하세요.

   ```yaml
   logs_enabled: true
   ```

2. 이 설정 블록을 `cockroachdb.d/conf.yaml` 파일에 추가하여 CockroachDB 로그 수집을 시작합니다.

   ```yaml
   logs:
    - type: file
      path: /var/lib/cockroach/logs/cockroach.log
      source: cockroachdb
      service: cockroachdb
      log_processing_rules:
      - type: multi_line
        name: new_log_start_with_status_and_date
        pattern: [A-Z]\d{6}\s\d+\:\d+\:\d+\.\d+
   ```

    `path`, `service` 파라미터 값을 변경하고 환경에 맞게 설정합니다. 사용 가능한 모든 설정 옵션은 [cockroachdb.d/conf.yaml 샘플][2]을 참조하세요.

3. [에이전트를 재시작합니다][3].

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/
[2]: https://github.com/DataDog/integrations-core/blob/master/cockroachdb/datadog_checks/cockroachdb/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                                                    |
| -------------------- | -------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `cockroachdb`                                            |
| `<INIT_CONFIG>`      | 비워두거나 `{}`                                            |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint":"http://%%host%%:8080/_status/vars"}` |

##### 로그 수집

기본적으로 로그 수집은 Datadog 에이전트에서 비활성화되어 있습니다. 활성화하려면 [도커(Docker) 로그 수집][2]을 참조하세요.

그런 다음 도커(Docker) 레이블로 [로그 통합][2]을 설정하세요.

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source": "cockroachdb", "service": "<SERVICE_NAME>"}]'
```

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 `status` 상태 하위 명령을 실행하고][5] 점검 섹션에서 `cockroachdb`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "cockroachdb" >}}


### 서비스 점검

CockroachDB 점검은 서비스 점검을 포함하지 않습니다.

### 이벤트

CockroachDB 점검은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][6]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog으로 CockroachDB 성능 메트릭 모니터링하기][7]


[1]: https://www.cockroachlabs.com/product/cockroachdb
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/integrations/guide/versions-for-openmetrics-based-integrations
[4]: https://github.com/DataDog/integrations-core/blob/7.33.x/cockroachdb/datadog_checks/cockroachdb/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/help/
[7]: https://www.datadoghq.com/blog/monitor-cockroachdb-performance-metrics-with-datadog