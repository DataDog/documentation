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

A pipeline is a chain of processors that is applied on every log matching the pipeline filter. 

This subset is defined thanks to the pipeline filter.
When installing an integration, we automatically install the corresponding pipeline

## Processors
A Processor describe an action done on a raw event attribute.

### Log Date Remapper 
///////////
////////// To add list of reserved attributes in the index
///////////
By default and as explained [here]() has a couple of reserved attributes that are, by default, considered as the date reference for the main timeline.

However, if you have your own date attribute that does not belong to this list, you can define it as the offical log time stamp with the log date remapper processor:
{{< img src="log/pipeline/log_date_remapper.png" alt="Log date remapper" >}}

Otherwise the default will be the reception time of the log

### Log Severity Remapper

If the severity is actually defined in another attribute of your log

### Attribute Remapper

Remap any attribute to another (for instance remap “user_id” to “user.id”)

### Useragent processor
{{< img src="log/pipeline/useragent_processor.png" alt="Useragent processor" >}}

### URL processor 

Extract query params and other important parameter of an url:
{{< img src="log/pipeline/url_processor.png" alt="Url Processor" >}}

### Parser

Create custom rules to parse the full message or a specific attribute
{{< img src="log/pipeline/parser.png" alt="Parser" >}}
