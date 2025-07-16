---
title: Custom Allocation Rules
description: "Allocate cloud costs based on custom allocation rules."
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
 | Dynamic by metric  | Split costs based each destination's share of total usage. | Scenarios where teams should pay in proportion to their actual usage. | Shared PostgreSQL costs are allocated by total query execution time per team. |

Custom allocation rules runs after [Tag Pipelines][1], enabling cost allocations on the latest user-defined tags. Costs are allocated on a daily basis. Cost allocations can be applied to AWS, Google Cloud, and Azure costs.

## Create a custom allocation rule

Before creating your rule, be aware:
- **Result limits**: Some data sources limit how many results they can show. The allocation rule automatically uses your highest-costing items first.
- **Update frequency**: 
  - Metrics data updates daily for the past 60 days
  - Other data sources update daily for the past 7 days

If you need more frequent updates or longer retention, consider using the Metrics data source.

For more information, see [Data source limitations](#data-source-limitations).

### Step 1 - Define the source

1. Navigate to [Cloud Cost > Settings > Custom Allocation Rules][2] and click **Add New Rule** to start.
1. Under **Define the source**, select the cost provider, and use the filters under **Define the costs to split (source)** to narrow down the data source.
1. Each data source you add creates a separate grouping for the data.

   _For example, you may want to apply the allocation rule to a specific subset of your cloud spend, such as the `production` environment._

### Step 2 - Choose a split method

Below is a description of how each allocation method works with examples.

{{< tabs >}}

{{% tab "Even" %}}

{{< img src="cloud_cost/custom_allocation_rules/even_diagram.png" alt="Diagram illustrating the even split strategy" style="width:70%;" >}}

With the even strategy, costs are allocated evenly towards your destination tags.

{{< img src="cloud_cost/custom_allocation_rules/ui-even-1.png" alt="The even split strategy as seen in Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Custom percentage" %}}

{{< img src="cloud_cost/custom_allocation_rules/custom_percentage_diagram.png" alt="Diagram illustrating the even split strategy" style="width:70%;" >}}

With the custom percentage strategy, you can define static custom percentages for the destination tags you select. For example, if you have 3 destinations (`teamA`, `teamB`, `teamC`) you can allocate 60% to `teamA`, 30% to `teamB`, and 10% to `teamC`.

{{< img src="cloud_cost/custom_allocation_rules/ui-custom-2.png" alt="The even split strategy as seen in Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Proportional" %}}

{{< img src="cloud_cost/custom_allocation_rules/proportional_diagram-2.png" alt="Diagram illustrating the proportional split strategy" style="width:70%;" >}}

Costs are allocated based on the proportional spend of destination values. Similarly to even allocation, you can further customize your allocation by setting filters and partitions.

In the preceding diagram, the pink bar represents a filter on the cost allocation. With this filter applied, EC2 support fees are split across teams _based on each team's share of overall EC2 spend_.

To create a rule for this allocation, you can:

- Define the costs to allocate (source): **EC2 support fees** (`aws_product:support`). Use filters to narrow down the data source. Each source you add creates a separate grouping for the data.
- Choose the split method: **Proportional by spend**.
- Choose the [destination tag](#step-3---define-the-destination) to split your costs by: **User** (`User A`, `User B`, `User C`).
- Create suballocations by [partitioning](#step-4---optional-apply-a-partition) the allocation rule: **environment** (`env`).

You can also specify how cost proportions should be partitioned to ensure segment-specific allocations. For example, if you partition your costs by environment using tags like `staging` and `production`, the proportions are calculated separately for each environment. This ensures allocations are based on the specific proportions within each partition.

{{< img src="cloud_cost/custom_allocation_rules/ui-proportional-by-spend-2.png" alt="The proportional split strategy as seen in Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Dynamic by metric" %}}

{{< img src="cloud_cost/custom_allocation_rules/dynamic_diagram.png" alt="Diagram illustrating the dynamic by metric strategy" style="width:70%;" >}}

Metrics-based allocation provides the ability to split up costs based on Datadog's [metrics queries][1]. By using performance metrics to allocate expenses, you can more accurately allocate costs based on application usage patterns.

For example, this PostgreSQL metrics query `sum:postgresql.queries.time{*} by {user}.as_count()` tracks the total query execution time per user. The relative values are then used to determine what proportion of total PostgreSQL costs should be allocated to each user.

To create a rule for this allocation, you could:

- Define the costs to allocate (source): **Database costs** (`aws_product:rds`). Use filters to narrow down the data source. Each source you add creates a separate grouping for the data.

  This allocation rule works with specific data sources, listed below.

{{% collapse-content title="Supported data sources" level="h4" expanded=false id="supported-data-sources" %}}

- APM Metrics
- Application Security
- Audit Trail
- CI Pipelines
- CI Tests
- Cases
- DORA Metrics
- Database Queries
- Deployment Gates
- Events
- Incidents
- Kubernetes Troubleshooting
- LLM Observability
- Metrics
- NetFlow
- Network
- Network Path
- On-Call
- Profiles
- RUM
- Recommendations
- Security Signals
- Software Composition Analysis
- Synthetics CI Batches
- Synthetics Runs
- Usage
- Workload Security
- Workload Security Info

{{% /collapse-content %}}

- Choose the split method: **Dynamic by metric**
- Choose the data source: **Database Queries**. Tip: Review available metrics and tags in the [Metrics Summary][4].
- Choose the [destination tag](#step-3---define-the-destination) to split your costs by: **Service** (`trace.caller.service`).
- Create suballocations by [partitioning](#step-4---optional-apply-a-partition) the allocation rule: **environment** (`env`).

{{< img src="cloud_cost/custom_allocation_rules/ui-dynamic-by-metric-4.png" alt="The dynamic by metric split strategy as seen in Datadog" style="width:90%;" >}}

[1]: /metrics/#querying-metrics

{{% /tab %}}

{{< /tabs >}}

### Step 3 - Choose the destination(s) to split costs across

1. Select the destinations you want to allocate costs to, such as `team`, `department`, or `service`, receive the allocated costs.

   You can select multiple values for your destination tag. For instance, if you select the `team` tag, you can choose specific teams like `teamA`, `teamB`, and `teamC` to receive the allocated costs.

1. Define the custom percentages for each of the tags you've selected for cost allocation.

### Step 4 - (optional) Apply a partition

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
Changes to custom allocation rules may take up to 24 hours to be applied. After being applied, the new allocations can be seen throughout Cloud Cost Management on all costs where Container Allocation is set to `enabled`. Custom allocated costs also include an `allocated_by_rule` tag, denoting the rule name that applied the allocation.

{{< img src="cloud_cost/custom_allocation_rules/visualize_your_allocations-1.png" alt="See your allocations throughout Datadog" style="width:90%;" >}}

## Data source limitations
### Some data sources limit the number of group bys 
available. When this limit is reached, the allocation rule distributes costs 
across the available group bys in sorted order (highest cost first). For 
example, if your query editor shows a limit of 100 group bys but you have 
101 results, the allocation rule distributes costs across the top 100 
highest-costing group bys and ignore the remaining 1 completely. Similarly, 
if you have 3 total results but a limit of 2, the allocation rule 
distributes costs across the top 2 highest-costing group bys (for example, 
50% and 50%) and ignores the third result completely.

### Retention period
While CCM has 15 months of retention overall, individual data sources have different update patterns:
- **Metrics data source**: Updates the past 60 days daily
- **All other data sources**: Backfill 60 days at rule creation, then 
  update the past 7 days daily

### Supported data sources for dynamic allocation

The dynamic by metric allocation method only supports a [specific set of data sources](#supported-data-sources).

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/tag_pipelines
[2]: https://app.datadoghq.com/cost/settings/custom-allocation-rules
[3]: https://www.datadoghq.com/support/
[4]: https://app.datadoghq.com/metric/summary
