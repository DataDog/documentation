---
title: Kubernetes Resource Utilization
kind: documentation
---

The Kubernetes resource utilization feature gives you insights into how your Kubernetes workloads are using your computing resources across your infrastructure. It will help you understand resource usage and make better decisions about sizing and capacity planning, as well as reducing the amount of CPU or Memory waste.

By providing you with a constantly updated status of how well your resource requests and limits match your pods' current usage, it will help you in improving bin packing within your Kubernetes clusters.

## Getting started

To take advantage of the resource utilization features you'll need to use the Datadog Agent version `7.45.0` or newer. The feature is built on top of the Orchestrator Explorer which also needs to be [enabled][1].

## Usage

Access this page by clicking Infrastructure > [Kubernetes][2] in the UI, and selecting the [Resource Utilization tab][3].

### Get insights into your workloads resource utilization

The page opens on Pods with a default grouping by `kube_cluster_name`, `kube_namespace`, and `kube_deployment` which is the most popular.

Data in the table is split between a **CPU** and a **Memory** tab, as optimizing sizing for these is typically done separately.

Default columns include:

- **Pod group**: this represents deployments by default, but depends on what you specify in the **group by** field. This column includes the sum of usage, requests, and limits for the pods in each group.
- **CPU or Memory Idle**: amount of unused CPU/Memory, calculated as the sum of differences between usage and requests.
- **CPU or Memory usage / requests**: sum of usage divided by sum of requests, in percentage.
- **CPU or Memory usage / limits**: sum of usage divided by sum of limits, in percentage.
- **CPU or Memory graph**: the evolution of usage, requests and limits over time (longer timeframe available by clicking on the group).

{{< img src="infrastructure/livecontainers/kubernetes_resource_utilization.png" alt="Kubernetes resource utilization view" >}}

The Resource columns are sortable to help you prioritize which deployments to focus on first. Color coding quantifies the degree of Pod over/under provisioning.

{{< img src="infrastructure/livecontainers/kubernetes_resource_utilization_panel.png" alt="Kubernetes resource utilization side panel" >}}

Clicking on a row opens a side panel with the combination of CPU and Memory data for this group, detailed graphs for each pod or containers, and a top list of pods.

The default group of graphs shows individual pods to help you identify outliers which may impact the group in case of load imbalance. It can be changed to split by `kube_container_name` to identify which container(s) contribute the most to over/under provisioning in the case of multi-container pods.

### Optimize idle resources

Idle CPU and Memory are necessary to ensure that your application has room to grow without pods being immediately throttled or killed.

Finding a balance between too much margin (i.e. low resource utilization and higher costs) and razor-thin requests (i.e. risk of performance and reliability degradation if resource usage increases) is difficult. This is why in the detailed group view you can adjust the graphs to look at a longer timespan, and avoid making resource sizing decisions based on the most recent usage only. These metrics are standard Kubernetes metrics, so you can query them like all Datadog metrics: i.e. for the last 15 months, at full resolution if needed.

{{< img src="infrastructure/livecontainers/kubernetes_resource_utilization_metrics.png" alt="Kubernetes resource utilization metrics" >}}

### Known issues/limitations

- Metrics will not be displayed for groups containing at least one pod with container(s) that do not set requests or limits, as we cannot infer the percentage of use without them. These groups without metrics will appear last regardless of the sorting order you pick.

[1]: https://docs.datadoghq.com/infrastructure/containers/orchestrator_explorer?tab=datadogoperator#setup
[2]: https://app.datadoghq.com/kubernetes
[3]: https://app.datadoghq.com/orchestration/resource/pod?groups=tag%23kube_deployment%2Ctag%23kube_namespace%2Ctag%23kube_cluster_name
