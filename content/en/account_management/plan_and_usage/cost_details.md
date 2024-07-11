---
title: Cost Details
further_reading:
- link: "https://docs.datadoghq.com/account_management/billing/"
  tag: "Documentation"
  text: "Billing"
- link: "https://docs.datadoghq.com/account_management/billing/usage_details/"
  tag: "Documentation"
  text: "Usage details"
- link: "https://docs.datadoghq.com/account_management/multi_organization/"
  tag: "Documentation"
  text: "Managing multiple-organization accounts"
---

## Overview

Cost Summary and Cost Chargebacks help you understand your estimated month-to-date, projected end-of-month, and historical Datadog costs. Cost data is available for the past 15 months.

You can break down your costs by sub-organization and by product to:
- Allocate costs according to their source
- Gain insight into how costs are tracking

### Permissions

Roles with Billing Read (`billing_read`) and Usage Read (`usage_read`) [permissions][1] can view the Cost Summary and Cost Chargebacks data. Users with the Datadog Admin role have these permissions by default.


## Cost summary

Use the cost summary to:
- View estimated month-to-date and projected end-of-month costs
- View historical costs
- Filter and group costs by product or sub-organization
- View month-over-month % and $ cost changes
- View cost trends within the month
- View cumulative day-over-day costs

### Projected Costs (parent organization)

Projected end-of-month costs are calculated by applying the current month's projected usage data against your contracted rates. Projections are available around the 12th of the month and are updated daily. Projected end-of-month costs may change over time, depending on your usage throughout the month. Because the costs are a prediction, the amount may differ from your finalized monthly cost. 

### Cost Summary (parent organization)

The cost summary functionality changes according to your Datadog usage as a single organization or a multi-organization. As a multi-organization, you can view estimated, projected, and historical costs for the parent organization and each sub-organization. 

{{< img src="account_management/plan_and_usage/multiorg-current-month-historical-costs.png" alt="Screenshot of the current month's Cost Summary for a parent organization, showing the overall month-to-date cost, projected cost, a graph with cumulative cost breakdowns, and a summary table including month-over-month cost changes." >}}

View historical costs by toggling back to previous months, or use the date dropdown to view costs over 1,3, 6 or 12 months.

{{< img src="static/images/account_management/plan_and_usage/parent-org-multi-month-cost-changes.png" alt="Screenshot of a parent organization's historical costs over a three month period, showing the overall cost for the month, a graph with cumulative cost breakdowns, and a summary table including month-over-month cost changes." >}}

1. While logged in to the parent organization, navigate to [Plan & Usage][2].
1. Click the **Usage** tab.
1. For a multi-organization, ensure the **Overall** tab is selected.

#### View and filter

Use the search facets at the left to filter the cost by **Products**, **Sub-Orgs** or **Cost Breakdown**. Use the Daily Cost tab to see how the cumulative day-over-day costs have changed within the current month. 


#### Download

To download the data as a comma separated value file, click **Download as CSV**. Data is available for the current month and pre-defined prior months. Use the `Cost Type` field to distinguish between the records:
- **Projected**: Data is available for the current month.
- **Estimated MTD**: Data is available from the first of the month to the current date. If historical cost data is not yet available for the prior month, estimated cost data also displays for the prior month.
- **Historical**: Data is available after month close, which is approximately 16 days after the end of the month.
  
To query estimated cost data through the API, see [Get estimated cost across your account][3]. To query projected cost data through the API, see [Get projected cost across your account][6].

### Cost Summary (sub-organization)

<div class="alert alert-warning">This feature is in beta. To request access and confirm your organization meets the feature criteria, contact your account representative or <a href="https://docs.datadoghq.com/help/">Customer Support</a>.</div>

As a sub-organization, you can view the costs for your organization only. This restriction allows for more distributed ownership and removes the need to grant broader Admin permissions to the parent organization.

{{< img src="account_management/plan_and_usage/suborg-cost-trends.png" alt="Screenshot of the current month's Cost Summary for a sub-organization, showing the overall month-to-date cost, projected cost, a graph with cumulative cost breakdowns, and a summary table including month-over-month cost changes.">}}

View historical costs by toggling back to previous months or use the date dropdown to view costs over 1,3, 6 or 12 months.

{{< img src="static/images/account_management/plan_and_usage/suborg-multi-month-cost-changes.png" alt="Screenshot of a sub organization's historical costs over a six month period, showing the overall cost for the month, a graph with cumulative cost breakdowns, and a summary table including month-over-month cost changes." >}}

1. While logged in to the sub-organization, navigate to [Plan & Usage][2].
1. Click the **Usage** tab.
1. Ensure the **Overall** tab is selected.

#### View and filter

Use the search facets at the left to filter the cost by **Products** or **Cost Breakdown**. Use the **Daily Cost** tab to see how the cumulative day-over-day costs have changed within the current month.

#### Download

To download the data as a comma separated value file, click **Download as CSV**.

## Cost chargebacks

Use the cost chargebacks to:
- View estimated month-to-date and historical costs for multi-organizations
- Attribute costs to each sub-organization

Cost chargebacks are derived by:
- Calculating the sub-organization usage ratio. This is done by dividing usage per sub-organization by the total parent organization usage.
- Applying the sub-organization usage ratio against the parent organization costs, providing the cost chargebacks per sub-organization.

### Historical cost chargebacks

From a parent organization, view finalized historical costs aggregated by product and sub-organization.

{{< img src="account_management/plan_and_usage/historical-cost-chargebacks.png" alt="Screenshot of a table titled 'Usage and Cost Summary', showing total usage in dollars for four sub-organizations and the total cost." >}}

1. While logged in to the parent organization, navigate to [Plan & Usage][2].
1. Select the **Usage** tab.
1. Click **Individual Organizations**.
1. Ensure the **Billable** and **Cost** toggles are selected.
1. Use the date selector to view a prior month for which billing has completed.

**Note**: Data is available after month close, which is approximately 16 days after the end of the month.

### Estimated cost chargebacks

From a parent organization, view estimated costs aggregated by product and sub-organization.

Estimated cost data is available for the current month. If historical cost data is not yet available for the prior month, estimated cost data also displays for the prior month.

{{< img src="account_management/plan_and_usage/estimated-cost-chargebacks.png" alt="Screenshot of a table titled 'Usage and Cost Summary', showing total usage in dollars for four sub-organizations and the total cost." >}}

1. While logged in to the parent organization, navigate to [Plan & Usage][2].
1. Select the **Usage** tab.
1. Click **Individual Organizations**.
1. Ensure the **Billable** and **Cost** toggles are selected.
1. Ensure the date selector shows the current or prior month.

### Download

- To download historical or estimated cost chargeback data as a comma separated value file, click **Download as CSV**.
- See [Get historical cost across your account][4] to query historical cost chargeback data through the API.
- See [Get estimated cost across your account][3] to query estimated cost chargeback data through the API.

## How billing aggregations affect cost changes

Your estimated month-to-date Datadog bill varies throughout the month. The type of aggregation used to bill each product determines how the costs are impacted. For the best visualization, see the [cost summary][5] feature chart. Each **Products** filter includes the relevant billing aggregation method next to the product name.

### Percentile and average usage billing

Products billed by the maximum count (high-water mark) of the lower 99 percent of usage for the month include infrastructure hosts and APM hosts. Products billed by the average over the month include custom metrics and Fargate tasks. For these two types of products, expect their costs to remain relatively stable throughout the month. However, they are still subject to cost changes if there is a significant spike or drop in usage.

### Sum of usage billing

Products billed by the sum of usage throughout the month include indexed logs and ingested logs. For these types of products, expect their costs to increase or decrease based on changes to usage volume.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/
[2]: https://app.datadoghq.com/billing/usage
[3]: /api/latest/usage-metering/#get-estimated-cost-across-your-account
[4]: /api/latest/usage-metering/#get-historical-cost-across-your-account
[5]: /account_management/plan_and_usage/cost_details/#cost-summary
[6]: /api/latest/usage-metering/#get-projected-cost-across-your-account
