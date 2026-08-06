---
title: Trial Org Provisioning
description: "Provision trial Datadog organizations for customers directly from an Admin Org."
---

## Overview

An Admin Org with the Trial Org Provisioner capability enabled can provision trial Datadog organizations for prospective customers directly. This speeds up running proof-of-concept engagements at scale. The underlying opportunity should still be registered with Datadog, so the deal is tracked and credited to the partner; see [Onboarding a New Customer][4] for the full process. Trial Orgs created this way run for 30 days, instead of the standard 14-day trial period.

{{< img src="partners/multi_tenant_billing/trial_org_provisioning.png" alt="Trial Org Provisioning page on the Admin Org homepage" style="width:100%;" >}}

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

3. Click {{< ui >}}Submit{{< /ui >}}.

The Trial Org is created immediately. The result panel shows the new org's name, org ID, and status message.

## Find the Trial Org ID

If the org ID from the result panel wasn't captured, retrieve it by logging in to the Trial Org and opening the browser's JavaScript console:

```javascript
JSON.parse(document.querySelector('#_current_user_json').value).org.id
```

A bookmarklet works too: create a bookmark named `Get Datadog Org ID` with the following as its URL, then click it from any page in the Trial Org to display the ID in a browser alert:

```javascript
javascript:(function() {var orgId = JSON.parse(document.querySelector('#_current_user_json').value).org.id; alert("Datadog Org ID is " + orgId);})();
```

## After provisioning

A Trial Org's usage is not visible from the Admin Org on its own. Share the new Trial Org's name and org ID with the partner account team so it can be associated with the opportunity registered on the [Partner Portal][2]. The customer organization becomes connected to the Admin Org, and its usage visible, once it has an active contract associated with the partnership.

## What's next

See [Cost and Usage Visibility][3] for how usage and cost data appears from the Admin Org after a customer organization is connected.

[1]: mailto:partner-support@datadoghq.com
[2]: https://partners.datadoghq.com
[3]: /partners/multi_tenant_billing/cost-and-usage-visibility/
[4]: /partners/multi_tenant_billing/customer-onboarding/
