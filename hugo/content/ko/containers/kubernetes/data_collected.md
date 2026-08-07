---
aliases:
- /ko/agent/kubernetes/metrics
- /ko/agent/kubernetes/data_collected
description: Datadog Agent가 Kubernetes 클러스터에서 수집하는 메트릭 및 이벤트에 대한 참조 가이드
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
title: 수집된 Kubernetes 데이터
---
이 페이지는 Kubernetes 클러스터에 배포된 Datadog Agent가 수집하는 데이터를 나열합니다. 수집된 메트릭은 사용 중인 Kubernetes 버전에 따라 달라질 수 있습니다.

**참고**: Windows 컨테이너의 경우 [Windows 배포에서 제한적으로 제공되는 메트릭][7]을 참조하세요.

## Metrics {#metrics}

### Kubernetes {#kubernetes}

{{< get-metrics-from-git "kubernetes" >}}

**참고**: `kubernetes.cpu.*` 메트릭에 대한 자세한 내용은 [`kubernetes.cpu.*` 및 `container.cpu.*` 메트릭 간 불일치][8]를 참조하세요.

### Kubelet {#kubelet}

자세한 내용은 [Kubelet][1] 통합 설명서를 참조하세요.

{{< get-metrics-from-git "kubelet" >}}

### Kubernetes 상태 메트릭 코어 {#kubernetes-state-metrics-core}

자세한 내용은 [Kubernetes 상태 메트릭 코어][6] 통합 설명서를 참조하세요. 이 검사는 Datadog Cluster Agent v1.12 이상이 필요합니다.

{{< get-metrics-from-git "kubernetes_state_core" >}}

### Kubernetes 상태 {#kubernetes-state}

**참고**: `kubernetes_state.*` 메트릭은 `kube-state-metrics` API에서 수집됩니다. `kubernetes_state` 검사는 레거시 검사입니다. 대안으로 [Kubernetes 상태 메트릭 코어][6]를 참조하세요. Datadog은 두 검사를 동시에 활성화하지 않을 것을 권장합니다.

{{< get-metrics-from-git "kubernetes_state" >}}

### Kubernetes DNS {#kubernetes-dns}

{{< get-metrics-from-git "kube-dns" >}}

### Kubernetes 프록시 {#kubernetes-proxy}

{{< get-metrics-from-git "kube-proxy" >}}

### Kubernetes API 서버 {#kubernetes-api-server}

자세한 내용은 [Kubernetes API 서버][3] 통합 설명서를 참조하세요.

{{< get-metrics-from-git "kube-apiserver-metrics" >}}

### Kubernetes 컨트롤러 매니저 {#kubernetes-controller-manager}

자세한 내용은 [Kubernetes 컨트롤러 매니저][2] 통합 설명서를 참조하세요.

{{< get-metrics-from-git "kube-controller-manager" >}}

### Kubernetes 메트릭 서버 {#kubernetes-metrics-server}

자세한 내용은 [Kubernetes 메트릭 서버][4] 통합 설명서를 참조하세요.

{{< get-metrics-from-git "kube-metrics-server" >}}

### Kubernetes 스케줄러 {#kubernetes-scheduler}

자세한 내용은 [Kubernetes 스케줄러][5] 통합 설명서를 참조하세요.

{{< get-metrics-from-git "kube-scheduler" >}}


## 이벤트 {#events}

- Backoff
- Conflict
- Delete
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

## 서비스 검사 {#service-checks}

### Kubelet {#kubelet-1}

자세한 내용은 [Kubelet][1] 통합 설명서를 참조하세요.

{{< get-service-checks-from-git "kubelet" >}}

### Kubernetes 컨트롤러 매니저 {#kubernetes-controller-manager-1}

자세한 내용은 [Kubernetes 컨트롤러 매니저][2] 통합 설명서를 참조하세요.

{{< get-service-checks-from-git "kube-controller-manager" >}}

### Kubernetes 메트릭 서버 {#kubernetes-metrics-server-1}

자세한 내용은 [Kubernetes 메트릭 서버][4] 통합 설명서를 참조하세요.

{{< get-service-checks-from-git "kube-metrics-server" >}}

### Kubernetes 스케줄러 {#kubernetes-scheduler-1}

자세한 내용은 [Kubernetes 스케줄러][5] 통합 설명서를 참조하세요.

{{< get-service-checks-from-git "kube-scheduler" >}}

### Kubernetes 상태 메트릭 코어 {#kubernetes-state-metrics-core-1}

자세한 내용은 [Kubernetes 상태 메트릭 코어][6] 통합 설명서를 참조하세요.

`kubernetes_state.cronjob.complete`
:  CronJob의 마지막 작업이 실패했는지 여부를 나타냅니다. 태그:`kube_cronjob` `kube_namespace` (`env` `service` `version`는 표준 레이블에서 가져옴)

`kubernetes_state.cronjob.on_schedule_check`
: CronJob의 다음 예약 실행 시점이 이미 지났는지 여부를 경고합니다. 태그:`kube_cronjob` `kube_namespace` (`env` `service` `version`는 표준 레이블에서 가져옴)

`kubernetes_state.job.complete`
: 작업이 실패했는지 여부를 나타냅니다. 태그:`kube_job` 또는 `kube_cronjob` `kube_namespace` (`env` `service` `version`는 표준 레이블에서 가져옴)

`kubernetes_state.node.ready`
: 노드의 준비 상태를 나타냅니다. 태그:`node` `condition` `status`.

`kubernetes_state.node.out_of_disk`
: 노드의 디스크가 부족한 상태인지 여부를 나타냅니다. 태그:`node` `condition` `status`.

`kubernetes_state.node.disk_pressure`
: 노드가 디스크 압박 상태인지 여부를 나타냅니다. 태그:`node` `condition` `status`.

`kubernetes_state.node.network_unavailable`
: 노드 네트워크를 사용할 수 없는 상태인지 여부를 나타냅니다. 태그:`node` `condition` `status`.

`kubernetes_state.node.memory_pressure`
:  노드가 메모리 압박 상태인지 여부를 나타냅니다. 태그:`node` `condition` `status`.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/kubelet/
[2]: /ko/integrations/kube_controller_manager/
[3]: /ko/integrations/kube_apiserver_metrics/
[4]: /ko/integrations/kube_metrics_server
[5]: /ko/integrations/kube_scheduler
[6]: /ko/integrations/kubernetes_state_core/
[7]: /ko/agent/troubleshooting/windows_containers/#limited-metrics-for-windows-deployments
[8]: /ko/containers/faq/cpu-usage-metrics