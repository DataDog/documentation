---
title: Cost Reports
private: true
description: Track your organization spending with Cloud Cost Management Reports.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
---

## Overview

Datadog's Cost Reports empower financial operations and finance teams to efficiently manage cloud costs. This feature provides a centralized platform for detailed cost analysis, allowing you to explore, analyze, and share cloud cost data.

With Cost Reports, you get:

* **Centralized analysis**: Access and manage cloud spend data from [AWS][1], [Azure][2], [Google Cloud][3], and [SaaS][4] through a single interface.
* **Flexible filtering**: Filter, group, and analyze costs to gain insights into spending patterns.
* **Optimization insights**: Identify areas for cost optimization and better budget management.

## Getting started with cost reports
Access cost reports from [**Cloud Cost > Analyze > Reports**][5]. You can create a cost report from scratch or choose a pre-built template to accelerate your workflow.  

### Available templates

{{< img src="cloud_cost/cost_reports/templates.png" alt="Diagram illustrating available Cost Report templates" style="width:90%;" >}}

Datadog provides several options in a template gallery to help you get started:

| Template | Description |
|----------|-------------|
| AWS Spend by Service Name | Understand your EC2, S3, and Lambda costs. |
| Azure Spend by Service Name | Break down costs by Azure services like Virtual Machines and Azure Monitor. |
| GCP Spend by Service Name | Break down costs by GCP services like Compute Engine, BigQuery, and Kubernetes Engine. |
| Spend by Provider | Compare costs across AWS, Azure, Google Cloud, and more. |

## Customizing cost reports

{{< img src="cloud_cost/cost_reports/annotated_cost_report.png" alt="Diagram illustrating available Cost Report editor with annotations" style="width:90%;" >}}

### Filters

Refine your reports by selecting cloud providers or applying custom tags. For example:

* Show only AWS and Snowflake expenditures
* Filter by specific environments (such as env:prod)
* Focus on costs associated with a specific region or team

### Grouping and visualization

Cost reports can be organized by various dimensions, including:

* **Provider name**: Such as AWS, Azure, and GCP
* **Service name**: Including services like EC2, S3, and Azure Monitor
* **Custom resource tags**: You can apply your own tags for further granularity

Visualization options include bar charts, summaries, or day-over-day views, which help in spotting trends and anomalies in cloud spending.

### Additional options

{{< img src="cloud_cost/cost_reports/advanced_options.png" alt="Diagram illustrating available Cost Report advanced options" style="width:90%;" >}}

Advanced users can:

* Switch between cost types like net amortized or amortized
* Toggle container allocation to include [containerized cost attribution][6]
* Toggle between all spend, which include things like fees, taxes, refunds or just focus on usage charges only

## Create a cost report

To create a cost report:

1. Navigate to [**Cloud Cost > Analyze > Reports**][1].
1. From this page, you can select a report template to start with, or click **New Report** to build a custom report.
1. [Filter](#filters) by provider(s), tags, and tag values to show costs from.
1. Use the dropdown to [group the data](#grouping-and-visualization) by specific attributes.
1. Select a timeframe view.
1. Change the visualization to surface the information you need.
1. Optionally, configure any [advanced options](#additional-options), such as cost type, container allocation, or show usage charges only.
1. Click **Save** at the top right of the page.

## Share reports with your team
After you've built a report, you save and share it across your organization. You can:

- Save reports for personal or team use
- Search for and star reports for quick access
- Share URLs with teammates to collaborate in real-time
- Export report views to CSV or PNGs

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/aws/
[2]: /cloud_cost_management/azure/?tab=billingaccounts
[3]: /cloud_cost_management/google_cloud/
[4]: /cloud_cost_management/saas_costs/
[5]: https://app.datadoghq.com/cost/analyze/reports
[6]: /cloud_cost_management/container_cost_allocation/

