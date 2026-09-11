---
aliases:
- /ko/integrations/faq/gathering-kubernetes-events
- /ko/agent/kubernetes/event_collection
- /ko/agent/kubernetes/configuration
description: Datadog Agent 설치 후 APM, 로그, 프로세스, 이벤트 및 기타 기능을 위한 추가 구성 옵션입니다.
title: Kubernetes에서 Datadog Agent를 추가로 구성
---
## 개요 {#overview}

Kubernetes 환경에 Datadog Agent를 설치한 후 필요에 따라 추가 기능을 구성할 수 있습니다.

### Datadog에서 수집하도록 활성화할 수 있는 항목: {#enable-datadog-to-collect}
- [트레이스(APM)](#enable-apm-and-tracing)
- [Kubernetes 이벤트](#enable-kubernetes-event-collection)
- [CNM](#enable-cnm-collection)
- [로그](#enable-log-collection)
- [프로세스](#enable-process-collection)

### 기타 기능 {#other-capabilities}
- [Datadog Cluster Agent](#datadog-cluster-agent)
- [Integrations](#integrations)
- [Containers view](#containers-view)
- [Orchestrator Explorer](#orchestrator-explorer)
- [External metrics server](#custom-metrics-server)

### 추가 구성{#more-configurations}
- [환경 변수](#environment-variables)
- [사용자 지정 메트릭용 DogStatsD](#configure-dogstatsd)
- [태그 매핑](#configure-tag-mapping)
- [Secrets](#using-secret-files)
- [컨테이너 무시](#ignore-containers)
- [Kubernetes API 서버 시간 초과](#kubernetes-api-server-timeout)
- [프록시 설정](#proxy-settings)
- [Autodiscovery](#autodiscovery)
- [클러스터 이름 설정](#set-cluster-name)
- [기타 설정](#miscellaneous)

## APM 및 트레이싱 활성화 {#enable-apm-and-tracing}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml`을 편집하여 `features.apm.enabled`를 `true`로 설정합니다.

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

Helm에서는 APM이 기본적으로 UDS 또는 Windows Named Pipe를 통해 **활성화**되어 있습니다.

확인하려면 `values.yaml` 파일에서 `datadog.apm.socketEnabled`가 `true`로 설정되어 있는지 확인하세요.

```yaml
datadog:
  apm:
    socketEnabled: true    
```

{{% /tab %}}
{{< /tabs >}}

자세한 내용은 [Kubernetes 트레이스 수집][16]을 참조하세요.

## Kubernetes 이벤트 수집 활성화 {#enable-kubernetes-event-collection}

Kubernetes 이벤트 수집에는 [Datadog Cluster Agent][2]를 사용합니다. 

{{< tabs >}}
{{% tab "Datadog Operator" %}}

이벤트 수집은 Datadog Operator에서 기본적으로 활성화되어 있습니다. 이는 `datadog-agent.yaml`의 구성 항목 `features.eventCollection.collectKubernetesEvents`에서 관리할 수 있습니다.

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

Datadog Cluster Agent로 Kubernetes 이벤트를 수집하려면 `datadog-values.yaml` 파일에서 `clusterAgent.enabled`, `datadog.collectEvents`, `clusterAgent.rbac.create` 옵션이 모두 `true`로 설정되어 있는지 확인하세요.

```yaml
datadog:
  collectEvents: true
clusterAgent:
  enabled: true
  rbac: 
    create: true
```

Cluster Agent를 사용하지 않는 경우에도 `datadog-values.yaml` 파일에서 `datadog.leaderElection`, `datadog.collectEvents`, `agents.rbac.create` 옵션을 `true`로 설정하면 Node Agent가 Kubernetes 이벤트를 수집할 수 있습니다.

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

DaemonSet 구성은 [DaemonSet Cluster Agent 이벤트 수집][14]을 참조하세요.

## CNM 수집 활성화 {#enable-cnm-collection}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml`에서 `features.npm.enabled`를 `true`으로 설정합니다.

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

그런 다음 새 구성을 적용합니다.

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

다음 구성으로 `datadog-values.yaml`을 업데이트합니다.

```yaml
datadog:
  # (...)
  networkMonitoring:
    enabled: true
```

그 후 Helm 차트를 업그레이드합니다.

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

자세한 내용은 [Cloud Network Monitoring][18]을 참조하세요.

## 로그 수집 활성화 {#enable-log-collection}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`datadog-agent.yaml`에서 `features.logCollection.enabled` 및 `features.logCollection.containerCollectAll`을 `true`로 설정합니다.

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

그런 다음 새 구성을 적용합니다.

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
다음 구성으로 `datadog-values.yaml`을 업데이트합니다.

```yaml
datadog:
  # (...)
  logs:
    enabled: true
    containerCollectAll: true
```

그 후 Helm 차트를 업그레이드합니다.

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

자세한 내용은 [Kubernetes 로그 수집][17]을 참조하세요.

## 프로세스 수집 활성화 {#enable-process-collection}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`datadog-agent.yaml`에서 `features.liveProcessCollection.enabled`를 `true`으로 설정합니다.

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

그런 다음 새 구성을 적용합니다.

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
다음 구성으로 `datadog-values.yaml`을 업데이트합니다.

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
    processCollection: true
```

그 후 Helm 차트를 업그레이드합니다.

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

자세한 내용은 [Live Processes][23]을 참조하세요.
## Datadog Cluster Agent {#datadog-cluster-agent}

Datadog Cluster Agent는 클러스터 수준 모니터링 데이터를 보다 간소화되고 중앙집중식으로 수집할 수 있도록 지원합니다. Datadog은 Kubernetes 모니터링 시 Cluster Agent 사용을 강력히 권장합니다.

Datadog Operator v1.0.0 이상 및 Helm 차트 v2.7.0 이상에서는 기본적으로 **Cluster Agent가 활성화**되어 있습니다. 추가 구성은 필요하지 않습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator v1.0.0 이상은 기본적으로 Cluster Agent를 활성화합니다. Operator는 필요한 RBAC를 생성하고 Cluster Agent를 배포합니다. 두 Agent는 동일한 API 키를 사용합니다.

Operator는 Datadog Agent와 Cluster Agent 간의 안전한 통신을 위해 Kubernetes `Secret`에 무작위 토큰을 자동 생성하여 공유합니다. 

이 토큰은 `datadog-agent.yaml` 파일의 `global.clusterAgentToken` 필드에서 직접 지정할 수도 있습니다.

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

또는 기존 Kubernetes `Secret`의 이름과 해당 토큰이 저장된 데이터 키를 참조하여 지정할 수도 있습니다.

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

**참고**: 수동으로 설정하는 경우 토큰은 32자의 영숫자여야 합니다.

그런 다음 새 구성을 적용합니다.

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm 차트 v2.7.0 이상에서는 기본적으로 Cluster Agent가 활성화됩니다.

확인을 위해 `datadog-values.yaml` 파일에서 `clusterAgent.enabled`가 `true`로 설정되어 있는지 확인하세요.

```yaml
clusterAgent:
  enabled: true
```

Helm은 Datadog Agent와 Cluster Agent가 안전하게 통신할 수 있도록 Kubernetes `Secret`에 무작위 토큰을 자동 생성합니다. 

이 토큰은 `datadog-agent.yaml` 파일의 `clusterAgent.token` 필드에서 직접 지정할 수도 있습니다.

```yaml
clusterAgent:
  enabled: true
  token: <DATADOG_CLUSTER_AGENT_TOKEN>
```

또는 기존 Kubernetes `Secret`의 이름을 참조할 수 있으며, 이 경우 토큰은 `token` 키에 저장되어 있어야 합니다.

```yaml
clusterAgent:
  enabled: true
  tokenExistingSecret: <SECRET_NAME>
```

{{% /tab %}}
{{< /tabs >}}

자세한 내용은 [Datadog Cluster Agent 설명서][2]를 참조하세요.

## 사용자 지정 메트릭 서버 {#custom-metrics-server}

Cluster Agent의 [사용자 지정 메트릭 서버][22] 기능을 사용하려면 Datadog [애플리케이션 키][24]를 제공하고 메트릭 공급자를 활성화해야 합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`datadog-agent.yaml`에서 `spec.global.credentials.appKey` 아래에 애플리케이션 키를 설정하고 `features.externalMetricsServer.enabled`를 `true`로 지정합니다.

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

그런 다음 새 구성을 적용합니다.

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```
{{% /tab %}}
{{% tab "Helm" %}}
`datadog-values.yaml`에서 `datadog.appKey` 아래에 애플리케이션 키를 설정하고 `clusterAgent.metricsProvider.enabled`를 `true`로 지정합니다.

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>

clusterAgent:
  enabled: true
  metricsProvider:
    enabled: true
```

그 후 Helm 차트를 업그레이드합니다.

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

## Integrations {#integrations}

Agent가 클러스터에서 실행되면 [Datadog의 Autodiscovery 기능][5]을 사용하여 포드의 메트릭과 로그를 자동으로 수집할 수 있습니다.

## Containers View {#containers-view}

Datadog의 [Container Explorer][3]를 사용하려면 Process Agent를 활성화해야 합니다. Datadog Operator와 Helm 차트는 기본적으로 **Process Agent를 활성화**합니다. 추가 구성은 필요하지 않습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator는 기본적으로 Process Agent를 활성화합니다. 

확인을 위해 `datadog-agent.yaml` 파일에서 `features.liveContainerCollection.enabled`가 `true`로 설정되어 있는지 확인하세요.

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
일부 설정에서는 Process Agent와 Cluster Agent가 Kubernetes 클러스터 이름을 자동으로 감지하지 못할 수 있습니다. 이 경우 기능이 시작되지 않으며 Cluster Agent 로그에 다음과 같은 경고가 표시됩니다. `Orchestrator explorer enabled but no cluster name set: disabling` 이 경우 `datadog-agent.yaml`에서 `spec.global.clusterName`을 클러스터 이름으로 설정해야 합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <YOUR_CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    orchestratorExplorer:
      enabled: true
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm 차트는 기본적으로 Process Agent를 활성화합니다.

확인을 위해 `datadog-values.yaml` 파일에서 `processAgent.enabled`가 `true`로 설정되어 있는지 확인하세요.

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
```

일부 설정에서는 Process Agent와 Cluster Agent가 Kubernetes 클러스터 이름을 자동으로 감지하지 못할 수 있습니다. 이 경우 기능이 시작되지 않으며 Cluster Agent 로그에 다음과 같은 경고가 표시됩니다. `Orchestrator explorer enabled but no cluster name set: disabling.` 이 경우 `datadog-values.yaml`에서 `datadog.clusterName`을 클러스터 이름으로 설정해야 합니다.

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

유효한 클러스터 이름의 제한 사항은 [클러스터 이름 설정](#set-cluster-name)을 참조하세요.

추가 정보는 [Containers View][15] 설명서를 참조하세요.

## Orchestrator Explorer {#orchestrator-explorer}

Datadog Operator와 Helm 차트는 기본적으로 Datadog의 [Orchestrator Explorer][20]를 **활성화**합니다. 추가 구성은 필요하지 않습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator에서는 기본적으로 Orchestrator Explorer가 활성화되어 있습니다. 

확인을 위해 `datadog-agent.yaml` 파일에서 `features.orchestratorExplorer.enabled` 파라미터가 `true`로 설정되어 있는지 확인하세요.

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

일부 설정에서는 Process Agent와 Cluster Agent가 Kubernetes 클러스터 이름을 자동으로 감지하지 못할 수 있습니다. 이 경우 기능이 시작되지 않으며 Cluster Agent 로그에 다음과 같은 경고가 표시됩니다. `Orchestrator explorer enabled but no cluster name set: disabling` 이 경우 `datadog-agent.yaml`에서 `spec.global.clusterName`을 클러스터 이름으로 설정해야 합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <YOUR_CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    orchestratorExplorer:
      enabled: true
```


{{% /tab %}}
{{% tab "Helm" %}}

Helm 차트에서는 기본적으로 Orchestrator Explorer가 활성화되어 있습니다.

확인을 위해 `datadog-values.yaml` 파일에서 `orchestratorExplorer.enabled` 파라미터가 `true`로 설정되어 있는지 확인하세요.

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

일부 설정에서는 Process Agent와 Cluster Agent가 Kubernetes 클러스터 이름을 자동으로 감지하지 못할 수 있습니다. 이 경우 기능이 시작되지 않으며 Cluster Agent 로그에 다음과 같은 경고가 표시됩니다. `Orchestrator explorer enabled but no cluster name set: disabling.` 이 경우 `values.yaml`에서 `datadog.clusterName`을 클러스터 이름으로 설정해야 합니다.

```yaml
datadog:
  #(...)
  clusterName: <YOUR_CLUSTER_NAME>
  #(...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}

유효한 클러스터 이름의 제한 사항은 [클러스터 이름 설정](#set-cluster-name)을 참조하세요.

추가 정보는 [Orchestrator Explorer 설명서][21]를 참조하세요.

## 기본 구성 {#basic-configuration}

다음 구성 필드를 사용하여 Datadog Agent를 구성할 수 있습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

| 파라미터(v2alpha1) |  설명 |
| --------------------------- | ----------- |
| `global.credentials.apiKey` |  Datadog API 키를 구성합니다. |
| `global.credentials.apiSecret.secretName` | `global.credentials.apiKey` 대신, Datadog API 키를 포함하는 Kubernetes `Secret`의 이름을 제공합니다.|
| `global.credentials.apiSecret.keyName` | `global.credentials.apiKey` 대신, `global.credentials.apiSecret.secretName`에 이름이 지정된 Kubernetes `Secret`의 키를 제공합니다.|
| `global.credentials.appKey` |  Datadog 애플리케이션 키를 구성합니다. 외부 메트릭 서버를 사용하는 경우 메트릭에 대한 읽기 권한을 위해 Datadog 애플리케이션 키를 반드시 설정해야 합니다. |
| `global.credentials.appSecret.secretName` | `global.credentials.apiKey` 대신, Datadog 앱 키를 포함하는 Kubernetes `Secret`의 이름을 제공합니다.|
| `global.credentials.appSecret.keyName` | `global.credentials.apiKey` 대신, `global.credentials.appSecret.secretName`에 이름이 지정된 Kubernetes `Secret`의 키를 제공합니다.|
| `global.logLevel` | 로그 상세 수준을 설정합니다. 컨테이너 수준에서 재정의할 수 있습니다. 유효한 로그 수준은 `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off`입니다. 기본값: `info`. |
| `global.registry` | 모든 Agent 이미지에 사용할 이미지 레지스트리입니다. 기본값: `gcr.io/datadoghq`. |
| `global.site` | Agent 데이터 전송 대상인 Datadog [Intake Site][1]를 설정합니다. 현재 사이트는 {{< region-param key="dd_site" code="true" >}}입니다. (오른쪽에서 올바른 SITE가 선택되어 있는지 확인하세요). |
| `global.tags` | 수집되는 모든 메트릭, 이벤트 및 서비스 검사에 연결할 태그 목록입니다. |

Datadog Operator의 전체 구성 필드 목록은 [Operator v2alpha1 사양][2]을 참조하세요. 이전 버전은 [DatadogAgent CRD를 v2alpha1로 마이그레이션][3] 설명서를 참조하세요. 구성 필드는 `kubectl explain datadogagent --recursive`를 사용하여 조회할 수도 있습니다.

[1]: /ko/getting_started/
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[3]: /ko/containers/guide/v2alpha1_migration/
{{% /tab %}}
{{% tab "Helm" %}}
|  Helm | 설명 |
|  ---- | ----------- |
|  `datadog.apiKey` | Datadog API 키를 구성합니다. |
| `datadog.apiKeyExistingSecret` | `datadog.apiKey` 대신, Datadog API 키를 포함하는 기존 Kubernetes `Secret`의 이름을 제공하고, 키 이름은 `api-key`으로 설정합니다. |
|  `datadog.appKey` | Datadog 애플리케이션 키를 구성합니다. 외부 메트릭 서버를 사용하는 경우 메트릭에 대한 읽기 권한을 위해 Datadog 애플리케이션 키를 반드시 설정해야 합니다. |
| `datadog.appKeyExistingSecret` | `datadog.appKey` 대신, Datadog 애플리케이션 키(키 이름 `app-key`으로 설정)를 포함하는 기존 Kubernetes `Secret`의 이름을 제공합니다. |
| `datadog.logLevel` | 로그 상세 수준을 설정합니다. 컨테이너 수준에서 재정의할 수 있습니다. 유효한 로그 수준은 `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off`입니다. 기본값: `info`. |
| `registry` | 모든 Agent 이미지에 사용할 이미지 레지스트리입니다. 기본값: `gcr.io/datadoghq`. |
| `datadog.site` | Agent 데이터 전송 대상인 Datadog [Intake Site][1]를 설정합니다. 현재 사이트는 {{< region-param key="dd_site" code="true" >}}입니다. (오른쪽에서 올바른 SITE가 선택되어 있는지 확인하세요). |
| `datadog.tags` | 수집되는 모든 메트릭, 이벤트 및 서비스 검사에 연결할 태그 목록입니다. |

Helm 차트에서 사용할 수 있는 전체 환경 변수 목록은 `datadog-values.yaml`에 대한 [전체 옵션 목록][2]을 참조하세요.

[1]: /ko/getting_started/site
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#all-configuration-options
{{% /tab %}}
{{% tab "DaemonSet" %}}
| 환경 변수         | 설명                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Datadog API 키(**필수**)                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | 내보내는 모든 데이터에 대해 전역 `env` 태그를 설정합니다.                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | 메트릭에 사용할 호스트 이름(자동 감지 실패 시)                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`            | 공백으로 구분된 호스트 태그입니다. 예: `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | 메트릭, 트레이스 및 로그의 전송 대상 사이트입니다. 현재 `DD_SITE`는 {{< region-param key="dd_site" code="true">}}입니다. 기본값은 `datadoghq.com`입니다.                                                                                                                                                                                               |
| `DD_DD_URL`          | 메트릭 전송 URL을 재정의하는 선택적 설정입니다.                                                                                                                                                                                                                                                                                      |
| `DD_URL` (6.36+/7.36+)            | `DD_DD_URL`의 별칭입니다. `DD_DD_URL`이 이미 설정되어 있으면 무시됩니다.                                                                                                                                                                                                                                                                                    |
| `DD_CHECK_RUNNERS`   | Agent는 기본적으로 모든 점검을 동시에 실행합니다(기본값 = `4`개의 러너). 검사를 순차적으로 실행하려면 값을 `1`로 설정합니다. 많은 수의 검사(또는 실행 속도가 느린 검사)를 수행해야 하는 경우 `collector-queue` 구성 요소가 지연되어 상태 검사에 실패할 수 있습니다. 검사를 병렬 실행하기 위해 러너 수를 늘릴 수 있습니다. |
| `DD_LEADER_ELECTION` | 클러스터에서 여러 Agent 인스턴스가 실행 중인 경우 이벤트 수집 중복을 방지하기 위해 이 값을 `true`로 설정합니다.                                                                                                                                                                                                                         |
{{% /tab %}}
{{< /tabs >}}

## 환경 변수 {#environment-variables}
컨테이너화된 Datadog Agent는 환경 변수를 사용하여 구성할 수 있습니다. 지원되는 환경 변수의 자세한 목록은 Docker Agent 설명서의 [환경 변수][26] 섹션을 참조하세요.

### 예시 {#examples}
{{< tabs >}}
{{% tab "Datadog Operator" %}}
Datadog Operator를 사용하는 경우 구성 요소 수준에서는 `[key].env []object`를, 컨테이너 수준에서는 `[key].containers.[key].env []object`를 사용하여 `override`에 추가 환경 변수를 설정할 수 있습니다. 다음 키가 지원됩니다. 

- `nodeAgent`
- `clusterAgent`
- `clusterChecksRunner`

컨테이너 수준 설정은 구성 요소 수준 설정보다 우선 적용됩니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: <ENV_VAR_NAME>
          value: <ENV_VAR_VALUE>
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
  - name: <ENV_VAR_NAME>
    value: <ENV_VAR_VALUE>
clusterAgent:
  env:
  - name: <ENV_VAR_NAME>
    value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{% tab "DaemonSet" %}}
DaemonSet 또는 Deployment(Datadog Cluster Agent용)에 환경 변수를 추가합니다.

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          ...
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{< /tabs >}}

## DogStatsD 구성 {#configure-dogstatsd}

DogStatsD는 StatsD 프로토콜을 사용하여 UDP를 통해 사용자 지정 메트릭을 전송할 수 있습니다. **DogStatsD는 Datadog Operator 및 Helm에서 기본적으로 활성화되어 있습니다.** 자세한 내용은 [DogStatsD 설명서][19]를 참조하세요.

DaemonSet에서 DogStatsD를 구성하기 위해 다음 환경 변수를 사용할 수 있습니다.

| 환경 변수                     | 설명                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | 다른 컨테이너로부터 DogStatsD 패킷을 수신합니다(사용자 지정 메트릭 전송 시 필요).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | 계산할 히스토그램 백분위수(공백으로 구분). 기본값은 `0.95`입니다.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | 계산할 히스토그램 집계(공백으로 구분). 기본값은 `"max median avg count"`입니다.                                                          |
| `DD_DOGSTATSD_SOCKET`            | 수신할 유닉스 소켓의 경로입니다. `rw`마운트된 볼륨 내 경로여야 합니다.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | UNIX 소켓 메트릭에 대해 컨테이너 감지 및 태깅을 활성화합니다.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | 이 DogStatsD 서버가 수신하는 모든 메트릭, 이벤트 및 서비스 검사에 추가할 태그입니다(예: `"env:golden group:retrievers"`). |

## 태그 매핑 구성 {#configure-tag-mapping}

Datadog은 Kubernetes에서 일반적으로 사용되는 태그를 자동으로 수집합니다.

또한 Kubernetes 노드 레이블, 포드 레이블 및 주석을 Datadog 태그에 매핑할 수 있습니다. 다음 환경 변수를 사용하여 이 매핑을 구성합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

| 파라미터(v2alpha1) |  설명 |
| --------------------------- |  ----------- |
| `global.namespaceLabelsAsTags` |  Kubernetes 네임스페이스 레이블을 Datadog 태그에 매핑합니다. `<KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>` |
| `global.nodeLabelsAsTags` | Kubernetes 노드 레이블을 Datadog 태그에 매핑합니다. `<KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>` |
| `global.podAnnotationsAsTags` |  Kubernetes 주석을 Datadog 태그에 매핑합니다. `<KUBERNETES_ANNOTATION>: <DATADOG_TAG_KEY>` |
| `global.podLabelsAsTags` |  Kubernetes 레이블을 Datadog 태그에 매핑합니다. `<KUBERNETES_LABEL>: <DATADOG_TAG_KEY>` |

### 예시 {#examples-1}

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
|  `datadog.namespaceLabelsAsTags` | Kubernetes 네임스페이스 레이블을 Datadog 태그에 매핑합니다. `<KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>` |
|  `datadog.nodeLabelsAsTags` | Kubernetes 노드 레이블을 Datadog 태그에 매핑합니다. `<KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>` |
|  `datadog.podAnnotationsAsTags` | Kubernetes 주석을 Datadog 태그에 매핑합니다. `<KUBERNETES_ANNOTATION>: <DATADOG_TAG_KEY>` |
|  `datadog.podLabelsAsTags` | Kubernetes 레이블을 Datadog 태그에 매핑합니다. `<KUBERNETES_LABEL>: <DATADOG_TAG_KEY>` |

### 예시 {#examples-2}

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

## 시크릿 파일 사용 {#using-secret-files}

통합 자격 증명은 Docker 또는 Kubernetes 시크릿에 저장되어 Autodiscovery 템플릿에서 사용할 수 있습니다. 자세한 내용은 [Secrets Management][12]를 참조하세요.

## 컨테이너 무시 {#ignore-containers}

로그 수집, 메트릭 수집 및 Autodiscovery에서 컨테이너를 제외합니다. Datadog은 기본적으로 Kubernetes 및 OpenShift의 `pause` 컨테이너를 제외합니다. 이 허용 목록과 차단 목록은 Autodiscovery에만 적용되며, 트레이스 및 DogStatsD에는 영향을 미치지 않습니다. 이러한 환경 변수 값에는 정규식을 사용할 수 있습니다.

예시는 [Container Discovery Management][13] 페이지를 참조하세요.

**참고**: `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total`, `.stopped.total` 메트릭은 이러한 설정의 영향을 받지 않습니다. 모든 컨테이너는 계속 집계됩니다.

## Kubernetes API 서버 시간 초과 {#kubernetes-api-server-timeout}

기본적으로 [Kubernetes 상태 메트릭 코어 검사][25]는 Kubernetes API 서버의 응답을 10초 동안 기다립니다. 대규모 클러스터에서는 요청이 시간 초과되어 일부 메트릭이 누락될 수 있습니다.

이 문제를 방지하려면 환경 변수 `DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT`을 기본값인 10초보다 큰 값으로 설정하세요.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
다음 구성으로 `datadog-agent.yaml`을 업데이트합니다.

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

그런 다음 새 구성을 적용합니다.

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
다음 구성으로 `datadog-values.yaml`을 업데이트합니다.

```yaml
clusterAgent:
  env:
    - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
      value: <value_greater_than_10>
```

그 후 Helm 차트를 업그레이드합니다.

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

## 프록시 설정 {#proxy-settings}

Agent v6.4.0(및 Trace Agent는 v6.5.0)부터 다음 환경 변수를 사용하여 Agent 프록시 설정을 재정의할 수 있습니다.

| 환경 변수             | 설명                                                            |
|--------------------------|------------------------------------------------------------------------|
| `DD_PROXY_HTTP`          | `http` 요청에 대해 프록시로 사용할 수 있는 HTTP URL.                     |
| `DD_PROXY_HTTPS`         | `https` 요청에 사용할 HTTPS 프록시 URL.                   |
| `DD_PROXY_NO_PROXY`      | 프록시를 사용하지 않아야 하는, 공백으로 구분된 URL 목록.      |
| `DD_SKIP_SSL_VALIDATION` | Agent가 Datadog에 연결하는 데 문제가 있는지 테스트하기 위한 옵션. |

## 클러스터 이름 설정 {#set-cluster-name}

일부 기능은 Kubernetes 클러스터 이름을 설정해야 사용할 수 있습니다. 유효한 클러스터 이름은 고유하며 점으로 구분된 형식을 사용하고 다음 제한 사항을 충족해야 합니다.

- 소문자, 숫자 및 하이픈만 포함 가능
- 문자로 시작해야 함
- 전체 길이는 80자 이하

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`datadog-agent.yaml`에서 `spec.global.clusterName`을 클러스터 이름으로 설정합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <YOUR_CLUSTER_NAME>
```
{{% /tab %}}

{{% tab "Helm" %}}
`datadog-values.yaml`에서 `datadog.clusterName`을 클러스터 이름으로 설정합니다.

```yaml
datadog:
  #(...)
  clusterName: <YOUR_CLUSTER_NAME>
```
{{% /tab %}}
{{< /tabs >}}

## Autodiscovery {#autodiscovery}

| 환경 변수                 | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_LISTENERS`               | 실행할 Autodiscovery 리스너입니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `DD_EXTRA_LISTENERS`         | 추가로 실행할 Autodiscovery 리스너입니다. `datadog.yaml` 구성 파일의 `listeners` 섹션에 정의된 변수에 추가로 적용됩니다.                                                                                                                                                                                                                                                                                                                                    |
| `DD_CONFIG_PROVIDERS`        | Agent가 검사 구성을 수집하기 위해 호출할 프로바이더입니다. 사용 가능한 프로바이더는 다음과 같습니다. <br>`kubelet` - 포드 주석에 포함된 템플릿을 처리합니다. <br>`docker` - 컨테이너 레이블에 포함된 템플릿을 처리합니다. <br>`clusterchecks` - Cluster Agent에서 클러스터 수준 점검 구성을 가져옵니다. <br>`kube_services` - 클러스터 검사를 위해 Kubernetes 서비스를 모니터링합니다. |
| `DD_EXTRA_CONFIG_PROVIDERS`  | 사용할 추가 Autodiscovery 구성 프로바이더입니다. `datadog.yaml` 구성 파일의 `config_providers` 섹션에 정의된 변수에 추가로 적용됩니다. |

## 기타 설정 {#miscellaneous}

| 환경 변수                        | 설명                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | 컨테이너 소스 자동 감지를 재정의하여 단일 소스를 강제로 사용합니다. 예: `"docker"`, `"ecs_fargate"`, `"kubelet"`. Agent v7.35.0부터는 더 이상 필요하지 않습니다.                                                                                                     |
| `DD_HEALTH_PORT`                    | Agent 상태 검사를 포트 `5555`에서 노출하려면 `5555`로 설정합니다.                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | 호스트 별칭 충돌을 방지하기 위해 사용자 지정 Kubernetes 클러스터 식별자를 설정합니다. 클러스터 이름은 최대 40자까지 가능하며, 소문자, 숫자, 하이픈(-)만 사용할 수 있습니다. 문자로 시작해야 합니다. 문자 또는 숫자로 끝나야 합니다. |
| `DD_COLLECT_KUBERNETES_EVENTS ` |  Agent에서 이벤트 수집을 활성화합니다. 클러스터에서 여러 Agent 인스턴스를 실행하는 경우 `DD_LEADER_ELECTION`도 `true`로 설정해야 합니다.                                                                                                                       |


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
[18]: /ko/network_monitoring/cloud_network_monitoring/
[19]: /ko/extend/dogstatsd
[20]: https://app.datadoghq.com/orchestration/overview
[21]: /ko/infrastructure/containers/orchestrator_explorer
[22]: /ko/containers/guide/cluster_agent_autoscaling_metrics/?tab=helm
[23]: /ko/infrastructure/process/ 
[24]: /ko/account_management/api-app-keys/#application-keys
[25]: /ko/integrations/kubernetes_state_core/
[26]: /ko/containers/docker/?tab=standard#environment-variables