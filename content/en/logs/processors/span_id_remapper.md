---
title: Span Remapper
processor_name: span-id-remapper
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/logs/guide/manage_logs_and_metrics_with_terraform/"
  tag: "Guide"
  text: "Manage Logs and Metrics with Terraform"
---

## Overview

There are two ways to define correlation between application spans and logs:

1. Follow the documentation on [how to inject a Span ID in the application logs][8]. Log integrations automatically handle all remaining setup steps by default.

2. Use the span remapper processor to define a log attribute as its associated span ID.

**Note**: Trace IDs and span IDs are not displayed in your logs or log attributes in the UI.

## Use cases

| Use case | Example |
| :--- | :--- |
| Select and remap the Span ID embedded within a log message. | Remap a Span ID after it has been extracted from the `message` attribute using a Grok Parser. |

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[8]: /tracing/other_telemetry/connect_logs_and_traces/

