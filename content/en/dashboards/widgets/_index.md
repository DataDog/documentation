---
title: Widgets
description: Dashboard building blocks for visualizing and correlating data across infrastructure with various chart types and displays.
aliases:
    - /graphing/dashboards/widgets
    - /graphing/faq/widgets
    - /graphing/widgets
---

## Overview

Widgets are building blocks for your dashboards. They allow you to visualize and correlate your data across your infrastructure.

## Getting Started

To begin using widgets in your dashboards:

1. Navigate to the [Dashboards page][1] in Datadog.
2. Click **New Dashboard** or select an existing dashboard to edit.
3. Click **Add Widget**. Choose from a variety of widget types such as timeseries, bar chart, table, or event stream.
4. Configure Your Widget:
    - Select data source: Choose metrics, logs, traces, or other data sources.
    - Customize visualization: Adjust display settings, units, and timeframes to fit your needs.
    - Add context: Use custom links, conditional formatting, and grouping for enhanced insights.
5. Save your dashboard and share it with your team or externally as needed.

For a detailed walkthrough, see the [Widget Configuration Guide][2] and explore the [Widget Types][3] available.

### Learn with Datadog Learning Center courses

Looking for hands-on tutorials? Check out these free Datadog Learninc Center courses for step-by-step guidance on dashboards and widgets:

{{< whatsnext desc=" " >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/dashboard-graph-widgets" >}}Dashboard Graph Widgets{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}Introduction to Dashboards{{< /nextlink >}}
{{< /whatsnext >}}

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

## Widget resources

{{< whatsnext desc="Widget configuration and types:">}}
    {{< nextlink href="/dashboards/widgets/configuration" >}}<strong>Configuration</strong>: Learn about widget configuration options and best practices{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/types" >}}<strong>Widget Types</strong>: Explore all available widget types and their use cases{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /dashboards/
[2]: /dashboards/widgets/configuration/
[3]: /dashboards/widgets/types/
