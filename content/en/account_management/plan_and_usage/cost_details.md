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
  Estimated Cost Summary and Cost Chargebacks are in beta. To request access, contact Support.
{{< /callout >}} 

## Overview

Estimated Cost Summary and Cost Chargebacks help you understand your estimated month-to-date and historical Datadog costs. You can break down your costs by sub-organization and by product.

### Permissions

To view the the Estimated Cost Summary and Cost Chargebacks data, you must be a Datadog Admin user.

Alternately, roles with Billing Read (`billing_read`) and Usage Read (`usage_read`) [permissions][1] can view the Estimated Cost Summary and Cost Chargebacks data.

## Cost summary

Use the cost summary to:
- View estimated month to date costs
- View cost trends within the month

The cost summary changes according to whether you use Datadog as a single organization or a multi-organization. You can view estimated costs for the parent organization and each child organization. 

### Estimated Cost Summary (parent organization)

1. While logged in to the parent organization, navigate to [Plan & Usage][2].
1. Click the **Usage** tab.
1. For a multi-organization, ensure the **Overall** tab is selected.

#### Eligibility

Customers with contracts that support estimated costs automatically see the feature. For questions about your eligibility, contact your account representative or reach out to [support][3].

#### View and filter

Use the search facets at the left to filter the cost by **Products** or by **Sub-Orgs**.

#### Download

To download the data as a comma separated value file, click **Download as CSV**.

See [Get estimated cost across your account][4] to download estimated cost data through the API.

### Estimated Cost Summary (sub-organization)

1. While logged in to the child organization, navigate to [Plan & Usage][2].
1. Click the **Usage** tab.
1. Ensure the **Overall** tab is selected.

#### Eligibility

This feature is in beta. To enable it for your organization, contact [support][3].

#### View and filter

Use the search facets at the left to filter the cost by **Products**.

#### Download

To download the data as a comma separated value file, click **Download as CSV**.

See [Get estimated cost across your account][4] to download estimated cost data through the API.

## Cost chargebacks

### Historical cost chargebacks

From a parent organization, view finalized historical costs aggregated by product and sub-organization.

1. While logged in to the parent organization, navigate to [Plan & Usage][2].
1. Select the **Usage** tab.
1. Click **Individual Organizations**.
1. Ensure the **Billable** and **Cost** toggles is selected.
1. Use the date selector to view a month for which billing has completed.

**Note**: Data is available after month close, which is approximately 16 days after the end of the month.

### Estimated cost chargebacks

From a parent organization, view estimated costs aggregated by product and sub-organization.

Estimated cost data is available for the current month. If historical cost data is not available for the prior month, estimated cost data also displays for the prior month.

1. While logged in to the parent organization, navigate to [Plan & Usage][2].
1. Select the **Usage** tab.
1. Click **Individual Organizations**.
1. Ensure the **Billable** and **Cost** toggles is selected.
1. Ensure the date selector shows the current or prior month.

### Eligibility

Customers with contracts that support Cost Chargebacks automatically see the feature. For questions about your eligibility, contact [support][3].

### Download

- To download historical or estimated cost chargeback data as a comma separated value file, click **Download as CSV**.
- See [Get historical cost across your account][5] to download historical cost chargeback data through the API.
- See [Get estimated cost across your account][4] to download estimated cost chargeback data through the API.

## How billing aggregations affect cost changes

Your Datadog bill varies throughout the month. The type of aggregation used to bill each product determines whether its cost remains stable or increases as the month progresses.

Many products bill by the maximum count of the lower 99 percent of usage for the month. Other products bill by average usage. For these two types of products, the cost remains relatively stable throughout the month.

Other products bill according to your cumulative usage throughout the month. Those types of products see their costs increase steadily as the month progresses.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/
[2]: https://app.datadoghq.com/billing/usage
[3]: /help/
[4]: /api/latest/usage-metering/#get-estimated-cost-across-your-account
[5]: api/latest/usage-metering/#get-historical-cost-across-your-account
