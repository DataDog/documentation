---
title: APM Quantization
kind: Documentation
aliases:
  - /tracing/troubleshooting/quantization
---

## What is APM quantization?

Datadog applies quantization to APM data during ingestion to prevent random IDs, IP addresses, or query parameter values in span or resource names from unnecessarily categorized as separate resources.

## How does quantization affect Resource and Span Names?
Certain patterns in resource or span names will be replaced with static strings:
- GUIDs: `{guid}`
- Numeric IDs (6+ digit numbers, surrounded by delimiters or found at the end of a string): `{num}`
- Query parameter values: `{val}`

These replacements affect trace metrics, the resource name tag on those metrics, and all the resource and span names for ingested spans.

### Quanization examples

If a _span name_ is `find_user_2461685a_80c9_4d9e_85e9_a3b0e9e3ea84`, then it will be renamed to `find_user_{guid}` and the resulting trace metrics will be:
- `trace.find_user_dd_guid`
- `trace.find_user_dd_guid.hits`
- `trace.find_user_dd_guid.errors`
- `trace.find_user_dd_guid.duration`
- `trace.find_user_dd_guid.apdex` (if apdex is configured for the service)

To search for relevant spans in trace search, the query would be `operation_name:"find_user_{guid}"`.

If a _resource name_ is `SELECT ? FROM TABLE temp_128390123`, then it will be renamed to `SELECT ? FROM TABLE temp_{num}` and its metric-normalized tag will become `resource_name:select_from_table_temp_num`.
To search for relevant spans in trace search, the query would be `resource_name:"SELECT ? FROM TABLE temp_{num}"`.

## How can I change my instrumentation to avoid quantization?

**NOTE**: Any change to span and resource names upstream in the APM instrumentation or the agent will produce new metrics and tags.
If you are using queries on quantized data then these queries will need to be updated to work with the new names.

### In code

Your application may run in an agentless setup or perhaps you would prefer to make instrumentation changes more directly in your code.
Either way, see [the tracer documentation of your application's runtime][1] for more information on how to create custom configuration for span names and resource names.

### With the trace agent

You can use the `replace_tags` configuration to set up your own replacement strings through Go-compliant regex:

```
apm_config:
  replace_tags:
    # Replace tailing numeric IDs in span names with "x".
    - name: "span.name"
      pattern: "get_id_[0-9]+"
      repl: "get_id_x"
    # Replace numeric IDs in resource paths.
    - name: "resource.name"
      pattern: "/users/[0-9]+/"
      repl: "/users/{user_id}/"
```

Or you can use the `DD_APM_REPLACE_TAGS` environment variable that has a JSON string as its value:
```
export DD_APM_REPLACE_TAGS = '[{"name": "span.name", "pattern": "get_id_[0-9]+", "repl": "get_id_x"}, {...}, …]'
```

[1]: /tracing/trace_collection/custom_instrumentation/
