---
aliases:
- /ko/observability_pipelines/monitoring/metrics/
description: 대시보드, 노트북, 모니터를 구축하기 위해 Observability Pipelines에서 사용할 수 있는 메트릭을 찾아보세요.
disable_toc: false
further_reading:
- link: /metrics/summary/
  tag: 설명서
  text: Metrics Summary에 대해 자세히 알아보기
- link: /metrics/explorer/
  tag: 설명서
  text: Metrics Explorer를 사용하여 메트릭 탐색 및 분석하기
- link: /getting_started/dashboards/
  tag: 설명서
  text: 대시보드 시작하기
- link: /getting_started/monitors/
  tag: 설명서
  text: 모니터 시작하기
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: 블로그
  text: Observability Pipelines를 사용하여 AI 앱의 OTel 데이터를 ClickHouse 및 Datadog으로 라우팅하기
title: 파이프라인 사용량 메트릭
---
## 개요 {#overview}

이 설명서에는 Observability Pipelines에서 사용할 수 있는 메트릭의 일부가 나열되어 있습니다. 다음을 수행할 수 있습니다.

- 이 메트릭으로 자신만의 [대시보드][1], [노트북][2], [모니터][3]를 만듭니다.
- [Metrics Summary][5]을 사용하여 메트릭에 사용할 수 있는 메타데이터와 태그를 확인합니다. 또한 어떤 대시보드, 노트북, 모니터, SLO가 해당 메트릭을 사용하고 있는지 확인할 수 있습니다.

태그를 사용하여 특정 파이프라인, Worker, 구성 요소별로 메트릭을 그룹화하는 방법에 대한 자세한 내용은 [태그 시작하기][4]를 참조하세요.

모든 메트릭에는 다음과 같은 태그가 지정됩니다.

`pipeline_id`
: 파이프라인의 UUID입니다.

`worker_uuid`
: 메트릭을 내보내는 Worker의 UUID입니다.

`op_worker_version`
: 메트릭을 내보내는 Worker의 버전입니다.

`rc_version`
: 파이프라인이 업데이트될 때마다 증가하는 구성 버전 번호입니다.

`pipeline_name`
: 마지막으로 배포되거나 업데이트된 시점의 파이프라인 이름입니다. Worker 버전 2.18 이상에서 사용할 수 있습니다.

**참고**:
- 모든 Worker는 Worker 자체의 텔레메트리(메트릭 및 로그)를 수집하여 Datadog으로 전송하는 내부 파이프라인도 실행합니다. 이 내부 파이프라인의 구성 요소에는 값이 밑줄(`_`)로 시작하는 `component_id` 태그가 있습니다. 쿼리에서 이러한 메트릭을 제외하려면 `!component_id:_*`를 사용하세요.
- `_total`로 끝나는 메트릭은 각 시간 간격의 수를 보고하므로 원시 값이 단조롭게 증가하지 않습니다.

## 예상 사용량 메트릭 {#estimated-usage-metric}

Observability Pipelines 수집 바이트 수
: **메트릭**: `datadog.estimated_usage.observability_pipelines.ingested_bytes`
: **설명**: Observability Pipelines에서 수집한 데이터의 양입니다. 자세한 정보는 [예상 사용량 메트릭][6]을 참조하세요.

## 호스트 메트릭 {#host-metrics}

이 메트릭은 Observability Pipelines Worker를 실행하는 호스트의 정보를 제공합니다.

사용 가능한 메모리
: **메트릭**: `pipelines.host.memory_available_bytes`
: **설명:** 호스트에서 새 할당에 사용할 수 있는 메모리의 바이트 수입니다.

수신 바이트
: **메트릭**: `pipelines.host.network_receive_bytes_total`
: **설명:** 모든 인터페이스에서 호스트가 수신한 바이트 수입니다. `device` 태그를 사용하여 인터페이스별로 필터링하세요(예: `device:eth0`).

송신 바이트
: **메트릭**: `pipelines.host.network_transmit_bytes_total`
: **설명:** 모든 인터페이스에서 호스트가 보낸 바이트 수입니다. `device` 태그를 사용하여 인터페이스별로 필터링하세요.

CPU 시간
: **메트릭**: `pipelines.host.cpu_seconds_total`
: **설명:** 모드(사용자, 시스템, 유휴 등) 및 CPU 코어별로 분류된 호스트가 소비한 총 CPU 시간입니다.

디스크 읽기/쓰기 바이트
: **메트릭**: `pipelines.host.disk_read_bytes_total`, `pipelines.host.disk_written_bytes_total`
: **설명:** 호스트의 모든 디스크에서 읽고 쓴 바이트 수입니다.

호스트 가동 시간
: **메트릭**: `pipelines.host.uptime`
: **설명:** 호스트가 시작된 후 경과된 시간(초)입니다.

부하 평균
: **메트릭**: `pipelines.host.load1`, `pipelines.host.load5`, `pipelines.host.load15`
: **설명:** 지난 1분, 5분, 15분 동안의 호스트 시스템 부하 평균입니다. 부하 평균은 실행 중이거나 실행 대기 중인 프로세스 수로, Linux의 경우 중단 불가 I/O에서 차단된 프로세스도 포함합니다. 부하 평균 값을 `pipelines.host.logical_cpus` 값과 비교:  부하 평균 값이 CPU 수와 근접하면 전체 사용률을 나타내며, 그보다 높은 값은 호스트가 초과 구독되었음을 나타냅니다. Windows에서 실행 중인 Worker에서는 내보내지 않습니다.

논리 CPU
: **메트릭**: `pipelines.host.logical_cpus`
: **설명:** 호스트에서 사용 가능한 논리 CPU 스레드(하드웨어 스레드) 수입니다.

총 메모리
: **메트릭**: `pipelines.host.memory_total_bytes`
: **설명:** 호스트에 설치된 총 물리적 메모리(RAM)입니다.

## 프로세스 메트릭 {#process-metrics}

이 메트릭은 Observability Pipelines Worker 프로세스에 대한 정보를 제공합니다.

할당된 CPU 코어
: **메트릭**: `pipelines.cpu_max_cores`
: **설명:** container 또는 cgroup 제한에 따라 Worker에 할당된 CPU 코어 수입니다.

CPU 사용량
: **메트릭**: `pipelines.cpu_usage_seconds_total`
: **설명:** Observability Pipelines Worker 프로세스가 소비한 CPU 시간(초, 사용자 및 시스템 공간)입니다. 해당 메트릭의 초당 속도는 Observability Pipelines Worker가 사용하는 CPU의 비율을 나타냅니다.

데이터 디렉토리 사용 가능한 바이트
: **메트릭**: `pipelines.data_dir_available_bytes`
: **설명:** Worker가 버퍼 및 상태 데이터를 저장하는 파일 시스템에 남아 있는 여유 저장 공간입니다. 디스크 버퍼 모니터링에 유용합니다.

데이터 디렉토리 용량(바이트)
: **메트릭**: `pipelines.data_dir_capacity_bytes`
: **설명:** Worker가 버퍼 및 상태 데이터를 저장하는 파일 시스템의 총 저장 용량입니다.

메모리 제한
: **메트릭**: `pipelines.memory_max_bytes`
: **설명:** container 또는 cgroup 제한에 의해 설정된 Worker가 사용할 수 있는 최대 메모리입니다.

메모리 사용량
: **메트릭**: `pipelines.resident_memory_used_bytes`
: **설명:** Worker 프로세스가 사용하는 RSS 메모리 양(바이트)입니다.

Worker 가동 시간
: **메트릭**: `pipelines.uptime_seconds`
: **설명:** Worker 프로세스가 시작된 후 경과된 시간(초)입니다.

## Worker 수명 주기 메트릭 {#worker-lifecycle-metrics}

이 메트릭은 Observability Pipelines Worker 수명 주기 이벤트를 추적합니다.

Worker 다시 로드
: **메트릭**: `pipelines.reloaded_total`
: **설명:** 구성 변경 후와 같이 Worker 인스턴스가 다시 로드된 횟수입니다.

## 구성 요소 메트릭 {#component-metrics}

이 메트릭은 소스, 프로세서 및 대상에서 사용할 수 있습니다.

- `component_id` 태그를 사용하여 개별 구성 요소별로 필터링하거나 그룹화하세요.
- `component_type` 태그를 사용하여 소스, 프로세서 또는 대상 유형(예: Quota 프로세서의 경우 `quota`)별로 필터링하거나 그룹화하세요.
- `component_kind` 태그를 사용하여 `source`, `transform`(프로세서) 또는 `sink`(대상)별로 필터링하거나 그룹화하세요.

{{< tabs >}}
{{% tab "소스" %}}

### 처리량 {#throughput}

수신 바이트
: **메트릭**: `pipelines.component_received_bytes_total`
: **설명**: 디코딩이나 변환 전 소스의 입력에서 읽은 원시 바이트 수입니다.

수신 이벤트
: **메트릭**: `pipelines.component_received_events_total`
: **설명**: 구성 요소가 수신한 이벤트 수입니다.

송신 이벤트
: **메트릭**: `pipelines.component_sent_events_total`
: **설명**: 구성 요소가 다운스트림으로 보내는 이벤트 수입니다.

수신 이벤트 바이트
: **메트릭**: `pipelines.component_received_event_bytes_total`
: **설명**: 구성 요소가 수신한 이벤트의 바이트 크기입니다.

송신 이벤트 바이트
: **메트릭**: `pipelines.component_sent_event_bytes_total`
: **설명**: 구성 요소가 다운스트림으로 보내는 이벤트의 바이트 크기입니다.

### 오류, 드롭된 데이터 및 시간 초과 {#errors-data-dropped-and-timed-outs}

오류
: **메트릭**: `pipelines.component_errors_total`
: **설명**: 구성 요소에서 발생한 오류 수입니다. 구성 요소에 따라 이 메트릭에는 오류를 설명하는 `error_code`, `error_type` 또는 `reason` 태그가 포함될 수 있습니다.

의도적으로 또는 의도치 않게 드롭된 데이터
: **메트릭**: `pipelines.component_discarded_events_total`
: **설명**: 드롭된 이벤트 수입니다. **참고**: 이 메트릭을 분석하려면 `intentional:true` 태그를 사용하여 의도적으로 드롭된 이벤트를 필터링하거나, `intentional:false` 태그를 사용하여 의도치 않게 드롭된 이벤트를 필터링하세요.

시간 초과 이벤트
: **메트릭**: `pipelines.component_timed_out_events_total`
: **설명**: 첫 번째 프로세서로 전송되기까지 5초 넘게 대기하여 HTTP 503 오류가 발생한 이벤트 수입니다. 이벤트 전달이 차단될 경우에 발생할 수 있습니다.
: **사용 가능 대상**: Datadog Agent와 같이 시간 제한이 구성된 HTTP 기반 소스입니다.

시간 초과 요청
: **메트릭**: `pipelines.component_timed_out_requests_total`
: **설명**: HTTP 요청을 사용하여 Worker로 이벤트를 일괄 전송하는 소스에 대해 시간 초과된 요청 수입니다.
: **사용 가능 대상**: Datadog Agent와 같이 시간 제한이 구성된 HTTP 기반 소스입니다.

### 성능{#performance}

전송 지연 시간
: **메트릭**: `pipelines.source_send_latency_seconds`
: **설명**: 소스가 이벤트 청크를 다음 구성 요소로 보내는 데 소요되는 시간입니다. Worker 버전 2.16 이상에서 사용할 수 있습니다.

전송 배치 지연 시간
: **메트릭**: `pipelines.source_send_batch_latency_seconds`
: **설명**: 소스가 여러 이벤트 청크를 포함할 수 있는 배치를 다음 구성 요소로 보내는 데 소요되는 시간입니다. Worker 버전 2.16 이상에서 사용할 수 있습니다.

소스 지연 시간
: **메트릭**: `pipelines.source_lag_time_seconds`
: **설명**: 이벤트 자체의 타임스탬프와 Worker가 이를 수신한 시간 사이의 차이(초)입니다. 값이 크면 파이프라인에 오래되었거나 지연된 데이터가 전송되고 있음을 나타냅니다.

### 버퍼 {#buffer}

이 메트릭을 사용하여 버퍼 성능을 분석하세요. 별도로 명시되지 않는 한 모든 메트릭은 1초 간격으로 내보내집니다.

{{% observability_pipelines/metrics/buffer/sources %}}

{{% /tab %}}
{{% tab "프로세서" %}}

### 처리량 {#throughput-1}

수신 이벤트
: **메트릭**: `pipelines.component_received_events_total`
: **설명**: 구성 요소가 수신한 이벤트 수입니다.

송신 이벤트
: **메트릭**: `pipelines.component_sent_events_total`
: **설명**: 구성 요소가 다운스트림으로 보내는 이벤트 수입니다.

수신 이벤트 바이트
: **메트릭**: `pipelines.component_received_event_bytes_total`
: **설명**: 구성 요소가 수신한 이벤트의 바이트 크기입니다.

송신 이벤트 바이트
: **메트릭**: `pipelines.component_sent_event_bytes_total`
: **설명**: 구성 요소가 다운스트림으로 보내는 이벤트의 바이트 크기입니다.

포함된 이벤트
: **메트릭**: `pipelines.included_events_total`
: **설명**: 프로세서의 필터 쿼리와 일치하며 처리가 완료된 이벤트 수입니다. 필터 쿼리와 일치하지 않는 이벤트는 프로세서를 건너뛰고 다음 구성 요소로 계속 진행됩니다.

포함된 이벤트 바이트
: **메트릭**: `pipelines.included_event_bytes_total`
: **설명**: 프로세서의 필터 쿼리와 일치하며 처리가 완료된 이벤트의 바이트 크기입니다.

### 오류 및 드롭된 데이터 {#errors-and-data-dropped}

오류
: **메트릭**: `pipelines.component_errors_total`
: **설명**: 구성 요소에서 발생한 오류 수입니다. 구성 요소에 따라 이 메트릭에는 오류를 설명하는 `error_code`, `error_type` 또는 `reason` 태그가 포함될 수 있습니다.

의도적으로 또는 의도치 않게 드롭된 데이터
: **메트릭**: `pipelines.component_discarded_events_total`
: **설명**: 드롭된 이벤트 수입니다. **참고**: 이 메트릭을 분석하려면 `intentional:true` 태그를 사용하여 의도적으로 드롭된 이벤트를 필터링하거나, `intentional:false` 태그를 사용하여 의도치 않게 드롭된 이벤트를 필터링하세요.

### 성능 {#performance-1}

CPU 사용량
: **메트릭**: `pipelines.component_cpu_usage_ns_total`
: **설명**: 구성 요소가 소비한 CPU 시간(나노초 단위)입니다. 이 메트릭을 사용하여 개별 프로세서에 CPU 비용을 귀속시키세요. Linux 및 MacOS용 Worker 버전 2.18 이상에서 사용할 수 있습니다.
: **다음의 로그 프로세서에서 사용 가능**:<br>- 사용자 지정 프로세서<br>- 중복 제거<br>- 보강 표<br>- Grok 파서<br>- JSON 파싱<br>- XML 파싱<br>- 리듀스<br>- OCSF로 재매핑<br>- Sensitive Data Scanner<br>- 배열 분할<br>- 스로틀 로그 프로세서
: **다음의 메트릭 프로세서에서 사용 가능**:<br>- 집계 <br>- 태그 카디널리티 제한 메트릭

활용률
: **메트릭**: `pipelines.utilization`
: **설명**: 구성 요소의 활동입니다. `0` 값은 입력 대기 중인 유휴 구성 요소를 나타냅니다. `1`에 가까운 값은 구성 요소가 유휴 상태가 아님을 나타내며, 이는 해당 구성 요소가 토폴로지에서 백프레셔를 생성하는 병목 현상일 가능성이 높음을 의미합니다. 이로 인해 이벤트가 드롭될 수 있습니다.

### 버퍼 {#buffer-1}

이 메트릭을 사용하여 버퍼 성능을 분석하세요. 별도로 명시되지 않는 한 모든 메트릭은 1초 간격으로 내보내집니다.

{{% observability_pipelines/metrics/buffer/processors %}}

{{% /tab %}}
{{% tab "대상" %}}

### 처리량 {#throughput-2}

송신 바이트
: **메트릭**: `pipelines.component_sent_bytes_total`
: **설명**: 인코딩 및 변환 후 대상의 출력에 쓴 원시 바이트 수입니다.

수신 이벤트
: **메트릭**: `pipelines.component_received_events_total`
: **설명**: 구성 요소가 수신한 이벤트 수입니다.

송신 이벤트
: **메트릭**: `pipelines.component_sent_events_total`
: **설명**: 구성 요소가 다운스트림으로 보내는 이벤트 수입니다.

수신 이벤트 바이트
: **메트릭**: `pipelines.component_received_event_bytes_total`
: **설명**: 구성 요소가 수신한 이벤트의 바이트 크기입니다.

송신 이벤트 바이트
: **메트릭**: `pipelines.component_sent_event_bytes_total`
: **설명**: 구성 요소가 다운스트림으로 전송하는 이벤트의 바이트 크기입니다.

### 오류 및 드롭된 데이터 {#errors-and-data-dropped-1}

오류
: **메트릭**: `pipelines.component_errors_total`
: **설명**: 구성 요소에서 발생한 오류 수입니다. 구성 요소에 따라 이 메트릭에는 오류를 설명하는 `error_code`, `error_type` 또는 `reason` 태그가 포함될 수 있습니다.

의도적으로 또는 의도치 않게 드롭된 데이터
: **메트릭**: `pipelines.component_discarded_events_total`
: **설명**: 드롭된 이벤트 수입니다. **참고**: 이 메트릭을 분석하려면 `intentional:true` 태그를 사용하여 의도적으로 드롭된 이벤트를 필터링하거나, `intentional:false` 태그를 사용하여 의도치 않게 드롭된 이벤트를 필터링하세요.

### 성능 {#performance-2}

활용률
: **메트릭**: `pipelines.utilization`
: **설명**: 구성 요소의 활동입니다. `0` 값은 입력 대기 중인 유휴 구성 요소를 나타냅니다. `1`에 가까운 값은 구성 요소가 유휴 상태가 아님을 나타내며, 이는 해당 구성 요소가 토폴로지에서 백프레셔를 생성하는 병목 현상일 가능성이 높음을 의미합니다. 이로 인해 이벤트가 드롭될 수 있습니다.

### 버퍼 {#buffer-2}

이 메트릭을 사용하여 버퍼 성능을 분석하세요. 별도로 명시되지 않는 한 모든 메트릭은 1초 간격으로 내보내집니다.

{{% observability_pipelines/metrics/buffer/destinations %}}

#### 지원 중단된 버퍼 메트릭 {#deprecated-buffer-metrics}

{{% observability_pipelines/metrics/buffer/deprecated_destination_metrics %}}

{{% /tab %}}
{{< /tabs >}}

## HTTP 서버 메트릭 {#http-server-metrics}

이 메트릭은 Datadog Agent, HTTP/S 서버, OpenTelemetry 및 Splunk HEC 소스와 같이 HTTP를 통해 데이터를 수신하는 소스에서 내보내집니다.

- `component_id` 태그를 사용하여 개별 구성 요소별로 필터링하거나 그룹화하세요.
- `component_type` 태그를 사용하여 소스 유형별로 필터링하거나 그룹화하세요.

`pipelines.http_server_requests_received_total`
: **설명**: 수신된 HTTP 요청 수입니다.
: **메트릭 유형**: 개수

`pipelines.http_server_responses_sent_total`
: **설명**: 전송된 HTTP 응답 수입니다.
: **메트릭 유형**: 개수

`pipelines.http_server_handler_duration_seconds`
: **설명**: HTTP 요청을 처리하는 데 소요된 시간입니다.
: **메트릭 유형**: 분포

## HTTP 클라이언트 메트릭 {#http-client-metrics}

이 메트릭은 HTTP를 통해 데이터를 전송하는 대상에서 내보내집니다. 여기에는 다음이 포함됩니다.

- CrowdStrike NG-SIEM
- Datadog 로그
- Datadog 메트릭
- Elasticsearch
- Google SecOps
- HTTP 클라이언트 대상
- Microsoft Sentinel
- New Relic
- OpenSearch
- SentinelOne
- Splunk HEC

**참고**: AWS 기반 대상(Amazon S3, Amazon OpenSearch, Amazon Security Lake 등)은 이러한 메트릭을 내보내지 않습니다.

- `component_id` 태그를 사용하여 개별 구성 요소별로 필터링하거나 그룹화하세요.
- `component_type` 태그를 사용하여 대상 유형별로 필터링하거나 그룹화하세요.

`pipelines.http_client_requests_sent_total`
: **설명**: 전송된 HTTP 요청 수로, 요청 방식별로 태그가 지정되었습니다.
: **메트릭 유형**: 개수

`pipelines.http_client_responses_total`
: **설명**: 수신된 HTTP 응답 수로, 응답 상태별로 태그가 지정되었습니다.
: **메트릭 유형**: 개수

`pipelines.http_client_errors_total`
: **설명**: HTTP 클라이언트 오류 수로, 오류 종류별로 태그가 지정되었습니다.
: **메트릭 유형**: 개수

`pipelines.http_client_rtt_seconds`
: **설명**: 요청이 전송된 시점부터 최종 응답 또는 오류가 수신되는 시점까지의 HTTP 요청에 대한 왕복 시간(초)입니다.
: **메트릭 유형**: 분포

`pipelines.http_client_response_rtt_seconds`
: **설명**: HTTP 요청의 왕복 시간(초)으로, 응답 상태별로 태그가 지정되었습니다.
: **메트릭 유형**: 분포

`pipelines.http_client_error_rtt_seconds`
: **설명**: 오류가 발생한 HTTP 요청의 왕복 시간(초)으로, 오류 종류별로 태그가 지정되었습니다.
: **메트릭 유형**: 분포

## 적응형 동시 실행 메트릭 {#adaptive-concurrency-metrics}

이 메트릭은 관찰된 응답 시간을 기반으로 대상이 허용하는 실행 중인 HTTP 요청 수를 자동으로 조정하는 적응형 동시 실행 컨트롤러에 대한 정보를 제공합니다. 이 메트릭은 AWS 기반 대상을 포함하여 HTTP를 통해 데이터를 전송하는 대상에서 내보내집니다.

- `component_id` 태그를 사용하여 개별 구성 요소별로 필터링하거나 그룹화하세요.
- `component_type` 태그를 사용하여 대상 유형별로 필터링하거나 그룹화하세요.

`pipelines.active_endpoints`
: **설명**: 정상으로 표시된 대상 엔드포인트의 수입니다.
: **메트릭 유형**: 게이지

`pipelines.adaptive_concurrency_limit`
: **설명**: 응답 시간을 기반으로 적응형 동시 실행 컨트롤러가 자동으로 조정한, 이 대상에 대한 HTTP 요청의 동시 실행 제한입니다.
: **메트릭 유형**: 분포

`pipelines.adaptive_concurrency_in_flight`
: **설명**: 스로틀링 시점을 결정하기 위해 적응형 동시 실행 제한과 비교한, 대상에 전송 중인 HTTP 요청 수입니다.
: **메트릭 유형**: 분포

`pipelines.adaptive_concurrency_reached_limit`
: **설명**: 마지막 측정 간격 동안 적응형 동시 실행 컨트롤러가 계산된 제한에 도달했는지(`1`) 도달하지 않았는지(`0`) 여부입니다.
: **메트릭 유형**: 분포

`pipelines.adaptive_concurrency_back_pressure`
: **설명**: 마지막 측정 간격 동안 적응형 동시 실행 컨트롤러가 백프레셔를 감지했는지(`1`) 감지하지 않았는지(`0`) 여부입니다.
: **메트릭 유형**: 분포

`pipelines.adaptive_concurrency_averaged_rtt`
: **설명**: 적응형 동시 실행 계산의 기준선으로 사용되는, 이 대상에 대한 HTTP 요청의 평활화된 평균 왕복 시간(RTT, 초 단위)입니다.
: **메트릭 유형**: 분포

`pipelines.adaptive_concurrency_observed_rtt`
: **설명**: 이 대상에 대한 가장 최근 HTTP 요청에서 관찰된 왕복 시간(RTT, 초 단위)입니다.
: **메트릭 유형**: 분포

`pipelines.adaptive_concurrency_past_rtt_mean`
: **설명**: 적응형 동시 실행 조정을 위한 장기 기준선으로 사용되는, 이 대상에 대한 HTTP 요청의 과거 평균 RTT(초 단위)입니다.
: **메트릭 유형**: 분포

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/dashboards/
[2]: /ko/notebooks/
[3]: /ko/getting_started/monitors/
[4]: /ko/getting_started/tagging/
[5]: https://app.datadoghq.com/metric/summary
[6]: https://docs.datadoghq.com/ko/account_management/billing/usage_metrics/