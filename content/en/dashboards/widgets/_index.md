---
title: Widgets
description: Dashboard building blocks for visualizing and correlating data across infrastructure with various chart types and displays.
aliases:
    - /graphing/dashboards/widgets
    - /graphing/faq/widgets
    - /graphing/widgets
further_reading:
- link: "/dashboards/"
  tag: "Documentation"
  text: "Learn more about Dashboards"
- link: "/dashboards/widgets/configuration"
  tag: "Documentation"
  text: "Learn about widget configuration options and best practice"
- link: "/dashboards/widgets/types/"
  tag: "Documentation"
  text: "Explore all available widget types"
---

## Overview

Dashboard widgets are visual representations of data. They serve as the building blocks for your [dashboards][2] to visualize and correlate your data across your infrastructure. They can contain different types of information, such as graphs, images, logs, and statuses, to give you an overview of your systems and environments.

## Get started

The fastest way to onboard widgets relevant to your data is to clone a dashboard from the [preset list][1] which includes dashboards created by other members of your organization and out-of-the-box templates for your installed integrations. After you clone a dashboard, you can customize widgets to your use case.


{{< whatsnext desc="Additional guides and courses to learn about widgets:" >}}
   {{< nextlink href="/getting_started/dashboards/" >}}<u>Getting Started with Dashboards</u>: Walkthrough of building out a dashboard with widgets{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/dashboard-graph-widgets" >}}<u>Dashboard Graph Widgets</u>: Learning center course explaining how to create, configure, and use dashboard graph widgets{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}<u>Introduction to Dashboards</u>: Learning center course explaining how to build a dashboard in a sandbox environment{{< /nextlink >}}
{{< /whatsnext >}}

### Add a widget to your dashboard

To begin using widgets in your dashboards:

1. Navigate to the [Dashboards List][1] in Datadog.
2. Click **New Dashboard** or select an existing dashboard to edit.
3. Click **Add Widget**. Choose from a variety of widget types such as timeseries, bar chart, table, or event stream.
4. Configure your widget:
    - Select data source: Choose metrics, logs, traces, or other data sources.
    - Customize visualization: Adjust display settings, units, and timeframes to fit your needs.
    - Add context: Use custom links, conditional formatting, and grouping for enhanced insights.
5. Save your dashboard and share it with your team or externally as needed.

For more information, see [Widget Configuration][3] and explore the available [Widget Types][4].

## Data sources

Widgets can visualize data from multiple Datadog sources including:

- **APM Traces**: Application performance monitoring data
- **Events**: Custom events, deployments, and annotations
- **Logs**: Log events, log analytics, and log-based metrics
- **Metrics**: Infrastructure, application, and custom metrics
- **RUM**: Real User Monitoring and synthetic test data
- **SLOs**: Service Level Objectives and error budgets
- **Security**: Security signals and compliance data

## Common use cases

{{% collapse-content title="Infrastructure Monitoring" level="h4" expanded=false %}}
- Use **Timeseries** widgets for CPU, memory, and network metrics over time
- Use **Hostmap** widgets to visualize resource usage across your infrastructure
- Use **Top List** widgets to identify the most resource-intensive hosts or services
{{% /collapse-content %}}

{{% collapse-content title="Application Performance" level="h4" expanded=false %}}
- Use **Timeseries** widgets to track response times, error rates, and throughput
- Use **Service Summary** widgets for high-level service health overviews
- Use **Topology Map** widgets to visualize service dependencies and data flow
{{% /collapse-content %}}

{{% collapse-content title="Business Intelligence" level="h4" expanded=false %}}
- Use **Query Value** widgets for key performance indicators and business metrics
- Use **Funnel** widgets to track user conversion through your application
- Use **Retention** widgets to analyze user engagement and churn
{{% /collapse-content %}}

{{% collapse-content title="Incident Response" level="h4" expanded=false %}}
- Use **Alert Graph** widgets to show alert history and trends
- Use **Monitor Summary** widgets for current alert status across your infrastructure
- Use **Event Stream** widgets for real-time event monitoring
{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists/preset/1
[2]: /dashboards/
[3]: /dashboards/widgets/configuration/
[4]: /dashboards/widgets/types/
