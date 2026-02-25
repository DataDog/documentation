---
title: Processing Pipelines
description: Transform, normalize, and enrich span attributes after ingestion without modifying application code.
further_reading:
    - link: "/tracing/trace_pipeline/generate_metrics"
      tag: "Documentation"
      text: "Generate Custom Metrics from Spans"
    - link: "/tracing/trace_pipeline/trace_retention"
      tag: "Documentation"
      text: "Trace Retention"
    - link: "/tracing/troubleshooting/quantization"
      tag: "Documentation"
      text: "Quantization of APM Data"
    - link: "/security/sensitive_data_scanner"
      tag: "Documentation"
      text: "Sensitive Data Scanner"
    - link: "/tracing/services/service_remapping_rules"
      tag: "Documentation"
      text: "Service Remapping Rules"
---

{{< img src="/tracing/processing_pipelines/processing_pipelines_overview.jpg" alt="APM data flow diagram showing instrumented applications, ingestion sampling rules, Processing Pipelines, metrics from spans, retention filters, and indexed search" style="width:100%;">}}

APM Processing Pipelines let you transform, normalize, and enrich span attributes after ingestion and before storage, without modifying application code.

Use pipelines to:
- Standardize attribute naming across services
- Consolidate inconsistent keys into a single canonical attribute
- Extract structured data from string values

Processing Pipelines run in the Datadog backend and apply only to newly ingested spans. Each pipeline contains a filter query that defines which spans enter the pipeline, and one or more processors that define how to transform matching spans. It evaluates pipelines in order from top to bottom.

## Create a pipeline

To create a pipeline:

1. Navigate to [**APM > Settings > Pipelines**][1].
2. Click **Add Pipeline**.
3. Define a filter query using [query syntax][2]. The pipeline only processes spans matching this filter.
4. Name the pipeline.
5. Click **Enable**.

{{< img src="/tracing/processing_pipelines/create_pipeline.png" alt="The new pipeline dialog with a filter query field, a live preview table of matching spans, and a pipeline name field" style="width:100%;">}}

## Manage pipelines

From the [Pipelines][1] page, you can:

- Enable or disable individual pipelines
- Reorder pipelines by dragging them
- Edit pipelines in draft mode
- Restrict access with [RBAC][3]

Disabling a pipeline stops it from processing newly ingested spans. It does not retroactively modify previously stored spans.

{{< img src="/tracing/processing_pipelines/manage_pipelines.png" alt="The Processing Pipelines list showing three active pipelines with their filter queries and management controls" style="width:100%;">}}

## Processors

Processors define the transformations applied to matching spans. Within a pipeline, processors run sequentially. Attribute changes from one processor apply to all downstream processors in the same pipeline. To add a processor, expand a pipeline and click **Add Processor**.

<div class="alert alert-info">Processors can only be applied to <a href="/tracing/trace_explorer/span_tags_attributes/">span attributes, not span tags</a>.</div>

### Remapper processor

The Remapper processor renames, merges, or removes span attributes to enforce consistent attribute naming across services. It modifies attribute keys, but *does not* extract new data from attribute values. To extract data from values, use the [Parser processor](#parser-processor).

The system attributes `env`, `service`, `resource_name`, `operation_name`, and `@duration` cannot be remapped. If you rename or remove attributes used in dashboards, monitors, or retention filters, update the affected dashboards, monitors, and retention filters accordingly.

For example, different services may emit `http.route`, `http.path`, or `http.target` for the same logical field. Use the Remapper to map all three to `http.route` so that every matching span contains a single, standardized attribute.

{{< img src="/tracing/processing_pipelines/remapper_processor.png" alt="The Remapper processor configuration showing source attributes http.path and http.target mapped to a target attribute http.route, with a preview of matched spans" style="width:100%;">}}

### Parser processor

The Parser processor extracts structured attributes from existing span attribute values using [Grok parsing rules][4]. It uses the same Grok syntax as [Log Management parsing][4], including all matchers and filters. Unlike the Remapper, the Parser creates new attributes based on parsed content. Use it to transform semi-structured text stored in span attributes into searchable, structured attributes. To rename or consolidate attribute keys, use the [Remapper processor](#remapper-processor) instead.

To configure Grok parsing rules:

1. **Define the parsing attribute and samples**: Select the attribute that you want to parse, and add sample data for the selected attribute.
2. **Define parsing rules**: Write your parsing rules in the rule editor.
3. **Preview parsing**: Select a sample to evaluate it against the parsing rules. All samples show a status (`match` or `no match`) indicating whether one of the Grok rules matches the sample.

{{< img src="/tracing/processing_pipelines/parser_processor.png" alt="The Parser processor configuration showing sample attribute values with match status, a Grok parsing rule editor, and a parsed output preview" style="width:100%;">}}

When multiple Grok rules match the same sample, only the first matching rule is applied.

## Execution flow

Processing Pipelines run at a specific point in the span processing life cycle:

1. Spans are ingested.
2. Datadog enrichments are applied (infrastructure, CI, source code metadata).
3. Processing Pipelines run.
4. Retention filters and metrics from spans are computed.
5. Spans are stored and indexed.

## Preprocessed attributes

Datadog preprocesses some span attributes before pipelines run. For example, [Quantization of APM Data][5] normalizes resource names by default and cannot be disabled. You can define additional pipelines if you need further customization of these attributes.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/pipelines
[2]: /tracing/trace_explorer/query_syntax/
[3]: /account_management/rbac/
[4]: /logs/log_configuration/parsing/
[5]: /tracing/troubleshooting/quantization/
