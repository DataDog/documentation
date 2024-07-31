---
aliases:
- /ko/integrations/faq/gathering-kubernetes-events
- /ko/agent/kubernetes/event_collection
- /ko/agent/kubernetes/event_collection
title: Kubernetes에서 Datadog Agent 추가 설정
---

## 개요

Kubernetes 환경에 Datadog Agent를 설치한 후 추가 구성 옵션을 선택할 수 있습니다.

### Datadog을 활성화하여 다음을 수집합니다.
- [트레이스 (APM)](#enable-apm-and-tracing)
- [Kubernetes 이벤트](#enable-kubernetes-event-collection)
- [NPM](#enable-npm-collection)
- [로그](#enable-log-collection)
- [프로세스](#enable-process-collection)

### 다른 기능
- [Datadog 클러스터 에이전트](#datadog-cluster-agent)
- [통합](#integrations)
- [컨테이너 보기](#containers-view)
- [Orchestrator Explorer](#orchestrator-explorer)
- [외부 메트릭 서버](#custom-metrics-server)

### 더 많은 설정
- [환경 변수](#environment-variables)
- [커스텀 메트릭을 위한 DogStatsD](#configure-dogstatsd)
- [태그 매핑](#configure-tag-mapping)
- [비밀](#using-secret-files)
- [컨테이너 무시](#ignore-containers)
- [Kubernetes API 서버 시간 초과](#kubernetes-api-server-timeout)
- [프록시 설정](#proxy-settings)
- [자동 탐지](#autodiscovery)
- [기타](#miscellaneous)

## 애플리케이션 성능 모니터링(APM) 및 추적 활성화

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml`를 편집하여 `features.apm.enabled`를 `true`로 설정하세요.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    apm:
      enabled: true
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

Helm에서 APM은 UDS 또는 Windows로 명명된 파이프를 통해 **기본적으로 활성화**됩니다.

인증을 위해 `values.yaml`에서 `datadog.apm.socketEnabled`가 `true`로 설정되어 있는지 확인하세요.

```yaml
datadog:
  apm:
    socketEnabled: true    
```

{{% /tab %}}
{{< /tabs >}}

자세한 정보는 [Kubernetes 트레이스 수집][16]을 참조하세요.

## Kubernetes 이벤트 수집 활성화

[Datadog Cluster Agent][2]를 사용하여 Kubernetes 이벤트를 수집하세요.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

이벤트 수집은 Datadog Operator에 의해 기본적으로 활성화됩니다. 이는 `datadog-agent.yaml`의 `features.eventCollection.collectKubernetesEvents` 설정에서 관리할 수 있습니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    site: <DATADOG_SITE>

  features:
    eventCollection:
      collectKubernetesEvents: true
```

{{% /tab %}}
{{% tab "Helm" %}}

Datadog Cluster Agent를 사용하여 Kubernetes 이벤트를 수집하려면 `datadog-values.yaml` 파일에서 `clusterAgent.enabled`, `datadog.collectEvents` 및 `clusterAgent.rbac.create` 옵션이 `true`로 설정되어 있는지 확인하세요.

```yaml
datadog:
  collectEvents: true
clusterAgent:
  enabled: true
  rbac: 
    create: true
```

Cluster Agent를 사용하지 않으려는 경우에도 `datadog-values.yaml` 파일에서 `datadog.leaderElection`, `datadog.collectEvents` 및 `agents.rbac.create` 옵션을 `true`로 설정하여 Node Agent가 Kubernetes 이벤트를 수집하도록 할 수 있습니다.

```yaml
datadog:
  leaderElection: true
  collectEvents: true
agents:
  rbac:
    create: true
```

[1]: /ko/containers/cluster_agent

{{% /tab %}}
{{< /tabs >}}

DaemonSet 설정에 대한 자세한 정보는 [DaemonSet Cluster Agent 이벤트 수집][14]을 참조하세요.

##  NPM 수집 활성화

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml`에서 `features.npm.enabled`를 `true`로 설정하세요.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    npm:
      enabled: true
```

그런 다음 새로운 설정을 적용합니다:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml`을 다음 설정으로 업데이트하세요.

```yaml
datadog:
  # (...)
  networkMonitoring:
    enabled: true
```

그런 다음 Helm 차트를 업그레이드합니다.

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

자세한 정보는 [네트워크 성능 모니터링][18]을 참조하세요.

## 로그 수집 활성화

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`datadog-agent.yaml`에서 `features.logCollection.enabled` 및 `features.logCollection.containerCollectAll`을  `true`로 설정하세요.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

그런 다음 새로운 설정을 적용합니다:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
다음 설정을 사용하여 `datadog-values.yaml`을 업데이트하세요. 

```yaml
datadog:
  # (...)
  logs:
    enabled: true
    containerCollectAll: true
```

그런 다음 Helm 차트를 업그레이드합니다.

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

자세한 정보는 [Kubernetes 로그 수집][17]을 참조하세요.

## 프로세스 수집 활성화

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`datadog-agent.yaml`에서 `features.liveProcessCollection.enabled`를  `true`로 활성화하세요.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    liveProcessCollection:
      enabled: true
```

그런 다음 새로운 설정을 적용합니다:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
다음 설정을 사용하여 `datadog-values.yaml`을 업데이트하세요. 

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
    processCollection: true
```

그런 다음 Helm 차트를 업그레이드합니다.

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

자세한 정보는 [실시간 프로세스][23]를 참조하세요.
## Datadog Cluster Agent

Datadog Cluster Agent는 클러스터 레벨 모니터링 데이터 수집에 대해 간소화된 중앙 집중식 접근 방식을 제공합니다. Datadog에서는 Kubernetes 모니터링을 위해 Cluster Agent를 사용할 것을 적극 권장합니다.

Datadog Operator v1.0.0+ 및 Helm 차트 v2.7.0+에서는 **기본적으로 Cluster Agent를 활성화합니다**. 추가 구성은 필요하지 않습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator v1.0.0+는 기본적으로 Cluster Agent를 활성화합니다. 운영자는 필요한 RBAC를 생성하고 Cluster Agent를 배포합니다. 두 Agent 모두 동일한 API 키를 사용합니다.

Operator는 보안 통신을 위해 Datadog Agent와 Cluster Agent가 공유할 무작위 토큰을 Kubernetes `Secret`에서 자동으로 생성합니다.

이 토큰을 `datadog-agent.yaml`의 `global.clusterAgentToken`필드에서 수동으로 지정할 수 있습니다.

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
  clusterAgentToken: <DATADOG_CLUSTER_AGENT_TOKEN>
```

또는 기존 `Secret`의 이름과 이 토큰이 포함된 데이터 키를 참조하여 지정할 수 있습니다.

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
  clusterAgentTokenSecret: 
    secretName: <SECRET_NAME>
    keyName: <KEY_NAME>
```

**참고**: 수동으로 설정하는 경우 이 토큰은 32자의 영숫자여야 합니다.

그런 다음 새로운 설정을 적용합니다:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm 차트 v2.7.0+는 기본적으로 Cluster Agent를 활성화합니다.

인증을 위해 `datadog-values.yaml`에서 `clusterAgent.enabled`가 `true`로 설정되어 있는지 확인하세요.

```yaml
clusterAgent:
  enabled: true
```

Helm은 보안 통신을 위해 Datadog Agent와 Cluster Agent가 공유할 무작위 토큰을 Kubernetes `Secret`에서 자동으로 생성합니다.

이 토큰을 `datadog-agent.yaml`의 `clusterAgent.token` 필드에서 수동으로 지정할 수 있습니다.

```yaml
clusterAgent:
  enabled: true
  token: <DATADOG_CLUSTER_AGENT_TOKEN>
```

또는 기존 `Secret`의 이름을 참조하여 이 토큰을 지정할 수 있습니다. 토큰은 `token`라는 이름의 키에 있습니다.

```yaml
clusterAgent:
  enabled: true
  tokenExistingSecret: <SECRET_NAME>
```

{{% /tab %}}
{{< /tabs >}}

자세한 정보는 [Datadog Cluster Agent 문서][2]를 참조하세요.

## 커스텀 메트릭 서버

Cluster Agent의 [커스텀 메트릭 서버][22] 기능을 사용하려면 Datadog [애플리케이션 키][24]를 제공하고 메트릭 공급자를 활성화해야 합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`datadog-agent.yaml`에서 `spec.global.credentials.appKey`에 있는 애플리케이션 키를 제공하고 `features.externalMetricsServer.enabled`를 `true`로 설정하세요.

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

그런 다음 새로운 설정을 적용합니다:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```
{{% /tab %}}
{{% tab "Helm" %}}
`datadog-values.yaml`에서 `datadog.appKey`에 있는 애플리케이션 키를 제공하고`clusterAgent.metricsProvider.enabled`를 `true`로 설정하세요.

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>

  clusterAgent:
    enabled: true
    metricsProvider:
      enabled: true
```

그런 다음 Helm 차트를 업그레이드합니다.

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

## 통합

 Agent가 클러스트에서 작동하면 [Datadog 자동탐지 기능][5]을 사용해 파드에서 자동으로 메트릭과 로그를 수집합니다.

## 컨테이너 보기

Datadog의 [Container Explorer][3]를 사용하려면 Process Agent를 활성화해야 합니다. Datadog Operator 및 Helm 차트는 **기본적으로 Process Agent를 활성화**합니다. 추가 구성은 필요하지 않습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator는 기본적으로 Process Agent를 활성화합니다.

인증을 위해 `datadog-agent.yaml`에서 `features.liveContainerCollection.enabled`가 `true`로 설정되어 있는지 확인하세요.

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
    liveContainerCollection:
      enabled: true
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm 차트는 기본적으로 Process Agent를 활성화합니다.

인증을 위해 `datadog-values.yaml`에서 `processAgent.enabled`가 `true`로 설정되어 있는지 확인하세요.

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
```

일부 설정에서는 Process Agent와 Cluster Agent가 Kubernetes 클러스터 이름을 자동으로 감지할 수 없습니다. 이 경우 기능이 작동하지 않고 Cluster Agent 로그에 다음 경고가 표시됩니다:`Orchestrator explorer enabled but no cluster name set: disabling.`. 이를 해결하려면  `values.yaml`에서 `datadog.clusterName`을 해당 클러스터 이름으로 설정해야 합니다.

```yaml
datadog:
  #(...)
  clusterName: <YOUR_CLUSTER_NAME>
  #(...)
  processAgent:
    enabled: true
```

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

자세한 내용은 [컨테이너 보기][15] 문서를 참조하세요.

## Orchestrator Explorer

Datadog Operator 및 Helm 차트는 **기본적으로 Datadog의 [Orchestrator Explorer][20]를 활성화합니다**. 추가 구성은 필요하지 않습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Orchestrator Explorer는 기본적으로 Datadog Operator에서 활성화됩니다.

인증을 위해 `datadog-agent.yaml`에서 `features.orchestratorExplorer.enabled` 파라미터가 `true`로 설정되어 있는지 확인하세요.  

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
    orchestratorExplorer:
      enabled: true
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm 차트는 기본적으로 Orchestrator Explorer를 활성화합니다.

인증을 위해 `orchestratorExplorer.enabled` 파라미터가 `datadog-values.yaml` 파일에서 `true`로 설정되어 있는지 확인하세요.

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}

자세한 내용은 [Orchestrator Explorer 설명서][21]를 참조하세요.

## 환경 변수

Datadog Agent를 설정하려면 다음 환경 변수를 사용하세요.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

| 파라미터 (v2alpha1) |  설명 |
| --------------------------- | ----------- |
| `global.credentials.apiKey` |  Datadog API 키를 설정합니다. |
| `global.credentials.apiSecret.secretName` | `global.credentials.apiKey` 대신 Datadog API 키가 포함된 Kubernetes `Secret`의 이름을 제공하세요.|
| `global.credentials.apiSecret.keyName` | `global.credentials.apiKey` 대신 `global.credentials.apiSecret.secretName`에서 명명된 Kubernetes `Secret` 키를 제공하세요.|
| `global.credentials.appKey` |  Datadog 애플리케이션 키를 구성합니다. 외부 메트릭 서버를 사용하는 경우 메트릭에 대한 읽기 액세스를 위해 Datadog 애플리케이션 키를 설정해야 합니다. |
| `global.credentials.appSecret.secretName` | `global.credentials.apiKey` 대신 Datadog 앱 키를 포함하는 Kubernetes `Secret`의 이름을 제공하세요. |
| `global.credentials.appSecret.keyName` | `global.credentials.apiKey` 대신 `global.credentials.appSecret.secretName`에서 명명된 Kubernetes `Secret` 키를 제공하세요.|
| `global.logLevel` | 로깅의 상세 수준을 설정합니다. 이는 컨테이너에 의해 재정의될 수 있습니다. 유효한 로그 수준은 `trace`, `debug`, `info`, `warn`, `error`, `critical` 및 `off`입니다. 기본값: `info`. |
| `global.registry` | 모든 Agent 이미지에 사용할 이미지 레지스트리입니다. 기본값: `gcr.io/datadoghq` |
| `global.site` | Agent 데이터가 전송될 Datadog [수신 사이트][1]를 설정합니다. 귀하의 사이트는 {{< region-param key="dd_site" code="true" >}}입니다. (오른쪽에서 올바른 사이트가 선택되었는지 확인하세요). |
| `global.tags` | 수집된 모든 메트릭, 이벤트 및 서비스 검사에 첨부할 태그 목록입니다. |

Datadog Operator에 대한 전체 환경 변수 목록은 [Operator v2alpha1 사양][2]을 참조하세요. 이전 버전의 경우 [Operator v1alpha1 사양][3]을 참조하세요.

[1]: /ko/getting_started/
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[3]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v1alpha1.md
{{% /tab %}}
{{% tab "Helm" %}}
|  Helm | 설명 |
|  ---- | ----------- |
|  `datadog.apiKey` | Datadog API 키를 설정합니다. |
| `datadog.apiKeyExistingSecret` | `datadog.apiKey` 대신, Datadog API 키가 포함된 기존 Kubernetes `Secret`의 이름을 제공하고, 키 이름 `api-key`로 설정합니다. |
|  `datadog.appKey` | Datadog 애플리케이션 키를 설정합니다. 외부 메트릭 서버를 사용하는 경우 메트릭에 대한 읽기 액세스를 위해 Datadog 애플리케이션 키를 설정해야 합니다. |
| `datadog.appKeyExistingSecret` | `datadog.appKey` 대신, Datadog 앱 키가 포함된 기존 Kubernetes `Secret`의 이름을 제공하고 키 이름 `app-key`로 설정합니다. ||
| `datadog.logLevel` | 로깅의 상세 수준을 설정합니다. 이는 컨테이너에 의해 재정의될 수 있습니다. 유효한 로그 수준은 `trace`, `debug`, `info`, `warn`, `error`, `critical` 및 `off`입니다. 기본값: `info`. |
| `registry` | 모든 Agent 이미지에 사용할 이미지 레지스트리입니다. 기본값: `gcr.io/datadoghq`. |
| `datadog.site` | Agent 데이터를 전송할 Datadog [수신 사이트][1]를 설정합니다. 귀하의 사이트는 {{< region-param key="dd_site" code="true" >}}입니다. (오른쪽에서 올바른 사이트가 선택되었는지 확인하세요). |
| `datadog.tags` | 수집된 모든 메트릭, 이벤트, 서비스 검사에 첨부할 태그 목록입니다. |

Helm 차트에 대한 전체 환경 변수 목록은 `datadog-values.yaml`에 대한 [전체 옵션 목록][2]을 참조하세요.

[1]: /ko/getting_started/site
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#all-configuration-options
{{% /tab %}}
{{% tab "DaemonSet" %}}
| 환경 변수       | 설명                                                                                                                                                                                                                                                                                                                                    |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | 해당 Datadog API 키 (**필수**)                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | 내보내는 모든 데이터에 대해 글로벌 `env` 태그를 설정합니다.                                                                                                                                                                                                                                                                                           |
| `DD_HOSTNAME`        | 메트릭에 사용할 호스트 이름(자동 감지에 실패한 경우)                                                                                                                                                                                                                                                                                       |
| `DD_TAGS`            | 공백으로 구분된 호스트 태그입니다. 예: `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | 메트릭, 트레이스 및 로그의 대상 사이트입니다. 귀하의 `DD_SITE`는 {{< region-param key="dd_site" code="true">}}입니다. 기본값: `datadoghq.com`.                                                                                                                                                                                               |
| `DD_DD_URL`          | (선택 사항) 메트릭 제출을 위한 URL을 재정의하는 설정입니다.                                                                                                                                                                                                                                                                            |
| `DD_URL` (6.36+/7.36+)            | `DD_DD_URL`에 대한 별칭입니다.`DD_DD_URL`이 이미 설정되어 있는 경우 무시됩니다.                                                                                                                                                                                                                                                                               |
| `DD_CHECK_RUNNERS`   | Agent는 기본적으로 모든 검사를 동시에 실행합니다(기본값 = `4` 러너). 검사를 순차적으로 실행하려면 값을 `1`로 설정하세요. 많은 수의 검사(또는 느린 검사)를 실행해야 하는 경우`collector-queue` 구성 요소가 뒤쳐져 상태 검사에 실패할 수 있습니다. 검사를 병렬로 실행하기 위해 러너 수를 늘릴 수 있습니다. |
| `DD_LEADER_ELECTION` | 클러스터에서 Agent의 여러 인스턴스가 실행 중인 경우 이벤트 수집 중복을 방지하려면 이 변수를 `true`로 설정하세요.                                                                                                                                                                                                              |
{{% /tab %}}
{{< /tabs >}}

## DogStatsD 설정

DogStatsD는 StatsD 프로토콜을 사용하여 UDP를 통해 커스텀 메트릭을 보낼 수 있습니다. **DogStatsD는 Datadog Operator 및 Helm에 의해 기본적으로 활성화됩니다**. 자세한 내용은 [DogStatsD 문서][19]를 참조하세요.

다음 환경 변수를 사용하여 DaemonSet으로 DogStatsD를 구성할 수 있습니다.

| 환경 변수                     | 설명                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | 다른 컨테이너에서 DogStatsD 패킷 수신(커스텀 메트릭 전송에 필요)                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | 계산을 위한 히스토그램 백분위수(공백으로 구분)입니다. 기본값은 `0.95`입니다.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | 히스토그램은 계산을 위해 집계됩니다(공백으로 구분). 기본값은 `"max median avg count"`입니다.                                                          |
| `DD_DOGSTATSD_SOCKET`            | 수신할 Unix 소켓 경로입니다. `rw`(으)로 마운트된 볼륨이어야 합니다.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Unix 소켓 메트릭을 위한 컨테이너 감지 및 태깅을 활성화합니다.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | 이 DogStatsD 서버가 수신한 모든 메트릭, 이벤트 및 서비스 검사에 추가할 태그입니다. 예: `"env:golden group:retrievers"` |

## 태그 매핑 설정

Datadog은 Kubernetes에서 공통 태그를 자동으로 수집합니다.

또한 Kubernetes 노드 레이블, 파드 레이블 및 주석을 Datadog 태그에 매핑할 수 있습니다. 이 매핑을 설정하려면 다음 환경 변수를 사용하세요.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

| 파라미터 (v2alpha1) |  설명 |
| --------------------------- |  ----------- |
| `global.namespaceLabelsAsTags` |  Datadog 태그에 Kubernetes 네임스페이스 레이블 매핑을 제공합니다. `<KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>` |
| `global.nodeLabelsAsTags` | Datadog 태그에 Kubernetes 노드 레이블 매핑을 제공합니다.`<KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>` |
| `global.podAnnotationsAsTags` |  Datadog 태그에 Kubernetes 주석 매핑을 제공합니다.
`<KUBERNETES_ANNOTATION>: <DATADOG_TAG_KEY>` |
| `global.podLabelsAsTags` |  Datadog 태그에 Kubernetes 레이블 매핑을 제공합니다.`<KUBERNETES_LABEL>: <DATADOG_TAG_KEY>` |

### 예시

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    namespaceLabelsAsTags:
      env: environment
      # <KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>
    nodeLabelsAsTags:
      beta.kubernetes.io/instance-type: aws-instance-type
      kubernetes.io/role: kube_role
      # <KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>
    podLabelsAsTags:
      app: kube_app
      release: helm_release
      # <KUBERNETES_LABEL>: <DATADOG_TAG_KEY>
    podAnnotationsAsTags:
      iam.amazonaws.com/role: kube_iamrole
       # <KUBERNETES_ANNOTATIONS>: <DATADOG_TAG_KEY>
```

{{% /tab %}}
{{% tab "Helm" %}}

|  Helm | 설명 |
| --------------------------- | ----------- |
|  `datadog.namespaceLabelsAsTags` | Datadog 태그에 Kubernetes 네임스페이스 레이블 매핑을 제공합니다.`<KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>` |
|  `datadog.nodeLabelsAsTags` | Datadog 태그에 Kubernetes 노드 레이블 매핑을 제공합니다.`<KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>` |
|  `datadog.podAnnotationsAsTags` | Datadog 태그에 Kubernetes 주석 매핑을 제공합니다.`<KUBERNETES_ANNOTATION>: <DATADOG_TAG_KEY>` |
|  `datadog.podLabelsAsTags` | Datadog 태그에 Kubernetes 레이블 매핑을 제공합니다.. `<KUBERNETES_LABEL>: <DATADOG_TAG_KEY>` |

### 예시

```yaml
datadog:
  # (...)
  namespaceLabelsAsTags:
    env: environment
    # <KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>
  nodeLabelsAsTags:
    beta.kubernetes.io/instance-type: aws-instance-type
    kubernetes.io/role: kube_role
    # <KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>
  podLabelsAsTags:
    app: kube_app
    release: helm_release
    # <KUBERNETES_LABEL>: <DATADOG_TAG_KEY>
  podAnnotationsAsTags:
    iam.amazonaws.com/role: kube_iamrole
     # <KUBERNETES_ANNOTATIONS>: <DATADOG_TAG_KEY>
```

{{% /tab %}}
{{< /tabs >}}

## 비밀 파일 사용하기

통합 자격 증명은 Docker 또는 Kubernetes 비밀에 저장되어 자동 탐지 템플릿에 사용됩니다. 자세한 정보는 [비밀 관리][12]를 참조하세요.

## 컨테이너 무시

로그 수집, 메트릭 수집 및 자동 탐지에서 컨테이너를 제외합니다. Datadog은 기본적으로 Kubernetes 및 OpenShift `pause` 컨테이너를 제외합니다. 이러한 허용 목록 및 차단 목록은 자동 탐지에만 적용되며, 트레이스 및 DogStatsD는 영향을 받지 않습니다. 또한, 이러한 환경 변수는 해당 값에서 정규식을 지원합니다.

예시는 [Container Discover 관리][13] 페이지를 참조하세요.

**참고**: `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` 및 `.stopped.total` 메트릭은 이러한 설정의 영향을 받지 않습니다. 모든 컨테이너가 집계됩니다.

## Kubernetes API 서버 시간 초과

기본적으로 [Kubernetes State Metrics Core 검사][25]는 Kubernetes API 서버의 응답을 10초 동안 기다립니다. 대규모 클러스터의 경우 요청 시간이 초과되어 메트릭이 누락될 수 있습니다.

환경 변수 `DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT`를 기본값인 10초보다 높은 값으로 설정하면 이를 방지할 수 있습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
다음 설정을 사용하여 `datadog-agent.yaml`을 업데이트하세요. 

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    clusterAgent:
      env:
        - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
          value: <value_greater_than_10>
```

그런 다음 새로운 설정을 적용합니다:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
다음 설정을 사용하여 `datadog-values.yaml`을 업데이트하세요. 

```yaml
clusterAgent:
  env:
    - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
      value: <value_greater_than_10>
```

그런 다음 Helm 차트를 업그레이드합니다.

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

## 프록시 설정

Agent v6.4.0(및 Trace Agent를 위한 v6.5.0)으로 시작하여 Agent 프록시 설정을 다음 환경 변수로 덮어쓸 수 있습니다.

| 환경 변수             | 설명                                                            |
|--------------------------|------------------------------------------------------------------------|
| `DD_PROXY_HTTP`          | `http` 요청에 대해 프록시로 사용할 수 있는 HTTP URL                     |
| `DD_PROXY_HTTPS`         | `https` 요청에 대해 프록시로 사용할 수 있는 HTTPS URL                   |
| `DD_PROXY_NO_PROXY`      | 프록시를 사용하지 않아야 하며, 공백으로 구분된 URL 목록.      |
| `DD_SKIP_SSL_VALIDATION` |  Agent가 Datadog에 연결 시 문제가 있는 경우 테스트할 수 있는 옵션입니다. |

## 자동 탐지

| 환경 변수                 | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_LISTENERS`               | 실행할 자동 탐지 리스너.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `DD_EXTRA_LISTENERS`         | 추가 실행할 자동 탐지 리스너. `datadog.yaml` 설정 파일의 `listeners` 섹션에 정의된 변수에 추가로 더해집니다.                                                                                                                                                                                                                                                                                                                                    |
| `DD_CONFIG_PROVIDERS`        |  Agent가 검사 설정을 수집하기 위해 호출해야 하는 공급자입니다. 사용 가능한 공급자는 다음과 같습니다: <br>`kubelet` - 파드 주석에 포함된 템플릿을 처리합니다. <br>`docker` - 컨테이너 레이블에 포함된 템플릿을 처리합니다. <br>`clusterchecks` - Cluster Agent에서 클러스터 레벨 검사 설정을 검색합니다. <br>`kube_services` - 클러스터 검사를 위해 Kubernetes 서비스를 감시합니다. |
| `DD_EXTRA_CONFIG_PROVIDERS`  | 추가로 사용할 자동 탐지 설정 공급자. `datadog.yaml` 설정 파일의 `config_providers` 섹션에서 정의된 변수에 추가됩니다. |

## 기타

| 환경 변수                        | 설명                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | 단일 소스를 강제로 적용하기 위해 컨테이너 소스 자동 감지를 재정의합니다. 예: `"docker"`, `"ecs_fargate"`, `"kubelet"`. Agent v7.35.0부터는 더 이상 필요하지 않습니다.                                                                                                     |
| `DD_HEALTH_PORT`                    | 이를 `5555`로 설정하여 포트 `5555`에서 Agent 상태 검사를 표시합니다.                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | 커스텀 Kubernetes 클러스터 식별자를 설정하여 호스트 별칭 충돌을 방지합니다. 클러스터 이름은 최대 40자까지 입력할 수 있으며 다음과 같은 제한이 있습니다: 소문자, 숫자 및 하이픈만 사용할 수 있으며, 문자로 시작해야 합니다. 또한, 숫자 또는 문자로 끝나야 합니다. |
| `DD_COLLECT_KUBERNETES_EVENTS ` |  Agent를 사용해 이벤트 수집을 활성화합니다. 클러스터에서 Agent의 여러 인스턴스를 실행하는 경우`DD_LEADER_ELECTION`을(를)`true`로 설정합니다.                                                                                                                       |


[1]: /ko/agent/
[2]: /ko/containers/cluster_agent/
[3]: https://app.datadoghq.com/containers
[5]: /ko/containers/kubernetes/integrations/
[12]: /ko/agent/configuration/secrets-management/
[13]: /ko/agent/guide/autodiscovery-management/
[14]: /ko/containers/guide/kubernetes_daemonset#cluster-agent-event-collection
[15]: /ko/infrastructure/containers/
[16]: /ko/containers/kubernetes/apm
[17]: /ko/containers/kubernetes/log
[18]: /ko/network_monitoring/performance/
[19]: /ko/developers/dogstatsd
[20]: https://app.datadoghq.com/orchestration/overview
[21]: /ko/infrastructure/containers/orchestrator_explorer
[22]: /ko/containers/guide/cluster_agent_autoscaling_metrics/?tab=helm
[23]: /ko/infrastructure/process/ 
[24]: /ko/account_management/api-app-keys/#application-keys
[25]: /ko/integrations/kubernetes_state_core/