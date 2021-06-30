---
title: Pipelines
kind: documentation
description: "Parse your logs using the Grok Processor"
aliases:
  - /logs/processing/pipelines/
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

## Overview

Datadog automatically parses JSON-formatted logs. When logs are not JSON-formatted, you can add value to your raw logs by sending them through a processing pipeline. Pipelines take logs from a wide variety of formats and translate them into a common format in Datadog.

With pipelines, logs are parsed and enriched by chaining them sequentially through [processors][1]. This extracts meaningful information or attributes from semi-structured text to reuse as [facets][2]. Each log that comes through the pipelines is tested against every pipeline filter. If it matches a filter, then all the processors are applied sequentially before moving to the next pipeline.

Pipelines and processors are particularly useful in the instance of extracting log data by team. If you have certain data in a log that is only applicable to one team, you can create a pipeline that will extract the data and you can use its facets to filter down logs by team.

An example of a log transformed by a pipeline:

{{< img src="logs/processing/pipelines/log_post_processing.png" alt="An example of a log transformed by a pipeline" style="width:50%;">}}

## Preprocessing

Preprocessing of JSON logs occurs before logs enter pipeline processing. Preprocessing runs a series of operations based on reserved attributes, such as `timestamp`, `status`, `host`, `service`, and `message`. If you have different attribute names in your JSON logs, use preprocessing to map your log attribute names to those in the reserved attribute list.

JSON log preprocessing comes with a default configuration that works for standard log forwarders. To edit this configuration to adapt custom or specific log forwarding approaches:

1. Navigate to [Pipelines][3] in the Datadog app and select [Preprocessing for JSON logs][4].

    **Note:** Preprocessing JSON logs is the only way to define one of your log attributes as `host` for your logs.

2. Change the default mapping based on reserved attribute:

{{< tabs >}}
{{% tab "Source" %}}

#### Source attribute

If a JSON formatted log file includes the `ddsource` attribute, Datadog interprets its value as the log's source. To use the same source names Datadog uses, see the [Integration Pipeline Library][1].

**Note**: Logs coming from a containerized environment require the use of an [environment variable][2] to override the default source and service values.


[1]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[2]: /agent/docker/log/?tab=containerinstallation#examples
{{% /tab %}}
{{% tab "Host" %}}

#### Host attribute

Using the Datadog Agent or the RFC5424 format automatically sets the host value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog interprets its value as the log's host:

* `host`
* `hostname`
* `syslog.hostname`

{{% /tab %}}
{{% tab "Date" %}}

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

Specify alternate attributes to use as the source of a log's date by setting a [log date remapper processor][1].

**Note**: Datadog rejects a log entry if its official date is older than 18 hours in the past.

<div class="alert alert-warning">
The recognized date formats are: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (the milliseconds EPOCH format)</a>, and <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>


[1]: /logs/processing/processors/#log-date-remapper
{{% /tab %}}
{{% tab "Message" %}}

#### Message attribute

By default, Datadog ingests the message value as the body of the log entry. That value is then highlighted and displayed in the [Log Explorer][1], where it is indexed for [full text search][2].

Specify alternate attributes to use as the source of a log's message by setting a [log message remapper processor][3].


[1]: /logs/explorer/
[2]: /logs/explorer/#filters-logs
[3]: /logs/processing/processors/?tab=ui#log-message-remapper
{{% /tab %}}
{{% tab "Status" %}}

#### Status attribute

Each log entry may specify a status level which is made available for faceted search within Datadog. However, if a JSON formatted log file includes one of the following attributes, Datadog interprets its value as the log's official status:

* `status`
* `severity`
* `level`
* `syslog.severity`

To remap a status existing in the `status` attribute, use the [log status remapper][1].


[1]: /logs/processing/processors/#log-status-remapper
{{% /tab %}}
{{% tab "Service" %}}

#### Service attribute

Using the Datadog Agent or the RFC5424 format automatically sets the service value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog interprets its value as the log's service:

* `service`
* `syslog.appname`

Specify alternate attributes to use as the source of a log's service by setting a [log service remapper processor][1].


[1]: /logs/processing/processors/?tab=ui#service-remapper
{{% /tab %}}
{{% tab "Trace ID" %}}

#### Trace ID attribute

By default, [Datadog tracers can automatically inject trace and span IDs into your logs][1]. However, if a JSON formatted log includes the following attributes, Datadog interprets its value as the log's `trace_id`:

* `dd.trace_id`
* `contextMap.dd.trace_id`

Specify alternate attributes to use as the source of a log's trace ID by setting a [trace ID remapper processor][2].


[1]: /tracing/connect_logs_and_traces/
[2]: /logs/processing/processors/?tab=ui#trace-remapper
{{% /tab %}}
{{< /tabs >}}

## Create a pipeline

1. Navigate to [Pipelines][3] in the Datadog app.
2. Select **New Pipeline**.
3. Select a log from the live tail preview to apply a filter, or apply your own filter. Choose a filter from the dropdown menu or create your own filter query by selecting the **</>** icon. Filters let you limit what kinds of logs a pipeline applies to.

    **Note**: The pipeline filtering is applied before any of the pipeline's processors, hence you cannot filter on an attribute that is extracted in the pipeline itself.

4. Name your pipeline, and press **Save**.

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

To see the full list of integration pipelines that Datadog offers, browse the [integration pipeline library][3]. The pipeline library shows how Datadog processes different log formats by default.

{{< img src="logs/processing/pipelines/integration-pipeline-library.gif" alt="Integration pipeline library" style="width:80%;">}}

To use an integration pipeline, Datadog recommends installing the integration by configuring the corresponding log `source`. Once Datadog receives the first log with this source, the installation is automatically triggered and the integration pipeline is added to the processing pipelines list. To configure the log source, refer to the corresponding [integration documentation][5].

It's also possible to copy an integration pipeline using the copy button.

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.gif" alt="Cloning pipeline from Library" style="width:80%;">}}

## Add a processor or nested pipeline

1. Navigate to [Pipelines][3] in the Datadog app.
2. Hover over a pipeline and click the arrow next to it to expand processors and nested pipelines.
3. Select **Add Processor** or **Add Nested Pipeline**.

### Processors

See the [Processors docs][1] to learn how to add and configure a processor by processor type, within the app or with the API.

### Nested pipelines

Nested pipelines are pipelines within a pipeline. Use nested pipelines to split the processing into two steps. For example, first use a high-level filter such as team and then a second level of filtering based on the integration, service, or any other tag or attribute.

A pipeline can contain nested pipelines and processors whereas a nested pipeline can only contain processors.

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="Nested pipelines" style="width:80%;">}}

It is possible to drag and drop a pipeline into another pipeline to transform it into a nested pipeline:

{{< img src="logs/processing/pipelines/nested_pipeline_drag_drop.mp4" alt="Drag and drop nested pipelines" video="true"  width="80%" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/processors/
[2]: /logs/explorer/facets/
[3]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[4]: https://app.datadoghq.com/logs/pipelines/remapping
[5]: /integrations/#cat-log-collection
