---
aliases:
- /ko/integrations/google_cloud_pubsub
app_id: google-cloud-pubsub
categories:
- cloud
- google cloud
- log collection
- message queues
custom_kind: integration
description: Google Cloud 기반의 확장 가능하고 유연하며 신뢰할 수 있는 엔터프라이즈급 메시지 지향 미들웨어 솔루션.
media: []
title: Google Cloud Pubsub
---
## 개요

Google Cloud Pub/Sub는 엔터프라이즈 메시지 중심 미들웨어의 확장성, 유연성, 안정성을 클라우드에서 제공해 드립니다.

Google Pub/Sub 메트릭을 수집하면 다음을 할 수 있습니다.

- Pub/Sub 토픽 및 구독의 성과를 시각화합니다.
- Pub/Sub 토픽 성능 및 구독과 애플리케이션의 상관관계를 파악합니다.

## 설정

### 메트릭 수집

#### 설치

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

#### 설정

사용자 지정 Pub/Sub 레이블을 태그로 수집하려면 Google Cloud의 Datadog 서비스 계정에서 클라우드 자산 인벤토리 권한을 활성화하세요.

### 로그 수집

Google Cloud Pub/Sub 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정하세요](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Pub/Sub 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud Pub/Sub 로그를 필터링하세요.

1. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.

1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.

   {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub 로그를 Pub/Sub로 내보내기" >}}

1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.pubsub.snapshot.backlog_bytes** <br>(gauge) | 스냅샷에 보관된 메시지의 총 바이트 크기<br>_byte로 표시_ |
| **gcp.pubsub.snapshot.backlog_bytes_by_region** <br>(gauge) | Cloud 리전별로 분류하여 스냅샷에 보관된 메시지의 총 바이트 크기<br>_byte로 표시_ |
| **gcp.pubsub.snapshot.config_updates_count** <br>(count) | 작업 유형 및 결과별로 그룹화된 구성 변경 누적 횟수<br>_update로 표시_ |
| **gcp.pubsub.snapshot.num_messages** <br>(gauge) | 스냅샷에 보관된 메시지 수<br>_message로 표시_ |
| **gcp.pubsub.snapshot.num_messages_by_region** <br>(gauge) | Cloud 리전별로 분류하여 스냅샷에 보관된 메시지 수<br>_message로 표시_ |
| **gcp.pubsub.snapshot.oldest_message_age** <br>(gauge) | 스냅샷에 보관된 가장 오래된 메시지의 경과 시간(초)<br>_second로 표시_ |
| **gcp.pubsub.snapshot.oldest_message_age_by_region** <br>(gauge) | Cloud 리전별로 분류된, 스냅샷에 보관된 가장 오래된 메시지의 경과 시간(초)<br>_second로 표시_ |
| **gcp.pubsub.subscription.ack_latencies.avg** <br>(gauge) | ack 지연 시간 평균<br>_millisecond로 표시_ |
| **gcp.pubsub.subscription.ack_latencies.samplecount** <br>(count) | ack 지연 시간 샘플 수<br>_millisecond로 표시_ |
| **gcp.pubsub.subscription.ack_latencies.sumsqdev** <br>(gauge) | ack 지연 시간 제곱편차 합계<br>_millisecond로 표시_ |
| **gcp.pubsub.subscription.ack_message_count** <br>(count) | 전달 유형별로 그룹화된, Acknowledge 요청에 의해 확인된 메시지의 누적 개수<br>_byte로 표시_ |
| **gcp.pubsub.subscription.backlog_bytes** <br>(gauge) | 구독에서 확인되지 않은 메시지(백로그 메시지라고도 함)의 총 바이트 크기<br>_byte로 표시_ |
| **gcp.pubsub.subscription.billable_bytes_by_region** <br>(gauge) | Cloud 리전 및 유형별로 분류된, 구독에서 청구 가능한 메시지의 총 바이트 크기. 구독에서 미확인 메시지를 24시간 이상 보관할 경우 발생하는 요금은 <a href=https://cloud.google.com/pubsub/pricing#storage_costs>Pub/Sub 가격 페이지</a>를 참고하세요.<br>_byte로 표시_ |
| **gcp.pubsub.subscription.byte_cost** <br>(count) | 각 구독별로 산정된 운영 비용<br>_byte로 표시_ |
| **gcp.pubsub.subscription.config_updates_count** <br>(count) | 구독 구성 변경 횟수<br>_occurrence로 표시_ |
| **gcp.pubsub.subscription.dead_letter_message_count** <br>(count) | 데드 레터 토픽으로 게시된 메시지 누적 수<br>_message로 표시_ |
| **gcp.pubsub.subscription.delivery_latency_health_score** <br>(gauge) | 구독 상태를 측정하는 점수<br>_occurrence로 표시_ |
| **gcp.pubsub.subscription.exactly_once_warning_count** <br>(count) | 메시지 재전송으로 이어질 수 있는 인스턴스 수(실패할 수 있는 ack 및 modack 포함)<br>_occurrence로 표시_ |
| **gcp.pubsub.subscription.expired_ack_deadlines_count** <br>(count) | 구독자 클라이언트에 메시지가 전달된 상태에서 ack 기한이 만료된 메시지 누적 수<br>_message로 표시_ |
| **gcp.pubsub.subscription.export_push_subscription_details** <br>(gauge) | 내보내기 Push 구독의 유형 및 상태.|
| **gcp.pubsub.subscription.mod_ack_deadline_message_count** <br>(count) | ModifyAckDeadline 요청으로 마감일이 업데이트된 메시지 누적 수<br>_message로 표시_ |
| **gcp.pubsub.subscription.mod_ack_deadline_request_count** <br>(count) | ModifyAckDeadline 요청 수<br>_request로 표시_ |
| **gcp.pubsub.subscription.mod_ack_latencies.avg** <br>(count) | ModAck 지연 시간의 평균 분포. 각 메시지 전달 시도에서 ModAck 지연 시간은 CPS 서비스가 구독자 클라이언트에게 메시지를 전달한 시점부터 해당 메시지의 ModAck 요청을 수신한 시점까지의 시간입니다.<br>_millisecond로 표시_ |
| **gcp.pubsub.subscription.mod_ack_latencies.samplecount** <br>(count) | ModAck 지연 시간 분포 샘플 수. 각 메시지 전달 시도에서 ModAck 지연 시간은 CPS 서비스가 구독자 클라이언트에게 메시지를 전달한 시점부터 해당 메시지의 ModAck 요청을 수신한 시점까지의 시간입니다.<br>_millisecond로 표시_ |
| **gcp.pubsub.subscription.mod_ack_latencies.sumsqdev** <br>(count) | ModAck 지연 시간 분포의 제곱편차 합계. 각 메시지 전달 시도에서 ModAck 지연 시간은 CPS 서비스가 구독자 클라이언트에게 메시지를 전달한 시점부터 해당 메시지의 ModAck 요청을 수신한 시점까지의 시간입니다.<br>_millisecond로 표시_ |
| **gcp.pubsub.subscription.nack_requests** <br>(gauge) | 확인 응답을 받은 메시지의 누적 개수. 한 메시지가 여러 번 확인 응답을 받으면 여러 번 계산됩니다.|
| **gcp.pubsub.subscription.num_outstanding_messages** <br>(gauge) | 전달되었지만 확인되지 않은 메시지<br>_ message로 표시_ |
| **gcp.pubsub.subscription.num_retained_acked_messages** <br>(gauge) | 구독에 보관된 확인 메시지 수<br>_message로 표시_ |
| **gcp.pubsub.subscription.num_retained_acked_messages_by_region** <br>(gauge) | Cloud 리전별로 분류하여 구독에 보관된 확인된 메시지 수<br>_message로 표시_ |
| **gcp.pubsub.subscription.num_unacked_messages_by_region** <br>(gauge) | Cloud 리전별로 분류하여 구독에 보관된 미확인 메시지 수<br>_message로 표시_ |
| **gcp.pubsub.subscription.num_undelivered_messages** <br>(gauge) | 구독 내 미확인 메시지(백로그 메시지라고도 함) 수.|
| **gcp.pubsub.subscription.oldest_retained_acked_message_age** <br>(gauge) | 구독에 보관된 가장 오래된 확인 메시지 경과 시간(초)<br>_second로 표시_ |
| **gcp.pubsub.subscription.oldest_retained_acked_message_age_by_region** <br>(gauge) | Cloud 리전별로 분류하여 구독에 보관된 가장 오래된 확인 메시지의 경과 시간(초)<br>_second로 표시_ |
| **gcp.pubsub.subscription.oldest_unacked_message_age** <br>(gauge) | 구독에서 가장 오래된 미확인 메시지(백로그 메시지라고도 함) 경과 시간(초)<br>_second로 표시_ |
| **gcp.pubsub.subscription.oldest_unacked_message_age_by_region** <br>(gauge) | Cloud 리전별로 분류된, 구독에서 가장 오래된 미확인 메시지 경과 시간(초)<br>_second로 표시_ |
| **gcp.pubsub.subscription.open_streaming_pulls** <br>(gauge) | 상태별로 그룹화된 구독별 열린 StreamingPull 스트림 수.|
| **gcp.pubsub.subscription.pull_ack_request_count** <br>(count) | 메시지 Pull 확인 요청의 증분 수<br>_request로 표시_ |
| **gcp.pubsub.subscription.pull_request_count** <br>(count) | 메시지 Pull 요청 수<br>_request로 표시_ |
| **gcp.pubsub.subscription.push_request_count** <br>(count) | 메시지 Push 시도 수<br>_request로 표시_ |
| **gcp.pubsub.subscription.push_request_latencies.avg** <br>(gauge) | Push 요청 지연 시간 평균<br>_microsecond로 표시_ |
| **gcp.pubsub.subscription.push_request_latencies.samplecount** <br>(count) | Push 요청 지연 시간 샘플 수<br>_microsecond로 표시_ |
| **gcp.pubsub.subscription.push_request_latencies.sumsqdev** <br>(gauge) | Push 요청 지연 시간 제곱편차 합계<br>_microsecond로 표시_ |
| **gcp.pubsub.subscription.retained_acked_bytes** <br>(gauge) | 구독에 보관된 확인 메시지의 총 바이트 크기<br>_byte로 표시_ |
| **gcp.pubsub.subscription.retained_acked_bytes_by_region** <br>(gauge) | Cloud 리전별로 분류하여 구독에 보관된 확인 메시지의 총 바이트 크기<br>_byte로 표시_ |
| **gcp.pubsub.subscription.seek_request_count** <br>(count) | 결과별로 그룹화된 검색 시도 누적 수<br>_request로 표시_ |
| **gcp.pubsub.subscription.sent_message_count** <br>(count) | Cloud Pub/Sub가 구독 클라이언트에 전송한 메시지 누적 수<br>_message로 표시_ |
| **gcp.pubsub.subscription.streaming_pull_ack_request_count** <br>(count) | 결과별로 그룹화된, 확인 ID가 비어 있지 않은 스트리밍 Pull 요청의 누적 수<br>_request로 표시_ |
| **gcp.pubsub.subscription.streaming_pull_mod_ack_deadline_request_count** <br>(count) | 결과별로 그룹화된, ModifyAckDeadline 필드가 비어 있지 않은 스트리밍 Pull 요청의 누적 수<br>_request로 표시_ |
| **gcp.pubsub.subscription.streaming_pull_response_count** <br>(count) | 결과별로 그룹화된 스트리밍 Pull 응답 누적 수<br>_response로 표시_ |
| **gcp.pubsub.subscription.unacked_bytes_by_region** <br>(gauge) | Cloud 리전별로 분류된 구독 내 미확인 메시지의 총 바이트 크기<br>_byte로 표시_ |
| **gcp.pubsub.topic.byte_cost** <br>(count) | 토픽별 운영 바이트 비용<br>_byte로 표시_ |
| **gcp.pubsub.topic.config_updates_count** <br>(count) | 토픽 구성 변경 횟수<br>_occurrence로 표시_ |
| **gcp.pubsub.topic.ingestion_byte_count** <br>(count) | 수집 소스 유형 및 가져오기 파티션(예: AWS Kinesis 샤드 ID)별 수집된 메시지의 바이트 수<br>_byte로 표시_ |
| **gcp.pubsub.topic.ingestion_data_source_state** <br>(gauge) | 수집 소스 유형별 수집 데이터 소스의 상태.|
| **gcp.pubsub.topic.ingestion_failure_count** <br>(count) | 수집 소스 유형, 소스 이름, 가져오기 파티션, 오류 사유별로 집계된 데이터 수집 오류 수|
| **gcp.pubsub.topic.ingestion_message_count** <br>(count) | 수집 소스 유형 및 가져오기 파티션(예: AWS Kinesis 샤드 ID)별로 수집된 메시지 수|
| **gcp.pubsub.topic.message_sizes.avg** <br>(gauge) | 게시 메시지 크기 평균<br>_byte로 표시_ |
| **gcp.pubsub.topic.message_sizes.samplecount** <br>(count) | 게시 메시지 크기 샘플 수<br>_byte로 표시_ |
| **gcp.pubsub.topic.message_sizes.sumsqdev** <br>(gauge) | 게시 메시지 크기 제곱편차 합계<br>_byte로 표시_ |
| **gcp.pubsub.topic.num_retained_acked_messages_by_region** <br>(gauge) | Cloud 리전별로 분류하여 토픽에 보관된 확인 메시지 수<br>_message로 표시_ |
| **gcp.pubsub.topic.num_retained_messages** <br>(gauge) | 토픽에 보관된 메시지 수<br>_message로 표시_ |
| **gcp.pubsub.topic.num_unacked_messages_by_region** <br>(gauge) | Cloud 리전별로 분류되어 토픽에 존재하는 미확인 메시지 수<br>_message로 표시_ |
| **gcp.pubsub.topic.oldest_retained_acked_message_age_by_region** <br>(gauge) | Cloud 리전별로 분류하여 토픽에 보관된 가장 오래된 확인 메시지의 경과 시간(초)<br>_second로 표시_ |
| **gcp.pubsub.topic.oldest_retained_message_age** <br>(gauge) | 토픽에 보관된 가장 오래된 메시지의 경과 시간(초)<br>_second로 표시_ |
| **gcp.pubsub.topic.oldest_unacked_message_age_by_region** <br>(gauge) | Cloud 리전별로 분류된, 토픽에서 가장 오래된 미확인 메시지 경과 시간(초)<br>_second로 표시_ |
| **gcp.pubsub.topic.retained_acked_bytes_by_region** <br>(gauge) | Cloud 리전별로 분류하여 토픽에 보관된 확인 메시지의 총 바이트 크기<br>_byte로 표시_ |
| **gcp.pubsub.topic.retained_bytes** <br>(gauge) | 토픽에 보관된 메시지의 총 바이트 크기<br>_byte로 표시_ |
| **gcp.pubsub.topic.schema_validation_latencies.avg** <br>(count) | 스키마 검증 지연 시간의 평균 분포(밀리초)<br>_millisecond로 표시_ |
| **gcp.pubsub.topic.schema_validation_latencies.samplecount** <br>(count) | 스키마 검증 지연 시간 분포의 샘플 수(밀리초)<br>_millisecond로 표시_ |
| **gcp.pubsub.topic.schema_validation_latencies.sumsqdev** <br>(count) | 스키마 검증 지연 시간 분포의 제곱편차 합계(밀리초)<br>_millisecond로 표시_ |
| **gcp.pubsub.topic.send_request_count** <br>(count) | 메시지 전송 요청 횟수<br>_request로 표시_ |
| **gcp.pubsub.topic.send_request_latencies.avg** <br>(gauge) | 토픽 전송 요청 지연 시간 평균<br>_microsecond로 표시_ |
| **gcp.pubsub.topic.send_request_latencies.samplecount** <br>(count) | 토픽 전송 요청 지연 시간 샘플 수<br>_microsecond로 표시_ |
| **gcp.pubsub.topic.send_request_latencies.sumsqdev** <br>(gauge) | 토픽 전송 요청 지연 시간 제곱편차 합계<br>_microsecond로 표시_ |
| **gcp.pubsub.topic.unacked_bytes_by_region** <br>(gauge) | Cloud 리전별로 분류된 토픽 내 미확인 메시지의 총 바이트 크기<br>_byte로 표시_ |

### 이벤트

Google Cloud Pub/Sub 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Pub/Sub 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.