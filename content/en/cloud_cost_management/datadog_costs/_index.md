---
title: Datadog Costs
kind: documentation
is_beta: true
private: true
disable_toc: false
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
- link: "/cloud_cost_management/aws"
  tag: "Documentation"
  text: "Gain insights into your AWS bill"
- link: "/cloud_cost_management/azure"
  tag: "Documentation"
  text: "Gain insights into your Azure bill"
- link: "/cloud_cost_management/google_cloud"
  tag: "Documentation"
  text: "Gain insights into your Google Cloud bill"
- link: "/cloud_cost_management/custom"
  tag: "Documentation"
  text: "Gain insights into your custom costs"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Cost Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< beta-callout url="#" btn_hidden="true" >}}
Daily Datadog costs in Cloud Cost Management are in private beta. To request access, complete the form.
{{< /beta-callout >}}

## Overview

Daily Datadog costs gives you visibility into daily Datadog spending across dashboards, notebooks, [cost monitors][2], and Cloud Cost Analytics, along with your entire organization's cloud provider and [SaaS costs][3]. You can enable daily Datadog costs in [Cloud Cost Management][1].

<div class="alert alert-info">Costs outside of <a href="https://app.datadoghq.com/billing/usage">Plan and Usage</a> are based on usage only and do not include historical credits and adjustments.</div>

## Permissions

<div class="alert alert-danger">Only existing Cloud Cost Management customers within the parent organization can access daily Datadog costs outside of <a href="https://app.datadoghq.com/billing/usage">Plan and Usage</a>.</div>

[Datadog costs][4] are available for users with [Datadog Admin][5] permissions or custom [Billing Read (`billing_read`) and Usage Read (`usage_read`)][6] permissions on the [**Usage & Cost** page][7].

## Visualize costs


{{< img src="cloud_cost/datadog_costs/dashboard.png" alt="Datadog costs as an option for the Cloud Cost data source in a dashboard" style="width:100%;" >}}

Datadog cost data is available in dashboards and notebooks under the **Cloud Costs** data source. You can create dashboards to monitor your daily costs, identify trends, and optimize resource usage. 

## Break down costs

You can use out-of-the-box tags to break down and allocate your costs. Use the following tags to filter and group your Datadog cost data.

| Tag Name | Tag Description |
|---|---|
| organization | The name of the master or sub-organization. |
| dimension_name / dimension_id | `dimension_name` is the name of the individual product being billed (for example, `Indexed Logs (15 Day Retention)`). </br></br> `dimension_id` is the snake case version of the product name which is optimized for programmatic use and easier search (for example, `logs_indexed_15day`). |
| datadog_product / product_name | `datadog_product` is the high-level grouping name for Datadog products (for example, `indexed_logs`). </br></br> `product_name` is the snake case version of the product grouping name which is optimized for programmatic use and easier search (for example, `indexed_logs`). |
| `<Usage Attribution tags>` | You can add up to three tag keys that are configured in [Usage Attribution][8] with the associated values (for example, `team` or `service`). |
| cost_type | The type of charge covered by this item (for example, committed or on-demand). |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/
[2]: /cloud_cost_management/monitors
[3]: /cloud_cost_management/saas_costs
[4]: https://app.datadoghq.com/billing/usage
[5]: /account_management/rbac/
[6]: /account_management/rbac/permissions
[7]: /account_management/plan_and_usage/cost_details/
[8]: /account_management/billing/usage_attribution/