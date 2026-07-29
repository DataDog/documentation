---
title: Multi-Tenant Usage Metering and Billing
description: "Centrally manage usage, costs, and billing for your end customers through an Admin Org."
cascade:
    algolia:
        subcategory: 'Multi-Tenant Usage Metering and Billing'
---

## Overview

As a Datadog resell or managed service provider (MSP) partner, use an **Admin Org** to centrally manage cost and usage visibility, provision trial organizations, and monitor billing across your customer base. An Admin Org is separate from any customer organization, does not require its own contract, and operates under the Partner Plan. It grants read-only access to cost and usage data for connected customer organizations; it cannot modify customer billing or contracts.

{{< img src="partners/multi_tenant_billing/admin_org_hierarchy.png" alt="An Admin Org connected to multiple customer organizations" style="width:100%;" >}}

Customer organizations link to an Admin Org automatically, based on the active Datadog contract between the partner and the customer. After linking, a customer's usage and cost data is visible from the Admin Org, across all Datadog sites the customer uses (EU1, US1, US3, US5, AP1). An Admin Org itself must be created in the US1 site.

## Get started

{{< whatsnext desc="To get started with an Admin Org, see the following documentation.">}}
  {{< nextlink href="/partners/multi_tenant_billing/requesting-an-admin-org">}}<u>Requesting an Admin Org</u>: Request an Admin Org for your partner account.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/trial-org-provisioning">}}<u>Trial Org Provisioning</u>: Provision trial organizations for prospective customers directly from your Admin Org.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/cost-and-usage-visibility">}}<u>Cost and Usage Visibility</u>: Monitor cost and billable usage across all your connected customer organizations.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/troubleshooting">}}<u>Troubleshooting</u>: Resolve common issues with Admin Org and Trial Org provisioning.{{< /nextlink >}}
{{< /whatsnext >}}

## View cost and usage across your customers

Go to {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Usage & Cost{{< /ui >}} in your Admin Org to view estimated, historical, and projected cost and billable usage data across all connected customer organizations, grouped and filtered by customer, product, or account. See [Plan and Usage Experience for Partners][1] for details.

{{< img src="partners/multi_tenant_billing/plan_and_usage_admin_org.png" alt="Plan and Usage view inside an Admin Org, showing cost and usage rolled up across customer organizations" style="width:100%;" >}}

The same data is available programmatically through the [Usage Metering API][2], which supports estimated cost, historical cost, projected cost, billable usage, usage summary, and hourly usage by product family.

## Provision trial orgs for your customers

If your Admin Org has the Trial Org Creator capability enabled, provision trial Datadog organizations for prospective customers directly from {{< ui >}}Dashboards{{< /ui >}} > **Trial Org Provisioning**, without contacting Datadog for each trial. See [Trial Org Provisioning][3] for the full walkthrough.

{{< img src="partners/multi_tenant_billing/trial_org_provisioning.png" alt="Trial Org Provisioning dashboard inside an Admin Org" style="width:100%;" >}}

## Centralized Usage Metrics (Preview)

Usage and estimated usage metrics (`datadog.usage.*` and `datadog.estimated_usage.*`) from connected customer orgs roll up to your Admin Org as ordinary Datadog metrics, tagged with `child_org_name` for per-customer attribution. Use them like any other Datadog metric to build dashboards, monitors, and alerts across your book of business. See [Estimated Usage Metrics][4] for the metrics reference.

{{< img src="partners/multi_tenant_billing/usage_metrics_rollup.png" alt="Dashboard querying usage metrics rolled up from customer orgs, filtered by child_org_name" style="width:100%;" >}}

## Manage end-customer pricing (Preview)

Configure per-customer pricing from {{< ui >}}Plan & Usage{{< /ui >}} > **Customer Pricing** so customers can see their own estimated Datadog costs directly within their org. Pricing is a one-time setup per customer that can be updated at any time; changes take effect within 24 hours of publishing.

{{< img src="partners/multi_tenant_billing/customer_pricing.png" alt="Customer Pricing tab under Plan & Usage in an Admin Org" style="width:100%;" >}}

## Manage customer contracts (Preview)

Review and manage your book of business from {{< ui >}}Plan & Usage{{< /ui >}} > **Customer Contracts**: customers, contracts, invoices, renewal alerts, and margin visibility, in one place inside your Admin Org.

{{< img src="partners/multi_tenant_billing/customer_contracts.png" alt="Customer Contracts tab under Plan & Usage in an Admin Org" style="width:100%;" >}}

**Note**: Preview capabilities are available to a limited set of partners while Datadog validates them. Contact [partner-support@datadoghq.com][5] if you're interested in joining a preview.

[1]: /account_management/plan_and_usage/partner_experience/
[2]: /api/latest/usage-metering/
[3]: /partners/multi_tenant_billing/trial-org-provisioning/
[4]: /account_management/billing/usage_metrics/
[5]: mailto:partner-support@datadoghq.com
