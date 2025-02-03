---
title: Cloud Cost Monitor
description: "Monitor cost changes, thresholds, forecasts, and anomalies in your cloud costs."
further_reading:
- link: "https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/status/"
  tag: "Documentation"
  text: "Consult your monitor status"
- link: "https://www.datadoghq.com/blog/ccm-cost-monitors/"
  tag: "Blog"
  text: "React quickly to cost overruns with Cost Monitors for Datadog Cloud Cost Management"
- link: "https://www.datadoghq.com/blog/google-cloud-cost-management/"
  tag: "Blog"
  text: "Empower engineers to take ownership of Google Cloud costs with Datadog"
---

{{< callout url="https://www.datadoghq.com/private-beta/cost-anomaly-detection/" btn_hidden="false" header="In Preview">}}
Cost anomaly detection is in Preview. To request access, complete the form.
{{< /callout >}}

## Overview
Get proactive notifications on cost changes to help mitigate unexpected cloud spend. Cloud Cost Monitors help you identify cost changes quickly so you can investigate the cause. You can configure your alerts to catch unexpected changes.

In order to configure Cloud Cost monitors, you need to have [Cloud Cost Management][1] set up. After it's set up, you can configure monitors to alert when costs increase or decrease.

Cloud Cost monitors are evaluated with a 48 hour delayed evaluation window, because Cloud Cost data is not guaranteed to be available until 48 hours after usage. For example, a monitor with a lookback of 7 days being evaluated on January 15 examines cost data from January 6 through January 13.

## Monitor creation

To create a Cloud Cost monitor in Datadog, use the main navigation: [**Monitors** --> **New Monitor** --> **Cloud Cost**][4].

You can also create Cloud Cost monitors from the [Cloud Cost Explorer][2]. Click **More...** next to the Options button and select **Create monitor**.

{{< img src="/monitors/monitor_types/cloud_cost/explorer.png" alt="Option to create a monitor from the Cloud Cost Explorer page" style="width:100%;" >}}

Optionally, click the **+ Create Monitor** button in the cost report side panel.

{{< img src="/monitors/monitor_types/cloud_cost/sidepanel.png" alt="The Create Monitor button on a cost report side panel in the Cloud Cost Explorer" style="width:100%;" >}}

## Select a cost monitor type

You can select from the following monitor types.

{{< tabs >}}
{{% tab "Changes" %}}

| Cost Type | Description | Usage Examples |
| ---  | ----------- | ----------- |
| Cost Changes  | Compare costs on a daily, weekly or monthly basis | Alert when the difference between today's cost and the week before is over 5%. |

{{% /tab %}}
{{% tab "Threshold" %}}
| Cost Type | Description | Usage Examples |
| ---  | ----------- | ----------- |
| Cost Threshold | Set alerts on total costs exceeding a threshold in a day | Set alerts when today's total cost exceeds $10,000. |

{{% /tab %}}
{{% tab "Forecast" %}}
| Cost Type | Description | Usage Examples |
| ---  | ----------- | ----------- |
| Cost Forecast | Set alerts based on forecasted costs exceeding a threshold by the end of the current month. | Alert daily if the forecasted cost for this month is projected to exceed $500. |

{{% /tab %}}
{{% tab "Anomalies" %}}

| Cost Type | Description | Usage Examples |
| ---  | ----------- | ----------- |
| Cost Anomalies | Detect anomalies by comparing current costs to historical data, using a defined lookback period. Incomplete days are excluded from analysis to ensure accuracy. Anomaly monitors require at least 1 month of cloud cost data to evaluate since historical data is required to train the algorithm. | Alert if 3 days from the past 30 days show significant cost anomalies compared to historical data. |

{{% /tab %}}
{{< /tabs >}}

## Specify which costs to track

Any cost type or metric reporting to Datadog is available for monitors. You can use custom metrics or observability metrics alongside a cost metric to monitor unit economics.

| Step                              | Required | Default              | Example             |
|-----------------------------------|----------|----------------------|---------------------|
| Select the cost metric                 | Yes      | `aws.cost.amortized` | `azure.cost.actual` |
| Define the `filter by`            | No       | Everything           | `aws_product:s3`    |
| Group by                          | No       | Everything           | `aws_availability_zone` |
| Add observability metric | No      | `system.cpu.user` | `aws.s3.all_requests` |

Use the editor to define the cost types or exports.

{{< img src="monitors/monitor_types/cloud_cost/ccm_metrics_source.png" alt="Cloud Cost and Metrics data source options for specifying which costs to track" style="width:100%;" >}}

For more information, see the [Cloud Cost Management documentation][1].

## Set alert conditions

{{< tabs >}}
{{% tab "Changes" %}}

If you are using the **Cost Changes** monitor type, you can trigger an alert when the cost `increases` or `decreases` more than the defined threshold. The threshold can be set to either a **Percentage Change** or set to **Dollar Amount**.

If you are using the **Percentage Change**, you can filter out changes that are below a certain dollar threshold. For example, the monitor alerts when there is a cost change above 5% for any change that is above $500.

{{% /tab %}}
{{% tab "Threshold" %}}

If you are using the **Cost Threshold** monitor type, you can trigger an alert when the cloud cost is `above`, `below`, `above or equal`, or `below or equal to` a threshold.

{{% /tab %}}
{{% tab "Forecast" %}}

If you are using the **Cost Forecast** monitor type, you can trigger an alert when the cloud cost is `above`, `below`, `above or equal`, `below or equal to`, `equal to`, or `not equal to` a threshold.

{{% /tab %}}
{{% tab "Anomalies" %}}

If you are using the **Cost Anomalies** monitor type, you can trigger an alert if the observed cost deviates from historical data by being `above`, `below`, or `above or below` a threshold for any provider and service.

The `agile` [anomaly algorithm][101] is used with two bounds and monthly seasonality.

[101]: /dashboards/functions/algorithms/
{{% /tab %}}
{{< /tabs >}}

<br>

## Configure notifications and automations

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][3] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/
[2]: https://app.datadoghq.com/cost/explorer
[3]: /monitors/notify/
[4]: https://app.datadoghq.com/monitors/create/cost
