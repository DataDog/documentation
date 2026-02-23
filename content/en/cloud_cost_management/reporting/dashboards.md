---
title: Dashboards
description: Visualize and monitor cloud costs on Datadog Dashboards alongside other metrics for comprehensive cost analysis and showback/chargeback reporting.
further_reading:
- link: "/cloud_cost_management/reporting/explorer"
  tag: "Documentation"
  text: "Cost Explorer"
- link: "/cloud_cost_management/reporting/"
  tag: "Documentation"
  text: "Create and save cost reports"
- link: "/cloud_cost_management/container_cost_allocation"
  tag: "Documentation"
  text: "Container cost allocation"
- link: "/cloud_cost_management/tag_pipelines"
  tag: "Documentation"
  text: "Tag pipelines"
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

Visualize and monitor your cloud spending on dashboards alongside application performance, infrastructure metrics, and business KPIs in a single unified view. This integration provides a complete picture of how costs relate to system behavior and helps support showback and chargeback initiatives.

Use dashboards to:
- Track cloud costs alongside application and infrastructure metrics in real time
- Build cost dashboards for showback and chargeback
- Correlate cost trends with performance changes and system events
- Monitor costs across [AWS][1], [Azure][2], [Google Cloud][3], [Oracle][4], [SaaS providers][5], and [Datadog costs][6]
- Share cost visibility with stakeholders through customizable dashboard views

## Add cost data to dashboards

You can add cost visualizations to your dashboards using several methods:

### Export from Cost Explorer

1. Navigate to [**Cloud Cost > Analyze > Explorer**][7] in Datadog.
2. Build your cost query using filters, groupings, and time ranges.
3. Click **More** and select **Export to Dashboard**.
4. Choose an existing dashboard or create one.
5. Customize the widget title and settings.

The cost widget appears on your dashboard and updates automatically based on your query parameters.

{{< img src="cloud_cost/reporting/dashboards/export-from-cost-explorer-1.png" alt="Cost Explorer interface showing the More menu with Export to Dashboard option highlighted" style="width:80%;" >}}

### Export from Cost Reports

1. Go to [**Cloud Cost > Analyze > Reports**][8] in Datadog.
2. Open an existing saved report or create one.
3. Click **More** and select **Export to Dashboard**.
4. Choose an existing dashboard or create one.
5. Customize the widget title and settings.

{{< img src="cloud_cost/reporting/dashboards/export-from-cost-report.png" alt="Cost Reports page showing the More menu with Export to Dashboard option highlighted" style="width:80%;" >}}

### Create a cost widget directly on a dashboard

1. Open any dashboard or create one.
2. Click **Add Widgets** or **Edit Dashboard**.
3. Search for and select a cost widget from the widget tray:
   - **Cost Summary**: Visualize cost trends over time with customizable filters and groupings
   - **Cost Budget**: Track spending against budget targets and forecast future costs
   - **Cloud Cost**: Create custom cost queries with advanced filtering options

   {{< img src="cloud_cost/reporting/dashboards/create-cost-widget-from-dashboard.png" alt="Dashboard widget tray displaying Cost Summary, Cost Budget, and Cloud Cost widget options" style="width:100%;" >}}
4. Configure your cost query, filters, and visualization options.
5. Save the widget to your dashboard.

## Showback and chargeback use cases

Dashboards support showback and chargeback initiatives by providing transparent cost visibility. Showback helps teams understand their cloud spending without enforcing accountability. Chargeback allocates costs to specific teams or business units for direct billing or budget tracking.

### Allocate costs to any dimension

Allocate costs to any dimension using:

- **[Container cost allocation][11]**: Allocate container and Kubernetes costs to specific workloads, namespaces, or teams
- **[Tag pipelines][12]**: Enrich your cost data with custom tags for flexible grouping and allocation
- **[Custom allocation rules][9]**: Split and assign shared costs based on custom logic and business requirements

These tools help create accurate cost allocations that reflect your organization's structure and usage patterns.

### Build showback reports and dashboards

Create dashboards to support showback and chargeback:

1. **Filter by dimensions**: Use cost widgets filtered by specific tags (for example, `team:analytics`, `env:prod`, `service:api`) to show costs associated with different dimensions.

2. **Include allocated costs**: Add widgets that display costs allocated through allocation rules to provide a complete cost picture.

3. **Combine with metrics**: Add application performance, infrastructure, and business metrics alongside cost data to understand the relationship between spending and outcomes.

4. **Set up cost alerts**: Create [Cloud Cost Monitors][10] to notify stakeholders when costs exceed thresholds or change unexpectedly.

## Example showback dashboard

A typical showback dashboard might include:
- Cloud costs over time (filtered by relevant dimensions)
- Allocated shared costs (such as support fees, shared databases)
- Cost breakdown by service or product
- Top cost drivers
- Application performance metrics (latency, error rates, throughput)
- Infrastructure utilization metrics

This comprehensive view helps stakeholders understand spending patterns, identify optimization opportunities, and correlate costs with system behavior. For example, you can track cost spikes during deployments, correlate traffic spikes with cost increases, and measure cost reductions from performance improvements.

   {{< img src="cloud_cost/reporting/dashboards/example-showback-dashboard-1.png" alt="Dashboard widget tray displaying Cost Summary, Cost Budget, and Cloud Cost widget options" style="width:100%;" >}}

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
[11]: /cloud_cost_management/container_cost_allocation/
[12]: /cloud_cost_management/tag_pipelines/
