---
title: End Customer Cost Visibility
description: Reseller customers can view estimated Datadog costs in Bill Overview using the rates their partner provides, with a daily breakdown and product- and sub-org-level detail.
further_reading:
- link: "/account_management/plan_and_usage/bill_overview/"
  tag: "Documentation"
  text: "Bill Overview"
- link: "/account_management/plan_and_usage/"
  tag: "Documentation"
  text: "Plan & Usage"
---

If you purchase Datadog through a partner, End Customer Cost Visibility gives you greater visibility into your Datadog costs by enabling the [Bill Overview][1] page in your Datadog organization. Bill Overview provides a single view of your estimated month-to-date costs, a daily cost breakdown, and the ability to group costs by product and sub-organization, so you can understand your Datadog spending at any point during the billing period.

{{< img src="account_management/plan_and_usage/bill-overview-main-light.png" alt="Bill Overview page showing the cost summary header and Daily Cost Breakdown stacked bar chart" >}}

## Key features

- **Estimated month-to-date cost**: See a running total of your Datadog costs at any point during the month, without waiting for your invoice.
- **Daily cost breakdown**: View a day-by-day bar chart of your costs to spot usage changes as they happen.
- **Group by product**: Break down costs by product category and billing dimension, such as infrastructure hosts, indexed logs, or custom metrics.
- **Group by sub-organization**: If you use multiple Datadog sub-organizations, filter and view costs for each one individually.

## How it works

Your partner shares your rates with Datadog. Datadog uses those rates and your usage data to calculate your Datadog costs and populate the cost visibility features.

## Limitations

The following limitations apply to End Customer Cost Visibility.

### Feature availability

- **Advanced cost visibility features are not supported.** This includes projected costs, Cost by Tag, and [Datadog Costs][2] in Cloud Cost Management.
- **Cloud Marketplace customers without a drawdown contract are not supported.** If you purchase Datadog through AWS, Azure, or Google Cloud Marketplace and do not have a drawdown agreement, cost visibility is not available. This is a platform-wide limitation that also affects some direct customers.
- **Legacy managed service provider (MSP) contracts (many customers under a single contract) are not supported.**
- **Customers procuring through two channel partners at the same time are not supported.** If your Datadog products flow through two resellers (for example, Datadog to Partner 1 to Partner 2 to you), cost visibility is not available.
- **GovCloud organizations are not supported.**

### Estimated cost accuracy

- **Tiered on-demand pricing is not supported.** Cost data is not shown for the active Error Tracking and LLM Observability SKUs.
- **Percent-based products are not supported.** Cost data is not shown for the Audit Trail or Premier Support SKUs.
- **All costs are estimated.** In most cases, the estimated costs in Bill Overview match your partner invoice. Minor differences (a few cents) can occur because of nuances in billing calculations. If you notice significant discrepancies, contact your partner.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/plan_and_usage/bill_overview/
[2]: /cloud_cost_management/datadog_costs/
