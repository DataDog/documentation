---
title: Trial Org Provisioning
description: "Provision trial Datadog organizations for customers directly from an Admin Org."
---

## Overview

An Admin Org with the Trial Org Creator capability enabled can provision trial Datadog organizations for prospective customers, without contacting Datadog for each trial. This is useful for running proof-of-concept engagements at scale. Trial Orgs created this way run for 30 days, instead of the standard 14-day trial period.

If the {{< ui >}}Trial Org Provisioning{{< /ui >}} page isn't available in the Admin Org, contact [partner-support@datadoghq.com][1] to have this capability enabled.

## Provision a Trial Org

1. Log in to the Admin Org. The {{< ui >}}Trial Org Provisioning{{< /ui >}} page appears as the homepage. To return to it from elsewhere in the Admin Org, click the Datadog logo in the top left.
2. Complete the form:

    | Field | Required | Description |
    |---|---|---|
    | Region | Yes | `ap1`, `eu1`, `us1`, `us3`, or `us5`. Match the customer's cloud provider, geography, and compliance needs where possible; default to `us1` if there are no specific requirements. |
    | Trial Org Name | Yes | Must not exceed 32 characters. |
    | Customer Name | Yes | The end customer this Trial Org is for. |
    | Partner Notes | No | Any context worth sharing with the Datadog account team. |
    | Invitee(s) List | Yes | Comma-separated emails to invite to the new org with the Admin role. |

4. Click {{< ui >}}Submit{{< /ui >}}.

The Trial Org is created immediately. The result panel shows the new org's name, org ID, and status message, and the Partner Sales Manager (PSM) is notified automatically.

## After provisioning

Share the new Trial Org's name and org ID with the PSM so it can be associated with the opportunity registered on the [Partner Portal][2], so usage from the Trial Org is tracked against the deal.

## What's next

For an overview of how usage and cost data from Trial Orgs and other connected customer orgs roll up into the Admin Org, see [Cost and Usage Visibility][3].

[1]: mailto:partner-support@datadoghq.com
[2]: https://partners.datadoghq.com
[3]: /partners/multi_tenant_billing/cost-and-usage-visibility/
