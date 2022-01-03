---
title: Cluster metadata provider
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

To enable the cluster metadata provider feature:

1. Ensure the Node Agents and the Datadog Cluster Agent [can properly communicate][1].
2. Create a [Cluster Agent service][2] in front of the Datadog Cluster Agent.
3. [Ensure an auth_token is properly shared between the Agents][1].
4. [Confirm the RBAC rules are properly set][1].
5. In the Node Agent, set the environment variable `DD_CLUSTER_AGENT_ENABLED` to `true`.
6. *Optional* - The environment variable `DD_KUBERNETES_METADATA_TAG_UPDATE_FREQ` can be set to specify how often the Node Agents ping the Datadog Cluster Agent.
7. *Optional* - Disable the Kubernetes metadata tag collection with `DD_KUBERNETES_COLLECT_METADATA_TAGS=false`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/cluster_agent/troubleshooting/
[2]: /agent/cluster_agent/setup/#step-3-create-the-cluster-agent-and-its-service
