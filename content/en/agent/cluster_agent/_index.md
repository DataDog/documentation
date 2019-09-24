---
title: Datadog Cluster Agent for Kubernetes
kind: documentation
aliases:
- /agent/kubernetes/cluster/
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
- link: "agent/kubernetes/integrations"
  tag: "Documentation"
  text: "Custom Integrations"
- link: "https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/GETTING_STARTED.md#troubleshooting"
  tag: "Github"
  text: "Troubleshooting the Datadog Cluster Agent"
---

The Datadog Cluster Agent provides a streamlined, centralized approach to collecting cluster-level monitoring data. By acting as a proxy between the API server and node-based Agents, the Cluster Agent helps to alleviate server load. It also relays cluster-level metadata to node-based Agents, allowing them to enrich the metadata of locally collected metrics.

Using the Datadog Cluster Agent helps you to:

* alleviate the impact of Agents on your infrastructure.
* isolate node-based Agents to their respective nodes, reducing RBAC rules to solely read metrics and metadata from the kubelet.
* leverage horizontal pod autoscaling with custom Kubernetes metrics. Refer to [the dedicated guide][1] for more details about this feature.

**Note**: To leverage all features from the Datadog Cluster Agent, you must run Kubernetes v1.10+.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: 
