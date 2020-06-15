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

HostPort is not supported on Kubernetes. Therefore, APM only works when pod-to-pod networking is configured between the tracer and the Agent. DogStatsD only works when pod-to-pod networking is configured between the DogStatsD client library and the Agent. Refer to the [Microsoft Kubernetes HostPort documentation][1] for more information.

Some Kubelet metrics are not available on GKE. They are available on EKS/AKS starting in Datadog Agent v7.19.2. **Note**: Kubelet checks take between 8 and 10 seconds to run.

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


[1]: https://docs.microsoft.com/en-us/virtualization/windowscontainers/kubernetes/common-problems#hostport-publishing-is-not-working
