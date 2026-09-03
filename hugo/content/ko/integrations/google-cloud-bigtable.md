---
aliases:
- /ko/integrations/google_cloud_bigtable
app_id: google-cloud-bigtable
categories:
- cloud
- google cloud
- data stores
- log collection
custom_kind: integration
description: 검색, 분석, 지도, Gmail과 같은 Google 서비스를 구동하는 Google의 NoSQL Big Data 데이터베이스
  서비스
media: []
title: Google Cloud Bigtable
---
## 개요

Bigtable은 Google의 NoSQL 빅데이터 데이터베이스 서비스입니다. 검색, 애널리틱스, 지도, Gmail 등 많은 주요 Google 서비스를 제공하는 데 사용되는 동일한 데이터베이스입니다.

Datadog Google Cloud Platform 통합을 사용하여 Google Bigtable에서 메트릭을 수집합니다.

## 설정

### 설치

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 로그 수집

Google Bigtable 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection)하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google Bigtable 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Bigtable 로그를 필터링합니다.
1. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.bigtable.backup.bytes_used** <br>(gauge) | 사용된 백업 스토리지<br>_byte로 표시_ |
| **gcp.bigtable.client.application_blocking_latencies.avg** <br>(count) | Cloud Bigtable에서 응답 데이터가 준비되어 있지만 애플리케이션이 아직 사용하지 않은 경우, 애플리케이션이 유발한 평균 총 지연 시간<br>_millisecond로 표시_ |
| **gcp.bigtable.client.application_blocking_latencies.samplecount** <br>(count) | Cloud Bigtable에서 응답 데이터가 준비되어 있지만 애플리케이션이 아직 사용하지 않은 경우, 애플리케이션이 유발한 총 지연 시간 샘플 수<br>_millisecond로 표시_ |
| **gcp.bigtable.client.application_blocking_latencies.sumsqdev** <br>(count) | Cloud Bigtable에서 응답 데이터가 준비되어 있지만 애플리케이션이 아직 사용하지 않은 경우, 애플리케이션이 유발한 평균 총 지연 시간 제곱편차 합계<br>_ millisecond로 표시_ |
| **gcp.bigtable.client.attempt_latencies.avg** <br>(count) | RPC 시도당 평균 클라이언트 관찰 지연 시간<br>_millisecond로 표시_ |
| **gcp.bigtable.client.attempt_latencies.samplecount** <br>(count) | RPC 시도당 클라이언트 관찰 지연 시간 샘플 수<br>_ millisecond로 표시_ |
| **gcp.bigtable.client.attempt_latencies.sumsqdev** <br>(count) | RPC 시도당 클라이언트 관찰 지연 시간 제곱 편차 합계<br>_millisecond로 표시_ |
| **gcp.bigtable.client.client_blocking_latencies.avg** <br>(count) | 대량 작업에서 보류 중인 요청이 너무 많을 때 클라이언트가 서버에 더 많은 요청을 보내는 것을 차단하여 발생하는 평균 지연 시간<br>_millisecond로 표시_ |
| **gcp.bigtable.client.client_blocking_latencies.samplecount** <br>(count) | 대량 작업에서 보류 중인 요청이 너무 많을 때 클라이언트가 서버에 더 많은 요청을 보내는 것을 차단하여 발생하는 지연 시간 샘플 수<br>_millisecond로 표시_ |
| **gcp.bigtable.client.client_blocking_latencies.sumsqdev** <br>(count) | 대량 작업에서 보류 중인 요청이 너무 많을 때 클라이언트가 서버에 더 많은 요청을 보내는 것을 차단하여 발생하는 지연 시간 제곱 편차 합계<br>_millisecond로 표시_ |
| **gcp.bigtable.client.connectivity_error_count** <br>(count) | Google 네트워크에 도달하지 못한 요청 수. (구글 응답 헤더가 없는 요청)|
| **gcp.bigtable.client.first_response_latencies.avg** <br>(count) | 작업 시작 후 응답 헤더가 수신될 때까지의 평균 지연 시간. 측정값 게시가 시도 응답이 수신될 때까지 지연됩니다.<br>_millisecond로 표시_ |
| **gcp.bigtable.client.first_response_latencies.samplecount** <br>(count) | 작업 시작부터 응답 헤더가 수신될 때까지 지연 시간 샘플 수. 측정값 게시가 시도 응답이 수신될 때까지 지연됩니다.<br>_millisecond로 표시_ |
| **gcp.bigtable.client.first_response_latencies.sumsqdev** <br>(count) | 작업 시작부터 응답 헤더가 수신될 때까지 지연 시간 제곱 편차 합계. 측정값 게시가 시도 응답이 수신될 때까지 지연됩니다.<br>_millisecond로 표시_ |
| **gcp.bigtable.client.operation_latencies.avg** <br>(count) | Bigtable 작업과 관련된 모든 RPC 시도의 총 엔드투엔드 지연 시간 평균 분포<br>_millisecond로 표시_ |
| **gcp.bigtable.client.operation_latencies.samplecount** <br>(count) | Bigtable 작업과 관련된 모든 RPC 시도의 총 엔드투엔드 지연 시간 분포 샘플 수<br>_millisecond로 표시_ |
| **gcp.bigtable.client.operation_latencies.sumsqdev** <br>(count) | Bigtable 작업과 관련된 모든 RPC 시도의 총 엔드투엔드 지연 시간 분포 제곱 편차 합계<br>_millisecond로 표시_ |
| **gcp.bigtable.client.retry_count** <br>(count) | 최초 시도 이후 추가로 전송된 RPC 수.|
| **gcp.bigtable.client.server_latencies.avg** <br>(count) | Google 프론트엔드에서 RPC를 수신한 시점부터 응답의 첫 바이트를 다시 전송하는 시점까지 측정된 평균 지연 시간<br>_millisecond로 표시_ |
| **gcp.bigtable.client.server_latencies.samplecount** <br>(count) | Google 프론트엔드에서 RPC를 수신한 시점부터 응답의 첫 바이트를 다시 전송하는 시점까지 측정된 지연 시간 샘플 수<br>_millisecond로 표시_ |
| **gcp.bigtable.client.server_latencies.sumsqdev** <br>(count) | Google 프론트엔드에서 RPC를 수신한 시간과 응답의 첫 바이트를 다시 보내는 시간 사이에 측정된 지연 시간 제곱 편차 합계<br>_millisecond로 표시_ |
| **gcp.bigtable.cluster.autoscaling.max_node_count** <br>(gauge) | 자동 확장 클러스터 최대 노드 수.|
| **gcp.bigtable.cluster.autoscaling.min_node_count** <br>(gauge) | 자동 확장 클러스터 최소 노드 수.|
| **gcp.bigtable.cluster.autoscaling.recommended_node_count_for_cpu** <br>(gauge) | CPU 사용량을 기준으로 자동 확장 클러스터에 권장되는 노드 수.|
| **gcp.bigtable.cluster.autoscaling.recommended_node_count_for_storage** <br>(gauge) | 스토리지 사용량을 기준으로 자동 확장 클러스터에 권장되는 노드 수.|
| **gcp.bigtable.cluster.cpu_load** <br>(gauge) | 클러스터의 CPU 부하.|
| **gcp.bigtable.cluster.cpu_load_by_app_profile_by_method_by_table** <br>(gauge) | 애플리케이션 프로필, 메서드, 테이블별로 분류한 클러스터 CPU 부하.|
| **gcp.bigtable.cluster.cpu_load_hottest_node** <br>(gauge) | 클러스터에서 가장 사용량이 많은 노드의 CPU 부하.|
| **gcp.bigtable.cluster.cpu_load_hottest_node_high_granularity** <br>(gauge) | 클러스터에서 가장 사용량이 많은 노드의 CPU 부하를 매우 정밀하게 샘플링한 값.|
| **gcp.bigtable.cluster.disk_load** <br>(gauge) | 클러스터 내 HDD 디스크 사용률.|
| **gcp.bigtable.cluster.node_count** <br>(gauge) | 클러스터 내 노드 수<br>_node로 표시_ |
| **gcp.bigtable.cluster.storage_utilization** <br>(gauge) | 전체 저장 용량 대비 사용 중인 저장 공간의 비율.|
| **gcp.bigtable.disk.bytes_used** <br>(gauge) | 클러스터에 저장된 테이블의 압축 데이터 양.<br>_byte로 표시_ |
| **gcp.bigtable.disk.per_node_storage_capacity** <br>(gauge) | 클러스터에서 노드당 저장할 수 있는 테이블의 압축 데이터 용량<br>_byte로 표시_ |
| **gcp.bigtable.disk.storage_capacity** <br>(gauge) | 클러스터에 저장할 수 있는 테이블의 압축 데이터 용량<br>_byte로 표시_ |
| **gcp.bigtable.replication.latency.avg** <br>(gauge) | 테이블의 복제 요청 지연 시간 분포<br>_millisecond로 표시_ |
| **gcp.bigtable.replication.latency.samplecount** <br>(gauge) | 복제 요청 대기 시간 샘플 수<br>_sample로 표시됨_ |
| **gcp.bigtable.replication.latency.sumsqdev** <br>(gauge) | 복제 요청 지연 시간 제곱 편차 합계<br>_second로 표시_ |
| **gcp.bigtable.replication.max_delay** <br>(gauge) | 테이블 클러스터 간 복제 지연 상한값<br>_second로 표시_ |
| **gcp.bigtable.server.data_boost.eligibility_count** <br>(count) | 현재 Data Boost 적용 가능 및 적용 불가능한 Bigtable 요청.|
| **gcp.bigtable.server.data_boost.ineligible_reasons** <br>(gauge) | 현재 트래픽이 Data Boost를 사용할 수 없는 이유.|
| **gcp.bigtable.server.data_boost.spu_usage** <br>(gauge) | Data Boost 요청의 Serverless-Processing-Units 사용량(SPU 초).|
| **gcp.bigtable.server.error_count** <br>(count) | 오류로 실패한 테이블의 서버 요청 수<br>_error로 표시_ |
| **gcp.bigtable.server.latencies.avg** <br>(gauge) | 테이블 복제 요청 지연 시간 분포<br>_millisecond로 표시_ |
| **gcp.bigtable.server.latencies.samplecount** <br>(gauge) | 복제 요청 대기 시간 샘플 수<br>_sample로 표시됨_ |
| **gcp.bigtable.server.latencies.sumsqdev** <br>(gauge) | 복제 요청 지연 시간 제곱 편차 합계<br>_second로 표시_ |
| **gcp.bigtable.server.modified_rows_count** <br>(count) | 테이블의 서버 요청에 의해 수정된 행 수<br>_ row로 표시_ |
| **gcp.bigtable.server.multi_cluster_failovers_count** <br>(count) | 멀티 클러스터 요청 중 발생한 페일오버 횟수.|
| **gcp.bigtable.server.received_bytes_count** <br>(count) | 테이블에 서버가 수신한 요청 데이터의 압축되지 않은 바이트 수<br>_byte로 표시_  |
| **gcp.bigtable.server.request_count** <br>(count) | 테이블의 서버 요청 수<br>_request로 표시_ |
| **gcp.bigtable.server.request_max_per_minute_count** <br>(count) | 1분 동안 5초 간격으로 수신할 수 있는 최대 요청 수.|
| **gcp.bigtable.server.returned_rows_count** <br>(count) | 테이블에 대해 서버 요청이 반환한 행 수<br>_ row로 표시_ |
| **gcp.bigtable.server.sent_bytes_count** <br>(count) | 테이블에 대해 서버가 보낸 응답 데이터의 압축되지 않은 바이트 수<br>_ byte로 표시_ |
| **gcp.bigtable.table.bytes_used** <br>(gauge) | 테이블에 저장된 압축 데이터 양<br>_byte로 표시_ |
| **gcp.bigtable.table.change_stream_log_used_bytes** <br>(gauge) | 변경 스트림 로그가 사용하는 디스크 스토리지 용량<br>_byte로 표시_ |

### 이벤트

Google Bigtable 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Bigtable 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.