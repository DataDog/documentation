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
---

## Overview

A processor executes within a pipeline to complete a data-structuring action and generate attributes to enrich your logs.

{{< whatsnext desc="Choose your processor type:">}}
{{< nextlink href="/logs/processors/grok_parser" >}}<strong>Grok Parser</strong>: Create custom grok rules to parse the full message or a specific attribute of your raw event.{{< /nextlink >}}
{{< nextlink href="/logs/processors/date_remapper" >}}<strong>Log Date Remapper</strong>: Define a date attribute as the official log timestamp.{{< /nextlink >}}
{{< nextlink href="/logs/processors/status_remapper" >}}<strong>Log Status Remapper</strong>: Assign attributes as an official status to your logs.{{< /nextlink >}}
{{< nextlink href="/logs/processors/service_remapper" >}}<strong>Service Remapper</strong>: Assign one or more attributes as the official service.{{< /nextlink >}}
{{< nextlink href="/logs/processors/message_remapper" >}}<strong>Log Message Remapper</strong>: Define one or more attributes as the official log message.{{< /nextlink >}}
{{< nextlink href="/logs/processors/attribute_remapper" >}}<strong>Remapper</strong>: Remap any source attribute(s) or tags to another target attribute or tag.{{< /nextlink >}}
{{< nextlink href="/logs/processors/url_parser" >}}<strong>URL Parser</strong>: Extract query parameters and other important parameters from a URL.{{< /nextlink >}}
{{< nextlink href="/logs/processors/user_agent_parser" >}}<strong>User-Agent Parser</strong>: Extract OS, browser, device, and other user data from a user-agent attribute.{{< /nextlink >}}
{{< nextlink href="/logs/processors/category_processor" >}}<strong>Category Processor</strong>: Add a new attribute to a log matching a provided search query.{{< /nextlink >}}
{{< nextlink href="/logs/processors/arithmetic_processor" >}}<strong>Arithmetic Processor</strong>: Add a new attribute with the result of a mathematical formula.{{< /nextlink >}}
{{< nextlink href="/logs/processors/string_builder_processor" >}}<strong>String Builder Processor</strong>: Add a new attribute with the result of a template combining attributes and raw strings.{{< /nextlink >}}
{{< nextlink href="/logs/processors/geo_ip_parser" >}}<strong>GeoIP Parser</strong>: Extract continent, country, subdivision, or city information from an IP address attribute.{{< /nextlink >}}
{{< nextlink href="/logs/processors/lookup_processor" >}}<strong>Lookup Processor</strong>: Define a mapping between a log attribute and a human readable value.{{< /nextlink >}}
{{< nextlink href="/logs/processors/trace_id_remapper" >}}<strong>Trace Remapper</strong>: Define a log attribute as its associated trace ID.{{< /nextlink >}}
{{< nextlink href="/logs/processors/span_id_remapper" >}}<strong>Span Remapper</strong>: Define a log attribute as its associated span ID.{{< /nextlink >}}
{{< nextlink href="/logs/processors/array_processor" >}}<strong>Array Processor</strong>: Extract, aggregate, or transform values from JSON arrays within your logs.{{< /nextlink >}}
{{< nextlink href="/logs/processors/decoder_processor" >}}<strong>Decoder Processor</strong>: Translate binary-to-text encoded string fields into their original representation.{{< /nextlink >}}
{{< nextlink href="/logs/processors/pipeline" >}}<strong>Pipeline</strong>: Nested pipeline processor.{{< /nextlink >}}
{{< /whatsnext >}}

{{< learning-center-callout header="Build processors in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/log-pipelines">}}
  Learn to build and modify log pipelines, manage them with the Pipeline Scanner, and standardize attribute names across processed logs for consistency.
{{< /learning-center-callout >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
