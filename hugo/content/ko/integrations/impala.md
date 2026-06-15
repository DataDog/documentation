---
app_id: impala
categories:
- 로그 수집
custom_kind: integration
description: Apache Impala 상태 및 성능을 모니터링하세요.
integration_version: 4.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Impala
---
## 개요

본 점검은 Datadog Agent를 통해 [Impala](https://impala.apache.org)를 모니터링합니다.

## 설정

아래 지침에 따라 호스트에서 실행 중인 Agent에 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에서 해당 지침을 적용하는 방법에 관한 가이드를 참고하세요.

### 설치

Impala 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있습니다.
서버에 추가로 설치할 필요가 없습니다.

### 설정

1. Impala 성능 데이터 수집을 시작하려면 Agent 구성 디렉터리 루트에서 `conf.d/` 폴더에 있는 `impala.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 impala.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/impala/datadog_checks/impala/data/conf.yaml.example)을 참고하세요.

다음은 Daemon 모니터링 예시입니다.

```yaml
init_config:

instances:
  ## @param service_type - string - required
  ## The Impala service you want to monitor. Possible values are `daemon`, `statestore`, and `catalog`.
  #
- service_type: daemon

  ## @param openmetrics_endpoint - string - required
  ## The URL exposing metrics in the OpenMetrics format.
  ##
  ## The default port for the services are:
  ## - Daemon: 25000
  ## - Statestore: 25010
  ## - Catalog: 25020
  #
  openmetrics_endpoint: http://%%host%%:25000/metrics_prometheus
```

동일한 Agent로 여러 서비스를 동시에 모니터링할 수도 있습니다.

```yaml
init_config:

instances:

- service_type: daemon
  service: daemon-1
  openmetrics_endpoint: http://<DAEMON-1-IP>:25000/metrics_prometheus
- service_type: daemon
  service: daemon-2
  openmetrics_endpoint: http://<DAEMON-2-IP>:25000/metrics_prometheus
- service_type: statestore
  openmetrics_endpoint: http://<STATESTORE-IP>:25010/metrics_prometheus
- service_type: catalog
  openmetrics_endpoint: http://<CATALOG-IP>:25020/metrics_prometheus
```

2. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### 검증

[Agent 상태 하위 명령을 실행하고](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) Checks 섹션에서 `impala`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **impala.catalog.events_processor.avg_events_fetch_duration** <br>(gauge) | \[Catalog\] 메타스토어 이벤트 배치를 가져오는 데 걸리는 평균 시간<br>_second로 표시_ |
| **impala.catalog.events_processor.avg_events_process_duration** <br>(gauge) | \[Catalog\] 메타스토어에서 수신한 이벤트 배치를 처리하는 데 소요되는 평균 시간.<br>_second로 표시_ |
| **impala.catalog.events_processor.events_received.count** <br>(count) | \[Catalog\] 수신된 메타스토어 이벤트의 총 개수.|
| **impala.catalog.events_processor.events_received_15min_rate** <br>(gauge) | \[Catalog\] 지난 15분 동안 수신된 이벤트 수의 지수 가중 이동 평균(EWMA).|
| **impala.catalog.events_processor.events_received_1min_rate** <br>(gauge) | \[Catalog\] 지난 1분 동안 수신된 이벤트 수의 지수 가중 이동 평균(EWMA).|
| **impala.catalog.events_processor.events_received_5min_rate** <br>(gauge) | \[Catalog\] 지난 5분 동안 수신된 이벤트 수의 지수 가중 이동 평균(EWMA).|
| **impala.catalog.events_processor.events_skipped.count** <br>(count) | \[Catalog\] 건너뛴 메타스토어 이벤트의 총 개수.|
| **impala.catalog.events_processor.last_synced_event_id.count** <br>(count) | \[Catalog\] 카탈로그 서버가 처리하고 동기화한 마지막 메타스토어 이벤트 ID.|
| **impala.catalog.jvm.code_cache.committed_usage** <br>(gauge) | \[Catalog\] JVM 코드 캐시 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.code_cache.current_usage** <br>(gauge) | \[Catalog\] JVM 코드 캐시 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.code_cache.init_usage** <br>(gauge) | \[Catalog\] JVM 코드 캐시 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.code_cache.max_usage** <br>(gauge) | \[Catalog\] JVM 코드 캐시 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.code_cache.peak_committed_usage** <br>(gauge) | \[Catalog\] JVM 코드 캐시 커밋 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.code_cache.peak_current_usage** <br>(gauge) | \[Catalog\] JVM 코드 캐시 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.code_cache.peak_init_usage** <br>(gauge) | \[Catalog\] JVM 코드 캐시 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.code_cache.peak_max_usage** <br>(gauge) | \[Catalog\] JVM 코드 캐시 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.compressed_class_space.committed_usage** <br>(gauge) | \[Catalog\] JVM compressed-class-space 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.compressed_class_space.current_usage** <br>(gauge) | \[Catalog\] JVM compressed-class-space 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.compressed_class_space.init_usage** <br>(gauge) | \[Catalog\] JVM compressed-class-space 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.compressed_class_space.max_usage** <br>(gauge) | \[Catalog\] JVM compressed-class-space 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.compressed_class_space.peak_committed_usage** <br>(gauge) | \[Catalog\] JVM compressed-class-space 커밋 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.compressed_class_space.peak_current_usage** <br>(gauge) | \[Catalog\] JVM compressed-class-space 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.compressed_class_space.peak_init_usage** <br>(gauge) | \[Catalog\] JVM compressed-class-space 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.compressed_class_space.peak_max_usage** <br>(gauge) | \[Catalog\] JVM compressed-class-space 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.gc.count** <br>(count) | \[Catalog\] JVM 가비지 수집 수.|
| **impala.catalog.jvm.gc.num_info_threshold_exceeded.count** <br>(count) | \[Catalog\] JVM 일시 중지 감지 정보 임계값 초과.|
| **impala.catalog.jvm.gc.num_warn_threshold_exceeded.count** <br>(count) | \[Catalog\] JVM 일시 중지 감지 경고 임계값 초과.|
| **impala.catalog.jvm.gc.time_millis.count** <br>(count) | \[Catalog\] JVM 가비지 수집 시간.<br>_millisecond로 표시_ |
| **impala.catalog.jvm.gc.total_extra_sleep_time_millis.count** <br>(count) | \[Catalog\] JVM 일시 중지 감지 추가 대기 시간.<br>_millisecond로 표시_ |
| **impala.catalog.jvm.heap.committed_usage** <br>(gauge) | \[Catalog\] JVM 힙 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.heap.current_usage** <br>(gauge) | \[Catalog\] JVM 힙 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.heap.init_usage** <br>(gauge) | \[Catalog\] JVM 힙 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.heap.max_usage** <br>(gauge) | \[Catalog\] JVM 힙 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.heap.peak_committed_usage** <br>(gauge) | \[Catalog\] JVM 힙 커밋 바이트 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.heap.peak_current_usage** <br>(gauge) | \[Catalog\] JVM 힙 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.heap.peak_init_usage** <br>(gauge) | \[Catalog\] JVM 힙 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.heap.peak_max_usage** <br>(gauge) | \[Catalog\] JVM 힙 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.metaspace.committed_usage** <br>(gauge) | \[Catalog\] JVM 메타스페이스 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.metaspace.current_usage** <br>(gauge) | \[Catalog\] JVM 메타스페이스 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.metaspace.init_usage** <br>(gauge) | \[Catalog\] JVM 메타스페이스 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.metaspace.max_usage** <br>(gauge) | \[Catalog\] JVM 메타스페이스 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.metaspace.peak_committed_usage** <br>(gauge) | \[Catalog\] JVM 메타스페이스 커밋 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.metaspace.peak_current_usage** <br>(gauge) | \[Catalog\] JVM 메타스페이스 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.metaspace.peak_init_usage** <br>(gauge) | \[Catalog\] JVM 메타스페이스 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.metaspace.peak_max_usage** <br>(gauge) | \[Catalog\] JVM 메타스페이스 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.non_heap.committed_usage** <br>(gauge) | \[Catalog\] JVM 논-힙 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.non_heap.current_usage** <br>(gauge) | \[Catalog\] JVM 논-힙 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.non_heap.init_usage** <br>(gauge) | \[Catalog\] JVM 논-힙 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.non_heap.max_usage** <br>(gauge) | \[Catalog\] JVM 논-힙 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.non_heap.peak_committed_usage** <br>(gauge) | \[Catalog\] JVM 논-힙 커밋 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.non_heap.peak_current_usage** <br>(gauge) | \[Catalog\] JVM 논-힙 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.non_heap.peak_init_usage** <br>(gauge) | \[Catalog\] JVM 논-힙 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.non_heap.peak_max_usage** <br>(gauge) | \[Catalog\] JVM 논-힙 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_eden_space.committed_usage** <br>(gauge) | \[Catalog\] JVM ps-eden-space 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_eden_space.current_usage** <br>(gauge) | \[Catalog\] JVM ps-eden-space 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_eden_space.init_usage** <br>(gauge) | \[Catalog\] JVM ps-eden-space 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_eden_space.max_usage** <br>(gauge) | \[Catalog\] JVM ps-eden-space 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_eden_space.peak_committed_usage** <br>(gauge) | \[Catalog\] JVM ps-eden-space 커밋 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_eden_space.peak_current_usage** <br>(gauge) | \[Catalog\] JVM ps-eden-space 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_eden_space.peak_init_usage** <br>(gauge) | \[Catalog\] JVM ps-eden-space 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_eden_space.peak_max_usage** <br>(gauge) | \[Catalog\] JVM ps-eden-space 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_old_gen.committed_usage** <br>(gauge) | \[Catalog\] JVM ps-old-gen 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_old_gen.current_usage** <br>(gauge) | \[Catalog\] JVM ps-old-gen 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_old_gen.init_usage** <br>(gauge) | \[Catalog\] JVM ps-old-gen 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_old_gen.max_usage** <br>(gauge) | \[Catalog\] JVM ps-old-gen 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_old_gen.peak_committed_usage** <br>(gauge) | \[Catalog\] JVM ps-old-gen 커밋 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_old_gen.peak_current_usage** <br>(gauge) | \[Catalog\] JVM ps-old-gen 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_old_gen.peak_init_usage** <br>(gauge) | \[Catalog\] JVM ps-old-gen 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_old_gen.peak_max_usage** <br>(gauge) | \[Catalog\] JVM ps-old-gen 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_survivor_space.committed_usage** <br>(gauge) | \[Catalog\] JVM ps-survivor-space 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_survivor_space.current_usage** <br>(gauge) | \[Catalog\] JVM ps-survivor-space 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_survivor_space.init_usage** <br>(gauge) | \[Catalog\] JVM ps-survivor-space 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_survivor_space.max_usage** <br>(gauge) | \[Catalog\] JVM ps-survivor-space 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_survivor_space.peak_committed_usage** <br>(gauge) | \[Catalog\] JVM ps-survivor-space 커밋 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_survivor_space.peak_current_usage** <br>(gauge) | \[Catalog\] JVM ps-survivor-space 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_survivor_space.peak_init_usage** <br>(gauge) | \[Catalog\] JVM ps-survivor-space 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.ps_survivor_space.peak_max_usage** <br>(gauge) | \[Catalog\] JVM ps-survivor-space 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.total_committed_usage** <br>(gauge) | \[Catalog\] JVM 총 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.total_current_usage** <br>(gauge) | \[Catalog\] JVM 총 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.total_init_usage** <br>(gauge) | \[Catalog\] JVM 총 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.total_max_usage** <br>(gauge) | \[Catalog\] JVM 총 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.total_peak_committed_usage** <br>(gauge) | \[Catalog\] JVM 총 커밋 바이트 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.total_peak_current_usage** <br>(gauge) | \[Catalog\] JVM 총 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.total_peak_init_usage** <br>(gauge) | \[Catalog\] JVM 총 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.jvm.total_peak_max_usage** <br>(gauge) | \[Catalog\] JVM 총 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.catalog.memory.mapped** <br>(gauge) | \[Catalog\] 이 프로세스의 메모리 매핑 총 바이트 수(가상 메모리 크기).<br>_byte로 표시_ |
| **impala.catalog.memory.rss** <br>(gauge) | \[Catalog\] TCMalloc, 버퍼 풀, JVM을 포함한 이 프로세스의 상주 집합 크기(RSS).<br>_byte로 표시_ |
| **impala.catalog.memory.total_used** <br>(gauge) | \[Catalog\] TCMalloc 및 버퍼 풀이 사용하는 현재 총 메모리.<br>_byte로 표시_ |
| **impala.catalog.partial_fetch_rpc_queue_len** <br>(gauge) | \[Catalog\] 부분 객체 가져오기용 RPC 대기열 길이.|
| **impala.catalog.rpc_method_catalog_server.get_partial_catalog_object_call_duration.count** <br>(count) | \[Catalog\] RPC 메서드가 카탈로그를 가져오는 데 소요된 시간 수.|
| **impala.catalog.rpc_method_catalog_server.get_partial_catalog_object_call_duration.quantile** <br>(gauge) | \[Catalog\] RPC 메서드가 카탈로그를 가져오는 데 소요된 시간의 분위수.|
| **impala.catalog.rpc_method_catalog_server.get_partial_catalog_object_call_duration.sum** <br>(count) | \[Catalog\] RPC 메서드가 카탈로그를 가져오는 데 소요된 시간 합계.|
| **impala.catalog.rpc_method_statestore_subscriber.heartbeat_call_duration.count** <br>(count) | \[Catalog\] Heartbeat 호출이 지속된 시간 수.|
| **impala.catalog.rpc_method_statestore_subscriber.heartbeat_call_duration.quantile** <br>(gauge) | \[Catalog\] Heartbeat 호출이 지속된 시간의 분위수.|
| **impala.catalog.rpc_method_statestore_subscriber.heartbeat_call_duration.sum** <br>(count) | \[Catalog\] Heartbeat 호출이 지속된 시간 합계.|
| **impala.catalog.rpc_method_statestore_subscriber.update_state_call_duration.count** <br>(count) | \[Catalog\] RPC 메소드가 상태를 업데이트하는 데 소요된 시간 수.|
| **impala.catalog.rpc_method_statestore_subscriber.update_state_call_duration.quantile** <br>(gauge) | \[Catalog\] RPC 메소드가 상태를 업데이트하는 데 소요된 시간의 분위수.|
| **impala.catalog.rpc_method_statestore_subscriber.update_state_call_duration.sum** <br>(count) | \[Catalog\] RPC 메소드가 상태를 업데이트하는 데 소요된 시간 합계.|
| **impala.catalog.server_topic_processing_time_s_total.count** <br>(count) | \[Catalog\] 카탈로그 서버 토픽 처리 시간<br>_second로 표시_ |
| **impala.catalog.statestore_subscriber.heartbeat_interval_time_total.count** <br>(count) | \[Catalog\] Statestore Heartbeat 간격(초)<br>_second로 표시_ |
| **impala.catalog.statestore_subscriber.last_recovery_duration** <br>(gauge) | \[Catalog\] StateStore 구독자가 마지막으로 연결이 끊겼을 때 이를 복구하는 데 걸린 시간.<br>_second로 표시_ |
| **impala.catalog.statestore_subscriber.num_connection_failures.count** <br>(count) | \[Catalog\] Daemon이 StateStore의 연결 끊김을 감지한 횟수.|
| **impala.catalog.statestore_subscriber.processing_time.count** <br>(count) | \[Catalog\] Statestore 구독자가 지정된 토픽을 처리하는 시간.|
| **impala.catalog.statestore_subscriber.statestore_client_cache.clients_in_use** <br>(gauge) | \[Catalog\] Impala Daemon 클라이언트 캐시의 활성 StateStore 구독자 클라이언트 수입니다. 이 클라이언트는 해당 역할에서 StateStore와의 통신을 위해 사용됩니다.|
| **impala.catalog.statestore_subscriber.statestore_client_cache.total_clients** <br>(gauge) | \[Catalog\] Impala Daemon의 클라이언트 캐시의 활성 StateStore 구독자 클라이언트의 총수입니다. 이 클라이언트는 해당 역할에서 StateStore와의 통신을 위해 사용됩니다.|
| **impala.catalog.statestore_subscriber.topic_update_duration_total.count** <br>(count) | \[Catalog\] Statestore 구독자 토픽 업데이트를 처리하는 데 소요된 시간(초).<br>_second로 표시_ |
| **impala.catalog.statestore_subscriber.topic_update_interval_time_total.count** <br>(count) | \[Catalog\] Statestore 구독자 토픽 업데이트 간 시간(초).<br>_second로 표시_ |
| **impala.catalog.statestore_subscriber.update_interval.count** <br>(count) | \[Catalog\] 지정된 토픽의 토픽 업데이트 간격.|
| **impala.catalog.tcmalloc.in_use** <br>(gauge) | \[Catalog\] 애플리케이션이 사용한 바이트 수입니다. 여기에는 TCMalloc 오버헤드나 메모리 조각화가 포함되지 않으므로, 일반적으로 OS가 보고한 메모리 사용량과 일치하지 않습니다.<br>_byte로 표시_ |
| **impala.catalog.tcmalloc.pageheap.free** <br>(gauge) | \Catalog\] Page Heap의 유휴 매핑 페이지의 바이트 수입니다. 해당 바이트는 할당 요청을 처리하는 데 사용할 수 있습니다. 항상 가상 메모리 사용량에 포함되며, OS가 기본 메모리를 스왑 아웃하지 않는 한 물리적 메모리 사용량에도 포함됩니다.<br>_byte로 표시_ |
| **impala.catalog.tcmalloc.pageheap.unmapped** <br>(gauge) | [\Catalog\] Page Heap의 유휴 매핑 페이지의 바이트 수입니다. 해당 바이트는 할당 요청을 처리하는 데 사용할 수 있습니다. 항상 가상 메모리 사용량에 포함되며, OS가 기본 메모리를 스왑 아웃하지 않는 한 물리적 메모리 사용량에도 포함됩니다.<br>_byte로 표시_ |
| **impala.catalog.tcmalloc.physical_reserved** <br>(gauge) | \[Catalog\] 프로세스가 사용하는 물리적 메모리 양(바이트)을 계산하는 파생 메트릭입니다. 실제로 사용 중인 메모리와 tcmalloc가 확보한 여유 바이트를 포함하며, tcmalloc 메타데이터는 포함하지 않습니다.<br>_byte로 표시_ |
| **impala.catalog.tcmalloc.total_reserved** <br>(gauge) | \[Catalog\] TCMalloc가 확보한 시스템 메모리 바이트.<br>_byte로 표시_ |
| **impala.catalog.thread_manager.running_threads** <br>(gauge) | \[Catalog\] 이 프로세스에서 실행 중인 스레드 수.|
| **impala.catalog.thread_manager.total_threads_created** <br>(gauge) | \[Catalog\] 프로세스 수명 동안 생성된 스레드.|
| **impala.catalog.thrift_server.connection.setup_queue_size** <br>(gauge) | \[Catalog\] Catalog Service에 대한 연결이 수락되어 설정 대기 중인 연결 수.|
| **impala.catalog.thrift_server.connection.setup_time.count** <br>(count) | \[Catalog\] Catalog Service의 클라이언트가 연결 설정을 기다리는 데 소요된 시간 수.|
| **impala.catalog.thrift_server.connection.setup_time.quantile** <br>(gauge) | \[Catalog\] Catalog Service의 클라이언트가 연결 설정을 기다리는 데 소요된 시간의 분위수.<br>_second로 표시_ |
| **impala.catalog.thrift_server.connection.setup_time.sum** <br>(count) | \[Catalog\] Catalog Service의 클라이언트가 연결 설정을 기다리는 데 소요된 시간의 합계.<br>_second로 표시_ |
| **impala.catalog.thrift_server.connections.in_use** <br>(gauge) | \[Catalog\] 이 Catalog Server의 활성 카탈로그 서비스 연결 수.|
| **impala.catalog.thrift_server.svc_thread_wait_time.count** <br>(count) | \[Catalog\] Catalog Service의 클라이언트가 서비스 스레드를 기다리는 데 소요된 시간 수.|
| **impala.catalog.thrift_server.svc_thread_wait_time.quantile** <br>(gauge) | \[Catalog\] Catalog Service의 클라이언트가 서비스 스레드를 기다리는 데 소요된 시간의 분위수.<br>_second로 표시_ |
| **impala.catalog.thrift_server.svc_thread_wait_time.sum** <br>(count) | \[Catalog\] Catalog Service의 클라이언트가 서비스 스레드를 기다리는 데 소요된 시간의 합계.<br>_second로 표시_ |
| **impala.catalog.thrift_server.timedout_cnxn_requests** <br>(gauge) | \[Catalog\] 설정을 기다리다 타임 아웃된 Catalog Service 연결 요청 수.|
| **impala.catalog.thrift_server.total_connections.count** <br>(count) | \[Catalog\] 이 Catalog Server 카탈로그 서비스 수명 주기 동안 발생한 연결의 총 횟수.|
| **impala.daemon.admission_controller.executor_group_num_queries_executing_default** <br>(gauge) | \[Daemon\] 실행자 그룹에서 실행 중인 총 쿼리 수: 기본값|
| **impala.daemon.admission_controller.total_dequeue_failed_coordinator_limited.count** <br>(count) | \[Daemon\] 코디네이터의 리소스 제한으로 인해 쿼리를 대기열에서 꺼낼 수 없는 횟수.|
| **impala.daemon.buffer_pool.arena.allocated_buffer_sizes.count** <br>(count) | \[Daemon\] 시스템에서 할당된 버퍼 크기의 수입니다. 오버헤드를 줄이기 위해 이 메트릭에서는 할당의 하위 집합만 계산됩니다.<br>_byte로 표시_ |
| **impala.daemon.buffer_pool.arena.allocated_buffer_sizes.quantile** <br>(gauge) | \[Daemon\] 시스템에서 할당된 버퍼 크기의 분위수입니다. 오버헤드를 줄이기 위해 이 메트릭에서는 할당의 하위 집합만 계산됩니다.<br>_byte로 표시_ |
| **impala.daemon.buffer_pool.arena.allocated_buffer_sizes.sum** <br>(count) | \[Daemon\] 시스템에서 할당된 버퍼 크기의 합계입니다. 오버헤드를 줄이기 위해 이 메트릭에서는 할당의 하위 집합만 계산됩니다.<br>_byte로 표시_ |
| **impala.daemon.buffer_pool.arena.clean_page_hits_total.count** <br>(count) | \[Daemon\] 할당을 처리하기 위해 클린 Page를 축출시킨 횟수.|
| **impala.daemon.buffer_pool.arena.direct_alloc_count_total.count** <br>(count) | \[Daemon\] 시스템 할당자로부터 직접 새 버퍼를 할당받아 할당을 처리한 횟수.|
| **impala.daemon.buffer_pool.arena.local_arena_free_buffer_hits_total.count** <br>(count) | \[Daemon\] 할당을 처리하기 위해 코어의 아레나에서 유휴 버퍼를 재활용한 횟수.|
| **impala.daemon.buffer_pool.arena.num_final_scavenges_total.count** <br>(count) | \[Daemon\] 할당을 처리하기 위해 할당자가 모든 아레나를 잠그고 스캐빈지 작업을 한 횟수.|
| **impala.daemon.buffer_pool.arena.num_scavenges_total.count** <br>(count) | \[Daemon\] 할당을 처리하기 위해 할당자가 스캐빈지를 작업을 한 횟수.|
| **impala.daemon.buffer_pool.arena.numa_arena_free_buffer_hits_total.count** <br>(count) | \[Daemon\] 동일한 NUMA 노드 내에서 재활용된 버퍼가 할당을 처리하는 데 사용된 횟수.|
| **impala.daemon.buffer_pool.arena.system_alloc_time_total.count** <br>(count) | \[Daemon\] 버퍼 풀이 이 아레나의 시스템 할당자에서 사용한 총 시간.|
| **impala.daemon.buffer_pool.clean_page_bytes** <br>(gauge) | \[Daemon\] 버퍼 풀에 캐시된 클린 Page 메모리의 총 바이트 수.<br>_byte로 표시_ |
| **impala.daemon.buffer_pool.clean_pages** <br>(gauge) | \[Daemon\] 버퍼 풀에 캐시된 총 클린 Page 수.|
| **impala.daemon.buffer_pool.clean_pages_limit** <br>(gauge) | \[Daemon\] 버퍼 풀에 캐시된 클린 Page 수 한도.|
| **impala.daemon.buffer_pool.free_buffer** <br>(gauge) | \[Daemon\] 버퍼 풀에 캐시된 유휴 버퍼 메모리의 총 바이트 수.<br>_byte로 표시_ |
| **impala.daemon.buffer_pool.free_buffers** <br>(gauge) | \[Daemon\] 버퍼 풀에 캐시된 유휴 버퍼의 총수.|
| **impala.daemon.buffer_pool.limit** <br>(gauge) | \[Daemon\] 버퍼 풀이 할당할 수 있는 최대 허용 바이트 수.<br>_byte로 표시_ |
| **impala.daemon.buffer_pool.reserved** <br>(gauge) | \[Daemon\] Impala 하위 시스템에서 확보한 버퍼의 총 바이트 수<br>_byte로 표시_ |
| **impala.daemon.buffer_pool.system_allocated** <br>(gauge) | \[Daemon\] 현재 버퍼 풀이 할당한 총 버퍼 메모리.|
| **impala.daemon.buffer_pool.unused_reservation** <br>(gauge) | \[Daemon\] 현재 사용되지 않는 Impala 하위 시스템의 버퍼 예약 총 바이트 수.<br>_byte로 표시_ |
| **impala.daemon.catalog.catalog_object_version_lower_bound** <br>(gauge) | \[Daemon\] 로컬 카탈로그 캐시에 있는 카탈로그 오브젝트 버전의 하한값.|
| **impala.daemon.catalog.curr_topic** <br>(gauge) | \[Daemon\] Statestore 토픽 업데이트 버전.|
| **impala.daemon.catalog.curr_version** <br>(gauge) | \[Daemon\] 카탈로그 토픽 업데이트 버전.|
| **impala.daemon.catalog.num_databases** <br>(gauge) | \[Daemon\] 카탈로그에 있는 데이터베이스의 수입니다.|
| **impala.daemon.catalog.num_tables** <br>(gauge) | \[Daemon\] 카탈로그의 테이블 수입니다.|
| **impala.daemon.catalog.server_client_cache.clients_in_use** <br>(gauge) | \[Daemon\] 카탈로그 서버 클라이언트 캐시에서 현재 사용 중인 클라이언트 수.|
| **impala.daemon.catalog.server_client_cache.total_clients** <br>(gauge) | \[Daemon\] 카탈로그 서버 클라이언트 캐시에 있는 총 클라이언트 수.|
| **impala.daemon.catalog_cache.average_load_time** <br>(gauge) | \[Daemon\] Impalad 카탈로그 캐시에 새 값을 로드하는 데 걸리는 평균 시간.|
| **impala.daemon.catalog_cache.eviction.count** <br>(count) | \[Daemon\] Impalad 카탈로그 캐시에서 축출된 총 횟수.|
| **impala.daemon.catalog_cache.hit.count** <br>(count) | \[Daemon\] Impalad 카탈로그 캐시 히트의 총 횟수.|
| **impala.daemon.catalog_cache.hit_rate** <br>(gauge) | \[Daemon\] 히트가 발생한 Impalad 카탈로그 캐시 요청의 비율.|
| **impala.daemon.catalog_cache.load.count** <br>(count) | \[Daemon\] 새 값을 로드한 Impalad 카탈로그 캐시 요청의 총 요청 수.|
| **impala.daemon.catalog_cache.load_exception.count** <br>(count) | \[Daemon\] 새 값을 로드하는 중 예외가 발생한 Impalad 카탈로그 캐시 요청의 총 요청 수.|
| **impala.daemon.catalog_cache.load_exception_rate** <br>(gauge) | \[Daemon\] 새 값을 로드하는 중 예외가 발생한 Impalad 카탈로그 캐시 요청의 비율.|
| **impala.daemon.catalog_cache.load_success.count** <br>(count) | \[Daemon\] 새 값을 성공적으로 로드한 Impalad 카탈로그 캐시 요청 수.|
| **impala.daemon.catalog_cache.miss.count** <br>(count) | \[Daemon\] 캐시되지 않은 값을 반환한 Impalad 카탈로그 캐시 요청 수.|
| **impala.daemon.catalog_cache.miss_rate** <br>(gauge) | \[Daemon\] 미스가 발생한 Impalad 카탈로그 캐시 요청의 비율.|
| **impala.daemon.catalog_cache.request.count** <br>(count) | \[Daemon\] Impalad 카탈로그 캐시 요청의 총 횟수.|
| **impala.daemon.catalog_cache.total_load_time.count** <br>(count) | \[Daemon\] Impalad 카탈로그 캐시에서 새 값을 로드하는 데 소요된 총 시간.<br>_second로 표시_ |
| **impala.daemon.cluster_membership.backends.count** <br>(count) | \[Daemon\] Statestore에 등록된 총 백엔드 수.|
| **impala.daemon.cluster_membership.executor_groups.count** <br>(count) | \[Daemon\] 실행자가 하나 이상 있는 실행자 그룹의 총 개수.|
| **impala.daemon.cluster_membership.executor_groups_total_healthy.count** <br>(count) | \[Daemon\] 정상 상태인 실행자 그룹의 총수. 즉, 작업 허용으로 간주되기 위한 구성 실행자 최소 수를 갖춘 경우.|
| **impala.daemon.ddl_durations_ms.count** <br>(count) | \[Daemon\] DDL 작업 레이턴시 수.<br>_millisecond로 표시_ |
| **impala.daemon.ddl_durations_ms.quantile** <br>(gauge) | \[Daemon\] DDL 작업 레이턴시의 분위수.|
| **impala.daemon.ddl_durations_ms.sum** <br>(count) | \[Daemon\] DDL 작업 레이턴시 합계.<br>_millisecond로 표시_ |
| **impala.daemon.external_data_source_class_cache.hits.count** <br>(count) | \[Daemon\] 외부 데이터 소스 클래스 캐시에서 캐시 히트의 횟수.|
| **impala.daemon.external_data_source_class_cache.misses.count** <br>(count) | \[Daemon\] 외부 데이터 소스 클래스 캐시에서 캐시 미스의 횟수.|
| **impala.daemon.hedged_read_ops.count** <br>(count) | \[Daemon\] 프로세스 수명 동안 시도된 헤지된 읽기 작업의 총 횟수.|
| **impala.daemon.hedged_read_ops.win.count** <br>(count) | \[Daemon\] 헤지된 읽기 작업이 일반 읽기 작업보다 빨랐던 총 횟수.|
| **impala.daemon.io_mgr.bytes_read.count** <br>(count) | \[Daemon\] IO 관리자가 읽은 총 바이트 수.<br>_byte로 표시_ |
| **impala.daemon.io_mgr.bytes_written.count** <br>(count) | \[Daemon\] IO 관리자가 디스크에 작성한 총 바이트 수.<br>_byte로 표시_ |
| **impala.daemon.io_mgr.cached_bytes_read.count** <br>(count) | \[Daemon\] IO 관리자가 읽은 캐시된 총 바이트 수.<br>_byte로 표시_ |
| **impala.daemon.io_mgr.cached_file_handles.hit** <br>(gauge) | \[Daemon\] 캐시된 HDFS 파일 핸들에 관한 캐시 히트 횟수|
| **impala.daemon.io_mgr.cached_file_handles.hit_ratio_total.count** <br>(count) | \[Daemon\] HDFS 파일 핸들 캐시 히트 비율로, 0과 1 사이의 값입니다. 값이 1이면 캐시된 파일 핸들에서 모든 읽기 작업이 처리되었음을 뜻합니다.<br>_byte로 표시_ |
| **impala.daemon.io_mgr.cached_file_handles.miss** <br>(gauge) | \[Daemon\] 캐시된 HDFS 파일 핸들의 캐시 히트 횟수.<br>_byte로 표시_ |
| **impala.daemon.io_mgr.cached_file_handles.miss.count** <br>(count) | \[Daemon\] 캐시된 HDFS 파일 핸들의 캐시 미스 횟수|
| **impala.daemon.io_mgr.cached_file_handles.reopened.count** <br>(count) | \[Daemon\] 다시 열린 캐시된 HDFS 파일 핸들 수|
| **impala.daemon.io_mgr.local_bytes_read.count** <br>(count) | \[Daemon\] IO 관리자가 읽은 총 로컬 바이트 수.<br>_byte로 표시_ |
| **impala.daemon.io_mgr.num_cached_file_handles** <br>(gauge) | \[Daemon\] IO 관리자에서 현재 캐시된 HDFS 파일 핸들 수.|
| **impala.daemon.io_mgr.num_file_handles_outstanding** <br>(gauge) | \[Daemon\] 현재 리더가 사용 중인 HDFS 파일 핸들 수.|
| **impala.daemon.io_mgr.num_open_files** <br>(gauge) | \[Daemon\] IO 관리자에서 현재 열려 있는 파일 수.|
| **impala.daemon.io_mgr.remote_data_cache.dropped.count** <br>(count) | \[Daemon\] 동시성 제한으로 인해 원격 데이터 캐시에 삽입되지 않은 총 바이트 수.<br>_byte로 표시_ |
| **impala.daemon.io_mgr.remote_data_cache.dropped_entries.count** <br>(count) | \[Daemon\] 동시성 제한으로 인해 원격 데이터 캐시에 삽입되지 않은 총 항목 수.|
| **impala.daemon.io_mgr.remote_data_cache.hit.count** <br>(count) | \[Daemon\] 원격 데이터 캐시의 총 히트 횟수.|
| **impala.daemon.io_mgr.remote_data_cache.hit_bytes.count** <br>(count) | \[Daemon\] 원격 데이터 캐시에서 히트가 발생한 총 바이트 수.<br>_byte로 표시_ |
| **impala.daemon.io_mgr.remote_data_cache.instant_evictions.count** <br>(count) | \[Daemon\] 원격 데이터 캐시에서 즉시 발생한 축출의 총 횟수입니다. 즉시 축출은 삽입 도중에 축출 정책이 해당 항목을 거부할 때 발생합니다.|
| **impala.daemon.io_mgr.remote_data_cache.miss.count** <br>(count) | \[Daemon\] 원격 데이터 캐시의 총 미스 횟수.|
| **impala.daemon.io_mgr.remote_data_cache.miss_bytes.count** <br>(count) | \[Daemon\] 원격 데이터 캐시에서 미스가 발생한 총 바이트 수.<br>_byte로 표시_ |
| **impala.daemon.io_mgr.remote_data_cache.num_entries** <br>(gauge) | \[Daemon\] 원격 데이터 캐시의 현재 항목 수.|
| **impala.daemon.io_mgr.remote_data_cache.num_writes.count** <br>(count) | \[Daemon\] 원격 데이터 캐시의 총 쓰기 횟수.|
| **impala.daemon.io_mgr.remote_data_cache.total** <br>(gauge) | \[Daemon\] 원격 데이터 캐시의 현재 바이트 크기.<br>_byte로 표시_ |
| **impala.daemon.io_mgr.short_circuit.read.count** <br>(count) | \[Daemon\] IO 관리자가 읽은 총 쇼트 서킷 바이트 수.<br>_byte로 표시_ |
| **impala.daemon.io_mgr_queue.read_latency.count** <br>(count) | \[Daemon\] 디스크 읽기 작업 수.|
| **impala.daemon.io_mgr_queue.read_latency.quantile** <br>(gauge) | \[Daemon\] 디스크 읽기 작업 시간의 분위수.<br>_second로 표시_ |
| **impala.daemon.io_mgr_queue.read_latency.sum** <br>(count) | \[Daemon\] 디스크 읽기 작업 시간의 합계.<br>_second로 표시_ |
| **impala.daemon.io_mgr_queue.read_size.count** <br>(count) | \[Daemon\] 디스크 읽기 작업 크기 수.|
| **impala.daemon.io_mgr_queue.read_size.quantile** <br>(gauge) | \[Daemon\] 디스크 읽기 작업 크기의 분위수.<br>_byte로 표시_ |
| **impala.daemon.io_mgr_queue.read_size.sum** <br>(count) | \[Daemon\] 디스크 읽기 작업 크기의 합계.<br>_byte로 표시_ |
| **impala.daemon.io_mgr_queue.write_io_error_total.count** <br>(count) | \[Daemon\] 디스크의 쓰기 I/O 오류 수.|
| **impala.daemon.io_mgr_queue.write_latency.count** <br>(count) | \[Daemon\] 디스크 쓰기 작업 시간 수.|
| **impala.daemon.io_mgr_queue.write_latency.quantile** <br>(gauge) | \[Daemon\] 디스크 쓰기 작업 시간의 분위수.<br>_second로 표시_ |
| **impala.daemon.io_mgr_queue.write_latency.sum** <br>(count) | \[Daemon\] 디스크 읽기 작업 시간의 합계.<br>_second로 표시_ |
| **impala.daemon.io_mgr_queue.write_size.count** <br>(count) | \[Daemon\] 디스크 쓰기 작업 크기 수.|
| **impala.daemon.io_mgr_queue.write_size.quantile** <br>(gauge) | \[Daemon\] 디스크 쓰기 작업 크기의 분위수.<br>_byte로 표시_ |
| **impala.daemon.io_mgr_queue.write_size.sum** <br>(count) | \[Daemon\] 디스크 쓰기 작업 크기의 합계.<br>_byte로 표시_ |
| **impala.daemon.jvm.code_cache.committed_usage** <br>(gauge) | \[Daemon\] JVM 코드 캐시 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.code_cache.current_usage** <br>(gauge) | \[Daemon\] JVM 코드 캐시 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.code_cache.init_usage** <br>(gauge) | \[Daemon\] JVM 코드 캐시 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.code_cache.max_usage** <br>(gauge) | \[Daemon\] JVM 코드 캐시 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.code_cache.peak_committed_usage** <br>(gauge) | \[Daemon\] JVM 코드 캐시 커밋 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.code_cache.peak_current_usage** <br>(gauge) | \[Daemon\] JVM 코드 캐시 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.code_cache.peak_init_usage** <br>(gauge) | \[Daemon\] JVM 코드 캐시 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.code_cache.peak_max_usage** <br>(gauge) | \[Daemon\] JVM 코드 캐시 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.compressed_class_space.committed_usage** <br>(gauge) | \[Daemon\] JVM compressed-class-space 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.compressed_class_space.current_usage** <br>(gauge) | \[Daemon\] JVM compressed-class-space 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.compressed_class_space.init_usage** <br>(gauge) | \[Daemon\] JVM compressed-class-space 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.compressed_class_space.max_usage** <br>(gauge) | \[Daemon\] JVM compressed-class-space 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.compressed_class_space.peak_committed_usage** <br>(gauge) | \[Daemon\] JVM compressed-class-space 커밋 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.compressed_class_space.peak_current_usage** <br>(gauge) | \[Daemon\] JVM compressed-class-space 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.compressed_class_space.peak_init_usage** <br>(gauge) | \[Daemon\] JVM compressed-class-space 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.compressed_class_space.peak_max_usage** <br>(gauge) | \[Daemon\] JVM compressed-class-space 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.gc.count** <br>(count) | \[Daemon\] JVM 가비지 수집 수.|
| **impala.daemon.jvm.gc.num_info_threshold_exceeded.count** <br>(count) | \[Daemon\] JVM 일시 중지 감지 정보 임계값 초과.|
| **impala.daemon.jvm.gc.num_warn_threshold_exceeded.count** <br>(count) | \[Daemon\] JVM 일시 중지 감지 경고 임계값 초과.|
| **impala.daemon.jvm.gc.time_millis.count** <br>(count) | \[Daemon\] JVM 가비지 수집 시간.<br>_millisecond로 표시_ |
| **impala.daemon.jvm.gc.total_extra_sleep_time_millis.count** <br>(count) | \[Daemon\] JVM 일시 중지 감지 추가 대기 시간.<br>_millisecond로 표시_ |
| **impala.daemon.jvm.heap.committed_usage** <br>(gauge) | \[Daemon\] JVM 힙 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.heap.current_usage** <br>(gauge) | \[Daemon\] JVM 힙 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.heap.init_usage** <br>(gauge) | \[Daemon\] JVM 힙 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.heap.max_usage** <br>(gauge) | \[Daemon\] JVM 힙 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.heap.peak_committed_usage** <br>(gauge) | \[Daemon\] JVM 힙 커밋 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.heap.peak_current_usage** <br>(gauge) | \[Daemon\] JVM 힙 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.heap.peak_init_usage** <br>(gauge) | \[Daemon\] JVM 힙 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.heap.peak_max_usage** <br>(gauge) | \[Daemon\] JVM 힙 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.metaspace.committed_usage** <br>(gauge) | \[Daemon\] JVM 메타스페이스 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.metaspace.current_usage** <br>(gauge) | \[Daemon\] JVM 메타스페이스 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.metaspace.init_usage** <br>(gauge) | \[Daemon\] JVM 메타스페이스 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.metaspace.max_usage** <br>(gauge) | \[Daemon\] JVM 메타스페이스 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.metaspace.peak_committed_usage** <br>(gauge) | \[Daemon\] JVM 메타스페이스 커밋 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.metaspace.peak_current_usage** <br>(gauge) | \[Daemon\] JVM 메타스페이스 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.metaspace.peak_init_usage** <br>(gauge) | \[Daemon\] JVM 메타스페이스 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.metaspace.peak_max_usage** <br>(gauge) | \[Catalog\] JVM 메타스페이스 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.non_heap.committed_usage** <br>(gauge) | \[Daemon\] JVM 논-힙 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.non_heap.current_usage** <br>(gauge) | \[Daemon\] JVM 논-힙 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.non_heap.init_usage** <br>(gauge) | \[Daemon\] JVM 논-힙 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.non_heap.max_usage** <br>(gauge) | \[Daemon\] JVM 논-힙 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.non_heap.peak_committed_usage** <br>(gauge) | \[Daemon\] JVM 논-힙 커밋 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.non_heap.peak_current_usage** <br>(gauge) | \[Daemon\] JVM 논-힙 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.non_heap.peak_init_usage** <br>(gauge) | \[Daemon\] JVM 논-힙 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.non_heap.peak_max_usage** <br>(gauge) | \[Daemon\] JVM 논-힙 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_eden_space.committed_usage** <br>(gauge) | \[Daemon\] JVM ps-eden-space 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_eden_space.current_usage** <br>(gauge) | \[Daemon\] JVM ps-eden-space 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_eden_space.init_usage** <br>(gauge) | \[Daemon\] JVM ps-eden-space 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_eden_space.max_usage** <br>(gauge) | \[Daemon\] JVM ps-eden-space 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_eden_space.peak_committed_usage** <br>(gauge) | \[Daemon\] JVM ps-eden-space 커밋 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_eden_space.peak_current_usage** <br>(gauge) | \[Daemon\] JVM ps-eden-space 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_eden_space.peak_init_usage** <br>(gauge) | \[Daemon\] JVM ps-eden-space 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_eden_space.peak_max_usage** <br>(gauge) | \[Daemon\] JVM ps-eden-space 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_old_gen.committed_usage** <br>(gauge) | \[Daemon\] JVM ps-old-gen 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_old_gen.current_usage** <br>(gauge) | \[Daemon\] JVM ps-old-gen 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_old_gen.init_usage** <br>(gauge) | \[Daemon\] JVM ps-old-gen 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_old_gen.max_usage** <br>(gauge) | \[Daemon\] JVM ps-old-gen 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_old_gen.peak_committed_usage** <br>(gauge) | \[Daemon\] JVM ps-old-gen 커밋 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_old_gen.peak_current_usage** <br>(gauge) | \[Daemon\] JVM ps-old-gen 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_old_gen.peak_init_usage** <br>(gauge) | \[Daemon\] JVM ps-old-gen 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_old_gen.peak_max_usage** <br>(gauge) | \[Daemon\] JVM ps-old-gen 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_survivor_space.committed_usage** <br>(gauge) | \[Daemon\] JVM ps-survivor-space 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_survivor_space.current_usage** <br>(gauge) | \[Daemon\] JVM ps-survivor-space 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_survivor_space.init_usage** <br>(gauge) | \[Daemon\] JVM ps-survivor-space 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_survivor_space.max_usage** <br>(gauge) | \[Daemon\] JVM ps-survivor-space 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_survivor_space.peak_committed_usage** <br>(gauge) | \[Daemon\] JVM ps-survivor-space 커밋 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_survivor_space.peak_current_usage** <br>(gauge) | \[Daemon\] JVM ps-survivor-space 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_survivor_space.peak_init_usage** <br>(gauge) | \[Daemon\] JVM ps-survivor-space 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.ps_survivor_space.peak_max_usage** <br>(gauge) | \[Daemon\] JVM ps-survivor-space 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.total_committed_usage** <br>(gauge) | \[Daemon\] JVM 총 커밋 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.total_current_usage** <br>(gauge) | \[Daemon\] JVM 총 현재 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.total_init_usage** <br>(gauge) | \[Daemon\] JVM 총 초기 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.total_max_usage** <br>(gauge) | \[Daemon\] JVM 총 최대 사용량(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.total_peak_committed_usage** <br>(gauge) | \[Daemon\] JVM 총 커밋 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.total_peak_current_usage** <br>(gauge) | \[Daemon\] JVM 총 현재 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.total_peak_init_usage** <br>(gauge) | \[Daemon\] JVM 총 초기 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.jvm.total_peak_max_usage** <br>(gauge) | \[Daemon\] JVM 총 최대 사용량 피크(바이트).<br>_byte로 표시_ |
| **impala.daemon.mem_tracker.process.bytes_freed_by_last_gc** <br>(gauge) | \[Daemon\] 마지막 메모리 추적기 가비지 수집이 해제한 메모리의 양.<br>_byte로 표시_ |
| **impala.daemon.mem_tracker.process.bytes_over_limit** <br>(gauge) | \[Daemon\] 프로세스가 마지막으로 메모리 한도에 도달했을 때 해당 메모리 한도를 초과했던 메모리 양.<br>_byte로 표시_ |
| **impala.daemon.mem_tracker.process.current_usage** <br>(gauge) | \[Daemon\] 이 서비스에 대한 Memtracker의 현재 사용량<br>_byte로 표시_ |
| **impala.daemon.mem_tracker.process.limit** <br>(gauge) | \[Daemon\] 프로세스 메모리 추적기 한도.|
| **impala.daemon.mem_tracker.process.num_gcs.count** <br>(count) | \[Daemon\] 프로세스 수명 동안 메모리 트래커가 실행한 가비지 수집의 총 횟수.|
| **impala.daemon.mem_tracker.process.peak_usage** <br>(gauge) | \[Daemon\] 이 서비스 Memtracker의 피크 사용량<br>_byte로 표시_ |
| **impala.daemon.memory.mapped** <br>(gauge) | \[Daemon\] 이 프로세스의 메모리 매핑 총 바이트 수(가상 메모리 크기).<br>_byte로 표시_ |
| **impala.daemon.memory.rss** <br>(gauge) | \[Daemon\] TCMalloc, 버퍼 풀, JVM을 포함한 이 프로세스의 상주 집합 크기(RSS).|
| **impala.daemon.memory.total_used** <br>(gauge) | \[Daemon\] TCMalloc 및 버퍼 풀이 사용하는 현재 총 메모리.<br>_byte로 표시_ |
| **impala.daemon.num_files_open_for_insert** <br>(gauge) | \[Daemon\] 현재 쓰기 작업을 위해 열려 있는 HDFS 파일 수.|
| **impala.daemon.num_fragments.count** <br>(count) | \[Daemon\] 프로세스 수명 동안 처리된 쿼리 조각의 총 수.|
| **impala.daemon.num_fragments_in_flight** <br>(gauge) | \[Daemon\] 현재 실행 중인 쿼리 조각 인스턴스 수.|
| **impala.daemon.num_open_beeswax_sessions** <br>(gauge) | \[Daemon\] 열려 있는 Beeswax 세션 수.|
| **impala.daemon.num_open_hiveserver2_sessions** <br>(gauge) | \[Daemon\] 열려 있는 HiveServer2 세션 수.|
| **impala.daemon.num_queries.count** <br>(count) | \[Daemon\] 프로세스 수명 동안 처리된 쿼리의 총수.|
| **impala.daemon.num_queries_executed.count** <br>(count) | \[Daemon\] 프로세스 수명 동안 백엔드에서 실행된 쿼리의 총수.|
| **impala.daemon.num_queries_executing** <br>(gauge) | \[Daemon\] 현재 이 백엔드에서 실행 중인 쿼리 수.|
| **impala.daemon.num_queries_expired.count** <br>(count) | \[Daemon\] 비활성 상태로 인해 만료된 쿼리 수.|
| **impala.daemon.num_queries_registered** <br>(gauge) | \[Daemon\] 이 Impala 서버 인스턴스에 등록된 총 쿼리 수입니다. 실행 중이며 종료 대기 중인 쿼리를 포함합니다.|
| **impala.daemon.num_queries_spilled.count** <br>(count) | \[Daemon\] 연산자가 스필(Spill)한 쿼리 수.|
| **impala.daemon.num_sessions_expired.count** <br>(count) | \[Daemon\] 비활성 상태로 인해 만료된 세션 수.|
| **impala.daemon.query_durations_ms.count** <br>(count) | \[Daemon\] 쿼리 레이턴시 수.|
| **impala.daemon.query_durations_ms.quantile** <br>(gauge) | \[Daemon\] 쿼리 레이턴시의 분위수.<br>_millisecond로 표시_ |
| **impala.daemon.query_durations_ms.sum** <br>(count) | \[Daemon\] 쿼리 레이턴시의 합계.<br>_millisecond로 표시_ |
| **impala.daemon.request_pool_service_resolve_pool_duration.count** <br>(count) | \[Daemon\] 요청 풀을 해결하는 데 소요된 시간(밀리초).<br>_millisecond로 표시_ |
| **impala.daemon.resultset_cache.total_bytes** <br>(gauge) | \[Daemon\] FETCH_FIRST를 지원하기 위해 캐시된 행에 사용된 총 바이트 수.<br>_byte로 표시_ |
| **impala.daemon.resultset_cache.total_num_rows** <br>(gauge) | \[Daemon\] FETCH_FIRST를 지원하기 위해 캐시된 행의 총수.|
| **impala.daemon.rpcs_queue_overflow.count** <br>(count) | \[Daemon\] 이 서비스의 서비스 큐의 오버플로로 인해 거부된 수신 RPC의 총수.|
| **impala.daemon.scan_ranges.count** <br>(count) | \[Daemon\] 프로세스 수명 동안 읽은 스캔 범위의 총수.|
| **impala.daemon.scan_ranges_num_missing_volume_id.count** <br>(count) | \[Daemon\] 프로세스 수명 동안 읽은 스캔 범위 중 볼륨 메타데이터가 없는 스캔 범위의 총수.|
| **impala.daemon.senders_blocked_on_recvr_creation** <br>(gauge) | \[Daemon\] 수신 프래그먼트가 초기화되기를 기다리는 발신자 수.|
| **impala.daemon.simple_scheduler.assignments.count** <br>(count) | \[Daemon\] 할당 수.|
| **impala.daemon.simple_scheduler.local_assignments.count** <br>(count) | \[Daemon\] 로컬 데이터에서 실행 중인 할당 수.|
| **impala.daemon.statestore_subscriber.heartbeat_interval_time.count** <br>(count) | \[Daemon\] Statestore Heartbeat 간격(초).|
| **impala.daemon.statestore_subscriber.last_recovery_duration** <br>(gauge) | \[Daemon\] StateStore 구독자가 마지막으로 연결이 끊겼을 때 이를 복구하는 데 걸린 시간.|
| **impala.daemon.statestore_subscriber.num_connection_failures.count** <br>(count) | \[Daemon\] Daemon이 StateStore에 대한 연결 끊김을 감지한 횟수.|
| **impala.daemon.statestore_subscriber.processing_time.count** <br>(count) | \[Daemon\] Statestore 구독자가 지정된 토픽을 처리하는 시간.|
| **impala.daemon.statestore_subscriber.statestore_client_cache.clients_in_use** <br>(gauge) | \[Daemon\] Impala Daemon 클라이언트 캐시의 활성 StateStore 구독자 클라이언트 수입니다. 이 클라이언트는 해당 역할에서 StateStore와의 통신을 위해 사용됩니다.|
| **impala.daemon.statestore_subscriber.statestore_client_cache.total_clients** <br>(gauge) | \[Daemon\] Impala Daemon의 클라이언트 캐시의 활성 StateStore 구독자 클라이언트의 총수입니다. 이 클라이언트는 해당 역할에서 StateStore와의 통신을 위해 사용됩니다.|
| **impala.daemon.statestore_subscriber.topic.update_duration.count** <br>(count) | \[Daemon\] Statestore 구독자 토픽 업데이트를 처리하는 데 소요된 시간(초).<br>_second로 표시_ |
| **impala.daemon.statestore_subscriber.topic.update_interval_time.count** <br>(count) | \[Daemon\] Statestore 구독자 토픽 업데이트 간 시간(초).<br>_second로 표시_ |
| **impala.daemon.statestore_subscriber.update_interval.count** <br>(count) | \[Daemon\] 지정된 토픽의 토픽 업데이트 간격.|
| **impala.daemon.tcmalloc.in_use** <br>(gauge) | \[Daemon\] 애플리케이션이 사용한 바이트 수입니다. 여기에는 TCMalloc 오버헤드나 메모리 조각화가 포함되지 않으므로, 일반적으로 OS가 보고한 메모리 사용량과 일치하지 않습니다.<br>_byte로 표시_ |
| **impala.daemon.tcmalloc.pageheap.free** <br>(gauge) | [\Daemon\] Page Heap의 유휴 매핑 페이지의 바이트 수입니다. 해당 바이트는 할당 요청을 처리하는 데 사용할 수 있습니다. 항상 가상 메모리 사용량에 포함되며, OS가 기본 메모리를 스왑 아웃하지 않는 한 물리적 메모리 사용량에도 포함됩니다.<br>_byte로 표시_ |
| **impala.daemon.tcmalloc.pageheap.unmapped** <br>(gauge) | [\Daemon\] Page Heap의 유휴 매핑 페이지의 바이트 수입니다. 해당 바이트는 할당 요청을 처리하는 데 사용할 수 있습니다. 항상 가상 메모리 사용량에 포함되며, OS가 기본 메모리를 스왑 아웃하지 않는 한 물리적 메모리 사용량에도 포함됩니다.<br>_byte로 표시_ |
| **impala.daemon.tcmalloc.physical_reserved** <br>(gauge) | \[Daemon\] 프로세스가 사용하는 물리적 메모리 양(바이트)을 계산하는 파생 메트릭입니다. 실제로 사용 중인 메모리와 tcmalloc가 확보한 여유 바이트를 포함하며, tcmalloc 메타데이터는 포함하지 않습니다.<br>_byte로 표시_ |
| **impala.daemon.tcmalloc.total_reserved** <br>(gauge) | \[Daemon\] TCMalloc가 확보한 시스템 메모리 바이트.<br>_byte로 표시_ |
| **impala.daemon.thread_manager.running_threads** <br>(gauge) | \[Daemon\] 이 프로세스에서 실행 중인 스레드 수.|
| **impala.daemon.thread_manager.total_threads_created** <br>(gauge) | \[Daemon\] 프로세스 수명 동안 생성된 스레드.|
| **impala.daemon.thrift_server.beeswax.frontend.connection_setup_queue_size** <br>(gauge) | \[Daemon\] 연결이 수락되어 설정 대기 중인 Impala Daemon에 대한 Beeswax API 연결 수.|
| **impala.daemon.thrift_server.beeswax.frontend.connection_setup_time.count** <br>(count) | \[Daemon\] Beeswax API의 시간 클라이언트가 연결 설정을 기다리는 데 소요된 시간 수.|
| **impala.daemon.thrift_server.beeswax.frontend.connection_setup_time.quantile** <br>(gauge) | \[Daemon\] Beeswax API의 시간 클라이언트가 연결 설정을 기다리는 데 소요된 시간의 분위수.<br>_second로 표시_ |
| **impala.daemon.thrift_server.beeswax.frontend.connection_setup_time.sum** <br>(count) | \[Daemon\] Beeswax API의 시간 클라이언트가 연결 설정을 기다리는 데 소요된 시간의 합계.<br>_second로 표시_ |
| **impala.daemon.thrift_server.beeswax.frontend.connections_in_use** <br>(gauge) | \[Daemon\] 이 Impala Daemon에 대한 활성 Beeswax API 연결 수.|
| **impala.daemon.thrift_server.beeswax.frontend.svc_thread_wait_time.count** <br>(count) | \[Daemon\] Beeswax API의 클라이언트가 서비스 스레드를 기다리는 데 소요된 시간 수.|
| **impala.daemon.thrift_server.beeswax.frontend.svc_thread_wait_time.quantile** <br>(gauge) | \[Daemon\] Beeswax API의 클라이언트가 서비스 스레드를 기다리는 데 소요된 시간 수.<br>_second로 표시_ |
| **impala.daemon.thrift_server.beeswax.frontend.svc_thread_wait_time.sum** <br>(count) | \[Daemon\] Beeswax API의 클라이언트가 서비스 스레드를 기다리는 데 소요된 시간의 합계.<br>_second로 표시_ |
| **impala.daemon.thrift_server.beeswax.frontend.timedout_cnxn_requests** <br>(gauge) | \[Daemon\] 설정을 기다리다 타임 아웃된 Impala Daemon의 Beeswax API 연결 요청 수.|
| **impala.daemon.thrift_server.beeswax.frontend.total_connections.count** <br>(count) | \[Daemon\] 이 Impala Daemon의 수명 주기 동안 생성된 Beeswax API 연결의 총 횟수.|
| **impala.daemon.thrift_server.hiveserver2.frontend.connection_setup_queue_size** <br>(gauge) | \[Daemon\] 연결이 수락되어 설정 대기 중인 Impala Daemon의 HiveServer2 API 연결 수.|
| **impala.daemon.thrift_server.hiveserver2.frontend.connection_setup_time.count** <br>(count) | \[Daemon\] HiveServer2 API의 시간 클라이언트가 연결 설정을 기다리는 데 소요된 시간 수.|
| **impala.daemon.thrift_server.hiveserver2.frontend.connection_setup_time.quantile** <br>(gauge) | \[Daemon\] HiveServer2 API의 시간 클라이언트가 연결 설정을 기다리는 데 소요된 시간의 분위수.<br>_second로 표시_ |
| **impala.daemon.thrift_server.hiveserver2.frontend.connection_setup_time.sum** <br>(count) | \[Daemon\] HiveServer2 API의 시간 클라이언트가 연결 설정을 기다리는 데 소요된 시간의 합계.<br>_second로 표시_ |
| **impala.daemon.thrift_server.hiveserver2.frontend.connections_in_use** <br>(gauge) | \[Daemon\] 이 Impala Daemon에 대한 활성 Beeswax API HiveServer2 연결 수.|
| **impala.daemon.thrift_server.hiveserver2.frontend.svc_thread_wait_time.count** <br>(count) | \[Daemon\] HiveServer2 API의 클라이언트가 서비스 스레드를 기다리는 데 소요된 시간 수.|
| **impala.daemon.thrift_server.hiveserver2.frontend.svc_thread_wait_time.quantile** <br>(gauge) | \[Daemon\] HiveServer2 API의 클라이언트가 서비스 스레드를 기다리는 데 소요된 시간의 분위수.<br>_second로 표시_ |
| **impala.daemon.thrift_server.hiveserver2.frontend.svc_thread_wait_time.sum** <br>(count) | \[Daemon\] HiveServer2 API의 클라이언트가 서비스 스레드를 기다리는 데 소요된 시간의 합계.<br>_second로 표시_ |
| **impala.daemon.thrift_server.hiveserver2.frontend.timedout_cnxn_requests** <br>(gauge) | \[Daemon\] 설정을 기다리다 타임 아웃된 HiveServer2의 Impala Daemon의 Beeswax API 연결 수.|
| **impala.daemon.thrift_server.hiveserver2.frontend.total_connections.count** <br>(count) | \[Daemon\] 이 Impala Daemon의 수명 주기 동안 생성된 HiveServer2의 Beeswax API 연결 총 횟수.|
| **impala.daemon.thrift_server.hiveserver2.http_frontend.connection_setup_queue_size** <br>(gauge) | \[Daemon\] 연결이 수락되어 설정 대기 중인 Impala Daemon에 대한 HiveServer2 HTTP API 연결 수.|
| **impala.daemon.thrift_server.hiveserver2.http_frontend.connection_setup_time.count** <br>(count) | \[Daemon\] HiveServer2 HTTP API의 시간 클라이언트가 연결 설정을 기다리는 데 소요된 시간 수.|
| **impala.daemon.thrift_server.hiveserver2.http_frontend.connection_setup_time.quantile** <br>(gauge) | \[Daemon\] HiveServer2 HTTP API의 시간 클라이언트가 연결 설정을 기다리는 데 소요된 시간의 분위수.<br>_second로 표시_ |
| **impala.daemon.thrift_server.hiveserver2.http_frontend.connection_setup_time.sum** <br>(count) | \[Daemon\] HiveServer2 HTTP API의 시간 클라이언트가 연결 설정을 기다리는 데 소요된 시간의 합계.<br>_second로 표시_ |
| **impala.daemon.thrift_server.hiveserver2.http_frontend.connections_in_use** <br>(gauge) | \[Daemon\] 이 Impala Daemon에 대한 활성 Beeswax HTTP API HiveServer2 연결 수.|
| **impala.daemon.thrift_server.hiveserver2.http_frontend.svc_thread_wait_time.count** <br>(count) | \[Daemon\] HiveServer2 HTTP API의 클라이언트가 서비스 스레드를 기다리는 데 소요된 시간 수.|
| **impala.daemon.thrift_server.hiveserver2.http_frontend.svc_thread_wait_time.quantile** <br>(gauge) | \[Daemon\] HiveServer2 HTTP API의 클라이언트가 서비스 스레드를 기다리는 데 소요된 시간의 분위수.<br>_second로 표시_ |
| **impala.daemon.thrift_server.hiveserver2.http_frontend.svc_thread_wait_time.sum** <br>(count) | \[Daemon\] HiveServer2 HTTP API의 클라이언트가 서비스 스레드를 기다리는 데 소요된 시간의 합계.<br>_second로 표시_ |
| **impala.daemon.thrift_server.hiveserver2.http_frontend.timedout_cnxn_requests** <br>(gauge) | \[Daemon\] 설정을 기다리다 타임 아웃된 HiveServer2의 Impala Daemon에 대한 Beeswax HTTP API 연결 수.|
| **impala.daemon.thrift_server.hiveserver2.http_frontend.total_connections.count** <br>(count) | \[Daemon\] 이 Impala Daemon의 수명 주기 동안 생성된 HiveServer2의 Beeswax HTTP API 연결 총 횟수.|
| **impala.daemon.tmp_file_mgr.active_scratch_dirs** <br>(gauge) | \[Daemon\] 디스크 스필(Spill)을 위한 활성 스크래치 디렉터리의 수.|
| **impala.daemon.tmp_file_mgr.scratch_space_bytes_used** <br>(gauge) | \[Daemon\] 모든 스크래치 디렉터리의 현재 스필(Spill)된 바이트 총량.<br>_byte로 표시_ |
| **impala.daemon.tmp_file_mgr.scratch_space_bytes_used_dir_0** <br>(gauge) | \[Daemon\] 단일 스크래치 디렉터리의 현재 스필(Spill)된 바이트 총량.<br>_byte로 표시_ |
| **impala.daemon.tmp_file_mgr.scratch_space_bytes_used_high_water_mark** <br>(gauge) | \[Daemon\] 모든 스크래치 디렉터리의 스필(Spill)된 바이트의 최고값|
| **impala.daemon.total_senders_blocked_on_recvr_creation.count** <br>(count) | \[Daemon\] 수신 프래그먼트가 초기화되기를 기다리는 동안 블록된 발신자의 총수.|
| **impala.daemon.total_senders_timedout_waiting_for_recvr_creation.count** <br>(count) | \[Daemon\] 수신 프래그먼트가 초기화되기를 기다리는 동안 타임 아웃된 발신자의 총수.|
| **impala.statestore.heartbeat_durations.count** <br>(count) | \[Statestore\]  하트비트 RPC를 전송하는 데 소요된 시간(초)입니다. 구독자 측 처리 시간과 네트워크 전송 시간을 포함합니다.<br>_second로 표시_ |
| **impala.statestore.last_priority_topic_update_durations** <br>(gauge) | \[Statestore\] 우선순위 토픽 업데이트 RPC를 전송하는 데 마지막으로 소요된 시간(초)입니다. 구독자 측 처리 시간과 네트워크 전송 시간을 포함합니다.<br>_second로 표시_ |
| **impala.statestore.last_topic_update_durations** <br>(gauge) | \[Statestore\] 비우선순위 토픽 업데이트 RPC를 전송하는 데 마지막으로 소요된 시간(초)입니다. 구독자 측 처리 시간과 네트워크 전송 시간을 포함합니다.<br>_second로 표시_ |
| **impala.statestore.live_backends** <br>(gauge) | \[Statestore\] 등록된 Statestore 구독자 수.|
| **impala.statestore.max_priority_topic_update_durations** <br>(gauge) | \[Statestore\] 우선순위 토픽 업데이트 RPC를 전송하는 데 소요된 최대 시간(초)입니다. 구독자 측 처리 시간과 네트워크 전송 시간을 포함합니다.<br>_second로 표시_ |
| **impala.statestore.max_topic_update_durations** <br>(gauge) | \[Statestore\] 비우선순위 토픽 업데이트 RPC를 전송하는 데 소요된 최대 시간(초)입니다. 구독자 측 처리 시간과 네트워크 전송 시간을 포함합니다.<br>_second로 표시_ |
| **impala.statestore.mean_priority_topic_update_durations** <br>(gauge) | \[Statestore\] 우선순위 토픽 업데이트 RPC를 전송하는 데 소요된 평균 시간(초)입니다. 구독자 측 처리 시간과 네트워크 전송 시간을 포함합니다.<br>_second로 표시_ |
| **impala.statestore.mean_topic_update_durations** <br>(gauge) | \[Statestore\] 비우선순위 토픽 업데이트 RPC를 전송하는 데 소요된 평균 시간(초)입니다. 구독자 측 처리 시간과 네트워크 전송 시간을 포함합니다.<br>_second로 표시_ |
| **impala.statestore.memory.mapped** <br>(gauge) | \[Statestore\] 이 프로세스의 메모리 매핑 총 바이트 수(가상 메모리 크기).<br>_byte로 표시_ |
| **impala.statestore.memory.rss** <br>(gauge) | \[Statestore\] TCMalloc, 버퍼 풀, JVM을 포함한 이 프로세스의 상주 집합 크기(RSS).<br>_byte로 표시_ |
| **impala.statestore.memory.total_used** <br>(gauge) | \[Statestore\] TCMalloc 및 버퍼 풀이 사용하는 현재 총 메모리.<br>_byte로 표시_ |
| **impala.statestore.min_priority_topic_update_durations** <br>(gauge) | \[Statestore\] 우선순위 토픽 업데이트 RPC를 전송하는 데 소요된 최소 시간(초)입니다. 구독자 측 처리 시간과 네트워크 전송 시간을 포함합니다.<br>_second로 표시_ |
| **impala.statestore.min_topic_update_durations** <br>(gauge) | \[Statestore\] 비우선순위 토픽 업데이트 RPC를 전송하는 데 소요된 최소 시간(초)입니다. 구독자 측 처리 시간과 네트워크 전송 시간을 포함합니다.<br>_second로 표시_ |
| **impala.statestore.priority_topic_update_durations.count** <br>(count) | \[Statestore\] 우선순위 토픽 업데이트 RPC를 전송하는 데 소요된 시간(초)입니다. 구독자 측 처리 시간과 네트워크 전송 시간을 포함합니다.<br>_second로 표시_ |
| **impala.statestore.register_subscriber_call_duration.count** <br>(count) | \[Statestore\] StateStore Service가 구독자를 등록하는 데 소요된 시간 수.|
| **impala.statestore.register_subscriber_call_duration.quantile** <br>(gauge) | \[Statestore\] StateStore Service가 구독자를 등록하는 데 소요된 시간의 사분위.<br>_second로 표시_ |
| **impala.statestore.register_subscriber_call_duration.sum** <br>(count) | \[Statestore\] StateStore Service가 구독자를 등록하는 데 소요된 시간의 합계.<br>_second로 표시_ |
| **impala.statestore.subscriber.heartbeat.client_cache.clients_in_use** <br>(gauge) | \[Statestore\] Statestore Heartbeat 클라이언트 캐시에서 사용 중인 클라이언트 수.|
| **impala.statestore.subscriber.heartbeat.client_cache.total_clients** <br>(gauge) | \[Statestore\] Statestore Heartbeat 클라이언트 캐시에서 사용 중인 클라이언트 총수.|
| **impala.statestore.subscriber.update_state.client_cache.clients_in_use** <br>(gauge) | \[Statestore\] Statestore 업데이트 상태 클라이언트 캐시에서 사용 중인 클라이언트 수.|
| **impala.statestore.subscriber.update_state.client_cache.total_clients** <br>(gauge) | \[Statestore\] Statestore 업데이트 상태 클라이언트 캐시의 클라이언트 총수.|
| **impala.statestore.tcmalloc.in_use** <br>(gauge) | \[Statestore\] 애플리케이션이 사용한 바이트 수입니다. 여기에는 TCMalloc 오버헤드나 메모리 조각화가 포함되지 않으므로, 일반적으로 OS가 보고한 메모리 사용량과 일치하지 않습니다.<br>_byte로 표시_ |
| **impala.statestore.tcmalloc.pageheap.free** <br>(gauge) | [\Statestore\] Page Heap의 유휴 매핑 페이지의 바이트 수입니다. 해당 바이트는 할당 요청을 처리하는 데 사용할 수 있습니다. 항상 가상 메모리 사용량에 포함되며, OS가 기본 메모리를 스왑 아웃하지 않는 한 물리적 메모리 사용량에도 포함됩니다.<br>_byte로 표시_ |
| **impala.statestore.tcmalloc.pageheap.unmapped** <br>(gauge) | [\Statestore\] Page Heap의 유휴 매핑 페이지의 바이트 수입니다. 해당 바이트는 할당 요청을 처리하는 데 사용할 수 있습니다. 항상 가상 메모리 사용량에 포함되며, OS가 기본 메모리를 스왑 아웃하지 않는 한 물리적 메모리 사용량에도 포함됩니다.<br>_byte로 표시_ |
| **impala.statestore.tcmalloc.physical_reserved** <br>(gauge) | \[Statestore\] 프로세스가 사용하는 물리적 메모리 양(바이트)을 계산하는 파생 메트릭입니다. 실제로 사용 중인 메모리와 tcmalloc가 확보한 여유 바이트를 포함하며, tcmalloc 메타데이터는 포함하지 않습니다.<br>_byte로 표시_ |
| **impala.statestore.tcmalloc.total_reserved** <br>(gauge) | \[Statestore\] TCMalloc가 확보한 시스템 메모리 바이트.<br>_byte로 표시_ |
| **impala.statestore.thread_manager.running_threads** <br>(gauge) | \[Statestore\] 이 프로세스에서 실행 중인 스레드 수.|
| **impala.statestore.thread_manager.total_threads_created** <br>(gauge) | \[Statestore\] 프로세스 수명 동안 생성된 스레드.|
| **impala.statestore.thrift_server.connection_setup_queue_size** <br>(gauge) | \[Statestore\] Statestore Service 연결이 수락되어 설정 대기 중인 연결 수.|
| **impala.statestore.thrift_server.connection_setup_time.count** <br>(count) | \[Statestore\] StateStore Service의 클라이언트가 연결 설정을 기다리는 데 소요된 시간 수.|
| **impala.statestore.thrift_server.connection_setup_time.quantile** <br>(gauge) | \[Statestore\] StateStore Service의 클라이언트가 연결 설정을 기다리는 데 소요된 시간의 분위수.<br>_second로 표시_ |
| **impala.statestore.thrift_server.connection_setup_time.sum** <br>(count) | \[Statestore\] StateStore Service의 클라이언트가 연결 설정을 기다리는 데 소요된 시간의 합계.<br>_second로 표시_ |
| **impala.statestore.thrift_server.connections_in_use** <br>(gauge) | \[Statestore\] 이 StateStore의 서비스 활성 연결의 수.|
| **impala.statestore.thrift_server.svc_thread_wait_time.count** <br>(count) | \[Statestore\] StateStore Service의 클라이언트가 서비스 스레드를 기다리는 데 소요된 시간 수.|
| **impala.statestore.thrift_server.svc_thread_wait_time.quantile** <br>(gauge) | \[Statestore\] StateStore Service의 클라이언트가 서비스 스레드를 기다리는 데 소요된 시간의 분위수.<br>_second로 표시_ |
| **impala.statestore.thrift_server.svc_thread_wait_time.sum** <br>(count) | \[Statestore\] StateStore Service의 클라이언트가 서비스 스레드를 기다리는 데 소요된 시간의 합계.<br>_second로 표시_ |
| **impala.statestore.thrift_server.timedout_cnxn_requests** <br>(gauge) | \[Statestore\] 설정을 기다리다 타임 아웃된 Statestore Service 연결 요청 수.|
| **impala.statestore.thrift_server.total_connections.count** <br>(count) | \[Statestore\] 이 StateStore의 StateStore 서비스 수명 주기 동안 발생한 연결의 총 횟수.|
| **impala.statestore.topic_update_durations.count** <br>(count) | \[Statestore\] 비우선순위 토픽 업데이트 RPC를 전송하는 데 소요된 시간(초)입니다. 구독자 측 처리 시간과 네트워크 전송 시간을 포함합니다.<br>_second로 표시_ |
| **impala.statestore.total_key_size** <br>(gauge) | \[Statestore\] StateStore가 추적하는 모든 토픽의 모든 키 크기의 합계.<br>_byte로 표시_ |
| **impala.statestore.total_topic_size** <br>(gauge) | \[Statestore\] StateStore가 추적하는 모든 토픽의 모든 키 및 값의 크기의 합계.<br>_byte로 표시_ |
| **impala.statestore.total_value_size** <br>(gauge) | \[Statestore\] StateStore가 추적하는 모든 토픽에 관한 모든 값 크기의 합계.<br>_byte로 표시_ |

### 이벤트

Impala 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

**impala.daemon.openmetrics.health**

점검이 Impala Daemon 인스턴스의 Prometheus 메트릭 엔드포인트에 접근할 수 없는 경우 `CRITICAL`을 반환합니다.

_상태: ok, critical_

**impala.statestore.openmetrics.health**

점검이 Impala Statestore 인스턴스의 Prometheus 메트릭 엔드포인트에 접근할 수 없는 경우 `CRITICAL`을 반환합니다.

_상태: ok, critical_

**impala.catalog.openmetrics.health**

점검이 Impala 카탈로그 인스턴스의 Prometheus 메트릭 엔드포인트에 접근할 수 없는 경우 `CRITICAL`을 반환합니다.

_상태: ok, critical_

### 로그

Impala 통합은 Impala 서비스에서 로그를 수집하여 Datadog으로 전달할 수 있습니다.

1. Datadog Agent에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. `impalad.d/conf.yaml` 파일에서 로그 구성 블록의 주석 처리를 제거하고 편집하세요. 다음은 Daemon 프로세스의 예시입니다.

   ```yaml
   logs:
     - type: file
       path: /var/log/impala/impalad.INFO
       source: impala
       tags:
       - service_type:daemon
       log_processing_rules:
       - type: multi_line
         pattern: ^[IWEF]\d{4} (\d{2}:){2}\d{2}
         name: new_log_start_with_log_level_and_date
     - type: file
       path: /var/log/impala/impalad.WARNING
       source: impala
       tags:
       - service_type:daemon
       log_processing_rules:
       - type: multi_line
         pattern: ^[IWEF]\d{4} (\d{2}:){2}\d{2}
         name: new_log_start_with_log_level_and_date
     - type: file
       path: /var/log/impala/impalad.ERROR
       source: impala
       tags:
       - service_type:daemon
       log_processing_rules:
       - type: multi_line
         pattern: ^[IWEF]\d{4} (\d{2}:){2}\d{2}
         name: new_log_start_with_log_level_and_date
     - type: file
       path: /var/log/impala/impalad.FATAL
       source: impala
       tags:
       - service_type:daemon
       log_processing_rules:
       - type: multi_line
         pattern: ^[IWEF]\d{4} (\d{2}:){2}\d{2}
         name: new_log_start_with_log_level_and_date
   ```

모든 로그를 수집하는 방법은 [샘플 구성 파일](https://github.com/DataDog/integrations-core/blob/master/impala/datadog_checks/impala/data/conf.yaml.example#L632-L755)을 참조하세요.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.