---
title: .NET OpenTelemetry Logs Support
code_lang: logs
type: multi-code-lang
code_lang_weight: 2
further_reading:
    - link: opentelemetry/correlate/logs_and_traces
      tag: Documentation
      text: Correlate OpenTelemetry Traces and Logs
---

## Overview

You can export OTLP logs from your .NET application using the Datadog SDK (`dd-trace-dotnet`).

This feature works by intercepting logs from the built-in `Microsoft.Extensions.Logging.ILogger` library and exporting them as structured OTLP data.

<div class="alert alert-info">This implementation does not use the OpenTelemetry Logs API. It is not compatible with the <code>OpenTelemetry.SDK.Logs</code> or <code>OpenTelemetry.Exporter.Otlp.Logs</code> packages. You must remove them to use this feature</div>

## Prerequisites

- **Datadog SDK**: `dd-trace-dotnet` version [x.y.z] or later.

## Setup

1.  Install the Datadog SDK:
    ```sh
    dotnet add package Datadog.Trace
    ```
2.  Enable OTel logs export by setting the following environment variable:
    ```sh
    export DD_LOGS_OTEL_ENABLED=true
    ```
3.  Ensure Datadog instrumentation is active for your application.
    ```sh
    Command for enabling .NET profiler
    ```

## Examples

### Standard logging

### Trace and log correlation

## Supported configuration

To enable this feature, you must set `DD_LOGS_OTEL_ENABLED=true`.

All OTLP exporter settings (such as endpoints, protocols, and timeouts), resource attributes, and batch processor settings are configured using a shared set of OpenTelemetry environment variables.

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][1].

### Tag and resource attribute precedence

{{% otel-config-precedence %}}

## Migrate from other setups

### Existing OTel Setup (Manual Configuration)

This Datadog feature is not compatible with applications already using the OpenTelemetry Logs API or OpenTelemetry SDK for logs.

To migrate, you must remove the OpenTelemetry logging packages (such as `OpenTelemetry.SDK.Logs` or `OpenTelemetry.Exporter.Otlp.Logs`) and any code that manually configures or uses the OTel Logs API.

This feature works by intercepting logs directly from the `Microsoft.Extensions.Logging.ILogger` interface and does not interact with the OpenTelemetry Logs API.

### Existing Datadog Log Injection

If you are currently using Datadog's traditional log injection (where `DD_LOGS_INJECTION=true` adds trace context to text logs) and an Agent to tail log files:

1.  Set the `DD_LOGS_OTEL_ENABLED=true` environment variable.
2.  The Datadog SDK automatically disables the old log injection style (`DD_LOGS_INJECTION`) to prevent duplicate trace metadata in your logs. Trace correlation is now handled by the structured OTLP payload.
3.  Ensure your Datadog Agent is configured to receive OTLP logs (version 7.48.0 or greater is required) and disable any file-based log collection for this service to avoid duplicate logs.

## Troubleshooting

**Logs aren't being exported.**
    - Ensure `DD_LOGS_OTEL_ENABLED` is set to `true`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/config/environment_variable_support