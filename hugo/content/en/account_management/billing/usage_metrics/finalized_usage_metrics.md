---
title: Finalized Usage Metrics
further_reading:
    - link: "/account_management/billing/usage_metrics/"
      tag: "Documentation"
      text: "Usage Metrics"
    - link: "/account_management/billing/usage_metrics/estimated_usage_metrics/"
      tag: "Documentation"
      text: "Estimated Usage Metrics"
    - link: "/account_management/billing/usage_attribution/"
      tag: "Documentation"
      text: "Usage Attribution"
---

## Overview

Finalized usage metrics show hourly aggregated usage totals for Datadog products, with breakdowns by tag.

In most places where you query metrics, such as the Metrics Explorer, dashboards, notebooks, and monitors, you can change the source of your query from **Metrics** to **Usage**. The Usage source lists the products your organization uses and shows the usage for each one. You can filter and group usage by [Usage Attribution][4] tags and other product-relevant tags, the same way you do with other metrics.

### Finalized usage metrics in multi-org accounts

If your Datadog account has multiple organizations, finalized usage metrics show usage at every level of the account. Each organization sees its own usage and the usage of its child organizations, with a `child_org_name` tag that identifies each child organization. Organizations do not see the usage of sibling or parent organizations.

### Finalized usage metrics and your bill

Finalized usage metrics show the total processed usage for a product, which can differ from the billed usage on the [Plan & Usage][5] page. Your contract can bill usage based on different aggregations and time windows. Finalized usage metrics are accurate processed usage totals, and they are inputs to your bill.

## Requirement

To view and use finalized usage metrics, you need the Usage Read (`usage_read`) [permission][1].

## View finalized usage metrics

To view finalized usage metrics in a notebook, a dashboard, the [Metrics Explorer][3], or anywhere else you query metrics:

1. In the query editor, click **Metrics** and select **Usage**.

   {{< img src="account_management/billing/usage_metrics/select-usage-source.png" alt="Query source dropdown on a graph editor with Usage selected instead of Metrics." style="width:100%;" >}}

2. Select the product you want to view usage for.
3. (Optional) Filter or group by product-specific tags and Usage Attribution tags.

   {{< img src="account_management/billing/usage_metrics/filter-group-usage.png" alt="Usage query for Infra Hosts filtered by child_org_name:self and grouped by env, with an hourly sum rollup." style="width:100%;" >}}

## Create a usage monitor

Create a monitor on finalized usage metrics to get alerted when your usage differs from what you expect.

1. Go to [**Monitors > New Monitor**][2] and select **Usage**.

   {{< img src="account_management/billing/usage_metrics/new-monitor-usage-option.png" alt="Usage option on the New Monitor page." style="width:20%;" >}}

2. Select a usage monitor type: **Usage Threshold** or **Usage Change**.
3. Specify which usage to track. Select a product, then filter or group by tags.
4. Set the alert conditions.

   {{< img src="account_management/billing/usage_metrics/usage-monitor-types.png" alt="Usage monitor setup with the Usage Threshold and Usage Change monitor types, the usage query, and alert conditions." style="width:80%;" >}}

## Supported products

Finalized usage metrics for each product have either Same Day or Next Day latency.

### Same Day latency

Finalized usage metrics for the following products are available within 4-12 hours:

- Agent Observability
- AI Credits
- App Builder Published Apps
- Audit Trail
- Custom Events
- DBM Hosts
- Fargate APM
- Incident Management
- Ingested Logs
- Logs Forwarding
- Mobile App Testing and Monitoring
- NDM Wireless Access Points
- NetFlow Records
- Network Devices
- Parallel Testing Slots
- Product Analytics
- Synthetics API Test Runs
- Synthetics Browser Test Runs
- Test Optimization
- Workflow Executions

### Next Day latency

Finalized usage metrics for the following products are available within 16-24 hours:

- APM
- CI Pipeline Visibility
- Containers
- Custom Metrics
- Error Tracking
- Event Management
- Flex Logs Compute
- Flex Logs Stored
- Incident Response
- Indexed Logs
- Indexed Points
- Indexed Spans
- Infra Hosts
- Infra vCPU
- Ingest Points
- Ingested Points
- Ingested Spans
- Metric Names
- RUM
- Session Replay
- Static Code Analysis (SAST)
- Static Software Composition Analysis (SCA)

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/
[2]: https://app.datadoghq.com/monitors/create
[3]: /metrics/explorer/
[4]: /account_management/billing/usage_attribution/
[5]: /account_management/plan_and_usage/
