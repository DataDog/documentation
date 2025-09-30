---
title: Quantization of APM Data
description: Understand how Datadog normalizes span and resource names by replacing GUIDs, numeric IDs, and query parameters.
further_reading:
  - link: /tracing/trace_collection/custom_instrumentation/
    tag: Documentation
    text: Custom Instrumentation
  - link: /tracing/configure_data_security/#scrub-sensitive-data-from-your-spans
    tag: Documentation
    text: Replace tags in spans
  - link: /tracing/trace_collection/library_config/
    tag: Documentation
    text: Tracing Library Configuration
---

## Overview

During ingestion, Datadog applies _quantization_ to APM data such as random globally unique IDs (GUIDs), numeric IDs, and query parameter values in [span][1] or [resource][2] names. The resulting normalization cuts down on name pollution that results from these random patterns by grouping those spans and resources together because they are, for analysis purposes, the same.

Certain patterns in resource or span names are replaced with the following static strings:
- GUIDs: `{guid}`
- Numeric IDs (6+ digit numbers surrounded by non-alphanumeric characters or found at the end of a string): `{num}`
- Query parameter values: `{val}`

These replacements affect:
- trace metric names,
- the resource name tag on those metrics, and
- the resource and span names for all ingested spans.

### Quantization examples

For example, if a _span name_ is `find_user_2461685a_80c9_4d9e_85e9_a3b0e9e3ea84`, it is renamed to `find_user_{guid}` and the resulting trace metrics are:
- `trace.find_user_guid`
- `trace.find_user_guid.hits`
- `trace.find_user_guid.errors`
- `trace.find_user_guid.duration`
- `trace.find_user_guid.apdex` (if Apdex is configured for the service)

To search for these spans in trace search, the query is `operation_name:"find_user_{guid}"`.

If a _resource name_ is `SELECT ? FROM TABLE temp_128390123`, it is renamed to `SELECT ? FROM TABLE temp_{num}` and its metric-normalized tag is `resource_name:select_from_table_temp_num`.

To search for these spans in trace search, the query is `resource_name:"SELECT ? FROM TABLE temp_{num}"`.

## Changing instrumentation to avoid default quantization

**Note**: Any change to span and resource names upstream in the instrumentation or the Agent produces new metrics and tags. If you use queries on quantized data, those queries must be updated to work with the new names.

### In-code instrumentation

If your application runs in an agentless setup or if you prefer to make instrumentation changes more directly in your code, see [the tracer documentation of your application's runtime][3] for information on how to create custom configuration for span names and resource names.

### Agent configuration

You can use the `replace_tags` YAML configuration option to set up your own replacement strings through Go-compliant regex:

```yaml
apm_config:
  replace_tags:
    # Replace tailing numeric IDs in span names with "x":
    - name: "span.name"
      pattern: "get_id_[0-9]+"
      repl: "get_id_x"
    # Replace numeric IDs in resource paths:
    - name: "resource.name"
      pattern: "/users/[0-9]+/"
      repl: "/users/{user_id}/"
```

Alternatively, you can use the `DD_APM_REPLACE_TAGS` environment variable with a JSON string as its value:

```bash
export DD_APM_REPLACE_TAGS = '[{"name": "span.name", "pattern": "get id_[0-9]+", "repl": "get id_x"}, {...}, …]'
```

### Tracer-specific configuration

Some tracers provide options to customize resource name generation directly:

{{< tabs >}}
{{% tab "Java" %}}

The Java tracer allows customization of HTTP resource names with the `dd.trace.http.server.path-resource-name-mapping` option, which maps HTTP request paths to custom resource names using Ant-style patterns.

For more information, read [Configuring the Java Tracing Library][4]

[4]: /tracing/trace_collection/library_config/java/#traces

{{% /tab %}}

{{% tab "PHP" %}}

The PHP tracer provides several options for URI normalization:

- `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` identifies path fragments corresponding to IDs
- `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` normalizes resource naming for incoming requests
- `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` normalizes resource naming for outgoing requests

For more information, read [Configuring the PHP Tracing Library][5]

[5]: /tracing/trace_collection/library_config/php/#traces

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#spans
[2]: /tracing/glossary/#resources
[3]: /tracing/trace_collection/custom_instrumentation/