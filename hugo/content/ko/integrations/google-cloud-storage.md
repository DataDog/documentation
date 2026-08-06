---
aliases:
- /ko/integrations/google_cloud_storage
app_id: google-cloud-storage
categories:
- cloud
- data stores
- google cloud
- log collection
custom_kind: integration
description: 실시간 데이터 제공, 데이터 분석, 머신 러닝, 데이터 아카이빙을 위한 통합 객체 스토리지.
media: []
title: Google Cloud Storage
---
## 개요

Google Cloud Storage는 실시간 데이터 제공부터 데이터 분석/ML, 데이터 보관까지 개발자 및 기업을 위한 서비스를 제공해 드리는 통합 객체 스토리지입니다.

Google Storage 메트릭을 수집하면 다음을 할 수 있습니다.

- Storage 서비스 성능을 시각화합니다.
- Storage 서비스의 성능과 애플리케이션의 상관 관계를 파악합니다.

## 설정

### 설치

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

#### 설정

커스텀 Cloud Storage 레이블을 태그로 수집하려면 클라우드 에셋 인벤토리 권한을 활성화합니다.

### 로그 수집

Google Cloud Storage 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection)하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Storage 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud Storage 로그를 필터링하세요.
1. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.storage.api.lro_count** <br>(count) | 마지막 샘플 이후 완료된 장기 실행 작업의 수.|
| **gcp.storage.api.request_count** <br>(count) | API 호출 횟수.<br>_request로 표시_ |
| **gcp.storage.authn.authentication_count** <br>(count) | HMAC/RSA 서명된 요청 수.<br>_request로 표시_ |
| **gcp.storage.authz.acl_based_object_access_count** <br>(count) | 객체 ACL에 의해서만 객체 접근이 허용된 요청의 수.<br>_request로 표시_ |
| **gcp.storage.authz.acl_operations_count** <br>(count) | ACL 작업 사용량.<br>_operation으로 표시_ |
| **gcp.storage.authz.object_specific_acl_mutation_count** <br>(count) | 객체별 ACL에 대한 변경 횟수.|
| **gcp.storage.autoclass.transition_operation_count** <br>(count) | Autoclass가 시작한 스토리지 클래스 전환 작업의 총 횟수.|
| **gcp.storage.autoclass.transitioned_bytes_count** <br>(count) | Autoclass가 전환한 총 바이트 수.<br>_byte로 표시_ |
| **gcp.storage.client.grpc.client.attempt.duration.avg** <br>(gauge) | 하위 채널 선택 시간을 포함하여 RPC 시도를 완료하는 데 걸린 누적 시간의 평균.<br>_second로 표시_ |
| **gcp.storage.client.grpc.client.attempt.duration.samplecount** <br>(gauge) | 하위 채널 선택 시간을 포함하여 RPC 시도를 완료하는 데 걸린 누적 시간의 샘플 수.<br>_second로 표시_ |
| **gcp.storage.client.grpc.client.attempt.duration.sumsqdev** <br>(gauge) | 하위 채널 선택 시간을 포함하여 RPC 시도를 완료하는 데 걸린 누적 시간의 제곱 편차합.<br>_second로 표시_ |
| **gcp.storage.client.grpc.client.attempt.rcvd_total_compressed_message_size.avg** <br>(count) | RPC 시도당 모든 응답 메시지(메타데이터 제외)에서 수신된 평균 누적 바이트(압축되었으나 암호화되지 않음). gRPC 또는 전송 프레이밍 바이트는 포함되지 않습니다.<br>_byte로 표시_ |
| **gcp.storage.client.grpc.client.attempt.rcvd_total_compressed_message_size.samplecount** <br>(count) | RPC 시도당 모든 응답 메시지(메타데이터 제외)에서 수신된 누적 바이트(압축되었으나 암호화되지 않음)의 샘플 수. gRPC 또는 전송 프레이밍 바이트는 포함되지 않습니다.<br>_byte로 표시_ |
| **gcp.storage.client.grpc.client.attempt.rcvd_total_compressed_message_size.sumsqdev** <br>(count) | RPC 시도당 모든 응답 메시지(메타데이터 제외)에서 수신된 누적 바이트(압축되었으나 암호화되지 않음)의 제곱 편차합. gRPC 또는 전송 프레이밍 바이트는 포함되지 않습니다.<br>_byte로 표시_ |
| **gcp.storage.client.grpc.client.attempt.sent_total_compressed_message_size.avg** <br>(count) | RPC 시도당 모든 요청 메시지(메타데이터 제외)에서 전송된 평균 누적 바이트(압축되었으나 암호화되지 않음). gRPC 또는 전송 프레이밍 바이트는 포함되지 않습니다.<br>_byte로 표시_ |
| **gcp.storage.client.grpc.client.attempt.sent_total_compressed_message_size.samplecount** <br>(count) | RPC 시도당 모든 요청 메시지(메타데이터 제외)에서 전송된 누적 바이트(압축되었으나 암호화되지 않음)의 샘플 수. gRPC 또는 전송 프레이밍 바이트는 포함되지 않습니다.<br>_byte로 표시_ |
| **gcp.storage.client.grpc.client.attempt.sent_total_compressed_message_size.sumsqdev** <br>(count) | RPC 시도당 모든 요청 메시지(메타데이터 제외)에서 전송된 누적 바이트(압축되었으나 암호화되지 않음)의 제곱 편차합. gRPC 또는 전송 프레이밍 바이트는 포함되지 않습니다.<br>_byte로 표시_ |
| **gcp.storage.client.grpc.client.attempt.started** <br>(count) | 시작된 RPC 시도의 누적 횟수(완료되지 않은 시도 포함).|
| **gcp.storage.client.grpc.client.call.duration.avg** <br>(gauge) | 애플리케이션 관점에서 gRPC 라이브러리가 RPC를 완료하는 데 걸리는 누적 시간의 평균.<br>_second로 표시_ |
| **gcp.storage.client.grpc.client.call.duration.samplecount** <br>(gauge) | 애플리케이션 관점에서 gRPC 라이브러리가 RPC를 완료하는 데 걸리는 누적 시간의 샘플 수.<br>_second로 표시_ |
| **gcp.storage.client.grpc.client.call.duration.sumsqdev** <br>(gauge) | 애플리케이션 관점에서 gRPC 라이브러리가 RPC를 완료하는 데 걸리는 누적 시간의 제곱 편차합.<br>_second로 표시_ |
| **gcp.storage.client.grpc.lb.rls.cache_entries** <br>(gauge) | RLS 캐시의 엔트리 수.<br>_entry로 표시_ |
| **gcp.storage.client.grpc.lb.rls.cache_size** <br>(gauge) | RLS 캐시의 현재 크기.<br>_byte로 표시_ |
| **gcp.storage.client.grpc.lb.rls.default_target_picks** <br>(count) | 기본 타겟으로 전송된 LB 선택의 누적 횟수.|
| **gcp.storage.client.grpc.lb.rls.failed_picks** <br>(count) | RLS 요청이 실패했거나 RLS 채널이 스로틀링되어 실패한 LB 선택의 누적 횟수.|
| **gcp.storage.client.grpc.lb.rls.target_picks** <br>(count) | 각 RLS 타겟으로 전송된 LB 선택의 누적 횟수. 기본 타겟도 RLS 서버에서 반환되는 경우, 캐시에서 해당 타겟으로 전송된 RPC는 `grpc.rls.default_target_picks`가 아니라 이 메트릭에 포함된다는 점에 유의하세요.|
| **gcp.storage.client.grpc.lb.wrr.endpoint_weight_not_yet_usable** <br>(count) | 각 스케줄러 업데이트에서 아직 사용 가능한 가중치 정보가 없는 엔드포인트의 누적 수(로드 리포트가 아직 수신되지 않았거나 블랙아웃 기간인 경우).|
| **gcp.storage.client.grpc.lb.wrr.endpoint_weight_stale** <br>(count) | 각 스케줄러 업데이트에서 최신 가중치가 만료 기간을 초과한 엔드포인트의 누적 수.|
| **gcp.storage.client.grpc.lb.wrr.endpoint_weights.avg** <br>(count) | 누적 버킷 카운트의 평균. 히스토그램 버킷은 엔드포인트 가중치 범위가 됩니다. 각 버킷은 가중치가 해당 범위 내에 있는 엔드포인트마다 한 번씩 증가하는 카운터입니다. 가중치를 사용할 수 없는 엔드포인트의 가중치는 0으로 처리됨에 유의하세요.|
| **gcp.storage.client.grpc.lb.wrr.endpoint_weights.samplecount** <br>(count) | 누적 버킷 카운트의 샘플 수. 히스토그램 버킷은 엔드포인트 가중치 범위가 됩니다. 각 버킷은 가중치가 해당 범위 내에 있는 엔드포인트마다 한 번씩 증가하는 카운터입니다. 가중치를 사용할 수 없는 엔드포인트의 가중치는 0으로 처리됨에 유의하세요.|
| **gcp.storage.client.grpc.lb.wrr.endpoint_weights.sumsqdev** <br>(count) | 누적 버킷 카운트의 제곱 편차합. 히스토그램 버킷은 엔드포인트 가중치 범위가 됩니다. 각 버킷은 가중치가 해당 범위 내에 있는 엔드포인트마다 한 번씩 증가하는 카운터입니다. 가중치를 사용할 수 없는 엔드포인트의 가중치는 0으로 처리됨에 유의하세요.|
| **gcp.storage.client.grpc.lb.wrr.rr_fallback** <br>(count) | 유효한 가중치가 있는 엔드포인트가 충분하지 않아 WRR 정책 RR 방식으로 대체된 스케줄러 업데이트의 누적 횟수.|
| **gcp.storage.client.grpc.xds_client.connected** <br>(gauge) | 현재 xDS 클라이언트가 xDS 서버와 정상 연결된 ADS 스트림을 보유하고 있는지 여부를 나타냅니다. 특정 서버의 경우 스트림이 처음 생성될 때 해당 값은 1로 설정됩니다. 연결 장애가 발생하거나 ADS 스트림이 응답 메시지가 표시되지 않고 실패하면 A57에 따라 0으로 설정됩니다. 0으로 설정된 이후 ADS 스트림에서 첫 번째 응답을 받으면 1로 재설정됩니다.|
| **gcp.storage.client.grpc.xds_client.resource_updates_invalid** <br>(count) | 유효하지 않은 것으로 간주된 수신 리소스의 누적 개수.<br>_resource로 표시_ |
| **gcp.storage.client.grpc.xds_client.resource_updates_valid** <br>(count) | 유효하지 않은 것으로 간주된 수신 리소스의 누적 개수. 변경되지 않은 리소스도 포함되어 카운터가 증가합니다.<br>_resource로 표시_ |
| **gcp.storage.client.grpc.xds_client.resources** <br>(gauge) | xDS 리소스의 수.<br>_resource로 표시_ |
| **gcp.storage.client.grpc.xds_client.server_failure** <br>(count) | 정상에서 비정상 상태로 전환된 xDS 서버의 누적 개수. 서버는 연결 장애가 발생하거나 응답 메시지가 표시되지 않고 ADS 스트림이 실패하는 경우, gRFC A57에 따라 비정상 상태 서버로 전환됩니다.|
| **gcp.storage.network.received_bytes_count** <br>(count) | 네트워크를 통해 수신된 바이트 수.<br>_byte로 표시_ |
| **gcp.storage.network.sent_bytes_count** <br>(count) | 네트워크를 통해 전송된 바이트 수.<br>_byte로 표시_ |
| **gcp.storage.quota.dualregion_google_egress_bandwidth.limit** <br>(gauge) | 할당량 메트릭 `storage.googleapis.com/dualregion_google_egress_bandwidth`의 현재 한도.<br>_bit로 표시_ |
| **gcp.storage.quota.dualregion_google_egress_bandwidth.usage** <br>(count) | 할당량 메트릭 `storage.googleapis.com/dualregion_google_egress_bandwidth`의 현재 사용량.<br>_bit로 표시_ |
| **gcp.storage.quota.dualregion_internet_egress_bandwidth.limit** <br>(gauge) | 할당량 메트릭 `storage.googleapis.com/dualregion_internet_egress_bandwidth`의 현재 한도.<br>_bit로 표시_ |
| **gcp.storage.quota.dualregion_internet_egress_bandwidth.usage** <br>(count) | 할당량 메트릭 `storage.googleapis.com/dualregion_internet_egress_bandwidth`의 현재 사용량.<br>_bit로 표시_ |
| **gcp.storage.replication.meeting_rpo** <br>(gauge) | 객체가 RPO를 충족하는지 여부를 나타내는 부울 값. ASYNC_TURBO의 경우 RPO는 15분, DEFAULT의 경우 RPO는 12시간입니다.|
| **gcp.storage.replication.missing_rpo_minutes_last_30d** <br>(gauge) | 최근 30일 동안 측정된, Recovery Point Objective(RPO)를 충족하지 못한 총 시간(분). 이 메트릭은 `storage.googleapis.com/replication/time_since_metrics_updated`까지 지연됩니다.|
| **gcp.storage.replication.object_replications_last_30d** <br>(gauge) | 최근 30일 동안 측정된 객체 복제의 총 개수. 각 복제가 Recovery Point Objective(RPO)를 충족했는지 여부에 따라 메트릭을 세분화할 수 있습니다. 이 메트릭은 `storage.googleapis.com/replication/time_since_metrics_updated`까지 지연됩니다.|
| **gcp.storage.replication.time_since_metrics_updated** <br>(gauge) | `storage.googleapis.com/replication/*` 메트릭을 마지막으로 계산한 이후 경과한 시간(초).<br>_second로 표시_ |
| **gcp.storage.replication.turbo_max_delay** <br>(gauge) | 지연의 경우 아직 복제되지 않고 가장 오래된 객체의 경과 시간을 초 단위로 표시합니다. 해당 시점 이전에 업로드된 객체는 복제 완료된 상태입니다.<br>_second로 표시_ |
| **gcp.storage.replication.v2.object_replications_last_30d** <br>(gauge) | 최근 30일 동안 측정된 객체 복제의 총 개수. 각 복제가 설계 목표를 충족했는지 여부에 따라 메트릭을 세분화할 수 있습니다. 이 메트릭은 `storage.googleapis.com/replication/v2/time_since_metrics_updated`까지 지연됩니다.|
| **gcp.storage.replication.v2.time_since_metrics_updated** <br>(gauge) | `storage.googleapis.com/replication/missing_rpo_minutes_last_30d` 및 `/replication/v2/object_replications_last_30d` 메트릭을 마지막으로 계산한 이후 경과한 시간(초).<br>_second로 표시_ |
| **gcp.storage.storage.object_count** <br>(gauge) | 버킷당 객체 총 개수.<br>_object로 표시됨_ |
| **gcp.storage.storage.total_byte_seconds** <br>(gauge) | 하루에 사용된 총 저장 용량(바이트*초).<br>_second로 표시_ |
| **gcp.storage.storage.total_bytes** <br>(gauge) | 버킷의 모든 객체의 총 크기.<br>_byte로 표시_ |
| **gcp.storage.storage.v2.deleted_bytes** <br>(count) | 스토리지 클래스별로 그룹화된, 버킷당 삭제된 바이트의 증분. 이 값은 하루에 한 번 측정되어 보고되며, 측정 후 Datadog에서 값을 확인할 수 있을 때까지 지연이 있을 수 있습니다. 삭제가 발생하지 않은 날에는 이 메트릭에 대한 데이터 포인트를 내보내지 않습니다.<br>_byte로 표시_ |
| **gcp.storage.storage.v2.total_byte_seconds** <br>(gauge) | 버킷이 사용한 일일 총 스토리지(바이트\*초)로, 스토리지 클래스 및 유형별로 그룹화됩니다. 유형에는 live-object, noncurrent-object, soft-deleted-object, multipart-upload가 포함될 수 있습니다. 이 값은 하루에 한 번 측정되며, 측정 후 Datadog에서 값을 확인할 수 있을 때까지 지연이 있을 수 있습니다. 값을 확인할 수 있게 되면 하루 동안 각 샘플링 간격마다 해당 값이 반복됩니다.|
| **gcp.storage.storage.v2.total_bytes** <br>(gauge) | 버킷 내 모든 객체 및 멀티파트 업로드의 총 크기로, 스토리지 클래스 및 유형별로 그룹화됩니다. 유형에는 live-object, noncurrent-object, soft-deleted-object, multipart-upload가 포함될 수 있습니다. 이 값은 하루에 한 번 측정되며, 측정 후 Datadog에서 값을 확인할 수 있을 때까지 지연이 있을 수 있습니다. 값을 확인할 수 있게 되면 하루 동안 각 샘플링 간격마다 해당 값이 반복됩니다.<br>_byte로 표시_ |
| **gcp.storage.storage.v2.total_count** <br>(gauge) | 버킷당 객체 및 멀티파트 업로드의 총 개수로, 스토리지 클래스 및 유형별로 그룹화됩니다. 유형에는 live-object, noncurrent-object, soft-deleted-object, multipart-upload가 포함될 수 있습니다. 이 값은 하루에 한 번 측정되며, 측정 후 Datadog에서 값을 확인할 수 있을 때까지 지연이 있을 수 있습니다. 값을 확인할 수 있게 되면 하루 동안 각 샘플링 간격마다 해당 값이 반복됩니다.|

### 이벤트

Google Cloud Storage 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Storage 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.