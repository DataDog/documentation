---
title: Kubernetes Data Collected
aliases:
 - /agent/kubernetes/metrics
 - /agent/kubernetes/data_collected
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentation
  text: Collect your application logs
- link: /agent/kubernetes/apm/
  tag: Documentation
  text: Collect your application traces
- link: /agent/kubernetes/prometheus/
  tag: Documentation
  text: Collect your Prometheus metrics
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Collect automatically your applications metrics and logs
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limit data collection to a subset of containers only
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Assign tags to all data emitted by a container
---

This page lists data collected by the Datadog Agent when deployed on a Kubernetes cluster. 

The set of metrics collected may vary depending on the version of Kubernetes in use.

## Metrics

### Kubernetes

{{< get-metrics-from-git "kubernetes" >}}

### Kubelet

For more information, see the documentation for the [Kubelet][1] integration.

{{< get-metrics-from-git "kubelet" >}}

### Kubernetes state metrics core

For more information, see the documentation for the [Kubernetes state metrics core][6] integration. This check requires Datadog Cluster Agent v1.12 or later.

{{< get-metrics-from-git "kubernetes_state_core" >}}

### Kubernetes state

**Note**: `kubernetes_state.*` metrics are gathered from the `kube-state-metrics` API. The `kubernetes_state` check is a legacy check. For an alternative, see [Kubernetes state metrics core][6]. Datadog recommends that you do not enable both checks simultaneously.

{{< get-metrics-from-git "kubernetes_state" >}}

### Kubernetes DNS

{{< get-metrics-from-git "kube_dns" >}}

### Kubernetes proxy

{{< get-metrics-from-git "kube_proxy" >}}

### Kubernetes API server

For more information, see the documentation for the [Kubernetes API server][3] integration.

{{< get-metrics-from-git "kube_apiserver_metrics" >}}

### Kubernetes controller manager

For more information, see the documentation for the [Kubernetes controller manager][2] integration.

{{< get-metrics-from-git "kube_controller_manager" >}}

### Kubernetes metrics server

For more information, see the documentation for the [Kubernetes metrics server][4] integration.

{{< get-metrics-from-git "kube_metrics_server" >}}

### Kubernetes scheduler

For more information, see the documentation for the [Kubernetes scheduler][5] integration.

{{< get-metrics-from-git "kube_scheduler" >}}


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

For more information, see the documentation for the [Kubelet][1] integration.

{{< get-service-checks-from-git "kubelet" >}}

### Kubernetes controller manager

For more information, see the documentation for the [Kubernetes controller manager][2] integration.

{{< get-service-checks-from-git "kube_controller_manager" >}}

### Kubernetes metrics server

For more information, see the documentation for the [Kubernetes metrics server][4] integration.

{{< get-service-checks-from-git "kube_metrics_server" >}}

### Kubernetes scheduler

For more information, see the documentation for the [Kubernetes scheduler][5] integration.

{{< get-service-checks-from-git "kube_scheduler" >}}

### Kubernetes state metrics core

For more information, see the documentation for the [Kubernetes state metrics core][6] integration.

`kubernetes_state.cronjob.complete`
: Whether the last job of the cronjob is failed or not. Tags:`kube_cronjob` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.cronjob.on_schedule_check`
: Alert if the cronjob's next schedule is in the past. Tags:`kube_cronjob` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.job.complete`
: Whether the job is failed or not. Tags:`kube_job` or `kube_cronjob` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.node.ready`
: Whether the node is ready. Tags:`node` `condition` `status`.

`kubernetes_state.node.out_of_disk`
: Whether the node is out of disk. Tags:`node` `condition` `status`.

`kubernetes_state.node.disk_pressure`
: Whether the node is under disk pressure. Tags:`node` `condition` `status`.

`kubernetes_state.node.network_unavailable`
: Whether the node network is unavailable. Tags:`node` `condition` `status`.

`kubernetes_state.node.memory_pressure`
: Whether the node network is under memory pressure. Tags:`node` `condition` `status`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/kubelet/
[2]: /integrations/kube_controller_manager/
[3]: /integrations/kube_apiserver_metrics/
[4]: /integrations/kube_metrics_server
[5]: /integrations/kube_scheduler
[6]: /integrations/kubernetes_state_core/