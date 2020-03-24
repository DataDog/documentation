---
title: Kubernetes Data Collected
kind: documentation
aliases:
 - /agent/kubernetes/metrics
---

## Metrics

Metrics collected by the Agent when deployed on your Kubernetes cluster:

### Kubernetes

{{< get-metrics-from-git "kubernetes" >}}

### Kubelet

{{< get-metrics-from-git "kubelet" >}}

### kube-state-metrics

Note that `kubernetes_state.*` metrics are gathered from the `kube-state-metrics` API.

{{< get-metrics-from-git "kubernetes_state" >}}

### kube-dns

{{< get-metrics-from-git "kube_dns" >}}

### Kubernetes Proxy

{{< get-metrics-from-git "kube_proxy" >}}

## Events

As the 5.17.0 release, Datadog Agent now supports built in [leader election option][9] for the Kubernetes event collector. Once enabled, you no longer need to deploy an additional event collection container to your cluster. Instead, Agents will coordinate to ensure only one Agent instance is gathering events at a given time, events below will be available:

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

## Service Checks

The Kubernetes check includes the following service checks:

- `kubernetes.kubelet.check`: <br>
    If `CRITICAL`, either `kubernetes.kubelet.check.ping` or `kubernetes.kubelet.check.syncloop` is in `CRITICAL` or `NO DATA` state.

- `kubernetes.kubelet.check.ping`:<br>
    If `CRITICAL` or `NO DATA`, Kubelet's API isn't available

- `kubernetes.kubelet.check.syncloop`:<br>
    If `CRITICAL` or `NO DATA`, Kubelet's sync loop that updates containers isn't working.

- `kubernetes_state.node.ready`:<br>
    Returns `CRITICAL` if a cluster node is not ready. Returns `OK` otherwise.

- `kubernetes_state.node.out_of_disk`:<br>
    Returns `CRITICAL` if a cluster node is out of disk space. Returns `OK` otherwise.

- `kubernetes_state.node.disk_pressure`:<br>
    Returns `CRITICAL` if a cluster node is in a disk pressure state. Returns `OK` otherwise.

- `kubernetes_state.node.memory_pressure`:<br>
    Returns `CRITICAL` if a cluster node is in a memory pressure state. Returns `OK` otherwise.

- `kubernetes_state.node.network_unavailable`:<br>
    Returns `CRITICAL` if a cluster node is in a network unavailable state. Returns `OK` otherwise.

- `kubernetes_state.cronjob.on_schedule_check`:<br>
    Returns `CRITICAL` if a cron job scheduled time is in the past. Returns `OK` otherwise.
