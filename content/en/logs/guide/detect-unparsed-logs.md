---
title: Monitor and query for unparsed logs
kind: guide
further_reading:
  - link: /logs/explorer/
    tag: Documentation
    text: "See how to explore your logs"
  - link: /logs/faq/log-parsing-best-practice
    tag: Documentation
    text: "Log Parsing - Best Practices"
beta: true
---

<div class="alert alert-warning">
The unparsed logs flagging feature is currently in private beta. For more information, contact <a href="https://docs.datadoghq.com/help/">Datadog support</a>.
</div>

## Overview
Parsed logs are central to be able to use Datadog Log Management to its full capacity, for queries, monitors, aggregations or automatic enrichments such as sensitive data scanner.
When you are scaling your volume of logs it can be challenging to identify and fix logs patterns that are not parsed by your pipelines.

To identify and control the volume of unparsed logs in your organization:

1. [Detect unparsed logs](#detect-unparsed-logs)
2. [Query for unparsed logs](#query-for-unparsed-logs)
3. [Create a metric to track for unparsed logs](#create-a-metric-to-track-for-unparsed-logs)
4. [Monitor the volume of unparsed logs](#monitor-the-volume-of-unparsed-logs)


## Detect unparsed logs
To determine if a specific log has been parsed by your pipelines, open the log and check the Event Attributes panel. If the log is unparsed, instead of showing attributes extracted from your log, the panel shows a message saying that no attributes were extracted:

{{< img src="logs/guide/unparsed-logs/unparsed-log.jpg" alt="Unparsed log details"  style="width:90%;">}}


You can start parsing and unparsed log by creating [custom pipelines][1] or using a [log integration][2] as the source of the log to take advantage of the automatic pipeline setup.

## Query for unparsed logs
If you have many logs, making one-by-one checking unviable, you can instead query for unparsed logs by using the filter `datadog.pipelines:false` in the [Log Explorer][3]:

{{< img src="logs/guide/unparsed-logs/datadog-pipeline-false-log-explorer.jpg" alt="Query unparsed logs"  style="width:90%;">}}

This filter returns all indexed logs without custom attributes after the pipeline processing.
[Pattern aggregation][4] shows an aggregated view of the common patterns in the unparsed logs, which can kickstart your creation of custom pipelines.

## Create a metric to track for unparsed logs
Querying for unparsed logs lets you select the unparsed _indexed_ logs. It's also a good practice to ensure that even the logs that you do not index are parsed, so that the content of your [archives][6] are structured.

To create a metric for unparsed logs, create a [custom metric][5] using the `datadog.pipelines:false` query:

{{< img src="logs/guide/unparsed-logs/logs-unparsed-metric.jpg" alt="Generate logs.unparsed metric"  style="width:90%;">}}

As for any log-based metric, you can add dimensions in the `group by` field. The example above shows grouping by `service` and `team`. You should group by the dimensions that you are using to define the ownership of a log.
## Monitor the volume of unparsed logs
To ensure that the logs parsing in your organization is kept under control, apply a quota for the unparsed logs volume. This approach is close to what is proposed with [daily quotas][7] for indexes.

To monitor the volume of unparsed logs:
1. Create a [metric monitor][8].
2. Use the previously created `logs.unparsed` metric.
3. Define the quota per `team`.
4. Ensure that the [alert conditions][9] fit when you want to be alerted.

{{< img src="logs/guide/unparsed-logs/monitor-unparsed-logs-team.jpg" alt="Query unparsed logs"  style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /logs/processing/
[2]: /integrations/#cat-log-collection
[3]: /logs/explorer/
[4]: /logs/explorer/#patterns
[5]: /logs/logs_to_metrics/
[6]: /logs/archives/?tab=awss3
[7]: /logs/indexes#set-daily-quota
[8]: /monitors/monitor_types/metric/?tab=threshold#overview
[9]: /monitors/monitor_types/metric/?tab=threshold#set-alert-conditions
