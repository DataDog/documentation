---
title: Container Cost Allocation
description: Learn how to allocate Cloud Cost Management spending across your organization with Container Cost Allocation.
content_filters:
  - trait_id: platform
    option_group_id: cloud_cost_provider_options
    label: "Cloud Provider"
aliases:
  - /cloud_cost_management/container_cost_allocation
further_reading:
  - link: /cloud_cost_management/
    tag: "Documentation"
    text: "Learn about Cloud Cost Management"
---

## Overview

Datadog Cloud Cost Management (CCM) automatically allocates the costs of your cloud clusters to individual services and workloads running in those clusters. Use cost metrics enriched with tags from pods, nodes, containers, and tasks to visualize container workload cost in the context of your entire cloud bill.

Clouds
: CCM allocates costs of your AWS, Azure, or Google host instances. A host is a computer (such as an EC2 instance in AWS, a virtual machine in Azure, or a Compute Engine instance in Google Cloud) that is listed in your cloud provider's cost and usage report and may be running Kubernetes pods.

Resources
: CCM allocates costs for Kubernetes clusters and includes cost analysis for many associated resources such as Kubernetes persistent volumes used by your pods.

CCM displays costs for resources including CPU, memory, and more depending on the cloud and orchestrator you are using on the [**Containers** page][1].

{% img src="cloud_cost/container_cost_allocation/container_allocation.png" alt="Cloud cost allocation table showing requests and idle costs over the past month on the Containers page" style="width:100%;" /%}

## Prerequisites

<!-- AWS -->
{% if equals($platform, "aws") %}

CCM allocates costs of Amazon ECS clusters as well as all Kubernetes clusters, including those managed through Elastic Kubernetes Service (EKS).

The following table presents the list of collected features and the minimal Agent and Cluster Agent versions for each.

| Feature | Minimal Agent version | Minimal Cluster Agent version |
|---|---|---|
| Container Cost Allocation | 7.27.0 | 1.11.0 |
| GPU Container Cost Allocation | 7.54.0 | 7.54.0 |
| AWS Persistent Volume Allocation | 7.46.0 | 1.11.0 |
| Data Transfer Cost Allocation    | 7.58.0 | 7.58.0 |

1. Configure the AWS Cloud Cost Management integration on the [Cloud Cost Setup page][2].
1. For Kubernetes support, install the [**Datadog Agent**][3] in a Kubernetes environment and ensure that you enable the [**Orchestrator Explorer**][4] in your Agent configuration.
1. For Amazon ECS support, set up [**Datadog Container Monitoring**][5] in ECS tasks.
1. Optionally, enable [AWS Split Cost Allocation][6] for usage-based ECS allocation.
1. To enable storage cost allocation, set up [EBS metric collection][7].
1. To enable GPU container cost allocation, install the [Datadog DCGM integration][8].
1. To enable Data transfer cost allocation, set up [Cloud Network Monitoring][9]. **Note**: additional charges apply

**Note**: GPU Container Cost Allocation only supports pod requests in the format `nvidia.com/gpu`.

{% /if %}

<!-- Azure -->
{% if equals($platform, "azure") %}

CCM allocates costs of all Kubernetes clusters, including those managed through Azure Kubernetes Service (AKS).

The following table presents the list of collected features and the minimal Agent and Cluster Agent versions for each.

| Feature | Minimal Agent version | Minimal Cluster Agent version |
|---|---|---|
| Container Cost Allocation | 7.27.0 | 1.11.0 |
| GPU Container Cost Allocation | 7.54.0 | 7.54.0 |

1. Configure the Azure Cost Management integration on the [Cloud Cost Setup page][2].
1. Install the [**Datadog Agent**][3] in a Kubernetes environment and ensure that you enable the [**Orchestrator Explorer**][4] in your Agent configuration.
1. To enable GPU container cost allocation, install the [Datadog DCGM integration][10].

**Note**: GPU Container Cost Allocation only supports pod requests in the format `nvidia.com/gpu`.

{% /if %}

<!-- Google -->
{% if equals($platform, "google") %}

CCM allocates costs of all Kubernetes clusters, including those managed through Google Kubernetes Engine (GKE).

The following table presents the list of collected features and the minimal Agent and Cluster Agent versions for each.

| Feature | Minimal Agent version | Minimal Cluster Agent version |
|---|---|---|
| Container Cost Allocation | 7.27.0 | 1.11.0 |
| GPU Container Cost Allocation | 7.54.0 | 7.54.0 |

1. Configure the Google Cloud Cost Management integration on the [Cloud Cost Setup page][2].
1. Install the [**Datadog Agent**][3] in a Kubernetes environment and ensure that you enable the [**Orchestrator Explorer**][4] in your Agent configuration.
1. To enable GPU container cost allocation, install the [Datadog DCGM integration][10].

**Note**: GPU Container Cost Allocation only supports pod requests in the format `nvidia.com/gpu`.

**Note**: [GKE Autopilot][11] is only supported as an Agentless Kubernetes setup that is subject to [limitations](#agentless-kubernetes-costs).

{% /if %}

## Allocate costs

Cost allocation divides host compute and other resource costs from your cloud provider into individual tasks or pods associated with them. These divided costs are then enriched with tags from related resources so you can break down costs by any associated dimensions.

Use the `allocated_resource` tag to visualize the spend resource associated with your costs at various levels, including the Kubernetes node, container orchestration host, storage volume, or entire cluster level.

<!-- AWS -->
{% if equals($platform, "aws") %}

These divided costs are enriched with tags from nodes, pods, tasks, and volumes. You can use these tags to break down costs by any associated dimensions.

### Kubernetes tag extraction

Only _tags_ from the direct resource, such as a pod, as well as the underlying nodes, are added to cost metrics by default. To include labels as tags, annotations as tags, or tags from related resources such as namespaces, see [Kubernetes Tag Extraction][12].

### Compute

For Kubernetes compute allocation, a Kubernetes node is joined with its associated host instance costs. The node's cluster name and all node tags are added to the entire compute cost for the node. This allows you to associate cluster-level dimensions with the cost of the instance, without considering the pods scheduled to the node.

Next, Datadog looks at all of the pods running on that node for the day. The cost of the node is allocated to the pod based on the resources it has used and the length of time it ran. This calculated cost is enriched with all of the pod's tags.

**Note**: Only _tags_ from pods and nodes are added to cost metrics. To include labels, enable labels as tags for [nodes][13] and [pods][14].

All other costs are given the same value and tags as the source metric `aws.cost.amortized`.

### Persistent volume storage

For Kubernetes Persistent Volume storage allocation, Persistent Volumes (PV), Persistent Volume Claims (PVC), nodes, and pods are joined with their associated EBS volume costs. All associated PV, PVC, node, and pod tags are added to the EBS volume cost line items.

Next, Datadog looks at all of the pods that claimed the volume on that day. The cost of the volume is allocated to a pod based on the resources it used and the length of time it ran. These resources include the provisioned capacity for storage, IOPS, and throughput. This allocated cost is enriched with all of the pod's tags.

### Amazon ECS on EC2

For ECS allocation, Datadog determines which tasks ran on each EC2 instance used for ECS. If you enable AWS Split Cost Allocation, the metrics allocate ECS costs by usage instead of reservation, providing more granular detail.

Based on resources the task has used, Datadog assigns the appropriate portion of the instance's compute cost to that task. The calculated cost is enriched with all of the task's tags and all of the container tags (except container names) running in the task.

### Amazon ECS on Fargate

ECS tasks that run on Fargate are already fully allocated [in the CUR][15]. CCM enriches that data by adding out-of-the-box tags and container tags to the AWS Fargate cost.

### Data transfer

For Kubernetes data transfer allocation, a Kubernetes node is joined with its associated data transfer costs from the [CUR][15]. The node's cluster name and all node tags are added to the entire data transfer cost for the node. This allows you to associate cluster-level dimensions with the cost of the data transfer, without considering the pods scheduled to the node.

Next, Datadog examines the daily [workload resources][16] running on that node. The node cost is allocated to the workload level according to network traffic volume usage. This calculated cost is enriched with all of the workload resource's tags.

**Note**: Only _tags_ from pods and nodes are added to cost metrics. To include labels, enable labels as tags for [nodes][13] and [pods][14].

[Cloud Network Monitoring][9] must be enabled on all AWS hosts to allow accurate data transfer cost allocation. If some hosts do not have Cloud Network Monitoring enabled, the data transfer costs for these hosts is not allocated and may appear as an `n/a` bucket depending on filter and group-by conditions.

Datadog supports data transfer cost allocation using [standard 6 workload resources][16] only. For [custom workload resources][17], data transfer costs can be allocated down to the cluster level only, and not the node/namespace level.

{% /if %}

<!-- Azure -->
{% if equals($platform, "azure") %}

### Kubernetes tag extraction

Only _tags_ from the direct resource, such as a pod, as well as the underlying nodes, are added to cost metrics by default. To include labels as tags, annotations as tags, or tags from related resources such as namespaces, see [Kubernetes Tag Extraction][12].

### Compute

For Kubernetes compute allocation, a Kubernetes node is joined with its associated host instance costs. The node's cluster name and all node tags are added to the entire compute cost for the node. This allows you to associate cluster-level dimensions with the cost of the instance, without considering the pods scheduled to the node.

Next, Datadog looks at all of the pods running on that node for the day. The cost of the node is allocated to the pod based on the resources it has used and the length of time it ran. This calculated cost is enriched with all of the pod's tags.

**Note**: Only _tags_ from pods and nodes are added to cost metrics. To include labels, enable labels as tags for [nodes][13] and [pods][14].

All other costs are given the same value and tags as the source metric `azure.cost.amortized`.

{% /if %}

<!-- Google -->
{% if equals($platform, "google") %}

### Kubernetes tag extraction

Only _tags_ from the direct resource, such as a pod, as well as the underlying nodes, are added to cost metrics by default. To include labels as tags, annotations as tags, or tags from related resources such as namespaces, see [Kubernetes Tag Extraction][12].

### Compute

For Kubernetes compute allocation, a Kubernetes node is joined with its associated host instance costs. The node's cluster name and all node tags are added to the entire compute cost for the node. This allows you to associate cluster-level dimensions with the cost of the instance, without considering the pods scheduled to the node.

Next, Datadog looks at all of the pods running on that node for the day. The cost of the node is allocated to the pod based on the resources it has used and the length of time it ran. This calculated cost is enriched with all of the pod's tags.

**Note**: Only _tags_ from pods and nodes are added to cost metrics. To include labels, enable labels as tags for [nodes][13] and [pods][14].

All other costs are given the same value and tags as the source metric `gcp.cost.amortized`.

### Agentless Kubernetes costs

To view the costs of GKE clusters without enabling Datadog Infrastructure Monitoring, use [GKE cost allocation][18]. Enable GKE cost allocation on unmonitored GKE clusters to access this feature set. This approach comes with the following limitations.

#### Limitations and differences from the Datadog Agent

- There is no support for tracking workload idle costs.
- The cost of individual pods are not tracked, only the aggregated cost of a workload and the namespace. There is no `pod_name` tag.
- GKE enriches data using pod labels only and ignores any Datadog tags you add.
- The full list of limitations can be found in the [official GKE documentation][19].

To enable GKE cost allocation, see the [official GKE documentation][20].

{% /if %}

## Understanding spend

Use the `allocated_spend_type` tag to visualize the spend category associated with your costs at various levels, including the Kubernetes node, container orchestration host, storage volume, or entire cluster level.

<!-- AWS -->
{% if equals($platform, "aws") %}

### Compute

The cost of a host instance is split into two components: 60% for the CPU and 40% for the memory. If the host instance has GPUs, the cost is split into three components: 95% for the GPU, 3% for the CPU, and 2% for the memory. Each component is allocated to individual workloads based on their resource reservations and usage.

Costs are allocated into the following spend types:

| Spend type | Description    |
| -----------| -----------    |
| Usage | Cost of resources (such as memory, CPU, and GPU) used by workloads, based on the average usage on that day. |
| Workload idle | Cost of resources (such as memory, CPU, and GPU) that are reserved and allocated but not used by workloads. This is the difference between the total resources requested and the average usage. |
| Cluster idle | Cost of resources (such as memory, CPU, and GPU) that are not reserved by workloads in a cluster. This is the difference between the total cost of the resources and what is allocated to workloads. |

### Persistent volume

The cost of an EBS volume has three components: IOPS, throughput, and storage. Each is allocated according to a pod's usage when the volume is mounted.

| Spend type | Description    |
| -----------| -----------    |
| Usage | Cost of provisioned IOPS, throughput, or storage used by workloads. Storage cost is based on the maximum amount of volume storage used that day, while IOPS and throughput costs are based on the average amount of volume storage used that day. |
| Workload idle | Cost of provisioned IOPS, throughput, or storage that are reserved and allocated but not used by workloads. Storage cost is based on the maximum amount of volume storage used that day, while IOPS and throughput costs are based on the average amount of volume storage used that day. This is the difference between the total resources requested and the average usage. **Note:** This tag is only available if you have enabled `Resource Collection` in your [**AWS Integration**][21]. To prevent being charged for `Cloud Security Posture Management`, ensure that during the `Resource Collection` setup, the `Cloud Security Posture Management` box is unchecked. |
| Cluster idle | Cost of provisioned IOPS, throughput, or storage that are not reserved by any pods that day. This is the difference between the total cost of the resources and what is allocated to workloads. |

**Note**: Persistent volume allocation is only supported in Kubernetes clusters, and is only available for pods that are part of a Kubernetes StatefulSet.

### Data transfer

Costs are allocated into the following spend types:

| Spend type | Description    |
| -----------| -----------    |
| Usage | Cost of data transfer that is monitored by Cloud Network Monitoring and allocated. |
| Not monitored | Cost of data transfer not monitored by Cloud Network Monitoring. This cost is not allocated. |

{% /if %}

<!-- Azure -->
{% if equals($platform, "azure") %}

### Compute

The cost of a host instance is split into two components: 60% for the CPU and 40% for the memory. If the host instance has GPUs, the cost is split into three components: 95% for the GPU, 3% for the CPU, and 2% for the memory. Each component is allocated to individual workloads based on their resource reservations and usage.

Costs are allocated into the following spend types:

| Spend type | Description    |
| -----------| -----------    |
| Usage | Cost of resources (such as memory, CPU, and GPU) used by workloads, based on the average usage on that day. |
| Workload idle | Cost of resources (such as memory, CPU, and GPU) that are reserved and allocated but not used by workloads. This is the difference between the total resources requested and the average usage. |
| Cluster idle | Cost of resources (such as memory, CPU, and GPU) that are not reserved by workloads in a cluster. This is the difference between the total cost of the resources and what is allocated to workloads. |

{% /if %}

<!-- Google -->
{% if equals($platform, "google") %}

### Compute

The cost of a host instance is split into two components: 60% for the CPU and 40% for the memory. If the host instance has GPUs, the cost is split into three components: 95% for the GPU, 3% for the CPU, and 2% for the memory. Each component is allocated to individual workloads based on their resource reservations and usage.

Costs are allocated into the following spend types:

| Spend type | Description    |
| -----------| -----------    |
| Usage | Cost of resources (such as memory, CPU, and GPU) used by workloads, based on the average usage on that day. |
| Workload idle | Cost of resources (such as memory, CPU, and GPU) that are reserved and allocated but not used by workloads. This is the difference between the total resources requested and the average usage. |
| Cluster idle | Cost of resources (such as memory, CPU, and GPU) that are not reserved by workloads in a cluster. This is the difference between the total cost of the resources and what is allocated to workloads. |
| Not monitored | Cost of resources where the spend type is unknown. To resolve this, install the Datadog Agent on these clusters or nodes. |

{% /if %}

## Understanding resources

Depending on the cloud provider, certain resources may or may not be available for cost allocation.

| Resource | AWS | Azure | Google Cloud |
|---:|---:|---|---|
| CPU | {% x/ %} | {% x/ %} | {% x/ %} |
| Memory | {% x/ %} | {% x/ %} | {% x/ %} |
| {% tooltip contents="Storage resources within a cluster, provisioned by administrators or dynamically, that persist data independently of pod lifecycles." %} Persistent volumes {% /tooltip %} | {% x/ %} |  |  |
| {% tooltip contents="Cost of associated fees charged by the cloud provider for managing the cluster, such as fees for managed Kubernetes services or other container orchestration options." %} Managed service fees {% /tooltip %} | {% x/ %} | {% x/ %} | {% x/ %} |
| ECS costs | {% x/ %} | N/A | N/A |
| Data transfer costs | {% x/ %} | Limited* | Limited* |
| GPU | {% x/ %} | {% x/ %} | {% x/ %}  |
| {% tooltip contents="Directly-attached storage resources for a node." %} Local storage {% /tooltip %} |  | Limited* | Limited* |

`Limited*` resources have been identified as part of your Kubernetes spend, but are not fully allocated to specific workloads or pods. These resources are host-level costs, not pod or namespace-level costs, and are identified with `allocated_spend_type:<resource>_not_supported`.

## Cost metrics

When the prerequisites are met, the following cost metrics automatically appear.

<!-- AWS -->
{% if equals($platform, "aws") %}

| Cost Metric                    | Description    |
| ---                                | ----------- |
| `aws.cost.amortized.shared.resources.allocated` | EC2 costs allocated by the CPU & memory used by a pod or ECS task, using a 60:40 split for CPU & memory respectively and a 95:3:2 split for GPU, CPU, & memory respectively if a GPU is used by a pod. Also includes allocated EBS costs. <br> *Based on `aws.cost.amortized`* |
| `aws.cost.net.amortized.shared.resources.allocated` | Net EC2 costs allocated by CPU & memory used by a pod or ECS task, using a 60:40 split for CPU & memory respectively and a 95:3:2 split for GPU, CPU, & memory respectively if a GPU is used by a pod. Also includes allocated EBS costs. <br> *Based on `aws.cost.net.amortized`, if available* |

{% /if %}
<!-- Azure -->
{% if equals($platform, "azure") %}

| Cost Metric                    | Description    |
| ---                                | ----------- |
| `azure.cost.amortized.shared.resources.allocated` | Azure VM costs allocated by the CPU & memory used by a pod or container task, using a 60:40 split for CPU & memory respectively and a 95:3:2 split for GPU, CPU, & memory respectively if a GPU is used by a pod. Also includes allocated Azure costs. <br> *Based on `azure.cost.amortized`* |

{% /if %}
<!-- Google -->
{% if equals($platform, "google") %}

| Cost Metric                    | Description    |
| ---                                | ----------- |
| `gcp.cost.amortized.shared.resources.allocated` | Google Compute Engine costs allocated by the CPU & memory used by a pod, using 60:40 split for CPU & memory respectively and a 95:3:2 split for GPU, CPU, & memory respectively if a GPU is used by a pod. This allocation method is used when the bill does not already provide a specific split between CPU and memory usage. <br> *Based on `gcp.cost.amortized`* |

{% /if %}

These cost metrics include all of your cloud costs. This allows you to continue visualizing all of your cloud costs at one time.

For example, say you have the tag `team` on a storage bucket, a cloud provider managed database, and Kubernetes pods. You can use these metrics to group costs by `team`, which includes the costs for all three.

## Applying tags

Datadog consolidates and applies the following tags from various sources to cost metrics.

<!-- AWS -->
{% if equals($platform, "aws") %}

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
| `ebs_volume_type`                       | The type of the EBS volume. Can be `gp3`, `gp2`, or others.                                                                              |

### Amazon ECS

In addition to ECS task tags, the following out-of-the-box tags are applied to cost metrics.

**Note**: Most tags from ECS containers are applied (excluding `container_name`).

| Out-of-the-box tag      |  Description |
| ---                     | ------------ |
| `orchestrator:ecs`      | The orchestration platform associated with the item is Amazon ECS. |
| `ecs_cluster_name`      | The name of the ECS cluster. |
| `is_aws_ecs`            | All costs associated with running ECS. |
| `is_aws_ecs_on_ec2`     | All EC2 compute costs associated with running ECS on EC2. |
| `is_aws_ecs_on_fargate` | All costs associated with running ECS on Fargate. |

### Data transfer

The following list of out-of-the-box tags are applied to cost metrics associated with Kubernetes workloads:

| Out-of-the-box tag      |  Description |
| ---                     | ------------ |
| `source_availability_zone` | The availability zone name where data transfer originated. |
| `source_availability_zone_id` | The availability zone ID where data transfer originated. |
| `source_region` | The region where data transfer originated. |
| `destination_availability_zone` | The availability zone name where data transfer was sent to. |
| `destination_availability_zone_id` | The availability zone ID where data transfer was sent to. |
| `destination_region` | The region where data transfer was sent to. |
| `allocated_resource:data_transfer` | The tracking and allocation of costs associated with data transfer activities. |

In addition, some Kubernetes pod tags that are common between all pods on the same node are also applied.

{% /if %}
<!-- Azure -->
{% if equals($platform, "azure") %}

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

{% /if %}
<!-- Google -->
{% if equals($platform, "google") %}

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

{% /if %}

[1]: https://app.datadoghq.com/cost/containers
[2]: https://app.datadoghq.com/cost/setup
[3]: /containers/kubernetes/installation/?tab=operator
[4]: /infrastructure/containers/orchestrator_explorer?tab=datadogoperator
[5]: /containers/amazon_ecs/
[6]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html
[7]: /integrations/amazon_ebs/#metric-collection
[8]: /integrations/dcgm/?tab=kubernetes#installation
[9]: /network_monitoring/cloud_network_monitoring/setup
[10]: https://docs.datadoghq.com/integrations/dcgm/?tab=kubernetes#installation
[11]: https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview
[12]: /containers/kubernetes/tag/
[13]: /containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags
[14]: /containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags
[15]: https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html
[16]: https://kubernetes.io/docs/concepts/workloads/
[17]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/
[18]: https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations
[19]: https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations#limitations
[20]: https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations#enable_breakdown
[21]: https://app.datadoghq.com/integrations/amazon-web-services
