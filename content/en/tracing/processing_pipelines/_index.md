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
This feature is currently in private beta. <a href="https://forms.gle/6hHcytp2JvBAHxC6A">Fill out this form</a> to request this feature for your account or to be notified when it becomes generally available.
</div>

Span Processing Pipelines are an optional way you can configure your APM setup so that collected metadata is modified or enriched for use in [Trace Search and Analytics][1], [Dashboards][2], or [Monitors][3]. Span processing involves two constructs: _pipelines_ and _processors_:

1. A [pipeline](#pipelines) takes a filtered subset of incoming spans and applies a list of sequential processors.
2. A [processor](#processors) executes within a pipeline to complete a data-structuring action (such as arithmetic computation or tag enrichment) on a span.

Pipelines and processors are applied to all ingested spans, and you can configuration them on the [Pipelines][4] page within the Datadog app.

There are two types of processors, enabling two types of modification: 

- Use [arithmetic processors](#arithmetic-processor) to change the units of an existing tag or to create a new tag based on a formulaic calculation.
- Use [lookup processors](#lookup-processor) to add tags based on the key of a row in your [enrichment table][5] without needing to store these values in your code.

If you have a use case not covered by the existing processor options, [reach out to our support team][6] with details to have a feature request created.

{{< img src="tracing/processing_pipelines/ProcessingPipelines.png" style="width:100%;" alt="Pipelines, filters, and processors in the Datadog App" >}}

## Pipelines

Pipelines allow you to parse and enrich your trace spans by passing them sequentially through processors. This lets you extract meaningful information or attributes from semi-structured text to reuse them as facets.

Each ingested span that comes through pipelines is tested against every pipeline filter. If the span matches a filter, all processors within that pipeline are applied sequentially before the span is processed by the next pipeline.

### Pipeline filters

Filters let you define and limit what kinds of spans a pipeline applies to. The syntax is the same as when writing a [search query][7] or [retention filter][8].

**Note:** Filtering is applied before any of the pipeline’s processors, so you cannot filter on an attribute that is yet-to-be-created in the pipeline.

### Nested pipelines

_Nested pipelines_ are pipelines created within a pipeline. Use nested pipelines to split the processing into separate steps. For example, first use a high-level filtering such as `env` and add common processors, and then a second level of filtering based on `service`, or any other tag or attribute and their custom processors.

**Note:** You can nest pipelines only one level deep. Within a nested pipeline, you can create processors, but not additional nested pipelines.

## Processors

A processor executes within a pipeline to complete a data-structuring action, such as arithmetic computation or tag enrichment, on a trace span.

### Arithmetic processor

{{< img src="tracing/processing_pipelines/arithmeticprocessor.png" style="width:100%;" alt="How to create an arithmetic processor" >}}

With arithmetic processors, you can:
- Add new attributes to a span with values that are the calculated result of a formula that you define. Added attribute names must not contain spaces or special characters.
- Remap different time attributes with different units into a single attribute.
- Compute operations on attributes within the same span.

Arithmetic processors follow these rules:

1. Formulas can use parentheses and the basic arithmetic operators: `-`, `+`, `*`, and `/`.
2. In the formula, prefix attributes names with `@`.
3. By default, if the formula references an attribute that is not present on a span, or if it cannot be parsed as a number, the processor is skipped for the span. However, you can change this behavior by selecting **Replace missing attribute by 0**, and the formula will used `0` for any missing attribute values, to ensure that the calculation is done.
5. If you use `-` as an operator, put a space on either side, as in `a - b`, because `-` can also exist in attribute names.
6. If the target attribute already exists, its value is overwritten by the result of the formula.
7. Results are rounded up to the ninth decimal place. For example, if the result of the formula is `0.1234567891`, the actual value stored for the attribute is `0.123456789`.

### Lookup Processor

{{< img src="tracing/processing_pipelines/lookupprocessor.png" style="width:100%;" alt="How to create a lookup processor" >}}

Lookup processors allow you to define a mapping between a span attribute and human readable values saved in an [Enrichment Table](#enrichment-tables).  The Enrichment Tables feature is also in beta.

For example, with a lookup processor you can:
- Map an internal service ID into a human readable service name.
- Store an ID value associated with address and other personal data that is either subject to frequent changes or shouldn't be set within application code.
- Check if the MAC address that just attempted to connect to the production environment belongs to your list of stolen machines.

A lookup processor performs the following actions:

1. Looks to see if the span contains the source attribute.
2. Checks if the source attribute value exists in the mapping table, and if it does, either:
    - Creates the a span attribute with the corresponding value from the table; or
    - Overwrites the span's existing attribute with the value from the table.
6. Optionally, if a lookup processor does not find the source attribute value in the mapping table, creates a target attribute with the fixed default value.

As with arithmetic processors, attributes in lookup processors must be prefixed with `@` when used in formulas.

#### Enrichment tables

Enrichment tables is beta feature shared with Log Management. For more information on how to create an enrichment table and to request access, see the [detailed guide][5].

**Note:** You needn't be using Datadog Log Management to obtain access to the enrichment table beta.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/trace_search_and_analytics/
[2]: /dashboards/
[3]: /monitors/monitor_types/apm/?tab=apmmetrics
[4]: https://app.datadoghq.com/apm/traces/pipelines
[5]: /logs/guide/enrichment-tables/?tab=manualupload#overview
[6]: /help
[7]: /tracing/trace_search_and_analytics/query_syntax/
[8]: /tracing/trace_retention_and_ingestion/#retention-filters
