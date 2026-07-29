---
title: Cost and Usage Visibility
description: "Monitor cost and billable usage across all your connected customer organizations from your Admin Org."
further_reading:
  - link: "/account_management/plan_and_usage/partner_experience/"
    tag: "Documentation"
    text: "Plan and Usage Experience for Partners"
  - link: "/account_management/billing/usage_metrics/"
    tag: "Documentation"
    text: "Estimated Usage Metrics"
  - link: "/api/latest/usage-metering/"
    tag: "Documentation"
    text: "Usage Metering API reference"
---

## Overview

Customer organizations link to your Admin Org automatically, based on their active contract with you, as long as the contract correctly references your partnership. A link is removed automatically if the underlying contract expires. After linking, a customer's usage and cost data becomes visible from your Admin Org, across all Datadog sites the customer uses.

## View cost and usage data

Go to {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Usage & Cost{{< /ui >}} in your Admin Org to view estimated, historical, and projected cost and billable usage data across all connected customer organizations, grouped and filtered by customer, product, or account. See [Plan and Usage Experience for Partners][1] for details.

The same data is available programmatically through the [Usage Metering API][2], which supports estimated cost, historical cost, projected cost, billable usage, usage summary, and hourly usage by product family.

## Monitor usage metrics across your book of business (Preview)

Usage and estimated usage metrics (`datadog.usage.*` and `datadog.estimated_usage.*`) from connected customer orgs roll up to your Admin Org as ordinary Datadog metrics, tagged with `child_org_name` for per-customer attribution. Use them like any other Datadog metric to build dashboards, monitors, and alerts across your book of business. See [Estimated Usage Metrics][3] for the metrics reference.

**Note**: This capability is in preview. Contact [partner-support@datadoghq.com][4] if you're interested in joining the preview.

## What's next

See [Requesting an Admin Org][5] if you haven't yet set one up, or [Trial Org Provisioning][6] to start provisioning trial organizations for prospective customers.

[1]: /account_management/plan_and_usage/partner_experience/
[2]: /api/latest/usage-metering/
[3]: /account_management/billing/usage_metrics/
[4]: mailto:partner-support@datadoghq.com
[5]: /partners/multi_tenant_billing/requesting-an-admin-org/
[6]: /partners/multi_tenant_billing/trial-org-provisioning/
