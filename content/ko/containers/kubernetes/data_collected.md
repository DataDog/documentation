---
aliases:
- /ko/agent/kubernetes/metrics
- /ko/agent/kubernetes/data_collected
further_reading:
- link: /agent/kubernetes/log/
  tag: 설명서
  text: 애플리케이션 로그 수집
- link: /agent/kubernetes/apm/
  tag: 설명서
  text: 애플리케이션 트레이스 수집
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
title: 수집된 쿠버네티스(Kubernetes) 데이터
---

이 페이지에는 Kubernetes 클러스터에 배포될 때 Datadog Agent가 수집한 데이터가 나열되어 있습니다.

수집되는 메트릭 세트는 사용 중인 Kubernetes 버전에 따라 달라질 수 있습니다.

## 메트릭

### 쿠버네티스(Kubernetes)

{{< get-metrics-from-git "kubernetes" >}}

### Kubelet

자세한 내용은 [Kubelet][1] 통합 설명서를 참조하세요.

{{< get-metrics-from-git "kubelet" >}}

### Kubernetes 상태 메트릭 코어

자세한 내용은 [Kubernetes 상태 메트릭 코어][6] 통합에 대한 설명서를 참조하세요. 이 검사에는 Datadog Cluster Agent v1.12 이상이 필요합니다.

{{< get-metrics-from-git "kubernetes_state_core" >}}

### 쿠버네티스 상태

**참고**: `kube-state-metrics` API에서 `kubernetes_state.*` 메트릭이 수집됩니다. `kubernetes_state` 검사는 레거시 검사입니다. 다른 방법으로 [Kubernetes 상태 메트릭 코어][6]를 참조하세요. Datadog은 두 검사를 동시에 사용하지 않을 것을 권장합니다.

{{< get-metrics-from-git "kubernetes_state" >}}

### 쿠버네티스 DNS

{{< get-metrics-from-git "kube_dns" >}}

### 쿠버네티스 프록시

{{< get-metrics-from-git "kube_proxy" >}}

### Kubernetes API 서버

자세한 내용은 [Kubernetes API 서버][3] 통합 설명서를 참조하세요.

{{< get-metrics-from-git "kube_apiserver_metrics" >}}

### Kubernetes 컨트롤러 매니저

자세한 내용은 [Kubernetes 컨트롤러 매니저][2] 통합 설명서를 참조하세요.

{{< get-metrics-from-git "kube_controller_manager" >}}

### Kubernetes 메트릭 서버

자세한 내용은 [Kubernetes 메트릭 서버][4] 통합 설명서를 참조하세요.

{{< get-metrics-from-git "kube_metrics_server" >}}

### Kubernetes 스케줄러

자세한 내용은 [Kubernetes 스케줄러][5] 통합 설명서를 참조하세요.

{{< get-metrics-from-git "kube_scheduler" >}}


## 이벤트 

- Backoff
- Conflict
- 삭제
- DeletingAllPods
- Didn't have enough resource
- Error
- Failed
- FailedCreate
- FailedDelete
- FailedMount
- FailedSync
- Failedvalidation
- FreeDiskSpaceFailed
- HostPortConflict
- InsufficientFreeCPU
- InsufficientFreeMemory
- InvalidDiskCapacity
- Killing
- KubeletsetupFailed
- NodeNotReady
- NodeoutofDisk
- OutofDisk
- Rebooted
- TerminatedAllPods
- Unable
- Unhealthy

## 서비스 검사

### Kubelet

자세한 내용은 [Kubelet][1] 통합 설명서를 참조하세요.

{{< get-service-checks-from-git "kubelet" >}}

### Kubernetes 컨트롤러 관리자

자세한 내용은 [Kubernetes 컨트롤러 매니저][2] 통합 설명서를 참조하세요.

{{< get-service-checks-from-git "kube_controller_manager" >}}

### Kubernetes 메트릭 서버

자세한 내용은 [Kubernetes 메트릭 서버][4] 통합 설명서를 참조하세요.

{{< get-service-checks-from-git "kube_metrics_server" >}}

### Kubernetes 스케줄러

자세한 내용은 [Kubernetes 스케줄러][5] 통합 설명서를 참조하세요.

{{< get-service-checks-from-git "kube_scheduler" >}}

### Kubernetes 상태 메트릭 코어

자세한 내용은 [Kubernetes 상태 메트릭 코어][6] 통합에 대한 설명서를 참조하세요.

`kubernetes_state.cronjob.complete`: cronjob의 마지막 작업이 실패했는지 여부입니다. 태그:`kube_cronjob` `kube_namespace`(표준 라벨의 `env` `service` `version`).

`kubernetes_state.cronjob.on_schedule_check`
: cronjob의 다음 일정이 과거인 경우 경고합니다. 태그: `kube_cronjob` `kube_namespace`(표준 라벨의 `env` `service` `version`).

`kubernetes_state.job.complete`
: 작업 실패 여부입니다. 태그: `kube_job` 또는 `kube_cronjob` `kube_namespace` (표준 라벨의 `env` `service` `version`).

`kubernetes_state.node.ready`
: 노드가 준비되었는지 여부입니다. 태그: `node` `condition` `status`.

`kubernetes_state.node.out_of_disk`
: 노드의 디스크가 부족한지 여부입니다. 태그: `node` `condition` `status`.

`kubernetes_state.node.disk_pressure`
: 노드에 디스크 압력이 가해지고 있는지 여부입니다. 태그: `node` `condition` `status`. 

`kubernetes_state.node.network_unavailable`
: 노드 네트워크를 사용할 수 없는지 여부입니다. 태그: `node` `condition` `status`.

`kubernetes_state.node.memory_pressure`
: 노드 네트워크에 메모리 압박이 있는지 여부입니다. 태그: `node` `condition` `status`.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/kubelet/
[2]: /ko/integrations/kube_controller_manager/
[3]: /ko/integrations/kube_apiserver_metrics/
[4]: /ko/integrations/kube_metrics_server
[5]: /ko/integrations/kube_scheduler
[6]: /ko/integrations/kubernetes_state_core/