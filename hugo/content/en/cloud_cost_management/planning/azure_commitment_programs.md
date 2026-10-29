---
title: Azure Commitment Programs
description: Review Azure commitment savings, investigate on-demand spend, and track reservations, savings plans, and pre-purchase plan balances.
further_reading:
- link: "/cloud_cost_management/setup/azure/"
  tag: "Documentation"
  text: "Set up Azure Cloud Cost Management"
- link: "/cloud_cost_management/planning/commitment_programs/"
  tag: "Documentation"
  text: "Learn about Commitment Programs"
---

## Overview

Explore Azure commitments across all eligible services. Review overall savings, investigate uncovered usage across products, and review commitments before they expire. Datadog supports Azure reservations and savings plans for all eligible services. You can also track Azure Databricks pre-purchase plans.

The Azure navigation separates these tasks into three views:

| View | Use it to |
|---|---|
| [Overview](#review-your-savings) | Review savings, coverage, and utilization across Azure services. |
| [Coverage](#investigate-on-demand-spend) | Find commitment-eligible usage billed at on-demand rates and identify its owners. |
| [Inventory](#manage-your-commitments) | Review savings plans, reservations, and pre-purchase plans, including their expiration dates. |

## Before you begin

Azure Commitment Programs uses your existing [Azure Cloud Cost Management setup][2], including its actual and amortized cost exports.

Viewing utilization, unused costs, and pre-purchase plan balances requires **billing account scope exports**. Lower-scope exports omit unused reservation and savings plan costs. Utilization and unused costs are unavailable with those exports. Savings metrics represent a best-case estimate. See [Unused reservation and savings plan costs][3] for scope details.

## Get started

1. Open [**Commitment Programs**][1] in Cloud Cost Management.
2. In the {{< ui >}}Azure{{< /ui >}} navigation, select {{< ui >}}Overview{{< /ui >}}, {{< ui >}}Coverage{{< /ui >}}, or {{< ui >}}Inventory{{< /ui >}}.
3. Select the {{< ui >}}Billing Account{{< /ui >}} values and reporting period to investigate. Dates use UTC.

## Review your savings

Start with {{< ui >}}Overview{{< /ui >}} to review performance across Azure services. Select a savings metric to change the chart:

- {{< ui >}}Effective Savings Rate{{< /ui >}}: Savings as a percentage of what the usage would cost at on-demand list rates. Azure savings include reservations, savings plans, and negotiated on-demand discounts.
- {{< ui >}}Realized Savings{{< /ui >}}: The amount saved compared with on-demand list rates during the reporting period.

The coverage summary shows how much eligible spend is covered by commitments and how much remains on demand. The utilization summary shows how much of your savings plans and reservations you use. Coverage measures the usage that commitments cover; utilization measures how much of your purchased commitments you consume.

Select {{< ui >}}View more{{< /ui >}} in the coverage or utilization summary to investigate the corresponding view.

{{< callout header="false" btn_hidden="true" respect-site-support="false" >}}
Screenshot placeholder: Azure Overview with navigation, billing account and date selectors, and the savings chart. Include coverage and utilization summaries. Use sanitized example data.
{{< /callout >}}

If a warning identifies inaccurate savings metrics for an account billed in a currency other than USD, do not use those metrics to evaluate savings.

## Investigate on-demand spend

Open {{< ui >}}Coverage{{< /ui >}} to find commitment-eligible costs billed at on-demand rates.

1. Review the {{< ui >}}Cost Coverage Over Time{{< /ui >}} chart to identify changes in coverage.
2. Use the filters to narrow the costs and choose the dimensions used to group the table. The default grouping is Azure product, meter subcategory, and commitment type eligibility.
3. Compare {{< ui >}}On-Demand cost{{< /ui >}} with {{< ui >}}Cost Coverage{{< /ui >}} to identify groups with substantial uncovered spend. Azure coverage is measured by cost.
4. Select a row to open {{< ui >}}Hot-Spot Details{{< /ui >}}. Use {{< ui >}}Group by{{< /ui >}} in the details panel to investigate ownership using the tags available on your cost data.

Use these patterns to assess whether predictable usage could benefit from additional commitments. Check existing commitment utilization before increasing your commitment spend.

{{< callout header="false" btn_hidden="true" respect-site-support="false" >}}
Screenshot placeholder: Azure Coverage with its chart and grouping filters. Open a hot-spot details panel showing an ownership breakdown. Use sanitized example data.
{{< /callout >}}

## Manage your commitments

Open {{< ui >}}Inventory{{< /ui >}} to review commitments active during the reporting period. Use the navigation links to jump to {{< ui >}}Savings Plans{{< /ui >}}, {{< ui >}}Reserved Instances{{< /ui >}}, or {{< ui >}}Pre-purchase Plans{{< /ui >}}.

Use the {{< ui >}}Status{{< /ui >}} filter to focus on {{< ui >}}Expiring soon{{< /ui >}} or {{< ui >}}Recently started{{< /ui >}} commitments.

### Savings plans and reservations

Each section includes utilization and unused spend summaries, a daily chart, and an inventory table. The chart tracks used and unused commitment spend alongside utilization over time. The inventory can include commitments that were active during the reporting period but have since expired.

- In {{< ui >}}Savings Plans{{< /ui >}}, use {{< ui >}}Type{{< /ui >}} to choose {{< ui >}}All types{{< /ui >}}, {{< ui >}}Compute{{< /ui >}}, or {{< ui >}}Database{{< /ui >}}.
- In {{< ui >}}Reserved Instances{{< /ui >}}, use {{< ui >}}Product{{< /ui >}} to focus on reservations for a particular Azure service.
- Search the tables for a commitment ID or benefit name. Review {{< ui >}}Utilization{{< /ui >}} to identify underused commitments, and {{< ui >}}End Date{{< /ui >}} to plan renewals. Use {{< ui >}}Columns{{< /ui >}} to show additional details.

Common inventory columns include:

| Column | Description |
|---|---|
| Commitment ID | Unique identifier for the commitment. |
| Benefit Name | Name of the Azure savings plan or reservation benefit. |
| Term | Duration of the commitment. |
| Committed Spend/Hr | Hourly spend committed under a savings plan. |
| End Date | Date the commitment expires. |
| Utilization | Percentage of the commitment used during the reporting period. |

{{< callout header="false" btn_hidden="true" respect-site-support="false" >}}
Screenshot placeholder: Azure Inventory with the Status filter and the type and product selectors. Include utilization charts and inventory tables. Use sanitized example data.
{{< /callout >}}

### Pre-purchase plans

Use {{< ui >}}Pre-purchase Plans{{< /ui >}} to review Azure Databricks prepaid balances and expiration dates. The summary shows:

| Metric | Meaning |
|---|---|
| Remaining balance | Unspent purchase cost in active plans. |
| Waste | Remaining balance in expired plans. An active plan's remaining balance is not waste. |
| Net savings | On-demand equivalent cost of covered usage minus its discounted cost for the reporting period, minus waste. |

The {{< ui >}}Pre-purchase plans remaining balance{{< /ui >}} chart shows how balances change over time. In the table, compare {{< ui >}}Remaining{{< /ui >}} and {{< ui >}}% Remaining{{< /ui >}} with {{< ui >}}End Date{{< /ui >}} to identify balances to use before expiration. A plan with no remaining balance is marked {{< ui >}}FULLY USED{{< /ui >}} while it is still active.

Remaining balances account for usage since purchase through the end of the reporting period, including usage before the period starts. When you view a historical period, plan status reflects that period: a plan that expired afterward can appear active.

The inventory includes plans purchased within the last **15 months**, based on the available cost history. Older plans are omitted even if they are still active. If a purchase within this window is missing, check your [historical Azure cost data][4]. Incomplete usage history can overstate the remaining balance.

Unavailable values appear as {{< ui >}}N/A{{< /ui >}}. Summary amounts are unavailable when the required values are missing or the selected plans use different currencies.

{{< callout header="false" btn_hidden="true" respect-site-support="false" >}}
Screenshot placeholder: Azure Pre-purchase Plans with its summary and balance chart. Include the table's plan, purchase, and drawdown details. Use sanitized example data.
{{< /callout >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/commitment-programs
[2]: /cloud_cost_management/setup/azure/
[3]: /cloud_cost_management/setup/azure/#unused-commitment-costs
[4]: /cloud_cost_management/setup/azure/#getting-historical-data
