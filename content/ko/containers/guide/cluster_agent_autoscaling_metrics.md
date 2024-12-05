---
aliases:
- /ko/agent/guide/cluster-agent-custom-metrics-server
- /ko/agent/cluster_agent/external_metrics
- /ko/containers/cluster_agent/external_metrics
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: 블로그
  text: Datadog 클러스터 에이전트 소개
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: 블로그
  text: 모든 Datadog 메트릭으로 Kubernetes 워크로드 오토스케일링
- link: /agent/cluster_agent/clusterchecks/
  tag: 설명서
  text: 자동탐지로 클러스터 검사 실행
- link: /agent/kubernetes/daemonset_setup/
  tag: 설명서
  text: Kubernetes DaemonSet 설정
- link: /agent/cluster_agent/troubleshooting/
  tag: 설명서
  text: Datadog 클러스터 에이전트 트러블슈팅
title: 클러스터 에이전트 커스텀 및 외부 메트릭을 사용하여 오토스케일링
---

## 개요

[Kubernetes 버전 1.2][1]에 도입된 수평 파드 오토스케일링은 `CPU`와 같은 기본 메트릭의 오토스케일링을 허용하지만, 애플리케이션과 함께 실행되기 위해서는 `metrics-server`라는 리소스가 필요합니다. Kubernetes 버전 1.6에서는 [커스텀 메트릭][2]의 오토스케일링이 가능합니다.

커스텀 메트릭은 사용자가 정의하며 클러스터 내에서 수집됩니다. Kubernetes 버전 1.10부터는 외부 메트릭에 대한 지원이 도입되어 Datadog에서 수집한 메트릭과 같이 클러스터 외부에서 모든 메트릭을 오토스케일링할 수 있습니다.

먼저 클러스터 에이전트를 외부 메트릭 공급자로 등록해야 합니다. 그런 다음 클러스터 에이전트가 제공한 메트릭을 사용하도록 HPA를 조정합니다.

버전 1.0.0부터 현재 Datadog 클러스터 에이전트의 커스텀 메트릭 서버는 외부 메트릭을 위한 외부 메트릭 공급자 인터페이스를 구현합니다. 이 페이지에서는 이를 설정하는 방법과 Datadog 메트릭을 기반으로 Kubernetes 워크로드를 오토스케일링하는 방법을 소개합니다.

## 설정

### 요건

1. Kubernetes 버전 1.10 이상: API 서버에 외부 메트릭 공급자 리소스를 등록해야 합니다.
2. Kubernetes [집합 레이어][3]를 활성화합니다.
3. 유효한 [Datadog API 키 ** 및** 애플리케이션 키][4]입니다.

### 설치

{{< tabs >}}
{{% tab "Helm" %}}

외부 메트릭 서버를 클러스터 에이전트와 함께 Helm에서 활성화하려면 [values.yaml][1] 파일을 다음 설정으로 업데이트합니다. 올바른 Datadog API 키, 애플리케이션 키를 제공하고 `clusterAgent.metricsProvider.enabled`를 `true`로 설정합니다. 그런 다음 Datadog Helm 차트를 다시 배포합니다:

  ```yaml
  datadog:
    apiKey: <DATADOG_API_KEY>
    appKey: <DATADOG_APP_KEY>
    #(...)

  clusterAgent:
    enabled: true
    # metricsProvider가 Datadog의 메트릭을 기반으로 확장할 수 있도록 설정합니다.
    metricsProvider:
      # clusterAgent.metricsProvider.enabled
      # 메트릭 공급자를 활성화하려면 이 값을 true로 설정합니다.
      enabled: true
  ```

필요한 RBAC 설정을 자동으로 업데이트하고 Kubernetes가 사용할 해당 `Service` 및 `APIService`를 설정합니다.

`api-key` 또는 `app-key` 데이터 키가 포함된 사전 생성된 `Secrets` 이름과 설정 `datadog.apiKeyExistingSecret` 및 `datadog.appKeyExistingSecret`를 참조하여 키를 설정할 수도 있습니다.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Operator" %}}

Datadog Operator에서 관리하는 클러스터 에이전트에서 외부 메트릭 서버를 사용하도록 설정하려면 먼저 [Datadog Operator를 설정][1]한 다음 유효한 Datadog API 키, 애플리케이션 키를 제공하고 `DatadogAgent` 커스텀 리소스에서 `features.externalMetricsServer.enabled`를 `true`로 설정합니다:

  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiKey: <DATADOG_API_KEY>
        appKey: <DATADOG_API_KEY>

    features:
      externalMetricsServer:
        enabled: true
  ```

Operator는 필요한 RBAC 설정을 자동으로 업데이트하고 Kubernetes가 사용할 해당 `Service` 및 `APIService`을 설정합니다.

미리 생성된 `Secrets`의 이름과 Datadog API 및 애플리케이션 키를 저장하는 데이터 키를 참조하여 키를 설정할 수도 있습니다.
  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiSecret:
          secretName: <SECRET_NAME>
          keyName: <KEY_FOR_DATADOG_API_KEY>
        appSecret:
          secretName: <SECRET_NAME>
          keyName: <KEY_FOR_DATADOG_APP_KEY>

    features:
      externalMetricsServer:
        enabled: true
  ```

[1]: /ko/agent/guide/operator-advanced
{{% /tab %}}
{{% tab "Daemonset" %}}

#### 커스텀 메트릭 서버

커스텀 메트릭 서버를 사용하려면 먼저 지침서에 따라 클러스터 내에서 [Datadog 클러스터 에이전트][1]를 설정합니다. 기본 배포가 성공적인지 확인한 후 다음 단계에서 Datadog 클러스터 에이전트에 대한  `Deployment` 매니페스트를 편집합니다:

1. `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` 환경 변수를 `true`로 설정합니다.
2. 환경 변수 `DD_APP_KEY` 및 `DD_API_KEY` **모두**가 설정되어 있는지 확인합니다.
3. `DD_SITE` 환경 변수가 Datadog 사이트로 설정되어 있는지 확인하세요: {{< region-param key="dd_site" code="true" >}}. 기본값은 `US` 사이트`datadoghq.com`로 설정됩니다.

#### 외부 메트릭 공급자 서비스를 등록합니다

Datadog 클러스터 에이전트가 실행 중이면 몇 가지 추가 RBAC 정책을 적용하고 `Service`를 설정하여 해당 요청을 라우팅합니다.

1. 다음 `custom-metric-server.yaml` 매니페스트를 사용하여 포트 `8443`를 노출하는 `datadog-custom-metrics-server`라는 이름의 `Service`를 만듭니다:

    ```yaml
    kind: Service
    apiVersion: v1
    metadata:
      name: datadog-custom-metrics-server
    spec:
      selector:
        app: datadog-cluster-agent
      ports:
      - protocol: TCP
        port: 8443
        targetPort: 8443
    ```
   **참고: **클러스터 에이전트는 기본적으로 포트 `8443`를 통해 이러한 요청을 예상합니다. 그러나 클러스터 에이전트 `Deployment`가 환경 변수 `DD_EXTERNAL_METRICS_PROVIDER_PORT`를 다른 포트 값으로 설정한 경우, `Service`의 `targetPort`를 이에 맞게 변경하세요.

    `kubectl apply -f custom-metric-server.yaml`를 실행하여 `Service`를 적용하세요
2. [`rbac-hpa.yaml` RBAC 규칙 파일][2]을 다운로드합니다.
3. 다음 파일을 적용하여 클러스터 에이전트를 외부 메트릭 공급자로 등록합니다:
    ```
    kubectl apply -f rbac-hpa.yaml
    ```

[1]: /ko/agent/cluster_agent/setup/?tab=daemonset
[2]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/hpa-example/rbac-hpa.yaml
{{% /tab %}}
{{< /tabs >}}

활성화되면 클러스터 에이전트가 HPA에 대한 메트릭을 가져올 준비가 된 것입니다. 두 가지 옵션이 있습니다:
- [DatadogMetric 쿼리를 사용한 오토스케일링](#autoscaling-with-datadogmetric-queries)
- [DatadogMetric 쿼리 없이 오토스케일링](#autoscaling-without-datadogmetric-queries)

Datadog에서는 `DatadogMetric` 옵션을 사용할 것을 권장합니다. 이 경우 `DatadogMetric` 커스텀 리소스 정의(CRD)를 배포하는 추가 단계가 필요하지만 쿼리에서 훨씬 더 많은 유연성을 제공합니다. `DatadogMetric` 쿼리를 사용하지 않는 경우 HPA는 클러스터 에이전트가 Datadog 메트릭 쿼리로 변환하는 기본 Kubernetes 외부 메트릭 형식을 사용합니다.

메트릭을 여러 Datadog 조직으로 이중 발송하는 경우 고가용성을 위해 클러스터 에이전트를 여러 엔드포인트에서 가져오도록 설정할 수 있습니다. 자세한 내용은 [이중 발송][5] 설명서를 참조하세요.

## DatadogMetric 쿼리를 사용한 자동 확장

`DatadogMetric` [커스텀 리소스 정의(CRD)][6] 및 Datadog 클러스터 에이전트 버전 `1.7.0`  또는 이상을 사용하여 Datadog 쿼리를 오토스케일링할 있습니다. 이 접근 방식은 보다 유연한 접근 방식이며, 앱 내에서 사용하는 정확한 Datadog 쿼리로 확장할 수 있습니다.

### 필수 요건

오토스케일링이 올바르게 작동하려면 커스텀 쿼리는 다음 규칙을 따라야 합니다:

- 쿼리는 구문적으로 **반드시** 정확해야 합니다. 그렇지 않으면 오토스케일링에 사용되는 **모든** 메트릭이 새로 고침되지 않습니다(사실상 오토스케일링을 중지함).
- 쿼리 결과는 **반드시** 하나의 시리즈만 출력합니다(그렇지 않으면 결과가 유효하지 않은 것으로 간주됩니다).
- 쿼리는 null이 아닌 최소 두 개의 타임스탬프 포인트를 **반환해야** 합니다(단일 포인트를 반환하는 쿼리를 사용할 수 있지만, 이 경우 오토스케일링은 불완전한 포인트를 사용할 수 있습니다).

**참고**: 쿼리는 임의적이지만 시작 및 종료 시간은 여전히 `Now() - 5 minutes` 및 `Now()` 기본값으로 설정되어 있습니다.

### DatadogMetric CRD 설정

Helm, Datadog Operator, Daemonset을 사용하여 `DatadogMetric` 개체에 대한 커스텀 리소스 정의 (CRD)를 다음과 같이 Kubernetes 클러스터에 추가할 수 있습니다.

{{< tabs >}}
{{% tab "Helm" %}}

`DatadogMetric` CRD 사용을 활성화하려면 `clusterAgent.metricsProvider.useDatadogMetrics`를 `true`로 설정하여 [values.yaml][1] Helm 설정을 업데이트합니다. 그런 다음 Datadog Helm 차트를 다시 배포합니다:

  ```yaml
  clusterAgent:
    enabled: true
    metricsProvider:
      enabled: true
      # clusterAgent.metricsProvider.useDatadogMetrics
      # 임의의 Datadog 쿼리에서 오토스케일링을 위해 DatadogMetric CRD 사용 활성화
      useDatadogMetrics: true
  ```

**참고:** `DatadogMetric` CRD를 자동으로 설치하려고 합니다. 해당 CRD가 초기 Helm 설치 전에 이미 존재하는 경우 충돌할 수 있습니다.

그러면 필요한 RBAC 파일이 자동으로 업데이트되고 클러스터 에이전트가 이러한 `DatadogMetric` 리소스를 통해 HPA 쿼리를 관리하도록 지시합니다.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Operator" %}}

`DatadogMetric` CRD 사용을 활성화하려면 `DatadogAgent` 커스텀 리소스를 업데이트하고 `features.externalMetricsServer.useDatadogMetrics`를 `true`로 설정합니다.

  ```yaml
  kind: DatadogAgent
  apiVersion: datadoghq.com/v2alpha1
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiKey: <DATADOG_API_KEY>
        appKey: <DATADOG_API_KEY>
    features:
      externalMetricsServer:
        enabled: true
        useDatadogMetrics: true
  ```

관리자는 필요한 RBAC 설정을 자동으로 업데이트하고 클러스터 에이전트가 `DatadogMetric` 리소스를 통해 이러한 HPA 쿼리를 관리하도록 지시합니다.

{{% /tab %}}
{{% tab "DaemonSet" %}}
`DatadogMetric` CRD의 사용을 활성화하려면 다음 추가 단계를 수행합니다:

1. 클러스터에 `DatadogMetric` CRD를 설치합니다.

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/helm-charts/master/crds/datadoghq.com_datadogmetrics.yaml"
    ```

2. Datadog 클러스터 에이전트 RBAC 매니페스트 업데이트하고 `DatadogMetric`CRD 사용을 허용하도록 업데이트되었습니다.

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent-datadogmetrics/cluster-agent-rbac.yaml"
    ```

3. Datadog 클러스터 에이전트 배포에서 `DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD`를 `true`로 설정합니다.
{{% /tab %}}
{{< /tabs >}}

### DatadogMetric 개체 만들기
클러스터에 `DatadogMetric` 커스텀 리소스를 추가했으면 HPA에서 참조할 `DatadogMetric` 개체를 생성할 수 있습니다. 모든 HPA가 모든 `DatadogMetric`을 참조할 수 있지만 Datadog은 HPA와 동일한 네임스페이스에서 개체를 생성할 것을 권장합니다.

**참고**: 여러 개의 HPA에서 동일한 `DatadogMetric`을 사용할 수 있습니다.

다음 매니페스트를 사용하여 `DatadogMetric`를 생성할 수 있습니다:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: <DATADOG_METRIC_NAME>
spec:
  query: <CUSTOM_QUERY>
```

#### DatadogMetric 개체 예시
예를 들어, `nginx.net.request_per_s` Datadog 메트릭을 기반으로 NGINX 배포를 오토스케일링하는`DatadogMetric` 개체입니다 :

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: nginx-requests
spec:
  query: max:nginx.net.request_per_s{kube_container_name:nginx}.rollup(60)
```

### HPA에서 DatadogMetric 사용
클러스터 에이전트가 설정되고 `DatadogMetric`이 생성되면 HPA를 업데이트하여 해당 네임스페이스 및 이름과 관련된 `DatadogMetric`을 참조하도록 합니다. 일반적인 형식은 HPA에 대한 메트릭을 `type: External`로 지정하고 메트릭 이름을 `datadogmetric@<NAMESPACE>:<DATADOG_METRIC_NAME>`와 같이 지정합니다.

#### DatadogMetric을 사용한 HPA 예제
`nginx-requests`라는 이름의  `DatadogMetric`를 사용하는 HPA로, 두 개체가 네임스페이스 `nginx-demo`에 있다고 가정합니다.

`apiVersion: autoscaling/v2` 사용:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
spec:
  minReplicas: 1
  maxReplicas: 3
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  metrics:
  - type: External
    external:
      metric:
        name: datadogmetric@nginx-demo:nginx-requests
      target:
        type: Value
        value: 9
```

`apiVersion: autoscaling/v2beta1` 사용:

```yaml
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
spec:
  minReplicas: 1
  maxReplicas: 3
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  metrics:
  - type: External
    external:
      metricName: datadogmetric@nginx-demo:nginx-requests
      targetValue: 9
```

매니페스트에서:
- HPA는 `nginx`로 불리는 배포를 오토스케일링하도록 설정되어 있습니다.
- 작성된 복제본의 최대 수는 `3`, 최소 수는 `1`입니다.
- HPA는 `nginx-demo` 네임스페이스에서 `DatadogMetric``nginx-requests`에 의존합니다.

`DatadogMetric`가 HPA에 연결되면 Datadog 클러스터 에이전트는 HPA를 활성 상태로 표시합니다. 그런 다음 클러스터 에이전트는 Datadog에 쿼리를 요청하고 결과를 `DatadogMetric` 개체에 저장한 후 HPA에 값을 제공합니다.

## DatadogMetric 쿼리 없이 오토스케일링 
`DatadogMetric`을 사용한 오토스케일링을 원하지 않더라도 기본 Kubernetes 형식으로 HPA를 생성할 수 있습니다. 클러스터 에이전트는 HPA 형식을 Datadog 메트릭 쿼리로 변환합니다.

Datadog 클러스터 에이전트가 실행되고 서비스가 등록되면 [HPA][7] 매니페스트를 생성하고 메트릭의 `type: External`를 지정합니다. 그러면 HPA가 Datadog 클러스터 에이전트의 서비스에서 메트릭을 가져오도록 알립니다:

```yaml
spec:
  metrics:
    - type: External
      external:
        metricName: "<METRIC_NAME>"
        metricSelector:
          matchLabels:
            <TAG_KEY>: <TAG_VALUE>
```

### DatadogMetric이 없는 HPA 예제
`apiVersion: autoscaling/v2`을 사용하여 `nginx.net.request_per_s` Datadog 메트릭을 기반으로 NGINX 배포를 오토스케일링하는 HPA 매니페스트:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
spec:
  minReplicas: 1
  maxReplicas: 3
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  metrics:
  - type: External
    external:
      metric:
        name: nginx.net.request_per_s
      target:
        type: Value
        value: 9
```

다음은 `apiVersion: autoscaling/v2beta1`를 사용한 위와 동일한 HPA 매니페스트입니다:
```yaml
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
spec:
  minReplicas: 1
  maxReplicas: 3
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  metrics:
  - type: External
    external:
      metricName: nginx.net.request_per_s
      metricSelector:
        matchLabels:
            kube_container_name: nginx
      targetValue: 9
```

매니페스트에서:

- HPA는 `nginx`라는 배포를 오토스케일링하도록 설정되어 있습니다.
- 작성된 복제본의 최대 수는 `3`, 최소 수는 `1`입니다.
- 사용되는 메트릭은 `nginx.net.request_per_s`입니다. 범위는 `kube_container_name: nginx`입니다. 이 형식은 Datadog의 메트릭 형식에 해당합니다.

Kubernetes는 매 30초마다 Datadog 클러스터 에이전트에 이 메트릭의 값을 쿼리하고 필요한 경우 비례적으로 오토스케일링합니다. 고급 사용 사례의 경우 동일한 HPA에서 여러 개의 메트릭을 가질 수 있습니다. [Kubernetes 수평 파드 오토스케일링][8]에서 언급한 바와 같이 제안된 값 중 가장 큰 값이 선택된 값입니다.

### 마이그레이션

기존 HPA는 외부 메트릭을 사용하여 자동으로 마이그레이션됩니다.

`DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD`를 `true`로 설정했지만 `DatadogMetric`를 참조하지 **않는** HPA가 여전히 있는 경우 (`datadogmetric@...`를 통해 `DatadogMetric`를 참조하지 않는) 일반 구문은 계속 지원됩니다.

Datadog 클러스터 에이전트는 `DatadogMetric`을 수용하기 위해 자체 네임스페이스(이름은 `dcaautogen-`로 시작)에서 `DatadogMetric` 리소스를 자동으로 생성하므로 원활하게 전환할 수 있습니다.

`DatadogMetric`를 참조하기 위해 HPA를 나중에 마이그레이션하기로 선택하면 자동으로 생성된 리소스는 몇 시간 후에 Datadog 클러스터 에이전트에 의해 정리됩니다.

## 클러스터 에이전트 쿼리
클러스터 에이전트는 매 30초마다 `DatadogMetric` 개체에 대한 쿼리를 수행하며, 클러스터 에이전트는 수행된 메트릭 쿼리를 35개 그룹으로 배치합니다. 따라서 Datadog 메트릭 API에 대한 단일 요청에 35개의 `DatadogMetric` 쿼리가 포함됩니다.

클러스터 에이전트는 이러한 쿼리를 배치함으로써 쿼리를 보다 효율적으로 수행하고 속도 제한을 피할 수 있습니다.

이는 클러스터 에이전트가 35개의 `DatadogMetric` 개체당 시간당 약 120개의 API 요청을 수행한다는 것을 의미합니다. 추가 Kubernetes 클러스터에 `DatadogMetric` 개체를 추가하거나 오토스케일링 기능을 추가하면 동일한 조직 내에서 메트릭을 가져오기 위한 호출 수가 증가합니다.

또한 클러스터 에이전트는 이러한 각 메트릭 쿼리에 대해 기본적으로 지난 5분 동안의 데이터를 쿼리합니다. 이는 클러스터 에이전트가 *최근* 데이터를 축소하고 있는지 확인하기 위한 것입니다,  그러나 메트릭 쿼리가 클라우드 통합(AWS, Azure, GCP 등) 중 하나의 데이터에 의존하는 경우 이러한 데이터는 [약간의 지연을 거쳐 가져오며][9] 5분 간격 내에 포함되지 않습니다. 이러한 경우 클러스터 에이전트에 환경 변수를 제공하여 메트릭 쿼리에 허용되는 날짜 범위와 데이터 보관 기간을 늘리세요.

```yaml
- name: DD_EXTERNAL_METRICS_PROVIDER_BUCKET_SIZE
  value: "900"
- name: DD_EXTERNAL_METRICS_PROVIDER_MAX_AGE
  value: "900"
```

## 트러블슈팅

### DatadogMetric 상태
Datadog 클러스터 에이전트는 쿼리의 결과를 Datadog에 반영하기 위해 모든 `DatadogMetric` 리소스의 `status` 하위 리소스를 업데이트합니다. 이는 오류가 발생할 경우 발생하는 작업을 파악하기 위한 주요 정보 소스입니다. 다음을 실행하여 이 정보를 출력할 수 있습니다:

```shell
kubectl describe datadogmetric <RESOURCE NAME>
```

#### 예시

`DatadogMetric`의 `status`부분:

```yaml
status:
  conditions:
  - lastTransitionTime: "2020-06-22T14:38:21Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "True"
    type: Active
  - lastTransitionTime: "2020-06-25T09:00:00Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "True"
    type: Valid
  - lastTransitionTime: "2020-06-22T14:38:21Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "True"
    type: Updated
  - lastTransitionTime: "2020-06-25T09:00:00Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "False"
    type: Error
  currentValue: "1977.2"
```

네 가지 조건을 통해 `DatadogMetric`의 현재 상태를 파악할 수 있습니다:

- `Active`: 하나 이상의 HPA가 참조하는 경우 Datadog은 `DatadogMetric`를 활성으로 간주합니다. 비활성화된`DatadogMetrics`은 API 사용을 최소화하기 위해 업데이트되지 않습니다.
- `Valid`: Datadog은 연관된 쿼리에 대한 답이 유효할 때 `DatadogMetric`가 유효하다고 간주합니다. 잘못된 상태는 커스텀 쿼리가 의미론적으로 정확하지 않다는 것을 의미할 수 있습니다. 자세한 내용은 `Error` 필드를 참조하세요.
- `Updated`: 이 조건은 Datadog 클러스터 에이전트가 `DatadogMetric`에 접근할 경우 **항상** 업데이트됩니다.
- `Error`: `DatadogMetric` 처리가 오류를 발생시킬 경우 이 조건은 true이고 오류 세부 정보가 포함됩니다.

`currentValue`는 Datadog에서 수집되어 HPAs로 반환된 값입니다.

### 대상 메트릭에 대한 값 대 평균값
이 예제에서 HPA는 `AverageValue` 대신 `Value`의 타겟 유형을 사용합니다. 두 옵션 모두 지원됩니다. 이에 따라 Datadog 메트릭 쿼리를 조정하세요.

`Value`를 사용할 때 Datadog 메트릭 쿼리에 의해 반환된 메트릭 값은 HPA의 스케일링 결정을 위해 그대로 HPA에 제공됩니다. `AverageValue`를 사용할 때 반환된 메트릭 값은 현재 파드 수로 나뉩니다. 쿼리와 반환된 값을 기반으로 HPA를 확장하고자 하는 방식에 따라 `<Metric Value>`를 설정합니다.

`apiVersion: autoscaling/v2`를 사용한 `Value`에 대한 타겟 메트릭 설정은 다음과 같습니다:
```yaml
  metrics:
  - type: External
    external:
      metric:
        name: datadogmetric@<NAMESPACE>:<DATADOG_METRIC_NAME>
      target:
        type: Value
        value: <METRIC_VALUE>
```

반면 `AverageValue`는 다음과 같습니다:
```yaml
  metrics:
  - type: External
    external:
      metric:
        name: datadogmetric@<NAMESPACE>:<DATADOG_METRIC_NAME>
      target:
        type: AverageValue
        averageValue: <METRIC_VALUE>
```

`apiVersion: autoscaling/v2beta1`에 대한 각각의 옵션은 `targetValue` 및 `targetAverageValue`입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#before-you-begin
[2]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-custom-metrics
[3]: https://kubernetes.io/docs/tasks/access-kubernetes-api/configure-aggregation-layer
[4]: /ko/account_management/api-app-keys/
[5]: /ko/agent/configuration/dual-shipping/?tab=helm#cluster-agent-metrics-provider
[6]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions
[7]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale
[8]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-multiple-metrics
[9]: /ko/integrations/guide/cloud-metric-delay