---
app_id: kong
categories:
- log collection
custom_kind: 통합
description: 총 요청, 응답 코드, 클라이언트 연결 등을 추적하세요.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-kong-datadog
  tag: 블로그
  text: 새로운 Datadog 통합을 통한 Kong 모니터링
integration_version: 6.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Kong
---
## 개요

Agent의 Kong 점검은 총 요청, 응답 코드, 클라이언트 연결 등을 추적합니다.

또한, Kong의 [Datadog 플러그인](https://docs.konghq.com/hub/kong-inc/datadog/) 기능과 [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/)를 사용하는 방법으로, Datadog Agent를 통해 API, 연결, 데이터베이스 메트릭을 Datadog로 전송할 수 있습니다. 자세한 내용은 [Datadog 통합을 통한 Kong 모니터링](https://www.datadoghq.com/blog/monitor-kong-datadog) 블로그 게시물을 참조하세요.

## 설정

### 설치

Kong 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있으므로 Kong 서버에 추가 설치가 필요 없습니다.

### 설정

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. [Prometheus 플러그인 활성화](https://docs.konghq.com/hub/kong-inc/prometheus/)를 통해 Kong 서비스에 OpenMetrics 메트릭이 노출되도록 합니다. 이 설정은 Agent에서 Kong 메트릭을 수집하기 전에 먼저 구성해야 합니다.

1. 이 구성 블록을 [Agent 의 구성 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) 루트의 `conf.d/` 폴더에 있는 `kong.d/conf.yaml` 파일에 추가하여 [Kong 메트릭](#metrics) 수집을 시작합니다. 사용 가능한 모든 구성 옵션은 [샘플 kong.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/kong/datadog_checks/kong/data/conf.yaml.example)을 참조하세요:

   ```yaml
   init_config:

   instances:
     ## @param openmetrics_endpoint - string - required
     ## The URL exposing metrics in the OpenMetrics format.
     #
     - openmetrics_endpoint: http://localhost:8001/metrics
   ```

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

**참고**: 현재 버전의 점검(1.17.0+)은 메트릭 수집을 위해 [OpenMetrics](https://docs.datadoghq.com/integrations/openmetrics/)를 사용하며, 여기에는 Python 3이 필요합니다. Python 3을 사용할 수 없거나 이 점검의 레거시 버전을 사용하는 호스트의 경우 다음 [구성](https://github.com/DataDog/integrations-core/blob/7.27.x/kong/datadog_checks/kong/data/conf.yaml.example)을 참조하세요.

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Kong 액세스 로그는 NGINX에서 생성되므로 기본 위치는 NGINX 파일과 동일합니다.

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. Kong 로그 수집을 시작하려면 `kong.d/conf.yaml` 파일에 다음 구성 블록을 추가합니다.

   ```yaml
   logs:
     - type: file
       path: /var/log/nginx/access.log
       service: '<SERVICE>'
       source: kong

     - type: file
       path: /var/log/nginx/error.log
       service: '<SERVICE>'
       source: kong
   ```

   `path` 및 `service` 파라미터 값을 변경하고 사용자 환경에 맞게 구성합니다. 사용 가능한 모든 구성 옵션은 [샘플 kong.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/kong/datadog_checks/kong/data/conf.yaml.example)을 참조하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

[Prometheus 플러그인 활성화](https://docs.konghq.com/hub/kong-inc/prometheus/)를 통해 Kong 서비스에 OpenMetrics 메트릭이 노출되도록 합니다. 이 설정은 Agent에서 Kong 메트릭을 수집하기 전에 먼저 구성해야 합니다.
컨테이너화된 환경의 경우, [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에서 아래 파라미터 적용에 관한 지침을 참조하세요.

##### 메트릭 수집

| 파라미터            | 값                                                 |
| -------------------- | ----------------------------------------------------- |
| `<INTEGRATION_NAME>` | `kong`                                                |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                         |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:8001/metrics"}` |

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

로그 수집은 Datadog Agent에서 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집 설명서](https://docs.datadoghq.com/agent/kubernetes/log/)를 참조하세요.

| 파라미터      | 값                                             |
| -------------- | ------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "kong", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `kong`을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **kong.bandwidth.bytes.count** <br>(count) | \[OpenMetrics V2\] (Kong v3+) Kong에서 서비스/경로당 소비되는 총 대역폭(바이트)입니다.<br>_byte로 표시_ |
| **kong.bandwidth.count** <br>(count) | \[OpenMetrics V2\] (Kong \< 3) Kong에서 서비스/루트당 소비한 총 대역폭(바이트)입니다.<br>_byte로 표시_ |
| **kong.connections_accepted** <br>(gauge) | \[Legacy\]  허용된 총 클라이언트 연결 수입니다.<br>_connection으로 표시_ |
| **kong.connections_active** <br>(gauge) | \[Legacy\] 대기 중인 연결을 포함한 현재 활성 클라이언트 연결 수입니다.<br>_connection으로 표시_ |
| **kong.connections_handled** <br>(gauge) | \[Legacy\] 처리된 총 연결 수. 리소스 제한에 도달하지 않는 한 수락과 동일합니다. <br> _connection으로 표시_  |
| **kong.connections_reading** <br>(gauge) | \[Legacy\] Kong에서 요청 헤더를 읽고 있는 현재 연결 수<br>_connection으로 표시_ |
| **kong.connections_waiting** <br>(gauge) | \[Legacy\]  요청을 대기 중인 현재 유휴 클라이언트 연결 수<br>_connection으로 표시_ |
| **kong.connections_writing** <br>(gauge) | \[Legacy\] 이 클라이언트에 응답을 다시 쓰고 있는 현재 연결 수입니다.<br>_connection으로 표시_ |
| **kong.http.consumer.status.count** <br>(count) | \[OpenMetrics V2\] (Kong \< 3) Kong의 서비스/경로별 고객에 관한 HTTP 상태 코드<br>_request로 표시_ |
| **kong.http.requests.count** <br>(count) | \[OpenMetrics V2\] (Kong v3+) Kong의 서비스/경로별 Http 상태 코드<br>_request로 표시_ |
| **kong.http.status** <br>(count) | \[OpenMetrics V2\] (Kong \< 3) Kong의 서비스/경로별 HTTP 상태 코드<br>_request로 표시_ |
| **kong.kong.latency.ms.bucket** <br>(count) | \[OpenMetrics V2\] (Kong v3+)  Kong의 지연 시간<br>_millisecond로 표시_ |
| **kong.kong.latency.ms.count** <br>(count) | \[OpenMetrics V2\] (Kong v3+)  Kong의 지연 시간<br>_millisecond로 표시_ |
| **kong.kong.latency.ms.sum** <br>(count) | \[OpenMetrics V2\] (Kong v3+)  Kong의 지연 시간<br>_millisecond로 표시_ |
| **kong.latency.bucket** <br>(count) | \[OpenMetrics V2\] (Kong \< 3) Kong에서 추가한 지연 시간, Kong의 각 서비스/경로에 대한 총 요청 시간 및 업스트림 지연 시간입니다.<br>_millisecond로 표시_ |
| **kong.latency.count** <br>(count) | \[OpenMetrics V2\] (Kong \< 3) Kong에서 추가한 지연 시간. Kong의 각 서비스/경로의 총 요청 시간 및 업스트림 지연 시간입니다.<br>_millisecond로 표시_ |
| **kong.latency.sum** <br>(count) | \[OpenMetrics V2\] (Kong \< 3)  Kong에서 추가한 지연 시간. Kong의 각 서비스/경로의 총 요청 시간 및 업스트림 지연 시간입니다.<br>_millisecond로 표시_ |
| **kong.memory.lua.shared_dict.bytes** <br>(gauge) | \[OpenMetrics V2\] shared_dict에 바이트 단위로 할당된 슬래브입니다.<br>_byte로 표시_ |
| **kong.memory.lua.shared_dict.total_bytes** <br>(gauge) | \[OpenMetrics V2\] shared_dict의 총 용량(바이트 단위)<br>_byte로 표시_ |
| **kong.memory.workers.lua.vms.bytes** <br>(gauge) | \[OpenMetrics V2\] 작업자 Lua VM에 할당된 바이트<br>_byte로 표시_ |
| **NGINX.connections.total** <br>(gauge) | \[OpenMetrics V2\] (Kong v3+) HTTP 및 스트림 연결 수<br>_connection으로 표시_ |
| **NGINX.http.current_connections** <br>(gauge) |  \[OpenMetrics V2\] (Kong \< 3) HTTP 연결 수<br>_connection으로 표시_ |
| **NGINX.requests.total** <br>(gauge) | \[OpenMetrics V2\] (Kong v3+) 총 NGINX 연결 수<br>_request로 표시_ |
| **NGINX.stream.current_connections** <br>(gauge) | \[OpenMetrics V2\] (Kong \< 3) 스트림 연결 수<br>_connection으로 표시_ |
| **NGINX.timers** <br>(gauge) | \[OpenMetrics v2\] (Kong v2.8+)  실행 또는 보류 상태의 NGINX 타이머 총 개수<br>_item으로 표시_ |
| **kong.request.latency.ms.bucket** <br>(count) | \[OpenMetrics V2\] (Kong v3+) 요청에 Kong이 추가한 지연 시간<br>_millisecond로 표시_ |
| **kong.request.latency.ms.count** <br>(count) | \[OpenMetrics V2\] (Kong v3+) 요청에 Kong이 추가한 지연 시간<br>_millisecond로 표시_ |
| **kong.request.latency.ms.sum** <br>(count) | \[OpenMetrics V2\] (Kong v3+) 요청에 Kong이 추가한 지연 시간<br>_millisecond로 표시_ |
| **kong.session.duration.ms** <br>(count) | \[OpenMetrics V2\] (Kong v3+) Kong 스트림의 지속 시간<br>_millisecond로 표시_ |
| **kong.stream.status.count** <br>(count) | \[OpenMetrics V2\] Kong 서비스/경로별 스트림 상태 코드<br>_request로 표시_ |
| **kong.total_requests** <br>(gauge) | \[Legacy\] 총 클라이언트 요청 수<br>_request로 표시_ |
| **kong.upstream.latency.ms.bucket** <br>(count) | \[OpenMetrics V2\] (Kong v3+)  Kong에 의해 추가된 업스트림 지연 시간<br>_millisecond로 표시_ |
| **kong.upstream.latency.ms.count** <br>(count) | \[OpenMetrics V2\] (Kong v3+)  Kong에 의해 추가된 업스트림 지연 시간<br>_millisecond로 표시_ |
| **kong.upstream.latency.ms.sum** <br>(count) | \[OpenMetrics V2\](Kong v3+) Kong에 의해 추가된 업스트림 지연 시간<br>_millisecond로 표시_ |

### 이벤트

Kong 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

**kong.can_connect**

Agent가 Kong 인스턴스에 연결할 수 없는 경우 `CRITICAL`을 반환합니다. 그러지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

**kong.openmetrics.health**

Agent에 연결할 수 없는 경우 `CRITICAL`을 반환하고, 그러지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

**kong.datastore.reachable**

Kong이 데이터스토어에 연결할 수 없으면 `CRITICAL`을 반환하고, 그러지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

**kong.upstream.target.health**

대상이 비정상인 경우 `CRITICAL`을 반환하고, 그러지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

- [Datadog 통합을 통해 Kong 모니터링](https://www.datadoghq.com/blog/monitor-kong-datadog)