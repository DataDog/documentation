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
title: 쿠버네티스 트레이스 수집
---

애플리케이션 트레이스 수집을 시작하려면 [쿠버네티스 클러스터에서 Datadog 에이전트를 실행 중이어야 합니다][1].

## 설정

TCP (`IP:Port`), UDS(Unix 도메인 소켓) 또는 둘 다를 사용하여 트레이스를 수신하도록 에이전트를 설정할 수 있습니다. 필요한 경우 에이전트는 두 설정에서 동시에 트레이스를 수신할 수 있습니다.

{{< img src="tracing/visualization/troubleshooting_pipeline_kubernetes.png" alt="The APM troubleshooting pipeline: The tracer sends traces and metrics data from the application pod to the Agent pod, which sends it to the Datadog backend to be shown in the Datadog UI.">}}

### 트레이스를 수신하도록 Datadog 에이전트 설정
{{< tabs >}}
{{% tab "Helm" %}}

- 아직 설치하지 않았다면, 헬름 차트를 [설치][1]하세요.

기본 설정은 호스트에 디렉토리를 생성하고 에이전트 내에 마운트합니다. 그런 다음 에이전트는 소켓 파일 `/var/run/datadog/apm.socket`을 생성하고 수신 대기합니다. 그러면 애플리케이션 포드도 유사한 방식으로 이 볼륨을 마운트하고 동일한 소켓에 쓸 수 있습니다. 또한, `datadog.apm.hostSocketPath`와 `datadog.apm.socketPath` 설정 값으로 경로와 소켓을 수정할 수 있습니다.

이 기능은 `datadog.apm.socketEnabled`로 비활성화할 수 있습니다.

#### 선택 사항 - TCP를 통해 트레이스을 수신하도록 Datadog 에이전트를 설정합니다.

Datadog 에이전트는 TCP를 통해 트레이스를 수신하도록 설정할 수 있습니다. 이 기능을 활성화하려면:

- `values.yaml` 파일을 다음 APM 설정으로 업데이트하세요:
    ```yaml
    datadog:
      ## Enable apm agent and provide custom configs
      apm:
        # datadog.apm.portEnabled -- Enable APM over TCP communication (port 8126 by default)
        ## ref: https://docs.datadoghq.com/agent/kubernetes/apm/
        portEnabled: true
    ```

그런 다음 Datadog 헬름 차트를 다음 명령: `helm upgrade -f values.yaml <RELEASE NAME> datadog/datadog`을 사용하여 업그레이드합니다. `values.yaml`에서 운영 체제를 설정하지 않은 경우, 이 명령에 `--set targetSystem=linux` or `--set targetSystem=windows`를 추가합니다.

**경고**: 이 `datadog.apm.portEnabled` 매개 변수는 호스트의 포트를 엽니다. 방화벽이 애플리케이션 또는 신뢰할 수 있는 소스로부터의 액세스만 허용하는지 확인하세요. 네트워크 플러그인이 `hostPorts`를 지원하지 않는 경우, 에이전트 포드 사양에 `hostNetwork: true`를 추가하세요. 이렇게 하면 호스트의 네트워크 네임스페이스가 Datadog 에이전트와 공유됩니다. 이것은 또한 컨테이너에서 열린 모든 포트가 호스트에서 열린다는 것을 의미합니다. 호스트와 컨테이너에서 포트를 모두 사용하는 경우, 동일한 네트워크 네임스페이스를 공유하기 때문에 포트가 충돌하고 포드가 시작되지 않습니다. 일부 쿠버네티스 설치는 이를 허용하지 않습니다.

[1]: /ko/agent/kubernetes/?tab=helm
{{% /tab %}}
{{% tab "DaemonSet" %}}

APM 트레이스 수집을 활성화하려면, DaemonSet 설정 파일을 열고 다음을 편집합니다:

- `trace-agent` 컨테이너 내의 포트 `8126` (호스트에서 에이전트로 트래픽 전달)에서 들어오는 데이터를 허용합니다:
    ```yaml
      # (...)
      containers:
        - name: trace-agent
          # (...)
          ports:
            - containerPort: 8126
              hostPort: 8126
              name: traceport
              protocol: TCP
      # (...)
    ```

- **이전 에이전트 버전(7.17 또는 이하)**을 사용하는 경우에는 위 단계 외에 `datadog.yaml` 트레이스 에이전트 매니페스트의 `env` 섹션에서  `DD_APM_NON_LOCAL_TRAFFIC`와 `DD_APM_ENABLED` 변수를 `true`로 설정하세요. 

  ```yaml
    # (...)
    containers:
      - name: trace-agent
        # (...)
        env:
          - name: DD_APM_ENABLED
            value: 'true'
          - name: DD_APM_NON_LOCAL_TRAFFIC
            value: "true"
          # (...)
  ```

**경고**: 이 `hostPort` 매개 변수는 호스트의 포트를 엽니다. 방화벽이 애플리케이션 또는 신뢰할 수 있는 소스로부터의 액세스만 허용하는지 확인하세요. 네트워크 플러그인이 `hostPorts`를 지원하지 않는 경우, 에이전트 포드 사양에 `hostNetwork: true`를 추가하세요. 이렇게 하면 호스트의 네트워크 네임스페이스가 Datadog 에이전트와 공유됩니다. 이것은 또한 컨테이너에서 열린 모든 포트가 호스트에서 열린다는 것을 의미합니다. 호스트와 컨테이너에서 포트를 모두 사용하는 경우, 동일한 네트워크 네임스페이스를 공유하기 때문에 포트가 충돌하고 포드가 시작되지 않습니다. 일부 쿠버네티스 설치는 이를 허용하지 않습니다.


{{% /tab %}}
{{% tab "DaemonSet (UDS)" %}}

APM 트레이스 수집을 활성화하려면, DaemonSet 설정 파일을 열고 다음을 편집합니다:

  ```yaml
    # (...)
    containers:
    - name: trace-agent
      # (...)
      env:
      - name: DD_APM_ENABLED
        value: "true"
      - name: DD_APM_RECEIVER_SOCKET
        value: "/var/run/datadog/apm.socket"
    # (...)
      volumeMounts:
      - name: apmsocket
        mountPath: /var/run/datadog/
    volumes:
    - hostPath:
        path: /var/run/datadog/
        type: DirectoryOrCreate
    # (...)
  ```

이 설정은 호스트에 디렉토리를 생성하고 에이전트 내에 마운트합니다. 그런 다음 에이전트는 해당 디렉토리에 `/var/run/datadog/apm.socket`의 `DD_APM_RECEIVER_SOCKET` 값을 가진 소켓 파일을 생성하고 수신 대기합니다. 애플리케이션 포드도 유사한 방식으로 이 볼륨을 마운트하고 동일한 소켓에 쓸 수 있습니다.

{{% /tab %}}
{{% tab "Operator" %}}

APM이 활성화되면 기본 설정은 호스트에 디렉토리를 생성하고 에이전트 내에 마운트합니다. 그런 다음 에이전트는 `/var/run/datadog/apm/apm.socket` 소켓 파일을 생성하고 수신 대기합니다. 그러면 애플리케이션 포드도 마찬가지로 이 볼륨을 마운트하고 동일한 소켓에 쓸 수 있습니다. 또한, `features.apm.unixDomainSocketConfig.path` 설정 값으로 경로와 소켓을 수정할 수 있습니다.

#### 선택 사항 - TCP를 통해 트레이스를 수신하도록 Datadog 에이전트를 설정합니다.

Datadog 에이전트는 TCP를 통해 트레이스를 수신할 수 있습니다. 이 기능을 활성화하려면:

다음을 이용해 `DatadogAgent` 매니페스트를 업데이트합니다:

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
    apm:
      enabled: true
      hostPortConfig:
        enabled: true
```
`<DATADOG_SITE>`의 위치는 {{< region-param key="dd_site" code="true" >}} (기본 설정은 `datadoghq.com`).

전체 예제는 [APM 및 메트릭 수집이 활성화된 매니페스트][1] 샘플을 참조하세요.

그런 다음 새로운 설정을 적용합니다:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

**경고**: 이 `hostPort` 매개 변수는 호스트의 포트를 엽니다. 방화벽이 애플리케이션 또는 신뢰할 수 있는 소스로부터의 액세스만 허용하는지 확인하세요. 네트워크 플러그인이 `hostPorts`를 지원하지 않는 경우, 에이전트 포드 사양에 `hostNetwork: true`를 추가하세요. 이렇게 하면 호스트의 네트워크 네임스페이스가 Datadog 에이전트와 공유됩니다. 이것은 또한 컨테이너에서 열린 모든 포트가 호스트에서 열린다는 것을 의미합니다. 호스트와 컨테이너에서 포트를 모두 사용하는 경우, 동일한 네트워크 네임스페이스를 공유하기 때문에 포트가 충돌하고 포드가 시작되지 않습니다. 일부 쿠버네티스 설치는 이를 허용하지 않습니다.

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-apm.yaml
{{% /tab %}}
{{< /tabs >}}

**참고**:  minikube에서는 `Unable to detect the kubelet URL automatically` 오류가 발생할 수 있습니다. 이 경우 `DD_KUBELET_TLS_VERIFY=false`를 설정하세요.

### 애플리케이션 포드를 설정하여 Datadog 에이전트에 트레이스를 제출합니다.

{{< tabs >}}

{{% tab "Datadog Admission Controller" %}}
Datadog 어드미션 컨트롤러는 애플리케이션 포드 설정을 간소화하는 Datadog 클러스터 에이전트의 구성 요소입니다. 자세한 내용은 [Datadog 어드미션 컨트롤러 도움말][1]을 참조하세요.

Datadog 어드미션 컨트롤러를 사용하여 환경 변수를 주입하고 필요한 볼륨을 새 애플리케이션 포드에 마운트하여 포드 및 에이전트 트레이스 통신을 자동으로 설정할 수 있습니다. Datadog 에이전트에 트레이스를 제출하도록 애플리케이션을 자동으로 설정하는 방법은 [어드미션 컨트롤러를 사용하여 라이브러리 주입][2] 도움말을 참조하세요.

[1]: /ko/agent/cluster_agent/admission_controller/
[2]: /ko/tracing/trace_collection/library_injection_local/
{{% /tab %}}

{{% tab "UDS" %}}
UDS(Unix 도메인 소켓)를 사용하여 에이전트에 트레이스를 보내는 경우 에이전트가 생성한 소켓이 있는 호스트 디렉토리를 애플리케이션 컨테이너에 마운트하고 소켓의 경로를 `DD_TRACE_AGENT_URL`로 지정합니다:

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
트레이스를 수집하도록 Datadog 에이전트를 설정하고 애플리케이션 포드가 트레이스를 전송할 *위치*를 설정한 후, 트레이스를 내보내도록 애플리케이션에 Datadog 트레이서를 설치합니다. 이 작업이 완료되면 트레이서는 적절한 `DD_AGENT_HOST` (`IP:Port`용) 또는`DD_TRACE_AGENT_URL` (UDS용) 엔드포인트로 트레이스를 전송합니다.

{{< /tabs >}}


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
트레이스를 수집하도록 Datadog 에이전트를 설정하고, 애플리케이션 포드가 추적을 전송할 *위치*를 설정한 후 트레이스를 방출하도록 애플리케이션에 Datadog 트레이서를 설치합니다. 이 작업이 완료되면 트레이서는 자동으로 적절한 `DD_AGENT_HOST` (`IP:Port`용) 또는 `DD_TRACE_AGENT_URL` (UDS용) 엔드포인트로 트레이스를 전송합니다.

[1]: /ko/agent/cluster_agent/admission_controller/
{{< /tabs >}}

{{< /tabs >}}

더 많은 예제는 [언어별 APM 계측 도움말][2]을 참조하세요.


## 에이전트 환경 변수

**참고**: 모범 사례로, Datadog은 태그를 할당할 때 통합 서비스 태깅을 사용할 것을 권장합니다. 통합 서비스 태깅은 세 가지 표준 태그: `env`, `service`, `version`을 사용하여 Datadog 텔레메트리를 하나로 묶습니다. 통합 태깅으로 환경 설정하는 방법을 알아보려면 전용 [통합 서비스 태깅][3] 도움말을 참조하세요.

쿠버네티스에서 실행 중인 에이전트 내에서 추적 시 사용할 수 있는 모든 환경 변수의 목록입니다:

| 환경 변수       | 설명                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_API_KEY`               | Datadog API 키                                                                                                                                                                                                                                                                                                        |
| `DD_PROXY_HTTPS`           | 사용할 프록시의 URL 설정하기                                                                                                                                                                                                                                                                                        |
| `DD_APM_REPLACE_TAGS`      | [스팬의 태그에서 민감한 데이터를 삭제합니다][4].                                                                                                                                                                                                                                                                            |
| `DD_HOSTNAME`              | 자동 감지에 실패한 경우, 혹은 Datadog 클러스터 에이전트를 실행할 때 메트릭에 사용할 호스트 이름을 수동으로 설정하세요.                                                                                                                                                                                                                |
| `DD_DOGSTATSD_PORT`        | DogStatsD 포트 설정하기                                                                                                                                                                                                                                                                                                     |
| `DD_APM_RECEIVER_SOCKET`  | Unix 도메인 소켓을 통해 트레이스를 수집하고 설정된 경우 호스트 이름 및 포트 설정보다 우선시합니다. 기본 설정이 꺼져 있으면, 설정시 유효한 SOCK 파일을 가리켜야 합니다.                                                                                                                                            |
| `DD_BIND_HOST`             | StatsD 및 호스트 이름 수신기 설정하기                                                                                                                                                                                                                                                                                         |
| `DD_LOG_LEVEL`             | 로그 레벨 설정. (`trace`/`debug`/`info`/`warn`/`error`/`critical`/`off`)                                                                                                                                                                                                                                             |
| `DD_APM_ENABLED`           | `true`로 설정하면 Datadog 에이전트가 트레이스 메트릭을 수신합니다. 기본값은 `true` (에이전트 7.18+)입니다.                                                                                                                                                                                                                                                                |
| `DD_APM_CONNECTION_LIMIT`  | 30초 시간 창에 대한 최대 연결 제한을 설정합니다.                                                                                                                                                                                                                                                              |
| `DD_APM_DD_URL`            | 트레이스가 전송되는 Datadog API 엔드포인트를 설정: `https://trace.agent.{{< region-param key="dd_site" >}}`. `https://trace.agent.datadoghq.com`로 기본 설정합니다.                                                                                                                                                                                                    |
| `DD_APM_RECEIVER_PORT`     | Datadog 에이전트의 트레이스 수신기가 수신 대기하는 포트입니다. 기본값은 `8126`입니다.                                                                                                                                                                                                                                           |
| `DD_APM_NON_LOCAL_TRAFFIC` | 다른 컨테이너에서 추적할 때 비로컬 트래픽을 허용합니다. 기본값은 `true` (에이전트 7.18+)입니다.                                                                                                                                                                                                                               |
| `DD_APM_IGNORE_RESOURCES`  | 에이전트가 무시할 리소스를 설정합니다. 형식은 쉼표로 구분된 정규식이어야 합니다. 예를 들어 <code>GET /ignore-me,(GET\.|포스트) /and-also-me</code>.                                                                                                                                                       |
| `DD_ENV`                   | 에이전트가 내보내는 모든 데이터에 대한 글로벌 `env`을 설정합니다. 트레이스 데이터에 `env`가 없는 경우 이 변수가 사용됩니다. 자세한 내용은 [APM 환경 설정][5]을 참조하세요.


### 오퍼레이터 환경 변수
| 환경 변수       | 설명                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `agent.apm.enabled`                                                                                          | 포트 8126에서 APM 및 추적을 사용하려면 이 옵션을 활성화합니다. [Datadog 도커 도움말][6]을 참조하세요.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `agent.apm.env`                                                                                              | Datadog 에이전트는 많은 [환경 변수]를 지원합니다[7].                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `agent.apm.hostPort`                                                                                         | 호스트에 노출할 포트의 수입니다. 유효한 포트 번호(0 < x < 65536)여야 합니다. `HostNetwork`을 지정한 경우, 이 값은 반드시 `ContainerPort`와 일치해야 합니다. 대부분의 컨테이너에서는 필요하지 않습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `agent.apm.resources.limits`                                                                                 | 제한은 허용되는 최대 컴퓨팅 리소스 양을 설명합니다. 자세한 내용은 [쿠버네티스 문서][8]를 참조하세요.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `agent.apm.resources.requests`                                                                               | 요청은 필요한 최소한의 컴퓨팅 리소스 양을 설명합니다. 컨테이너에 대해 `requests`를 생략하면 컨테이너가 명시적으로 지정된 경우 `limits` 기본값으로 지정되고, 그렇지 않으면 implementation-defined 값으로 지정됩니다. 자세한 내용은 [쿠버네티스 도움말][8]을 참조하세요.     |                                                                                                                                                                                                                                                                                                                               |


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/agent/kubernetes/
[2]: /ko/tracing/setup/
[3]: /ko/getting_started/tagging/unified_service_tagging
[4]: /ko/tracing/configure_data_security#scrub-sensitive-data-from-your-spans
[5]: /ko/tracing/guide/setting_primary_tags_to_scope/#environment
[6]: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
[7]: https://docs.datadoghq.com/ko/agent/docker/?tab=standard#environment-variables
[8]: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/