---
further_reading:
- link: /agent/docker/?tab=windows
  tag: 설명서
  text: Docker 에이전트
- link: /agent/kubernetes/
  tag: 설명서
  text: Kubernetes 에이전트
- link: /agent/troubleshooting/
  tag: 에이전트 트러블슈팅
  text: 에이전트 트러블슈팅
title: Windows 컨테이너 문제
---

이 페이지에서는 컨테이너화된 Windows 애플리케이션 모니터링과 관련된 문제를 설명합니다.

## 일반적인 문제

컨테이너화된 Windows 애플리케이션 모니터링에는 Datadog 에이전트 7.19 이상이 필요합니다.

지원되는 OS 버전은 다음과 같습니다.
- Windows 서버 2019(LTSC/1809)
- Windows 서버 2019 1909(에이전트 7.39까지, Microsoft에서 더 이상 지원되지 않음)
- Windows 서버 2019, 2004, 또는 20H1(에이전트 7.39까지, Microsoft에서 더 이상 지원되지 않음)
- Windows 서버 2019 20H2(에이전트 7.33 ~ 7.39, Microsoft에서 더 이상 지원되지 않음)
- Windows 서버 2022 LTSC(에이전트 >= 7.34)

Hyper-V 분리 모드는 지원되지 않습니다.

디스크, IO, 네트워크 호스트 메트릭이 사용되지 않도록 설정되어 있어 Windows 서버에서 이 같은 메트릭이 지원되지 않으므로 에이전트 점검이 기본적으로 사용되지 않도록 설정됩니다.

## Docker 문제

실시간 프로세스는 컨테이너에 나타나지 않습니다(Datadog 에이전트를 제외).

## Kubernetes 문제

실시간 프로세스는 컨테이너에 나타나지 않습니다(Datadog 에이전트를 제외).

### 혼합 클러스터(Linux + Windows)

혼합 클러스터에서 Datadog 에이전트를 배포할 때 권장하는 방법은 `targetSystem`이 다른 Helm 차트를 두 번 설치하는 것입니다.

Datadog 에이전트에서는 `nodeSelector`를 사용해 `targetSystem`에 기반하여 Linux 또는 Windows 노드를 자동으로 선택합니다.

그러나 기본적으로 설치된 Kube State Metric의 경우에는 자동으로 선택하지 않으므로 Windows 노드에서 Kube State Metric을 예약할 수 없는 상황이 발생합니다.

이 문제를 방지할 수 있는 세 가지 옵션이 있습니다.

* Windows 노드를 테인트합니다. Windows에서는 에이전트가 항상 `node.kubernetes.io/os=windows:NoSchedule` 테인트를 허용합니다.
* Datatog Helm 차트 `values.yaml`를 통해 Kube State Metric 노드 선택기를 설정합니다.

```
kube-state-metrics:
  nodeSelector:
    beta.kubernetes.io/os: linux // Kubernetes < 1.14
    kubernetes.io/os: linux // Kubernetes >= 1.14
```

* `datadog.kubeStateMetricsEnabled`를 `false`로 설정하여 Kube State Metric을 별도로 배포합니다.

**참고**: Datadog 설치(하나는 `targetSystem: linux`로, 다른 하나는 `targetSystem: windows`로)를 두 번 하는 경우, 두 번째 설치할 때 Kube State Metrics 인스턴스를 두 번 배포하지 않도록 `datadog.kubeStateMetricsEnabled`를 `false`로 설정하세요.

#### 혼합된 클러스터에서 Datadog 클러스터 에이전트 사용

클러스터 에이전트 버전 1.18+에서는 Datadog 클러스터 에이전트에서 혼합 클러스터 구성을 지원합니다.

다음 `values.yaml` 파일을 사용해 Windows 노드와 클러스터 에이전트에 배포된 에이전트 간 통신을 설정합니다.

```yaml
targetSystem: windows
existingClusterAgent:
  join: true
  serviceName: "<EXISTING_DCA_SERVICE_NAME>" # from the first Datadog Helm chart
  tokenSecretName: "<EXISTING_DCA_SECRET_NAME>" # from the first Datadog Helm chart

# 첫 번째 차트에서 배포되었을 것이므로 datadogMetrics 배포가 비활성화됨.
datadog-crds:
  crds:
    datadogMetrics: false
# kube-state-metrics 배포 비활성화됨
datadog:
  kubeStateMetricsEnabled: false
```

#### Windows 배포에서 제한된 구성 옵션

Windows에서는 일부 설정 옵션을 사용할 수 없습니다. 다음은 **지원되지 않는** 옵션 목록입니다.

| 파라미터                      | 이유 |
| --- | ----------- |
| `datadog.dogstatsd.useHostPID` |  Windows 컨테이너에서 호스트 PID가 지원되지 않음 |
| `datadog.dogstatsd.useSocketVolume` | Windows에서는 Unix 소켓이 지원되지 않음 |
| `datadog.dogstatsd.socketPath` |  Windows에서는 Unix 소켓이 지원되지 않음 |
| `datadog.processAgent.processCollection` |  호스트/다른 컨테이너 프로세스에 액세스할 수 없음 |
| `datadog.systemProbe.seccomp` | Windows에서는 시스템 프로브를 사용할 수 없음 |
| `datadog.systemProbe.seccompRoot` | Windows에서는 시스템 프로브를 사용할 수 없음 |
| `datadog.systemProbe.debugPort` | Windows에서는 시스템 프로브를 사용할 수 없음 |
| `datadog.systemProbe.enableConntrack` | Windows에서는 시스템 프로브를 사용할 수 없음 |
| `datadog.systemProbe.bpfDebug` |  Windows에서는 시스템 프로브를 사용할 수 없음 |
| `datadog.systemProbe.apparmor` |  Windows에서는 시스템 프로브를 사용할 수 없음 |
| `agents.useHostNetwork` | Windows 컨테이너에서는 호스트 네트워크가 지원되지 않음 |

### 애플리케이션 성능 모니터링(APM) 또는 DogStatsD의 HostPort

`HostPort`는 기본 OS 버전과 CNI 플러그인에 따라 Kubernetes에서 부분적으로 지원됩니다.
`HostPort` 작업에 필요한 요건은 다음과 같습니다.

* Windows 서버 버전은 >= 1909이어야 합니다.
* CNI 플러그인이 `portMappings` 기능을 지원해야 합니다.

현재 최소 CNI 플러그인 두 개에서 이 기능을 지원합니다.

* 공식 `win-bridge` 플러그인 (버전>= 0.8.6) - GKE에서 사용됨
* Azure CNI 플러그인- AKS에서 사용됨

이 같은 요구 사항에 맞게 설정하지 않으면 트레이서와 에이전트 간 포드 대 포드 네트워킹이 설정된 경우에만 애플리케이션 성능 모니터링(APM)과 DogStatsD가 작동합니다.

### Kubelet 점검

Kubernetes 버전에 따라 일부 Kubelet 메트릭을 사용할 수 없거나 Kublet 점검 시간이 초과될 수 있습니다.
최적의 경험을 위해 다음 중 하나를 사용하시기 바랍니다.

* Kubelet >= 1.16.13(GKE에서 1.16.11 )
* Kubelet >= 1.17.9(GKE에서 1.17.6)
* Kubelet >= 1.18.6
* Kubelet >= 1.19

에이전트 버전 >= 7.19.2

Windows에서 모든 `kubernetes.*`를 사용할 수 있는 것은 아닙니다. 아래에서 사용 가능한 항목 목록을 확인할 수 있습니다.

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