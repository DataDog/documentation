---
app_id: istio
categories:
- log collection
- network
- security
- tracing
custom_kind: 통합
description: 성능 스키마 메트릭, 쿼리 처리량, 커스텀 메트릭을 수집하세요. and more.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-istio-with-datadog
  tag: 블로그
  text: Istio 블로그
- link: https://www.datadoghq.com/blog/istio-metrics/
  tag: 블로그
  text: Istio 모니터링 핵심 메트릭
- link: https://www.datadoghq.com/blog/istio-datadog/
  tag: 블로그
  text: Datadog를 통한 Istio 모니터링 방법
integration_version: 9.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Istio
---
## 개요

Datadog은 Istio 환경의 모든 부분을 모니터링하므로 다음과 같은 작업을 할 수 있습니다.

- [로그](#log-collection)로 Envoy와 Istio 컨트롤 플레인의 서비스 상태를 평가합니다.
- [요청, 대역폭, 리소스 소비 메트릭](#metrics)을 활용해 서비스 메시의 성능을 분석합니다.
- [Cloud Network Monitoring](https://www.datadoghq.com/blog/monitor-istio-with-npm/)을 통해 컨테이너, 포드, 메시를 통한 서비스 간 네트워크 통신을 매핑하세요.
- [APM](https://docs.datadoghq.com/tracing/setup_overview/proxy_setup/?tab=istio)을 사용하여 메시를 통한 애플리케이션 트랜젝션을 위해 배포된 트레이스를 탐색하세요.
- [Datadog 앱 및 API 보호](https://docs.datadoghq.com/security/application_security/?source=istio-tile-overview)를 통해 실시간 위협 탑지와 인프라 에지 차단 기능을 사용하여 Istio 서비스 메시를 안전하게 보호하세요.

Datadog를 통해 Istio 환경을 모니터링하는 방법에 관해 자세히 알아보려면 [모니터 블로그 게시물](https://www.datadoghq.com/blog/istio-datadog/)을 참조하세요.

## 설정

컨테이너화된 환경에서 통합을 구성하는 방법에 대한 일반적인 지침은 [Kubernetes 기반 Autodiscovery를 통한 통합 구성](https://docs.datadoghq.com/containers/kubernetes/integrations/) 또는 [Docker 기반 Autodiscovery를 통한 통합 구성](https://docs.datadoghq.com/containers/docker/integrations/)을 참조하세요.

이 OpenMetrics 기반 통합에는 _최신_ 모드(`use_openmetrics: true`)와 _레거시_ 모드(`use_openmetrics: false`)가 있습니다. 최신 기능을 모두 사용하려면 Datadog에서 _최신_ 모드를 활성화할 것을 권장합니다. 자세한 내용은 [OpenMetrics 기반 통합을 위한 최신 및 레거시 버전 관리](https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations)를 참조하세요.

Istio 메트릭을 수집하는 Datadog 인스턴스가 여러 개 존재하는 경우 모든 인스턴스에서 동일한 모드를 사용하고 있는지 확인하세요. 그렇지 않으면 Datadog 사이트에서 메트릭 데이터가 변동될 수도 있습니다.

`[OpenMetrics V1]`, `[OpenMetrics V2]` 또는 `[OpenMetrics V1 and V2]`로 표시된 메트릭은 해당 Istio 통합 모드에서만 사용할 수 있습니다. `Istio v1.5+`로 표시된 메트릭은 Istio 버전 1.5 이상에서 수집됩니다.

### 설치(메트릭)

Istio는 Datadog Agent에 포함되어 있습니다. [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest)를 Istio 서버 또는 클러스터에 설치하고 Istio를 모니터링하도록 설정합니다.

#### Envoy

Istio에서 Envoy 프록시를 모니터링하려면 [Envoy 통합](https://github.com/DataDog/integrations-core/tree/master/envoy#istio)을 구성하세요.

### 설치(보안 - 앱 및 API 보호)

설치 과정에는 이 통합을 활성화하는 것과는 다른 접근 방식이 필요합니다. 설치 지침은 [Istio에 앱 및 API 보호 사용](https://docs.datadoghq.com/security/application_security/setup/istio/?source=istio-tile-setup) 설명서에서 확인할 수 있습니다.

### 설정

#### 메트릭 수집

Istio v1.5+를 모니터링할 수 있도록 Prometheus 형식 메트릭을 위한 [Istio 아키텍처](https://istio.io/latest/docs/ops/deployment/architecture/)와 일치하는 두 가지 핵심 구성 요소가 있습니다.

- **데이터 플레인**: `istio-proxy` 사이드카 컨테이너
- **컨트롤 플레인**: 프록시 관리 `istiod` 서비스

모두 `istio` 에이전트 점검으로 실행되지만 책임은 서로 다르며 별도로 설정됩니다.

##### 데이터 플레인 설정

기본 [`istio.d/auto_conf.yaml`](https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml) 파일은 각 `istio-proxy` 사이드카 컨테이너의 모니터링을 자동으로 설정합니다. Agent는 자동으로 감지되는 각 사이드카 컨테이너에 이 검사를 초기화합니다. 이 구성을 통해 이러한 각 사이드카 컨테이너에서 노출되는 데이터의 `istio.mesh.*` 메트릭을 보고할 수 있습니다.

통합의 데이터 플레인 부분을 커스터마이즈하려면 커스텀 Istio 구성 파일 `istio.yaml`을 만드세요. 이 파일을 만드는 옵션은 [Kubernetes 기반 통합 구성하기](https://docs.datadoghq.com/containers/kubernetes/integrations/) 또는 [Docker 기반 Autodiscovery 통합 구성하기](https://docs.datadoghq.com/containers/docker/integrations/)를 참조하세요.

본 파일에는 다음이 포함되어야 합니다.

```yaml
ad_identifiers:
  - proxyv2
  - proxyv2-rhel8

init_config:

instances:
  - use_openmetrics: true
    send_histograms_buckets: false
    istio_mesh_endpoint: http://%%host%%:15020/stats/prometheus
    tag_by_endpoint: false
```

추가 구성으로 이 파일을 커스터마이즈합니다. 사용 가능한 모든 구성 옵션은 [샘플 istio.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/conf.yaml.example)을 참조하세요.

##### 컨트롤 플레인 설정

Istio 컨트롤 플레인을 모니터링하고 `mixer`, `galley`, `pilot`, `citadel` 메트릭을 보고하려면 에이전트가 `istiod` 배포를 모니터링하도록 설정해야 합니다. Istio v1.5 이상에서는 `istio-system` 네임스페이스에서 `istiod` 배포에 다음 포드 어노테이션을 적용합니다.

```yaml
ad.datadoghq.com/discovery.checks: |
  {
    "istio": {
      "instances": [
        {
          "istiod_endpoint": "http://%%host%%:15014/metrics",
          "use_openmetrics": "true"
        }
      ]
    }
  }
```

**참고**:  Autodiscovery Annotations v2 구문은 Agent v7.36 이상에서 지원됩니다.

본 어노테이션은 컨테이너 `discovery`를 지정하여 이 포드의 Istio 컨테이너의 기본 컨테이너 이름과 매칭합니다. 지정합니다. 만약 다른 경우 해당 어노테이션 `ad.datadoghq.com/<CONTAINER_NAME>.checks`을 Istio 컨테이너의 이름(`.spec.containers[i].name`)으로 교체합니다.

이러한 주석을 적용하는 방법은 사용하는 [Istio 배포 전략(Istioctl, Helm, Operator)](https://istio.io/latest/docs/setup/install/)에 따라 달라집니다. 이러한 포드 주석을 적용하는 올바른 방법은 Istio 설명서를 참조합니다. 사용 가능한 모든 구성 옵션은 [샘플 istio.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/conf.yaml.example)을 참조하세요.

#### Datadog 에이전트 포드에 대한 사이드카 삽입 비활성화

컨테이너에 [Datadog Agent](https://docs.datadoghq.com/agent/kubernetes/)를 설치하는 경우, Datadog에서 먼저 Istio의 사이드카 인젝션을 비활성화하는 것이 좋습니다.

_Istio 버전 >= 1.10:_

`datadog-agent` DaemonSet에 `sidecar.istio.io/inject: "false"` **라벨**을 추가합니다.

```yaml
# (...)
spec:
  template:
    metadata:
      labels:
        sidecar.istio.io/inject: "false"
    # (...)
```

`kubectl patch` 명령으로도 해당 작업을 수행할 수 있습니다.

```shell
kubectl patch daemonset datadog-agent -p '{"spec":{"template":{"metadata":{"labels":{"sidecar.istio.io/inject":"false"}}}}}'
```

_Istio 버전 \<= 1.9:_

`datadog-agent` DaemonSet에 `sidecar.istio.io/inject: "false"` **어노테이션**을 추가합니다.

```yaml
# (...)
spec:
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "false"
    # (...)
```

`kubectl patch` 명령어를 사용합니다.

```shell
kubectl patch daemonset datadog-agent -p '{"spec":{"template":{"metadata":{"annotations":{"sidecar.istio.io/inject":"false"}}}}}'
```

#### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

먼저 Kubernetes에서 로그를 수집하도록 Datadog Agent 을 활성화합니다. [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/)을 참조하세요.

#### Istio 로그

컨트롤 플레인(`istiod`)에서 Istio 로그를 수집하려면 `istio-system` 네임스페이스에서 다음 배포용 포드 어노테이션 `istiod`을 적용합니다.

```yaml
ad.datadoghq.com/discovery.logs: |
  [
    {
      "source": "istio",
      "service": "<SERVICE_NAME>"
    }
  ]
```

본 어노테이션은 컨테이너 `discovery`를 지정하여 이 포드의 Istio 컨테이너의 기본 컨테이너 이름과 매칭합니다. 만약 다른 경우 해당 어노테이션 `ad.datadoghq.com/<CONTAINER_NAME>.logs`을 Istio 컨테이너의 이름(`.spec.containers[i].name`)으로 교체합니다.

`<SERVICE_NAME>`을 원하는 Istio 서비스 이름으로 변경합니다.

#### Envoy 액세스 로그

Envoy를 수집하려면 데이터 플레인(`istio-proxy`)에서 로그에 액세스합니다.

1. [Istio 내 Envoy 액세스 로깅] 활성화(https://istio.io/latest/docs/tasks/observability/logs/access-log/)
1. `istio-proxy` 컨테이너가 삽입된 포드에 다음 어노테이션을 적용합니다.

```yaml
ad.datadoghq.com/istio-proxy.logs: |
  [
    {
      "source": "envoy",
      "service": "<SERVICE_NAME>"
    }
  ]
```

본 어노테이션은 컨테이너 `istio-proxy`를 지정하여 삽입된 Istio 사이드카 컨테이너의 기본 컨테이너 이름과 매칭합니다. 만약 다른 경우 해당 어노테이션 `ad.datadoghq.com/<CONTAINER_NAME>.logs`을 Istio 사이드카 컨테이너의 이름(`.spec.containers[i].name`)으로 교체합니다.

`<SERVICE_NAME>`을 원하는 Istio 프록시 서비스 이름으로 변경합니다.

### 검증

[Agent의 `info` 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 확인 섹션에서 `istio`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **istio.mesh.request.count** <br>(count) | \[OpenMetrics V1 및 V2\] 요청 수. OpenMetrics V1에서 이 메트릭은 기본적으로 게이지로 전송됩니다.<br>_request로 표시_ |
| **istio.mesh.request.duration.count** <br>(count) | \[OpenMetrics V1 및 V2\] 요청 기간 수. OpenMetrics V1에서 이 메트릭은 기본적으로 게이지로 표시됩니다.<br>_request로 표시_ |
| **istio.mesh.request.duration.sum** <br>(count) | \[OpenMetrics V1 및 V2\] 요청 기간 합계. OpenMetrics V1에서 이 메트릭은 기본적으로 게이지로 표시됩니다.<br>_millisecond로 표시_ |
| **istio.mesh.request.size.count** <br>(count) | \[OpenMetrics V1 및 V2\] 요청 크기 수. OpenMetrics V1에서 이 메트릭은 기본적으로 게이지로 전송됩니다.<br>_request로 표시_ |
| **istio.mesh.request.size.sum** <br>(count) | \[OpenMetrics V1 및 V2\] 요청 크기의 합계. OpenMetrics V1에서 이 메트릭은 기본적으로 게이지로 전송됩니다.<br>_byte로 표시_ |
| **istio.mesh.response.size.count** <br>(count) | \[OpenMetrics V1 및 V2\] 응답 크기 수. OpenMetrics V1에서 이 메트릭은 기본적으로 게이지로 전송됩니다.<br>_response로 표시_ |
| **istio.mesh.response.size.sum** <br>(count) | \[OpenMetrics V1 및 V2\] 응답 크기의 합계. OpenMetrics V1에서 이 메트릭은 기본적으로 게이지로 전송됩니다.<br>_byte로 표시_ |
| **istio.mixer.adapter.dispatch_count** <br>(gauge) | \[OpenMetrics V1 및 V2\]  Mixer로 처리된 어댑터 디스패치 총 수.<br>_operation으로 표시_ |
| **istio.mixer.adapter.dispatch_duration.count** <br>(count) | \[OpenMetrics V1 및 V2\]  Mixer에서 처리한 어댑터 디스패치 기간 수.  이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br>_operation으로 표시_  |
| **istio.mixer.adapter.dispatch_duration.sum** <br>(count) | \[OpenMetrics V1 및 V2\]Mixer에서 처리한 어댑터 디스패치 기간의 합계. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br>_operation으로 표시_  |
| **istio.mixer.adapter.old_dispatch_count** <br>(gauge) | \[OpenMetrics V1 및 V2\]  Mixer가 처리한 총 어댑터 디스패치 수.<br>_operation으로 표시_ |
| **istio.mixer.adapter.old_dispatch_duration.count** <br>(count) | \[OpenMetrics V1 및 V2\] Mixer에서 처리한 어댑터 디스패치 수.  이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br>_operation으로 표시_ |
| **istio.mixer.adapter.old_dispatch_duration.sum** <br>(count) | \[OpenMetrics V1 및 V2\] Mixer에서 처리한 어댑터 디스패치 수의 합계. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br>_operation으로 표시_  |
| **istio.mixer.config.resolve_actions.count** <br>(count) | \[OpenMetrics V1 및 V2\] Mixer에서 처리한 작업 수. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br>_operation으로 표시_  |
| **istio.mixer.config.resolve_actions.sum** <br>(count) | \[OpenMetrics V1 및 V2\] Mixer로 처리된 작업의 수. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br>_operation으로 표시_  |
| **istio.mixer.config.resolve_count** <br>(gauge) | \[OpenMetrics V1 및 V2\] Mixer가 처리한 구성 수.<br>_operation으로 표시_ |
| **istio.mixer.config.resolve_duration.count** <br>(count) | \[OpenMetrics V1 및 V2\] 구성 해결당 소요된 기간(초). 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br>_second로 표시_  |
| **istio.mixer.config.resolve_duration.sum** <br>(count) | \[OpenMetrics V1 및 V2\] Mixer에서 처리한 구성 해결 소요 시간의 총계. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br> _second로 표시_ |
| **istio.mixer.config.resolve_rules.count** <br>(count) | \[OpenMetrics V1 및 V2\] Mixer로 해결된 규칙 수. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br>_item으로 표시_ |
| **istio.mixer.config.resolve_rules.sum** <br>(count) | \[OpenMetrics V1 및 V2\] Mixer에 의해 해결된 규칙의 합계. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br>_item으로 표시_  |
| **istio.mixer.go.gc_duration_seconds.count** <br>(count) | \[OpenMetrics V1 및 V2\] GC 호출 기간의 수. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br> _second로 표시_  |
| **istio.mixer.go.gc_duration_seconds.quantile** <br>(gauge) | \[OpenMetrics V1 및 V2\] GC 호출 기간의 사분위수.<br>_second로 표시_  |
| **istio.mixer.go.gc_duration_seconds.sum** <br>(count) | \[OpenMetrics V1 및 V2\] GC 호출 기간의 합계. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br> _second로 표시_  |
| **istio.mixer.go.goroutines** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 존재하는 고루틴 수.<br>_thread로 표시_ |
| **istio.mixer.go.info** <br>(gauge) | \[OpenMetrics V1 및 V2\] Go 환경에 관한 정보.|
| **istio.mixer.go.memstats.alloc_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 할당되어 사용 중인 바이트 수.<br>_byte로 표시_  |
| **istio.mixer.go.memstats.alloc_bytes_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 해제된 경우에도 할당된 총 바이트 수.<br>_byte로 표시_ |
| **istio.mixer.go.memstats.buck_hash_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 프로파일링 버킷 해시 테이블에서 사용되는 바이트 수.<br>_byte로 표시_ |
| **istio.mixer.go.memstats.frees_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 총 해제 수.|
| **istio.mixer.go.memstats.gc_cpu_fraction** <br>(gauge) | \[OpenMetrics V1 및 V2\] GC가 점유한 CPU.<br>_percent로 표시_ |
| **istio.mixer.go.memstats.gc_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\]  GC(Garbage Collection) 시스템 메타데이터에 사용된 바이트 수.<br>_byte로 표시_ |
| **istio.mixer.go.memstats.heap_alloc_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙에 할당된 바이트.<br>_byte로 표시_ |
| **istio.mixer.go.memstats.heap_idle_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙의 유휴 바이트 수.<br>_byte로 표시_ |
| **istio.mixer.go.memstats.heap_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙의 바이트 수.<br>_byte로 표시_ |
| **istio.mixer.go.memstats.heap_objects** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙의 개체 수.<br>_object로 표시_ |
| **istio.mixer.go.memstats.heap_released_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 마지막 GC에서 시스템에 릴리즈된 바이트수.<br>_byte로 표시_ |
| **istio.mixer.go.memstats.heap_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙에서 사용한 바이트 수.<br>_byte로 표시_ |
| **istio.mixer.go.memstats.last_gc_time_seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 마지막 GC 길이.<br>_second로 표시_ |
| **istio.mixer.go.memstats.lookups_total** <br>(gauge) | \[OpenMetrics V1 및 V2\]  Lookup 수.<br>_operation으로 표시_ |
| **istio.mixer.go.memstats.mallocs_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] mallocs 수.<br>_operation으로 표시_ |
| **istio.mixer.go.memstats.mcache_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 캐시 구조에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.mixer.go.memstats.mcache_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 시스템에서 가져온 캐시 구조에 사용된 바이트 수.<br>_byte로 표시_ |
| **istio.mixer.go.memstats.mspan_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] mspan 구조에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.mixer.go.memstats.mspan_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 시스템에서 얻은 mspan에서 사용한 바이트 수.<br>_byte로 표시_ |
| **istio.mixer.go.memstats.next_gc_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 다음 GC가 실행될 힙 바이트 수<br>_byte로 표시_ |
| **istio.mixer.go.memstats.other_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 기타 시스템 할당에 사용된 바이트 수.<br>_byte로 표시_ |
| **istio.mixer.go.memstats.stack_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 스택 할당기에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.mixer.go.memstats.stack_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 스택 할당기를 위해 시스템에서 얻은 바이트 수.<br>_byte로 표시_ |
| **istio.mixer.go.memstats.sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 시스템에서 얻은 바이트 수.<br>_byte로 표시_ |
| **istio.mixer.go.threads** <br>(gauge) | \[OpenMetrics V1 및 V2\] 생성된 OS 스레드 수.<br>_thread로 표시_ |
| **istio.mixer.grpc.server.handled_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 완전히 처리된 총 요청 수(응답 포함).<br>_request로 표시_ |
| **istio.mixer.grpc.server.handling_seconds.count** <br>(count) | \[OpenMetrics V1 및 V2\] 서버가 애플리케이션 수준에서 처리한 gRPC의 응답 지연 시간(초) 수. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br> _second로 표시_  |
| **istio.mixer.grpc.server.handling_seconds.sum** <br>(count) | \[OpenMetrics V1 및 V2\] 서버가 애플리케이션 수준에서 처리한 gRPC의 응답 지연 시간(초)의 합계. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br> _second로 표시_ |
| **istio.mixer.grpc.server.msg_received_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 서버에서 수신한 총 RPC 스트림 메시지 수.<br>_message로 표시_  |
| **istio.mixer.grpc.server.msg_sent_total** <br>(gauge) | \[OpenMetrics V1 및 V2\]  전송된 총 메시지 수.<br>_message로 표시_ |
| **istio.mixer.grpc.server.started_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 서버에서 시작된 RPC 수.|
| **istio.mixer.process.cpu_seconds_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 총 사용자 및 시스템 CPU 사용 시간(초).<br>_second로 표시_ |
| **istio.mixer.process.max_fds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 열려 있는 파일에 관한 디스크립터의 최대 개수.<br>_file로 표시_ |
| **istio.mixer.process.open_fds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 열려 있는 파일에 대한 디스크립터 수.<br>_file로 표시_ |
| **istio.mixer.process.resident_memory_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 상주 메모리 크기를 바이트 수로 표시합니다.<br>_byte로 표시_ |
| **istio.mixer.process.start_time_seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 초로 표시된 Unix Epoch 이후 프로세스 시작 시간.<br>_second로 표시_ |
| **istio.mixer.process.virtual_memory_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 가상 메모리 크기(바이트).<br>_byte로 표시_ |
| **istio.mixer.grpc_io_server.completed_rpcs** <br>(gauge) | \[OpenMetrics V1 및 V2\] 방법 및 상태별 RPC 수.|
| **istio.mixer.grpc_io_server.received_bytes_per_rpc** <br>(gauge) | \[OpenMetrics V1 및 V2\] 메서드별 RPC당 수신된 바이트 분포.<br>_byte로 표시_ |
| **istio.mixer.grpc_io_server.sent_bytes_per_rpc** <br>(gauge) | \[OpenMetrics V1 및 V2\] 메서드별 RPC당 전송된 총 바이트 수 분포.<br>_byte로 표시_ |
| **istio.mixer.grpc_io_server.server_latency** <br>(gauge) | \[OpenMetrics V1 및 V2\]  메서드별 밀리초로 표시된 서버 지연 분포.|
| **istio.mixer.config.attributes_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 구성에서 알려진 속성 수.|
| **istio.mixer.config.handler_configs_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 구성에서 알려진 핸들러 수.|
| **istio.mixer.config.instance_configs_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 구성에서 알려진 인스턴스 수.|
| **istio.mixer.config.rule_configs_total** <br>(gauge) | \[OpenMetrics V1 및 V2\]  현재 구성에서 알려진 규칙의 수.|
| **istio.mixer.dispatcher.destinations_per_request** <br>(gauge) | \[OpenMetrics V1 및 V2\] Mixer에 의해 요청당 전송된 핸들러 수.|
| **istio.mixer.dispatcher.instances_per_request** <br>(gauge) | \[OpenMetrics V1 및 V2\] Mixer에 의해 요청당 생성된 인스턴스 수.|
| **istio.mixer.handler.daemons_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 지정된 어댑터 환경에서 현재 활성 데몬 루틴의 수.|
| **istio.mixer.handler.new_handlers_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 구성 전환 중에 새로 생성된 핸들러의 수.|
| **istio.mixer.mcp_sink.reconnections** <br>(gauge) | \[OpenMetrics V1 및 V2\] 싱크가 재연결된 횟수.|
| **istio.mixer.mcp_sink.request_acks_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 소스별로 수신된 요청 수신 확인 수.|
| **istio.mixer.runtime.dispatches_total** <br>(gauge) | \[OpenMetrics V1 및 V2\]  Mixer가 처리한 총 어댑터 디스패치 수.<br>_작동으로 표시__ |
| **istio.mixer.runtime.dispatch_duration_seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] Mixer에 의해 처리된 어댑터 디스패치에 대한 기간(초).<br>_second로 표시_ |
| **istio.pilot.go.gc_duration_seconds.count** <br>(count) | \[OpenMetrics V1 및 V2\] GC 호출 기간의 수. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br> _second로 표시_  |
| **istio.pilot.go.gc_duration_seconds.quantile** <br>(gauge) | \[OpenMetrics V1 및 V2\] GC 호출 기간의 사분위수.<br>_second로 표시_  |
| **istio.pilot.go.gc_duration_seconds.sum** <br>(count) | \[OpenMetrics V1 및 V2\] GC 호출 기간의 합계. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br> _second로 표시_  |
| **istio.pilot.go.goroutines** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 존재하는 goroutine 수.<br>_thread로 표시_ |
| **istio.pilot.go.info** <br>(gauge) | \[OpenMetrics V1 및 V2\] Go 환경에 대한 정보.|
| **istio.pilot.go.memstats.alloc_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 할당되어 사용 중인 바이트 수.<br>_byte로 표시_  |
| **istio.pilot.go.memstats.alloc_bytes_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 해제된 경우에도 할당된 총 바이트 수.<br>_byte로 표시_ |
| **istio.pilot.go.memstats.buck_hash_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 프로파일링 버킷 해시 테이블에서 사용되는 바이트 수.<br>_byte로 표시_ |
| **istio.pilot.go.memstats.frees_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 총 해제 수.|
| **istio.pilot.go.memstats.gc_cpu_fraction** <br>(gauge) | \[OpenMetrics V1 및 V2\] GC가 점유한 CPU.<br>_percent로 표시_ |
| **istio.pilot.go.memstats.gc_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\]  GC(Garbage Collection) 시스템 메타데이터에 사용된 바이트 수.<br>_byte로 표시_ |
| **istio.pilot.go.memstats.heap_alloc_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙에 할당된 바이트.<br>_byte로 표시_ |
| **istio.pilot.go.memstats.heap_idle_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙의 유휴 바이트 수.<br>_byte로 표시_ |
| **istio.pilot.go.memstats.heap_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙의 바이트 수.<br>_byte로 표시_ |
| **istio.pilot.go.memstats.heap_objects** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙의 개체 수.<br>_object로 표시_ |
| **istio.pilot.go.memstats.heap_released_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 마지막 GC에서 시스템에 릴리즈된 바이트수.<br>_byte로 표시_ |
| **istio.pilot.go.memstats.heap_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙에서 사용한 바이트 수.<br>_byte로 표시_ |
| **istio.pilot.go.memstats.last_gc_time_seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 마지막 GC 길이.<br>_second로 표시_ |
| **istio.pilot.go.memstats.lookups_total** <br>(gauge) | \[OpenMetrics V1 및 V2\]  Lookup 수.<br>_operation으로 표시_ |
| **istio.pilot.go.memstats.mallocs_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] mallocs 수.<br>_operation으로 표시_ |
| **istio.pilot.go.memstats.mcache_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 캐시 구조에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.pilot.go.memstats.mcache_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 시스템에서 가져온 캐시 구조에 사용된 바이트 수.<br>_byte로 표시_ |
| **istio.pilot.go.memstats.mspan_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] mspan 구조에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.pilot.go.memstats.mspan_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 시스템에서 얻은 mspan에서 사용한 바이트 수.<br>_byte로 표시_ |
| **istio.pilot.go.memstats.next_gc_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 다음 GC가 수행될 힙 바이트 수<br>_byte로 표시_ |
| **istio.pilot.go.memstats.other_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 기타 시스템 할당에 사용된 바이트 수.<br>_byte로 표시_ |
| **istio.pilot.go.memstats.stack_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 스택 할당기에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.pilot.go.memstats.stack_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 스택 할당기를 위해 시스템에서 얻은 바이트 수.<br>_byte로 표시_ |
| **istio.pilot.go.memstats.sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 시스템에서 얻은 바이트 수.<br>_byte로 표시_ |
| **istio.pilot.go.threads** <br>(gauge) | \[OpenMetrics V1 및 V2\] 생성된 OS 스레드 수.<br>_thread로 표시_ |
| **istio.pilot.process.cpu_seconds_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 총 사용자 및 시스템 CPU 사용 시간(초).<br>_second로 표시_ |
| **istio.pilot.process.max_fds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 열려 있는 파일에 대한 디스크립터의 최대 개수.<br>_파일로 표시_ |
| **istio.pilot.process.open_fds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 열려 있는 파일에 대한 디스크립터 수.<br>_파일로 표시_ |
| **istio.pilot.process.resident_memory_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 상주 메모리 크기를 바이트 수로 표시합니다.<br>_byte로 표시_ |
| **istio.pilot.process.start_time_seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 초로 표시된 Unix Epoch 이후 프로세스 시작 시간.<br>_second로 표시_ |
| **istio.pilot.process.virtual_memory_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 가상 메모리 크기(바이트).<br>_byte로 표시_ |
| **istio.pilot.conflict.inbound_listener** <br>(gauge) | \[OpenMetrics V1 및 V2\] 충돌하는 인바운드 수신기 수.|
| **istio.pilot.conflict.outbound_listener.http_over_current_tcp** <br>(gauge) | \[OpenMetrics V1 및 V2\]  현재 와일드카드 tcp 리스너와 충돌하는 와일드카드 http 리스너의 수.|
| **istio.pilot.conflict.outbound_listener.tcp_over_current_http** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 와일드카드 http 리스너와 충돌하는 와일드카드 tcp 리스너의 수.|
| **istio.pilot.conflict.outbound_listener.tcp_over_current_tcp** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 tcp 리스너와 충돌하는 tcp 리스너의 수.|
| **istio.pilot.destrule_subsets** <br>(gauge) | \[OpenMetrics V1 및 V2\] 동일한 호스트의 대상 규칙에서 하위 집합이 중복됩니다.|
| **istio.pilot.duplicate_envoy_clusters** <br>(gauge) | \[OpenMetrics V1 및 V2\] 호스트 이름이 동일한 서비스 항목으로 인한 중복된 엔보이 클러스터.|
| **istio.pilot.eds_no_instances** <br>(gauge) | \[OpenMetrics V1 및 V2\] 인스턴스가 없는 클러스터 수.|
| **istio.pilot.endpoint_not_ready** <br>(gauge) | \[OpenMetrics V1 및 V2\] 엔드포인트가 준비되지 않은 상태에서 발견되었습니다.|
| **istio.pilot.invalid_out_listeners** <br>(gauge) | \[OpenMetrics V1 및 V2\] 유효하지 않은 아웃바운드 수신기 수.|
| **istio.pilot.mcp_sink.reconnections** <br>(count) | \[OpenMetrics V1 및 V2\] 싱크가 재연결된 횟수.|
| **istio.pilot.mcp_sink.recv_failures_total** <br>(count) | \[OpenMetrics V1 및 V2\] 소스에서의 수신 실패 횟수.|
| **istio.pilot.mcp_sink.request_acks_total** <br>(count) | \[OpenMetrics V1 및 V2\] 소스별로 수신된 요청 수신 확인 수.|
| **istio.pilot.no_ip** <br>(gauge) | \[OpenMetrics V1 및 V2\] 엔드포인트에서 포드를 찾을 수 없습니다. 유효하지 않을 가능성이 높습니다.|
| **istio.pilot.proxy_convergence_time** <br>(gauge) | \<br>_second로 표시_ 구성 변경과 전체 프록시 수렴 사이의 지연. |
| **istio.pilot.proxy_convergence_time.sum** <br>(count) | \[OpenMetrics V1 및 V2\] 구성 변경과 모든 프록시가 수렴하는 사이의 지연 시간 합계. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br> _second로 표시_  |
| **istio.pilot.proxy_convergence_time.count** <br>(count) | \[OpenMetrics V1 및 V2\] pilot.proxy_convergence_time의 항목 수. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다. <br> _second로 표시_  |
| **istio.pilot.rds_expired_nonce** <br>(count) | \[OpenMetrics V1 및 V2\] 만료된 논스가 있는 총 RDS 메시지 수.|
| **istio.pilot.services** <br>(gauge) | \[OpenMetrics V1 및 V2\] 파일럿으로 알려진 총 서비스.|
| **istio.pilot.total_xds_internal_errors** <br>(count) | \[OpenMetrics V1 및 V2\] 파일럿의 총 내부 XDS 오류 수.|
| **istio.pilot.total_xds_rejects** <br>(count) | \[OpenMetrics V1 및 V2\] 프록시에 의해 거부된 파일럿의 총 XDS 응답 수.|
| **istio.pilot.virt_services** <br>(gauge) | \[OpenMetrics V1 및 V2\] 파일럿으로 알려진 총 가상 서비스.|
| **istio.pilot.vservice_dup_domain** <br>(gauge) | \[OpenMetrics V1 및 V2\] 중복 도메인이 있는 가상 서비스.|
| **istio.pilot.xds** <br>(gauge) | \[OpenMetrics V1 및 V2\]  XDS를 사용하여 이 파일럿에 연결된 엔드포인트 수.|
| **istio.pilot.xds.eds_instances** <br>(gauge) | \[OpenMetrics V1 및 V2\]  마지막 푸시 기준 각 클러스터 인스턴스.|
| **istio.pilot.xds.push.context_errors** <br>(count) | \[OpenMetrics V1 및 V2\] 푸시 컨텍스트를 시작하는 오류(시간 초과) 수.|
| **istio.pilot.xds.push.timeout** <br>(count) | \[OpenMetrics V1 및 V2\] 파일럿 푸시 시간 초과로 다시 시도합니다.|
| **istio.pilot.xds.push.timeout_failures** <br>(count) | \[OpenMetrics V1 및 V2\] 반복된 시도 후 파일럿 푸시 시간 초과에 실패했습니다.|
| **istio.pilot.xds.pushes** <br>(count) | \[OpenMetrics V1 및 V2\]  파일럿 빌드 및 lds, rds, cd 및 ed에 대한 오류가 전송되었습니다.|
| **istio.pilot.xds.write_timeout** <br>(count) | \[OpenMetrics V1 및 V2\] 파일럿 XDS 응답 쓰기 시간 초과.|
| **istio.pilot.xds.rds_reject** <br>(count) | \[OpenMetrics V1 및 V2\] 파일럿에서 RDS를 거부했습니다.|
| **istio.pilot.xds.lds_reject** <br>(count) | \[OpenMetrics V1 및 V2\] 파일럿에서 LDS를 거부했습니다.|
| **istio.pilot.xds.eds_reject** <br>(count) | \[OpenMetrics V1 및 V2\]  파일럿에서 EDS를 거부했습니다.|
| **istio.pilot.xds.cds_reject** <br>(count) | \[OpenMetrics V1 및 V2\] 파일럿에서 CDS를 거부했습니다.|
| **istio.galley.go.gc_duration_seconds.count** <br>(count) | \[OpenMetrics V1 및 V2\] GC 호출 기간의 수. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br> _second로 표시_  |
| **istio.galley.go.gc_duration_seconds.quantile** <br>(gauge) | \[OpenMetrics V1 및 V2\] GC 호출 기간의 사분위수.<br>_second로 표시_  |
| **istio.galley.go.gc_duration_seconds.sum** <br>(count) | \[OpenMetrics V1 및 V2\] GC 호출 기간의 합계. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br> _second로 표시_  |
| **istio.galley.go.goroutines** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 존재하는 goroutine 수.<br>_thread로 표시_ |
| **istio.galley.go.info** <br>(gauge) | \[OpenMetrics V1 및 V2\] Go 환경에 대한 정보.|
| **istio.galley.go.memstats.alloc_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 할당되어 사용 중인 바이트 수.<br>_byte로 표시_  |
| **istio.galley.go.memstats.alloc_bytes_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 해제된 경우에도 할당된 총 바이트 수.<br>_byte로 표시_ |
| **istio.galley.go.memstats.buck_hash_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 프로파일링 버킷 해시 테이블에서 사용되는 바이트 수.<br>_byte로 표시_ |
| **istio.galley.go.memstats.frees_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 총 해제 수.|
| **istio.galley.go.memstats.gc_cpu_fraction** <br>(gauge) | \[OpenMetrics V1 및 V2\] GC가 점유한 CPU.<br>_percent로 표시_ |
| **istio.galley.go.memstats.gc_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\]  GC(Garbage Collection) 시스템 메타데이터에 사용된 바이트 수.<br>_byte로 표시_ |
| **istio.galley.go.memstats.heap_alloc_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙에 할당된 바이트.<br>_byte로 표시_ |
| **istio.galley.go.memstats.heap_idle_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙의 유휴 바이트 수.<br>_byte로 표시_ |
| **istio.galley.go.memstats.heap_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙의 바이트 수.<br>_byte로 표시_ |
| **istio.galley.go.memstats.heap_objects** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙의 개체 수.<br>_object로 표시_ |
| **istio.galley.go.memstats.heap_released_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 마지막 GC에서 시스템에 릴리즈된 바이트수.<br>_byte로 표시_ |
| **istio.galley.go.memstats.heap_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙에서 사용한 바이트 수.<br>_byte로 표시_ |
| **istio.galley.go.memstats.last_gc_time_seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 마지막 GC 길이.<br>_second로 표시_ |
| **istio.galley.go.memstats.lookups_total** <br>(gauge) | \[OpenMetrics V1 및 V2\]  Lookup 수.<br>_operation으로 표시_ |
| **istio.galley.go.memstats.mallocs_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] mallocs 수.<br>_operation으로 표시_ |
| **istio.galley.go.memstats.mcache_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 캐시 구조에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.galley.go.memstats.mcache_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 시스템에서 가져온 캐시 구조에 사용된 바이트 수.<br>_byte로 표시_ |
| **istio.galley.go.memstats.mspan_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] mspan 구조에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.galley.go.memstats.mspan_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 시스템에서 얻은 mspan에서 사용한 바이트 수.<br>_byte로 표시_ |
| **istio.galley.go.memstats.next_gc_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 다음 GC가 수행될 힙 바이트 수<br>_byte로 표시_ |
| **istio.galley.go.memstats.other_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 기타 시스템 할당에 사용된 바이트 수.<br>_byte로 표시_ |
| **istio.galley.go.memstats.stack_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 스택 할당기에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.galley.go.memstats.stack_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 스택 할당기를 위해 시스템에서 얻은 바이트 수.<br>_byte로 표시_ |
| **istio.galley.go.memstats.sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 시스템에서 얻은 바이트 수.<br>_byte로 표시_ |
| **istio.galley.go.threads** <br>(gauge) | \[OpenMetrics V1 및 V2\] 생성된 OS 스레드 수.<br>_thread로 표시_ |
| **istio.galley.process.cpu_seconds_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 총 사용자 및 시스템 CPU 사용 시간(초).<br>_second로 표시_ |
| **istio.galley.process.max_fds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 열려 있는 파일에 대한 디스크립터의 최대 개수.<br>_파일로 표시_ |
| **istio.galley.process.open_fds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 열려 있는 파일에 대한 디스크립터 수.<br>_파일로 표시_ |
| **istio.galley.process.resident_memory_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 상주 메모리 크기를 바이트 수로 표시합니다.<br>_byte로 표시_ |
| **istio.galley.process.start_time_seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 초로 표시된 Unix Epoch 이후 프로세스 시작 시간.<br>_second로 표시_ |
| **istio.galley.process.virtual_memory_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 가상 메모리 크기(바이트).<br>_byte로 표시_ |
| **istio.galley.endpoint_no_pod** <br>(gauge) | \[OpenMetrics V1 및 V2\]  연결된 포트가 없는 엔드포인트.|
| **istio.galley.mcp_source.clients_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 연결된 스트림 수.|
| **istio.galley.runtime_processor.event_span_duration_milliseconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 각 수신 이벤트 사이의 기간.<br>_millisecond로 표시_ |
| **istio.galley.runtime_processor.events_processed_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 처리된 이벤트 수.|
| **istio.galley.runtime_processor.snapshot_events_total.bucket** <br>(count) | \[OpenMetrics V1 및 V2\] 상위_바운드당 스냅샷당 이벤트 수.|
| **istio.galley.runtime_processor.snapshot_events_total.count** <br>(count) | \[OpenMetrics V1 및 V2\] 스냅샷당 이벤트 수.|
| **istio.galley.runtime_processor.snapshot_events_total.sum** <br>(count) | \[OpenMetrics V1 및 V2\]  스냅샷 이벤트의 기간.|
| **istio.galley.runtime_processor.snapshot_lifetime_duration_milliseconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 각 스냅샷의 지속 시간.<br>_millisecond로 표시_ |
| **istio.galley.runtime_processor.snapshots_published_total** <br>(count) | \[OpenMetrics V1 및 V2\] 게시된 스냅샷의 수.|
| **istio.galley.runtime_state_type_instances_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 유형 URL당 유형 인스턴스 수.|
| **istio.galley.runtime_strategy.on_change_total** <br>(count) | \[OpenMetrics V1 및 V2\] 전략의 onChange가 호출된 횟수.|
| **istio.galley.runtime_strategy.timer_max_time_reached_total** <br>(count) | \[OpenMetrics V1 및 V2\] 최대 시간에 도달한 횟수.|
| **istio.galley.runtime_strategy.quiesce_reached_total** <br>(count) | \[OpenMetrics V1 및 V2\] 퀴에스(Quiesce) 상태에 도달한 횟수.|
| **istio.galley.runtime_strategy.timer_resets_total** <br>(count) | \[OpenMetrics V1 및 V2\] 타이머가 재설정된 횟수.|
| **istio.galley.source_kube.dynamic_converter_success_total** <br>(count) | \[OpenMetrics V1 및 V2\] 동적 쿠버네티스 소스가 리소스를 성공적으로 변환한 횟수.|
| **istio.galley.source_kube.event_success_total** <br>(count) | \[OpenMetrics V1 및 V2\] 쿠버네티스 소스가 이벤트를 성공적으로 처리한 횟수.|
| **istio.galley.validation.cert_key_updates** <br>(count) | \[OpenMetrics V1 및 V2\]  Galley 유효성 검사 웹훅 인증서 업데이트.|
| **istio.galley.validation.config_load** <br>(count) | \[OpenMetrics V1 및 V2\] K8D 웹훅 구성이 (재)로드됩니다.|
| **istio.galley.validation.config_update** <br>(count) | \[OpenMetrics V1 및 V2\] K8s 웹훅 구성 업데이트.|
| **istio.galley.validation.passed** <br>(count) | \[OpenMetrics V1 및 V2\] 리소스가 유효합니다.|
| **istio.citadel.secret_controller.csr_err_count** <br>(count) | \[OpenMetrics V1 및 V2\] CSR을 만들 때 발생한 오류 수.|
| **istio.citadel.secret_controller.secret_deleted_cert_count** <br>(count) | \[OpenMetrics V1 및 V2\] 비밀 삭제로 인해 다시 생성된 인증서 수입니다(서비스 계정은 여전히 존재함).|
| **istio.citadel.secret_controller.svc_acc_created_cert_count** <br>(count) | \[OpenMetrics V1 및 V2\] 서비스 계정 생성으로 인해 생성된 인증서 수.|
| **istio.citadel.secret_controller.svc_acc_deleted_cert_count** <br>(count) | \[OpenMetrics V1 및 V2\] 서비스 계정 삭제로 인해 삭제된 인증서 수.|
| **istio.citadel.server.authentication_failure_count** <br>(count) | \[OpenMetrics V1 및 V2\] 인증 실패 횟수.<br>_error로 표시_ |
| **istio.citadel.server.citadel_root_cert_expiry_timestamp** <br>(gauge) | \[OpenMetrics V1 및 V2\] Citadel 루트 인증서가 만료되는 유닉스 타임스탬프(초). 내부 오류 케이스에서 음수로 설정했습니다.<br>_second로 표시_ |
| **istio.citadel.server.csr_count** <br>(count) | \[OpenMetrics V1 및 V2\] Citadel 서버에서 수신한 CSR 수.|
| **istio.citadel.server.csr_parsing_err_count** <br>(count) | \[OpenMetrics V1 및 V2\] CSR을 구문 분석할 때 발생한 오류 수.<br>_error로 표시_ |
| **istio.citadel.server.id_extraction_err_count** <br>(count) | \[OpenMetrics V1 및 V2\] CSR에서 ID를 추출할 때 발생한 오류 수.<br>_error로 표시_ |
| **istio.citadel.server.success_cert_issuance_count** <br>(count) | \[OpenMetrics V1 및 V2\] 성공한 인증서 발급 수.|
| **istio.citadel.go.gc_duration_seconds.count** <br>(count) | \[OpenMetrics V1 및 V2\] GC 호출 기간의 수. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br> _second로 표시_  |
| **istio.citadel.go.gc_duration_seconds.quantile** <br>(gauge) | \[OpenMetrics V1 및 V2\] GC 호출 기간의 사분위수.<br>_second로 표시_  |
| **istio.citadel.go.gc_duration_seconds.sum** <br>(count) | \[OpenMetrics V1 및 V2\] GC 호출 기간의 합계. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br> _second로 표시_  |
| **istio.citadel.go.goroutines** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 존재하는 goroutine 수.<br>_thread로 표시_ |
| **istio.citadel.go.info** <br>(gauge) | \[OpenMetrics V1 및 V2\] Go 환경에 대한 정보.|
| **istio.citadel.go.memstats.alloc_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 할당되어 사용 중인 바이트 수.<br>_byte로 표시_  |
| **istio.citadel.go.memstats.alloc_bytes_total** <br>(count) | \[OpenMetrics V1 및 V2\] 해제된 경우에도 할당된 총 바이트 수.<br>_byte로 표시_ |
| **istio.citadel.go.memstats.buck_hash_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 프로파일링 버킷 해시 테이블에서 사용되는 바이트 수.<br>_byte로 표시_ |
| **istio.citadel.go.memstats.frees_total** <br>(count) | \[OpenMetrics V1 및 V2\] 총 해제 수.|
| **istio.citadel.go.memstats.gc_cpu_fraction** <br>(gauge) | \[OpenMetrics V1 및 V2\] GC가 점유한 CPU.<br>_percent로 표시_ |
| **istio.citadel.go.memstats.gc_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\]  GC(Garbage Collection) 시스템 메타데이터에 사용된 바이트 수.<br>_byte로 표시_ |
| **istio.citadel.go.memstats.heap_alloc_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙에 할당된 바이트.<br>_byte로 표시_ |
| **istio.citadel.go.memstats.heap_idle_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙의 유휴 바이트 수.<br>_byte로 표시_ |
| **istio.citadel.go.memstats.heap_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙의 바이트 수.<br>_byte로 표시_ |
| **istio.citadel.go.memstats.heap_objects** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙의 개체 수.<br>_object로 표시_ |
| **istio.citadel.go.memstats.heap_released_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 마지막 GC에서 시스템에 릴리즈된 바이트수.<br>_byte로 표시_ |
| **istio.citadel.go.memstats.heap_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙에서 사용한 바이트 수.<br>_byte로 표시_ |
| **istio.citadel.go.memstats.last_gc_time_seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 마지막 GC 길이.<br>_second로 표시_ |
| **istio.citadel.go.memstats.lookups_total** <br>(count) | \[OpenMetrics V1 및 V2\]  Lookup 수.<br>_operation으로 표시_ |
| **istio.citadel.go.memstats.mallocs_total** <br>(count) | \[OpenMetrics V1 및 V2\] mallocs 수.<br>_operation으로 표시_ |
| **istio.citadel.go.memstats.mcache_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 캐시 구조에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.citadel.go.memstats.mcache_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 시스템에서 가져온 캐시 구조에 사용된 바이트 수.<br>_byte로 표시_ |
| **istio.citadel.go.memstats.mspan_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] mspan 구조에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.citadel.go.memstats.mspan_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 시스템에서 얻은 mspan에서 사용한 바이트 수.<br>_byte로 표시_ |
| **istio.citadel.go.memstats.next_gc_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 다음 GC가 수행될 힙 바이트 수<br>_byte로 표시_ |
| **istio.citadel.go.memstats.other_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 기타 시스템 할당에 사용된 바이트 수.<br>_byte로 표시_ |
| **istio.citadel.go.memstats.stack_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 스택 할당기에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.citadel.go.memstats.stack_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 스택 할당기를 위해 시스템에서 얻은 바이트 수.<br>_byte로 표시_ |
| **istio.citadel.go.memstats.sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 시스템에서 얻은 바이트 수.<br>_byte로 표시_ |
| **istio.citadel.go.threads** <br>(gauge) | \[OpenMetrics V1 및 V2\] 생성된 OS 스레드 수.<br>_thread로 표시_ |
| **istio.citadel.process.cpu_seconds_total** <br>(gauge) | \[OpenMetrics V1 및 V2\] 총 사용자 및 시스템 CPU 사용 시간(초).<br>_second로 표시_ |
| **istio.citadel.process.max_fds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 열려 있는 파일에 대한 디스크립터의 최대 개수.<br>_파일로 표시_ |
| **istio.citadel.process.open_fds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 열려 있는 파일에 대한 디스크립터 수.<br>_파일로 표시_ |
| **istio.citadel.process.resident_memory_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 상주 메모리 크기를 바이트 수로 표시합니다.<br>_byte로 표시_ |
| **istio.citadel.process.start_time_seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 초로 표시된 Unix Epoch 이후 프로세스 시작 시간.<br>_second로 표시_ |
| **istio.citadel.process.virtual_memory_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 가상 메모리 크기(바이트).<br>_byte로 표시_ |
| **istio.galley.validation.config_update_error** <br>(count) | \[OpenMetrics V1 및 V2\]  K8s 웹훅 구성 업데이트 오류<br>_error로 표시__ |
| **istio.citadel.server.cert_chain_expiry_timestamp** <br>(gauge) | \[OpenMetrics V1 및 V2\] Citadel 인증 체인이 만료되는 기준 타임스탬프(초). 내부 오류의 경우 음수.<br>_second로 표시_ |
| **istio.citadel.server.root_cert_expiry_timestamp** <br>(gauge) | \[OpenMetrics V1 및 V2\] Citadel 루트 인증서가 만료되는 유닉스 타임스탬프(초). 내부 오류 사례에서 음수.<br>_second로 표시_ |
| **istio.galley.validation.failed** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 리소스 유효성 검사 횟수 실패|
| **istio.pilot.conflict.outbound_listener.http_over_https** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 잘 알려진 HTTPS 포트와 충돌하는 HTTP 리스너의 수.|
| **istio.pilot.inbound_updates** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 파일럿이 수신한 총 업데이트 횟수.|
| **istio.pilot.k8s.cfg_events** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] k8s 구성의 이벤트<br>_event로 표시_ |
| **istio.pilot.k8s.reg_events** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] k8s 레지스트리의 이벤트<br>_event로 표시_ |
| **istio.pilot.proxy_queue_time.count** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 프록시가 큐에 대기열로 지정되기 전에 푸시 대기열에 있을 때의 관찰 횟수. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.|
| **istio.pilot.proxy_queue_time.sum** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 프록시가 대기열에 대기하기 전에 푸시 큐에 있을 때 관찰된 값의 합계. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.|
| **istio.pilot.push.triggers** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\]  푸시가 트리거된 총 횟수<br>_event로 표시_ |
| **istio.pilot.xds.eds_all_locality_endpoints** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 마지막 푸시 기준 모든 로컬리티의 각 클러스터 네트워크 엔드포인트. 제로 엔드포인트는 오류.|
| **istio.pilot.xds.push.time.count** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 파일럿이 푸시한 총 시간 관찰 횟수. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.|
| **istio.pilot.xds.push.time.sum** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 파일럿이 푸시한 총 시간의 관측값 합계. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.|
| **istio.sidecar_injection.requests_total** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 총 사이드카 삽입 요청 수<br>_request로 표시_ |
| **istio.sidecar_injection.success_total** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 총 사이드카 삽입 요청 성공 건수<br>_request로 표시_ |
| **istio.sidecar_injection.failure_total** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 실패한 사이드카 주입 요청 총 건수<br>_request로 표시_ |
| **istio.sidecar_injection.skip_total** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 건너뛴 총 사이드카 주입 요청 수<br>_request로 표시_ |
| **istio.mesh.request.duration.milliseconds.sum** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 요청 지속 시간과 관련하여 관찰된 값의 총합(ms). 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br> _millisecond로 표시_  |
| **istio.mesh.request.duration.milliseconds.count** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 요청 기간 동안 관찰된 총 값 수. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.|
| **istio.mesh.tcp.connections_closed.total** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 총 폐쇄 연결 수.|
| **istio.mesh.tcp.connections_opened.total** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 총 개방된 연결 수.|
| **istio.mesh.tcp.received_bytes.total** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] TCP 연결의 경우 요청 시 수신된 총 바이트 크기.<br> _byte로 표시_ |
| **istio.mesh.tcp.send_bytes.total** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] TCP 연결의 경우 응답 중 전송된 총 바이트 수 크기.<br>_byte로 표시_ |
| **istio.mesh.request.count.total** <br>(count) | \[OpenMetrics V1 and Istio v1.5+\]  개수로서의 요청 수.<br>_request로 표시_ |
| **istio.mesh.request.duration.milliseconds.count.total** <br>(count) | \[OpenMetrics V1 and Istio v1.5+\] 요청 기간에 관찰된 값의 총 수를 단조 카운트로 계산합니다.|
| **istio.mesh.request.duration.milliseconds.sum.total** <br>(count) | \[OpenMetrics V1 및 Istio v1.5+\] 요청 기간 관측된 값의 총합을 단조 카운트로 표시합니다.|
| **istio.mesh.request.size.count.total** <br>(count) | \[OpenMetrics V1 and Istio v1.5+\] 단조 카운트로 관찰된 요청 크기 수.|
| **istio.mesh.request.size.sum.total** <br>(count) | \[OpenMetrics V1 and Istio v1.5+\]  단조 카운트로 관찰된 요청 크기의 합계.|
| **istio.mesh.response.size.count.total** <br>(count) | \[OpenMetrics V1 and Istio v1.5+\] 단조 카운트로 관찰된 응답 크기 수|
| **istio.mesh.response.size.sum.total** <br>(count) | \[OpenMetrics V1 및 Istio v1.5+\] 단조 카운트로 관찰된 응답 크기의 합계|
| **istio.mesh.tcp.connections_closed.total.total** <br>(count) | \[OpenMetrics V1 및 Istio v1.5+\] 단조 카운트의 총 폐쇄 연결 수|
| **istio.mesh.tcp.connections_opened.total.total** <br>(count) | \[OpenMetrics V1 및 Istio v1.5+\] 단조 카운트의 총 개방된 연결 수|
| **istio.mesh.tcp.received_bytes.total.total** <br>(count) | \[OpenMetrics V1 and Istio v1.5+\] TCP 연결 중 수신된 총 바이트 수 (단조 카운트 방식) <br>_byte로 표시_ |
| **istio.mesh.tcp.send_bytes.total.total** <br>(count) | \[OpenMetrics V1 and Istio v1.5+\] TCP 연결 중 응답 시 전송된 총 바이트 수 (단조 카운트 방식) <br>_byte로 표시_ |
| **istio.mesh.request.duration.count.total** <br>(count) | \[OpenMetrics V1 and Istio v1.5+\] 요청 시간 수(단조 카운트 방식)<br>_request로 표시_ |
| **istio.mesh.request.duration.sum.total** <br>(count) | \[OpenMetrics V1 and Istio v1.5+\] 요청 기간 합계(단조 카운트 방식)<br>_millisecond로 표시_ |
| **istio.grpc.server.handled_total** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 성공 또는 실패와 관계없이 서버에서 완료된 총 RPC 수.|
| **istio.grpc.server.handling_seconds.count** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 서버가 애플리케이션 수준에서 처리하던 gRPC의 응답 지연 시간. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.|
| **istio.grpc.server.handling_seconds.sum** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 서버가 애플리케이션 수준에서 처리한 gRPC의 응답 지연 시간. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br>_second로 표시_ |
| **istio.grpc.server.msg_received_total** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 서버에서 수신한 총 RPC 스트림 메시지 수.<br>_message로 표시_ |
| **istio.grpc.server.msg_sent_total** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 서버에서 전송한 총 gRPC 스트림 메시지 수.<br>_message로 표시_ |
| **istio.grpc.server.started_total** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\]   서버에서 시작된 총 RPC 수.|
| **istio.go.gc_duration_seconds.count** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] GC 호출 기간의 수. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br>_second로 표시_  |
| **istio.go.gc_duration_seconds.quantile** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\]  GC 호출 기간의 사분위수<br>_second로 표시_ |
| **istio.go.gc_duration_seconds.sum** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] GC 호출 기간의 합계. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다. <br>_second로 표시_ |
| **istio.go.goroutines** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 현재 존재하는 고루틴 수.<br>_thread로 표시_ |
| **istio.go.info** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] Go 환경에 관한 정보.|
| **istio.go.memstats.alloc_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 할당되어 여전히 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.go.memstats.alloc_bytes_total** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 해제된 경우에도 할당된 바이트 총 수.<br>_byte로 표시_ |
| **istio.go.memstats.buck_hash_sys_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 버킷 해시 테이블을 프로파일링하는 데 사용된 바이트 수.<br>_byte로 표시_ |
| **istio.go.memstats.frees_total** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 총 free 개수.<br>_byte로 표시_ |
| **istio.go.memstats.gc_cpu_fraction** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] GC가 점유한 CPU.<br>_percent로 표시_ |
| **istio.go.memstats.gc_sys_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 가비지 수집 시스템 메타데이타에서 사용된 바이트 수.<br>_byte로 표시_ |
| **istio.go.memstats.heap_alloc_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 힙에 할당된 바이트.<br>_byte로 표시_ |
| **istio.go.memstats.heap_idle_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 힙에 있는 유휴 바이트 수.<br>_byte로 표시_ |
| **istio.go.memstats.heap_inuse_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 힙에 사용되는 바이트 수. <br>_byte로 표시_ |
| **istio.go.memstats.heap_objects** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 힙이 객체 수.<br>_object로 표시_ |
| **istio.go.memstats.heap_released_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 마지막 GC에서 시스템에 릴리스된 바이트 수.<br>_byte로 표시_ |
| **istio.go.memstats.heap_sys_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 힙에서 사용되는 바이트 수. <br>_byte로 표시_ |
| **istio.go.memstats.last_gc_time_seconds** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 마지막 GC 길이.<br>_second로 표시_ |
| **istio.go.memstats.lookups_total** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 조회 횟수.<br>_operation으로 표시_ |
| **istio.go.memstats.mallocs_total** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] malloc 수.<br>_operation으로 표시_ |
| **istio.go.memstats.mcache_inuse_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\]  mcache 구조가 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.go.memstats.mcache_sys_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 시스템에서 가져온 mcache 구조에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.go.memstats.mspan_inuse_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] mspan 구조에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.go.memstats.mspan_sys_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 시스템에서 가져온 mspan 구조에 사용한 바이트 수.<br>_byte로 표시_ |
| **istio.go.memstats.next_gc_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 다음 가비지 수집이 발생하는 힙 바이트 수.<br>_byte로 표시_ |
| **istio.go.memstats.other_sys_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 기타 시스템 할당에 사용되는 바이트 수.<br>_byte로 표시_ |
| **istio.go.memstats.stack_inuse_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 스택 할당기에서 사용 중안 바이트 수.<br>_byte로 표시_ |
| **istio.go.memstats.stack_sys_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 스택 할당기에서 시스템에서 가져온 바이트 수.<br>_byte로 표시_ |
| **istio.go.memstats.sys_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 시스템에서 가져온 바이트 수.<br>_byte로 표시_ |
| **istio.go.threads** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 생성된 OS 스레드 수.<br>_thread로 표시_ |
| **istio.process.cpu_seconds_total** <br>(count) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 총 사용자 및 시스템에서 소비한 CPU 시간.<br>_second로 표시_ |
| **istio.process.max_fds** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 열려 있는 파일의 디스크립터 최대 개수.<br>_file로 표시_ |
| **istio.process.open_fds** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 열려 있는 파일의 디스크립터 수.<br>_file로 표시_ |
| **istio.process.resident_memory_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 상주 메모리 크기로 바이트로 표시됩니다.<br>_byte로 표시_ |
| **istio.process.start_time_seconds** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] Unix Epoch 이래 프로세스 시작 시간(초). <br>_second로 표시_ |
| **istio.process.virtual_memory_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 사용된 가상 메모리 수.<br>_byte로 표시_ |
| **istio.process.virtual_memory_max_bytes** <br>(gauge) | \[OpenMetrics V1, V2 및 Istio v1.5+\] 사용 가능한 가상 메모리 최대 개수.<br>_byte로 표시_ |
| **istio.galley.validation.config_update_error.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] K8s 웹훅 구성 업데이트 오류.<br>_error로 표시_ |
| **istio.galley.validation.config_update.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] k8s 웹훅 구성 업데이트.|
| **istio.galley.validation.failed.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 리소스 유효성 검사 실패 횟수.|
| **istio.go.memstats.frees.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 총 free 개수.|
| **istio.go.memstats.lookups.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 조회 횟수<br>_operation으로 표시_ |
| **istio.go.memstats.mallocs.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] malloc 개수<br>_byte로 표시_ |
| **istio.grpc.server.handled.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 완전히 처리된 총 요청 수(응답 포함)<br>_request로 표시_ |
| **istio.grpc.server.msg_received.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 서버에서 수신한 RPC 스트림 메시지 개수.<br>_message로 표시_ |
| **istio.grpc.server.msg_sent.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 전송된 총 메시지 수<br>_message로 표시_ |
| **istio.grpc.server.started.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 서버에서 시작된 총 RPC 수.|
| **istio.pilot.inbound_updates.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 파일럿이 수신한 총 업데이트 횟수|
| **istio.pilot.k8s.cfg_events.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] k8s 구성의 이벤트<br>_event로 표시_ |
| **istio.pilot.k8s.reg_events.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] k8s 레지스트리의 이벤트<br>_event로 표시_ |
| **istio.pilot.push.triggers.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 푸시가 트리거된 총 횟수.|
| **istio.pilot.xds.pushes.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 파일럿 빌드 및 lds, rds, cd, ed의 전송 오류.|
| **istio.process.cpu_seconds.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 총 사용자 및 시스템 CPU 사용 시간(초)<br>_second로 표시_ |
| **istio.sidecar_injection.requests.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 총 사이드카 삽입 요청 수<br>_request로 표시_ |
| **istio.sidecar_injection.success.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\]총 사이드카 삽입 요청 성공 건수<br>_request로 표시_ |
| **istio.mesh.tcp.connections_closed.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 폐쇄 연결 수(단조 카운트 방식).|
| **istio.mesh.tcp.connections_opened.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 개방된 연결 수(단조 카운트 방식).|
| **istio.mesh.tcp.received_bytes.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] TCP 연결 요청 중 수신된 총 바이트 크기(단조 카운트 방식).<br>_byte로 표시_ |
| **istio.mesh.tcp.send_bytes.count** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] TCP 연결 응답 중 전송된 총 바이트 크기(단조 카운트 방식).<br>_byte로 표시_ |
| **istio.grpc.server.handling_seconds.bucket** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 서버가 애플리케이션 수준에서 처리한 gRPC의 응답 대기 시간 버킷(초).<br>_second로 표시_ |
| **istio.pilot.proxy_convergence_time.bucket** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 구성 변경과 모든 프록시 수렴 사이의 지연 버킷.<br>_second로 표시_ |
| **istio.pilot.proxy_queue_time.bucket** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 프록시가 대기열에 대기하기 전 푸시 대기열에 있을 때 관측된 값 버킷|
| **istio.pilot.xds.push.time.bucket** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 파일럿이 푸시하는 총 시간 관측 버킷|
| **istio.mesh.request.duration.milliseconds.bucket** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 요청 기간 관측값 버킷<br>_millisecond로 표시_ |
| **istio.mesh.response.size.bucket** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 응답 크기 버킷<br>_response로 표시__ |
| **istio.mesh.request.size.bucket** <br>(count) | \[OpenMetrics V2 및 Istio v1.5+\] 요청 크기 버킷<br>_request로 표시__ |
| **istio.mesh.agent.pilot.conflict.outbound_listener.http_over_current_tcp** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 와일드카드 tcp 리스너와 충돌하는 와일드카드 http 리스너의 수.|
| **istio.mesh.agent.go.memstats.stack_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 스택 할당기를 위해 시스템에서 얻은 바이트 수.<br>_byte로 표시_ |
| **istio.mesh.agent.conflict.inbound_listener** <br>(gauge) | \[OpenMetrics V1 및 V2\] 충돌하는 인바운드 수신기 수.|
| **istio.mesh.agent.go.memstats.sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 시스템에서 얻은 바이트 수.<br>_byte로 표시_ |
| **istio.mesh.agent.pilot.xds** <br>(gauge) | \[OpenMetrics V1 및 V2\] XDS를 사용하여 이 파일럿에 연결된 엔드포인트 수.|
| **istio.mesh.agent.go.memstats.alloc_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 할당되어 사용 중인 바이트 수.<br>_byte로 표시_  |
| **istio.mesh.agent.go.memstats.heap_idle_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙의 유휴 바이트 수.<br>_byte로 표시_ |
| **istio.mesh.agent.process.resident_memory_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 상주 메모리 크기를 바이트 수로 표시합니다.<br>_byte로 표시_ |
| **istio.mesh.agent.conflict.outbound_listener.tcp_over_current_tcp** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 tcp 리스너와 충돌하는 tcp 리스너의 수.|
| **istio.mesh.agent.go.memstats.gc_cpu_fraction** <br>(gauge) | \[OpenMetrics V1 및 V2\] GC가 사용하는 CPU.|
| **istio.mesh.agent.go.memstats.heap_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙에서 사용한 바이트 수<br>_byte로 표시_ |
| **istio.mesh.agent.go.memstats.stack_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 스택 할당기에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.mesh.agent.go.memstats.heap_released_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 마지막 GC에서 시스템에 릴리즈된 바이트 수.<br>_byte로 표시_ |
| **istio.mesh.agent.go.memstats.mspan_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] mspan 구조에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.mesh.agent.go.memstats.mallocs.count** <br>(count) | \[OpenMetrics V1 및 V2\] mallocs 개수<br>_byte로 표시_ |
| **istio.mesh.agent.pilot.endpoint_not_ready** <br>(gauge) | \[OpenMetrics V1 및 V2\] 엔드포인트가 준비되지 않은 상태에서 발견되었습니다.|
| **istio.mesh.agent.pilot.no_ip** <br>(gauge) | \[OpenMetrics V1 및 V2\] 엔드포인트 테이블에서 포드를 찾을 수 없습니다. 유효하지 않을 가능성이 높습니다.|
| **istio.mesh.agent.num_outgoing_requests.count** <br>(count) | \[OpenMetrics V1 및 V2\] 발신 요청 수.|
| **istio.mesh.agent.go.memstats.other_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 기타 시스템 할당에서 사용된 바이트 수.<br>_byte로 표시_ |
| **istio.mesh.agent.pilot.xds.config_size_bytes.sum** <br>(count) | \파일럿 XDS 구성 크기의 합계.<br>_byte로 표시_ |
| **istio.mesh.agent.pilot.xds.config_size_bytes.count** <br>(count) | \[OpenMetrics V1 및 V2\] 파일럿 XDS 구성 크기 샘플 개수.|
| **istio.mesh.agent.pilot.xds.config_size_bytes.bucket** <br>(count) | \[OpenMetrics V1 및 V2\] 파일럿 XDS 구성 크기 개수.<br>_byte로 표시_ |
| **istio.mesh.agent.process.open_fds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 열려 있는 파일에 대한 디스크립터 수.<br>_파일로 표시_ |
| **istio.mesh.agent.go.goroutines** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 존재하는 goroutine 수.<br>_thread로 표시_ |
| **istio.mesh.agent.go.threads** <br>(gauge) | \[OpenMetrics V1 및 V2\] 생성된 OS 스레드 수.<br>_thread로 표시_ |
| **istio.mesh.agent.go.info** <br>(gauge) | \[OpenMetrics V1 및 V2\] Go 환경에 대한 정보.|
| **istio.mesh.agent.go.memstats.frees.count** <br>(count) | \[OpenMetrics V1 및 V2\] 총 해제 수.|
| **istio.mesh.agent.go.memstats.mcache_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 캐시 구조에서 사용 중인 바이트 수.<br>_byte로 표시_ |
| **istio.mesh.agent.process.virtual_memory_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 가상 메모리 크기(바이트).<br>_byte로 표시_ |
| **istio.mesh.agent.endpoint_no_pod** <br>(gauge) | \[OpenMetrics V1 및 V2\] 연결된 포드가 없는 엔드포인트.|
| **istio.mesh.agent.go.gc_duration_seconds.sum** <br>(count) | \[OpenMetrics V1 및 V2\] GC 호출 기간의 합계. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br> _second로 표시_  |
| **istio.mesh.agent.go.gc_duration_seconds.count** <br>(count) | \[OpenMetrics V1 및 V2\] GC 호출 기간의 수. 이 메트릭은 OpenMetrics V1에서 기본적으로 게이지로 전송됩니다.<br> _second로 표시_  |
| **istio.mesh.agent.go.gc_duration_seconds.quantile** <br>(gauge) | \[OpenMetrics V1 및 V2\] GC 호출 기간의 사분위수.<br>_second로 표시_  |
| **istio.mesh.agent.process.cpu_seconds.count** <br>(count) | \[OpenMetrics V1 및 V2\] 총 사용자 및 시스템 CPU 사용 시간(초).<br>_second로 표시_ |
| **istio.mesh.agent.go.memstats.heap_objects** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙의 개체 수.<br>_object로 표시_ |
| **istio.mesh.agent.pilot.vservice_dup_domain** <br>(gauge) | \[OpenMetrics V1 및 V2\] 중복 도메인이 있는 가상 서비스.|
| **istio.mesh.agent.process.virtual_memory_max_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 사용 가능한 최대 가상 메모리 수.<br>_byte로 표시_ |
| **istio.mesh.agent.go.memstats.mcache_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 시스템에서 가져온 캐시 구조에 사용된 바이트 수.<br>_byte로 표시_ |
| **istio.mesh.agent.scrapes.count** <br>(count) | \[OpenMetrics V1 및 V2\] 스크레이프 수.|
| **istio.mesh.agent.pilot.duplicate_envoy_clusters** <br>(gauge) | \[OpenMetrics V1 및 V2\] 호스트 이름이 동일한 서비스 항목으로 인한 중복 엔보이 클러스터.|
| **istio.mesh.agent.go.memstats.buck_hash_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 프로파일링 버킷 해시 테이블에서 사용되는 바이트 수.<br>_byte로 표시_ |
| **istio.mesh.agent.pilot.xds.push_time.sum** <br>(count) | \[OpenMetrics V1 및 V2\] 파일럿 XDS 푸시 시간을 합산합니다.|
| **istio.mesh.agent.pilot.xds.push_time.count** <br>(count) | \[OpenMetrics V1 및 V2\] 파일럿 XDS 푸시 시간의 총 샘플 수.|
| **istio.mesh.agent.pilot.xds.push_time.bucket** <br>(count) | \[OpenMetrics V1 및 V2\] 파일럿 XDS 푸시 시간.|
| **istio.mesh.agent.wasm_cache_entries** <br>(gauge) | \[OpenMetrics V1 및 V2\] 웹 어셈블리 캐시 항목의 수.<br>_item으로 표시_ |
| **istio.mesh.agent.pilot.eds_no_instances** <br>(gauge) | \[OpenMetrics V1 및 V2\] 인스턴스가 없는 클러스터 수.|
| **istio.mesh.agent.go.memstats.heap_alloc_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙에 할당된 바이트.<br>_byte로 표시_ |
| **istio.mesh.agent.pilot.virt_services** <br>(gauge) | \[OpenMetrics V1 및 V2\] 파일럿으로 알려진 총 가상 서비스.|
| **istio.mesh.agent.go.memstats.next_gc_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 다음 GC가 수행될 힙 바이트 수<br>_byte로 표시_ |
| **istio.mesh.agent.startup_duration_seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 시작 기간(초).<br>_second로 표시_ |
| **istio.mesh.agent.go.memstats.last_gc_time_seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 마지막 GC 길이.<br>_second로 표시_ |
| **istio.mesh.agent.pilot.xds.send_time.sum** <br>(count) | \[OpenMetrics V1 및 V2\] 파일럿 XDS 전송 시간의 합계.|
| **istio.mesh.agent.pilot.xds.send_time.count** <br>(count) | \[OpenMetrics V1 및 V2\] 파일럿 XDS 전송 시간 샘플 수.|
| **istio.mesh.agent.pilot.xds.send_time.bucket** <br>(count) | \[OpenMetrics V1 및 V2\] 파일럿 XDS 전송 시간.|
| **istio.mesh.agent.go.memstats.heap_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 힙의 바이트 수.<br>_byte로 표시_ |
| **istio.mesh.agent.process.max_fds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 열려 있는 파일에 대한 디스크립터의 최대 개수.<br>_파일로 표시_ |
| **istio.mesh.agent.go.memstats.gc_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\]  GC(Garbage Collection) 시스템 메타데이터에 사용된 바이트 수.<br>_byte로 표시_ |
| **istio.mesh.agent.pilot.destrule_subsets** <br>(gauge) | \[OpenMetrics V1 및 V2\] 동일한 호스트의 대상 규칙에서 하위 집합이 중복됩니다.|
| **istio.mesh.agent.pilot.xds.pushes.count** <br>(count) | \[OpenMetrics V1 및 V2\] 파일럿 빌드, lds, rds, cd, ed에 관한 오류 전송.|
| **istio.mesh.agent.process.start_time_seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 초로 표시된 Unix Epoch 이후 프로세스 시작 시간.<br>_second로 표시_ |
| **istio.mesh.agent.go.memstats.lookups.count** <br>(count) | \[OpenMetrics V1 및 V2\]  Lookup 수.<br>_operation으로 표시_ |
| **istio.mesh.agent.outgoing_latency.count** <br>(count) | \[OpenMetrics V1 및 V2\] 총 발신 지연 시간.|
| **istio.mesh.agent.go.memstats.mspan_sys_bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 시스템에서 얻은 mspan에서 사용한 바이트 수.<br>_byte로 표시_ |
| **istio.mesh.agent.pilot.conflict.outbound_listener.tcp_over_current_http** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 와일드카드 http 리스너와 충돌하는 와일드카드 tcp 리스너의 수.|
| **istio.galley.source.kube.event.error.count** <br>(count) | \[OpenMetrics V2\] 이벤트를 처리하는 동안 쿠버네티스 소스에서 오류가 발생한 횟수.|
| **istio.galley.source.kube.dynamic.converter.failure.count** <br>(count) | \[OpenMetrics V2\] 동적 쿠버네티스 소스가 리소스 변환에 실패한 횟수|
| **istio.galley.validation.cert.key.update.errors.count** <br>(count) | \[OpenMetrics V2\] Galley 유효성 검사 웹훅 인증서 업데이트 오류 수.|
| **istio.galley.validation.http.error.count** <br>(count) | \[OpenMetrics V2\] 리소스 유효성 검사 http 서버 오류 수.|
| **istio.mcp.clients.count** <br>(count) | \[OpenMetrics V2\] 현재 연결된 스트림 수.|
| **istio.mcp.request.acks.count** <br>(count) | \OpenMetrics V2\] 소스에서 수신한 요청 ack 수.|
| **istio.mcp.request.nacks.count** <br>(count) | \OpenMetrics V2\] 소스에서 수신한 요청 nack 수.|
| **istio.mixer.config.rule.config.errors.count** <br>(count) | \[OpenMetrics V2\] 규칙 구성을 처리하는 동안 발생한 오류 수.|
| **istio.mixer.config.rule.config.match.errors.count** <br>(count) | \OpenMetrics V2\] 구문 분석할 수 없는 규칙 조건의 수.|
| **istio.mixer.config.unsatisfied.action.handlers.count** <br>(count) | \[OpenMetrics V2\] 핸들러를 사용할 수 없어 실패한 작업 수.|
| **istio.mixer.config.adapter.info.configs.count** <br>(count) | 현재 구성에 있는 알려진 어댑터 수 \[OpenMetrics V2\].|
| **istio.mixer.config.adapter.info.config.errors.count** <br>(count) | \[OpenMetrics V2\] 어댑터 정보 구성을 처리하는 동안 발생한 오류 수.|
| **istio.mixer.config.handler.validation.errors.count** <br>(count) | \[OpenMetrics V2\] 핸들러 유효성 검사에서 오류가 반환되어 발생한 오류 수.|
| **istio.mixer.config.instance.config.errors.count** <br>(count) | \[OpenMetrics V2\] 인스턴스 구성을 처리하는 동안 발생한 오류 수.|
| **istio.mixer.handler.handler.build.failures.count** <br>(count) | \[OpenMetrics V2\] 구성 전환 중 생성에 실패한 핸들러 수.|
| **istio.galley.istio.networking.virtualservices** <br>(gauge) | |
| **istio.galley.istio.networking.destinationrules** <br>(gauge) | |
| **istio.galley.istio.networking.gateways** <br>(gauge) | |
| **istio.galley.istio.authentication.meshpolicies** <br>(gauge) | |

### 이벤트

Istio 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

**istio.prometheus.health**

검사에서 메트릭 엔드포인트에 액세스할 수 없는 경우 `CRITICAL`을 반환합니다. 그러지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

**istio.openmetrics.health**

Agent에 연결할 수 없는 경우 `CRITICAL`을 반환하고, 그러지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

**istio.pilot.prometheus.health**

검사에서 메트릭 엔드포인트에 액세스할 수 없는 경우 `CRITICAL`을 반환합니다. 그러지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

**istio.galley.prometheus.health**

검사에서 메트릭 엔드포인트에 액세스할 수 없는 경우 `CRITICAL`을 반환합니다. 그러지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

**istio.citadel.prometheus.health**

검사에서 메트릭 엔드포인트에 액세스할 수 없는 경우 `CRITICAL`을 반환합니다. 그러지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

### 잘못된 청크 길이 오류

Istio 통합(Istio 통합 버전 `3.13.0` 또는 이전 버전)의 레거시 모드에서 다음 오류가 발생한 경우

```python
  Error: ("Connection broken: InvalidChunkLength(got length b'', 0 bytes read)",
  InvalidChunkLength(got length b'', 0 bytes read))
```

해당 오류를 해결하려면 개방형메트릭 기반 Istio 통합의 최신 모드를 사용합니다.

최소 에이전트 `7.31.0` 및 파이썬(Python) 3로 업그레이드해야 합니다. [설정](#configuration) 섹션을 참조하여 개방형메트릭을 활성화합니다.

### Istio 배포에서 일반 개방형메트릭 통합 사용

Istio 프록시 사이드카 삽입이 활성화된 경우, `istio_mesh_endpoint`와 동일한 메트릭 엔드포인트를 가진 [OpenMetrics 통합](https://docs.datadoghq.com/integrations/openmetrics/)을 사용하여 다른 Prometheus 메트릭을 모니터링하면 사용자 지정 메트릭 사용량이 많아지고 메트릭 수집이 중복될 수 있습니다.

개방형메트릭 설정이 메트릭을 과다 수집하지 않도록 하려면 다음 작업 중 하나를 수행합니다.

1. `metrics` 설정 옵션에서 특정 메트릭 매칭을 사용합니다.
1. `metrics`에 와일드카드 `*` 값을 사용하는 경우, 다음 개방형메트릭 통합 옵션을 사용하여 Istio 및 Envoy 통합이 이미 지원하는 메트릭을 제외합니다.

#### 일반 메트릭 수집이 포함된 개방형메트릭 최신 모드 설정

설정에서 Istio 및 Envoy 메트릭을 제외해야 높은 커스텀 메트릭 요금이 청구되지 않습니다. `openmetrics_endpoint`이 활성화된 경우 `exclude_metrics`을 사용합니다.

```yaml
## 모든 인스턴스는 다른 인스턴스와 무관하게 스케줄링됩니다.
#
인스턴스:
  - openmetrics_endpoint: <OPENMETRICS_ENDPOINT>
    metrics:
    - '.*'
    exclude_metrics:
      - istio_.*
      - envoy_.*

```

#### 일반 메트릭 수집이 포함된 개방형메트릭 레거시 모드 설정

설정에서 Istio 및 Envoy 메트릭을 제외해야 높은 커스텀 메트릭 요금이 청구되지 않습니다. `prometheus_url`이 활성화된 경우 `ignore_metrics`을 사용합니다.

```yaml
instances:
  - prometheus_url: <PROMETHEUS_URL>
    metrics:
      - '*'
    ignore_metrics:
      - istio_*
      - envoy_*
```

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog를 사용해 Istio 서비스 메시 모니터링하기](https://www.datadoghq.com/blog/monitor-istio-with-datadog)
- [Datadog에서 Istio 모니터링을 위해 주요 지표를 수집하는 방법 알아보기)](https://www.datadoghq.com/blog/istio-metrics/)
- [Datadog으로 Istio 모니터링하는 방법](https://www.datadoghq.com/blog/istio-datadog/)