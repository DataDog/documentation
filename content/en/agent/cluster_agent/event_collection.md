---
title: Event collection
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-cluster-agent/"
  tag: "Blog"
  text: "Introducing the Datadog Cluster Agent"
- link: "https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/"
  tag: "Blog"
  text: "Autoscale your Kubernetes workloads with any Datadog metric"
- link: "/agent/autodiscovery/clusterchecks"
  tag: "Documentation"
  text: "Running Cluster Checks with Autodiscovery"
- link: "agent/kubernetes/daemonset_setup"
  tag: "Documentation"
  text: "Kubernetes DaemonSet Setup"
- link: "/agent/cluster_agent/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting the Datadog Cluster Agent"
---

In order to collect events, you need the following environment variables in your `datadog-agent.yaml` manifest:

```
          - name: DD_COLLECT_KUBERNETES_EVENTS
            value: "true"
          - name: DD_LEADER_ELECTION
            value: "true"
```
Enabling the leader election ensures that only one Agent collects the events.

**Note**: You must disable leader election in the Datadog Agent on your nodes before enabling leader election in the Datadog Cluster Agent. Otherwise, leader election may fail and some features such as the external metrics provider or the cluster level checks may not work.

#### Cluster metadata provider

In the Node Agent, set the environment variable `DD_CLUSTER_AGENT_ENABLED` to true.

The environment variable `DD_KUBERNETES_METADATA_TAG_UPDATE_FREQ` can be set to specify how often the Node Agents hit the Datadog Cluster Agent.

Disable the Kubernetes metadata tag collection with `DD_KUBERNETES_COLLECT_METADATA_TAGS`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
