---
title: Node.js OpenTelemetry Logs API Support
code_lang: logs
type: multi-code-lang
code_lang_weight: 2
further_reading:
    - link: opentelemetry/correlate/logs_and_traces
      tag: Documentation
      text: Correlate OpenTelemetry Traces and Logs
---

## Overview

You can export OTLP-formatted logs from your Node.js application using the Datadog SDK (`dd-trace-js`).

This feature works by automatically intercepting records from popular Node.js logging libraries (such as `Winston` or `Pino`) and exporting them as structured OTLP data. This allows you to get OTLP logs without changing your existing logging code.

<div class="alert alert-info">
This implementation does not use or support the OpenTelemetry Logs API. It is not compatible with the <code>@opentelemetry/sdk-logs</code> or <code>@opentelemetry/exporter-otlp-logs</code> packages. You must remove them from your application to use this feature.
</div>

## Prerequisites

## Setup

## Examples

To enable this feature, you must set `DD_LOGS_OTEL_ENABLED=true`.

All OTLP exporter settings (such as endpoints, protocols, and timeouts), resource attributes, and batch processor settings are configured using a shared set of OpenTelemetry environment variables.

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][1].

### Tag and resource attribute precedence

{{% otel-config-precedence %}}

## Migrate from other setups

## Further reading

{{< partial name="whats-next/whats-next.html" >}}