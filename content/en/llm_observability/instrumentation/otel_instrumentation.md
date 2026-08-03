---
title: OpenTelemetry Instrumentation
description: Instrument LLM applications with OpenTelemetry using GenAI or OpenInference semantic conventions and send traces to Agent Observability without the Datadog SDK.
---

## Overview
By using OpenTelemetry's standardized semantic conventions for generative AI operations, you can instrument your LLM applications with any OpenTelemetry-compatible library or framework and visualize the traces in Agent Observability.

Agent Observability supports ingesting OpenTelemetry traces that follow either the [OpenTelemetry 1.37+ semantic conventions for generative AI][1] or the supported [OpenInference semantic conventions][12]. This allows you to send LLM traces directly from OpenTelemetry-instrumented applications to Datadog without requiring the Agent Observability SDK or a Datadog Agent.

## Prerequisites

- A [Datadog API key][2]
- An application instrumented with OpenTelemetry that emits traces following the [OpenTelemetry 1.37+ semantic conventions for generative AI][1] or the supported [OpenInference semantic conventions][12]

## Supported features

### Evaluations

To send [external evaluations directly to the API](/llm_observability/evaluations/external_evaluations#submitting-external-evaluations-with-the-api) for OpenTelemetry spans, include the `source:otel` tag in the evaluation. When referencing spans, provide `span_id` and `trace_id` as decimal strings. OpenTelemetry uses hexadecimal IDs natively, so convert them to decimal before submitting evaluations. For example, use Python's `int(hex_span_id, 16)` to convert a hex span ID to its decimal equivalent.

### Prompt Tracking

For information on using Prompt Tracking with OpenTelemetry spans, see [Prompt Tracking - OpenTelemetry Instrumentation](/llm_observability/monitoring/prompt_tracking#opentelemetry-instrumentation).

### Experiments

You can use OpenTelemetry spans inside [Agent Observability Experiments](/llm_observability/experiments/setup#using-opentelemetry-spans-inside-experiments). By setting `DD_TRACE_OTEL_ENABLED=1`, OTel spans created inside an experiment task automatically appear as children of the experiment span.

### Span links

Use [OpenTelemetry span links][9] on your GenAI spans to express non-parent-child relationships, such as when one span's output feeds another span's input. When two linked spans are in the same trace, the link appears as an edge in that trace's **Execution Graph**, so you can see how data flows between sibling spans (for example, a tool's output feeding a downstream LLM call).

{{< img src="llm_observability/instrumentation/otel-span-links-execution-graph.png" alt="Execution Graph for a multi-agent content-pipeline trace. The orchestrator contains research-agent, writer-agent, and editor-agent, connected by span-link edges that show data flowing from a search_web tool into the research LLM, then from research to writer to editor." style="width:100%;" >}}

Use `from` and `to` attributes to indicate the direction of the data flow:

```python
from opentelemetry import trace
from opentelemetry.trace import Link

tracer = trace.get_tracer(__name__)

# A tool span whose output feeds a downstream LLM call.
with tracer.start_as_current_span("lookup_order") as tool_span:
    tool_span.set_attribute("gen_ai.operation.name", "execute_tool")
    tool_ctx = tool_span.get_span_context()

# The LLM span links back to the tool span: its output became this span's input.
link = Link(context=tool_ctx, attributes={"from": "output", "to": "input"})
with tracer.start_as_current_span("chat gpt-4o", links=[link]) as llm_span:
    llm_span.set_attribute("gen_ai.operation.name", "chat")
```

<div class="alert alert-info">A span link that points to a span in a different trace is stored, but is not drawn in the Execution Graph, which visualizes a single trace.</div>

## Setup

Any method Datadog supports for ingesting OpenTelemetry traces works with Agent Observability. For the full list of supported ingestion paths, see [OpenTelemetry feature compatibility][10]. The following is one way to configure it.

To send OpenTelemetry traces to Agent Observability, configure your OpenTelemetry exporter with the following settings:

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

**Note**:
* If you are using an OpenTelemetry library other than the default OpenTelemetry SDK, you may need to configure the endpoint, protocol, and headers differently depending on the library's API. See your library's documentation for the appropriate configuration method.
* When using OpenTelemetry instrumentation, some data sent to Agent Observability may also be written to the corresponding APM traces. If you are protecting sensitive data, consider also configuring a Restricted Dataset on APM to match your Agent Observability access controls. See [Data Access Control][8] for more information.

#### Using strands-agents

If you are using the [`strands-agents` library][5], you need to set an additional environment variable to enable traces that are compliant with OpenTelemetry v1.37+:

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

This environment variable ensures that `strands-agents` emits traces following the OpenTelemetry v1.37+ semantic conventions for generative AI, which are required by Agent Observability.

### Instrumentation

To generate traces compatible with Agent Observability, do one of the following:

- Use an OpenTelemetry library or instrumentation package that emits spans following the [OpenTelemetry 1.37+ semantic conventions for generative AI][1] or the supported [OpenInference semantic conventions][12].
- Create custom OpenTelemetry instrumentation that produces the required `gen_ai.*` or OpenInference attributes defined by your chosen convention.

After your application starts sending data, the traces automatically appear in the [{{< ui >}}Agent Observability Traces{{< /ui >}} page][3]. To search for your traces in the UI, use the `ml_app` attribute, which is automatically set to the value of your OpenTelemetry root span's `service` attribute.

<div class="alert alert-danger">
<ul>
<li/> <a href="https://traceloop.com/docs/openllmetry/getting-started-python">OpenLLMetry</a> version 0.47+ is supported. See the <a href="#using-openllmetry">OpenLLMetry example</a>.
<li/> OpenInference spans are supported. See the <a href="#using-openinference">OpenInference example</a>.
<li/> There may be a 3-5 minute delay between sending traces and seeing them appear on the Agent Observability Traces page. If you have APM enabled, traces appear immediately in the APM Traces page.
</ul>
</div>

## Tested frameworks and libraries

These frameworks and libraries have been tested with Agent Observability. Frameworks that emit the supported attributes from the [OpenTelemetry 1.37+ GenAI semantic conventions][1] or [OpenInference semantic conventions][12] can send spans to Agent Observability.

{{< tabs >}}
{{% tab "Python" %}}
| Framework | Instrumentation | Supported Versions |
|-----------|----------------|--------------------|
| [OpenAI][20] | [`opentelemetry-instrumentation-openai-v2`][21] | >= 1.26.0 |
| [OpenAI][20] | [`openinference-instrumentation-openai`][36] | >= 1.26.0 |
| [Anthropic][22] | [`opentelemetry-instrumentation-anthropic`][23] | >= 0.51.0 |
| [Google GenAI][24] | [`opentelemetry-instrumentation-google-genai`][25] | >= 1.32.0 |
| [Google Vertex AI][26] | [`opentelemetry-instrumentation-vertexai`][27] | >= 1.64.0 |
| [AWS Bedrock][28] | [`opentelemetry-instrumentation-botocore`][29] | >= 1.31.57 |
| [LangChain][30] | [`opentelemetry-instrumentation-langchain`][31] | >= 0.3.21 |
| [LlamaIndex][32] | [`opentelemetry-instrumentation-llamaindex`][33] | >= 0.14.12 |
| [Strands Agents][5] | Native | >= 1.11.0 |
| [OpenLLMetry][34] | [`traceloop-sdk`][35] | >= 0.47.0 |

[5]: https://pypi.org/project/strands-agents/
[20]: https://platform.openai.com/docs/api-reference/introduction
[21]: https://pypi.org/project/opentelemetry-instrumentation-openai-v2/
[22]: https://docs.anthropic.com/en/api/
[23]: https://pypi.org/project/opentelemetry-instrumentation-anthropic/
[24]: https://ai.google.dev/gemini-api/docs
[25]: https://pypi.org/project/opentelemetry-instrumentation-google-genai/
[26]: https://cloud.google.com/vertex-ai/generative-ai/docs/overview
[27]: https://pypi.org/project/opentelemetry-instrumentation-vertexai/
[28]: https://docs.aws.amazon.com/bedrock/latest/userguide/
[29]: https://pypi.org/project/opentelemetry-instrumentation-botocore/
[30]: https://python.langchain.com/docs/introduction/
[31]: https://pypi.org/project/opentelemetry-instrumentation-langchain/
[32]: https://docs.llamaindex.ai/
[33]: https://pypi.org/project/opentelemetry-instrumentation-llamaindex/
[34]: https://www.traceloop.com/openllmetry
[35]: https://pypi.org/project/traceloop-sdk/
[36]: https://arize-ai.github.io/openinference/python/instrumentation/openinference-instrumentation-openai/
{{% /tab %}}
{{% tab "Node.js" %}}
| Framework | Instrumentation | Supported Versions |
|-----------|----------------|--------------------|
| [OpenAI][40] | [`@opentelemetry/instrumentation-openai`][41] | >= 4.19.0 |

[40]: https://platform.openai.com/docs/api-reference/introduction
[41]: https://www.npmjs.com/package/@opentelemetry/instrumentation-openai
{{% /tab %}}
{{% tab "Java" %}}
| Framework | Instrumentation | Supported Versions |
|-----------|----------------|--------------------|
| [Spring AI][50] | Native (through [Micrometer][51]) | >= 1.0.0 |
| [LangChain4j][52] | Native (OpenTelemetry module) | >= 0.31.0 |
| [AWS Bedrock][53] | [OpenTelemetry Java Agent][54] | AWS SDK >= 2.2 |

[50]: https://docs.spring.io/spring-ai/reference/
[51]: https://micrometer.io/
[52]: https://docs.langchain4j.dev/
[53]: https://docs.aws.amazon.com/bedrock/latest/userguide/
[54]: https://opentelemetry.io/docs/zero-code/java/agent/
{{% /tab %}}
{{< /tabs >}}

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

# Configure OTLP endpoint to send traces to Agent Observability
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

After running this example, search for `ml_app:simple-llm-example` in the Agent Observability UI to find the generated trace.

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

After running this example, search for `ml_app:simple-openllmetry-test` in the Agent Observability UI to find the generated trace.

### Using OpenInference

The following example uses the [OpenInference OpenAI instrumentation][11] to automatically instrument OpenAI calls with OpenTelemetry.

Configure the OpenTelemetry exporter and instrument the OpenAI client:

```python
import openai
from openinference.instrumentation.openai import OpenAIInstrumentor
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

resource = Resource.create({
    "service.name": "simple-openinference-test",
})

provider = TracerProvider(resource=resource)
trace.set_tracer_provider(provider)

exporter = OTLPSpanExporter(
    endpoint="{{< region-param key="otlp_trace_endpoint" code="true" >}}",
    headers={
        "dd-api-key": "<YOUR_DATADOG_API_KEY>",
        "dd-ml-app": "simple-openinference-test",
        "dd-otlp-source": "llmobs",
    },
)

provider.add_span_processor(BatchSpanProcessor(exporter))

OpenAIInstrumentor().instrument(tracer_provider=provider)

# Make OpenAI call (automatically traced)
client = openai.OpenAI(api_key="<YOUR_OPENAI_API_KEY>")
client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "What is 15 multiplied by 7?"}]
)

provider.force_flush(timeout_millis=5000)
```

After running this example, search for `ml_app:simple-openinference-test` in the Agent Observability UI to find the generated trace.

## Attribute mapping reference

This section provides the mappings from OpenTelemetry GenAI semantic conventions (v1.37+), OpenLLMetry, and OpenInference to Datadog's Agent Observability span schema.

<div class="alert alert-info">Provider-specific mappings are documented separately in the <a href="#openllmetry-attribute-mappings">OpenLLMetry attribute mappings</a> and <a href="#openinference-attribute-mappings">OpenInference attribute mappings</a> sections.</div>

### OpenTelemetry 1.37+ attribute mappings

#### Base span attributes

| OTLP Field | Agent Observability Field | Notes |
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

| `gen_ai.operation.name` | Agent Observability `span.kind` |
|-------------------------|-------------------|
| `generate_content`, `chat`, `text_completion`, `completion` | `llm` |
| `embeddings`, `embedding` | `embedding` |
| `execute_tool` | `tool` |
| `invoke_agent`, `create_agent` | `agent` |
| `rerank`, `unknown`, *(default)* | `workflow` |

#### Model information

| OTel Attribute | Agent Observability Field | Notes |
|----------------|--------------|-------|
| `gen_ai.operation.name` | `meta.span.kind` | See resolution table above |
| `gen_ai.provider.name` | `meta.model_provider` | Falls back to `gen_ai.system`, then `custom` |
| `gen_ai.response.model` | `meta.model_name` | |
| `gen_ai.request.model` | `meta.model_name` | Fallback if `response.model` absent |

#### Token usage metrics

| OTel Attribute | Agent Observability Field |
|----------------|--------------|
| `gen_ai.usage.input_tokens` | `metrics.input_tokens` |
| `gen_ai.usage.output_tokens` | `metrics.output_tokens` |
| `gen_ai.usage.prompt_tokens` | `metrics.prompt_tokens` |
| `gen_ai.usage.completion_tokens` | `metrics.completion_tokens` |
| `gen_ai.usage.total_tokens` | `metrics.total_tokens` |

#### Request parameters

All `gen_ai.request.*` parameters map to `meta.metadata.*` with the prefix stripped.

| OTel Attribute | Agent Observability Field |
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

| OTel Attribute | Agent Observability Field | Notes |
|----------------|--------------|-------|
| `gen_ai.tool.name` | `name` | Overrides span name |
| `gen_ai.tool.call.id` | `metadata.tool_id` | |
| `gen_ai.tool.description` | `metadata.tool_description` | |
| `gen_ai.tool.type` | `metadata.tool_type` | |
| `gen_ai.tool.definitions` | `meta.tool_definitions` | Parsed JSON array |
| `gen_ai.tool.call.arguments` | `input.value` | |
| `gen_ai.tool.call.result` | `output.value` | |

#### Session and conversation

| OTel Attribute | Agent Observability Field | Notes |
|----------------|--------------|-------|
| `gen_ai.conversation.id` | `session_id` | Also added to `metadata.conversation_id` and tags |

When an APM trace's top-most span is not a gen_ai span (for example, an HTTP handler that invokes several LLMs in parallel), Agent Observability produces a separate Agent Observability trace for each top-level gen_ai span in that APM trace. To keep these split traces grouped together in the UI, set `gen_ai.conversation.id` to the same value on each gen_ai span within the APM trace: Agent Observability groups by `session_id`, so the resulting traces appear together even though they have distinct Agent Observability trace IDs. This is the same attribute used for cross-request conversation grouping.

#### Span links

Span links you set on a GenAI span appear as `span_links` on the corresponding Agent Observability span.

| OTel span link field | Agent Observability Field | Notes |
|----------------------|--------------|-------|
| `trace_id` | `span_links[].trace_id` | 128-bit trace IDs are emitted as hex. A link to a span in the same trace resolves to that span's Agent Observability trace ID. |
| `span_id` | `span_links[].span_id` | Decimal |
| `attributes` | `span_links[].attributes` | Dots in attribute keys are replaced with underscores (for example, `messaging.operation` becomes `messaging_operation`). |

Links between spans in the same trace are drawn as edges in that trace's Execution Graph.

#### Response attributes

| OTel Attribute | Agent Observability Field |
|----------------|--------------|
| `gen_ai.response.model` | `meta.model_name` |
| `gen_ai.response.finish_reasons` | `metadata.finish_reasons` |

#### Input and output messages

Input and output messages are extracted from the following sources, in priority order:

1. Direct attributes: `gen_ai.input.messages`, `gen_ai.output.messages`, `gen_ai.system_instructions`
2. Span events (`meta["events"]`) with name `gen_ai.client.inference.operation.details`

| OTel Source | Agent Observability Field | Notes |
|-------------|--------------|-------|
| `gen_ai.input.messages` | `meta.input.messages` (llm) / `meta.input.value` (others) | |
| `gen_ai.output.messages` | `meta.output.messages` (llm) / `meta.output.value` (others) | |
| `gen_ai.system_instructions` | Prepended to input | Added as system role messages |

##### Embedding spans

| OTel Source | Agent Observability Field |
|-------------|--------------|
| `gen_ai.input.messages` | `meta.input.documents` |
| N/A | `meta.output.value` = `[N embedding(s) returned]` |

#### Tags

Tags are placed directly on the span:

- Non-`gen_ai.*` attributes are converted to `key:value` tags
- Unknown `gen_ai.*` keys are added with prefix stripped
- Filtered out: `_dd.*`, `llm.*`, `ddtags`, `events`, and already specifically mapped `gen_ai.*` keys

<div class="alert alert-info">Any <code>gen_ai.*</code> attributes that are not explicitly mapped to Agent Observability span fields are placed in the LLM span's tags, with a 256 character limit per value. Values exceeding this limit are truncated. All other non-<code>gen_ai</code> attributes are dropped.</div>

#### Custom metadata

To add structured metadata to a span's `meta.metadata` field instead of its tags, set the `_dd.ml_obs.metadata` attribute to a JSON **object** string. Its keys and values (including nested objects and arrays) are merged into `meta.metadata` and rendered as JSON in the UI.

```python
import json

span.set_attribute("_dd.ml_obs.metadata", json.dumps({
    "experiment": "a/b",
    "config": {
        "retry": {"max": 3, "backoff": "exp"},
        "feature_flags": ["new_ranker", "fast_path"],
    },
}))
```

Notes:

- Values may be arbitrarily nested; unlike tags, metadata is not subject to the 256 character per-value limit.
- Keys that collide with metadata derived from `gen_ai.*` attributes (for example, `temperature`) are overwritten by your values, with the exception of `model_name` and `model_provider`, which are reserved.
- The value must be a JSON object. A value that is not valid JSON, or that is a top-level array or scalar, is dropped.

### OpenLLMetry attribute mappings

This section documents OpenLLMetry-specific attribute mappings that differ from or extend the standard OpenTelemetry GenAI semantic conventions.

#### Span kind resolution

`llm.request.type` is used as a fallback when `gen_ai.operation.name` is absent.

| `llm.request.type` | Agent Observability `span.kind` |
|--------------------|-------------------|
| `chat` | `llm` |
| `completion` | `llm` |
| `embedding` | `embedding` |
| `rerank` | `workflow` |
| `unknown`, *(default)* | `workflow` |

#### Model information

| OpenLLMetry Attribute | Agent Observability Field | Notes |
|-----------------------|--------------|-------|
| `gen_ai.system` | `meta.model_provider` | Fallback when `gen_ai.provider.name` absent |

#### Token usage metrics

| OpenLLMetry Attribute | Agent Observability Field | Notes |
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

When `role = "tool"` and `tool_call_id` are present, the message is converted to a tool result:

| OpenLLMetry Attribute | Maps To |
|-----------------------|---------|
| `gen_ai.prompt.<index>.tool_call_id` | `tool_results[].tool_id` |
| `gen_ai.prompt.<index>.content` | `tool_results[].result` |

#### Embedding spans

For embedding spans, documents are extracted from prompt content attributes.

| OpenLLMetry Source | Agent Observability Field |
|--------------------|--------------|
| `gen_ai.prompt.<index>.content` | `meta.input.documents[].text` |

#### Tags filtering

The following OpenLLMetry-specific attributes are filtered from tags:

- `gen_ai.prompt.*`
- `gen_ai.completion.*`
- `llm.*`

### OpenInference attribute mappings

Agent Observability recognizes an OpenInference span when the `openinference.span.kind` attribute is present and non-empty. The following sections document the OpenInference attributes that map to dedicated Agent Observability fields.

#### Span kind resolution

If both `gen_ai.operation.name` and `openinference.span.kind` are present, `gen_ai.operation.name` takes precedence.

| `openinference.span.kind` | Agent Observability `span.kind` |
|---------------------------|---------------------------------|
| `LLM` | `llm` |
| `EMBEDDING` | `embedding` |
| `TOOL` | `tool` |
| `AGENT` | `agent` |
| `RETRIEVER` | `retrieval` |
| `CHAIN`, `RERANKER`, `GUARDRAIL`, `EVALUATOR`, `PROMPT`, other values | `workflow` |

#### Model information

| OpenInference Attribute | Agent Observability Field | Notes |
|-------------------------|---------------------------|-------|
| `llm.provider` | `meta.model_provider` | Preferred OpenInference provider source |
| `llm.system` | `meta.model_provider` | Fallback when `llm.provider` is absent |
| `llm.model_name` | `meta.model_name` | |
| `embedding.model_name` | `meta.model_name` | Fallback for embedding spans |

For `llm` and `embedding` spans, missing provider or model values are set to `unknown`.

#### Token usage metrics

| OpenInference Attribute | Agent Observability Field |
|-------------------------|---------------------------|
| `llm.token_count.prompt` | `metrics.prompt_tokens` |
| `llm.token_count.completion` | `metrics.completion_tokens` |
| `llm.token_count.total` | `metrics.total_tokens` |
| `llm.token_count.prompt_details.cache_read` | `metrics.cache_read_input_tokens` |
| `llm.token_count.prompt_details.cache_write` | `metrics.cache_write_input_tokens` |
| `llm.token_count.completion_details.reasoning` | `metrics.reasoning_output_tokens` |

#### Session, user, and metadata

| OpenInference Attribute | Agent Observability Field | Notes |
|-------------------------|---------------------------|-------|
| `session.id` | `session_id` | Also adds `session_id` and `conversation_id` tags and propagates the session to the trace root |
| `user.id` | `tags` | Added as `user_id:<value>` |
| `tag.tags` | `tags` | Each list item becomes a span tag |
| `llm.invocation_parameters` | `meta.metadata` | Parsed as a JSON object |
| `metadata` | `meta.metadata` | Parsed as a JSON object |

Reserved Agent Observability fields in `llm.invocation_parameters` and `metadata` do not override dedicated span fields.

#### Tool attributes

| OpenInference Attribute | Agent Observability Field | Notes |
|-------------------------|---------------------------|-------|
| `tool.name` | `name` | Overrides the span name |
| `tool.id` | `meta.metadata.tool_id` | |
| `tool.description` | `meta.metadata.tool_description` | |
| `tool.parameters` | `meta.metadata.tool_parameters` | |
| `input.value` | `meta.input.value` | Used directly for `tool`, `agent`, and `workflow` spans |
| `output.value` | `meta.output.value` | Used directly for `tool`, `agent`, and `workflow` spans |

#### Input and output messages

In these attributes, `<direction>` is `input` or `output`.
Input and output are extracted from the following sources, in priority order:

1. OpenTelemetry `gen_ai.*` direct attributes and span events
2. OpenLLMetry indexed attributes
3. OpenInference indexed attributes
4. OpenInference `input.value` and `output.value`

| OpenInference Source | Agent Observability Field |
|----------------------|---------------------------|
| `llm.input_messages.<index>.*` | `meta.input.messages` (llm) / `meta.input.value` (other span kinds) |
| `llm.output_messages.<index>.*` | `meta.output.messages` (llm) / `meta.output.value` (other span kinds) |
| `input.value` | Input fallback |
| `output.value` | Output fallback |

The following indexed message attributes are supported:

| OpenInference Attribute | Mapping |
|-------------------------|---------|
| `llm.<direction>_messages.<message-index>.message.role` | Message role |
| `llm.<direction>_messages.<message-index>.message.content` | Text content |
| `llm.<direction>_messages.<message-index>.message.contents.<content-index>.message_content.text` | Ordered text content |
| `llm.<direction>_messages.<message-index>.message.contents.<content-index>.message_content.image.image.url` | Ordered image content |
| `llm.<direction>_messages.<message-index>.message.tool_calls.<tool-index>.tool_call.*` | Tool call ID, name, and arguments |
| `llm.<direction>_messages.<message-index>.message.contents.<content-index>.tool_call.*` | Tool call within ordered content |
| `llm.<direction>_messages.<message-index>.message.tool_call_id` | Tool result ID when the message role is `tool` |

Image content maps to an image URI while preserving its position among other message content.

#### Embedding spans

| OpenInference Source | Agent Observability Field |
|----------------------|---------------------------|
| `embedding.embeddings.<index>.embedding.text` | `meta.input.documents[].text` |
| N/A | `meta.output.value` = `[N embedding(s) returned]` |

#### Retrieval spans

| OpenInference Source | Agent Observability Field |
|----------------------|---------------------------|
| `input.value` | `meta.input.value` |
| `retrieval.documents.<index>.document.content` | `meta.output.documents[].text` |
| `retrieval.documents.<index>.document.id` | `meta.output.documents[].id` |
| `retrieval.documents.<index>.document.score` | `meta.output.documents[].score` |
| `retrieval.documents.<index>.document.metadata` | `meta.output.documents[].metadata` (parsed JSON object) |

#### Tags filtering

OpenInference attributes with `llm.*`, `retrieval.*`, `embedding.*`, and `reranker.*` prefixes are excluded from tags. Specifically mapped values such as `input.value`, `output.value`, `metadata`, `tag.tags`, and `tool.parameters` are also excluded from duplicate tags.

Other non-empty OpenInference attributes with values of 256 characters or fewer are added as `key:value` tags. The `tag.tags` list is promoted directly to span tags.

## Supported semantic conventions

Agent Observability supports spans that follow the OpenTelemetry 1.37+ semantic conventions for generative AI, including:

- LLM operations with `gen_ai.provider.name`, `"gen_ai.operation.name"`, `gen_ai.request.model`, and other gen_ai attributes
- Operation inputs/outputs on direct span attributes or via span events
- Token usage metrics (`gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`)
- Model parameters and metadata

For the complete list of supported attributes and their specifications, see the [OpenTelemetry semantic conventions for generative AI documentation][1].

## Disabling Agent Observability conversion

If you'd only like your generative AI spans to remain in APM and not appear in Agent Observability, you can disable the automatic conversion by setting the `dd_llmobs_enabled` attribute to `false`. Setting this attribute on any span in a trace prevents the entire trace from being converted to Agent Observability.

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
    # Disable Agent Observability conversion for this entire trace
    span.set_attribute("dd_llmobs_enabled", False)
```

[1]: https://github.com/open-telemetry/semantic-conventions-genai
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/llm/traces
[4]: /help/
[5]: https://pypi.org/project/strands-agents/
[6]: /llm_observability/evaluations/external_evaluations
[7]: https://strandsagents.com/latest/
[8]: /account_management/rbac/data_access/
[9]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[10]: /opentelemetry/compatibility/#feature-compatibility
[11]: https://arize-ai.github.io/openinference/python/instrumentation/openinference-instrumentation-openai/
[12]: https://arize-ai.github.io/openinference/spec/semantic_conventions.html
