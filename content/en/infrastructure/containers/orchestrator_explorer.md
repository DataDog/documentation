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

See [Query Filter Details](#query-filter-details) for more details on how to filter these views.

#### Group by functionality and facets

Group pods by tags, Kubernetes labels, or Kubernetes annotations to get an aggregated view which allows you to find information quicker. You can perform a group by using the "Group by" bar on the top right of the page or by clicking on a particular tag or label and locating the group by function in the context menu as shown below.

{{< img src="infrastructure/livecontainers/orch_ex_groupby.png" alt="An example of grouping by team" style="width:80%;">}}

You can also use facets on the left hand side of the page to group resources or filter for resources you care most about, such as pods with a CrashLoopBackOff pod status.

{{< img src="infrastructure/livecontainers/crashloopbackoff.mp4" alt="An example of grouping the CrashLoopBackOff pod status" video=true style="width:80%;">}}

### Cluster map

A cluster map gives you a bigger picture of your pods and Kubernetes clusters. You can see all of your resources together on one screen with customized groups and filters, and choose which metrics to fill the color of the nodes with.

Examine resources from cluster maps by clicking on any circle or group to populate a detailed panel.

{{< img src="infrastructure/livecontainers/cluster-map.mp4" alt="A cluster map with customized groups and filters" video=true style="width:80%;">}}

### Information panel

Click on any row in the table or on any object in a Cluster Map to view information about a specific resource in a side panel.

{{< img src="infrastructure/livecontainers/orch_ex_panel.png" alt="A view of resources in the side panel, opened to processes." style="width:80%;">}}

The side panel's **YAML** tab shows the full resource definition. Starting in **Agent version 7.44.0**, it also includes seven days of definition history. You can compare what changed over time and across different versions. The time indicated is approximately when the changes were applied to the resource.

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

## Query Filter Details

You can narrow down the displayed resources by supplying a query within the "Filter by" search bar on the top left of the page.

### Syntax

A query filter is composed of terms and operators. There are multiple types of terms available:

| Type | Example |
|---|---|
| **Tags** are attached to resources by [the agent collecting them](https://docs.datadoghq.com/getting_started/tagging/assigning_tags/?tab=containerizedenvironments). There are also additional tags that Datadog generates for Kubernetes resources. | `datacenter:staging` or<br>`tag#datacenter:staging` |
| **Labels** are extracted from [a resource's metadata](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/). They are typically used to organize your cluster and target specific resources via selectors. | `label#chart_version:2.1.0` |
| **Annotations** are also extracted from [a resource's metadata](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/). They are generally used to support tooling that aid in cluster management. | `annotation#checksum/configmap:a1bc23d4` |
| **Fields** are attributes found within the resource manifest. Not all attributes are supported, see [Filterable Fields](#filterable-fields) for more details. | `field#metadata.creationTimestamp:>1699535065>` |
| **Metrics** are added to workload resources (pods, deployments, etc.). You can find resources based on their utilization. To see what metrics are supported, see [Resource Utilization Filters](#resource-utilization-filters). | `metric#cpu_usage_pct_limits_avg15:80%` |
| **String matching** is supported by some specific resource attributes, see below.<br>*Note: string matching does not use the key-value format, and you cannoy specify the attribute to match on.* | `"10.132.6.23"` (IP),<br>`"9cb4b43f-8dc1-4a0e"` (UID) or<br>`"web-api-3"` (Name) |

>  ***Notes**:*
>
>  - *You might find the same key-value pairs as both a tag and label (or annotation) - this is dependent on how your cluster is configured.*
>  - In addition to the normal quality comparison (`:`), `field#` and `metric#` filters support the following: `tag:>value`, `:<`, `:>=`, and `:<=`.

The following resource attributes are supported in string matching:
- `metadata.name`
- `metadata.uid`
- IP Addresses found in:
  - Pods
  - Nodes (Internal and External)
  - Services (Cluster, External, and Load Balancer IPs)

To combine multiple terms into a complex query, you can use any of the following case sensitive Boolean operators:

| Operator | Description | Example |
|---|---|---|
| `AND` | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | `a AND b`   |
| `OR` | **Union**: either term is contained in the selected events                                             | `a OR b`   |
| `NOT` / `-` | **Exclusion**: the following term is NOT in the event (apply to each individual raw text search) | `a AND NOT b` or<br>`a AND -b` |
|  `( )` | **Grouping:** specify how to group terms logically. | `a AND (b OR c)` or<br>`(a AND b) or c` |

### Wildcards

You can use `*` wildcards as part of a term value to filter by partial matches. Some examples:

- `kube_job:stats-*`: Find all resources with a `kube_deployment` tag value starting with `stats-`
- `pod_name:*canary`: Find all resources with a `pod_name` value ending in `canary`
- `kube_deployment:*writer*cell-2`: Find resources with `writer` in the middle of the value, ending with `cell-2`
- `label#release:*`: Find all resources with a `release` label, regardless of its value

>  ***Note:** There is no limit to the number, or the location of, wildcards in your key values. You cannot use wild cards within the key name however.*

### Autocomplete

As you build your filter query, our autocomplete drop down will help you fill in the blanks. The filter query autocomplete drop down is composed of 3 parts:

| Section | Description|
|---|---|
| **Facet Keys** | These suggestions will help you find, or finish typing available keys on the resources you are currently filteing. The suggestions are based on keys that are most abundent across your currently selected resources. This section only appears if you are just starting to enter a new search term, or are still typing a facet key. Once you begin typing the value portion of a search term it will be hidden. |
| **Facets** | These recommendations will be full term suggestions based on the prevelance of the facet on the currently found resources, and whatever you have already typed. |
| **Recent Seearches** | These are the most recent full queries you have used to filter your resources, allowing you to quickly navigate back to a past filter query. |

>  ***Note**: For both Facet Key and Facet recommnations, you will see the type of facet being recommended in grey text at the end: Tag, Label, or Annotation.*

### Extracted Tags

In addition to the tags you have [configured](https://docs.datadoghq.com/getting_started/tagging/assigning_tags/?tab=containerizedenvironments) within your Datadog agent, Datadog injects generated tags based on resource attributes that can help your searching and grouping needs. These tags are added to resources conditionally, when they are relevant.

**All resources** will have the `kube_cluster_name` and `kube_namespace` tags added to them.

They will also have a `kube_<api_kind>:<metadata.name>` tag. For example, a deployment named `web-server-2` would have the `kube_deployment:web-server-2` tag automatically added to it.

Based on the labels attached to the resource, the following tags will also be extracted:

- `kube_app_name` (via `app.kubernetes.io/name`)`
- `kube_app_instance` (via `app.kubernetes.io/instance`)`
- `kube_app_version` (via `app.kubernetes.io/version`)`
- `kube_app_component` (via `app.kubernetes.io/component`)`
- `kube_app_part_of` (via `app.kubernetes.io/part-of`)`
- `kube_app_managed_by` (via `app.kubernetes.io/managed-by`)`

**Cluster level resources** will have the following tags extracted based on labels found on them:

- `env` (via `tags.datadoghq.com/env`)
- `version` (via `tags.datadoghq.com/version`)
- `service` ( via `tags.datadoghq.com/service`)

**Workload resources** (pods, deployments, stateful sets, etc.) will have the following tags, indiciating their support within the Resources Utilization page:

- `resource_utilization` (`supported` or `unsupported`)
- `missing_cpu_requests`
- `missing_cpu_limits`
- `missing_memory_requests`
- `missing_memory_limits`

**Pods** are given the following tags:

- `kube_node`
- `pod_name`
- `pod_phase`
- `pod_status`
- `kube_priority_class`
- `kube_ownerref_kind`
- `kube_ownerref_name`
- `kube_replication_controller`

Depending on the origin of the pod, they may have 1 or more of the following tags, associating them with related resources:

- `kube_cronjob`
- `kube_deployment`
- `kube_daemon_set`
- `kube_job`
- `kube_replica_set`
- `kube_stateful_set`
- `kube_cronjob`

**Other resource** types have their own set of unique tags that are extracted based on your cluster environment.

| Resource | Extracted Tags |
|---|---|
| **Cluster** | `api_server_version`<br>`kubelet_version` |
| **Cluster Role Binding** | `kube_cluster_role_binding`<br>`kube_cluster_role` |
| **Custom Resource** | `kube_cr`<br>`kube_crd_kind`<br>`kube_crd_group`<br>`kube_crd_version`<br>`kube_crd_scope` |
| **Custom Resource Definition** | `kube_crd`<br>`kube_crd_kind`<br>`kube_crd_group`<br>`kube_crd_version`<br>`kube_crd_scope`<br>`kube_crd_non_structural_schema`<br>`kube_crd_non_structural_schema_reason`<br>`kube_crd_names_accepted`<br>`kube_crd_names_accepted_reason`<br>`kube_crd_established`<br>`kube_crd_established_reason` |
| **Deployment** | `kube_deployment`<br>`kube_condition_available`<br>`kube_condition_progressing`<br>`kube_condition_replicafailure` |
| **Ingress** | `kube_ingress`<br>`kube_service` |
| **Job** | `kube_ownerref_kind`<br>`kube_ownerref_name`<br>`kube_cronjob`<br>`kube_job` |
| **Namespace** | `phase` |
| **Node** | `kube_node`<br>`kube_node_unschedulable`<br>`kube_node_kubelet_version`<br>`kube_node_kernel_version`<br>`kube_node_runtime_version`<br>`eks_fargate_node`<br>`node_schedulable`<br>`node_status` |
| **Persistent Volume** | `kube_persistent_volume`<br>`persistentvolumeclaim`<br>`kube_reclaim_policy`<br>`kube_storage_class_name`<br>`pv_type`<br>`pv_phase` |
| **Persistent Volume Claim** | `persistentvolumeclaim`<br>`kube_persistent_volume`<br>`pvc_phase`<br>`kube_storage_class_name` |
| **Replica Set** |  `kube_replica_set`<br>`kube_deployment` |
| **Role Binding** | `kube_role_binding`<br>`kube_cluster_role`<br>`kube_role` |
| **Service** | `kube_service`<br>`kube_service_type`<br>`kube_service_port` |

### Filterable Fields

Currently, the only manifest field available for comparison is `field#metadata.creationTimestamp`. The value is a Unix Epoch in seconds (UTC). To look for resources created before January 1st, 2022, you would filter by: `field#metadata.creationTimestamp:<=1577836800`

### Resource Utilization Filters

The following workload resouces are enriched with resource utilization metrics:

- Clusters
- Daemonsets
- Deployments
- Nodes
- Pods
- Replica Sets
- Stateful Sets

For these resources, following metrics are exposed as filterable terms:

- `metric#cpu_limits_avg15`
- `metric#cpu_requests_avg15`
- `metric#cpu_usage_avg15`
- `metric#cpu_usage_pct_limits_avg15`
- `metric#cpu_usage_pct_requests_avg15`
- `metric#cpu_waste_avg15`
- `metric#mem_limits_avg15`
- `metric#mem_requests_avg15`
- `metric#mem_usage_avg15`
- `metric#mem_usage_pct_limits_avg15`
- `metric#mem_usage_pct_requests_avg15`
- `metric#mem_waste_avg15`

In addition, Clusters and Nodes have the following metrics available to them:

- `metric#cpu_usage_pct_alloc_avg15`
- `metric#cpu_requests_pct_alloc_avg15`
- `metric#mem_usage_pct_alloc_avg15`
- `metric#mem_requests_pct_alloc_avg15`

CPU Limits and Requests are stored as a number of cores.

Memory Limits and Requests are stored in bytes.

Percents are stored as floats, where `0.0` is 0%, and `1.0` is 100%. Some metric values go well beyond 100%, such as CPU Usage Percents by Requests.

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
