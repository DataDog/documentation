---
title: Windows Containers Issues
kind: documentation
further_reading:
- link: "/agent/docker/?tab=windows"
  tag: "Documentation"
  text: Docker Agent
- link: "/agent/kubernetes/"
  tag: "Documentation"
  text: Kubernetes Agent
- link: "/agent/troubleshooting/"
  tag: "Agent Troubleshooting"
  text: "Agent Troubleshooting"
---

This page describes known and open issues for Containerized Windows Applications Monitoring.

## Common issues

Containerized Windows Applications Monitoring requires Datadog Agent 7.19+.

The supported OS versions are Windows Server 2019 (LTSC) and version 1909 (SAC).

Hyper-V isolation mode is not supported.

Host metrics for disk, IO, and network are disabled. They are not supported by Windows Server, hence the Agent Checks are disabled by default.

## Docker issues

Live processes do not appear in containers (except for the Datadog Agent).

## Kubernetes issues

Live processes do not appear in containers (except for the Datadog Agent).

### Mixed clusters (Linux + Windows)

The recommended way of deploying the Datadog Agent on a mixed cluster is to perform two installations of our Helm chart with a different `targetSystem`.

The Datadog Agent uses a `nodeSelector` to automatically select Linux or Windows nodes based on `targetSystem`.

However it's not the case for Kube State Metrics (which is installed by default), leading to situations where Kube State Metrics cannot be scheduled on Windows nodes.

Three options are available to avoid this issue:

* Taint your Windows nodes. On Windows, the Agent always allows the `node.kubernetes.io/os=windows:NoSchedule` taint.
* Set Kube State Metrics node selector through Datatog Helm chart `values.yaml`:

```
kube-state-metrics:
  nodeSelector:
    beta.kubernetes.io/os: linux // Kubernetes < 1.14
    kubernetes.io/os: linux // Kubernetes >= 1.14
```

* Deploy Kube State Metrics yourself separately by setting `datadog.kubeStateMetricsEnabled` to `false`.

**Note**: When using two Datadog installations (one with `targetSystem: linux`, one with `targetSystem: windows`), make sure the second one has `datadog.kubeStateMetricsEnabled` set to `false` to avoid deploying two instances of Kube State Metrics.

### HostPort for APM or DogStatsD

`HostPort` is partially supported on Kubernetes, depending on the underlying OS version and CNI plugin.
Requirements to have `HostPort` working are the following:

* Windows Server version must be >= 1909
* CNI plugin must support `portMappings` capability

Currently, at least two CNI plugins support this capability:

* Official `win-bridge` plugin (version >= 0.8.6) - used by GKE
* Azure CNI Plugin - used by AKS

If your setup does not meet these requirements, APM and DogStatsD will only work when pod-to-pod networking is configured between the Tracer and the Agent.

### Kubelet check

Depending on your Kubernetes version, some Kubelet metrics might not be available (or Kubelet check might timeout).
For optimal experience, please use any of the following:

* Kubelet >= 1.16.13 (1.16.11 on GKE)
* Kubelet >= 1.17.9 (1.17.6 on GKE)
* Kubelet >= 1.18.6
* Kubelet >= 1.19

With Agent version >= 7.19.2

Please note that not all `kubernetes.*` are available on Windows, you can find the list of available ones below:

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
