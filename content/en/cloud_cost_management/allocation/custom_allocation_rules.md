---
title: Custom Allocation Rules
description: "Allocate cloud costs based on custom allocation rules."
aliases:
- /cloud_cost_management/custom_allocation_rules
further_reading:
- link: "https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "https://www.datadoghq.com/blog/finops-at-datadog/"
  tag: "Blog"
  text: "How we've created a successful FinOps practice at Datadog"
---

## Overview

Custom allocation rules let you split and assign shared costs to any available tags, such as teams, projects, or environments, supporting accurate showback and chargeback.

The following allocation methods are available:

 | Allocation Method | Description | Use Case | Example |
 | ----------------  | ----------- | -------- | --------|
 | Even  | Split costs evenly among all destinations. | Scenarios where each team, project, or environment should be charged the same amount for a shared cost. | Untagged support costs are allocated evenly to teams `teamA`, `teamB`, and `teamC`. |
 | Custom  | Split costs to each destination based on percentages you define. | Scenarios where business rules or agreements dictate how much each team should pay. | Untagged support costs are allocated 60% to `teamA`, 30% to `teamB`, and 10% to `teamC`. |
 | Proportional by spend | Split costs based on each destination's share of total spend. | Scenarios where teams should pay in proportion to their actual spend. | Untagged support costs are allocated to teams `teamA`, `teamB`, and `teamC` based on their proportion of total spend on Amazon EC2.|
 | Dynamic by metric  | Split costs based on each destination's share of total usage. | Scenarios where teams should pay in proportion to their actual usage. | Shared PostgreSQL costs are allocated by total query execution time per team. |

Custom allocation rules run after [Tag Pipelines][1], enabling cost allocations on the latest user-defined tags. Costs are allocated on a daily basis. Cost allocations can be applied to AWS, Google Cloud, and Azure costs.

## Create a custom allocation rule

### Step 1 - Define the source

1. Navigate to [Cloud Cost > Settings > Custom Allocation Rules][2] and click **Add New Rule** to start.
2. From the dropdown, select the shared costs you want to allocate.

   _Example: Untagged support costs, shared database costs._

### Step 2 - Choose an allocation method

Below is a description of how each allocation method works with examples.

{{< tabs >}}

{{% tab "Even" %}}

{{< img src="cloud_cost/custom_allocation_rules/even_diagram.png" alt="Diagram illustrating the even split strategy" style="width:70%;" >}}

With the even strategy, costs are allocated evenly towards your destination tags. [Apply a filter](#step-4---optional-apply-filters) to refine which part of the bill determines the proportions.

{{< img src="cloud_cost/custom_allocation_rules/ui-even.png" alt="The even split strategy as seen in Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Custom percentage" %}}

{{< img src="cloud_cost/custom_allocation_rules/custom_percentage_diagram.png" alt="Diagram illustrating the even split strategy" style="width:70%;" >}}

With the custom percentage strategy, you can define static custom percentages for the destination tags you select. For example, if you have 3 destinations (`teamA`, `teamB`, `teamC`) you can allocate 60% to `teamA`, 30% to `teamB`, and 10% to `teamC`.

{{< img src="cloud_cost/custom_allocation_rules/ui-custom.png" alt="The even split strategy as seen in Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Proportional" %}}

{{< img src="cloud_cost/custom_allocation_rules/proportional_diagram-2.png" alt="Diagram illustrating the proportional split strategy" style="width:70%;" >}}

Costs are allocated based on the proportional spend of destination values. Similarly to even allocation, you can further customize your allocation by setting filters and partitions.

In the preceding diagram, the pink bar represents a filter on the cost allocation. With this filter applied, EC2 support fees are split across teams _based on each team's share of overall EC2 spend_.

To create a rule for this allocation, you can:

- Define the costs to allocate (source): **EC2 support fees** (`aws_product:support`).
- Choose the allocation method: **Proportional by spend**.
- Choose the [destination tag](#step-3---define-the-destination) to split your costs by: **User** (`User A`, `User B`, `User C`).
- Refine the allocation by applying [filters](#step-4---optional-apply-filters): **EC2** (`aws_product:ec2`).
- Create suballocations by [partitioning](#step-5---optional-apply-a-partition) the allocation rule: **environment** (`env`).

You can also specify how cost proportions should be partitioned to ensure segment-specific allocations. For example, if you partition your costs by environment using tags like `staging` and `production`, the proportions are calculated separately for each environment. This ensures allocations are based on the specific proportions within each partition.

{{< img src="cloud_cost/custom_allocation_rules/ui-proportional-by-spend.png" alt="The proportional split strategy as seen in Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Dynamic by metric" %}}

{{< img src="cloud_cost/custom_allocation_rules/dynamic_diagram.png" alt="Diagram illustrating the dynamic by metric strategy" style="width:70%;" >}}

Metrics-based allocation provides the ability to split up costs based on Datadog's [metrics queries][1]. By using performance metrics to allocate expenses, you can more accurately allocate costs based on application usage patterns.

For example, this PostgreSQL metrics query `sum:postgresql.queries.time{*} by {user}.as_count()` tracks the total query execution time per user. The relative values are then used to determine what proportion of total PostgreSQL costs should be allocated to each user.

To create a rule for this allocation, you could:

- Define the costs to allocate (source): **PostgreSQL costs** (`azure_product_family:dbforpostgresql`).
- Choose the allocation method: **Dynamic by metric**
- Choose the [destination tag](#step-3---define-the-destination) to split your costs by: **User** (`User A`, `User B`, `User C`).
- Define the metric query used to split the source costs: **Query execution time per user** (`sum:postgresql.queries.time{*}` by `{user}.as_count`).
- Create suballocations by [partitioning](#step-5---optional-apply-a-partition) the allocation rule: **environment** (`env`).

{{< img src="cloud_cost/custom_allocation_rules/ui-dynamic-by-metric.png" alt="The dynamic by metric split strategy as seen in Datadog" style="width:90%;" >}}

[1]: /metrics/#querying-metrics

{{% /tab %}}

{{< /tabs >}}

### Step 3 - Define the destination

Decide which dimensions, such as `team`, `department`, or `service`, receive the allocated costs. For example:

You can select multiple values for your destination tag. For instance, if you select the `team` tag, you can choose specific teams like `teamA`, `teamB`, and `teamC` to receive the allocated costs.

### Step 4 - (optional) Apply filter(s)

Apply a filter across the entire allocation rule. Filters help you target the allocation rule to the relevant subset of your cloud spend.

_Example: Only apply cost allocation where environment is production._

- **Proportional by spend**: Let's say you allocate shared costs to the team tag, proportional to how much each team spends. You can add a filter, creating a cost allocation that is proportional to how much team spends on `aws_product` is `ec2`.
- **Dynamic by metric**: Let's say you allocate shared PostgreSQL costs to the service tag, proportional to the query execution time of each service. You can add a filter, creating a cost allocation that only applies where `environment` is `production`.

### Step 5 - (optional) Apply a partition

Partitioning allows you to split a single allocation rule into multiple sub-allocations. For example, instead of creating separate rules for each environment (like production and staging), you can create one rule that is partitioned by `environment`. Each partitioned sub-allocation uses the same allocation structure, but applies only to costs matching that tag value.

**Note**: For Dynamic by Metric, the tag you select to partition by must exist in both your cloud cost and metric data.

{{< tabs >}}

{{% tab "Even allocation" %}}

With this partition, the same even allocation rule is applied to each environment.

{{< img src="cloud_cost/custom_allocation_rules/even_partition_diagram.png" alt="Diagram illustrating the even split strategy with partitioning" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Proportional allocation" %}}

With this partition, the same proportional allocation rule is applied to each environment.

{{< img src="cloud_cost/custom_allocation_rules/proportional_partition_diagram-2.png" alt="Diagram illustrating the proportional split strategy with partitioning" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Dynamic by metric allocation" %}}

With this partition, the same dynamic by metric allocation rule is applied to each environment.

{{< img src="cloud_cost/custom_allocation_rules/dynamic_partition_diagram.png" alt="Diagram illustrating the dynamic split strategy with partitioning" style="width:100%;" >}}

{{% /tab %}}

{{< /tabs >}}

## Managing rules
Rules can be modified and deleted in the [Custom Allocation Rules section][2] of the Cloud Cost settings page. All fields except for the rule name can be reconfigured.

When you delete a custom allocation rule, the associated allocation is automatically removed from the current month and prior month's data within 24 hours. To remove allocations from older data, contact [Datadog support][3] to request a backfill.

You can also disable a custom allocation rule without deleting it.

Rules are applied in the same order as shown in the list.

## Visualize your allocations
Changes to custom allocation rules may take up to 24 hours to be applied. After being applied, the new allocations can be seen throughout Cloud Cost Management. Custom allocated costs also include an `allocated_by_rule` tag, denoting the rule name that applied the allocation.

{{< img src="cloud_cost/custom_allocation_rules/visualize_your_allocations-1.png" alt="See your allocations throughout Datadog" style="width:90%;" >}}

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/tags/tag_pipelines
[2]: https://app.datadoghq.com/cost/settings/custom-allocation-rules
[3]: https://www.datadoghq.com/support/
