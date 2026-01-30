---
title: Cost Summary Widget
widget_type: "cloud_cost_summary"
description: "Visualize your cloud spending with a compact overview of total costs, time-based comparisons, and spend context."
aliases:
    - /graphing/widgets/cost_summary/
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/dashboards/guide/graphing_json/"
  tag: "Documentation"
  text: "Graphing with JSON"

---

The Cost Summary widget provides a compact, high-level overview of your cloud spend over a selected time range. It combines total cost, time-based comparison, and spend context into a single widget.

Use the Cost Summary widget to surface key cost signals on dashboards without relying on multiple individual cost widgets.

{{< img src="dashboards/widgets/cost_summary/cost_summary_widget.png" alt="Cost Summary widget in a dashboard." >}}

## Setup

### Configuration

1. Select the provider (for example, AWS, Azure, Datadog) you'd like to show costs from.
2. Click **+ And** or **+ Or cost where** buttons to add logical operators to your query.
3. Click the **+ Group By** button to group by the available cloud cost tags.
4. Choose the dynamic time frame and time aggregation to use (Daily, Weekly, Monthly).
5. Toggle the global time frame on or off.

### Options

#### Display 
Customize the way your costs are visualized by modifying the display setting. You can change the graph type from the default Bar Chart to any of the following:

- Line Chart
- Cumulative Area Chart
- [Pie Chart][1]
- [Treemap][2]

#### Show complete days only 
This feature automatically excludes days with incomplete cost data. This helps you base your historical analysis on complete, finalized data.

#### Cost type 
Cost types determine how charges are calculated and presented in your widget. Learn more about the [different cost types][3] available. 

**Note**: This option is available depending on the provider you choose. Cost Types are not applicable to all CCM integrations.

#### Enable container allocation
This feature breaks down the costs of your cloud clusters to individual services and workloads running in those clusters so that shared infrastructure costs can be attributed to specific services and workloads. Learn more about [Container Cost Allocation][4].

#### Show usage charges only
This feature excludes fees, taxes, refunds, and credits from your cloud costs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/pie_chart/
[2]: /dashboards/widgets/treemap/
[3]: /cloud_cost_management/setup/aws/?tab=cloudformation#cost-types
[4]: /cloud_cost_management/allocation/container_cost_allocation
[5]: /api/latest/dashboards/
[6]: /dashboards/guide/graphing_json/

