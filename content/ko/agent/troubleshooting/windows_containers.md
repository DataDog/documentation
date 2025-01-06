---
further_reading:
- link: /agent/docker/?tab=windows
  tag: 설명서
  text: Docker 에이전트
- link: /agent/kubernetes/
  tag: 설명서
  text: Kubernetes 에이전트
- link: /agent/troubleshooting/
  tag: 설명서
  text: 에이전트 트러블슈팅
title: Windows 컨테이너 문제
---

이 페이지에서는 컨테이너화된 윈도우즈(Windows) 애플리케이션 모니터링에 대한 알려진 미해결 문제를 설명합니다.

## 일반적인 문제

컨테이너화된 윈도우즈(Windows) 애플리케이션 모니터링에는 Datadog 에이전트 7.19 이상이 필요합니다.

지원되는 OS 버전은 다음과 같습니다.
- 윈도우즈(Windows) 서버 2019(LTSC/1809)
- 윈도우즈(Windows) 서버 2019 1909( 에이전트 7.39까지, Microsoft에서 더 이상 지원하지 않음)
- 윈도우즈(Windows) 서버 2019 2004 또는 20H1( 에이전트 7.39까지, 더 이상 Microsoft에서 지원하지 않음)
- 윈도우즈(Windows) 서버 2019 20H2(에이전트 7.33~7.39, Microsoft에서 더 이상 지원하지 않음)
- 윈도우즈(Windows) 서버 2022 LTSC (에이전트 >=7.34)

Hyper-V 격리 모드는 지원되지 않습니다.

디스크, IO 및 네트워크에 대한 호스트 메트릭은 비활성화되어 있습니다. 윈도우즈(Windows) 서버에서는 지원되지 않으므로 에이전트 점검은 기본적으로 비활성화되어 있습니다.

## 도커(Docker) 이슈

실시간 프로세스는 컨테이너에 표시되지 않습니다(Datadog 에이전트 제외).

## 쿠버네티스(Kubernetes) 이슈

실시간 프로세스 는 컨테이너에 표시되지 않습니다(Datadog 에이전트 제외).

### 혼합 클러스터(리눅스(Linux) + 윈도우즈(Windows))

혼합 클러스터에서 Datadog 에이전트를 배포하는 권장 방법은 서로 다른 `targetSystem`를 사용하여 헬름 차트를 두 번 설치하는 것입니다. 

Datadog 에이전트는 `nodeSelector`를 사용하여 `targetSystem`을 기반으로 리눅스(Linux) 또는 윈도우즈(Windows) 노드를 자동으로 선택합니다.

그러나 기본적으로 설치되는 Kube State 메트릭에는 해당되지 않으므로 윈도우즈(Windows) 노드에서 Kube State 메트릭의 일정을 예약할 수 없는 상황이 발생합니다.

이 문제를 방지하는 세 가지 옵션을 사용할 수 있습니다:

* 윈도우즈(Windows) 노드를 오염시킵니다. 윈도우즈에서 에이전트는 항상 `node.kubernetes.io/os=windows:NoSchedule` 오염을 허용합니다.
* Datadog 헬름 차트 `values.yaml`를 통해 Kube State 메트릭 노드 선택기를 설정합니다,

```
kube-state-metrics:
  nodeSelector:
    beta.kubernetes.io/os: linux // Kubernetes < 1.14
    kubernetes.io/os: linux // Kubernetes >= 1.14
```

* `datadog.kubeStateMetricsEnabled`를 `false`로 설정하여 Kube State 메트릭을 별도로 배포합니다.

**참고**: 두 개의 Datadog 설치(하나는 `targetSystem: linux`, 하나는 `targetSystem: windows`)를 사용하는 경우, 두 번째 설치에 `datadog.kubeStateMetricsEnabled`가 `false`로 설정되어 있는지 확인하여 두 개의 Kube State 인스턴스 메트릭을 배포하지 않도록 하세요.

#### Datadog 클러스터 에이전트와의 혼합 에이전트

클러스터 에이전트 v1.18 이상을 사용하면 혼합 클러스터를 포함하는 설정이 Datadog 클러스터 에이전트에서 지원됩니다.

다음 `values.yaml` 파일을 사용해 윈도우즈 노드와 클러스터 에이전트에 배포된 에이전트 간 통신을 설정합니다.

```yaml
targetSystem: windows
existingClusterAgent:
  join: true
  serviceName: "<EXISTING_DCA_SERVICE_NAME>" # from the first Datadog Helm chart
  tokenSecretName: "<EXISTING_DCA_SECRET_NAME>" # from the first Datadog Helm chart

# 첫 번째 차트에서 이미 배포되었으므로 datadogMetrics 배포를 비활성화합니다.
datadog-crds:
  crds:
    datadogMetrics: false
# kube-state-metrics 배포 비활성화
datadog:
  kubeStateMetricsEnabled: false
```

#### 윈도우즈 배포에 대한 제한된 설정 옵션

일부 설정 옵션은 윈도우즈(Windows)에서 사용할 수 없습니다. 다음은 **지원되지 않는** 옵션의 목록입니다.

| 파라미터                      | 이유 |
| --- | ----------- |
| `datadog.dogstatsd.useHostPID` |  Host PID는 윈도우즈 컨테이너에서 지원되지 않습니다. |
| `datadog.dogstatsd.useSocketVolume` | Unix 소켓은 윈도우즈에서 지원되지 않습니다. |
| `datadog.dogstatsd.socketPath` |  Unix 소켓은 윈도우즈에서 지원되지 않습니다. |
| `datadog.processAgent.processCollection` |  호스트/기타 컨테이너 프로세스에 액세스할 수 없음 |
| `datadog.systemProbe.seccomp` | 시스템 프로브를 윈도우즈에서 사용할 수 없음 |
| `datadog.systemProbe.seccompRoot` | 시스템 프로브를 윈도우즈에서 사용할 수 없음 |
| `datadog.systemProbe.debugPort` | 시스템 프로브를 윈도우즈에서 사용할 수 없음 |
| `datadog.systemProbe.enableConntrack` | 시스템 프로브를 윈도우즈에서 사용할 수 없음 |
| `datadog.systemProbe.bpfDebug` |  시스템 프로브를 윈도우즈에서 사용할 수 없음 |
| `datadog.systemProbe.apparmor` |  시스템 프로브를 윈도우즈에서 사용할 수 없음 |
| `agents.useHostNetwork` | 호스트 네트워크는 윈도우즈 컨테이너에서 지원되지 않음 |

### 애플리케이션 성능 모니터링(APM) 또는 DogStatsD

`HostPort`는 기본 OS 버전 및 CNI 플러그인에 따라 쿠버네티스(Kubernetes) 에서 부분적으로 지원됩니다.
 `HostPort` 작동을 위한 요구 사항은 다음과 같습니다.

* 윈도우즈(Windows) 서버 버전이 1909 이상이어야 합니다.
* CNI 플러그인은 `portMappings` 기능을 지원해야 합니다.

현재 최소 두 개의 CNI 플러그인이 이 기능을 지원합니다.

* 공식 `win-bridge` 플러그인(버전 >= 0.8.6) - GKE에서 사용
* Azure CNI 플러그인 - AKS에서 사용

설정이 이러한 요구 사항을 충족하지 않는 경우, 애플리케이션 성능 모니터링(APM) 및 DogStatsD는 트레이서와 에이전트 간 포드 투 포드 네트워킹이 설정된 경우에만 작동합니다.

### Kubelet 점검

쿠버네티스(Kubernetes) 버전에 따라 일부 Kubelet 메트릭을 사용하지 못할 수 있습니다(또는 Kubelet 점검이 시간 초과될 수 있습니다).
최적의 환경을 위해 다음 중 하나를 사용하세요.

* Kubelet >= 1.16.13(GKE의 경우 1.16.11)
* Kubelet >= 1.17.9(GKE의 경우 1.17.6)
* Kubelet >= 1.18.6
* Kubelet >= 1.19

에이전트 버전 >= 7.19.2 사용

윈도우즈(Windows)에서 모든 `kubernetes.*` 을 이용할 수 있는 것은 아니며, 아래에서 이용 가능한 목록을 확인할 수 있습니다:

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