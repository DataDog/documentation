---
title: Trace Remapper
description: "Define a log attribute as its associated trace ID"
processor_type: trace-id-remapper
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "/tracing/other_telemetry/connect_logs_and_traces/"
  tag: "Documentation"
  text: "Connect logs and traces"
---

## Overview

There are two ways to define correlation between application traces and logs:

1. Follow the documentation on [how to inject a Trace ID in the application logs][1]. Log integrations automatically handle all remaining setup steps by default.

2. Use the trace remapper processor to define a log attribute as its associated trace ID.

## Use cases

The Status Remapper is typically used to select the Trace Id that is within a log message that needs first to be parsed with a Grok Parser.

## API

Use the [Datadog Log Pipeline API endpoint][2] with the following trace remapper JSON payload:

```json
{
  "type": "trace-id-remapper",
  "name": "Define dd.trace_id as the official trace id associate to this log",
  "is_enabled": true,
  "sources": ["dd.trace_id"]
}
```

| Parameter    | Type             | Required | Description                                            |
|--------------|------------------|----------|--------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                 |
| `name`       | String           | No       | Name of the processor.                                 |
| `is_enabled` | Boolean          | No       | If the processors is enabled or not. Default: `false`. |
| `sources`    | Array of strings | No       | Array of source attributes. Default: `dd.trace_id`.    |


**Note**: Trace IDs and span IDs are not displayed in your logs or log attributes in the UI.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/other_telemetry/connect_logs_and_traces/
[2]: /api/v1/logs-pipelines/
