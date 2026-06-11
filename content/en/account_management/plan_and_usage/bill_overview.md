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

The following filters apply to the {{< ui >}}Bill Overview{{< /ui >}} page:

- {{< ui >}}Product Category{{< /ui >}}: Filter all views by broader product family, such as  Infrastructure, APM, Logs, Security, or AI/ML.
- {{< ui >}}Billing Dimension{{< /ui >}}: Filter to a specific billing or metering dimension (for example, Infra Hosts, Indexed Logs, or Synthetic Browser Tests).
- {{< ui >}}Sub-Org{{< /ui >}}: Filter to a specific child organization.
- {{< ui >}}Group by Sub-Org{{< /ui >}}: Toggle to group costs by sub-organization.
- {{< ui >}}Time range{{< /ui >}}: Select a billing period. Use the backward and forward arrows to navigate from month to month.

## Cost summary

At the top of the page, the cost summary shows:

- {{< ui >}}Estimated cost to date{{< /ui >}}: Total estimated cost for the days elapsed in the current billing period
- {{< ui >}}Projected total{{< /ui >}}: Estimated total cost if current usage patterns continue through end of month, with month-over-month percentage change

## Daily Cost Breakdown

Below the cost summary, the {{< ui >}}Daily Cost Breakdown{{< /ui >}} stacked bar chart shows costs broken down by billing dimension for each day of the selected period. Each color in the chart represents a different billing dimension. Click the expand icon to view the chart full screen.

{{< img src="account_management/plan_and_usage/bill-overview-main-light.png" alt="Bill Overview page showing the cost summary header, Daily Cost Breakdown stacked bar chart, and Trends tab" >}}

## Trends tab

The {{< ui >}}Trends{{< /ui >}} tab displays products worth investigating based on four sort options:

- {{< ui >}}Highest % Cost Change{{< /ui >}}
- {{< ui >}}Highest Cost Change ($){{< /ui >}}
- {{< ui >}}Highest Total Cost{{< /ui >}}
- {{< ui >}}Highest % Usage Change{{< /ui >}}

Select a sort option to update the cards displayed. Each product card shows:

- {{< ui >}}Total Cost{{< /ui >}} for the period
- {{< ui >}}Projected EOM{{< /ui >}} cost
- {{< ui >}}Month-over-month change{{< /ui >}}, displayed as a percentage badge
- {{< ui >}}Daily Cost{{< /ui >}} bar chart spanning the previous and current month
- {{< ui >}}Usage{{< /ui >}}, displayed as total units consumed, in natural units; for example, PB (petabytes) of scanned data, Custom Metrics; displayed only on Total Cost and Usage-related cards

Click {{< ui >}}View Details{{< /ui >}} on any card to open the [product detail page][2].

{{< img src="account_management/plan_and_usage/bill-overview-trends-light.png" alt="Trends tab showing product cards sorted by Highest Total Cost" >}}

## Product List tab

The {{< ui >}}Product List{{< /ui >}} tab shows all billing dimensions in a table with cost and usage side by side.

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

Toggle between {{< ui >}}Monthly{{< /ui >}} and {{< ui >}}Daily{{< /ui >}} views using the controls above the table. Download the full table as a `.csv` file using the {{< ui >}}Download as CSV{{< /ui >}} button. The table is paginated, displaying 10 rows per page by default.

{{< img src="account_management/plan_and_usage/bill-overview-product-list-light.png" alt="Product List tab showing the billing dimensions table with Cost and Usage columns" >}}

## Product detail page

Click {{< ui >}}View Details{{< /ui >}} on a Trends card or click any row in the {{< ui >}}Product List{{< /ui >}} table to open the product detail page for a single billing dimension.

{{< img src="account_management/plan_and_usage/bill-overview-detail-light.png" alt="Product detail page showing Cost Overview and Usage Overview sections with daily bar charts" >}}

### Cost Overview

- {{< ui >}}Total Cost{{< /ui >}}: Total cost billed to date for the selected period
- {{< ui >}}Projected Cost Change{{< /ui >}}: The projected dollar and percentage change vs. the prior period
- {{< ui >}}Projected EOM{{< /ui >}}: Estimated total cost at end of month
- {{< ui >}}Daily Cost{{< /ui >}} bar chart: Day-by-day cost for the previous and current month, with the current month highlighted. Hover over any bar to see the cost for that day. Toggle {{< ui >}}Show Usage Charges Only{{< /ui >}} to isolate on-demand charges.
- {{< ui >}}Drilldown in Cloud Cost{{< /ui >}}: Click to open Cloud Cost Management, pre-filtered to the selected billing dimension.

### Usage Overview

- {{< ui >}}Total Usage{{< /ui >}}: Total units consumed for the selected period
- {{< ui >}}Usage Change{{< /ui >}}: Change in usage vs. the prior period (amount and percentage)
- {{< ui >}}Usage breakdown by sub-dimension{{< /ui >}}: Individual usage totals for each sub-dimension. For example, Sensitive Data Scanner lists Scanned Events, Scanned Logs, Scanned RUM Sessions, and Scanned Spans separately.
- {{< ui >}}Usage Types{{< /ui >}} bar chart: Day-by-day usage stacked by sub-dimension
- {{< ui >}}Allotment Usage{{< /ui >}}: Progress bar showing consumed vs. contracted allotment; displays ">100%" when usage exceeds the allotment
- {{< ui >}}Drilldown in Usage Attribution{{< /ui >}}: Click to open {{< ui >}}Usage Attribution{{< /ui >}}, pre-filtered to the selected billing dimension.

## Revert to the previous layout

If your organization is on the new {{< ui >}}Bill Overview{{< /ui >}} and you prefer the previous layout, click {{< ui >}}Disable Preview{{< /ui >}} in the page header. This toggle is available to all organizations and persists for your session.

{{< img src="account_management/plan_and_usage/toggle-back-header.png" alt="Bill Overview page header showing the Disable Preview button" >}}

To return to {{< ui >}}Bill Overview{{< /ui >}}, click {{< ui >}}Enable Preview{{< /ui >}} in the header.

## Permissions

The following permissions are required to access each section of Bill Overview:

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
