---
title: Event Collection
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-cluster-agent/"
  tag: "Blog"
  text: "Introducing the Datadog Cluster Agent"
- link: "https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/"
  tag: "Blog"
  text: "Autoscale your Kubernetes workloads with any Datadog metric"
- link: "/agent/cluster_agent/clusterchecks/"
  tag: "Documentation"
  text: "Running Cluster Checks with Autodiscovery"
- link: "/agent/kubernetes/daemonset_setup/"
  tag: "Documentation"
  text: "Kubernetes DaemonSet Setup"
- link: "/agent/cluster_agent/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting the Datadog Cluster Agent"
---

If you haven't yet, review the [setup instructions to install the Datadog Cluster Agent][1] and enable event collection.

1. Disable leader election in your Datadog Node Agent Daemonset by setting the `leader_election` variable or `DD_LEADER_ELECTION` environment variable to `false`.

2. In your Cluster Agent deployment file, set the `DD_COLLECT_KUBERNETES_EVENTS` and `DD_LEADER_ELECTION` environment variable to `true`:

      ```yaml
        - name: DD_COLLECT_KUBERNETES_EVENTS
          value: "true"
        - name: DD_LEADER_ELECTION
          value: "true"
      ```

Enabling the leader election in this way ensures that only one Cluster Agent collects the events.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/cluster_agent/setup/
