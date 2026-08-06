---
title: Cost and Usage Visibility
description: "Monitor cost and billable usage across all connected customer organizations from an Admin Org."
---

## Overview

A customer organization connects to the Partner Admin Org (Admin Org) automatically when its contract includes the partnership and is active. After connecting, a customer's usage and cost data becomes visible from the Admin Org, across all Datadog sites the customer uses. The connection is removed automatically 30 days after the contract expires.

**Note**: A Trial Org's usage is not included here until its customer organization is connected this way; see [Trial Org Provisioning][4].

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

## Related pages

- [Centralized Usage Metrics][3]: usage metrics rolled up from every connected customer org.
- [Trial Org Provisioning][4]: provision trial organizations for prospective customers.

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
