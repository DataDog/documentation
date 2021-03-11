---
title: Host Agent to monitor Kubernetes.
kind: faq
aliases:
    - /agent/kubernetes/host_setup
---

## Setup the Kubernetes state integration

If you decide to run your Agent on your host to monitor kubernetes, in order to start collecting your Kubernetes metrics you should:

1. [Install the Agent on your host][1]
2. Download the [Kube-State manifests folder][2].
3. Apply them to your Kubernetes cluster:

    ```shell
    kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
    ```

Once done, the Kubernetes State integration automatically collects kube-state metrics.

## Setup the kube-dns integration

### Configuration

Since [Agent v6][3], Kubernetes DNS integration works automatically with the [Autodiscovery][4].

Note: these metrics are unavailable for Azure Kubernetes Service (AKS).

## Collect container logs

**Available for Agent >6.0**

There are two ways to collect logs from containers running in Kubernetes:

- Through the Docker socket.
- Through the Kubernetes log files.

Datadog recommends using the Kubernetes log files approach when you are either not using Docker, or are using more than 10 containers per pod.

Datadog also recommends that you take advantage of DaemonSets to [automatically deploy the Datadog Agent on all your nodes][5].
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

[Restart the Agent][6].

Use [Autodiscovery with Pod Annotations][4] to configure log collection to add multiline processing rules, or to customize the `source` and `service` attributes.

## Further Reading

To get a better idea of how (or why) to integrate your Kubernetes service, see the related series of [Datadog blog posts][7].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/kubernetes/kube-state-metrics/tree/master/examples/standard
[3]: /agent/
[4]: /agent/kubernetes/integrations/
[5]: https://app.datadoghq.com/account/settings#agent/kubernetes
[6]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://www.datadoghq.com/blog/monitoring-kubernetes-era
