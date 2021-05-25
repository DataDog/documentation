---
title: Pipelines
kind: documentation
description: "Parse your logs using the Grok Processor"
further_reading:
- link: "/logs/processing/processors/"
  tag: "Documentation"
  text: "Consult the full list of available Processors"
- link: "/logs/logging_without_limits/"
  tag: "Documentation"
  text: "Logging without limit"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "https://learn.datadoghq.com/course/view.php?id=10"
  tag: "Learning Center"
  text: "Going Deeper with Logs: Parsing"
---

{{< img src="logs/processing/pipelines/pipelines_overview.png" alt="original log" >}}

## Overview

Datadog automatically parses JSON-formatted logs. When logs are not JSON-formatted, you can add values to your raw logs by sending them through a processing pipeline.

With pipelines, logs are parsed and enriched by chaining them sequentially through [processors][1]. This extracts meaningful information or attributes from semi-structured text to reuse as [facets][2].

Each log that comes through the pipelines is tested against every pipeline filter. If it matches one then all the processors are applied sequentially before moving to the next pipeline.

So for instance a processing pipeline can transform this log:

{{< img src="logs/processing/pipelines/log_pre_processing.png" alt="original log"  style="width:50%;">}}

into this log:

{{< img src="logs/processing/pipelines/log_post_processing.png" alt=" Log post severity "  style="width:50%;">}}

With one single pipeline:

{{< img src="logs/processing/pipelines/pipeline_example.png" alt="Pipelines example"  style="width:75%;">}}

Pipelines take logs from a wide variety of formats and translate them into a common format in Datadog.

For instance, a first pipeline can be defined to extract application log prefix and then each team is free to define their own pipeline to process the rest of the log message.

## Pipeline filters

Filters let you limit what kinds of logs a pipeline applies to.

The filter syntax is the same as the [search bar][3].

**Note**: The pipeline filtering is applied before any of the pipeline's processors, hence you cannot filter on an attribute that is extracted in the pipeline itself.

The logstream shows which logs your pipeline applies to:

{{< img src="logs/processing/pipelines/pipeline_filters.png" alt="Pipelines filters"  style="width:80%;">}}

## Nested pipelines

Nested pipelines are pipelines within a pipeline. Use nested pipelines to split the processing into two steps. For example, first use a high-level filtering such as team and then a second level of filtering based on the integration, service, or any other tag or attribute.

A pipeline can contain Nested pipelines and processors whereas a nested pipeline can only contain Processors.

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="Nested pipelines"  style="width:80%;">}}

It is possible to drag and drop a pipeline into another pipeline to transform it into a nested pipeline:

{{< img src="logs/processing/pipelines/nested_pipeline_drag_drop.mp4" alt="Drag and drop nested pipelines" video="true"  width="80%" >}}

## Special pipelines

### Preprocessing for JSON logs

Preprocessing of JSON logs occurs before logs enter pipeline processing. Preprocessing runs a series of operations based on [reserved attributes][4], such as `timestamp`, `status`, `host`, `service`, and `message`. If you have different attribute names in your JSON logs, use preprocessing to map your log attribute names to those in the reserved attribute list.

With preprocessing:

* Trigger new [log integrations](#integration-pipelines) based on the [source](#source-attribute) of incoming logs.
* Append incoming logs with all [host](#host-attribute) tags.
* Apply reserved attribute remapper processors (namely [date remapper](#date-attribute), [status remapper](#status-attribute), [service remapper](#service-attribute), [message remapper](#message-attribute), and [trace ID remapper](#trace-id-attribute)) for the related JSON attributes of all incoming JSON logs.

For example, consider a service that generates this log:

```json
{
  "myhost": "host123",
  "myapp": "test-web-2",
  "logger_severity": "Error",
  "log": "cannot establish connection with /api/v1/test",
  "status_code": 500
}
```

JSON log preprocessing comes with a default configuration that works for standard log forwarders. Edit this configuration to adapt custom or specific log forwarding approaches.

Open **Pre processing for JSON logs** and change the default mapping:

{{< img src="logs/processing/pipelines/reserved_attribute_remapper.png" alt="Reserved attribute remapper"  style="width:70%;">}}

This produces the following log:

{{< img src="logs/processing/pipelines/log_post_remapping.png" alt="Log post remapping"  style="width:70%;">}}

**Note:** Preprocessing JSON logs is the only way to define one of your log attributes as `host` for your logs.

#### Source attribute

If a JSON formatted log file includes the `ddsource` attribute, Datadog interprets its value as the log's source. To use the same source names Datadog uses, see the [Integration Pipeline Library][5].

**Note**: Logs coming from a containerized environment require the use of an [environment variable][6] to override the default source and service values.

#### Host attribute

Using the Datadog Agent or the RFC5424 format automatically sets the host value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog interprets its value as the log's host:

* `host`
* `hostname`
* `syslog.hostname`

#### Date attribute

By default Datadog generates a timestamp and appends it in a date attribute when logs are received. However, if a JSON formatted log file includes one of the following attributes, Datadog interprets its value as the log's official date:

* `@timestamp`
* `timestamp`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `date`
* `published_date`
* `syslog.timestamp`

Specify alternate attributes to use as the source of a log's date by setting a [log date remapper processor][7].

**Note**: Datadog rejects a log entry if its official date is older than 18 hours in the past.

<div class="alert alert-warning">
The recognized date formats are: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (the milliseconds EPOCH format)</a>, and <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

#### Message attribute

By default, Datadog ingests the message value as the body of the log entry. That value is then highlighted and displayed in the [logstream][8], where it is indexed for [full text search][9].

Specify alternate attributes to use as the source of a log's message by setting a [log message remapper processor][10].

#### Status attribute

Each log entry may specify a status level which is made available for faceted search within Datadog. However, if a JSON formatted log file includes one of the following attributes, Datadog interprets its value as the log's official status:

* `status`
* `severity`
* `level`
* `syslog.severity`

To remap a status existing in the `status` attribute, use the [log status remapper][11].

#### Service attribute

Using the Datadog Agent or the RFC5424 format automatically sets the service value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog interprets its value as the log's service:

* `service`
* `syslog.appname`

Specify alternate attributes to use as the source of a log's service by setting a [log service remapper processor][12].

#### Trace ID attribute

By default, [Datadog tracers can automatically inject trace and span IDs into your logs][13]. However, if a JSON formatted log includes the following attributes, Datadog interprets its value as the log's `trace_id`:

* `dd.trace_id`
* `contextMap.dd.trace_id`

Specify alternate attributes to use as the source of a log's trace ID by setting a [trace ID remapper processor][14].

### Integration pipelines

<div class="alert alert-info">
See the <a href="/integrations/#cat-log-collection">list of supported integrations</a>.
</div>

Integration processing pipelines are available for certain sources when they are set up to collect logs. For integration logs, an integration pipeline is automatically installed that takes care of parsing your logs and adds the corresponding facet in your Logs Explorer.

These pipelines are **read-only** and parse out your logs in ways appropriate for the particular source. To edit an integration pipeline, clone it and then edit the clone:

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="Cloning pipeline"  style="width:80%;">}}

See the ELB logs example below:

{{< img src="logs/processing/elb_log_post_processing.png" alt="ELB log post processing"  style="width:70%;">}}

### Integration pipeline library

To see the full list of integration pipelines that Datadog offers, browse the [integration pipeline library][5]. The pipeline library shows how Datadog processes different log formats by default.

{{< img src="logs/processing/pipelines/integration-pipeline-library.gif" alt="Integration pipeline library" style="width:80%;">}}

To use an integration pipeline, Datadog recommends installing the integration by configuring the corresponding log `source`. Once Datadog receives the first log with this source, the installation is automatically triggered and the integration pipeline is added to the processing pipelines list. To configure the log source, refer to the corresponding [integration documentation][15].

It's also possible to copy an integration pipeline using the copy button.

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.gif" alt="Cloning pipeline from Library" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/processors/
[2]: /logs/explorer/facets/
[3]: /logs/explorer/search/
[4]: /logs/processing/pipelines/#source-attribute
[5]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[6]: /agent/docker/log/?tab=containerinstallation#examples
[7]: /logs/processing/processors/#log-date-remapper
[8]: /logs/explorer/
[9]: /logs/explorer/#filters-logs
[10]: /logs/processing/processors/?tab=ui#log-message-remapper
[11]: /logs/processing/processors/#log-status-remapper
[12]: /logs/processing/processors/?tab=ui#service-remapper
[13]: /tracing/connect_logs_and_traces/
[14]: /logs/processing/processors/?tab=ui#trace-remapper
[15]: /integrations/#cat-log-collection
