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

### Cost and usage visibility

In your Admin Org, go to {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Usage & Cost{{< /ui >}} to view estimated, historical, and projected cost and billable usage data across all your connected customer organizations, with the option to group and filter by customer, product, and account. See [Plan and Usage Experience for Partners][2] for the full walkthrough of this view.

<!-- TODO: screenshot of the Plan & Usage > Usage & Cost tab in an Admin Org, showing cost/usage rolled up across customer orgs -->
{{< img src="partners/multi_tenant_billing/plan_and_usage_admin_org.png" alt="Plan and Usage view inside an Admin Org, showing cost and usage rolled up across customer organizations" style="width:100%;" >}}

### Usage Metering API

Access the same cost and usage data programmatically through the [Usage Metering API][3], which supports estimated cost, historical cost, projected cost, billable usage, usage summary, and hourly usage by product family across all connected customer orgs.

### Trial Org provisioning

Provision trial Datadog organizations for prospective customers directly from your Admin Org, without contacting Datadog for each trial. Go to {{< ui >}}Dashboards{{< /ui >}} and open the **Trial Org Provisioning** dashboard. See [Trial Org Provisioning][4] for the full walkthrough.

<!-- TODO: screenshot of the Trial Org Provisioning dashboard/form inside an Admin Org -->
{{< img src="partners/multi_tenant_billing/trial_org_provisioning.png" alt="Trial Org Provisioning dashboard inside an Admin Org" style="width:100%;" >}}

### Customer org linking

Your customer organizations link to your Admin Org automatically, based on your active contract with them, giving you a unified view across all your customers without any manual setup per customer.

### Usage metrics roll-up (Preview)

Usage and estimated usage metrics (`datadog.usage.*` and `datadog.estimated_usage.*`) from all connected customer orgs roll up to your Admin Org as ordinary Datadog metrics, tagged with `child_org_name` so you can attribute them to a specific customer. Use these metrics like any other Datadog metric to build dashboards, monitors, and alerts across your book of business. See [Estimated Usage Metrics][5] for the metrics reference.

<!-- TODO: screenshot of a dashboard querying rolled-up usage metrics filtered by child_org_name -->
{{< img src="partners/multi_tenant_billing/usage_metrics_rollup.png" alt="Dashboard querying usage metrics rolled up from customer orgs, filtered by child_org_name" style="width:100%;" >}}

### End-customer pricing management (Preview)

Configure margins per customer from {{< ui >}}Plan & Usage{{< /ui >}} > **Customer Pricing**, and let customers view their own Datadog costs directly within their org.

<!-- TODO: screenshot of the Customer Pricing tab under Plan & Usage in an Admin Org -->
{{< img src="partners/multi_tenant_billing/customer_pricing.png" alt="Customer Pricing tab under Plan & Usage in an Admin Org" style="width:100%;" >}}

### Customer contracts management (Preview)

A centralized view inside your Admin Org, under {{< ui >}}Plan & Usage{{< /ui >}} > **Customer Contracts**, for managing your book of business: customers, contracts, invoices, renewal alerts, and margin visibility.

<!-- TODO: screenshot of the Customer Contracts tab under Plan & Usage in an Admin Org -->
{{< img src="partners/multi_tenant_billing/customer_contracts.png" alt="Customer Contracts tab under Plan & Usage in an Admin Org" style="width:100%;" >}}

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
