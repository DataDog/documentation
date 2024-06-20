---
title: Container Cost Allocation
private: true
description: Learn how to allocate Cloud Cost Management spending across your organization with Container Cost Allocation.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Cost Management is not supported for this site.</div>
{{< /site-region >}}

{{< jqmath-vanilla >}}

## Overview

Datadog Cloud Cost Management (CCM) automatically allocates the costs of your cloud clusters to individual services and workloads running in those clusters. Use cost metrics enriched with tags from pods, nodes, containers, and tasks to visualize container workload cost in the context of your entire cloud bill.

Clouds
: CCM allocates costs of your AWS, Azure, or Google host instances. A host is a computer (such as an EC2 instance in AWS, a virtual machine in Azure, or a Compute Engine instance in Google Cloud) that is listed in your cloud provider's cost and usage report and may be running Kubernetes pods.

Resources
: CCM allocates costs for Kubernetes clusters and includes cost analysis for many associated resources such as Kubernetes persistent volumes used by your pods.

CCM displays costs for resources including CPU, memory, and more depending on the cloud and orchestrator you are using on the [**Containers** page][1].

{{< img src="cloud_cost/container_cost_allocation/container_allocation.png" alt="Cloud cost allocation table showing requests and idle costs over the past month on the Containers page" style="width:100%;" >}}

## Prerequisites

{{< tabs >}}
{{% tab "AWS" %}}

CCM allocates costs of AWS ECS clusters as well as all Kubernetes clusters, including those managed through Elastic Kubernetes Service (EKS).

The following table presents the list of collected features and the minimal Agent and Cluster Agent versions for each.

| Feature | Minimal Agent version | Minimal Cluster Agent version |
|---|---|---|
| Container Cost Allocation | 7.27.0 | 1.11.0 |
| AWS Persistent Volume Allocation | 7.46.0 | 1.11.0  |

1. Configure the AWS Cloud Cost Management integration on the [Cloud Costs Setup page][101].
1. For Kubernetes support, install the [**Datadog Agent**][102] in a Kubernetes environment and ensure that you enable the [**Orchestrator Explorer**][103] in your Agent configuration.
1. For AWS ECS support, set up [**Datadog Container Monitoring**][104] in ECS tasks.
1. Optionally, enable [AWS Split Cost Allocation][105] for usage-based ECS allocation.

[101]: https://app.datadoghq.com/cost/setup
[102]: /containers/kubernetes/installation/?tab=operator
[103]: /infrastructure/containers/orchestrator_explorer?tab=datadogoperator
[104]: /containers/amazon_ecs/
[105]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html

{{% /tab %}}
{{% tab "Azure" %}}

CCM allocates costs of all Kubernetes clusters, including those managed through Azure Kubernetes Service (AKS).

The following table presents the list of collected features and the minimal Agent and Cluster Agent versions for each.

| Feature | Minimal Agent version | Minimal Cluster Agent version |
|---|---|---|
| Container Cost Allocation | 7.27.0 | 1.11.0 |

1. Configure the Azure Cost Management integration on the [Cloud Costs Setup page][101].
1. Install the [**Datadog Agent**][102] in a Kubernetes environment and ensure that you enable the [**Orchestrator Explorer**][103] in your Agent configuration.

[101]: https://app.datadoghq.com/cost/setup
[102]: /containers/kubernetes/installation/?tab=operator
[103]: /infrastructure/containers/orchestrator_explorer?tab=datadogoperator

{{% /tab %}}
{{% tab "Google" %}}

CCM allocates costs of all Kubernetes clusters, including those managed through Google Kubernetes Engine (GKE).

The following table presents the list of collected features and the minimal Agent and Cluster Agent versions for each.

| Feature | Minimal Agent version | Minimal Cluster Agent version |
|---|---|---|
| Container Cost Allocation | 7.27.0 | 1.11.0 |

1. Configure the Google Cloud Cost Management integration on the [Cloud Costs Setup page][101].
1. Install the [**Datadog Agent**][102] in a Kubernetes environment and ensure that you enable the [**Orchestrator Explorer**][103] in your Agent configuration.

[101]: https://app.datadoghq.com/cost/setup
[102]: /containers/kubernetes/installation/?tab=operator
[103]: /infrastructure/containers/orchestrator_explorer?tab=datadogoperator

{{% /tab %}}
{{< /tabs >}}

## Allocate costs

Cost allocation divides host compute and other resource costs from your cloud provider into individual tasks or pods associated with them. These divided costs are then enriched with tags from related resources so you can break down costs by any associated dimensions.

Use the `allocated_resource` tag to visualize the spend resource associated with your costs at various levels, including the Kubernetes node, container orchestration host, storage volume, or entire cluster level.

{{< tabs >}}
{{% tab "AWS" %}}

These divided costs are enriched with tags from nodes, pods, tasks, and volumes. You can use these tags to break down costs by any associated dimensions.

### Compute

For Kubernetes compute allocation, a Kubernetes node is joined with its associated host instance costs. The node's cluster name and all node tags are added to the entire compute cost for the node. This allows you to associate cluster-level dimensions with the cost of the instance, without considering the pods scheduled to the node.

Next, Datadog looks at all of the pods running on that node for the day. The cost of the node is allocated to the pod based on the resources it has used and the length of time it ran. This calculated cost is enriched with all of the pod's tags.

**Note**: Only _tags_ from pods and nodes are added to cost metrics. To include labels, enable labels as tags for [nodes][101] and [pods][102].

All other costs are given the same value and tags as the source metric `aws.cost.amortized`.

### Persistent volume storage

For Kubernetes Persistent Volume storage allocation, Persistent Volumes (PV), Persistent Volume Claims (PVC), nodes, and pods are joined with their associated EBS volume costs. All associated PV, PVC, node, and pod tags are added to the EBS volume cost line items.

Next, Datadog looks at all of the pods that claimed the volume on that day. The cost of the volume is allocated to a pod based on the resources it used and the length of time it ran. These resources include the provisioned capacity for storage, IOPS, and throughput. This allocated cost is enriched with all of the pod's tags.

### AWS ECS on EC2

For ECS allocation, Datadog determines which tasks ran on each EC2 instance used for ECS. If you enable AWS Split Cost Allocation, the metrics allocate ECS costs by usage instead of reservation, providing more granular detail.

Based on resources the task has used, Datadog assigns the appropriate portion of the instance's compute cost to that task. The calculated cost is enriched with all of the task's tags and all of the container tags (except container names) running in the task.

### AWS ECS on Fargate

ECS tasks that run on Fargate are already fully allocated [in the CUR][103]. CCM enriches that data by adding out-of-the-box tags and container tags to the AWS Fargate cost.

[101]: /containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags
[102]: /containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags
[103]: https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html

{{% /tab %}}
{{% tab "Azure" %}}

### Compute

For Kubernetes compute allocation, a Kubernetes node is joined with its associated host instance costs. The node's cluster name and all node tags are added to the entire compute cost for the node. This allows you to associate cluster-level dimensions with the cost of the instance, without considering the pods scheduled to the node.

Next, Datadog looks at all of the pods running on that node for the day. The cost of the node is allocated to the pod based on the resources it has used and the length of time it ran. This calculated cost is enriched with all of the pod's tags.

**Note**: Only _tags_ from pods and nodes are added to cost metrics. To include labels, enable labels as tags for [nodes][101] and [pods][102].

All other costs are given the same value and tags as the source metric `azure.cost.amortized`.

[101]: /containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags
[102]: /containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags

{{% /tab %}}
{{% tab "Google" %}}

### Compute

For Kubernetes compute allocation, a Kubernetes node is joined with its associated host instance costs. The node's cluster name and all node tags are added to the entire compute cost for the node. This allows you to associate cluster-level dimensions with the cost of the instance, without considering the pods scheduled to the node.

Next, Datadog looks at all of the pods running on that node for the day. The cost of the node is allocated to the pod based on the resources it has used and the length of time it ran. This calculated cost is enriched with all of the pod's tags.

**Note**: Only _tags_ from pods and nodes are added to cost metrics. To include labels, enable labels as tags for [nodes][101] and [pods][102].

All other costs are given the same value and tags as the source metric `gcp.cost.amortized`.

### Agentless Kubernetes costs

To view the costs of GKE clusters without enabling Datadog Infrastructure Monitoring, use [GKE cost allocation][103]. Enable GKE cost allocation on unmonitored GKE clusters to access this feature set.

#### Limitations and differences from the Datadog Agent

- There is no support for tracking workload idle costs.
- The cost of individual pods are not tracked, only the aggregated cost of a workload and the namespace. There is no `pod_name` tag.
- GKE enriches data using pod labels only and ignores any Datadog tags you add.
- The full list of limitations can be found in the [official GKE documentation][104].

To enable GKE cost allocation, see the [official GKE documentation][105].

[101]: /containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags
[102]: /containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags
[103]: https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations
[104]: https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations#limitations
[105]: https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations#enable_breakdown

{{% /tab %}}
{{< /tabs >}}

## Understanding spend

Use the `allocated_spend_type` tag to visualize the spend category associated with your costs at various levels, including the Kubernetes node, container orchestration host, storage volume, or entire cluster level.

{{< tabs >}}
{{% tab "AWS" %}}

### Compute

The cost of a host instance is split into two components: 60% for the CPU and 40% for the memory. Each component is allocated to individual workloads based on their resource reservations and usage.

Costs are allocated into the following spend types:

| Spend type | Description    |
| -----------| -----------    |
| Usage | Cost of resources (such as memory and CPU) used by workloads, based on the average usage on that day. |
| Workload idle | Cost of resources (such as memory and CPU) that are reserved and allocated but not used by workloads. This is the difference between the total resources requested and the average usage. |
| Cluster idle | Cost of resources (such as memory and CPU) that are not reserved by workloads in a cluster. This is the difference between the total cost of the resources and what is allocated to workloads. |

### Persistent volume

The cost of an AWS EBS volume has three components: IOPS, throughput, and storage. Each is allocated according to a pod's usage when the volume is mounted.

| Spend type | Description    |
| -----------| -----------    |
| Usage | Cost of provisioned IOPS, throughput, or storage used by workloads. Storage cost is based on the maximum amount of volume storage used that day, while IOPS and throughput costs are based on the average amount of volume storage used that day. |
| Workload idle | Cost of provisioned IOPS, throughput, or storage that are reserved and allocated but not used by workloads. Storage cost is based on the maximum amount of volume storage used that day, while IOPS and throughput costs are based on the average amount of volume storage used that day. This is the difference between the total resources requested and the average usage. **Note:** This tag is only available if you have enabled `Resource Collection` in your [**AWS Integration**][101]. To prevent being charged for `Cloud Security Posture Management`, ensure that during the `Resource Collection` setup, the `Cloud Security Posture Management` box is unchecked. |
| Cluster idle | Cost of provisioned IOPS, throughput, or storage that are not reserved by any pods that day. This is the difference between the total cost of the resources and what is allocated to workloads. |

**Note**: Persistent volume allocation is only supported in Kubernetes clusters, and is only available for pods that are part of a Kubernetes StatefulSet.

[101]: https://app.datadoghq.com/integrations/amazon-web-services

{{% /tab %}}
{{% tab "Azure" %}}

### Compute

The cost of a host instance is split into two components: 60% for the CPU and 40% for the memory. Each component is allocated to individual workloads based on their resource reservations and usage.

Costs are allocated into the following spend types:

| Spend type | Description    |
| -----------| -----------    |
| Usage | Cost of resources (such as memory and CPU) used by workloads, based on the average usage on that day. |
| Workload idle | Cost of resources (such as memory and CPU) that are reserved and allocated but not used by workloads. This is the difference between the total resources requested and the average usage. |
| Cluster idle | Cost of resources (such as memory and CPU) that are not reserved by workloads in a cluster. This is the difference between the total cost of the resources and what is allocated to workloads. |

{{% /tab %}}
{{% tab "Google" %}}

### Compute

The cost of a host instance is split into two components: 60% for the CPU and 40% for the memory. Each component is allocated to individual workloads based on their resource reservations and usage.

Costs are allocated into the following spend types:

| Spend type | Description    |
| -----------| -----------    |
| Usage | Cost of resources (such as memory and CPU) used by workloads, based on the average usage on that day. |
| Workload idle | Cost of resources (such as memory and CPU) that are reserved and allocated but not used by workloads. This is the difference between the total resources requested and the average usage. |
| Cluster idle | Cost of resources (such as memory and CPU) that are not reserved by workloads in a cluster. This is the difference between the total cost of the resources and what is allocated to workloads. |
| Not monitored | Cost of resources where the spend type is unknown. To resolve this, install the Datadog Agent on these clusters or nodes. |

{{% /tab %}}
{{< /tabs >}}

## Understanding resources

Depending on the cloud provider, certain resources may or may not be available for cost allocation.

| Resource | AWS | Azure | Google Cloud |
|---:|---:|---|---|
| CPU | {{< X >}} | {{< X >}} | {{< X >}} |
| Memory | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ccm-details title="Persistent volumes" >}}Storage resources within a cluster, provisioned by administrators or dynamically, that persist data independently of pod lifecycles.{{< /ccm-details >}} | {{< X >}} |  |  |
| {{< ccm-details title="Managed service fees" >}}Cost of associated fees charged by the cloud provider for managing the cluster, such as fees for managed Kubernetes services or other container orchestration options.{{< /ccm-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| ECS costs | {{< X >}} | N/A | N/A |
| Networking costs |  | Limited* | Limited* |
| GPU |  |  | Limited* |
| {{< ccm-details title="Local storage" >}}Directly-attached storage resources for a node.{{< /ccm-details >}} |  | Limited* | Limited* |

`Limited*` resources have been identified as part of your Kubernetes spend, but are not fully allocated to specific workloads or pods. These resources are host-level costs, not pod or namespace-level costs, and are identified with `allocated_spend_type:<resource>_not_supported`.

## Cost metrics

When the prerequisites are met, the following cost metrics automatically appear.

{{< tabs >}}
{{% tab "AWS" %}}

| Cost Metric                    | Description    |
| ---                                | ----------- |
| `aws.cost.amortized.shared.resources.allocated` | EC2 costs allocated by the CPU & memory used by a pod or ECS task, using a 60:40 split for CPU & memory respectively. Also includes allocated EBS costs. <br> *Based on `aws.cost.amortized`* |
| `aws.cost.net.amortized.shared.resources.allocated` | Net EC2 costs allocated by CPU & memory used by a pod or ECS task, using a 60:40 split for CPU & memory respectively. Also includes allocated AWS EBS costs. <br> *Based on `aws.cost.net.amortized`, if available* |

{{% /tab %}}
{{% tab "Azure" %}}

| Cost Metric                    | Description    |
| ---                                | ----------- |
| `azure.cost.amortized.shared.resources.allocated` | Azure VM costs allocated by the CPU & memory used by a pod or container task, using a 60:40 split for CPU & memory respectively. Also includes allocated Azure costs. <br> *Based on `azure.cost.amortized`* |

{{% /tab %}}
{{% tab "Google" %}}

| Cost Metric                    | Description    |
| ---                                | ----------- |
| `gcp.cost.amortized.shared.resources.allocated` | Google Compute Engine costs allocated by the CPU & memory used by a pod, using 60:40 split for CPU & memory respectively. This allocation method is used when the bill does not already provide a specific split between CPU and memory usage. <br> *Based on `gcp.cost.amortized`* |

{{% /tab %}}
{{< /tabs >}}

These cost metrics include all of your cloud costs. This allows you to continue visualizing all of your cloud costs at one time.

For example, say you have the tag `team` on a storage bucket, a cloud provider managed database, and Kubernetes pods. You can use these metrics to group costs by `team`, which includes the costs for all three.

## Applying tags

Datadog consolidates and applies the following tags from various sources to cost metrics.

{{< tabs >}}
{{% tab "AWS" %}}

### Kubernetes

In addition to Kubernetes pod and Kubernetes node tags, the following non-exhaustive list of out-of-the-box tags are applied to cost metrics:

| Out-of-the-box tag  |  Description |
| ---                 | ------------ |
| `orchestrator:kubernetes` | The orchestration platform associated with the item is Kubernetes. |
| `kube_cluster_name` | The name of the Kubernetes cluster. |
| `kube_namespace` | The namespace where workloads are running. |
| `kube_deployment` | The name of the Kubernetes Deployment. |
| `kube_stateful_set` | The name of the Kubernetes StatefulSet. |
| `pod_name` | The name of any individual pod. |

Conflicts are resolved by favoring higher-specificity tags such as pod tags over lower-specificity tags such as host tags. For example, a Kubernetes pod tagged `service:datadog-agent` running on a node tagged `service:aws-node` results in a final tag `service:datadog-agent`.

#### Persistent volume

In addition to Kubernetes pod and Kubernetes node tags, the following out-of-the-box tags are applied to cost metrics.

| Out-of-the-box tag                      | Description                                                                                                                                  |
| ---                                     |----------------------------------------------------------------------------------------------------------------------------------------------|
| `persistent_volume_reclaim_policy`      | The Kubernetes Reclaim Policy on the Persistent Volume.                                                                                      |
| `storage_class_name`                    | The Kubernetes Storage Class used to instantiate the Persistent Volume.                                                                      |
| `volume_mode`                           | The Volume Mode of the Persistent Volume.                                                                                                    |
| `ebs_volume_type`                       | The type of the AWS EBS volume. Can be `gp3`, `gp2`, or others.                                                                              |

### Amazon ECS

In addition to ECS task tags, the following out-of-the-box tags are applied to cost metrics.

**Note**: Most tags from ECS containers are applied (excluding `container_name`).

| Out-of-the-box tag      |  Description |
| ---                     | ------------ |
| `orchestrator:ecs`      | The orchestration platform associated with the item is AWS ECS. |
| `ecs_cluster_name`      | The name of the ECS cluster. |
| `is_aws_ecs`            | All costs associated with running ECS. |
| `is_aws_ecs_on_ec2`     | All EC2 compute costs associated with running ECS on EC2. |
| `is_aws_ecs_on_fargate` | All costs associated with running ECS on Fargate. |

{{% /tab %}}
{{% tab "Azure" %}}

### Kubernetes

In addition to Kubernetes pod and Kubernetes node tags, the following non-exhaustive list of out-of-the-box tags are applied to cost metrics:

| Out-of-the-box tag                         | Description                                                                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------  |
| `orchestrator:kubernetes`                  | The orchestration platform associated with the item is Kubernetes.                                                                                            |
| `kube_cluster_name` | The name of the Kubernetes cluster. |
| `kube_namespace` | The namespace where workloads are running. |
| `kube_deployment` | The name of the Kubernetes Deployment. |
| `kube_stateful_set` | The name of the Kubernetes StatefulSet. |
| `pod_name` | The name of any individual pod. |
| `allocated_resource:data_transfer` | The tracking and allocation of costs associated with data transfer activities used by Azure services or workloads. |
| `allocated_resource:local_storage`         | The tracking and allocation of costs at a host level associated with local storage resources used by Azure services or workloads.                             |

{{% /tab %}}
{{% tab "Google" %}}

### Kubernetes

In addition to Kubernetes pod and Kubernetes node tags, the following non-exhaustive list of out-of-the-box tags are applied to cost metrics:

| Out-of-the-box tag                         | Description                                                                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------  |
| `orchestrator:kubernetes`                  | The orchestration platform associated with the item is Kubernetes.                                                                                            |
| `kube_cluster_name` | The name of the Kubernetes cluster. |
| `kube_namespace` | The namespace where workloads are running. |
| `kube_deployment` | The name of the Kubernetes Deployment. |
| `kube_stateful_set` | The name of the Kubernetes StatefulSet. |
| `pod_name` | The name of any individual pod. |
| `allocated_spend_type:not_monitored` | The tracking and allocation of [Agentless Kubernetes costs](#agentless-kubernetes-costs) associated with resources used by Google Cloud services or workloads, and the Datadog Agent is not monitoring those resources. |
| `allocated_resource:data_transfer` | The tracking and allocation of costs associated with data transfer activities used by Google Cloud services or workloads. |
| `allocated_resource:gpu` | The tracking and allocation of costs at a host level associated with GPU resources used by Google Cloud services or workloads. |
| `allocated_resource:local_storage` | The tracking and allocation of costs at a host level associated with local storage resources used by Google Cloud services or workloads. |

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/containers
