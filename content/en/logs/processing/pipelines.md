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

## Pipelines goal

**A processing pipeline takes a filtered subset of incoming logs and applies over them a list of sequential Processors.**

Datadog automatically parses JSON-formatted logs. When your logs are not JSON-formatted, Datadog enables you to add value to your raw logs by sending them through a processing pipeline.

With pipelines, you parse and enrich your logs by chaining them sequentially through [processors][1]. This lets you extract meaningful information or attributes from semi-structured text to reuse them as [facets][2].

Each log that comes through the pipelines is tested against every pipeline filter. If it matches one then all the [processors][1] are applied sequentially before moving to the next pipeline.

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

The filter syntax is the same as the [search bar][2].

**Be aware that the pipeline filtering is applied before any of the pipeline's Processors, hence you cannot filter on an attribute that is extracted in the pipeline itself**

The logstream shows which logs your pipeline applies to:

{{< img src="logs/processing/pipelines/pipeline_filters.png" alt="Pipelines filters"  style="width:80%;">}}

## Nested pipelines

Nested pipelines are pipelines within a pipeline. Use nested pipelines to split the processing into two steps. For example, first use a high-level filtering such as team and then a second level of filtering based on the integration, service, or any other tag or attribute.

A pipeline can contain Nested pipelines and processors whereas a nested pipeline can only contain Processors.

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="Nested pipelines"  style="width:80%;">}}

It is possible to drag and drop a pipeline into another pipeline to transform it into a nested pipeline:

{{< img src="logs/processing/pipelines/nested_pipeline_drag_drop.mp4" alt="Drag and drop nested pipelines" video="true"  width="80%" >}}

## Special pipelines

### Pre processing for JSON logs

Datadog has [a list of reserved attributes][3] such as `timestamp`, `status`, `host`, `service`, and `message`. Those attributes have a specific behavior within Datadog. If you have different attribute names in your JSON logs, use *Pre processing for JSON logs* to map your log attribute names to those in the reserved attribute list.

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

Open *Pre processing for JSON logs* and change the default mapping to this:

{{< img src="logs/processing/pipelines/reserved_attribute_remapper.png" alt="Reserved attribute remapper"  style="width:70%;">}}

This produces the following log:

{{< img src="logs/processing/pipelines/log_post_remapping.png" alt="Log post remapping"  style="width:70%;">}}

To map an attribute to one of the reserved attributes in a custom pipeline, use the [Log Status Remapper][4], [Log Date Remapper][5], or the [Log message Remapper][6].

**Note:** *Pre processing for JSON logs* is the only way to define one of your log attributes as `host` for your logs.

### Integration pipelines

Datadog’s integration processing pipelines are available for the certain sources when they are set up to collect logs. These pipelines are **read-only** and parse out your logs in ways appropriate for the particular source. To edit an integration pipeline, clone it and then edit the clone:

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="Cloning pipeline"  style="width:80%;">}}

### Integration pipeline library

To see the full list of integration pipelines that Datadog offers, browse the [integration pipeline library][7].
The pipeline library shows how Datadog processes different log formats by default.

{{< img src="logs/processing/pipelines/integration-pipeline-library.gif" alt="Integration pipeline library" style="width:80%;">}}

To use one integration pipeline, Datadog recommends to install the integration by configuring the corresponding log `source`. Once Datadog receives the first log with this source, the installation will be automatically triggered and the integration pipeline will be added to the processing pipelines list. To configure the log source, refer to the corresponding [integration documentation][8].

It's also possible to copy an integration pipeline using the copy button.

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.gif" alt="Cloning pipeline from Library"  style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/processors/
[2]: /logs/explorer/search/
[3]: /logs/processing/#reserved-attributes
[4]: /logs/processing/processors/#log-status-remapper
[5]: /logs/processing/processors/#log-date-remapper
[6]: /logs/processing/processors/#log-message-remapper
[7]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[8]: /integrations/#cat-log-collection
