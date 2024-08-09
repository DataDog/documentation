---
aliases:
- /ko/getting_started/prometheus
- /ko/getting_started/integrations/prometheus
- /ko/agent/openmetrics
- /ko/agent/prometheus
- /ko/agent/kubernetes/prometheus
further_reading:
- link: /agent/kubernetes/log/
  tag: 설명서
  text: 애플리케이션 로그 수집
- link: /agent/kubernetes/apm/
  tag: 설명서
  text: 애플리케이션 트레이스 수집
- link: /agent/kubernetes/integrations/
  tag: 설명서
  text: 애플리케이션 메트릭 및 로그 자동 수집
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
- link: /agent/kubernetes/tag/
  tag: 설명서
  text: 컨테이너에서 내보내는 모든 데이터에 태그 할당
- link: /integrations/guide/prometheus-metrics/
  tag: 설명서
  text: Prometheus 메트릭을 Datadog 메트릭에 매핑하기
title: 쿠버네티스 Prometheus 및 OpenMetrics 메트릭 수집
---

Datadog 에이전트와 [Datadog-OpenMetrics][1] 또는 [Datadog-Prometheus][2] 통합을 사용하여 쿠버네티스 내부 애플리케이션에서 노출된 Prometheus 및 OpenMetrics 메트릭을 수집합니다.

**참고**: 기본적으로 일반 Prometheus 검사에서 검색된 모든 메트릭은 커스텀 메트릭으로 간주됩니다.

## 개요

버전 6.5.0부터 Prometheus 엔드포인트를 스크래핑할 수 있는 [OpenMetrics][3] 및 [Prometheus][4] 검사가 에이전트에 포함되어 있습니다. Datadog은 더 효율적이고 Prometheus 텍스트 형식을 완벽하게 지원하는 OpenMetrics 검사를 사용할 것을 권장합니다. 커스텀 검사 작성 등 `OpenMetricsCheck` 인터페이스의 고급 사용법은 [개발자 도구][5] 섹션을 참조하세요. 또한, 메트릭 엔드포인트가 텍스트 형식을 지원하지 않는 경우에만 Prometheus 검사를 사용하세요.

이 페이지에서는 Prometheus 엔드포인트에서 커스텀 메트릭을 모을 수 있는 검사에 대한 기본 사용법을 설명합니다.

Prometheus 및 OpenMetrics 메트릭이 Datadog 메트릭에 매핑되는 방식은  [Prometheus 메트릭을 Datadog 메트릭에 매핑하기][6] 가이드를 참조하세요.

## 설정

### 설치

[쿠버네티스 클러스터에서 Datadog 에이전트를 배포합니다][7]. OpenMetrics 및 Prometheus 검사는 [Datadog 에이전트][8] 패키지에 포함되어 있으므로 컨테이너나 호스트에 다른 것을 설치할 필요가 없습니다.

### 설정

자동 탐지를 사용하여 OpenMetrics 또는 Prometheus 검사를 설정하려면 OpenMetrics/Prometheus 메트릭을 노출하는 **포드**에 다음 `annotations`를 적용하세요:

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**참고: 통합 설정 간소화를 위해 Datadog 에이전트 7.36에 AD Annotations v2가 도입되었습니다. 이전 버전의 Datadog 에이전트에 대해서는 AD Annotations v1을 사용하세요.

```yaml
# (...)
metadata:
  #(...)
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
      {
        "openmetrics": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:%%port%%/<PROMETHEUS_ENDPOINT> ",
              "namespace": "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>",
              "metrics": [{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}]
            }
          ]
        }
      }

spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
```

{{% /tab %}}
{{% tab "Kubernetes (AD v1)" %}}

```yaml
# (...)
metadata:
  #(...)
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: |
      ["openmetrics"]
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: |
      [{}]
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: |
      [
        {
          "openmetrics_endpoint": "http://%%host%%:%%port%%/<PROMETHEUS_ENDPOINT> ",
          "namespace": "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>",
          "metrics": [{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}]
        }
      ]
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
```

{{% /tab %}}
{{< /tabs >}}

다음 설정 플레이스홀더 값을 사용합니다:

| 플레이스홀더                              | 설명                                                                                        |
|------------------------------------------|----------------------------------------------------------------------------------------------------|
| `<CONTAINER_IDENTIFIER>`                 | `annotations`에 사용된 식별자는 메트릭을 노출하는 `name` 컨테이너와 일치해야 합니다. |
| `<PROMETHEUS_ENDPOINT>`                  | Prometheus 형식으로 컨테이너에서 제공하는 메트릭 URL 경로입니다.                            |
| `<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>` | Datadog에서 모든 메트릭의 앞에 표시될 네임스페이스를 설정합니다.                               |
| `<METRIC_TO_FETCH>`                      | Prometheus 엔드포인트에서 가져올 Prometheus 메트릭 키입니다.                                 |
| `<NEW_METRIC_NAME>`                      | Datadog에서 `<METRIC_TO_FETCH>` 메트릭 키를  `<NEW_METRIC_NAME>`로 변환합니다.                   |


`metrics` 설정은 커스텀 메트릭으로 검색할 메트릭 목록입니다. 가져올 각 메트릭과 원하는 메트릭 이름을 `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}`과 같이 키-값 쌍으로 Datadog에 포함합니다. 또는 정규식으로 해석되는 메트릭 이름 문자열 목록을 제공하여 원하는 메트릭을 현재 이름으로 가져올 수 있습니다. **모든** 메트릭을 사용하려면 `"*"` 대신 `".*"`를 사용합니다.

**참고: 정규식은 잠재적으로 많은 커스텀 메트릭을 전송할 수 있습니다.

`namespace` 및 `metrics`를 포함하여 인스턴스에 사용할 수 있는 매개 변수 전체 목록은 [sample configuration openmetrics.d/conf.yaml][9]을 참조하세요.

## 시작하기

### 단순 메트릭 수집

1. [Datadog 에이전트 실행][10].

2. 포드에서 자동 탐지 설정을 통한 Prometheus 배포 예제를 실행하기 위해 [Prometheus `prometheus.yaml`][11]을 사용합니다:
   {{< tabs >}}
   {{% tab "Kubernetes (AD v2)" %}}

   **참고: 통합 설정 간소화를 위해 Datadog 에이전트 7.36에 AD Annotations v2가 도입되었습니다. 이전 버전의 Datadog 에이전트에 대해서는 AD Annotations v1을 사용하세요.

   ```yaml
     # (...)
    spec:
      template:
        metadata:
          annotations:
            ad.datadoghq.com/prometheus-example.checks: |
              {
                "openmetrics": {
                  "instances": [
                    {
                      "openmetrics_endpoint": "http://%%host%%:%%port%%/metrics",
                      "namespace": "documentation_example_kubernetes",
                      "metrics": [
                          {"promhttp_metric_handler_requests": "handler.requests"},
                          {"promhttp_metric_handler_requests_in_flight": "handler.requests.in_flight"},
                          "go_memory.*"
                        ]
                    }
                  ]
                }
              }
        spec:
          containers:
          - name: prometheus-example
          # (...)
   ```
   {{< /tabs >}}
   {{% tab "Kubernetes (AD v1)" %}}

   ```yaml
     # (...)
    spec:
      template:
        metadata:
          annotations:
            ad.datadoghq.com/prometheus-example.check_names: |
              ["openmetrics"]
            ad.datadoghq.com/prometheus-example.init_configs: |
              [{}]
            ad.datadoghq.com/prometheus-example.instances: |
              [
                {
                  "openmetrics_endpoint": "http://%%host%%:%%port%%/metrics",
                  "namespace": "documentation_example_kubernetes",
                  "metrics": [
                    {"promhttp_metric_handler_requests": "handler.requests"},
                    {"promhttp_metric_handler_requests_in_flight": "handler.requests.in_flight"},
                    "go_memory.*"
                  ]
                }
              ]
        spec:
          containers:
          - name: prometheus-example
          # (...)
   ```

   {{< /tabs >}}
   {{< /tabs >}}

   Prometheus 배포를 생성하는 명령:

    ```shell
    kubectl create -f prometheus.yaml
    ```

3. [메트릭 요약][12] 페이지로 이동하여 예제 포드에서 수집한 메트릭을 확인합니다. 이 설정은 `promhttp_metric_handler_requests`, `promhttp_metric_handler_requests_in_flight` 메트릭 및 `go_memory`로 시작하는 모든 노출된 메트릭을 수집합니다.

    {{< img src="integrations/guide/prometheus_kubernetes/openmetrics_v2_collected_metric_kubernetes.png" alt="Prometheus metric collected kubernetes">}}

## Prometheus 어노테이션으로 메트릭 수집

Prometheus 자동 탐지를 통해 Datadog 에이전트는 기본 Prometheus 어노테이션(예: `prometheus.io/scrape`, `prometheus.io/path`, `prometheus.io/port`)을 감지하고 OpenMetrics 검사를 자동으로 예약하여 쿠버네티스에서 Prometheus 메트릭을 수집할 수 있습니다.

### 요건

- Datadog 에이전트 v7.27+ 또는 v6.27+ (포드 검사용)
- Datadog 클러스터 에이전트 v1.11+ (서비스 및 엔드포인트 검사용)

### 설정

이 기능을 활성화하기 전에 어떤 포드와 서비스에 `prometheus.io/scrape=true` 어노테이션이 있는지 확인하는 것이 좋습니다. 다음 명령어로 확인할 수 있습니다:

```shell
kubectl get pods -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces

kubectl get services -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces
```

Prometheus 스크랩 기능이 활성화되면 Datadog 에이전트는 이러한 리소스에서 커스텀 메트릭을 수집합니다. 이 리소스로부터 커스텀 메트릭을 수집하지 않으려면 어노테이션을 제거하거나 [고급 설정 섹션](#advanced-configuration)에 설명된 대로 자동 탐지 규칙을 업데이트하면 됩니다.

#### 기본 설정

{{< tabs >}}
{{% tab "Helm" %}}

Helm `values.yaml`에 다음을 추가합니다:

```yaml
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
  # (...)
```
{{% /tab %}}
{{% tab "DaemonSet" %}}

`daemonset.yaml` 에이전트의 데몬셋 매니페스트에서 해당 에이전트 컨테이너에 대한 다음 환경 변수를 추가합니다:
```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_VERSION
  value: "2"
```
클러스터 에이전트가 활성화된 경우, `cluster-agent-deployment.yaml` 매니페스트 내에서 해당 클러스터 에이전트 컨테이너에 대해 다음 환경 변수를 추가합니다:
```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_SERVICE_ENDPOINTS
  value: "true" 
```

{{% /tab %}}
{{< /tabs >}}

이를 통해 Datadog 에이전트가 기본 Prometheus 어노테이션이 있는 포드를 감지하고 해당 OpenMetrics 검사를 생성하도록 지시합니다.

또한, (활성화된 경우) Datadog 클러스터 에이전트가 기본 Prometheus 어노테이션이 있는 서비스를 감지하고 해당 OpenMetrics 검사를 생성하도록 지시합니다.

- `prometheus.io/scrape=true`: 필수 
- `prometheus.io/path`: 선택 사항, 기본값 `/metrics`.
- `prometheus.io/port`: 선택 사항, 기본값 `%%port%%`, 컨테이너/서비스 포트로 대체되는 [템플릿 변수][13].

이 설정은 [OpenMetrics 통합][1] 기본 설정을 사용하여 노출된 모든 메트릭을 수집하는 검사를 생성합니다.

#### 고급 설정

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml`의 `additionalConfigs` 설정 필드를 사용하여 기본 Prometheus 어노테이션이 아닌 고급 OpenMetrics 검사 설정 또는 사용자 지정 자동 탐지 규칙을 정의할 수 있습니다.

`additionalConfigs`는 OpenMetrics 검사 설정 및 자동 탐지 규칙이 포함된 구조 목록입니다.

[이 페이지][2]에 있는 매개 변수만 자동 탐지 기능이 있는 OpenMetrics v2에서 지원되며, 설정 목록에서 전달됩니다.

자동 탐지 설정은 컨테이너 이름, 쿠버네티스 어노테이션 또는 둘 다를 기반으로 할 수 있습니다. `kubernetes_container_names`와 `kubernetes_annotations` 둘 다 정의된 경우 AND 로직을 사용합니다(두 규칙이 모두 일치해야 함).

`kubernetes_container_names`는 목표가 될 컨테이너 이름의 목록이며 `*` 와일드카드를 지원합니다.

`kubernetes_annotations`는 검색 규칙을 정의하는 두 개의 어노테이션 맵인 `include`와 `exclude`를 포함합니다.

**참고: Datadog 에이전트 설정에서 `kubernetes_annotations`의 기본값은 다음과 같습니다:

```yaml
kubernetes_annotations:
  include:
     prometheus.io/scrape: "true"
  exclude:
     prometheus.io/scrape: "false"
```

**예시:**

이 예시는 `app=my-app` 어노테이션과 함께 포드에서 실행 중인 `my-app` 컨테이너를 대상으로 고급 설정을 정의합니다. `send_distribution_buckets` 옵션을 활성화하고 시간 제한을 5초로 정의하여 사용자 지정 OpenMetrics 검사를 설정합니다.

```yaml
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
    additionalConfigs:
      -
        configurations:
        - timeout: 5
          send_distribution_buckets: true
        autodiscovery:
          kubernetes_container_names:
            - my-app
          kubernetes_annotations:
            include:
              app: my-app
```


[1]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/autodiscovery/common/types/prometheus.go#L92-L100
{{% /tab %}}
{{% tab "DaemonSet" %}}

에이전트 및 클러스터 에이전트 매니페스트의 `DD_PROMETHEUS_SCRAPE_CHECKS` 환경 변수를 사용하여 기본 Prometheus 어노테이션이 아닌 고급 OpenMetrics 검사 설정 또는 사용자 지정 자동 탐지 규칙을 정의할 수 있습니다.

`DD_PROMETHEUS_SCRAPE_CHECKS`는 OpenMetrics 검사 설정 및 자동 탐지 규칙이 포함된 구조 목록입니다.

[이 페이지][2]에 있는 매개 변수만 자동 탐지 기능이 있는 OpenMetrics v2에서 지원되며 설정 목록에서 전달할 수 있습니다.

자동 탐지 설정은 컨테이너 이름, 쿠버네티스 어노테이션 또는 둘 다를 기반으로 할 수 있습니다. `kubernetes_container_names`와 `kubernetes_annotations` 둘 다 정의된 경우 AND 로직을 사용합니다(두 규칙이 모두 일치해야 함).

`kubernetes_container_names`는 목표가 될 컨테이너 이름의 목록이며 `*` 와일드카드를 지원합니다.

`kubernetes_annotations`는 검색 규칙을 정의하는 두 개의 어노테이션 맵인 `include`와 `exclude`를 포함합니다.

**참고: Datadog 에이전트 설정에서 `kubernetes_annotations`의 기본값은 다음과 같습니다:

```yaml
- name: DD_PROMETHEUS_SCRAPE_CHECKS
  value: "[{\"autodiscovery\":{\"kubernetes_annotations\":{\"exclude\":{\"prometheus.io/scrape\":\"false\"},\"include\":{\"prometheus.io/scrape\":\"true\"}}}}]"
```

**예시:**

이 예시에서는 `app=my-app` 어노테이션과 함께 포드에서 실행 중인 `my-app` 컨테이너를 대상으로 고급 설정을 정의합니다. `send_distribution_buckets` 옵션을 활성화하고 시간 제한을 5초로 정의하여 사용자 지정 OpenMetrics 검사를 설정합니다.

```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_CHECKS
  value: "[{\"autodiscovery\":{\"kubernetes_annotations\":{\"include\":{\"app\":\"my-app\"}},\"kubernetes_container_names\":[\"my-app\"]},\"configurations\":[{\"send_distribution_buckets\":true,\"timeout\":5}]}]"
- name: DD_PROMETHEUS_SCRAPE_VERSION
  value: "2"
```


[1]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/autodiscovery/common/types/prometheus.go#L92-L100
{{% /tab %}}
{{< /tabs >}}

## 사용자 지정에서 공식 통합까지

기본적으로 일반 Prometheus 검사에서 검색된 모든 메트릭은 커스텀 메트릭으로 간주됩니다. 기성 소프트웨어에 대한 공식 통합이 필요할 경우 주저하지 마시고 [참여][5]해 주세요!

공식 통합 서비스에는 전용 디렉토리가 있습니다. 일반 검사에는 기본 설정 및 메트릭 메타데이터를 하드코딩하기 위한 기본 인스턴스 메커니즘이 있습니다. 예를 들어, [kube-proxy][14] 통합을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/openmetrics/
[2]: /ko/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /ko/developers/custom_checks/prometheus/
[6]: /ko/integrations/guide/prometheus-metrics
[7]: /ko/agent/kubernetes/#installation
[8]: /ko/getting_started/tagging/
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: https://app.datadoghq.com/account/settings#agent/kubernetes
[11]: /resources/yaml/prometheus.yaml
[12]: https://app.datadoghq.com/metric/summary
[13]: /ko/agent/faq/template_variables/
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy