---
title: Orchestrator Explorer
kind: documentation
---

{{< img src="infrastructure/livecontainers/orch_ex.png" alt="Orchestrator Explorer, showing Kubernetes Pods." style="width:80%;">}}

## Overview

The Datadog Agent and Cluster Agent can retrieve Kubernetes resources for the [Orchestrator Explorer][1]. This feature allows you to monitor the state of pods, deployments, and other Kubernetes concepts in a specific namespace or availability zone, view resource specifications for failed pods within a deployment, correlate node activity with related logs, and more.

Orchestrator Explorer requires **Agent version >= 7.27.0** and **Cluster Agent version >= 1.11.0**.

**Note**: For Kubernetes version 1.25 and above, the minimal Cluster Agent version required is 7.40.0.

## Setup

Ensure that you have [enabled the Process Agent][2]. If you are using Datadog Operator or the official Helm chart, the Orchestrator Explorer is enabled by default.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

The Orchestrator Explorer is enabled in the Datadog Operator by default.

For verification, ensure that the `features.orchestratorExplorer.enabled` parameter is set to `true` in your `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    orchestratorExplorer:
      enabled: true
```

{{% /tab %}}
{{% tab "Helm" %}}

If you are using the [official Helm chart][3], Orchestrator Explorer is enabled by default.

For verification, ensure that the `orchestratorExplorer.enabled` parameter is set to `true` in your [`values.yaml`][4] file:

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

Then, upgrade your Helm chart.

[3]: https://github.com/DataDog/helm-charts
[4]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Manual" %}}
For manual setup, see [Set up Orchestrator Explorer with DaemonSet][5].

[5]: /infrastructure/faq/set-up-orchestrator-explorer-daemonset
{{% /tab %}}
{{< /tabs >}}

## Usage

### Views

Toggle among the **Pods**, **Clusters**, **Namespaces**, and other Kubernetes resources in the **Select Resources** dropdown menu in the top left corner of the page.

Each of these views includes a data table to help you better organize your data by field such as status, name, and Kubernetes labels, and a detailed Cluster Map to give you a bigger picture of your pods and Kubernetes clusters.

{{< img src="infrastructure/livecontainers/orch_ex_replicasets.png" alt="Orchestrator Explorer opened to show Workloads > Replica Sets, in Summary mode" style="width:80%;">}}

### Group by functionality and facets

Group pods by tags or Kubernetes labels to get an aggregated view which allows you to find information quicker. You can perform a group by using the "Group by" bar on the top right of the page or by clicking on a particular tag or label and locating the group by function in the context menu as shown below.

{{< img src="infrastructure/livecontainers/orch_ex_groupby.png" alt="An example of grouping by team" style="width:80%;">}}

You can also use facets on the left hand side of the page to group resources or filter for resources you care most about, such as pods with a CrashLoopBackOff pod status.

{{< img src="infrastructure/livecontainers/crashloopbackoff.mp4" alt="An example of grouping the CrashLoopBackOff pod status" video=true style="width:80%;">}}

### Cluster map

A cluster map gives you a bigger picture of your pods and Kubernetes clusters. You can see all of your resources together on one screen with customized groups and filters, and choose which metrics to fill the color of the pods by.

Examine resources from cluster maps by clicking on any circle or group to populate a detailed panel.

You can see all of your resources together on one screen with customized groups and filters, and choose which metrics to fill the color of the pods by.

{{< img src="infrastructure/livecontainers/cluster-map.mp4" alt="A cluster map with customized groups and filters" video=true style="width:80%;">}}

### Information panel

Click on any row in the table or on any object in a Cluster Map to view information about a specific resource in a side panel.

{{< img src="infrastructure/livecontainers/orch_ex_panel.png" alt="A view of resources in the side panel, opened to processes." style="width:80%;">}}

The side panel's **YAML** tab shows the full resource definition. Starting in **Agent version 7.44.0**, it also includes seven days of definition history. You can compare what changed over time and across different versions. The time indicated is approximately when the changes were applied to the YAML.

To prevent displaying a large number of irrelevant changes, updates affecting only the following fields are ignored:

* metadata.resourceVersion
* metadata.managedFields
* metadata.generation
* status

{{< img src="infrastructure/livecontainers/orch_ex_manifest_history.png" alt="A view of resources in the side panel, showing the yaml history feature" style="width:80%;">}}

The other tabs show more information for troubleshooting the selected resource:

* [**Logs**][9]: View logs from your container or resource. Click on any log to view related logs in Logs Explorer.
* [**APM**][11]: View traces from your container or resource, including the date, service, duration, method, and status code of a trace.
* [**Metrics**][10]: View live metrics for your container or resource. You can view any graph full screen, share a snapshot of it, or export it from this tab.
* **Processes**: View all processes running in the container of this resource.
* **Network**: View a container or resource's network performance, including source, destination, sent and received volume, and throughput fields. Use the **Destination** field to search by tags like `DNS` or `ip_type`, or use the **Group by** filter in this view to group network data by tags, like `pod_name` or `service`.
* [**Events**][12]: View all Kubernetes events for your resource.
* **Monitors**: View monitors tagged, scoped, or grouped for this resource.

For a detailed dashboard of this resource, click the View Dashboard in the top right corner of this panel.

{{< img src="infrastructure/livecontainers/view-pod-dashboard.png" alt="A link to a pod dashboard from Live Containers overview" style="width:80%;">}}

### Resource utilization

_For the Resource Utilization page, see [Resource Utilization][13]_.

Within the Kubernetes Explorer, tab you can explore a selection of resource utilization metrics.

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization.png" alt="Container Resource Utilization" style="width:80%;">}}

All of these columns support sorting, which helps you to pinpoint individual workloads based on their resource utilization.

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization_sorted_column.png" alt="Container Resource Utilization Sorted Columns" style="width:50%;">}}

## Notes and known issues

* Data is updated automatically in constant intervals. Update intervals may change during beta.
* In clusters with 1000+ Deployments or ReplicaSets you may notice elevated CPU usage from the Cluster Agent. There is an option to disable container scrubbing in the Helm chart. See [the Helm Chart repo][15] for more details.

[1]: https://app.datadoghq.com/orchestration/overview
[2]: /infrastructure/containers/?tab=datadogoperator#setup

[9]: /logs
[10]: /metrics
[11]: /tracing
[12]: /events
[13]: /infrastructure/containers/kubernetes_resource_utilization
[15]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog
