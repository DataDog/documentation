---
title: Processors
description: "Parse and enrich your logs with processors"
# aliases:
#   - /logs/processing/processors/
further_reading:
- link: "/logs/log_configuration/pipelines/"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/logs/log_configuration/parsing/"
  tag: "Documentation"
  text: "Parsing logs"
- link: "/logs/log_configuration/attributes_naming_convention/"
  tag: "Documentation"
  text: "Attributes and aliasing"
- link: "https://learn.datadoghq.com/courses/log-pipelines"
  tag: "Learning Center"
  text: "Try the Log Pipelines course in the Learning Center"
---

## Overview

<div class="alert alert-info">The processors outlined in this documentation are specific to cloud-based logging environments. To parse, structure, and enrich on-premises logs, see <a href="https://docs.datadoghq.com/observability_pipelines/processors/">Observability Pipelines</a>.</div>

Processors are the building blocks of log processing in Datadog. A processor executes within a [pipeline][1] to complete a data-structuring action and generate attributes to enrich your logs. Processors transform raw, unstructured log data into structured, queryable attributes that can be used for searching, filtering, analytics, and monitoring.

When logs flow through a pipeline, each processor is applied sequentially to extract information, remap values, enrich data, or perform transformations. This allows you to:

- **Parse unstructured text** into structured attributes
- **Standardize attribute names** across different log sources
- **Enrich logs** with additional context (geo-location, device information, etc.)
- **Transform values** through arithmetic operations or string manipulation
- **Normalize data** to follow your organization's [attribute naming convention][2]

## How processors work

Processors operate within pipelines and are executed in order from top to bottom. When a log enters a pipeline:

1. The log is tested against the pipeline's filter
2. If it matches, each processor in the pipeline is applied sequentially
3. Each processor performs its specific transformation on the log
4. The enriched log continues to the next processor or pipeline

<!-- {{< img src="logs/log_configuration/processor/processor_flow.png" alt="Processor flow diagram" style="width:80%;" >}} -->

Processors run in **sequential execution**, meaning they operate in the order they appear in the pipeline—the output of one processor becomes the input for the next. You can configure processors for **conditional processing** so they only run when certain conditions are met. Most processors perform **non-destructive operations**, adding new attributes without removing existing data.

<div class="alert alert-tip">For optimal performance, Datadog recommends using at most 20 processors per pipeline.
</div>

## When to use processors

Use processors to address common log management challenges:

| Challenge | Solution | Recommended Processors |
|:----------|:---------|:----------------------|
| Logs are unstructured text | Extract structured data from raw messages | [Grok Parser][3], [URL Parser][4], [User-Agent Parser][5] |
| Attribute names vary across sources | Standardize attribute names | [Remapper][6], [Service Remapper][7], [Date Remapper][8] |
| Missing timestamp or incorrect timezone | Set the official log timestamp | [Date Remapper][8] |
| Need to categorize logs | Add labels based on log content | [Category Processor][9] |
| Missing calculated metrics | Perform calculations on log attributes | [Arithmetic Processor][10] |
| Need geo-location data | Extract location from IP addresses | [GeoIP Parser][11] |
| Connect logs to traces | Link logs with distributed traces | [Trace Remapper][12], [Span Remapper][13] |

## Get started

To add a processor to a pipeline:

1. Navigate to [**Logs** > **Configuration** > **Pipelines**][14] in Datadog.
2. Select an existing pipeline or create a new one.
3. Click **Add Processor**.
4. Choose the processor type that matches your use case.
5. Configure the processor settings and add sample logs to test.
6. Click **Save**.

<!-- {{< img src="logs/log_configuration/processor/add_processor.png" alt="Add processor to pipeline" style="width:80%;" >}} -->

### Best practices

- **Start with parsing**: Use [Grok Parser][3] to extract structured data from raw logs before applying other processors.
- **Test with samples**: Always add sample logs to verify that your processor works as expected.
- **Use Standard Attributes**: Remap custom attributes to [Standard Attributes][15] for consistent querying across sources.
- **Chain processors logically**: Order processors so that each builds on the previous one's output.
- **Keep it simple**: Use no more than 10 parsing rules within a Grok processor and 20 processors per pipeline.
- **Name processors clearly**: Use descriptive names that explain what each processor does.

## Processor types

{{< whatsnext desc="Choose your processor type:">}}
{{< nextlink href="/logs/processors/grok_parser" >}}<u>Grok Parser</u>: Create custom grok rules to parse the full message or a specific attribute of your raw event.{{< /nextlink >}}
{{< nextlink href="/logs/processors/date_remapper" >}}<u>Log Date Remapper</u>: Define a date attribute as the official log timestamp.{{< /nextlink >}}
{{< nextlink href="/logs/processors/status_remapper" >}}<u>Log Status Remapper</u>: Assign attributes as an official status to your logs.{{< /nextlink >}}
{{< nextlink href="/logs/processors/service_remapper" >}}<u>Service Remapper</u>: Assign one or more attributes as the official service.{{< /nextlink >}}
{{< nextlink href="/logs/processors/message_remapper" >}}<u>Log Message Remapper</u>: Define one or more attributes as the official log message.{{< /nextlink >}}
{{< nextlink href="/logs/processors/attribute_remapper" >}}<u>Remapper</u>: Remap any source attribute(s) or tags to another target attribute or tag.{{< /nextlink >}}
{{< nextlink href="/logs/processors/url_parser" >}}<u>URL Parser</u>: Extract query parameters and other important parameters from a URL.{{< /nextlink >}}
{{< nextlink href="/logs/processors/user_agent_parser" >}}<u>User-Agent Parser</u>: Extract OS, browser, device, and other user data from a user-agent attribute.{{< /nextlink >}}
{{< nextlink href="/logs/processors/category_processor" >}}<u>Category Processor</u>: Add a new attribute to a log matching a provided search query.{{< /nextlink >}}
{{< nextlink href="/logs/processors/arithmetic_processor" >}}<u>Arithmetic Processor</u>: Add a new attribute with the result of a mathematical formula.{{< /nextlink >}}
{{< nextlink href="/logs/processors/string_builder_processor" >}}<u>String Builder Processor</u>: Add a new attribute with the result of a template combining attributes and raw strings.{{< /nextlink >}}
{{< nextlink href="/logs/processors/geo_ip_parser" >}}<u>GeoIP Parser</u>: Extract continent, country, subdivision, or city information from an IP address attribute.{{< /nextlink >}}
{{< nextlink href="/logs/processors/lookup_processor" >}}<u>Lookup Processor</u>: Define a mapping between a log attribute and a human readable value.{{< /nextlink >}}
{{< nextlink href="/logs/processors/trace_id_remapper" >}}<u>Trace Remapper</u>: Define a log attribute as its associated trace ID.{{< /nextlink >}}
{{< nextlink href="/logs/processors/span_id_remapper" >}}<u>Span Remapper</u>: Define a log attribute as its associated span ID.{{< /nextlink >}}
{{< nextlink href="/logs/processors/array_processor" >}}<u>Array Processor</u>: Extract, aggregate, or transform values from JSON arrays within your logs.{{< /nextlink >}}
{{< nextlink href="/logs/processors/decoder_processor" >}}<u>Decoder Processor</u>: Translate binary-to-text encoded string fields into their original representation.{{< /nextlink >}}
{{< nextlink href="/logs/processors/pipeline" >}}<u>Pipeline</u>: Nested pipeline processor.{{< /nextlink >}}
{{< /whatsnext >}}

{{< learning-center-callout header="Build processors in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/log-pipelines">}}
  Learn to build and modify log pipelines, manage them with the Pipeline Scanner, and standardize attribute names across processed logs for consistency.
{{< /learning-center-callout >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/pipelines/
[2]: /logs/log_configuration/attributes_naming_convention/
[3]: /logs/processors/grok_parser/
[4]: /logs/processors/url_parser/
[5]: /logs/processors/user_agent_parser/
[6]: /logs/processors/attribute_remapper/
[7]: /logs/processors/service_remapper/
[8]: /logs/processors/date_remapper/
[9]: /logs/processors/category_processor/
[10]: /logs/processors/arithmetic_processor/
[11]: /logs/processors/geo_ip_parser/
[12]: /logs/processors/trace_id_remapper/
[13]: /logs/processors/span_id_remapper/
[14]: https://app.datadoghq.com/logs/pipelines
[15]: /standard-attributes/
