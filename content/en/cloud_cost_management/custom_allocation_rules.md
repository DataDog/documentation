---
title: Custom Allocation Rules
description: "Allocate cloud costs based on custom allocation rules."
further_reading:
- link: "https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview"
  tag: "Documentation"
  text: "Cloud Cost Management"
---

## Overview

Custom allocation rules helps teams take ownership of their cloud spend by attributing cloud costs to business units, teams, or environments. This page describes how to create a custom allocation rule, how each allocation method works, how to refine your cost destinations using filters and partitions, and how to manage and review your allocation rules.

These are the general steps to create a custom allocation rule:

1. **[Define the source costs](#step-1---define-the-source)** you want to allocate. Specify which costs should be included in the allocation rule by setting crtieria such as provider, product, spend type, or tags.
1. **Choose your [allocation method](#step-2---choose-an-allocation-method)**:

   | Allocation Method | Description | Examples |
   | ----------------  | ----------- | -------- |
   | Even  | Split costs equally among destination tags. | Untagged support costs are allocated evenly to teams `teamA`, `teamB`, and `teamC`. |
   | Custom  | Assign specific percentages to each destination. | Untagged support costs are allocated 60% to `teamA`, 30% to `teamB`, and 10% to `teamC`. |
   | Proportional by spend | Allocate based on each destination's share of total spend. | Untagged support costs are allocated to teams `teamA`, `teamB`, and `teamC` based on their proportion of total spend on Amazon EC2.|
   | Dynamic by metric  | Allocate based on a performance or usage metric. | Shared PostgreSQL costs are allocated by total query execution time to users as defined by the Datadog metrics query `sum:postgresql.queries.time{*} by {user}.as_count()`. |


1. **[Define your destinations](#step-3---define-the-destination)** (the tags or groups that receive the allocated costs).
1. (Optional) **[Apply a filter](#filtering)** to restrict which costs are included in the allocation rule.
1. (Optional) **[Use partitioning](#partitioning)** to automatically create sub-allocations for each value of a tag (for example, environment or project)

Custom cost allocation runs after [Tag Pipelines][1] have finished processing any updated tags, enabling allocations based on the latest user-defined tags. Costs are allocated on a daily basis, and can be applied to Cloud Cost metrics from AWS, Google Cloud, and Azure. 

## Accessing Custom Allocation Rules

Navigate to [**Cloud Cost > Custom Allocation Rules**][2], which is a section under Cloud Cost settings to establish rules and click **Add New Rule** to start.

## Define the source

Use the dropdown filters to specify the cloud provider, specific products or services, cost types, and any other attributes or tags that help you target the right costs.

## Choose an allocation method

Choosing the right allocation method ensures that costs are attributed fairly and transparently, supporting accurate showback, chargeback, or internal reporting.

You can choose from the following allocation methods:

{{< tabs >}}

{{% tab "Even Allocation" %}}

With the even strategy, costs are allocated evenly towards your destination tags, regardless of any other spend. Apply a filter to refine which part of the bill determines the proportions.

{{< img src="cloud_cost/custom_allocation_rules/even_diagram.png" alt="Diagram illustrating the even split strategy" style="width:60%;" >}}

{{< img src="cloud_cost/custom_allocation_rules/even_ui.png" alt="The even split strategy as seen in Datadog" style="width:60%;" >}}

{{% /tab %}}

{{% tab "Custom Percentage Allocation" %}}
With the custom percentage strategy, you can define static custom percentages for the destination tags you select. For example, if you have 3 destinations (`teamA`, `teamB`, `teamC`) you can allocate 60% to `teamA`, 30% to `teamB`, and 10% to `teamC`.

{{< img src="cloud_cost/custom_allocation_rules/custom_percentage_diagram.png" alt="Diagram illustrating the even split strategy" style="width:60%;" >}}

{{< img src="cloud_cost/custom_allocation_rules/custom_percentage_ui.png" alt="The even split strategy as seen in Datadog" style="width:60%;" >}}

{{% /tab %}}

{{% tab "Proportional Allocation" %}}

Costs are allocated based on the proportional spend of destination values. Similarly to even allocation, you can further customize your allocation by setting filters and partitions.

{{< img src="cloud_cost/custom_allocation_rules/proportional_diagram.png" alt="Diagram illustrating the proportional split strategy" style="width:60%;" >}}

{{< img src="cloud_cost/custom_allocation_rules/proportional_ui.png" alt="The proportional split strategy as seen in Datadog" style="width:60%;" >}}

{{% /tab %}}

{{% tab "Dynamic by Metric Allocation" %}}

Metrics-based allocation provides the ability to split up costs based on Datadog's [metrics queries][1]. By using performance metrics to allocate expenses, you can more accurately allocate costs based on application usage patterns.

For example, this PostgreSQL metrics query `sum:postgresql.queries.time{*} by {user}.as_count()` tracks the total query execution time per user. The relative values are then used to determine what proportion of total PostgreSQL costs should be allocated to each user.

For determining the proportion of costs to be allocate, metrics can be aggregated on a daily or monthly basis. However, the costs themselves are still allocated on a daily basis.

{{< img src="cloud_cost/custom_allocation_rules/dynamic_diagram.png" alt="Diagram illustrating the dynamic by metric strategy" style="width:60%;" >}}

{{< img src="cloud_cost/custom_allocation_rules/dynamic_ui.png" alt="The dynamic by metric split strategy as seen in Datadog" style="width:60%;" >}}

[1]: /metrics/#querying-metrics

{{% /tab %}}

{{< /tabs >}}

## Define the destination

Filter for and partition the groups, teams, projects, or business units that are to receive the allocated costs.

Use the table below to understand the type of information that is required or optional by cloud provider when adding a destination.

| Step | Required | Examples |
| ---- | ---- | ---- |
| Select the cost provider | Yes | AWS, Google Cloud, Azure |
| Define the costs to split (source) | Yes | `aws_product` contains `support`, `allocated_spend_type` is untagged |
| Define the destination | Yes | `team` is `teamA`, `teamB`, `teamC` |
| Filter by | Only applicable for Even and Proportional strategies, optional | `aws_product` is `ec2` |
| Partition costs by | Only applicable for Even, Proportional, and Dynamic by Metric strategies, optional | `environment` is all values |
| Name | Yes | allocate\_untagged\_support\_costs |

### Filtering

A filter restricts which costs are included in an allocation rule, based on criteria you define. For example, you might only want to allocate costs where `aws_product` is `ec2` or where a specific tag is present. Filters help you target the allocation rule to just the relevant subset of your cloud spend.

### Partitioning

Partitioning allows you to split a single allocation rule into multiple sub-allocations based on a tag value such as `env`. Instead of creating separate rules for each environment (like production and staging), you can create one rule that is automatically applied to each value of the tag. Each partitioned sub-allocation uses the same allocation structure, but applies only to costs matching that tag value.

For example, if you partition by `env:prod` and `env:staging`, the rule creates separate allocations for each environment, but with the same structure.

{{< tabs >}}

{{% tab "Even Allocation" %}}

{{< img src="cloud_cost/custom_allocation_rules/even_partition_diagram.png" alt="Diagram illustrating the even split strategy with partitioning" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Proportional Allocation" %}}

{{< img src="cloud_cost/custom_allocation_rules/proportional_partition_diagram.png" alt="Diagram illustrating the proportional split strategy with partitioning" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Dynamic by Metric Allocation" %}}

{{< img src="cloud_cost/custom_allocation_rules/dynamic_partition_diagram.png" alt="Diagram illustrating the dynamic split strategy with partitioning" style="width:90%;" >}}

{{% /tab %}}

{{< /tabs >}}

## Managing rules
Rules can be modified and deleted in the [Custom Allocation Rules section][2] of the Cloud Cost settings page. All fields except for the rule name can be reconfigured.

When you delete a custom allocation rule, the associated allocation is automatically removed from the current month and prior month's data within 24 hours. To remove allocations from older data, contact [Datadog support][3] to request a backfill.

Rules are applied in the same order as shown in the list.

## Visualize your allocations
Changes to custom allocation rules may take up to 24 hours to be applied. After being applied, the new allocations can be seen throughout Cloud Cost Management on all costs that have Container Allocation enabled. Custom allocated costs also include an `allocated_by_rule` tag, denoting the rule name that applied the allocation.

{{< img src="cloud_cost/custom_allocation_rules/visualize_your_allocations.png" alt="See your allocations throughout Datadog" style="width:90%;" >}}

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/tag_pipelines
[2]: https://app.datadoghq.com/cost/settings/custom-allocation-rules
[3]: https://www.datadoghq.com/support/
