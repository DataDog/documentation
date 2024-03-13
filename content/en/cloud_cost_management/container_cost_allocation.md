---
title: Container Cost Allocation
kind: documentation
private: true
further_reading:
- link: "https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview"
  tag: "Documentation"
  text: "Cloud Cost Management"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Cost Management is not supported for this site.</div>
{{< /site-region >}}

{{< jqmath-vanilla >}}

## Overview

Datadog Cloud Cost Management (CCM) automatically allocates costs of Kubernetes and AWS ECS clusters to individual pods and tasks running in those clusters. Use cost metrics enriched with tags from pods, nodes, containers, and tasks to visualize container workload cost in the context of your entire cloud bill.

{{< img src="cloud_cost/container_cost_allocation/cost_allocation_table.png" alt="Cloud cost allocation table showing requests and idle costs over the past week" style="width:100%;" >}}

For Kubernetes clusters, CCM allocates costs of AWS and Google host instances, and non-local AWS EBS volumes. For AWS ECS clusters, CCM allocates costs of AWS EC2 instances.

## Prerequisites

1. Set up and configure the [AWS or Google Cloud Cost integration][1].
2. For Kubernetes support, install the [**Datadog Agent**][2] in a Kubernetes environment.
     - Ensure that you enable the [**Orchestrator Explorer**][6] in your Agent configuration.
     - Container cost allocation requires **Agent version >= 7.27.0** and **Cluster Agent version >= 1.11.0**.
     - AWS Persistent Volume allocation requires **Agent version >= 7.46.0**
3. For AWS ECS support, set up [**Datadog Container Monitoring**][3] in ECS tasks.
     - Optionally, enable [AWS Split Cost Allocation][5] for usage-based ECS allocation.

## Cost allocation

Cost allocation divides host compute and AWS EBS volume costs from the cloud provider into associated individual tasks or pods. These divided costs are then enriched with tags from nodes, pods, tasks, and volumes (AWS only). This lets you break down costs by any associated dimensions.

### Kubernetes

#### Compute

For Kubernetes compute allocation, a Kubernetes node is joined with its associated host instance costs. The node's cluster name and all node tags are added to the entire compute cost for the node. This allows you to associate cluster-level dimensions with the cost of the instance, without considering the pods scheduled to the node.

Next, Datadog looks at all of the pods running on that node for the day. The cost of the node is allocated to the pod based on the resources it has used and the length of time it ran. This calculated cost is enriched with all of the pod's tags.

**Note**: Only _tags_ from pods and nodes are added to cost metrics. To include labels, enable labels as tags for [nodes][7] and [pods][8].

#### Persistent volume storage (AWS only)

For Kubernetes Persistent Volume storage allocation, Persistent Volumes (PV), Persistent Volume Claims (PVC), nodes, and pods are joined with their associated EBS volume costs. All associated PV, PVC, node, and pod tags are added to the EBS volume cost line items.

Next, Datadog looks at all of the pods that claimed the volume on that day. The cost of the volume is allocated to a pod based on the resources it used and the length of time it ran. These resources
include the provisioned capacity for storage, IOPS, and throughput. This allocated cost is enriched with all of the pod's tags.

#### Agentless Kubernetes costs (Google Kubernetes Engine only)

To view the costs of GKE clusters without enabling Datadog infrastructure monitoring, use [GKE cost allocation](https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations). Enable GKE cost allocation on unmonitored GKE clusters to access this feature set.

##### Limitations and differences from the Datadog agent

- There is no support for tracking workload idle costs
- The cost of individual pods are not tracked, only the aggregated cost of a workload and the namespace. No `pod_name` tag.
- GKE enriches data using only pod labels and ignores any Datadog tags you add
- The full list of limitations can be found on the [GKE docs](https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations#limitations)

GKE cost allocation can be enabled by following the [instructions in the GKE docs](https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations#enable_breakdown)


### AWS ECS on EC2

For ECS allocation, Datadog determines which tasks ran on each EC2 instance used for ECS. If you enable AWS Split Cost Allocation, the metrics allocate ECS costs by usage instead of reservation, providing more granular detail.

Based on resources the task has used, Datadog assigns the appropriate portion of the instance's compute cost to that task. The calculated cost is enriched with all of the task's tags and all of the container tags (except container names) running in the task.

### AWS ECS on Fargate

ECS tasks that run on Fargate are already fully allocated in the CUR. CCM enriches that data by adding out-of-the-box tags and container tags to the AWS Fargate cost.

### Everything else

The information on this page pertains to compute and AWS EBS costs for host instances running Kubernetes pods or ECS tasks. All other costs are given the same value and tags as the source metric, `aws.cost.amortized` or `gcp.cost.amortized`.


## Understanding spend

Using the `allocated_spend_type` tag, you can visualize the spend category associated with your cost at the Kubernetes node, AWS ECS host, AWS EBS volume, or cluster level. Costs are allocated into different spend types:

| Spend type | Description    |
| -----------| -----------    |
| Managed service fee | Cost of associated fees charged by the provider for managing the cluster, such as EKS or GKE fees. |
| Usage | Cost of resources used by workloads. |
| Workload idle | Cost of resources that are reserved and allocated but not used by workloads. |
| Cluster idle | Cost of resources that are not reserved by workloads in a cluster. |

### Compute

The cost of a host instance is split into two components: 60% for the CPU and 40% for the memory. Each component is allocated to individual workloads based on their resource reservations and usage.

- Usage: Cost of memory and CPU used by workloads, based on the average usage on that day.
- Workload idle: Cost of memory and CPU that is being reserved and allocated but not used. This is the difference between the total resources requested and the average usage.
- Cluster idle: Cost of memory and CPU not reserved by workloads in a cluster. This is the difference between the total cost of the resources and what is allocated to workloads.

### Persistent volumes (AWS only)

The cost of an EBS volume has three components: IOPS, throughput, and storage. Each is allocated according to a pod's usage when the volume is mounted.

- Usage: Cost of provisioned IOPS, throughput, or storage being used by workloads. Storage cost is based on the maximum amount of volume storage used that day. IOPS and throughput costs are based on the average amount used that day.
- Workload idle: Cost of provisioned IOPS, throughput, or storage not being used by workloads. Storage cost is based on the maximum amount of storage used that day. IOPS and throughput costs are based on the average amount used that day. *Note: This tag is only available if you have enabled `Resource Collection` in your [**AWS Integration**][9]. To prevent being charged for `Cloud Security Posture Management`, ensure that during the `Resource Collection` setup, the `Cloud Security Posture Management` box is unchecked.*
- Cluster idle: Cost of provisioned IOPS, throughput, or storage for volumes not claimed by any pods that day.

**Note**: Persistent volume allocation is only supported in Kubernetes clusters, and not available for pods that are part of a Kubernetes Deployment.

## Cost metrics

When the prerequisites are met, new cost metrics automatically appear.

| Cost Metric                    | Description    |
| ---                                | ----------- |
| `aws.cost.amortized.shared.resources.allocated` | EC2 costs allocated by the CPU & memory used by a pod or ECS task, using a 60:40 split for CPU & memory respectively. Also includes allocated EBS costs. <br> *Based on `aws.cost.amortized`* |
| `aws.cost.net.amortized.shared.resources.allocated` | Net EC2 costs allocated by CPU & memory used by a pod or ECS task, using a 60:40 split for CPU & memory respectively. Also includes allocated EBS costs. <br> *Based on `aws.cost.net.amortized`, if available* |
| `gcp.cost.amortized.shared.resources.allocated` | Compute Engine costs allocated by the CPU & memory used by a pod, using 60:40 split for CPU & memory respectively (when no split is already found in the bill). <br> *Based on `gcp.cost.amortized`* |

These new cost metrics include all of your cloud costs. This allows you to continue visualizing all of your cloud costs at one time, with added visibility into the costs of Kubernetes pods and AWS ECS tasks.

For example, say you have the tag `team` on a storage bucket, a cloud provider managed database, and Kubernetes pods. You can use these new metrics to group costs by `team`, which includes the costs for all three.

## Tags

Datadog consolidates and applies additional tags from various sources to cost metrics. Conflicts are resolved by favoring higher-specificity tags such as pod tags over lower-specificity tags such as host tags. For example, a Kubernetes pod tagged `service:datadog-agent` running on a node tagged `service:aws-node` results in a final tag `service:datadog-agent`.

### Containers

| Out-of-the-box tag                         | Description                                                                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------  |
| `orchestrator:kubernetes`                  | The orchestration platform associated with the item is Kubernetes.                                                                                            |
| `orchestrator:ecs`                         | The orchestration platform associated with the item is AWS ECS.                                                                                               |
| `allocated_spend_type:usage`               | Cost of resources used by a workload. |
| `allocated_spend_type:workload_idle`       | Cost of resources reserved and allocated by a workload, but not used. |
| `allocated_spend_type:cluster_idle`        | Cost of resources that are not reserved or used by any workload. |
| `allocated_spend_type:managed_service_fee` | Cost of cloud provider managed service fees. |
| `allocated_resource:cpu`                   | Cost of CPU resources. |
| `allocated_resource:memory`                | Cost of Memory resources. |
| `allocated_resource:managed_service_fee`   | Cost of cloud provider managed service fees. |
| `allocated_resource:persistent_volume`     | Cost of non-local AWS EBS volumes used as Persistent Volumes in Kubernetes. |

### Kubernetes

In addition to Kubernetes pod and Kubernetes node tags, the following non exhaustive list of out-of-the-box tags are applied to cost metrics:

| Out-of-the-box tag  |  Description |
| ---                 | ------------ |
| `kube_cluster_name` | The name of the Kubernetes cluster. |
| `kube_namespace` | The namespace where workloads are running. |
| `kube_deployment` | The name of the Kubernetes Deployment. |
| `kube_stateful_set` | The name of the Kubernetes StatefulSet. |
| `pod_name` | The name of any individual pod. |


### AWS ECS

In addition to ECS task tags, the following out-of-the-box tags are applied to cost metrics. **Note**: most tags from ECS containers (excluding `container_name`) are applied.

| Out-of-the-box tag      |  Description |
| ---                     | ------------ |
| `ecs_cluster_name`      | The name of the ECS cluster. |
| `is_aws_ecs`            | All costs associated with running ECS. |
| `is_aws_ecs_on_ec2`     | All EC2 compute costs associated with running ECS on EC2. |
| `is_aws_ecs_on_fargate` | All costs associated with running ECS on Fargate. |

### Persistent volumes (AWS only)

In addition to Kubernetes pod and Kubernetes node tags, the following out-of-the-box tags are applied to cost metrics.

| Out-of-the-box tag                      | Description                                                                                                                                  |
| ---                                     |----------------------------------------------------------------------------------------------------------------------------------------------|
| `persistent_volume_reclaim_policy`      | The Kubernetes Reclaim Policy on the Persistent Volume.                                                                                      |
| `storage_class_name`                    | The Kubernetes Storage Class used to instantiate the Persistent Volume.                                                                      |
| `volume_mode`                           | The Volume Mode of the Persistent Volume.                                                                                                    |
| `ebs_volume_type`                       | The type of the AWS EBS volume. Can be `gp3`, `gp2`, or others.                                                                              |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/setup
[2]: /containers/kubernetes/installation/?tab=operator
[3]: /containers/amazon_ecs/?tab=awscli
[4]: https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html
[5]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html
[6]: /infrastructure/containers/orchestrator_explorer?tab=datadogoperator
[7]: /containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags
[8]: /containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags
[9]: https://app.datadoghq.com/integrations/amazon-web-services
