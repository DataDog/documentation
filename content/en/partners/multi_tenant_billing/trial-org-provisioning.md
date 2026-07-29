---
title: Trial Org Provisioning
description: "Provision trial Datadog organizations for your customers directly from your Admin Org."
---

## Overview

If your Admin Org has the Trial Org Creator capability enabled, provision trial Datadog organizations for prospective customers directly from your Admin Org, without contacting Datadog for each trial. This is useful for running proof-of-concept engagements at scale. Trial Orgs created this way run for 30 days, instead of the standard 14-day trial period.

If the {{< ui >}}Trial Org Provisioning{{< /ui >}} dashboard isn't available in your Admin Org, contact [partner-support@datadoghq.com][1] to have this capability enabled.

## Provision a Trial Org

1. Log in to your Admin Org.
2. Go to {{< ui >}}Dashboards{{< /ui >}} and open the **Trial Org Provisioning** dashboard.
3. Complete the form:

    | Field | Required | Description |
    |---|---|---|
    | Region | Yes | `ap1`, `eu1`, `us1`, `us3`, or `us5`. Match your customer's cloud provider, geography, and compliance needs where possible; default to `us1` if there are no specific requirements. |
    | Trial Org Name | Yes | Must not exceed 32 characters. |
    | Customer Name | Yes | The end customer this Trial Org is for. |
    | Partner Notes | No | Any context worth sharing with your Datadog account team. |
    | Invitee(s) List | Yes | Comma-separated emails to invite to the new org with the Admin role. |

4. Click {{< ui >}}Submit{{< /ui >}}.

The Trial Org is created immediately. The result panel shows the new org's name, org ID, and status message, and your Partner Sales Manager (PSM) is notified automatically.

## After provisioning

Share the new Trial Org's name and org ID with your PSM so it can be associated with the opportunity registered on the [Partner Portal][2]. This ensures usage from the Trial Org is tracked against the deal.

## What's next

For an overview of how usage and cost data from your Trial Orgs and other connected customer orgs roll up into your Admin Org, see [Cost and Usage Visibility][3].

[1]: mailto:partner-support@datadoghq.com
[2]: https://partners.datadoghq.com
[3]: /partners/multi_tenant_billing/cost-and-usage-visibility/
