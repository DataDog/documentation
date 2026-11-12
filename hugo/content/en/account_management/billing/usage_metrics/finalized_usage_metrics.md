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

Finalized usage metrics are those used to view hour-by-hour aggregated usage totals for various products at Datadog with useful breakdowns.

Most places you'd use metrics (explorer, dashboards, notebooks, monitors), you can choose to change the source of your timeseries from metrics to usage. This enables you to select from a list of the products in use by your organization and view the usage for that product. Using the usage source allows you to filter and group your usage by Usage Attribution and other product-relevant tags, just like other kinds of metrics.

## Getting Started

**Note:** Users must have `usage_read` permission to use and view finalized usage metrics.

1. Determine where you want to view your usage data.

   Anywhere that metrics can be used, you can view your usage data: notebooks, dashboards, metrics explorer, etc.

2. Select the Usage source for your display.

   Click **Metrics** where the query is and select **Usage** instead, to select it as the source for your data.

   <!-- TODO: Add the screenshot from the source doc for step 2 (switching the query source from Metrics to Usage). -->

3. View your usage.

   Select the product you'd like to view usage for, and filter or group by product-specific and Usage Attribution tags

   <!-- TODO: Add the screenshot from the source doc for step 3 (selecting a product and filtering or grouping by tags). -->

## Monitors

Using your finalized usage metrics, you can also create custom monitors to ensure your usage stays consistent with your expectations. To create a usage monitor, select the Usage option on the New Monitor page:

<!-- TODO: Add the screenshot from the source doc of the Usage option on the New Monitor page. -->

Then you can create Usage Threshold monitors or Usage Change monitors, as depicted below:

<!-- TODO: Add the screenshot from the source doc of the Usage Threshold and Usage Change monitor options. -->

## Supported Products

Expected latency buckets:

- Same Day: 4-12hr latency
- Next Day: 16-24hr latency

| Product | Expected latency |
| --- | --- |
| Agent Observability | Same Day |
| AI Credits | Same Day |
| APM | Next Day |
| App Builder Published Apps | Same Day |
| Audit Trail | Same Day |
| CI Pipeline Visibility | Next Day |
| Containers | Next Day |
| Custom Events | Same Day |
| Custom Metrics | Next Day |
| DBM Hosts | Same Day |
| Incident Response | Next Day |
| Error Tracking | Next Day |
| Event Management | Next Day |
| Fargate APM | Same Day |
| Flex Logs Compute | Next Day |
| Flex Logs Stored | Next Day |
| Incident Management | Same Day |
| Indexed Logs | Next Day |
| Indexed Points | Next Day |
| Indexed Spans | Next Day |
| Infra Hosts | Next Day |
| Infra vCPU | Next Day |
| Ingest Points | Next Day |
| Ingested Logs | Same Day |
| Ingested Points | Next Day |
| Ingested Spans | Next Day |
| Logs Forwarding | Same Day |
| Metric Names | Next Day |
| Mobile App Testing and Monitoring | Same Day |
| NDM Wireless Access Points | Same Day |
| NetFlow Records | Same Day |
| Network Devices | Same Day |
| Parallel Testing Slots | Same Day |
| Product Analytics | Same Day |
| RUM | Next Day |
| Session Replay | Next Day |
| Static Code Analysis (SAST) | Next Day |
| Static Software Composition Analysis (SCA) | Next Day |
| Synthetics API Test Runs | Same Day |
| Synthetics Browser Test Runs | Same Day |
| Test Optimization | Same Day |
| Workflow Executions | Same Day |

## Frequently Asked Questions

**How do finalized usage metrics get rolled up across multiple orgs?**

If your Datadog account uses multiple organizations, the finalized usage metrics are built to show usage at every level of the account. Organizations only see their own usage and the usage of any children organizations, with a `child_org_name` tag added for further detail. They will not see the usage of sibling or parent organizations.

**How do finalized usage metrics compare to the Plan & Usage page?**

Finalized usage metrics show the total processed usage for a product and may not directly reflect the billed usage in the Plan & Usage page. This is because usage may be billed based on different aggregations and windows depending on the terms for your contract. Finalized usage metrics are still accurate processed usage totals and are inputs used in determining your bill.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
