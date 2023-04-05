---
title: Container Cost Allocation
kind: documentation
disable_toc: false
private: true
further_reading:
- link: "https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview"
  tag: "Documentation"
  text: "Cloud Cost Management"
---

{{< jqmath-vanilla >}}

## Overview

Datadog Cloud Cost Management (CCM) automatically allocates EC2 compute cost in Kubernetes and ECS clusters to individual pods and tasks running in those clusters. Use cost metrics enriched with tags from pods, nodes, containers, and tasks to visualize container workload cost in the context of your entire cloud bill.

{{< img src="cloud_cost/container_cost_allocation/cost_allocation_table.png" alt="Your image description" style="width:100%;" >}}

## Prerequisites

1. Set up and configure [AWS Cloud Cost integration][1].
1. At least one of the following must be running:
    - [**Datadog Kubernetes agent**][2] in a Kubernetes environment using EC2 instances. 
    - **Datadog container monitoring** in containers running in ECS tasks. The container agent must be configured to use [orchestrator tag cardinality][3].

## Cost metrics

When the prerequisites are met, new AWS cost metrics automatically appear.

| AWS Cost Metric                    | Description    |
| ---                                | ----------- | 
| `aws.cost.amortized.mem.allocated`   | EC2 costs allocated by memory requested by a pod or ECS task. <br> *Based on `aws.cost.amortized`* | 
| `aws.cost.net.amortized.mem.allocated` | Net EC2 costs allocated by memory requested by a pod or ECS task <br> *Based on `aws.cost.net.amortized`, if available* |
| `aws.cost.amortized.cpu.allocated` | EC2 costs allocated by CPU requested by a pod or ECS task <br> *Based on `aws.cost.amortized`* |
| `aws.cost.net.amortized.cpu.allocated` | Net EC2 costs allocated by CPU requested by a pod or ECS task <br> *Based on `aws.cost.net.amortized`, if available* |

These new cost metrics include all of your AWS cloud costs. This allows you to continue visualizing all of your cloud costs at one time, with added visibility into pods and tasks running on EC2 instances.

For example, say you have the tag `team` on S3 buckets, RDS stores, and Kubernetes pods. You can use one of the new metrics to group cost by `team`, and each group then includes the S3 and RDS costs for that team, as well as the cost of compute resources reserved by the tagged pods.

## Cost allocation

Cost allocation divides EC2 compute costs in the [Cost and Usage Report][4] (CUR) into individual costs for each pod or task running on the instance. These divided costs are then enriched with tags from the nodes, pods, and tasks, which allows you to break down costs by any associated dimensions.

### Kubernetes

For the Kubernetes allocation, a Kubernetes node is joined with its associated EC2 instance costs. The node's cluster name and all node tags are added to the entire EC2 compute cost for the node. This allows you to associate cluster-level dimensions with the cost of the instance, without considering the pods scheduled to the node.

Next, Datadog looks at all of the pods running on that node for the day. Based on the resources the pod has reserved and the length of time it ran, the appropriate portion of the node's cost is assigned to that pod. This calculated cost is enriched with all of the pod's tags.

Once all pods have been assigned a cost based on their resource reservations, some node cost is leftover. This is the cost of unreserved resources, which we call **Cluster Idle cost**. This cost is assigned the `is_cluster_idle` tag, and it represents the cost of resources that can be scheduled but are not reserved for any pods. For more information, see the [Understanding cluster idle cost](#understanding-cluster-idle-cost) section.

### ECS on EC2

For ECS allocation, Datadog determines which tasks ran on each EC2 instance used for ECS.

Based on the CPU or memory usage of each task (as reported in the CUR), Datadog assigns the appropriate portion of the instance's compute cost to that task. The calculated cost is enriched with all of the task's tags and all of the container tags (except container names) for containers running in the task.

Once all tasks have been assigned a cost based on their resource reservations, some instance cost is leftover. This is the cost of unreserved resources, which we call **Cluster Idle** cost. This cost is assigned the `is_cluster_idle` tag, and it represents the cost of resources not reserved by any ECS tasks. For more information, see the [Understanding cluster idle cost](#understanding-cluster-idle-cost) section.

### ECS on Fargate

ECS tasks that run on Fargate are already fully allocated in the CUR. CCM enriches that data by adding out of the box tags and container tags to the AWS Fargate cost.

### Everything else

Any cost other than EC2, computed for instances hosting Kubernetes pods or ECS tasks, is given the same value and tags as the source metric, `aws.cost.amortized`.

## Understanding the new metrics

There is no specific cost associated with CPU and memory since EC2 instances are priced based on the full set of specs in a bundle. To address this, Datadog runs cost allocation twice:
  - Once based solely on CPU requests, generating `aws.cost.amortized.cpu.allocated`.
  - Once based solely on memory requests, generating `aws.cost.amortized.mem.allocated`.

### Understand which metrics provide the best insight into your costs

- If your workloads are CPU-constrained, only using `cpu.allocated` may work for you. 
- If your workloads are memory-constrained, exclusively using `mem.allocated` might meet your use case.
- If you have a mix of CPU and memory-intensive workloads, or you simply want a consistent way to visualize the costs of considering all resources, you can use formulas and functions to create your own equation to combine CPU and memory costs. For example, for a 50/50 split, you can plot:

$$\text"a " = \text" sum(aws.cost.amortized.cpu.allocated) by {team}"$$

$$\text"b" = \text"sum(aws.cost.amortized.mem.allocated) by {team}"$$

$$\text"mixed_cost" = (0.5 * \text"a") + (0.5 * \text"b")$$

As long as the multipliers are positive and sum to 1, the formula will generate coherent costs.

**Note**: For costs that are not related to containers on EC2, all three metrics are equal:
  - `aws.cost.amortized` 
  - `aws.cost.amortized.cpu.allocated`
  - `aws.cost.amortized.mem.allocated`

## Understanding cluster idle cost

Cluster idle cost is the cost of CPU or memory resources that are not reserved by any workloads.

You can visualize this cost at the Kubernetes node, ECS host, or cluster level, using the `is_cluster_idle` tag. All costs allocated to scheduled pods or tasks have `is_cluster_idle: N/A`, while all compute costs not assigned to any pods or tasks have the tag `is_cluster_idle: true`.

Here is a sample query that displays all Kubernetes cluster cost, broken down by cluster name and cluster idle cost:
   
`sum:aws.cost.amortized.cpu.allocated{is_kubernetes:true} by {kube_cluster_name, is_cluster_idle}`

  {{< img src="/cloud_cost/container_cost_allocation/cost_allocation_editor_config.png" alt="Example configuration for mixed resources with break down by cluster name and cluster idle cost tags" style="width:100%;" >}}

## Tags

Datadog applies additional tags to cost metrics where container costs are allocated.

### Kubernetes

In addition to Kubernetes pod and Kubernetes node tags, the following out of the box tags are applied to cost metrics:

| Out of the box tag  |  Description |
| ---                 | ------------ | 
| `kube_cluster_name` | The name of the kubernetes cluster. |
| `is_kubernetes`     | All EC2 compute costs associated with running Kubernetes nodes. |
| `is_cluster_idle`   | The cost of unreserved CPU or memory on Kubernetes nodes. |

### ECS

In addition to ECS task tags, the following out of the box tags are applied to cost metrics. **Note**: most tags from ECS containers (excluding `container_name`) are applied.

| Out of the box tag      |  Description |
| ---                     | ------------ | 
| `ecs_cluster_name`      | The name of the ECS cluster. |
| `is_aws_ecs`            | All costs associated with running ECS. |
| `is_aws_ecs_on_ec2`     | All EC2 compute costs associated with running ECS on EC2. |
| `is_cluster_idle`       | The cost of unreserved CPU or memory on EC2 instances running ECS tasks. |
| `is_aws_ecs_on_fargate` | All costs associated with running ECS on Fargate. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/setup
[2]: /containers/kubernetes/installation/?tab=operator
[3]: /getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality
[4]: https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html
