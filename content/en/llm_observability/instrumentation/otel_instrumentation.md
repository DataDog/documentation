---
title: OpenTelemetry Instrumentation
---

## Overview
By using OpenTelemetry's standardized semantic conventions for generative AI operations, you can instrument your LLM applications with any OpenTelemetry-compatible library or framework and visualize the traces in LLM Observability.

LLM Observability supports ingesting OpenTelemetry traces that follow the [OpenTelemetry 1.37+ semantic conventions for generative AI][1]. This allows you to send LLM traces directly from OpenTelemetry-instrumented applications to Datadog without requiring the Datadog LLM Observability SDK or a Datadog Agent.

## Prerequisites

- A [Datadog API key][2]
- An application instrumented with OpenTelemetry that emits traces following the [OpenTelemetry 1.37+ semantic conventions for generative AI][1]

**Note**: [External evaluations][6] are not supported for OpenTelemetry spans.

## Setup

To send OpenTelemetry traces to LLM Observability, configure your OpenTelemetry exporter with the following settings:

### Configuration

Set the following environment variables in your application:

```
OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT={{< region-param key="otlp_trace_endpoint" code="true" >}}
OTEL_EXPORTER_OTLP_TRACES_HEADERS=dd-api-key=<YOUR_API_KEY>,dd-otlp-source=datadog
```

Replace `<YOUR_API_KEY>` with your [Datadog API key][2].

If your framework previously supported a pre-1.37 OpenTelemetry specification version, you also need to set:

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

This environment variable enables version 1.37+-compliant OpenTelemetry traces for frameworks that now support the version 1.37+ semantic conventions, but previously supported older versions (such as [strands-agents][5]).

**Note**: If you are using an OpenTelemetry library other than the default OpenTelemetry SDK, you may need to configure the endpoint, protocol, and headers differently depending on the library's API. Refer to your library's documentation for the appropriate configuration method.

#### Using strands-agents

If you are using the [`strands-agents` library][5], you need to set an additional environment variable to enable traces that are compliant with OpenTelemetry v1.37+:

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

This environment variable ensures that `strands-agents` emits traces following the OpenTelemetry v1.37+ semantic conventions for generative AI, which are required by LLM Observability.

### Instrumentation

To generate traces compatible with LLM Observability, do one of the following:

- Use an OpenTelemetry library or instrumentation package that emits spans following the [OpenTelemetry 1.37+ semantic conventions for generative AI][1].
- Create custom OpenTelemetry instrumentation that produces spans with the required `gen_ai.*` attributes, as defined in the semantic conventions.

After your application starts sending data, the traces automatically appear in the [**LLM Observability Traces** page][3]. To search for your traces in the UI, use the `ml_app` attribute, which is automatically set to the value of your OpenTelemetry root span's `service` attribute.

<div class="alert alert-danger">OpenInference and OpenLLMetry are not currently supported, as they have not been updated to support OpenTelemetry 1.37+ semantic conventions for generative AI.</a></div>

**Note**: There may be a 3-5 minute delay between sending traces and seeing them appear on the LLM Observability Traces page. If you have APM enabled, traces appear immediately in the APM Traces page.

### Examples

#### Using strands-agents

The following example demonstrates a complete application using strands-agents with the OpenTelemetry integration. This same approach works with any framework that supports OpenTelemetry version 1.37+ semantic conventions for generative AI.

```python
from strands import Agent
from strands_tools import calculator, current_time
from strands.telemetry.config import StrandsTelemetry
import os

# Configure AWS credentials for Bedrock access
os.environ["AWS_PROFILE"] = "<YOUR_AWS_PROFILE>"
os.environ["AWS_DEFAULT_REGION"] = "<YOUR_AWS_REGION>"

# Enable latest GenAI semantic conventions (1.37)
os.environ["OTEL_SEMCONV_STABILITY_OPT_IN"] = "gen_ai_latest_experimental"

# Configure OTLP endpoint to send traces to Datadog LLM Observability
os.environ["OTEL_EXPORTER_OTLP_TRACES_PROTOCOL"] = "http/protobuf"
os.environ["OTEL_EXPORTER_OTLP_TRACES_ENDPOINT"] = "{{< region-param key="otlp_trace_endpoint" code="true" >}}"
os.environ["OTEL_EXPORTER_OTLP_TRACES_HEADERS"] = f"dd-api-key={os.getenv('DD_API_KEY')},dd-otlp-source=datadog"

# Initialize telemetry with OTLP exporter
telemetry = StrandsTelemetry()
telemetry.setup_otlp_exporter()

# Create agent with tools
agent = Agent(tools=[calculator, current_time])

# Run the agent
if __name__ == "__main__":
    result = agent("I was born in 1993, what is my age?")
    print(f"Agent: {result}")
```

#### Custom OpenTelemetry instrumentation

The following example demonstrates how to instrument your LLM application using custom OpenTelemetry code. This approach gives you full control over the traces and spans emitted by your application.

```python
import os
import json
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import Resource, SERVICE_NAME
from openai import OpenAI

# Configure OpenTelemetry to send traces to Datadog
os.environ["OTEL_EXPORTER_OTLP_TRACES_ENDPOINT"] = "{{< region-param key="otlp_trace_endpoint" code="true" >}}"
os.environ["OTEL_EXPORTER_OTLP_TRACES_HEADERS"] = "dd-api-key=<YOUR_DATADOG_API_KEY>,dd-otlp-source=datadog"
os.environ["OTEL_SEMCONV_STABILITY_OPT_IN"] = "gen_ai_latest_experimental"

# Initialize OpenTelemetry SDK
resource = Resource(attributes={SERVICE_NAME: "simple-llm-example"})
provider = TracerProvider(resource=resource)
provider.add_span_processor(BatchSpanProcessor(OTLPSpanExporter()))
trace.set_tracer_provider(provider)

tracer = trace.get_tracer(__name__)

# Make LLM call with OpenTelemetry tracing
with tracer.start_as_current_span(
    "chat gpt-4o",
    kind=trace.SpanKind.CLIENT,
) as span:
    model = "gpt-4o"
    max_tokens = 1024
    temperature = 0.7
    messages = [{"role": "user", "content": "Explain OpenTelemetry in one sentence."}]
    
    # Set request attributes
    span.set_attribute("gen_ai.provider.name", "openai")
    span.set_attribute("gen_ai.request.model", model)
    span.set_attribute("gen_ai.operation.name", "chat")
    span.set_attribute("gen_ai.request.max_tokens", max_tokens)
    span.set_attribute("gen_ai.request.temperature", temperature)
    
    # Add input messages as event
    input_messages_parts = []
    for msg in messages:
        input_messages_parts.append({
            "role": msg["role"],
            "parts": [{"type": "text", "content": msg["content"]}]
        })
    
    span.add_event(
        "gen_ai.client.inference.operation.details",
        {
            "gen_ai.input.messages": json.dumps(input_messages_parts)
        }
    )
    
    # Make actual LLM call
    client = OpenAI(api_key="<YOUR_OPENAI_API_KEY>")
    response = client.chat.completions.create(
        model=model,
        max_tokens=max_tokens,
        temperature=temperature,
        messages=messages
    )
    
    # Set response attributes from actual data
    span.set_attribute("gen_ai.response.id", response.id)
    span.set_attribute("gen_ai.response.model", response.model)
    span.set_attribute("gen_ai.response.finish_reasons", [response.choices[0].finish_reason])
    span.set_attribute("gen_ai.usage.input_tokens", response.usage.prompt_tokens)
    span.set_attribute("gen_ai.usage.output_tokens", response.usage.completion_tokens)
    
    # Add output messages as event
    output_text = response.choices[0].message.content
    span.add_event(
        "gen_ai.client.inference.operation.details",
        {
            "gen_ai.output.messages": json.dumps([{
                "role": "assistant",
                "parts": [{"type": "text", "content": output_text}],
                "finish_reason": response.choices[0].finish_reason
            }])
        }
    )
    
    print(f"Response: {output_text}")

# Flush spans before exit
provider.force_flush()
```

After running this example, search for `ml_app:simple-llm-example` in the LLM Observability UI to find the generated trace.

## Supported semantic conventions

LLM Observability supports spans that follow the OpenTelemetry 1.37+ semantic conventions for generative AI, including:

- LLM operations with `gen_ai.provider.name`, `"gen_ai.operation.name"`, `gen_ai.request.model`, and other gen_ai attributes
- Operation inputs/outputs on direct span attributes or via span events
- Token usage metrics (`gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`)
- Model parameters and metadata

For the complete list of supported attributes and their specifications, see the [OpenTelemetry semantic conventions for generative AI documentation][1].

[1]: https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-agent-spans/#spans
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/llm/traces
[4]: /help/
[5]: https://pypi.org/project/strands-agents/
[6]: /llm_observability/evaluations/external_evaluations

