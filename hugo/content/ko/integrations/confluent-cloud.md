---
aliases:
- /ko/integrations/confluent_cloud
app_id: confluent-cloud
categories:
- cost management
- 메트릭
- 메시지 대기열
custom_kind: 통합
description: Confluent Cloud에서 다양한 Kafka 메트릭 및 관련 비용 데이터를 수집합니다.
further_reading:
- link: https://www.datadoghq.com/blog/confluent-cloud-monitoring-datadog/
  tag: 블로그
  text: Datadog를 사용해 Confluent Cloud 모니터링
- link: https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/
  tag: 블로그
  text: Confluent Cloud 커넥터를 자동 탐지하고 데이터 스트림 모니터링에서 쉽게 성능 모니터링하기
integration_version: 1.0.0
media:
- caption: Confluent Cloud 대시보드 개요
  image_url: images/confluent_dashboard.png
  media_type: image
title: Confluent Cloud
---
## 개요

{{< site-region region="gov" >}}
**Confluent Cloud 통합은 Datadog {{< region-param key="dd_site_name" >}} 사이트에서 지원되지 않습니다**.
{{< /site-region >}}

Confluent Cloud는 완전 관리형 클라우드 호스팅 스트리밍 데이터 서비스입니다. Datadog과 Confluent Cloud를 연결하여 Confluent Cloud 리소스의 주요 메트릭을 시각화하고 알림를 생성합니다.

Datadog의 즉시 사용 가능한 Confluent Cloud 대시보드는 활성 연결의 변화율, 평균 소비된 레코드와 생산된 레코드의 비율과 같은 정보를 포함하여 환경의 상태와 성능을 모니터링하기 위한 주요 클러스터 메트릭을 보여줍니다.

권장 모니터를 사용하여 토픽 랙(topic lag)이 너무 높아지면 팀에 알리거나 이러한 메트릭을 사용하여 직접 만들 수 있습니다.

## 설정

### 설치

[Datadog Confluent Cloud 통합 타일](https://app.datadoghq.com/integrations/confluent-cloud)을 사용해 통합을 설치합니다.

### 설정

1. Confluent Cloudd에서 **+ Add API Key**를 클릭하여 [Confluent Cloud API Key 및 API Secret](#api-key-and-secret)을 입력합니다.
   - **클라우드 리소스 관리** API 키와 시크릿을 생성합니다.
   - **Save**를 클릭합니다. Datadog은 해당 크리덴셜과 연결된 계정을 검색합니다.
   - Datadog 통합 설정에서 **API 키 및 API 시크릿** 필드에 API 키와 시크릿을 추가합니다.
1. Confluent Cloud [Cluster ID](#cluster-id) 또는 [Connector ID](#connector-id)를 추가합니다. Datadog은 Confluent Cloud 메트릭을 크롤링하고 몇 분 내에 메트릭을 로드합니다.
1. 다음에 따라 Confluent Cloud(옵션)에 정의된 태그를 수집합니다.
   - **Schema Registry** API 키 및 기밀을 생성하세요. [Confluent Cloud에서 스키마 관리](https://docs.confluent.io/cloud/current/get-started/schema-registry.html#quick-start-for-schema-management-on-ccloud)에 관한 자세한 정보를 읽어보세요.
   - **저장**을 클릭합니다. Datadog은 Confluent Cloud에 정의된 태그를 수집합니다.
   - Datadog 통합 설정에서 **Schema Registry API 키 및 시크릿** 필드에 API 키와 시크릿을 추가합니다.
1. 클라우드 비용 관리(Cloud Cost Management)를 사용하고 비용 데이터 수집을 활성화한 경우
   - [BillingAdmin 역할](https://docs.confluent.io/cloud/current/access-management/access-control/rbac/predefined-rbac-roles.html#billingadmin-role)이 API 키에서 활성화되어 있는지 확인하세요.
   - 24시간 내 [Cloud Cost Management](https://app.datadoghq.com/cost)([수집된 데이터](https://docs.datadoghq.com/cloud_cost_management/saas_costs/?tab=confluentcloud#data-collected))에 표시됩니다.

클러스터 및 커넥터 등 리소스 구성에 관한 자세한 정보는 [Confluent Cloud 통합 설명서](https://docs.datadoghq.com/integrations/confluent_cloud/)를 참조하세요.

#### API Key 및 Secret

Confluent Cloud API Key 및 Secret를 생성하려면 [UI에서 MetricsViewer 역할을 새로운 서비스 계정에 추가](https://docs.confluent.io/cloud/current/monitoring/metrics-api.html#add-the-metricsviewer-role-to-a-new-service-account-in-the-ui)를 참조하세요.

#### Cluster ID

Confluent Cloud Cluster ID 찾는 방법:

1. Confluent Cloud에서 **Environment Overview**로 이동한 다음 모니터링하려는 클러스터를 선택합니다.  
1. 왼쪽 탐색에서 **Cluster overview** > **Cluster settings**를 클릭합니다.
1. **식별(Identification)**에서 `lkc`로 시작하는 Cluster ID를 복사합니다.

#### Connector ID

다음에 따라 Confluent Cloud Connector ID를 찾습니다.

1. Confluent Cloud에서 **Environment Overview**로 이동한 다음 모니터링하려는 클러스터를 선택합니다.  
1. 왼쪽 탐색에서 **Data integration** > **Connectors**를 클릭합니다.
1. **커넥터(Connectors)**에서 `lcc`로 시작하는 Connector ID를 복사합니다.

## Dashboards

통합 구성 후 Kafka 클러스터 및 커넥터 메트릭에 대한 개요를 보려면 즉시 사용 가능한 Confluent Cloud 대시보드를 참조하세요.

기본적으로 Confluent Cloud에서 수집한 모든 메트릭이 표시됩니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **confluent_cloud.kafka.received_bytes** <br>(count) | 네트워크로부터 수신된 바이트 수의 델타 값. 각 샘플은 이전 데이터 샘플 이후 수신된 바이트 수를 나타내며, 해당 값은 60초마다 샘플링됩니다.<br>_byte로 표시_ |
| **confluent_cloud.kafka.sent_bytes** <br>(count) | 네트워크로부터 수신된 바이트 수의 델타 값. 각 샘플은 이전 데이터 샘플 이후 수신된 바이트 수를 나타내며, 해당 값은 60초마다 샘플링됩니다.<br>_byte로 표시_ |
| **confluent_cloud.kafka.received_records** <br>(count) | 수신된 레코드 수의 델타 값. 각 샘플은 이전 데이터 샘플 이후 수신된 레코드 수를 나타내며, 해당 값은 60초마다 샘플링됩니다.<br>_record로 표시_ |
| **confluent_cloud.kafka.sent_records** <br>(count) | 전송된 레코드 수의 델타 값. 각 샘플은 이전 데이터 포인트 이후 전송된 레코드 수를 나타내며, 해당 값은 60초마다 샘플링됩니다.<br>_record로 표시_ |
| **confluent_cloud.kafka.retained_bytes** <br>(gauge) | 클러스터에 의해 현재 유지되고 있는 바이트 수. 해당 값은 60초마다 샘플링됩니다.<br>_byte로 표시_ |
| **confluent_cloud.kafka.active_connection_count** <br>(gauge) | 활성 인증 연결 수.<br>_connection으로 표시_ |
| **confluent_cloud.kafka.connection_info** <br>(gauge) | 클라이언트 연결 메타데이터.<br>_connection으로 표시_ |
| **confluent_cloud.kafka.request_count** <br>(count) | 네트워크를 통해 수신된 요청 수의 델타 값. 각 샘플은 이전 데이터 포인트 이후 수신된 요청 수를 나타내며, 해당 값은 60초마다 샘플링됩니다.<br>_request로 표시_ |
| **confluent_cloud.kafka.partition_count** <br>(gauge) | 파티션의 수.|
| **confluent_cloud.kafka.successful_authentication_count** <br>(count) | 성공한 인증 횟수의 델타 값. 각 샘플은 이전 데이터 포인트 이후 성공한 인증 횟수를 나타내며, 해당 값은 60초마다 샘플링됩니다.<br>_attempt로 표시_ |
| **confluent_cloud.kafka.cluster_link_destination_response_bytes** <br>(count) | 모든 요청 유형에서 발생한 클러스터 링크 응답 바이트 수의 델타 값. 각 샘플은 이전 데이터 포인트 이후 전송된 바이트 수를 나타내며, 해당 값은 60초마다 샘플링됩니다.<br>_byte로 표시_ |
| **confluent_cloud.kafka.cluster_link_source_response_bytes** <br>(count) | 모든 요청 유형에서 발생한 클러스터 링크 소스 응답 바이트 수의 델타 값. 각 샘플은 이전 데이터 포인트 이후 전송된 바이트 수를 나타내며, 해당 값은 60초마다 샘플링됩니다.<br>_byte로 표시_ |
| **confluent_cloud.kafka.cluster_active_link_count** <br>(gauge) | 현재 활성화된 클러스터 링크 수. 해당 값은 60초마다 샘플링되며, 이 메트릭의 암묵적 시간 집계 방식은 MAX.|
| **confluent_cloud.kafka.cluster_load_percent** <br>(gauge) | 클러스터의 사용률을 나타내는 지표. 값의 범위는 0.0에서 1.0 사이.<br>_percent로 표시_ |
| **confluent_cloud.kafka.cluster_load_percent_max** <br>(gauge) | 클러스터 전반에서 브로커 최대 사용률을 나타내는 지표. 값의 범위는 0.0에서 1.0 사이.<br>_percent로 표시_ |
| **confluent_cloud.kafka.cluster_load_percent_avg** <br>(gauge) | 클러스터 전반의 평균 사용률을 나타내는 지표. 값의 범위는 0.0에서 1.0 사이.<br>_percent로 표시_ |
| **confluent_cloud.kafka.consumer_lag_offsets** <br>(gauge) | 그룹 멤버의 커밋된 오프셋과 파티션의 하이 워터마크 간의 지연. `consumer_group_id` 및 topic 태그가 적용됩니다.|
| **confluent_cloud.kafka.cluster_link_count** <br>(gauge) | 현재 클러스터 링크 수. 해당 값은 60초마다 샘플링되며, 이 메트릭의 암묵적 시간 집계 방식은 MAX.|
| **confluent_cloud.kafka.cluster_link_task_count** <br>(gauge) | 현재 클러스터 링크 작업 수. 해당 값은 60초마다 샘플링되며, 이 메트릭의 암묵적 시간 집계 방식은 MAX.|
| **confluent_cloud.kafka.cluster_link_mirror_transition_in_error** <br>(gauge) | 링크의 클러스터 링크 미러 토픽 상태 전환 오류 수. 해당 값은 60초마다 샘플링됩니다.|
| **confluent_cloud.kafka.cluster_link_mirror_topic_bytes** <br>(count) | 클러스터 링크 미러 토픽 바이트 수의 델타 값. 해당 값은 60초마다 샘플링됩니다.|
| **confluent_cloud.kafka.cluster_link_mirror_topic_count** <br>(gauge) | 링크별 클러스터 링크 미러 토픽 수. 해당 값은 60초마다 샘플링됩니다.|
| **confluent_cloud.kafka.cluster_link_mirror_topic_offset_lag** <br>(gauge) | 모든 파티션에서 발생한 클러스터 링크 미러 토픽 오프셋 지연의 최대값. 해당 지연 값은 60초마다 샘플링됩니다.|
| **confluent_cloud.kafka.request_bytes** <br>(gauge) | 지정된 요청 유형에서 네트워크를 통해 전송된 전체 요청 바이트 수의 델타 값. 각 샘플은 이전 데이터 포인트 이후 전송된 바이트 수를 나타내며, 해당 값은 60초마다 샘플링됩니다.|
| **confluent_cloud.kafka.response_bytes** <br>(gauge) | 지정된 응답 유형에서 네트워크를 통해 전송된 전체 응답 바이트 수의 델타 값. 각 샘플은 이전 데이터 포인트 이후 전송된 바이트 수를 나타내며, 해당 값은 60초마다 샘플링됩니다.|
| **confluent_cloud.kafka.rest_produce_request_bytes** <br>(count) | Kafka REST에서 요청한 Kafka REST produce 호출을 통해 네트워크로 전송된 전체 요청 바이트 수의 델타 값.|
| **confluent_cloud.kafka.dedicated_cku_count** <br>(count) | 전용 클러스터의 CKU 수|
| **confluent_cloud.kafka.producer_latency_avg_milliseconds** <br>(gauge) | 클라이언트 프로듀서 요청의 평균 지연 시간.<br>_millisecond로 표시_ |
| **confluent_cloud.connect.sent_records** <br>(count) | 소스 커넥터에서 변환을 거쳐 Kafka에 기록된 전체 레코드 수의 델타 값. 각 샘플은 이전 데이터 포인트 이후 전송된 레코드 수를 나타내며, 해당 값은 60초마다 샘플링됩니다.<br>_record로 표시_ |
| **confluent_cloud.connect.received_records** <br>(count) | 싱크 커넥터에서 수신된 전체 레코드 수의 델타 값. 각 샘플은 이전 데이터 포인트 이후 수신된 레코드 수를 나타내며, 해당 값은 60초마다 샘플링됩니다.<br>_record로 표시_ |
| **confluent_cloud.connect.sent_bytes** <br>(count) | 소스 커넥터에서 변환을 거쳐 Kafka에 기록된 전체 바이트 수의 델타 값. 각 샘플은 이전 데이터 포인트 이후 전송된 바이트 수를 나타내며, 해당 값은 60초마다 샘플링됩니다.<br>_byte로 표시_ |
| **confluent_cloud.connect.received_bytes** <br>(count) | 싱크 커넥터에서 수신된 전체 바이트 수의 델타 값. 각 샘플은 이전 데이터 포인트 이후 수신된 바이트 수를 나타내며, 해당 값은 60초마다 샘플링됩니다.<br>_byte로 표시_ |
| **confluent_cloud.connect.dead_letter_queue_records** <br>(count) | 싱크 커넥터에서 Kafka로 기록된 데드 레터 대기열 레코드 수의 델타 값. 해당 값은 60초마다 샘플링됩니다.<br>_record로 표시_ |
| **confluent_cloud.connect.connector_status** <br>(count) | 이 메트릭은 시스템 내 커넥터의 상태를 모니터링합니다. 값은 항상 1로 설정되며, 이는 커넥터가 존재함을 의미합니다. 커넥터의 현재 운영 상태는 status 태그를 통해 식별됩니다.<br>_record로 표시_ |
| **confluent_cloud.connect.sql_server_cdc_source_connector_snapshot_running** <br>(gauge) | Snapshot 실행 여부를 나타내는 지표. 해당 값에는 데이터베이스 서버와 커넥터가 실행 중인 시스템 간 클록 차이로 인한 영향이 반영될 수 있습니다.|
| **confluent_cloud.connect.sql_server_cdc_source_connector_snapshot_completed** <br>(gauge) | Snapshot 완료 여부를 나타내는 지표. 해당 값에는 데이터베이스 서버와 커넥터가 실행 중인 시스템 간 클록 차이로 인한 영향이 반영될 수 있습니다.|
| **confluent_cloud.connect.sql_server_cdc_source_connector_schema_history_status** <br>(gauge) | 커넥터의 스키마 히스토리 상태를 나타내는 지표. 해당 값에는 데이터베이스 서버와 커넥터가 실행 중인 시스템 간 클록 차이로 인한 영향이 반영될 수 있습니다.|
| **confluent_cloud.connect.mysql_cdc_source_connector_snapshot_running** <br>(gauge) | Snapshot 실행 여부를 나타내는 지표입니다. 해당 값에는 데이터베이스 서버와 커넥터가 실행 중인 시스템 간 클록 차이로 인한 영향이 반영될 수 있습니다.|
| **confluent_cloud.connect.mysql_cdc_source_connector_snapshot_completed** <br>(gauge) | Snapshot 완료 여부를 나타내는 지표입니다. 해당 값에는 데이터베이스 서버와 커넥터가 실행 중인 시스템 간 클록 차이로 인한 영향이 반영될 수 있습니다.|
| **confluent_cloud.connect.mysql_cdc_source_connector_schema_history_status** <br>(gauge) | 커넥터의 스키마 히스토리 상태를 나타내는 지표입니다. 해당 값에는 데이터베이스 서버와 커넥터가 실행 중인 시스템 간 클록 차이로 인한 영향이 반영될 수 있습니다.|
| **confluent_cloud.connect.postgres_cdc_source_connector_snapshot_running** <br>(gauge) | Snapshot 실행 여부를 나타내는 지표입니다. 해당 값에는 데이터베이스 서버와 커넥터가 실행 중인 시스템 간 클록 차이로 인한 영향이 반영될 수 있습니다.|
| **confluent_cloud.connect.postgres_cdc_source_connector_snapshot_completed** <br>(gauge) | Snapshot 완료 여부를 나타내는 지표입니다. 해당 값에는 데이터베이스 서버와 커넥터가 실행 중인 시스템 간 클록 차이로 인한 영향이 반영될 수 있습니다.|
| **confluent_cloud.connect.connector_task_status** <br>(gauge) | 시스템 내 커넥터 작업의 상태를 모니터링합니다. 값은 항상 1로 설정되며, 이는 해당 커넥터 작업이 존재함을 의미합니다.|
| **confluent_cloud.connect.connector_task_batch_size_avg** <br>(gauge) | 분당 평균 배치 크기(레코드 수 기준)를 모니터링합니다. 소스 커넥터의 경우, Kafka로 전송된 평균 배치 크기를 나타냅니다.<br>_percent로 표시_ |
| **confluent_cloud.connect.connector_task_batch_size_max** <br>(gauge) | 분당 최대 배치 크기(레코드 수 기준)를 모니터링합니다. 소스 커넥터의 경우, Kafka로 전송된 최대 배치 크기를 나타냅니다.<br>_percent로 표시_ |
| **confluent_cloud.ksql.streaming_unit_count** <br>(gauge) | 해당 KSQL 인스턴스의 Confluent Streaming Unit(CSU) 수. 해당 값은 60초마다 샘플링되며, 이 메트릭의 암묵적 시간 집계 방식은 MAX.<br>_unit으로 표시_ |
| **confluent_cloud.ksql.query_saturation** <br>(gauge) | 모든 노드를 기준으로 특정 ksqlDB 쿼리의 최대 포화도를 나타냅니다. 값은 0과 1 사이이며, 1에 가까울수록 ksqlDB 쿼리 처리가 가용 리소스에 의해 병목 상태임을 의미합니다.|
| **confluent_cloud.ksql.task_stored_bytes** <br>(gauge) | 지정된 작업의 상태 저장소 크기.<br>_byte로 표시_ |
| **confluent_cloud.ksql.storage_utilization** <br>(gauge) | 지정된 ksqlDB 애플리케이션의 전체 스토리지 사용률을 나타냅니다.|
| **confluent_cloud.schema_registry.schema_count** <br>(gauge) | 등록된 스키마 수.|
| **confluent_cloud.schema_registry.request_count** <br>(count) | 스키마 레지스트리 서버에서 수신된 요청 수의 델타 값. 각 샘플은 이전 데이터 포인트 이후 수신된 요청 수를 나타내며, 해당 값은 60초마다 샘플링됩니다.|
| **confluent_cloud.kafka.deprecated_request_count** <br>(count) | 네트워크를 통해 수신된 사용 중단 요청 수의 델타 값. 각 샘플은 이전 데이터 포인트 이후 수신된 요청 수를 나타내며, 해당 값은 60초마다 샘플링됩니다.<br>_request로 표시_ |
| **confluent_cloud.schema_registry.schema_operations_count** <br>(count) | 스키마 관련 작업 수의 델타 값. 각 샘플은 이전 데이터 포인트 이후 수신된 요청 수를 나타내며, 해당 값은 60초마다 샘플링됩니다.|
| **confluent_cloud.flink.num_records_in** <br>(count) | Flink 컴퓨트 풀을 사용하는 모든 Flink SQL 문에서 수신한 전체 레코드 수.|
| **confluent_cloud.flink.num_records_out** <br>(count) | Flink 컴퓨트 풀을 사용하는 모든 Flink SQL 문에서 출력한 전체 레코드 수.|
| **confluent_cloud.flink.pending_records** <br>(gauge) | Flink 컴퓨트 풀을 사용하는 모든 Flink SQL 문의 전체 백로그. |
| **confluent_cloud.flink.compute_pool_utilization.current_cfus** <br>(gauge) | 특정 시점에서의 CFU 절대값.|
| **confluent_cloud.flink.compute_pool_utilization.cfu_minutes_consumed** <br>(count) | 마지막 측정 이후 소비된 CFU 수.|
| **confluent_cloud.flink.compute_pool_utilization.cfu_limit** <br>(gauge) | 해당 풀에서 가능한 최대 CFU 수.|
| **confluent_cloud.flink.current_input_watermark_ms** <br>(gauge) | 해당 테이블에 대해 이 문이 마지막으로 수신한 워터마크 값(단위: 밀리초). |
| **confluent_cloud.flink.current_output_watermark_ms** <br>(gauge) | 해당 테이블에 대해 이 문이 마지막으로 생성한 워터마크 값(단위: 밀리초). |
| **confluent_cloud.custom.kafka.consumer_lag_offsets** <br>(gauge) | 그룹 멤버의 커밋된 오프셋과 파티션의 하이 워터마크 간의 지연. `consumer_group_id`, topic, partition, `consumer_group_id` 및 `client_id` 등의 태그가 적용됩니다.|

### 이벤트

Confluent Cloud 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Confluent Cloud 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

- [Terraform을 사용하여 Confluent 계정 생성 및 관리](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_account)
- [Terraform을 사용하여 Confluent 리소스 생성 및 관리](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_resource)