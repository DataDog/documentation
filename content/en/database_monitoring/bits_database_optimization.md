---
title: Bits Database Optimization
description: Review and implement database query optimizations identified by Bits AI.
further_reading:
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/database_monitoring/query_metrics/"
  tag: "Documentation"
  text: "Exploring Query Metrics"
- link: "/database_monitoring/connect_dbm_and_apm/"
  tag: "Documentation"
  text: "Correlate Database Monitoring and Traces"
---

## Overview

Bits Database Optimization detects underperforming queries across your database fleet, identifies optimizations validated against a simulated copy of your environment, and delivers the result as a pull request fixing the exact code that issued the query.

Optimization candidates are selected automatically from Database Monitoring telemetry, with no additional setup required. Candidates are identified by highest potential impact, focusing on query execution times, blocking queries, and regressed queries.

<div class="alert alert-info">Bits Database Optimization does not require write access to your database, and does not export or use actual data from your environment. Optimizations are empirically tested against database simulations populated with synthetic data using statistical properties of your schema.</div>

{{< img src="database_monitoring/database_optimization_panel_overview.png" alt="Am optimized query in the optimization panel, showing a detailed summary of the issue, a diff for the optimized query, and a button to create a PR." style="width:100%;">}}

## Prerequisites

- **Database Monitoring** is configured for the target database instances. See [Database Monitoring Setup][1].
- **Schema collection** is enabled on the target instances.
- For automated PR creation:
    - **APM** must be configured for the services that issue the queries you want to address. See [Correlate Database Monitoring and Traces][2] for more information.
    - A **GitHub repository** must be linked in your Datadog organization.

## Viewing optimizations

### Query list

On the [Database Monitoring > Queries][3] screen, queries with optimizations available have an AI icon in the Status column. Hover over an icon to see a summary of the optimization, and click the icon to open the Optimization panel.

To filter the query list by optimization type, select an option from **Optimizations** above the list.

{{< img src="database_monitoring/database_optimization_queries.png" alt="The status column on the Queries screen, showing AI icons in query rows where optimizations are available." style="width:100%;">}}

### Optimization panel

The Optimization panel includes a summary of the query issue, the optimized query used in the simulation, and a visualization of the Simulated Performance Impact.

Explore the Simulated Performance Impact visualization for more details about improvements:
  - Hover over the improvement summary (for example, "44.7x more efficient") to view before-and-after execution times, logical reads, and shared blocks dirtied. The table shows the average, median, P95, and maximum for each metric.
  - Hover over each item in the visualization to view more details.

{{< img src="database_monitoring/database_optimization_simulated_performance_impact.png" alt="An example Simulated Performance Impact visualization, showing a query optimized to 44.7x more efficient and 92x faster." style="width:100%;">}}

Click **Compare Plans** to view side-by-side comparisons of the current and optimized execution plans:
  - **List View** shows a hierarchical list of the execution plan's operations, with node cost and row estimates for each step.
  - **Map View** shows a visual representation of the execution plan, with the option to compare the plans by different metrics.
  - **Raw** shows the raw execution plan output.

{{< img src="database_monitoring/database_optimization_plan_comparison_map_view.png" alt="The Compare Plans Map View, showing added and removed operations for an optimized query." style="width:100%;">}}

### Create a pull request

To create a PR to apply the optimization fix to your database, select **Review PR by Bits AI**. The GitHub PR opens with a pre-populated description that includes the simulation results.

<div class="alert alert-info">Automated pull requests require APM configured for the service issuing the query, and a GitHub repository linked to your Datadog organization.</div>

## Priority levels

Optimizations are ranked by priority to help you focus on the highest-impact issues first:

| Priority | Optimization types | Reason |
|---|---|---|
| High | OFFSET without ORDER BY, Idle in Transaction | Data correctness risk or blocking behavior |
| Medium | Missing Index, Large ORDER BY without LIMIT | Significant performance impact |
| Low | SELECT \*, Query Rewrite | Performance suggestions |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/setup_postgres/
[2]: /database_monitoring/connect_dbm_and_apm/
[3]: https://app.datadoghq.com/databases/queries
[4]: /monitors/configuration/?tab=evaluateddata
[5]: /integrations/slack/?tab=datadogforslack