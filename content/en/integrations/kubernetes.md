---
integration_title: Kubernetes
name: kubernetes
kind: integration
git_integration_title: kubernetes
newhlevel: true
updated_for_agent: 6.0
description: 'Monitor the health of your Kubernetes cluster and the applications running on it. Capture Pod scheduling events, track the status of your Kubelets, and more.'
is_public: true
aliases:
    - /tracing/api
    - /integrations/kubernetes_state
    - /integrations/kube_proxy
    - /integrations/Kubernetes
    - /agent/kubernetes/host_setup
public_title: Datadog-Kubernetes Integration
short_description: 'Capture Pod scheduling events, track the status of your Kublets, and more'
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/kubernetes.md']
categories:
    - cloud
    - configuration & deployment
    - containers
    - orchestration
    - log collection
doc_link: /integrations/kubernetes/
ddtype: check
---

{{< img src="integrations/kubernetes/k8sdashboard.png" alt="Kubernetes Dashboard"  >}}

## Overview

Get metrics and logs from kubernetes service in real time to:

- Visualize and monitor kubernetes states
- Be notified about kubernetes failovers and events.

For Kubernetes, it's recommended to run the Agent in a DaemonSet. We have created a [Docker image][1] with both the Docker and the Kubernetes integrations enabled.

You can also just run the Datadog Agent on your host and configure it to gather your Kubernetes metrics.

## Setup Kubernetes

[Refer to the dedicated documentation to choose the perfect setup for your Kubernetes integration][2]

## Setup Kubernetes State

### Installation

To gather your kube-state metrics:

1. Download the [Kube-State manifests folder][3].

2. Apply them to your Kubernetes cluster:

```shell
kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
```

Once done, the Kubernetes State integration automatically collects kube-state metrics.

## Setup Kubernetes DNS

### Configuration

Since [Agent v6][4], Kubernetes DNS integration works automatically with the [Autodiscovery][5].

Note: these metrics are unavailable for Azure Kubernetes Service (AKS) at this point in time.

## Collect container logs

**Available for Agent >6.0**

There are two ways to collect logs from containers running in Kubernetes:

- Through the Docker socket.
- Through the Kubernetes log files.

Datadog recommends using the Kubernetes log files approach when you are either not using Docker, or are using more than 10 containers per node.

Datadog also recommends that you take advantage of DaemonSets to [automatically deploy the Datadog Agent on all your nodes][6].
Otherwise, to manually enable log collection from one specific node, add the following parameters in the `datadog.yaml`:

```yaml
logs_enabled: true
listeners:
  - name: kubelet
config_providers:
  - name: kubelet
    polling: true
logs_config:
  container_collect_all: true
```

[Restart the Agent][7].

Use [Autodiscovery with Pod Annotations][8] to configure log collection to add multiline processing rules, or to customize the `source` and `service` attributes.

## Data Collected

### Metrics

#### Kubernetes

{{< get-metrics-from-git "kubernetes" >}}

#### Kubelet

{{< get-metrics-from-git "kubelet" >}}

#### Kubernetes State

Note that `kubernetes_state.*` metrics are gathered from the `kube-state-metrics` API.

{{< get-metrics-from-git "kubernetes_state" >}}

#### Kubernetes DNS

{{< get-metrics-from-git "kube_dns" >}}

#### Kubernetes Proxy

{{< get-metrics-from-git "kube_proxy" >}}

### Events

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

### Service Checks

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

## Troubleshooting

- [Can I install the Agent on my Kubernetes master node(s)][10]
- [Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?][11]
- [How to report host disk metrics when dd-agent runs in a docker container?][12]
- [Client Authentication against the apiserver and kubelet][13]
- [Using RBAC permission with your Kubernetes integration][14]

## Further Reading

To get a better idea of how (or why) to integrate your Kubernetes service, check out Datadog's [series of blog posts][15] about it.

[1]: https://hub.docker.com/r/datadog/agent
[2]: /agent/basic_agent_usage/kubernetes
[3]: https://github.com/kubernetes/kube-state-metrics/tree/master/examples/standard
[4]: /agent
[5]: /agent/autodiscovery
[6]: https://app.datadoghq.com/account/settings#agent/kubernetes
[7]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: /agent/autodiscovery/integrations/?tab=kubernetes
[9]: /agent/basic_agent_usage/kubernetes/#event_collection
[10]: /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[11]: /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[12]: /agent/faq/getting-further-with-docker
[13]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[14]: /agent/kubernetes/daemonset_setup/#configure-rbac-permissions
[15]: https://www.datadoghq.com/blog/monitoring-kubernetes-era
