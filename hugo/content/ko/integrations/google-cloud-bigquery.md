---
aliases:
- /ko/integrations/google_cloud_bigquery
app_id: google-cloud-bigquery
categories:
- cloud
- google cloud
- data stores
- log collection
custom_kind: integration
description: BigQuery는 Google에서 출시한 서비스로, 페타바이트 규모의 완전관리형, 저비용 엔터프라이즈 데이터 웨어하우스입니다.
media: []
title: Google BigQuery
---
{{< callout url="https://www.datadoghq.com/product-preview/bigquery-monitoring/" header="Preview에 가입하세요!" >}}
확장된 BigQuery 모니터링은 Preview 단계입니다. 쿼리 성능과 관련한 인사이트를 얻으려면 이 양식을 작성하여 가입하세요.
{{< /callout >}}

## 개요

Datadog과 Google BigQuery의 통합을 통해 데이터 분석 워크로드를 모니터링하세요.

BigQuery와 Datadog을 연결(Google Cloud Platform 통합 사용)하면 쿼리 성능, 리소스 사용량, 비용 발생 요인과 관련한 실시간 인사이트를 얻을 수 있습니다.

이 통합을 사용하면 작업 완료 시간, 슬롯 활용률, 처리된 바이트와 같은 주요 메트릭을 추적할 수 있어 BigQuery 작업 실행에서 높은 지연 시간을 식별할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Google Cloud Platform 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 확장된 BigQuery 모니터링

확장된 BigQuery 모니터링 기능으로 BigQuery 환경에 관한 세부적인 가시성을 확보할 수 있습니다.

자세한 설정 지침은 [Google Cloud 통합 문서](https://docs.datadoghq.com/integrations/google-cloud-platform/#expanded-bigquery-monitoring)를 참고하세요.

### 로그 수집

Google BigQuery 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection)하세요.

이 작업이 완료되면 Google BigQuery 로그를 Google Cloud Logging에서 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google BigQuery 로그를 필터링합니다.
1. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.bigquery.job.num_in_flight** <br>(gauge) | 현재 실행 중인 작업 수<br>_job으로 표시_ |
| **gcp.bigquery.query.biengine_fallback_count** <br>(count) | 쿼리가 BI Engine 실행에 실패한 이유<br>_query로 표시_ |
| **gcp.bigquery.query.column_metadata_index_staleness.avg** <br>(gauge) | 지난 샘플링 구간 동안 컬럼 메타데이터 인덱스를 성공적으로 사용한 쿼리와 관련한 컬럼 메타데이터 인덱스의 지연 시간(밀리초) 평균 분포<br>_millisecond로 표시_ |
| **gcp.bigquery.query.column_metadata_index_staleness.samplecount** <br>(gauge) | 지난 샘플링 구간 동안 컬럼 메타데이터 인덱스를 성공적으로 사용한 쿼리의 컬럼 메타데이터 인덱스 지연 시간(밀리초) 분포에 대한 샘플 수<br>_millisecond로 표시_ |
| **gcp.bigquery.query.column_metadata_index_staleness.sumsqdev** <br>(gauge) | 지난 샘플링 구간 동안 컬럼 메타데이터 인덱스를 성공적으로 사용한 쿼리의 컬럼 메타데이터 인덱스 지연 시간(밀리초) 분포에 대한 제곱편차 합<br>_millisecond로 표시_ |
| **gcp.bigquery.query.count** <br>(gauge) | 현재 실행 중인 쿼리<br>_query로 표시_ |
| **gcp.bigquery.query.execution_count** <br>(count) | 실행된 쿼리 수<br>_query로 표시_ |
| **gcp.bigquery.query.execution_times.avg** <br>(gauge) | 쿼리 실행 시간 평균<br>_second로 표시_ |
| **gcp.bigquery.query.execution_times.samplecount** <br>(count) | 쿼리 실행 시간의 샘플 수<br>_second로 표시_ |
| **gcp.bigquery.query.execution_times.sumsqdev** <br>(gauge) | 쿼리 실행 시간 제곱 편차 합계<br>_second로 표시_ |
| **gcp.bigquery.query.scanned_bytes** <br>(rate) | 스캔한 바이트 수. 참고: 이 메트릭은 6시간 지연 후 제공<br>_byte로 표시_ |
| **gcp.bigquery.query.scanned_bytes_billed** <br>(rate) | 청구된 스캔 바이트 수. 참고: 이 메트릭은 6시간 지연 후 제공<br>_byte로 표시_ |
| **gcp.bigquery.query.statement_scanned_bytes** <br>(count) | 문(statement) 유형별 스캔 바이트 수. 참고: 이 메트릭은 6시간 지연 후 제공<br>_byte로 표시_ |
| **gcp.bigquery.query.statement_scanned_bytes_billed** <br>(count) | 문(statement) 유형별 청구된 스캔 바이트 수. 참고: 이 메트릭은 6시간 지연 후 제공<br>_byte로 표시_ |
| **gcp.bigquery.slots.allocated** <br>(gauge) | 프로젝트에 현재 할당된 BigQuery 슬롯 수. 슬롯 할당은 예약 및 작업 유형별로 분류할 수 있습니다.|
| **gcp.bigquery.slots.allocated_for_project** <br>(gauge) | 현재 프로젝트에 할당된 BigQuery 슬롯 수.|
| **gcp.bigquery.slots.allocated_for_project_and_job_type** <br>(gauge) | 프로젝트 및 작업 유형에 현재 할당된 BigQuery 슬롯 수.|
| **gcp.bigquery.slots.allocated_for_reservation** <br>(gauge) | 예약된 프로젝트에 현재 할당된 BigQuery 슬롯 수.|
| **gcp.bigquery.slots.assigned** <br>(gauge) | 특정 프로젝트 또는 조직에 할당된 슬롯 수.|
| **gcp.bigquery.slots.capacity_committed** <br>(gauge) | 이 관리자 프로젝트 또는 조직을 통해 구매한 총 슬롯 용량 약정.|
| **gcp.bigquery.slots.max_assigned** <br>(gauge) | 특정 프로젝트 또는 조직에 할당된 최대 슬롯 수.|
| **gcp.bigquery.slots.total_allocated_for_reservation** <br>(gauge) | 현재 예약된 모든 프로젝트에 할당된 BigQuery 슬롯 수.|
| **gcp.bigquery.storage.insertall_inserted_bytes** <br>(count) | InsertAll 스트리밍 API를 사용하여 프로젝트에서 업로드한 바이트 수.<br>_byte로 표시_ |
| **gcp.bigquery.storage.insertall_inserted_rows** <br>(count) | InsertAll 스트리밍 API를 사용하여 프로젝트에서 업로드한 행 수<br>_row로 표시_ |
| **gcp.bigquery.storage.stored_bytes** <br>(gauge) | 저장된 바이트 수. 참고: 이 메트릭은 3시간 지연 후 제공<br>_byte로 표시_ |
| **gcp.bigquery.storage.table_count** <br>(gauge) | 테이블 수. 참고: 이 메트릭은 3시간 지연 후 제공<br>_table로 표시_ |
| **gcp.bigquery.storage.uploaded_bytes** <br>(count) | 업로드된 바이트 수. 참고: 이 메트릭은 6시간 지연 후 제공<br>_byte로 표시_ |
| **gcp.bigquery.storage.uploaded_bytes_billed** <br>(count) | 청구된 업로드 바이트 수. 참고: 이 메트릭은 6시간 지연 후 제공<br>_byte로 표시_ |
| **gcp.bigquery.storage.uploaded_row_count** <br>(count) | 업로드된 행 수. 참고: 이 메트릭은 6시간 지연 후 제공<br>_row로 표시_ |

### 이벤트

Google BigQuery 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Google BigQuery 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.