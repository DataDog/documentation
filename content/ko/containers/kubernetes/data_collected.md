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
kind: 설명서
title: 수집된 쿠버네티스(Kubernetes) 데이터
---

## 메트릭

쿠버네티스 클러스터에서 배포된 시점 에이전트가 수집한 메트릭:

**참고**: Datadog 쿠버네티스 통합에서 수집한 메트릭은 사용 중인 쿠버네티스 버전에 따라 다를 수 있습니다.

### 쿠버네티스(Kubernetes)

{{< get-metrics-from-git "kubernetes" >}}

### Kubelet

{{< get-metrics-from-git "kubelet" >}}

### 쿠버네티스 상태

`kubernetes_state.*` 메트릭은 `kube-state-metrics` API에서 수집되니 참고하세요.

{{< get-metrics-from-git "kubernetes_state" >}}

### 쿠버네티스 DNS

{{< get-metrics-from-git "kube_dns" >}}

### 쿠버네티스 프록시

{{< get-metrics-from-git "kube_proxy" >}}

## 이벤트

- Backoff
- Conflict
- 삭제
- DeletingAllPods
- Didn't have enough resource
- 에러
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

## 서비스 점검

### Kubelet

{{< get-service-checks-from-git "kubelet" >}}

### 쿠버네티스 상태

{{< get-service-checks-from-git "kubernetes_state" >}}



{{< partial name="whats-next/whats-next.html" >}}
