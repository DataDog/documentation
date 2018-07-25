---
title: Processing
kind: documentation
description: "Parse & Enrich your logs to create valuable facets & metrics in the Logs Explorer."
further_reading:
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: Learn more about parsing
- link: "logs/faq/how-to-investigate-a-log-parsing-issue"
  tag: "FAQ"
  text: How to investigate a log parsing issue?
- link: "logs/faq/log-parsing-best-practice"
  tag: "FAQ"
  text: Log Parsing - Best Practice
- link: "logs/logging_without_limits"
  tag: "Documentation"
  text: Control the volume of logs indexed by Datadog
---

## Overview

To access the processing panel use the left `Logs` menu:

{{< img src="logs/processing/processing_panel.png" alt="Pipelines panel" responsive="true" style="width:50%;" >}}

## Pipelines
### Pipelines Goal

**A processing pipeline takes a filtered subset of incoming logs and applies over them a list of sequential processors.**

Datadog automatically parses JSON-formatted logs. When your logs are not JSON-formatted, Datadog enables you to add value to your raw logs by sending them through a processing pipeline.

With pipelines, you parse and enrich your logs by chaining them sequentially through [processors](#processors). This lets you extract meaningful information or attributes from semi-structured text to reuse them as [facets][1].

Each log that comes through the pipelines is tested against every pipeline filter. If it matches one then all the [processors](#processors) are applied sequentially before moving to the next pipeline.

So for instance a processing pipeline can transform this log:

{{< img src="logs/processing/original_log.png" alt="original log" responsive="true" style="width:50%;">}}

into this log:

{{< img src="logs/processing/log_post_severity.png" alt=" Log post severity " responsive="true" style="width:50%;">}}

With one single pipeline:

{{< img src="logs/processing/pipeline_example.png" alt="Pipelines example" responsive="true" style="width:75%;">}}

Pipelines take logs from a wide variety of formats and translate them into a common format in Datadog.

For instance, a first pipeline can be defined to extract application log prefix and then each team is free to define their own pipeline to process the rest of the log message.

### Pipeline filters

Filters let you limit what kinds of logs a pipeline applies to.

The filter syntax is the same as the [search bar][2].

**Be aware that the pipeline filtering is applied before any of the pipeline's processors, hence you cannot filter on an attribute that is extracted in the pipeline itself** 

The logstream shows which logs your pipeline applies to:

{{< img src="logs/processing/pipeline_filters.png" alt="Pipelines filters" responsive="true" style="width:80%;">}}

### Integration Pipelines

These pipelines are read-only, but you can clone them and then edit the clone:

{{< img src="logs/processing/cloning_pipeline.png" alt="Cloning pipeline" responsive="true" style="width:80%;">}}

## Processors

A processor executes within a [pipeline](#processing-pipelines) a data-structuring action ([Remapping an attribute](#attribute-remapper), [Grok parsing](#grok-parser)...) on a log.

The different kinds of processors are explained below.

### Grok Parser

Create custom grok rules to parse the full message or a specific attribute of your raw event:

{{< img src="logs/processing/parser.png" alt="Parser" responsive="true" style="width:80%;" >}}

Read more about this in the [parsing section][3]

### Log Date Remapper

As Datadog receives logs, it timestamps them using the value(s) from any of these default attributes:

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

If your logs put their dates in an attribute not in this list, use the log date Remapper processor to define their date attribute as the official log timestamp:

{{< img src="logs/processing/log_date_remapper.png" alt="Log date Remapper" responsive="true" style="width:80%;" >}}

If your logs don't contain any of the default attributes and you haven't defined your own date attribute, Datadog timestamps the logs with the date it received them.  
If the log's official timestamp is from a custom attribute, use a [date remapper processor][4] to override the log's default timestamp.

### Log Status Remapper

Use this processor if you want to assign some attributes as the official status, just enter the attribute path in the processor tile as follow:

{{< img src="logs/processing/severity_remapper_processor_tile.png" alt="Severity Remapper processor tile" responsive="true" style="width:80%;" >}}

It transforms this log:

{{< img src="logs/processing/log_pre_severity.png" alt=" Log pre severity " responsive="true" style="width:40%;">}}

Into this log:

{{< img src="logs/processing/log_post_severity_bis.png" alt=" Log post severity bis" responsive="true" style="width:40%;" >}}

However, beware that each incoming status value is mapped as follows:

* Integers from 0 to 7 map to the [Syslog severity standards][5]
* Strings beginning with **emerg** or **f** (case-insensitive) map to **emerg (0)**
* Strings beginning with **a** (case-insensitive) map to **alert (1)**
* Strings beginning with **c** (case-insensitive) map to **critical (2)**
* Strings beginning with **err** (case-insensitive) map to **error (3)**
* Strings beginning with **w** (case-insensitive) map to **warning (4)**
* Strings beginning with **n** (case-insensitive) map to **notice (5)**
* Strings beginning with **i** (case-insensitive) map to **info (6)**
* Strings beginning with **d**, **trace** or **verbose** (case-insensitive) map to **debug (7)**
* Strings matching **OK** or **Sucess** (case-insensitive) map to **OK**
* All others map to **info (6)**

### Remapper

This processor remaps any source attribute(s) or tag to another target attribute or tag, for instance here it remaps `user` to `user.firstname`

{{< img src="logs/processing/attribute_remapper_processor_tile.png" alt="Attribute Remapper processor tile" responsive="true" style="width:80%;" >}}

It transforms this log:

{{< img src="logs/processing/attribute_pre_remapping.png" alt="attribute pre remapping " responsive="true" style="width:40%;">}}

Into this log:

{{< img src="logs/processing/attribute_post_remapping.png" alt="attribute post remapping " responsive="true" style="width:40%;">}}

Constraints on the tag/attribute name are explained in the [Tag Best Practice documentation][6]. Some additional constraints are applied as `:`, `/` or `,` are not allowed in the target tag/attribute name.

### URL Parser

This processor extracts query parameters and other important parameters from a URL. To use it, just enter the source attribute of your url:

These settings:

{{< img src="logs/processing/url_processor_tile.png" alt="Url Processor Tile" responsive="true" style="width:80%;" >}}

Give the following results:

{{< img src="logs/processing/url_processor.png" alt="Url Processor" responsive="true" style="width:80%;" >}}

### Useragent parser

UserAgent parser takes a useragent attribute and does its best to extract the OS, browser, device, etc...
It recognizes major bots like the Google Bot, Yahoo Slurp, Bing and others.

If your logs contain encoded useragents (as, for example, IIS logs do), configure this processor to **decode the URL** before parsing it.

These settings:

{{< img src="logs/processing/useragent_processor_tile.png" alt="Useragent processor tile" responsive="true" style="width:80%;" >}}

Give the following results:

{{< img src="logs/processing/useragent_processor.png" alt="Useragent processor" responsive="true" style="width:80%;">}}

### Category Processor

Use the Category Processor to add a new attribute (without space or special characters in the new attribute name) to a log matching a provided search query.
Categories are very useful to create meaningful groups which can be used in any analytical view (e.g. URL groups, Machine groups, environments, response time buckets, etc....).

For example to categories your web access logs depending of the status code range value (2xx for a response code between 200 and 299, 3xx for a response code between 300 and 399, ...) add this processor:

{{< img src="logs/processing/category_processor.png" alt="Category processor" responsive="true" style="width:80%;" >}}

It produces the following result:

{{< img src="logs/processing/category_processor_result.png" alt="Category processor result" responsive="true" style="width:80%;" >}}

**Important Note**: The query can be done on any log attribute or tag no matter if it is a facet or not, wildcards can also be used inside your query.
Once the log has matched one of the processor query, it stops. Make sure they are properly ordered in case a log could match several queries.

### Log Message Remapper

The message is a key attribute in Datadog. It is displayed in the message column of the log explorer and you can do full string search on it. Use this processor to define some attributes as the official log message, just enter the attribute path in the processor tile as follows:

{{< img src="logs/processing/message_processor.png" alt="Message processor" responsive="true" style="width:80%;">}}

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

[1]: /logs/explore/#facets
[2]: /logs/explore/#search-bar
[3]: /logs/processing/parsing
[4]: /logs/processing/#log-date-remapper
[5]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[6]: https://docs.datadoghq.com/getting_started/tagging/#tags-best-practices
