---
title: Pipeline
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: lognav
---
<div class="alert alert-info">
Datadog's log management solution is actualy in private beta. If you'd like to apply to participate in the private beta, please fill out <a href="https://www.datadoghq.com/log-management/">this form</a>.
</div>

## Overview

To access the pipeline panel please use the upper left menu:
{{< img src="log/pipeline/pipelines_panel.png" alt="Pipelines pannel" >}}

Your pipeline view should look like this:
{{< img src="log/pipeline/pipelines_view.png" alt="Pipelines view" >}}

## Pipelines 

**A pipeline is a chain of processors that is applied on every log matching the pipeline filter**. 

Please note that When installing an integration, we automatically install the corresponding pipeline.

## Processors
A Processor describe an action done on a raw event attribute.

Processors available currently are: 

### Grok Parser

Create custom grok rules to parse the full message or a specific attribute of your raw event:

{{< img src="log/pipeline/parser.png" alt="Parser" >}}

Find more about this in our dedicated [parsing section](/log/parsing)

### Useragent processor

UserAgent processor will take a useragent and extract its meaningful informations.
It is also able to recognize the main bots like the Google Bot, Yahoo Slurp, Bing and others.

Some servers or systems (such as IIS) encode useragents, that's why you can ask this processor to **Apply a URL decode first** before parsing it.

This settings: 
{{< img src="log/pipeline/useragent_processor_tile.png" alt="Useragent processor tile" >}}

Give the following results:
{{< img src="log/pipeline/useragent_processor.png" alt="Useragent processor" >}}

### Log Date Remapper 

By default and as explained [here](/log/#the-date-attribute) your Datadog application has a couple of reserved attributes that are, by default, considered as the date reference for the main timeline.

However, if you have your own date attribute that does not belong to this list, you can define it as the offical log timestamp with the log date remapper processor:
{{< img src="log/pipeline/log_date_remapper.png" alt="Log date remapper" >}}

Otherwise the default will be the reception time of the log

### Log Severity Remapper

This processor allow you to define any attribute(s) of your log as the offical severity for this log, just enter the attribute path in the processor tile as follow:
{{< img src="log/pipeline/severity_remapper_processor_tile.png" alt="Severity remapper processor tile" >}}

### Attribute Remapper

This processor remaps any attribute(s) to another one, 
for instance you can remap “user_id” to “user.id”

{{< img src="log/pipeline/attribute_remapper_processor_tile.png" alt="Attribute remapper processor tile" >}}

### URL processor 

This processor extracts query params and other important parameter from an url, just enter the source attribute of your url:
{{< img src="log/pipeline/url_processor.png" alt="Url Processor" >}}

## What's next

* Learn how to explore your logs [here](/log/explore)
* Learn more about parsing [here](/log/parsing)