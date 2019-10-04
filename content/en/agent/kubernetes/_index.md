---
title: Kubernetes
kind: documentation
aliases:
    - /guides/basic_agent_usage/kubernetes
    - /agent/basic_agent_usage/kubernetes
    - /tracing/kubernetes/
    - /tracing/setup/kubernetes
further_reading:
- link: "agent/kubernetes/daemonset_setup"
  tag: "documentation"
  text: "Kubernetes DaemonSet Setup"
- link: "agent/kubernetes/host_setup"
  tag: "documentation"
  text: "Kubernetes Host Setup"
- link: "agent/kubernetes/metrics"
  tag: "documentation"
  text: "Kubernetes Metrics"
- link: "agent/kubernetes/legacy"
  tag: "documentation"
  text: "Kubernetes Legacy Versions"

---

**Note**: Agent version 6.0 and above only support versions of Kubernetes higher than 1.7.6. For prior versions of Kubernetes, consult the [Legacy Kubernetes versions section][1].

There are a number of different ways to monitor your Kubernetes system using Datadog. Choosing one depends on how your system is structured and the type of monitoring you desire. There are four options for installing the Datadog Agent for Kubernetes: DaemonSets, Helm charts, installing the Agent directly on the host, and the Datadog Cluster Agent.

## Installation

To gather metrics, traces, and logs from your Kubernetes clusters, there are four options:

* [Container installation][2] (**recommended**) -  The Agent runs inside a Pod. This implementation is sufficient for the majority of use cases, but does not monitor the starting phase of your Kubernetes cluster.
* [Helm installation][3] - [Helm][4] is a package manager for Kubernetes that allows you to easily install the Datadog Agent and enable its various capabilities.
* [Host installation][5] - If the kubelet runs into an issue, and the Agent as a container dies, you will lose visibility into the node. However, if the Agent runs *on* the node, you can monitor the kubelet throughout its lifecycle. If this is a significant concern for you, install the Agent as a host.
* [Cluster Agent][6] - For systems with very large Kubernetes clusters, the Datadog Cluster Agent can help to alleviate server load.

**Note**: Only one Datadog Agent shound run on each node; a sidecar per pod is not generally recommended and may not function as expected.

## RBAC

In the context of using the Kubernetes integration, and when deploying Agents in a Kubernetes cluster, a set of rights are required for the Agent to integrate seamlessly.

You must allow the Agent to perform a few actions:

- `get` and `update` the `Configmaps` named `datadogtoken` to update and query the most up-to-date version token corresponding to the latest event stored in ETCD.
- `list` and `watch` the `Events` to pull the events from the API Server, format, and submit them.
- `get`, `update`, and `create` for the `Endpoint`. The Endpoint used by the Agent for the [Leader election][7] feature is named `datadog-leader-election`.
- `list` the `componentstatuses` resource, in order to submit service checks for the Control Plane's components status.

You can find the templates in `manifests/rbac` in the [datadog-agent GitHub repository][8]. This creates a Service Account in the default namespace, a Cluster Role with the above rights, and a Cluster Role Binding.

## Custom Integrations

For details on the usage of ConfigMaps in Kubernetes, consult [Datadog's Kubernetes Custom Integrations documentation][9].

## Troubleshooting

* [Can I install the Agent on my Kubernetes master node(s)][10]
* [Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?][11]
* [Client Authentication against the apiserver and kubelet][12]
* [Using RBAC permission with your Kubernetes integration][13]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/legacy
[2]: /agent/kubernetes/daemonset_setup
[3]: /agent/kubernetes/helm
[4]: https://helm.sh
[5]: /agent/kubernetes/host_setup
[6]: /agent/kubernetes/cluster
[7]: /agent/kubernetes/event_collection#leader-election
[8]: https://github.com/DataDog/datadog-agent/tree/0bef169d4e80e838ec6b303f5ad1da716b424b0f/Dockerfiles/manifests/rbac
[9]: /agent/kubernetes/integrations
[10]: /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[11]: /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[12]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[13]: /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
