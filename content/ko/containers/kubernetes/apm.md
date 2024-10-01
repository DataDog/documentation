---
aliases:
- /ko/agent/kubernetes/apm
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

{{< learning-center-callout header="학습 센터에서 Introduction to Monitoring Kubernetes를 시작하세요" btn_title="지금 등록하기" btn_url="https://learn.datadoghq.com/courses/intro-to-monitoring-kubernetes">}}
  실제 클라우드 컴퓨팅 용량과 Datadog 평가판 계정을 무료로 배워보세요. 실습을 통해 Kubernetes와 관련된 메트릭, 로그 및 APM 트레이스를 빠르게 익혀보세요.
{{< /learning-center-callout >}}

이 페이지에서는 Kubernetes 애플리케이션에 대한 [APM(애플리케이션 성능 모니터링)][10]을 설정하고 구성하는 방법을 설명합니다.

{{< img src="tracing/visualization/troubleshooting_pipeline_kubernetes.png" alt="The APM troubleshooting pipeline: The tracer sends traces and metrics data from the application pod to the Agent pod, which sends it to the Datadog backend to be shown in the Datadog UI.">}}

UDS(Unix Domain Socket), TCP(`IP:Port`) 또는 Kubernetes 서비스를 통해 트레이스를 보낼 수 있습니다. Datadog에서는 UDS 사용을 권장하지만, 필요한 경우 세 가지를 동시에 사용할 수도 있습니다.

## 설정
1. 아직 설치하지 않았다면 Kubernetes 환경에 [Datadog Agent를 설치][1]하세요.
2. [Datadog Agent를 구성해](#configure-the-datadog-agent-to-collect-traces) 트레이스를 수집합니다.
3. [애플리케이션 파드를 구성해](#configure-your-application-pods-to-submit-traces-to-datadog-agent) Datadog Agent에 트레이스를 제출합니다.

### 트레이스 수집을 위해 Datadog Agent  구성

이 섹션의 지침은 UDS를 통해 트레이스를 수신하도록 Datadog Agent를 구성합니다. TCP를 사용하려면 [추가 구성](#additional-configuration) 섹션을 참조하세요. Kubernetes 서비스를 사용하려면 [Kubernetes Service로 APM 설정][9]을 참조하세요.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`datadog-agent.yaml`을 편집해 `features.apm.enabled`를 `true`로 설정합니다.

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

APM이 활성화되면 기본 설정은 호스트에 디렉토리를 생성하고 에이전트 내에 마운트합니다. 그런 다음 에이전트는 `/var/run/datadog/apm/apm.socket` 소켓 파일을 생성하고 수신 대기합니다. 그러면 애플리케이션 포드도 마찬가지로 이 볼륨을 마운트하고 동일한 소켓에 쓸 수 있습니다. 또한, `features.apm.unixDomainSocketConfig.path` 설정 값으로 경로와 소켓을 수정할 수 있습니다.

{{% k8s-operator-redeploy %}}

**참고**: minikube에서는 `Unable to detect the kubelet URL automatically` 오류가 발생할 수 있습니다. 이 경우에는  `global.kubelet.tlsVerify`를 `false`로 설정하세요.

{{% /tab %}}
{{% tab "Helm" %}}

[Helm을 사용하여 Datadog Agent를 설치][1]한 경우 APM은 UDS 또는 Windows 명명된 파이프를 통해 **기본적으로 활성화**됩니다.

활성화하려면 `datadog-values.yaml`에서 `datadog.apm.socketEnabled`가 `true`로 설정되어 있는지 확인하세요.

```yaml
datadog:
  apm:
    socketEnabled: true    
```

기본 설정은 호스트에 디렉토리를 생성하고 에이전트 내에 마운트합니다. 그런 다음 에이전트는 소켓 파일 `/var/run/datadog/apm.socket`을 생성하고 수신 대기합니다. 그러면 애플리케이션 포드도 유사한 방식으로 이 볼륨을 마운트하고 동일한 소켓에 쓸 수 있습니다. 또한, `datadog.apm.hostSocketPath`와 `datadog.apm.socketPath` 설정 값으로 경로와 소켓을 수정할 수 있습니다.

```yaml
datadog:
  apm:
    # 다음 값이 기본값입니다
    socketEnabled: true
    hostSocketPath: /var/run/datadog/
    socketPath: /var/run/datadog/apm.socket
```

APM를 비활성화하려면 `datadog.apm.socketEnabled`를 `false`로 설정합니다.

{{% k8s-helm-redeploy %}}

**참고**: minikube에서는 `Unable to detect the kubelet URL automatically` 오류가 발생할 수 있습니다. 이 경우에는  `datadog.kubelet.tlsVerify`를 `false`로 설정하세요.

[1]: /ko/containers/kubernetes/installation?tab=helm#installation
{{% /tab %}}
{{< /tabs >}}

### 애플리케이션 포드를 설정하여 Datadog 에이전트에 트레이스를 제출합니다.

{{< tabs >}}

{{% tab "Datadog Admission Controller" %}}
Datadog 어드미션 컨트롤러는 애플리케이션 포드 설정을 간소화하는 Datadog 클러스터 에이전트의 구성 요소입니다. 자세한 내용은 [Datadog 어드미션 컨트롤러 도움말][1]을 참조하세요.

Datadog 어드미션 컨트롤러를 사용하여 환경 변수를 주입하고 필요한 볼륨을 새 애플리케이션 포드에 마운트하여 포드 및 에이전트 트레이스 통신을 자동으로 설정할 수 있습니다. Datadog 에이전트에 트레이스를 제출하도록 애플리케이션을 자동으로 설정하는 방법은 [어드미션 컨트롤러를 사용하여 라이브러리 주입][2] 도움말을 참조하세요.

[1]: /ko/agent/cluster_agent/admission_controller/
[2]: /ko/tracing/trace_collection/library_injection_local/
{{% /tab %}}

{{% tab "Unix Domain Socket (UDS)" %}}
UDS를 사용하여 Agent에 트레이스를 보내는 경우 (Agent 가 생성한) 소켓이 있는 호스트 디렉터리를 애플리케이션 컨테이너에 마운트하고 `DD_TRACE_AGENT_URL`을 사용하여 소켓 경로를 지정합니다. 

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

### 애플리케이션 트레이서가 트레이스를 내보내도록 설정합니다:
트레이스를 수집하도록 Datadog Agent를 구성하고 트레이스를 보낼 *위치*에 대한 구성을 애플리케이션 파드에 제공합니다. 그런 다음 애플리케이션에 Datadog 트레이스를 설치하여 트레이스를 내보냅니다. 이 작업이 완료되면 트레이서는 트레이스를 적절한 `DD_TRACE_AGENT_URL` 엔드포인트로 보냅니다.

{{% /tab %}}


{{% tab TCP %}}
TCP (`<IP_ADDRESS>:8126`)를 사용하여 에이전트에 트레이스를 전송하는 경우, 이 IP 주소를 애플리케이션 포드에 제공하세요. 자동으로 [Datadog 어드미션 컨트롤러][1]를 사용하거나 수동으로 하향 API를 사용하여 호스트 IP를 가져옵니다. 애플리케이션 컨테이너에는 `status.hostIP`을 가리키는 `DD_AGENT_HOST`환경 변수가 필요합니다:

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
**참고: **이 설정을 사용하려면 에이전트가 TCP를 통해 트레이스를 수신할 수 있어야 합니다.

### 애플리케이션 트레이서가 트레이스를 내보내도록 설정합니다:
트레이스를 수집하도록 Datadog Agent를 구성하고 트레이스를 보낼 *위치*에 대한 구성을 애플리케이션 파드에 제공합니다. 그런 다음 애플리케이션에 Datadog 트레이스를 설치하여 트레이스를 내보냅니다. 이 작업이 완료되면 트레이서는 트레이스를 적절한 `DD_AGENT_HOST` 엔드포인트로 자동으로 보냅니다.

[1]: /ko/agent/cluster_agent/admission_controller/
{{% /tab %}}

{{< /tabs >}}

더 많은 예제는 [언어별 APM 계측 도움말][2]을 참조하세요.

## 추가 설정

### TCP를 통해 트레이스를 수신하도록 Datadog Agent 구성
{{< tabs >}}
{{% tab "Datadog Operator" %}}

다음을 사용해 `datadog-agent.yaml`을 업데이트합니다.

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

**경고**: `hostPort` 파라미터는 호스트의 포트를 엽니다. 방화벽이 애플리케이션이나 신뢰할 수 있는 소스의 액세스만 허용하는지 확인하세요. 네트워크 플러그인이 `hostPorts`를 지원하지 않는 경우 Agent 파드 사양에 `hostNetwork: true`를 추가합니다. 이를 통해 호스트의 네트워크 네임스페이스를 Datadog Agent와 공유합니다. 또한 컨테이너에서 열려 있는 모든 포트가 호스트에서 열려 있음을 의미합니다. 포트가 호스트와 컨테이너 모두에서 사용되는 경우 충돌이 발생하고(동일한 네트워크 네임스페이스를 공유하므로) 파드가 시작되지 않습니다. 일부 Kubernetes 설치에서는 이를 허용하지 않습니다.
{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml` 파일을 다음 APM 구성으로 업데이트합니다.

```yaml
datadog:
  apm:
    portEnabled: true
    port: 8126 # default
```

{{% k8s-helm-redeploy %}}

**경고**: `datadog.apm.portEnabled` 파라미터는 호스트의 포트를 엽니다. 방화벽이 애플리케이션이나 신뢰할 수 있는 소스의 액세스만 허용하는지 확인하세요. 네트워크 플러그인이 `hostPorts`를 지원하지 않는 경우 Agent 파드 사양에 `hostNetwork: true`를 추가합니다. 이를 통해 호스트의 네트워크 네임스페이스를 Datadog Agent와 공유합니다. 또한 컨테이너에서 열려 있는 모든 포트가 호스트에서 열려 있음을 의미합니다. 포트가 호스트와 컨테이너 모두에서 사용되는 경우 충돌이 발생하고(동일한 네트워크 네임스페이스를 공유하므로) 파드가 시작되지 않습니다. 일부 Kubernetes 설치에서는 이를 허용하지 않습니다.
{{% /tab %}}
{{< /tabs >}}

## APM 환경 변수

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`override.nodeAgent.containers.trace-agent.env`에서 추가 APM 환경 변수를 설정합니다.

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
`agents.containers.traceAgent.env`에서 추가 APM 환경 변수를 설정합니다.
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
| `DD_APM_ENABLED`           | `true`Datadog로 설정하면 Datadog Agent가 트레이스 메트릭을 수신합니다. <br/>**기본값**: `true`  (Agent 7.18+) |
| `DD_APM_ENV`           | 수집된 트레이스에서 `env:` 태그를 설정합니다.  |
| `DD_APM_RECEIVER_SOCKET` | UDS를 통해 추적하는 데 사용됩니다. 설정되면 유효한 소켓 파일을 가리켜야 합니다. |
| `DD_APM_RECEIVER_PORT`     | TCP를 통한 추적인 경우 Datadog Agent의 트레이스 수신기가 수신하는 포트입니다. <br/>**기본값**: `8126` |
| `DD_APM_NON_LOCAL_TRAFFIC` | 다른 컨테이너에서 추적할 때 비로컬 트래픽을 허용합니다. <br/>**기본값**: `true` (Agent 7.18+) |
| `DD_APM_DD_URL`            | 트레이스가 전송되는 Datadog API 엔드포인트: `https://trace.agent.{{< region-param key="dd_site" >}}` <br/>**기본값**: `https://trace.agent.datadoghq.com` |
| `DD_APM_TARGET_TPS`     | 샘플링할 초당 타겟 트레이스 <br/>**기본값**: `10` |
| `DD_APM_ERROR_TPS`     | 초당 수신할 타겟 오류 트레이스 청크 <br/>**기본값**: `10` |
| `DD_APM_MAX_EPS`     | 샘플링할 초당 최대 APM 이벤트 수 <br/>**기본값**: `200` |
| `DD_APM_MAX_MEMORY`     | Datadog Agent의 메모리 사용량 목표. 이를 초과하면 API 속도가 수신 요청을 제한합니다. <br/>**기본값**: `500000000` |
| `DD_APM_MAX_CPU_PERCENT`     | Datadog Agent가 사용하려는 CPU 비율. 이를 초과하면 API 속도가 수신 요청을 제한합니다. <br/>**기본값**: `50` |
| `DD_APM_FILTER_TAGS_REQUIRE`     | 지정된 스팬 태그 및 값과 정확히 일치하는 루트 스팬이 있는 트레이스만 수집합니다.<br/>[APM에서 원치 않는 리소스 무시][11]를 참조하세요. |
| `DD_APM_FILTER_TAGS_REJECT`     | 지정된 스팬 태그 및 값과 정확히 일치하는 루트 스팬이 있는 트레이스만 거부합니다.<br/>[APM에서 원치 않는 리소스 무시][11]를 참조하세요. |
| `DD_APM_REPLACE_TAGS` | [스팬의 태그에서 민감한 데이터를 삭제합니다][4]. |
| `DD_APM_IGNORE_RESOURCES`  |  Agent가 무시할 리소스를 구성합니다. 형식은 쉼표로 구분된 정규 표현식이어야 합니다. <br/>예: `GET /ignore-me,(GET\|POST) /and-also-me` |
| `DD_APM_LOG_FILE`  | APM 로그가 기록되는 파일의 경로입니다. |
| `DD_APM_CONNECTION_LIMIT`  | 30초 동안의 최대 연결 제한 <br/>**기본값**: 2000 |
| `DD_APM_ADDITONAL_ENDPOINTS`     | 여러 엔드포인트 및/또는 여러 API 키를 사용하여 데이터를 보냅니다. <br/>[Dual Shipping][12]을 참조하세요. |
| `DD_APM_DEBUG_PORT`     | Trace Agent의 디버그 엔드포인트용 포트입니다. 서버를 비활성화하려면 `0`으로 설정합니다. <br/>**기본값**: `5012`. |
| `DD_BIND_HOST`             | StatsD 및 수신자 호스트 이름을 설정합니다. |
| `DD_DOGSTATSD_PORT`        | TCP를 통한 추적의 경우 DogStatsD 포트를 설정합니다. |
| `DD_ENV`                   | Agent가 내보낸 모든 데이터에 대한 전역 `env`을 설정합니다. 트레이스 데이터에 `env`가 없으면 이 변수가 사용됩니다. |
| `DD_HOSTNAME`         | 자동 감지에 실패한 경우, 혹은 Datadog 클러스터 에이전트를 실행할 때 메트릭에 사용할 호스트 이름을 수동으로 설정하세요.  |
| `DD_LOG_LEVEL`             | 로깅 수준을 설정합니다. <br/>**값**: `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off` |
| `DD_PROXY_HTTPS`     | 사용할 프록시의 URL을 설정합니다. |


## 참고 자료

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