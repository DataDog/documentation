---
title: Cost and Usage Visibility
description: "Monitor cost and billable usage across all connected customer organizations from an Admin Org."
---

## Overview

A customer organization connects to the partner Admin Org automatically when its contract includes the partnership and is active. The connection is removed automatically if the contract expires. After connecting, a customer's usage and cost data becomes visible from the Admin Org, across all Datadog sites the customer uses.

## View cost and usage data

Go to {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Usage & Cost{{< /ui >}} in the Admin Org to view estimated, historical, and projected cost and billable usage data across all connected customer organizations, grouped and filtered by customer, product, or account. See [Plan and Usage Experience for Partners][1] for details.

The same data is available programmatically through the [Usage Metering API][2], which supports estimated cost, historical cost, projected cost, billable usage, usage summary, and hourly usage by product family.

**Note**: Standard GovCloud boundaries apply to this visibility. A non-GovCloud Admin Org cannot see cost and usage data for a GovCloud customer organization.

## Centralized Usage Metrics (Preview)

Usage and estimated usage metrics (`datadog.usage.*` and `datadog.estimated_usage.*`) from connected customer orgs roll up to the Admin Org as ordinary Datadog metrics, tagged with `child_org_name` for per-customer attribution. Use them like any other Datadog metric to build dashboards, monitors, and alerts across the book of business. See [Estimated Usage Metrics][3] for the metrics reference.

**Note**: This capability is in preview. Contact [partner-support@datadoghq.com][4] to join the preview.

## What's next

See [Requesting an Admin Org][5] to set one up, or [Trial Org Provisioning][6] to start provisioning trial organizations for prospective customers.

[1]: /account_management/plan_and_usage/partner_experience/
[2]: /api/latest/usage-metering/
[3]: /account_management/billing/usage_metrics/
[4]: mailto:partner-support@datadoghq.com
[5]: /partners/multi_tenant_billing/requesting-an-admin-org/
[6]: /partners/multi_tenant_billing/trial-org-provisioning/
