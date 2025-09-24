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

Custom allocation rules help you distribute shared cloud costs across teams, projects, or environments based on your business needs. This enables accurate cost attribution for showback and chargeback purposes.

The following allocation methods are available:

 | Allocation Method | Description | Use Case |
 | ----------------  | ----------- | -------- |
 | Even  | Split costs evenly among all destinations. | Scenarios where each team, project, or environment should be charged the same amount for a shared cost. |
 | Custom  | Split costs to each destination based on percentages you define. | Scenarios where business rules or agreements dictate how much each team should pay. |
 | Proportional by spend | Split costs based on each destination's share of total spend. | Scenarios where teams should pay in proportion to their actual spend. |
 | Dynamic by metric  | Split costs based on each destination's share of total usage. | Scenarios where teams should pay in proportion to their actual usage. |

Custom allocation rules run after [Tag Pipelines][1], enabling cost allocations on the latest user-defined tags. Costs are allocated on a daily basis. Cost allocations can be applied to AWS, Google Cloud, and Azure costs.

## Create a custom allocation rule

### Step 1 - Define the source

1. Navigate to [Cloud Cost > Settings > Custom Allocation Rules][2] and click **Add New Rule** to start.
1. Under **Define the source**, select the cost provider (AWS, Google Cloud, or Azure).
1. Under **Define the costs to split**, select the shared costs you want to allocate.

**Examples**: Untagged support costs, shared database costs, or unallocated infrastructure expenses.

### Step 2 - Choose an allocation method

Below is a description of how each allocation method works with examples.

{{< tabs >}}

{{% tab "Even" %}}

{{< img src="cloud_cost/custom_allocation_rules/even_diagram.png" alt="Diagram illustrating the even split strategy" style="width:70%;" >}}

With the even strategy, costs are allocated evenly towards your destination tags. [Apply a filter](#step-4---optional-apply-filters) to refine which part of the bill determines the proportions.

{{< img src="cloud_cost/custom_allocation_rules/ui-even.png" alt="The even split strategy as seen in Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Custom percentage" %}}

{{< img src="cloud_cost/custom_allocation_rules/custom_percentage_diagram.png" alt="Diagram illustrating the custom percentage split strategy" style="width:70%;" >}}

With the custom percentage strategy, you can define static custom percentages for the destination tags you select. For example, if you have 3 destinations (`teamA`, `teamB`, `teamC`) you can allocate 60% to `teamA`, 30% to `teamB`, and 10% to `teamC`.

{{< img src="cloud_cost/custom_allocation_rules/ui-custom-2.png" alt="The custom percentage split strategy as seen in Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Proportional" %}}

{{< img src="cloud_cost/custom_allocation_rules/proportional_diagram-2.png" alt="Diagram illustrating the proportional split strategy" style="width:70%;" >}}

Shared costs are allocated based on each destination's share of total spend. Similarly to even allocation, you can further customize your allocation by setting filters and partitions.

In the preceding diagram, the pink bar represents a filter on the cost allocation. With this filter applied, EC2 support fees are split across teams _based on each team's share of overall EC2 spend_.

To create a rule for this allocation, you can:

- Define the costs to allocate (source): **EC2 support fees** (`aws_product:support`). 
- Choose the allocation method: **Proportional by spend**.
- Choose the [destination tag](#step-3---choose-the-destinations-to-split-costs-across) to split your costs by: **team** (`teamA`, `teamB`, `teamC`).
- Refine the allocation by applying [filters](#step-4---optional-apply-filters): **EC2** (`aws_product:ec2`).
- Create suballocations by [partitioning](#step-5---optional-apply-a-partition) the allocation rule: **environment** (`env`).

You can also specify how the cost allocation rule should be partitioned to create multiple suballocations. For example, if you partition your costs by the `environment` tag, the allocation rule is calculated separately for each environment. 

{{< img src="cloud_cost/custom_allocation_rules/ui-proportional-by-spend-2.png" alt="The proportional split strategy as seen in Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Dynamic by metric" %}}

{{< img src="cloud_cost/custom_allocation_rules/dynamic_diagram.png" alt="Diagram illustrating the dynamic by metric strategy" style="width:70%;" >}}

Metrics-based allocation provides the ability to split up costs based on Datadog's [metrics queries][1]. By using performance metrics to allocate expenses, you can more accurately allocate costs based on application usage patterns.

For example, the Network query `sum:network.bytes_written[server_gateway_id:nat-*] by client_service and server_gateway_id` (shown below) tracks the total traffic volume through NAT gateways by service. The relative traffic volume per `client_service` and `server_gateway_id` is then used to determine what proportion of total NAT gateway costs should be allocated to each destination.

### Data source limitations

Before creating this type of rule, be aware:

- **Result limits** - Some observability data sources limit how many results they can show. The allocation rule automatically uses your highest-costing items first. For example, if your query editor shows a limit of 1000 group bys but you have 1001 results, the allocation rule distributes costs across the top 1000 highest-costing destinations and ignores the remaining 1 destination completely. 
- **Update frequency** - While CCM has 15 months of retention overall, individual data sources have different update patterns:
  - Metrics data updates daily for the past 60 days
  - Other observability data sources backfill 60 days at rule creation, then update daily for the past 7 days

  If you need more frequent updates or longer retention, consider using the _Metrics_ data source.

### Create a dynamic by metric allocation rule

For example, create an allocation rule to split your shared NAT gateway costs:

- Define the source or costs to allocate (for example, **NAT gateway costs** (`aws_operation:NatGateway`)). 
- Select the allocation method: **Dynamic by metric**
  - Choose the data source: **Network**. 
- In the **"Define the metric to split the source costs"** section:
  - **Filters**: Apply filters to refine your metric query. For example, add `server_gateway_id:nat-*` to filter the Network query to NAT Gateway usage. This filter becomes the filter for your allocation.
  - **Group bys**: Select group bys to define your destination and partition:
    - **Destination**: By default, the tag(s) you group by become the destination tag(s) for your allocation. For example, group by `client_service` to split costs by service.
    - **Partition**: To define a partition, first group by the tag you wish to partition on. For example, add another group by for `gateway_id` to create suballocations by Gateway ID.
- In section 3, **"Choose the destination(s) to split costs across"**, specify which group by tag is your partition tag. All group by tags are destination tags by default. 
{{< img src="cloud_cost/custom_allocation_rules/ui-dynamic-by-metric-4.png" alt="The dynamic by metric split strategy as seen in Datadog" style="width:90%;" >}}

[1]: /metrics/#querying-metrics
[2]: https://app.datadoghq.com/cost/settings/custom-allocation-rules

{{% /tab %}}

{{< /tabs >}}

### Step 3 - Choose the destination(s) to split costs across

1. Select the destinations you want to allocate costs to, such as `team`, `department`, or `service`.

   You can select multiple values for your destination tag. For instance, if you select the `team` tag, you can choose specific teams like `teamA`, `teamB`, and `teamC` to receive the allocated costs.

### Step 4 - (optional) Apply filter(s)

Apply a filter across the entire allocation rule to target specific subsets of your cloud spend. This helps ensure your allocation is based on the most relevant cost data.

**Example**: For a **proportional by spend** allocation rule that distributes shared costs to teams, you could filter by `aws_product:ec2` to base the allocation on each team's EC2 spend rather than their total cloud spend.


### Step 5 - (optional) Apply a partition

Partitioning allows you to create multiple sub-allocations from a single rule. Instead of creating separate rules for each environment (like production and staging), you can create one rule partitioned by `environment`. Each partition uses the same allocation structure but applies only to costs matching that specific tag value.

**Note**: For Dynamic by Metric allocation, the tag you select to partition by must exist in both your cloud cost and metric data.

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
