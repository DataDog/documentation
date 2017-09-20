---
title: Processing
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: lognav
---

<div class="alert alert-info">
Datadog's log management solution is is currently in private beta. If you would like to apply to it, please fill out <a href="https://www.datadoghq.com/log-management/">this form</a>.
</div>

## Overview

To access the processing panel please use the upper left menu:
{{< img src="log/processing/pipelines_panel.png" alt="Pipelines pannel" >}}

Your processing view should look like this:
{{< img src="log/processing/pipelines_view.png" alt="Pipelines view" >}}

## Processing Pipelines 
### Pipelines Goal 

**A processing pipeline applies over a filtered subset of incoming logs a list of sequential processors.**

With pipelines you have the opportunity to parse & enrich your logs through a sequential chains of [processors](/log/processing/#processors) in order to extract meaningful information or to extract attributes from semi-structured text to re-use them as [facet](/log/explore/#facets).

Each log that comes through the pipelines is tested against every pipeline filter. If it matches one then all the [processors](#processors) are applied sequentially before moving to the next pipeline.

So for instance a processing pipeline can transform this log:
{{< highlight json >}}
{
"message":"john clicked on a link : www.datadoghq.com for app dd_app",
"hostname":"host_1",
"level":"info"
}
{{</ highlight >}}

into this log: 

{{< highlight json >}}
{
"user":"john",
"url":"www.datadoghq.com",
"appname":"dd_app",
"message":"clicked on a link",
"hostname":"host_1",
"severity":"info"
}
{{< /highlight >}}

With one single pipeline as follow:

{{< img src="log/processing/pipeline_processors_sketch.png" alt="Pipelines processor sketch" style="width:90%;">}}

Pipelines are also able to take all your logs whatever they source and transform them to handle a unifed and structured format on Datadog.

For instance, in the following example we have at the begining 3 differents raw logs:

{{< img src="log/processing/multi_source_sketch.png" alt="Multi source sketch" >}}

and at the end we have the same information, but with more coherence that allow a better usability.

### Pipeline filters

Attach a filter to your pipeline in order to apply it only to a subset of your logs. 

The filter syntax is the same as the [search bar](/log/explore/#search-bar).

** Be aware that the pipeline filtering is applied before any pipeline processing, hence you can not filter on an attribute that does not exists** 

Check to wich subset of logs your pipeline is applied to in the log list displayed: 

{{< img src="log/processing/pipeline_filters.png" alt="Pipelines processor sketch" style="width:90%;">}}

### Integrations Pipelines

Integration pipelines are automatically installed when you activate an [integration](https://app.datadoghq.com/account/settings)

Those pipeline are read-only but can be cloned for further customisation:

{{< img src="log/processing/cloning_pipeline.png" alt="Cloning pipeline" >}}

## Processors

**A processor executes a well identified action on a log most often related to parsing & enrichment.**

The different kind of processors are explained below.

### Grok Parser

Create custom grok rules to parse the full message or a specific attribute of your raw event:

{{< img src="log/processing/parser.png" alt="Parser" >}}

Find more about this in our dedicated [parsing section](/log/parsing)

### Log Date Remapper 

By default (as explained [here](/log/#the-date-attribute)) Datadog has a couple of reserved attributes that are, by default, considered as the date reference for the main timeline.

However, if you have your own date attribute that does not belong to this list, define it as the official log timestamp with the log date remapper processor:
{{< img src="log/processing/log_date_remapper.png" alt="Log date remapper" >}}

Otherwise the default timestamp is the reception time of the log by the Datadog intake API.

### Log Severity Remapper

Use this processor if you want to assign some attributes as the official severity, just enter the attribute path in the processor tile as follow:

{{< img src="log/processing/severity_remapper_processor_tile.png" alt="Severity remapper processor tile" >}}

It transforms this log:
{{< highlight json >}}
{
"message":"john clicked on a link : www.datadoghq.com for app dd_app",
"hostname":"host_1",
"level":"info"
}
{{< /highlight >}}

Into this log:
{{< highlight json >}}
{
"message":"john clicked on a link : www.datadoghq.com for app dd_app",
"hostname":"host_1",
"severity":"info"
}
{{< /highlight >}}

However, beware that each incoming severity value is mapped as follows:

* If this is an integer from 0 to 7 we map it to the [syslog severity standards](https://en.wikipedia.org/wiki/Syslog#Severity_level)
* If it starts with emerg or fatal (case unsensitive) we map it to emerg (0)
* If it starts with alert (case unsensitive) we map it to alert (1)
* If it starts with crit (case unsensitive) we map it to crit (2)
* If it starts with err (case unsensitive) we map it to err (3)
* If it starts with warn (case unsensitive) we map it to warning (4)
* If it starts with notice (case unsensitive) we map it to notice (5)
* If it starts with info (case unsensitive) we map it to info (6)
* If it starts with debug, trace or verbose (case unsensitive) we map it to debug (7)
* Any other condition, we map it to info (6)

### Attribute Remapper

This processor remaps any attribute(s) to another one, 
for instance here it remaps “user_id” to “user.id”

{{< img src="log/processing/attribute_remapper_processor_tile.png" alt="Attribute remapper processor tile" >}}

It transforms this log:
{{< highlight json >}}
{
"message":"john clicked on a link : www.datadoghq.com for app dd_app",
"hostname":"host_1",
"severity":"info",
"my":{
    "source":{
        "attribute":"this is some good attribute value"
            }
    }
}
{{< /highlight >}}
Into this log:
{{< highlight json >}}
{
"message":"john clicked on a link : www.datadoghq.com for app dd_app",
"hostname":"host_1",
"severity":"info",
"my":{
    "target":{
        "attribute":"this is some good attribute value"
        }
    }
}
{{< /highlight >}}

### URL processor 

This processor extracts query params and other important parameter from an url, just enter the source attribute of your url:
{{< img src="log/processing/url_processor.png" alt="Url Processor" >}}

### Useragent parser

UserAgent processor takes a useragent attribute and does its best to extract all the meaningful information the OS, the browser and the device.
It is also able to recognize the main bots like the Google Bot, Yahoo Slurp, Bing and others.

Some servers or systems (such as IIS) encode useragents, if so ask this processor to **Apply a URL decode first** before parsing it.

This settings: 
{{< img src="log/processing/useragent_processor_tile.png" alt="Useragent processor tile" >}}

Give the following results:
{{< img src="log/processing/useragent_processor.png" alt="Useragent processor" >}}

## What's next

* Learn how to explore your logs [here](/log/explore)
* Learn more about parsing [here](/log/parsing)