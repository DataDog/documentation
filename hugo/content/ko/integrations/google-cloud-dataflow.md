---
aliases:
- /ko/integrations/google_cloud_dataflow
app_id: google-cloud-dataflow
categories:
- cloud
- google cloud
- log collection
custom_kind: integration
description: 실시간 및 과거 모드에서 데이터를 변환하고 강화하는 관리형 서비스입니다.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
  tag: 블로그
  text: Datadog으로 Dataflow 파이프라인 모니터링
media: []
title: Google Cloud Dataflow
---
## 개요

Google Cloud Dataflow는 스트림(실시간) 및 배치(기록) 모드에서 동일한 안정성과 표현 능력으로 데이터를 변환 및 보강할 수 있는 완전관리형 서비스입니다.

Datadog Google Cloud 통합을 사용하여 Google Cloud Dataflow에서 메트릭을 수집합니다.

## 설정

### 메트릭 수집

#### 설치

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 로그 수집

Google Cloud Dataflow 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 로깅을 설정하세요](https://docs.datadoghq.com/integrations/google-cloud-platform/?tab=datadogussite#log-collection).

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Dataflow 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud Dataflow 로그를 필터링하세요.
1. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.dataflow.job.active_worker_instances** <br>(gauge) | 활성 워커 인스턴스 수.|
| **gcp.dataflow.job.aggregated_worker_utilization** <br>(gauge) | 워커 풀에서 집계된 워커 사용률(예: 워커 CPU 사용률)<br>_percent로 표시_ |
| **gcp.dataflow.job.backlog_bytes** <br>(gauge) | 단계에 대해 알려진 미처리 입력 데이터 양(바이트)<br>_byte로 표시_ |
| **gcp.dataflow.job.backlog_elements** <br>(gauge) | 단계와 관련해 알려진 미처리 입력 요소의 양.|
| **gcp.dataflow.job.bigquery.write_count** <br>(count) | Dataflow 작업에서 BigQueryIO.Write를 사용한 BigQuery 쓰기 요청.|
| **gcp.dataflow.job.billable_shuffle_data_processed** <br>(gauge) | 이 Dataflow 작업에서 처리된 셔플 데이터 청구 가능 바이트 수<br> _byte로 표시_ |
| **gcp.dataflow.job.bundle_user_processing_latencies.avg** <br>(gauge) | 특정 단계에서 발생하는 평균 번들 사용자 처리 지연 시간. Streaming Engine에서 실행되는 작업에 사용 가능.<br>_millisecond로 표시_ |
| **gcp.dataflow.job.bundle_user_processing_latencies.samplecount** <br>(gauge) | 특정 단계에서 발생하는 번들 사용자 처리 지연 시간 샘플 수. Streaming Engine에서 실행되는 작업에 사용 가능.<br>_millisecond로 표시_ |
| **gcp.dataflow.job.bundle_user_processing_latencies.sumsqdev** <br>(gauge) | 특정 단계에서 발생하는 번들 사용자 처리 지연 시간 제곱편차의 합계. Streaming Engine에서 실행되는 작업에 사용 가능.<br>_millisecond로 표시_ |
| **gcp.dataflow.job.current_num_vcpus** <br>(gauge) | 이 Dataflow 작업이 현재 사용 중인 vCPU 수.<br>_cpu로 표시_ |
| **gcp.dataflow.job.current_shuffle_slots** <br>(gauge) | 이 Dataflow 작업에서 현재 사용 중인 셔플 슬롯 수.|
| **gcp.dataflow.job.data_watermark_age** <br>(gauge) | 파이프라인에서 완전히 처리된 가장 최근 데이터 아이템 경과 시간(이벤트 타임스탬프 이후 경과 시간)<br>_second로 표시_ |
| **gcp.dataflow.job.disk_space_capacity** <br>(gauge) | 이 Dataflow 작업과 연결된 모든 워커에 현재 할당된 영구 디스크 용량<br>_byte로 표시_ |
| **gcp.dataflow.job.dofn_latency_average** <br>(gauge) | 주어진 DoFn에서 단일 메시지 평균 처리 시간(최근 3분 윈도우 기준). 여기에는 GetData 호출에 소요된 시간이 포함됨.<br>_millisecond로 표시_ |
| **gcp.dataflow.job.dofn_latency_max** <br>(gauge) | 주어진 DoFn에서 단일 메시지 최대 처리 시간(최근 3분 윈도우 기준). 여기에는 GetData 호출에 소요된 시간이 포함됨.<br>_millisecond로 표시_ |
| **gcp.dataflow.job.dofn_latency_min** <br>(gauge) | 주어진 DoFn에서 단일 메시지 최소 처리 시간(최근 3분 윈도우 기준).<br>_millisecond로 표시_ |
| **gcp.dataflow.job.dofn_latency_num_messages** <br>(gauge) | 주어진 DoFn이 처리한 메시지 수(최근 3분 윈도우 기준).|
| **gcp.dataflow.job.dofn_latency_total** <br>(gauge) | 주어진 DoFn에서 모든 메시지 총 처리 시간(최근 3분 윈도우 기준). 여기에는 GetData 호출에 소요된 시간이 포함됨.<br>_millisecond로 표시_ |
| **gcp.dataflow.job.duplicates_filtered_out_count** <br>(count) | 특정 단계에서 처리 중인 메시지 중 중복으로 필터링된 메시지 수. Streaming Engine에서 실행 중인 작업에 사용 가능.|
| **gcp.dataflow.job.elapsed_time** <br>(gauge) | 현재 파이프라인 실행이 Running 상태로 유지된 시간(초). 실행이 완료되면, 다음 실행이 시작될 때까지 해당 실행의 소요 시간으로 유지됨.<br>_second로 표시_ |
| **gcp.dataflow.job.element_count** <br>(count) | 지금까지 PCollection에 추가된 요소 수<br>_item으로 표시_ |
| **gcp.dataflow.job.elements_produced_count** <br>(count) | 각 PTransform이 생성하는 요소 수.|
| **gcp.dataflow.job.estimated_backlog_processing_time** <br>(gauge) | 새 데이터가 유입되지 않고 처리량이 동일하게 유지될 경우 현재 백로그를 처리하는 데 걸리는 예상 시간(초). Streaming Engine 작업에만 사용 가능.<br>_second로 표시_ |
| **gcp.dataflow.job.estimated_byte_count** <br>(count) | 지금까지 PCollection에 추가된 예상 바이트 수<br>_byte로 표시_ |
| **gcp.dataflow.job.estimated_bytes_active** <br>(gauge) | 이 작업 단계에서 활성화된 예상 바이트 수<br>_byte로 표시_ |
| **gcp.dataflow.job.estimated_bytes_consumed_count** <br>(count) | 이 작업 단계에서 소비된 것으로 예상되는 바이트 수<br>_byte로 표시_ |
| **gcp.dataflow.job.estimated_bytes_produced_count** <br>(count) | 각 PTransform에서 생성된 요소의 예상 총 바이트 크기.|
| **gcp.dataflow.job.estimated_timer_backlog_processing_time** <br>(gauge) | 타이머가 완료될 때까지 예상되는 시간(초). Streaming Engine 작업에만 사용 가능<br>_ second로 표시_ |
| **gcp.dataflow.job.gpu_memory_utilization** <br>(gauge) | 지난 샘플 기간 동안 글로벌(디바이스) 메모리를 읽거나 쓴 시간의 백분율<br>_percent로 표시_ |
| **gcp.dataflow.job.gpu_utilization** <br>(gauge) | 지난 샘플 기간 동안 하나 이상의 커널이 GPU에서 실행된 시간의 백분율<br>_percent로 표시_ |
| **gcp.dataflow.job.horizontal_worker_scaling** <br>(gauge) | 자동 스케일러가 권장한 수평 스케일링 방향과 그 근거를 나타내는 부울 값입니다. true 메트릭 출력은 스케일링이 결정되었음을 의미하고 false 메트릭 출력은 해당 스케일링이 적용되지 않음을 의미합니다.|
| **gcp.dataflow.job.is_failed** <br>(gauge) | 작업 실패 여부.|
| **gcp.dataflow.job.max_worker_instances_limit** <br>(gauge) | 자동 스케일링에서 요청할 수 있는 최대 워커 수.|
| **gcp.dataflow.job.memory_capacity** <br>(gauge) | 현재 이 Dataflow 작업과 관련된 모든 워커에 할당된 메모리 양<br>_byte로 표시됨_ |
| **gcp.dataflow.job.min_worker_instances_limit** <br>(gauge) | 자동 스케일링을 요청할 수 있는 최소 워커 수.|
| **gcp.dataflow.job.oldest_active_message_age** <br>(gauge) | DoFn에서 가장 오래된 활성 메시지가 처리된 기간<br>_millisecond로 표시_ |
| **gcp.dataflow.job.per_stage_data_watermark_age** <br>(gauge) | 파이프라인의 이 단계에서 모든 데이터가 처리된 시점(이벤트 타임스탬프 이후 경과 시간)<br>_second로 표시_ |
| **gcp.dataflow.job.per_stage_system_lag** <br>(gauge) | 파이프라인 단계별 데이터 아이템이 처리 중이거나 처리 대기 중인 현재 최대 기간(초)<br>_second로 표시_ |
| **gcp.dataflow.job.processing_parallelism_keys** <br>(gauge) | 각 단계에서 데이터 처리에 사용되는 대략적인 키의 개수. 특정 키에 관한 처리는 직렬로 진행되므로, 단계의 총 키 개수는 해당 단계에서 사용 가능한 최대 병렬 처리량을 나타냅니다. Streaming Engine에서 실행되는 작업에 사용할 수 있습니다.|
| **gcp.dataflow.job.pubsub.late_messages_count** <br>(count) | 예상 워터마크보다 타임스탬프가 오래된 Pub/Sub 메시지 수.|
| **gcp.dataflow.job.pubsub.published_messages_count** <br>(count) | 주제 및 상태별로 분류한 게시된 Pub/Sub 메시지 수.|
| **gcp.dataflow.job.pubsub.pulled_message_ages.avg** <br>(gauge) | 수신되었으나 확인 응답(Ack)되지 않은 Pub/Sub 메시지 연령의 평균 분포<br>_millisecond로 표시_ |
| **gcp.dataflow.job.pubsub.pulled_message_ages.samplecount** <br>(gauge) | 수신되었으나 확인 응답(Ack)되지 않은 Pub/Sub 메시지 연령의 샘플 수<br>_millisecond로 표시_ |
| **gcp.dataflow.job.pubsub.pulled_message_ages.sumsqdev** <br>(gauge) | 수신되었으나 확인 응답(Ack)되지 않은 Pub/Sub 메시지 연령의 제곱편차 합계<br>_millisecond로 표시_ |
| **gcp.dataflow.job.pubsub.read_count** <br>(count) | Pub/Sub Pull 요청. Streaming Engine에서 이 메트릭은 더 이상 사용되지 않습니다. 향후 변경 사항은 <a href=https://cloud.google.com/dataflow/docs/guides/monitoring-overview>Dataflow 모니터링 인터페이스 사용</a> 페이지를 참고하세요.|
| **gcp.dataflow.job.pubsub.read_latencies.avg** <br>(count) | Dataflow 작업의 PubsubIO.Read에서 발생한 Pub/Sub Pull 요청 평균 지연 시간. Streaming Engine에서 이 메트릭은 더 이상 사용되지 않습니다. 향후 변경 사항은 <a href=https://cloud.google.com/dataflow/docs/guides/monitoring-overview>Dataflow 모니터링 인터페이스 사용</a> 페이지를 참고하세요.<br>_millisecond로 표시_ |
| **gcp.dataflow.job.pubsub.read_latencies.samplecount** <br>(count) | Dataflow 작업의 PubsubIO.Read에서 발생한 Pub/Sub Pull 요청 샘플 수. Streaming Engine에서 이 메트릭은 더 이상 사용되지 않습니다. 향후 변경 사항은 <a href=https://cloud.google.com/dataflow/docs/guides/monitoring-overview>Dataflow 모니터링 인터페이스 사용</a> 페이지를 참고하세요.<br>_millisecond로 표시_ |
| **gcp.dataflow.job.pubsub.read_latencies.sumsqdev** <br>(count) | Dataflow 작업의 PubsubIO.Read에서 발생한 Pub/Sub Pull 요청 제곱편차 합계. Streaming Engine에서 이 메트릭은 더 이상 사용되지 않습니다. 향후 변경 사항은 <a href=https://cloud.google.com/dataflow/docs/guides/monitoring-overview>Dataflow 모니터링 인터페이스 사용</a> 페이지를 참고하세요.<br>_millisecond로 표시_ |
| **gcp.dataflow.job.pubsub.streaming_pull_connection_status** <br>(gauge) | 활성 상태(OK 상태)이거나 오류로 인해 종료된(OK가 아닌 상태) 모든 Streaming Pull 연결 비율. 연결이 종료되면 Dataflow는 재연결을 시도하기 전에 일정 시간 동안 기다립니다. Streaming Engine에만 해당.<br>_percent로 표시_ |
| **gcp.dataflow.job.pubsub.write_count** <br>(count) | Dataflow 작업의 PubsubIO.Write에서 발생한 Pub/Sub Publish 요청.|
| **gcp.dataflow.job.pubsub.write_latencies.avg** <br>(count) | Dataflow 작업의 PubsubIO.Write에서 발생한 Pub/Sub Publish 요청 평균 지연 시간<br>_millisecond로 표시_ |
| **gcp.dataflow.job.pubsub.write_latencies.samplecount** <br>(count) | Dataflow 작업의 PubsubIO.Write에서 발생한 Pub/Sub Publish 요청 샘플 수<br>_millisecond로 표시_ |
| **gcp.dataflow.job.pubsub.write_latencies.sumsqdev** <br>(count) | Dataflow 작업의 PubsubIO.Write에서 발생한 Pub/Sub Publish 요청 제곱편차 합계<br>_millisecond로 표시_ |
| **gcp.dataflow.job.status** <br>(gauge) | 이 파이프라인의 현재 상태(예: RUNNING, DONE, CANCELLED, FAILED). 파이프라인이 실행 중이 아닐 때는 보고되지 않습니다.|
| **gcp.dataflow.job.streaming_engine.key_processing_availability** <br>(gauge) | 워커에게 할당되어 작업을 수행할 수 있는 스트리밍 처리 키의 비율. 사용할 수 없는 키의 작업은 키가 사용 가능할때까지 연기됩니다.|
| **gcp.dataflow.job.streaming_engine.persistent_state.read_bytes_count** <br>(count) | 특정 단계에서 읽은 스토리지 바이트 수. Streaming Engine에서 실행되는 작업에 사용할 수 있습니다.|
| **gcp.dataflow.job.streaming_engine.persistent_state.stored_bytes** <br>(gauge) | 이 작업의 영구 상태에 저장된 현재 바이트 수<br>_byte로 표시_ |
| **gcp.dataflow.job.streaming_engine.persistent_state.write_bytes_count** <br>(count) | 특정 단계에서 기록된 스토리지 바이트 수. Streaming Engine에서 실행되는 작업에 사용할 수 있습니다.|
| **gcp.dataflow.job.streaming_engine.persistent_state.write_latencies.avg** <br>(count) | 특정 단계에서 발생하는 스토리지 쓰기 평균 지연 시간. Streaming Engine에서 실행되는 작업에 사용 가능.<br>_millisecond로 표시_ |
| **gcp.dataflow.job.streaming_engine.persistent_state.write_latencies.samplecount** <br>(count) | 특정 단계에서 발생하는 스토리지 쓰기 지연 시간 샘플 수. Streaming Engine에서 실행되는 작업에 사용 가능.<br>_millisecond로 표시_ |
| **gcp.dataflow.job.streaming_engine.persistent_state.write_latencies.sumsqdev** <br>(count) | 특정 단계에서 발생하는 스토리지 쓰기 지연 시간 제곱편차 합계. Streaming Engine에서 실행되는 작업에 사용 가능.<br>_millisecond로 표시_ |
| **gcp.dataflow.job.streaming_engine.stage_end_to_end_latencies.avg** <br>(gauge) | 스트리밍 엔진이 파이프라인의 각 단계에서 소요하는 시간의 평균 분포. 이 시간에는 메시지 셔플링, 처리 대기열에 추가, 처리, 영구 상태 쓰기 대기열에 추가 및 실제 쓰기 작업이 포함됩니다.<br>_millisecond로 표시_ |
| **gcp.dataflow.job.streaming_engine.stage_end_to_end_latencies.samplecount** <br>(gauge) | 파이프라인의 각 단계에서 스트리밍 엔진이 소요한 시간 분포에 대한 샘플 수. 이 시간에는 메시지 셔플링, 처리 대기열 추가, 처리, 영구 상태 쓰기 대기열 추가 및 실제 쓰기 작업이 포함됩니다.<br>_millisecond로 표시_ |
| **gcp.dataflow.job.streaming_engine.stage_end_to_end_latencies.sumsqdev** <br>(gauge) | 파이프라인의 각 단계에서 스트리밍 엔진이 소요한 시간 분포에 대한 제곱편차 합계. 이 시간에는 메시지 셔플링, 처리 대기열에 추가, 처리, 영구 상태 쓰기 대기열에 추가 및 실제 쓰기 작업이 포함됩니다.<br>_millisecond로 표시_ |
| **gcp.dataflow.job.system_lag** <br>(gauge) | 데이터 아이템이 처리 대기 중인 현재 최대 시간(초)<br>_second로 표시_ |
| **gcp.dataflow.job.target_worker_instances** <br>(gauge) | 원하는 워커 인스턴스 수.|
| **gcp.dataflow.job.thread_time** <br>(count) | 작업의 모든 워커에서 각 스레드별로 합산한 PTransform 함수 실행 추정 시간(밀리초)<br>_millisecond로 표시_ |
| **gcp.dataflow.job.timers_pending_count** <br>(count) | 특정 단계에서 대기 중인 타이머 수. Streaming Engine에서 실행되는 작업에 사용할 수 있습니다.|
| **gcp.dataflow.job.timers_processed_count** <br>(count) | 특정 단계에서 완료된 타이머 수. Streaming Engine에서 실행되는 작업에 사용할 수 있습니다.|
| **gcp.dataflow.job.total_dcu_usage** <br>(count) | Dataflow 작업이 시작된 이후 사용된 누적 DCU(Data Compute Unit) 양.|
| **gcp.dataflow.job.total_memory_usage_time** <br>(gauge) | 이 Dataflow 작업에 할당된 총 메모리 용량(GB초)<br>_ gibibyte로 표시_ |
| **gcp.dataflow.job.total_pd_usage_time** <br>(gauge) | 이 Dataflow 작업과 관련된 모든 워커가 사용한 모든 영구 디스크의 총 GB 초<br>_gibibyte로 표시_ |
| **gcp.dataflow.job.total_secu_usage** <br>(gauge) | Dataflow 작업이 시작된 이후 사용된 총 SECU(Streaming Engine Compute Unit) 수.|
| **gcp.dataflow.job.total_shuffle_data_processed** <br>(gauge) | 이 Dataflow 작업에서 처리된 셔플 데이터의 총 바이트 수<br>_byte로 표시_ |
| **gcp.dataflow.job.total_streaming_data_processed** <br>(gauge) | 이 Dataflow 작업에서 처리된 스트리밍 데이터의 총 바이트 수<br>_byte로 표시_ |
| **gcp.dataflow.job.total_vcpu_time** <br>(gauge) | 이 Dataflow 작업에서 사용된 총 vCPU 초.|
| **gcp.dataflow.job.user_counter** <br>(gauge) | 사용자 정의 카운터 메트릭.|
| **gcp.dataflow.job.worker_utilization_hint** <br>(gauge) | 자동 스케일링 위한 워커 활용률 힌트. 이 힌트 값은 사용자가 설정하며, 목표 워커 CPU 활용 범위를 정의하여 확장 공격성에 영향을 줍니다.<br>_percent로 표시_ |
| **gcp.dataflow.job.worker_utilization_hint_is_actively_used** <br>(gauge) | 수평 자동 스케일링 정책에서 워커 활용 힌트가 실제로 사용되는지 여부를 보고합니다.|
| **gcp.dataflow.quota.region_endpoint_shuffle_slot.exceeded** <br>(count) | 할당량 메트릭 `dataflow.googleapis.com/region_endpoint_shuffle_slot`에서 한도를 초과하려는 시도 횟수.|
| **gcp.dataflow.quota.region_endpoint_shuffle_slot.limit** <br>(gauge) | 할당량 메트릭 `dataflow.googleapis.com/region_endpoint_shuffle_slot`에서 현재 한도.|
| **gcp.dataflow.quota.region_endpoint_shuffle_slot.usage** <br>(gauge) | 할당량 메트릭 `dataflow.googleapis.com/region_endpoint_shuffle_slot`에서 현재 사용량.|
| **gcp.dataflow.worker.memory.bytes_used** <br>(gauge) | Dataflow 워커에서 특정 컨테이너 인스턴스가 사용하는 메모리 사용량(바이트)<br>_byte로 표시_ |
| **gcp.dataflow.worker.memory.container_limit** <br>(gauge) | Dataflow 워커에서 특정 컨테이너 인스턴스가 사용할 수 있는 최대 RAM 크기(바이트)<br>_byte로 표시_ |
| **gcp.dataflow.worker.memory.total_limit** <br>(gauge) | Dataflow 워커가 사용할 수 있는 RAM 크기(바이트)<br>_byte로 표시_ |

<div class="alert alert-warning">
Google Cloud Dataflow를 사용하여 Apache Beam 파이프라인 메트릭을 모니터링하는 경우 <a href="https://beam.apache.org/releases/javadoc/current/org/apache/beam/sdk/metrics/Metrics.html">게이지 정적 메서드</a>에서 생성한 메트릭은 수집하지 않습니다. 해당 메트릭을 모니터링해야 하는 경우 <a href="https://micrometer.io/docs">마이크로미터(Micrometer)</a>를 사용할 수 있습니다.
</div>

### 이벤트

Google Cloud Dataflow 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Dataflow 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}