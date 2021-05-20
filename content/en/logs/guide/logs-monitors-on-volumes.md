---
title: Monitor your log usage
kind: guide
further_reading:
- link: "/logs/processing/"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/processing/parsing/"
  tag: "Documentation"
  text: "Learn more about parsing"
---

The goal of this guide is to explain how to monitor your log usage thanks to estimated usage metrics. This guide goes through the following steps:

* Activation of the estimated usage metrics
* Alert on unexpected traffic spikes
* Alert when you are getting close to a budget threshold on your indexed logs
* Import the out of the box Log Management usage dashboard

## Alert on unexpected spikes

### Activate recommended log usage metrics

Turn on the [recommended log usage metrics][1] to start tracking the number of ingested logs, ingested bytes, and indexed logs. Navigate to the [Generate Metrics][2] page to enable your log usage metrics (those metrics are free and kept for 15 months):

{{< img src="logs/processing/logs_to_metrics/estimated_usage_metrics.png" alt="Recommended Usage Metrics" responsive="true" style="width:80%;">}}

See below how to leverage them in [anomaly detection monitors][3].

**Note**: It is recommended to set the unit to `Byte` for the `datadog.estimated_usage.logs.ingested_bytes` in the [metric summary page][4]:

{{< img src="logs/guide/logs_estimated_bytes_unit.png" alt="Metric unit definition"  style="width:70%;">}}

### Anomaly detection monitors

To define anomaly detection monitors to be alerted of any unexpected indexing log spikes:

1. [Create a new Anomaly monitor][5]
2. Select the `datadog.estimated_usage.logs.ingested_events` metric
3. Add `datadog_is_excluded:false` in the `from` section (to monitor indexed logs and not ingested ones)
4. Add the tag `service` and `datadog_index` in **group by** (to be notified if a specific service spikes or stops sending logs in any indexes)
5. Set the alert condition to match your use case (e.g., evaluation window, number of times outside the expected range, etc.)
6. Set the notification message with actionable instructions:

{{< img src="logs/guide/anomaly_usage_notification.png" alt=" example anomaly notification"  style="width:70%;">}}

Example of a notification with contextual links:

```text
An unexpected amount of logs has been indexed in index {{datadog_index.name}}

1. [Check Log patterns for this service](https://app.datadoghq.com/logs/patterns?from_ts=1582549794112&live=true&to_ts=1582550694112&query=service%3A{{service.name}})
2. [Add an exclusion filter on the noisy pattern](https://app.datadoghq.com/logs/pipelines/indexes)
```

## Estimated usage dashboard

From log usage metrics, an estimated usage Dashboard can also be built to monitor your Log Management usage across Datadog. Here is an example of such a Dashboard:

{{< img src="logs/guide/log_usage_dashboard.png" alt="Log estimated usage dashboard"  style="width:70%;">}}

**Reminder**: The metrics used in this dashboard are estimates and might differ from official billing numbers.

To import this dashboard, copy the [estimated usage dashboard JSON definition][6] and past it in a new Dashboard. Alternatively use the `Import Dashboard JSON` option in the cog menu in the upper right corner of a new dashboard.

## Monitor indexed logs with fixed threshold

Get notified if the indexed log volumes in any scope (`service`, `availability-zone`, etc...) of your infrastructure are growing unexpectedly:

1. Go to the [Datadog Log Explorer][7] view.
2. Build a [search query][8] that represents the volume to monitor. Keep the query empty to monitor all the logs from that index.
3. Click on **Export to monitor**.
4. Define the rate you would like to set as *warning* or *error*.
5. Define an explicit notification: `The volume on this service just got too high. Define an additional exclusion filter or increase the sampling rate to get it back under control.`

{{< img src="logs/guide/example_notification.png" alt=" example notification"  style="width:70%;">}}

### Alert on indexes reaching their daily quota

It is also possible to [set up a daily quota on indexes][9] to prevent indexing more than a given number of logs per day. When doing this, Datadog recommends that you set the above monitor to alert when 80% of this quota is reached within the past 24 hours.
An event is generated when the daily quota is reached. Set up a monitor to be notified when this happens:

{{< img src="logs/guide/daily_quota_monitor.png" alt="Daily quota Monitor"  style="width:70%;">}}

Here is an example of what the notification would look like in Slack:

{{< img src="logs/guide/daily_quota_notification.png" alt="Notification on daily quota"  style="width:70%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/logs_to_metrics/#recommended-usage-metrics
[2]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[3]: /monitors/monitor_types/anomaly/
[4]: https://app.datadoghq.com/metric/summary?filter=datadog.estimated_usage.logs.ingested_bytes&metric=datadog.estimated_usage.logs.ingested_bytes
[5]: https://app.datadoghq.com/monitors#create/anomaly
[6]: /resources/json/estimated_log_usage_dashboard_configuration.json
[7]: https://app.datadoghq.com/logs
[8]: /logs/explorer/search/
[9]: /logs/indexes/#set-daily-quota
