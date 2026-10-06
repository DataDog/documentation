---
description: Agent 플레어, 자체 테스트 및 네트워크 플러그인 호환성을 포함한 Workload Protection 문제를 해결하세요.
title: Workload Protection 문제 해결
---
Workload Protection에 문제가 발생하면 다음 문제 해결 지침을 따르세요. 추가 도움이 필요하면 [Datadog 지원팀][1]에 문의하세요.

## Security Agent 플레어 {#security-agent-flare}

<div class="alert alert-warning">Agent <code>7.77</code>부터 Workload Protection용 <code>security-agent</code> 런타임 구성 요소는 더 이상 사용되지 않으며 더 이상 필요하지 않습니다. 독립형 <code>security-agent flare</code> 명령은 Security Agent 프로세스가 실행 중이지 않으면 작동하지 않습니다. 핵심 Agent <code>flare</code> 명령을 대신 사용하세요.</div>

[Agent 플레어][3]와 유사하게 하나의 플레어 명령으로 Datadog 지원팀에 필요한 문제 해결 정보를 보낼 수 있습니다.

플레어는 업로드하기 전에 확인을 요청하므로 Security Agent가 콘텐츠를 전송하기 전에 검토할 수 있습니다.

아래 명령에서 지원 케이스 ID가 있는 경우 `<CASE_ID>`를 해당 Datadog 지원 케이스 ID로 바꾸고, 이후 해당 케이스에 연결된 이메일 주소를 입력하세요.

케이스 ID가 없는 경우 Datadog 로그인에 사용하는 이메일 주소를 입력하여 지원 케이스를 여세요.

| 플랫폼     | 명령                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent security-agent flare <CASE_ID>`                      |
| Kubernetes   | `kubectl exec -it <POD_NAME> -c security-agent -- security-agent flare <CASE_ID>`   |
| 호스트         | `sudo /opt/datadog-agent/embedded/bin/security-agent flare <CASE_ID>`               |

## Agent 자체 테스트 {#agent-self-tests}

Workload Protection이 시스템 이벤트를 감지할 수 있는지 확인하려면 다음 명령을 실행하여 자체 테스트를 수동으로 트리거하세요.

| 플랫폼     | 명령                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent system-probe runtime self-test`                    |
| Kubernetes   | `kubectl exec -it <POD_NAME> -c system-probe -- system-probe runtime self-test` |
| 호스트         | `sudo /opt/datadog-agent/embedded/bin/system-probe runtime self-test`             |

자체 테스트 절차에서는 일부 임시 파일과 규칙을 생성하여 이를 모니터링한 다음 해당 규칙을 트리거하여 이벤트가 올바르게 전파되는지 확인합니다.

규칙이 전파되면 다음 응답이 나타납니다.

```
Runtime self test: OK
```

이벤트는 {{< ui >}}Events Explorer{{< /ui >}}에 표시됩니다.

## 사용자 지정 Kubernetes 네트워크 플러그인과의 호환성 {#compatibility-with-custom-kubernetes-network-plugins}

Workload Protection의 네트워크 기반 탐지는 Linux 커널의 트래픽 제어 하위 시스템에 의존합니다. 이 하위 시스템은 여러 벤더가 "clsact" ingress qdisc에서 필터를 삽입, 교체 또는 삭제하려고 시도할 경우 경쟁 상태가 발생할 수 있는 것으로 알려져 있습니다. 다음 검사 목록을 사용하여 Workload Protection이 올바르게 구성되었는지 확인하세요.

- 벤더가 eBPF 트래픽 제어 분류기를 사용하는지 확인하세요. 사용하지 않는 경우 이 단락은 무시하세요.
- 공급업체가 네트워크 패킷에 대한 액세스 권한을 부여한 후 TC_ACT_OK 또는 TC_ACT_UNSPEC을 반환하는지 확인하세요. TC_ACT_UNSPEC을 반환하는 경우 이 단락은 무시하세요.
- 공급업체가 eBPF 분류기를 연결하는 우선순위를 확인하세요.
  - 우선순위 1을 사용하는 경우 Workload Protection 네트워크 탐지는 컨테이너 내부에서 작동하지 않습니다.
  - 우선순위 2~10을 사용하는 경우 `runtime_security_config.network.classifier_priority`를 공급업체가 선택한 우선순위보다 반드시 낮은 값으로 구성하세요.
  - 우선순위 11 이상을 사용하는 경우 이 단락은 무시하세요.

예를 들어, Cilium 1.9 이하 버전과 Datadog Agent(버전 7.36~7.39.1, 7.39.2 제외) 사이에는 새 포드가 시작될 때 알려진 경쟁 상태가 발생할 수 있습니다. Cilium 구성 방식에 따라 이 경쟁 상태로 인해 포드 내부의 연결이 끊어질 수 있습니다.

문제가 발생하지 않도록 Datadog Agent 또는 타사 공급업체를 구성할 수 없는 경우 아래 단계에 따라 Workload Protection의 네트워크 기반 탐지를 비활성화하세요.

- 호스트 기반 설치의 경우`system-probe.yaml` 구성 파일에 다음 파라미터를 추가하세요.

```yaml
runtime_security_config:
  network:
    enabled: false
```
- 공개 Helm Chart를 사용하여 Datadog Agent를 배포하는 경우 다음 값을 추가하세요.

```yaml
datadog:
  securityAgent:
    runtime:
      network:
        enabled: false
```
- Datadog Agent 컨테이너를 수동으로 배포하는 경우 다음 환경 변수를 추가하세요.

```bash
DD_RUNTIME_SECURITY_CONFIG_NETWORK_ENABLED=false
```

## Kubernetes 원격 세션 또는 포드 승인 중단 문제 해결 {#troubleshooting-kubernetes-remote-session-or-pod-admission-disruptions}

Workload Protection은 Kubernetes 사용자 ID를 수집하고 인프라에 대한 원격 액세스와 워크로드에 의해 생성된 활동을 구분하는 데 필요한 컨텍스트를 Workload Protection 이벤트에 추가합니다. 이 통합은 `kubectl exec` 세션을 계측하기 위해 [Kubernetes 변형 웹훅][2]에 의존합니다. 이 계측으로 인해 포드 승인 또는 `kubectl exec` 세션 생성이 중단되는 경우 다음 단계를 따라 기능을 비활성화하세요.

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. `datadog-agent.yaml` 파일의 `spec` 섹션에 다음을 추가합니다.

    ```yaml
    # datadog-agent.yaml file
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      features:
        # Integrate with Kubernetes to enrich Workload Protection events with Kubernetes user identities
        admissionController:
          cwsInstrumentation:
            enabled: false
    ```

2. 변경 사항을 적용하고 Agent를 재시작합니다.

{{% /tab %}}

{{% tab "Helm" %}}

1. `datadog-values.yaml` 파일의 `datadog` 섹션에 다음을 추가합니다.

    ```yaml
    # datadog-values.yaml file

    # Integrate with Kubernetes to enrich Workload Protection events with Kubernetes user identities
    clusterAgent:
      admissionController:
        cwsInstrumentation:
          enabled: false
    ```

2. Agent를 재시작합니다.

{{% /tab %}}

{{% tab "DaemonSet" %}}

1. (필요시) `cluster-agent-deployment.yaml` 파일의 `cluster-agent` 내 `env` 섹션에 다음 설정을 추가하세요.

    ```bash
      # Source: datadog/templates/cluster-agent-deployment.yaml
      apiVersion:app/1
      kind: Deployment
      [...]
      spec:
        [...]
        template:
          [...]
          spec:
            [...]
            containers:
            [...]
              - name: cluster-agent
                [...]
                env:
                  - name: DD_RUNTIME_ADMISSION_CONTROLLER_CWS_INSTRUMENTATION_ENABLED
                    value: "false"
    ```

{{% /tab %}}
{{< /tabs >}}

## Workload Protection 비활성화 {#disable-workload-protection}

Workload Protection을 비활성화하려면 Agent 플랫폼에 대한 단계를 따르세요.

### Helm {#helm}

Helm `values.yaml`에서 `securityAgent.runtime`을 다음과 같이 `enabled: false`로 설정하세요.

{{< code-block lang="yaml" filename="values.yaml" disable_copy="false" collapsible="true" >}}

# values.yaml file
datadog:

# Set to false to Disable CWS
securityAgent:
  runtime:
    enabled: false
{{< /code-block >}}

### Daemonset/Docker {#daemonsetdocker}

Daemonset의 경우, System Probe 및 Security Agent 배포 모두에 다음 환경 변수 변경 사항을 적용하세요.

{{< code-block lang="json" filename="daemon.json" disable_copy="false" collapsible="true" >}}

DD_RUNTIME_SECURITY_CONFIG_ENABLED=false
{{< /code-block >}}

### 호스트 {#host}

런타임 구성을 비활성화하려면 `system-probe.yaml` 및 `security-agent.yaml`을 수정하세요:

1. `/etc/datadog-agent/system-probe.yaml`에서 Workload Protection을 비활성화합니다. `runtime_security_config`를 `enabled: false`로 설정하세요.
    {{< code-block lang="yaml" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}

    ##########################################
    ## Security Agent Runtime Configuration ##
    ##                                      ##
    ## Settings to send logs to Datadog are ##
    ## fetched from section `logs_config`   ##
    ## in datadog-agent.yaml                ##
    ##########################################

    runtime_security_config:
    ## @param enabled - boolean - optional - default: false
    ## Set to true to enable full Workload Protection.
    #
    enabled: false

    ## @param fim_enabled - boolean - optional - default: false
    ## Set to true to only enable the File Integrity Monitoring feature.
    # fim_enabled: false

    ## @param socket - string - optional - default: /opt/datadog-agent/run/runtime-security.sock
    ## The full path of the unix socket where the security runtime module is accessed.
    #
    # socket: /opt/datadog-agent/run/runtime-security.sock
    {{< /code-block >}}
2. `/etc/datadog-agent/security-agent.yaml`에서 Workload Protection을 비활성화합니다. `runtime_security_config`를 `enabled: false`로 설정하세요.
    {{< code-block lang="yaml" filename="security-agent.yaml" disable_copy="false" collapsible="true" >}}

    ##########################################
    ## Security Agent Runtime Configuration ##
    ##                                      ##
    ## Settings to send logs to Datadog are ##
    ## fetched from section `logs_config`   ##
    ## in datadog-agent.yaml                ##
    ##########################################

    runtime_security_config:
    ## @param enabled - boolean - optional - default: false
    ## Set to true to enable the Security Runtime Module.
    #
    enabled: false

    ## @param socket - string - optional - default: /opt/datadog-agent/run/runtime-security.sock
    ## The full path of the unix socket where the security runtime module is accessed.
    #
    # socket: /opt/datadog-agent/run/runtime-security.sock
    {{< /code-block >}}
3. Agent를 재시작합니다.

[1]: /ko/help/
[2]: https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/
[3]: /ko/agent/troubleshooting/send_a_flare/?tab=agent