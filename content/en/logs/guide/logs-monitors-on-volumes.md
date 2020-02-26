---
title: Monitor your log usage
kind: guide
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
---

## Monitor indexed logs with fixed threshold

Get notified if the indexed log volumes in any scope (`service`, `availability-zone`, etc...) of your infrastructure are growing unexpectedly:

1. Go to the [Datadog Log Explorer][1] view
2. Build a [search query][2] that represents the volume to monitor (keep the query empty to monitor all the logs from that index)
3. Click on **Export to monitor**.
4. Define the rate you would like to set as *warning* or *error*.
5. Define an explicit notification: `The volume on this service just got too high. Define an additional exclusion filter or increase the sampling rate to get it back under control.`

{{< img src="logs/guide/example_notification.png" alt=" example notification"  style="width:70%;">}}

It is also possible to [setup a daily quota on indexes][3] to prevent indexing more than a given amount of logs per day. When doing this, Datadog recommends to setup the above monitor to alert when 80% of this quota is reached within the past 24h.

## Alert on unexpected spikes

### Activate recommended log usage metrics

Turn on the [recommended log usage metrics][4] to start tracking the number of ingested logs, ingested bytes, and indexed logs. Navigate to the [Generate Metrics][5] page to enable your log usage metrics (those metrics are free and kept for 15 months):

{{< img src="logs/processing/logs_to_metrics/recommended_usage_metrics.png" alt="Recommended Usage Metrics" responsive="true" style="width:80%;">}}

See below how to leverage them in [anomaly detection monitors][6].

**Note**: It is recommended to set the unit to `Byte` for the `logs.estimated.ingested_bytes` in the [metric summary page][7]:

{{< img src="logs/guide/logs_estimated_bytes_unit.png" alt="Metric unit definition"  style="width:70%;">}}

### Anomaly detection monitors

To define anomaly detection monitors to be alerted of any unexpected indexing log spikes:

1. [Create a new Anomaly monitor][8]
2. Select the `logs.estimated.ingested_events.count` metric
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

To import this dashboard, copy the [estimated usage dashboard JSON definition][9] and import it in a new Screenboard:

{{< img src="logs/guide/dashboard_import.png" alt="Log estimated usage dashboard"  style="width:30%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /logs/explorer/search
[3]: /logs/indexes/#set-daily-quota
[4]: /logs/logs_to_metrics/#recommended-usage-metrics
[5]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[6]: /monitors/monitor_types/anomaly/
[7]: https://app.datadoghq.com/metric/summary?filter=logs.estimated.ingested_bytes&metric=logs.estimated.ingested_bytes
[8]: https://app.datadoghq.com/monitors#create/anomaly
[9]: /resources/json/estimated_log_usage_dashboard_configuration.json
