---
title: Customer Contracts
description: View your end customer contract portfolio from your Datadog admin organization, including recurring revenue, renewal dates, drawdown balances, invoices, and cost visibility status.
further_reading:
- link: "/account_management/plan_and_usage/partner_experience/customer_pricing/"
  tag: "Documentation"
  text: "Customer Pricing"
- link: "/account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/"
  tag: "Documentation"
  text: "Cost Visibility for Customers Who Purchase Through a Partner"
- link: "/account_management/plan_and_usage/partner_experience/"
  tag: "Documentation"
  text: "Plan and Usage Experience for Partners"
---

The [Customer Contracts][1] page gives Datadog partners a single view of their end customer contract portfolio, including recurring revenue, renewal dates, invoices, and cost visibility status. Summary tiles at the top of the page show how many contracts are up for renewal, how many customers need a cost visibility action, and the number and total amount of overdue invoices.

{{< img src="account_management/plan_and_usage/customer-contracts-overview.png" alt="Customer Contracts page in a Datadog admin organization showing summary tiles for renewals, cost visibility, and overdue invoices above a table of customers" >}}

## Prerequisites

To use Customer Contracts, you need:

- A Datadog admin organization. If you don't have one, contact your Datadog partner team.
- The Billing Read (`billing_read`) permission in your admin organization. Users with this permission can view all of the information on the page.

## Access Customer Contracts

1. Log in to your Datadog admin organization.
2. Navigate to {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Contracts{{< /ui >}}, or go directly to [Customer Contracts][1].

## Track renewals

The customer table shows the contract status for each customer, so you can see which contracts are approaching their renewal date and which have already passed it. Sort or filter by {{< ui >}}Contract Status{{< /ui >}} to bring the most urgent contracts to the top.

{{< img src="account_management/plan_and_usage/customer-contracts-renewals.png" alt="Customer table sorted by contract status, with badges showing contracts that expired 10 days ago and contracts expiring in 20 to 82 days" >}}

## Review contract details

Select a customer to open their contract detail panel. The {{< ui >}}Current Contract{{< /ui >}} tab shows:

- **Spend overview**: last month's contracted MRR (CMRR), last month's usage MRR (UMRR), and contract utilization.
- **Contract info**: influence status, contract start date, and contract end date.
- **Drawdown depletion**: for drawdown contracts, the total commitment, spend to date, remaining funds, projected total, projected overshoot, and projected depletion date compared to the contract end date.

{{< img src="account_management/plan_and_usage/customer-contracts-detail.png" alt="Contract detail panel for a customer showing the spend overview, drawdown depletion progress bar, and contract info sidebar" >}}

## Monitor invoices

The {{< ui >}}Invoices{{< /ui >}} tab of the contract detail panel lists every invoice for that customer with its issue date, due date, amount, and payment status. Open the PDF for any invoice from this tab. The overdue balance for each customer also appears in the main customer table, and the summary tiles at the top of the page show the count and total amount of overdue invoices across your portfolio.

{{< img src="account_management/plan_and_usage/customer-contracts-invoices.png" alt="Invoices tab of the contract detail panel listing invoices with issue date, due date, amount, payment status, and a link to view the PDF" >}}

## Check cost visibility status

The {{< ui >}}Cost Visibility{{< /ui >}} column shows where each customer stands:

- **Enabled**: the customer can see their Datadog costs in their own organization.
- **Not configured**: you haven't published rates for this customer yet.
- **Update needed**: the customer's contract changed, so their published rates need an update.

To publish or update rates, see [Customer Pricing][2]. To explain the feature to your customer, share [Cost Visibility for Customers Who Purchase Through a Partner][3].

{{< img src="account_management/plan_and_usage/customer-contracts-cost-visibility.png" alt="Customer table with the Cost Visibility column highlighted, showing customers marked as Enabled or Update needed" >}}

## Find account contacts

The {{< ui >}}Contacts{{< /ui >}} section of the contract detail panel lists the Datadog CSM, Datadog AE, and Partner Sales Manager for account-specific questions, along with the billing contact receiving the customer's invoices.

{{< img src="account_management/plan_and_usage/customer-contracts-contacts.png" alt="Contacts section of the contract detail panel listing the Datadog CSM, Datadog AE, billing contact, and Partner Sales Manager" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/customer-contracts
[2]: /account_management/plan_and_usage/partner_experience/customer_pricing/
[3]: /account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
