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

 Go to [**Cloud Cost > Analyze > Reports**][5] in Datadog.
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
  - **Bar chart**: Compare costs across multiple categories side by side, so you can quickly identify top cost drivers.
  - **Pie chart**: Shows the percentage share of each segment, ideal for understanding the relative proportion of costs among a small number of categories.
  - **Treemap**: Displays hierarchical data and the relative size of many categories at once, making it easy to see both the overall structure and the alrgest contributors in a single view.
- Change the **table view**:
  - **Summary**: A consolidated, overall picture of your costs.
  - **Day over day**, **week over week** or **month over month**: Analyze how your costs change on a day to day, week to week, or month to month basis and identify trends or unusual fluctuations.
- Update the **timeframe** to monitor trends about your cloud spend.

### Advanced options (optional)

- **Show usage charges only**: Choose to include all spend (fees, taxes, refunds) or focus on usage charges only.
- **Cost type**: Choose a cost type that best matches your reporting, analysis, or financial management needs.

  | Cost Type | Benefits | Use Cases |
  |------------------|------------------------------------------------------|----------------------------------------------------------------|
  | Amortized | Cost based on applied discount rates plus the distribution of pre-payments across usage for the discount term (accrual basis) | Long-term cost analysis, internal allocation |
  | Blended | Averages rates across all usage | High-level reporting, mixed pricing models |
  | Unblended | (Recommended default) Cost shown as the amount charged at the time of usage (cash basis) | Detailed analysis, invoice reconciliation |
  | On-Demand | Cost based on the list rate by the provider. | Estimating, benchmarking, forecasting |
  | Net Amortized | Spreads both resource costs and discount program fees evenly over the billing period, including savings plans and reservation charges | Accurate reporting, budgeting, chargeback |
  | Net Unblended | Show the total resource costs for a given period, with discounts for large-scale usage already applied | Auditing, compliance, granular internal reporting |

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