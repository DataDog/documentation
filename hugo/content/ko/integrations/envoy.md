---
app_id: envoy
categories:
- cloud
- log collection
- network
- security
custom_kind: integration
description: Envoy는 오픈 소스 엣지 및 서비스 프록시입니다.
integration_version: 6.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Envoy
---
## 개요

### Metrics

이 점검은 [Envoy](https://www.envoyproxy.io)에서 분산 시스템 옵저버빌리티 메트릭을 수집합니다.

### Security

[Datadog App and API Protection](https://docs.datadoghq.com/security/application_security/?source=envoy-tile-overview)은 Envoy 프록시 인스턴스 가시성과 인라인 위협 완화 기능을 제공합니다.

이 통합을 사용하면 API 악용, 비즈니스 로직 악용, 코드 계층 위협과 같은 공격을 클라우드 인프라의 엣지에서 직접 탐지하고 차단할 수 있습니다.

주요 혜택:

- Datadog Security Signals를 사용하여 로드 밸런서에서 **인라인 위협 탐지 및 차단**
- 트레이스와 로그를 하나의 통합 뷰에서 제공하는 애플리케이션 계층 공격 **실시간 인사이트**
- OWASP API 위협, 크리덴셜 스터핑, 주입 공격 등에 대한 **엣지 보안 강화**

## 설정

### 설치(메트릭)

Envoy 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있으므로 서버에 별도로 설치할 필요가 없습니다.

#### Istio

Envoy를 [Istio](https://istio.io)의 일부로 사용하는 경우, Istio 프록시 메트릭 엔드포인트에서 메트릭을 수집하도록 Envoy 통합을 구성하세요.

```yaml
instances:
  - openmetrics_endpoint: localhost:15090/stats/prometheus
```

#### 표준

`/stats` 엔드포인트를 설정하는 방법에는 두 가지가 있습니다.

##### 보안되지 않은 통계 엔드포인트

다음은 Envoy 어드민 구성의 예입니다.

```yaml
admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8001
```

##### 보안된 통계 엔드포인트

[관리자 엔드포인트](https://www.envoyproxy.io/docs/envoy/latest/operations/admin)(Envoy가 자기 자신에게 연결됨)로 라우팅하는 리스너/가상 호스트를 생성하되, `/stats`에 대한 라우팅만 허용하고 나머지 모든 경로는 static/error 응답을 반환하도록 합니다. 이 방식을 사용하면 인증을 위한 L3 필터와의 통합도 용이해집니다.

[envoy_secured_stats_config.json](https://gist.github.com/ofek/6051508cd0dfa98fc6c13153b647c6f8) 구성 예시입니다.

```yaml
admin:
  access_log_path: /dev/null
  address:
    socket_address:
      protocol: TCP
      address: 127.0.0.1
      port_value: 8081
static_resources:
  listeners:
    - address:
        socket_address:
          protocol: TCP
          address: 0.0.0.0
          port_value: 80
      filter_chains:
        - filters:
            - name: envoy.http_connection_manager
              config:
                codec_type: AUTO
                stat_prefix: ingress_http
                route_config:
                  virtual_hosts:
                    - name: backend
                      domains:
                        - "*"
                      routes:
                        - match:
                            prefix: /stats
                          route:
                            cluster: service_stats
                http_filters:
                  - name: envoy.router
                    config:
  clusters:
    - name: service_stats
      connect_timeout: 0.250s
      type: LOGICAL_DNS
      lb_policy: ROUND_ROBIN
      hosts:
        - socket_address:
            protocol: TCP
            address: 127.0.0.1
            port_value: 8001
```

### 설정

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. Envoy 성능 데이터 수집을 시작하려면 [Agent 구성 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) 루트의 `conf.d/` 폴더에 있는 `envoy.d/conf.yaml` 파일을 편집하세요. 사용 가능한 모든 구성 옵션은 [샘플 envoy.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/data/conf.yaml.example)을 참고하세요.

   ```yaml
   init_config:

   instances:
       ## @param openmetrics_endpoint - string - required
       ## The URL exposing metrics in the OpenMetrics format.
       #
     - openmetrics_endpoint: http://localhost:8001/stats/prometheus

   ```

1. Datadog Agent가 Envoy의 [관리자 엔드포인트](https://www.envoyproxy.io/docs/envoy/latest/operations/admin)에 접근할 수 있는지 확인하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. 다음으로, 맨 아래 `logs` 줄의 주석 처리를 제거하여 `envoy.d/conf.yaml`을 편집합니다. Envoy 로그 파일의 올바른 경로로 로그 `path`를 업데이트합니다.

   ```yaml
   logs:
     - type: file
       path: /var/log/envoy.log
       source: envoy
       service: envoy
   ```

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                       |
| -------------------- | ------------------------------------------- |
| `<INTEGRATION_NAME>` | `envoy`                                     |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                               |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:80/stats/prometheus"}` |
**참고**: 현재 버전의 점검(1.26.0 이상)은 메트릭 수집을 위해 [OpenMetrics](https://docs.datadoghq.com/integrations/openmetrics/)를 사용하며, 이를 위해서는 Python 3이 필요합니다. Python 3을 사용할 수 없는 호스트이거나 이전 버전의 점검을 사용하려는 경우, 다음 [구성](https://github.com/DataDog/integrations-core/blob/7.33.x/envoy/datadog_checks/envoy/data/conf.yaml.example)을 참고하세요.

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/)을 참고하세요.

| 파라미터      | 값                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "envoy", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령을 실행하고](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) Checks 섹션에서 `envoy`를 찾습니다.

### 설치(보안 - 앱 및 API 보호)

설치 과정은 이 통합을 활성화하는 것과는 다른 접근 방식이 필요합니다.

#### Envoy

설치 지침은 [Envoy용 앱 및 API 보호 활성화](https://docs.datadoghq.com/security/application_security/setup/envoy/?source=envoy-tile-setup) 문서에서 확인할 수 있습니다.

#### Istio

설치 지침은 [Istio용 앱 및 API 보호 활성화](https://docs.datadoghq.com/security/application_security/setup/istio/?source=envoy-tile-setup) 문서에서 확인할 수 있습니다.

#### 검증

앱 및 API 보호 위협 탐지 기능을 검증하려면 알려진 공격 패턴을 Envoy 인스턴스로 전송하세요. 예를 들어, 다음 curl 스크립트를 실행하여 Security Scanner Detected 규칙을 트리거할 수 있습니다.

```sh
for ((i=1;i<=250;i++)); 
do
    # 기존 서비스 경로 대상
    curl https://your-envoy-url/existing-route -A dd-test-scanner-log;
    # 존재하지 않는 서비스 경로 대상
    curl https://your-envoy-url/non-existing-route -A dd-test-scanner-log;
done
```

Envoy용 앱 및 API 보호 기능을 활성화하고 알려진 공격 패턴을 전송한 후 몇 분 내로 Application Signals Explorer에 위협 정보가 표시됩니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **envoy.cluster.assignment_stale.count** <br>(count) | \[OpenMetrics V2\] 새 할당이 도착하기 전에 수신된 할당이 만료된 횟수|
| **envoy.cluster.assignment_timeout_received.count** <br>(count) | \[OpenMetrics V2\] 엔드포인트 리스 정보와 함께 수신된 총 할당 수<br>_occurrence로 표시_ |
| **envoy.cluster.bind_errors.count** <br>(count) | \[OpenMetrics V2\] 구성된 소스 주소에 소켓을 바인딩하는 중 발생한 총 오류 수<br>_error로 표시_ |
| **envoy.cluster.default_total_match.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.cluster.ext_authz.denied.count** <br>(count) | \[OpenMetrics V2\] 외부 인증 서비스에서 트래픽을 거부하는 총 응답 수<br>_response로 표시_ |
| **envoy.cluster.ext_authz.disabled.count** <br>(count) | \[OpenMetrics V2\] 필터가 비활성화되어 외부 인증 서비스를 호출하지 않고 허용된 총 요청 수<br>_response로 표시_ |
| **envoy.cluster.ext_authz.error.count** <br>(count) | \[OpenMetrics V2\] 외부 인증 서비스 연결 중 발생한 총 오류 수<br>_response로 표시_ |
| **envoy.cluster.ext_authz.failure_mode_allowed.count** <br>(count) | \[OpenMetrics V2\] 외부 인증 서비스에 연결하는 과정에서 오류가 발생했지만 failure_mode_allow가 false로 설정되어 있어 허용된 총 요청 수<br>_response로 표시_ |
| **envoy.cluster.ext_authz.ok.count** <br>(count) | \[OpenMetrics V2\] 외부 인증 서비스의 총 응답 수<br>_response로 표시_ |
| **envoy.cluster.external.upstream_rq.count** <br>(count) | \[OpenMetrics v2\] 총 외부 오리진 요청 수<br>_request로 표시_ |
| **envoy.cluster.external.upstream_rq_completed.count** <br>(count) | \[OpenMetrics v2\] 완료된 총 외부 오리진 요청 수<br>_request로 표시_ |
| **envoy.cluster.external.upstream_rq_xx.count** <br>(count) | \[OpenMetrics v2\] 외부 오리진 집계 HTTP 응답 코드 (예: 2xx, 3xx 등)<br>_request로 표시_ |
| **envoy.cluster.external.upstream_rq_time.bucket** <br>(count) | \[OpenMetrics V2\] 외부 요청 및 응답에 소요된 총 시간(밀리초)<br>_millisecond로 표시_ |
| **envoy.cluster.external.upstream_rq_time.count** <br>(count) | \[OpenMetrics V2\] 샘플링된 외부 요청 및 응답 시간 수|
| **envoy.cluster.external.upstream_rq_time.sum** <br>(count) | \[OpenMetrics V2\] 외부 요청 및 응답 시간 총합<br>_millisecond로 표시_ |
| **envoy.cluster.http1.dropped_headers_with_underscores.count** <br>(count) | \[OpenMetrics V2\] 이름에 밑줄이 포함된 헤더 중 삭제된 총 개수. 이 작업은 headers_with_underscores_action 설정으로 구성됩니다.|
| **envoy.cluster.http1.metadata_not_supported_error.count** <br>(count) | \[OpenMetrics V2\] HTTP/1 인코딩 중 삭제된 메타데이터 총 개수|
| **envoy.cluster.http1.requests_rejected_with_underscores_in_headers.count** <br>(count) | \[OpenMetrics V2\] 헤더 이름에 밑줄이 포함되어 거부된 총 요청 수. 이 작업은 headers_with_underscores_action 설정으로 구성됩니다.<br>_request로 표시_ |
| **envoy.cluster.http1.response_flood.count** <br>(count) | \[OpenMetrics V2\] 응답 폭주로 인해 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.http2.dropped_headers_with_underscores.count** <br>(count) | \[OpenMetrics V2\] 이름에 밑줄이 포함된 헤더 중 삭제된 총 개수. 이 동작은  headers_with_underscores_action 설정을 통해 구성됩니다.|
| **envoy.cluster.http2.header_overflow.count** <br>(count) | \[OpenMetrics V2\] 헤더 크기가 63KB를 초과하여 재설정된 연결 총 개수<br>_connection으로 표시_ |
| **envoy.cluster.http2.headers_cb_no_stream.count** <br>(count) | \[OpenMetrics V2\] 수신된 요청 재설정 총 개수<br>_request로 표시_ |
| **envoy.cluster.http2.inbound_empty_frames_flood.count** <br>(count) | \[OpenMetrics V2\] 페이로드가 비어 있고 종료 스트림 플래그가 없는 연속 수신 프레임 수 제한을 초과하여 종료된 연결 총 개수<br>_connection으로 표시_ |
| **envoy.cluster.http2.inbound_priority_frames_flood.count** <br>(count) | \[OpenMetrics V2\] PRIORITY 유형의 수신 프레임 제한을 초과하여 종료된 연결 총 개수<br>_connection으로 표시_ |
| **envoy.cluster.http2.inbound_window_update_frames_flood.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.cluster.http2.keepalive_timeout.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.cluster.http2.metadata_empty_frames.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.cluster.http2.outbound_control_flood.count** <br>(count) | \[OpenMetrics V2\] PING/SETTINGS/RST_STREAM 유형의 송신 프레임 제한을 초과하여 종료된 연결 총 개수<br>_connection으로 표시_ |
| **envoy.cluster.http2.outbound_flood.count** <br>(count) | \[OpenMetrics V2\] 모든 유형의 송신 프레임 제한을 초과하여 종료된 연결 총 개수<br>_connection으로 표시_ |
| **envoy.cluster.http2.pending_send_bytes** <br>(gauge) | \[OpenMetrics V2\] 스트림 또는 연결 창이 열릴 때까지 쓰기 대기 중인, 현재 버퍼에 저장된 바디 데이터 크기(바이트)<br>_byte로 표시_ |
| **envoy.cluster.http2.requests_rejected_with_underscores_in_headers.count** <br>(count) | \[OpenMetrics V2\] 헤더 이름에 밑줄이 포함되어 거부된 총 요청 수. 이 작업은headers_with_underscores_action 설정으로 구성할 수 있습니다.<br>_request로 표시_ |
| **envoy.cluster.http2.rx_messaging_error.count** <br>(count) | \[OpenMetrics V2\] HTTP/2 사양의 8항을 위반한 유효하지 않은 수신 프레임 총 개수<br>_error로 표시_ |
| **envoy.cluster.http2.rx_reset.count** <br>(count) | \[OpenMetrics V2\] Envoy가 수신한 재설정 스트림 프레임 총 개수<br>_message로 표시_ |
| **envoy.cluster.http2.streams_active** <br>(gauge) | \[OpenMetrics V2\] 코덱에서 관찰된 활성 스트림|
| **envoy.cluster.http2.trailers.count** <br>(count) | \[OpenMetrics V2\] 다운스트림에서 들어오는 요청 중 확인된 트레일러 총 개수|
| **envoy.cluster.http2.tx_flush_timeout.count** <br>(count) | \[OpenMetrics V2\] 스트림의 나머지 부분을 플러시하기 위해 열린 스트림 창을 기다리는 동안 발생한 스트림 유휴 타임아웃 수|
| **envoy.cluster.http2.tx_reset.count** <br>(count) | \[OpenMetrics V2\] Envoy가 전송한 재설정 스트림 프레임 총 개수|
| **envoy.cluster.internal.upstream_rq.count** <br>(count) | \[OpenMetrics V2\] 요청 시간(밀리초)<br>_millisecond로 표시_ |
| **envoy.cluster.internal.upstream_rq_completed.count** <br>(count) | \[OpenMetrics V2\] 완료된 총 업스트림 요청 수|
| **envoy.cluster.internal.upstream_rq_xx.count** <br>(count) | \[OpenMetrics V2\] HTTP 응답 코드 집계 (예: 2xx, 3xx 등)|
| **envoy.cluster.lb_healthy_panic.count** <br>(count) | \[OpenMetrics V2\] 패닉 모드에서 로드 밸런서에 의해 분산 처리된 요청 총 개수|
| **envoy.cluster.lb_local_cluster_not_ok.count** <br>(count) | \[OpenMetrics V2\] 로컬 호스트 세트가 설정되지 않았거나 로컬 클러스터가 패닉 모드입니다.|
| **envoy.cluster.lb_recalculate_zone_structures.count** <br>(count) | \[OpenMetrics V2\] 업스트림 지역 선택에 빠른 결정을 내리기 위해 지역 인식 라우팅 구조가 재생성되는 횟수|
| **envoy.cluster.lb_subsets_created.count** <br>(count) | \[OpenMetrics V2\] 생성된 서브셋 개수|
| **envoy.cluster.lb_subsets_fallback.count** <br>(count) | \[OpenMetrics V2\] 폴백 정책이 호출된 횟수|
| **envoy.cluster.lb_subsets_fallback_panic.count** <br>(count) | \[OpenMetrics V2\] 서브셋 패닉 모드가 트리거된 횟수|
| **envoy.cluster.lb_subsets_removed.count** <br>(count) | \[OpenMetrics V2\] 호스트가 없어서 제거된 서브셋 수|
| **envoy.cluster.lb_subsets_selected.count** <br>(count) | \[OpenMetrics V2\] 로드 밸런싱을 위해 서브셋이 선택된 횟수|
| **envoy.cluster.lb_zone_cluster_too_small.count** <br>(count) | \[OpenMetrics V2\] 업스트림 클러스터 크기가 작아서 존(zone) 인식 라우팅이 적용되지 않음|
| **envoy.cluster.lb_zone_no_capacity_left.count** <br>(count) | \[OpenMetrics V2\] 반올림 오류로 인해 임의의 존(zone)이 선택되어 종료된 횟수|
| **envoy.cluster.lb_zone_number_differs.count** <br>(count) | \[OpenMetrics V2\] 로컬 클러스터와 업스트림 클러스터의 존(zone) 수가 다름|
| **envoy.cluster.lb_zone_routing_all_directly.count** <br>(count) | \[OpenMetrics V2\] 모든 요청을 동일한 존(zone)으로 직접 전송 |
| **envoy.cluster.lb_zone_routing_cross_zone.count** <br>(count) | \[OpenMetrics V2\] 존 인식 라우팅 모드이지만, 존 간(Cross-Zone) 전송이 필요함|
| **envoy.cluster.lb_zone_routing_sampled.count** <br>(count) | \[OpenMetrics V2\] 일부 요청을 동일한 존(zone)으로 전송|
| **envoy.cluster.membership_change.count** <br>(count) | \[OpenMetrics V2\] 클러스터 멤버십 총 변경 횟수|
| **envoy.cluster.original_dst_host_invalid.count** <br>(count) | \[OpenMetrics V2\] 원래 대상 로드 밸런서로 전달된 유효하지 않은 호스트 총 개수|
| **envoy.cluster.outlier_detection.ejections_detected_consecutive_5xx.count** <br>(count) | \[OpenMetrics V2\] 감지된 연속 5xx 배출 횟수 (실제 적용되지 않은 경우도 포함)|
| **envoy.cluster.outlier_detection.ejections_detected_consecutive_gateway_failure.count** <br>(count) | \[OpenMetrics V2\] 감지된 연속 게이트웨이 실패 배출 횟수 (실제 적용되지 않은 경우도 포함)|
| **envoy.cluster.outlier_detection.ejections_detected_consecutive_local_origin_failure.count** <br>(count) | \[OpenMetrics V2\] 감지된 연속 로컬 오리진 실패 배출 횟수 (실제 적용되지 않은 경우도 포함)|
| **envoy.cluster.outlier_detection.ejections_detected_failure_percentage.count** <br>(count) | \[OpenMetrics V2\] 감지된 실패율 기반 배출 횟수(실제 적용되지 않은 경우도 포함)|
| **envoy.cluster.outlier_detection.ejections_detected_local_origin_success_rate.count** <br>(count) | \[OpenMetrics V2\] 감지된 로컬 오리진 성공률 기반 배출 횟수(실제 적용되지 않은 경우도 포함)|
| **envoy.cluster.outlier_detection.ejections_detected_success_rate.count** <br>(count) | \[OpenMetrics V2\] 감지된 성공률 기반 이상치 배출 횟수 (실제 적용되지 않은 경우도 포함)|
| **envoy.cluster.outlier_detection.ejections_enforced_consecutive_5xx.count** <br>(count) | \[OpenMetrics V2\] 강제 적용된 연속 5xx 오류 배출 횟수|
| **envoy.cluster.outlier_detection.ejections_enforced_consecutive_gateway_failure.count** <br>(count) | \[OpenMetrics V2\] 강제 적용된 연속 게이트웨이 오류 배출 횟수|
| **envoy.cluster.outlier_detection.ejections_enforced_consecutive_local_origin_failure.count** <br>(count) | \[OpenMetrics V2\] 강제 적용된 연속 로컬 오리진 오류 배출 횟수|
| **envoy.cluster.outlier_detection.ejections_enforced_failure_percentage.count** <br>(count) | \[OpenMetrics V2\] 강제 적용된 실패율 기반 배출 횟수|
| **envoy.cluster.outlier_detection.ejections_enforced_local_origin_success_rate.count** <br>(count) | \[OpenMetrics V2\] 강제 적용된 로컬 오리진 성공률 기반 배출 횟수|
| **envoy.cluster.outlier_detection.ejections_enforced_success_rate.count** <br>(count) | \[OpenMetrics V2\] 강제 적용된 성공률 기반 이상치 배출 횟수|
| **envoy.cluster.outlier_detection.ejections_overflow.count** <br>(count) | \[OpenMetrics V2\] 최대 배출률(%)로 인해 중단된 배출 횟수|
| **envoy.cluster.ratelimit.error.count** <br>(count) | \[OpenMetrics V2\] 속도 제한 서비스 연결 중 발생한 총 오류 수<br>_response로 표시_ |
| **envoy.cluster.ratelimit.failure_mode_allowed.count** <br>(count) | \[OpenMetrics V2\] 속도 제한 서비스에 연결 중 오류가 발생했지만 failure_mode_deny가 false로 설정되어 통과된 요청의 총 개수<br>_response로 표시_ |
| **envoy.cluster.ratelimit.ok.count** <br>(count) | \[OpenMetrics V2\] 속도 제한 서비스에서 발생한 총 제한 미달 응답 수<br>_response로 표시_ |
| **envoy.cluster.ratelimit.over_limit.count** <br>(count) | \[OpenMetrics V2\] 속도 제한 서비스에서 발생한 총 제한 초과 응답 수<br>_response로 표시_ |
| **envoy.cluster.retry_or_shadow_abandoned.count** <br>(count) | \[OpenMetrics V2\] 버퍼 제한으로 인해 섀도잉 또는 재시도 버퍼링이 취소된 총 횟수|
| **envoy.cluster.update_attempt.count** <br>(count) | \[OpenMetrics V2\] 서비스 검색을 통한 클러스터 멤버십 업데이트 시도 횟수|
| **envoy.cluster.update_empty.count** <br>(count) | \[OpenMetrics V2\] 클러스터 멤버십 업데이트가 빈 클러스터 로드 할당으로 끝나고 이전 구성으로 계속되는 총 횟수|
| **envoy.cluster.update_failure.count** <br>(count) | \[OpenMetrics V2\] 서비스 검색으로 인한 클러스터 멤버십 업데이트 실패 총 횟수|
| **envoy.cluster.update_no_rebuild.count** <br>(count) | \[OpenMetrics V2\] 클러스터 로드 밸런싱 구조를 재구축하지 않고 성공적으로 완료된 클러스터 멤버십 업데이트 총 수|
| **envoy.cluster.update_success.count** <br>(count) | \[OpenMetrics V2\] 서비스 검색을 통한 클러스터 멤버십 업데이트 성공 총 횟수|
| **envoy.cluster.upstream_cx.count** <br>(count) | \[OpenMetrics V2\] 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_close_notify.count** <br>(count) | \[OpenMetrics V2\] HTTP/1.1 연결 종료 헤더 또는 HTTP/2 또는 HTTP/3 GOAWAY 헤더를 통해 종료된 총 연결 수|
| **envoy.cluster.upstream_cx_connect_attempts_exceeded.count** <br>(count) | \[OpenMetrics V2\] 구성된 연결 시도 횟수를 초과하는 연속 연결 실패 횟수|
| **envoy.cluster.upstream_cx_connect_fail.count** <br>(count) | \[OpenMetrics V2\] 총 연결 실패 횟수|
| **envoy.cluster.upstream_cx_connect_ms.bucket** <br>(count) | \[OpenMetrics V2\] 연결 설정 소요 시간 (밀리초)<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_connect_ms.count** <br>(count) | \[OpenMetrics V2\] 연결 수립 총 횟수|
| **envoy.cluster.upstream_cx_connect_ms.sum** <br>(count) | \[OpenMetrics V2\] 연결 수립 시간 총합<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_connect_timeout.count** <br>(count) | \[OpenMetrics V2\] 총 연결 시도 타임아웃 수|
| **envoy.cluster.upstream_cx_destroy.count** <br>(count) | \[OpenMetrics V2\] 총 연결 종료 횟수|
| **envoy.cluster.upstream_cx_destroy_local.count** <br>(count) | \[OpenMetrics V2\] 로컬에서 종료된 총 연결 횟수|
| **envoy.cluster.upstream_cx_destroy_local_with_active_rq.count** <br>(count) | \[OpenMetrics V2\] 1개 이상의 활성 요청이 있는 상태로 로컬에서 종료된 총 연결 횟수|
| **envoy.cluster.upstream_cx_destroy_remote_with_active_rq.count** <br>(count) | \[OpenMetrics V2\] 1개 이상의 활성 요청이 있는 상태로 원격에서 종료된 총 연결 수|
| **envoy.cluster.upstream_cx_destroy_remote.count** <br>(count) | \[OpenMetrics V2\] 원격으로 종료된 연결 수|
| **envoy.cluster.upstream_cx_destroy_with_active_rq.count** <br>(count) | \[OpenMetrics V2\] 1개 이상의 활성 요청이 있는 상태로 종료된 연결 수|
| **envoy.cluster.upstream_cx_http1.count** <br>(count) | \[OpenMetrics V2\] HTTP/1.1 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_http2.count** <br>(count) | \[OpenMetrics V2\] HTTP/2 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_http3.count** <br>(count) | \[OpenMetrics V2\] HTTP/3 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_idle_timeout.count** <br>(count) | \[OpenMetrics V2\] 총 연결 유휴 타임아웃 수|
| **envoy.cluster.upstream_cx_length_ms.bucket** <br>(count) | \[OpenMetrics V2\] 연결 유지 시간 (밀리초)<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_length_ms.count** <br>(count) | \[OpenMetrics V2\] 연결 유지 시간 샘플 수|
| **envoy.cluster.upstream_cx_length_ms.sum** <br>(count) | \[OpenMetrics V2\] 연결 유지 시간 총합<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_max_requests.count** <br>(count) | \[OpenMetrics V2\] 최대 요청으로 인해 종료된 연결 수|
| **envoy.cluster.upstream_cx_none_healthy.count** <br>(count) | \[OpenMetrics V2\] 호스트가 정상 작동하지 않아 연결이 설정되지 않은 총 횟수|
| **envoy.cluster.upstream_cx_overflow.count** <br>(count) | \[OpenMetrics V2\] 클러스터의 연결 서킷 브레이커가 초과된 총 횟수|
| **envoy.cluster.upstream_cx_pool_overflow.count** <br>(count) | \[OpenMetrics V2\] 클러스터 연결 풀 서킷 브레이커가 초과된 총 횟수|
| **envoy.cluster.upstream_cx_protocol_error.count** <br>(count) | \[OpenMetrics V2\] 연결 프로토콜 총 오류 수|
| **envoy.cluster.upstream_cx_rx_bytes.count** <br>(count) | \[OpenMetrics V2\] 수신된 연결 바이트 수<br>_byte로 표시_ |
| **envoy.cluster.upstream_cx_tx_bytes.count** <br>(count) | \[OpenMetrics V2\] 전송된 연결 바이트 수<br>_byte로 표시_ |
| **envoy.cluster.upstream_flow_control_backed_up.count** <br>(count) | \[OpenMetrics V2\] 업스트림 연결 정체로 인해 다운스트림 읽기를 중단한 횟수<br>_occurrence로 표시_ |
| **envoy.cluster.upstream_flow_control_drained.count** <br>(count) | \[OpenMetrics V2\] 업스트림 연결 정체가 해소되어 다운스트림 읽기를 재개한 횟수<br>_occurrence로 표시_ |
| **envoy.cluster.upstream_flow_control_paused_reading.count** <br>(count) | \[OpenMetrics V2\] 흐름 제어가 업스트림으로부터의 읽기를 일시 중지한 횟수<br>_occurrence로 표시_ |
| **envoy.cluster.upstream_internal_redirect_failed.count** <br>(count) | \[OpenMetrics V2\] 내부 리다이렉트 실패로 인해 리다이렉트 응답이 다운스트림으로 전달된 횟수|
| **envoy.cluster.upstream_internal_redirect_succeeded.count** <br>(count) | \[Openmetrics V2\] 내부 리디렉션으로 인해 두 번째 업스트림 요청이 발생한 횟수|
| **envoy.cluster.upstream_rq.count** <br>(count) | \[OpenMetrics V2\] 특정 HTTP 응답 코드(예: 201, 302 등)|
| **envoy.cluster.upstream_rq_cancelled.count** <br>(count) | \[OpenMetrics V2\] 연결 풀 연결을 얻기 전에 취소된 총 요청 수|
| **envoy.cluster.upstream_rq_completed.count** <br>(count) | \[OpenMetrics V2\] 완료된 총 업스트림 요청 수|
| **envoy.cluster.upstream_rq_maintenance_mode.count** <br>(count) | \[OpenMetrics V2\] 유지보수 모드로 인해 즉시 503 오류가 발생한 총 요청 수|
| **envoy.cluster.upstream_rq_max_duration_reached.count** <br>(count) | \[OpenMetrics V2\] 최대 대기 시간 초과로 인해 종료된 요청 수|
| **envoy.cluster.upstream_rq_pending.count** <br>(count) | \[Openmetrics V2\] 커넥션 풀 연결 대기 중인 요청 수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_pending_failure_eject.count** <br>(count) | \[OpenMetrics V2\] 연결 풀 연결 실패 또는 원격 연결 종료로 인해 실패한 총 요청 수|
| **envoy.cluster.upstream_rq_pending_overflow.count** <br>(count) | \[OpenMetrics V2\] 연결 풀을 초과한 요청 수 또는 (주로 HTTP/2 이상에서) 서킷 차단으로 인해 실패한 요청 수의 총합|
| **envoy.cluster.upstream_rq_per_try_timeout.count** <br>(count) | \[OpenMetrics V2\] 시도별 타임아웃에 걸린 총 요청 수(요청 헤징이 활성화된 경우는 제외)|
| **envoy.cluster.upstream_rq_retry.count** <br>(count) | \[OpenMetrics V2\] 요청 재시도 횟수|
| **envoy.cluster.upstream_rq_retry_backoff_exponential.count** <br>(count) | \[OpenMetrics V2\] 지수 백오프 전략을 사용한 총 재시도 횟수|
| **envoy.cluster.upstream_rq_retry_backoff_ratelimited.count** <br>(count) | \[OpenMetrics V2\] 속도 제한 백오프 전략을 사용한 총 재시도 횟수|
| **envoy.cluster.upstream_rq_retry_limit_exceeded.count** <br>(count) | \[OpenMetrics V2\] 설정된 최대 재시도 횟수를 초과하여 재시도되지 않은 요청의 총 개수|
| **envoy.cluster.upstream_rq_retry_overflow.count** <br>(count) | \[OpenMetrics V2\] 서킷 차단 또는 재시도 예산 초과로 인해 재시도되지 않은 총 요청 수|
| **envoy.cluster.upstream_rq_retry_success.count** <br>(count) | \[OpenMetrics V2\] 요청 재시도 총 성공 횟수|
| **envoy.cluster.upstream_rq_rx_reset.count** <br>(count) | \[OpenMetrics V2\] 원격으로 재설정된 총 요청 수|
| **envoy.cluster.upstream_rq_time.bucket** <br>(count) | \[OpenMetrics v2\] 히스토그램 버킷의 요청 수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_time.count** <br>(count) | \[OpenMetrics v2\] 요청 수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_time.sum** <br>(count) | \[OpenMetrics v2\] 모든 요청 지속 시간 합계 (밀리초)<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_rq_timeout.count** <br>(count) | \[OpenMetrics V2\] 응답을 기다리다 시간 초과된 총 요청 수|
| **envoy.cluster.upstream_rq_tx_reset.count** <br>(count) | \[OpenMetrics V2\] 로컬로 재설정된 총 요청 수|
| **envoy.cluster.upstream_rq_xx.count** <br>(count) | \[OpenMetrics V2\] HTTP 응답 코드 집계 (예: 2xx, 3xx 등)|
| **envoy.cluster_manager.cds.control_plane.rate_limit_enforced.count** <br>(count) | \[OpenMetrics V2\] 관리 서버 요청에 속도 제한이 적용된 총 횟수<br>_ occurrence로 표시_ |
| **envoy.cluster_manager.cds.init_fetch_timeout.count** <br>(count) | \[OpenMetrics V2\] 총 초기 가져오기 타임아웃 수|
| **envoy.cluster_manager.cds.update_attempt.count** <br>(count) | \[OpenMetrics V2\] 서비스 검색을 통한 클러스터 멤버십 업데이트 시도 횟수|
| **envoy.cluster_manager.cds.update_duration.bucket** <br>(count) | \[OpenMetrics V2\] 구성 업데이트 소요 시간|
| **envoy.cluster_manager.cds.update_duration.count** <br>(count) | \[OpenMetrics V2\] 구성 샘플 업데이트 소요 시간|
| **envoy.cluster_manager.cds.update_duration.sum** <br>(count) | \[OpenMetrics V2\] 구성 업데이트 소요 시간 총합|
| **envoy.cluster_manager.cds.update_failure.count** <br>(count) | \[OpenMetrics V2\] 서비스 검색으로 인한 클러스터 멤버십 업데이트 실패 총 횟수|
| **envoy.cluster_manager.cds.update_rejected.count** <br>(count) | \[OpenMetrics V2\] 스키마/검증 오류로 실패한 총 API 가져오기 횟수|
| **envoy.cluster_manager.cds.update_success.count** <br>(count) | \[OpenMetrics V2\] 서비스 검색을 통한 클러스터 멤버십 업데이트 총 성공 횟수|
| **envoy.cluster_manager.cluster_added.count** <br>(count) | \[OpenMetrics V2\] (정적 구성 또는 CDS를 통해 추가된) 총 클러스터 수|
| **envoy.cluster_manager.cluster_modified.count** <br>(count) | \[OpenMetrics V2\] CDS를 통해 수정된 총 클러스터 수|
| **envoy.cluster_manager.cluster_removed.count** <br>(count) | \[OpenMetrics V2\] (CDS를 통해) 제거된 총 클러스터 수|
| **envoy.cluster_manager.cluster_updated.count** <br>(count) | \[OpenMetrics V2\] 총 클러스터 업데이트|
| **envoy.cluster_manager.custer_updated_via_merge.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.cluster_manager.update_merge_cancelled.count** <br>(count) | \[OpenMetrics V2\] 취소되어 조기 배포된 총 병합 업데이트 수|
| **envoy.cluster_manager.update_out_of_merge_window.count** <br>(count) | \[OpenMetrics V2\] 병합 기간 이후에 도착한 총 업데이트 수|
| **envoy.connection_limit.active_connections** <br>(gauge) | \[OpenMetrics V2\] 이 네트워크 필터 체인 범위 내에서 현재 활성화된 연결 수|
| **envoy.connection_limit.limited_connections.count** <br>(count) | \[OpenMetrics V2\] 연결 제한 초과로 인해 거부된 총 연결 수|
| **envoy.connection_limit.limited_connections** <br>(count) | \[Legacy\] 연결 제한 초과로 인해 거부된 총 연결 수|
| **envoy.filesystem.flushed_by_timer.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.filesystem.reopen_failed.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.filesystem.write_buffered.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.filesystem.write_completed.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.filesystem.write_failed.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.downstream_cx.count** <br>(count) | \[OpenMetrics V2\] 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_delayed_close_timeout.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.downstream_cx_destroy.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.downstream_cx_destroy_active_rq.count** <br>(count) | \[OpenMetrics V2\] 1개 이상의 활성 요청이 있는 상태로 종료된 연결 수|
| **envoy.http.downstream_cx_destroy_local.count** <br>(count) | \[OpenMetrics V2\] 로컬 종료로 인해 종료된 총 연결 수|
| **envoy.http.downstream_cx_destroy_local_active_rq.count** <br>(count) | \[OpenMetrics V2\] 1개 이상의 활성 요청이 있는 상태로 로컬에서 종료된 총 연결 횟수|
| **envoy.http.downstream_cx_destroy_remote.count** <br>(count) | \[OpenMetrics V2\] 원격 종료로 인해 종료된 총 연결 수|
| **envoy.http.downstream_cx_destroy_remote_active_rq.count** <br>(count) | \[OpenMetrics V2\] 1개 이상의 활성 요청이 있는 상태로 원격에서 종료된 총 연결 수|
| **envoy.http.downstream_cx_drain_close.count** <br>(count) | \[OpenMetrics V2\] 드레이닝(Draining)으로 인해 종료된 총 연결 수|
| **envoy.http.downstream_cx_http1.count** <br>(count) | \[OpenMetrics V2\] HTTP/1.1 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_http2.count** <br>(count) | \[OpenMetrics V2\] HTTP/2 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_http3.count** <br>(count) | \[OpenMetrics V2\] HTTP/3 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_idle_timeout.count** <br>(count) | \[OpenMetrics V2\] 유휴 타임아웃으로 인해 종료된 총 연결 수|
| **envoy.http.downstream_cx_max_duration_reached.count** <br>(count) | \[OpenMetrics V2\] 최대 연결 지속 시간으로 인해 종료된 총 연결 수|
| **envoy.http.downstream_cx_overload_disable_keepalive.count** <br>(count) | \[OpenMetrics V2\] Envoy 과부하로 인해 HTTP 1.x keepalive가 비활성화된 총 연결 수|
| **envoy.http.downstream_cx_protocol_error.count** <br>(count) | \[OpenMetrics V2\] 총 프로토콜 오류 수|
| **envoy.http.downstream_cx_rx_bytes.count** <br>(count) | \[OpenMetrics V2\] 수신된 바이트 수<br>_byte로 표시_ |
| **envoy.http.downstream_cx_ssl.count** <br>(count) | \[OpenMetrics V2\] TLS 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_tx_bytes.count** <br>(count) | \[OpenMetrics V2\] 전송된 바이트 수<br>_byte로 표시_ |
| **envoy.http.downstream_cx_upgrades.count** <br>(count) | \[OpenMetrics V2\] 성공적으로 업그레이드된 연결 수|
| **envoy.http.downstream_cx_upgrades_active** <br>(gauge) | \[OpenMetrics V2\] 업그레이드된 활성 연결 수. 활성 http1/http2 연결도 포함합니다.|
| **envoy.http.downstream_flow_control_paused_reading.count** <br>(count) | \[OpenMetrics V2\] 흐름 제어로 인해 읽기 기능이 비활성화된 횟수<br>_occurrence로 표시_ |
| **envoy.http.downstream_flow_control_resumed_reading.count** <br>(count) | \[OpenMetrics V2\] 흐름 제어로 인해 해당 연결에서 읽기가 활성화된 횟수<br>_occurrence로 표시_ |
| **envoy.http.downstream_rq.count** <br>(count) | \[OpenMetrics V2\] 요청 수<br>_request로 표시_ |
| **envoy.http.downstream_rq_completed.count** <br>(count) | \[OpenMetrics V2\] 응답이 발생한 총 요청 수 (예: 중단된 요청은 제외)<br>_request로 표시_ |
| **envoy.http.downstream_rq_failed_path_normalization.count** <br>(count) | \[OpenMetrics V2\] 원래 URL 경로와 정규화된 URL 경로가 다르거나 경로 정규화에 실패했을 때 리디렉션된 요청 수. 이 작업은 path_with_escaped_slashes_action 구성 옵션으로 설정됩니다.|
| **envoy.http.downstream_rq_header_timeout.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.downstream_rq_http1.count** <br>(count) | \[OpenMetrics V2\] HTTP/1.1 요청 수<br>_request로 표시_ |
| **envoy.http.downstream_rq_http2.count** <br>(count) | \[OpenMetrics V2\] HTTP/2 요청 수<br>_request로 표시_ |
| **envoy.http.downstream_rq_http3.count** <br>(count) | \[OpenMetrics V2\] HTTP/3 요청 수<br>_request로 표시_ |
| **envoy.http.downstream_rq_idle_timeout.count** <br>(count) | \[OpenMetrics V2\] 유휴 타임아웃으로 인해 종료된 총 요청 수|
| **envoy.http.downstream_rq_max_duration_reached.count** <br>(count) | \[OpenMetrics V2\] 최대 대기 시간 초과로 인해 종료된 요청 수|
| **envoy.http.downstream_rq_non_relative_path.count** <br>(count) | \[OpenMetrics V2\] 비상대적 HTTP 경로를 포함한 총 요청 수|
| **envoy.http.downstream_rq_overload_close.count** <br>(count) | \[OpenMetrics V2\] Envoy 과부하로 인해 종료된 총 요청 수|
| **envoy.http.downstream_rq_redirected_with_normalized_path.count** <br>(count) | \[OpenMetrics V2\] 원래 URL 경로와 정규화된 URL 경로가 다르기 때문에 리디렉션된 총 요청 수. 이 작업은 path_with_escaped_slashes_action 설정 옵션을 통해 구성됩니다.|
| **envoy.http.downstream_rq_response_before_rq_complete.count** <br>(count) | \[OpenMetrics V2\] 요청이 완료되기 전에 전송된 총 응답 수|
| **envoy.http.downstream_rq_rx_reset.count** <br>(count) | \[OpenMetrics V2\] 수신된 총 요청 재설정 횟수|
| **envoy.http.downstream_rq_time.bucket** <br>(count) | \[OpenMetrics V2\] 요청 및 응답 소요 시간 (밀리초)<br>_millisecond로 표시_ |
| **envoy.http.downstream_rq_time.count** <br>(count) | \[OpenMetrics V2\] 샘플링된 요청 및 응답 시간 수|
| **envoy.http.downstream_rq_time.sum** <br>(count) | \[OpenMetrics V2\] 요청 시간 및 응답 시간 총합<br>_millisecond로 표시_ |
| **envoy.http.downstream_rq_timeout.count** <br>(count) | \[OpenMetrics V2\] 요청 경로 타임아웃으로 인해 종료된 총 요청 수|
| **envoy.http.downstream_rq_too_large.count** <br>(count) | \[OpenMetrics V2\] 너무 큰 본문 버퍼링으로 인해 413 오류가 발생한 총 요청 수|
| **envoy.http.downstream_rq_tx_reset.count** <br>(count) | \[OpenMetrics V2\] 전송된 총 재설정 요청 수|
| **envoy.http.downstream_rq_ws_on_non_ws_route.count** <br>(count) | \[OpenMetrics V2\] 업그레이드 경로가 아닌 곳에서 거부된 총 업그레이드 요청 수. 이는 WebSocket 업그레이드와 비 WebSocket 업그레이드 모두에 적용됩니다.|
| **envoy.http.downstream_rq_xx.count** <br>(count) | \[OpenMetrics V2\] HTTP 응답 코드 집계 (예: 2xx, 3xx 등)|
| **envoy.http.ext_proc.streams_started.count** <br>(count) | \[OpenMetrics V2\] 외부 처리 서비스로 시작된 총 gRPC 스트림 수|
| **envoy.http.ext_proc.stream_msgs_sent.count** <br>(count) | \[OpenMetrics V2\] 해당 스트림에서 전송된 총 메시지 수<br>_message로 표시_ |
| **envoy.http.ext_proc.stream_msgs_received.count** <br>(count) | \[OpenMetrics V2\] 해당 스트림에서 수신된 총 메시지 수<br>_message로 표시_ |
| **envoy.http.ext_proc.spurious_msgs_received.count** <br>(count) | \[OpenMetrics V2\] 프로토콜을 위반하여 수신된 예상치 못한 메시지 총 개수<br>_message로 표시_ |
| **envoy.http.ext_proc.streams_closed.count** <br>(count) | \[OpenMetrics V2\] 양쪽에서 성공적으로 종료된 스트림 총 개수|
| **envoy.http.ext_proc.streams_failed.count** <br>(count) | \[OpenMetrics V2\] 스트림에서 gRPC 오류가 발생한 총 횟수|
| **envoy.http.ext_proc.failure_mode_allowed.count** <br>(count) | \[OpenMetrics V2\] 구성으로 인해 무시된 총 오류 횟수<br>_response로 표시_ |
| **envoy.http.ext_proc.message_timeouts.count** <br>(count) | \[OpenMetrics V2\] 설정된 시간 제한 내 응답 수신 실패 횟수<br>_message로 표시_ |
| **envoy.http.ext_proc.rejected_header_mutations.count** <br>(count) | \[OpenMetrics V2\] 거부된 헤더 변형 총 개수|
| **envoy.http.ext_proc.override_message_timeout_received.count** <br>(count) | \[OpenMetrics V2\] 수신된 override_message_timeout 메시지 총 개수<br>_message로 표시_ |
| **envoy.http.ext_proc.override_message_timeout_ignored.count** <br>(count) | \[OpenMetrics V2\] 무시된 override_message_timeout 메시지 총 개수<br>_message로 표시_ |
| **envoy.http.ext_proc.clear_route_cache_ignored.count** <br>(count) | \[OpenMetrics V2\] 무시된 총 캐시 삭제 요청 횟수<br>_request로 표시_ |
| **envoy.http.ext_proc.clear_route_cache_disabled.count** <br>(count) | \[OpenMetrics V2\] 비활성화로 인해 거부된 총 캐시 삭제 요청 횟수<br>_request로 표시_ |
| **envoy.http.ext_proc.clear_route_cache_upstream_ignored.count** <br>(count) | \[OpenMetrics V2\] 필터가 업스트림 모드여서 무시된 총 캐시 삭제 요청 횟수<br>_request로 표시_ |
| **envoy.http.ext_proc.send_immediate_resp_upstream_ignored.count** <br>(count) | \[OpenMetrics V2\] 필터가 업스트림 모드여서 무시된 즉시 응답 메시지 총 개수<br>_request로 표시_ |
| **envoy.http.no_cluster.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.no_route.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.passthrough_internal_redirect_bad_location.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.passthrough_internal_redirect_no_route.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.passthrough_internal_redirect_predicate.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.passthrough_internal_redirect_too_many_redirects.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.passthrough_internal_redirect_unsafe_scheme.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.rq.count** <br>(count) | \[OpenMetrics V2\] 라우팅된 요청 수<br>_request로 표시_ |
| **envoy.http.rq_direct_response.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.rq_redirect.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.rq_reset_after_downstream_response_started.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.rs_too_large.count** <br>(count) | \[OpenMetrics V2\] 너무 큰 본문 버퍼링으로 인해 발생한 총 응답 오류 수|
| **envoy.http.tracing.client_enabled.count** <br>(count) | \[OpenMetrics V2\] 요청 헤더 x-envoy-force-trace로 추적 가능한 총 결정 수|
| **envoy.http.tracing.health_check.count** <br>(count) | \[OpenMetrics V2\] 상태 점검으로 추적 불가능한 총 결정 수|
| **envoy.http.tracing.not_traceable.count** <br>(count) | \[OpenMetrics V2\] 요청 ID로 추적 불가능한 총 결정 수|
| **envoy.http.tracing.random_sampling.count** <br>(count) | \[OpenMetrics V2\] 무작위 샘플링으로 추적 가능한 결정 수|
| **envoy.http.tracing.service_forced.count** <br>(count) | \[OpenMetrics V2\] 서버 런타임 플래그 tracing.global_enabled로 추적 가능한 총 결정 수|
| **envoy.http.downstream_cx_length_ms.bucket** <br>(count) | \[OpenMetrics V2\] 연결 유지 시간(밀리초)<br>_millisecond로 표시_ |
| **envoy.http.downstream_cx_length_ms.count** <br>(count) | \[OpenMetrics V2\] 연결 지속 시간(밀리초) 샘플 수|
| **envoy.http.downstream_cx_length_ms.sum** <br>(count) | \[OpenMetrics V2\] 연결 지속 시간 합계(밀리초)<br>_millisecond로 표시_ |
| **envoy.listener.admin.downstream_cx.count** <br>(count) | \[OpenMetrics V2\] 총 연결 수|
| **envoy.listener.admin.downstream_cx_active** <br>(gauge) | \[OpenMetrics V2\] 어드민 총 활성 연결 수|
| **envoy.listener.admin.downstream_cx_destroy.count** <br>(count) | \[OpenMetrics V2\] 어드민 총 종료 연결 수|
| **envoy.listener.admin.downstream_cx_length_ms.bucket** <br>(count) | \[OpenMetrics V2\] 어드민 연결 지속 시간(밀리초)<br>_millisecond로 표시_ |
| **envoy.listener.admin.downstream_cx_length_ms.count** <br>(count) | \[OpenMetrics V2\] 어드민 연결 지속 시간 샘플 수|
| **envoy.listener.admin.downstream_cx_length_ms.sum** <br>(count) | \[OpenMetrics V2\] 어드민 연결 지속 시간 총합<br>_millisecond로 표시_ |
| **envoy.listener.admin.downstream_cx_overflow.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.admin.downstream_cx_overload_reject.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.admin.downstream_global_cx_overflow.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.admin.downstream_pre_cx_active** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.listener.admin.downstream_pre_cx_timeout.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.admin.http.downstream_rq_completed.count** <br>(count) | \[OpenMetrics V2\] 응답이 발생한 총 요청 수 (예: 중단된 요청은 제외)<br>_request로 표시_ |
| **envoy.listener.admin.http.downstream_rq_xx.count** <br>(count) | \[OpenMetrics V2\] HTTP 응답 코드 집계 (예: 2xx, 3xx 등)|
| **envoy.listener.admin.no_filter_chain_match.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.downstream_cx.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.downstream_cx_destroy.count** <br>(count) | \[OpenMetrics V2\] 종료된 총 연결 수|
| **envoy.listener.downstream_cx_length_ms.bucket** <br>(count) | \[OpenMetrics V2\] 연결 유지 시간(밀리초)<br>_millisecond로 표시_ |
| **envoy.listener.downstream_cx_length_ms.count** <br>(count) | \[OpenMetrics V2\] 연결 지속 시간(밀리초) 샘플 수|
| **envoy.listener.downstream_cx_length_ms.sum** <br>(count) | \[OpenMetrics V2\] 연결 지속 시간 합계(밀리초)<br>_millisecond로 표시_ |
| **envoy.listener.downstream_cx_overflow.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.downstream_cx_overload_reject.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.downstream_global_cx_overflow.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.downstream_pre_cx_timeout.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.http.downstream_rq_completed.count** <br>(count) | \[OpenMetrics V2\] 응답이 발생한 총 HTTP 요청 중(예: 중단된 요청은 포함되지 않음)<br>_request로 표시_ |
| **envoy.listener.http.downstream_rq_xx.count** <br>(count) | \[OpenMetrics V2\] HTTP 응답 코드 집계(예: 2xx, 3xx 등)<br>_response로 표시_ |
| **envoy.listener.no_filter_chain_match.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.lds.control_plane.rate_limit_enforced.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.lds.init_fetch_timeout.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.lds.update_attempt.count** <br>(count) | \[OpenMetrics V2\] 서비스 검색을 통한 클러스터 멤버십 업데이트 시도 횟수|
| **envoy.listener_manager.lds.update_duration.bucket** <br>(count) | \[OpenMetrics V2\] 구성 업데이트 소요 시간|
| **envoy.listener_manager.lds.update_duration.count** <br>(count) | \[OpenMetrics V2\] 구성 업데이트 소요 시간|
| **envoy.listener_manager.lds.update_duration.sum** <br>(count) | \[OpenMetrics V2\] 구성 업데이트 소요 시간 합계|
| **envoy.listener_manager.lds.update_failure.count** <br>(count) | \[OpenMetrics V2\] 서비스 검색으로 인한 클러스터 멤버십 업데이트 실패 총 횟수|
| **envoy.listener_manager.lds.update_rejected.count** <br>(count) | \[OpenMetrics V2\] 서비스 검색에서 거부된 클러스터 멤버십 업데이트 총 개수|
| **envoy.listener_manager.lds.update_success.count** <br>(count) | \[OpenMetrics V2\] 서비스 검색을 통한 클러스터 멤버십 업데이트 성공 총 횟수|
| **envoy.listener_manager.listener_added.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.listener_create_failure.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.listener_create_success.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.listener_in_place_updated.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.listener_modified.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.listener_removed.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.listener_stopped.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.total_filter_chains_draining** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.listener_manager.workers_started** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.runtime.deprecated_feature_seen_since_process_start** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.runtime.deprecated_feature_use.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.runtime.load_error.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.runtime.load_success.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.runtime.override_dir_exists.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.runtime.override_dir_not_exists.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.server.compilation_settings_fips_mode** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.server.debug_assertion_failures.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.server.dynamic_unknown_fields.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.server.envoy_bug_failure.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.server.hot_restart_generation** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.server.initialization_time_ms.bucket** <br>(count) | \[OpenMetrics V2\] 서버 초기화 시간<br>_millisecond로 표시_ |
| **envoy.server.initialization_time_ms.count** <br>(count) | \[OpenMetrics V2\] 서버 초기화 시간 샘플 수|
| **envoy.server.initialization_time_ms.sum** <br>(count) | \[OpenMetrics V2\] 서버 초기화 시간 합계|
| **envoy.server.memory_physical_size** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.server.seconds_until_first_ocsp_response_expiring** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.server.static_unknown_fields.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.server.stats_recent_lookups** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.server.watchdog_mega_miss.count** <br>(count) | \[OpenMetrics V2\] 서버 메가 미스 횟수|
| **envoy.server.watchdog_miss.count** <br>(count) | \[OpenMetrics V2\] 서버 표준 미스 횟수|
| **envoy.server.dropped_stat_flushes.count** <br>(count) | \[OpenMetrics V2\] 드롭된 통계 플러시 횟수|
| **envoy.vhost.vcluster.upstream_rq.count** <br>(count) | \[OpenMetrics V2\] 라우터가 업스트림으로 시작한 요청 수<br>_request로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_retry.count** <br>(count) | \[OpenMetrics V2\] 총 요청 재시도 횟수<br>_request로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_retry_limit_exceeded.count** <br>(count) | \[OpenMetrics V2\] 설정된 최대 재시도 횟수를 초과하여 재시도되지 않은 총 요청 수<br>_request로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_retry_overflow.count** <br>(count) | \[OpenMetrics V2\] 서킷 차단 또는 재시도 예산 초과로 인해 재시도되지 않은 총 요청 수<br>_request로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_retry_success.count** <br>(count) | \[OpenMetrics V2\] 총 요청 재시도 성공 횟수<br>_request로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_timeout.count** <br>(count) | \[OpenMetrics V2\] 응답을 기다리다 시간 초과된 총 요청 수<br>_request로 표시_ |
| **envoy.watchdog_mega_miss.count** <br>(count) | \[OpenMetrics V2\] 메가 미스 횟수|
| **envoy.watchdog_miss.count** <br>(count) | \[OpenMetrics V2\] 표준 미스 횟수|
| **envoy.workers.watchdog_mega_miss.count** <br>(count) | \[OpenMetrics V2\] 메가 미스 횟수|
| **envoy.workers.watchdog_miss.count** <br>(count) | \[OpenMetrics V2\] 표준 미스 횟수|
| **envoy.runtime.load_error** <br>(count) | \[Legacy\] 오류가 발생한 총 로드 시도 횟수<br>_error로 표시_ |
| **envoy.runtime.override_dir_not_exists** <br>(count) | \[Legacy\] 재정의 디렉터리를 사용하지 않은 총 로드 횟수<br>_ occurrence로 표시_ |
| **envoy.runtime.override_dir_exists** <br>(count) | \[Legacy\] 재정의 디렉터리를 사용한 총 로드 횟수<br>_occurrence로 표시_ |
| **envoy.runtime.load_success** <br>(count) | \[Legacy\] 성공한 총 로드 시도 횟수<br>_success로 표시_ |
| **envoy.runtime.num_keys** <br>(gauge) | \[Legacy\] 현재 로드된 키 개수<br>_location으로 표시_ |
| **envoy.runtime.admin_overrides_active** <br>(gauge) | \[Legacy\] 어드민 재정의가 활성화된 경우 1, 그렇지 않으면 0|
| **envoy.runtime.deprecated_feature_use** <br>(count) | \[Legacy\] 더 이상 사용되지 않는 기능이 사용된 총 횟수|
| **envoy.runtime.num_layers** <br>(gauge) | \[Legacy\] 현재 활성화된 레이어 수(로딩 오류 없음)|
| **envoy.control_plane.connected_state** <br>(gauge) | \[Legacy\] 관리 서버와의 현재 연결 상태를 나타내는 부울 값(연결됨: 1, 연결 끊김: 0)<br>_connection으로 표시_ |
| **envoy.control_plane.pending_requests** <br>(gauge) | \[Legacy\] 속도 제한이 적용되었을 때 대기 중인 총 요청 수<br>_request로 표시_ |
| **envoy.control_plane.rate_limit_enforced** <br>(count) | \[Legacy\] 관리 서버 요청에 대해 속도 제한이 적용된 총 횟수<br>_occurrence로 표시_ |
| **envoy.cluster_manager.cds.config_reload** <br>(count) | \[Legacy\] 다른 구성으로 인해 구성이 다시 로드된 총 API 요청 횟수<br>_request로 표시_ |
| **envoy.cluster_manager.cds.update_attempt** <br>(count) | \[Legacy\] 총 API 가져오기 시도 횟수<br>_request로 표시_ |
| **envoy.cluster_manager.cds.update_success** <br>(count) | \[Legacy\] 성공적으로 완료된 API 가져오기 횟수<br>_request로 표시_ |
| **envoy.cluster_manager.cds.update_failure** <br>(count) | \[Legacy\] 네트워크 오류로 인해 실패한 API 가져오기 총 횟수<br>_request로 표시_ |
| **envoy.cluster_manager.cds.update_rejected** <br>(count) | \[Legacy\] 스키마/유효성 검증 오류로 인해 실패한 API 가져오기 총 횟수<br>_request로 표시_ |
| **envoy.cluster_manager.cds.update_time** <br>(gauge) | \[Legacy\] 마지막으로 API 데이터 가져오기에 성공한 시점의 타임스탬프(에포크 이후 밀리초 단위)<br>_millisecond로 표시_ |
| **envoy.cluster_manager.cds.version** <br>(gauge) | \[Legacy\] 마지막으로 성공적으로 API에서 가져온 콘텐츠의 해시값<br>_item으로 표시_ |
| **envoy.cluster_manager.cds.control_plane.connected_state** <br>(gauge) | \[Legacy\] 관리 서버와의 현재 연결 상태를 나타내는 부울 값(연결됨: 1, 연결 끊김: 0)<br>_connection으로 표시_ |
| **envoy.cluster_manager.cds.control_plane.pending_requests** <br>(gauge) | \[Legacy\] 속도 제한이 적용되었을 때 대기 중인 총 요청 수<br>_request로 표시_ |
| **envoy.cluster_manager.cds.control_plane.rate_limit_enforced** <br>(count) | \[Legacy\] 관리 서버 요청에 속도 제한이 적용된 총 횟수<br>_occurrence로 표시_ |
| **envoy.http.no_route** <br>(count) | \[Legacy\] 경로가 없어서 404 오류가 발생한 요청 수<br>_request로 표시_ |
| **envoy.http.no_cluster** <br>(count) | \[Legacy\] 대상 클러스터가 존재하지 않아 404 오류가 발생한 총 요청 수<br>_request로 표시_ |
| **envoy.http.rq_redirect** <br>(count) | \[Legacy\] 리디렉션 응답을 발생시킨 총 요청 수<br>_request로 표시_ |
| **envoy.http.rq_total** <br>(count) | \[Legacy\] 총 라우팅된 요청<br>_request로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_1xx** <br>(count) | \[Legacy\] HTTP 1xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_2xx** <br>(count) | \[Legacy\] HTTP 2xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_3xx** <br>(count) | \[Legacy\] HTTP 3xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_4xx** <br>(count) | \[Legacy\] HTTP 4xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_5xx** <br>(count) | \[Legacy\] HTTP 5xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_retry** <br>(count) | \[Legacy\] 총 요청 재시도 횟수<br>_request로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_retry_limit_exceeded** <br>(count) | \[Legacy\] 설정된 최대 재시도 횟수를 초과하여 재시도되지 않은 요청 수<br>_request로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_retry_overflow** <br>(count) | \[Legacy\] 서킷 차단 또는 재시도 예산 초과로 인해 재시도되지 않은 총 요청 수<br>_request로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_retry_success** <br>(count) | \[Legacy\] 총 요청 재시도 성공 횟수<br>_request로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_timeout** <br>(count) | \[Legacy\] 응답을 기다리다 시간 초과된 총 요청 수<br>_request로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_total** <br>(count) | \[Legacy\] 라우터가 업스트림으로 시작한 총 요청 수<br>_request로 표시_ |
| **envoy.cluster.ratelimit.ok** <br>(count) | \[Legacy\] 속도 제한 서비스에서 발생한 총 제한 미달 응답 수<br>_response로 표시_ |
| **envoy.cluster.ratelimit.error** <br>(count) | \[Legacy\] 속도 제한 서비스 연결 중 발생한 총 오류 수<br>_response로 표시_ |
| **envoy.cluster.ratelimit.over_limit** <br>(count) | \[Legacy\] 속도 제한 서비스에서 발생한 총 제한 초과 응답 수<br>_response로 표시_ |
| **envoy.cluster.ratelimit.failure_mode_allowed** <br>(count) | \[Legacy\] 속도 제한 서비스에 연결하는 과정에서 오류가 발생했지만 failure_mode_deny가 false로 설정되어 있어 통과된 총 요청 수<br>_response로 표시_ |
| **envoy.cluster.ext_authz.ok** <br>(count) | \[Legacy\] 외부 인증 서비스의 총 응답 수<br>_response로 표시_ |
| **envoy.cluster.ext_authz.error** <br>(count) | \[Legacy\] 외부 인증 서비스 연결 중 발생한 총 오류 수<br>_response로 표시_ |
| **envoy.cluster.ext_authz.denied** <br>(count) | \[Legacy\] 외부 인증 서비스에서 트래픽을 거부하는 총 응답 수<br>_response로 표시_ |
| **envoy.cluster.ext_authz.disabled** <br>(count) | \[Legacy\] 필터가 비활성화되어 외부 인증 서비스를 호출하지 않고 허용된 총 요청 수<br>_response로 표시_ |
| **envoy.cluster.ext_authz.failure_mode_allowed** <br>(count) | \[Legacy\] 외부 인증 서비스에 연결하는 과정에서 오류가 발생했지만 failure_mode_allow가 false로 설정되어 있어 허용된 총 요청 수<br>_response로 표시_ |
| **envoy.http.ip_tagging.hit** <br>(count) | \[Legacy\] tag_name 태그가 적용된 총 요청 수<br>_request로 표시_ |
| **envoy.http.ip_tagging.no_hit** <br>(count) | \[Legacy\] 적용 가능한 IP 태그가 없는 총 요청 수<br>_request로 표시_ |
| **envoy.http.ip_tagging.total** <br>(count) | \[Legacy\] IP Tagging Filter가 처리한 총 요청 수<br>_request로 표시_ |
| **envoy.cluster.grpc.success** <br>(count) | \[Legacy\] 총 성공 서비스/메서드 호출 횟수<br>_operation으로 표시_ |
| **envoy.cluster.grpc.failure** <br>(count) | \[Legacy\] 총 실패한 서비스/메서드 호출 횟수<br>_operation으로 표시_ |
| **envoy.cluster.grpc.total** <br>(count) | \[Legacy\] 총 서비스/메서드 호출 횟수<br>_operation으로 표시_ |
| **envoy.http.dynamodb.operation.upstream_rq_total** <br>(count) | \[Legacy\] operation_name 태그가 포함된 총 요청 수<br>_request로 표시_ |
| **envoy.http.dynamodb.table.upstream_rq_total** <br>(count) | \[Legacy\] table_name 태그 테이블에서의 총 요청 수<br>_request로 표시_ |
| **envoy.http.dynamodb.error** <br>(count) | \[Legacy\] 특정 table_name 태그에서 발생한 특정 error_type 태그 총 개수<br>_error로 표시_ |
| **envoy.http.dynamodb.error.BatchFailureUnprocessedKeys** <br>(count) | \[Legacy\] 특정 table_name 태그에서 발생한 부분 배치 실패 총 횟수<br>_error로 표시_ |
| **envoy.http.buffer.rq_timeout** <br>(count) | \[Legacy\] 전체 요청을 기다리는 동안 시간 초과된 요청 수<br>_timeout으로 표시_ |
| **envoy.http.rds.config_reload** <br>(count) | \[Legacy\] 다른 구성으로 인해 구성이 다시 로드된 총 API 요청 횟수<br>_request로 표시_ |
| **envoy.http.rds.update_attempt** <br>(count) | \[Legacy\] 총 API 가져오기 시도 횟수<br>_request로 표시_ |
| **envoy.http.rds.update_success** <br>(count) | \[Legacy\] 성공적으로 완료된 API 가져오기 횟수<br>_request로 표시_ |
| **envoy.http.rds.update_failure** <br>(count) | \[Legacy\] 네트워크 오류로 인해 실패한 API 가져오기 총 횟수<br>_request로 표시_ |
| **envoy.http.rds.update_rejected** <br>(count) | \[Legacy\] 스키마/유효성 검증 오류로 인해 실패한 API 가져오기 총 횟수<br>_request로 표시_ |
| **envoy.http.rds.version** <br>(gauge) | \[Legacy\] 마지막으로 성공적으로 API에서 가져온 콘텐츠의 해시값<br>_item으로 표시_ |
| **envoy.http.rds.control_plane.connected_state** <br>(gauge) | \[Legacy\] 관리 서버와의 현재 연결 상태를 나타내는 부울 값(연결됨: 1, 연결 끊김: 0)<br>_connection으로 표시_ |
| **envoy.http.rds.control_plane.pending_requests** <br>(gauge) | \[Legacy\] 속도 제한이 적용되었을 때 대기 중인 총 요청 수<br>_request로 표시_ |
| **envoy.http.rds.control_plane.rate_limit_enforced** <br>(count) | \[Legacy\] 관리 서버 요청에 대해 속도 제한이 적용된 총 횟수<br>_occurrence로 표시_ |
| **envoy.tcp.downstream_cx.count** <br>(count) | \[OpenMetrics V2\] 필터가 처리한 총 연결 수<br>_connection으로 표시_ |
| **envoy.tcp.downstream_cx_total** <br>(count) | \[Legacy\] 필터가 처리한 총 연결 수<br>_connection으로 표시_ |
| **envoy.tcp.downstream_cx_no_route.count** <br>(count) | \[OpenMetrics V2\] 일치하는 경로를 찾을 수 없는 연결 수<br>_connection으로 표시_ |
| **envoy.tcp.downstream_cx_no_route** <br>(count) | \[Legacy\] 일치하는 경로를 찾을 수 없는 연결 수<br>_connection으로 표시_ |
| **envoy.tcp.downstream_cx_tx_bytes.count** <br>(count) | \[OpenMetrics V2\] 다운스트림 연결에 기록된 총 바이트 수<br>_byte로 표시_ |
| **envoy.tcp.downstream_cx_tx_bytes_total** <br>(count) | \[Legacy\] 다운스트림 연결에 기록된 총 바이트 수<br>_byte로 표시_ |
| **envoy.tcp.downstream_cx_tx_bytes_buffered** <br>(gauge) | \[OpenMetrics V2 and Legacy\] 현재 다운스트림 연결에 버퍼링된 총 바이트 수<br>_byte로 표시_ |
| **envoy.tcp.downstream_cx_rx_bytes.count** <br>(count) | \[OpenMetrics V2\] 다운스트림 연결에서 기록된 총 바이트 수<br>_byte로 표시_ |
| **envoy.tcp.downstream_cx_rx_bytes_total** <br>(count) | \[Legacy\] 다운스트림 연결에서 기록된 총 바이트 수<br>_byte로 표시_ |
| **envoy.tcp.downstream_cx_rx_bytes_buffered** <br>(gauge) | \[OpenMetrics V2 and Legacy\] 다운스트림 연결에서 현재 버퍼링된 총 바이트 수<br>_byte로 표시_ |
| **envoy.tcp.downstream_flow_control_paused_reading.count** <br>(count) | \[OpenMetrics V2\] 흐름 제어가 다운스트림에서 읽기를 일시 중지한 총 횟수<br>_occurrence로 표시_ |
| **envoy.tcp.downstream_flow_control_paused_reading_total** <br>(count) | \[Legacy\] 흐름 제어가 다운스트림에서 읽기를 일시 중지한 총 횟수<br>_occurrence로 표시_ |
| **envoy.tcp.downstream_flow_control_resumed_reading.count** <br>(count) | \[OpenMetrics V2\] 흐름 제어가 다운스트림으로부터의 읽기를 재개한 총 횟수<br>_ occurrence로 표시_ |
| **envoy.tcp.downstream_flow_control_resumed_reading_total** <br>(count) | \[Legacy\] 흐름 제어가 다운스트림으로부터의 읽기를 재개한 총 횟수<br>_occurrence로 표시_ |
| **envoy.tcp.idle_timeout.count** <br>(count) | \[OpenMetrics V2\] 유휴 타임아웃으로 인해 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.tcp.idle_timeout** <br>(count) | \[Legacy\] 유휴 타임아웃으로 인해 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.tcp.on_demand_cluster_attempt.count** <br>(count) | \[OpenMetrics V2\] 온디맨드 클러스터에 요청된 총 연결 수<br>_connection으로 표시_ |
| **envoy.tcp.on_demand_cluster_missing.count** <br>(count) | \[OpenMetrics V2\] 온디맨드 클러스터 누락으로 종료된 총 연결 수<br>_ connection으로 표시_ |
| **envoy.tcp.on_demand_cluster_success.count** <br>(count) | \[OpenMetrics V2\] 온디맨드 클러스터에서 요청 및 수신된 총 연결 수<br>_connection으로 표시_ |
| **envoy.tcp.on_demand_cluster_timeout.count** <br>(count) | \[OpenMetrics V2\] 온디맨드 클러스터 조회 타임아웃으로 인해 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.tcp.max_downstream_connection_duration.count** <br>(count) | \[OpenMetrics V2\] max_downstream_connection_duration 타임아웃으로 인해 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.tcp.max_downstream_connection_duration** <br>(count) | \[Legacy\] max_downstream_connection_duration 타임아웃으로 인해 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.tcp.upstream_flush.count** <br>(count) | \[OpenMetrics V2\] 다운스트림 연결이 종료된 후에도 업스트림 데이터 전송을 계속한 총 연결 수<br>_connection으로 표시_ |
| **envoy.tcp.upstream_flush_total** <br>(count) | \[Legacy\] 다운스트림 연결이 종료된 후에도 업스트림 데이터 전송을 계속한 총 연결 수<br>_connection으로 표시_ |
| **envoy.tcp.upstream_flush_active** <br>(gauge) | \[OpenMetrics 및 V2 Legacy\] 다운스트림 연결이 종료된 후에도 업스트림 데이터를 계속 전송하고 있는 총 연결 수<br>_connection으로 표시_ |
| **envoy.auth.clientssl.update_success** <br>(count) | \[Legacy\] 총 주요 업데이트 성공 건수<br>_success로 표시_ |
| **envoy.auth.clientssl.update_failure** <br>(count) | \[Legacy\] 총 주요 업데이트 실패 횟수<br>_error로 표시_ |
| **envoy.auth.clientssl.auth_no_ssl** <br>(count) | \[Legacy\] TLS가 없어 무시된 총 연결 수<br>_connection으로 표시_ |
| **envoy.auth.clientssl.auth_ip_white_list** <br>(count) | \[Legacy\] IP 화이트리스트로 인해 허용된 총 연결 수<br>_connection으로 표시_ |
| **envoy.auth.clientssl.auth_digest_match** <br>(count) | \[Legacy\] 인증서 일치로 인해 허용된 총 연결 수<br>_connection으로 표시_ |
| **envoy.auth.clientssl.auth_digest_no_match** <br>(count) | \[Legacy\] 인증서 불일치로 인해 거부된 총 연결 수<br>_connection으로 표시_ |
| **envoy.auth.clientssl.total_principals** <br>(gauge) | \[Legacy\] 로드된 주체 총 개수<br>_item으로 표시_ |
| **envoy.ratelimit.total** <br>(count) | \[Legacy\] 속도 제한 서비스에 대한 총 요청 수<br>_response로 표시_ |
| **envoy.ratelimit.error** <br>(count) | \[Legacy\] 속도 제한 서비스 연결 중 발생한 총 오류 수<br>_response로 표시_ |
| **envoy.ratelimit.over_limit** <br>(count) | \[Legacy\] 속도 제한 서비스에서 발생한 총 제한 초과 응답 수<br>_response로 표시_ |
| **envoy.ratelimit.ok** <br>(count) | \[Legacy\] 속도 제한 서비스에서 발생한 총 제한 미달 응답 수<br>_response로 표시_ |
| **envoy.ratelimit.cx_closed** <br>(count) | \[Legacy\] 속도 제한 서비스의 제한 초과 응답으로 인해 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.ratelimit.active** <br>(gauge) | \[Legacy\] 속도 제한 서비스에 대한 총 활성 요청 수<br>_request으로 표시_ |
| **envoy.redis.downstream_cx_active** <br>(gauge) | \[Legacy\] 총 활성 연결 수<br>_connection으로 표시_ |
| **envoy.redis.downstream_cx_protocol_error** <br>(count) | \[Legacy\] 총 프로토콜 오류 수<br>_error로 표시_ |
| **envoy.redis.downstream_cx_rx_bytes_buffered** <br>(gauge) | \[Legacy\] 현재 버퍼링된 총 수신 바이트 수<br>_byte로 표시_ |
| **envoy.redis.downstream_cx_rx_bytes_total** <br>(count) | \[Legacy\] 수신된 총 바이트 수<br>_byte로 표시_ |
| **envoy.redis.downstream_cx_total** <br>(count) | \[Legacy\] 총 연결 수<br>_ connection으로 표시_ |
| **envoy.redis.downstream_cx_tx_bytes_buffered** <br>(gauge) | \[Legacy\] 현재 버퍼링된 총 전송 바이트 수<br>_byte로 표시_ |
| **envoy.redis.downstream_cx_tx_bytes_total** <br>(count) | \[Legacy\] 전송된 총 바이트 수<br>_byte로 표시_ |
| **envoy.redis.downstream_cx_drain_close** <br>(count) | \[Legacy\] 드레이닝으로 인해 종료된 연결 수<br>_connection으로 표시_ |
| **envoy.redis.downstream_rq_active** <br>(gauge) | \[Legacy\] 총 활성 요청 수<br>_request로 표시_ |
| **envoy.redis.downstream_rq_total** <br>(count) | \[Legacy\] 총 요청 수<br>_request로 표시_ |
| **envoy.redis.splitter.invalid_request** <br>(count) | \[Legacy\] 잘못된 인수 개수를 가진 요청 수<br>_request로 표시_ |
| **envoy.redis.splitter.unsupported_command** <br>(count) | \[Legacy\] 명령 분할기가 인식하지 못한 명령 수<br>_operation으로 표시_ |
| **envoy.redis.command.total** <br>(count) | \[Legacy\] 명령 수<br>_operation으로 표시_ |
| **envoy.redis.command.success** <br>(count) | \[Legacy\] 성공적으로 실행된 명령 수<br>_operation으로 표시_ |
| **envoy.redis.command.error** <br>(count) | \[Legacy\] 부분적 또는 완전한 오류 응답을 반환한 명령 수<br>_operation으로 표시_ |
| **envoy.redis.command.latency.0percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 0백분위수<br>_millisecond로 표시_ |
| **envoy.redis.command.latency.25percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 25백분위수<br>_millisecond로 표시_ |
| **envoy.redis.command.latency.50percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 50백분위수<br>_millisecond로 표시_ |
| **envoy.redis.command.latency.75percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 75백분위수<br>_millisecond로 표시_ |
| **envoy.redis.command.latency.90percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 90백분위수<br>_millisecond로 표시_ |
| **envoy.redis.command.latency.95percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 95백분위수<br>_millisecond로 표시_ |
| **envoy.redis.command.latency.99percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 99백분위수<br>_millisecond로 표시_ |
| **envoy.redis.command.latency.99_9percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 99.9백분위수<br>_Smillisecond로 표시_ |
| **envoy.redis.command.latency.100percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 100백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.decoding_error** <br>(count) | \[Legacy\] MongoDB 프로토콜 디코딩 오류 수<br>_error로 표시_ |
| **envoy.mongo.delay_injected** <br>(count) | \[Legacy\] 지연이 주입된 횟수<br>_occurrence로 표시_ |
| **envoy.mongo.op_get_more** <br>(count) | \[Legacy\] OP_GET_MORE 메시지 수<br>_message로 표시_ |
| **envoy.mongo.op_insert** <br>(count) | \[Legacy\] OP_INSERT 메시지 수<br>_message로 표시_ |
| **envoy.mongo.op_kill_cursors** <br>(count) | \[Legacy\] OP_KILL_CURSORS 메시지 수<br>_message로 표시_ |
| **envoy.mongo.op_query** <br>(count) | \[Legacy\] OP_QUERY 메시지 수<br>_message로 표시_ |
| **envoy.mongo.op_query_tailable_cursor** <br>(count) | \[Legacy\] tailable cursor 플래그가 설정된 OP_QUERY 수<br>_message로 표시_ |
| **envoy.mongo.op_query_no_cursor_timeout** <br>(count) | \[Legacy\] no cursor timeout 플래그가 설정된 OP_QUERY 수<br>_message로 표시_ |
| **envoy.mongo.op_query_await_data** <br>(count) | \[Legacy\] await data 플래그가 설정된 OP_QUERY 수<br>_message로 표시_ |
| **envoy.mongo.op_query_exhaust** <br>(count) | \[Legacy\] exhaust 플래그가 설정된 OP_QUERY 수<br>_message로 표시_ |
| **envoy.mongo.op_query_no_max_time** <br>(count) | \[Legacy\] maxTimeMS가 설정되지 않은 쿼리 수<br>_query로 표시_ |
| **envoy.mongo.op_query_scatter_get** <br>(count) | \[Legacy\] scatter get으로 처리된 쿼리 수<br>_query로 표시_ |
| **envoy.mongo.op_query_multi_get** <br>(count) | \[Legacy\] multi get으로 처리된 쿼리 수<br>_query로 표시_ |
| **envoy.mongo.op_query_active** <br>(gauge) | \[Legacy\] 활성 쿼리 수<br>_query로 표시_ |
| **envoy.mongo.op_reply** <br>(count) | \[Legacy\] OP_REPLY 메시지 수<br>_message로 표시_ |
| **envoy.mongo.op_reply_cursor_not_found** <br>(count) | \[Legacy\] cursor not found 플래그가 설정된 OP_REPLY 수 <br>_message로 표시_ |
| **envoy.mongo.op_reply_query_failure** <br>(count) | \[Legacy\] query failure 플래그가 설정된 OP_REPLY 수<br>_message로 표시_ |
| **envoy.mongo.op_reply_valid_cursor** <br>(count) | \[Legacy\] 유효한 커서가 있는 OP_REPLY 수<br>_message로 표시_ |
| **envoy.mongo.cx_destroy_local_with_active_rq** <br>(count) | \[Legacy\] 활성 쿼리 중에 로컬에서 종료된 연결<br>_connection으로 표시_ |
| **envoy.mongo.cx_destroy_remote_with_active_rq** <br>(count) | \[Legacy\] 활성 쿼리 중에 원격으로 종료된 연결<br>_connection으로 표시_ |
| **envoy.mongo.cx_drain_close** <br>(count) | \[Legacy\] 서버 드레인 중 응답 경계에서 정상적으로 종료된 연결<br>_connection으로 표시_ |
| **envoy.mongo.cmd.total** <br>(count) | \[Legacy\] 명령 수<br>_command로 표시_ |
| **envoy.mongo.collection.query.total** <br>(count) | \[Legacy\] 쿼리 수<br>_query로 표시_ |
| **envoy.mongo.collection.query.scatter_get** <br>(count) | \[Legacy\] scatter get 횟수 <br>_query로 표시_ |
| **envoy.mongo.collection.query.multi_get** <br>(count) | \[Legacy\] multi get 횟수<br>_query로 표시_ |
| **envoy.mongo.collection.callsite.query.total** <br>(count) | \[Legacy\] callsite 태그와 관련된 쿼리 수<br>_query로 표시_ |
| **envoy.mongo.collection.callsite.query.scatter_get** <br>(count) | \[Legacy\] callsite 태그에 발생한 scatter get 횟수<br>_query로 표시_ |
| **envoy.mongo.collection.callsite.query.multi_get** <br>(count) | \[Legacy\] callsite 태그에 발생한 multi get 횟수<br>_query로 표시_ |
| **envoy.listener.downstream_cx_total** <br>(count) | \[Legacy\] 총 연결 수<br>_ connection으로 표시_ |
| **envoy.listener.downstream_cx_destroy** <br>(count) | \[Legacy\] 총 종료된 연결 수<br>_connection으로 표시_ |
| **envoy.listener.downstream_cx_active** <br>(gauge) | \[Legacy\] 총 활성 연결 수<br>_connection으로 표시_ |
| **envoy.listener.downstream_pre_cx_active** <br>(gauge) | \[Legacy\] 현재 리스너 필터 처리가 진행 중인 소켓 수<br>_connection으로 표시_ |
| **envoy.listener.downstream_pre_cx_timeout** <br>(count) | \[Legacy\] 리스너 필터 처리 중 시간 초과된 소켓 수<br>_connection으로 표시_ |
| **envoy.listener.no_filter_chain_match** <br>(count) | \[Legacy\] 필터 체인과 일치하지 않는 총 연결 수<br>_connection으로 표시_ |
| **envoy.listener.server_ssl_socket_factory.downstream_context_secrets_not_ready** <br>(count) | \[Legacy\] 빈 SSL 인증서로 인해 리셋된 다운스트림 연결 수<br>_connection으로 표시_ |
| **envoy.listener.server_ssl_socket_factory.ssl_context_update_by_sds** <br>(count) | \[Legacy\] SSL 컨텍스트가 업데이트된 총 횟수|
| **envoy.listener.ssl.connection_error** <br>(count) | \[Legacy\] 인증서 확인 실패를 제외한 총 TLS 연결 오류 수<br>_error로 표시_ |
| **envoy.listener.ssl.handshake** <br>(count) | \[Legacy\] TLS 연결 핸드셰이크 성공 횟수<br>_success로 표시_ |
| **envoy.listener.ssl.session_reused** <br>(count) | \[Legacy\] TLS 세션 재개 성공 횟수<br>_success로 표시_ |
| **envoy.listener.ssl.no_certificate** <br>(count) | \[Legacy\] 클라이언트 인증서 없이 성공적으로 연결된 총 TLS 연결 수<br>_success로 표시_ |
| **envoy.listener.ssl.fail_no_sni_match** <br>(count) | \[Legacy\] SNI 일치 항목 누락으로 인해 거부된 총 TLS 연결 수<br>_connection으로 표시_ |
| **envoy.listener.ssl.fail_verify_no_cert** <br>(count) | \[Legacy\] 클라이언트 인증서 누락으로 인해 실패한 총 TLS 연결 수<br>_connection으로 표시_ |
| **envoy.listener.ssl.fail_verify_error** <br>(count) | \[Legacy\] CA 검증에 실패한 총 TLS 연결 수<br>_connection으로 표시_ |
| **envoy.listener.ssl.fail_verify_san** <br>(count) | \[Legacy\] SAN 검증에 실패한 총 TLS 연결 수<br>_connection으로 표시_ |
| **envoy.listener.ssl.fail_verify_cert_hash** <br>(count) | \[Legacy\] 인증서 고정 검증에 실패한 총 TLS 연결 수<br>_connection으로 표시_ |
| **envoy.listener.ssl.ciphers** <br>(count) | \[Legacy\] Cipher 태그를 사용한 총 TLS 연결 수<br>_connection으로 표시_ |
| **envoy.listener.ssl.versions** <br>(count) | \[Legacy\] 프로토콜 버전 태그를 사용하여 성공한 TLS 연결 총 개수<br>_connection으로 표시_ |
| **envoy.listener.ssl.curves** <br>(count) | \[Legacy\] ECDHE 커브 태그를 사용하여 성공한 TLS 연결의 총 수<br>_connection으로 표시_ |
| **envoy.listener.ssl.sigalgs** <br>(count) | \[Legacy\] 서명 알고리즘 Sigalg 태그를 사용하여 성공한 TLS 연결 총 수<br>_connection으로 표시_ |
| **envoy.listener_manager.listener_added** <br>(count) | \[Legacy\] (정적 설정 또는 LDS를 통해) 추가된 총 리스너 수<br>_host로 표시_ |
| **envoy.listener_manager.listener_modified** <br>(count) | \[Legacy\] (LDS를 통해) 수정된 리스너 수<br>_host로 표시_ |
| **envoy.listener_manager.listener_removed** <br>(count) | \[Legacy\] (LDS를 통해) 제거된 리스너 수<br>_host로 표시_ |
| **envoy.listener_manager.listener_create_success** <br>(count) | \[Legacy\] 워커에 성공적으로 추가된 리스너 객체의 총 개수<br>_host로 표시_ |
| **envoy.listener_manager.listener_create_failure** <br>(count) | \[Legacy\] 워커에 리스너 객체 추가 작업 실패 총 횟수<br>_host로 표시_ |
| **envoy.listener_manager.total_listeners_warming** <br>(gauge) | \[Legacy\] 현재 워밍 중인 리스너 수<br>_host로 표시_ |
| **envoy.listener_manager.total_listeners_active** <br>(gauge) | \[Legacy\] 현재 활성 상태인 리스너 수<br>_host로 표시_ |
| **envoy.listener_manager.total_listeners_draining** <br>(gauge) | \[Legacy\] 현재 드레이닝 상태인 리스너 수<br>_host로 표시_ |
| **envoy.listener_manager.lds.config_reload** <br>(count) | \[Legacy\] 다른 구성으로 인해 구성이 다시 로드된 총 API 요청 횟수<br>_request로 표시_ |
| **envoy.listener_manager.lds.update_attempt** <br>(count) | \[Legacy\] 총 API 가져오기 시도 횟수<br>_request로 표시_ |
| **envoy.listener_manager.lds.update_success** <br>(count) | \[Legacy\] 성공적으로 완료된 API 가져오기 횟수<br>_request로 표시_ |
| **envoy.listener_manager.lds.update_failure** <br>(count) | \[Legacy\] 네트워크 오류로 인해 실패한 API 가져오기 총 횟수<br>_request로 표시_ |
| **envoy.listener_manager.lds.update_rejected** <br>(count) | \[Legacy\] 스키마/유효성 검증 오류로 인해 실패한 API 가져오기 총 횟수<br>_request로 표시_ |
| **envoy.listener_manager.lds.update_time** <br>(gauge) | \[Legacy\] 마지막으로 API 데이터 가져오기에 성공한 시점의 타임스탬프(에포크 이후 밀리초 단위)<br>_millisecond로 표시_ |
| **envoy.listener_manager.lds.version** <br>(gauge) | \[Legacy\] 마지막으로 성공적으로 API에서 가져온 콘텐츠의 해시값<br>_item으로 표시_ |
| **envoy.listener_manager.lds.control_plane.connected_state** <br>(gauge) | \[Legacy\] 관리 서버와의 현재 연결 상태를 나타내는 부울 값(연결됨: 1, 연결 끊김: 0)<br>_connection으로 표시_ |
| **envoy.listener_manager.lds.control_plane.pending_requests** <br>(gauge) | \[Legacy\] 속도 제한이 적용되었을 때 대기 중인 총 요청 수<br>_request로 표시_ |
| **envoy.listener_manager.lds.control_plane.rate_limit_enforced** <br>(count) | \[Legacy\] 관리 서버 요청에 대해 속도 제한이 적용된 총 횟수<br>_occurrence로 표시_ |
| **envoy.http.downstream_cx_total** <br>(count) | \[Legacy\] 총 연결 수<br>_ connection으로 표시_ |
| **envoy.http.downstream_cx_ssl_total** <br>(count) | \[Legacy\] 총 TLS 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_http1_total** <br>(count) | \[Legacy\] 총 HTTP/1.1 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_http2_total** <br>(count) | \[Legacy\] 총 HTTP/2 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_http3_total** <br>(count) | \[Legacy\] \[API v3 전용\] 총 HTTP/3 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_websocket_total** <br>(count) | \[Legacy\] 총 WebSocket 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_destroy** <br>(count) | \[Legacy\] 총 종료된 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_destroy_remote** <br>(count) | \[Legacy\] 원격 종료로 인해 종료된 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_destroy_local** <br>(count) | \[Legacy\] 로컬 종료로 인해 종료된 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_destroy_active_rq** <br>(count) | \[Legacy\] 활성 요청이 있는 상태에서 종료된 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_destroy_local_active_rq** <br>(count) | \[Legacy\] 활성 요청이 있는 상태에서 로컬에서 종료된 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_destroy_remote_active_rq** <br>(count) | \[Legacy\] 활성 요청이 있는 상태에서 원격으로 종료된 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_active** <br>(gauge) | \[Legacy\] 총 활성 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_ssl_active** <br>(gauge) | \[Legacy\] 총 활성 TLS 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_http1_active** <br>(gauge) | \[Legacy\] 총 활성 HTTP/1.1 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_websocket_active** <br>(gauge) | \[Legacy\] 총 활성 WebSocket 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_http2_active** <br>(gauge) | \[Legacy\] 총 활성 HTTP/2 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_http3_active** <br>(gauge) | \[Legacy\] \[API v3 전용\] 총 활성 HTTP/3 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_protocol_error** <br>(count) | \[Legacy\] 총 프로토콜 오류 수<br>_error로 표시_ |
| **envoy.http.downstream_cx_rx_bytes_total** <br>(count) | \[Legacy\] 수신된 총 바이트 수<br>_byte로 표시_ |
| **envoy.http.downstream_cx_rx_bytes_buffered** <br>(gauge) | \[Legacy\] 현재 버퍼에 저장된 총 수신 바이트 수<br>_byte로 표시_ |
| **envoy.http.downstream_cx_tx_bytes_total** <br>(count) | \[Legacy\] 전송된 총 바이트 수<br>_byte로 표시_ |
| **envoy.http.downstream_cx_tx_bytes_buffered** <br>(gauge) | \[Legacy\] 현재 버퍼에 저장된 총 전송 바이트 수<br>_byte로 표시_ |
| **envoy.http.downstream_cx_drain_close** <br>(count) | \[Legacy\] 드레이닝으로 인해 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_cx_idle_timeout** <br>(count) | \[Legacy\] 유휴 타임아웃으로 인해 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.http.downstream_flow_control_paused_reading_total** <br>(count) | \[Legacy\] 흐름 제어로 인해 읽기 기능이 비활성화된 횟수<br>_occurrence로 표시_ |
| **envoy.http.downstream_flow_control_resumed_reading_total** <br>(count) | \[Legacy\] 흐름 제어로 인해 해당 연결에서 읽기 기능이 활성화된 횟수<br>_occurrence로 표시_ |
| **envoy.http.downstream_rq_total** <br>(count) | \[Legacy\] 총 요청 수<br>_request로 표시_ |
| **envoy.http.downstream_rq_http1_total** <br>(count) | \[Legacy\] 총 HTTP/1.1 요청 수<br>_request로 표시_ |
| **envoy.http.downstream_rq_http2_total** <br>(count) | \[Legacy\] 총 HTTP/2 요청 수<br>_request로 표시_ |
| **envoy.http.downstream_rq_http3_total** <br>(count) | \[Legacy\] \[API v3 전용\] 총 HTTP/3 요청 수<br>_request로 표시_ |
| **envoy.http.downstream_rq_active** <br>(gauge) | \[Legacy\] 총 활성 요청 수<br>_request로 표시_ |
| **envoy.http.downstream_rq_response_before_rq_complete** <br>(count) | \[Legacy\] 요청이 완료되기 전에 전송된 총 응답 수<br>_response로 표시_ |
| **envoy.http.downstream_rq_rx_reset** <br>(count) | \[Legacy\] 수신된 총 요청 리셋 수<br>_request로 표시_ |
| **envoy.http.downstream_rq_tx_reset** <br>(count) | \[Legacy\] 전송된 총 요청 리셋 수<br>_request로 표시_ |
| **envoy.http.downstream_rq_non_relative_path** <br>(count) | \[Legacy\] 상대 경로가 아닌 HTTP 경로를 포함한 총 요청 수<br>_request로 표시_ |
| **envoy.http.downstream_rq_too_large** <br>(count) | \[Legacy\] 너무 큰 본문 버퍼링으로 인해 413 오류가 발생한 총 요청 수<br>_request로 표시_ |
| **envoy.http.downstream_rq_1xx** <br>(count) | \[Legacy\] 총 1xx 응답 수<br>_response로 표시_ |
| **envoy.http.downstream_rq_2xx** <br>(count) | \[Legacy\] 총 2xx 응답 수<br>_response로 표시_ |
| **envoy.http.downstream_rq_3xx** <br>(count) | \[Legacy\] 총 3xx 응답 수<br>_response로 표시_ |
| **envoy.http.downstream_rq_4xx** <br>(count) | \[Legacy\] 총 4xx 응답 수<br>_response로 표시_ |
| **envoy.http.downstream_rq_5xx** <br>(count) | \[Legacy\] 총 5xx 응답 수<br>_response로 표시_ |
| **envoy.http.downstream_rq_ws_on_non_ws_route** <br>(count) | \[Legacy\] WebSocket 이외의 경로에서 거부된 총 WebSocket 업그레이드 요청 수<br>_request로 표시_ |
| **envoy.http.ext_proc.streams_started** <br>(count) | \[Legacy\] 외부 처리 서비스로 시작된 gRPC 스트림 총 개수|
| **envoy.http.ext_proc.stream_msgs_sent** <br>(count) | \[Legacy\] 해당 스트림에서 전송된 총 메시지 수<br>_message로 표시_ |
| **envoy.http.ext_proc.stream_msgs_received** <br>(count) | \[Legacy\] 해당 스트림에서 수신된 총 메시지 수<br>_message로 표시_ |
| **envoy.http.ext_proc.spurious_msgs_received** <br>(count) | \[Legacy\] 프로토콜을 위반하여 수신된 예상치 못한 메시지 총 개수<br>_message로 표시_ |
| **envoy.http.ext_proc.streams_closed** <br>(count) | \[Legacy\] 양쪽에서 성공적으로 종료된 스트림 총 개수|
| **envoy.http.ext_proc.streams_failed** <br>(count) | \[Legacy\] 스트림에서 gRPC 오류가 발생한 총 횟수|
| **envoy.http.ext_proc.failure_mode_allowed** <br>(count) | \[Legacy\] 구성으로 인해 무시된 총 오류 횟수<br>_response로 표시_ |
| **envoy.http.ext_proc.message_timeouts** <br>(count) | \[Legacy\] 설정된 제한 시간 내에 메시지에 대한 응답을 받지 못해 실패한 총 횟수<br>_message로 표시_ |
| **envoy.http.ext_proc.rejected_header_mutations** <br>(count) | \[Legacy\] 거부된 헤더 변경 총 횟수|
| **envoy.http.ext_proc.override_message_timeout_received** <br>(count) | \[Legacy\] 수신된 override_message_timeout 메시지 총 개수<br>_message로 표시_ |
| **envoy.http.ext_proc.override_message_timeout_ignored** <br>(count) | \[Legacy\] 무시된 override_message_timeout 메시지 총 개수<br>_message로 표시_ |
| **envoy.http.ext_proc.clear_route_cache_ignored** <br>(count) | \[Legacy\] 무시된 캐시 삭제 요청 총 개수<br>_request로 표시_ |
| **envoy.http.ext_proc.clear_route_cache_disabled** <br>(count) | \[Legacy\] 비활성화되지 않고 거부된 캐시 삭제 요청 총 개수<br>_request로 표시_ |
| **envoy.http.ext_proc.clear_route_cache_upstream_ignored** <br>(count) | \[Legacy\] 필터가 업스트림 모드여서 무시된 총 캐시 삭제 요청 횟수<br>_request로 표시_ |
| **envoy.http.ext_proc.send_immediate_resp_upstream_ignored** <br>(count) | \[Legacy\] 필터가 업스트림 모드여서 무시된 즉시 응답 메시지 총 개수<br>_request로 표시_ |
| **envoy.http.rbac_allowed.count** <br>(count) | \[OpenMetrics V2\] 접근이 허용된 총 요청 수<br>_request로 표시_ |
| **envoy.http.rbac_denied.count** <br>(count) | \[OpenMetrics V2\] 접근이 거부된 총 요청 수<br>_request로 표시_ |
| **envoy.http.rbac_shadow_allowed.count** <br>(count) | \[OpenMetrics V2\] 필터의 섀도우 규칙에 의해 접근이 허용될 총 요청 수<br>_request로 표시_ |
| **envoy.http.rbac_shadow_denied.count** <br>(count) | \[OpenMetrics V2\] 필터의 섀도우 규칙에 의해 접근이 거부될 총 요청 수<br>_request로 표시_ |
| **envoy.http.local_rate_limit_enabled.count** <br>(count) | \[OpenMetrics V2\] 레이트 리미터(Rate Limiter)가 조회된 총 요청 수<br>_request로 표시_ |
| **envoy.http.local_rate_limit_enforced.count** <br>(count) | \[OpenMetrics V2\] 속도 제한이 적용된 총 요청 수 (예: 429 응답 반환)<br>_request로 표시_ |
| **envoy.http.local_rate_limit_rate_limited.count** <br>(count) | \[OpenMetrics V2\] 토큰을 사용할 수 없는 총 응답 수 (반드시 강제 적용되지는 않음)<br>_request로 표시_ |
| **envoy.http.local_rate_limit_ok.count** <br>(count) | \[OpenMetrics V2\] 토큰 버킷에서 발생한 총 제한 미달 응답 수<br>_request로 표시_ |
| **envoy.http.rs_too_large** <br>(count) | \[Legacy\] 너무 큰 본문 버퍼링으로 인해 발생한 총 응답 오류 수<br>_error로 표시_ |
| **envoy.http.user_agent.downstream_cx_total** <br>(count) | \[Legacy\] 총 연결 수<br>_ connection으로 표시_ |
| **envoy.http.user_agent.downstream_cx_destroy_remote_active_rq** <br>(count) | \[Legacy\] 활성 요청이 있는 상태에서 원격으로 종료된 연결 수<br>_connection으로 표시_ |
| **envoy.http.user_agent.downstream_rq_total** <br>(count) | \[Legacy\] 총 요청 수<br>_request로 표시_ |
| **envoy.listener.http.downstream_rq_1xx** <br>(count) | \[Legacy\] 총 1xx 응답 수<br>_response로 표시_ |
| **envoy.listener.http.downstream_rq_2xx** <br>(count) | \[Legacy\] 총 2xx 응답 수<br>_response로 표시_ |
| **envoy.listener.http.downstream_rq_3xx** <br>(count) | \[Legacy\] 총 3xx 응답 수<br>_response로 표시_ |
| **envoy.listener.http.downstream_rq_4xx** <br>(count) | \[Legacy\] 총 4xx 응답 수<br>_response로 표시_ |
| **envoy.listener.http.downstream_rq_5xx** <br>(count) | \[Legacy\] 총 5xx 응답 수<br>_response로 표시_ |
| **envoy.listener.http.downstream_rq_completed** <br>(count) | \[Legacy\] 응답이 발생한 총 요청 수(예: 중단된 요청은 제외)<br>_response로 표시_ |
| **envoy.http2.rx_reset** <br>(count) | \[Legacy\] Envoy가 수신한 재설정 스트림 프레임 총 개수<br>_message로 표시_ |
| **envoy.http2.tx_reset** <br>(count) | \[Legacy\] Envoy가 전송한 재설정 스트림 프레임 총 개수<br>_message로 표시_ |
| **envoy.http2.header_overflow** <br>(count) | \[Legacy\] 헤더 크기가 63KB를 초과하여 재설정된 총 연결 수<br>_connection으로 표시_ |
| **envoy.http2.trailers** <br>(count) | \[Legacy\] 다운스트림으로부터 들어온 요청에서 감지된 총 트레일러 수<br>_item으로 표시_ |
| **envoy.http2.headers_cb_no_stream** <br>(count) | \[Legacy\] 연결된 스트림 없이 헤더 콜백이 호출된 총 오류 수. 원인 미상 버그로 발생한 예기치 않은 상황 추적<br>_error로 표시_ |
| **envoy.http2.too_many_header_frames** <br>(count) | \[Legacy\] HTTP2 연결이 너무 많은 헤더 프레임을 수신하여 재설정된 횟수. Envoy는 현재 최대 100-Continue용 헤더 프레임 1개, 100이 아닌 응답 코드 헤더 프레임 1개, 트레일러 포함 프레임 1개만 프록시합니다.<br>_occurrence로 표시_ |
| **envoy.cluster_manager.cluster_added** <br>(count) | \[Legacy\] (정적 구성 또는 CDS를 통해) 추가된 총 클러스터 수<br>_node로 표시_ |
| **envoy.cluster_manager.cluster_modified** <br>(count) | \[Legacy\] (CDS를 통해) 수정된 클러스터 수<br>_node로 표시_ |
| **envoy.cluster_manager.cluster_removed** <br>(count) | \[Legacy\] (CDS를 통해) 제거된 클러스터 수<br>_node로 표시_ |
| **envoy.cluster_manager.active_clusters** <br>(gauge) | \[Legacy\] 현재 활성화된(워밍이 완료된) 클러스터 수<br>_node로 표시_ |
| **envoy.cluster_manager.warming_clusters** <br>(gauge) | \[Legacy\] 현재 워밍 중(활성 상태가 아닌) 클러스터 수<br>_node로 표시_ |
| **envoy.cluster.assignment_stale** <br>(count) | \[Legacy\] 새 할당이 도착하기 전에 수신된 할당이 만료된 횟수|
| **envoy.cluster.assignment_timeout_received** <br>(count) | \[Legacy\] 엔드포인트 리스 정보와 함께 수신된 총 할당 수<br>_occurrence로 표시_ |
| **envoy.cluster.upstream_cx_total** <br>(count) | \[Legacy\] 총 연결 수<br>_ connection으로 표시_ |
| **envoy.cluster.upstream_cx_active** <br>(gauge) | \[Legacy\] 총 활성 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_http1_total** <br>(count) | \[Legacy\] 총 HTTP/1.1 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_http2_total** <br>(count) | \[Legacy\] 총 HTTP/2 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_http3_total** <br>(count) | \[Legacy\] \[API v3 전용\] 총 HTTP/3 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_connect_fail** <br>(count) | \[Legacy\] 총 연결 실패 수<br>_error로 표시_ |
| **envoy.cluster.upstream_cx_connect_timeout** <br>(count) | \[Legacy\] 총 연결 타임아웃 수<br>_timeout으로 표시_ |
| **envoy.cluster.upstream_cx_connect_attempts_exceeded** <br>(count) | \[Legacy\] 구성된 연결 시도 횟수를 초과하는 연속 연결 실패 횟수<br>_error로 표시_ |
| **envoy.cluster.upstream_cx_overflow** <br>(count) | \[Legacy\] 클러스터 연결 서킷 브레이커가 초과된 총 횟수<br>_occurrence로 표시_ |
| **envoy.cluster.upstream_cx_destroy** <br>(count) | \[Legacy\] 총 종료된 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_destroy_local** <br>(count) | \[Legacy\] 로컬에서 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_destroy_remote** <br>(count) | \[Legacy\] 원격으로 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_destroy_with_active_rq** <br>(count) | \[Legacy\] 활성 요청이 있는 상태에서 종료된 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_destroy_local_with_active_rq** <br>(count) | \[Legacy\] 활성 요청이 있는 상태에서 로컬에서 종료된 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_destroy_remote_with_active_rq** <br>(count) | \[Legacy\] 활성 요청이 있는 상태에서 원격으로 종료된 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_close_notify** <br>(count) | \[Legacy\] HTTP/1.1 연결 종료 헤더 또는 HTTP/2 GOAWAY1을 통해 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_rx_bytes_total** <br>(count) | \[Legacy\] 수신된 연결 바이트 수<br>_byte로 표시_ |
| **envoy.cluster.upstream_cx_rx_bytes_buffered** <br>(gauge) | \[Legacy\] 현재 버퍼에 저장된 수신된 연결 바이트 수<br>_byte로 표시_ |
| **envoy.cluster.upstream_cx_tx_bytes_total** <br>(count) | \[Legacy\] 전송된 총 연결 바이트 수<br>_byte로 표시_ |
| **envoy.cluster.upstream_cx_tx_bytes_buffered** <br>(gauge) | \[Legacy\] 현재 버퍼에 저장된 전송 연결 바이트 수<br>_byte로 표시_ |
| **envoy.cluster.upstream_cx_protocol_error** <br>(count) | \[Legacy\] 총 연결 프로토콜 오류 수<br>_error로 표시_ |
| **envoy.cluster.upstream_cx_max_requests** <br>(count) | \[Legacy\] 최대 요청 수로 인해 종료된 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_none_healthy** <br>(count) | \[Legacy\] 호스트가 정상 작동하지 않아 연결이 설정되지 않은 총 횟수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_idle_timeout** <br>(count) | \[Legacy\] 총 연결 유휴 타임아웃 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_cx_pool_overflow** <br>(count) | \[Legacy\] 클러스터 연결 풀 서킷 브레이커가 초과된 총 횟수|
| **envoy.cluster.upstream_rq_total** <br>(count) | \[Legacy\] 총 요청 수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_active** <br>(gauge) | \[Legacy\] 총 활성 요청 수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_pending_total** <br>(count) | \[Legacy\] 커넥션 풀 연결 연결 대기 중인 총 요청 수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_pending_overflow** <br>(count) | \[Legacy\] 연결 풀 서킷 차단을 초과하여 실패한 총 요청 수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_pending_failure_eject** <br>(count) | \[Legacy\] 커넥션 풀 연결 실패로 인해 실패한 총 요청 수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_pending_active** <br>(gauge) | \[Legacy\] 커넥션 풀 연결 대기 중인 총 활성 요청 수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_cancelled** <br>(count) | \[Legacy\] 커넥션 풀 연결을 얻기 전에 취소된 총 요청 수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_maintenance_mode** <br>(count) | \[Legacy\] 유지보수 모드로 인해 즉시 503 오류가 발생한 총 요청 수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_max_duration_reached** <br>(count) | \[Legacy\] 최대 지속 시간 초과로 인해 종료된 총 요청 수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_timeout** <br>(count) | \[Legacy\] 응답을 기다리다 시간 초과된 총 요청 수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_per_try_timeout** <br>(count) | \[Legacy\] 시도별 타임아웃에 도달한 총 요청 수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_rx_reset** <br>(count) | \[Legacy\] 원격으로 재설정된 총 요청 수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_tx_reset** <br>(count) | \[Legacy\] 로컬에서 재설정된 총 요청 수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_retry** <br>(count) | \[Legacy\] 총 요청 재시도 횟수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_retry_success** <br>(count) | \[Legacy\] 총 요청 재시도 성공 횟수<br>_request로 표시_ |
| **envoy.cluster.upstream_rq_retry_overflow** <br>(count) | \[Legacy\] 서킷 차단으로 인해 재시도되지 않은 총 요청 수<br>_request로 표시_ |
| **envoy.cluster.upstream_internal_redirect_failed_total** <br>(count) | \[Legacy\] 내부 리디렉션 실패로 인해 리디렉션이 다운스트림으로 전달된 총 횟수|
| **envoy.cluster.upstream_internal_redirect_succeeded_total** <br>(count) | \[Legacy\] 내부 리디렉션으로 인해 두 번째 업스트림 요청이 발생한 횟수|
| **envoy.cluster.client_ssl_socket_factory.ssl_context_update_by_sds** <br>(count) | \[Legacy\] 업데이트 된 SSL 컨텍스트 총 개수|
| **envoy.cluster.client_ssl_socket_factory.upstream_context_secrets_not_ready** <br>(count) | \[Legacy\] 빈 SSL 인증서로 인해 리셋된 업스트림 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.ssl.connection_error** <br>(count) | \[Legacy\] 인증서 확인 실패를 제외한 총 TLS 연결 오류 수<br>_error로 표시_ |
| **envoy.cluster.ssl.handshake** <br>(count) | \[Legacy\] TLS 연결 핸드셰이크 성공 횟수<br>_success로 표시_ |
| **envoy.cluster.ssl.session_reused** <br>(count) | \[Legacy\] TLS 세션 재개 성공 횟수<br>_success로 표시_ |
| **envoy.cluster.ssl.no_certificate** <br>(count) | \[Legacy\] 클라이언트 인증서 없이 성공적으로 연결된 총 TLS 연결 수<br>_success로 표시_ |
| **envoy.cluster.ssl.fail_no_sni_match** <br>(count) | \[Legacy\] SNI 일치 항목 누락으로 인해 거부된 총 TLS 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.ssl.fail_verify_no_cert** <br>(count) | \[Legacy\] 클라이언트 인증서 누락으로 인해 실패한 총 TLS 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.ssl.fail_verify_error** <br>(count) | \[Legacy\] CA 검증에 실패한 총 TLS 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.ssl.fail_verify_san** <br>(count) | \[Legacy\] SAN 검증에 실패한 총 TLS 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.ssl.fail_verify_cert_hash** <br>(count) | \[Legacy\] 인증서 고정 검증에 실패한 총 TLS 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.ssl.ciphers** <br>(count) | \[Legacy\] Cipher 태그를 사용한 총 TLS 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.ssl.versions** <br>(count) | \[Legacy\] 프로토콜 버전 태그를 사용하여 성공한 TLS 연결 총 개수<br>_connection으로 표시_ |
| **envoy.cluster.ssl.curves** <br>(count) | \[Legacy\] ECDHE 커브 태그를 사용하여 성공한 TLS 연결의 총 수<br>_connection으로 표시_ |
| **envoy.cluster.ssl.sigalgs** <br>(count) | \[Legacy\] 서명 알고리즘 sigalg 태그를 사용하여 성공한 TLS 연결 총 수<br>_connection으로 표시_ |
| **envoy.cluster.upstream_flow_control_paused_reading_total** <br>(count) | \[Legacy\] 흐름 제어가 업스트림에서 읽기를 일시 중지한 총 횟수<br>_occurrence로 표시_ |
| **envoy.cluster.upstream_flow_control_resumed_reading_total** <br>(count) | \[Legacy\] 흐름 제어가 업스트림으로부터의 읽기를 재개한 총 횟수<br>_occurrence로 표시_ |
| **envoy.cluster.upstream_flow_control_resumed_reading.count** <br>(count) | \[OpenMetrics V2\] 흐름 제어가 업스트림으로부터의 읽기를 재개한 총 횟수<br>_ occurrence로 표시_ |
| **envoy.cluster.upstream_flow_control_backed_up_total** <br>(count) | \[Legacy\] 업스트림 연결이 정체되어 다운스트림 읽기를 일시 중단한 총 횟수<br>_occurrence로 표시_ |
| **envoy.cluster.upstream_flow_control_drained_total** <br>(count) | \[Legacy\] 업스트림 연결 정체가 해소되어 다운스트림 읽기를 재개한 총 횟수<br>_occurrence로 표시_ |
| **envoy.cluster.membership_change** <br>(count) | \[Legacy\] 총 클러스터 멤버십 변경 사항<br>_event로 표시_ |
| **envoy.cluster.membership_degraded** <br>(gauge) | \[Legacy\] 현재 성능 저하 상태인 클러스터 수<br>_node로 표시_ |
| **envoy.cluster.membership_excluded** <br>(gauge) | \[Legacy\] 현재 클러스터 멤버십에서 제외된 노드 수<br>_node로 표시_ |
| **envoy.cluster.membership_healthy** <br>(gauge) | \[Legacy\] 현재 클러스터에서 정상 상태인 총 노드 수(상태 점검과 이상치 탐지 모두 포함)<br>_node로 표시_ |
| **envoy.cluster.membership_total** <br>(gauge) | \[Legacy\] 현재 클러스터 멤버십 총 수<br>_node로 표시_ |
| **envoy.cluster.retry_or_shadow_abandoned** <br>(count) | \[Legacy\] 버퍼 제한으로 인해 섀도잉 또는 재시도 버퍼링이 취소된 총 횟수<br>_occurrence로 표시_ |
| **envoy.cluster.config_reload** <br>(count) | \[Legacy\] 다른 구성으로 인해 구성이 다시 로드된 총 API 요청 횟수<br>_request로 표시_ |
| **envoy.cluster.update_attempt** <br>(count) | \[Legacy\] 총 클러스터 멤버십 업데이트 시도 횟수<br>_occurrence로 표시_ |
| **envoy.cluster.update_success** <br>(count) | \[Legacy\] 클러스터 멤버십 업데이트 총 성공 횟수<br>_success로 표시_ |
| **envoy.cluster.update_failure** <br>(count) | \[Legacy\] 클러스터 멤버십 업데이트 총 실패 횟수<br>_error로 표시_ |
| **envoy.cluster.update_no_rebuild** <br>(count) | \[Legacy\] 클러스터 로드 밸런싱 구조를 재구축하지 않고 성공적으로 완료된 클러스터 멤버십 업데이트 총 수<br>_occurrence로 표시_ |
| **envoy.cluster.version** <br>(gauge) | \[Legacy\] 마지막으로 성공적으로 API에서 가져온 콘텐츠의 해시값<br>_item으로 표시_ |
| **envoy.cluster.max_host_weight** <br>(gauge) | \[Legacy\] 클러스터 내 모든 호스트의 최대 가중치<br>_item으로 표시_ |
| **envoy.cluster.bind_errors** <br>(count) | \[Legacy\] 소켓을 구성된 소스 주소에 바인딩하는 동안 발생한 총 오류 수<br>_error로 표시_ |
| **envoy.cluster.health_check.attempt** <br>(count) | \[Legacy\] 상태 점검 수<br>_check_ |
| **envoy.cluster.health_check.success** <br>(count) | \[Legacy\] 성공적으로 완료된 상태 점검 수<br>_check로 표시_ |
| **envoy.cluster.health_check.failure** <br>(count) | \[Legacy\] 즉시 실패한 상태 점검 횟수(예: HTTP 503) 및 네트워크 오류 횟수<br>_check로 표시_ |
| **envoy.cluster.health_check.passive_failure** <br>(count) | \[Legacy\] 수동 이벤트(예: x-envoy-immediate-health-check-fail)로 인한 상태 점검 실패 횟수<br>_check로 표시_ |
| **envoy.cluster.health_check.network_failure** <br>(count) | \[Legacy\] 네트워크 오류로 인한 상태 점검 실패 횟수<br>_check로 표시_ |
| **envoy.cluster.health_check.verify_cluster** <br>(count) | \[Legacy\] 클러스터 이름 확인을 시도한 상태 점검 횟수<br>_check로 표시_ |
| **envoy.cluster.health_check.healthy** <br>(gauge) | \[Legacy\] 상태가 양호한 멤버 수<br>_check로 표시_ |
| **envoy.cluster.http1.dropped_headers_with_underscores** <br>(count) | \[Legacy\] 이름에 밑줄이 포함되어 있어 드롭된 헤더 총 개수. 이 작업은 headers_with_underscores_action 설정으로 구성됩니다.|
| **envoy.cluster.http1.metadata_not_supported_error** <br>(count) | \[Legacy\] HTTP/1 인코딩 중 드롭된 메타데이터 총 개수|
| **envoy.cluster.http1.response_flood** <br>(count) | \[Legacy\] 응답 폭주로 인해 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.http1.requests_rejected_with_underscores_in_headers** <br>(count) | \[Legacy\] 헤더 이름에 밑줄이 포함되어 거부된 총 요청 수. 이 작업은 headers_with_underscores_action 설정으로 구성됩니다.<br>_request로 표시_ |
| **envoy.cluster.http2.header_overflow** <br>(count) | \[Legacy\] 헤더 크기가 63KB를 초과하여 재설정된 총 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.http2.inbound_empty_frames_flood** <br>(count) | \[Legacy\] 페이로드가 비어 있고 종료 스트림 플래그가 없는 연속 수신 프레임 수 제한을 초과하여 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.http2.inbound_priority_frames_flood** <br>(count) | \[Legacy\] PRIORITY 유형의 수신 프레임 제한을 초과하여 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.http2.inbound_window_update_frames_flood** <br>(count) | \[Legacy\] WINDOW_UPDATE 유형의 수신 프레임 제한을 초과하여 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.http2.outbound_control_flood** <br>(count) | \[Legacy\] PING/SETTINGS/RST_STREAM 유형의 송신 프레임 제한을 초과하여 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.http2.outbound_flood** <br>(count) | \[Legacy\] 모든 유형의 송신 프레임 제한을 초과하여 종료된 총 연결 수<br>_connection으로 표시_ |
| **envoy.cluster.http2.headers_cb_no_stream** <br>(count) | \[Legacy\] 연결된 스트림 없이 헤더 콜백이 호출된 총 오류 수. 원인 미상 버그로 발생한 예기치 않은 상황 추적<br>_error로 표시_ |
| **envoy.cluster.http2.rx_messaging_error** <br>(count) | \[Legacy\] HTTP/2 사양의 8항을 위반한 무효 수신 프레임 총 개수<br>_item으로 표시_ |
| **envoy.cluster.http2.rx_reset** <br>(count) | \[Legacy\] Envoy가 수신한 재설정 스트림 프레임 총 개수<br>_message로 표시_ |
| **envoy.cluster.http2.too_many_header_frames** <br>(count) | \[Legacy\] HTTP2 연결이 너무 많은 헤더 프레임을 수신하여 재설정된 횟수. Envoy는 현재 최대 100-Continue용 헤더 프레임 1개, 100이 아닌 응답 코드 헤더 프레임 1개, 트레일러 포함 프레임 1개만 프록시합니다.<br>_occurrence로 표시_ |
| **envoy.cluster.http2.trailers** <br>(count) | \[Legacy\] 다운스트림으로부터 들어온 요청에서 감지된 총 트레일러 수<br>_item으로 표시_ |
| **envoy.cluster.http2.tx_reset** <br>(count) | \[Legacy\] Envoy가 전송한 재설정 스트림 프레임 총 개수<br>_message로 표시_ |
| **envoy.cluster.http2.stream_refused_errors.count** <br>(count) | \[OpenMetrics V2\] Envoy가 REFUSED_STREAM 오류 코드와 함께 수신한 무효 프레임 총 개수|
| **envoy.cluster.original_dst_host_invalid** <br>(count) | \[Legacy\] 원래 대상 로드 밸런서로 전달된 유효하지 않은 호스트 총 개수|
| **envoy.cluster.outlier_detection.ejections_enforced_total** <br>(count) | \[Legacy\] 이상치 유형으로 인한 강제 배출 건수|
| **envoy.cluster.outlier_detection.ejections_active** <br>(gauge) | \[OpenMetrics V2 및 Legacy\] 현재 배출된 호스트 수|
| **envoy.cluster.outlier_detection.ejections_overflow** <br>(count) | \[Legacy\] 최대 배출률로 인해 중단된 배출 횟수|
| **envoy.cluster.outlier_detection.ejections_enforced_consecutive_5xx** <br>(count) | \[Legacy\] 강제 연속 5xx 배출 횟수|
| **envoy.cluster.outlier_detection.ejections_detected_consecutive_5xx** <br>(count) | \[Legacy\]  감지된 연속 5xx 배출 횟수(실제 적용되지 않은 경우도 포함)|
| **envoy.cluster.outlier_detection.ejections_enforced_success_rate** <br>(count) | \[Legacy\] 강제 적용된 성공률 기반 이상치 배출 횟수|
| **envoy.cluster.outlier_detection.ejections_detected_success_rate** <br>(count) | \[Legacy\] 감지된 성공률 기반 이상치 배출 횟수(실제 적용되지 않은 경우도 포함)|
| **envoy.cluster.outlier_detection.ejections_enforced_consecutive_gateway_failure** <br>(count) | \[Legacy\] 강제 적용된 연속 게이트웨이 오류 배출 횟수|
| **envoy.cluster.outlier_detection.ejections_detected_consecutive_gateway_failure** <br>(count) | \[Legacy\] 감지된 연속 게이트웨이 실패 배출 횟수(실제 적용되지 않은 경우도 포함)|
| **envoy.cluster.outlier_detection.ejections_enforced_consecutive_local_origin_failure** <br>(count) | \[Legacy\] 강제 적용된 연속 로컬 오리진 오류 배출 횟수|
| **envoy.cluster.outlier_detection.ejections_detected_consecutive_local_origin_failure** <br>(count) | \[Legacy\] 감지된 연속 로컬 오리진 실패 배출 횟수(실제 적용되지 않은 경우도 포함)|
| **envoy.cluster.outlier_detection.ejections_enforced_local_origin_success_rate** <br>(count) | \[Legacy\] 강제 적용된 로컬 오리진 성공률 기반 배출 횟수|
| **envoy.cluster.outlier_detection.ejections_detected_local_origin_success_rate** <br>(count) | \[Legacy\] 감지된 로컬 오리진 성공률 기반 배출 횟수(실제 적용되지 않은 경우도 포함)|
| **envoy.cluster.outlier_detection.ejections_enforced_failure_percentage** <br>(count) | \[Legacy\] 강제 적용된 실패율 기반 배출 횟수|
| **envoy.cluster.outlier_detection.ejections_detected_failure_percentage** <br>(count) | \[Legacy\] 감지된 실패율 기반 배출 횟수(실제 적용되지 않은 경우도 포함)|
| **envoy.cluster.outlier_detection.ejections_enforced_failure_percentage_local_origin** <br>(count) | \[Legacy\] 강제 적용된 로컬 오리진 실패율 기반 배출 횟수|
| **envoy.cluster.outlier_detection.ejections_detected_failure_percentage_local_origin** <br>(count) | \[Legacy\] 감지된 로컬 오리진 실패율 기반 배출 횟수(실제 적용되지 않은 경우도 포함)|
| **envoy.cluster.circuit_breakers.cx_open** <br>(gauge) | \[Legacy\] 연결 서킷 브레이커가 닫혀 있는지(0) 또는 열려 있는지(1) 여부|
| **envoy.cluster.circuit_breakers.cx_pool_open** <br>(gauge) | \[Legacy\] 연결 풀 서킷 브레이커가 닫혀 있는지(0) 또는 열려 있는지(1) 여부|
| **envoy.cluster.circuit_breakers.rq_pending_open** <br>(gauge) | \[Legacy\] 대기 요청 서킷 브레이커가 닫혀 있는지(0) 또는 열려 있는지(1) 여부|
| **envoy.cluster.circuit_breakers.rq_open** <br>(gauge) | \[Legacy\] 요청 서킷 브레이커가 닫혀 있는지(0) 또는 열려 있는지(1) 여부|
| **envoy.cluster.circuit_breakers.rq_retry_open** <br>(gauge) | \[Legacy\] 재시도 서킷 브레이커가 닫혀 있는지(0) 또는 열려 있는지(1) 여부|
| **envoy.cluster.circuit_breakers.remaining_cx** <br>(gauge) | \[Legacy\] 서킷 브레이커가 열리기까지 남은 연결 수|
| **envoy.cluster.circuit_breakers.remaining_pending** <br>(gauge) | \[Legacy\] 서킷 브레이커가 열리기 전까지 남은 대기 요청 수|
| **envoy.cluster.circuit_breakers.remaining_rq** <br>(gauge) | \[Legacy\] 서킷 브레이커가 열리기 전까지 남은 요청 수|
| **envoy.cluster.circuit_breakers.remaining_retries** <br>(gauge) | \[Legacy\] 서킷 브레이커가 열리기 전까지 남은 재시도 수|
| **envoy.cluster.upstream_rq_completed** <br>(count) | \[Legacy\] 완료된 총 업스트림 요청 수<br>_response로 표시_ |
| **envoy.cluster.upstream_rq_1xx** <br>(count) | \[Legacy\] HTTP 1xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.upstream_rq_2xx** <br>(count) | \[Legacy\] HTTP 2xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.upstream_rq_3xx** <br>(count) | \[Legacy\] HTTP 3xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.upstream_rq_4xx** <br>(count) | \[Legacy\] HTTP 4xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.upstream_rq_5xx** <br>(count) | \[Legacy\] HTTP 5xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.canary.upstream_rq_completed** <br>(count) | \[Legacy\] 완료된 총 업스트림 카나리 요청 수<br>_response로 표시_ |
| **envoy.cluster.canary.upstream_rq_1xx** <br>(count) | \[Legacy\] 업스트림 카나리 HTTP 1xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.canary.upstream_rq_2xx** <br>(count) | \[Legacy\] 업스트림 카나리 HTTP 2xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.canary.upstream_rq_3xx** <br>(count) | \[Legacy\] 업스트림 카나리 HTTP 3xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.canary.upstream_rq_4xx** <br>(count) | \[Legacy\] 업스트림 카나리 HTTP 4xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.canary.upstream_rq_5xx** <br>(count) | \[Legacy\] 업스트림 카나리 HTTP 5xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.internal.upstream_rq_completed** <br>(count) | \[Legacy\] 완료된 총 내부 오리진 요청 수<br>_response로 표시_ |
| **envoy.cluster.internal.upstream_rq_1xx** <br>(count) | \[Legacy\] 내부 오리진 HTTP 1xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.internal.upstream_rq_2xx** <br>(count) | \[Legacy\] 내부 오리진 HTTP 2xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.internal.upstream_rq_3xx** <br>(count) | \[Legacy\] 내부 오리진 HTTP 3xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.internal.upstream_rq_4xx** <br>(count) | \[Legacy\] 내부 오리진 HTTP 4xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.internal.upstream_rq_5xx** <br>(count) | \[Legacy\] 내부 오리진 HTTP 5xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.external.upstream_rq_completed** <br>(count) | \[Legacy\] 완료된 총 외부 오리진 요청 수<br>_response로 표시_ |
| **envoy.cluster.external.upstream_rq_1xx** <br>(count) | \[Legacy\] 외부 오리진 HTTP 1xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.external.upstream_rq_2xx** <br>(count) | \[Legacy\] 외부 오리진 HTTP 2xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.external.upstream_rq_3xx** <br>(count) | \[Legacy\] 외부 오리진 HTTP 3xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.external.upstream_rq_4xx** <br>(count) | \[Legacy\] 외부 오리진 HTTP 4xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.external.upstream_rq_5xx** <br>(count) | \[Legacy\] 외부 오리진 HTTP 5xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.zone.upstream_rq_1xx** <br>(count) | \[Legacy\] HTTP 1xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.zone.upstream_rq_2xx** <br>(count) | \[Legacy\] HTTP 2xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.zone.upstream_rq_3xx** <br>(count) | \[Legacy\] HTTP 3xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.zone.upstream_rq_4xx** <br>(count) | \[Legacy\] HTTP 4xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.zone.upstream_rq_5xx** <br>(count) | \[Legacy\] HTTP 5xx 응답 코드 집계<br>_response로 표시_ |
| **envoy.cluster.lb_healthy_panic** <br>(count) | \[Legacy\] 패닉 모드 상태의 로드 밸런서를 통해 부하 분산된 총 요청 수<br>_request로 표시_ |
| **envoy.cluster.lb_zone_cluster_too_small** <br>(count) | \[Legacy\] 업스트림 클러스터 크기가 작아서 존(zone) 인식 라우팅이 적용되지 않음|
| **envoy.cluster.lb_zone_routing_all_directly** <br>(count) | \[Legacy\] 모든 요청을 동일한 존(zone)으로 직접 전송 |
| **envoy.cluster.lb_zone_routing_sampled** <br>(count) | \[Legacy\] 일부 요청을 동일한 존(zone)으로 전송|
| **envoy.cluster.lb_zone_routing_cross_zone** <br>(count) | \[Legacy\]  존 인식 라우팅 모드이지만, 존 간(Cross-Zone) 전송이 필요함|
| **envoy.cluster.lb_local_cluster_not_ok** <br>(count) | \[Legacy\] 로컬 호스트 세트가 설정되지 않았거나 로컬 클러스터가 패닉 모드입니다.|
| **envoy.cluster.lb_zone_number_differs** <br>(count) | \[OpenMetrics V2\] 로컬 클러스터와 업스트림 클러스터의 존(zone) 수가 다름|
| **envoy.cluster.lb_subsets_active** <br>(gauge) | \[Legacy\] 현재 사용 가능한 서브셋 수|
| **envoy.cluster.lb_subsets_created** <br>(count) | \[Legacy\] 생성된 서브셋 수|
| **envoy.cluster.lb_subsets_removed** <br>(count) | \[Legacy\] 호스트가 없어 제거된 서브셋 수|
| **envoy.cluster.lb_subsets_selected** <br>(count) | \[Legacy\] 부하 분산을 위해 서브셋이 선택된 횟수<br>_occurrence로 표시_ |
| **envoy.cluster.lb_subsets_fallback** <br>(count) | \[Legacy\] 폴백 정책이 호출된 횟수<br>_occurrence로 표시_ |
| **envoy.cluster.lb_subsets_fallback_panic** <br>(count) | \[Legacy\] 서브셋 패닉 모드가 트리거된 횟수<br>_occurrence로 표시_ |
| **envoy.cluster.update_empty** <br>(count) | \[Legacy\] 클러스터 멤버십 업데이트가 빈 클러스터 로드 할당으로 끝나고 이전 구성으로 계속되는 총 횟수<br>_occurrence로 표시_ |
| **envoy.cluster.lb_recalculate_zone_structures** <br>(count) | \[Legacy\] 업스트림 지역 선택에 대한 빠른 결정을 위해 지역 인식 라우팅 구조가 재생성되는 횟수<br>_occurrence로 표시_ |
| **envoy.cluster.lb_zone_no_capacity_left** <br>(count) | \[Legacy\] 반올림 오류로 인해 임의의 존 선택으로 종료된 총 횟수<br>_occurrence로 표시_ |
| **envoy.http.tracing.random_sampling** <br>(count) | \[Legacy\] 무작위 샘플링을 통해 추적 가능한 총 결정 수<br>_occurrence로 표시_ |
| **envoy.http.tracing.service_forced** <br>(count) | \[Legacy\] 서버 런타임 플래그 tracing.global_enabled로 추적 가능한 총 결정 수<br>_occurrence로 표시_ |
| **envoy.http.tracing.client_enabled** <br>(count) | \[Legacy\] 요청 헤더 x-envoy-force-trace로 추적 가능한 총 결정 수<br>_occurrence로 표시_ |
| **envoy.http.tracing.not_traceable** <br>(count) | \[Legacy\] 요청 ID 기준으로 추적 불가능한 총 결정 수<br>_occurrence로 표시_ |
| **envoy.http.tracing.health_check** <br>(count) | \[Legacy\] 상태 점검 기준으로 추적 불가능한 총 결정 수<br>_occurrence로 표시_ |
| **envoy.http.rq_direct_response** <br>(count) | \[Legacy\] 직접 응답으로 처리된 총 요청 수<br>_request로 표시_ |
| **envoy.stats.overflow** <br>(count) | \[Legacy\] 공유 메모리 부족으로 Envoy가 통계량을 할당할 수 없었던 총 횟수<br>_error로 표시_ |
| **envoy.server.uptime** <br>(gauge) | \[Legacy\] 현재 서버 가동 시간(초)<br>_second로 표시_ |
| **envoy.server.memory_allocated** <br>(gauge) | \[Legacy\] 현재 할당된 메모리 용량(바이트)<br>_byte로 표시_ |
| **envoy.server.memory_heap_size** <br>(gauge) | \[Legacy\] 현재 예약된 힙 크기(바이트)<br>_byte로 표시_ |
| **envoy.server.live** <br>(gauge) | \[Legacy\] 서버가 현재 드레이닝 중이 아니면 1, 그렇지 않으면 0<br>_occurrence로 표시_ |
| **envoy.server.parent_connections** <br>(gauge) | \[Legacy\] 핫 리스타트 시 이전 Envoy 프로세스의 총 연결 수<br>_connection으로 표시_ |
| **envoy.server.total_connections** <br>(gauge) | \[Legacy\] 신규 및 기존 Envoy 프로세스의 총 연결 수<br>_connection으로 표시_ |
| **envoy.server.version** <br>(gauge) | \[Legacy\] SCM 리비전 기반 정수형 버전 번호<br>_item으로 표시_ |
| **envoy.server.days_until_first_cert_expiring** <br>(gauge) | \[Legacy\] 관리 중인 다음 인증서가 만료될 때까지 남은 일수<br>_day로 표시_ |
| **envoy.server.concurrency** <br>(gauge) | \[Legacy\] 워커 스레드 수|
| **envoy.server.debug_assertion_failures** <br>(count) | \[Legacy\] -define log_debug_assert_in_release=enabled 옵션으로 컴파일 시 릴리스 빌드에서 감지된 디버그 어설션 실패 횟수, 그렇지 않은 경우 0|
| **envoy.server.hot_restart_epoch** <br>(gauge) | \[Legacy\] 현재 핫 리스타트 에포크|
| **envoy.server.state** <br>(gauge) | \[Legacy\] 서버 현재 상태|
| **envoy.server.watchdog_mega_miss** <br>(count) | \[Legacy\] 메가 미스 횟수|
| **envoy.server.watchdog_miss** <br>(count) | \[Legacy\] 표준 미스 횟수|
| **envoy.filesystem.write_buffered** <br>(count) | \[Legacy\] 파일 데이터가 Envoy의 내부 플러시 버퍼로 이동된 총 횟수<br>_occurrence로 표시_ |
| **envoy.filesystem.write_completed** <br>(count) | \[Legacy\] 파일이 기록된 총 횟수<br>_occurrence로 표시_ |
| **envoy.filesystem.flushed_by_timer** <br>(count) | \[Legacy\] 플러시 타임아웃으로 인해 내부 플러시 버퍼가 파일에 기록된 총 횟수<br>_ occurrence로 표시_ |
| **envoy.filesystem.reopen_failed** <br>(count) | \[Legacy\] 파일을 열지 못한 총 횟수<br>_occurrence로 표시_ |
| **envoy.filesystem.write_total_buffered** <br>(gauge) | \[Legacy\] 현재 내부 플러시 버퍼의 총 크기(바이트)<br>_byte로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 0백분위수<br>_millisecond로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 25백분위수<br>_millisecond로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 50백분위수<br>_millisecond로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 75백분위수<br>_millisecond로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 90백분위수<br>_millisecond로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 95백분위수<br>_millisecond로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 99백분위수<br>_millisecond로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 99.9백분위수<br>_millisecond로 표시_ |
| **envoy.vhost.vcluster.upstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 100백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] operation_name 태그에 소요된 시간 0백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] operation_name 태그에 소요된 시간 25백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] operation_name 태그에 소요된 시간 50백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] operation_name 태그에 소요된 시간 75백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] operation_name 태그에 소요된 시간 90백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] operation_name 태그에 소요된 시간 95백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] operation_name 태그에 소요된 시간 99백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] operation_name 태그에 소요된 시간 99.9백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] operation_name 태그에 소요된 시간 100백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.table.upstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] table_name 태그 테이블에 소요된 시간 0백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.table.upstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] table_name 태그 테이블에 소요된 시간 25백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.table.upstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] table_name 태그 테이블에 소요된 시간 50백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.table.upstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] table_name 태그 테이블에 소요된 시간 75백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.table.upstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] table_name 태그 테이블에 소요된 시간 90백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.table.upstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] table_name 태그 테이블에 소요된 시간 95백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.table.upstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] table_name 태그 테이블에 소요된 시간 99백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.table.upstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] table_name 태그 테이블에 소요된 시간 99.9백분위수<br>_millisecond로 표시_ |
| **envoy.http.dynamodb.table.upstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] table_name 태그 테이블에 소요된 시간 100백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.cmd.reply_num_docs.0percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 0백분위수<br>_document로 표시_ |
| **envoy.mongo.cmd.reply_num_docs.25percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 25백분위수<br>_document로 표시_ |
| **envoy.mongo.cmd.reply_num_docs.50percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 50백분위수<br>_document로 표시_ |
| **envoy.mongo.cmd.reply_num_docs.75percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 75백분위수<br>_document로 표시_ |
| **envoy.mongo.cmd.reply_num_docs.90percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 90백분위수<br>_document로 표시_ |
| **envoy.mongo.cmd.reply_num_docs.95percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 95백분위수<br>_document로 표시_ |
| **envoy.mongo.cmd.reply_num_docs.99percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 99백분위수<br>_document로 표시_ |
| **envoy.mongo.cmd.reply_num_docs.99_9percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 99.9백분위수<br>_document로 표시_ |
| **envoy.mongo.cmd.reply_num_docs.100percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 100백분위수<br>_document로 표시_ |
| **envoy.mongo.cmd.reply_size.0percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 0백분위수<br>_byte로 표시_ |
| **envoy.mongo.cmd.reply_size.25percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 25백분위수<br>_byte로 표시_ |
| **envoy.mongo.cmd.reply_size.50percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 50백분위수<br>_byte로 표시_ |
| **envoy.mongo.cmd.reply_size.75percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 75백분위수<br>_byte로 표시_ |
| **envoy.mongo.cmd.reply_size.90percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 90백분위수<br>_byte로 표시_ |
| **envoy.mongo.cmd.reply_size.95percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 95백분위수<br>_byte로 표시_ |
| **envoy.mongo.cmd.reply_size.99percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 99백분위수<br>_byte로 표시_ |
| **envoy.mongo.cmd.reply_size.99_9percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 99.9백분위수<br>_byte로 표시_ |
| **envoy.mongo.cmd.reply_size.100percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 100백분위수<br>_byte로 표시_ |
| **envoy.mongo.cmd.reply_time_ms.0percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 0백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.cmd.reply_time_ms.25percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 25백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.cmd.reply_time_ms.50percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 50백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.cmd.reply_time_ms.75percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 75백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.cmd.reply_time_ms.90percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 90백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.cmd.reply_time_ms.95percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 95백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.cmd.reply_time_ms.99percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 99백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.cmd.reply_time_ms.99_9percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 99.9백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.cmd.reply_time_ms.100percentile** <br>(gauge) | \[Legacy\] 명령 실행 시간(밀리초) 100백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.query.reply_num_docs.0percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 0백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.query.reply_num_docs.25percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 25백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.query.reply_num_docs.50percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 50백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.query.reply_num_docs.75percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 75백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.query.reply_num_docs.90percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 90백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.query.reply_num_docs.95percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 95백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.query.reply_num_docs.99percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 99백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.query.reply_num_docs.99_9percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 99.9백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.query.reply_num_docs.100percentile** <br>(gauge) | \[Legacy\] 응답 내 문서 수 100백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.query.reply_size.0percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 0백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.query.reply_size.25percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 25백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.query.reply_size.50percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 50백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.query.reply_size.75percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 75백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.query.reply_size.90percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 90백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.query.reply_size.95percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 95백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.query.reply_size.99percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 99백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.query.reply_size.99_9percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 99.9백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.query.reply_size.100percentile** <br>(gauge) | \[Legacy\] 응답 크기(바이트) 100백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.query.reply_time_ms.0percentile** <br>(gauge) | \[Legacy\] 쿼리 시간(밀리초) 0백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.query.reply_time_ms.25percentile** <br>(gauge) | \[Legacy\] 쿼리 시간(밀리초) 25백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.query.reply_time_ms.50percentile** <br>(gauge) | \[Legacy\] 쿼리 시간(밀리초) 50백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.query.reply_time_ms.75percentile** <br>(gauge) | \[Legacy\] 쿼리 시간(밀리초) 75백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.query.reply_time_ms.90percentile** <br>(gauge) | \[Legacy\] 쿼리 시간(밀리초) 90백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.query.reply_time_ms.95percentile** <br>(gauge) | \[Legacy\] 쿼리 시간(밀리초) 95백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.query.reply_time_ms.99percentile** <br>(gauge) | \[Legacy\] 쿼리 시간(밀리초) 99백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.query.reply_time_ms.99_9percentile** <br>(gauge) | \[Legacy\] 쿼리 시간(밀리초) 99.9백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.query.reply_time_ms.100percentile** <br>(gauge) | \[Legacy\] 쿼리 시간(밀리초) 100백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.0percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 내 문서 수 0백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.25percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 내 문서 수 25백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.50percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 내 문서 수 50백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.75percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 내 문서 수 75백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.90percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 내 문서 수 90백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.95percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 내 문서 수 95백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.99percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 내 문서 수 99백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.99_9percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 내 문서 수 99.9백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.100percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 내 문서 수 100백분위수<br>_document로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_size.0percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 크기(바이트) 0백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_size.25percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 크기(바이트) 25백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_size.50percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 크기(바이트) 50백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_size.75percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 크기(바이트) 75백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_size.90percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 크기(바이트) 90백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_size.95percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 크기(바이트) 95백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_size.99percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 크기(바이트) 99백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_size.99_9percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 크기(바이트) 99.9백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_size.100percentile** <br>(gauge) | \[Legacy\] callsite 태그별 응답 크기(바이트) 100백분위수<br>_byte로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.0percentile** <br>(gauge) | \[Legacy\] callsite 태그별 쿼리 시간(밀리초) 0백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.25percentile** <br>(gauge) | \[Legacy\] callsite 태그별 쿼리 시간(밀리초) 25백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.50percentile** <br>(gauge) | \[Legacy\] callsite 태그별 쿼리 시간(밀리초) 50백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.75percentile** <br>(gauge) | \[Legacy\] callsite 태그별 쿼리 시간(밀리초) 75백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.90percentile** <br>(gauge) | \[Legacy\] callsite 태그별 쿼리 시간(밀리초) 90백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.95percentile** <br>(gauge) | \[Legacy\] callsite 태그별 쿼리 시간(밀리초) 95백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.99percentile** <br>(gauge) | \[Legacy\] callsite 태그별 쿼리 시간(밀리초) 99백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.99_9percentile** <br>(gauge) | \[Legacy\] callsite 태그별 쿼리 시간(밀리초) 99.9백분위수<br>_millisecond로 표시_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.100percentile** <br>(gauge) | \[Legacy\] callsite 태그별 쿼리 시간(밀리초) 100백분위수<br>_millisecond로 표시_ |
| **envoy.listener.downstream_cx_length_ms.0percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 0백분위수<br>_millisecond로 표시_ |
| **envoy.listener.downstream_cx_length_ms.25percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 25백분위수<br>_millisecond로 표시_ |
| **envoy.listener.downstream_cx_length_ms.50percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 50백분위수<br>_millisecond로 표시_ |
| **envoy.listener.downstream_cx_length_ms.75percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 75백분위수<br>_millisecond로 표시_ |
| **envoy.listener.downstream_cx_length_ms.90percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 90백분위수<br>_millisecond로 표시_ |
| **envoy.listener.downstream_cx_length_ms.95percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 95백분위수<br>_millisecond로 표시_ |
| **envoy.listener.downstream_cx_length_ms.99percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 99백분위수<br>_millisecond로 표시_ |
| **envoy.listener.downstream_cx_length_ms.99_5percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 99.5백분위수<br>_millisecond로 표시_ |
| **envoy.listener.downstream_cx_length_ms.99_9percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 99.9백분위수<br>_millisecond로 표시_ |
| **envoy.listener.downstream_cx_length_ms.100percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 100백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_cx_length_ms.0percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 0백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_cx_length_ms.25percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 25백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_cx_length_ms.50percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 50백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_cx_length_ms.75percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 75백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_cx_length_ms.90percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 90백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_cx_length_ms.95percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 95백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_cx_length_ms.99percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 99백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_cx_length_ms.99_5percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 99.5백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_cx_length_ms.99_9percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 99.9백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_cx_length_ms.100percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 100백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 0백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 25백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 50백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 75백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 90백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 95백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 99백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_rq_time.99_5percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 99.5백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 99.9백분위수<br>_millisecond로 표시_ |
| **envoy.http.downstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 100백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_connect_ms.0percentile** <br>(gauge) | \[Legacy\] 연결 수립 시간(밀리초) 0백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_connect_ms.25percentile** <br>(gauge) | \[Legacy\] 연결 수립 시간(밀리초) 25백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_connect_ms.50percentile** <br>(gauge) | \[Legacy\] 연결 수립 시간(밀리초) 50백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_connect_ms.75percentile** <br>(gauge) | \[Legacy\] 연결 수립 시간(밀리초) 75백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_connect_ms.90percentile** <br>(gauge) | \[Legacy\] 연결 수립 시간(밀리초) 90백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_connect_ms.95percentile** <br>(gauge) | \[Legacy\] 연결 수립 시간(밀리초) 95백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_connect_ms.99percentile** <br>(gauge) | \[Legacy\] 연결 수립 시간(밀리초) 99백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_connect_ms.99_5percentile** <br>(gauge) | \[Legacy\] 연결 수립 시간(밀리초) 99.5백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_connect_ms.99_9percentile** <br>(gauge) | \[Legacy\] 연결 수립 시간(밀리초) 99.9백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_connect_ms.100percentile** <br>(gauge) | \[Legacy\] 연결 수립 시간(밀리초) 100백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_length_ms.0percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 0백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_length_ms.25percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 25백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_length_ms.50percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 50백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_length_ms.75percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 75백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_length_ms.90percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 90백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_length_ms.95percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 95백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_length_ms.99percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 99백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_length_ms.99_5percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 99.5백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_length_ms.99_9percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 99.9백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_cx_length_ms.100percentile** <br>(gauge) | \[Legacy\] 연결 지속 시간(밀리초) 100백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 0백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 25백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 50백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 75백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 90백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 95백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 99백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_rq_time.99_5percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 99백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 99.9백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.upstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] 요청 시간(밀리초) 100백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.canary.upstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] 업스트림 카나리 요청 시간(밀리초) 0백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.canary.upstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] 업스트림 카나리 요청 시간(밀리초) 25백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.canary.upstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] 업스트림 카나리 요청 시간(밀리초) 50백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.canary.upstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] 업스트림 카나리 요청 시간(밀리초) 75백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.canary.upstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] 업스트림 카나리 요청 시간(밀리초) 90백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.canary.upstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] 업스트림 카나리 요청 시간(밀리초) 95백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.canary.upstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] 업스트림 카나리 요청 시간(밀리초) 99백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.canary.upstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] 업스트림 카나리 요청 시간(밀리초) 99.9백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.canary.upstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] 업스트림 카나리 요청 시간(밀리초) 100백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.internal.upstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] 내부 오리진 요청 시간(밀리초) 0백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.internal.upstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] 내부 오리진 요청 시간(밀리초) 25백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.internal.upstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] 내부 오리진 요청 시간(밀리초) 50백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.internal.upstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] 내부 오리진 요청 시간(밀리초) 75백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.internal.upstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] 내부 오리진 요청 시간(밀리초) 90백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.internal.upstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] 내부 오리진 요청 시간(밀리초) 95백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.internal.upstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] 내부 오리진 요청 시간(밀리초) 99백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.internal.upstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] 내부 오리진 요청 시간(밀리초) 99.9백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.internal.upstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] 내부 오리진 요청 시간(밀리초) 100백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.external.upstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] 외부 오리진 요청 시간(밀리초) 0백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.external.upstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] 외부 오리진 요청 시간(밀리초) 25백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.external.upstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] 외부 오리진 요청 시간(밀리초) 50백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.external.upstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] 외부 오리진 요청 시간(밀리초) 75백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.external.upstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] 외부 오리진 요청 시간(밀리초) 90백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.external.upstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] 외부 오리진 요청 시간(밀리초) 95백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.external.upstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] 외부 오리진 요청 시간(밀리초) 99백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.external.upstream_rq_time.99_5percentile** <br>(gauge) | \[Legacy\] 외부 오리진 요청 시간(밀리초) 99.5백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.external.upstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] 외부 오리진 요청 시간(밀리초) 99.9백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.external.upstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] 외부 오리진 요청 시간(밀리초) 100백분위<br>_millisecond로 표시_ |
| **envoy.cluster.zone.upstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] 존 요청 시간(밀리초) 0백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.zone.upstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] 존 요청 시간(밀리초) 25백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.zone.upstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] 존 요청 시간(밀리초) 50백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.zone.upstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] 존 요청 시간(밀리초) 75백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.zone.upstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] 존 요청 시간(밀리초) 90백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.zone.upstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] 존 요청 시간(밀리초) 95백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.zone.upstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] 존 요청 시간(밀리초) 99백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.zone.upstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] 존 요청 시간(밀리초) 99.9백분위수<br>_millisecond로 표시_ |
| **envoy.cluster.zone.upstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] 존 요청 시간(밀리초) 100백분위수<br>_millisecond로 표시_ |
| **envoy.sds.key_rotation_failed** <br>(count) | \[Legacy\] \[API v3 전용\] SDS 업데이트 외부에서 실패한 파일시스템 키 교체 총 횟수|
| **envoy.access_logs.grpc_access_log.logs_dropped** <br>(count) | \[Legacy\] 드롭된 GRPC Access Logs 개수|
| **envoy.access_logs.grpc_access_log.logs_written** <br>(count) | \[Legacy\] 기록된 GRPC Access Logs 개수|
| **envoy.access_logs.grpc_access_log.logs_dropped.count** <br>(count) | \[OpenMetrics V2\] 드롭된 GRPC Access Logs 수|
| **envoy.access_logs.grpc_access_log.logs_written.count** <br>(count) | \[OpenMetrics V2\] 기록된 GRPC Access Logs 수|
| **envoy.http_local_rate_limit.enabled** <br>(count) | \[Legacy\] 레이트 리미터(Rate Limiter)가 조회된 총 요청 수<br>_request로 표시_ |
| **envoy.http_local_rate_limit.enforced** <br>(count) | \[Legacy\] 속도 제한이 적용된 총 요청 수 (예: 429 응답 반환)<br>_request로 표시_ |
| **envoy.http_local_rate_limit.rate_limited** <br>(count) | \[Legacy\] 토큰을 사용할 수 없는 총 응답 수 (반드시 강제 적용되지는 않음)<br>_request로 표시_ |
| **envoy.http_local_rate_limit.ok** <br>(count) | \[Legacy\] 토큰 버킷에서 발생한 총 제한 미달 응답 수<br>_request로 표시_ |
| **envoy.http.rbac.allowed** <br>(count) | \[Legacy\] 접근이 허용된 총 요청 수<br>_request로 표시_ |
| **envoy.http.rbac.denied** <br>(count) | \[Legacy\] 접근이 거부된 총 요청 수<br>_request로 표시_ |
| **envoy.http.rbac.shadow_allowed** <br>(count) | \[Legacy\] 필터의 섀도우 규칙에 의해 접근이 허용될 총 요청 수<br>_request로 표시_ |
| **envoy.http.rbac.shadow_denied** <br>(count) | \[Legacy\] 필터의 섀도우 규칙에 의해 접근이 거부될 총 요청 수<br>_request로 표시_ |
| **envoy.cluster.client_ssl_socket_factory.downstream_context_secrets_not_ready.count** <br>(count) | \[OpenMetrics V2\] Secret Discovery Service가 실행한 리스너 서버의 SSL 컨텍스트 업데이트 횟수|
| **envoy.cluster.client_ssl_socket_factory.ssl_context_update_by_sds.count** <br>(count) | \[OpenMetrics V2\] 리스너 서버의 업스트림 SSL 컨텍스트 시크릿 중 준비되지 않은 것의 수|
| **envoy.cluster.client_ssl_socket_factory.upstream_context_secrets_not_ready.count** <br>(count) | \[OpenMetrics V2\] 리스너 서버의 다운스트림 SSL 컨텍스트 시크릿 중 준비되지 않은 것의 수|
| **envoy.listener.server_ssl_socket_factory.downstream_context_secrets_not_ready.count** <br>(count) | \[OpenMetrics V2\] Secret Discovery Service가 실행한 클라이언트의 SSL 소켓 팩토리의 SSL 컨텍스트 업데이트 횟수|
| **envoy.listener.server_ssl_socket_factory.ssl_context_update_by_sds.count** <br>(count) | \[OpenMetrics V2\] 클라이언트 SSL 소켓 팩토리의 업스트림 SSL 컨텍스트 시크릿 중 준비되지 않은 것의 수|
| **envoy.listener.server_ssl_socket_factory.upstream_context_secrets_not_ready.count** <br>(count) | \[OpenMetrics V2\] 클라이언트 SSL 소켓 팩토리의 다운스트림 SSL 컨텍스트 시크릿 중 준비되지 않은 것의 수|
| **envoy.tls_inspector.client_hello_too_large.count** <br>(count) | \[OpenMetrics V2\] 수신된 비정상적으로 큰 클라이언트 헬로(Client Hello) 총합|
| **envoy.tls_inspector.tls.found.count** <br>(count) | \[OpenMetrics V2\] TLS를 찾은 총 횟수|
| **envoy.tls_inspector.tls.not_found.count** <br>(count) | \[OpenMetrics V2\] TLS를 찾지 못한 총 횟수|
| **envoy.tls_inspector.alpn.found.count** <br>(count) | \[OpenMetrics V2\] Application-Layer Protocol Negotiation이 성공한 총 횟수|
| **envoy.tls_inspector.alpn.not_found.count** <br>(count) | \[OpenMetrics V2\] Application-Layer Protocol Negotiation이 실패한 총 횟수|
| **envoy.tls_inspector.sni.found.count** <br>(count) | \[OpenMetrics V2\] Server Name Indication을 찾은 총 횟수|
| **envoy.tls_inspector.sni.not_found.count** <br>(count) | \[OpenMetrics V2\] Server Name Indication을 찾지 못한 총 횟수|
| **envoy.tls_inspector.bytes_processed.bucket** <br>(count) | \[OpenMetrics V2\] TLS 사용 분석 중 tls_inspector가 처리한 바이트 수를 기록하는 레코드 크기|
| **envoy.tls_inspector.bytes_processed.count** <br>(count) | \[OpenMetrics V2\] TLS 사용 분석 중 tls_inspector가 처리한 바이트 수를 기록하는 레코드 크기 개수|
| **envoy.tls_inspector.bytes_processed.sum** <br>(count) | \[OpenMetrics V2\] TLS 사용 분석 중 tls_inspector가 처리한 바이트 수를 기록한 레코드 크기 총합|

각 메트릭에서 전송되는 태그 목록은 [metrics.py](https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/metrics.py)를 참고하세요.

### 이벤트

Envoy 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

**envoy.can_connect**

Agent가 Envoy에 연결하여 메트릭을 수집할 수 없는 경우 `CRITICAL`을 반환하고, 그렇지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

**envoy.openmetrics.health**

Agent가 Envoy에 연결하여 메트릭을 수집할 수 없는 경우 `CRITICAL`을 반환하고, 그렇지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

### 일반적인 문제

#### 엔드포인트 `/server_info`에 연결할 수 없음

- Envoy 환경에서 엔드포인트를 사용할 수 없는 경우 Envoy 구성에서 `collect_server_info` 옵션을 비활성화하여 오류 로그를 최소화합니다.

**참고**: Envoy 버전 데이터는 수집되지 않습니다.

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.