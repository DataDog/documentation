---
integration_title: Kubernetes
name: kubernetes
kind: integration
git_integration_title: kubernetes
newhlevel: true
updated_for_agent: 6.0
description: "Monitor the health of your Kubernetes cluster and the applications running on it. Capture Pod scheduling events, track the status of your Kubelets, and more."
is_public: true
aliases:
    - /tracing/api/
    - /integrations/kubernetes_state/
public_title: Datadog-Kubernetes Integration
short_description: "Capture Pod scheduling events, track the status of your Kublets, and more"
categories:
- cloud
- configuration & deployment
- containers
- orchestration
- log collection
doc_link: https://docs.datadoghq.com/integrations/kubernetes/
ddtype: check
---

{{< img src="integrations/kubernetes/k8sdashboard.png" alt="Kubernetes Dashboard" responsive="true" popup="true">}}

## Overview

Get metrics and logs from kubernetes service in real time to:

* Visualize and monitor kubernetes states
* Be notified about kubernetes failovers and events.

For Kubernetes, it’s recommended to run the Agent in a DaemonSet. We have created a [Docker image][1] with both the Docker and the Kubernetes integrations enabled.

You can also just run the Datadog Agent on your host and configure it to gather your Kubernetes metrics.

## Setup Kubernetes

[Refer to the dedicated documentation to choose the perfect setup for your Kubernetes integration][2]

## Setup Kubernetes State
### Installation

To gather your kube-state metrics:

1. Download the [Kube-State manifests folder][3].

2. Apply them to your Kubernetes cluster:
  ```
  kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
  ```

## Setup Kubernetes DNS
### Configuration

Since [Agent v6][4], Kubernetes DNS integration works automatically with the [Autodiscovery][5].

## Collect container logs

**Available for Agent >6.0**

Two installations are possible:

- On the node where the agent is external to the Docker environment
- Deployed with its containerized version in the Docker environment

Take advantage of DaemonSets to [automatically deploy the Datadog Agent on all your nodes][14]. Otherwise follow the [container log collection steps][15] to start collecting logs from all your containers.

## Data Collected
### Metrics
#### Kubernetes
{{< get-metrics-from-git "kubernetes" >}}

#### Kubernetes State
{{< get-metrics-from-git "kubernetes_state" >}}

#### Kubernetes DNS
{{< get-metrics-from-git "kube_dns" >}}

### Events

As the 5.17.0 release, Datadog Agent now supports built in [leader election option][6] for the Kubernetes event collector. Once enabled, you no longer need to deploy an additional event collection container to your cluster. Instead, Agents will coordinate to ensure only one Agent instance is gathering events at a given time, events below will be available:

* Backoff
* Conflict
* Delete
* DeletingAllPods
* Didn't have enough resource
* Error
* Failed
* FailedCreate
* FailedDelete
* FailedMount
* FailedSync
* Failedvalidation
* FreeDiskSpaceFailed
* HostPortConflict
* InsufficientFreeCPU
* InsufficientFreeMemory
* InvalidDiskCapacity
* Killing
* KubeletsetupFailed
* NodeNotReady
* NodeoutofDisk
* OutofDisk
* Rebooted
* TerminatedAllPods
* Unable
* Unhealthy

### Service Checks

The Kubernetes check includes the following service checks:

* `kubernetes.kubelet.check`:
  If `CRITICAL`, either `kubernetes.kubelet.check.ping` or `kubernetes.kubelet.check.syncloop` is in `CRITICAL` or `NO DATA` state.

* `kubernetes.kubelet.check.ping`:
  If `CRITICAL` or `NO DATA`, Kubelet's API isn't available

* `kubernetes.kubelet.check.syncloop`:
  If `CRITICAL` or `NO DATA`, Kubelet's sync loop that updates containers isn't working.

## Troubleshooting

* [Can I install the Agent on my Kubernetes master node(s)][7]
* [Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?][8]
* [How to report host disk metrics when dd-agent runs in a docker container?][9]
* [Client Authentication against the apiserver and kubelet][10]
* [Gathering Kubernetes events][11]
* [Using RBAC permission with your Kubernetes integration][12]

## Further Reading
To get a better idea of how (or why) to integrate your Kubernetes service, check out our [series of blog posts][13] about it.

[1]: https://hub.docker.com/r/datadog/agent/
[2]: /agent/basic_agent_usage/kubernetes
[3]: https://github.com/kubernetes/kube-state-metrics/tree/master/kubernetes
[4]: /agent/
[5]: /agent/autodiscovery
[6]: /agent/basic_agent_usage/kubernetes/#event_collection
[7]: /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[8]: /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[9]: /agent/faq/getting-further-with-docker
[10]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[11]: /integrations/faq/gathering-kubernetes-events
[12]: /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[13]: https://www.datadoghq.com/blog/monitoring-kubernetes-era/
[14]: https://app.datadoghq.com/account/settings#agent/kubernetes
[15]: https://docs.datadoghq.com/logs/log_collection/docker/#setup
