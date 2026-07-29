---
title: Multi-Tenant Usage Metering and Billing
description: "Centrally manage usage, costs, and billing for your end customers through an Admin Org."
cascade:
    algolia:
        subcategory: 'Multi-Tenant Usage Metering and Billing'
---

## Overview

**Multi-Tenant Usage Metering and Billing** is Datadog's program for resell and managed service provider (MSP) partners that need to centrally manage, monitor, and bill their end customers' Datadog usage, without changing how those customers operate as independent Datadog organizations.

The foundation of the program is the **Admin Org**: a dedicated, partner-controlled Datadog organization that acts as the operational hub for usage visibility, trial provisioning, and pricing management across your customer base.

<!-- TODO: screenshot/diagram showing an Admin Org connected to multiple customer orgs (dotted-line Partner Connection) -->
{{< img src="partners/multi_tenant_billing/admin_org_hierarchy.png" alt="An Admin Org connected to multiple customer organizations" style="width:100%;" >}}

Your customer organizations link to your Admin Org automatically, based on your active Datadog contracts with them, giving you a unified view across all your customers regardless of which Datadog site each one runs on.

## What is an Admin Org?

An Admin Org is separate from any of your customers' organizations. It:

- Does not require a separate contract, and operates under the Partner Plan.
- Must be created in the US1 site, but provides usage and cost visibility across all Datadog sites your customers use (EU1, US3, US5, AP1).
- Grants **read-only** access to cost and usage data for your connected customer organizations. It does not let you modify customer billing or contracts.

<div class="alert alert-warning">
Use your Admin Org only to manage your customers' usage and costs. Personal or internal Datadog usage on the Admin Org is not supported.
</div>

See [Requesting an Admin Org][1] to get started.

## Capabilities

| Capability | Status | Where to find it | Description |
|---|---|---|---|
| Admin Org | Available | — | A dedicated partner org that provides centralized cost and usage visibility, and serves as the foundation for every other capability below. |
| Cost and usage visibility | Available | {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Usage & Cost{{< /ui >}} | Real-time and historical cost and billable usage data across all connected customer orgs. See [Plan and Usage Experience for Partners][2]. |
| Usage Metering API | Available | [Usage Metering API][3] | Programmatic access to usage and cost data across all connected customer orgs. |
| Trial Org Provisioning | Available | {{< ui >}}Dashboards{{< /ui >}} > **Trial Org Provisioning** | Provision trial Datadog organizations for prospective customers directly from your Admin Org. See [Trial Org Provisioning][4]. |
| Customer org linking | Available | — | Automatic linking of customer orgs to your Admin Org, based on your active contract with them. |
| Usage metrics roll-up | Preview | **Metrics** or **Usage** data source, filtered by `child_org_name` | Usage and estimated usage metrics (`datadog.usage.*`, `datadog.estimated_usage.*`) from all connected customer orgs roll up to your Admin Org, tagged by customer, so you can build dashboards, monitors, and alerts across your book of business. See [Estimated Usage Metrics][5]. |
| End-customer pricing management | Preview | {{< ui >}}Plan & Usage{{< /ui >}} > **Customer Pricing** | Configure margins per customer and let customers view their own Datadog costs directly within their org. |
| Customer contracts management | Preview | {{< ui >}}Plan & Usage{{< /ui >}} > **Customer Contracts** | A centralized view inside your Admin Org for managing your book of business: customers, contracts, invoices, renewal alerts, and margin visibility. |

<!-- TODO: screenshot of the Plan & Usage > Usage & Cost tab in an Admin Org, showing cost/usage rolled up across customer orgs -->
{{< img src="partners/multi_tenant_billing/plan_and_usage_admin_org.png" alt="Plan and Usage view inside an Admin Org" style="width:100%;" >}}

<div class="alert alert-info">
Preview capabilities are available to a limited set of partners while Datadog validates them. Contact <a href="mailto:partner-support@datadoghq.com">partner-support@datadoghq.com</a> if you're interested in joining a preview.
</div>

{{< whatsnext desc="To get started with an Admin Org, see the following documentation.">}}
  {{< nextlink href="/partners/multi_tenant_billing/requesting-an-admin-org">}}<u>Requesting an Admin Org</u>: Request an Admin Org for your partner account.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/trial-org-provisioning">}}<u>Trial Org Provisioning</u>: Provision trial organizations for prospective customers directly from your Admin Org.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/cost-and-usage-visibility">}}<u>Cost and Usage Visibility</u>: Monitor cost and billable usage across all your connected customer organizations.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/troubleshooting">}}<u>Troubleshooting</u>: Resolve common issues with Admin Org and Trial Org provisioning.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /partners/multi_tenant_billing/requesting-an-admin-org/
[2]: /account_management/plan_and_usage/partner_experience/
[3]: /api/latest/usage-metering/
[4]: /partners/multi_tenant_billing/trial-org-provisioning/
[5]: /account_management/billing/usage_metrics/
