---
title: Datadog Costs
disable_toc: false
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
- link: "/cloud_cost_management/setup/aws"
  tag: "Documentation"
  text: "Gain insights into your AWS bill"
- link: "/cloud_cost_management/setup/azure"
  tag: "Documentation"
  text: "Gain insights into your Azure bill"
- link: "/cloud_cost_management/setup/google_cloud"
  tag: "Documentation"
  text: "Gain insights into your Google Cloud bill"
- link: "/cloud_cost_management/setup/saas_costs"
  tag: "Documentation"
  text: "Learn about SaaS Cost Integrations"
- link: "/cloud_cost_management/setup/custom"
  tag: "Documentation"
  text: "Gain insights into your custom costs"
- link: "https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/"
  tag: "Blog"
  text: "Quickly and comprehensively analyze the cloud and SaaS costs behind your services"
- link: "https://www.datadoghq.com/blog/datadog-costs/"
  tag: "Blog"
  text: "Understand and manage your Datadog spend with Datadog cost data in Cloud Cost Management"
---

## Overview

Daily Datadog costs give you visibility into daily Datadog spending across dashboards, notebooks, [cost monitors][2], and Cloud Cost Explorer, along with your entire organization's cloud provider and [SaaS costs][3].

You can view daily Datadog costs in [Cloud Cost Management][1](CCM), and access additional [Datadog costs capabilities][7] like [Cost Summary][9] and [Cost Chargebacks][10] on the [**Usage & Cost** page][4].

There is **no additional charge** for Datadog Costs, and it is available for both CCM and non-CCM customers with a direct contract through Datadog or an External Marketplace drawdown contract.

## Enabling Datadog Costs (opt-in)

### Required permissions

To enable Datadog Costs, you must have the following permissions:
- `billing_read`
- `usage_read`
- `cloud_cost_management_read` (included in the Datadog Admin role) permissions

CONFIRM ALL THREE NEEDED?

### Option 1: Plan & Usage page

To activate Datadog Costs from the Plan & Usage page:

1. Navigate to the [**Plan & Usage** page][4]. This takes you to the **Usage & Costs** tab.
1. At the top, you can see a modal to "View Datadog Costs in Cloud Cost Management". Click **Get Started**. WHAT HAPPENS?

   {{< img src="cloud_cost/datadog_costs/opt-in-modal.png" alt="Opt into Datadog Costs from a modal on the Plan & Usage page." style="width:100%;" >}}

1. If you have accidentally dismissed the modal, you need to clear your browser's local storage by doing the following:
   1. Go to your browser developer's tools.
   2. Go to the **Application** tab.
   3. Under **Storage > Local storage**, right click `https://app.datadoghq.com`, then click **Clear**.
      {{< img src="cloud_cost/datadog_costs/clear-local-storage.png" alt="Clear local storage in your browser developer tools" style="width:70%;" >}}
   4. Refresh the page. The modal should reappear at the top of the page.

After opting in to Datadog Costs, cost data starts populating in the CCM Explorer within 2-3 hours. For more information, see the [Cost Details documentation][7].

### Option 2: Cloud Cost Settings page:

To activate Datadog Costs from the Cloud Cost Settings page:

1. Navigate to the [**Cloud Cost Settings > Account**][11] page.
1. WHAT ARE NEXT STEPS?

After opting in to Datadog Costs, cost data starts populating in the CCM Explorer within 2-3 hours. For more information, see the [Cost Details documentation][7].

## Data availability to sub-organizations

Datadog cost data is available at the parent organization level. Sub-organization access is available in limited availability. To request sub-organization access, contact your account representative or [Datadog Support][12].

WHAT TO DO WITH THIS SENTENCE? For sub-organizations, [Cost Summary (sub-organization)][5] also needs to be enabled.

## Visualize and break down costs

Costs in Cloud Cost Management may not match the estimated month-to-date (MTD) costs on the [**Plan and Usage** page][4] because Plan and Usage costs are cumulative and are prorated monthly. Only Cloud Cost Management provides a daily calculation.

Datadog cost data is available for the past 15 months and can be used in dashboards and notebooks under the **Cloud Cost** data source. Create dashboards to monitor daily costs, identify trends, and optimize resource usage.

{{< img src="cloud_cost/datadog_costs/dashboard.png" alt="Datadog costs as an option for the Cloud Cost data source in a dashboard" style="width:100%;" >}}

You can use out-of-the-box tags to break down and allocate your Datadog cost data.

| Tag Name | Tag Description |
|---|---|
| organization | The name of the parent or sub-organization. |
| dimension_name / dimension | `dimension_name` is the name of the individual product being billed (for example, `Indexed Logs (15 Day Retention)`). </br></br> `dimension` is the snake case version of the product name which is optimized for programmatic use and easier search (for example, `logs_indexed_15day`). |
| product_name / datadog_product | `product_name` is the high-level grouping name for Datadog products (for example, `Logs`). </br></br> `datadog_product` is the snake case version of the product grouping name which is optimized for programmatic use and easier search (for example, `logs`). |
| `<Usage Attribution tags>` | You can add up to three tag keys, configured in [Usage Attribution][8], with their associated values (for example, `team` or `service`). |
| cost_type | The type of charge covered by this item (for example, `usage` or `adjustment`). |
| pricing_category | The specific type of charge covered by this item (for example, `committed` or `on-demand`). |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/
[2]: /cloud_cost_management/monitors
[3]: /cloud_cost_management/setup/saas_costs
[4]: https://app.datadoghq.com/billing/usage
[5]: /account_management/plan_and_usage/cost_details/#cost-summary-sub-organization
[6]: /account_management/rbac/
[7]: /account_management/plan_and_usage/cost_details/
[8]: /account_management/billing/usage_attribution/
[9]: /account_management/plan_and_usage/cost_details/#cost-summary
[10]: /account_management/plan_and_usage/cost_details/#cost-chargebacks
[11]: https://app.datadoghq.com/cost/settings/accounts
[12]: /help/