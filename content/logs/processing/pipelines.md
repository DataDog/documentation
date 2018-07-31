---
title: Pipelines
kind: documentation
description: "Parse your logs using the Grok Processor"
---

{{< img src="logs/processing/pipelines/pipelines_overview.png" alt="original log" responsive="true">}}

## Pipelines Goal

**A processing pipeline takes a filtered subset of incoming logs and applies over them a list of sequential processors.**

Datadog automatically parses JSON-formatted logs. When your logs are not JSON-formatted, Datadog enables you to add value to your raw logs by sending them through a processing pipeline.

With pipelines, you parse and enrich your logs by chaining them sequentially through [processors](#processors). This lets you extract meaningful information or attributes from semi-structured text to reuse them as [facets][1].

Each log that comes through the pipelines is tested against every pipeline filter. If it matches one then all the [processors](#processors) are applied sequentially before moving to the next pipeline.

So for instance a processing pipeline can transform this log:

{{< img src="logs/processing/pipelines/original_log.png" alt="original log" responsive="true" style="width:50%;">}}

into this log:

{{< img src="logs/processing/pipelines/log_post_severity.png" alt=" Log post severity " responsive="true" style="width:50%;">}}

With one single pipeline:

{{< img src="logs/processing/pipelines/pipeline_example.png" alt="Pipelines example" responsive="true" style="width:75%;">}}

Pipelines take logs from a wide variety of formats and translate them into a common format in Datadog.

For instance, a first pipeline can be defined to extract application log prefix and then each team is free to define their own pipeline to process the rest of the log message.

## Pipeline filters

Filters let you limit what kinds of logs a pipeline applies to.

The filter syntax is the same as the [search bar][1].

**Be aware that the pipeline filtering is applied before any of the pipeline's processors, hence you cannot filter on an attribute that is extracted in the pipeline itself** 

The logstream shows which logs your pipeline applies to:

{{< img src="logs/processing/pipelines/pipeline_filters.png" alt="Pipelines filters" responsive="true" style="width:80%;">}}

## Integration Pipelines

These pipelines are read-only, but you can clone them and then edit the clone:

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="Cloning pipeline" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search