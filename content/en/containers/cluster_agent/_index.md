---
title: Cluster Agent for Kubernetes
description: Centralized approach to collecting cluster-level monitoring data with the Datadog Cluster Agent
aliases:
- /agent/kubernetes/cluster/
- /agent/cluster_agent/
- /containers/cluster_agent/event_collection
- /containers/cluster_agent/metadata_provider
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-cluster-agent/"
  tag: "Blog"
  text: "Introducing the Datadog Cluster Agent"
- link: "https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/"
  tag: "Blog"
  text: "Autoscale your Kubernetes workloads with any Datadog metric"
- link: "https://www.datadoghq.com/blog/datadog-csi-driver/"
  tag: "Blog"
  text: "Bring high-performance observability to secure Kubernetes environments with Datadog's CSI driver"
---

## Overview

The Datadog Cluster Agent provides a streamlined, centralized approach to collecting cluster level monitoring data. By acting as a proxy between the API server and node-based Agents, the Cluster Agent helps to alleviate server load. It also relays cluster level metadata to node-based Agents, allowing them to enrich the metadata of locally collected metrics.

Using the Datadog Cluster Agent allows you to:

* Alleviate the impact of Agents on your infrastructure.
* Isolate node-based Agents to their respective nodes, reducing RBAC rules to solely read metrics and metadata from the kubelet.
* Provide cluster level metadata that can only be found in the API server to the Node Agents, in order for them to enrich the metadata of the locally collected metrics.
* Enable the collection of cluster level data, such as the monitoring of services or SPOF and events.
* Use Horizontal Pod Autoscaling (HPA) with custom Kubernetes metrics and external metrics. See the [Autoscaling on custom and external metrics guide][1] for more details.

If you installed the Datadog Agent using Helm chart v2.7.0 or Datadog Operator v1.0.0+, the **Datadog Cluster Agent is enabled by default**.

Datadog publishes container images to the Datadog Container Registry, Google Artifact Registry (GAR), Amazon ECR, Azure ACR, and Docker Hub:

{{% container-images-table %}}

{{% container-registry-info %}}

<div class="alert alert-info">The Helm chart and Datadog Operator will default to the Datadog Container Registry (<code>registry.datadoghq.com</code>) in a future release.</div>

### Minimum Agent and Cluster Agent versions

For optimal compatibility Datadog recommends to keep your Cluster Agent and Agent on matching versions. For a full support matrix of Kubernetes versions and Datadog versions see the [Kubernetes installation page][2].

{{< whatsnext desc="This section includes the following topics:">}}
    {{< nextlink href="/agent/cluster_agent/setup" >}}<u>Setup</u>: Setup the Datadog Cluster Agent in your Kubernetes Cluster.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/commands" >}}<u>Commands & Options</u>: List of all commands and options available for the Cluster Agent.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/clusterchecks" >}}<u>Cluster Checks</u>: Cluster checks provide the ability to Autodiscover and perform checks on load-balanced cluster services like Kubernetes services.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/endpointschecks" >}}<u>Endpoint Checks</u>: Endpoint checks extend cluster checks to monitor any endpoint behind cluster services.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/admission_controller" >}}<u>Admission Controller</u>: Configure the Admission Controller for simplified application Pod configuration.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/troubleshooting" >}}<u>Cluster Agent Troubleshooting</u>: Find troubleshooting information for the Datadog Cluster Agent.{{< /nextlink >}}
{{< /whatsnext >}}

## Monitoring the Cluster Agent
The Datadog Agent includes an integration that automatically monitors the Cluster Agent. The integration runs on the regular Datadog Agent pod that is on the same node as the Cluster Agent. It will not run in the Cluster Agent itself. Refer to the [Datadog Cluster Agent integration documentation][3] for details.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/guide/cluster_agent_autoscaling_metrics
[2]: /containers/kubernetes/installation#minimum-kubernetes-and-datadog-agent-versions
[3]: https://docs.datadoghq.com/integrations/datadog_cluster_agent/
