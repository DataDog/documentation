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
 | Dynamic by metric  | Split costs based on each destination's share of total usage. | Scenarios where teams should pay in proportion to their actual usage. | Shared PostgreSQL costs are allocated by total query execution time per team. |

Custom allocation rules run after [Tag Pipelines][1], enabling cost allocations on the latest user-defined tags. Costs are allocated on a daily basis. Cost allocations can be applied to AWS, Google Cloud, and Azure costs.

## Create a custom allocation rule

### Step 1 - Define the source

1. Navigate to [Cloud Cost > Settings > Custom Allocation Rules][2] and click **Add New Rule** to start.
1. Under **Define the source**, select the cost provider.
1. Under **Define the costs to split**, select the shared costs you want to allocate.

_Example: Untagged support costs, shared database costs._

### Step 2 - Choose an allocation method

Below is a description of how each allocation method works with examples.

{{< tabs >}}

{{% tab "Even" %}}

{{< img src="cloud_cost/custom_allocation_rules/even_diagram.png" alt="Diagram illustrating the even split strategy" style="width:70%;" >}}

With the even strategy, costs are allocated evenly towards your destination tags. [Apply a filter](#step-4---optional-apply-filters) to refine which part of the bill determines the proportions.

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

- Define the costs to allocate (source): **EC2 support fees** (`aws_product:support`). 
- Choose the allocation method: **Proportional by spend**.
- Choose the [destination tag](#step-3---define-the-destination) to split your costs by: **User** (`User A`, `User B`, `User C`).
- Refine the allocation by applying [filters](#step-4---optional-apply-filters): **EC2** (`aws_product:ec2`).
- Create suballocations by [partitioning](#step-4---optional-apply-a-partition) the allocation rule: **environment** (`env`).

You can also specify how cost proportions should be partitioned to ensure segment-specific allocations. For example, if you partition your costs by environment using tags like `staging` and `production`, the proportions are calculated separately for each environment. This ensures allocations are based on the specific proportions within each partition.

{{< img src="cloud_cost/custom_allocation_rules/ui-proportional-by-spend-2.png" alt="The proportional split strategy as seen in Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Dynamic by metric" %}}

{{< img src="cloud_cost/custom_allocation_rules/dynamic_diagram.png" alt="Diagram illustrating the dynamic by metric strategy" style="width:70%;" >}}

Metrics-based allocation provides the ability to split up costs based on Datadog's [metrics queries][1]. By using performance metrics to allocate expenses, you can more accurately allocate costs based on application usage patterns.

For example, the Network query `sum:network.bytes_written[server_gateway_id:nat-*] by client_service and server_gateway_id` (shown below) tracks the total traffic volume through NAT gateways by service. The relative values are then used to determine what proportion of total NAT gateway costs should be allocated to each service.

### Data source limitations

Before creating this type of rule, be aware:

- **Data sources support** - The dynamic by metric allocation method only supports specific data sources, listed in the dropdown below.

{{% collapse-content title="List of supported data sources" level="h4" expanded=false id="supported-data-sources" %}}

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

- **Result limits** - Some data sources limit how many results they can show. The allocation rule automatically uses your highest-costing items first. For example, if your query editor shows a limit of 100 group bys but you have 101 results, the allocation rule distributes costs across the top 100 highest-costing group bys and ignores the remaining 1 completely. 
- **Update frequency** - While CCM has 15 months of retention overall, individual data sources have different update patterns:
  - Metrics data updates daily for the past 60 days
  - Other data sources backfill 60 days at rule creation, then update daily for the past 7 days

  If you need more frequent updates or longer retention, consider using the _Metrics_ data source.

### Create a dynamic by metric allocation rule

To create a rule for this allocation, you could, for example:

- Under "Define the source", define the costs to allocate: **NAT gateway costs** (`aws_operation:NatGateway`). 
- Under "Choose split method", select the allocation method: **Dynamic by metric**
  - Choose the data source: **Network**. Tip: Review available metrics and tags in the [Metrics Summary][2].
  - Refine the allocation by applying a [filter](#step-4---optional-apply-filters):**NAT Gateway** (`server_gateway_id:nat-*`). This filters the metric to only return data for your NAT Gateway usage. 
- Under "Choose the destination(s) to split costs across", select the [destination tag](#step-3---define-the-destination) to split your costs by applying a group by. In Network, do this by filling out the `View clients as` section: **service** (`client_service`). This groups the metric by service. 
  - Create suballocations by [partitioning](#step-4---optional-apply-a-partition) the allocation rule. To do this, first apply another group by to the metric. In Network, do this by filling out the `View servers as` section:  **Gateway ID** (`gateway_id`). This groups the metric by gateway_id. Then, select `server_gateway_id` in the **Partition source costs by** section. 
{{< img src="cloud_cost/custom_allocation_rules/ui-dynamic-by-metric-4.png" alt="The dynamic by metric split strategy as seen in Datadog" style="width:90%;" >}}

[1]: /metrics/#querying-metrics
[2]: https://app.datadoghq.com/metric/summary

{{% /tab %}}

{{< /tabs >}}

### Step 3 - Choose the destination(s) to split costs across

1. Select the destinations you want to allocate costs to, such as `team`, `department`, or `service`, that receive the allocated costs.

   You can select multiple values for your destination tag. For instance, if you select the `team` tag, you can choose specific teams like `teamA`, `teamB`, and `teamC` to receive the allocated costs.

### Step 4 - (optional) Apply filter(s)

Apply a filter across the entire allocation rule. Filters help you target the allocation rule to the relevant subset of your cloud spend.

- **Proportional by spend**: You can add filters to narrow the scope of your allocation. For example, filter by `aws_product:ec2` to create an allocation that only applies to EC2 costs, then proportionally distribute those costs based on each team's EC2 spend.

- **Dynamic by metric**: You can filter your metric query to focus on specific data. For example, add `environment:production` to your metric query so the allocation is based only on production environment usage data.

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
Changes to custom allocation rules may take up to 24 hours to be applied. After being applied, the new allocations can be seen throughout Cloud Cost Management on all costs where Container Allocation is set to `enabled`. Custom allocated costs also include an `allocated_by_rule` tag, denoting the rule name that applied the allocation.

{{< img src="cloud_cost/custom_allocation_rules/visualize_your_allocations-1.png" alt="See your allocations throughout Datadog" style="width:90%;" >}}

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/tag_pipelines
[2]: https://app.datadoghq.com/cost/settings/custom-allocation-rules
[3]: https://www.datadoghq.com/support/
