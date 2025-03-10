---
app_id: istio
app_uuid: de5b5443-5038-46cf-a052-0484348776d6
assets:
  dashboards:
    Istio Overview: assets/dashboards/overview.json
    Istio Overview 1.5: assets/dashboards/istio_1_5_overview.json
    Istio Overview 1.5 (OpenMetrics): assets/dashboards/istio_1_5_openmetrics_overview.json
    Istio base dashboard: assets/dashboards/istio_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - istio.mixer.process.cpu_seconds_total
      - istio.mesh.request.count
      - istio.galley.endpoint_no_pod
      metadata_path: metadata.csv
      prefix: istio.
    process_signatures:
    - pilot-agent proxy router
    - envoy envoy-rev0.json
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10017
    source_type_name: Istio
  monitors:
    Istio Proxy Requests Error Percentage: assets/monitors/request_error_rate.json
    Istio xDS Push Error Rate: assets/monitors/xds_push_error_rate.json
    Number of failed Istio sidecar injection is high: assets/monitors/failed_sidecar_injection.json
  saved_views:
    Istio Error Overview: assets/saved_views/istio_error_overview.json
    Istio Overview: assets/saved_views/istio_overview.json
    Istio Pilot Error Logs: assets/saved_views/istio_pilot_errors.json
    Istio Pilot Logs: assets/saved_views/istio_pilot_logs.json
    Istio Proxyv2 Error Logs: assets/saved_views/istio_proxyv2_errors.json
    Istio Proxyv2 Logs: assets/saved_views/istio_proxyv2_logs.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- network
- tracing
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/istio/README.md
display_on_public_website: true
draft: false
git_integration_title: istio
integration_id: istio
integration_title: Istio
integration_version: 8.1.0
is_public: true
manifest_version: 2.0.0
name: istio
public_title: Istio
short_description: 성능 스키마 메트릭, 쿼리 처리량, 커스텀 메트릭등을 수집합니다.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::로그 수집
  - Category::네트워크
  - Category::Tracing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Submitted Data Type::Traces
  - Offering::Integration
  configuration: README.md#Setup
  description: 성능 스키마 메트릭, 쿼리 처리량, 커스텀 메트릭등을 수집합니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-istio-with-datadog
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/istio-metrics/
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/istio-datadog/
  support: README.md#Support
  title: Istio
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Datadog은 Istio 환경의 모든 부분을 모니터링하므로 다음과 같은 작업을 할 수 있습니다.
- [로그](#log-collection)로 Envoy와 Istio 컨트롤 플레인의 서비스 상태를 평가합니다.
- [요청, 대역폭, 리소스 소비 메트릭](#metrics)을 활용해 서비스 메시의 성능을 분석합니다.
- [클라우드 네트워크 모니터링][1]으로 메시를 통해 컨테이너, 포드, 서비스 간의 네트워크 통신을 매핑합니다.
- 메시를 통해 [애플리케이션 성능 모니터링(APM)][2]으로 트랜잭션하는 애플리케이션에 대한 분산 트레이스를 분석합니다.

Datadog으로 Istio 환경을 모니터링하는 방법에 대해 자세히 알아보려면 [블로그 포스트 모니터링][3]을 참조하세요.

## 설정

컨테이너화된 환경에서 통합 설정에 대한 일반 지침은 [쿠버네티스(Kubernetes)에서 자동탐지 통합 설정하기][4] 또는 [도커(Docker)에서 자동탐지 통합 설정하기][5]를 참조하세요.

본 개방형메트릭 기반 통합은 _최신_ 모드(`use_openmetrics: true`) 및 _레거시_ 모드(`use_openmetrics: false`)로 구성되어 있습니다. 최신 기능을 모두 사용하려면 Datadog은 _최신_ 모드를 활성화할 것을 권장합니다. 자세한 정보를 확인하려면 [개방형메트릭 기반 통합을 위한 최신 및 레거시 버전 관리][6]를 참조하세요.

Istio 메트릭을 수집하는 Datadog 인스턴스가 여러 개 존재하는 경우 모든 인스턴스에서 동일한 모드를 사용하고 있는지 확인하세요. 그렇지 않으면 Datadog 사이트에서 메트릭 데이터가 변동될 수도 있습니다.

`[OpenMetrics V1]`, `[OpenMetrics V2]` 또는 `[OpenMetrics V1 and V2]`로 표시된 메트릭은 해당 Istio 통합 모드에서만 사용할 수 있습니다. `Istio v1.5+`로 표시된 메트릭은 Istio 버전 1.5 이상에서 수집됩니다.

### 설치

Istio는 Datadog 에이전트에 포함되어 있습니다. Istio 서버 또는 클러스터에 [Datadog 에이전트를 설치][7]하여 Istio에 포인팅되도록 합니다.

#### Envoy

Istio의 Envoy 프록시를 모니터링하려면 [Envoy 통합][8]을 설정합니다.

### 설정

#### 메트릭 수집
Istio v1.5+를 모니터링하기 위한 Prometheus 형식의 메트릭용 [Istio 아키텍처][9]와 매칭되는 두 가지 핵심 구성 요소가 있습니다.

- **데이터 플레인**: `istio-proxy` 사이드카 컨테이너
- **컨트롤 플레인**: 프록시 관리 `istiod` 서비스

모두 `istio` 에이전트 점검으로 실행되지만 책임은 서로 다르며 별도로 설정됩니다.

##### 데이터 플레인 설정

기본 [`istio.d/auto_conf.yaml`][10] 파일은 각 `istio-proxy` 사이드카 컨테이너에 대한 모니터링을 자동 설정합니다. 에이전트는 자동으로 감지되는 각 사이드카 컨테이너에 대한 점검을 초기화합니다. 본 설정은 각 사이드카 컨테이너가 노출하는 데이터에 대한 `istio.mesh.*` 메트릭의 보고를 활성화합니다.

통합의 데이터 플레인 부분을 사용자 지정하려면 커스텀 Istio 설정 파일 `istio.yaml`을 생성합니다. [쿠버네티스(Kubernetes) 통합 설정][4] 또는 [도커(Docker)의 자동탐지로 통합 설정][5]을 참조하세요.

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

추가 설정으로 해당 파일을 사용자 지정합니다. 사용 가능한 모든 설정 옵션을 확인하려면 [istio.d/conf.yaml 샘플][11]을 참조하세요.

##### 컨트롤 플레인 설정
Istio 컨트롤 플레인을 모니터링하고 `mixer`, `galley`, `pilot`, `citadel` 메트릭을 보고하려면 에이전트가 `istiod` 배포를 모니터링하도록 설정해야 합니다. Istio v1.5 이상에서는 `istio-system` 네임스페이스에서 `istiod` 배포에 다음 포드 어노테이션을 적용합니다.

{{< tabs >}}
{{% tab "Annotations v1" %}}

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

{{% /tab %}}
{{% tab "Annotations v2" %}}

**참고**: 주석 v2는 에이전트 v7.36 이상에서 지원됩니다.

```yaml
ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
  {
    "Istio": {
      "istiod_endpoint": "http://%%host%%:15014/metrics",
      "use_openmetrics": "true"
    }
  }
```

{{% /tab %}}
{{< /tabs >}}



본 어노테이션은 컨테이너 `discovery`를 지정하여 이 포드의 Istio 컨테이너의 기본 컨테이너 이름과 매칭합니다. 지정합니다. 만약 다른 경우 해당 어노테이션 `ad.datadoghq.com/<CONTAINER_NAME>.checks`을 Istio 컨테이너의 이름(`.spec.containers[i].name`)으로 교체합니다.

해당 어노테이션을 적용하는 방식은 사용하는 [Istio 배포 전략(Istioctl, Helm, 오퍼레이터)][12]에 따라 달라집니다. 해당 포드 어노테이션을 적용하는 적합한 방법을 확인하려면 Istio 문서를 참조합니다. 사용 가능한 모든 설정 옵션은 [istio.d/conf.yaml 샘플][11]을 참조합니다.

#### Datadog 에이전트 포드에 대한 사이드카 삽입 비활성화

[컨테이너에 Datadog 에이전트]를 설치하는 경우[13], Datadog은 먼저 Istio의 사이드카 삽입을 비활성화할 것을 권장합니다.

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

_Istio 버전 <= 1.9:_

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

먼저 Datadog 에이전트를 활성화하여 쿠버네티스(Kubernetes)에서 로그 수집을 실행합니다. [쿠버네티스(Kubernetes) 로그 수집][14]을 참조하세요.

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

1. [Istio에서 Envoy 액세스 로깅][15] 활성화하기
2. `istio-proxy` 컨테이너가 삽입된 포드에 다음 어노테이션을 적용합니다.

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

[에이전트의 `info` 하위 명령을 실행][16]하고 점검 섹션에서 `istio`을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "istio" >}}


### 이벤트

Istio 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "istio" >}}


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

Istio 프록시 사이드카 삽입이 활성화된 경우, `istio_mesh_endpoint`와 동일한 메트릭 엔드포인트를 사용한 [개방형메트릭 통합][17]을 통해 다른 Prometheus 메트릭을 모니터링하면 커스텀 메트릭 사용량이 증가하고 메트릭이 중복 수집될 수 있습니다.

개방형메트릭 설정이 메트릭을 과다 수집하지 않도록 하려면 다음 작업 중 하나를 수행합니다.

1. `metrics` 설정 옵션에서 특정 메트릭 매칭을 사용합니다.
2. `metrics`에 와일드카드 `*` 값을 사용하는 경우, 다음 개방형메트릭 통합 옵션을 사용하여 Istio 및 Envoy 통합이 이미 지원하는 메트릭을 제외합니다.

#### 일반 메트릭 수집이 포함된 개방형메트릭 최신 모드 설정

설정에서 Istio 및 Envoy 메트릭을 제외해야 높은 커스텀 메트릭 요금이 청구되지 않습니다. `openmetrics_endpoint`이 활성화된 경우 `exclude_metrics`을 사용합니다.

```yaml
## Every instance is scheduled independent of the others.
#
instances:
  - openmetrics_endpoint: <OPENMETRICS_ENDPOINT>
    metrics:
    - '.*'
    exclude_metrics:
      - istio_*
      - envoy_*

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

도움이 필요하신가요? [Datadog 지원팀][18]에 문의해 주세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog으로 Istio 서비스 메시 모니터링하기][19]
- [Datadog이 주요 메트릭을 수집하여 Istio를 모니터링하는 방법][20]
- [Datadog으로 Istio를 모니터링하는 방법][3]


[1]: https://www.datadoghq.com/blog/monitor-istio-with-npm/
[2]: https://docs.datadoghq.com/ko/tracing/setup_overview/proxy_setup/?tab=istio
[3]: https://www.datadoghq.com/blog/istio-datadog/
[4]: https://docs.datadoghq.com/ko/containers/kubernetes/integrations/
[5]: https://docs.datadoghq.com/ko/containers/docker/integrations/
[6]: https://docs.datadoghq.com/ko/integrations/guide/versions-for-openmetrics-based-integrations
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: https://github.com/DataDog/integrations-core/tree/master/envoy#istio
[9]: https://istio.io/latest/docs/ops/deployment/architecture/
[10]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml
[11]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/conf.yaml.example
[12]: https://istio.io/latest/docs/setup/install/
[13]: https://docs.datadoghq.com/ko/agent/kubernetes/
[14]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
[15]: https://istio.io/latest/docs/tasks/observability/logs/access-log/
[16]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[17]: https://docs.datadoghq.com/ko/integrations/openmetrics/
[18]: https://docs.datadoghq.com/ko/help/
[19]: https://www.datadoghq.com/blog/monitor-istio-with-datadog
[20]: https://www.datadoghq.com/blog/istio-metrics/