---
title: Kubernetes
kind: documentation
aliases:
    - /guides/basic_agent_usage/kubernetes
    - /agent/basic_agent_usage/kubernetes
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

## Installation

To gather metrics, traces, and logs from your Kubernetes clusters, there are two options:

1. [Container installation][2] (**recommended**) -  The Agent runs inside a Pod. This implementation is sufficient for the majority of use cases, but note that it does not grant visibility into components of the system that exist outside Kubernetes. This method also does not monitor the starting phase of your Kubernetes cluster.
2. [Host installation][3] (optional) - Installing the Agent on the host provides additional visibility into your ecosystem, independent of Kubernetes.

## RBAC

In the context of using the Kubernetes integration, and when deploying Agents in a Kubernetes cluster, a set of rights are required for the Agent to integrate seamlessly.

You must allow the Agent to perform a few actions:

- `get` and `update` the `Configmaps` named `datadogtoken` to update and query the most up-to-date version token corresponding to the latest event stored in ETCD.
- `list` and `watch` the `Events` to pull the events from the API Server, format, and submit them.
- `get`, `update`, and `create` for the `Endpoint`. The Endpoint used by the Agent for the [Leader election][4] feature is named `datadog-leader-election`.
- `list` the `componentstatuses` resource, in order to submit service checks for the Control Plane's components status.

You can find the templates in `manifests/rbac` in the [datadog-agent GitHub repository][5]. This creates a Service Account in the default namespace, a Cluster Role with the above rights, and a Cluster Role Binding.

## Custom Integrations

For details on the usage of ConfigMaps in Kubernetes, consult [Datadog's Kubernetes Custom Integrations documentation][6].

## Troubleshooting

* [Can I install the Agent on my Kubernetes master node(s)][7]
* [Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?][8]
* [How to report host disk metrics when dd-agent runs in a docker container?][9]
* [Client Authentication against the apiserver and kubelet][10]
* [Using RBAC permission with your Kubernetes integration][11]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/legacy
[2]: /agent/kubernetes/daemonset_setup
[3]: /agent/kubernetes/host_setup
[4]: /agent/kubernetes/event_collection#leader-election
[5]: https://github.com/DataDog/datadog-agent/tree/0bef169d4e80e838ec6b303f5ad1da716b424b0f/Dockerfiles/manifests/rbac
[6]: /agent/kubernetes/integrations
[7]: /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[8]: /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[9]: /agent/faq/getting-further-with-docker
[10]: /integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[11]: /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
