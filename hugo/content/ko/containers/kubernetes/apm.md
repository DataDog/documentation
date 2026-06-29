---
aliases:
- /ko/agent/kubernetes/apm
description: Kubernetes 환경에서 실행되는 컨테이너화된 애플리케이션에 대해 APM 트레이스 수집을 활성화합니다.
further_reading:
- link: /agent/kubernetes/log/
  tag: 설명서
  text: 애플리케이션 로그 수집
- link: /agent/kubernetes/prometheus/
  tag: 설명서
  text: Prometheus 메트릭 수집
- link: /agent/kubernetes/integrations/
  tag: 설명서
  text: 애플리케이션 메트릭 및 로그 자동 수집
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
- link: /agent/kubernetes/tag/
  tag: 설명서
  text: 컨테이너에서 내보내는 모든 데이터에 태그 할당
title: Kubernetes APM - 트레이스 수집
---
{{< learning-center-callout header="학습 센터의 Kubernetes 모니터링 소개 과정 체험하기" btn_title="지금 등록" btn_url="https://learn.datadoghq.com/courses/intro-to-monitoring-kubernetes">}}
  실제 클라우드 컴퓨팅 용량과 Datadog 평가판 계정으로 무료로 학습하세요. 이 실습 랩을 통해 Kubernetes 관련 메트릭, 로그 및 APM 트레이스를 빠르게 익힐 수 있습니다.
{{< /learning-center-callout >}}

이 페이지에서는 Kubernetes 애플리케이션에 대한 [APM(Application Performance Monitoring)][10]을 설정하고 구성하는 방법을 설명합니다.

{{< img src="tracing/visualization/troubleshooting_pipeline_kubernetes.png" alt="APM 문제 해결 파이프라인: 트레이서는 애플리케이션 포드에서 Agent 포드로 트레이스 및 메트릭 데이터를 전송하며, Agent는 이를 Datadog 백엔드로 전달하여 Datadog UI에 표시합니다.">}}

트레이스를 Unix Domain Socket(UDS), TCP(`IP:Port`) 또는 Kubernetes 서비스로 전송할 수 있습니다. Datadog은 UDS 사용을 권장하지만 필요에 따라 세 가지 방식을 동시에 사용할 수도 있습니다.

**참고**: 수동 구성 없이 자동 계측을 사용하려면 [Kubernetes용 단일 단계 계측][13]을 참조하세요.

## 설정 {#setup}
1. 아직 설치하지 않았다면 Kubernetes 환경에 [Datadog Agent를 설치][1]합니다..
트레이스를 수집하도록 2. [Datadog Agent를 구성](#configure-the-datadog-agent-to-collect-traces)합니다.
Datadog Agent로 트레이스를 전송하도록 3. [애플리케이션 포드를 구성](#configure-your-application-pods-to-submit-traces-to-datadog-agent)합니다.

### 트레이스를 수집하도록 Datadog Agent를 구성 {#configure-the-datadog-agent-to-collect-traces}

이 섹션의 지침은 Datadog Agent가 UDS를 통해 트레이스를 수신하도록 구성합니다. TCP를 사용하려면 [추가 구성](#additional-configuration) 섹션을 참조하세요. Kubernetes 서비스를 사용하려면 [Kubernetes 서비스에서 APM 설정하기][9]를 참조하세요.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`datadog-agent.yaml`를 편집하여 `features.apm.enabled`를 `true`로 설정합니다.

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
      unixDomainSocketConfig:
        path: /var/run/datadog/apm.socket # default
```

APM이 활성화되면 기본 구성은 호스트에 디렉터리를 생성하고 이를 Agent 내부에 마운트합니다. 그런 다음 Agent는 다음 소켓 파일 `/var/run/datadog/apm/apm.socket`을 생성하고 수신 대기합니다. 애플리케이션 포드도 동일한 볼륨을 마운트하여 같은 소켓에 기록할 수 있습니다. `features.apm.unixDomainSocketConfig.path` 경로와 소켓 파일은 구성 값을 통해 변경할 수 있습니다.

{{% k8s-operator-redeploy %}}

**참고**: minikube에서는 `Unable to detect the kubelet URL automatically` 오류가 발생할 수 있습니다. 이 경우 `global.kubelet.tlsVerify`를 `false`로 설정하세요.

{{% /tab %}}
{{% tab "Helm" %}}

[Helm을 사용하여 Datadog Agent를 설치][1]한 경우 APM은 UDS 또는 Windows 명명된 파이프를 통해 **기본적으로 활성화**됩니다.

이를 확인하려면 `datadog.apm.socketEnabled`가 `datadog-values.yaml`에서 `true`로 설정되어 있는지 확인합니다.

```yaml
datadog:
  apm:
    socketEnabled: true    
```

기본 구성은 호스트에 디렉터리를 생성하고 이를 Agent 내부에 마운트합니다. 그런 다음 Agent는 다음 소켓 파일 `/var/run/datadog/apm.socket`을 생성하고 수신 대기합니다. 애플리케이션 포드도 동일한 볼륨을 마운트하여 같은 소켓에 기록할 수 있습니다. 경로와 소켓 파일은 `datadog.apm.hostSocketPath` 및 `datadog.apm.socketPath` 구성 값을 통해 변경할 수 있습니다.

```yaml
datadog:
  apm:
    # the following values are default:
    socketEnabled: true
    hostSocketPath: /var/run/datadog/
    socketPath: /var/run/datadog/apm.socket
```

APM을 비활성화하려면 `datadog.apm.socketEnabled`를 `false`로 설정하세요.

{{% k8s-helm-redeploy %}}

**참고**: minikube에서는 `Unable to detect the kubelet URL automatically` 오류가 발생할 수 있습니다. 이 경우 `datadog.kubelet.tlsVerify`를 `false`로 설정하세요.

[1]: /ko/containers/kubernetes/installation?tab=helm#installation
{{% /tab %}}
{{< /tabs >}}

### Datadog Agent에 트레이스를 제출하도록 애플리케이션 포드 구성{#configure-your-application-pods-to-submit-traces-to-datadog-agent}

{{< tabs >}}

{{% tab "Datadog Admission Controller" %}}
Datadog Admission Controller는 애플리케이션 포드 구성을 간소화하는 Datadog Cluster Agent의 구성 요소입니다. [Datadog Admission Controller 설명서][1]를 읽어 자세히 알아보세요.

Datadog Admission Controller를 사용하여 환경 변수를 주입하고 새로운 애플리케이션 포드에 필요한 볼륨을 마운트하여 포드와 Agent 간의 트레이스 통신을 자동으로 구성합니다. [Admission Controller를 사용한 라이브러리 주입][2] 설명서를 읽어 애플리케이션을 자동으로 구성하여 Datadog Agent에 트레이스를 제출하는 방법을 알아보세요.

[1]: /ko/agent/cluster_agent/admission_controller/
[2]: /ko/tracing/trace_collection/library_injection_local/
{{% /tab %}}

{{% tab "Unix Domain Socket(UDS)" %}}
UDS를 사용하여 Agent에 트레이스를 보내는 경우 (Agent가 생성한) 소켓이 있는 호스트 디렉터리를 애플리케이션 컨테이너에 마운트하고 `DD_TRACE_AGENT_URL`을 사용하여 소켓 경로를 지정합니다.

```yaml
apiVersion: apps/v1
kind: Deployment
#(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>/<TAG>"
        env:
        - name: DD_TRACE_AGENT_URL
          value: 'unix:///var/run/datadog/apm.socket'
        volumeMounts:
        - name: apmsocketpath
          mountPath: /var/run/datadog
        #(...)
      volumes:
        - hostPath:
            path: /var/run/datadog/
          name: apmsocketpath
```

### 트레이스를 내보내도록 애플리케이션 SDK 구성: {#configure-your-application-sdks-to-emit-traces}
트레이스를 수집하도록 Datadog Agent를 구성하고 트레이스를 보낼 *위치*에 대한 구성을 애플리케이션 포드에 제공합니다. 그런 다음 애플리케이션에 Datadog SDK를 설치하여 트레이스를 내보냅니다. 이 작업이 완료되면 SDK는 트레이스를 적절한 `DD_TRACE_AGENT_URL` 엔드포인트로 보냅니다.

{{% /tab %}}


{{% tab TCP %}}
TCP(`<IP_ADDRESS>:8126`)를 사용하여 Agent로 트레이스를 전송하는 경우, 이 IP 주소를 애플리케이션 포드에 제공하세요. [Datadog Admission Controller][1]를 사용하여 자동으로 구성하거나 수동으로 하향 API를 사용하여 호스트 IP를 가져옵니다. 애플리케이션 컨테이너에는 `status.hostIP`를 가리키는 `DD_AGENT_HOST` 환경 변수가 필요합니다.

```yaml
apiVersion: apps/v1
kind: Deployment
#(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>/<TAG>"
        env:
          - name: DD_AGENT_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
```
**참고**: 이 구성을 사용하려면 Agent가 TCP를 통해 트레이스를 수신할 수 있어야 합니다.

### 트레이스를 내보내도록 애플리케이션 SDK 구성: {#configure-your-application-sdks-to-emit-traces-1}
트레이스를 수집하도록 Datadog Agent를 구성하고 트레이스를 보낼 *위치*에 대한 구성을 애플리케이션 포드에 제공합니다. 그런 다음 애플리케이션에 Datadog SDK를 설치하여 트레이스를 내보냅니다. 이 작업이 완료되면 SDK는 자동으로 트레이스를 적절한 `DD_AGENT_HOST` 엔드포인트로 보냅니다.

[1]: /ko/agent/cluster_agent/admission_controller/
{{% /tab %}}

{{< /tabs >}}

더 많은 예제는 [언어별 APM 계측 도움말][2]을 참조하세요.

## 추가 구성 {#additional-configuration}

### TCP를 통해 트레이스를 수신하도록 Datadog Agent 구성{#configure-the-datadog-agent-to-accept-traces-over-tcp}
{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml`을 다음으로 업데이트합니다.

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
      hostPortConfig:
        enabled: true
        hostPort: 8126 # default
```

{{% k8s-operator-redeploy %}}

**경고**: `hostPort` 파라미터는 호스트에서 포트를 엽니다. 방화벽이 애플리케이션 또는 신뢰할 수 있는 소스에서만 액세스를 허용하도록 해야 합니다. 네트워크 플러그인이 `hostPorts`를 지원하지 않는 경우, Agent 포드 사양에 `hostNetwork: true`를 추가하세요. 이렇게 하면 호스트의 네트워크 네임스페이스를 Datadog Agent와 공유합니다. 또한 컨테이너에서 열린 모든 포트나 호스트에서 열린다는 의미이기도 합니다. 포트가 호스트 및 컨테이너 양쪽 모두에서 사용되는 경우, 충돌이 발생하며(동일한 네트워크 네임스페이스를 공유하기 때문에) 포드가 시작되지 않습니다. 일부 Kubernetes 설치는 이것을 허용하지 않습니다.
{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml` 파일을 다음 APM 설정으로 업데이트하세요.

```yaml
datadog:
  apm:
    portEnabled: true
    port: 8126 # default
```

{{% k8s-helm-redeploy %}}

**경고**: `datadog.apm.portEnabled` 파라미터는 호스트에서 포트를 엽니다. 방화벽이 애플리케이션 또는 신뢰할 수 있는 소스에서만 액세스를 허용하도록 해야 합니다. 네트워크 플러그인이 `hostPorts`를 지원하지 않는 경우, Agent 포드 사양에 `hostNetwork: true`를 추가하세요. 이렇게 하면 호스트의 네트워크 네임스페이스를 Datadog Agent와 공유합니다. 또한 컨테이너에서 열린 모든 포트나 호스트에서 열린다는 의미이기도 합니다. 포트가 호스트 및 컨테이너 양쪽 모두에서 사용되는 경우, 충돌이 발생하며(동일한 네트워크 네임스페이스를 공유하기 때문에) 포드가 시작되지 않습니다. 일부 Kubernetes 설치는 이것을 허용하지 않습니다.
{{% /tab %}}
{{< /tabs >}}

## APM 환경 변수 {#apm-environment-variables}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
추가 APM 환경 변수를 `override.nodeAgent.containers.trace-agent.env` 아래에 설정하세요.

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      containers:
        trace-agent:
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}
추가 APM 환경 변수를 `agents.containers.traceAgent.env` 아래에 설정하세요.
{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
agents:
  containers:
    traceAgent:
      env:
        - name: <ENV_VAR_NAME>
          value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{% tab "DaemonSet" %}}
DaemonSet 또는 Deployment(Datadog Cluster Agent의 경우)에 환경 변수를 추가합니다.

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

APM 구성에 사용할 수 있는 환경 변수 목록:

| 환경 변수 | 설명 |
| -------------------- | ----------- |
| `DD_APM_ENABLED`           | `true`로 설정하면 Datadog Agent가 트레이스 메트릭을 수신합니다. <br/>**기본값**: `true`(Agent 7.18 이상) |
| `DD_APM_ENV`           | 수집된 트레이스에 `env:` 태그를 설정합니다.  |
| `DD_APM_RECEIVER_SOCKET` | UDS를 통한 추적인 경우. 유효한 소켓 파일 경로를 지정해야 합니다. |
| `DD_APM_RECEIVER_PORT`     | TCP를 통한 추적인 경우 Datadog Agent의 트레이스 수신기가 수신하는 포트입니다. <br/>**기본값**: `8126` |
| `DD_APM_NON_LOCAL_TRAFFIC` | 다른 컨테이너에서 추적할 때 로컬이 아닌 트래픽을 허용합니다. <br/>**기본값**: `true`(Agent 7.18 이상) |
| `DD_APM_DD_URL`            | 트레이스가 전송되는 Datadog API 엔드포인트: `https://trace.agent.{{< region-param key="dd_site" >}}`. <br/>**Default**:  `https://trace.agent.datadoghq.com` |
| `DD_APM_TARGET_TPS`     | The target traces per second to sample. <br/>**Default**: `10` |
| `DD_APM_ERROR_TPS`     | The target error trace chunks to receive per second. <br/>**Default**: `10` |
| `DD_APM_MAX_EPS`     | Maximum number of APM events per second to sample. <br/>**Default**: `200` |
| `DD_APM_MAX_MEMORY`     | What the Datadog Agent aims to use in terms of memory. If surpassed, the API rate limits incoming requests. <br/>**Default**: `500000000` |
| `DD_APM_MAX_CPU_PERCENT`     | The CPU percentage that the Datadog Agent aims to use. If surpassed, the API rate limits incoming requests. <br/>**Default**: `50` |
| `DD_APM_FILTER_TAGS_REQUIRE`     | Collects only traces that have root spans with an exact match for the specified span tags and values. <br/>See [Ignoring unwanted resources in APM][11]. |
| `DD_APM_FILTER_TAGS_REJECT`     | Rejects traces that have root spans with an exact match for the specified span tags and values. <br/>See [Ignoring unwanted resources in APM][11]. |
| `DD_APM_REPLACE_TAGS` | [Scrub sensitive data from your span's tags][4]. |
| `DD_APM_IGNORE_RESOURCES`  | Configure resources for the Agent to ignore. Format should be comma separated, regular expressions. <br/>For example: `GET /ignore-me,(GET\|POST) /and-also-me` |
| `DD_APM_LOG_FILE`  | Path to file where APM logs are written. |
| `DD_APM_CONNECTION_LIMIT`  | Maximum connection limit for a 30 second time window. <br/>**Default**: 2000 |
| `DD_APM_ADDITONAL_ENDPOINTS`     | Send data to multiple endpoints and/or with multiple API keys. <br/>See [Dual Shipping][12]. |
| `DD_APM_DEBUG_PORT`     | Port for the debug endpoints for the Trace Agent. Set to `0` to disable the server. <br/>**Default**: `5012`. |
| `DD_BIND_HOST`             | Set the StatsD and receiver hostname. |
| `DD_DOGSTATSD_PORT`        | For tracing over TCP, set the DogStatsD port. |
| `DD_ENV`                   | Sets the global `env` for all data emitted by the Agent. If `env` is not present in your trace data, this variable is used. |
| `DD_HOSTNAME`         | Manually set the hostname to use for metrics if autodetection fails, or when running the Datadog Cluster Agent. |
| `DD_LOG_LEVEL`             | Set the logging level. <br/>**Values**: `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off` |
| `DD_PROXY_HTTPS`     | 사용할 프록시의 URL을 설정합니다. |


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/containers/kubernetes/installation
[2]: /ko/tracing/setup/
[3]: /ko/getting_started/tagging/unified_service_tagging
[4]: /ko/tracing/configure_data_security/?tab=kubernetes#replace-tags
[5]: /ko/tracing/guide/setting_primary_tags_to_scope/#environment
[6]: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
[7]: https://docs.datadoghq.com/ko/agent/docker/?tab=standard#environment-variables
[8]: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
[9]: /ko/tracing/guide/setting_up_apm_with_kubernetes_service/
[10]: /ko/tracing
[11]: /ko/tracing/guide/ignoring_apm_resources/?tab=kubernetes
[12]: /ko/agent/configuration/dual-shipping/
[13]: /ko/tracing/trace_collection/single-step-apm/kubernetes/