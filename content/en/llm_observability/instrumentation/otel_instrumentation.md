---
title: OpenTelemetry Instrumentation
---

## Overview
By using OpenTelemetry's standardized semantic conventions for generative AI operations, you can instrument your LLM applications with any OpenTelemetry-compatible library or framework and visualize the traces in LLM Observability.

LLM Observability supports ingesting OpenTelemetry traces that follow the [OpenTelemetry 1.37+ semantic conventions for generative AI][1]. This allows you to send LLM traces directly from OpenTelemetry-instrumented applications to Datadog without requiring the Datadog LLM Observability SDK or a Datadog Agent.

## Prerequisites

- A [Datadog API key][2]
- An application instrumented with OpenTelemetry that emits traces following the [OpenTelemetry 1.37+ semantic conventions for generative AI][1]

To send <a href="/llm_observability/evaluations/external_evaluations#submitting-external-evaluations-with-the-api">external evaluations directly to the API</a> for OpenTelemetry spans, you must include the <code>source:otel</code> tag in the evaluation.

## Setup

To send OpenTelemetry traces to LLM Observability, configure your OpenTelemetry exporter with the following settings:

### Configuration

Set the following environment variables in your application:

```
OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT={{< region-param key="otlp_trace_endpoint" code="true" >}}
OTEL_EXPORTER_OTLP_TRACES_HEADERS=dd-api-key=<YOUR_API_KEY>,dd-otlp-source=llmobs
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

<div class="alert alert-danger">
<ul>
<li/> <a href="https://traceloop.com/docs/openllmetry/getting-started-python">OpenLLMetry</a> version 0.47+ is supported. See the <a href="#using-openllmetry">OpenLLMetry example</a>.
<li/> OpenInference is not supported.
<li/> There may be a 3-5 minute delay between sending traces and seeing them appear on the LLM Observability Traces page. If you have APM enabled, traces appear immediately in the APM Traces page.
</ul>
</div>

## Examples

### Using Strands Agents

The following example demonstrates a complete application using [Strands Agents][7] with the OpenTelemetry integration. This same approach works with any framework that supports OpenTelemetry version 1.37+ semantic conventions for generative AI.

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
os.environ["OTEL_EXPORTER_OTLP_TRACES_HEADERS"] = f"dd-api-key={os.getenv('DD_API_KEY')},dd-otlp-source=llmobs"

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

### Custom OpenTelemetry instrumentation

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
os.environ["OTEL_EXPORTER_OTLP_TRACES_HEADERS"] = "dd-api-key=<YOUR_DATADOG_API_KEY>,dd-otlp-source=llmobs"
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

### Using OpenLLMetry

The following example demonstrates using [OpenLLMetry](https://github.com/traceloop/openllmetry) to automatically instrument OpenAI calls with OpenTelemetry.

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.openai import OpenAIInstrumentor
import openai
from opentelemetry.sdk.resources import Resource

resource = Resource.create({
    "service.name": "simple-openllmetry-test",
})

provider = TracerProvider(resource=resource)
trace.set_tracer_provider(provider)

exporter = OTLPSpanExporter(
    endpoint="{{< region-param key="otlp_trace_endpoint" code="true" >}}",
    headers={
        "dd-api-key": "<YOUR_DATADOG_API_KEY>",
        "dd-ml-app": "simple-openllmetry-test",
        "dd-otlp-source": "llmobs",
    },
)

provider.add_span_processor(BatchSpanProcessor(exporter))

OpenAIInstrumentor().instrument()

# Make OpenAI call (automatically traced)
client = openai.OpenAI(api_key="<YOUR_OPENAI_API_KEY>")
client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "What is 15 multiplied by 7?"}]
)

provider.force_flush(timeout_millis=5000)
```

After running this example, search for `ml_app:simple-openllmetry-test` in the LLM Observability UI to find the generated trace.

## Attribute mapping reference

This section provides the mapping between OpenTelemetry GenAI semantic conventions (v1.37+) as well as Openllmetry to Datadog LLM Observability span schema.

<div class="alert alert-info">OpenLLMetry-specific mappings are documented separately in the <a href="#openllmetry-attribute-mappings">OpenLLMetry attribute mappings</a> section.</div>

### OpenTelemetry 1.37+ attribute mappings

#### Base span attributes

| OTLP Field | LLMObs Field | Notes |
|------------|--------------|-------|
| `resource.attributes.service.name` | `ml_app`, `tags.service` | |
| `name` | `name` | Overridden by `gen_ai.tool.name` if present |
| `parent_span_id` | `parent_id` | |
| `start_time_unix_nano` | `start_ns` | |
| `end_time_unix_nano` | `duration` | Calculated: end - start |
| `status.code` | `status` | `error` if > 0, else `ok` |
| `status.message` | `meta.error.message` | |
| `attributes.error.type` | `meta.error.type` | |

#### Span kind resolution

| `gen_ai.operation.name` | LLMObs `span.kind` |
|-------------------------|-------------------|
| `generate_content`, `chat`, `text_completion`, `completion` | `llm` |
| `embeddings`, `embedding` | `embedding` |
| `execute_tool` | `tool` |
| `invoke_agent`, `create_agent` | `agent` |
| `rerank`, `unknown`, *(default)* | `workflow` |

#### Model information

| OTel Attribute | LLMObs Field | Notes |
|----------------|--------------|-------|
| `gen_ai.operation.name` | `meta.span.kind` | See resolution table above |
| `gen_ai.provider.name` | `meta.model_provider` | Falls back to `gen_ai.system`, then `custom` |
| `gen_ai.response.model` | `meta.model_name` | |
| `gen_ai.request.model` | `meta.model_name` | Fallback if `response.model` absent |

#### Token usage metrics

| OTel Attribute | LLMObs Field |
|----------------|--------------|
| `gen_ai.usage.input_tokens` | `metrics.input_tokens` |
| `gen_ai.usage.output_tokens` | `metrics.output_tokens` |
| `gen_ai.usage.prompt_tokens` | `metrics.prompt_tokens` |
| `gen_ai.usage.completion_tokens` | `metrics.completion_tokens` |
| `gen_ai.usage.total_tokens` | `metrics.total_tokens` |

#### Request parameters

All `gen_ai.request.*` parameters map to `meta.metadata.*` with the prefix stripped.

| OTel Attribute | LLMObs Field |
|----------------|--------------|
| `gen_ai.request.seed` | `metadata.seed` |
| `gen_ai.request.frequency_penalty` | `metadata.frequency_penalty` |
| `gen_ai.request.max_tokens` | `metadata.max_tokens` |
| `gen_ai.request.stop_sequences` | `metadata.stop_sequences` |
| `gen_ai.request.temperature` | `metadata.temperature` |
| `gen_ai.request.top_k` | `metadata.top_k` |
| `gen_ai.request.top_p` | `metadata.top_p` |
| `gen_ai.request.choice.count` | `metadata.choice.count` |

#### Tool attributes

| OTel Attribute | LLMObs Field | Notes |
|----------------|--------------|-------|
| `gen_ai.tool.name` | `name` | Overrides span name |
| `gen_ai.tool.call.id` | `metadata.tool_id` | |
| `gen_ai.tool.description` | `metadata.tool_description` | |
| `gen_ai.tool.type` | `metadata.tool_type` | |
| `gen_ai.tool.definitions` | `meta.tool_definitions` | Parsed JSON array |
| `gen_ai.tool.call.arguments` | `input.value` | |
| `gen_ai.tool.call.result` | `output.value` | |

#### Session and conversation

| OTel Attribute | LLMObs Field | Notes |
|----------------|--------------|-------|
| `gen_ai.conversation.id` | `session_id` | Also added to `metadata.conversation_id` and tags |

#### Response attributes

| OTel Attribute | LLMObs Field |
|----------------|--------------|
| `gen_ai.response.model` | `meta.model_name` |
| `gen_ai.response.finish_reasons` | `metadata.finish_reasons` |

#### Input and output messages

Input and output messages are extracted from the following sources, in priority order:

1. Direct attributes: `gen_ai.input.messages`, `gen_ai.output.messages`, `gen_ai.system_instructions`
2. Span events (`meta["events"]`) with name `gen_ai.client.inference.operation.details`

| OTel Source | LLMObs Field | Notes |
|-------------|--------------|-------|
| `gen_ai.input.messages` | `meta.input.messages` (llm) / `meta.input.value` (others) | |
| `gen_ai.output.messages` | `meta.output.messages` (llm) / `meta.output.value` (others) | |
| `gen_ai.system_instructions` | Prepended to input | Added as system role messages |

##### Embedding spans

| OTel Source | LLMObs Field |
|-------------|--------------|
| `gen_ai.input.messages` | `meta.input.documents` |
| N/A | `meta.output.value` = `[N embedding(s) returned]` |

#### Tags

Tags are placed directly on the span:

- Non-`gen_ai.*` attributes are converted to `key:value` tags
- Unknown `gen_ai.*` keys are added with prefix stripped
- Filtered out: `_dd.*`, `llm.*`, `ddtags`, `events`, and already specifically mapped `gen_ai.*` keys

<div class="alert alert-info">Any <code>gen_ai.*</code> attributes that are not explicitly mapped to LLM Observability span fields are placed in the LLM span's tags, with a 256 character limit per value. Values exceeding this limit are truncated. All other non-<code>gen_ai</code> attributes are dropped.</div>

### OpenLLMetry attribute mappings

This section documents OpenLLMetry-specific attribute mappings that differ from or extend the standard OpenTelemetry GenAI semantic conventions.

#### Span kind resolution

`llm.request.type` is used as a fallback when `gen_ai.operation.name` is absent.

| `llm.request.type` | LLMObs `span.kind` |
|--------------------|-------------------|
| `chat` | `llm` |
| `completion` | `llm` |
| `embedding` | `embedding` |
| `rerank` | `workflow` |
| `unknown`, *(default)* | `workflow` |

#### Model information

| OpenLLMetry Attribute | LLMObs Field | Notes |
|-----------------------|--------------|-------|
| `gen_ai.system` | `meta.model_provider` | Fallback when `gen_ai.provider.name` absent |

#### Token usage metrics

| OpenLLMetry Attribute | LLMObs Field | Notes |
|-----------------------|--------------|-------|
| `llm.usage.total_tokens` | `metrics.total_tokens` | Fallback when `gen_ai.usage.total_tokens` absent |

#### Input and output messages

OpenLLMetry uses indexed attributes instead of JSON arrays. These are the lowest priority source and are only used when no OTel standard sources exist.

##### Prompt attributes (input)

| OpenLLMetry Attribute | Description |
|-----------------------|-------------|
| `gen_ai.prompt.<index>.role` | Message role (user, system, assistant, tool) |
| `gen_ai.prompt.<index>.content` | Message content |
| `gen_ai.prompt.<index>.tool_call_id` | Tool call ID for tool response messages |

##### Completion attributes (output)

| OpenLLMetry Attribute | Description |
|-----------------------|-------------|
| `gen_ai.completion.<index>.role` | Message role |
| `gen_ai.completion.<index>.content` | Message content |
| `gen_ai.completion.<index>.finish_reason` | Completion finish reason |

##### Mapping

Messages are converted to OTel-compatible format and processed normally:

| OpenLLMetry Source | LLMObs Field |
|--------------------|--------------|
| `gen_ai.prompt.*` | `meta.input.messages` (llm) / `meta.input.value` (others) |
| `gen_ai.completion.*` | `meta.output.messages` (llm) / `meta.output.value` (others) |

#### Tool calls

Tool calls are nested within completion attributes.

| OpenLLMetry Attribute | Maps To |
|-----------------------|---------|
| `gen_ai.completion.<index>.tool_calls.<idx>.name` | `tool_calls[].name` |
| `gen_ai.completion.<index>.tool_calls.<idx>.id` | `tool_calls[].tool_id` |
| `gen_ai.completion.<index>.tool_calls.<idx>.arguments` | `tool_calls[].arguments` |

##### Tool response messages

When `role = "tool"` and `tool_call_id` is present, the message is converted to a tool result:

| OpenLLMetry Attribute | Maps To |
|-----------------------|---------|
| `gen_ai.prompt.<index>.tool_call_id` | `tool_results[].tool_id` |
| `gen_ai.prompt.<index>.content` | `tool_results[].result` |

#### Embedding spans

For embedding spans, documents are extracted from prompt content attributes.

| OpenLLMetry Source | LLMObs Field |
|--------------------|--------------|
| `gen_ai.prompt.<index>.content` | `meta.input.documents[].text` |

#### Tags filtering

The following OpenLLMetry-specific attributes are filtered from tags:

- `gen_ai.prompt.*`
- `gen_ai.completion.*`
- `llm.*`

## Supported semantic conventions

LLM Observability supports spans that follow the OpenTelemetry 1.37+ semantic conventions for generative AI, including:

- LLM operations with `gen_ai.provider.name`, `"gen_ai.operation.name"`, `gen_ai.request.model`, and other gen_ai attributes
- Operation inputs/outputs on direct span attributes or via span events
- Token usage metrics (`gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`)
- Model parameters and metadata

For the complete list of supported attributes and their specifications, see the [OpenTelemetry semantic conventions for generative AI documentation][1].

## Disabling LLM Observability conversion

If you'd only like your generative AI spans to remain in APM and not appear in LLM Observability, you can disable the automatic conversion by setting the `dd_llmobs_enabled` attribute to `false`. Setting this attribute on any span in a trace prevents the entire trace from being converted to LLM Observability.

### Using environment variables

Add the `dd_llmobs_enabled=false` attribute to your `OTEL_RESOURCE_ATTRIBUTES` environment variable:

```
OTEL_RESOURCE_ATTRIBUTES=dd_llmobs_enabled=false
```

### Using code

You can also set the attribute programmatically on any span in your trace:

```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("my-span") as span:
    # Disable LLM Observability conversion for this entire trace
    span.set_attribute("dd_llmobs_enabled", False)
```

[1]: https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-agent-spans/#spans
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/llm/traces
[4]: /help/
[5]: https://pypi.org/project/strands-agents/
[6]: /llm_observability/evaluations/external_evaluations
[7]: https://strandsagents.com/latest/

