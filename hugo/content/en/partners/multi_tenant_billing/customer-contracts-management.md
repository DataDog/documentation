---
title: Customer Contracts
description: "Manage the partner's book of business - customers, contracts, and invoices - from an Admin Org."
---

<div class="alert alert-info">
Customer Contracts is in Preview.
</div>

## Overview

Customer Contracts gives a partner a single place to manage customers, contracts, and invoices for their book of business with Datadog. Partners can look up this information directly, instead of relying on the partner account team for routine lookups.

Go to {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Contracts{{< /ui >}} in the Admin Org; see [Requesting an Admin Org][2] if one isn't set up yet.

{{< img src="partners/multi_tenant_billing/customer_contracts.png" alt="Customer Contracts tab under Plan & Usage in an Admin Org, listing customers and contracts." style="width:100%;" >}}

**Note**: The Billing Read permission is required to view Customer Contracts.

## What's included

- All customers connected to the Admin Org, and their current and historical contracts, with renewal reminders for contracts coming up for renewal or already past their renewal date.
- Contract MRR (CMRR), Usage MRR (UMRR), influence status, and contract start and end dates, along with rates per product and order form PDFs.
- For drawdown contracts, the remaining balance, projected overshoot, and projected depletion date compared to the contract end date.
- For MSP contracts, which customers belong to each contract.
- Discount and margin visibility per contract.
- Whether Customer Pricing is enabled for each customer, not yet configured, or needs an update after a contract change.
- Key contacts per customer: The Datadog CSM, the Datadog AE, the partner account team, and the billing contact receiving invoices.

{{< img src="partners/multi_tenant_billing/customer_contracts_detail.png" alt="Customer Contracts detail panel showing spend overview, drawdown depletion, contract info, and contacts for a customer." style="width:100%;" >}}

Invoices are listed per customer with issue and due dates, amount, and payment status, and roll up into overdue counts and totals on the main Customer Contracts page:

{{< img src="partners/multi_tenant_billing/customer_contracts_invoices.png" alt="Customer Contracts invoices tab listing invoice numbers, dates, amounts, and status for a customer." style="width:100%;" >}}

## Related docs

- [Requesting an Admin Org][2]

[2]: /partners/multi_tenant_billing/#requesting-an-admin-org
