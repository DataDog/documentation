---
title: How to monitor non-static thresholds
kind: Guide
further_reading:
- link: "/monitors/types/composite/"
  tag: "Documentation"
  text: "Composite Monitor"
---

## Overview

A typical metric monitor triggers an alert if a single metric goes above a specific threshold number. For example, setting off an alert if your disk usage goes above 80%. While this works for many use cases, what do you do if the threshold is not an absolute number but a variable?

Watchdog powered monitors (namely [anomaly][1] and [outlier][2]) can help in such situations where you don't have an explicit definition of when your metric is off-track. However, a better alternative is deterministic alerting conditions. Watchdog monitors are useful when you don't know what to monitor, as they look at APM performance, infrastructure metrics, and logs. However, it requires two weeks of data for any new source of metrics, logs, or other data, to establish a baseline of expected behavior.

If you know what you want to monitor, it's better to create your own monitor so it can alert you faster and more accurately.

This guide covers a series of the most common deterministic use-cases:  
  - [Alert on a metric that goes off track on top of seasonal variations](#seasonal-threshold) 
  - [Alert on spikes when you don't know the baseline ahead of time](#spike-threshold)
  - [Alert based on how the metric compares with the value of another reference metric](#reference-threshold)

## Seasonal threshold

### Context
You are the team lead in charge of the website of an e-commerce website. The traffic on your website varies night and day, week day and weekend, so that there is no absolute number to quantify what "unexpectedly low: means. However, the traffic follows a predictable pattern, and you can consider "10% lower than the same time a week ago" as a robust indicator of what you want to capture. You want to: 
  - Receive alerts on unexpectedly low traffic on your home page 
  - Capture more localized incidents like the ones affecting public internet providers 
  - Cover for unknown failure scenarios


### Monitor

1. [Create a metric monitor][3]. 
1. Add a query, which automatically adds a formula as well.
1. To the second query add a [`week_before` timeshift][4] for it to represent the values of the previous day, and add this formula to calculate the ratio: `a / b`

This formula calculates the variation between today and the same day the previous week (to compare mondays with mondays and so on).
{{< tabs >}}
{{% tab "UI" %}}
{{< img src="monitors/guide/non_static_thresholds/seasonal_threshold.png" alt="Configuration to add week_before timeshift to metric query and set formula a/b" style="width:100%;" >}}
{{% /tab %}}

{{% tab "API" %}}
```
{
	"name": "[Seasonal threshold] Amount of connection",
	"type": "query alert",
	"query": "sum(last_10m):sum:zookeeper.connections{env:prod} by {datacenter} / week_before(sum:zookeeper.connections{env:prod} by {datacenter}) <= 0.9",
	"message": "The amount of connection is lower than yesterday by {{value}} !",
	"tags": [],
	"options": {
		"thresholds": {
			"critical": 0.9
		},
		"notify_audit": false,
		"require_full_window": false,
		"notify_no_data": false,
		"renotify_interval": 0,
		"include_tags": true,
		"new_group_delay": 60
	}
}

```
{{% /tab %}}
{{< /tabs >}}

## Spike threshold

### Context

You are in charge of managing the cost of the log management in your company. 
You want to be alerted when there is a sudden increase in the billing for a specific team, therefore you want to capture a spike of usage.

### Monitor
1. [Create a metric monitor][3] on estimated log usage metric.
1. Take the sum of the last 5 minutes compared to the average of the last hour. For more information, see the [Log usage metrics][5] documentation.
1. To capture Log spikes, use the following queries: 
    - **Query A** represents the last 5 minutes of the metric we want to be aware of.
    - **Query B** represents the average value of the same metric over the past hour thanks to the [moving rollup][6] which takes the data points of the last 4 hours (to have a large amount of data points) and calculates the average.

When the value of Query A is much bigger than the value of Query B, it's a sign of a substantial and sudden increase in usage which you can capture with a simple ratio between A and B.

{{< img src="monitors/guide/non_static_thresholds/seasonal_threshold.png" alt="Spike threshold config with two log usage metrics" style="width:100%;" >}}

Multiply the formula by 48 to make it even between a and b (b being the aggregation of 4 hours of data, we divided the rollup value in minutes, 240, by 5).
The threshold here is 2, in order to get an alert when the difference in value is double or higher.

```
{
	"name": "[Spike threshold] Log Spike",
	"type": "query alert",
	"query": "sum(last_5m):(sum:datadog.estimated_usage.logs.ingested_events{env:prod}.as_count() / moving_rollup(sum:datadog.estimated_usage.logs.ingested_events{env:prod}.as_count(), 14400, 'sum')) * 48 > 2",
	"message": "Be careful! There has been a difference of {{value}} in Log ingestion between now and the past 4 hours!",
	"tags": [],
	"options": {
		"thresholds": {
			"critical": 2
		},
		"notify_audit": false,
		"require_full_window": false,
		"notify_no_data": false,
		"renotify_interval": 0,
		"include_tags": false
	}
}
```

## Reference threshold

### Context
You are the QA team lead in charge of the checkout process of your e-commerce website. The traffic is not the same throughout the day, so 50 errors/minutes on a friday evening is not as worrying as 50 errors/minute on a sunday morning.
Monitoring on an error rate rather than the errors gives you an objective definition between healthy and unhealthy.You want to:
- Make sure that your customer can have a good experience and purchase your product without any issues and one indicator of that is the error rate.
- Get alerted when the error rate is high, but also when the number of hits is significant enough.


### Monitor

Create 3 monitors in total:
1. Metric monitor to alert on total number of hits.
1. Metric monitor to calculate the error rate.
1. [Composite monitor][7] that triggers an alert if the first two monitors are in an ALERT state.

The first monitor tracks the total number of hits. It lets you know whether the error rate should trigger an alert.

The second monitor calculates the error rate itself. Create a query on the number of errors divided by the total number of hits to get the error rate `a / a+b`, as follow:
  {{< img src="monitors/guide/non_static_thresholds/metric_monitor_error_rate.png" alt="Metric monitor configuration with formula to calculate error rate" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/anomaly/
[2]: /monitors/types/outlier/
[3]: https://app.datadoghq.com/monitors/create/metric
[4]: /dashboards/functions/timeshift/#week-before
[5]: /logs/log_configuration/logs_to_metrics/#logs-usage-metrics
[6]: /dashboards/functions/rollup/#moving-rollup
[7]: /monitors/types/composite/
