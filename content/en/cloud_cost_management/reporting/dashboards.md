---
title: Cost on Dashboards
description: Visualize and monitor cloud costs on Datadog Dashboards alongside other metrics for comprehensive cost analysis and showback/chargeback reporting.
further_reading:
- link: "/cloud_cost_management/reporting/explorer"
  tag: "Documentation"
  text: "Cost Explorer"
- link: "/cloud_cost_management/reporting/"
  tag: "Documentation"
  text: "Create and save cost reports"
- link: "/cloud_cost_management/allocation/custom_allocation_rules"
  tag: "Documentation"
  text: "Custom allocation rules"
- link: "/dashboards/"
  tag: "Documentation"
  text: "Learn about Dashboards"
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
---

## Overview

Cost on Dashboards enables you to visualize and monitor your cloud spending alongside application performance, infrastructure metrics, and business KPIs in a single unified view. This integration provides a complete picture of how costs relate to system behavior and helps support showback and chargeback initiatives.

Use Cost on Dashboards to:
- Track cloud costs alongside application and infrastructure metrics in real time
- Build executive and team-level cost dashboards for showback and chargeback
- Correlate cost trends with performance changes and system events
- Monitor costs across [AWS][1], [Azure][2], [Google Cloud][3], [Oracle][4], [SaaS providers][5], and [Datadog costs][6]
- Share cost visibility with stakeholders through customizable dashboard views

## Add cost data to dashboards

You can add cost visualizations to your dashboards using several methods:

### Export from Cost Explorer

1. Navigate to [**Cloud Cost > Analyze > Explorer**][7] in Datadog.
2. Build your cost query using filters, groupings, and time ranges.
3. Click **Export** and select **Export to Dashboard**.
4. Choose an existing dashboard or create one.
5. Customize the widget title and settings.

The cost widget appears on your dashboard and updates automatically based on your query parameters.

### Export from Cost Reports

1. Go to [**Cloud Cost > Analyze > Reports**][8] in Datadog.
2. Open an existing saved report or create one.
3. Click **Export** and select **Export to Dashboard**.
4. Choose an existing dashboard or create one.
5. Customize the widget title and settings.

### Create a cost widget directly on a dashboard

1. Open any dashboard or create one.
2. Click **Add Widgets** or **Edit Dashboard**.
3. Search for and select the **Cloud Cost** widget from the widget tray.
4. Configure your cost query, filters, and visualization options.
5. Save the widget to your dashboard.

## Showback and chargeback use cases

Cost on Dashboards supports showback and chargeback initiatives by providing transparent, team-specific cost visibility. Showback helps teams understand their cloud spending without enforcing accountability. Chargeback allocates costs to specific teams or business units for direct billing or budget tracking.

### Allocate costs to teams and business units

Use [custom allocation rules][9] to split and assign shared costs to teams, projects, or environments. Allocation rules support:

- **Even allocation**: Split costs evenly among all teams
- **Custom percentage**: Define specific percentages for each team based on business agreements
- **Proportional by spend**: Allocate costs based on each team's share of total spend
- **Dynamic by metric**: Allocate costs based on actual usage metrics (for example, query execution time, API requests)

After setting up allocation rules, create team-specific dashboards that display allocated costs alongside team metrics.

### Build team-level cost dashboards

Create dedicated dashboards for each team or business unit to support showback and chargeback:

1. **Filter by team tags**: Use cost widgets filtered by team-specific tags (for example, `team:analytics`, `team:platform`) to show only costs associated with that team.

2. **Include allocated costs**: Add widgets that display costs allocated through custom allocation rules. These costs include an `allocated_by_rule` tag showing which rule applied the allocation.

3. **Combine with team metrics**: Add application performance, infrastructure, and business metrics alongside cost data to help teams understand the relationship between spending and outcomes.

4. **Set up cost alerts**: Create [Cloud Cost Monitors][10] to notify teams when their costs exceed thresholds or change unexpectedly.

### Example showback dashboard

A typical team showback dashboard might include:
- Team-specific cloud costs over time (filtered by `team` tag)
- Allocated shared costs (such as support fees, shared databases)
- Cost breakdown by service or product
- Top cost drivers for the team
- Application performance metrics (latency, error rates, throughput)
- Infrastructure utilization metrics

This comprehensive view helps teams understand their spending patterns and identify optimization opportunities.

## Correlate costs with system behavior

Cost dashboards help you identify relationships between spending and system activity:

- **Cost spikes during deployments**: Track whether new releases increase infrastructure costs
- **Usage-driven cost changes**: Correlate traffic spikes with cost increases
- **Resource optimization impact**: Measure cost reductions from performance improvements
- **Seasonal trends**: Compare costs across time periods alongside business metrics

Add cost widgets to existing operational dashboards to monitor costs in the context of system health and performance.

## Share and collaborate

After creating cost dashboards:

- **Share dashboard links** with stakeholders to provide transparent cost visibility
- **Set up scheduled dashboard reports** to automatically send cost updates through email or Slack
- **Control access** using dashboard permissions to limit visibility to specific teams or roles
- **Create dashboard templates** for consistent cost reporting across teams

## Learn more

Watch this video tutorial on using cost data in Datadog Dashboards:

{{< youtube CPFE-IZfg_M >}}

For advanced cost allocation scenarios, see the [custom allocation rules documentation][9].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/aws/
[2]: /cloud_cost_management/azure/
[3]: /cloud_cost_management/google_cloud/
[4]: /cloud_cost_management/oracle/
[5]: /cloud_cost_management/saas_costs/
[6]: /cloud_cost_management/datadog_costs/
[7]: https://app.datadoghq.com/cost/analyze/explorer
[8]: https://app.datadoghq.com/cost/analyze/reports
[9]: /cloud_cost_management/allocation/custom_allocation_rules/
[10]: /monitors/types/cloud_cost/
