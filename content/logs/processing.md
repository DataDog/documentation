---
title: Pipelines
kind: documentation
description: "Parse & Enrich your logs to create valuable facets & metrics in the Logs Explorer."
further_reading:
- link: "logs/parsing"
  tag: "Documentation"
  text: Learn more about parsing
- link: "logs/faq/how-to-investigate-a-log-parsing-issue"
  tag: "FAQ"
  text: How to investigate a log parsing issue?
- link: "logs/faq/log-parsing-best-practice"
  tag: "FAQ"
  text: Log Parsing - Best Practice
---

## Overview

To access the processing panel use the upper left menu:

{{< img src="logs/processing/processing_panel.png" alt="Pipelines panel" responsive="true" popup="true" style="width:50%;" >}}

## Processing Pipelines
### Pipelines Goal

**A processing pipeline takes a filtered subset of incoming logs and applies over them a list of sequential processors.**

Datadog automatically parses JSON-formatted logs. When your logs are not JSON-formatted, Datadog enables you to add value to your raw logs by sending them through a processing pipeline.

With pipelines, you parse and enrich your logs by chaining them sequentially through [processors](#processors). This lets you extract meaningful information or attributes from semi-structured text to reuse them as [facets](/logs/explore/#facets).

Each log that comes through the pipelines is tested against every pipeline filter. If it matches one then all the [processors](#processors) are applied sequentially before moving to the next pipeline.

So for instance a processing pipeline can transform this log:

{{< img src="logs/processing/original_log.png" alt="original log" responsive="true" popup="true" style="width:50%;">}}

into this log:

{{< img src="logs/processing/log_post_severity.png" alt=" Log post severity " responsive="true" popup="true" style="width:50%;">}}

With one single pipeline:

{{< img src="logs/processing/pipeline_example.png" alt="Pipelines example" responsive="true" popup="true" style="width:75%;">}}

Pipelines take logs from a wide variety of formats and translate them into a common format in Datadog.

For instance, a first pipeline can be defined to extract application log prefix and then each team is free to define their own pipeline to process the rest of the log message.

### Pipeline filters

Filters let you limit what kinds of logs a pipeline applies to.

The filter syntax is the same as the [search bar](/logs/explore/#search-bar).

**Be aware that the pipeline filtering is applied before any of the pipeline's processors, hence you cannot filter on an attribute that is extracted in the pipeline itself** 

The logstream shows which logs your pipeline applies to:

{{< img src="logs/processing/pipeline_filters.png" alt="Pipelines filters" responsive="true" popup="true" style="width:80%;">}}

### Integration Pipelines

These pipelines are read-only, but you can clone them and then edit the clone:

{{< img src="logs/processing/cloning_pipeline.png" alt="Cloning pipeline" responsive="true" popup="true" style="width:80%;">}}

## Processors

A processor executes within a [pipeline](#processing-pipelines) a data-structuring action ([Remapping an attribute](#attribute-remapper), [Grok parsing](#grok-parser)...) on a log.

The different kinds of processors are explained below.

### Grok Parser

Create custom grok rules to parse the full message or a specific attribute of your raw event:

{{< img src="logs/processing/parser.png" alt="Parser" responsive="true" popup="true">}}

Read more about this in the [parsing section](/logs/parsing)

### Log Date Remapper

As Datadog receives logs, it timestamps them using the value(s) from any of these default attributes:

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

If your logs put their dates in an attribute not in this list, use the log date Remapper processor to define their date attribute as the official log timestamp:

{{< img src="logs/processing/log_date_remapper.png" alt="Log date Remapper" responsive="true" popup="true">}}

If your logs don't contain any of the default attributes and you haven't defined your own date attribute, Datadog timestamps the logs with the date it received them.  
If the log's official timestamp is from a custom attribute, use a [date remapper processor](/logs/processing/#log-date-remapper) to override the log's default timestamp.

### Log Status Remapper

Use this processor if you want to assign some attributes as the official status, just enter the attribute path in the processor tile as follow:

{{< img src="logs/processing/severity_remapper_processor_tile.png" alt="Severity Remapper processor tile" responsive="true" popup="true">}}

It transforms this log:

{{< img src="logs/processing/log_pre_severity.png" alt=" Log pre severity " responsive="true" popup="true" style="width:40%;">}}

Into this log:

{{< img src="logs/processing/log_post_severity_bis.png" alt=" Log post severity bis" responsive="true" popup="true" style="width:40%;" >}}

However, beware that each incoming status value is mapped as follows:

* Integers from 0 to 7 map to the [Syslog severity standards](https://en.wikipedia.org/wiki/Syslog#Severity_level)
* Strings beginning with **emerg** or **f** (case unsensitive) map to **emerg (0)**
* Strings beginning with **a** (case unsensitive) map to **alert (1)**
* Strings beginning with **c** (case unsensitive) map to **critical (2)**
* Strings beginning with **err** (case unsensitive) map to **error (3)**
* Strings beginning with **w** (case unsensitive) map to **warning (4)**
* Strings beginning with **n** (case unsensitive) map to **notice (5)**
* Strings beginning with **i** (case unsensitive) map to **info (6)**
* Strings beginning with **d**, **trace** or **verbose** (case unsensitive) map to **debug (7)**
* Strings matching **OK** or **Sucess** (case unsensitive) map to **OK**
* All others map to **info (6)**

### Attribute Remapper

This processor remaps any attribute(s) to another one, for instance here it remaps “user” to “user.firstname”

{{< img src="logs/processing/attribute_remapper_processor_tile.png" alt="Attribute Remapper processor tile" responsive="true" popup="true">}}

It transforms this log:

{{< img src="logs/processing/attribute_pre_remapping.png" alt="attribute pre remapping " responsive="true" popup="true" style="width:40%;">}}

Into this log:
{{< img src="logs/processing/attribute_post_remapping.png" alt="attribute post remapping " responsive="true" popup="true" style="width:40%;">}}

### URL Parser

This processor extracts query parameters and other important parameters from a URL. To use it, just enter the source attribute of your url:

{{< img src="logs/processing/url_processor.png" alt="Url Processor" responsive="true" popup="true">}}

### Useragent parser

UserAgent parser takes a useragent attribute and does its best to extract the OS, browser, device, etc...
It recognizes major bots like the Google Bot, Yahoo Slurp, Bing and others.

If your logs contain encoded useragents (as, for example, IIS logs do), configure this processor to **decode the URL** before parsing it.

These settings:
{{< img src="logs/processing/useragent_processor_tile.png" alt="Useragent processor tile" responsive="true" popup="true">}}

Give the following results:
{{< img src="logs/processing/useragent_processor.png" alt="Useragent processor" responsive="true" popup="true">}}

## Technical limits

To make sure the Log Management solution functions in an optimal way we set the following technical limits and rules to your log events as well as to some product features. These have been designed so you may never reach them.

### Limits applied to ingested log events

* The size of a log event should not exceed 25K bytes.
* Log events can be submitted up to 6h in the past and 2h in the future.
* A log event once converted to JSON format should contain less than 256 attributes, each of those attribute’s key should be less than 50 characters, be nested in less than 10 successive levels and their respective value be less than 1024 characters if promoted as a facet.
* A log event should not have more than 100 tags and each tag should not exceed 256 characters for a maximum of 10 millions unique tag per day.

Log events which do not comply with these limits might be transformed or truncated by the system. Or simply not indexed if outside of the provided time range. However, be sure that Datadog always tries to do its best to preserve as much as possible the provided user data.

### Limits applied to provided features

* The maximum number of facets is 100.
* The maximum number of processing pipeline on a platform is 100.
* The maximum number of processor per pipeline is 20.
* The maximum number of parsing rule within a grok processor is 10. We reserve the right to disable underperforming parsing rules that might impact our service performance.

Contact support if you reach one of these limits as Datadog might be able to provide you more.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
