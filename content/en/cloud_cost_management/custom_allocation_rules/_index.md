---
title: Custom Allocation Rules
description: "Allocate cloud costs based on custom allocation rules."
further_reading:
- link: "https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview"
  tag: "Documentation"
  text: "Cloud Cost Management"
---

## Overview

Custom cost allocation allows you to showback or chargeback your costs by attributing selected costs to relevant business dimensions. After you have set up allocation rules, you can report on which costs were allocated by a rule. 

Custom cost allocation runs after [Tag Pipelines][1], enabling allocations based on user-defined tags. Costs are allocated on a daily basis, and can be applied to Cloud Cost metrics from AWS, Google Cloud, and Azure. 

## Rule creation

Access the [Custom Allocation Rules section][2] under Cloud Cost settings to establish rules. Choose from the following allocation methods:


| Allocation Method | Description | Examples |
| ----------------  | ----------- | -------- |
| Proportional  | Costs are allocated based on the proportional spend of destination values. | Untagged support costs are allocated to teams `teamA`, `teamB`, and `teamC` based on their proportion of total spend on Amazon EC2.|
| Even  | Costs are allocated evenly to your destination tags. | Untagged support costs are allocated evenly to teams `teamA`, `teamB`, and `teamC`. |
| Custom Percentage  | Costs are allocated based on custom percentages for the destination tags. | Untagged support costs are allocated 60% to `teamA`, 30% to `teamB`, and 10% to `teamC`. |
| Dynamic by Metric  | Costs are allocated based on the proportional amount of a defined metric. | Shared PostgreSQL costs are allocated by total query execution time to users as defined by the Datadog metrics query `sum:postgresql.queries.time{*} by {user}.as_count()`. |

## Allocation methods

{{< tabs >}}
{{% tab "Proportional Allocation" %}}

Costs are allocated based on the proportional spend of destination values. Apply a filter to refine which part of the bill determines the proportions.

{{< img src="cloud_cost/custom_allocation_rules/proportional_diagram.png" alt="Diagram illustrating the proportional split strategy" style="width:60%;" >}}

{{< img src="cloud_cost/custom_allocation_rules/proportional_ui.png" alt="The proportional split strategy as seen in Datadog" style="width:60%;" >}}

{{% /tab %}}

{{% tab "Even Allocation" %}}

With the even strategy, costs are allocated evenly towards your destination tags, regardless of any other spend. Similarly to proportional allocation, you can further customize your allocation by setting filters and partitions.

{{< img src="cloud_cost/custom_allocation_rules/even_diagram.png" alt="Diagram illustrating the even split strategy" style="width:60%;" >}}

{{< img src="cloud_cost/custom_allocation_rules/even_ui.png" alt="The even split strategy as seen in Datadog" style="width:60%;" >}}

{{% /tab %}}

{{% tab "Custom Percentage Allocation" %}}
With the custom percentage strategy, you can define static custom percentages for the destination tags you select. For example, if you have 3 destinations (`teamA`, `teamB`, `teamC`) you can allocate 60% to `teamA`, 30% to `teamB`, and 10% to `teamC`.

{{< img src="cloud_cost/custom_allocation_rules/custom_percentage_diagram.png" alt="Diagram illustrating the even split strategy" style="width:60%;" >}}

{{< img src="cloud_cost/custom_allocation_rules/custom_percentage_ui.png" alt="The even split strategy as seen in Datadog" style="width:60%;" >}}

{{% /tab %}}

{{% tab "Dynamic by Metric Allocation" %}}

Metrics-based allocation provides the ability to split up costs based on Datadog's [metrics queries][3]. By using performance metrics to allocate expenses, you can more accurately allocate costs based on application usage patterns.

For example, this PostgreSQL metrics query `sum:postgresql.queries.time{*} by {user}.as_count()` tracks the total query execution time per user. The relative values are then used to determine what proportion of total PostgreSQL costs should be allocated to each user.

For determining the proportion of costs to be allocate, metrics can be aggregated on a daily or monthly basis. However, the costs themselves are still allocated on a daily basis.

{{< img src="cloud_cost/custom_allocation_rules/dynamic_diagram.png" alt="Diagram illustrating the dynamic by metric strategy" style="width:60%;" >}}

{{< img src="cloud_cost/custom_allocation_rules/dynamic_ui.png" alt="The dynamic by metric split strategy as seen in Datadog" style="width:60%;" >}}

[3]: /metrics/#querying-metrics

{{% /tab %}}

{{< /tabs >}}

## Specify what costs are included in the allocation
| Step | Required | Examples |
| ---- | ---- | ---- |
| Select the cost provider | Yes | AWS, Google Cloud, Azure |
| Define the costs to split (source) | Yes | `aws_product` contains `support`, `allocated_spend_type` is untagged |
| Define the destination | Yes | `team` is `teamA`, `teamB`, `teamC` |
| Filter by | Only applicable for Proportional and Even strategies, optional | `aws_product` is `ec2` |
| Partition costs by | Only applicable for Proportional and Even strategies, optional | `environment` is all values |
| Name | Yes | allocate\_untagged\_support\_costs |

### Partitioning

For some of the allocation strategies, you can specify how cost proportions should be partitioned to ensure segment-specific allocations. For example, with proportional allocation, if you partition your costs by `environment` using tags like `staging` and `production`, the proportions are calculated separately for each environment. This ensures allocations are based on the specific proportions within each partition.

{{< img src="cloud_cost/custom_allocation_rules/proportional_partition_diagram.png" alt="Diagram illustrating the proportional split strategy with partitioning" style="width:90%;" >}}

## Managing rules
Rules can be modified and deleted in the [Custom Allocation Rules section][2] of the Cloud Cost settings page. All fields except for the rule name can be reconfigured.

Rules are applied in the same order as shown in the list.

## Visualize your allocations
Changes to dynamic allocation rules may take up to 24 hours to be applied. After being applied, the new allocations can be seen throughout Cloud Cost Management. Dynamically allocated costs also include an `allocated_by_rule` tag, denoting the rule name that applied the allocation.

{{< img src="cloud_cost/custom_allocation_rules/visualize_your_allocations.png" alt="See your allocations throughout Datadog" style="width:90%;" >}}

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/tag_pipelines
[2]: https://app.datadoghq.com/cost/settings/custom-allocation-rules
