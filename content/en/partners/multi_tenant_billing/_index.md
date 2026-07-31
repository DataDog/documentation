---
title: Multi-Tenant Usage Metering and Billing
description: "Centrally manage usage, costs, and billing for end customers through an Admin Org."
cascade:
    algolia:
        subcategory: 'Multi-Tenant Usage Metering and Billing'
---

## Overview

As a Datadog resell or managed service provider (MSP) partner, use a **partner admin organization** (Admin Org) to view and monitor cost and usage across customer organizations, provision trial organizations, and view billing across the customer base. An Admin Org is separate from any customer organization and is owned by Datadog, but partners are invited with a Partner Role.

{{< img src="partners/multi_tenant_billing/admin_org_hierarchy.png" alt="An Admin Org connected to multiple customer organizations" style="width:100%;" >}}

A customer organization is connected to an Admin Org automatically when its Datadog contract includes the partnership and is active. After connecting, a customer's usage and cost data is visible from the Admin Org, across all Datadog sites (for example, AP1, EU1, US1, US3, US5), except US1-FED, which requires its own Admin Org for regulatory purposes.

See [Onboarding a New Customer][15] for how these pieces fit into the path from a registered deal to a live Trial Org.

## Getting started

To request an Admin Org, see [Requesting an Admin Org][1].

<div class="alert alert-info">An Admin Org grants read-only access to cost and usage data for connected customer organizations. It does not allow modifying customer billing or contracts, and personal or internal Datadog usage on the Admin Org is not supported.</div>

{{< whatsnext desc="To get started with an Admin Org, see the following documentation.">}}
  {{< nextlink href="/partners/multi_tenant_billing/customer-onboarding">}}<u>Onboarding a New Customer</u>: Take a prospective customer from a registered deal to a live Trial Org.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/requesting-an-admin-org">}}<u>Requesting an Admin Org</u>: Request an Admin Org for a partner account.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/trial-org-provisioning">}}<u>Trial Org Provisioning</u>: Provision trial organizations for prospective customers directly from an Admin Org.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/cost-and-usage-visibility">}}<u>Cost and Usage Visibility</u>: Monitor cost and billable usage across all connected customer organizations.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/centralized-usage-metrics">}}<u>Centralized Usage Metrics</u>: Monitor usage metrics across all connected customer organizations.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/troubleshooting">}}<u>Troubleshooting</u>: Resolve common issues with Admin Org and Trial Org provisioning.{{< /nextlink >}}
{{< /whatsnext >}}

## Use cases

Discover some ways an Admin Org can help:

| Use case | How an Admin Org helps |
|---|---|
| Monitor cost and usage across all customers in one place. | Use [Cost and Usage Visibility][2] to view estimated, historical, and projected cost and billable usage data. |
| Self-serve Trial Org creation for prospective customers. | Use [Trial Org Provisioning][3] to create Trial Orgs directly from an Admin Org. |
| Track usage metrics across the book of business. | Use [Centralized Usage Metrics][8] to roll customer usage metrics up into an Admin Org. |
| Let customers see their own estimated Datadog costs. (Preview) | Use [Customer Pricing Management](#customer-pricing-management-preview) to configure per-customer pricing. |
| Manage the book of business in one place. (Preview) | Use [Customer contracts management](#customer-contracts-management-preview) to track customers, contracts, invoices, and renewals. |

### Customer Pricing Management (Preview)

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
[7]: /partners/multi_tenant_billing/troubleshooting/
[8]: /partners/multi_tenant_billing/centralized-usage-metrics/
[15]: /partners/multi_tenant_billing/customer-onboarding/
