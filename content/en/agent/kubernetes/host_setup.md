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

There are two ways to collect logs from containers running in Kubernetes:

- Through the Docker socket.
- Through the Kubernetes log files.

Datadog recommends using the Kubernetes log files approach when you are either not using Docker, or are using more than 10 containers per pod.

Datadog also recommends that you take advantage of DaemonSets to [automatically deploy the Datadog Agent on all your nodes][4].
Otherwise, to manually enable log collection from one specific node, add the following parameters in the `datadog.yaml`:

```
logs_enabled: true
listeners:
  - name: kubelet
config_providers:
  - name: kubelet
    polling: true
logs_config:
  container_collect_all: true
```

[Restart the Agent][5].

Use [Autodiscovery with Pod Annotations][6] to configure log collection to add multiline processing rules, or to customize the `source` and `service` attributes.

## Further Reading
To get a better idea of how (or why) to integrate your Kubernetes service, see the related series of [Datadog blog posts][7].

[1]: https://github.com/kubernetes/kube-state-metrics/tree/master/examples/standard
[2]: /agent
[3]: /agent/autodiscovery
[4]: https://app.datadoghq.com/account/settings#agent/kubernetes
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/autodiscovery/integrations/?tab=kubernetes
[7]: https://www.datadoghq.com/blog/monitoring-kubernetes-era
