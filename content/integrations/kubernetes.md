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
doc_link: https://docs.datadoghq.com/integrations/kubernetes/
ddtype: check
---

{{< img src="integrations/kubernetes/k8sdashboard.png" alt="Kubernetes Dashboard" responsive="true" popup="true">}}

## Overview

Get metrics from kubernetes service in real time to:

* Visualize and monitor kubernetes states
* Be notified about kubernetes failovers and events.

For Kubernetes, it’s recommended to run the Agent in a DaemonSet. We have created a [Docker image](https://hub.docker.com/r/datadog/agent/) with both the Docker and the Kubernetes integrations enabled.

You can also just run the Datadog Agent on your host and configure it to gather your Kubernetes metrics.

## Setup Kubernetes

[Refer to the dedicated documentation to choose the perfect setup for your Kubernetes integration](/agent/kubernetes)


## Setup Kubernetes State
### Installation

To gather your kube-state metrics:

1. Download the [Kube-State manifests folder](https://github.com/kubernetes/kube-state-metrics/tree/master/kubernetes).

2. Apply them to your Kubernetes cluster:
  ```
  kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
  ```

### Validation
To verify the Datadog Agent is running in your environment as a daemonset, execute:

    kubectl get daemonset

If the Agent is deployed you will see similar output to the text below, where desired and current are equal to the number of running nodes in your cluster.

    NAME       DESIRED   CURRENT   NODE-SELECTOR   AGE
    datadog-agent   3         3         <none>          11h

## Setup Kubernetes DNS
### Configuration

Since [agent v6](/agent/v6), Kubernetes DNS integration works automatically with the [Autodiscovery](/agent/kubernetes/autodiscovery). 

## Data Collected
### Metrics
#### Kubernetes
{{< get-metrics-from-git "kubernetes" >}}

#### Kubernetes State
{{< get-metrics-from-git "kubernetes_state" >}}

#### Kubernetes DNS
{{< get-metrics-from-git "kube_dns" >}}

### Events

As the 5.17.0 release, Datadog Agent now supports built in [leader election option](/agent/kubernetes/event_collection) for the Kubernetes event collector. Once enabled, you no longer need to deploy an additional event collection container to your cluster. Instead, Agents will coordinate to ensure only one Agent instance is gathering events at a given time, events below will be available:

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

* [Can I install the Agent on my Kubernetes master node(s)](/integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s)
* [Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?](/integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250)
* [How to report host disk metrics when dd-agent runs in a docker container?](/agent/docker/getting_further)
* [Client Authentication against the apiserver and kubelet](/integrations/faq/client-authentication-against-the-apiserver-and-kubelet)
* [Gathering Kubernetes events](/integrations/faq/gathering-kubernetes-events)
* [Using RBAC permission with your Kubernetes integration](/integrations/faq/using-rbac-permission-with-your-kubernetes-integration)

## Further Reading
To get a better idea of how (or why) to integrate your Kubernetes service, check out our [series of blog posts](https://www.datadoghq.com/blog/monitoring-kubernetes-era/) about it.
