---
title: Customer Pricing
description: Partners can set customer-specific pricing from the Customer Pricing page to enable cost visibility for their reseller customers in Datadog.
further_reading:
- link: "/account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/"
  tag: "Documentation"
  text: "Cost Visibility for Customers Who Purchase Through a Partner"
- link: "/account_management/plan_and_usage/partner_experience/"
  tag: "Documentation"
  text: "Plan and Usage Experience for Partners"
- link: "/account_management/plan_and_usage/bill_overview/"
  tag: "Documentation"
  text: "Bill Overview"
---

The [Customer Pricing][2] page lets partners set customer-specific rates that enable cost visibility for their reseller customers. Setting rates is a one-time setup per customer, and you can update pricing at any time. To learn about the customer experience or to find a resource to share with your customers, see [Cost Visibility for Customers Who Purchase Through a Partner][1].

## Prerequisites

To set customer pricing, you need:

- A Datadog admin organization. If you don't have one, contact your Datadog partner team for assistance.
- The Billing Edit (`billing_edit`) permission. Users with only Billing Read (`billing_read`) can view saved or published customer rates, but cannot edit them.

## Set up customer pricing

1. Log in to your Datadog admin organization.
2. Navigate to {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Pricing{{< /ui >}}.
   {{< img src="account_management/plan_and_usage/customer-pricing-nav.png" alt="Customer Pricing tab in the Plan & Usage section" >}}
3. Select a customer from the dropdown. Customers with an eligible resell contract are listed.
   {{< img src="account_management/plan_and_usage/customer-pricing-select-customer.png" alt="Customer selection dropdown listing reseller customers" >}}
4. Review the customer's contracted products and corresponding sales prices in the table.
5. Click {{< ui >}}Edit{{< /ui >}} and enter the customer's prices for each contracted product. You can edit prices in bulk, individually, or a combination of both.
   {{< img src="account_management/plan_and_usage/customer-pricing-edit-bulk.png" alt="Bulk price editing controls for a customer's contracted products" >}}
   {{< img src="account_management/plan_and_usage/customer-pricing-edit-individual.png" alt="Individual draft price fields for each contracted product" >}}
6. Set a default pricing rule for products that are not on the customer's contract. By default, on-demand rates for non-contracted products are set to the Datadog list price. You can instead apply a percentage markup to the sales price, and optionally cap the marked-up rates at the Datadog list price.
   {{< img src="account_management/plan_and_usage/customer-pricing-default-rule.png" alt="Default pricing rule configuration for non-contracted products" >}}
7. Click {{< ui >}}Save{{< /ui >}} to save a draft. Drafts are visible only within your Datadog admin organization. Review your entries, then click {{< ui >}}Publish{{< /ui >}}.

After you publish, cost visibility is enabled for that customer within 24 hours. The customer can then see their estimated and historical costs in their Datadog organization, based on their usage and the rates you provide. Published prices are effective as of the most recent change to the customer's contract, whether that is a new contract or a terms modification to an existing one.

## Update pricing

To change a customer's rates after publishing, return to the {{< ui >}}Customer Pricing{{< /ui >}} page, edit the values, and republish. Updates can take up to 24 hours to become visible to the customer.

## Limitations

To appear in the customer dropdown, a customer must have an eligible resell contract. Customer Pricing does not support the following contract types and organizations:

- **Legacy managed service provider (MSP) contracts**, where many customers are covered by a single contract.
- **Cloud Marketplace contracts without a drawdown agreement**, for customers purchasing through AWS, Google Cloud, or Azure Marketplace.
- **Contracts where the customer procures through two channel partners at the same time.** For example, Datadog to Partner 1 to Partner 2 to the customer.
- **GovCloud organizations.**

For the full list of limitations, including feature availability and cost accuracy caveats, see [Cost Visibility for Customers Who Purchase Through a Partner][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
[2]: https://app.datadoghq.com/billing/customer-pricing
