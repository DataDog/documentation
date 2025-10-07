---
title: OpenTelemetry Instrumentation
is_beta: true
private: true
---

{{< callout url="#" btn_hidden="true" >}}
  OpenTelemetry instrumentation for LLM Observability is in beta.
{{< /callout >}}

## Overview
By using OpenTelemetry's standardized semantic conventions for generative AI operations, you can instrument your LLM applications with any OpenTelemetry-compatible library or framework and visualize the traces in LLM Observability.

LLM Observability supports ingesting OpenTelemetry traces that follow the [OpenTelemetry 1.37 semantic conventions for generative AI][1]. This allows you to send LLM traces directly from OpenTelemetry-instrumented applications to Datadog without requiring the Datadog LLM Observability SDK or a Datadog agent.

## Prerequisites

- A [Datadog API key][2]
- An application instrumented with OpenTelemetry that emits traces following the [OpenTelemetry 1.37 gen_ai semantic conventions][1]
- Access to the OpenTelemetry instrumentation beta feature ([contact support][4] to request access)

## Setup

To send OpenTelemetry traces to LLM Observability, configure your OpenTelemetry exporter with the following settings:

### Configuration

Set the following environment variables in your application:

```
OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=https://trace.agent.datadoghq.com/v1/traces
OTEL_EXPORTER_OTLP_TRACES_HEADERS=dd-api-key=<YOUR_API_KEY>,dd-otlp-source=datadog
```

Replace `<YOUR_API_KEY>` with your [Datadog API key][2].

**Note**: If you are using an OpenTelemetry library other than the default OpenTelemetry SDK, you may need to configure the endpoint, protocol, and headers differently depending on the library's API. Refer to your library's documentation for the appropriate configuration method.

### Instrumentation

To generate traces compatible with LLM Observability:

1. Use an OpenTelemetry library or instrumentation package that emits spans following the [OpenTelemetry 1.37 gen_ai semantic conventions][1].
2. Alternatively, create custom OpenTelemetry instrumentation that produces spans with the required `gen_ai.*` attributes as defined in the semantic conventions.

The traces will automatically appear in the [**LLM Observability Traces** page][3] once your application starts sending data. To search for your traces in the UI, use the `ml_app` attribute, which is automatically set to the value of your Opentelemetry span's `service` attribute.

**Note**: There may be a 3-5 minute delay between sending traces and seeing them appear in the LLM Observability Traces UI.

## Supported semantic conventions

LLM Observability supports spans that follow the OpenTelemetry 1.37 semantic conventions for generative AI, including:

- LLM operations with `gen_ai.system`, `gen_ai.request.model`, and other gen_ai attributes
- Chat completion and text generation operations
- Token usage metrics (`gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`)
- Model parameters and metadata

For the complete list of supported attributes and their specifications, see the [OpenTelemetry gen_ai semantic conventions documentation][1].

## Getting access

This feature is currently in beta. If you are interested in using OpenTelemetry instrumentation for LLM Observability, [reach out to support][4] to request access for your organization.

[1]: https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/llm/traces
[4]: /help/

