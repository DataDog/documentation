---
title: Datadog Costs
is_beta: true
private: true
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

{{< callout url="https://www.datadoghq.com/product-preview/daily-datadog-costs/" btn_hidden="false" header="Join the Preview!">}}
Daily Datadog costs in Cloud Cost Management are in Preview. If you're interested in this feature, complete the form to request access.

<p>Only customers with a direct contract through Datadog or an External Marketplace drawdown contract are eligible for the Preview.</p>
{{< /callout >}}

## Overview

Daily Datadog costs give you visibility into daily Datadog spending across dashboards, notebooks, [cost monitors][2], and Cloud Cost Explorer, along with your entire organization's cloud provider and [SaaS costs][3].

You can view daily Datadog costs in [Cloud Cost Management][1], and access additional [Datadog costs capabilities][7] like [Cost Summary][9] and [Cost Chargebacks][10] on the [**Usage & Cost** page][4].

There is **no additional charge** for Datadog Costs, and it is available for both CCM and non-CCM customers.

## Permissions

To view costs in Cloud Cost Management, you must have the `cloud_cost_management_read` permission, which is enabled for users with the Datadog Read Only Role.

To see costs on the [**Usage & Cost** page][4], see the [Cost Details documentation][7].

## Visualize and break down costs

Costs in Cloud Cost Management may not match the estimated month-to-date (MTD) costs on the [**Plan and Usage** page][4] because Plan and Usage costs are cumulative and are prorated monthly. Only Cloud Cost Management provides a daily calculation.

Datadog cost data is available at the parent or sub-organization level. For sub-organizations, [Cost Summary (sub-organization)][5] also needs to be enabled.

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
