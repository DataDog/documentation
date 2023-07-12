---
title: Cost Details
kind: documentation
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

{{< callout url="http://docs.datadoghq.com/help/">}}
  Estimated Cost Summary and Cost Chargebacks are in beta. To request access and confirm your organization is supported, contact your account representative or Support.
{{< /callout >}} 

## Overview

Estimated Cost Summary and Cost Chargebacks help you understand your estimated month-to-date and historical Datadog costs.

You can break down your costs by sub-organization and by product to:
- Allocate costs according to their source
- Gain insight into how costs are tracking

### Permissions

To view the Estimated Cost Summary and Cost Chargebacks data, you must be a Datadog Admin user.

Alternately, roles with Billing Read (`billing_read`) and Usage Read (`usage_read`) [permissions][1] can view the Estimated Cost Summary and Cost Chargebacks data.

## Cost summary

Use the cost summary to:
- View estimated month-to-date costs
- View cost trends within the month
- Filter and group costs by product or sub-organization
- View cumulative day-over-day costs

### Estimated Cost Summary (parent organization)

The cost summary functionality changes according to whether you use Datadog as a single organization or a multi-organization. As a multi-organization, you can view estimated costs for the parent organization and each sub-organization. 

{{< img src="account_management/plan_and_usage/multi-org-estimated-cost-summary.png" alt="Screenshot of the Estimated Cost Summary for a parent organization, showing the overall month to date cost, a graph of cumulative cost breakdown, and a summary table." >}}

1. While logged in to the parent organization, navigate to [Plan & Usage][2].
1. Click the **Usage** tab.
1. For a multi-organization, ensure the **Overall** tab is selected.

#### View and filter

Use the search facets at the left to filter the cost by **Products** or by **Sub-Orgs**. Use the **Over Time** tab to see how the cumulative day-over-day costs have changed.

#### Download

To download the data as a comma separated value file, click **Download as CSV**.

See [Get estimated cost across your account][3] to query estimated cost data through the API.

### Estimated Cost Summary (sub-organization)

As a sub-organization, you can view the costs for your organization only. This restriction allows for more distributed ownership and removes the need to grant broader Admin permissions to the parent organization.

{{< img src="account_management/plan_and_usage/sub-org-estimated-cost-summary.png" alt="Screenshot of the Estimated Cost Summary for a sub-organization, showing the overall month to date cost, a graph of cumulative cost breakdown, and a summary table." >}}

1. While logged in to the sub-organization, navigate to [Plan & Usage][2].
1. Click the **Usage** tab.
1. Ensure the **Overall** tab is selected.

#### View and filter

Use the search facets at the left to filter the cost by **Products**. Use the **Over Time** tab to see how the cumulative day-over-day costs have changed.

#### Download

To download the data as a comma separated value file, click **Download as CSV**.

See [Get estimated cost across your account][3] to query estimated cost data through the API.

## Cost chargebacks

Use the cost chargebacks to:
- View estimated month-to-date and historical costs for multi-organizations
- Attribute costs to each sub-organization

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

Products billed by the maximum count (high-water mark) of the lower 99 percent of usage for the month include infrastructure hosts and APM hosts. Products billed by the average over the month include custom metrics and Fargate tasks. For these two types of products, expect their costs to remain relatively stable throughout the month. However, they are still subject to cost changes if there is a significant spike in usage.

### Sum of usage billing

Products billed by the sum of usage throughout the month include indexed logs and ingested logs. For these types of products, expect their costs to increase or decrease based on changes to usage volume.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/
[2]: https://app.datadoghq.com/billing/usage
[3]: /api/latest/usage-metering/#get-estimated-cost-across-your-account
[4]: /api/latest/usage-metering/#get-historical-cost-across-your-account
[5]: /account_management/plan_and_usage/cost_details/#cost-summary
