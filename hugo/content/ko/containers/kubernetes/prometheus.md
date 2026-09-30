---
aliases:
- /ko/getting_started/prometheus
- /ko/getting_started/integrations/prometheus
- /ko/agent/openmetrics
- /ko/agent/prometheus
- /ko/agent/kubernetes/prometheus
description: Datadog Agent와 Autodiscovery를 사용하여 Kubernetes 워크로드에서 Prometheus 및 OpenMetrics
  수집
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: 블로그
  text: Kubernetes 연산자를 모니터링하여 애플리케이션이 원활하게 실행되도록 유지
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
  text: Prometheus 메트릭을 Datadog 메트릭에 매핑
title: Kubernetes Prometheus 및 OpenMetrics 메트릭 수집
---
## 개요 {#overview}

Datadog Agent와 [OpenMetrics][1] 또는 [Prometheus][2] 통합을 사용하여 Kubernetes 내부 애플리케이션에서 노출된 Prometheus 및 OpenMetrics 메트릭을 수집합니다. 기본적으로 일반 Prometheus 검사에서 검색된 모든 메트릭은 사용자 지정 메트릭으로 간주됩니다.

버전 6.5.0부터 Agent에 Prometheus 엔드포인트를 스크레이핑할 수 있는 [OpenMetrics][3] 및 [Prometheus][4] 검사가 포함됩니다. 사용자 지정 검사 작성을 비롯한 `OpenMetricsCheck` 인터페이스의 고급 사용법을 자세히 알아보려면 [개발자 도구][5] 섹션을 참조하세요.

이 페이지에는 Prometheus 엔드포인트에서 사용자 지정 메트릭을 스크레이핑하게 해주는 이러한 검사의 기본적인 사용법을 설명했습니다. Prometheus 및 OpenMetrics 메트릭이 Datadog 메트릭에 매핑되는 방식에 대한 자세한 설명은 [Prometheus 메트릭을 Datadog 메트릭에 매핑][6] 가이드를 참조하세요.

**참고**: OpenMetrics 검사가 더 효율적이고 Prometheus 텍스트 형식을 완전히 지원하기 때문에 Datadog에서는 이 검사 사용을 권장합니다. Prometheus 검사는 메트릭 엔드포인트가 텍스트 형식을 지원하지 않는 경우에만 사용하세요.

## 설정 {#setup}

### 설치 {#installation}

[Kubernetes 클러스터에 Datadog Agent를 배포합니다][7]. OpenMetrics 및 Prometheus 검사는 [Datadog Agent][8] 패키지에 포함되어 있으므로 컨테이너나 호스트에 다른 것을 설치할 필요가 없습니다.

### 구성 {#configuration}

Autodiscovery를 사용하여 OpenMetrics 또는 Prometheus 검사를 구성하는 경우, OpenMetrics/Prometheus 메트릭을 노출하는 **포드**에 다음 `annotations`를 적용하세요.

{{< tabs >}}
{{% tab "Kubernetes(AD v2)" %}}

**참고:** AD Annotations v2는 통합 구성을 간소화하기 위해 Datadog Agent 버전 7.36에 도입되었습니다. 이전 버전의 Datadog Agent에서는 AD Annotations v1을 사용하세요.

```yaml
# (...)
metadata:
  #(...)
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
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
    - name: '<CONTAINER_NAME>'
```

{{% /tab %}}
{{% tab "Kubernetes(AD v1)" %}}

```yaml
# (...)
metadata:
  #(...)
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.check_names: |
      ["openmetrics"]
    ad.datadoghq.com/<CONTAINER_NAME>.init_configs: |
      [{}]
    ad.datadoghq.com/<CONTAINER_NAME>.instances: |
      [
        {
          "openmetrics_endpoint": "http://%%host%%:%%port%%/<PROMETHEUS_ENDPOINT> ",
          "namespace": "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>",
          "metrics": [{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}]
        }
      ]
spec:
  containers:
    - name: '<CONTAINER_NAME>'
```

{{% /tab %}}
{{< /tabs >}}

다음 자리 표시자 설정 값을 사용합니다.

| 자리 표시자                              | 설명                                                                                        |
|------------------------------------------|----------------------------------------------------------------------------------------------------|
| `<CONTAINER_NAME>`                 | 메트릭을 노출하는 컨테이너 이름과 일치합니다. |
| `<PROMETHEUS_ENDPOINT>`                  | 컨테이너가 제공하는 메트릭의 URL 경로입니다(Prometheus 형식으로).                            |
| `<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>` | Datadog에서 볼 때 모든 메트릭에 접두사가 붙도록 네임스페이스를 설정합니다.                               |
| `<METRIC_TO_FETCH>`                      | Prometheus 엔드포인트에서 가져올 Prometheus 메트릭 키입니다.                                 |
| `<NEW_METRIC_NAME>`                      | Datadog에서`<METRIC_TO_FETCH>` 메트릭 키를 `<NEW_METRIC_NAME>`으로 변환합니다.                   |


`metrics` 구성은 사용자 지정 메트릭으로 검색할 메트릭 목록입니다. 가져올 각 메트릭과 Datadog에서 원하는 메트릭 이름을 키 값 쌍으로 포함합니다(예: `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}`). 과도한 사용자 지정 메트릭 요금을 방지하기 위해 Datadog에서는 필요한 메트릭만 포함하도록 범위를 제한할 것을 권장합니다. 대신 원하는 메트릭을 정규식으로 해석한 메트릭 이름 문자열 목록으로 제공하여 원하는 메트릭과 그 메트릭의 현재 이름을 가져올 수 있습니다. **모든** 메트릭을 원하는 경우, `"*"`가 아니라 `".*"`를 사용하세요.

**참고:** 정규식은 많은 수의 사용자 지정 메트릭을 보낼 수 있습니다.

`namespace` 및 `metrics` 등 인스턴스에 사용할 수 있는 파라미터 전체 목록은 [sample configuration openmetrics.d/conf.yaml][9]을 참조하세요.

**참고**: 검사는 기본적으로 메트릭 2,000개로 제한됩니다. 이 한도를 수정하려면 선택 사항인 `max_returned_metrics` 파라미터를 지정하세요.

## 시작하기 {#getting-started}

### 단순 메트릭 수집(OpenMetrics 검사) {#simple-metric-collection-openmetrics-check}

1. [Datadog Agent를 실행합니다][10].

2. [Prometheus `prometheus.yaml`][11]를 사용하여 포드에서 Autodiscovery 구성을 사용해 Prometheus 배포 예시를 실행합니다.
   {{< tabs >}}
   {{% tab "Kubernetes(AD v2)" %}}

   **참고:** AD Annotations v2는 통합 구성을 간소화하기 위해 Datadog Agent 버전 7.36에 도입되었습니다. 이전 버전의 Datadog Agent에서는 AD Annotations v1을 사용하세요.

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
   {{% /tab %}}
   {{% tab "Kubernetes(AD v1)" %}}

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

   {{% /tab %}}
   {{< /tabs >}}

     Command to create the Prometheus Deployment:

    ```shell
    kubectl create -f prometheus.yaml
    ```

3. [Fleet Automation][16] 페이지로 이동하여 `openmetrics` 통합을 필터링해 검사의 상태에 관한 상세한 정보를 조회합니다.

4. [메트릭 요약][12] 페이지로 이동하여 이 예시 포드에서 수집된 메트릭을 확인합니다. 이 구성은 메트릭 `promhttp_metric_handler_requests`, `promhttp_metric_handler_requests_in_flight` 및 `go_memory`로 시작하는 모든 노출된 메트릭을 수집합니다.

    {{< img src="integrations/guide/prometheus_kubernetes/openmetrics_v2_collected_metric_kubernetes.png" alt="Prometheus 메트릭 수집 kubernetes">}}

## Prometheus 어노테이션으로 메트릭 수집(Prometheus 검사) {#metric-collection-with-prometheus-annotations-prometheus-check}

Datadog Agent는 Prometheus Autodiscovery를 사용해 네이티브 Prometheus 어노테이션을 감지하고(예: `prometheus.io/scrape`, `prometheus.io/path`, `prometheus.io/port`) 자동으로 OpenMetrics 검사를 예약하여 Kubernetes에서 Prometheus 메트릭을 수집할 수 있습니다.

**참고**: OpenMetrics 검사가 더 효율적이고 Prometheus 텍스트 형식을 완전히 지원하기 때문에 Datadog에서는 이 검사 사용을 권장합니다. Prometheus 검사는 메트릭 엔드포인트가 텍스트 형식을 지원하지 않는 경우에만 사용하세요.

### 요구 사항 {#requirements}

- Datadog Agent v7.27+ 또는 v6.27+(포드 검사용)
- Datadog Cluster Agent v1.11+(서비스 및 엔드포인트 검사용)

### 구성 {#configuration-1}

이 기능을 활성화하기 전에 어느 포드와 서비스에 `prometheus.io/scrape=true` 어노테이션이 있는지 검사하는 것이 좋습니다. 이 작업은 다음 명령으로 수행할 수 있습니다.

```shell
kubectl get pods -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces

kubectl get services -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces
```

Prometheus 스크레이프 기능이 활성화되면 Datadog Agent가 이러한 리소스에서 사용자 지정 메트릭을 수집합니다. 이러한 리소스에서 사용자 지정 메트릭을 수집하고 싶지 않은 경우, 이 어노테이션을 제거하거나 [고급 구성 섹션](#advanced-configuration)에 설명된 것과 같이 Autodiscovery 규칙을 업데이트할 수 있습니다.

**참고**: 고급 구성 없이 이 기능을 활성화하면 사용자 지정 메트릭이 대폭 증가하여 청구에 영향이 발생할 수 있습니다. 컨테이너/포드/서비스의 일부에서만 메트릭을 수집하는 방법은 [고급 구성 섹션](#advanced-configuration)을 참조하세요.

#### 기본 구성 {#basic-configuration}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator 구성이 다음을 포함하도록 업데이트하세요.

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    prometheusScrape:
      enabled: true
      enableServiceEndpoints: true
{{< /code-block >}}

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

Helm 구성이 다음을 포함하도록 업데이트하세요.

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
  # (...)
{{< /code-block >}}

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{% tab "수동(DaemonSet)" %}}

Agent `daemonset.yaml`의 DaemonSet 매니페스트에서 Agent 컨테이너에 다음 환경 변수 추가:

```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_VERSION
  value: "2"
```
Cluster Agent가 활성화된 경우, 해당 매니페스트 `cluster-agent-deployment.yaml` 안에 Cluster Agent 컨테이너에 대한 다음 환경 변수 추가:

```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_SERVICE_ENDPOINTS
  value: "true"
```

{{% /tab %}}
{{< /tabs >}}

이를 통해 Datadog Agent가 기본 Prometheus 어노테이션이 있는 포드를 감지하고 해당 OpenMetrics 검사를 생성하도록 지시합니다.

또한, (활성화된 경우) Datadog Cluster Agent가 기본 Prometheus 어노테이션이 있는 서비스를 감지하고 해당 OpenMetrics 검사를 생성하도록 지시합니다.

- `prometheus.io/scrape=true`: 필수입니다.
- `prometheus.io/path`: 선택 사항이며, 기본적으로 `/metrics`로 설정됩니다.
- `prometheus.io/port`: 선택 사항이며, 기본값은 `%%port%%`입니다(컨테이너/서비스 포트로 대체되는 [템플릿 변수][13]).

이 구성은 [OpenMetrics 통합][1]의 기본 구성을 사용하여 모든 노출된 메트릭을 수집하는 검사를 생성합니다.

#### 고급 구성 {#advanced-configuration}

`additionalConfigs` 필드를 사용하여 (기본 Prometheus 어노테이션 이상의) 메트릭 수집을 더 구성할 수 있습니다.

##### 추가 OpenMetrics 검사 구성 {#additional-openmetrics-check-configurations}

추가 OpenMetrics 검사 구성을 정의하려면 `additionalConfigs.configurations`를 사용하세요. `additionalConfigs`에서 전달할 수 있는 [지원되는 OpenMetrics 파라미터 목록][15]을 참조하세요.

##### 사용자 지정 Autodiscovery 규칙 {#custom-autodiscovery-rules}

사용자 지정 Autodiscovery 규칙을 정의하려면 `additionalConfigs.autodiscovery`를 사용합니다. 이러한 규칙은 컨테이너 이름, Kubernetes 어노테이션 또는 둘 모두를 기반으로 할 수 있습니다.

`additionalConfigs.autodiscovery.kubernetes_container_names`
: 대상으로 지정할 컨테이너 이름 목록을 정규식 형식으로 표시한 것입니다.

`additionalConfigs.autodiscovery.kubernetes_annotations`
: 검색 규칙을 정의할 어노테이션 맵 두 가지(`include` 및 `exclude`)입니다.

  기본값:
  ```yaml
  include:
     prometheus.io/scrape: "true"
  exclude:
     prometheus.io/scrape: "false"
  ```

`kubernetes_container_names` 및 `kubernetes_annotations`가 모두 정의된 경우, **AND** 로직이 사용됩니다(두 규칙이 일치해야 함).

##### 예시 {#examples}

다음 구성은 이름이 `my-app`이고 어노테이션 `app=my-app`을 사용해 포드에서 실행 중인 컨테이너를 대상으로 지정합니다. OpenMetrics 검사 구성은 `send_distribution_buckets` 옵션을 활성화하고 5초의 사용자 지정 시간 제한을 정의하도록 사용자 지정할 수 있습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator 구성이 다음을 포함하도록 업데이트하세요.

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    prometheusScrape:
      enabled: true
      enableServiceEndpoints: true
      additionalConfigs: |-
        - autodiscovery:
            kubernetes_container_names:
              - my-app
            kubernetes_annotations:
              include:
                app: my-app
          configurations:
            - timeout: 5
              send_distribution_buckets: true
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
    additionalConfigs:
      - autodiscovery:
          kubernetes_container_names:
            - my-app
          kubernetes_annotations:
            include:
              app: my-app
        configurations:
          - timeout: 5
            send_distribution_buckets: true

{{< /code-block >}}
{{% /tab %}}
{{% tab "수동(DaemonSet)" %}}

DaemonSet의 경우, 고급 구성이 `additionalConfigs` 필드가 아니라 `DD_PROMETHEUS_SCRAPE_CHECKS` 환경 변수에서 정의됩니다.

```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_CHECKS
  value: "[{\"autodiscovery\":{\"kubernetes_annotations\":{\"include\":{\"app\":\"my-app\"}},\"kubernetes_container_names\":[\"my-app\"]},\"configurations\":[{\"send_distribution_buckets\":true,\"timeout\":5}]}]"
- name: DD_PROMETHEUS_SCRAPE_VERSION
  value: "2"
```


[1]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[2]: https://github.com/DataDog/datadog-agent/blob/main/comp/core/autodiscovery/common/types/prometheus.go#L99-L123
{{% /tab %}}
{{< /tabs >}}

## 사용자 지정부터 공식 통합까지 {#from-custom-to-official-integration}

기본적으로 일반 Prometheus 검사에서 검색된 모든 메트릭은 사용자 지정 메트릭으로 간주됩니다. 상용 소프트웨어를 모니터링 중이고, 공식 통합할 가치가 있다고 생각되는 경우 망설이지 말고 [기여][5]하세요!

공식 통합에는 자체적인 전용 디렉터리가 있습니다. 일반 검사에 기본 구성 및 메트릭 메타데이터를 하드코딩하기 위한 기본 인스턴스 메커니즘이 있습니다. 예를 들어 [kube-proxy][14] 통합을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/openmetrics/
[2]: /ko/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /ko/extend/custom_checks/prometheus/
[6]: /ko/integrations/guide/prometheus-metrics
[7]: /ko/agent/kubernetes/#installation
[8]: /ko/getting_started/tagging/
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[11]: /ko/resources/yaml/prometheus.yaml
[12]: https://app.datadoghq.com/metric/summary
[13]: /ko/agent/faq/template_variables/
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
[15]: https://github.com/DataDog/datadog-agent/blob/main/comp/core/autodiscovery/common/types/prometheus.go#L57-L123
[16]: https://app.datadoghq.com/fleet?query=integration:openmetrics