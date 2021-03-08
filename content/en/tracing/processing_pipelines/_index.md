---
title: Span Processing Pipelines
kind: documentation
description: 'Enrich span metadata with processing pipelines.'
further_reading:
    - link: 'tracing/trace_retention_and_ingestion'
      tag: "Documentation"
      text: 'Customize trace ingestion and retain important traces.'
    - link: 'tracing/trace_search_and_analytics/query_syntax'
      tag: "Documentation"
      text: 'Use Analytics queries and monitors based on retained traces.'
---
<div class="alert alert-warning">
This feature is currently in private beta. <a href="https://docs.google.com/forms/d/1RlT0FNdFjiEzkQgxiCf77ugpW0w5a17X7JQ7E286jM4">Fill out this form</a> to request this feature for your account or to be notified when it becomes generally available.
</div>

## Overview

Span Processing Pipelines are an optional configuration that can be added to your APM setup to modify or enrich metadata for use in [Trace Search and Analytics][1], [Dashboards][2], or [Monitors][3].  Currently there are two main types of modification possible through [arithmetic processors](#arithmetic-processor) and [lookup processors](#lookup-processor).  If you have a use case not covered by the existing processor options, [reach out to our support team][4] with details to have a feature request created.

1. A [Pipeline](#pipelines) takes a filtered subset of incoming spans and applies a list of sequential processors.
2. A [Processor](#processors) executes within a Pipeline to complete a data-structuring action (arithmetic computation, tag enrichment, etc.) on a span.

Pipelines and Processors are applied to all ingested spans, meaning all configuration is done on the [Pipelines][5] page within the Datadog UI.

Use [arithmetic processors](#arithmetic-processor) to change the units of an existing tag or create a new tag based on a formulaic calculation.  Use [lookup processors](#lookup-processor) to add tags based on the key of a row in your [enrichment table][6] without needing to store these values in your code.

## Pipelines

Pipelines allow you to parse and enrich your trace spans by chaining them sequentially through processors. This lets you extract meaningful information or attributes from semi-structured text to reuse them as facets.

All ingested spans that come through Pipelines are tested against every Pipeline filter. If it matches one then all processors within that pipeline are applied sequentially before the span is processed by the next pipeline.

### Pipeline Filters

Filters let you define and limit what kinds of spans a Pipeline applies to. The syntax is the same as when writing a [search query][7] or [retention filter][8].  Common choices for

**Note:** Filtering is applied before any of the Pipeline’s Processors, hence you cannot filter on an attribute that is yet-to-be-created in the pipeline.

### Nested Pipelines

Nested Pipelines are pipelines created within a pipeline. Use Nested Pipelines to split the processing into two steps. For example, first use a high-level filtering such as `env` and add common processors, and then a second level of filtering based on `service`, or any other tag or attribute and their custom processors.

**Note:** It is only possible to have a single layer of nested pipelines.  Within a nested pipeline, only processors can be created.

## Processors

A processor executes within a pipeline to complete a data-structuring action (arithmetic computation, tag enrichment, etc.) on a trace span.

### Arithmetic processor

{{< img src="tracing/processing_pipelines/arithmeticprocessor.png" style="width:100%;" alt="How to create an arithmetic processor" >}}

Use arithmetic processors to add new attributes (without spaces or special characters in the new attribute names) to a span with the result of user-provided formulas. This enables you to remap different time attributes with different units into a single attribute, or to compute operations on attributes within the same span.

Arithmetic processors must follow the below rules:

1. Formulas can use parentheses and the basic arithmetic operators: `-`, `+`, `*`, and `/`.
2. Attributes must be prefixed with `@` when used in formulas.
3. By default, the calculation is skipped if an attribute is not present on the span, or if it cannot be parsed as a number.
4. If desired, select the option “Replace missing attribute by 0” to automatically populate missing attribute values with 0 to ensure that the calculation is done.
5. If using `-` as an operator, it must be used with a space on either side like `a - b`, as `-` can also exist in attribute names.
6. If the target attribute already exists, it is overwritten by the result of the formula.
7. Results are rounded up to the 9th decimal. For example, if the result of the formula is 0.1234567891, the actual value stored for the attribute is 0.123456789.

### Lookup Processor

{{< img src="tracing/processing_pipelines/lookupprocessor.png" style="width:100%;" alt="How to create a lookup processor" >}}

Lookup processors allow you to define a mapping between a span attribute and human readable values saved in an Enrichment Table (BETA).

For example, you can use the Lookup Processor to map an internal service ID into a human readable service name or store an ID value associated with address and other personal data that is either subject to frequent changes or shouldn't be set within application code. Alternatively, use a lookup processor to check if the MAC address that just attempted to connect to the production environment belongs to your list of stolen machines.

The Lookup processor performs the following actions:

1. Looks if the span contains the source attribute.
2. Checks if the source attribute value exists in the mapping table.
3. If it does, creates the target attribute with the corresponding value in the table.
4. If the target attribute already exists, it is overwritten by the result of the formula.
5. Optionally, if a lookup processor does not find the source attribute value in the mapping table, creates a target attribute with the fixed default value.

### Enrichment tables

This feature is shared with our Log Management solution. For more information on how to create an enrichment table, see the [detailed guide][6].


[1]: /tracing/trace_search_and_analytics/
[2]: /dashboards/
[3]: /monitors/monitor_types/apm/?tab=apmmetrics
[4]: /help
[5]: https://app.datadoghq.com/apm/traces/pipelines
[6]: /logs/guide/enrichment-tables/?tab=manualupload#overview
[7]: /tracing/trace_search_and_analytics/query_syntax/
[8]: /tracing/trace_retention_and_ingestion/#retention-filters
