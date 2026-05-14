---
app_id: linkerd
categories:
- configuration & deployment
- log collection
custom_kind: 통합
description: Linkerd에서 제공하는 메트릭으로 서비스 상태를 모니터링하세요.
integration_version: 7.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Linkerd
---
## 개요

[Linkerd](https://linkerd.io)는 가볍지만 강력한 오픈 소스 서비스 메시로, CNCF 졸업(graduated) 상태입니다. 안전하고 신뢰할 수 있으며, 관측 가능한 클라우드 네이티브 애플리케이션을 생성하는 데 필요한 도구를 제공합니다. Linkerd를 통해 최소한의 설정으로 애플리케이션 변경 없이  다음 작업을 할 수 있습니다.

- 상호 TLS를 사용하여 클러스터 내 모든 TCP 통신을 투명하게 보호합니다.
- 레이턴시 인식 로드밸런싱, 요청 재시도, 시간 초과 및 블루-그린 배포를 추가하여 애플리케이션의 회복성을 유지합니다.
- 모든 메시 워크로드의 성공률, 레이턴시, 요청 볼륨을 추적하여 플랫폼 서비스 상태 메트릭을 제공합니다.

본 통합은 애플리케이션 성공률, 레이턴시, 포화도를 포함한 Linkerd 메트릭을 Datadog으로 전송합니다.

## 설정

이 OpenMetrics 기반 통합에는 최신 모드(`openmetrics_endpoint`를 대상 엔드포인트를 가리키도록 설정하여 활성화)와 레거시 모드(대신 `prometheus_url`을 설정하여 활성화)가 있습니다. 최신 기능을 모두 사용하려면최신 모드를 활성화하세요. 자세한 내용은 [OpenMetrics 기반 통합을 위한 최신 및 레거시 버전 관리](https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations)를 참고하세요.

`[OpenMetrics V1]` 또는 `[OpenMetrics V2]`로 표시된 메트릭은 Linkerd 통합의 해당 모드에서만 사용할 수 있습니다. 표시되지 않은 메트릭은 모든 모드에서 수집됩니다.

### 설치

Linkerd 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있으므로 서버에 별도로 설치할 필요가 없습니다.

### 설정

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

1. [Agent 구성 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) 루트에서 `conf.d/` 폴더의 `linkerd.d/conf.yaml` 파일을 편집합니다.
   최신 OpenMetrics 점검 예제를 사용한 모든 구성 옵션은 [샘플 `linkerd.d/conf.yaml`](https://github.com/DataDog/integrations-core/blob/master/linkerd/datadog_checks/linkerd/data/conf.yaml.example)을 참고하세요. 이전에 이 통합을 구현한 적이 있다면 [레거시 예제](https://github.com/DataDog/integrations-core/blob/7.30.x/linkerd/datadog_checks/linkerd/data/conf.yaml.example)를 참고하세요.

1. [Agent를 재시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent).

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

##### Linkerd v1

| 파라미터            | 값                                                                       |
| -------------------- | --------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `linkerd`                                                                   |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                               |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:9990/admin/metrics/prometheus"}` |

**참고**: 이 예제는 새로운 OpenMetrics 점검 기본 예제입니다. 이전에 이 통합을 구현한 적이 있다면 [레거시 예제](https://github.com/DataDog/integrations-core/blob/7.30.x/linkerd/datadog_checks/linkerd/data/conf.yaml.example)를 참고하세요.

##### Linkerd v2

| 파라미터            | 값                                                                       |
| -------------------- | --------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `linkerd`                                                                   |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                               |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:4191/metrics"}`                  |

**참고**: 이 예제는 새로운 OpenMetrics 점검 기본 예제입니다. 이전에 이 통합을 구현한 적이 있다면 [레거시 예제](https://github.com/DataDog/integrations-core/blob/7.30.x/linkerd/datadog_checks/linkerd/data/conf.yaml.example)를 참고하세요.

##### 로그 수집

Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. 이를 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/)을 참고하세요.

| 파라미터      | 값                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "linkerd", "service": "<SERVICE_NAME>"}` |

데이터 플레인 로그의 상세도를 높이려면 [프록시 로그 레벨 수정](https://linkerd.io/2/tasks/modifying-proxy-log-level/)을 참고하세요.

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `linkerd`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **linkerd.control.request.count** <br>(count) | \[OpenMetrics V2\] 컨트롤 HTTP 요청의 총 개수.<br>_request로 표시됨_ |
| **linkerd.control.request_total** <br>(count) | \[OpenMetrics V1\] 컨트롤 HTTP 요청의 총 개수.<br>_request로 표시됨_ |
| **linkerd.control.response.count** <br>(count) | \[OpenMetrics V2\] 컨트롤 HTTP 응답의 총 개수.<br>_response로 표시됨_ |
| **linkerd.control.response_latency.count** <br>(gauge) | linkerd.control.response_latency.sum이 평가되는 컨트롤 응답 수.<br>_response로 표시됨_ |
| **linkerd.control.response_latency.sum** <br>(gauge) | 컨트롤 요청 헤더가 수신된 시점부터 응답 스트림이 완료될 때까지 경과된 시간.<br>_millisecond로 표시됨_ |
| **linkerd.control.response_total** <br>(count) | \[OpenMetrics V1\] 컨트롤 HTTP 응답 총 개수.<br>_response로 표시됨_ |
| **linkerd.control.retry_skipped.count** <br>(count) | \[OpenMetrics V2\] 재시도 가능한 컨트롤 HTTP 응답 중 재시도되지 않은 총 개수.<br>_ response로 표시됨_ |
| **linkerd.control.retry_skipped_total** <br>(count) | \[OpenMetrics V1\] 재시도 가능한 컨트롤 HTTP 응답 중 재시도되지 않은 총 개수.<br>_ response로 표시됨_ |
| **linkerd.jvm.fd_count** <br>(gauge) | (유닉스 기반 OS에서만 사용 가능) 열려 있는 파일 디스크립터 수(Linkerd v1 한정).<br>_unit으로 표시됨_ |
| **linkerd.jvm.gc.ConcurrentMarkSweep.cycles** <br>(gauge) | ConcurrentMarkSweep에서 발생한 총 컬렉션 횟수 (Linkerd v1 한정).<br>_unit으로 표시됨_ |
| **linkerd.jvm.gc.ConcurrentMarkSweep.msec** <br>(gauge) | 가비지 컬렉션 풀(ConcurrentMarkSweep)이 컬렉션 작업을 수행하며 소요한 총 경과 시간(밀리초) (Linkerd v1 한정).<br>_millisecond로 표시됨_ |
| **linkerd.jvm.gc.ParNew.cycles** <br>(gauge) | ParNew에서 발생한 총 컬렉션 횟수 (Linkerd v1 한정).<br>_unit으로 표시됨_ |
| **linkerd.jvm.gc.ParNew.msec** <br>(gauge) | 가비지 컬렉션 풀(ParNew)이 컬렉션 작업하며 소요한 총 경과 시간(밀리초) (Linkerd v1 한정).<br>_millisecond로 표시됨_ |
| **linkerd.jvm.gc.cycles** <br>(gauge) | 총 컬렉션 발생 횟수(Linkerd v1 한정).<br>_unit으로 표시됨_ |
| **linkerd.jvm.gc.eden.pause_msec.quantile** <br>(gauge) | Eden 컬렉션 중단 시간 통계(단위: 밀리초) (Linkerd v1 한정).<br>_millisecond로 표시됨_ |
| **linkerd.jvm.gc.msec** <br>(gauge) | 컬렉션에 소요된 총 시간(밀리초) (Linkerd v1 한정).<br>_millisecond로 표시됨_ |
| **linkerd.jvm.heap.committed** <br>(gauge) | 객체 할당에 사용되는 힙에 대해, JVM이 사용할 수 있도록 할당된 메모리 양(바이트) (Linkerd v1 한정).<br>_ byte로 표시됨_ |
| **linkerd.jvm.heap.max** <br>(gauge) | 객체 할당에 사용되는 힙에 대해, JVM이 사용할 수 있는 최대 메모리 용량(바이트) (Linkerd v1 한정).<br>_ byte로 표시됨_ |
| **linkerd.jvm.heap.used** <br>(gauge) | 객체 할당에 사용되는 힙에 대해, 현재 사용 중인 메모리 양(바이트) (Linkerd v1 한정).<br>_ byte로 표시됨_ |
| **linkerd.jvm.mem.current.CMS_Old_Gen.used** <br>(gauge) | CMS_Old_Gen 메모리 풀에서 현재 사용 중인 메모리 용량(바이트) (Linkerd v1 한정).<br>_byte로 표시됨_ |
| **linkerd.jvm.mem.current.Par_Eden_Space.used** <br>(gauge) | Par_Eden_Space 메모리 풀에서 현재 사용 중인 메모리 용량(바이트) (Linkerd v1 한정).<br>_byte로 표시됨_ |
| **linkerd.jvm.mem.current.Par_Survivor_Space.used** <br>(gauge) | Par_Survivor_Space 메모리 풀에서 현재 사용 중인 메모리 용량(바이트) (Linkerd v1 한정).<br>_byte로 표시됨_ |
| **linkerd.jvm.nonheap.committed** <br>(gauge) | 힙이 아닌 메모리의 경우, JVM이 사용할 수 있도록 할당된 메모리 용량(바이트) (Linkerd v1 한정).<br>_ byte로 표시됨_ |
| **linkerd.jvm.nonheap.max** <br>(gauge) | 힙이 아닌 메모리의 경우, JVM이 사용할 수 있는 최대 메모리 용량(바이트) (Linkerd v1 한정).<br>_ byte로 표시됨_ |
| **linkerd.jvm.nonheap.used** <br>(gauge) | 힙이 아닌 메모리에 대해, 현재 사용된 메모리 용량(바이트) (Linkerd v1 한정).<br>_ byte로 표시됨_ |
| **linkerd.jvm.num_cpus** <br>(gauge) | JVM에서 사용 가능한 프로세서 수(Linkerd v1 한정).<br>_core로 표시됨_ |
| **linkerd.jvm.start_time** <br>(gauge) | Epoch 이후 Java 가상 머신 시작 시간(밀리초) (Linkerd v1 한정).<br>_millisecond로 표시됨_ |
| **linkerd.jvm.thread.count** <br>(gauge) | 데몬 스레드와 비데몬 스레드를 모두 포함한 활성 스레드 수(Linkerd v1 한정).<br>_thread로 표시됨_ |
| **linkerd.jvm.uptime** <br>(gauge) | Java 가상 머신 가동 시간(밀리초) (Linkerd v1 한정).<br>_millisecond로 표시됨_ |
| **linkerd.openmetrics.health** <br>(gauge) | \[OpenMetrics V2\] 해당 점검이 메트릭 엔드포인트에 연결할 수 있는지 여부.|
| **linkerd.process.cpu_seconds.count** <br>(count) | \[OpenMetrics V2\] 사용자 및 시스템 CPU 사용 시간(초) 합계.<br>_second로 표시됨_ |
| **linkerd.process.cpu_seconds_total** <br>(count) | \[OpenMetrics V1\] 사용자 및 시스템 CPU 사용 시간 합계(초).<br>_second로 표시됨_ |
| **linkerd.process.max_fds** <br>(gauge) | 열려 있는 파일 디스크립터 최대 수.<br>_file로 표시됨_ |
| **linkerd.process.open_fds** <br>(gauge) | 오픈 파일 디스크립터의 수.<br>_file로 표시됨_ |
| **linkerd.process.resident_memory** <br>(gauge) | 레지던트 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **linkerd.process.start_time** <br>(gauge) | 프로세스가 시작된 시간(UNIX epoch 이후 초 단위).<br>_second로 표시됨_ |
| **linkerd.process.virtual_memory** <br>(gauge) | 버추얼 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **linkerd.prometheus.health** <br>(gauge) | 해당 점검이 메트릭 엔드포인트에 연결할 수 있는지 여부.|
| **linkerd.request.count** <br>(count) | \[OpenMetrics V2\] 총 HTTP 요청 수.<br>_request로 표시됨_ |
| **linkerd.request_total** <br>(count) | \[OpenMetrics V1\] 총 HTTP 요청 수.<br>_request로 표시됨_ |
| **linkerd.response.count** <br>(count) | \[OpenMetrics V2\] 총 HTTP 응답 수.<br>_response로 표시됨_ |
| **linkerd.response_latency.count** <br>(gauge) | linkerd.response_latency.sum 메트릭이 평가되는 응답 수.<br>_response로 표시됨_ |
| **linkerd.response_latency.sum** <br>(gauge) | 요청 헤더가 수신된 시점부터 응답 스트림이 완료될 때까지 경과된 시간.<br>_millisecond로 표시됨_ |
| **linkerd.response_total** <br>(count) | \[OpenMetrics V1\] 총 HTTP 응답 수.<br>_response로 표시됨_ |
| **linkerd.retry_skipped.count** <br>(count) | \[OpenMetrics V2\] 재시도 가능한 HTTP 응답 중 재시도되지 않은 총 개수.<br>_ response로 표시됨_ |
| **linkerd.retry_skipped_total** <br>(count) | \[OpenMetrics V1\] 재시도 가능한 HTTP 응답 중 재시도되지 않은 총 개수.<br>_ response로 표시됨_ |
| **linkerd.route.actual_request.count** <br>(count) | \[OpenMetrics V2\] 실제 경로 HTTP 요청 총 개수.<br>_request로 표시됨_ |
| **linkerd.route.actual_request_total** <br>(count) | \[OpenMetrics V1\] 실제 경로 HTTP 요청 총 개수.<br>_request로 표시됨_ |
| **linkerd.route.actual_response.count** <br>(count) | \[OpenMetrics V2\] 실제 경로 HTTP 응답 총 개수.<br>_request로 표시됨_ |
| **linkerd.route.actual_response_latency.count** <br>(gauge) | linkerd.route.actual_response_latency.sum이 평가된 응답 수.<br>_millisecond로 표시됨_ |
| **linkerd.route.actual_response_latency.sum** <br>(gauge) | 실제 경로 요청 헤더가 수신된 시점부터 응답 스트림이 완료되는 시점까지의 경과 시간.<br>_millisecond로 표시됨_ |
| **linkerd.route.actual_response_total** <br>(count) | \[OpenMetrics V1\] 실제 경로 HTTP 응답 총 개수.<br>_response로 표시됨_ |
| **linkerd.route.actual_retry_skipped.count** <br>(count) | \[OpenMetrics V2\] 재시도 가능한 실제 경로 HTTP 응답 중 재시도되지 않은 총 개수.<br>_ response로 표시됨_ |
| **linkerd.route.actual_retry_skipped_total** <br>(count) | \[OpenMetrics V1\] 재시도 가능한 실제 경로 HTTP 응답 중 재시도되지 않은 총 개수.<br>_ response로 표시됨_ |
| **linkerd.route.request.count** <br>(count) | \[OpenMetrics V2\] 경로 HTTP 요청의 총 개수.<br>_request로 표시됨_ |
| **linkerd.route.request_total** <br>(count) | \[OpenMetrics V1\] 경로 HTTP 요청의 총 개수.<br>_request로 표시됨_ |
| **linkerd.route.response.count** <br>(count) | \[OpenMetrics V2\] 경로 HTTP 응답의 총 개수.<br>_response로 표시됨_ |
| **linkerd.route.response_latency.count** <br>(gauge) | linkerd.route.response_latency.sum 메트릭이 평가되는 응답 수.<br>_response로 표시됨_ |
| **linkerd.route.response_latency.sum** <br>(gauge) | 경로 요청 헤더가 수신된 시점부터 응답 스트림이 완료될 때까지 경과된 시간.<br>_millisecond로 표시됨_ |
| **linkerd.route.response_total** <br>(count) | \[OpenMetrics V1\] 경로 HTTP 응답의 총 개수.<br>_response로 표시됨_ |
| **linkerd.route.retry_skipped.count** <br>(count) | \[OpenMetrics V2\] 재시도 가능한 경로 HTTP 응답 중 재시도되지 않은 총 개수.<br>_ response로 표시됨_ |
| **linkerd.route.retry_skipped_total** <br>(count) | \[OpenMetrics V1\] 재시도 가능한 경로 HTTP 응답 중 재시도되지 않은 총 개수.<br>_ response로 표시됨_ |
| **linkerd.rt.client.connections** <br>(rate) | 클라이언트의 활성 연결 수(Linkerd v1 한정).<br>_connection으로 표시됨_ |
| **linkerd.rt.client.connects_s** <br>(rate) | 클라이언트의 초당 연결 수(Linkerd v1 한정).<br>_connection으로 표시됨_ |
| **linkerd.rt.client.pool_cached** <br>(gauge) | 클라이언트에서 캐시된 연결 수(Linkerd v1 한정).<br>_connection으로 표시됨_ |
| **linkerd.rt.client.pool_num_too_many_waiters** <br>(gauge) | 즉시 사용 가능한 연결이 없고 이미 대기자가 너무 많아 기다려야 했던 횟수(Linkerd v1 한정).<br>_unit으로 표시됨_ |
| **linkerd.rt.client.pool_num_waited** <br>(gauge) | 즉시 사용 가능한 연결이 없어 클라이언트가 기다려야 했던 횟수(Linkerd v1 한정).<br>_unit으로 표시됨_ |
| **linkerd.rt.client.pool_size** <br>(gauge) | 현재 사용 중이거나 사용되지 않는 연결을 포함하여 활성 상태인 연결 수(Linkerd v1 한정).<br>_connection으로 표시됨_ |
| **linkerd.rt.client.pool_waiters** <br>(gauge) | 연결을 기다리는 클라이언트 수(Linkerd v1 한정).<br>_unit으로 표시됨_ |
| **linkerd.rt.client.request_latency_ms.quantile** <br>(gauge) | 클라이언트의 요청 지연 시간(밀리초) 통계(Linkerd v1 한정).<br>_millisecond로 표시됨_ |
| **linkerd.rt.client.requests_s** <br>(rate) | 클라이언트가 초 단위로 수신한 요청 수(Linkerd v1 한정).|
| **linkerd.rt.client.status.1XX_s** <br>(rate) | 클라이언트에 대해 1XX 상태 코드를 반환하는 요청 수(초)(Linkerd v1 한정).<br>_unit으로 표시됨_ |
| **linkerd.rt.client.status.2XX_s** <br>(rate) | 클라이언트에 대해 2XX 상태 코드를 반환하는 요청 수(초)(Linkerd v1 한정).<br>_unit으로 표시됨_ |
| **linkerd.rt.client.status.3XX_s** <br>(rate) | 클라이언트에 대해 3XX 상태 코드를 반환하는 요청 수(초) (Linkerd v1 한정).<br>_unit으로 표시됨_ |
| **linkerd.rt.client.status.4XX_s** <br>(rate) | 클라이언트에 대해 4XX 상태 코드를 반환하는 요청 수(초)(Linkerd v1 한정).<br>_unit으로 표시됨_ |
| **linkerd.rt.client.status.5XX_s** <br>(rate) | 클라이언트에 대해 5XX 상태 코드를 반환하는 요청 수(초)(Linkerd v1 한정).<br>_unit으로 표시됨_ |
| **linkerd.rt.client.success_s** <br>(rate) | 클라이언트의 초당 성공 횟수(Linkerd v1 한정).|
| **linkerd.rt.server.connections** <br>(gauge) | 서버의 활성 연결 수(Linkerd v1 한정).<br>_connection으로 표시됨_ |
| **linkerd.rt.server.connects_s** <br>(rate) | 서버의 초당 연결 수 (Linkerd v1 한정).<br>_connection으로 표시됨_ |
| **linkerd.rt.server.request_latency_ms.quantile** <br>(gauge) | 서버의 요청 지연 시간(밀리초) 통계(Linkerd v1 한정).<br>_millisecond로 표시됨_ |
| **linkerd.tcp.close.count** <br>(count) | \[OpenMetrics V2\] 닫힌 연결 개수<br>_connection으로 표시됨_ |
| **linkerd.tcp.close_total** <br>(count) | \[OpenMetrics V1\] 닫힌 연결 개수<br>_connection으로 표시됨_ |
| **linkerd.tcp.connection_duration.count** <br>(gauge) | linkerd.tcp.connection_duration.sum metric 메트릭이 평가되는 연결 수.<br>_connection으로 표시됨_ |
| **linkerd.tcp.connection_duration.sum** <br>(gauge) | 연결 지속 시간.<br>_millisecond로 표시됨_ |
| **linkerd.tcp.open.count** <br>(count) | \[OpenMetrics V2\] 열려있는 연결 총 개수<br>_connection으로 표시됨_ |
| **linkerd.tcp.open_connections** <br>(gauge) | 현재 열려있는 연결 수.<br>_connection으로 표시됨_ |
| **linkerd.tcp.open_total** <br>(count) | \[OpenMetrics V1\] 열려있는 연결 총 개수<br>_connection으로 표시됨_ |
| **linkerd.tcp.read_bytes.count** <br>(count) | \[OpenMetrics V2\] 피어로부터 수신한 총 바이트 수.<br>_byte로 표시됨_ |
| **linkerd.tcp.read_bytes_total** <br>(count) | \[OpenMetrics V1\] 피어로부터 수신한 총 바이트 수.<br>_byte로 표시됨_ |
| **linkerd.tcp.write_bytes.count** <br>(count) | \[OpenMetrics V2\] 피어로 전송된 총 바이트 수.<br>_byte로 표시됨_ |
| **linkerd.tcp.write_bytes_total** <br>(count) | \[OpenMetrics V1\] 피어로 전송된 총 바이트 수.<br>_byte로 표시됨_ |

Linkerd v1에 대한 메트릭 설명은 [finagle 메트릭 가이드](https://twitter.github.io/finagle/guide/Metrics.html)를, Linkerd에서 노출되는 메트릭의 예시는 [이 gist](https://gist.githubusercontent.com/arbll/2f63a5375a4d6d5acface6ca8a51e2ab/raw/bc35ed4f0f4bac7e2643a6009f45f9068f4c1d12/gistfile1.txt)를 참고하세요.

Linkerd는 Prometheus 기반 통합입니다. Linkerd 설정에 따라 Linkerd이 일부 메트릭을 노출하지 않을 수도 있습니다. cURL 출력값에 메트릭이 표시되지 않는다면 Datadog 에이전트는 특정 메트릭을 수집할 수 없습니다.

현재 설정이 노출하는 메트릭을 목록화하려면 다음을 실행합니다.

```bash
curl <linkerd_prometheus_endpoint>
```

여기서 `linkerd_prometheus_endpoint`은 Linkerd Prometheus 엔드포인트( `linkerd.yaml`의 `prometheus_url` 설정 키와 동일한 값을 사용해야 함)입니다.

기본값으로 제공되지 않는 메트릭을 사용해야 하는 경우 `linkerd.yaml`에 엔트리를 추가할 수 있습니다.

자세한 정보는 [기본 구성](https://github.com/DataDog/integrations-core/blob/master/linkerd/datadog_checks/linkerd/data/conf.yaml.example)에 나와있는 예시를 참고하세요.

### 서비스 점검

**linkerd.prometheus.health**

Agent가 Prometheus 엔드포인트에 연결하지 못하면 `CRITICAL`을 반환하고, 그렇지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.