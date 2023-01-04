---
title: Kubernetes Data Collected
kind: documentation
aliases:
 - /agent/kubernetes/metrics
 - /agent/kubernetes/data_collected
further_reading:
- link: "/agent/kubernetes/log/"
  tag: "Documentation"
  text: "Collect your application logs"
- link: "/agent/kubernetes/apm/"
  tag: "Documentation"
  text: "Collect your application traces"
- link: "/agent/kubernetes/prometheus/"
  tag: "Documentation"
  text: "Collect your Prometheus metrics"
- link: "/agent/kubernetes/integrations/"
  tag: "Documentation"
  text: "Collect automatically your applications metrics and logs"
- link: "/agent/guide/autodiscovery-management/"
  tag: "Documentation"
  text: "Limit data collection to a subset of containers only"
- link: "/agent/kubernetes/tag/"
  tag: "Documentation"
  text: "Assign tags to all data emitted by a container"
---

## Metrics

Metrics collected by the Agent when deployed on your Kubernetes cluster:

**Note**: The set of metrics collected by the Datadog Kubernetes integration may vary depending on the version of Kubernetes in use.

### Kubernetes

{{< get-metrics-from-git "kubernetes" >}}

### Kubelet

{{< get-metrics-from-git "kubelet" >}}

### Kubernetes state

Note that `kubernetes_state.*` metrics are gathered from the `kube-state-metrics` API.

{{< get-metrics-from-git "kubernetes_state" >}}

### Kubernetes DNS

{{< get-metrics-from-git "kube_dns" >}}

### Kubernetes proxy

{{< get-metrics-from-git "kube_proxy" >}}

## Events

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

## Service checks

### Kubelet

{{< get-service-checks-from-git "kubelet" >}}

### Kubernetes state

{{< get-service-checks-from-git "kubernetes_state" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
