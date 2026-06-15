---
app_id: kuma
categories:
- 네트워크
- Kubernetes
- 컨테이너
custom_kind: 통합
description: Kubernetes 및 VM용 오픈 소스 서비스 메시인 Kuma에서 메트릭과 로그를 수집하세요.
integration_version: 2.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Kuma
---
## 개요

이 점검은 Kubernetes와 Universal 모드(VM 및 독립 실행형 컨테이너)를 모두 지원하는 서비스 메시용 범용 오픈 소스 컨트롤 플레인 [Kuma](https://kuma.io/)를 모니터링합니다. Kuma는 Kong에서 개발한 [Kong Mesh](https://konghq.com/products/kong-mesh)의 오픈 소스 커뮤니티 버전입니다.

Datadog Kuma 통합을 통해 다음 작업을 할 수 있습니다.

- Kuma 컨트롤 플레인 상태와 성능을 모니터링합니다.
- 컨트롤 플레인과 데이터 플레인 프록시 모두에서 로그를 수집합니다.
- 서비스 메시 내부 트래픽 흐름에 관한 자세한 정보를 토대로 성능을 모니터링하고 안정성을 확보합니다.

Kuma 메시 내의 Envoy 데이터 플레인(사이드카)을 모니터링하려면 다음 단계를 따르세요.

- [Envoy 통합](https://docs.datadoghq.com/integrations/envoy/)을 사용하여 메트릭을 수집합니다.
- Kuma 통합 기능을 사용하여 로그를 수집하세요.

## 설정

Kuma 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있어 서버에 추가로 설치할 필요가 없습니다.

### 설정

#### 메트릭 수집

메트릭은 Kuma 컨트롤 플레인과 Envoy 데이터 플레인에서 수집됩니다.

##### 컨트롤 플레인

**Autodiscovery (Kubernetes)**

Autodiscovery를 사용하여 Kuma 컨트롤 플레인에서 메트릭을 수집하도록 Agent를 구성하려면 `kuma-control-plane` 배포에 다음 포드 어노테이션을 적용하세요. 이 예에서는 Helm을 사용하여 Kuma를 설치했다고 가정합니다. Autodiscovery에 대한 자세한 내용은 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)을 참고하세요.

```yaml
# values.yaml
controlPlane:
  podAnnotations:
    ad.datadoghq.com/control-plane.checks: |
      {
        "kuma": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:5680/metrics",
              "service": "kuma-control-plane"
            }
          ]
        }
      }
```

**참고:** Kuma용 Autodiscovery 어노테이션 형식은 `ad.datadoghq.com/<CONTAINER_NAME>.checks:`입니다.
컨트롤 플레인의 이름이 다른 경우 해당 줄을 적절히 변경하세요. 자세한 내용은 [Datadog 문서]https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=annotations)를 참고하세요.

**구성 파일**

또는 Agent 구성 디렉터리의 루트 `conf.d/` 폴더에 있는 `kuma.d/conf.yaml` 파일을 편집하여 통합을 구성할 수도 있습니다.

```yaml
instances:
  - openmetrics_endpoint: http://<KUMA_CONTROL_PLANE_HOST>:5680/metrics
    service: kuma-control-plane
```

사용 가능한 모든 옵션은 [샘플 kuma.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/kuma/datadog_checks/kuma/data/conf.yaml.example)을 참고하세요.

##### 데이터 플레인(Envoy 프록시)

데이터 플레인의 메트릭은 [Envoy 통합](https://docs.datadoghq.com/integrations/envoy/)을 사용하여 수집됩니다.

1. 먼저 `MeshMetric` 정책을 생성하여 데이터 플레인에서 Prometheus 메트릭 노출을 활성화하세요. 자세한 내용은 [Kuma 문서](https://kuma.io/docs/latest/policies/meshmetric/)를 참고하세요.

   ```yaml
   apiVersion: kuma.io/v1alpha1
   kind: MeshMetric
   metadata:
     name: my-metrics-policy
     namespace: kuma-system
     labels:
       kuma.io/mesh: default
   spec:
     default:
       backends:
       - type: Prometheus
         prometheus:
           port: 5670
           path: "/metrics"
   ```

1. 다음으로, 애플리케이션 포드에 다음 어노테이션을 적용하여 Datadog Agent가 이러한 메트릭을 수집하도록 구성합니다. 어노테이션 적용에 대한 자세한 내용은 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)을 참고하세요.

   ```yaml
   ad.datadoghq.com/kuma-sidecar.checks: |
     {
       "envoy": {
         "instances": [
           {
             "openmetrics_endpoint": "http://%%host%%:5670/metrics",
             "collect_server_info": false
           }
         ]
       }
     }
   ```

   **참고:** Kuma용 Autodiscovery 어노테이션 형식은 `ad.datadoghq.com/<CONTAINER_NAME>.checks:`입니다.
   사이드카의 이름이 다른 경우 해당 줄을 적절히 수정하세요. 자세한 내용은 [Datadog 문서](https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=annotations)를 참고하세요.

#### 로그 수집

`datadog.yaml` 파일에서 로그 수집을 활성화합니다.

```yaml
logs_enabled: true
```

##### 컨트롤 플레인 로그

Kuma 컨트롤 플레인에서 로그를 수집하려면 `kuma-control-plane` 배포에 다음 어노테이션을 적용하세요.

```yaml
# values.yaml
controlPlane:
  podAnnotations:
    ad.datadoghq.com/control-plane.logs: |
      [
        {
          "source": "kuma",
          "service": "kuma-control-plane"
        }
      ]
```

**참고:** Kuma용 Autodiscovery 어노테이션 형식은 `ad.datadoghq.com/<CONTAINER_NAME>.logs:`입니다.
컨트롤 플레인의 이름이 다른 경우 해당 줄을 적절히 변경하세요. 자세한 내용은 [Datadog 문서](https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=annotations)를 참고하세요.

##### 데이터 플레인 로그

Datadog Agent가 Envoy 사이드카 컨테이너에서 로그를 수집하도록 구성하려면 애플리케이션 포드에 다음 어노테이션을 적용하세요.

```yaml
ad.datadoghq.com/kuma-sidecar.logs: |
  [
    {
      "source": "kuma",
      "service": "<MY_SERVICE>",
      "auto_multi_line_detection": true
    }
  ]
```

**참고:** Kuma용 Autodiscovery 어노테이션 형식은 `ad.datadoghq.com/<CONTAINER_NAME>.logs:`입니다.
컨트롤 플레인의 이름이 다른 경우 해당 줄을 적절히 변경하세요. 자세한 내용은 [Datadog 문서](https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=annotations)를 참고하세요.

`<MY_SERVICE>`를 서비스 이름으로 변경합니다.

**선택 사항: 메시 액세스 로그를 활성화합니다**

메시 내 서비스 간 트래픽을 보여주는 액세스 로그를 수집하려면 `MeshAccessLog` 정책을 생성하여 활성화할 수 있습니다. 자세한 내용은 [Kuma 문서](https://kuma.io/docs/latest/policies/meshaccesslog/)를 참고하세요.

### Datadog Agent 포드에 사이드카 주입 활성화

메시에 엄격한 [mTLS](https://kuma.io/docs/2.11.x/quickstart/kubernetes-demo/#introduce-zero-trust-security)가 활성화된 경우, Datadog Agent는 다른 서비스와 통신하기 위해 Kuma 사이드카를 포드에 주입해야 합니다.

Datadog Agent에 사이드카 주입을 활성화하려면 Agent가 배포된 네임스페이스(일반적으로 `datadog`)에 `kuma.io/sidecar-injection: enabled` 레이블을 추가하세요.

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: datadog
  labels:
    kuma.io/sidecar-injection: enabled
```

Agent와 서비스 간의 트래픽을 허용하는 `MeshTrafficPermission` 정책을 적용해야 합니다. 자세한 내용은 [Kuma 문서](https://kuma.io/docs/latest/policies/meshtrafficpermission/)를 참고하세요.

### 검증

[Agent `status` 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `kuma`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **kuma.api_server.http_request_duration_seconds.bucket** <br>(count) | API HTTP 요청 지연 시간(bucket)|
| **kuma.api_server.http_request_duration_seconds.count** <br>(count) | API HTTP 요청 지연 시간 (count)<br>_request로 표시됨_ |
| **kuma.api_server.http_request_duration_seconds.sum** <br>(count) | API HTTP 요청 지연 시간(sum)<br>_second로 표시됨_ |
| **kuma.api_server.http_requests_inflight** <br>(gauge) | 동시에 처리 중인 요청 수<br>_request로 표시됨_ |
| **kuma.api_server.http_response_size_bytes.bucket** <br>(count) | API HTTP 응답 크기(bucket)|
| **kuma.api_server.http_response_size_bytes.count** <br>(count) | API HTTP 응답 크기(count)|
| **kuma.api_server.http_response_size_bytes.sum** <br>(count) | API HTTP 응답 크기(sum)<br>_byte로 표시됨_ |
| **kuma.ca_manager.get_cert.count** <br>(count) | CA 매니저 인증서 조회 지연 시간(count)|
| **kuma.ca_manager.get_cert.sum** <br>(count) | CA 매니저 인증서 조회 지연 시간(sum)<br>_second로 표시됨_ |
| **kuma.ca_manager.get_root_cert_chain.count** <br>(count) | CA 매니저 CA 루트 인증서 체인 조회 지연 시간(count)|
| **kuma.ca_manager.get_root_cert_chain.sum** <br>(count) | CA 매니저 CA 루트 인증서 체인 조회 지연 시간(sum)<br>_second로 표시됨_ |
| **kuma.cert_generation.count** <br>(count) | 생성된 인증서 수.|
| **kuma.certwatcher.read_certificate.errors_total.count** <br>(count) | 인증서 읽기 오류 총 개수<br>_error로 표시됨_ |
| **kuma.certwatcher.read_certificate.total.count** <br>(count) | 인증서 조회 총 횟수<br>_read로 표시됨_ |
| **kuma.cla_cache** <br>(gauge) | Cluster Load Assignment 캐시 작업<br>_operation으로 표시됨_ |
| **kuma.component.catalog_writer.count** <br>(count) | Inter CP Catalog Writer 구성 요소 간격 (count)|
| **kuma.component.catalog_writer.quantile** <br>(gauge) | Inter CP Catalog Writer 구성 요소 간격 (quantile)<br>_second로 표시됨_ |
| **kuma.component.catalog_writer.sum** <br>(count) | Inter CP Catalog Writer 구성 요소 간격 (sum)<br>_second로 표시됨_ |
| **kuma.component.heartbeat.count** <br>(count) | Inter CP Heartbeat 구성 요소 간격(count)|
| **kuma.component.heartbeat.quantile** <br>(gauge) | Inter CP Heartbeat 구성 요소 간격 (quantile)<br>_second로 표시됨_ |
| **kuma.component.heartbeat.sum** <br>(count) | Inter CP Heartbeat 구성 요소 간격 (sum)<br>_second로 표시됨_ |
| **kuma.component.hostname_generator.count** <br>(count) | 호스트네임 생성기 간격(count)|
| **kuma.component.hostname_generator.quantile** <br>(gauge) | 호스트네임 생성기 간격 (quantile)<br>_second로 표시됨_ |
| **kuma.component.hostname_generator.sum** <br>(count) | 호스트네임 생성기 간격 (sum)<br>_second로 표시됨_ |
| **kuma.component.ms_status_updater.count** <br>(count) | Inter CP Heartbeat 구성 요소 간격(count)|
| **kuma.component.ms_status_updater.quantile** <br>(gauge) | Inter CP Heartbeat 구성 요소 간격 (quantile)<br>_second로 표시됨_ |
| **kuma.component.ms_status_updater.sum** <br>(count) | Inter CP Heartbeat 구성 요소 간격 (sum)<br>_second로 표시됨_ |
| **kuma.component.mzms_status_updater.count** <br>(count) | MeshMultizoneService Updater 구성 요소(count)<br>_operation으로 표시됨_ |
| **kuma.component.mzms_status_updater.quantile** <br>(gauge) | MeshMultizoneService Updater 구성 요소(quantile)<br>_operation으로 표시됨_ |
| **kuma.component.mzms_status_updater.sum** <br>(count) | MeshMultizoneService Updater 구성 요소(sum)<br>_operation으로 표시됨_ |
| **kuma.component.store_counter.count** <br>(count) | Store Counter 구성 요소 간격(count)|
| **kuma.component.store_counter.quantile** <br>(gauge) | Store Counter 구성 요소 간격(quantile)<br>_second로 표시됨_ |
| **kuma.component.store_counter.sum** <br>(count) | Store Counter 구성 요소 간격(sum)<br>_second로 표시됨_ |
| **kuma.component.sub_finalizer.count** <br>(count) | Subscription Finalizer 구성 요소 간격(count)|
| **kuma.component.sub_finalizer.quantile** <br>(gauge) | Subscription Finalizer 구성 요소 간격(quantile)<br>_second로 표시됨_ |
| **kuma.component.sub_finalizer.sum** <br>(count) | Subscription Finalizer 구성 요소 간격(sum)<br>_second로 표시됨_ |
| **kuma.component.vip_allocator.count** <br>(count) | Virtual IP 할당 소요 시간(count)|
| **kuma.component.vip_allocator.quantile** <br>(gauge) | Virtual IP 할당 소요 시간(quantile)<br>_second로 표시됨_ |
| **kuma.component.vip_allocator.sum** <br>(count) | Virtual IP 할당 소요 시간(sum)<br>_second로 표시됨_ |
| **kuma.component.zone_available_services.count** <br>(count) | 사용 가능한 서비스 추적기 구성 요소 간격(count)|
| **kuma.component.zone_available_services.quantile** <br>(gauge) | 사용 가능한 서비스 추적기 구성 요소 간격 (quantile)<br>_second로 표시됨_ |
| **kuma.component.zone_available_services.sum** <br>(count) | 사용 가능한 서비스 추적기 구성 요소 간격(sum)<br>_second로 표시됨_ |
| **kuma.controller_runtime.active_workers** <br>(gauge) | 컨트롤러당 현재 사용 중인 작업자 수<br>_worker로 표시됨_ |
| **kuma.controller_runtime.max_concurrent_reconciles** <br>(gauge) | 컨트롤러당 최대 동시 리컨실 작업 수|
| **kuma.controller_runtime.reconcile.errors_total.count** <br>(count) | 컨트롤러별 총 리컨실 오류 수<br>_error로 표시됨_ |
| **kuma.controller_runtime.reconcile.panics_total.count** <br>(count) | 컨트롤러별 리컨실 패닉 총 횟수|
| **kuma.controller_runtime.reconcile.time_seconds.bucket** <br>(count) | 컨트롤러별 리컨실별 소요 시간(bucket)|
| **kuma.controller_runtime.reconcile.time_seconds.count** <br>(count) | 컨트롤러별 리컨실당 소요 시간(count)|
| **kuma.controller_runtime.reconcile.time_seconds.sum** <br>(count) | 컨트롤러별 리컨실당 소요 시간(sum)<br>_second로 표시됨_ |
| **kuma.controller_runtime.reconcile.total.count** <br>(count) | 컨트롤러별 리컨실 작업 수|
| **kuma.controller_runtime.terminal_reconcile.errors_total.count** <br>(count) | 컨트롤러별 치명적 리컨실 오류 총 횟수<br>_error로 표시됨_ |
| **kuma.controller_runtime.webhook.latency_seconds.bucket** <br>(count) | 어드미션 요청 처리 지연 시간 히스토그램(bucket)|
| **kuma.controller_runtime.webhook.latency_seconds.count** <br>(count) | 어드미션 요청 처리 지연 시간 히스토그램(count)|
| **kuma.controller_runtime.webhook.latency_seconds.sum** <br>(count) | 어드미션 요청 처리 지연 시간 히스토그램(sum)<br>_second로 표시됨_ |
| **kuma.controller_runtime.webhook.panics_total.count** <br>(count) | 웹훅 패닉 총 횟수|
| **kuma.controller_runtime.webhook.requests_in_flight** <br>(gauge) | 현재 처리 중인 어드미션 요청 건수.|
| **kuma.controller_runtime.webhook.requests_total.count** <br>(count) | HTTP 상태 코드별 총 어드미션 요청 건수<br>_request로 표시됨_ |
| **kuma.cp_info** <br>(gauge) | CP 인스턴스에 관한 정적 정보|
| **kuma.dp_server.http_request_duration_seconds.bucket** <br>(count) | HTTP 요청 지연 시간(bucket)|
| **kuma.dp_server.http_request_duration_seconds.count** <br>(count) | HTTP 요청 지연 시간(count)|
| **kuma.dp_server.http_request_duration_seconds.sum** <br>(count) | HTTP 요청 지연 시간(sum)<br>_second로 표시됨_ |
| **kuma.dp_server.http_requests_inflight** <br>(gauge) | 동시에 처리 중인 요청 수<br>_request로 표시됨_ |
| **kuma.dp_server.http_response_size_bytes.bucket** <br>(count) | HTTP 응답 크기(bucket)|
| **kuma.dp_server.http_response_size_bytes.count** <br>(count) | HTTP 응답 크기(count)|
| **kuma.dp_server.http_response_size_bytes.sum** <br>(count) | HTTP 응답 크기 (sum)<br>_byte로 표시됨_ |
| **kuma.events.dropped.count** <br>(count) | 채널 용량 초과로 인해 이벤트 버스에서 누락된 이벤트 수<br>_event로 표시됨_ |
| **kuma.go.gc.duration_seconds.count** <br>(count) | 가비지 컬렉션 사이클에서 발생한 월-타임 일시 정지(stop-the-world) 지속 시간(count)|
| **kuma.go.gc.duration_seconds.quantile** <br>(gauge) | 가비지 컬렉션 사이클에서 발생한 월-타임 일시 정지(stop-the-world) 지속 시간(quantile)<br>_second로 표시됨_ |
| **kuma.go.gc.duration_seconds.sum** <br>(count) | 가비지 컬렉션 사이클에서 발생한 월-타임 일시 정지(stop-the-world) 지속 시간(sum)<br>_second로 표시됨_ |
| **kuma.go.goroutines** <br>(gauge) | 현재 존재하는 고루틴 수.|
| **kuma.go.memstats.alloc_bytes** <br>(gauge) | 힙에 할당되어 현재 사용 중인 바이트 수<br>_byte로 표시됨_ |
| **kuma.go.threads** <br>(gauge) | 생성된 OS 스레드 수<br>_thread로 표시됨_ |
| **kuma.grpc.server.handled_total.count** <br>(count) | 서버에서 완료된 총 RPC 횟수(성공 여부와 관계없이)<br>_request로 표시됨_ |
| **kuma.grpc.server.handling_seconds.bucket** <br>(count) | 서버에서 애플리케이션 레벨로 처리된 gRPC의 응답 지연 시간(초) 히스토그램(bucket)|
| **kuma.grpc.server.handling_seconds.count** <br>(count) | 서버에서 애플리케이션 레벨로 처리된 gRPC의 응답 지연 시간(초) 히스토그램(count)|
| **kuma.grpc.server.handling_seconds.sum** <br>(count) | 서버에서 애플리케이션 레벨로 처리된 gRPC의 응답 지연 시간(초) 히스토그램(sum)<br>_second로 표시됨_ |
| **kuma.grpc.server.msg_received_total.count** <br>(count) | 서버에서 수신한 gRPC 스트림 메시지 총 개수<br>_message로 표시됨_ |
| **kuma.grpc.server.msg_sent_total.count** <br>(count) | 서버가 전송한 gRPC 스트림 메시지 총 개수<br>_message로 표시됨_ |
| **kuma.grpc.server.started_total.count** <br>(count) | 서버에서 시작된 RPC 총 개수<br>_request로 표시됨_ |
| **kuma.insights_resyncer.event_time_processing.count** <br>(count) | 이벤트 처리에 소요된 시간(count)|
| **kuma.insights_resyncer.event_time_processing.quantile** <br>(gauge) | 이벤트 처리에 소요된 시간(quantile)<br>_second로 표시됨_ |
| **kuma.insights_resyncer.event_time_processing.sum** <br>(count) | 이벤트 처리에 소요된 시간(sum)<br>_second로 표시됨_ |
| **kuma.insights_resyncer.event_time_to_process.count** <br>(count) | 배치에 이벤트가 추가된 시점부터 처리될 때까지의 시간 간격은 정상적인 시스템에서는 MinResyncInterval보다 작거나 같아야 합니다. (count)|
| **kuma.insights_resyncer.event_time_to_process.quantile** <br>(gauge) | 배치에 이벤트가 추가된 시점부터 처리될 때까지의 시간 간격은 정상적인 시스템에서는 MinResyncInterval보다 짧거나 같아야 합니다. (quantile)<br>_second로 표시됨_ |
| **kuma.insights_resyncer.event_time_to_process.sum** <br>(count) | 배치에 이벤트가 추가된 시점부터 처리될 때까지의 시간 간격은 정상적인 시스템에서는 MinResyncInterval보다 짧거나 같아야 합니다. (sum)<br>_second로 표시됨_ |
| **kuma.insights_resyncer.processor_idle_time.count** <br>(count) | 프로세서 루프가 유휴 상태로 있는 시간이 0에 가까울수록 처리 한계에 도달했음을 의미합니다. (count)|
| **kuma.insights_resyncer.processor_idle_time.quantile** <br>(gauge) | 프로세서 루프가 유휴 상태로 있는 시간이 0에 가까울수록 처리 한계에 도달했음을 의미합니다. (quantile)<br>_Shown as second_ |
| **kuma.insights_resyncer.processor_idle_time.sum** <br>(count) | 프로세서 루프가 유휴 상태로 있는 시간이 0에 가까울수록 처리 한계에 도달했음을 의미합니다. (sum)<br>_ second로 표시됨_ |
| **kuma.leader** <br>(gauge) | 이 인스턴스가 리더인지 여부를 나타냅니다(리더인 경우 1).|
| **kuma.leader_election.master_status** <br>(gauge) | 보고 시스템이 해당 리스에 대한 마스터 역할을 하는지 여부를 나타냅니다. 0은 백업 시스템을, 1은 마스터 시스템을 의미합니다. 'kuma_name'은 리스를 식별하는 데 사용되는 태그입니다.|
| **kuma.mesh_cache** <br>(gauge) | XDS 리소스 최적화를 위한 메쉬 컨텍스트 캐시 작업<br>_operation으로 표시됨_ |
| **kuma.process.cpu_seconds_total.count** <br>(count) | 총 사용자 및 시스템 CPU 사용 시간(초)<br>_Second로 표시됨_ |
| **kuma.process.max_fds** <br>(gauge) | 열려 있는 파일 디스크립터의 최대 개수.|
| **kuma.process.network.receive_bytes_total.count** <br>(count) | 네트워크를 통해 프로세스가 수신한 바이트 수<br>_byte로 표시됨_ |
| **kuma.process.network.transmit_bytes_total.count** <br>(count) | 네트워크를 통해 프로세스가 전송한 바이트 수<br>_byte로 표시됨_ |
| **kuma.process.open_fds** <br>(gauge) | 열려 있는 파일 디스크립터 수.|
| **kuma.process.resident_memory_bytes** <br>(gauge) | 레지던트 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **kuma.process.start_time_seconds** <br>(gauge) | Unix Epoch 이후 프로세스 시작 시간(초)<br>_second로 표시됨_ |
| **kuma.process.virtual_memory_bytes** <br>(gauge) | 버추얼 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **kuma.process.virtual_memory_max_bytes** <br>(gauge) | 시용 가능한 버추얼 메모리의 최대 용량(바이트)<br>_byte로 표시됨_ |
| **kuma.promhttp.metric_handler.requests_in_flight** <br>(gauge) | 현재 제공 중인 스크레이프 수.<br>_요청으로 표시됨_ |
| **kuma.promhttp.metric_handler.requests_total.count** <br>(count) | HTTP 상태 코드별 총 스크랩 수.<br>_request로 표시됨_ |
| **kuma.resources_count** <br>(gauge) | 유형 및 지역별 Kuma 리소스 수.|
| **kuma.rest_client.requests_total.count** <br>(count) | 상태 코드, 메서드 및 호스트별로 구분된 HTTP 요청 수.<br>_request로 표시_. |
| **kuma.store.bucket** <br>(count) | 저장 작업(bucket)<br>_operation으로 표시됨_ |
| **kuma.store.count** <br>(count) | 저장 작업(count)<br>_operation으로 표시됨_ |
| **kuma.store.sum** <br>(count) | 저장 작업(sum)<br>_operation으로 표시됨_ |
| **kuma.store_cache.count** <br>(count) | 데이터베이스 부하를 줄이기 위한 리소스 저장소 캐시 작업(Get/List)<br>_item으로 표시됨_ |
| **kuma.store_conflicts.count** <br>(count) | 업데이트 중 저장소 충돌.|
| **kuma.vip_generation.count** <br>(count) | Virtual IP 생성(count)|
| **kuma.vip_generation.sum** <br>(count) | Virtual IP 생성(sum)|
| **kuma.vip_generation_errors.count** <br>(count) | Virtual IP 생성 중 발생한 오류<br>_error로 표시됨_ |
| **kuma.workqueue.adds_total.count** <br>(count) | 워크큐가 처리한 추가 작업 횟수<br>_item으로 표시됨_ |
| **kuma.workqueue.depth** <br>(gauge) | 현재 워크큐 작업 수<br>_item으로 표시됨_ |
| **kuma.workqueue.longest_running_processor_seconds** <br>(gauge) | 작업 대기열에서 가장 오래 실행 중인 프로세서의 실행 시간(초)<br>_second로 표시됨_ |
| **kuma.workqueue.queue_duration_seconds.bucket** <br>(count) | 항목이 요청되기 전까지 워크큐에 머무른 시간(초)(bucket)|
| **kuma.workqueue.queue_duration_seconds.count** <br>(count) | 항목이 요청되기 전까지 워크큐에 머무른 시간(초) (count)|
| **kuma.workqueue.queue_duration_seconds.sum** <br>(count) | 항목이 요청되기 전까지 워크큐에 머무른 시간(초)(sum)<br>_second로 표시됨_ |
| **kuma.workqueue.retries_total.count** <br>(count) | 작업 대기열에서 처리한 총 재시도 횟수.|
| **kuma.workqueue.unfinished_work_seconds** <br>(gauge) | 진행 중이나 아직 work_duration에 기록되지 않은 작업 시간(초). 값이 클수록 스레드가 멈춰 있음을 나타냅니다. 이 값의 증가율을 관찰하여 멈춰 있는 스레드 수를 추정할 수 있습니다.<br>_second로 표시됨_ |
| **kuma.workqueue.work_duration_seconds.bucket** <br>(count) | 워크큐에서 항목을 처리하는 데 걸리는 시간(초)(bucket)|
| **kuma.workqueue.work_duration_seconds.count** <br>(count) | 워크큐에서 항목을 처리하는 데 걸리는 시간(초)(count)|
| **kuma.workqueue.work_duration_seconds.sum** <br>(count) | 워크큐에서 항목을 처리하는 데 걸리는 시간(초)(sum)<br>_second로 표시됨_ |
| **kuma.xds.delivery.count** <br>(count) | 클라이언트의 응답(ACK/NACK)을 포함한 XDS 구성 전달(count)|
| **kuma.xds.delivery.sum** <br>(count) | 클라이언트의 응답(ACK/NACK)을 포함한 XDS 구성 전달(sum)<br>_second로 표시됨_ |
| **kuma.xds.generation.count** <br>(count) | XDS Snapshot 생성(count)|
| **kuma.xds.generation.quantile** <br>(gauge) | XDS Snapshot 생성(quantile)<br>_second로 표시됨_ |
| **kuma.xds.generation.sum** <br>(count) | XDS Snapshot 생성 (sum)<br>_second로 표시됨_ |
| **kuma.xds.generation_errors.count** <br>(count) | XDS 생성 중 발생한 오류<br>_error로 표시됨_ |
| **kuma.xds.requests_received.count** <br>(count) | 클라이언트로부터 확인 요청 횟수<br>_request로 표시됨_ |
| **kuma.xds.responses_sent.count** <br>(count) | 서버가 클라이언트에게 보낸 응답 수<br>_response로 표시됨_ |
| **kuma.xds.streams_active** <br>(gauge) | 서버와 클라이언트 간의 활성 연결 수<br>_connection으로 표시됨_ |

### 이벤트

Kuma 통합은 이벤트를 포함하지 않습니다.

## 트러블슈팅

### mTLS 연결 이슈

mTLS를 엄격하게 설정하고 패스스루를 사용하지 않으면 Agent가 컨트롤 플레인이나 다른 서비스에 연결하지 못할 수 있습니다. 모든 트래픽이 암호화되어 Kuma의 데이터 플레인 프록시를 통해 라우팅되기 때문입니다. 이 문제를 해결하려면 Datadog Agent 포드에 사이드카 주입을 활성화해야 합니다(#enable-sidecar-injection-for-datadog-agent-pods).

사이드카가 주입되면 Autodiscovery 어노테이션에서 `%%host%%`을 Kubernetes 서비스 이름으로 교체해야 합니다. 그렇지 않으면 트래픽이 메쉬를 통해 라우팅될 때 `%%host%%` 매크로가 올바르게 작동하지 않을 수 있습니다. Kuma 컨트롤 플레인이나 사이드카의 경우에는 이 작업이 필요하지 않습니다.

예를 들어, 다음 대신에

```yaml"openmetrics_endpoint": "http://%%host%%:5670/metrics"```

서비스 이름을 사용하세요.

```yaml"openmetrics_endpoint": "http://my-service.my-namespace.svc.cluster.local:5670/metrics"```

mTLS를 활성화한 경우 `%%host%%` 매크로를 사용하므로 자동 검색 자동 구성을 비활성화하는 것이 좋습니다. 자동 구성을 비활성화하는 방법에 관한 자세한 내용은 [Datadog 문서](https://docs.datadoghq.com/containers/guide/auto_conf/?tab=datadogoperator#disable-auto-configuration)를 참고하세요.

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

- [Kuma 공식 문서](https://kuma.io/)
- [Kuma 정책 문서](https://kuma.io/docs/latest/policies/meshtrafficpermission/)