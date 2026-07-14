---
aliases:
- /ko/integrations/google_cloud_anthos
app_id: google-cloud-anthos
categories:
- cloud
- orchestration
- google cloud
- log collection
custom_kind: integration
description: 최신 애플리케이션을 대규모로 구축하고 실행하세요.
media: []
title: Google Cloud Anthos
---
## 개요

Google Cloud Anthos는 Google Cloud 기반 컨트롤 플레인을 갖춘 온프레미스, 엣지 및 여러 퍼블릭 클라우드의 인프라와 애플리케이션을 위한 개발 플랫폼입니다.

Datadog Google Cloud Platform 통합을 사용하여 Google Cloud Anthos에서 메트릭을 수집하세요.

## 설정

### 메트릭 수집

#### 설치

아직 하지 않았다면, 먼저 [Google Cloud 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 로그 수집

Google Cloud Anthos 로그는 Google Cloud Logging을 사용하여 수집되며 Cloud Pub/Sub 주제를 통해 Dataflow 작업으로 전송됩니다. 아직 시작하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 로깅 설정](https://cloud.google.com/architecture/partners/monitoring-anthos-with-datadog#collecting_logs_with_stackdriver_logging)을 참조하세요.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.anthos.apiserver_admission_controller_admission_duration_seconds** <br>(count) | 이름별로 식별되고 각 작업과 API 리소스 및 유형(유효성 검사 또는 어드미션)에 대해 구분된 초 단위의 어드미션 컨트롤러 지연 시간(초) 히스토그램. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_admission_controller_admission_latencies_milliseconds** <br>(count) | (사용 중단됨) 이름별로 식별되고 각 작업과 API 리소스 및 유형(유효성 검사 또는 어드미션)별로 구분된 밀리초 단위의 어드미션 컨트롤러 지연 시간 히스토그램. 60초마다 샘플링됩니다.<br>_millisecond로 표시됨_ |
| **gcp.anthos.apiserver_admission_controller_admission_latencies_seconds** <br>(count) | 이름별로 식별되고 각 작업과 API 리소스 및 유형(유효성 검사 또는 어드미션)별로 구분된 어드미션 컨트롤러 지연 시간 히스토그램. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_admission_gke_webhook_manifest_error** <br>(gauge) | 매니페스트를 기반으로 웹훅을 로드하는 동안 오류가 발생했는지 여부. 60초마다 샘플링됩니다.|
| **gcp.anthos.apiserver_admission_gke_webhook_metadata** <br>(gauge) | 어드미션 웹훅에 대한 메타데이터. 60초마다 샘플링됩니다.|
| **gcp.anthos.apiserver_admission_step_admission_duration_seconds** <br>(count) | 어드미션 하위 단계 지연 시간 히스토그램(초 단위)을, 각 작업과 API 리소스 및 단계 유형(유효성 검사 또는 어드미션)별로 구분됨. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_admission_step_admission_duration_seconds_summary** <br>(gauge) | 어드미션 하위 단계 지연 시간 요약(초 단위). 각 작업 및 API 리소스와 단계 유형(유효성 검사 또는 어드미션)별로 세분화하여 표시합니다. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_admission_step_admission_duration_seconds_summary_count** <br>(count) | 어드미션 하위 단계 지연 시간 요약(초 단위)입니다. 각 작업 및 API 리소스와 단계 유형(유효성 검사 또는 어드미션)별로 세분화하여 표시합니다. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_admission_step_admission_duration_seconds_summary_sum** <br>(count) | 어드미션 하위 단계 지연 시간 요약(초 단위)입니다. 각 작업 및 API 리소스와 단계 유형(유효성 검사 또는 어드미션)별로 세분화하여 표시합니다. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_admission_step_admission_latencies_milliseconds** <br>(count) | (사용 중단됨) 어드미션 하위 단계 지연 시간 히스토그램(밀리초 단위)으로, 각 작업과 API 리소스 및 단계 유형(유효성 검사 또는 어드미션)별로 구분하여 표시합니다. 60초마다 샘플링됩니다.<br>_millisecond로 표시됨_ |
| **gcp.anthos.apiserver_admission_step_admission_latencies_milliseconds_summary** <br>(gauge) | (사용 중단됨) 어드미션 하위 단계 지연 시간 요약(밀리초 단위)으로, 각 작업 및 API 리소스와 단계 유형(유효성 검사 또는 어드미션)별로 구분하여 표시합니다. 60초마다 샘플링됩니다.<br>_millisecond로 표시됨_ |
| **gcp.anthos.apiserver_admission_step_admission_latencies_milliseconds_summary_count** <br>(count) | (사용 중단됨) 어드미션 하위 단계 지연 시간 요약(밀리초 단위)을 각 작업 및 API 리소스와 단계 유형(유효성 검사 또는 어드미션)별로 구분하여 표시합니다. 60초마다 샘플링됩니다.<br>_millisecond로 표시됨_ |
| **gcp.anthos.apiserver_admission_step_admission_latencies_milliseconds_summary_sum** <br>(count) | (사용 중단됨) 어드미션 하위 단계 지연 시간 요약(밀리초 단위)으로, 각 작업 및 API 리소스와 단계 유형(유효성 검사 또는 어드미션)별로 구분하여 표시합니다. 60초마다 샘플링됩니다.<br>_millisecond로 표시됨_ |
| **gcp.anthos.apiserver_admission_step_admission_latencies_seconds** <br>(count) | 어드미션 하위 단계 지연 시간 히스토그램으로, 각 작업과 API 리소스 및 단계 유형(유효성 검사 또는 어드미션)별로 세분화되어 있습니다. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_admission_step_admission_latencies_seconds_summary** <br>(gauge) | 어드미션 하위 단계 지연 시간 요약으로, 각 작업과 API 리소스 및 단계 유형(유효성 검사 또는 어드미션)별로 세분화되어 있습니다. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_admission_step_admission_latencies_seconds_summary_count** <br>(count) | 어드미션 하위 단계 지연 시간 요약으로, 각 작업과 API 리소스 및 단계 유형(유효성 검사 또는 어드미션)별로 세분화되어 있습니다. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_admission_step_admission_latencies_seconds_summary_sum** <br>(count) | 어드미션 하위 단계 지연 시간 요약으로, 각 작업과 API 리소스 및 단계 유형(유효성 검사 또는 어드미션)별로 세분화되어 있습니다. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_admission_webhook_admission_duration_seconds** <br>(count) | 초 단위의 어드미션 웹훅 지연 시간 히스토그램으로, 이름별로 식별되고 각 작업과 API 리소스 및 유형(유효성 검사 또는 어드미션)으로 구분됩니다. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_admission_webhook_rejection_count** <br>(count) | 어드미션 웹훅의 거부 횟수. 이름으로 식별되며 각 어드미션 유형 및 작업으로 분류됩니다. 추가 레이블은 오류 유형(오류가 발생한 경우 calling_webhook_error 또는 apiserver_internal_error if, 그 외 경우 no_error)을 지정합니다. 웹훅이 HTTP 상태 코드와 함께 요청을 거부하는 경우 0이 아닌 거부 코드를 선택적으로 지정할 수 있습니다. 600자보다 긴 코드는 600자로 잘립니다.|
| **gcp.anthos.apiserver_aggregated_request_total** <br>(count) | 각 verb, scope 및 HTTP response code별로 구분된 apiserver 요청의 델타 개수. 60초마다 샘플링됩니다. 샘플링 후에는 최대 180초 동안 데이터가 표시되지 않습니다.|
| **gcp.anthos.apiserver_audit_error_total** <br>(count) | 제대로 감사되지 못한 감사 이벤트 카운터. 플러그인은 오류에 영향을 받은 플러그인을 식별합니다. 60초마다 샘플링됩니다.<br>_error로 표시됨_ |
| **gcp.anthos.apiserver_audit_event_total** <br>(count) | 감사 백엔드로 생성되어 전송된 감사 이벤트 카운터. 60초마다 샘플링됩니다.<br>_event로 표시됨_ |
| **gcp.anthos.apiserver_audit_level_total** <br>(count) | 감사 이벤트 정책 수준 카운터(요청당 1개). 60초마다 샘플링됩니다.|
| **gcp.anthos.apiserver_audit_requests_rejected_total** <br>(count) | 감사 로깅 백엔드에서 오류로 인해 거부된 apiserver 요청 카운터. 60초마다 샘플링됩니다.|
| **gcp.anthos.apiserver_crd_webhook_conversion_duration_seconds** <br>(count) | CRD 웹훅 전환 기간(초). 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_current_inflight_requests** <br>(gauge) | 지난 1초 동안 요청 종류별로 이 apiserver가 현재 사용한 동시 요청 제한 값의 최대 수. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.apiserver_current_inqueue_requests** <br>(gauge) | 지난 1초 동안 요청 종류별로 이 apiserver에 대기 중인 최대 요청 수. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.apiserver_egress_dialer_dial_duration_seconds** <br>(count) | 프로토콜(http-connect 또는 grpc), 전송(tcp 또는 uds)에 따라 레이블이 지정된 초 단위의 다이얼 대기 시간 히스토그램. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_egress_dialer_dial_failure_count** <br>(count) | 프로토콜(http-connect 또는 grpc), 전송(tcp 또는 uds) 및 단계(연결 또는 프록시)로 레이블이 지정된 다이얼 실패 횟수. 단계의 경우 어느 단계에서 다이얼이 실패했는지를 나타냅니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.apiserver_envelope_encryption_dek_cache_fill_percent** <br>(gauge) | 현재 캐시된 DEK에 해당하는 캐시 슬롯의 백분율. 60초마다 샘플링됩니다.|
| **gcp.anthos.apiserver_flowcontrol_current_executing_requests** <br>(gauge) | 현재 API 우선순위 및 공정성 시스템에서 실행 중인 요청 수. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.apiserver_flowcontrol_current_inqueue_requests** <br>(gauge) | 현재 API 우선순위 및 공정성 시스템의 대기열에 대기 중인 요청 수. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.apiserver_flowcontrol_dispatched_requests_total** <br>(count) | 서비스를 위해 API 우선순위 및 공정성 시스템에서 릴리스된 요청 수. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.apiserver_flowcontrol_priority_level_request_count_samples** <br>(count) | 요청 횟수에 대한 주기적 관찰. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.apiserver_flowcontrol_priority_level_request_count_watermarks** <br>(count) | 요청 횟수 워터마크. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.apiserver_flowcontrol_read_vs_write_request_count_samples** <br>(count) | 요청 횟수에 대한 주기적 관찰입니다. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.apiserver_flowcontrol_read_vs_write_request_count_watermarks** <br>(count) | 요청 횟수에 대한 워터마크입니다. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.apiserver_flowcontrol_request_concurrency_limit** <br>(gauge) | API 우선순위 및 공정성 시스템에서 공유된 동시 처리 제한 값. 60초마다 샘플링됩니다.|
| **gcp.anthos.apiserver_flowcontrol_request_execution_seconds** <br>(count) | API 우선순위 및 공정성 시스템서의 요청 실행 기간. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_flowcontrol_request_queue_length_after_enqueue** <br>(count) | API 우선순위 및 공정성 시스템에서 각 요청이 대기열에 추가된 후 대기열에 남아 있는 기간. 60초마다 샘플링됩니다.|
| **gcp.anthos.apiserver_flowcontrol_request_wait_duration_seconds** <br>(count) | 요청이 대기열에서 대기한 시간. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_init_events_total** <br>(count) | 리소스 유형별로 watchcache에서 처리된 초기 이벤트 카운터. 60초마다 샘플링됩니다.|
| **gcp.anthos.apiserver_kube_aggregator_x509_missing_san_total** <br>(count) | 서비스 인증서에 SAN 확장이 누락된 서버의 요청 수, 또는 SAN 확장 누락으로 인해 발생한 x509 인증서 연결 실패 횟수를 집계(런타임 환경에 따라 다름). 60초 주기로 샘플링됩니다.|
| **gcp.anthos.apiserver_longrunning_gauge** <br>(gauge) | verb, group, version, resource, scope 및 component별로 분류된 모든 활성 장기 실행 apiserver요청의 게이지. 모든 요청이 이러한 방법으로 추적되지는 않습니다. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.apiserver_registered_watchers** <br>(gauge) | 특정 리소스에 현재 등록된 watcher 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.apiserver_request_aborts_total** <br>(count) | 각 group, version, verb, resource, subresource 및 scope에 시간 초과로 인해 apiserver가 중단한 요청의 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.apiserver_request_count** <br>(count) | (사용 중단됨) 각 verb, group, version, resource, scope, component, client. HTTP response contentType 및 code별로 구분된 apiserver 요청 카운터. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.apiserver_request_duration_seconds** <br>(count) | \[STABLE\] 각 verb, dry run value, group, version, resource, subresource, scope 및 component에 대한 초 단위 응답 지연 시간 분포. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_request_filter_duration_seconds** <br>(count) | 각 필터 유형에 초 단위의 요청 필터 지연 시간 분포. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_request_latencies** <br>(count) | (사용 중단됨) 각  verb, group, version, resource, subresource, scope 및 component의 마이크로초 단위의 응답 지연 시간 분포. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.apiserver_request_latencies_summary** <br>(gauge) | (사용 중단됨) 각 verb, group, version, resource, subresource, scope 및 component의 응답 대기 시간 요약(마이크로초 단위). 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.apiserver_request_latencies_summary_count** <br>(count) | (사용 중단됨) 각 verb, group, version, resource, subresource, scope 및 component에 대한 응답 대기 시간 요약(마이크로초 단위). 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.apiserver_request_latencies_summary_sum** <br>(count) | (사용 중단됨) 각 verb, group, version, resource, subresource, scope 및 component에 대한 응답 대기 시간 요약(마이크로초 단위). 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.apiserver_request_terminations_total** <br>(count) | apiserver가 자기 방어로 종료한 요청 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.apiserver_request_total** <br>(count) | \[STABLE\] 각 verb, dry run value, group, version, resource, scope, component 및 HTTP response code별로 세분화된 apiserver 요청 카운터. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.apiserver_requested_deprecated_apis** <br>(gauge) | 요청된 사용 중단 API 게이지. API group, version, resource, subresource 및 removed_release별로 세분화되며, 60초마다 샘플링됩니다.|
| **gcp.anthos.apiserver_response_sizes** <br>(count) | 각 group, version, verb, resource, subresource, scope 및 component별 바이트 단위 응답 크기 분포를 나타냅니다. 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.apiserver_selfrequest_total** <br>(count) | 각 verb, API resource 및 subresource별로 세분화된 apiserver 자기 요청 카운터. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.apiserver_storage_data_key_generation_duration_seconds** <br>(count) | 데이터 암호화 키(DEK) 생성 작업의 지연 시간(초). 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_storage_data_key_generation_failures_total** <br>(count) | 실패한 데이터 암호화 키(DEK) 생성 작업의 총 개수. 60초마다 샘플링됩니다.<br>_operation으로 표시됨_ |
| **gcp.anthos.apiserver_storage_data_key_generation_latencies_microseconds** <br>(count) | (사용 중단됨) 데이터 암호화 키(DEK) 생성 작업의 마이크로초 단위 지연 시간. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.apiserver_storage_envelope_transformation_cache_misses_total** <br>(count) | 키 암호 해독 키(KEK)에 액세스하는 동안 캐시가 누락된 총 횟수. 60초마다 샘플링됩니다.|
| **gcp.anthos.apiserver_storage_objects** <br>(gauge) | \[STABLE\] 마지막 점검 시점에 저장되어 있는 객체 수를 유형별로 구분하여 나타낸 값. 60초마다 샘플링됩니다.<br>_object로 표시됨_ |
| **gcp.anthos.apiserver_storage_transformation_duration_seconds** <br>(count) | 값 변환 작업의 지연 시간(초). 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_storage_transformation_operations_total** <br>(count) | 총 변환 횟수. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.apiserver_terminated_watchers_total** <br>(count) | 리소스 유형별로 세분화된 미응답에 따른 watcher 종료 카운터. 60초마다 샘플링됩니다.|
| **gcp.anthos.apiserver_tls_handshake_errors_total** <br>(count) | 'TLS handshake error from' 오류로 중단된 요청 수. 60초마다 샘플링됩니다.<br>_error로 표시됨_ |
| **gcp.anthos.apiserver_watch_events_sizes** <br>(count) | 바이트 단위의 이벤트 크기를 확인합니다. 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.apiserver_watch_events_total** <br>(count) | watch 클라이언트에서 전송된 이벤트 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.apiserver_webhooks_x509_missing_san_total** <br>(count) | 서비스 인증서에 SAN 확장이 누락된 서버에 대한 요청 수, 또는 x509 인증서의 SAN 확장 누락으로 인해 발생한 연결 실패 횟수를 집계합니다(런타임 환경에 따라 둘 중 하나에 해당). 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.container.cpu.limit_cores** <br>(gauge) | 컨테이너 CPU 코어 한계값. 60초마다 샘플링됩니다.<br>_core로 표시됨_ |
| **gcp.anthos.container.cpu.request_cores** <br>(gauge) | 컨테이너에서 요청된 CPU 코어 수. 60초마다 샘플링됩니다.<br>_core로 표시됨_ |
| **gcp.anthos.container.ephemeral_storage.limit_bytes** <br>(gauge) | 로컬 임시 저장소의 바이트 단위 한계값. 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.container.ephemeral_storage.request_bytes** <br>(gauge) | 로컬 임시 저장소 요청(바이트 단위). 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.container.ephemeral_storage.used_bytes** <br>(gauge) | 로컬 임시 저장소 사용량(바이트 단위). 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.container.memory.limit_bytes** <br>(gauge) | 컨테이너의 메모리 한계값(바이트 단위). 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.container.memory.request_bytes** <br>(gauge) | 컨테이너의 메모리 요청량(바이트 단위). 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.container.memory.used_bytes** <br>(gauge) | 메모리 사용량(바이트). 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.coredns_cache_hits_total** <br>(count) | 캐시 히트 횟수. 60초마다 샘플링됩니다.<br>_hit로 표시됨_ |
| **gcp.anthos.coredns_cache_misses_total** <br>(count) | 캐시 미스 횟수. 60초마다 샘플링됩니다.<br>_miss로 표시됨_ |
| **gcp.anthos.coredns_dns_do_requests_total** <br>(count) | 영역당 DO 비트가 설정된 DNS 요청 카운터. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.coredns_dns_request_duration_seconds** <br>(count) | 각 요청에 걸린 시간(초)의 히스토그램. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.coredns_dns_request_size_bytes** <br>(count) | EDNS0 UDP 버퍼의 바이트 단위 크기(TCP의 경우 64K). 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.coredns_dns_requests_total** <br>(count) | 영역, 프로토콜 및 패밀리에 대한 DNS 요청 카운터. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.coredns_dns_response_size_bytes** <br>(count) | 반환된 응답의 바이트 단위 크기. 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.coredns_dns_responses_total** <br>(count) | 응답 상태 코드 카운터. 60초마다 샘플링됩니다.<br>_response로 표시됨_ |
| **gcp.anthos.go_goroutines** <br>(gauge) | 현재 존재하는 goroutine의 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.go_threads** <br>(gauge) | 생성된 OS 스레드 수. 60초마다 샘플링됩니다.<br>_thread로 표시됨_ |
| **gcp.anthos.kube_apiserver_pod_logs_pods_logs_backend_tls_failure_total** <br>(count) | kubelet 서버 TLS 검증으로 인해 실패한 포드/로그의 총 요청 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_apiserver_pod_logs_pods_logs_insecure_backend_total** <br>(count) | 사용 유형(enforce_tls, skip_tls_allowed, skip_tls_denied)별로 슬라이스된 포드/로그의 총 요청 수. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.kube_auto_repair_reason_total** <br>(count) | 조건별 복구 트리거 횟수 카운터. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_auto_repair_trigger_latencies_seconds** <br>(count) | 임계값 장애 횟수를 위반한 머신의 복구 트리거 지연 시간 히스토그램. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_certificatesigningrequest_cert_length** <br>(gauge) | 발급된 인증서의 길이. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_certificatesigningrequest_condition** <br>(gauge) | 각 certificatesigningrequest 조건의 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_certificatesigningrequest_created** <br>(gauge) | Unix 생성 타임스탬프. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_certificatesigningrequest_labels** <br>(gauge) | Kubernetes 레이블을 Prometheus 레이블로 변환합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_configmap_created** <br>(gauge) | Unix 생성 타임스탬프. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_configmap_info** <br>(gauge) | configmap의 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_configmap_metadata_resource_version** <br>(gauge) | 특정 버전의 configmap을 나타내는 리소스 버전. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_daemonset_created** <br>(gauge) | Unix 생성 타임스탬프입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_daemonset_labels** <br>(gauge) | Kubernetes 레이블을 Prometheus 레이블로 변환합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_daemonset_metadata_generation** <br>(gauge) | 원하는 상태의 특정 세대를 나타내는 시퀀스 번호. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_daemonset_status_current_number_scheduled** <br>(gauge) | 데몬 포드를 하나 이상 실행 중이거나 실행해야 하는 노드 수. 60초마다 샘플링됩니다.<br>_node로 표시됨_ |
| **gcp.anthos.kube_daemonset_status_desired_number_scheduled** <br>(gauge) | 데몬 포드를 실행해야 하는 노드 수. 60초마다 샘플링됩니다.<br>_node로 표시됨_ |
| **gcp.anthos.kube_daemonset_status_number_available** <br>(gauge) | 데몬 포드를 실행해야 하는 노드 수로, 실행 중이고 사용 가능한 데몬 포드 하나 이상을 포함해야 합니다. 60초마다 샘플링됩니다.<br>_node로 표시됨_ |
| **gcp.anthos.kube_daemonset_status_number_misscheduled** <br>(gauge) | 데몬 포드를 실행하고 있지만 실행하지 않아야 하는 노드 수. 60초마다 샘플링됩니다.<br>_node로 표시됨_ |
| **gcp.anthos.kube_daemonset_status_number_ready** <br>(gauge) | 데몬 포드가 실행 중이어야 하는 노드 수로, 실행 중이고 준비된 하나 이상의 데몬 포드를 포함해야 합니다. 60초마다 샘플링됩니다.<br>_node로 표시됨_ |
| **gcp.anthos.kube_daemonset_status_number_unavailable** <br>(gauge) | 데몬 포드를 실행해야 하는 노드 수로, 실행 중이거나 사용 가능한 데몬 포드가 없어야 합니다. 60초마다 샘플링됩니다.<br>_node로 표시됨_ |
| **gcp.anthos.kube_daemonset_updated_number_scheduled** <br>(gauge) | 업데이트된 데몬 포드를 실행하는 노드의 수. 60초마다 샘플링됩니다.<br>_node로 표시됨_ |
| **gcp.anthos.kube_deployment_created** <br>(gauge) | Unix 생성 타임스탬프입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_deployment_labels** <br>(gauge) | Kubernetes 레이블을 Prometheus 레이블로 변환합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_deployment_metadata_generation** <br>(gauge) | 원하는 상태의 특정 세대를 나타내는 시퀀스 번호입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_deployment_spec_paused** <br>(gauge) | 배포가 정지되어 배포 컨트롤러에서 처리되지 않는지를 나타냅니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_deployment_spec_replicas** <br>(gauge) | 배포에 요구되는 포드 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_deployment_spec_strategy_rollingupdate_max_surge** <br>(gauge) | 배포 롤링 업데이트 중에 필요한 복제본 수 이상으로 스케줄링할 수 있는 최대 복제본 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_deployment_spec_strategy_rollingupdate_max_unavailable** <br>(gauge) | 배포 롤링 업데이트 중에 사용할 수 없는 복제본 최대 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_deployment_status_condition** <br>(gauge) | 배포의 현재 상태 조건. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_deployment_status_observed_generation** <br>(gauge) | 배포 컨트롤러에서 관찰한 생성값. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_deployment_status_replicas** <br>(gauge) | 배포당 복제본 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_deployment_status_replicas_available** <br>(gauge) | 배포당 사용 가능한 복제본 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_deployment_status_replicas_unavailable** <br>(gauge) | 배포당 사용할 수 없는 복제본 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_deployment_status_replicas_updated** <br>(gauge) | 배포당 업데이트할 수 없는 복제본 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_endpoint_address_available** <br>(gauge) | 엔드포인트에서 사용할 수 있는 주소 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_endpoint_address_not_ready** <br>(gauge) | 엔드포인트에서 준비되지 않은 주소 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_endpoint_created** <br>(gauge) | Unix 생성 타임스탬프입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_endpoint_info** <br>(gauge) | 엔드포인트에 관한 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_endpoint_labels** <br>(gauge) | Kubernetes 레이블을 Prometheus 레이블로 변환합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_hpa_labels** <br>(gauge) | Kubernetes 레이블을 Prometheus 레이블로 변환합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_hpa_metadata_generation** <br>(gauge) | HorizontalPodAutoscaler 컨트롤러에서 관찰한 생성 값. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_hpa_spec_max_replicas** <br>(gauge) | 오토스케일러에서 설정할 수 있는 포드 수의 상한값으로 MinReplicas보다 적게 설정할 수 없습니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_hpa_spec_min_replicas** <br>(gauge) | 오토스케일러에서 설정할 수 있는 포드 수의 하한값으로, 기본값은 1입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_hpa_spec_target_metric** <br>(gauge) | 원하는 복제본 수를 계산할 때 이 오토스케일러에서 사용하는 메트릭 사양. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_hpa_status_condition** <br>(gauge) | 이 오토스케일러의 조건. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_hpa_status_current_replicas** <br>(gauge) | 이 오토스케일러에서 관리하는 파트의 현재 복제본 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_hpa_status_desired_replicas** <br>(gauge) | 이 오토스케일러에서 관리하는 포드에 대해 원하는 복제본 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_job_complete** <br>(gauge) | 작업이 실행을 완료함. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_job_created** <br>(gauge) | Unix 생성 타임스탬프입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_job_info** <br>(gauge) | 작업에 관한 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_job_labels** <br>(gauge) | Kubernetes 레이블을 Prometheus 레이블로 변환합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_job_owner** <br>(gauge) | 작업 소유자에 관한 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_job_spec_completions** <br>(gauge) | 해당 작업이 완료되어야 하는 성공적인 포드의 목표 개수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_job_spec_parallelism** <br>(gauge) | 해당 작업이 동시에 실행될 수 있는 포드의 최대 목표 개수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_job_status_active** <br>(gauge) | 활성 실행 중인 포드의 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_job_status_completion_time** <br>(gauge) | CompletionTime은 작업이 완료된 시간을 나타냅니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_job_status_failed** <br>(gauge) | Phase Failed에 도달한 포드의 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_job_status_start_time** <br>(gauge) | StartTime은 Job Manager에서 작업이 확인된 시간을 나타냅니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_job_status_succeeded** <br>(gauge) | Phase Succeeded에 도달한 포드의 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_limitrange** <br>(gauge) | 제한 값 범위에 관한 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_limitrange_created** <br>(gauge) | Unix 생성 타임스탬프입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_machine_annotations** <br>(gauge) | Machine의 주석 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_machine_spec_provider_info** <br>(gauge) | Machine ProviderSpec 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_machine_status_noderef** <br>(gauge) | Machine의 노드 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_machinedeployment_spec_replicas** <br>(gauge) | MachineDeployment Spec의 복제본 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_machinedeployment_spec_template_annotations** <br>(gauge) | MachineDeployment Spec Template 주석 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_mutatingwebhookconfiguration_created** <br>(gauge) | Unix 생성 타임스탬프입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_mutatingwebhookconfiguration_info** <br>(gauge) | MutatingWebhookConfiguration에 관한 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_mutatingwebhookconfiguration_metadata_resource_version** <br>(gauge) | MutatingWebhookConfiguration 특정 버전을 대표하는 리소스. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_namespace_annotations** <br>(gauge) | Prometheus 레이블로 변환된 Kubernetes 주석. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_namespace_created** <br>(gauge) | Unix 생성 타임스탬프입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_namespace_labels** <br>(gauge) | Kubernetes 레이블을 Prometheus 레이블로 변환합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_namespace_status_phase** <br>(gauge) | kubernetes 네임스페이스 상대 단계. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_networkpolicy_created** <br>(gauge) | 네트워크 정책에 관한 Unix 생성 타임스탬프. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_networkpolicy_labels** <br>(gauge) | Kubernetes 레이블을 Prometheus 레이블로 변환합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_networkpolicy_spec_egress_rules** <br>(gauge) | NetworkPolicy의 egress 규칙 개수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_networkpolicy_spec_ingress_rules** <br>(gauge) | networkpolicy의 ingress 규칙 개수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_node_created** <br>(gauge) | Unix 생성 타임스탬프입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_node_info** <br>(gauge) | 클러스터 노드에 관한 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_node_labels** <br>(gauge) | Kubernetes 레이블을 Prometheus 레이블로 변환합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_node_role** <br>(gauge) | 클러스터 노드의 역할. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_node_spec_taint** <br>(gauge) | 클러스터 노드의 테인트. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_node_spec_unschedulable** <br>(gauge) | 노드가 새로운 포드를 스케줄링할 수 있는지 여부. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_node_status_allocatable** <br>(gauge) | 스케줄링에 사용할 수 있는 노드의 각 리소스별 allocatable 값. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_node_status_allocatable_cpu_cores** <br>(gauge) | 스케줄링에 사용 가능한 노드의 CPU 리소스. 60초마다 샘플링됩니다.<br>_core로 표시됨_ |
| **gcp.anthos.kube_node_status_allocatable_memory_bytes** <br>(gauge) | 스케줄링에 사용 가능한 로드의 메모리 리소스. 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.kube_node_status_allocatable_pods** <br>(gauge) | 스케줄링에 사용 가능한 노드의 포드 리소스. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_node_status_capacity** <br>(gauge) | 노드의 각기 다른 리소스의 용량. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_node_status_capacity_cpu_cores** <br>(gauge) | 노드의 총 CPI 리소스. 60초마다 샘플링됩니다.<br>_core로 표시됨_ |
| **gcp.anthos.kube_node_status_capacity_memory_bytes** <br>(gauge) | 노드의 총 메모리 리소스. 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.kube_node_status_capacity_pods** <br>(gauge) | 노드의 총 포드 리소스. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_node_status_condition** <br>(gauge) | 클러스터 노드의 조건. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_onpremadmincluster_spec_info** <br>(gauge) | OnPremAdminCluster Spec 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_onpremusercluster_spec_info** <br>(gauge) | OnPremUserCluster Spec 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_onpremusercluster_status_condition_lasttransitiontime** <br>(gauge) | onpremusercluster가 해당 조건으로 전환된 시점을 나타내는 Unix 타임스탬프. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_persistentvolume_capacity_bytes** <br>(gauge) | Persistentvolume 용량으로 바이트 단위. 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.kube_persistentvolume_info** <br>(gauge) | persistentvolume에 관한 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_persistentvolume_labels** <br>(gauge) | Kubernetes 레이블을 Prometheus 레이블로 변환합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_persistentvolume_status_phase** <br>(gauge) | 볼륨이 사용 가능 상태인지, 클레임에 바인딩됨 상태인지, 또는 클레임에 의해 해제된 상태인지 여부를 나타냅니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_persistentvolumeclaim_access_mode** <br>(gauge) | Persistent Volume Claim에 의해 지정된 액세스 모드. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_persistentvolumeclaim_info** <br>(gauge) | Persistent Volume Claim에 관한 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_persistentvolumeclaim_labels** <br>(gauge) | Kubernetes 레이블을 Prometheus 레이블로 변환합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_persistentvolumeclaim_resource_requests_storage_bytes** <br>(gauge) | Persistent Volume Claim에서 요청한 저장 용량. 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.kube_persistentvolumeclaim_status_phase** <br>(gauge) | Persistent Volume Claim의 현재 단계. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_completion_time** <br>(gauge) | 포드의 Unix 타밍스탬프의 완료 시간. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_container_info** <br>(gauge) | 포드에 있는 컨테이너 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_container_resource_limits** <br>(gauge) | 컨테이너가  요청한 리소스 제한 값의 수치. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_container_resource_limits_cpu_cores** <br>(gauge) | 컨테이너가 사용할 CPU 코어의 제한 값. 60초마다 샘플링됩니다.<br>_core로 표시됨_ |
| **gcp.anthos.kube_pod_container_resource_limits_memory_bytes** <br>(gauge) | 컨테이너가 사용할 메모리 용량 제한 값(바이트 단위). 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.kube_pod_container_resource_requests** <br>(gauge) | 컨테이너에서 요청한 request 리소스 수. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.kube_pod_container_resource_requests_cpu_cores** <br>(gauge) | 컨테이너에 요청된 CPU 코어 수. 60초마다 샘플링됩니다.<br>_core로 표시됨_ |
| **gcp.anthos.kube_pod_container_resource_requests_memory_bytes** <br>(gauge) | 컨테이너가 요청한 메모리 바이트 수. 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.kube_pod_container_status_last_terminated_reason** <br>(gauge) | 컨테이너가 종료 상태에 있었던 마지막 이유를 설명합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_container_status_ready** <br>(gauge) | 컨테이너의 readiness 확인이 성공했는지를 나타냅니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_container_status_restarts_total** <br>(count) | 컨테이너당 컨테이너 재시작 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_container_status_running** <br>(gauge) | 컨테이너가 현재 실행 중 상태인지 설명합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_container_status_terminated** <br>(gauge) | 컨테이너가 현재 종료됨 상태에 있는지 설명합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_container_status_terminated_reason** <br>(gauge) | 컨테이너가 종료됨 상태에 있는 이유를 설명합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_container_status_waiting** <br>(gauge) | 컨테이너가 현재 대기 중 상태에 있는지 설명합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_container_status_waiting_reason** <br>(gauge) | 컨테이너가 현재 대기 중 상태에 있는 이유를 설명합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_created** <br>(gauge) | Unix 생성 타임스탬프입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_info** <br>(gauge) | 포드에 관한 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_init_container_info** <br>(gauge) | 포드에 있는 Init 컨테이너에 관한 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_init_container_status_last_terminated_reason** <br>(gauge) | init 컨테이너가 종료됨 상태에 있었던 마지막 이유를 설명합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_init_container_status_ready** <br>(gauge) | init 컨테이너 readiness 확인에 성공했는지를 설명합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_init_container_status_restarts_total** <br>(count) | init 컨테이너에 관한 재시작 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_init_container_status_running** <br>(gauge) | init 컨테이너가 현재 실행 중 상태에 있는지를 설명합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_init_container_status_terminated** <br>(gauge) | init 컨테이너가 현재 종료됨 상태에 있는지를 설명합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_init_container_status_terminated_reason** <br>(gauge) | init 컨테이너가 현재 종료됨 상태에 있는 이유를 설명합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_init_container_status_waiting** <br>(gauge) | init 컨테이너가 현재 대기 중 상태에 있는 이유를 설명합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_init_container_status_waiting_reason** <br>(gauge) | init 컨테이너가 현재 대기 중 상태에 있는 이유를 설명합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_labels** <br>(gauge) | Kubernetes 레이블을 Prometheus 레이블로 변환합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_owner** <br>(gauge) | Information about the Pod's owner. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_restart_policy** <br>(gauge) | 이 포드에서 사용 중인 재시작 정책을 설명합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_spec_volumes_persistentvolumeclaims_info** <br>(gauge) | 포드에 있는 persistentvolumeclaim 볼륨에 관한 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_spec_volumes_persistentvolumeclaims_readonly** <br>(gauge) | persistentvolumeclaim이 읽기 전용으로 마운트되었는지 설명합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_start_time** <br>(gauge) | 포드에 관한 Unix 타임스탬프 시작 시간. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_status_phase** <br>(gauge) | 포드의 현재 단계. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_status_ready** <br>(gauge) | 포드가 요청을 지원할 준비가 되었는지 설명합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_status_scheduled** <br>(gauge) | 포드에 관한 스케줄링 프로세스 상태를 설명합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_pod_status_scheduled_time** <br>(gauge) | 포드가 스케줄링된 상태로 이동한 시점의 Unix 타임스탬프. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_poddisruptionbudget_created** <br>(gauge) | Unix 생성 타임스탬프입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_poddisruptionbudget_status_current_healthy** <br>(gauge) | 현재 정상 상태인 포드 개수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_poddisruptionbudget_status_desired_healthy** <br>(gauge) | 정상 상태인 포드에 관한 최소 목표 개수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_poddisruptionbudget_status_expected_pods** <br>(gauge) | 이 중단 예산에서 계산된 포드의 총 개수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_poddisruptionbudget_status_observed_generation** <br>(gauge) | 이 PDB 상태를 업데이트할 때 관찰된 가장 최근 생성 값. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_poddisruptionbudget_status_pod_disruptions_allowed** <br>(gauge) | 현재 허용된 포드 중단 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_replicaset_created** <br>(gauge) | Unix 생성 타임스탬프입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_replicaset_labels** <br>(gauge) | Kubernetes 레이블을 Prometheus 레이블로 변환합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_replicaset_metadata_generation** <br>(gauge) | 원하는 상태의 특정 세대를 나타내는 시퀀스 번호입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_replicaset_owner** <br>(gauge) | ReplicaSet 소유자에 관한 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_replicaset_spec_replicas** <br>(gauge) | ReplicaSet의 목표 포드 개수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_replicaset_status_fully_labeled_replicas** <br>(gauge) | ReplicaSet당 완전히 레이블된 복제본의 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_replicaset_status_observed_generation** <br>(gauge) | ReplicaSet 컨트롤러에서 관찰된 생성 값. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_replicaset_status_ready_replicas** <br>(gauge) | ReplicaSet당 준비된 복제본의 개수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_replicaset_status_replicas** <br>(gauge) | ReplicaSet당 복제본의 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_resourcequota** <br>(gauge) | 리소스 할당량에 관한 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_resourcequota_created** <br>(gauge) | Unix 생성 타임스탬프입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_secret_created** <br>(gauge) | Unix 생성 타임스탬프입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_secret_info** <br>(gauge) | 기밀에 관한 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_secret_labels** <br>(gauge) | Kubernetes 레이블을 Prometheus 레이블로 변환합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_secret_metadata_resource_version** <br>(gauge) | 특정 버전의 기밀을 나타내는 리소스 버전. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_secret_type** <br>(gauge) | 기밀 유형. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_service_created** <br>(gauge) | Unix 생성 타임스탬프입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_service_info** <br>(gauge) | 서비스 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_service_labels** <br>(gauge) | Kubernetes 레이블을 Prometheus 레이블로 변환합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_service_spec_type** <br>(gauge) | 서비스 유형. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_service_status_load_balancer_ingress** <br>(gauge) | 서비스 로드 밸런서의 ingress 상태. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_stackdriver_spec_info** <br>(gauge) | Stackdriver Spec 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_statefulset_created** <br>(gauge) | Unix 생성 타임스탬프입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_statefulset_labels** <br>(gauge) | Kubernetes 레이블을 Prometheus 레이블로 변환합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_statefulset_metadata_generation** <br>(gauge) | StatefulSet의 목표 상태의 특정 생성 값을 나타내는 시퀀스 번호. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_statefulset_replicas** <br>(gauge) | StatefulSet의 목표 포드 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_statefulset_status_current_revision** <br>(gauge) | \[0,currentReplicas) 시퀀스의 포드를 생성하는 데 사용된 StatefulSet의 버전. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_statefulset_status_observed_generation** <br>(gauge) | StatefulSet 컨트롤러에서 관찰한 생성 값. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_statefulset_status_replicas** <br>(gauge) | StatefulSet당 복제본 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_statefulset_status_replicas_current** <br>(gauge) | StatefulSet당 현재 복제본의 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_statefulset_status_replicas_ready** <br>(gauge) | StatefulSet당 준비된 복제본의 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_statefulset_status_replicas_updated** <br>(gauge) | StatefulSet당 업데이트된 복제본의 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_statefulset_status_update_revision** <br>(gauge) | \[replicas-updatedReplicas,replicas) 시퀀스의 포드를 생성하는 데 사용된 StatefulSet의 버전. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_storageclass_created** <br>(gauge) | Unix 생성 타임스탬프입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_storageclass_info** <br>(gauge) | storageclass에 관한 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_storageclass_labels** <br>(gauge) | Kubernetes 레이블을 Prometheus 레이블로 변환합니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_validatingwebhookconfiguration_created** <br>(gauge) | Unix 생성 타임스탬프입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_validatingwebhookconfiguration_info** <br>(gauge) | ValidatingWebhookConfiguration에 관한 정보. 60초마다 샘플링됩니다.|
| **gcp.anthos.kube_validatingwebhookconfiguration_metadata_resource_version** <br>(gauge) | ValidatingWebhookConfiguration 특정 버전을 나타내는 리소스 버전. 60초마다 샘플링됩니다.|
| **gcp.anthos.kubedns_dnsmasq_errors** <br>(count) | 메트릭을 가져오다 발생한 오류 개수. 60초마다 샘플링됩니다.<br>_error로 표시됨_ |
| **gcp.anthos.kubedns_dnsmasq_evictions** <br>(count) | (프로세스 시작부터) DNS 캐시 제거 카운터. 60초마다 샘플링됩니다.|
| **gcp.anthos.kubedns_dnsmasq_hits** <br>(count) | (프로세스 시작부터) DNS 캐시 히트 횟수. 60초마다 샘플링됩니다.<br>_hit로 표시됨_ |
| **gcp.anthos.kubedns_dnsmasq_insertions** <br>(count) | (프로세스 시작부터) DNS 캐시 삽입 카운터. 60초마다 샘플링됩니다.|
| **gcp.anthos.kubedns_dnsmasq_max_size** <br>(count) | DNS 캐시 최대 크기. 60초마다 샘플링됩니다.|
| **gcp.anthos.kubedns_dnsmasq_misses** <br>(count) | (프로세스 시작부터) DNS 캐시 미스의 개수. 60초마다 샘플링됩니다.<br>_miss로 표시됨_ |
| **gcp.anthos.kubedns_probe_dnsmasq_errors** <br>(count) | dnsmasq에서 발생한 이름 해석 오류의 개수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kubedns_probe_dnsmasq_latency_ms** <br>(count) | dnsmasq DNS 프로브 요청의 지연 시간. 60초마다 샘플링됩니다.|
| **gcp.anthos.kubedns_probe_kubedns_errors** <br>(count) | kubedns 이름 해석 오류 개수. 60초마다 샘플링됩니다.<br>_error로 표시됨_ |
| **gcp.anthos.kubedns_probe_kubedns_latency_ms** <br>(count) | DNS 프로브 요청 kubedns의 지연 시간. 60초마다 샘플링됩니다.<br>_millisecond로 표시됨_ |
| **gcp.anthos.kubelet_certificate_manager_client_expiration_renew_errors** <br>(count) | 인증서 갱신 오류 카운터. 60초마다 샘플링됩니다.<br>_error로 표시됨_ |
| **gcp.anthos.kubelet_certificate_manager_client_expiration_seconds** <br>(gauge) | 인증서의 유효 기간을 나타내는 게이지로 값은 1970년 1월 1일(UTC) 기준으로 계산된 인증서 만료 시점의 초 단위 시간. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.kubelet_certificate_manager_client_ttl_seconds** <br>(gauge) | Kubelet 클라이언트 인증서의 TTL(time-to-live)을 나타내는 게이지(gauge). 값은 인증서 만료까지 남은 시간을 초 단위로 표시하며, 이미 만료된 경우 음수 값으로 표시됩니다. 클라이언트 인증서가 유효하지 않거나 사용되지 않는 경우, 값은 +INF로 표시됩니다. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.kubelet_certificate_manager_server_expiration_seconds** <br>(gauge) | 인증서의 유효 기간을 나타내는 게이지(gauge) 값은 UTC 기준 1970년 1월 1일 이후 경과한 초 단위로 표현된 인증서 만료 시간. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.kubelet_certificate_manager_server_rotation_seconds** <br>(count) | 이전 인증서가 교체되기 전까지 유지된 기간(초)의 분포를 나타내는 히스토그램. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.kubelet_certificate_manager_server_ttl_seconds** <br>(gauge) | Kubernetes Kubelet 지원 인증서 중 가장 짧은 TTL(유효 기간)을 나타내는 게이지로, 해당 값은 인증서 만료 시점까지 남은 시간(초)이며, 이미 만료된 경우 음수 값을 갖습니다. 지원 인증서가 무효이거나 사용되지 않는 경우, 값은 +INF로 표시됩니다. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.kubelet_cgroup_manager_duration_seconds** <br>(count) | 관리자 작업의 지속 시간으로 단위는 초. 메서드별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.kubelet_cgroup_manager_latency_microseconds** <br>(gauge) | (사용 중단됨) cgroup 관리자 작업의 지연 시간으로 단위는 마이크로초. 메서드별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_cgroup_manager_latency_microseconds_count** <br>(count) | (사용 중단됨) cgroup 관리자 작업의 지연 시간으로 단위는 마이크로초. 메서드별로 세분화됩니다. 60초마다 샘플링됩니다. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_cgroup_manager_latency_microseconds_sum** <br>(count) | (사용 중단됨) cgroup 관리자 작업의 지연 시간으로 단위는 마이크로초. 메서드별로 세분화됩니다. 60초마다 샘플링됩니다. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_container_log_filesystem_used_bytes** <br>(gauge) | filesystem에 있는 컨테이너 로그에서 사용된 바이트. 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.kubelet_containers_per_pod_count** <br>(count) | 포드당 컨테이너의 수. 60초마다 샘플링됩니다.<br>_container로 표시됨_ |
| **gcp.anthos.kubelet_containers_per_pod_count_count** <br>(count) | 포드당 컨테이너의 수. 60초마다 샘플링됩니다.<br>_container로 표시됨_ |
| **gcp.anthos.kubelet_containers_per_pod_count_sum** <br>(count) | 포드당 컨테이너의 수. 60초마다 샘플링됩니다.<br>_container로 표시됨_ |
| **gcp.anthos.kubelet_docker_operations** <br>(count) | (사용 중단됨) 작업 유형별 Docker 작업의 누적 개수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kubelet_docker_operations_duration_seconds** <br>(count) | Docker 작업의 지연 시간으로, 단위는 초. 작업 유형별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.kubelet_docker_operations_errors** <br>(count) | (사용 중단됨) 작업 유형별 Docker 작업 오류의 누적 개수. 60초마다 샘플링됩니다.<br>_error로 표시됨_ |
| **gcp.anthos.kubelet_docker_operations_errors_total** <br>(count) | 작업 유형별 Docker 작업 오류의 누적 개수. 60초마다 샘플링됩니다.<br>_error로 표시됨_ |
| **gcp.anthos.kubelet_docker_operations_latency_microseconds** <br>(gauge) | (사용 중단됨) Latency in microseconds of Docker operations. 작업 유형별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_Shown as microsecond_ |
| **gcp.anthos.kubelet_docker_operations_latency_microseconds_count** <br>(count) | (사용 중단됨) Docker 작업 시간로 단위는 마이크로초. 작업 유형별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_Shown as microsecond_ |
| **gcp.anthos.kubelet_docker_operations_latency_microseconds_sum** <br>(count) | (사용 중단됨) Docker 작업 시간로 단위는 마이크로초. 작업 유형별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_docker_operations_timeout** <br>(count) | (사용 중단됨) 작업 유형별 Docker 작업 시간 초과 누적 개수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kubelet_docker_operations_timeout_total** <br>(count) | 작업 유형별 Docker 작업 시간 초과 누적 개수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kubelet_docker_operations_total** <br>(count) | 작업 유형별 Docker 작업의 누적 개수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kubelet_http_inflight_requests** <br>(gauge) | 처리 중인 HTTP 요청 수. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.kubelet_http_requests_duration_seconds** <br>(count) | HTTP 요청 지원 소요 시간, 단위는 초. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.kubelet_http_requests_total** <br>(count) | HTTP 서버 시작 이후 요청이 수신된 개수. 60초마다 샘플링됩니다.<br>_request로 표시됨_ |
| **gcp.anthos.kubelet_network_plugin_operations_duration_seconds** <br>(count) | 네트워크 플러그인 작업의 지연 시간, 단위는 초. 작업 유형별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.kubelet_network_plugin_operations_latency_microseconds** <br>(gauge) | (사용 중단됨) 네트워크 플러그인 작업의 지연 시간, 단위는 마이크로초. 작업 유형별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_network_plugin_operations_latency_microseconds_count** <br>(count) | (사용 중단됨) 네트워크 플러그인 작업의 지연 시간, 단위는 마이크로초. 작업 유형별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_network_plugin_operations_latency_microseconds_sum** <br>(count) | (사용 중단됨) 네트워크 플러그인 작업의 지연 시간, 단위는 마이크로초. 작업 유형별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_node_config_error** <br>(gauge) | 노드에서 구성 관련 오류가 발생한 경우 true (1), 그렇지 않은 경우 false (0)를 나타내는 메트릭. 60초마다 샘플링됩니다.|
| **gcp.anthos.kubelet_node_name** <br>(gauge) | 노드 이름. 개수는 항상 1입니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.kubelet_pleg_discard_events** <br>(count) | PLEG에서의 discard 이벤트 개수. 60초마다 샘플링됩니다.<br>_event로 표시됨_ |
| **gcp.anthos.kubelet_pleg_last_seen_seconds** <br>(gauge) | PLEG가 마지막으로 활성 상태로 확인된 시점의 타임스탬프, 단위는 초. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.kubelet_pleg_relist_duration_seconds** <br>(count) | PLEG에서 포드를 다시 재목록화하는 데 소요된 시간(초). 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.kubelet_pleg_relist_interval_microseconds** <br>(gauge) | (사용 중단됨) PLEG에서 재목록화 사이의 시간 주기로, 단위는 마이크로초. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_pleg_relist_interval_microseconds_count** <br>(count) | (사용 중단됨) PLEG에서 재목록화 사이의 시간 주기로, 단위는 마이크로초. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_pleg_relist_interval_microseconds_sum** <br>(count) | (사용 중단됨) PLEG에서 재목록화 사이의 시간 주기로, 단위는 마이크로초. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_pleg_relist_interval_seconds** <br>(count) | PLEG에서 재목록화 사이의 시간 주기로, 단위는 초. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.kubelet_pleg_relist_latency_microseconds** <br>(gauge) | (사용 중단됨) PLEG에서 포드를 재목록화하기 위한 지연 시간으로, 단위는 마이크로초. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_pleg_relist_latency_microseconds_count** <br>(count) | (사용 중단됨) PLEG에서 포드를 목록화하기 위한 지연 시간으로, 단위는 마이크로초. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_pleg_relist_latency_microseconds_sum** <br>(count) | (사용 중단됨) PLEG에서 포드를 목록화하기 위한 지연 시간으로, 단위는 마이크로초. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_pod_start_duration_seconds** <br>(count) | 단일 포드가 대기 중에서 실행 중으로 전환되는 데 소요되는 시간으로, 단위는 초. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.kubelet_pod_start_latency_microseconds** <br>(gauge) | (사용 중단됨) 단일 포드가 대기 중에서 실행 중으로 전환되는 데 소요되는 지연 시간으로, 단위는 마이크로초. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_pod_start_latency_microseconds_count** <br>(count) | (사용 중단됨) 단일 포드가 대기 중에서 실행 중으로 전환되는 데 소요되는 지연 시간으로, 단위는 마이크로초. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_pod_start_latency_microseconds_sum** <br>(count) | (사용 중단됨) 단일 포드가 대기 중에서 실행 중으로 전환되는 데 소요되는 지연 시간으로, 단위는 마이크로초. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_pod_worker_duration_seconds** <br>(count) | 단일 포드를 동기화 하는 시간(초). 작업 유형(생성, 업데이트, 또는 동기화)별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.kubelet_pod_worker_latency_microseconds** <br>(gauge) | (사용 중단됨) 단일 포드를 동기화하기 위한 지연 시간으로, 단위는 마이크로초. 작업 유형(생성, 업데이트 또는 동기화)별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_pod_worker_latency_microseconds_count** <br>(count) | (사용 중단됨) 단일 포드를 동기화하기 위한 지연 시간으로, 단위는 마이크로초. 작업 유형(생성, 업데이트 또는 동기화)별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_pod_worker_latency_microseconds_sum** <br>(count) | (사용 중단됨) 단일 포드를 동기화하기 위한 지연 시간으로, 단위는 마이크로초. 작업 유형(생성, 업데이트 또는 동기화)별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_pod_worker_start_duration_seconds** <br>(count) | 포드를 확인하고 워커를 시작하는 데 소요되는 시간으로, 단위는 초. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.kubelet_pod_worker_start_latency_microseconds** <br>(gauge) | (사용 중단됨) 포드를 확인하고 워커를 시작하는 데 소요되는 지연 시간으로, 단위는 마이크로초. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_pod_worker_start_latency_microseconds_count** <br>(count) | (사용 중단됨) 포드를 확인하고 워커를 시작하는 데 소요되는 지연 시간으로, 단위는 마이크로초. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_pod_worker_start_latency_microseconds_sum** <br>(count) | (사용 중단됨) 포드를 확인하고 워커를 시작하는 데 소요되는 지연 시간으로, 단위는 마이크로초. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_run_podsandbox_duration_seconds** <br>(count) | run_podsandbox 작업의 실행 소요 시간으로, 단위는 초. RuntimeClass.Handler 기준으로 세분화됩니다. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.kubelet_running_container_count** <br>(gauge) | 현재 실행 중이 컨테이너의 개수. 60초마다 샘플링됩니다.<br>_container로 표시됨_ |
| **gcp.anthos.kubelet_running_containers** <br>(gauge) | 현재 실행 중이 컨테이너의 개수. 60초마다 샘플링됩니다.<br>_container로 표시됨_ |
| **gcp.anthos.kubelet_running_pod_count** <br>(gauge) | 현재 실행 중인 포드 개수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kubelet_running_pods** <br>(gauge) | 현재 실행 중인 포드 개수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kubelet_runtime_operations** <br>(count) | (사용 중단됨) 작업 유형별 런타임 작업의 누적 개수. 60초마다 샘플링됩니다.<br>_operation으로 표시됨_ |
| **gcp.anthos.kubelet_runtime_operations_duration_seconds** <br>(count) | 런타임 작업의 기간으로, 단위는 초. 작업 유형별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_second로 표시됨_ |
| **gcp.anthos.kubelet_runtime_operations_errors** <br>(count) | (사용 중단됨) 작업 유형별 런타임 작업 오류의 누적 개수. 60초마다 샘플링됩니다.<br>_error로 표시됨_ |
| **gcp.anthos.kubelet_runtime_operations_errors_total** <br>(count) | 작업 유형별 런타임 작업 오류의 누적 개수. 60초마다 샘플링됩니다.<br>_error로 표시됨_ |
| **gcp.anthos.kubelet_runtime_operations_latency_microseconds** <br>(gauge) | (사용 중단됨) 런타임 작업의 지연 시간으로, 단위는 마이크로초. 작업 유형별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_runtime_operations_latency_microseconds_count** <br>(count) | (사용 중단됨) 런타임 작업의 지연 시간으로, 단위는 마이크로초. 작업 유형별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_runtime_operations_latency_microseconds_sum** <br>(count) | (사용 중단됨) 런타임 작업의 지연 시간으로, 단위는 마이크로초. 작업 유형별로 세분화됩니다. 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.kubelet_runtime_operations_total** <br>(count) | 작업 유형별 런타임 작업의 누적 개수. 60초마다 샘플링됩니다.<br>_operation으로 표시됨_ |
| **gcp.anthos.kubelet_server_expiration_renew_errors** <br>(count) | 인증서 갱신 오류 카운터. 60초마다 샘플링됩니다.<br>_error로 표시됨_ |
| **gcp.anthos.kubelet_volume_stats_available_bytes** <br>(gauge) | 볼륨에서 사용 가능한 바이트 수. 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.kubelet_volume_stats_capacity_bytes** <br>(gauge) | 볼륨 용량으로 바이트 단위. 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.kubelet_volume_stats_inodes** <br>(gauge) | 볼륨에 있는 inode의 최대 개수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kubelet_volume_stats_inodes_free** <br>(gauge) | 볼륨에서 사용 가능한 inode의 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kubelet_volume_stats_inodes_used** <br>(gauge) | 볼륨에서 사용된 inode의 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.kubelet_volume_stats_used_bytes** <br>(gauge) | 볼륨에서 사용된 바이트 수. 60초마다 샘플링됩니다.<br>_byte로 표시됨_ |
| **gcp.anthos.replicaset_adds** <br>(count) | (사용 중단됨) workqueue: replicaset에서 처리한 추가의 총 수. 60초마다 샘플링됩니다.|
| **gcp.anthos.replicaset_controller_rate_limiter_use** <br>(gauge) | replicaset_controller의 속도 제한기 포화도를 측정하는 메트릭. 60초마다 샘플링됩니다.|
| **gcp.anthos.replicaset_depth** <br>(gauge) | (사용 중단됨) workqueue: replicaset의 현재 깊이. 60초마다 샘플링됩니다.|
| **gcp.anthos.replicaset_longest_running_processor_microseconds** <br>(gauge) | (사용 중단됨) replicaset에서 가장 오래 실행 중인 프로세서의 실행 시간(마이크로초). 60초마다 샘플링됩니다.<br>_microsecond로 표시됨_ |
| **gcp.anthos.replicaset_queue_latency** <br>(gauge) | (사용 중단됨) 요청 전 항목이 workqueuereplicaset에 체류하는 시간. 60초마다 샘플링됩니다.|
| **gcp.anthos.replicaset_queue_latency_count** <br>(count) | (사용 중단됨) 요청 전 항목이 workqueuereplicaset에 체류하는 시간. 60초마다 샘플링됩니다.|
| **gcp.anthos.replicaset_queue_latency_sum** <br>(count) | (사용 중단됨) 요청 전 항목이 workqueuereplicaset에 체류하는 시간. 60초마다 샘플링됩니다.|
| **gcp.anthos.replicaset_retries** <br>(count) | (사용 중단됨) workqueue: replicaset에서 처리한 재시도 총 횟수. 60초마다 샘플링됩니다.|
| **gcp.anthos.replicaset_unfinished_work_seconds** <br>(gauge) | (사용 중단됨) replicaset이 실행했지만 work_duration으로 관찰되지 않은 작업의 총 시간(초). 값이 클수록 스레드 처리에 중단이 있음을 나타냅니다. 60초마다 샘플링됩니다.|
| **gcp.anthos.replicaset_work_duration** <br>(gauge) | (사용 중단됨) workqueuereplicaset에서 항목이 처리되는데 걸리는 시간. 60초마다 샘플링됩니다.|
| **gcp.anthos.replicaset_work_duration_count** <br>(count) | (사용 중단됨) workqueuereplicaset에서 항목이 처리되는데 걸리는 시간. 60초마다 샘플링됩니다.|
| **gcp.anthos.replicaset_work_duration_sum** <br>(count) | (사용 중단됨) workqueuereplicaset에서 항목이 처리되는데 걸리는 시간. 60초마다 샘플링됩니다.|

### 이벤트

Google Cloud Anthos 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Anthos 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}