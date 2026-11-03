---
further_reading:
- link: /agent/docker/?tab=windows
  tag: 설명서
  text: Docker Agent
- link: /agent/kubernetes/
  tag: 설명서
  text: Kubernetes Agent
- link: /agent/troubleshooting/
  tag: 설명서
  text: Agent 문제 해결
title: Windows 컨테이너 문제
---
이 페이지에서는 컨테이너화된 Windows 애플리케이션 모니터링에 대한 알려진 미해결 문제를 설명합니다.

## 일반적인 문제 {#common-issues}

컨테이너화된 Windows 애플리케이션 모니터링에는 Datadog Agent 7.19 이상이 필요합니다.

지원되는 OS 버전은 다음과 같습니다.
- Windows Server 2019(LTSC / 1809)
- Windows Server 2019 1909(Agent 7.39까지, Microsoft에서 더 이상 지원하지 않음)
- Windows Server 2019 2004 또는 20H1(Agent 7.39까지, Microsoft에서 더 이상 지원하지 않음)
- Windows Server 2019 20H2(Agent 7.33~7.39, Microsoft에서 더 이상 지원하지 않음)
- Windows Server 2022 LTSC(Agent >=7.34)

Hyper-V 격리 모드는 지원되지 않습니다.

디스크, IO 및 네트워크에 대한 호스트 메트릭은 비활성화되어 있습니다. Windows 서버에서 지원하지 않으므로 Agent 검사가 기본적으로 비활성화되어 있습니다.

## Docker 문제 {#docker-issues}

실시간 프로세스는 컨테이너에 표시되지 않습니다(Datadog Agent 제외).

## Kubernetes 문제 {#kubernetes-issues}

실시간 프로세스는 컨테이너에 표시되지 않습니다(Datadog Agent 제외).

### 혼합 클러스터(Linux + Windows) {#mixed-clusters-linux-windows}

혼합 클러스터에서 Datadog Agent를 배포하는 권장 방법은 서로 다른 `targetSystem`을 사용하여 Helm 차트를 두 번 설치하는 것입니다. 

Datadog Agent는 `nodeSelector`를 사용하여 `targetSystem`을 기반으로 Linux 또는 Windows 노드를 자동으로 선택합니다.

그러나 기본적으로 설치되는 Kube State Metrics에는 해당되지 않으므로 Windows 노드에서 Kube State Metrics의 일정을 예약할 수 없는 상황이 발생합니다.

이 문제를 방지하기 위해 세 가지 옵션을 사용할 수 있습니다.

* Windows 노드를 오염시킵니다. Windows에서 Agent는 항상 `node.kubernetes.io/os=windows:NoSchedule` 오염을 허용합니다.
* Datadog Helm 차트 `values.yaml`을 통해 Kube State Metrics 노드 선택기를 설정합니다.

   ```
   kube-state-metrics:
     nodeSelector:
       beta.kubernetes.io/os: linux // Kubernetes < 1.14
       kubernetes.io/os: linux // Kubernetes >= 1.14
   ```

* `datadog.kubeStateMetricsEnabled`를 `false`로 설정하여 Kube State Metrics를 직접 별도로 배포합니다.

**참고**: 두 개의 Datadog 설치를 사용하는 경우(하나는 `targetSystem: linux`, 다른 하나는 `targetSystem: windows` 사용), Kube State Metrics의 인스턴스가 두 개 배포되지 않도록 두 번째 설치에서 `datadog.kubeStateMetricsEnabled`를 `false`로 설정해야 합니다.

일부 메트릭은 Windows 배포에서 사용할 수 없습니다. [사용 가능한 메트릭](#limited-metrics-for-windows-deployments)을 참조하세요.

#### Datadog Cluster Agent와의 혼합 클러스터 {#mixed-clusters-with-the-datadog-cluster-agent}

Cluster Agent v1.18 이상을 사용하면 혼합 클러스터를 포함하는 설정이 Datadog Cluster Agent에서 지원됩니다.

다음 `values.yaml` 파일을 사용하여 Windows 노드에 배포된 Agent와 Cluster Agent 간의 통신을 구성하세요.

```yaml
targetSystem: windows
existingClusterAgent:
  join: true
  serviceName: "<EXISTING_DCA_SERVICE_NAME>" # from the first Datadog Helm chart
  tokenSecretName: "<EXISTING_DCA_SECRET_NAME>" # from the first Datadog Helm chart

# Disable datadogMetrics deployment since it should have been already deployed with the first chart.
datadog-crds:
  crds:
    datadogMetrics: false
# Disable kube-state-metrics deployment
datadog:
  kubeStateMetricsEnabled: false
```

#### Windows 배포에 대한 제한된 설정 옵션 {#limited-configuration-options-for-windows-deployments}

<div class="alert alert-info"> <code>DatadogAgent</code> 리소스만 사용하여 Windows 노드에 에이전트를 배포하는 것은 지원되지 않습니다.</div>

Datadog Operator v1.30.0부터 혼합 노드(Windows 및 Linux) 클러스터에 대해 Windows 노드 지원이 제공됩니다. 이를 사용하려면 Windows를 대상으로 하는 [DatadogAgentProfile](/containers/datadog_operator/datadog_agent_profiles)을 `DatadogAgent` 리소스와 함께 추가하세요. `DatadogAgentProfile`을 사용하지 않는 경우 [Helm 차트](/containers/kubernetes/installation/?tab=helm)를 사용하여 Windows 노드에 Agent를 배포하세요.

일부 설정 옵션은 Windows에서 사용할 수 없습니다. 다음은 **지원되지 않는** 옵션 목록입니다.

| 파라미터                      | 이유 |
| --- | ----------- |
| `datadog.dogstatsd.useHostPID` |  Host PID는 Windows 컨테이너에서 지원되지 않음 |
| `datadog.dogstatsd.useSocketVolume` | Unix 소켓은 Windows에서 지원되지 않음 |
| `datadog.dogstatsd.socketPath` |  Unix 소켓은 Windows에서 지원되지 않음 |
| `datadog.processAgent.processCollection` |  호스트/기타 컨테이너 프로세스에 액세스할 수 없음 |
| `datadog.systemProbe.seccomp` | 시스템 프로브를 Windows에서 사용할 수 없음 |
| `datadog.systemProbe.seccompRoot` | 시스템 프로브를 Windows에서 사용할 수 없음 |
| `datadog.systemProbe.debugPort` | 시스템 프로브를 Windows에서 사용할 수 없음 |
| `datadog.systemProbe.enableConntrack` | 시스템 프로브를 Windows에서 사용할 수 없음 |
| `datadog.systemProbe.bpfDebug` |  시스템 프로브를 Windows에서 사용할 수 없음 |
| `datadog.systemProbe.apparmor` |  시스템 프로브를 Windows에서 사용할 수 없음 |
| `agents.useHostNetwork` | 호스트 네트워크는 Windows 컨테이너에서 지원되지 않음 |

### APM 또는 DogStatsD용 HostPort {#hostport-for-apm-or-dogstatsd}

`HostPort`는 기본 OS 버전 및 CNI 플러그인에 따라 Kubernetes에서 부분적으로 지원됩니다.
`HostPort`가 작동하기 위한 요구 사항은 다음과 같습니다.

* Windows Server 버전이 1909 이상이어야 합니다.
* CNI 플러그인은 `portMappings` 기능을 지원해야 합니다.

현재 최소 두 개의 CNI 플러그인이 이 기능을 지원합니다.

* 공식 `win-bridge` 플러그인(버전 >= 0.8.6) - GKE에서 사용
* Azure CNI 플러그인 - AKS에서 사용

설정이 이러한 요구 사항을 충족하지 않는 경우, 애플리케이션 성능 모니터링(APM) 및 DogStatsD는 트레이서와 에이전트 간 포드 투 포드 네트워킹이 설정된 경우에만 작동합니다.

### Kubelet 검사 {#kubelet-check}

Kubernetes 버전에 따라 일부 Kubelet 메트릭을 사용할 수 없거나 Kubelet 검사가 시간 초과될 수 있습니다.
최적의 환경을 위해 Datadog Agent v7.19.2 이상에서 다음 중 하나를 사용하세요.

* Kubelet v1.16.13 이상(GKE의 경우 v1.16.11 이상)
* Kubelet v1.17.9 이상(GKE의 경우 v1.17.6 이상)
* Kubelet v1.18.6 이상
* Kubelet v1.19 이상

### Windows 배포에 대한 제한된 메트릭 {#limited-metrics-for-windows-deployments}

Windows 컨테이너에 대해 다음 `kubernetes.*` 메트릭을 사용할 수 있습니다.

* `kubernetes.cpu.usage.total`
* `kubernetes.containers.restarts`
* `kubernetes.containers.running`
* `kubernetes.cpu.capacity`
* `kubernetes.ephemeral_storage.usage`
* `kubernetes.kubelet.container.log_filesystem.used_bytes`
* `kubernetes.kubelet.network_plugin.latency.count`
* `kubernetes.kubelet.network_plugin.latency.quantile`
* `kubernetes.kubelet.network_plugin.latency.sum`
* `kubernetes.kubelet.runtime.errors`
* `kubernetes.kubelet.runtime.operations`
* `kubernetes.memory.capacity`
* `kubernetes.pods.running`
* `kubernetes.rest.client.latency.count`
* `kubernetes.rest.client.latency.sum`
* `kubernetes.rest.client.requests`
* `kubernetes.network.tx_bytes`
* `kubernetes.network.rx_bytes`
* `kubernetes.cpu.usage.total`
* `kubernetes.memory.working_set`
* `kubernetes.filesystem.usage`
* `kubernetes.filesystem.usage_pct`