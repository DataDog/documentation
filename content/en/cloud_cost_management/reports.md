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

With Cost Reports, you can:

- **Centralize cloud spend analysis**: View and manage costs from [AWS][1], [Azure][2], [Google Cloud][3], and [SaaS providers][4] in one place.
- **Filter and group**: Filter by provider, tags, regions, and group by service, provider, or custom tags.
- **Visualize graphs**: Use bar charts, summaries, and day-over-day views to spot trends and anomalies.
- **Use advanced controls**: Switch between cost types, toggle container allocation, and focus on usage charges or all spend.
- **Collaborate and share**: Save, star, export, and share reports with your team.

## Create a cost report

1. Go to [**Cloud Cost > Analyze > Reports**][5] in Datadog.
1. Click **New Report** to start from scratch, or select a template from the gallery to accelerate your workflow.

   {{< img src="cloud_cost/cost_reports/create-new-report.png" alt="Create a new report or from a template." style="width:100%;" >}}

   **Available Templates:**
   - **AWS Spend by Service Name**: Understand your EC2, S3, and Lambda costs.
   - **Azure Spend by Service Name**: Break down costs by Azure services like Virtual Machines and Azure Monitor.
   - **GCP Spend by Service Name**: Break down costs by GCP services like Compute Engine, BigQuery, and Kubernetes Engine.
   - **Spend by Provider**: Compare costs across AWS, Azure, Google Cloud, and more.

## Customizing your report

{{< img src="cloud_cost/cost_reports/customization-options-aws.png" alt="Customize your report by selecting cloud providers, filtering, grouping, changing the visualization, and using advanced options." style="width:100%;" >}}

### Apply filters
- Select cloud providers (such as AWS, Azure, GCP, Snowflake).
- Filter by tags (For example: `env:prod`, region, team).
- View by cost or usage

### Group data
- Group by provider name, service name, or custom resource tags for deeper insights.

### Choose visualization
- Select from bar charts, summaries, or month over month views to best represent your data.

### Advanced options (optional)

- **Show usage charges only**: Choose to include all spend (fees, taxes, refunds) or focus on usage charges only.
- **Cost type**: Switch between cost types (net, amortized, and so on).
- **Enable container allocation**:  Toggle container allocation for [containerized cost attribution][6].

**Note**: The availability of these options vary depending on the provider(s) selected.

## Save and share your report

1. Click **Save** at the top right to save your report for personal or team use.
1. Share the report by copying the URL or exporting the view to CSV or PNG.
1. Search for saved reports as needed.

[1]: /cloud_cost_management/aws/
[2]: /cloud_cost_management/azure/?tab=billingaccounts
[3]: /cloud_cost_management/google_cloud/
[4]: /cloud_cost_management/saas_costs/
[5]: https://app.datadoghq.com/cost/analyze/reports
[6]: /cloud_cost_management/container_cost_allocation/