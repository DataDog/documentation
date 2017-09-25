---
title: Processing
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: lognav
---

<div class="alert alert-info">
Datadog's log management is currently in private beta. If you would like to apply to it, please fill out <a href="https://www.datadoghq.com/log-management/">this form</a>.
</div>

## Overview

To access the processing panel use the upper left menu:
{{< img src="log/processing/processing_panel.png" alt="Pipelines pannel" >}}

Your processing view should look like this:
{{< img src="log/processing/processing_view.png" alt="Pipelines view" >}}

## Processing Pipelines 
### Pipelines Goal 

**A processing pipeline applies over a filtered subset of incoming logs a list of sequential processors.**

With pipelines, you can parse and enrich your logs by chaining them sequentially through [processors](#processors). This lets you extract meaningful information or attributes from semi-structured text to reuse them as [facets](/log/explore/#facets).

Each log that comes through the pipelines is tested against every pipeline filter. If it matches one then all the [processors](#processors) are applied sequentially before moving to the next pipeline.

So for instance a processing pipeline can transform this log:
{{< img src="log/processing/original_log.png" alt="original log" style="width:60%;" >}}

into this log: 

{{< img src="log/processing/log_post_severity.png" alt=" Log post severity " style="width:60%;">}}

With one single pipeline:

{{< img src="log/processing/pipeline_example.png" alt="Pipelines example" style="width:90%;">}}

Pipelines can take logs from a wide variety of formats and translate them all into a common format in Datadog.

### Pipeline filters

Filters let you limit what kinds of logs a pipeline will apply to.

The filter syntax is the same as the [search bar](/log/explore/#search-bar).

**Be aware that the pipeline filtering is applied before any pipeline processing, hence you cannot filter on an attribute that does not exist** 

The log list shows which logs your pipeline applies to:

{{< img src="log/processing/pipeline_filters.png" alt="Pipelines processor sketch" style="width:90%;">}}

### Integrations Pipelines

Integration pipelines are automatically installed when you activate an [integration](https://app.datadoghq.com/account/settings).

These pipelines are read-only, but you can clone them and then edit the clone:

{{< img src="log/processing/cloning_pipeline.png" alt="Cloning pipeline" >}}

## Processors

A processor executes within a [pipeline](#processing-pipelines) a well identified action ([Remapping an attribute](#attribute-remapper), [Grok parsing](#grok-parser)...) on a log.

The different kind of processors are explained below.

### Grok Parser

Create custom grok rules to parse the full message or a specific attribute of your raw event:

{{< img src="log/processing/parser.png" alt="Parser" >}}

Read more about this in the [parsing section](/log/parsing)

### Log Date Remapper 

As Datadog receives logs, it timestamps them using the value(s) from any of these default attributes:

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

If your logs put their dates in an attribute not in this list, use the log date remapper processor to define their date attribute as the official log timestamp:

{{< img src="log/processing/log_date_remapper.png" alt="Log date remapper" >}}

If your logs don't contain any of the default attributes and you haven't defined your own date attribute, Datadog timestamps the logs with the date it received them.

### Log Severity Remapper

Use this processor if you want to assign some attributes as the official severity, just enter the attribute path in the processor tile as follow:

{{< img src="log/processing/severity_remapper_processor_tile.png" alt="Severity remapper processor tile" >}}

It transforms this log:

{{< img src="log/processing/log_pre_severity.png" alt=" Log pre severity " style="width:60%;">}}

Into this log:

{{< img src="log/processing/log_post_severity_bis.png" alt=" Log post severity bis" style="width:60%;">}}

However, beware that each incoming severity value is mapped as follows:

* Integers from 0 to 7 map to the [syslog severity standards](https://en.wikipedia.org/wiki/Syslog#Severity_level)
* Strings beginning with **emerg** or **f** (case unsensitive) map to **emerg (0)**
* Strings beginning with **a** (case unsensitive) map to **alert (1)**
* Strings beginning with **c** (case unsensitive) map to **critical (2)**
* Strings beginning with **err** (case unsensitive) map to **error (3)**
* Strings beginning with **w** (case unsensitive) map to **warning (4)**
* Strings beginning with **n** (case unsensitive) map to **notice (5)**
* Strings beginning with **i** (case unsensitive) map to **info (6)**
* Strings beginning with **d**, **trace** or **verbose** (case unsensitive) map to **debug (7)**
* All others map to **info (6)**

### Attribute Remapper

This processor remaps any attribute(s) to another one, for instance here it remaps “user” to “user.firstname”

{{< img src="log/processing/attribute_remapper_processor_tile.png" alt="Attribute Remapper processor tile" >}}

It transforms this log:

{{< img src="log/processing/attribute_pre_remapping.png" alt="attribute pre remapping " style="width:60%;">}}

Into this log:
{{< img src="log/processing/attribute_post_remapping.png" alt="attribute post remapping " style="width:60%;">}}

### URL processor 

This processor extracts query params and other important parameter from a URL, just enter the source attribute of your url:
{{< img src="log/processing/url_processor.png" alt="Url Processor" >}}

### Useragent parser

UserAgent processor takes a useragent attribute and does its best to extract the OS, browser, device, etc...
It recognizes major bots like the Google Bot, Yahoo Slurp, Bing and others.

If your logs contain encoded useragents (as, for example, IIS logs do), configure this processor to **decode the URL** before parsing it.

These settings: 
{{< img src="log/processing/useragent_processor_tile.png" alt="Useragent processor tile" >}}

Give the following results:
{{< img src="log/processing/useragent_processor.png" alt="Useragent processor" >}}

## What's next

* Learn how to [explore your logs](/log/explore)
* Learn more about [parsing](/log/parsing)