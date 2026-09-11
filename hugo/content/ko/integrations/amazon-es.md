---
aliases:
- /ko/integrations/amazon_es
app_id: amazon-es
categories:
- aws
- 메트릭
custom_kind: 통합
description: Amazon OpenSearch Service로 OpenSearch를 손쉽게 배포하고 운영할 수 있습니다.
media: []
title: Amazon OpenSearch Service
---
## 개요

Amazon OpenSearch Service는 AWS Cloud에서 OpenSearch 클러스터를 손쉽게 배포, 운영, 확장할 수 있도록 도와주는 관리형 서비스입니다. OpenSearch는 완전한 오픈소스 기반 검색과 분석 엔진으로 로그 분석, 실시간 애플리케이션 모니터링 및 클릭스트림 분석 등의 사례에서 사용됩니다.

이 통합을 활성화해 Datadog에서 모든 OpenSearch Service 커스텀 태그를 확인하세요. 이 통합은 Amazon AWS OpenSearch Service용으로 Amazon AWS 외부에서 호스팅된 독립실행형 Elasticsearch 인스턴스가 아닙니다(해당 경우, 대신 [Elasticsearch 통합](https://docs.datadoghq.com/integrations/elastic)을 사용하세요.)

참고: 이 통합이 완전히 활성화되려면 'es:ListTags', 'es:ListDomainNames' 및 'es:DescribeElasticsearchDomains' 권한이 필요합니다.

## 설정

### 설치

아직 하지 않았다면 먼저 [Amazon Web Services 통합](https://docs.datadoghq.com/integrations/amazon_web_services/)을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지](https://app.datadoghq.com/integrations/amazon-web-services)에서 `Metric Collection` 탭에 `ES`가 활성화되어 있는지 확인하세요.
1. [Datadog - Amazon OpenSearch Service 통합](https://app.datadoghq.com/integrations/amazon-es)을 설치합니다.

### 로그 수집

#### 로깅 활성화

로그를 S3 버킷이나 CloudWatch로 전송하도록 Amazon OpenSearch Service를 구성합니다.

**참고**: S3 버킷에 로그할 경우 _대상 접두사_로 `amazon_elasticsearch`를 설정해야 합니다.

#### Datadog로 로그 전송

1. 아직 하지 않았다면 먼저 [Datadog Forwarder 람다 함수](https://docs.datadoghq.com/logs/guide/forwarder/)를 설정하세요.

1. Lambda 함수가 설치되면 AWS 콘솔에서 Amazon Elasticsearch 로그가 포함된 S3 버킷 또는 CloudWatch 로그 그룹에 트리거를 수동으로 추가합니다.

   - [S3 버킷에 수동 트리거 추가](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [CloudWatch Log Group에 수동 트리거 추가](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#manually-set-up-triggers)

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **aws.es.2xx** <br>(count) | HTTP 응답 코드가 2xx인 도메인 요청 수.<br>_request로 표시_ |
| **aws.es.2xx.average** <br>(gauge) | HTTP 응답 코드가 2xx인 도메인 평균 요청 수.<br>_request로 표시_ |
| **aws.es.3xx** <br>(count) | HTTP 응답 코드가 3xx인 도메인 요청 수.<br>_request로 표시_ |
| **aws.es.3xx.average** <br>(gauge) | HTTP 응답 코드가 3xx인 도메인 평균 요청 수.<br>_request로 표시_ |
| **aws.es.4xx** <br>(count) | HTTP 응답 코드가 4xx인 도메인 요청 수.<br>_request로 표시_ |
| **aws.es.4xx.average** <br>(gauge) | HTTP 응답 코드가 4xx인 도메인 평균 요청 수.<br>_request로 표시_ |
| **aws.es.5xx** <br>(count) | HTTP 응답 코드가 5xx인 도메인 요청 수.<br>_request로 표시_ |
| **aws.es.5xx.average** <br>(gauge) | HTTP 응답 코드가 5xx인 도메인 평균 요청 수.<br>_request로 표시_ |
| **aws.es.alerting_degraded** <br>(gauge) | ES 알림 서비스의 성능 저하 여부를 나타냅니다. 값이 0이면 '아니요'를, 값이 1이면 '예'를 뜻합니다.|
| **aws.es.alerting_index_exists** <br>(gauge) | 값이 1이면 .opendistro-alerting-config 인덱스가 존재한다는 뜻입니다. 해당 값은 알림 기능을 처음 사용할 때까지 0으로 유지됩니다.|
| **aws.es.alerting_index_statusgreen** <br>(gauge) | 인덱스의 상태입니다. 값이 1이면 Green을 의미합니다. 값이 0이면 인덱스가 존재하지 않거나 Green이 아님을 뜻합니다.|
| **aws.es.alerting_index_statusred** <br>(gauge) | 인덱스의 상태입니다. 값이 1이면 Red를 의미합니다. 값이 0이면 인덱스가 존재하지 않거나 Red가 아님을 뜻합니다.|
| **aws.es.alerting_index_statusyellow** <br>(gauge) | 인덱스의 상태입니다. 값이 1이면 Yellow를 의미합니다. 값이 0이면 인덱스가 존재하지 않거나 Yellow가 아님을 뜻합니다.|
| **aws.es.alerting_nodes_on_schedule** <br>(gauge) | 값이 1이면 모든 알림 작업이 일정대로 실행 중이거나 알림 작업이 존재하지 않음을 뜻합니다.|
| **aws.es.alerting_nodes_not_on_schedule** <br>(gauge) | 값이 1이면 일부 작업이 일정대로 실행되고 있지 않음을 뜻합니다.|
| **aws.es.alerting_scheduled_job_enabled** <br>(gauge) | 값이 1이면 opendistro.scheduled_jobs.enabled 클러스터 설정이 true임을 뜻합니다. 값이 0이면 false이며 예약된 작업이 비활성화됩니다.|
| **aws.es.anomaly_detection_failure_count** <br>(count) | 이상 징후 탐지 실패 요청 횟수.<br>_error로 표시_ |
| **aws.es.anomaly_detection_plugin_unhealthy** <br>(gauge) | 값이 1이면 이상 징후 탐지 플러그인이 제대로 작동하지 않는다는 뜻입니다.|
| **aws.es.anomaly_detection_request_count** <br>(count) | 이상 징후 탐지 요청 횟수.<br>_request로 표시_ |
| **aws.es.anomaly_detectors_index_status_index_exists** <br>(gauge) | 값이 1이면 .opendistro-anomaly-detectors 인덱스가 존재한다는 뜻입니다. 해당 값은 이상 징후 탐지 기능을 처음 사용할 때까지 0으로 유지됩니다.|
| **aws.es.anomaly_detectors_index_statusred** <br>(gauge) | 값이 1이면 .opendistro-anomaly-detectors 인덱스가 Red 상태라는 뜻입니다. 해당 값은 이상 징후 탐지 기능을 처음 사용할 때까지 0으로 유지됩니다.|
| **aws.es.anomaly_results_index_status_index_exists** <br>(gauge) | 값이 1이면 .opendistro-anomaly-results 별칭이 가리키는 인덱스가 존재한다는 뜻입니다. 해당 값은 이상 징후 탐지 기능을 처음 사용할 때까지 0으로 유지됩니다.|
| **aws.es.automated_snapshot_failure** <br>(gauge) | 클러스터의 실패한 자동 스냅샷의 수.<br>_error로 표시_ |
| **aws.es.automated_snapshot_failure.minimum** <br>(gauge) | 클러스터의 실패한 자동 스냅샷의 최솟값.<br>_error로 표시_ |
| **aws.es.cluster_index_writes_blocked** <br>(gauge) | 클러스터가 들어오는 쓰기 요청을 수락할지 아니면 차단할지를 나타냅니다. 값이 0이면 클러스터가 요청을 수락함을, 값이 1이면 요청을 차단함을 뜻합니다.|
| **aws.es.cluster_statusgreen** <br>(gauge) | 모든 인덱스 샤드를 클러스터의 노드에 할당할지 여부를 나타냅니다.|
| **aws.es.cluster_statusgreen.maximum** <br>(gauge) | 클러스터의 노드에 할당된 인덱스 샤드의 최댓값을 나타냅니다.|
| **aws.es.cluster_statusgreen.minimum** <br>(gauge) | 클러스터의 노드에 할당된 인덱스 샤드의 최솟값을 나타냅니다.|
| **aws.es.cluster_statusred** <br>(gauge) | 클러스터 내 최소 하나 이상의 인덱스에서 프라이머리 샤드와 레플리카 샤드 모두 클러스터의 노드에 할당되지 않았는지 여부를 나타냅니다.|
| **aws.es.cluster_statusred.maximum** <br>(gauge) | 클러스터 내 최소 하나 이상의 인덱스에서 프라이머리 샤드와 레플리카 샤드 모두 클러스터의 노드에 할당되지 않았는지 여부의 최댓값을 나타냅니다.|
| **aws.es.cluster_statusred.minimum** <br>(gauge) | 최소 하나 이상의 인덱스에서 프라이머리 샤드와 레플리카 샤드 모두가 클러스터 내 노드에 할당되지 않은 상태가 하나라도 있음을 나타냅니다.|
| **aws.es.cluster_statusyellow** <br>(gauge) | 클러스터에서 레플리카 샤드가 노드에 할당되지 않았는지 여부를 나타냅니다.|
| **aws.es.cluster_statusyellow.maximum** <br>(gauge) | 클러스터 내의 노드에 레플리카 샤드가 할당되지 않은 상태가 최대임을 나타냅니다.|
| **aws.es.cluster_statusyellow.minimum** <br>(gauge) | 클러스터에서 레플리카 샤드가 노드에 할당되지 않았는지 상태의 최솟값을 나타냅니다.|
| **aws.es.cluster_used_space** <br>(gauge) | 클러스터의 총 사용 공간(MiB).<br>_mebibyte로 표시_ |
| **aws.es.cluster_used_space.average** <br>(gauge) | 클러스터의 평균 사용 공간(MiB).<br>_mebibyte로 표시_ |
| **aws.es.cluster_used_space.minimum** <br>(gauge) | 클러스터의 최소 사용 공간(MiB).<br>_mebibyte로 표시_ |
| **aws.es.cpucredit_balance** <br>(gauge) | 클러스터의 데이터 노드에 사용할 수 있는 남은 CPU 크레딧입니다.|
| **aws.es.cpuutilization** <br>(gauge) | 클러스터의 모든 노드의 평균 CPU 리소스 사용률.<br>_percent로 표시_ |
| **aws.es.cpuutilization.maximum** <br>(gauge) | 클러스터 노드의 최대 CPU 리소스 사용률.<br>_percent로 표시_ |
| **aws.es.cpuutilization.minimum** <br>(gauge) | 클러스터 노드의 최소 CPU 리소스 사용률.<br>_percent로 표시_ |
| **aws.es.cross_cluster_inbound_requests** <br>(count) | 대상 도메인 메트릭. 소스 도메인으로부터 수신한 수신 연결 요청 수.<br>_request로 표시_ |
| **aws.es.cross_cluster_outbound_connections** <br>(gauge) | 소스 도메인 메트릭. 연결된 노드 수로 이 숫자가 0이 되면 연결이 비정상 상태임을 나타냅니다.|
| **aws.es.cross_cluster_outbound_requests** <br>(count) | 소스 도메인 메트릭. 대상 도메인으로 전송된 검색 요청 수입니다.<br>_request로 표시_ |
| **aws.es.deleted_documents** <br>(gauge) | 클러스터의 모든 인덱스에서 삭제 표시된 문서의 총 수.<br>_document로 표시_ |
| **aws.es.deleted_documents.maximum** <br>(gauge) | 클러스터의 모든 인덱스에서 삭제 표시된 문서의 최대 수.<br>_document로 표시_ |
| **aws.es.deleted_documents.minimum** <br>(gauge) | 클러스터의 모든 인덱스에서 삭제 표시된 문서의 최소 수.<br>_document로 표시_ |
| **aws.es.disk_queue_depth** <br>(gauge) | 클러스터의 모든 노드에서 EBS 볼륨에 대해 대기 중인 평균 입출력(I/O) 요청 수.<br>_request로 표시_ |
| **aws.es.disk_queue_depth.maximum** <br>(gauge) | 클러스터의 노드에서 EBS 볼륨에 대한 대기 중인 입출력(I/O) 요청의 최대 수.<br>_request로 표시_ |
| **aws.es.disk_queue_depth.minimum** <br>(gauge) | 클러스터의 노드에서 EBS 볼륨에 대한 대기 중인 입출력(I/O) 요청의 최소 수.<br>_request로 표시_ |
| **aws.es.elasticsearch_requests** <br>(count) | Elasticsearch 클러스터로 전송된 요청 수.<br>_request로 표시_ |
| **aws.es.elasticsearch_requests.average** <br>(gauge) | Elasticsearch 클러스터로 전송된 요청의 평균 수.<br>_request로 표시_ |
| **aws.es.free_storage_space** <br>(gauge) | 클러스터의 모든 데이터 노드의 평균 여유 공간(megabyte).<br>_mebibyte로 표시_ |
| **aws.es.free_storage_space.maximum** <br>(gauge) | 클러스터에서 사용 가능한 여유 공간이 가장 많은 단일 데이터 노드의 여유 공간(mebibyte).<br>_mebibyte로 표시_ |
| **aws.es.free_storage_space.minimum** <br>(gauge) | 클러스터에서 사용 가능한 여유 공간이 가장 적은 단일 데이터 노드의 여유 공간(mebibyte).<br>_mebibyte로 표시_ |
| **aws.es.free_storage_space.sum** <br>(gauge) | 클러스터의 모든 데이터 노드의 여유 공간(megabyte).<br>_mebibyte로 표시_ |
| **aws.es.hot_storage_space_utilization** <br>(gauge) | 클러스터가 사용 중인 핫 스토리지 공간의 총량.<br>_mebibyte로 표시_ |
| **aws.es.hot_to_warm_migration_queue_size** <br>(gauge) | 현재 핫 스토리지에서 웜 스토리지로 마이그레이션 중인 인덱스의 수.|
| **aws.es.indexing_latency** <br>(gauge) | 샤드가 인덱싱 작업을 완료하는 데 걸리는 평균 시간(millisecond).<br>_millisecond로 표시_ |
| **aws.es.indexing_rate** <br>(count) | 분당 인덱싱 작업 수.<br>_operation으로 표시_ |
| **aws.es.invalid_host_header_requests** <br>(count) | 호스트 헤더가 잘못되었거나 누락된 상태로 Elasticsearch 클러스터로 전송된 HTTP 요청 수.<br>_request로 표시_ |
| **aws.es.invalid_host_header_requests.average** <br>(gauge) | 호스트 헤더가 잘못되었거나 누락된 상태로 Elasticsearch 클러스터로 전송된 HTTP 요청의 평균 수.<br>_request로 표시_ |
| **aws.es.jvmgcold_collection_count** <br>(gauge) | '이전 세대' 가비지 컬렉션이 실행된 횟수. 리소스가 충분한 클러스터에서는 이 숫자가 적게 유지되며 드물게 증가해야 합니다.<br>_garbage collection으로 표시_ |
| **aws.es.jvmgcold_collection_time** <br>(gauge) | 클러스터가 '이전 세대' 가비지 컬렉션을 수행한 시간(millisecond).<br>_millisecond로 표시_ |
| **aws.es.jvmgcyoung_collection_count** <br>(gauge) | '신규 세대' 가비지 컬렉션이 실행된 횟수. 실행 횟수가 많고 계속 증가하는 것은 클러스터 운영상 정상적인 현상입니다.<br>_garbage collection으로 표시_ |
| **aws.es.jvmgcyoung_collection_time** <br>(gauge) | 클러스터가 '신규 세대' 가비지 컬렉션을 수행한 시간(millisecond).<br>_millisecond로 표시_ |
| **aws.es.jvmmemory_pressure** <br>(gauge) | 클러스터 내 모든 데이터 노드의 Java 힙(heap) 메모리 평균 사용률.<br>_percent로 표시_ |
| **aws.es.jvmmemory_pressure.maximum** <br>(gauge) | 클러스터 내 모든 데이터 노드의 Java 힙(heap) 메모리 최대 사용률.<br>_percent로 표시_ |
| **aws.es.jvmmemory_pressure.minimum** <br>(gauge) | 클러스터 내 모든 데이터 노드의 Java 힙(heap) 메모리 최소 사용률.<br>_percent로 표시_ |
| **aws.es.kibana_healthy_nodes** <br>(gauge) | Kibana의 상태 점검 지표입니다. 값이 1이면 정상적으로 작동함을, 값이 0이면 Kibana에 액세스할 수 없음을 나타냅니다.|
| **aws.es.kmskey_error** <br>(gauge) | 값이 1이면 유휴 데이터(data at rest)를 암호화하는 데 사용된 KMS 고객 마스터 키가 비활성화되었음을 뜻합니다. 유휴 데이터를 암호화하는 도메인에서만 확인할 수 있습니다.|
| **aws.es.kmskey_inaccessible** <br>(gauge) | 값이 1이면 유휴 데이터(data at rest)를 암호화하는 데 사용된 KMS 고객 마스터 키가 삭제되었거나 Amazon ES 권한이 취소되었음을 뜻합니다. 유휴 데이터를 암호화하는 도메인에서만 확인할 수 있습니다.|
| **aws.es.master_cpucredit_balance** <br>(gauge) | 클러스터의 전용 마스터 노드에 사용할 수 있는 잔여 CPU 크레딧입니다.|
| **aws.es.master_cpuutilization** <br>(gauge) | 전용 마스터 노드의 최대 CPU 리소스 사용률.<br>_percent로 표시_ |
| **aws.es.master_free_storage_space** <br>(gauge) | 본 메트릭은 관련이 없으므로 무시해도 괜찮습니다. 해당 서비스는 마스터 노드를 데이터 노드로 사용하지 않습니다.<br> _mebibyte로 표시_  |
| **aws.es.master_jvmmemory_pressure** <br>(gauge) | 클러스터 내 모든 전용 마스터 노드의 Java 힙(heap) 메모리 최대 사용률.<br>_percent로 표시_ |
| **aws.es.master_reachable_from_node** <br>(gauge) | MasterNotDiscovered 예외의 상태 점검 지표입니다. 값이 1이면 정상적으로 작동함을, 값이 0이면 /\_cluster/health/이 실패임을  나타냅니다.|
| **aws.es.master_reachable_from_node.maximum** <br>(gauge) | MasterNotDiscovered 예외의 상태 점검 지표입니다. 값이 1이면 정상적으로 작동함을, 값이 0이면 /\_cluster/health/이 실패함을  나타냅니다.|
| **aws.es.master_sys_memory_utilization** <br>(gauge) | 인스턴스 메모리의 현재 사용률.<br>_percent로 표시_ |
| **aws.es.models_checkpoint_index_status_index_exists** <br>(gauge) | 값이 1이면 .opendistro-anomaly-checkpoints 인덱스가 존재한다는 뜻입니다. 해당 값은 이상 징후 탐지 기능을 처음 사용할 때까지 0으로 유지됩니다.|
| **aws.es.models_checkpoint_index_statusred** <br>(gauge) | 값이 1이면 .opendistro-anomaly-checkpoints 인덱스가 Red 상태라는 뜻입니다. 해당 값은 이상 징후 탐지 기능을 처음 사용할 때까지 0으로 유지됩니다.|
| **aws.es.nodes** <br>(gauge) | Amazon ES 클러스터의 노드 수.<br>_node로 표시_ |
| **aws.es.nodes.maximum** <br>(gauge) | Amazon ES 클러스터의 최대 노드 수.<br>_node로 표시_ |
| **aws.es.nodes.minimum** <br>(gauge) | Amazon ES 클러스터의 최소 노드 수.<br>_node로 표시_ |
| **aws.es.open_search_dashboards_healthy_nodes** <br>(gauge) | OpenSearch Dashboard의 상태 점검 지표입니다. 값이 1이면 정상적으로 작동함을, 값이 0이면 Dashboard 노드에 액세스할 수 없음을 나타냅니다.|
| **aws.es.open_search_requests** <br>(count) | OpenSearch 클러스터로 전송된 요청 수.<br>_request로 표시_ |
| **aws.es.open_search_requests.average** <br>(gauge) | OpenSearch 클러스터로 전송된 평균 요청 수.<br>_request로 표시_ |
| **aws.es.read_iops** <br>(gauge) | EBS 볼륨의 읽기 작업에 대한 초당 입출력(I/O) 작업 수.<br>_operation으로 표시_ |
| **aws.es.read_iops.maximum** <br>(gauge) | EBS 볼륨의 읽기 작업에 대한 노드의 초당 입출력(I/O) 작업 최대 수.<br>_operation으로 표시_ |
| **aws.es.read_iops.minimum** <br>(gauge) | EBS 볼륨의 읽기 작업에 대한 노드의 초당 입출력(I/O) 작업 최소 수.<br>_operation으로 표시_ |
| **aws.es.read_latency** <br>(gauge) | EBS 볼륨의 읽기 작업 지연 시간(second).<br>_second로 표시_ |
| **aws.es.read_latency.maximum** <br>(gauge) | 노드의 EBS 볼륨 읽기 작업의 최대 지연 시간(second).<br>_second로 표시_ |
| **aws.es.read_latency.minimum** <br>(gauge) | 노드의 EBS 볼륨 읽기 작업의 최소 지연 시간(second).<br>_second로 표시_ |
| **aws.es.read_throughput** <br>(gauge) | EBS 볼륨의 읽기 작업 초당 처리량(byte).<br>_byte로 표시_ |
| **aws.es.read_throughput.maximum** <br>(gauge) | 각 노드별 EBS 볼륨의 읽기 작업 초당 최대 처리량(byte).<br>_byte로 표시_ |
| **aws.es.read_throughput.minimum** <br>(gauge) | 각 노드별 EBS 볼륨의 읽기 작업 초당 최소 처리량(byte).<br>_byte로 표시_ |
| **aws.es.search_latency** <br>(gauge) | 샤드가 검색 작업을 완료하는 데 걸리는 평균 시간(millisecond).<br>_millisecond로 표시_ |
| **aws.es.search_rate** <br>(count) | 노드의 모든 샤드에 대한 분당 총 검색 요청 수.<br>_request로 표시_ |
| **aws.es.searchable_documents** <br>(gauge) | 클러스터의 모든 인덱스에서 검색 가능한 문서의 총 수.<br>_document로 표시_ |
| **aws.es.searchable_documents.maximum** <br>(gauge) | 클러스터의 모든 인덱스에서 검색 가능한 문서의 최대 수.<br>_document로 표시_ |
| **aws.es.searchable_documents.minimum** <br>(gauge) | 클러스터의 모든 인덱스에서 검색 가능한 문서의 최소 수.<br>_document로 표시_ |
| **aws.es.sqldefault_cursor_request_count** <br>(count) | \_opendistro/\_sql API에 대한 페이지 매김 요청 수.<br>_request로 표시_ |
| **aws.es.sqlfailed_request_count_by_cus_err** <br>(count) | 클라이언트 문제로 실패한 \_opendistro/\_sql API 요청 수.<br>_request로 표시_ |
| **aws.es.sqlfailed_request_count_by_sys_err** <br>(count) | 기능 제한 또는 서버 문제로 실패한 \_opendistro/\_sql API 요청 수.<br>_request로 표시_ |
| **aws.es.sqlrequest_count** <br>(count) | \_opendistro/\_sql API에 대한 요청 수.<br>_request로 표시_ |
| **aws.es.sqlunhealthy** <br>(gauge) | 값이 1이면 특정 요청에 대한 응답으로 SQL 플러그인이 5xx 응답 코드를 반환하거나 잘못된 쿼리 DSL을 Elasticsearch에 전달하고 있음을 뜻합니다.|
| **aws.es.sys_memory_utilization** <br>(gauge) | 인스턴스 메모리의 현재 사용 비율.<br>_percent로 표시_ |
| **aws.es.sys_memory_utilization.maximum** <br>(gauge) | 인스턴스 메모리의 현재 최대 사용률.<br>_percent로 표시_ |
| **aws.es.sys_memory_utilization.minimum** <br>(gauge) | 인스턴스 메모리의 현재 최소 사용률.<br>_percent로 표시_ |
| **aws.es.threadpool_bulk_queue** <br>(count) | 벌크 스레드 풀의 대기열에 있는 작업의 수.<br>_task로 표시_ |
| **aws.es.threadpool_bulk_rejected** <br>(count) | 벌크 스레드 풀에서 거부된 작업의 수.<br>_task로 표시_ |
| **aws.es.threadpool_bulk_threads** <br>(gauge) | 대량 스레드 풀의 크기.|
| **aws.es.threadpool_forcemerge_queue** <br>(count) | 포스 머지 스레드 풀(force merge thread pool) 대기열에 있는 작업의 수.<br>_task로 표시_ |
| **aws.es.threadpool_forcemerge_rejected** <br>(count) | 포스 머지 스레드 풀(force merge thread pool)에서 거부된 작업의 수.<br>_task로 표시_ |
| **aws.es.threadpool_forcemerge_threads** <br>(gauge) | 포스 머지 스레드 풀(force merge thread pool)의 크기.|
| **aws.es.threadpool_index_queue** <br>(count) | 인덱스 스레드 풀의 대기열에 있는 작업 수.<br>_task로 표시_ |
| **aws.es.threadpool_index_rejected** <br>(count) | 인덱스 스레드 풀에서 거부된 작업 수.<br>_task로 표시_ |
| **aws.es.threadpool_index_threads** <br>(gauge) | 인덱스 스레드 풀의 크기.|
| **aws.es.threadpool_merge_queue** <br>(count) | 머지 스레드 풀의 대기열에 있는 작업 수.<br>_task로 표시_ |
| **aws.es.threadpool_merge_rejected** <br>(count) | 머지 스레드 풀에서 거부된 작업 수.<br>_task로 표시_ |
| **aws.es.threadpool_merge_threads** <br>(gauge) | 머지 스레드 풀의 크기.|
| **aws.es.threadpool_search_queue** <br>(count) | 검색 스레드 풀의 대기열에 있는 작업 수.<br>_task로 표시_ |
| **aws.es.threadpool_search_rejected** <br>(count) | 검색 스레드 풀에서 거부된 작업 수.<br>_task로 표시_ |
| **aws.es.threadpool_search_threads** <br>(gauge) | 검색 스레드 풀의 크기.|
| **aws.es.threadpool_write_queue** <br>(count) | 쓰기 스레드 풀의 대기열에 있는 작업 수.<br>_task로 표시_ |
| **aws.es.threadpool_write_rejected** <br>(count) | 쓰기 스레드 풀에서 거부된 작업 수.<br>_task로 표시_ |
| **aws.es.threadpool_write_threads** <br>(gauge) | 쓰기 스레드 풀의 크기.|
| **aws.es.warm_cpuutilization** <br>(gauge) | 클러스터의 UltraWarm 노드의 CPU 리소스 사용률.<br>_percent로 표시_ |
| **aws.es.warm_free_storage_space** <br>(gauge) | 웜 스토리지 여유 공간(MiB).<br>_mebibyte로 표시_ |
| **aws.es.warm_jvmmemory_pressure** <br>(gauge) | UltraWarm 노드의 Java 힙(heap) 메모리 최대 사용률.<br>_percent로 표시_ |
| **aws.es.warm_search_latency** <br>(gauge) | UltraWarm 노드의 샤드가 검색 작업을 완료하는 데 걸리는 평균 시간(millisecond).<br>_millisecond로 표시_ |
| **aws.es.warm_search_rate** <br>(count) | UltraWarm 노드의 모든 샤드의 분당 총 검색 요청 수.<br>_request로 표시_ |
| **aws.es.warm_searchable_documents** <br>(gauge) | 클러스터의 모든 웜 인덱스에서 검색 가능한 문서의 총 수.<br>_document로 표시_ |
| **aws.es.warm_storage_space_utilization** <br>(gauge) | 클러스터가 사용 중인 웜 스토리지 공간의 총량.<br>_mebibyte로 표시_ |
| **aws.es.warm_sys_memory_utilization** <br>(gauge) | 웜 노드 메모리의 현재 사용률.<br>_percent로 표시_ |
| **aws.es.warm_to_hot_migration_queue_size** <br>(gauge) | 현재 웜 스토리지에서 핫 스토리지로 마이그레이션 중인 인덱스의 수.|
| **aws.es.write_iops** <br>(gauge) | EBS 볼륨의 쓰기 작업에 대한 초당 입출력(I/O) 작업 수.<br>_operation으로 표시_ |
| **aws.es.write_iops.maximum** <br>(gauge) | EBS 볼륨의 쓰기 작업에 대한 노드의 초당 입출력(I/O) 작업 최대 수.<br>_operation으로 표시_ |
| **aws.es.write_iops.minimum** <br>(gauge) | EBS 볼륨의 쓰기 작업에 대한 노드의 초당 입출력(I/O) 작업 최소 수.<br>_operation으로 표시_ |
| **aws.es.write_latency** <br>(gauge) | EBS 볼륨의 쓰기 작업 지연 시간(second).<br>_second로 표시_ |
| **aws.es.write_latency.maximum** <br>(gauge) | 노드의 EBS 볼륨 쓰기 작업의 최대 지연 시간(second).<br>_second로 표시_ |
| **aws.es.write_latency.minimum** <br>(gauge) | 노드의 EBS 볼륨 쓰기 작업의 최소 지연 시간(second).<br>_second로 표시_ |
| **aws.es.write_throughput** <br>(gauge) | EBS 볼륨의 쓰기 작업 초당 처리량(byte).<br>_byte로 표시_ |
| **aws.es.write_throughput.maximum** <br>(gauge) | 각 노드별 EBS 볼륨의 쓰기 작업 초당 최대 처리량(byte).<br>_byte로 표시_ |
| **aws.es.write_throughput.minimum** <br>(gauge) | 각 노드별 EBS 볼륨의 쓰기 작업 초당 최소 처리량(byte).<br>_byte로 표시_ |

### 이벤트

Amazon OpenSearch Service 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Amazon OpenSearch Service 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.