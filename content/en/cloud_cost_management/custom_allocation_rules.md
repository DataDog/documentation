---
title: Custom Allocation Rules
description: "Allocate cloud costs based on custom allocation rules."
further_reading:
- link: "https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview"
  tag: "Documentation"
  text: "Cloud Cost Management"
---

## Overview

Custom allocation rules let you split and assign shared costs to any available tags, such as teams, projects, or environments, supporting accurate showback and chargeback.

With custom allocation rules, platform engineers and FinOps can:

- Allocate shared costs using even, proportional, custom percentage, or metric-based methods
- Refine which costs are included using filters
- Split allocations by environment, team, or other tags with partitioning
- Review and manage all allocation rules in one place

These are the general steps to create a custom allocation rule:

1. **[Define the source costs](#define-the-source)**. Specify which costs to allocate by setting criteria such as provider, product, spend type, or tags.
   
   _Example: Untagged support costs, shared database costs._
1. **Choose your [allocation method](#choose-an-allocation-method)**. Options include:

   | Allocation Method | Description | Use Case | Example |
   | ----------------  | ----------- | -------- | --------|
   | Even  | Split costs evenly among all destinations, regardless of usage or size. | Scenarios where each team, project, or environment should be charged the same amount for a shared cost. | Untagged support costs are allocated evenly to teams `teamA`, `teamB`, and `teamC`. |
   | Custom  | Split costs based on percentages you define to each destination. | Scenarios where business rules or agreements dictate how much each team should pay. | Untagged support costs are allocated 60% to `teamA`, 30% to `teamB`, and 10% to `teamC`. |
   | Proportional by spend | Split costs based on each destination's share of total spend. | Scenarios where teams should pay in proportion to their actual usage or spend. | Untagged support costs are allocated to teams `teamA`, `teamB`, and `teamC` based on their proportion of total spend on Amazon EC2.|
   | Dynamic by metric  | Split costs based on a performance or usage metric. | Scenarios where costs should be split in proportion to resource consumption metrics. | Shared PostgreSQL costs are allocated by total query execution time to users as defined by the Datadog metrics query `sum:postgresql.queries.time{*} by {user}.as_count()`. |

1. **[Select your destinations](#define-the-destination)**. Decide which tags, such as metric, cost, or environment, receive the allocated costs.
1. (Optional) **[Apply filters](#filtering)**. Refine the filters that should apply to the allocation rule.

   _Example: Only apply cost allocation where `aws_product` is `ec2`._
1. (Optional) **[Use partitioning](#partitioning)**. Automatically create sub-allocations using your allocation logic.

   _Example: Split costs separately for each environment (`prod`, `staging`). Partitioning would create sub-allocations for each of these environments._

Custom cost allocation runs after [Tag Pipelines][1] have finished processing any updated tags, enabling allocations based on the latest user-defined tags. Costs are allocated on a daily basis, and can be applied to Cloud Cost metrics from AWS, Google Cloud, and Azure. 

## Accessing custom allocation rules

Navigate to [**Cloud Cost > Custom Allocation Rules**][2], which is a section under Cloud Cost settings to establish rules and click **Add New Rule** to start.

## Define the source

Use the dropdown filters to specify the cloud provider, specific products or services, cost types, and any other attributes or tags that help you target the right costs.

## Choose an allocation method

Choosing the right allocation method ensures that costs are attributed fairly and transparently, supporting accurate showback, chargeback, or internal reporting.

Below is a description of how each allocation method works with examples.

{{< tabs >}}

{{% tab "Even" %}}

{{< img src="cloud_cost/custom_allocation_rules/even_diagram.png" alt="Diagram illustrating the even split strategy" style="width:70%;" >}}

With the even strategy, costs are allocated evenly towards your destination tags. [Apply a filter](#filtering) to refine which part of the bill determines the proportions.

{{< img src="cloud_cost/custom_allocation_rules/ui-even.png" alt="The even split strategy as seen in Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Custom percentage" %}}

{{< img src="cloud_cost/custom_allocation_rules/custom_percentage_diagram.png" alt="Diagram illustrating the even split strategy" style="width:70%;" >}}

With the custom percentage strategy, you can define static custom percentages for the destination tags you select. For example, if you have 3 destinations (`teamA`, `teamB`, `teamC`) you can allocate 60% to `teamA`, 30% to `teamB`, and 10% to `teamC`.

{{< img src="cloud_cost/custom_allocation_rules/ui-custom.png" alt="The even split strategy as seen in Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Proportional" %}}

{{< img src="cloud_cost/custom_allocation_rules/proportional_diagram.png" alt="Diagram illustrating the proportional split strategy" style="width:70%;" >}}

Costs are allocated based on the proportional spend of destination values. Similarly to even allocation, you can further customize your allocation by setting filters and partitions.

In the preceding diagram, EC2 support fees across teams are allocated based on their share of overall EC2 spend. Proportions are calculated based on how much each team spent.

To create a rule for this allocation, you can:

- Define the costs to allocate (source): **EC2 support fees** (`aws_product:support`).
- Choose the allocation method: **Proportional by spend**.
- Choose the [destination tag](#define-the-destination) to split your costs by: **User** (`User A`, `User B`, `User C`).
- Refine the allocation by applying [filters](#filtering): **EC2** (`aws_product:ec2`).
- Create suballocations by [partitioning](#partitioning) the allocation rule: **environment** (`env`).

You can also specify how cost proportions should be partitioned to ensure segment-specific allocations. For example, if you partition your costs by environment using tags like `staging` and `production`, the proportions are calculated separately for each environment. This ensures allocations are based on the specific proportions within each partition.

{{< img src="cloud_cost/custom_allocation_rules/ui-proportional-by-spend.png" alt="The proportional split strategy as seen in Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Dynamic by metric" %}}

{{< img src="cloud_cost/custom_allocation_rules/dynamic_diagram.png" alt="Diagram illustrating the dynamic by metric strategy" style="width:70%;" >}}

Metrics-based allocation provides the ability to split up costs based on Datadog's [metrics queries][1]. By using performance metrics to allocate expenses, you can more accurately allocate costs based on application usage patterns.

For example, this PostgreSQL metrics query `sum:postgresql.queries.time{*} by {user}.as_count()` tracks the total query execution time per user. The relative values are then used to determine what proportion of total PostgreSQL costs should be allocated to each user.

To create a rule for this allocation, you could:

- Define the costs to allocate (source): **PostGreSQL costs** (`azure_product_family:dbforpostgresql`).
- Choose the allocation method: **Dynamic by metric**
- Choose the [destination tag](#define-the-destination) to split your costs by: **User** (`User A`, `User B`, `User C`).
- Refine the allocation by applying [filters](#filtering): **EC2** (`aws_product:ec2`).
- Define the metric query used to split the source costs: **Query execution time per user** (`sum:postgresql.queries.time{*}` by `{user}.as_count`).
- Create suballocations by [partitioning](#partitioning) the allocation rule: **environment** (`env`).

{{< img src="cloud_cost/custom_allocation_rules/ui-dynamic-by-metric.png" alt="The dynamic by metric split strategy as seen in Datadog" style="width:90%;" >}}

[1]: /metrics/#querying-metrics

{{% /tab %}}

{{< /tabs >}}

## Define the destination

Select the destination tag(s) to split your costs by. The destination tag determines which entities (such as teams, projects, or environments) receive the allocated costs. For example:

You can select multiple values for your destination tag. For instance, if you select the `team` tag, you can choose specific teams like `teamA`, `teamB`, and `teamC` to receive the allocated costs.


## Filtering

Filters help you target the allocation rule to the relevant subset of your cloud spend. For example, you might only want to allocate costs where `aws_product` is `ec2`.

- **Proportional by spend**: For example, you might want to allocate costs to the team tag, filtered to how much each team spends on `aws_product` is `ec2`.
- **Dynamic b metric**: For example, you might want to allocate costs to teams using PostgreSQL query execution time, filtered to queries where `env` is `production`.

## Partitioning

Partitioning allows you to split a single allocation rule into multiple sub-allocations based on a tag value such as `env`. Instead of creating separate rules for each environment (like production and staging), you can create one rule that is automatically applied to each value of the tag. Each partitioned sub-allocation uses the same allocation structure, but applies only to costs matching that tag value.

For example, if you partition by `env:prod` and `env:staging`, the rule creates separate allocations for each environment, but with the same structure.

**Note**: When using partitioning, the tag you select must exist in both your cloud cost and metrics data. For example, if you want to partition by `env`, this tag must be present in both your AWS cost data and your Datadog metrics.

{{< tabs >}}

{{% tab "Even allocation" %}}

With this partition, the same even allocation rule is applied to each environment.

{{< img src="cloud_cost/custom_allocation_rules/even_partition_diagram.png" alt="Diagram illustrating the even split strategy with partitioning" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Proportional allocation" %}}

In this example, EC2 support fees are proportionally allocated to teams in two different environments - staging and prod - based on each team's share of EC2 spend.

{{< img src="cloud_cost/custom_allocation_rules/proportional_partition_diagram.png" alt="Diagram illustrating the proportional split strategy with partitioning" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Dynamic by metric allocation" %}}

In this example, PostgreSQL costs are allocated to users in staging and prod based on each user's share of total query execution time.

{{< img src="cloud_cost/custom_allocation_rules/dynamic_partition_diagram.png" alt="Diagram illustrating the dynamic split strategy with partitioning" style="width:100%;" >}}

{{% /tab %}}

{{< /tabs >}}

## Managing rules
Rules can be modified and deleted in the [Custom Allocation Rules section][2] of the Cloud Cost settings page. All fields except for the rule name can be reconfigured.

When you delete a custom allocation rule, the associated allocation is automatically removed from the current month and prior month's data within 24 hours. To remove allocations from older data, contact [Datadog support][3] to request a backfill.

You can also disable a custom allocation rule without deleting it.

Rules are applied in the same order as shown in the list.

## Visualize your allocations
Changes to custom allocation rules may take up to 24 hours to be applied. After being applied, the new allocations can be seen throughout Cloud Cost Management on all costs that have Container Allocation enabled. Custom allocated costs also include an `allocated_by_rule` tag, denoting the rule name that applied the allocation.

{{< img src="cloud_cost/custom_allocation_rules/visualize_your_allocations-1.png" alt="See your allocations throughout Datadog" style="width:90%;" >}}

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/tag_pipelines
[2]: https://app.datadoghq.com/cost/settings/custom-allocation-rules
[3]: https://www.datadoghq.com/support/
