---
title: Pipeline
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: lognav
---

## Pipelines 

A pipeline is a chain of processors that is applied on every log matching the pipeline filter. 

This subset is defined thanks to the pipeline filter.
When installing an integration, we automatically install the corresponding pipeline

## Processors

### Log Severity Remapper

if the severity is actually defined in another attribute of your log
### Log Date Remapper 

otherwise the default will be the reception time of the log

### Attribute Remapper

remap any attribute to another (for instance remap “user_id” to “user.id”)
User-Agent Parser: extract all values from an useragent


### URL processor 

extract query params and other important parameter of an url

### Parser

create custom rules to parse the full message or a specific attribute
