---
title: Customer Pricing Management
description: "Configure per-customer pricing so customers can see their own estimated Datadog costs."
---

## Overview

Customer Pricing Management lets a partner configure per-customer pricing so a customer can see their own estimated Datadog costs, based on the partner's rates, directly within their org. This capability is in preview.

Partner-configured pricing powers the [Bill Overview][1] page in the customer's own org: an estimated month-to-date cost total, a daily cost breakdown, and the ability to break costs down by product and sub-org.

## Configure pricing for a customer

1. Log in to the Admin Org. Go to {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Pricing{{< /ui >}}.
2. Select a customer from the dropdown. Only connected customers with an eligible contract appear; see [Limitations](#limitations).
3. Review the customer's contracted products and their sales prices in the table.
4. Click {{< ui >}}Edit{{< /ui >}} and enter prices for each contracted product, individually or in bulk.
5. Set a default pricing rule for products not on the contract: bill at list price, or apply a percentage markup to the sales price.
6. Click {{< ui >}}Save Draft{{< /ui >}}, review the entries, then click {{< ui >}}Publish{{< /ui >}}.

Pricing is a one-time setup per customer. Published pricing can be updated and republished at any time; changes take effect within 24 hours.

{{< img src="partners/multi_tenant_billing/customer_pricing.png" alt="Customer Pricing tab under Plan & Usage in an Admin Org" style="width:100%;" >}}

**Note**: The Billing Edit permission is required to configure and publish pricing. The Billing Read permission allows viewing saved or published rates, but not editing them.

## What the customer sees

After publishing, the customer sees their estimated month-to-date cost, a daily cost breakdown, and the ability to group by product or sub-org, on their own [Bill Overview][1] page.

**Note**: All costs shown to the customer are estimated. They typically match the partner's invoice, though minor differences of a few cents can occur.

## Limitations

This capability is in preview and does not support:

- Legacy MSP contracts (many customers under a single contract).
- Customers procuring through two channel partners at once.
- GovCloud customer organizations.
- Cloud marketplace customers (AWS, Azure, or GCP Marketplace) without a drawdown agreement.
- Projected costs, cost by tag, or Datadog costs in Cloud Cost Management.

On-demand costs for off-contract ingest SKUs can run up to approximately 3% higher than actual cost.

## What's next

Contact [partner-support@datadoghq.com][2] to join the preview.

[1]: /account_management/plan_and_usage/bill_overview/
[2]: mailto:partner-support@datadoghq.com
