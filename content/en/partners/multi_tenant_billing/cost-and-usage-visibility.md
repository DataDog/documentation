---
title: Cost and Usage Visibility
description: "Monitor cost and billable usage across all connected customer organizations from an Admin Org."
---

## Overview

A customer organization connects to the partner Admin Org automatically when its contract includes the partnership and is active. The connection is removed automatically if the contract expires. After connecting, a customer's usage and cost data becomes visible from the Admin Org, across all Datadog sites the customer uses. A Trial Org's usage is not included here until its customer organization is connected this way; see [Trial Org Provisioning][4].

## View cost and usage data

Go to {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Usage & Cost{{< /ui >}} in the Admin Org to view estimated, historical, and projected cost and billable usage data across all connected customer organizations, grouped and filtered by customer, product, or account. See [Plan and Usage Experience for Partners][1] for details.

Cost and usage data is also available programmatically through the following [Usage Metering API][2] endpoints:

| API | What it's for | Note |
|---|---|---|
| [Get Estimated Cost Across Your Account][6] | Estimated cost for the current and previous month | Requires `include_connected_accounts=true` |
| [Get Historical Cost Across Your Account][7] | Historical cost for previous months | Requires `include_connected_accounts=true` |
| [Get Projected Cost Across Your Account][8] | Projected end-of-month cost for the current month | Requires `include_connected_accounts=true` |
| [Get Billable Usage Across Your Account][9] | Billable usage summaries | Requires `include_connected_accounts=true` |
| [Get Usage Across Your Account][10] | Usage summary data across the account | Requires `include_connected_accounts=true` |
| [Get Hourly Usage by Product Family][11] | Hourly usage broken down by product family | Requires `filter[include_connected_accounts]=true` |

**Note**: Standard GovCloud boundaries apply to this visibility. A non-GovCloud Admin Org cannot see cost and usage data for a GovCloud customer organization.

**Note**: Usage and cost views may include estimated or projected values during the billing period. Final invoices remain the authoritative source for billed amounts.

## What's next

See [Centralized Usage Metrics][3] for usage metrics rolled up across the book of business, or [Trial Org Provisioning][4] to start provisioning trial organizations for prospective customers.

[1]: /account_management/plan_and_usage/partner_experience/
[2]: /api/latest/usage-metering/
[3]: /partners/multi_tenant_billing/centralized-usage-metrics/
[4]: /partners/multi_tenant_billing/trial-org-provisioning/
[6]: /api/latest/usage-metering/#get-estimated-cost-across-your-account
[7]: /api/latest/usage-metering/#get-historical-cost-across-your-account
[8]: /api/latest/usage-metering/#get-projected-cost-across-your-account
[9]: /api/latest/usage-metering/#get-billable-usage-across-your-account
[10]: /api/latest/usage-metering/#get-usage-across-your-account
[11]: /api/latest/usage-metering/#get-hourly-usage-by-product-family
