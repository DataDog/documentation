---
title: Monitor and query for unparsed logs
kind: guide
aliases:
  - /logs/guide/detect-unparsed-logs/
further_reading:
 - link: "/logs/explorer/"
    tag: "Documentation"
    text: "See how to explore your logs"
 - link: /logs/faq/log-parsing-best-practice
    tag: Documentation
    text: "Log Parsing - Best Practices"
beta: true
---

<div class="alert alert-warning">
The Unparsed logs flagging feature is currently in private beta. For more information, contact <a href="https://docs.datadoghq.com/help/">Datadog support</a>.
</div>

## Overview
Parsed logs are central to be able to use Datadog Log Management to its full capacity, for queries, monitors, aggregations or automatic enrichments such as sensitive data scanner.
When you are scaling your volume of logs it can be challenging to identify and fix logs patterns that are not parsed by your pipelines.

This guide walks you through three steps to be able to identify and control the volume of unparsed logs in your organization:

1. [Detect an unparsed log](#detect-an-unparsed-log)
2. [Query for unparsed logs](#query-for-unparsed-logs)
3. [Create a metric to track for unparsed logs](#create-a-metric-to-track-fro-unparsed-logs)
4. [Monitor the volume of unparsed logs](#monitor-the-volume-of-unparsed-logs)


## Detect an unparsed log
In order to detect if a specific log has been parsed by your pipelines, access the log and check for the Event Attributes panel:

{{< img src="logs/guide/unparsed-logs/unparsed-log.jpg" alt="Unparsed log details"  style="width:90%;">}}

Unparsed logs will contain a blue message instead of attributes extracted from your log.

This issue can be solved in multiple ways such as creating [custom pipelines][1] or using a [log integration][2] as the source of the log to take advantage of the automatic pipeline setup.

## Query for unparsed logs
Checking logs manually to ensure they are parsed is not a viable way of tracking for the unparsed logs at scale.

You can query in bulk for unparsed logs by using the filter `datadog.pipelines:false` in the [log explorer][3]:

{{< img src="logs/guide/unparsed-logs/datadog-pipeline-false-log-explorer.jpg" alt="Query unparsed logs"  style="width:90%;">}}

This filter will return all indexed logs without custom attributes after the pipeline processing.
With [pattern aggregation][4], you have an aggregated view of the common patterns in the unparsed logs which can help kickstart custom pipelines.

## Create a metric to track for unparsed logs
With the previous section, you have a way to select the unparsed __indexed__ logs. Althought, as a good practice, you want to ensure that even the logs that you do not index are parsed so that the content of your [archives][6] are structured.

To do so, create a new [custom metric][5] using the same filter:

{{< img src="logs/guide/unparsed-logs/logs-unparsed-metric.jpg" alt="Generate logs.unparsed metric"  style="width:90%;">}}

As for any log-based metric, you can add dimensions in the `group by` field. For this guide, the dimensions used are `service` and `team` but a good practice is to have this metric with the dimensions that you are using to define the ownership of a log.
## Monitor the volume of unparsed logs
In order to ensure that the logs parsing in your organization is kept under control, you can apply quota for the unparsed logs volume. This approach is close to what is proposed in with [daily quotas][7] for indexes.

To do so:
1. Create a new [metric monitor][8]
2. Use the previously created `logs.unparsed` metric
3. Define the quota per `team`
4. Ensure that the [alert conditions][9] fit when you want to be alerted

{{< img src="logs/guide/unparsed-logs/monitor-unparsed-logs-team.jpg" alt="Query unparsed logs"  style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/logs/processing/
[2]: https://docs.datadoghq.com/integrations/#cat-log-collection
[3]: https://docs.datadoghq.com/logs/explorer/
[4]: https://docs.datadoghq.com/logs/explorer/#patterns
[5]: https://docs.datadoghq.com/logs/logs_to_metrics/
[6]: https://docs.datadoghq.com/logs/archives/?tab=awss3
[7]: https://docs.datadoghq.com/logs/indexes#set-daily-quota
[8]: https://docs.datadoghq.com/monitors/monitor_types/metric/?tab=threshold#overview
[9]: https://docs.datadoghq.com/monitors/monitor_types/metric/?tab=threshold#set-alert-conditions