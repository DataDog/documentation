---
title: Kubernetes Host Setup
kind: documentation
further_reading:
- link: "agent/autodiscovery"
  tag: "documentation"
  text: Docker Agent Autodiscovery
- link: "agent/kubernetes/host_setup"
  tag: "documentation"
  text: "Kubernetes Host Setup"
- link: "agent/kubernetes/integrations"
  tag: "documentation"
  text: "Custom Integrations"
---

Installing the Agent directly on your host (rather than having the Agent run in a Pod) provides additional visibility into your ecosystem, independent of Kubernetes.

To gather your kube-state metrics:

1. Download the [Kube-State manifests folder][3].

2. Apply them to your Kubernetes cluster:
  ```
  kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
  ```

## Setup the kube-dns integration
### Configuration

Since [Agent v6][4], Kubernetes DNS integration works automatically with the [Autodiscovery][5].

Note: these metrics are unavailable for Azure Kubernetes Service (AKS) at this point in time.  

## Collect container logs

**Available for Agent >6.0**

Two installations are possible:

- On the node where the Agent is external to the Docker environment
- Deployed with its containerized version in the Docker environment

Take advantage of DaemonSets to [automatically deploy the Datadog Agent on all your nodes][14]. Otherwise follow the [container log collection steps][15] to start collecting logs from all your containers.

## Further Reading
To get a better idea of how (or why) to integrate your Kubernetes service, check out [Datadog series of blog posts][13] about it.

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
[15]: https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#log-collection-setup