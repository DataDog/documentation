---
title: Bill Overview
description: View Datadog costs, usage trends, and projected end-of-month costs in a single page, with daily breakdowns, product-level detail, and multi-organization filtering.
further_reading:
  - link: "account_management/plan_and_usage/cost_details/"
    tag: "Documentation"
    text: "Cost Details"
  - link: "account_management/plan_and_usage/usage_details/"
    tag: "Documentation"
    text: "Usage Details"
  - link: "account_management/billing/usage_attribution/"
    tag: "Documentation"
    text: "Usage Attribution"
  - link: "cloud_cost_management/datadog_costs/"
    tag: "Documentation"
    text: "Datadog Costs"
---

View Datadog costs, usage trends, and projected end-of-month costs in a single page, with daily breakdowns, product-level detail, and multi-organization filtering.

The [**Bill Overview** page][1] gives administrators a single view of Datadog costs and usage. It is automatically enabled during the phased rollout starting March 2026.

## Global filters

The following filters apply to the **Bill Overview** page:```

the original isn't bad or wrong, just making this fit with the docs tone a little more

- **Product Category**: Filter all views by broader product family, such as  Infrastructure, APM, Logs, Security, or AI/ML.
- **Billing Dimension**: Filter to a specific billing dimension.
- **Sub-Org**: Filter to a specific child organization.
- **Group by Sub-Org**: Toggle to group costs by sub-organization.
- **Time range**: Select a billing period. Use the backward and forward arrows to navigate from month to month.

## Cost summary

At the top of the page, the cost summary shows:

- **Estimated cost to date**: Total estimated cost for the days elapsed in the current billing period (for example, "Estimated Mar 1–Mar 18 Cost").
- **Projected total**: Estimated total cost if current usage patterns continue through end of month, with month-over-month percentage change.

## Daily Cost Breakdown

Below the cost summary, the **Daily Cost Breakdown** stacked bar chart shows costs broken down by billing dimension for each day of the selected period. Each color in the chart represents a different billing dimension. Click the expand icon to view the chart full screen.

{{< img src="account_management/plan_and_usage/bill-overview-main-light.png" alt="Bill Overview page showing the cost summary header, Daily Cost Breakdown stacked bar chart, and Trends tab" >}}

## Trends tab

The **Trends** tab surfaces products worth investigating based on four sort options:

- **Highest % Cost Change**
- **Highest Cost Change ($)**
- **Highest Total Cost**
- **Highest % Usage Change**

Select a sort option to update the cards displayed. Each product card shows:

- **Total Cost** for the period
- **Projected EOM** cost
- **Month-over-month change** (percentage badge)
- **Daily Cost** bar chart spanning the previous and current month
- **Usage** (total units consumed, in natural units — for example, PB of scanned data, custom metrics) (on Total Cost and Usage-related cards)

Click **View Details** on any card to open the [product detail page][2].

{{< img src="account_management/plan_and_usage/bill-overview-trends-light.png" alt="Trends tab showing product cards sorted by Highest Total Cost" >}}

## Product List tab

The **Product List** tab shows all billing dimensions in a table with cost and usage side by side.

#### Additional filter (Product List only)

- **Cost Type**: Filter to show **Committed** costs, **On-Demand** costs, or **All** costs.

Click anywhere on a product row to open the [product detail page][2]. Hover over the end of a row to quickly create a cost monitor for that billing dimension.

#### Table columns

| Column | Description |
|---|---|
| Billing Dimension | Name of the product or billing dimension |
| Cost — Total | Cost billed to date for the period |
| Cost — Proj. EOM | Projected end-of-month total cost |
| Cost — Change | Dollar and percentage change vs. the prior period |
| Usage — Total | Total usage in natural units |
| Usage — Change | Usage change vs. the comparison period |

Toggle between **Monthly** and **Daily** views using the controls above the table. Download the full table as a CSV using the **Download as CSV** button. The table is paginated (10 rows per page by default).

{{< img src="account_management/plan_and_usage/bill-overview-product-list-light.png" alt="Product List tab showing the billing dimensions table with Cost and Usage columns" >}}

## Product detail page

Click **View Details** on a Trends card, or click any row in the Product List table, to open the product detail page for a single billing dimension.

{{< img src="account_management/plan_and_usage/bill-overview-detail-light.png" alt="Product detail page showing Cost Overview and Usage Overview sections with daily bar charts" >}}

### Cost Overview

- **Total Cost**: Total cost billed to date for the selected period
- **Projected Cost Change**: The projected dollar and percentage change vs. the prior period
- **Projected EOM**: Estimated total cost at end of month
- **Daily Cost** bar chart: Day-by-day cost for the previous and current month, with the current month highlighted. Hover over any bar to see the cost for that day. Toggle **Show Usage Charges Only** to isolate on-demand charges.
- **Drilldown in Cloud Cost**: Click to open Cloud Cost Management, pre-filtered to the selected billing dimension.

### Usage Overview

- **Total Usage**: Total units consumed for the selected period.
- **Usage Change**: Change in usage vs. the prior period (amount and percentage).
- **Usage breakdown by sub-dimension**: Individual usage totals for each sub-dimension (for example, Sensitive Data Scanner lists Scanned Events, Scanned Logs, Scanned RUM Sessions, and Scanned Spans separately).
- **Usage Types** bar chart: Day-by-day usage stacked by sub-dimension.
- **Allotment Usage**: Progress bar showing consumed vs. contracted allotment. Displays ">100%" when usage exceeds the allotment.
- **Drilldown in Usage Attribution**: Opens Usage Attribution pre-filtered to this billing dimension.

## Toggle back to the previous layout

If your organization is on the new **Bill Overview** and you prefer the previous layout, click **Disable Preview** in the page header. This toggle is available to all organizations and persists for your session.

{{< img src="account_management/plan_and_usage/toggle-back-header.png" alt="Bill Overview page header showing the Disable Preview button" >}}

To return to Bill Overview, click **Enable Preview** in the header.

## Permissions

| Section | Required permission |
|---|---|
| Bill Overview (cost data) | `BILLING_READ` |
| Usage Tab | `USAGE_READ` |
| Plan Details | `BILLING_READ` |
| Billing History | `BILLING_READ` |
| Usage Attribution | `USAGE_READ` + Enterprise or Pro plan |
| Sub-org cost trends | Parent org must have `suborg_cost_trends` enabled |

For information on managing permissions, see [Role Based Access Control][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/bill-overview
[2]: /account_management/plan_and_usage/bill_overview/#product-detail-page
[3]: /account_management/rbac/
