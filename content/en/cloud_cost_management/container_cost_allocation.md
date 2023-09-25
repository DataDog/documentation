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

{{< img src="cloud_cost/container_cost_allocation/cost_allocation_table.png" alt="Cloud cost allocation table showing requests and idle costs over the past week" style="width:100%;" >}}

## Prerequisites

1. Set up and configure [AWS Cloud Cost integration][1].
2. (Optional) Enable [AWS Split Cost Allocation][5] for usage-based ECS allocation.
1. At least one of the following must be running:
    - [**Datadog Agent**][2] in a Kubernetes environment using EC2 instances. Ensure that you enable the [**Orchestrator Explorer**][6] in your Agent configuration.
    - [**Datadog Container Monitoring**][3] in ECS tasks.

## Cost metrics

When the prerequisites are met, new AWS cost metrics automatically appear.

| AWS Cost Metric                    | Description    |
| ---                                | ----------- |
| `aws.cost.amortized.shared.resources.allocated` | EC2 costs allocated by CPU & memory requested by a pod or ECS task, using a 60:40 split for CPU & memory respectively. <br> *Based on `aws.cost.amortized`* |
| `aws.cost.net.amortized.shared.resources.allocated` | Net EC2 costs allocated by CPU & memory requested by a pod or ECS task, using a 60:40 split for CPU & memory respectively. <br> *Based on `aws.cost.net.amortized`, if available* |


These new cost metrics include all of your AWS cloud costs. This allows you to continue visualizing all of your cloud costs at one time, with added visibility into pods and tasks running on EC2 instances.

For example, say you have the tag `team` on S3 buckets, RDS stores, and Kubernetes pods. You can use one of the new metrics to group cost by `team`, and each group then includes the S3 and RDS costs for that team, as well as the cost of compute resources reserved by the tagged pods.

If you enable AWS Split Cost Allocation, the metrics allocate ECS costs by actual usage instead of requested usage, providing more granular detail.

## Cost allocation

Cost allocation divides EC2 compute costs in the [Cost and Usage Report][4] (CUR) into individual costs for each pod or task running on the instance. These divided costs are then enriched with tags from the nodes, pods, and tasks, which allows you to break down costs by any associated dimensions.

### Kubernetes

For Kubernetes allocation, a Kubernetes node is joined with its associated EC2 instance costs. The node's cluster name and all node tags are added to the entire EC2 compute cost for the node. This allows you to associate cluster-level dimensions with the cost of the instance, without considering the pods scheduled to the node.

Next, Datadog looks at all of the pods running on that node for the day. Based on the resources the pod has reserved and the length of time it ran, the appropriate portion of the node's cost is assigned to that pod. This calculated cost is enriched with all of the pod's tags.

Once all pods have been assigned a cost based on their resource reservations, some node cost is left over. This is the cost of unreserved resources, which is called **Cluster Idle cost**. For more information, see the [Understanding spend](#understanding-spend) section.

### ECS on EC2

For ECS allocation, Datadog determines which tasks ran on each EC2 instance used for ECS.

Based on the CPU or memory usage of each task (as reported in the CUR), Datadog assigns the appropriate portion of the instance's compute cost to that task. The calculated cost is enriched with all of the task's tags and all of the container tags (except container names) for containers running in the task.

Once all tasks have been assigned a cost based on their resource reservations, some instance cost is left over. This is the cost of unreserved resources, which is called **Cluster Idle** cost. For more information, see the [Understanding spend](#understanding-spend) section.

### ECS on Fargate

ECS tasks that run on Fargate are already fully allocated in the CUR. CCM enriches that data by adding out-of-the-box tags and container tags to the AWS Fargate cost.

### Everything else

Any cost other than EC2, computed for instances hosting Kubernetes pods or ECS tasks, is given the same value and tags as the source metric, `aws.cost.amortized`.

## Understanding spend

Using the `allocated_spend_type` tag, you can visualize the spend category associated with your cost at the Kubernetes node, ECS host, or cluster level. Costs are allocated into three spend types:

- Usage: Cost of memory and cpu being used or requested by workloads.
- Workload idle: Cost of memory and cpu that is being requested and allocated but not used by workloads.
- Cluster idle: Costs of memory and cpu not requested by workloads in a cluster.

## Tags

Datadog consolidates and applies additional tags from various sources to cost metrics. Conflicts are resolved by favoring higher-specificity tags such as pod tags over lower-specificity tags such as host tags. For example, if a Kubernetes pod has the tag `service:datadog-agent` and the node it runs on has the tag `service:aws-node`, the resulting final tag shows up as `service:datadog-agent`.

### Containers

| Out-of-the-box tag  |  Description |
| ---                 | ------------ |
| `orchestrator`      | The orchestration platform associated with the item (kubernetes, ecs). |
| `allocated_spend_type`     | The spend category associated with the cost. Cluster costs are allocated into three spend types: resources used by a workload (`usage`); resources reserved by a workload, but not used (`workload_idle`); and resources that are not reserved or used by any workload (`cluster_idle`). *Only available for `.shared.resources.allocated` metrics.* |
| `allocated_resource`   | The resource category associated with the item (cpu, memory). *Only available for `.shared.resources.allocated` metrics.* |

### Kubernetes

In addition to Kubernetes pod and Kubernetes node tags, the following out-of-the-box tags are applied to cost metrics:

| Out-of-the-box tag  |  Description |
| ---                 | ------------ |
| `kube_cluster_name` | The name of the Kubernetes cluster. |
| `is_kubernetes`     | All EC2 compute costs associated with running Kubernetes nodes. *Only available for `.cpu.allocated` or `.mem.allocated` metrics.* |
| `is_cluster_idle`   | The cost of unreserved CPU or memory on Kubernetes nodes. *Only available for `.cpu.allocated` or `.mem.allocated` metrics.*|

### ECS

In addition to ECS task tags, the following out-of-the-box tags are applied to cost metrics. **Note**: most tags from ECS containers (excluding `container_name`) are applied.

| Out-of-the-box tag      |  Description |
| ---                     | ------------ |
| `ecs_cluster_name`      | The name of the ECS cluster. |
| `is_aws_ecs`            | All costs associated with running ECS. |
| `is_aws_ecs_on_ec2`     | All EC2 compute costs associated with running ECS on EC2. |
| `is_aws_ecs_on_fargate` | All costs associated with running ECS on Fargate. |
| `is_cluster_idle`       | The cost of unreserved CPU or memory on EC2 instances running ECS tasks. *Only available for `.cpu.allocated` or `.mem.allocated` metrics.*|

## Other cost metrics

In addition to the `.shared.resources.allocated` metrics, Datadog also allows you to visulaize your workload costs by CPU or memory only.


| AWS Cost Metric                    | Description    |
| ---                                | ----------- |
| `aws.cost.amortized.mem.allocated`   | EC2 costs allocated by memory requested by a pod or ECS task. <br> *Based on `aws.cost.amortized`* |
| `aws.cost.net.amortized.mem.allocated` | Net EC2 costs allocated by memory requested by a pod or ECS task <br> *Based on `aws.cost.net.amortized`, if available* |
| `aws.cost.amortized.cpu.allocated` | EC2 costs allocated by CPU requested by a pod or ECS task <br> *Based on `aws.cost.amortized`* |
| `aws.cost.net.amortized.cpu.allocated` | Net EC2 costs allocated by CPU requested by a pod or ECS task <br> *Based on `aws.cost.net.amortized`, if available* |

- If your workloads are CPU-constrained, use `cpu.allocated`.
- If your workloads are memory-constrained, use `mem.allocated`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/setup
[2]: /containers/kubernetes/installation/?tab=operator
[3]: /containers/amazon_ecs/?tab=awscli
[4]: https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html
[5]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html
[6]: /infrastructure/containers/orchestrator_explorer?tab=datadogoperator
