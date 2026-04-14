---
title: Processors
description: "Parse, enrich, and structure your logs using processors in Datadog Log Management"
aliases:
  - /logs/processing/processors/
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "/logs/logging_without_limits/"
  tag: "Documentation"
  text: "Logging without Limits*"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "https://www.youtube.com/watch?v=OztSU3JzfC8&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=4&t=245s"
  tag: "Video"
  text: "Tips and tricks: Add business data to logs from retail endpoints"
algolia:
  tags: ["logs processors", "logs parsing", "Extracting Attributes", "Remapping attributes"]
---

## Overview

<div class="alert alert-info">The processors outlined in this documentation are specific to cloud-based logging environments. To parse, structure, and enrich on-premises logs, see <a href="https://docs.datadoghq.com/observability_pipelines/processors/">Observability Pipelines</a>.</div>

A processor executes within a [Pipeline][1] to complete a data-structuring action and generate attributes to enrich your logs.

{{< img src="logs/log_configuration/processor/processor_overview.png" alt="Processors" style="width:100%" >}}

In [log configuration settings][1], you can configure processors such as the [Grok parser][3] or [date remapper][4] to help extract, create, and remap attributes to enrich your logs and enhance faceted search.

**Notes**:

- Structured logs should be shipped in a valid format. If the structure contains invalid characters for parsing, these should be stripped at the Agent level using the [mask_sequences][2] feature.

- As a best practice, it is recommended to use at most 20 processors per pipeline.

## Processor types

{{< whatsnext desc="Select a processor type to learn more:">}}
    {{< nextlink href="logs/log_configuration/processors/arithmetic_processor">}}<strong>Arithmetic Processor</strong>: Add a new attribute to a log with the result of a formula applied to existing numeric attributes.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/array_processor">}}<strong>Array Processor</strong>: Extract, aggregate, or transform values from JSON arrays in your logs.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/remapper">}}<strong>Attribute Remapper</strong>: Remap source attributes or tags to another target attribute or tag.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/category_processor">}}<strong>Category Processor</strong>: Add a new attribute to a log based on a search query match, for grouping and classification.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/decoder_processor">}}<strong>Decoder Processor</strong>: Translate binary-to-text encoded fields (such as Base64 or Hex) into their original representation.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/geoip_parser">}}<strong>GeoIP Parser</strong>: Extract continent, country, subdivision, or city information from an IP address attribute.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/grok_parser">}}<strong>Grok Parser</strong>: Create custom parsing rules to extract and structure data from log messages or specific attributes.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/log_date_remapper">}}<strong>Log Date Remapper</strong>: Assign one or more attributes as the official timestamp for your logs.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/log_message_remapper">}}<strong>Log Message Remapper</strong>: Assign one or more attributes as the official message for your logs.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/log_status_remapper">}}<strong>Log Status Remapper</strong>: Assign one or more attributes as the official severity status for your logs.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/lookup_processor">}}<strong>Lookup Processor</strong>: Map a log attribute to a human-readable value from a Reference Table or mapping table.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/ocsf_processor">}}<strong>OCSF Processor</strong>: Normalize security logs to the Open Cybersecurity Schema Framework (OCSF).{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/service_remapper">}}<strong>Service Remapper</strong>: Assign one or more attributes as the official service for your logs.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/span_remapper">}}<strong>Span Remapper</strong>: Define a correlation between application spans and logs.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/string_builder_processor">}}<strong>String Builder Processor</strong>: Build a new attribute from a template of existing attributes and raw strings.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/threat_intel_processor">}}<strong>Threat Intel Processor</strong>: Enrich logs with Threat Intelligence attributes by matching against an indicator of compromise (IoC) table.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/trace_remapper">}}<strong>Trace Remapper</strong>: Define a correlation between application traces and logs.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/url_parser">}}<strong>URL Parser</strong>: Extract query parameters and other components from a URL attribute.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/user_agent_parser">}}<strong>User-Agent Parser</strong>: Parse a useragent attribute to extract OS, browser, device, and other user data.{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/pipelines/
[2]: /agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[3]: /logs/log_configuration/processors/grok_parser/
[4]: /logs/log_configuration/processors/log_date_remapper/
