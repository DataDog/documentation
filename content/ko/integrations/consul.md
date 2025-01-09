---
app_id: consul
app_uuid: d0b52e9d-6594-4ff5-9b66-800943f75756
assets:
  dashboards:
    consul: assets/dashboards/consul_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: consul.peers
      metadata_path: metadata.csv
      prefix: consul.
    process_signatures:
    - consul agent
    - consul_agent
    - consul-agent
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 122
    source_type_name: Consul
  monitors:
    consul: assets/monitors/consul_status.json
  saved_views:
    consul_errors: assets/saved_views/consul_errors.json
    consul_overview: assets/saved_views/consul_overview.json
    consul_processes: assets/saved_views/consul_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- containers
- log collection
- network
- notifications
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/consul/README.md
display_on_public_website: true
draft: false
git_integration_title: consul
integration_id: consul
integration_title: Consul
integration_version: 2.6.1
is_public: true
custom_kind: 통합
manifest_version: 2.0.0
name: consul
public_title: Consul
short_description: Consul 상태 점검에 대한 알림, 서비스-노드 간 매핑 확인 등
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::설정 및 배포
  - Category::컨테이너
  - Category::로그 수집
  - Category::네트워크
  - Category::알림
  - Category::오케스트레이션
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Consul 상태 점검에 대한 알림, 서비스-노드 간 매핑 확인 등
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Consul
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Consul Dash][1]

## 개요

Datadog Agent는 다음을 포함하여 Consul 노드에서 많은 메트릭을 수집합니다.

- Consul 피어 총개수
- 서비스 상태 - 특정 서비스에 대해 UP, PASSING, WARNING, CRITICAL인 노드 수
- 노드 상태 - 특정 노드에 대해 UP, PASSING, WARNING, CRITICAL인 서비스 수
- 네트워크 좌표 - 데이터 센터 간 및 데이터 센터 내 대기 시간

_Consul_ Agent는 DogStatsD를 통해 추가 메트릭을 제공할 수 있습니다. 이러한 메트릭은 Consul에 의존하는 서비스가 아닌 Consul 자체의 내부 상태와 더 관련이 있습니다. 메트릭은 다음과 같습니다.

- Serf 이벤트 및 멤버 플랩
- Raft 프로토콜
- DNS 성능

이외에 다수가 있습니다.

Datadog Agent는 메트릭 외에도 Consul의 각 상태 점검마다 서비스 점검을 전송하고, 새 리더 선출마다 이벤트를 전송합니다.

## 설정

### 설치

Datadog Agent의 Consul 점검은 [Datadog Agent][2] 패키지에 포함되어 있으므로 Consul 노드에 다른 것을 설치할 필요가 없습니다.

### 구성

{{< tabs >}}
{{% tab "호스트" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

##### 메트릭 수집

1. Consul 메트릭 수집을 시작하려면 [Agent의 설정 디렉터리][1] 루트의 `conf.d/` 폴더에서 `consul.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 설정 옵션은 [샘플 consul.d/conf.yaml][2]을 참조하세요.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Where your Consul HTTP server lives,
     ## point the URL at the leader to get metrics about your Consul cluster.
     ## Use HTTPS instead of HTTP if your Consul setup is configured to do so.
     #
     - url: http://localhost:8500
   ```

2. [에이전트를 재시작합니다][3].

###### OpenMetrics

(선택 사항) `use_prometheus_endpoint` 설정 옵션을 활성화하여 Consul Prometheus 엔드포인트에서 추가 메트릭 세트를 가져올 수 있습니다.

**참고**: 동일한 인스턴스에 대해 두 가지를 모두 활성화하지 말고 DogStatsD 또는 Prometheus 메서드를 사용하세요.

1. Prometheus 엔드포인트에 메트릭을 노출하도록 Consul을 설정합니다. 기본 Consul 설정 파일의 최상위 `telemetry` 키에 중첩된 [`prometheus_retention_time`][4]을 설정합니다.

    ```conf
    {
      ...
      "telemetry": {
        "prometheus_retention_time": "360h"
      },
      ...
    }
    ```

2. Prometheus 엔드포인트 사용을 시작하려면 [Agent의 설정 디렉터리][1] 루트에 있는 `conf.d/` 폴더에서 `consul.d/conf.yaml` 파일을 편집합니다.
    ```yaml
    instances:
        - url: <EXAMPLE>
          use_prometheus_endpoint: true
    ```

3. [에이전트를 재시작합니다][3].

##### DogStatsD

Prometheus 엔드포인트를 사용하는 대신 [DogStatsD][5]를 통해 동일한 추가 메트릭 세트를 Agent에 보내도록 Consul을 설정할 수 있습니다.

1. DogStatsD 메트릭을 보내도록 Consul을 설정하려면 Consul의 기본 설정 파일에서 최상위 `telemetry` 키 아래에 중첩된 `dogstatsd_addr`을 추가합니다.

    ```conf
    {
      ...
      "telemetry": {
        "dogstatsd_addr": "127.0.0.1:8125"
      },
      ...
    }
    ```

2. 메트릭에 태그가 올바르게 지정되었는지 확인하려면 다음 설정을 추가하여 [Datadog Agent 기본 설정 파일][6] `datadog.yaml`을 업데이트합니다.

   ```yaml
   # dogstatsd_mapper_cache_size: 1000  # default to 1000
   dogstatsd_mapper_profiles:
     - name: consul
       prefix: "consul."
       mappings:
         - match: 'consul\.http\.([a-zA-Z]+)\.(.*)'
           match_type: "regex"
           name: "consul.http.request"
           tags:
             method: "$1"
             path: "$2"
         - match: 'consul\.raft\.replication\.appendEntries\.logs\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.appendEntries.logs"
           tags:
             peer_id: "$1"
         - match: 'consul\.raft\.replication\.appendEntries\.rpc\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.appendEntries.rpc"
           tags:
             peer_id: "$1"
         - match: 'consul\.raft\.replication\.heartbeat\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.heartbeat"
           tags:
             peer_id: "$1"
   ```

3. [에이전트를 재시작합니다][3].

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

1. 로그 수집은 Datadog Agent에서 기본적으로 비활성화되어 있습니다. `datadog.yaml`에서 다음을 사용하여 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. Consul 로그를 수집하려면 `consul.yaml` 파일에서 이 설정 블록을 편집합니다.

   ```yaml
   logs:
     - type: file
       path: /var/log/consul_server.log
       source: consul
       service: myservice
   ```

   `path`와 `service` 파라미터 값을 변경하고 환경에 맞게 구성합니다.
   사용 가능한 모든 설정 옵션은 [샘플 consul.d/conf.yaml][2]을 참조하세요.

3. [에이전트를 재시작합니다][3].

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://www.consul.io/docs/agent/options#telemetry-prometheus_retention_time
[5]: https://docs.datadoghq.com/ko/developers/dogstatsd/
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                              |
| -------------------- | ---------------------------------- |
| `<INTEGRATION_NAME>` | `consul`                           |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                      |
| `<INSTANCE_CONFIG>`  | `{"url": "https://%%host%%:8500"}` |

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "consul", "service": "<SERVICE_NAME>"}` |


[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 상태 하위 명령을 실행][3]하고 Checks 섹션에서 `consul`을 찾으세요.

**참고**: Consul 노드에 디버그 로깅이 활성화된 경우 Datadog Agent의 정기적인 폴링이 Consul 로그에 표시됩니다.

```text
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/status/leader (59.344us) from=127.0.0.1:53768
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/status/peers (62.678us) from=127.0.0.1:53770
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/health/state/any (106.725us) from=127.0.0.1:53772
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/catalog/services (79.657us) from=127.0.0.1:53774
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/health/service/consul (153.917us) from=127.0.0.1:53776
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/coordinate/datacenters (71.778us) from=127.0.0.1:53778
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/coordinate/nodes (84.95us) from=127.0.0.1:53780
```

#### Consul Agent에서 DogStatsD까지

`netstat`를 사용해 Consul 메트릭도 전송되고 있는지 확인합니다.

```shell
$ sudo netstat -nup | grep "127.0.0.1:8125.*ESTABLISHED"
udp        0      0 127.0.0.1:53874         127.0.0.1:8125          ESTABLISHED 23176/consul
```

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "consul" >}}


Consul Agent가 DogStatsD에 보내는 메트릭에 대한 설명은 [Consul의 Telemetry 문서][4]를 참조하세요.

네트워크 지연 시간 메트릭 측정 방법은 [Consul의 Network Coordinates 문서][5]를 참조하세요

### 이벤트

**consul.new_leader**:<br>
Datadog Agent는 Consul 클러스터가 새 리더를 선출할 때 `prev_consul_leader`, `curr_consul_leader`, `consul_datacenter`로 태그를 지정하여 이벤트를 보냅니다.

### 서비스 점검
{{< get-service-checks-from-git "consul" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][6]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog으로 HCP Consul 모니터링][7]
- [Datadog으로 Consul 상태 및 성능 모니터링][8]
- [Datadog과 Consul][9]
- [Consul 모니터링을 위한 주요 메트릭][10]
- [Consul 모니터링 도구][11]
- [Datadog으로 Consul 모니터링][12]
- [Datadog NPM이 지원하는 Consul 네트워킹][13]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/consul/images/consul-dash.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://www.consul.io/docs/agent/telemetry.html
[5]: https://www.consul.io/docs/internals/coordinates.html
[6]: https://docs.datadoghq.com/ko/help/
[7]: https://docs.datadoghq.com/ko/integrations/guide/hcp-consul
[8]: https://www.datadoghq.com/blog/monitor-consul-health-and-performance-with-datadog
[9]: https://engineering.datadoghq.com/consul-at-datadog
[10]: https://www.datadoghq.com/blog/consul-metrics/
[11]: https://www.datadoghq.com/blog/consul-monitoring-tools/
[12]: https://www.datadoghq.com/blog/consul-datadog/
[13]: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/