---
aliases:
- /ko/integrations/google_cloud_spanner
app_id: google-cloud-spanner
categories:
- cloud
- data stores
- google cloud
- log collection
custom_kind: integration
description: 강력한 일관성과 수평적 확장성을 전부 갖춘 최초이자 유일한 관계형 데이터베이스 서비스입니다.
media: []
title: Google Cloud Spanner
---
## 개요

Google Cloud Spanner는 강력한 일관성과 수평적 확장성을 전부 갖춘 최초이자 유일한 관계형 데이터베이스 서비스입니다.

Google Spanner 메트릭을 수집하면 다음을 할 수 있습니다.

- Spanner 데이터베이스 성능을 가시화합니다.
- Spanner 데이터베이스의 성능과 애플리케이션의 상관 관계를 파악합니다.

## 설정

### 메트릭 수집

#### 설치

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 로그 수집

Google Cloud Spanner 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection)하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Spanner 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud Spanner 로그를 필터링하세요.

1. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.

1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.

   {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub 로그를 Pub/Sub로 내보내기" >}}

1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.spanner.api.api_request_count** <br>(count) | Cloud Spanner API 요청.<br>_second로 표시_ |
| **gcp.spanner.api.read_request_latencies_by_change_stream.avg** <br>(count) | 체인지 스트림 쿼리 여부에 따른 읽기 요청 레이턴시의 평균 분포. Cloud Spanner 백엔드 및 API 레이어에서의 요청 처리 레이턴시가 포함됩니다. 클라이언트와 서버 간의 네트워크 또는 리버스 프록시 오버헤드는 포함되지 않습니다.<br>_second로 표시_ |
| **gcp.spanner.api.read_request_latencies_by_change_stream.samplecount** <br>(count) | 체인지 스트림 쿼리 여부에 따른 읽기 요청 레이턴시 분포의 샘플 수. Cloud Spanner 백엔드 및 API 레이어에서의 요청 처리 레이턴시가 포함됩니다. 클라이언트와 서버 간의 네트워크 또는 리버스 프록시 오버헤드는 포함되지 않습니다.<br>_second로 표시_ |
| **gcp.spanner.api.read_request_latencies_by_change_stream.sumsqdev** <br>(count) | 체인지 스트림 쿼리 여부에 따른 읽기 요청 레이턴시 분포의 편차 제곱합. Cloud Spanner 백엔드 및 API 레이어에서의 요청 처리 레이턴시가 포함됩니다. 클라이언트와 서버 간의 네트워크 또는 리버스 프록시 오버헤드는 포함되지 않습니다.<br>_second로 표시_ |
| **gcp.spanner.api.read_request_latencies_by_serving_location.avg** <br>(count) | 서비스 위치, 다이렉티드 리드(directed read) 쿼리 여부, 체인지 스트림 쿼리 여부에 따른 읽기 요청 레이턴시의 평균 분포. Cloud Spanner 백엔드 및 API 레이어의 요청 처리 레이턴시가 포함됩니다. 클라이언트와 서버 간의 네트워크 또는 리버스 프록시 오버헤드는 포함되지 않습니다.<br>_second로 표시_ |
| **gcp.spanner.api.read_request_latencies_by_serving_location.samplecount** <br>(count) | 서비스 위치, 다이렉티드 리드(directed read) 쿼리 여부, 체인지 스트림 쿼리 여부에 따른 읽기 요청 레이턴시 분포의 샘플 수. Cloud Spanner 백엔드 및 API 레이어의 요청 처리 레이턴시가 포함됩니다. 클라이언트와 서버 간의 네트워크 또는 리버스 프록시 오버헤드는 포함되지 않습니다.<br>_second로 표시_ |
| **gcp.spanner.api.read_request_latencies_by_serving_location.sumsqdev** <br>(count) | 서비스 위치, 다이렉티드 리드(directed read) 쿼리 여부, 체인지 스트림 쿼리 여부에 따른 읽기 요청 레이턴시 분포의 편차 제곱합. Cloud Spanner 백엔드 및 API 레이어의 요청 처리 레이턴시가 포함됩니다. 클라이언트와 서버 간의 네트워크 또는 리버스 프록시 오버헤드는 포함되지 않습니다.<br>_second로 표시_ |
| **gcp.spanner.api.received_bytes_count** <br>(count) | Cloud Spanner가 수신한 압축되지 않은 요청 바이트 수<br>_byte로 표시_ |
| **gcp.spanner.api.request_count** <br>(rate) | Cloud Spanner API 요청 비율.<br>_request로 표시_ |
| **gcp.spanner.api.request_latencies.avg** <br>(gauge) | 데이터베이스의 서버 요청 평균 레이턴시.<br>_second로 표시_ |
| **gcp.spanner.api.request_latencies.samplecount** <br>(gauge) | 데이터베이스의 서버 요청 레이턴시의 샘플 수.<br>_second로 표시_ |
| **gcp.spanner.api.request_latencies.sumsqdev** <br>(gauge) | 데이터베이스의 서버 요청 레이턴시의 편차 제곱합.<br>_second로 표시_ |
| **gcp.spanner.api.request_latencies_by_transaction_type.avg** <br>(count) | 트랜잭션 유형별 서버 요청 레이턴시의 평균 분포. Cloud Spanner 백엔드 및 API 레이어의 요청 처리 레이턴시가 포함됩니다. 클라이언트와 서버 간의 네트워크 또는 리버스 프록시 오버헤드는 포함되지 않습니다.<br>_second로 표시_ |
| **gcp.spanner.api.request_latencies_by_transaction_type.samplecount** <br>(count) | 트랜잭션 유형별 서버 요청 레이턴시 분포의 샘플 수. Cloud Spanner 백엔드 및 API 레이어의 요청 처리 레이턴시가 포함됩니다. 클라이언트와 서버 간의 네트워크 또는 리버스 프록시 오버헤드는 포함되지 않습니다.<br>_second로 표시_ |
| **gcp.spanner.api.request_latencies_by_transaction_type.sumsqdev** <br>(count) | 트랜잭션 유형별 서버 요청 레이턴시 분포의 편차 제곱합. Cloud Spanner 백엔드 및 API 레이어의 요청 처리 레이턴시가 포함됩니다. 클라이언트와 서버 간의 네트워크 또는 리버스 프록시 오버헤드는 포함되지 않습니다.<br>_second로 표시_ |
| **gcp.spanner.api.sent_bytes_count** <br>(count) | Cloud Spanner가 전송한 압축되지 않은 응답 바이트 수<br>_byte로 표시_ |
| **gcp.spanner.client.attempt_count** <br>(count) | Spanner 클라이언트에서 수행한 총 RPC 시도 횟수.|
| **gcp.spanner.client.attempt_latencies.avg** <br>(count) | RPC 시도 전반의 총 엔드 투 엔드 레이턴시 평균 분포.<br>_millisecond로 표시_ |
| **gcp.spanner.client.attempt_latencies.samplecount** <br>(count) | RPC 시도 전반의 총 엔드 투 엔드 레이턴시 분포의 샘플 수.<br>_millisecond로 표시_ |
| **gcp.spanner.client.attempt_latencies.sumsqdev** <br>(count) | RPC 시도 전반의 총 엔드 투 엔드 레이턴시 분포의 편차 제곱합.<br>_millisecond로 표시_ |
| **gcp.spanner.client.operation_count** <br>(count) | Spanner 클라이언트가 수행한 총 작업 횟수.|
| **gcp.spanner.client.operation_latencies.avg** <br>(count) | Spanner 작업과 관련된 모든 RPC 시도의 총 엔드 투 엔드 레이턴시 평균 분포.<br>_millisecond로 표시_ |
| **gcp.spanner.client.operation_latencies.samplecount** <br>(count) | Spanner 작업과 관련된 모든 RPC 시도에 대한 총 엔드 투 엔드 레이턴시 분포 샘플 수<br>_millisecond로 표시_ |
| **gcp.spanner.client.operation_latencies.sumsqdev** <br>(count) | Spanner 작업과 관련된 모든 RPC 시도의 총 엔드 투 엔드 레이턴시 분포 편차 제곱합.<br>_millisecond로 표시_ |
| **gcp.spanner.graph_query_stat.total.bytes_returned_count** <br>(count) | 전송 인코딩 오버헤드를 제외하고 그래프 쿼리가 반환한 데이터 바이트 수.<br>_byte로 표시_ |
| **gcp.spanner.graph_query_stat.total.execution_count** <br>(count) | Cloud Spanner가 해당 기간 동안 그래프 쿼리를 확인한 횟수.|
| **gcp.spanner.graph_query_stat.total.failed_execution_count** <br>(count) | 해당 기간 동안 그래프 쿼리가 실패한 횟수.|
| **gcp.spanner.graph_query_stat.total.query_latencies.avg** <br>(count) | 데이터베이스 내에서 그래프 쿼리를 실행하는 데 걸린 총 시간의 평균 분포(초).<br>_second로 표시_ |
| **gcp.spanner.graph_query_stat.total.query_latencies.samplecount** <br>(count) | 데이터베이스 내에서 그래프 쿼리를 실행하는 데 걸린 총 시간 분포의 샘플 수(초).<br>_second로 표시_ |
| **gcp.spanner.graph_query_stat.total.query_latencies.sumsqdev** <br>(count) | 데이터베이스 내에서 그래프 쿼리를 실행하는 데 걸린 총 시간 분포의 편차 제곱합(초).<br>_second로 표시_ |
| **gcp.spanner.graph_query_stat.total.returned_rows_count** <br>(count) | 그래프 쿼리가 반환한 행의 수.|
| **gcp.spanner.graph_query_stat.total.scanned_rows_count** <br>(count) | 그래프 쿼리가 삭제된 값을 제외하고 스캔한 행의 수.|
| **gcp.spanner.instance.autoscaling.high_priority_cpu_utilization_target** <br>(gauge) | 오토스케일링에 사용되는 고우선순위 CPU 사용률 목표치.|
| **gcp.spanner.instance.autoscaling.max_node_count** <br>(gauge) | 오토스케일러가 인스턴스에 할당할 수 있는 최대 노드 수.|
| **gcp.spanner.instance.autoscaling.max_processing_units** <br>(gauge) | 오토스케일러가 인스턴스에 할당할 수 있는 최대 처리 유닛 수.|
| **gcp.spanner.instance.autoscaling.min_node_count** <br>(gauge) | 오토스케일러가 인스턴스에 할당할 수 있는 최소 노드 수.|
| **gcp.spanner.instance.autoscaling.min_processing_units** <br>(gauge) | 오토스케일러가 인스턴스에 할당할 수 있는 최소 처리 유닛 수.|
| **gcp.spanner.instance.autoscaling.storage_utilization_target** <br>(gauge) | 오토스케일링에 사용되는 스토리지 사용률 목표치.|
| **gcp.spanner.instance.backup.used_bytes** <br>(gauge) | 사용 중인 백업 스토리지(바이트).<br>_byte로 표시_ |
| **gcp.spanner.instance.cpu.smoothed_utilization** <br>(gauge) | 프로비저닝된 CPU의 평활화된(smoothed) 24시간 사용률(0.0에서 1.0 사이의 값).<br>_fraction으로 표시_ |
| **gcp.spanner.instance.cpu.utilization** <br>(gauge) | 프로비저닝된 CPU의 사용률(0.0에서 1.0 사이의 값).<br>_fraction으로 표시_ |
| **gcp.spanner.instance.cpu.utilization_by_operation_type** <br>(gauge) | 프로비저닝된 CPU의 작업 유형별 사용률(0.0에서 1.0 사이의 값).<br>_fraction으로 표시_ |
| **gcp.spanner.instance.cpu.utilization_by_priority** <br>(gauge) | 프로비저닝된 CPU의 우선순위별 사용률(0.0에서 1.0 사이의 값).<br>_fraction으로 표시_ |
| **gcp.spanner.instance.cross_region_replicated_bytes_count** <br>(count) | 기본 리더에서 여러 리전의 복제본으로 복제된 바이트 수.<br>_byte로 표시_ |
| **gcp.spanner.instance.data_boost.processing_unit_second_count** <br>(count) | DataBoost 작업에 사용되는 총 처리 유닛.|
| **gcp.spanner.instance.dual_region_quorum_availability** <br>(gauge) | 듀얼 리전 인스턴스 구성의 쿼럼 가용성 신호.|
| **gcp.spanner.instance.leader_percentage_by_region** <br>(gauge) | 클라우드 리전별 리더의 백분율(0.0에서 1.0 사이의 값).<br>_fraction으로 표시_ |
| **gcp.spanner.instance.node_count** <br>(gauge) | 총 노드의 수.<br>_node로 표시_ |
| **gcp.spanner.instance.peak_split_cpu_usage_score** <br>(gauge) | 데이터베이스 내 모든 스플릿에서 관찰된 최대 CPU 사용량 스코어.|
| **gcp.spanner.instance.placement_row_limit** <br>(gauge) | 배치 행의 상한값.|
| **gcp.spanner.instance.placement_row_limit_per_processing_unit** <br>(gauge) | 처리 유닛당 배치 행의 상한값.|
| **gcp.spanner.instance.placement_rows** <br>(gauge) | 데이터베이스 내 배치 행의 수.|
| **gcp.spanner.instance.processing_units** <br>(gauge) | 처리 유닛의 총 수.|
| **gcp.spanner.instance.replica.autoscaling.high_priority_cpu_utilization_target** <br>(gauge) | 복제본 오토스케일링에 사용되는 고우선순위 CPU 사용률 목표치.<br>_percent로 표시_ |
| **gcp.spanner.instance.replica.autoscaling.max_node_count** <br>(gauge) | 오토스케일러가 복제본에 할당할 수 있는 최대 노드 수.|
| **gcp.spanner.instance.replica.autoscaling.max_processing_units** <br>(gauge) | 오토스케일러가 복제본에 할당할 수 있는 최대 처리 유닛 수.|
| **gcp.spanner.instance.replica.autoscaling.min_node_count** <br>(gauge) | 오토스케일러가 복제본에 할당할 수 있는 최소 노드 수.|
| **gcp.spanner.instance.replica.autoscaling.min_processing_units** <br>(gauge) | 오토스케일러가 복제본에 할당할 수 있는 최소 처리 유닛 수.|
| **gcp.spanner.instance.replica.cmek.total_keys** <br>(gauge) | 데이터베이스 및 키 해지(revocation) 상태별로 식별된 CMEK 키의 수.|
| **gcp.spanner.instance.replica.node_count** <br>(gauge) | 위치 및 복제본 유형별로 식별된, 각 복제본에 할당된 노드 수.|
| **gcp.spanner.instance.replica.processing_units** <br>(gauge) | 위치 및 복제본 유형별로 식별된, 각 복제본에 할당된 처리 유닛 수.|
| **gcp.spanner.instance.session_count** <br>(gauge) | 사용 중인 세션 수.<br>_session으로 표시_ |
| **gcp.spanner.instance.storage.limit_bytes** <br>(gauge) | 인스턴스 사용량 한도(바이트).<br>_byte로 표시_ |
| **gcp.spanner.instance.storage.limit_bytes_per_processing_unit** <br>(gauge) | 처리 유닛당 사용량 한도(바이트).<br>_byte로 표시_ |
| **gcp.spanner.instance.storage.used_bytes** <br>(gauge) | 사용 중인 스토리지(바이트).<br>_byte로 표시_ |
| **gcp.spanner.instance.storage.utilization** <br>(gauge) | 스토리지 한도 대비 사용된 스토리지 비율.<br>_fraction으로 표시_ |
| **gcp.spanner.lock_stat.total.lock_wait_time** <br>(count) | 전체 데이터베이스에 기록된 잠금 충돌(lock conflict)로 인한 총 잠금 대기 시간.<br>_second로 표시_ |
| **gcp.spanner.query_count** <br>(count) | 데이터베이스 이름, 상태, 쿼리 유형, 사용된 최적화 프로그램 버전별 쿼리 수.<br>_query로 표시_ |
| **gcp.spanner.query_stat.total.bytes_returned_count** <br>(count) | 쿼리가 반환한 데이터 바이트 수.<br>_byte로 표시_ |
| **gcp.spanner.query_stat.total.cpu_time** <br>(count) | Cloud Spanner가 쿼리 실행을 위해 작업에 사용한 CPU 시간(초).<br>_second로 표시_ |
| **gcp.spanner.query_stat.total.execution_count** <br>(count) | Cloud Spanner가 해당 기간 동안 쿼리를 확인한 횟수.<br>_query로 표시_ |
| **gcp.spanner.query_stat.total.failed_execution_count** <br>(count) | 해당 기간 동안 쿼리가 실패한 횟수.<br>_query로 표시_ |
| **gcp.spanner.query_stat.total.query_latencies** <br>(gauge) | 데이터베이스 내에서 쿼리를 실행하는 데 걸린 총 시간의 분포(초).<br>_second로 표시_ |
| **gcp.spanner.query_stat.total.remote_service_calls_count** <br>(count) | 원격 서비스 호출 횟수.|
| **gcp.spanner.query_stat.total.remote_service_calls_latencies.avg** <br>(count) | 원격 서비스 호출의 평균 레이턴시.<br>_millisecond로 표시_ |
| **gcp.spanner.query_stat.total.remote_service_calls_latencies.samplecount** <br>(count) | 원격 서비스 호출 레이턴시의 샘플 수.<br>_millisecond로 표시_ |
| **gcp.spanner.query_stat.total.remote_service_calls_latencies.sumsqdev** <br>(count) | 원격 서비스 호출 레이턴시의 편차 제곱합.<br>_millisecond로 표시_ |
| **gcp.spanner.query_stat.total.remote_service_network_bytes_sizes.avg** <br>(count) | 원격 서비스와 주고받은 평균 네트워크 바이트 수.<br>_byte로 표시_ |
| **gcp.spanner.query_stat.total.remote_service_network_bytes_sizes.samplecount** <br>(count) | 원격 서비스와 주고받은 네트워크 바이트의 샘플 수.<br>_byte로 표시_ |
| **gcp.spanner.query_stat.total.remote_service_network_bytes_sizes.sumsqdev** <br>(count) | 원격 서비스와 주고받은 네트워크 바이트의 편차 제곱합.<br>_byte로 표시_ |
| **gcp.spanner.query_stat.total.remote_service_processed_rows_count** <br>(count) | 원격 서비스가 처리한 행의 수.|
| **gcp.spanner.query_stat.total.remote_service_processed_rows_latencies.avg** <br>(count) | 원격 서비스가 처리한 행의 평균 레이턴시.<br>_millisecond로 표시_ |
| **gcp.spanner.query_stat.total.remote_service_processed_rows_latencies.samplecount** <br>(count) | 원격 서비스가 처리한 행의 레이턴시의 샘플 수.<br>_millisecond로 표시_ |
| **gcp.spanner.query_stat.total.remote_service_processed_rows_latencies.sumsqdev** <br>(count) | 원격 서비스가 처리한 행의 레이턴시의 편차 제곱합.<br>_millisecond로 표시_ |
| **gcp.spanner.query_stat.total.returned_rows_count** <br>(count) | 쿼리가 반환한 행의 수.<br>_row로 표시_ |
| **gcp.spanner.query_stat.total.scanned_rows_count** <br>(count) | 쿼리가 삭제된 값을 제외하고 스캔한 행의 수.<br>_ row로 표시_ |
| **gcp.spanner.read_stat.total.bytes_returned_count** <br>(count) | 전송 인코딩 오버헤드를 제외하고 읽기 작업이 반환한 데이터 바이트 수.<br>_byte로 표시_ |
| **gcp.spanner.read_stat.total.client_wait_time** <br>(count) | 스로틀링으로 인해 대기한 시간(초).<br>_second로 표시_ |
| **gcp.spanner.read_stat.total.cpu_time** <br>(count) | 프리페치 CPU 및 기타 오버헤드를 제외하고 Cloud Spanner가 읽기 작업을 수행하는 데 소요된 CPU 시간(초).<br>_second로 표시_ |
| **gcp.spanner.read_stat.total.execution_count** <br>(count) | Cloud Spanner가 해당 기간 동안 읽기 쉐이프(read shape)를 실행한 횟수.|
| **gcp.spanner.read_stat.total.leader_refresh_delay** <br>(count) | 멀티 리전 구성에서 인스턴스 간 읽기 작업을 조정하는 데 소요된 시간(초).<br>_second로 표시_ |
| **gcp.spanner.read_stat.total.locking_delays.avg** <br>(count) | 잠금으로 인해 대기한 총 시간의 평균 분포(초).<br>_second로 표시_ |
| **gcp.spanner.read_stat.total.locking_delays.samplecount** <br>(count) | 잠금으로 인해 대기한 총 시간 분포(초)의 샘플 수.<br>_second로 표시_ |
| **gcp.spanner.read_stat.total.locking_delays.sumsqdev** <br>(count) | 잠금으로 인해 대기한 총 시간 분포(초)의 편차 제곱합.<br>_second로 표시_ |
| **gcp.spanner.read_stat.total.returned_rows_count** <br>(count) | 읽기 작업이 반환한 행의 수.<br>_row로 표시_ |
| **gcp.spanner.row_deletion_policy.deleted_rows_count** <br>(count) | 마지막 샘플 이후 정책으로 인해 삭제된 행의 수.<br>_row로 표시_ |
| **gcp.spanner.row_deletion_policy.processed_watermark_age** <br>(gauge) | 현재 시점부터 마지막으로 성공한 읽기 작업의 타임스탬프 사이의 시간.<br>_second로 표시_ |
| **gcp.spanner.row_deletion_policy.undeletable_rows** <br>(count) | 삭제할 수 없는 데이터베이스 내의 모든 테이블의 행 수.<br>_row로 표시_ |
| **gcp.spanner.transaction_stat.total.bytes_written_count** <br>(count) | 트랜잭션이 기록한 바이트 수.<br>_byte로 표시됨_ |
| **gcp.spanner.transaction_stat.total.commit_attempt_count** <br>(count) | 트랜잭션에 실행한 커밋 시도 횟수.|
| **gcp.spanner.transaction_stat.total.commit_retry_count** <br>(count) | 이전에 중단된 트랜잭션 시도로 인해 커밋을 재시도한 횟수.|
| **gcp.spanner.transaction_stat.total.participants** <br>(gauge) | 각 커밋 시도에 참여한 총 참여자의 수의 분포.|
| **gcp.spanner.transaction_stat.total.transaction_latencies** <br>(gauge) | 트랜잭션의 첫 번째 작업에서 커밋 또는 중단까지 걸린 총 시간(초)의 분포.<br>_second로 표시_ |

### 이벤트

Google Cloud Spanner 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Spanner 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.