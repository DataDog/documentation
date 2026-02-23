---
title: Datadog Costs
disable_toc: false
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
- link: "https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/"
  tag: "Blog"
  text: "Quickly and comprehensively analyze the cloud and SaaS costs behind your services"
- link: "https://www.datadoghq.com/blog/datadog-costs/"
  tag: "Blog"
  text: "Understand and manage your Datadog spend with Datadog cost data in Cloud Cost Management"
---

## Overview

Daily Datadog costs give you visibility into daily Datadog spending across dashboards, notebooks, [cost monitors][1], Cloud Cost Explorer, [reports][12], and [budgets][11], along with your entire organization's cloud provider and [SaaS costs][2].

You can view daily Datadog costs in [Cloud Cost Management][3](CCM), and access additional Datadog cost capabilities like [Cost Summary][5] and [Cost Chargebacks][6] on the [**Plan & Usage** page][7].

There is **no additional charge** for Datadog Costs, and it is available for both CCM and non-CCM customers with a direct contract through Datadog or an External Marketplace drawdown contract.

## Required permissions

Datadog Costs requires different permissions depending on whether you're enabling the feature or viewing the data:

### To enable Datadog Costs (opt-in)
To activate Datadog Costs for your organization, you must have the following permissions:

| Permission | Description | Available Roles |
|------------|-------------|-----------------|
| `billing_read` | Read access to billing information. | • Datadog Admin |
| `usage_read` | Read access to usage data. | • Datadog Admin |
| `cloud_cost_management_read` | Read access to Cloud Cost Management. | • Datadog Admin<br>• Datadog Read Only (default) |

### To view Datadog Costs in Cloud Cost Management
After Datadog Costs is enabled, users need the following permission to view the data:

| Permission | Description | Available Roles |
|------------|-------------|-----------------|
| `cloud_cost_management_read` | Read access to Cloud Cost Management. **Required to view Datadog Costs data in Cloud Cost Management.** | • Datadog Admin<br>• Datadog Read Only (default) |

## Enabling Datadog Costs

To activate Datadog Costs, navigate to the [**Plan & Usage** page][7] and click **Get Started** in the modal to "View Datadog Costs in Cloud Cost Management". Alternatively, you can contact your account representative or [Datadog Support][8].

After opting in to Datadog Costs, a confirmation message appears and cost data starts populating in the CCM Explorer within 2-3 hours.

## Data availability to sub-organizations

Daily Datadog cost data is available to sub-organizations with the [Sub Organization Cost Summary][10] feature enabled. To request access, contact your account representative or [Datadog Support][8].

## Visualize and break down costs

Costs in Cloud Cost Management may not match the estimated month-to-date (MTD) costs on the [**Plan & Usage** page][7] because Plan & Usage costs are cumulative and prorated monthly. Only Cloud Cost Management provides daily cost calculations.

Datadog cost data has an expected data delay of 48 hours and is available for the past 15 months. Prior month Datadog charges are finalized around the 16th of each month. Before costs are finalized, the **Usage Charges Only: Enabled** toggle represents estimated usage-based charges only. When charges are finalized, the **Usage Charges Only: Disabled** toggle also includes any adjustment records. These adjustments are applied to the prior month and reflect the finalized cost amounts.

Cost data can be used in dashboards and notebooks under the **Cloud Cost** data source. Create dashboards to monitor daily costs, identify trends, and optimize resource usage.

{{< img src="cloud_cost/datadog_costs/dashboard.png" alt="Datadog costs as an option for the Cloud Cost data source in a dashboard" style="width:100%;" >}}

You can use out-of-the-box tags to break down and allocate your Datadog cost data.

| Tag Name | Tag Description |
|---|---|
| organization | The name of the parent or sub-organization. |
| dimension_name / dimension | `dimension_name` is the name of the individual product being billed (for example, `Indexed Logs (15 Day Retention)`). </br></br> `dimension` is the snake case version of the product name which is optimized for programmatic use and easier search (for example, `logs_indexed_15day`). |
| product_name / datadog_product | `product_name` is the high-level grouping name for Datadog products (for example, `Logs`). </br></br> `datadog_product` is the snake case version of the product grouping name which is optimized for programmatic use and easier search (for example, `logs`). |
| `<Usage Attribution tags>` | You can add up to three tag keys, configured in [Usage Attribution][9], with their associated values (for example, `team` or `service`). |
| cost_type | The type of charge covered by this item (for example, `usage` or `adjustment`). |
| pricing_category | The specific type of charge covered by this item (for example, `committed` or `on-demand`). |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/cost_changes/monitors
[2]: /cloud_cost_management/setup/saas_costs
[3]: /cloud_cost_management/
[4]: /account_management/plan_and_usage/cost_details/
[5]: /account_management/plan_and_usage/cost_details/#cost-summary
[6]: /account_management/plan_and_usage/cost_details/#cost-chargebacks
[7]: https://app.datadoghq.com/billing/usage
[8]: /help/
[9]: /account_management/billing/usage_attribution/
[10]: /account_management/plan_and_usage/cost_details/#cost-summary-sub-organization
[11]: /cloud_cost_management/planning/budgets?tab=basic
[12]: /cloud_cost_management/reporting
