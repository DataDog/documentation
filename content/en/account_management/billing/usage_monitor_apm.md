---
title: View and Alert on APM Usage
kind: documentation
---

Datadog has many pricing plans to fit your needs. For more information, see the [Pricing page][1].
Read APM documentation on [APM Billing][2] to understand how billing works for APM and Distributed Tracing.

## Usage page

If you are an admin of your account, you can view your account usage using the [Usage Page][3] which gets updated every 24 hours.

| Dimension          | Description                                                                                    |
|--------------------|------------------------------------------------------------------------------------------------|
| APM Hosts          | Shows the 99th percentile of all distinct APM hosts over all hours in the current month.       |
| APM Fargate Tasks  | Shows the average of distinct Fargate tasks over 5-minute time periods in the current month.   |
| Ingested Spans     | Shows the sum of Ingested Bytes from spans ingested in the current month.                      |
| Indexed Spans      | Shows the sum of Indexed Spans indexed in the current month.                                   |

Each APM Host and APM Fargate Tasks grants you an allotment of ingested and indexed volume: 
- Ingested spans: 150GB ingested spans per APM Host and 10GB ingested spans per APM Fargate task.
- Indexed spans: 1M indexed spans per APM Host and 65k spans indexed spans per APM Fargate task.

## Set alerts based on ingested/indexed volumes

### Set alerts on ingested bytes

To ensure that your Ingested Spans usage remains within the allocation that APM Hosts and APM Fargate Tasks grant you, set up monitors to get alerted when your monthly usage gets close to your allocation.

1. Create a [metric monitor][8]
2. Define your query by using the `datadog.estimated_usage.apm.ingested_bytes` metric.
3. Define the monitor's evaluation window to be `current month (MTD)`. This will ensure that the monitor is looking at the month-to-date usage. Read more about cumulative time windows in the [monitors][9] documentation.
4. Define the Alert threshold and an optional Warning threshold to get alerted when the ingested volume reached 80 or 90% of your allotment. 
5. Define the monitors name and notification policy to get alerted/alert your team when the ingested volumes are too high.

{{< img src="account_management/billing/monitor_usage_apm.png" alt="Monitor Usage APM" width="80%" >}}

To effectively reduce your ingested volumes, refer to this [guide][7] or to the ingestion mechanisms [documentation][10].

### Set alerts on indexed spans

Similarly, you can set alerts to ensure that your indexed spans budget remains within control. Create a metric monitor using the `datadog.estimated_usage.apm.indexed_spans` metric to get alerted when your month-to-date indexed spans volume goes over a defined threshold.

To reduce the number of indexed spans, check your retention filters configuration. Read more about retention filters in the [documentation][11].

[1]: https://www.datadoghq.com/pricing
[2]: /account_management/billing/apm_distributed_tracing/
[3]: https://app.datadoghq.com/account/usage
[4]: https://app.datadoghq.com/monitors#create/metric
[5]: /monitors/types/apm/?tab=traceanalytics#monitor-creation
[6]: https://app.datadoghq.com/apm/traces?viz=timeseries
[7]: /tracing/guide/trace_ingestion_volume_control/
[8]: https://app.datadoghq.com/monitors/create/metric
[9]: /monitors/configuration/?tab=thresholdalert#cumulative-time-windows
[10]: /tracing/trace_pipeline/ingestion_mechanisms/
[11]: /tracing/trace_pipeline/trace_retention/