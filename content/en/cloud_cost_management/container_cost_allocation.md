---
title: Container Cost Allocation
kind: documentation
disable_toc: false
private: true
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

{{< jqmath-vanilla >}}

## Overview

Datadog Cloud Cost Management (CCM) automatically allocates EC2 compute cost in Kubernetes and ECS clusters to individual pods and tasks running in those clusters.

## Prerequisites

1. Set up and configure [AWS Cloud Cost integration][1].
1. At least one of the following:
    - [**Datadog Kubernetes agent**][2] running in a Kubernetes environment using EC2 instances. 
    - **Datadog container monitoring** in containers running in ECS tasks. The container agent must be configured to use [orchestrator tag cardinality][3].

## Cost metrics

When the prerequisites are met, new AWS cost metrics automatically appear.

| AWS Cost Metric                    | Description    |
| ---                                | ----------- | 
| `aws.cost.amortized.mem.allocated`   | EC2 costs allocated by memory requested by a pod or ECS task. <br> *Based on `aws.cost.amortized`* | 
| `aws.cost.net.amortized.mem.allocated` | Net EC2 costs allocated by memory requested by a pod or ECS task <br> *Based on `aws.cost.net.amortized`, if available* |
| `aws.cost.amortized.cpu.allocated` | EC2 costs allocated by CPU requested by a pod or ECS task <br> *Based on `aws.cost.amortized`* |
| `aws.cost.net.amortized.cpu.allocated` | Net EC2 costs allocated by CPU requested by a pod or ECS task <br> *Based on `aws.cost.net.amortized`* |

These new cost metrics include all of your AWS cloud costs. This allows you to continue visualizing all of your cloud costs at one time, with added visibility into pods and tasks running on EC2 instances.

For example, let's say you have the tag `team` on S3 buckets, RDS stores, and Kubernetes pods. You can use one of the new metrics to group cost by `team`, and each group will include the S3 and RDS costs for that team, as well as the cost of compute resources reserved by the tagged pods.

## Cost allocation

Cost allocation divides EC2 compute costs in the [Cost and Usage Report][4] (CUR) into individual costs for each pod or task running on the instance. These divided costs are then enriched with tags from the nodes, pods, and tasks, which allows you to break down costs by any associated dimensions.

### Kubernetes

For Kubernetes allocation, we first join a Kubernetes node with its associated EC2 instance costs. The node's cluster name and all node tags are added to the entire EC2 compute cost for the node. This allows you to associate cluster-level dimensions with the cost of the instance, without considering the pods scheduled to the node.

Next, we look at all of the pods running on that node for the day. Based on the resources the pod had reserved and the length of time it ran, we assign the appropriate portion of the node's cost to that pod. This calculated cost is enriched with all of the pod's tags.

Once all pods have been assigned a cost based on their resource reservations, there will be some node cost leftover. This is the cost of unreserved resources, which we call **Cluster Idle cost**. This cost is assigned the `is_cluster_idle` tag, and it represents the cost of resources that can be scheduled but Kubernetes did not reserve for any pods.

### ECS on EC2

For ECS allocation, we determine which tasks ran on each EC2 instance used for ECS.

Based on the CPU or memory usage of each task (as reported in the CUR), we assign the appropriate portion of the instance's compute cost to that task. The calculated cost is enriched with all of the task's tags and all of the container tags (except container names) for containers running in the task.

Once all tasks have been assigned a cost based on their resource reservations, there will be some instance cost leftover. This is the cost of unreserved resources, which we call **Cluster Idle** cost. This cost is assigned the `is_cluster_idle` tag, and it represents the cost of resources not reserved by any ECS tasks.


### ECS on Fargate

ECS tasks that run on Fargate are already fully allocated in the CUR. CCM enriches that data by adding out of the box tags and container tags to the AWS Fargate cost.

### Everything else

Any cost other than EC2, computed for instances hosting Kubernetes pods or ECS tasks, is given the same value and tags as the source metric, `aws.cost.amortized`.

## Understanding the new metrics

There is no specific cost associated with CPU and memory since EC2 instances are priced based on the full set of specs in a bundle. To address this, Datadog runs cost allocation twice:
  - Once based solely on CPU requests, generating `aws.cost.amortized.cpu.allocated`.
  - Once based solely on memory requests, generating `aws.cost.amortized.mem.allocated`.

If your workloads are CPU-constrained, exclusively using cpu.allocated may work for you. Similarly, using exclusively mem.allocated may work for memory-constrained workloads.

If you have a mix of CPU- and memory-intensive workloads, or you simply want a consistent way to visualize the costs ofconsidering all resources, you can use formulas and functions to create your own equation to combine CPU and memory costs. For example, for a 50/50 split, you can plot:

$$\text"a " = \text" sum(aws.cost.amortized.cpu.allocated) by {team}"$$

$$\text"b" = \text"sum(aws.cost.amortized.mem.allocated) by {team}"$$

$$\text"mixed_cost" = (0.5 * \text"a") + (0.5 * \text"b")$$

As long as the multipliers are positive and sum to 1, the formula will generate coherent costs.

Note that for costs that are not related to containers on EC2, all three metrics are equal:

`aws.cost.amortized` == `aws.cost.amortized.cpu.allocated`== `aws.cost.amortized.mem.allocated`

## Understanding cluster idle cost

Cluster idle cost is the cost of CPU or memory resources not reserved by any workloads.

You can visualize this cost at the Kubernetes node, ECS host, or cluster level, using the `is_cluster_idle` tag. All costs allocated to scheduled pods or tasks will have `is_cluster_idle: N/A`, while all compute costs not assigned to any pods or tasks will show as `is_cluster_idle: true`.


## Further reading
aws.cost.amortized.cpu.allocated
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/setup
[2]: /containers/kubernetes/installation/?tab=operator
[3]: /getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality
[4]: https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html
