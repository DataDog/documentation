---
title: Reports
private: true
description: Track your organization spending with Cloud Cost Management Reports.
further_reading:
- link: "/cloud_cost_management/reports/scheduled_reports"
  tag: "Documentation"
  text: "Scheduled cost reports"
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
---

## Overview

Datadog's Cloud Cost Monitoring (CCM) Reports empower financial operations and finance teams to efficiently manage cloud costs. This feature provides a centralized platform for detailed cost analysis, allowing you to explore, analyze, and share cloud cost or budget data.

With Reports, you can:

- **Centralize cloud spend analysis**: View and manage costs from [AWS][1], [Azure][2], [Google Cloud][3], [Oracle][12], and [SaaS providers][4] in one place.
- **Filter and group**: Filter by provider, tags, regions, and group by service, provider, or custom tags.
- **Visualize graphs**: Use bar charts, summaries, and day-over-day views to spot trends and anomalies.
- **Use advanced controls**: Switch between cost types, toggle container allocation, and focus on usage charges or all spend.
- **Create budget reports**: Build budget reports in addition to cost reports to track spending against budget targets and forecast future costs.
- **Collaborate and share**: Save, star, export, and share reports with your team.

## Create a CCM report

1. Go to [**Cloud Cost > Analyze > Reports**][5] in Datadog.
1. Click **New Report** to start from scratch, or select a template from the gallery to accelerate your workflow.

   {{< img src="cloud_cost/cost_reports/create-new-report.png" alt="Create a new report or from a template." style="width:100%;" >}}

   **Available Templates:**
   - **AWS Spend by Service Name**: Understand your EC2, S3, and Lambda costs.
   - **Azure Spend by Service Name**: Break down costs by Azure services like Virtual Machines and Azure Monitor.
   - **GCP Spend by Service Name**: Break down costs by GCP services like Compute Engine, BigQuery, and Kubernetes Engine.
   - **Spend by Provider**: Compare costs across AWS, Azure, Google Cloud, Oracle Cloud, and more.

## Customizing your report

{{< img src="cloud_cost/cost_reports/customization-options-aws-1.png" alt="Customize your report by selecting cloud providers, filtering, grouping, changing the visualization, and using advanced options." style="width:100%;" >}}

### Select the type of report

Select the type of report you want to build:

- **Cost**: Understand where your money is being spent across services, regions, teams, and so on.
- **Budget**: Track spending against predefined budget targets and forecast future costs.

### Apply filters

Use filters to include only the specific costs you want to allocate, such as by provider, product, tag, region, or cost type, so your rule targets exactly the right subset of your cloud spend.

| Filter by | Use case |
|--------|----------|
| Cloud provider (such as AWS, Azure, GCP, Snowflake) | Apply your allocation rule only to costs from a specific cloud provider, such as for AWS support fees, but not Azure or GCP costs. |
| Product or service (such as EC2, S3, RDS) | Allocate costs related to a specific product or service. For example, split only EC2 costs among teams instead of all AWS costs. |
| Tags (`env:prod`, `team:analytics`) | Include or exclude costs based on resource tags. For example, allocate costs only for production resources (`env:prod`), or only for resources tagged to the analytics team. |
| Region | Allocate costs only for resources in a specific geographic region. For example, split costs for resources in `us-east-1` separately from those in `eu-west-1`. |
| Cost type (usage, support, untagged) | Allocate only certain types of costs, such as usage charges, support fees, or untagged costs. For example, allocate only untagged costs to encourage teams to tag their resources. |
| Custom criteria | When you have a unique business requirement that combines multiple filters, create a custom criteria. For example, you want to allocate only EC2 costs in a specific region `us-west-2` tagged as `env:prod`. |

### Group data
- Group by provider name, service name, or custom resource tags for deeper insights.

### Change how you see your data
- Select a **visualization option**:
  - **Bar chart**: Compare costs across multiple categories side by side, so you can identify top cost drivers.
  - **Pie chart**: Shows the percentage share of each segment, ideal for understanding the relative proportion of costs among a small number of categories.
  - **Treemap**: Displays hierarchical data and the relative size of many categories at once, so you can see both the overall structure and the largest contributors in a single view.
- Change the **table view**:
  - **Summary**: A consolidated, overall picture of your costs.
  - **Day over day**, **week over week** or **month over month**: Analyze how your costs change on a day to day, week to week, or month to month basis and identify trends or unusual fluctuations.
- Update the **time frame** to monitor trends about your cloud spend.

### Advanced options (optional)

- **Show usage charges only**: Choose to include all spend (fees, taxes, refunds) or focus on usage charges only.
- **Cost type**: Choose a cost type that best matches your reporting, analysis, or financial management needs. Review the definitions for each cost type based on your provider: [AWS][7], [Azure][8], [Google Cloud][9], [Custom][10].

  **Note**: The availability of these options vary depending on the provider(s) selected.

## Save and share your report

After you've created and customized your report, you can save and share it from both the main reports page and individual report card views.

- **Save your report** to make it available for personal or team use.
- **Share your report** by copying the URL or exporting it to CSV or PNG.
- **Schedule reports** to be automatically sent to your team. [Learn more about scheduling reports][11].
- **Export report views to Dashboards** to track costs alongside other widgets.
- **Search saved reports** to find what you need (available from main reports page only).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/aws/
[2]: /cloud_cost_management/azure/?tab=billingaccounts
[3]: /cloud_cost_management/google_cloud/
[4]: /cloud_cost_management/saas_costs/
[5]: https://app.datadoghq.com/cost/analyze/reports
[6]: /cloud_cost_management/container_cost_allocation/
[7]: /cloud_cost_management/setup/aws/#cost-types
[8]: /cloud_cost_management/setup/azure/#cost-types
[9]: /cloud_cost_management/setup/google_cloud/#cost-types
[10]: /cloud_cost_management/setup/custom/#cost-metric-types
[11]: /cloud_cost_management/reports/scheduled_reports
[12]: /cloud_cost_management/oracle/
