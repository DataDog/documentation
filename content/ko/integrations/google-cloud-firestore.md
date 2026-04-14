---
aliases:
- /ko/integrations/google_cloud_firestore
app_id: google-cloud-firestore
categories:
- cloud
- data stores
- google cloud
- log collection
- mobile
custom_kind: integration
description: Firebase 및 Google Cloud가 제공하는 모바일, 웹, 서버 개발을 위한 유연하고 확장 가능한 데이터베이스.
media: []
title: Google Cloud Firestore
---
## 개요

Google Cloud Firestore는 Firebase와 Google 클라우드 플랫폼에서 제공하는 모바일, 웹, 서버 개발을 위한 유연하고 확장 가능한 데이터베이스입니다.

Datadog Google 클라우드 플랫폼 통합을 사용하여 Google Cloud Firestore에서 메트릭 수집합니다.

## 설정

### 설치

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 로그 수집

Google Cloud Firestore 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정하세요](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

이 작업이 완료되면 Google Cloud Firestore 로그를 Google 클라우드 로깅에서 퍼브/서브 항목으로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud Firestore 로그를 필터링하세요.
1. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.firestore.api.request_count** <br>(count) | Firestore API 호출 횟수.|
| **gcp.firestore.api.request_latencies.avg** <br>(count) | 프런트엔드에서 발생한 비스트리밍 Firestore v1, Datastore v1,  Datastore v3 요청 평균 지연 시간<br>_second로 표시_ |
| **gcp.firestore.api.request_latencies.samplecount** <br>(count) | 프런트엔드에서 발생한 비스트리밍 Firestore v1, Datastore v1, Datastore v3 요청 지연 시간 샘플 수<br>_second로 표시_ |
| **gcp.firestore.api.request_latencies.sumsqdev** <br>(count) | 프런트엔드에서 발생한 비스트리밍 Firestore v1, Datastore v1, Datastore v3 요청 지연 시간 제곱편차 합계<br>_second로 표시_ |
| **gcp.firestore.composite_indexes_per_database** <br>(gauge) | 데이터베이스별 현재 복합 인덱스 수.|
| **gcp.firestore.document.delete_count** <br>(count) | 성공적으로 삭제된 문서 수.|
| **gcp.firestore.document.delete_ops_count** <br>(count) | 성공적으로 삭제된 문서 수.|
| **gcp.firestore.document.read_count** <br>(count) | 쿼리 또는 조회에서 성공적으로 읽은 문서 수.|
| **gcp.firestore.document.read_ops_count** <br>(count) | 쿼리 또는 조회에서 성공적으로 읽은 문서 수.|
| **gcp.firestore.document.ttl_deletion_count** <br>(count) | TTL 서비스에서 삭제된 문서의 총 개수.|
| **gcp.firestore.document.ttl_expiration_to_deletion_delays.avg** <br>(count) | TTL이 설정된 문서가 만료된 시점부터 실제로 삭제된 시점까지 경과된 평균 시간<br>_second로 표시_ |
| **gcp.firestore.document.ttl_expiration_to_deletion_delays.samplecount** <br>(count) | TTL이 설정된 문서가 만료된 시점부터 실제로 삭제된 시점까지 경과 시간 샘플 수<br>_second로 표시_ |
| **gcp.firestore.document.ttl_expiration_to_deletion_delays.sumsqdev** <br>(count) | TTL이 설정된 문서가 만료된 시점부터 실제로 삭제된 시점까지 경과 시간 제곱편차 합계<br>_second로 표시_ |
| **gcp.firestore.document.write_count** <br>(count) | 성공적으로 작성된 문서 수.|
| **gcp.firestore.document.write_ops_count** <br>(count) | 성공적으로 작성된 문서 수.|
| **gcp.firestore.field_configurations_per_database** <br>(gauge) | 데이터베이스별 현재 필드 구성 수.|
| **gcp.firestore.network.active_connections** <br>(gauge) | 활성 연결 수. 각 모바일 클라이언트는 하나의 연결을 가지며, 어드민 SDK의 각 리스너도 하나의 연결을 가집니다.|
| **gcp.firestore.network.snapshot_listeners** <br>(gauge) | 현재 연결된 모든 클라이언트에 등록된 스냅샷 리스너 수.|
| **gcp.firestore.query_stat.per_query.result_counts.avg** <br>(count) | 쿼리당 결과 개수의 평균 분포. 실시간 쿼리는 제외됩니다. 참고: 이 메트릭은 성능 옵저버빌리티를 위한 것이며 요금 계산과는 관련이 없습니다. 읽기 작업이 청구서에 미치는 영향을 이해하려면 `firestore.googleapis.com/document/read_ops_count`를 사용하세요.|
| **gcp.firestore.query_stat.per_query.result_counts.samplecount** <br>(count) | 쿼리당 결과 개수 분포의 샘플 수. 실시간 쿼리는 제외됩니다. 참고: 이 메트릭은 성능 옵저버빌리티를 위한 것이며 요금 계산과는 관련이 없습니다. 읽기 작업이 청구서에 미치는 영향을 이해하려면 `firestore.googleapis.com/document/read_ops_count`를 사용하세요.|
| **gcp.firestore.query_stat.per_query.result_counts.sumsqdev** <br>(count) | 쿼리당 결과 개수 분포의 제곱편차 합계. 실시간 쿼리는 제외됩니다. 참고: 이 메트릭은 성능 옵저버빌리티를 위한 것이며 요금 계산과는 관련이 없습니다. 읽기 작업이 청구서에 미치는 영향을 `firestore.googleapis.com/document/read_ops_count`를 사용하세요.|
| **gcp.firestore.query_stat.per_query.scanned_documents_counts.avg** <br>(count) | 쿼리당 스캔된 문서 수의 평균 분포. 실시간 쿼리는 제외됩니다. 참고: 이 메트릭은 성능 옵저버빌리티를 위한 것이며 요금 계산과는 관련이 없습니다. 읽기 작업이 청구서에 미치는 영향을 이해하려면 `firestore.googleapis.com/document/read_ops_count`를 사용하세요.|
| **gcp.firestore.query_stat.per_query.scanned_documents_counts.samplecount** <br>(count) | 쿼리당 스캔된 문서 수 분포의 샘플 수. 실시간 쿼리는 제외됩니다. 참고: 이 메트릭은 성능 옵저버빌리티를 위한 것이며 요금 계산과는 관련이 없습니다. 읽기 작업이 청구서에 미치는 영향을 이해하려면 `firestore.googleapis.com/document/read_ops_count`를 사용하세요.|
| **gcp.firestore.query_stat.per_query.scanned_documents_counts.sumsqdev** <br>(count) | 쿼리당 스캔된 문서 수 분포의 제곱편차 합계. 실시간 쿼리는 제외됩니다. 참고: 이 메트릭은 성능 옵저버빌리티를 위한 것이며 요금 계산과는 관련이 없습니다. 읽기 작업이 청구서에 미치는 영향을 이해하려면 `firestore.googleapis.com/document/read_ops_count`를 사용하세요.|
| **gcp.firestore.query_stat.per_query.scanned_index_entries_counts.avg** <br>(count) | 쿼리당 스캔된 인덱스 엔트리 수의 평균 분포. 실시간 쿼리는 제외됩니다. 참고: 이 메트릭은 성능 옵저버빌리티를 위한 것이며 요금 계산과는 관련이 없습니다. 읽기 작업이 청구서에 미치는 영향을 이해하려면 `firestore.googleapis.com/document/read_ops_count`를 사용하세요.|
| **gcp.firestore.query_stat.per_query.scanned_index_entries_counts.samplecount** <br>(count) | 쿼리당 스캔된 인덱스 엔트리 수의 분포 샘플 수. 실시간 쿼리는 제외됩니다. 참고: 이 메트릭은 성능 옵저버빌리티를 위한 것이며 요금 계산과는 관련이 없습니다. 읽기 작업이 청구서에 미치는 영향을 이해하려면 `firestore.googleapis.com/document/read_ops_count`를 사용하세요.|
| **gcp.firestore.query_stat.per_query.scanned_index_entries_counts.sumsqdev** <br>(count) | 쿼리당 스캔된 인덱스 엔트리 수 분포의 제곱편차 합계. 실시간 쿼리는 제외됩니다. 참고: 이 메트릭은 성능 옵저버빌리티를 위한 것이며 요금 계산과는 관련이 없습니다. 읽기 작업이 청구서에 미치는 영향을 이해하려면 `firestore.googleapis.com/document/read_ops_count`를 사용하세요.|
| **gcp.firestore.quota.composite_indexes_per_database.exceeded** <br>(count) | 할당량 메트릭 `firestore.googleapis.com/composite_indexes_per_database` 한도를 초과하려 시도한 횟수.|
| **gcp.firestore.quota.composite_indexes_per_database.limit** <br>(gauge) | 할당량 메트릭 `firestore.googleapis.com/composite_indexes_per_database` 현재 한도.|
| **gcp.firestore.quota.composite_indexes_per_database.usage** <br>(gauge) | 할당량 메트릭 `firestore.googleapis.com/composite_indexes_per_database` 현재 사용량.|
| **gcp.firestore.rules.evaluation_count** <br>(count) | 쓰기(생성, 업데이트, 삭제) 또는 읽기(가져오기, 목록) 요청에 대한 응답으로 실행된 Cloud Firestore Security Rule 평가 횟수.|

### 이벤트

Google Cloud Firestore 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Google Cloud Firestore 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.