---
title: Go OpenTelemetry Metrics API Support
# Uncomment Metrics tab when Go metrics support is available
# code_lang: metrics
# type: multi-code-lang
# code_lang_weight: 1
further_reading:
    - link: opentelemetry/correlate/metrics_and_traces
      tag: Documentation
      text: Correlate OpenTelemetry Traces and Metrics
---

## Overview

{{% otel-overview-exporter lang="Go" signal="Metrics" sdk_name="dd-trace-go" %}}

**Note**: Go OpenTelemetry Metrics API support is not yet available.

## Prerequisites

- **Datadog SDK**: dd-trace-go version TBD.
- **An OTLP-compatible destination**: You must have a destination (Agent or Collector) listening on ports 4317 (gRPC) or 4318 (HTTP) to receive OTel metrics.

## Setup

*Documentation will be added when Go metrics support becomes available.*

## Examples

*Examples will be added when Go metrics support becomes available.*

## Supported configuration

*Configuration details will be added when Go metrics support becomes available.*

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][1].

## Migrate from other setups

*Migration guidance will be added when Go metrics support becomes available.*

## Troubleshooting

*Troubleshooting information will be added when Go metrics support becomes available.*

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/config/environment_variable_support
