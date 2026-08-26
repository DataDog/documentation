---
title: Customer Pricing Management (Preview)
description: "Configure per-customer pricing so customers can see their own estimated Datadog costs."
---

## Overview

Customer Pricing Management is in preview. It lets a partner configure per-customer pricing so a customer can see their own estimated Datadog costs, based on the partner's rates, directly within their org.

{{< img src="partners/multi_tenant_billing/customer_pricing.png" alt="Customer Pricing tab under Plan & Usage in an Admin Org" style="width:100%;" >}}

Partner-configured pricing powers the [Bill Overview][1] page in the customer's own org: an estimated month-to-date cost total, a daily cost breakdown, and the ability to break costs down by product and sub-org.

## Configure pricing for a customer

1. Log in to the Admin Org. Go to {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Pricing{{< /ui >}}.
2. Select a customer from the {{< ui >}}View{{< /ui >}} dropdown. Only connected customers with an eligible contract appear; see [Limitations](#limitations).
3. Click {{< ui >}}Edit{{< /ui >}} to review the customer's contracted products and their sales prices, and enter a price for each. Use {{< ui >}}% Price Adjustment{{< /ui >}} to adjust all rates by a percentage at once instead of entering them individually.
4. For products not on the contract, toggle {{< ui >}}Set Custom Price Adjustment{{< /ui >}} to apply a percentage markup or discount to the Datadog list price, and optionally toggle {{< ui >}}Cap ingest markup at Datadog list price{{< /ui >}} to cap ingest-product pricing. Leave both off to bill non-contracted products at the Datadog list price.
5. Click {{< ui >}}Save{{< /ui >}} to save a draft, visible only within the Admin Org. Click {{< ui >}}Publish{{< /ui >}} and confirm to make the draft prices effective on the customer's contract start date.

Pricing is a one-time setup per customer. Published pricing can be updated and republished at any time; updates can take up to 24 hours to become visible to the customer.

**Note**: The Billing Edit permission is required to configure and publish pricing. The Billing Read permission allows viewing saved or published rates, but not editing them.

## What the customer sees

After publishing, the customer sees their estimated month-to-date cost, a daily cost breakdown, and the ability to group by product or sub-org, on their own [Bill Overview][1] page.

**Note**: All costs shown to the customer are estimated. They typically match the partner's invoice, though minor differences of a few cents can occur.

## Limitations

This capability is in preview and does not support:

- Pricing per child org, for example for legacy MSP contracts, which have multiple customers under a single contract.
- Customers procuring through two channel partners at once.
- GovCloud customer organizations.
- Cloud marketplace customers (AWS, Azure, or GCP Marketplace) without a drawdown agreement.
- Projected costs, cost by tag, or Datadog costs in Cloud Cost Management.

On-demand costs for off-contract ingest SKUs can run up to approximately 3% higher than actual cost.

[1]: /account_management/plan_and_usage/bill_overview/
