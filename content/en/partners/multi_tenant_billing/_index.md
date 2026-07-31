---
title: Multi-Tenant Usage Metering and Billing
description: "Centrally manage usage, costs, and billing for end customers through an Admin Org."
cascade:
    algolia:
        subcategory: 'Multi-Tenant Usage Metering and Billing'
---

## Overview

As a Datadog resell or managed service provider (MSP) partner, use an **Admin Org** to centrally manage cost and usage visibility, provision trial organizations, and monitor billing across the customer base. An Admin Org is separate from any customer organization, does not require its own contract, and operates under the Partner Plan.

{{< img src="partners/multi_tenant_billing/admin_org_hierarchy.png" alt="An Admin Org connected to multiple customer organizations" style="width:100%;" >}}

A customer organization connects to an Admin Org automatically when its Datadog contract includes the partnership and is active. After connecting, a customer's usage and cost data is visible from the Admin Org, across all Datadog sites the customer uses (EU1, US1, US3, US5, AP1). An Admin Org itself must be created in the US1 site.

## Getting started

To request an Admin Org, see [Requesting an Admin Org][1].

<div class="alert alert-info">An Admin Org grants read-only access to cost and usage data for connected customer organizations. It does not allow modifying customer billing or contracts, and personal or internal Datadog usage on the Admin Org is not supported.</div>

{{< whatsnext desc="To get started with an Admin Org, see the following documentation.">}}
  {{< nextlink href="/partners/multi_tenant_billing/requesting-an-admin-org">}}<u>Requesting an Admin Org</u>: Request an Admin Org for a partner account.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/trial-org-provisioning">}}<u>Trial Org Provisioning</u>: Provision trial organizations for prospective customers directly from an Admin Org.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/cost-and-usage-visibility">}}<u>Cost and Usage Visibility</u>: Monitor cost and billable usage across all connected customer organizations.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/troubleshooting">}}<u>Troubleshooting</u>: Resolve common issues with Admin Org and Trial Org provisioning.{{< /nextlink >}}
{{< /whatsnext >}}

## Use cases

Discover some ways an Admin Org can help:

| Use case | How an Admin Org helps |
|---|---|
| Monitor cost and usage across all customers in one place. | Use [Cost and Usage Visibility][2] to view estimated, historical, and projected cost and billable usage data. |
| Provision Trial Orgs for prospective customers without contacting Datadog. | Use [Trial Org Provisioning][3] to create Trial Orgs directly from an Admin Org. |
| Track usage metrics across the book of business. (Preview) | Use [Centralized Usage Metrics](#centralized-usage-metrics-preview) to roll customer usage metrics up into an Admin Org. |
| Let customers see their own estimated Datadog costs. (Preview) | Use [End-customer pricing management](#end-customer-pricing-management-preview) to configure per-customer pricing. |
| Manage the book of business in one place. (Preview) | Use [Customer contracts management](#customer-contracts-management-preview) to track customers, contracts, invoices, and renewals. |

### Cost and Usage Visibility

Go to {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Usage & Cost{{< /ui >}} in the Admin Org to view estimated, historical, and projected cost and billable usage data across all connected customer organizations, grouped and filtered by customer, product, or account. See [Plan and Usage Experience for Partners][4] for details.

{{< img src="partners/multi_tenant_billing/plan_and_usage_admin_org.png" alt="Plan and Usage view inside an Admin Org, showing cost and usage rolled up across customer organizations" style="width:100%;" >}}

The same data is available programmatically through the [Usage Metering API][5], which supports estimated cost, historical cost, projected cost, billable usage, usage summary, and hourly usage by product family.

**Note**: Standard GovCloud boundaries apply to this visibility. A non-GovCloud Admin Org cannot see cost and usage data for a GovCloud customer organization.

### Trial Org Provisioning

An Admin Org with the Trial Org Creator capability enabled can provision trial Datadog organizations for prospective customers directly from {{< ui >}}Dashboards{{< /ui >}} > {{< ui >}}Trial Org Provisioning{{< /ui >}}, without contacting Datadog for each trial. See [Trial Org Provisioning][3] for the full walkthrough.

{{< img src="partners/multi_tenant_billing/trial_org_provisioning.png" alt="Trial Org Provisioning dashboard inside an Admin Org" style="width:100%;" >}}

### Centralized Usage Metrics (Preview)

Usage and estimated usage metrics (`datadog.usage.*` and `datadog.estimated_usage.*`) from connected customer orgs roll up to the Admin Org as ordinary Datadog metrics, tagged with `child_org_name` for per-customer attribution. Use them like any other Datadog metric to build dashboards, monitors, and alerts across the book of business. See [Estimated Usage Metrics][6] for the metrics reference.

{{< img src="partners/multi_tenant_billing/usage_metrics_rollup.png" alt="Dashboard querying usage metrics rolled up from customer orgs, filtered by child_org_name" style="width:100%;" >}}

### End-customer pricing management (Preview)

Configure per-customer pricing from {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Pricing{{< /ui >}} so customers can see their own estimated Datadog costs directly within their org. Pricing is a one-time setup per customer that can be updated at any time; changes take effect within 24 hours of publishing.

{{< img src="partners/multi_tenant_billing/customer_pricing.png" alt="Customer Pricing tab under Plan & Usage in an Admin Org" style="width:100%;" >}}

### Customer contracts management (Preview)

Review and manage the book of business from {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Contracts{{< /ui >}}: customers, contracts, invoices, renewal alerts, and margin visibility, in one place inside the Admin Org.

{{< img src="partners/multi_tenant_billing/customer_contracts.png" alt="Customer Contracts tab under Plan & Usage in an Admin Org" style="width:100%;" >}}

<div class="alert alert-info">Preview capabilities are available to a limited set of partners while Datadog validates them. Contact <a href="mailto:partner-support@datadoghq.com">partner-support@datadoghq.com</a> to join a preview.</div>

## Troubleshooting

For help with common Admin Org and Trial Org issues, see [Troubleshooting][7].

[1]: /partners/multi_tenant_billing/requesting-an-admin-org/
[2]: /partners/multi_tenant_billing/cost-and-usage-visibility/
[3]: /partners/multi_tenant_billing/trial-org-provisioning/
[4]: /account_management/plan_and_usage/partner_experience/
[5]: /api/latest/usage-metering/
[6]: /account_management/billing/usage_metrics/
[7]: /partners/multi_tenant_billing/troubleshooting/
