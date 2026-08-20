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

Customer Pricing lets partners set customer-specific rates that enable cost visibility for their reseller customers. Setting rates is a one-time setup per customer, and you can update pricing at any time. To learn about the customer experience or to find a resource to share with your customers, see [Cost Visibility for Customers Who Purchase Through a Partner][1].

## Prerequisites

To set customer pricing, you need:

- A partner admin organization. If you don't have one, contact your Datadog partner team contact to have one created.
- The Billing Edit permission. Users with only the Billing Read permission can view saved or published customer rates, but cannot edit them.

## Set up customer pricing

1. Log in to your Datadog admin organization.
2. Navigate to **Plan & Usage > [Customer Pricing][2]**.
   {{< img src="account_management/plan_and_usage/customer-pricing-nav.png" alt="Customer Pricing tab in the Plan & Usage section" >}}
3. Select a customer from the dropdown. All of your reseller customers are listed.
   {{< img src="account_management/plan_and_usage/customer-pricing-select-customer.png" alt="Customer selection dropdown listing reseller customers" >}}
4. Review the customer's contracted products and corresponding sales prices in the table.
5. Click {{< ui >}}Edit{{< /ui >}} and enter the customer's prices for each contracted product. You can edit prices in bulk, individually, or a combination of both.
   {{< img src="account_management/plan_and_usage/customer-pricing-edit-bulk.png" alt="Bulk price editing controls for a customer's contracted products" >}}
   {{< img src="account_management/plan_and_usage/customer-pricing-edit-individual.png" alt="Individual price editing for a single contracted product" >}}
6. Set a default pricing rule for products that are not on the customer's contract. For example, bill at list price or apply a percentage markup to the sales price.
   {{< img src="account_management/plan_and_usage/customer-pricing-default-rule.png" alt="Default pricing rule configuration for non-contracted products" >}}
7. Click {{< ui >}}Save Draft{{< /ui >}}, review your entries, and then click {{< ui >}}Publish{{< /ui >}}.
   {{< img src="account_management/plan_and_usage/customer-pricing-save-confirmation.png" alt="Confirmation message shown after saving a draft" >}}
   {{< img src="account_management/plan_and_usage/customer-pricing-publish-modal.png" alt="Confirmation modal shown when publishing customer pricing" >}}
   {{< img src="account_management/plan_and_usage/customer-pricing-publish-complete.png" alt="Confirmation message shown after publishing completes" >}}

After you publish, cost visibility is enabled for that customer within 24 hours. The customer can then see their estimated costs in their Datadog organization, based on their usage and the rates you provide.

Products that are not on the customer's contract are billed using the default pricing rule you configured for that customer.

## Update pricing

To change a customer's rates after publishing, return to the {{< ui >}}Customer Pricing{{< /ui >}} page, edit the values, and republish.

## Limitations

Legacy managed service provider (MSP) contracts (many customers under a single contract) are not supported. Customers under a legacy MSP contract do not appear in the customer dropdown. For the full list of limitations, see [Cost Visibility for Customers Who Purchase Through a Partner][1].

## Get help

Contact your Datadog partner team contact for assistance.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
[2]: https://app.datadoghq.com/billing/customer-pricing
