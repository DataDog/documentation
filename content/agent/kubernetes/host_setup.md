---
title: Kubernetes Host Setup
kind: documentation
further_reading:
- link: "agent/autodiscovery"
  tag: "documentation"
  text: "Docker Agent Autodiscovery"
- link: "agent/kubernetes/host_setup"
  tag: "documentation"
  text: "Kubernetes Host Setup"
- link: "agent/kubernetes/integrations"
  tag: "documentation"
  text: "Custom Integrations"
---

Installing the Agent directly on your host (rather than having the Agent run in a Pod) provides additional visibility into your ecosystem, independent of Kubernetes.

To gather your kube-state metrics:

1. Download the [Kube-State manifests folder][1].

2. Apply them to your Kubernetes cluster:
  ```
  kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
  ```

## Setup the kube-dns integration
### Configuration

Since [Agent v6][2], Kubernetes DNS integration works automatically with the [Autodiscovery][3].

Note: these metrics are unavailable for Azure Kubernetes Service (AKS).

## Collect container logs

**Available for Agent >6.0**

Two installations are possible:

- On the node where the Agent is external to the Docker environment
- Deployed with its containerized version in the Docker environment

Take advantage of DaemonSets to [automatically deploy the Datadog Agent on all your nodes][4]. Otherwise follow the [container log collection steps][5] to start collecting logs from all your containers.

## Further Reading
To get a better idea of how (or why) to integrate your Kubernetes service, see the related series of [Datadog blog posts][6].

[1]: https://github.com/kubernetes/kube-state-metrics/tree/master/kubernetes
[2]: /agent
[3]: /agent/autodiscovery
[4]: https://app.datadoghq.com/account/settings#agent/kubernetes
[5]: /agent/basic_agent_usage/kubernetes/#log-collection-setup
[6]: https://www.datadoghq.com/blog/monitoring-kubernetes-era
