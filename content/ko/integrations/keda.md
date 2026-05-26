---
app_id: keda
categories:
- log collection
- metrics
- kubernetes
- security
custom_kind: 통합
description: KEDA 상태 및 성능 모니터링
integration_version: 2.0.0
media: []
supported_os:
- linux
- windows
- macos
title: KEDA
---
## 개요

이 점검은 Datadog Agent를 통해 [KEDA](https://keda.sh/)를 모니터링합니다. 자세한 정보는 [KEDA 모니터링](https://keda.sh/docs/2.16/integrations/prometheus/)을 참조하세요.

## 설정

아래 지침에 따라 호스트에서 실행 중인 Agent에 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에서 해당 지침을 적용하는 방법에 관한 가이드를 참고하세요.

### 설치

Agent 7.62.0 릴리즈부터 KEDA 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함됩니다.

### 설정

KEDA는 Admissions Controller, Metrics API Server 및 Operator 등 여러 구성 요소를 포함합니다. 이러한 구성 요소 각각은 메트릭에 대해 스크래핑됩니다. Prometheus 형식의 메트릭은 각 구성 요소와 관련해 포트 8080의 /metrics에서 사용할 수 있습니다.

이러한 메트릭을 노출하려면 각 구성 요소에 대해 Prometheus 스크래핑이 활성화되어 있는지 확인합니다. 예를 들어 Helm에서 다음 Helm 구성 옵션을 활성화해야 합니다.

- prometheus.metricServer.enabled
- prometheus.operator.enabled
- prometheus.webhooks.enabled

대신, KEDA Helm 설치 동안 사용된 values.yaml 파일에서 다음 구성을 제공하여 동일한 결과를 얻을 수 있습니다.

```yaml
prometheus:
  metricServer:
    enabled: true
  operator:
    enabled: true
  webhooks:
    enabled: true
```

Agent가 메트릭 수집을 시작하려면 KEDA 컨트롤러 포드에 주석이 포함되어야 합니다. 주석에 관한 자세한 정보는 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)을 참조하세요. [sample keda.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/keda/datadog_checks/keda/data/conf.yaml.example)를 검토하여 추가 구성 옵션을 찾을 수 있습니다.

**참고**: 안내된 메트릭은 사용 가능한 경우에만 수집됩니다. 일부 메트릭은 특정 작업이 실행되는 경우에만 생성됩니다. 예를 들어 `keda.scaler.detail_errors.count` 메트릭은 스케일러에 오류가 발생한 후에만 노출됩니다.

KEDA 점검을 구성하는 데 필요한 유일한 파라미터는 다음과 같습니다.

- `openmetrics_endpoint`: 이 파라미터는 Prometheus 형식 메트릭이 노출되는 위치로 설정되어 있습니다. 기본 포트는 `8080`.  `%%host%%`는 컨테이너화된 환경에서 [호스트 자동 감지](https://docs.datadoghq.com/agent/kubernetes/integrations/)에 사용되어야 합니다.

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: | # <CONTAINER_NAME> Needs to match the container name at the bottom. 'keda-operator-metrics-apiserver' in this example.
      {
        "keda": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8080/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: <CONTAINER_NAME> # e.g. 'keda-operator-metrics-apiserver' in the Metrics API Server
# (...)
```

각 KEDA 구성 요소에서 메트릭을 수집하려면 위 포드 주석이 각 KEDA 구성 요소 포드에 적용되어야 합니다. Operator 포드의 예시 포드 주석은 다음과 같습니다.

```yaml
# Pod manifest from a basic Helm chart deployment
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: 'keda-operator'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "keda": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8080/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: keda-operator
# (...)
```

#### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

KEDA 로그는 Kubernetes를 통해 각기 다른 KEDA 포드에서 수집될 수 있습니다. 기본적으로 Datadog Agent에서 로그 수집은 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집](https://keda.sh/docs/2.16/integrations/prometheus/)을 참조하세요.

아래 매개변수 적용에 대한 지침은 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)을 참조하세요.

| 파라미터      | 값                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "keda", "service": "<SERVICE_NAME>"}`  |

### 검증

[Agent 상태 하위 명령을 실행하고](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) 점검 섹션에서 `keda`를 찾습니다. 

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **keda.aggregator_discovery_aggregation.count** <br>(count) | Discovery가 집계된 횟수.|
| **keda.apiserver_audit_event.count** <br>(count) | 생성되어 감사 백엔드로 전송된 감사 이벤트 수.|
| **keda.apiserver_audit_requests_rejected.count** <br>(count) | 감사 기록 백엔드에서 오류로 인해 거부된 AP 서버 요청의 수.<br>_request로 표시_ |
| **keda.apiserver_client_certificate_expiration_seconds.bucket** <br>(count) | upper_bound 태그로 태깅된 apiserver_client_certificate_expiration_seconds 히스토그램에서 관측된 인증서 수.|
| **keda.apiserver_client_certificate_expiration_seconds.count** <br>(count) | apiserver_client_certificate_expiration_seconds 히스토그램에서 관찰된 인증서 수.|
| **keda.apiserver_client_certificate_expiration_seconds.sum** <br>(count) | apiserver_client_certificate_expiration_seconds 히스토그램에 남아 있는 인증서 만료 시간의 합계.<br>_second로 표시_ |
| **keda.apiserver_current_inflight_requests** <br>(gauge) | 최근 1초 동안 요청 종류별로 이 API 서버의 현재 사용 중인 최대 기내 요청 한도.<br>_request로 표시_. |
| **keda.apiserver_delegated_authz_request.count** <br>(count) | 상태 코드로 구분된 HTTP 요청의 수.<br>_request로 표시_ |
| **keda.apiserver_delegated_authz_request_duration_seconds.bucket** <br>(count) | apiserver_delegated_authz_request_duration_seconds 히스토그램 관측 수. 상태 코드와 upper_bound 기간 태그로 세분화됩니다.|
| **keda.apiserver_delegated_authz_request_duration_seconds.count** <br>(count) | apiserver_delegated_authz_request_duration_seconds 히스토그램 관측 수. 상태 코드로 세분화됩니다.|
| **keda.apiserver_delegated_authz_request_duration_seconds.sum** <br>(count) | apiserver_delegated_authz_request_duration_seconds 히스토그램의 요청 기간 합계.<br>_second로 표시_ |
| **keda.apiserver_envelope_encryption_dek_cache_fill_percent** <br>(gauge) | 현재 캐시된 DEK가 점유하고 있는 캐시 슬롯의 비율.|
| **keda.apiserver_flowcontrol_read_vs_write_current_requests.bucket** <br>(count) | 각 나노초의 마지막에 실행되거나 대기 중인 요청 수(해당한도 대비 비율). upper_bound 태그로 태깅됩니다.<br>_request로 표시_ |
| **keda.apiserver_flowcontrol_read_vs_write_current_requests.count** <br>(count) | 각 나노초의 마지막에 관찰된 요청 수(해당 한도의 비율).<br>_request로 표시_ |
| **keda.apiserver_flowcontrol_read_vs_write_current_requests.sum** <br>(count) | 각 나노초의 마지막에 관찰된 모든 요청 비율의 합계.|
| **keda.apiserver_flowcontrol_seat_fair_frac** <br>(gauge) | 사용 가능한 각 우선순위 레벨에 서버 동시 처리 용량을 공정한 비율로 할당하는 값|
| **keda.apiserver_request.count** <br>(count) | 각 verb, dry run value, group, version, resource, scope, component 및 HTTP response code별 세분화된 API 서버 요청 수 .<br>_request로 표시_ |
| **keda.apiserver_request_duration_seconds.bucket** <br>(count) | upper_bound 태그로 태깅된 응답 시간을 계산하는데 사용되는 요청 수.<br>_request로 표시_ |
| **keda.apiserver_request_duration_seconds.count** <br>(count) | 응답 시간을 계산하는 데 사용된 요청 수.<br>_request로 표시_ |
| **keda.apiserver_request_duration_seconds.sum** <br>(count) | 각 verb, dry run value, group, version, resource, subresource, scope 및 component별 초 단위 응답 시간의 합계.<br>_second로 표시_ |
| **keda.apiserver_request_filter_duration_seconds.bucket** <br>(count) | upper_bound 태그로 태깅된 요청 필러 지연 시간을 계산하는 데 사용된 관측 수.|
| **keda.apiserver_request_filter_duration_seconds.count** <br>(count) | 요청 필러 지연 시간을 계산하는 데 사용한 관측 수.|
| **keda.apiserver_request_filter_duration_seconds.sum** <br>(count) | 각 필터 유형에 나노초 단위로 표시된 요청 필터 지연 시간 분포.<br>_request로 표시_ |
| **keda.apiserver_request_sli_duration_seconds.bucket** <br>(count) | upper_bound 태그로 태깅된 SLI 응답 시간을 계산하는 데 사용된 관측 수.|
| **keda.apiserver_request_sli_duration_seconds.count** <br>(count) | SLI 응답 시간을 계산하는 데 사용된 관측 수.|
| **keda.apiserver_request_sli_duration_seconds.sum** <br>(count) | 각 verb, group, version, resource, subresource, scope 및 component별 초 단위 응답 시간(웹훅 기간 및 우선순위/공정 대기열 대기 시간 제외)의 합계.<br>_second로 표시_ |
| **keda.apiserver_request_slo_duration_seconds.bucket** <br>(count) | upper_bound 태그로 태깅된 SLO 응답 시간을 계산하는 데 사용된 관측 수.|
| **keda.apiserver_request_slo_duration_seconds.count** <br>(count) | SLO 응답 시간을 계산하는 데 사용된 관측 수.|
| **keda.apiserver_request_slo_duration_seconds.sum** <br>(count) | 각 verb, group, version, resource, subresource, scope 및 component에 대해 초 단위 응답 시간(웹훅 기간 및 우선순위/공정 대기열 대기 시간 제외)의 합계.<br>_초로 표시_ |
| **keda.apiserver_response_sizes.bucket** <br>(count) | upper_bound 태그로 태깅된 응답 크기를 계산하는 데 사용된 응답 수.|
| **keda.apiserver_response_sizes.count** <br>(count) | 응답 크기를 계산하는 데 사용된 응답 개수.|
| **keda.apiserver_response_sizes.sum** <br>(count) | 각 group, version, verb, resource, subresource, scope 및 component별 바이트 단위 응답 크기 합계.<br>_byte로 표시_ |
| **keda.apiserver_storage_data_key_generation_duration_seconds.bucket** <br>(count) | upper_bound 태그로 태깅된 데이터 암호화 키(DEK) 기간을 계산하는 데 사용된 관측 수.|
| **keda.apiserver_storage_data_key_generation_duration_seconds.count** <br>(count) | 데이터 암호화 키(DEK) 기간을 계산하는 데 사용된 관측 수.|
| **keda.apiserver_storage_data_key_generation_duration_seconds.sum** <br>(count) | 데이터 암호화 키(DEK) 생성 작업에 사용되는 초 단위 시간.<br>_second로 표시_ |
| **keda.apiserver_storage_data_key_generation_failures.count** <br>(count) | 데이터 암호화 키(DEK) 생성 작업에 실패한 데이터 수.|
| **keda.apiserver_storage_envelope_transformation_cache_misses.count** <br>(count) | 키 암호 해독 키(KEK)에 액세스하는 동안 누락된 캐시 수.|
| **keda.apiserver_tls_handshake_errors.count** <br>(count) | 'TLS handshake error from' 오류로 중단된 요청 수.|
| **keda.apiserver_webhooks_x509_insecure_sha1.count** <br>(count) | 인증서 제공 시 안전하지 않는 SHA1 서명이 포함된 서버로의 요청 수 또는 안전하지 않는 SHA1 서명으로 인핸 연결 실패 수를 계산합니다(둘 중 하나, 런타임 환경 기준).|
| **keda.apiserver_webhooks_x509_missing_san.count** <br>(count) | 인증서 제공 시 SAN 확장이 누락된 서버로의 요청 개수 또는 x509 인증서 SAN 확장 누락으로 인해 발생한 연결 실패 수를 계산합니다(둘 중 하나, 런타임 환경 기준).|
| **keda.authenticated_user_requests.count** <br>(count) | 사용자 이름별로 세분화된 인증 요청 수.<br>_request로 표시_ |
| **keda.authentication_attempts.count** <br>(count) | 인증된 시도 수.|
| **keda.authentication_duration_seconds.bucket** <br>(count) | upper_bound 버킷 태그로 태깅된 인증 기간을 계산하는 데 사용된 관측 수.|
| **keda.authentication_duration_seconds.count** <br>(count) | 인증 기간을 계산하는 데 사용된 관측 수.|
| **keda.authentication_duration_seconds.sum** <br>(count) | 결과별로 세분화된 초 단위 인증 기간.<br>_second로 표시_ |
| **keda.authorization_attempts.count** <br>(count) | 결과별로 세분화된 인증 시도 수. 'allowed', 'denied', 'no-opinion' 또는 'error' 중 하나일 수 있습니다.|
| **keda.authorization_duration_seconds.bucket** <br>(count) | upper_bound 태그로 태깅된 인증 기간을 계산하는 데 사용된 이벤트 수.|
| **keda.authorization_duration_seconds.count** <br>(count) | 인증 기간을 계산하는 데 사용된 이벤트 수.|
| **keda.authorization_duration_seconds.sum** <br>(count) | 결과별로 세분화된 초 단위 인증 기간.<br>_second로 표시_ |
| **keda.build_info** <br>(gauge) | version, git commit 및 Golang 런타임 정보 등 KEDA 빌드의 정적 정보를 포함하는 정보 메트릭.|
| **keda.cardinality_enforcement_unexpected_categorizations.count** <br>(count) | 카디널리티 실행 중 예기치 않은 카테고리화 개수.|
| **keda.certwatcher.read_certificate.count** <br>(count) | 인증서 읽기의 수.|
| **keda.certwatcher.read_certificate_errors.count** <br>(count) | 인증서 읽기 오류의 수.<br>_error로 표시_ |
| **keda.controller.runtime.active_workers** <br>(gauge) | 컨트롤러별 현재 사용된 작업자의 수.|
| **keda.controller.runtime.max_concurrent_reconciles** <br>(gauge) | 컨트롤러당 최대 동시 리컨실 작업 수|
| **keda.controller.runtime.reconcile.count** <br>(count) | 컨트롤러별 리컨실리에이션 수.|
| **keda.controller.runtime.reconcile_errors.count** <br>(count) | 컨트롤러별 리컨실리에이션 오류 수.|
| **keda.controller.runtime.reconcile_panics.count** <br>(count) | 컨트롤러별 리컨실리에이션 패닉 오류의 수.|
| **keda.controller.runtime.reconcile_time.seconds.bucket** <br>(count) | upper_bound 태그별 태깅된 리컨실리에이션 시간을 계산하기 위해 관측된 이벤트 수.|
| **keda.controller.runtime.reconcile_time.seconds.count** <br>(count) | 리컨실레이션 시간을 계산하기 위해 관측된 이벤트 수.|
| **keda.controller.runtime.reconcile_time.seconds.sum** <br>(count) | 컨트롤러별 리컨실레이션당 시간.<br>_second로 표시_ |
| **keda.controller.runtime.terminal_reconcile_errors.count** <br>(count) | 컨트롤러당 터미널 리컨실레이션 오류 수.|
| **keda.controller.runtime.webhook_panics.count** <br>(count) | 웹훅 패닉의 수.|
| **keda.controller.runtime.webhook_requests.count** <br>(count) | HTTP 상태 코드별 어드미션 요청의 수.|
| **keda.controller.runtime.webhook_requests_in_flight** <br>(gauge) | 현재 처리 중인 어드미션 요청 건수.|
| **keda.disabled_metrics.count** <br>(count) | 비활성화된 메트릭의 개수.|
| **keda.field_validation_request_duration_seconds.bucket** <br>(count) | upper_bound 태그로 태깅된 필드 밸리데이션 응답 시간을 계산하기 위해 사용된 관측 수.|
| **keda.field_validation_request_duration_seconds.count** <br>(count) | 필드 밸리데이션 응답 시간을 계산하기 위해 사용된 관측 수.|
| **keda.field_validation_request_duration_seconds.sum** <br>(count) | 각 필드 검증 값의 초 단위 응답 시간.<br>_second로 표시_ |
| **keda.go.gc.duration.seconds.count** <br>(count) | KEDA 인스턴스의 가비지 수집 주기의 요약 개수.|
| **keda.go.gc.duration.seconds.quantile** <br>(gauge) | KEDA 인스턴스에서 가비지 수집 주기의 중지 기준 요약.|
| **keda.go.gc.duration.seconds.sum** <br>(count) | KEDA 인스턴스에서 가비지 수집 주기의 중지 기간 합계.|
| **keda.go.goroutines** <br>(gauge) | 현재 존재하는 고루틴 수.|
| **keda.go.info** <br>(gauge) | Go 환경에 대한 정보|
| **keda.go.memstats.alloc_bytes** <br>(gauge) | 여전히 사용 중이고 할당된 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.alloc_bytes.count** <br>(count) | 해제된 경우에도 할당된 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.buck_hash.sys_bytes** <br>(gauge) | 프로파일링 버킷 해시 테이블에서 사용되는 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.frees.count** <br>(count) | free의 개수|
| **keda.go.memstats.gc.sys_bytes** <br>(gauge) | 가비지 수집 시스템 메타데이터에 사용된 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.heap.alloc_bytes** <br>(gauge) | 할당되어 이미 사용 중인 힙 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.heap.idle_bytes** <br>(gauge) | 사용 대기 중인 힙 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.heap.inuse_bytes** <br>(gauge) | 사용 중인 힙 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.heap.objects** <br>(gauge) | 할당된 객체 수|
| **keda.go.memstats.heap.released_bytes** <br>(gauge) | OS에 릴리스된 힙 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.heap.sys_bytes** <br>(gauge) | 시스템에서 확보한 힙 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.lookups.count** <br>(count) | 포인터 조회 수.|
| **keda.go.memstats.mallocs.count** <br>(count) | mallocs의 개수.|
| **keda.go.memstats.mcache.inuse_bytes** <br>(gauge) | mcache 구조에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.mcache.sys_bytes** <br>(gauge) | 시스템에서 확보한 mcache 구조에 사용된 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.mspan.inuse_bytes** <br>(gauge) | mspan 구조에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.mspan.sys_bytes** <br>(gauge) | 시스템에서 확보한 mspan 구조에 사용한 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.next.gc_bytes** <br>(gauge) | 다음 가비지 수집이 발생한 시점의 힙 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.other.sys_bytes** <br>(gauge) | 기타 시스템 할당에 사용된 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.stack.inuse_bytes** <br>(gauge) | 스택 할당기에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.stack.sys_bytes** <br>(gauge) | 스택 할당기에 대해 시스템에서 확보한 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.sys_bytes** <br>(gauge) | 시스템에서 확보한 바이트 수.<br>_byte로 표시_ |
| **keda.go.memstats.time_since_last_gc.seconds** <br>(gauge) | 1970년 마지막 가비지 수집 이후의 초 수.<br>_second로 표시_ |
| **keda.go.threads** <br>(gauge) | 생성된 OS 스레드 수|
| **keda.hidden_metrics.count** <br>(count) | 숨겨진 메트릭 개수.|
| **keda.internal_metricsservice.grpc_client_handled.count** <br>(count) | 성공 또는 실패에 관계없이 클라이언트에서 완료한 RPC 개수.|
| **keda.internal_metricsservice.grpc_client_handling_seconds.bucket** <br>(count) | upper_bound 버킷 태그로 태깅된 응답 시간을 계산하는 데 사용한 이벤트 수.|
| **keda.internal_metricsservice.grpc_client_handling_seconds.count** <br>(count) | 응답 시간을 계산하는 데 사용한 이벤트 수.|
| **keda.internal_metricsservice.grpc_client_handling_seconds.sum** <br>(count) | 애플리케이션에서 완료할 때까지 gRPC의 응답 시간(초).|
| **keda.internal_metricsservice.grpc_client_msg_received.count** <br>(count) | 클라이언트에서 수신한 RPC 스트림 메시지 개수.|
| **keda.internal_metricsservice.grpc_client_msg_sent.count** <br>(count) | 클라이언트에서 전송한 gRPC 스트림 메시지 개수.|
| **keda.internal_metricsservice.grpc_client_started.count** <br>(count) | 클라이언트에서 시작된 RPC 개수. |
| **keda.internal_scale.loop_latency** <br>(gauge) | (Keda \<v2.16) The deviation (in seconds) between the expected execution time and the actual execution time for the scaling loop.<br>_Shown as second_ |
| **keda.internal_scale.loop_latency_seconds** <br>(gauge) | (Keda >=v2.16) 스케일링 루프의 예상 실행 시간 및 실제 실행 시간 간 편차(초).<br>_second로 표시_ |
| **keda.leader_election.master_status** <br>(gauge) | 보고 시스템이 해당 lease의 master인지 여부를 나타내는 Gauge 메트릭. 값이 0이면 backup, 1이면 master를 의미합니다. ‘name’은 lease를 식별하기 위한 문자열이며, name 기준으로 그룹화해야 합니다.|
| **keda.process.cpu.seconds.count** <br>(count) | 사용자 및 시스템 CPU 시간 개수(초 단위).|
| **keda.process.max_fds** <br>(gauge) | 열려 있는 파일 디스크립터의 최대 개수.|
| **keda.process.open_fds** <br>(gauge) | 열려 있는 파일 디스크립터 수.|
| **keda.process.resident_memory.bytes** <br>(gauge) | 상주 메모리 크기(바이트)|
| **keda.process.uptime.seconds** <br>(gauge) | 프로세스가 가동 중인 시간(초).<br>_second로 표시_ |
| **keda.process.virtual_memory.bytes** <br>(gauge) | 버추얼 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **keda.process.virtual_memory.max_bytes** <br>(gauge) | 시용 가능한 버추얼 메모리의 최대 용량(바이트)<br>_byte로 표시됨_ |
| **keda.registered_metrics.count** <br>(count) | 안정성 수준 및 사용 중단 버전별로 세분화된 등록 메트릭 개수.|
| **keda.resource_registered** <br>(gauge) | (Keda >=v2.16) 등록된 각 커스텀 리소스 유형(CRD)의 네임스페이스당 KEDA 커스텀 리소스의 개수.|
| **keda.resource_totals** <br>(gauge) | (KEDA \<v2.16) 등록된 각 사용자 지정 리소스 유형(CRD)에 대한 네임스페이스당 KEDA 사용자 지정 리소스 수.|
| **keda.rest.client.requests.count** <br>(count) | 상태 코드, 메서드 및 호스트별로 구분된 HTTP 요청 수.<br>_request로 표시_. |
| **keda.scaled_job.errors.count** <br>(count) | 스케일링된 작업 오류 개수.|
| **keda.scaler.active** <br>(gauge) | 스케일러가 활성(1)인지 아닌지(0)를 나타냅니다.|
| **keda.scaler.detail_errors.count** <br>(count) | (Keda >=v2.16) 각 스케일러에 발생한 오류 수.|
| **keda.scaler.errors.count** <br>(count) | (Keda \<v2.16) 각 스케일러에서 발생하는 오류 수|
| **keda.scaler.metrics_latency** <br>(gauge) | (Keda \<v2.16) 각 스케일러에서 현재 메트릭을 검색하는 지연 시간(초)<br>_second로 표시_. |
| **keda.scaler.metrics_latency_seconds** <br>(gauge) | (Keda >=v2.16) 각 스케일러에서 현재 메트릭을 검색하는 지연 시간(초 단위)<br>_second로 표시_ |
| **keda.scaler.metrics_value** <br>(gauge) | 대상 평균을 계산하기 위해 HPA에서 사용되는 각 스케일러 메트릭의 현재 값.|
| **keda.trigger_registered** <br>(gauge) | (Keda >=v2.16) 등록된 트리거 유형별 트리거 수.|
| **keda.trigger_totals** <br>(gauge) | (Keda \<v2.16) 등록된 트리거 유형별 트리거 개수.|
| **keda.workqueue.adds.count** <br>(count) | 작업 대기열로 처리되는 추가 개수.|
| **keda.workqueue.depth** <br>(gauge) | 작업 대기열의 현재 깊이.|
| **keda.workqueue.longest.running_processor.seconds** <br>(gauge) | 작업 대기열에서 가장 오래 실행 중인 프로세서의 실행 시간(초)<br>_second로 표시됨_ |
| **keda.workqueue.queue.duration.seconds.bucket** <br>(count) | 요청되기 전 작업 대기열에 항목이 대기하는 시간(초)의 히스토그램 버킷.|
| **keda.workqueue.queue.duration.seconds.count** <br>(count) | 작업 대기열 시간 히스토그램에 있는 이벤트의 총 개수.|
| **keda.workqueue.queue.duration.seconds.sum** <br>(count) | 작업 대기열에서 항목이 있었던 누적 시간(초 단위).<br>_second로 표시_ |
| **keda.workqueue.retries.count** <br>(count) | 작업 대기열에서 처리한 재시도 개수.|
| **keda.workqueue.unfinished_work.seconds** <br>(gauge) | 진행 중이나 아직 work_duration에 기록되지 않은 작업 시간(초). 값이 클수록 스레드가 멈춰 있음을 나타냅니다. 이 값의 증가율을 관찰하여 멈춰 있는 스레드 수를 추정할 수 있습니다.<br>_second로 표시됨_ |
| **keda.workqueue.work.duration.seconds.bucket** <br>(count) | upper_bound 버킷으로 태깅되고 작업 대기열에서 처리된 작업 항목 개수.|
| **keda.workqueue.work.duration.seconds.count** <br>(count) | 작업 대기열에서 처리된 작업 항목의 총 개수.|
| **keda.workqueue.work.duration.seconds.sum** <br>(count) | 작업 대기열에서 모든 작업 항목이 처리되는 데 소요된 누적 시간.<br>_second로 표시_ |

### 이벤트

KEDA 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

**keda.openmetrics.health**

`CRITICAL`를 반환합니다. Agent가 KEDA OpenMetrics 엔드포인트에 연결하지 못하면 `OK`를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.