---
title: Span Remapper
description: "Define a log attribute as its associated span ID"
processor_type: span-id-remapper
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "/tracing/other_telemetry/connect_logs_and_traces/"
  tag: "Documentation"
  text: "Connect logs and traces"
---

## Overview

There are two ways to define correlation between application spans and logs:

1. Follow the documentation on [how to inject a Span ID in the application logs][1]. Log integrations automatically handle all remaining setup steps by default.

2. Use the span remapper processor to define a log attribute as its associated span ID.


## Use cases

The Span Remapper is typically used to select the Span Id that is within a log message that needs first to be parsed with a Grok Parser.

<!-- ## Before and after state of logs -->

## API

Use the [Datadog Log Pipeline API endpoint][2] with the following span remapper JSON payload:

```json
{
  "type": "span-id-remapper",
  "name": "Define dd.span_id as the official span id associate to this log",
  "is_enabled": true,
  "sources": ["dd.span_id"]
}
```

| Parameter    | Type             | Required | Description                                            |
|--------------|------------------|----------|--------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                 |
| `name`       | String           | No       | Name of the processor.                                 |
| `is_enabled` | Boolean          | No       | Indicates whether the processor is enabled. Default: `false`. |
| `sources`    | Array of strings | No       | Array of source attributes. Default: `dd.trace_id`.    |


**Note**: Trace IDs and span IDs are not displayed in your logs or log attributes in the UI.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/other_telemetry/connect_logs_and_traces/
[2]: /api/v1/logs-pipelines/
