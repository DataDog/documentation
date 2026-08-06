---
aliases:
- /ko/agent/guide/cluster-agent-custom-metrics-server
- /ko/agent/cluster_agent/external_metrics
- /ko/containers/cluster_agent/external_metrics
description: 클러스터 Agent에서 사용자 정의 및 외부 Datadog 메트릭을 사용하도록 Kubernetes Horizontal Pod
  Autoscaler를 구성합니다.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: 블로그
  text: Datadog Cluster Agent 소개
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: 블로그
  text: 모든 Datadog 메트릭으로 Kubernetes 워크로드 오토스케일링
- link: /agent/cluster_agent/clusterchecks/
  tag: 설명서
  text: Autodiscovery로 클러스터 검사 실행
- link: /agent/kubernetes/daemonset_setup/
  tag: 설명서
  text: Kubernetes DaemonSet 설정
- link: /agent/cluster_agent/troubleshooting/
  tag: 설명서
  text: Datadog Cluster Agent 트러블슈팅
title: Cluster Agent 커스텀 및 외부 메트릭을 사용하여 오토스케일링
---

## 개요

[Kubernetes v1.2][1]에 도입된 Horizontal Pod Autoscaling은 `CPU`와 같은 기본 메트릭의 자동 확장을 허용하지만, 애플리케이션과 함께 실행하려면 `metrics-server` 리소스가 필요합니다. Kubernetes v1.6부터는 [커스텀 메트릭][2] 자동 확장이 가능합니다.

커스텀 메트릭은 사용자가 정의하며 클러스터 내에서 수집됩니다. Kubernetes v1.10부터 외부 메트릭에 지원이 도입되어 Datadog 수집 메트릭과 같은 클러스터 외부의 모든 메트릭을 자동 확장할 수 있습니다.

먼저 Cluster Agent를 외부 메트릭 제공자로 등록해야 합니다. 그런 다음, Cluster Agent의 제공 메트릭을 사용하도록 HPA를 조정합니다.

v1.0.0부터 Datadog Cluster Agent의 커스텀 메트릭 서버는 외부 메트릭을 수집하기 위해 외부 메트릭 공급자 인터페이스를 구현합니다. 이 페이지에서는 설정 방법을 비롯해 Datadog 메트릭에 따라 Kubernetes 워크로드를 자동 확장하는 방법을 설명합니다.

## 설정

### 필수 조건

1. Kubernetes >v1.10: API 서버에 외부 메트릭 공급자 리소스를 등록해야 합니다.
2. Kubernetes [집계 레이어][3]를 활성화합니다.
3. 유효한 [Datadog API 키 **및** 애플리케이션 키][4]입니다.

### 설치

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator에서 관리하는 Cluster Agent를 사용해 외부 메트릭 서버를 활성화하려면 먼저 Datadog Operator][1]을 설정합니다. 그런 다음 유효한 Datadog API 키, 애플리케이션 키를 제공하고 `DatadogAgent` 커스텀 리소스에서 `features.externalMetricsServer.enabled`를 `true`로 설정합니다.

  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiKey: <DATADOG_API_KEY>
        appKey: <DATADOG_APP_KEY>

    features:
      externalMetricsServer:
        enabled: true
  ```

운영자는 필요한 RBAC 구성을 자동으로 업데이트하고 Kubernetes에 해당하는 `Service` 및 `APIService`를 설정합니다.

또는 미리 생성된 `Secrets` 및 Datadog API 및 애플리케이션 키를 저장하는 데이터 키의 이름을 참조하여 키를 설정할 수도 있습니다.
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
{{% tab "Helm" %}}

Helm의 Cluster Agent에서 외부 메트릭 서버를 활성화하려면, 다음 구성으로 [datadog-values.yaml][1] 파일을 업데이트합니다. 유효한 Datadog API 키와 애플리케이션 키를 제공하고 `clusterAgent.metricsProvider.enabled`를 `true`로 설정한 다음 Datadog Helm 차트를 다시 배포합니다.

  ```yaml
  datadog:
    apiKey: <DATADOG_API_KEY>
    appKey: <DATADOG_APP_KEY>
    #(...)

  clusterAgent:
    enabled: true
    # metricsProvider를 활성화해 Datadog 메트릭을 기반으로 확장
    metricsProvider:
      # clusterAgent.metricsProvider.enabled
      # true로 설정해 Metrics Provider 활성화
      enabled: true
  ```

그러면 필요한 RBAC 구성이 자동으로 업데이트되고 Kubernetes에서 사용할 수 있도록 해당 `Service` 및 `APIService`가 설정됩니다.

또는 데이터 키 `api-key` 및 `app-key`를 포함하고 미리 생성된 `Secrets` 이름을 `datadog.apiKeyExistingSecret` 및 `datadog.appKeyExistingSecret` 구성으로 참조하여 키를 설정할 수도 있습니다.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}

{{% tab "수동 (DaemonSet)" %}}

#### 커스텀 메트릭 서버

커스텀 메트릭 서버를 사용하려면 먼저 클러스터 내에서 [Datadog Cluster Agent][1]를 설정 지침을 따르세요. 기본 배포가 성공적으로 완료되면 다음 단계에 따라 Datadog Cluster Agent의 `Deployment` 매니페스트를 편집합니다.

1. `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` 환경 변수를 `true`로 설정합니다.
2. 환경 변수 `DD_APP_KEY`와 `DD_API_KEY`가 모두 설정되어 있는지 확인합니다.
3. `DD_SITE` 환경 변수가 Datadog 사이트로 설정되어 있는지 확인합니다. {{< region-param key="dd_site" code="true" >}}. 기본값은 `US` 사이트 `datadoghq.com`입니다.

#### 외부 메트릭 공급자 서비스 등록

Datadog Cluster Agent가 실행되면 몇 가지 추가 RBAC 정책을 적용하고 해당 요청을 라우팅하도록 `Service`를 설정합니다.

1. `datadog-custom-metrics-server`라는 이름의 `Service`를 생성하여 `8443` 포트를 다음 `custom-metric-server.yaml` 매니페스트에 노출합니다.

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
    **참고: 기본적으로 Cluster Agent는 `8443` 포트를 통해 이 요청을 예측합니다. 그러나 Cluster Agent `Deployment`에서 환경 변수 `DD_EXTERNAL_METRICS_PROVIDER_PORT`를 다른 포트 값으로 설정한 경우, 이 `Service`의 `targetPort`를 적절히 변경하세요.

    `kubectl apply -f custom-metric-server.yaml`을 실행하여 이 `Service`를 적용합니다.
2. [`rbac-hpa.yaml` RBAC 규칙 파일][2]을 다운로드합니다.
3. 이 파일을 적용하여 Cluster Agent를 외부 메트릭 공급자로 등록합니다.
    ```
    kubectl apply -f rbac-hpa.yaml
    ```

[1]: /ko/agent/cluster_agent/setup/?tab=daemonset
[2]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/hpa-example/rbac-hpa.yaml
{{% /tab %}}
{{< /tabs >}}

활성화되면 Cluster Agent에서 HPA 메트릭을 가져올 준비가 된 것입니다. 두 가지 옵션이 있습니다.
- [DatadogMetric 쿼리를 사용한 자동 확장](#autoscaling-with-datadogmetric-queries)
- [DatadogMetric 쿼리가 없는 자동 확장](#autoscaling-without-datadogmetric-queries)

Datadog에서는 `DatadogMetric` 옵션을 사용할 것을 권장합니다. 이 경우 `DatadogMetric` 커스텀 리소스 정의(CRD)를 배포하는 추가 단계가 필요하지만 쿼리에서 유연성이 높아집니다. `DatadogMetric` 쿼리를 사용하지 않는 경우 HPA는 Cluster Agent가 Datadog 메트릭 쿼리로 변환하는 기본 Kubernetes 외부 메트릭 형식을 사용합니다.

여러 Datadog 조직으로 메트릭을 이중 전송하는 경우, 여러 엔드포인트에서 가져오도록 Cluster Agent를 구성해 가용성을 높일 수 있습니다. 자세한 내용은 [이중 전송][5] 설명서를 참고하세요.

## DatadogMetric 쿼리를 사용한 오토스케일링

`DatadogMetric` [커스텀 리소스 정의(CRD)][6] 및 Datadog Cluster Agent 버전 `1.7.0` 이상을 사용하여 Datadog 쿼리에서 오토스케일링할 수 있습니다. 이 방법은 보다 유연한 접근 방식이고, 앱 내에서 사용하는 정확한 Datadog 쿼리로 확장할 수 있도록 해줍니다.

### 필수 조건

오토스케일링이 올바르게 작동하려면 커스텀 쿼리가 다음 규칙을 따라야 합니다.

- 쿼리는 구문적으로 **정확해야 하며**, 그러지 않으면 오토스케일링에 사용되는 **모든** 메트릭의 새로 고침이 중단됩니다(이에 따라 오토스케일링도 중단됨).
- 쿼리 결과는 반드시 하나의 시리즈만 **출력해야 합니다**(그러지 않으면 결과가 유효하지 않은 것으로 간주됨).
- 쿼리는 null이 아닌 타임스탬프 요소를 두 개 이상 **포함해야 합니다**(단일 요소를 반환하는 쿼리를 사용할 수 있지만, 이 경우 오토스케일링에서 불완전한 요소를 사용할 수도 있음).

**참고**: 쿼리는 임의 값이지만 시작 및 종료 시간은 기본적으로 `Now() - 5 minutes` 및 `Now()`로 설정됩니다.

### DatadogMetric CRD 설정

`DatadogMetric` 개체의 Custom Resource Definition(CRD)은 Helm, Datadog Operator, Daemonset을 사용해 Kubernetes 클러스터에 추가할 수 있습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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
        appKey: <DATADOG_APP_KEY>
    features:
      externalMetricsServer:
        enabled: true
        useDatadogMetrics: true
  ```

Operator는 필요한 RBAC 구성을 자동으로 업데이트하고 `DatadogMetric` 리소스를 통해 HPA 쿼리를 관리하도록 Cluster Agent에 명령을 내립니다.

{{% /tab %}}
{{% tab "Helm" %}}

`DatadogMetric` CRD 사용을 활성화하려면 [values.yaml][1] Helm 구성을 업데이트하여 `clusterAgent.metricsProvider.useDatadogMetrics`을 `true`로 설정한 다음 Datadog Helm 차트를 다시 배포합니다.

  ```yaml
  clusterAgent:
    enabled: true
    metricsProvider:
      enabled: true
      # clusterAgent.metricsProvider.useDatadogMetrics
      # 임의의 Datadog 쿼리에서 오토스케일링을 위해 DatadogMetric CRD 사용 활성화 
      useDatadogMetrics: true
  ```

**참고:** 이렇게 하면 `DatadogMetric` CRD 자동 설치를 시도합니다. 해당 CRD가 Helm을 처음 설치하기 전에 이미 존재하는 경우 충돌할 수 있습니다.

이렇게 하면 필요한 RBAC 파일을 자동으로 업데이트하고 `DatadogMetric` 리소스를 통해 HPA 쿼리를 관리하도록 Cluster Agent에 명령을 내립니다.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Manual (DaemonSet)" %}}
`DatadogMetric` CRD 사용을 활성화하려면 다음 추가 단계를 따르세요.

1. 클러스터에 `DatadogMetric` CRD를 설치합니다.

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/helm-charts/master/crds/datadoghq.com_datadogmetrics.yaml"
    ```

2. Datadog Cluster Agent RBAC 매니페스트를 업데이트합니다. `DatadogMetric` CRD를 사용할 수 있도록 업데이트되었습니다.

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent-datadogmetrics/cluster-agent-rbac.yaml"
    ```

3. Datadog Cluster Agent 배포에서 `DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD`를 `true`로 설정합니다.
{{% /tab %}}
{{< /tabs >}}

### DatadogMetric 개체 생성
`DatadogMetric` 커스텀 리소스가 클러스터에 추가되면, HPA가 참조할 `DatadogMetric` 개체를 만들 수 있습니다. 모든 HPA는 `DatadogMetric`을 참조할 수 있지만 Datadog는 HPA와 동일한 네임스페이스에 생성할 것을 권장합니다.

**참고**: 여러 HPA가 동일한 `DatadogMetric`을 사용할 수 있습니다.

다음 매니페스트를 사용하여 `DatadogMetric`을 만들 수 있습니다.

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: <DATADOG_METRIC_NAME>
spec:
  query: <CUSTOM_QUERY>
```

#### DatadogMetric 개체 예시
예를 들어, `DatadogMetric` 개체는 `nginx.net.request_per_s` Datadog 메트릭을 기반으로 NGINX 배포를 자동 확장합니다.

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: nginx-requests
spec:
  query: max:nginx.net.request_per_s{kube_container_name:nginx}.rollup(60)
```

### HPA에서 DatadogMetric 사용
Cluster Agent가 설정되고 `DatadogMetric`이 생성되면, 네임스페이스와 이름을 기준으로 이 `DatadogMetric`을 참조하도록 HPA를 업데이트하세요. 일반적인 형식은 HPA의 메트릭을 `type: External`로 지정하고 메트릭 이름을 `datadogmetric@<NAMESPACE>:<DATADOG_METRIC_NAME>`과 같이 지정하는 것입니다.

#### DatadogMetric을 사용한 HPA 예시
두 개체가 네임스페이스 `NGINX-demo`에 있다는 가정 하에, `NGINX-requests`라는 이름의 `DatadogMetric`를 사용하는 HPA입니다.

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

이 매니페스트에서:
- HPA는 `NGINX`라는 배포를 오토스케일링하도록 구성되어 있습니다.
- 생성되는 복제본의 최대 개수는 `3`이며 최소 개수는 `1`입니다.
- HPA는 `NGINX-demo` 네임스페이스의 `DatadogMetric` `NGINX-requests`에 의존합니다.

`DatadogMetric`이 HPA에 연결되면 Datadog Cluster Agent가 활성으로 표시합니다. 그런 다음 Cluster Agent는 Datadog에 쿼리를 요청하고 결과를 `DatadogMetric` 개체에 저장한 후 값을 HPA에 제공합니다.

## DatadogMetric 쿼리 없이 오토스케일링
`DatadogMetric`을 사용해 오토스케일링하지 않는 경우에도 기본 Kubernetes 형식으로 HPA를 생성할 수 있습니다. Cluster Agent는 HPA 형식을 Datadog 메트릭 쿼리로 변환합니다.

Datadog Cluster Agent가 실행되고 서비스가 등록되면, [HPA][7] 매니페스트를 생성하고 메트릭에 `type: External`을 지정합니다. Datadog Cluster Agent의 서비스에서 메트릭을 가져오도록 HPA에 알립니다.

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

### DatadogMetric이 없는 HPA 예시
`NGINX.net.request_per_s` Datadog 메트릭을 기반으로 NGINX 배포를 자동 확장하는 HPA 매니페스트입니다.

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

이 매니페스트에서:

- HPA는 `NGINX`라는 배포를 오토스케일링하도록 구성되어 있습니다.
- 생성되는 복제본의 최대 개수는 `3`이며 최소 개수는 `1`입니다.
- 사용된 메트릭은 `NGINX.net.request_per_s`이며 범위는 `kube_container_name: NGINX`입니다. 이 형식은 Datadog 메트릭 형식에 해당합니다.

Kubernetes는 30초마다 Datadog Cluster Agent를 쿼리하여 이 메트릭의 값을 가져오고 필요한 경우 그에 비례하여 오토스케일링합니다. 고급 사용 사례의 경우, 동일한 HPA에 여러 메트릭을 포함할 수 있습니다. [Kubernetes 수평 파드 오토스케일링][8]에서 언급했듯, 제안된 값 중 가장 큰 값이 선택됩니다.

### 마이그레이션

기존 HPA는 외부 메트릭을 사용하여 자동으로 마이그레이션됩니다.

`DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD`를 `true`로 설정했지만 `DatadogMetric`을 참조하지 **않는** HPA가 있는 경우 일반 구문(`DatadogMetric`에서 `datadogmetric@...` 참조 없음)은 여전히 지원됩니다.

Datadog Cluster Agent는 이를 수용하기 위해 자체 네임스페이스에 `DatadogMetric` 리소스(이름이 `dcaautogen-`로 시작)를 자동으로 생성하여 `DatadogMetric`으로 원활하게 전환할 수 있도록 합니다.

`DatadogMetric`를 참조하기 위해 HPA를 나중에 마이그레이션하기로 선택하면 몇 시간 후에  Datadog Cluster Agent가 자동으로 생성된 리소스를 정리합니다.

원하는 경우 `DD_EXTERNAL_METRICS_PROVIDER_ENABLE_DATADOGMETRIC_AUTOGEN`을 `false`로 설정하여 이 동작을 비활성화할 수 있습니다.

```yaml
- name: DD_EXTERNAL_METRICS_PROVIDER_ENABLE_DATADOGMETRIC_AUTOGEN
  value: "false"
```

## Cluster Agent 쿼리하기
Cluster Agent는 30초마다 `DatadogMetric` 개체의 쿼리를 실행합니다. 또한 Cluster Agent는 실행 중인 메트릭 쿼리를 35개 그룹으로 일괄 처리합니다. 따라서 Datadog 메트릭 API의 단일 요청에는 35개의 `DatadogMetric` 쿼리가 포함됩니다.

Cluster Agent는 쿼리를 일괄 처리함으로써 보다 효율적으로 쿼리를 실행하고 속도 제한을 피할 수 있습니다.

즉, Cluster Agent는 `DatadogMetric` 개체 35개당 한 시간에 약 120건의 API 요청을 처리합니다. `DatadogMetric` 개체를 더 추가하거나 Kubernetes 클러스터에 자동 확장 기능을 추가하면 동일한 조직 내에서 메트릭을 가져오는 호출 횟수가 증가합니다.

또한 Cluster Agent는 이러한 각 메트릭 쿼리에 기본적으로 지난 5분간의 데이터를 쿼리합니다. 이는 Cluster Agent가 *최근* 데이터를 기준으로 스케일링하도록 하기 위함입니다. 그러나 메트릭 쿼리가 클라우드 통합(AWS, Azure, GCP 등) 데이터에 의존하는 경우, [쿼리 시간에 지연이 발생해][9] 5분 간격으로 지원되지 않을 수 있습니다. 이 경우에는 Cluster Agen에 환경 변수를 제공하여 메트릭 쿼리에 허용되는 날짜 범위와 데이터 기간을 늘리세요.

```yaml
- name: DD_EXTERNAL_METRICS_PROVIDER_BUCKET_SIZE
  value: "900"
- name: DD_EXTERNAL_METRICS_PROVIDER_MAX_AGE
  value: "900"
```

## 트러블슈팅

### DatadogMetric 상태
Datadog Cluster Agent는 모든 `DatadogMetric` 리소스의 `status` 하위 리소스를 업데이트하여 쿼리 결과를 Datadog에 반영합니다. 장애 발생 시 어떤 일이 발생하는지 이해하기 위한 주요 정보 소스가 됩니다. 이 정보를 출력하려면 다음을 실행합니다.

```shell
kubectl describe datadogmetric <RESOURCE NAME>
```

#### 예시

`DatadogMetric` `status` 부분:

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

네 가지 조건을 통해 `DatadogMetric`의 현재 상태와 관련한 인사이트를 얻을 수 있습니다.

- `Active`: 하나 이상의 HPA가 참조되면, Datadog는 `DatadogMetrics`가 활성 상태인 것으로 간주합니다. 비활성 `DatadogMetric`은 API 사용량을 최소화하기 위해 업데이트되지 않습니다.
- `Valid`: 관련 쿼리의 답변이 유효하면 Datadog는`DatadogMetric`가 유효한 것으로 간주합니다. 유효하지 않은 상태는 커스텀 쿼리가 구문적으로 올바르지 않다는 의미일 수 있습니다. 자세한 내용은 `Error` 필드를 참조하세요. 
- `Updated`: 이 조건은  Datadog Cluster Agent가 `DatadogMetric`에 도달할 때 **항상** 업데이트됩니다.
- `Error`: `DatadogMetric` 처리 시 오류가 트리거되면 이 조건은 참이며 오류 세부 정보를 포함합니다.

`currentValue`는 Datadog에서 수집하여 HPA에 반환한 값입니다.

### 대상 메트릭의 Value 대 AverageValue
이 예의 HPA는 `AverageValue` 대신 `Value`의 대상 유형을 사용합니다. 두 옵션 모두 지원됩니다. Datadog 메트릭 쿼리를 알맞게 조정하세요.

`Value`를 사용하는 경우, Datadog 메트릭 쿼리에서 반환된 메트릭 값은 그대로 HPA에 제공되어 스케일링 결정을 내립니다. `AverageValue`를 사용하는 경우 반환되는 메트릭 값은 현재 포드수로 나뉩니다. 쿼리와 반환된 값을 기반으로 HPA를 스케일링 방식에 따라 `<Metric Value>`를 설정하세요.

`apiVersion: autoscaling/v2`을 사용하면 `Value`의 대상 메트릭 구성은 다음과 같습니다.
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

반면 `AverageValue` 구성은 다음과 같습니다.
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