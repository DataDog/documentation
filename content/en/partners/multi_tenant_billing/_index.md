---
title: Multi-Tenant Usage Metering and Billing
description: "Centrally manage usage, costs, and billing for end customers through an Admin Org."
cascade:
    algolia:
        subcategory: 'Multi-Tenant Usage Metering and Billing'
---

## Overview

As a Datadog Solution Provider, you can use a **Partner Admin Organization** (Admin Org) to view and monitor cost and usage across customer organizations, provision trial organizations, and view billing across the customer base. An Admin Org is separate from any customer organization and is owned by Datadog; partners are invited to it with a Partner Role.

<div class="alert alert-info">By default, an Admin Org grants read-only access to cost and usage data for connected customer organizations, and personal or internal Datadog usage on the Admin Org is not supported. The Preview capabilities below add supported pricing and contract-management workflows.</div>

A customer organization is connected to an Admin Org automatically when its Datadog contract includes the partnership and is active. After connecting, a customer's usage and cost data is visible from the Admin Org, across all Datadog sites (for example, AP1, EU1, US1, US3, US5), except US1-FED, which requires its own Admin Org for regulatory purposes.

{{< img src="partners/multi_tenant_billing/admin_org_hierarchy.png" alt="An Admin Org connected to multiple customer organizations" style="width:100%;" >}}

See [Onboarding a New Customer][15] for how these pieces fit into the path from a registered deal to a connected customer organization.

## Requesting an Admin Org

Before requesting an Admin Org, the partner must:

- Be registered with Datadog on the [Datadog Partner Portal][1].
- Have signed the agreement to transact with Datadog as a Solution Provider.
- Be approved as a Datadog partner.

Partners not yet registered can [Register Now][17] on the Datadog Partner Portal.

{{< img src="partners/multi_tenant_billing/partner_portal_registration.png" alt="Datadog Partner Portal registration page" style="width:100%;" >}}

Registered partners can request an Admin Org by contacting [partner-support@datadoghq.com][16]. Include in the request whether the partner also needs the Trial Org Provisioner capability enabled, for self-serve trial organization creation.

## Getting started

{{< whatsnext desc="To get started with an Admin Org, see the following documentation.">}}
  {{< nextlink href="/partners/multi_tenant_billing/customer-onboarding">}}<u>Onboarding a New Customer</u>: Take a prospective customer from a registered deal to a connected customer organization.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/trial-org-provisioning">}}<u>Trial Org Provisioning</u>: Provision trial organizations for prospective customers directly from an Admin Org.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/troubleshooting">}}<u>Troubleshooting</u>: Resolve common issues with Admin Org and Trial Org provisioning.{{< /nextlink >}}
{{< /whatsnext >}}

## Use cases

Here are some ways an Admin Org can help:

| Use case | Capability |
|---|---|
| Monitor cost and usage across all customers in one place. | [Cost and Usage Visibility][2]: view estimated, historical, and projected cost and billable usage data. |
| Self-serve Trial Org creation for prospective customers. | [Trial Org Provisioning][3]: create Trial Orgs directly from an Admin Org. |
| Track usage metrics across the book of business. | [Centralized Usage Metrics][8]: roll customer usage metrics up into an Admin Org. |
| Let customers see their estimated costs based on the partner's pricing. (Preview) | [Customer Pricing Management][9]: configure per-customer pricing. |
| Manage the book of business in one place. (Preview) | [Customer Contracts Management][10]: track customers, contracts, invoices, and renewals. |

<div class="alert alert-info">Preview capabilities are available to a limited set of partners while Datadog validates them. Contact <a href="mailto:partner-support@datadoghq.com">partner-support@datadoghq.com</a> to join a preview.</div>

## Troubleshooting

For help with common Admin Org and Trial Org issues, see [Troubleshooting][7].

[1]: https://partners.datadoghq.com
[2]: /partners/multi_tenant_billing/cost-and-usage-visibility/
[3]: /partners/multi_tenant_billing/trial-org-provisioning/
[7]: /partners/multi_tenant_billing/troubleshooting/
[8]: /partners/multi_tenant_billing/centralized-usage-metrics/
[15]: /partners/multi_tenant_billing/customer-onboarding/
[16]: mailto:partner-support@datadoghq.com
[17]: https://partners.datadoghq.com/s/login/
[9]: /partners/multi_tenant_billing/customer-pricing-management/
[10]: /partners/multi_tenant_billing/customer-contracts-management/
