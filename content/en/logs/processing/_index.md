---
title: Processing
kind: documentation
description: "Parse & Enrich your logs to create valuable facets & metrics in the Logs Explorer."
aliases:
  - /logs/faq/integration-pipeline-reference
further_reading:
- link: "/logs/processing/pipelines/"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "/logs/processing/processors/"
  tag: "Documentation"
  text: "Consult the full list of available Processors."
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog log attributes naming convention"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
---

{{< img src="logs/processing/processing.png" alt="Processing" >}}

## Overview

To access the configuration panel use the left `Logs` menu then the configuration sub menu.

Log configuration page allows full control over how your logs are processed with Datadog [Pipelines][1] and [Processors][2].

* A [Pipeline][1] takes a filtered subset of incoming logs and applies a list of sequential processors.
* A [Processor][2] executes within a [Pipeline][1] to complete a data-structuring action ([Remapping an attribute][3], [Grok parsing][4], etc.) on a log.

[Pipelines][1] and [Processors][2] can be applied to any type of logs:

* [Integration logs](#integration-logs)
* [Custom JSON/Syslog/full text logs](#custom-logs)

Therefore, you don't need to change how you log, and you don't need to deploy changes to any server-side processing rules. Everything is happening and can be configured in the [Datadog processing page][5].

The other benefit to implement a log processing strategy is to implement an [attribute naming convention][6] for your organization.

## Log Processing

### Integration logs

For integration logs, an [Integration Pipeline][7] is automatically installed that takes care of parsing your logs and adds the corresponding facet in your Logs Explorer. See the ELB logs example below:

{{< img src="logs/processing/elb_log_post_processing.png" alt="ELB log post processing"  style="width:70%;">}}

<div class="alert alert-info">
Consult the current <a href="/integrations/#cat-log-collection">list of supported integrations</a>.
</div>

### Custom logs

However, log formats can be totally custom which is why you can define custom processing rules. With any log syntax, you can extract all your attributes and, when necessary, remap them to more global or canonical attributes.

So for instance with custom processing rules you can transform this log:

{{< img src="logs/processing/log_pre_processing.png" alt="Log pre processing"  style="width:50%;">}}

Into this one:

{{< img src="logs/processing/log_post_processing.png" alt="Log post processing"  style="width:50%;">}}

Consult the [Pipelines documentation page][1] to learn more on how to perform actions only on some subset of your logs with the [Pipeline filters][8].

To discover the full list of Processors available, refer to the dedicated [Processor documentation page][2].

If you want to learn more about pure parsing possibilities of the Datadog application, follow the [parsing training guide][9]. There is also a [parsing best practice][10] and [parsing troubleshooting][11] guide.

For optimal usage of the Log Management solution, Datadog recommends using at most 20 processors per pipeline and 10 parsing rules within a grok processor. 
Datadog reserves the right to disable underperforming parsing rules, processors, or pipelines that might impact Datadog's service performance.

## JSON Logs Preprocessing

JSON Logs preprocessing comes with a default configuration that work for standard log forwarders. Edit this configuration at any time to adapt to custom or specifc log forwarding approaches. To change the default values, go to the [Configuration page][5] and edit the `JSON Logs Preprocessing`:

{{< img src="logs/processing/json_logs_preprocessing.gif" alt="JSON Logs Preprocessing Tile"  style="width:80%;">}}


If your logs are formatted as JSON, use JSON Logs preprocessing to make sure the **Host** and the **Source** of your logs are properly mapped:

* **Host remapping** is required to make sure your logs inherit from all other [host tags][22].
* **Source Remapping** is required to trigger [Log Integrations][16].

JSON Logs preprocessing is also a handy alternative to apply Reserved Attribute Remappers Processors (namely [Date Remapper][12], [Status Remapper][15], [Service Remapper][19], [Message Remapper][20] and [Trace Remapper][21]) once for all.

This Preprocessing applies before logs actually enter [Log Pipelines][1] processing.

### *host* attribute

Using the Datadog Agent or the RFC5424 format automatically sets the host value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog interprets its value as the log's host:

* `host`
* `hostname`
* `syslog.hostname`

### *source* attribute

If a JSON formatted log file includes the `ddsource` attribute, Datadog interprets its value as the log's source. To use the same source names Datadog uses, see the [Integration Pipeline Library][16].

**Note**: Logs coming from a containerized environment require the use of an [environment variable][17] to override the default source and service values.


### *date* attribute

By default Datadog generates a timestamp and appends it in a date attribute when logs are received. However, if a JSON formatted log file includes one of the following attributes, Datadog interprets its value as the log's official date:

* `@timestamp`
* `timestamp`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `date`
* `published_date`
* `syslog.timestamp`

You can also specify alternate attributes to use as the source of a log's date by setting a [log date remapper processor][12].

**Note**: Datadog rejects a log entry if its official date is older than 18 hours in the past.

<div class="alert alert-warning">
The recognized date formats are: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (the milliseconds EPOCH format)</a>, and <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

### *message* attribute

By default, Datadog ingests the message value as the body of the log entry. That value is then highlighted and displayed in the [logstream][13], where it is indexed for [full text search][14].

### *status* attribute

Each log entry may specify a status level which is made available for faceted search within Datadog. However, if a JSON formatted log file includes one of the following attributes, Datadog interprets its value as the log's official status:

* `status`
* `severity`
* `level`
* `syslog.severity`

If you would like to remap a status existing in the `status` attribute, you can do so with the [log status remapper][15].

### *service* attribute

Using the Datadog Agent or the RFC5424 format automatically sets the service value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog interprets its value as the log's service:

* `service`
* `syslog.appname`

### *trace_id* attribute

By default, [Datadog tracers can automatically inject trace and span IDs in the logs][18]. However, if a JSON formatted log includes the following attributes, Datadog interprets its value as the log's `trace_id`:

* `dd.trace_id`
* `contextMap.dd.trace_id`


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/pipelines/
[2]: /logs/processing/processors/
[3]: /logs/processing/processors/#attribute-remapper
[4]: /logs/processing/processors/#grok-parser
[5]: https://app.datadoghq.com/logs/pipelines
[6]: /logs/processing/attributes_naming_convention/
[7]: /logs/processing/pipelines/#integration-pipelines
[8]: /logs/processing/pipelines/#pipeline-filters
[9]: /logs/processing/parsing/
[10]: /logs/faq/log-parsing-best-practice/
[11]: /logs/faq/how-to-investigate-a-log-parsing-issue/
[12]: /logs/processing/processors/#log-date-remapper
[13]: /logs/explorer/?tab=logstream#visualization
[14]: /logs/explorer/search/
[15]: /logs/processing/processors/#log-status-remapper
[16]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[17]: /agent/docker/log/#examples
[18]: /tracing/connect_logs_and_traces/
[19]: /logs/processing/processors/?tab=ui#service-remapper
[20]: /logs/processing/processors/?tab=ui#log-message-remapper
[21]: /logs/processing/processors/?tab=ui#trace-remapper
[22]: /getting_started/tagging/#introduction
