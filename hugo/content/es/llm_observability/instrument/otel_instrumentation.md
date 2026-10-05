---
aliases:
- /es/llm_observability/instrumentation/otel_instrumentation/
description: Instrumente aplicaciones de LLM con OpenTelemetry utilizando convenciones
  semánticas de GenAI u OpenInference y envíe trazas a Agent Observability sin el
  SDK de Datadog.
title: Instrumentación de OpenTelemetry
---
## Descripción general {#overview}
Al utilizar las convenciones semánticas estandarizadas de OpenTelemetry para operaciones de IA generativa, puede instrumentar sus aplicaciones de LLM con cualquier biblioteca o framework compatible con OpenTelemetry y visualizar las trazas en Agent Observability.

Agent Observability admite la ingesta de trazas de OpenTelemetry que sigan las [convenciones semánticas de OpenTelemetry 1.37+ para IA generativa][1] o las [convenciones semánticas de OpenInference][12] compatibles. Esto le permite enviar trazas de LLM directamente desde aplicaciones instrumentadas con OpenTelemetry a Datadog sin necesidad del SDK de Agent Observability ni de un Datadog Agent.

## Requisitos previos {#prerequisites}

- Una [clave de Datadog API][2]
- Una aplicación instrumentada con OpenTelemetry que emite trazas siguiendo las [convenciones semánticas de OpenTelemetry 1.37+ para IA generativa][1] o las [convenciones semánticas de OpenInference][12] compatibles

## Funciones compatibles {#supported-features}

### Evaluaciones {#evaluations}

Para enviar [evaluaciones externas directamente a la API](/llm_observability/investigate/evaluations/external_evaluations#submitting-external-evaluations-with-the-api) para tramos de OpenTelemetry, incluya la etiqueta `source:otel` en la evaluación. Al hacer referencia a tramos, proporcione `span_id` y `trace_id` como cadenas decimales. OpenTelemetry utiliza IDs hexadecimales de forma nativa, por lo que debe convertirlos a decimal antes de enviar las evaluaciones. Por ejemplo, utilice `int(hex_span_id, 16)` de Python para convertir un ID de tramo hexadecimal a su equivalente decimal.

### Prompt Tracking {#prompt-tracking}

Para obtener información sobre el uso de Prompt Tracking con tramos de OpenTelemetry, consulte [Prompt Tracking - OpenTelemetry Instrumentation](/llm_observability/instrument/prompt_tracking#opentelemetry-instrumentation).

### Experimentos {#experiments}

Puede utilizar tramos de OpenTelemetry dentro de [Experimentos de Agent Observability](/llm_observability/improve/experiments/setup#using-opentelemetry-spans-inside-experiments). Al configurar `DD_TRACE_OTEL_ENABLED=1`, los tramos de OTel creados dentro de una tarea de experimento aparecen automáticamente como hijos del tramo del experimento.

### Soporte multimodal {#multimodal-support}

El audio y las imágenes en los mensajes de OpenTelemetry se renderizan en la vista de trazas. Datadog extrae contenido multimedia de las partes de mensajes que siguen las convenciones semánticas de GenAI de OpenTelemetry, como se describe en [Media in messages](#media-in-messages).

Solo se renderiza el contenido multimedia transportado en línea como bytes base64. Una URL remota se registra como una referencia de texto y nunca se recupera. Para conocer los campos, formatos y límites de tamaño que se aplican una vez que el contenido multimedia llega a un tramo, consulte [Multimodal Support](/llm_observability/instrument/multimodal/).

### Enlaces de tramo {#span-links}

Utilice [OpenTelemetry span links][9] en sus tramos de GenAI para expresar relaciones que no sean de padre-hijo, como cuando la salida de un tramo alimenta la entrada de otro tramo. Cuando dos tramos vinculados se encuentran en la misma traza, el enlace aparece como un borde en el **Execution Graph** de esa traza, para que pueda ver cómo fluyen los datos entre tramos hermanos (por ejemplo, la salida de una herramienta alimentando una llamada a un LLM posterior).

{{< img src="llm_observability/instrumentation/otel-span-links-execution-graph.png" alt="Execution Graph para una traza de canalización de contenido de múltiples agentes. El orquestador contiene research-agent, writer-agent y editor-agent, conectados por bordes de enlaces de tramo que muestran datos fluyendo desde una herramienta search_web hacia el LLM de investigación, luego de la investigación al escritor y al editor." style="width:100%;" >}}

Utilice los atributos `from` y `to` para indicar la dirección del flujo de datos:

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

<div class="alert alert-info">Un enlace de tramo que apunta a un tramo en una traza diferente se almacena, pero no se dibuja en el Execution Graph, que visualiza una única traza.</div>

## Configuración {#setup}

Cualquier método que Datadog admita para la ingesta de trazas de OpenTelemetry funciona con Agent Observability. Para obtener la lista completa de rutas de ingesta admitidas, consulte [OpenTelemetry feature compatibility][10]. La siguiente es una forma de configurarlo.

Para enviar trazas de OpenTelemetry a Agent Observability, configure su exportador de OpenTelemetry con los siguientes ajustes:

### Configuración {#configuration}

Establezca las siguientes variables de entorno en su aplicación:

```
OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT={{< region-param key="otlp_trace_endpoint" code="true" >}}
OTEL_EXPORTER_OTLP_TRACES_HEADERS=dd-api-key=<YOUR_API_KEY>,dd-otlp-source=llmobs
```

Reemplace `<YOUR_API_KEY>` con su [clave de Datadog API][2].

Si su framework admitía anteriormente una versión de la especificación de OpenTelemetry anterior a la 1.37, también debe establecer:

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

Esta variable de entorno habilita trazas de OpenTelemetry compatibles con la versión 1.37+ para frameworks que ahora admiten las convenciones semánticas de la versión 1.37+, pero que anteriormente admitían versiones anteriores (como [strands-agents][5]).

**Nota**:
* Si está utilizando una biblioteca de OpenTelemetry distinta al SDK de OpenTelemetry predeterminado, es posible que deba configurar el punto de conexión, el protocolo y los encabezados de manera diferente según la API de la biblioteca. Consulte la documentación de su biblioteca para conocer el método de configuración adecuado.
* Al utilizar la instrumentación de OpenTelemetry, algunos datos enviados a Agent Observability también pueden escribirse en los tramos de APM correspondientes. Si está protegiendo datos confidenciales, considere también configurar un conjunto de datos restringido (Restricted Dataset) en APM para que coincida con su Access Control de Agent Observability. Consulte [Data Access Control][8] para obtener más información.

#### Uso de strands-agents {#using-strands-agents}

Si está utilizando la biblioteca [`strands-agents`][5], debe establecer una variable de entorno adicional para habilitar los tramos que sean compatibles con OpenTelemetry v1.37+:

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

Esta variable de entorno garantiza que `strands-agents` emita tramos siguiendo las convenciones semánticas de OpenTelemetry v1.37+ para IA generativa, las cuales son requeridas por Agent Observability.

### Instrumentación {#instrumentation}

Para generar tramos compatibles con Agent Observability, realice una de las siguientes acciones:

- Utilice una biblioteca de OpenTelemetry o un paquete de instrumentación que emita tramos siguiendo las [convenciones semánticas de OpenTelemetry 1.37+ para IA generativa][1] o las [convenciones semánticas de OpenInference][12] compatibles.
- Cree una instrumentación de OpenTelemetry personalizada que produzca los `gen_ai.*` atributos requeridos o los atributos de OpenInference definidos por la convención que haya elegido.

Después de que su aplicación comience a enviar datos, los tramos aparecerán automáticamente en la [{{< ui >}}Agent Observability Traces{{< /ui >}} página][3]. Para buscar sus tramos en la interfaz de usuario, utilice el atributo `ml_app`, que se establece automáticamente en el valor del atributo `service` del tramo raíz de su OpenTelemetry.

<div class="alert alert-danger">
<ul>
<li/> <a href="https://traceloop.com/docs/openllmetry/getting-started-python">OpenLLMetry</a> versión 0.47+ es compatible. Consulte el <a href="#using-openllmetry">ejemplo de OpenLLMetry</a>.
<li/> Los tramos de OpenInference son compatibles. Consulte el <a href="#using-openinference">ejemplo de OpenInference</a>.
<li/> La instrumentación nativa de OpenTelemetry de <a href="https://langfuse.com/integrations/native/opentelemetry">Langfuse</a> es compatible. Consulte los <a href="#langfuse-attribute-mappings">mapeos de atributos de Langfuse</a>.
<li/> Puede haber un retraso de 3 a 5 minutos entre el envío de tramos y su aparición en la página de Agent Observability Traces. Si tiene habilitado APM, los tramos aparecen inmediatamente en la página de APM Traces.
</ul>
</div>

## Frameworks y bibliotecas probados {#tested-frameworks-and-libraries}

Estos frameworks y bibliotecas han sido probados con Agent Observability. Los frameworks que emiten los atributos compatibles de las [convenciones semánticas de GenAI de OpenTelemetry 1.37+][1] o las [convenciones semánticas de OpenInference][12] pueden enviar tramos a Agent Observability.

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
| [Strands Agents][5] | Nativo | >= 1.11.0 |
| [OpenLLMetry][34] | [`traceloop-sdk`][35] | >= 0.47.0 |
| [Langfuse][37] | Nativo | >= 4.0.0 |

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
[37]: https://langfuse.com/integrations/native/opentelemetry
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
| [Spring AI][50] | Nativo (a través de [Micrometer][51]) | >= 1.0.0 |
| [LangChain4j][52] | Nativo (módulo OpenTelemetry) | >= 0.31.0 |
| [AWS Bedrock][53] | [OpenTelemetry Java Agent][54] | AWS SDK >= 2.2 |

[50]: https://docs.spring.io/spring-ai/reference/
[51]: https://micrometer.io/
[52]: https://docs.langchain4j.dev/
[53]: https://docs.aws.amazon.com/bedrock/latest/userguide/
[54]: https://opentelemetry.io/docs/zero-code/java/agent/
{{% /tab %}}
{{< /tabs >}}

## Ejemplos {#examples}

### Uso de Strands Agents {#using-strands-agents-1}

El siguiente ejemplo demuestra una aplicación completa que utiliza [Strands Agents][7] con la integración de OpenTelemetry. Este mismo enfoque funciona con cualquier marco de trabajo que admita las convenciones semánticas de OpenTelemetry versión 1.37+ para IA generativa.

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

### Instrumentación personalizada de OpenTelemetry {#custom-opentelemetry-instrumentation}

El siguiente ejemplo demuestra cómo instrumentar su aplicación de LLM utilizando código personalizado de OpenTelemetry. Este enfoque le brinda control total sobre las trazas y los tramos emitidos por su aplicación.

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

Después de ejecutar este ejemplo, busque `ml_app:simple-llm-example` en la interfaz de usuario de Agent Observability para encontrar la traza generada.

### Uso de OpenLLMetry {#using-openllmetry}

El siguiente ejemplo demuestra el uso de [OpenLLMetry](https://github.com/traceloop/openllmetry) para instrumentar automáticamente llamadas de OpenAI con OpenTelemetry.

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

Después de ejecutar este ejemplo, busque `ml_app:simple-openllmetry-test` en la interfaz de usuario de Agent Observability para encontrar la traza generada.

### Uso de OpenInference {#using-openinference}

El siguiente ejemplo utiliza la [instrumentación de OpenAI de OpenInference][11] para instrumentar automáticamente llamadas de OpenAI con OpenTelemetry.

Configure el exportador de OpenTelemetry e instrumente el cliente de OpenAI:

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

Después de ejecutar este ejemplo, busque `ml_app:simple-openinference-test` en la interfaz de usuario de Agent Observability para encontrar la traza generada.

## Referencia de asignación de atributos {#attribute-mapping-reference}

Esta sección proporciona las asignaciones de las convenciones semánticas de GenAI de OpenTelemetry (v1.37+), OpenLLMetry, OpenInference y Langfuse al esquema de tramo de Agent Observability de Datadog.

Si a un tramo le falta un atributo esperado, o un atributo no se puede analizar, Agent Observability marca el tramo con un indicador de **Advertencias de asignación**. Consulte [Solución de problemas de advertencias de asignación](#troubleshooting-mapping-warnings) para obtener descripciones y soluciones.

<div class="alert alert-info">Las asignaciones específicas del proveedor se documentan por separado en las secciones de <a href="#openllmetry-attribute-mappings">asignaciones de atributos de OpenLLMetry</a>, <a href="#openinference-attribute-mappings">asignaciones de atributos de OpenInference</a> y <a href="#langfuse-attribute-mappings">asignaciones de atributos de Langfuse</a>.</div>

### Asignaciones de atributos de OpenTelemetry 1.37+ {#opentelemetry-137-attribute-mappings}

#### Atributos de tramo base {#base-span-attributes}

| Campo OTLP | Campo de Agent Observability | Notas |
|------------|--------------|-------|
| `resource.attributes.service.name` | `ml_app`, `tags.service` | |
| `name` | `name` | Reemplazado por `gen_ai.tool.name` si está presente |
| `parent_span_id` | `parent_id` | |
| `start_time_unix_nano` | `start_ns` | |
| `end_time_unix_nano` | `duration` | Calculado: fin - inicio |
| `status.code` | `status` | `error` si > 0, de lo contrario `ok` |
| `status.message` | `meta.error.message` | |
| `attributes.error.type` | `meta.error.type` | |

#### Resolución de tipo de tramo {#span-kind-resolution}

| `gen_ai.operation.name` | Agent Observability `span.kind` |
|-------------------------|-------------------|
| `generate_content`, `chat`, `text_completion`, `completion` | `llm` |
| `embeddings`, `embedding` | `embedding` |
| `execute_tool` | `tool` |
| `invoke_agent`, `create_agent` | `agent` |
| `rerank`, `unknown`, *(predeterminado)* | `workflow` |

#### Información del modelo {#model-information}

| Atributo de OTel | Campo de Agent Observability | Notas |
|----------------|--------------|-------|
| `gen_ai.operation.name` | `meta.span.kind` | Consulte la tabla de resolución anterior |
| `gen_ai.provider.name` | `meta.model_provider` | Recurre a `gen_ai.system`, luego a `custom` |
| `gen_ai.response.model` | `meta.model_name` | |
| `gen_ai.request.model` | `meta.model_name` | Respaldo si `response.model` está ausente |

#### Métricas de uso de tokens {#token-usage-metrics}

| Atributo de OTel | Campo de Agent Observability |
|----------------|--------------|
| `gen_ai.usage.input_tokens` | `metrics.input_tokens` |
| `gen_ai.usage.output_tokens` | `metrics.output_tokens` |
| `gen_ai.usage.prompt_tokens` | `metrics.prompt_tokens` |
| `gen_ai.usage.completion_tokens` | `metrics.completion_tokens` |
| `gen_ai.usage.total_tokens` | `metrics.total_tokens` |

#### Parámetros de solicitud {#request-parameters}

Todos los parámetros `gen_ai.request.*` se asignan a `meta.metadata.*` con el prefijo eliminado.

| Atributo de OTel | Campo de Agent Observability |
|----------------|--------------|
| `gen_ai.request.seed` | `metadata.seed` |
| `gen_ai.request.frequency_penalty` | `metadata.frequency_penalty` |
| `gen_ai.request.max_tokens` | `metadata.max_tokens` |
| `gen_ai.request.stop_sequences` | `metadata.stop_sequences` |
| `gen_ai.request.temperature` | `metadata.temperature` |
| `gen_ai.request.top_k` | `metadata.top_k` |
| `gen_ai.request.top_p` | `metadata.top_p` |
| `gen_ai.request.choice.count` | `metadata.choice.count` |

#### Atributos de la herramienta {#tool-attributes}

| Atributo de OTel | Campo de Agent Observability | Notas |
|----------------|--------------|-------|
| `gen_ai.tool.name` | `name` | Anula el nombre del tramo |
| `gen_ai.tool.call.id` | `metadata.tool_id` | |
| `gen_ai.tool.description` | `metadata.tool_description` | |
| `gen_ai.tool.type` | `metadata.tool_type` | |
| `gen_ai.tool.definitions` | `meta.tool_definitions` | Matriz JSON analizada |
| `gen_ai.tool.call.arguments` | `input.value` | |
| `gen_ai.tool.call.result` | `output.value` | |

#### Sesión y conversación {#session-and-conversation}

| Atributo de OTel | Campo de Agent Observability | Notas |
|----------------|--------------|-------|
| `gen_ai.conversation.id` | `session_id` | También se agregó a `metadata.conversation_id` y etiquetas |

Cuando el tramo superior de una traza de APM no es un tramo de gen_ai (por ejemplo, un controlador HTTP que invoca varios LLM en paralelo), Agent Observability genera una traza de Agent Observability independiente para cada tramo de gen_ai de nivel superior en esa traza de APM. Para mantener estas trazas divididas agrupadas en la interfaz de usuario, establezca `gen_ai.conversation.id` en el mismo valor en cada tramo de gen_ai dentro de la traza de APM: Agent Observability agrupa por `session_id`, por lo que las trazas resultantes aparecen juntas aunque tengan ID de traza de Agent Observability distintos. Este es el mismo atributo utilizado para la agrupación de conversaciones entre solicitudes.

#### Enlaces de tramo {#span-links-1}

Los enlaces de tramo que usted establece en un tramo de GenAI aparecen como `span_links` en el tramo de Agent Observability correspondiente.

| Campo de enlace de tramo OTel | Campo de Agent Observability | Notas |
|----------------------|--------------|-------|
| `trace_id` | `span_links[].trace_id` | Los ID de traza de 128 bits se emiten como hexadecimales. Un enlace a un tramo en la misma traza se resuelve en el ID de traza de Agent Observability de ese tramo. |
| `span_id` | `span_links[].span_id` | Decimal |
| `attributes` | `span_links[].attributes` | Los puntos en las claves de atributo se reemplazan con guiones bajos (por ejemplo, `messaging.operation` se convierte en `messaging_operation`). |

Los enlaces entre tramos en la misma traza se dibujan como bordes en el Gráfico de ejecución de esa traza.

#### Atributos de respuesta {#response-attributes}

| Atributo de OTel | Campo de Agent Observability |
|----------------|--------------|
| `gen_ai.response.model` | `meta.model_name` |
| `gen_ai.response.finish_reasons` | `metadata.finish_reasons` |

#### Mensajes de entrada y salida {#input-and-output-messages}

Los mensajes de entrada y salida se extraen de las siguientes fuentes, en orden de prioridad:

1. Atributos directos: `gen_ai.input.messages`, `gen_ai.output.messages`, `gen_ai.system_instructions`
2. Eventos de tramo (`meta["events"]`) con nombre `gen_ai.client.inference.operation.details`

| Fuente OTel | Campo de Agent Observability | Notas |
|-------------|--------------|-------|
| `gen_ai.input.messages` | `meta.input.messages` (llm) / `meta.input.value` (otros) | |
| `gen_ai.output.messages` | `meta.output.messages` (llm) / `meta.output.value` (otros) | |
| `gen_ai.system_instructions` | Antepuesto a la entrada | Añadido como mensajes de rol del sistema |

##### Contenido multimedia en los mensajes {#media-in-messages}

Las partes del mensaje que transportan contenido multimedia se extraen a los campos tipados `audio_parts` y `image_parts` en el mensaje:

| Tipo de parte | Comportamiento |
|-----------|----------|
| `blob` con `mime_type` y bytes en línea | Extraído a `image_parts` o `audio_parts`. Cuando la parte omite `modality`, se infiere a partir del tipo MIME. |
| `uri` que transporta un URI de datos de imagen en base64, como `data:image/png;base64,...` | Extraído a `image_parts`. |
| `uri` que transporta una URL remota | Registrado como la referencia de texto `[<modality>: <uri>]`. La URL no se recupera. |
| `file` con un `file_id` | Registrado como la referencia de texto `[<modality> file: <file_id>]`. |

También se añade un marcador posicional como `[image blob: image/png]` al texto del mensaje para que el contenido multimedia mantenga su lugar entre las otras partes.

El audio llega a `audio_parts` solo a través de partes `blob`. Un URI de datos de audio en una parte `uri` se registra como texto, y las convenciones especifican `blob` como el tipo de parte para datos en base64 en línea, así que prefiera `blob` tanto para audio como para imágenes.

Para conocer los formatos que la vista de traza renderiza y los límites de tamaño que se aplican, consulte [Soporte multimodal](/llm_observability/instrument/multimodal/).

##### Tramos de incrustación {#embedding-spans}

| Fuente OTel | Campo de Agent Observability |
|-------------|--------------|
| `gen_ai.input.messages` | `meta.input.documents` |
| N/A | `meta.output.value` = `[N embedding(s) returned]` |

#### Etiquetas {#tags}

Las etiquetas se colocan directamente en el tramo:

- Los atributos no-`gen_ai.*` se convierten en etiquetas `key:value`
- Las claves desconocidas `gen_ai.*` se agregan con el prefijo eliminado
- Filtrado: `_dd.*`, `llm.*`, `ddtags`, `events` y claves `gen_ai.*` ya asignadas específicamente

<div class="alert alert-info">Cualquiera <code>gen_ai.*</code> los atributos que no están asignados explícitamente a los campos de tramo de Agent Observability se colocan en las etiquetas del tramo de LLM, con un límite de 256 caracteres por valor. Los valores que exceden este límite se truncan. Todos los demás atributos no-<code>gen_ai</code> se descartan.</div>

#### Metadatos personalizados {#custom-metadata}

Para agregar metadatos estructurados al campo `meta.metadata` de un tramo en lugar de a sus etiquetas, establezca el atributo `_dd.ml_obs.metadata` en una cadena de **objeto** JSON. Sus claves y valores (incluidos objetos y matrices anidados) se combinan en `meta.metadata` y se representan como JSON en la interfaz de usuario.

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

Notas:

- Los valores pueden estar anidados arbitrariamente; a diferencia de las etiquetas, los metadatos no están sujetos al límite de 256 caracteres por valor.
- Las claves que entran en conflicto con los metadatos derivados de los atributos `gen_ai.*` (por ejemplo, `temperature`) son sobrescritas por sus valores, con la excepción de `model_name` y `model_provider`, que están reservados.
- El valor debe ser un objeto JSON. Un valor que no sea un JSON válido, o que sea una matriz o escalar de nivel superior, se descarta.

### Asignaciones de atributos de OpenLLMetry {#openllmetry-attribute-mappings}

Esta sección documenta las asignaciones de atributos específicas de OpenLLMetry que difieren o amplían las convenciones semánticas estándar de GenAI de OpenTelemetry.

#### Resolución de tipo de tramo {#span-kind-resolution-1}

`llm.request.type` se utiliza como respaldo cuando `gen_ai.operation.name` está ausente.

| `llm.request.type` | Agent Observability `span.kind` |
|--------------------|-------------------|
| `chat` | `llm` |
| `completion` | `llm` |
| `embedding` | `embedding` |
| `rerank` | `workflow` |
| `unknown`, *(predeterminado)* | `workflow` |

#### Información del modelo {#model-information-1}

| Atributo de OpenLLMetry | Campo de Agent Observability | Notas |
|-----------------------|--------------|-------|
| `gen_ai.system` | `meta.model_provider` | Respaldo cuando `gen_ai.provider.name` está ausente |

#### Métricas de uso de tokens {#token-usage-metrics-1}

| Atributo de OpenLLMetry | Campo de Agent Observability | Notas |
|-----------------------|--------------|-------|
| `llm.usage.total_tokens` | `metrics.total_tokens` | Respaldo cuando `gen_ai.usage.total_tokens` está ausente |

#### Mensajes de entrada y salida {#input-and-output-messages-1}

OpenLLMetry utiliza atributos indexados en lugar de matrices JSON. Estas son las fuentes de menor prioridad y solo se utilizan cuando no existen fuentes estándar de OTel.

##### Atributos de prompt (entrada) {#prompt-attributes-input}

| Atributo de OpenLLMetry | Descripción |
|-----------------------|-------------|
| `gen_ai.prompt.<index>.role` | Rol del mensaje (usuario, sistema, asistente, herramienta) |
| `gen_ai.prompt.<index>.content` | Contenido del mensaje |
| `gen_ai.prompt.<index>.tool_call_id` | ID de llamada a herramienta para mensajes de respuesta de herramienta |

##### Atributos de finalización (salida) {#completion-attributes-output}

| Atributo de OpenLLMetry | Descripción |
|-----------------------|-------------|
| `gen_ai.completion.<index>.role` | Rol del mensaje |
| `gen_ai.completion.<index>.content` | Contenido del mensaje |
| `gen_ai.completion.<index>.finish_reason` | Razón de finalización |

##### Asignación {#mapping}

Los mensajes se convierten a un formato compatible con OTel y se procesan normalmente:

| Fuente de OpenLLMetry | Campo de LLMObs |
|--------------------|--------------|
| `gen_ai.prompt.*` | `meta.input.messages` (llm) / `meta.input.value` (otros) |
| `gen_ai.completion.*` | `meta.output.messages` (llm) / `meta.output.value` (otros) |

#### Llamadas a herramientas {#tool-calls}

Las llamadas a herramientas están anidadas dentro de los atributos de finalización.

| Atributo de OpenLLMetry | Se asigna a |
|-----------------------|---------|
| `gen_ai.completion.<index>.tool_calls.<idx>.name` | `tool_calls[].name` |
| `gen_ai.completion.<index>.tool_calls.<idx>.id` | `tool_calls[].tool_id` |
| `gen_ai.completion.<index>.tool_calls.<idx>.arguments` | `tool_calls[].arguments` |

##### Mensajes de respuesta de herramienta {#tool-response-messages}

Cuando `role = "tool"` y `tool_call_id` están presentes, el mensaje se convierte en un resultado de herramienta:

| Atributo de OpenLLMetry | Se asigna a |
|-----------------------|---------|
| `gen_ai.prompt.<index>.tool_call_id` | `tool_results[].tool_id` |
| `gen_ai.prompt.<index>.content` | `tool_results[].result` |

#### Tramos de incrustación {#embedding-spans-1}

Para los tramos de incrustación, los documentos se extraen de los atributos de contenido del prompt.

| Fuente de OpenLLMetry | Campo de Agent Observability |
|--------------------|--------------|
| `gen_ai.prompt.<index>.content` | `meta.input.documents[].text` |

#### Filtrado de etiquetas {#tags-filtering}

Los siguientes atributos específicos de OpenLLMetry se filtran de las etiquetas:

- `gen_ai.prompt.*`
- `gen_ai.completion.*`
- `llm.*`

### Asignaciones de atributos de OpenInference {#openinference-attribute-mappings}

Agent Observability reconoce un tramo de OpenInference cuando el atributo `openinference.span.kind` está presente y no está vacío. Las siguientes secciones documentan los atributos de OpenInference que se asignan a campos dedicados de Agent Observability.

#### Resolución de tipo de tramo {#span-kind-resolution-2}

Si `gen_ai.operation.name` y `openinference.span.kind` están presentes, `gen_ai.operation.name` tiene prioridad.

| `openinference.span.kind` | Agent Observability `span.kind` |
|---------------------------|---------------------------------|
| `LLM` | `llm` |
| `EMBEDDING` | `embedding` |
| `TOOL` | `tool` |
| `AGENT` | `agent` |
| `RETRIEVER` | `retrieval` |
| `CHAIN`, `RERANKER`, `GUARDRAIL`, `EVALUATOR`, `PROMPT`, otros valores | `workflow` |

#### Información del modelo {#model-information-2}

| OpenInference Attribute | Campo de Agent Observability | Notas |
|-------------------------|---------------------------|-------|
| `llm.provider` | `meta.model_provider` | Fuente de proveedor de OpenInference preferida |
| `llm.system` | `meta.model_provider` | Respaldo cuando `llm.provider` no está presente |
| `llm.model_name` | `meta.model_name` | |
| `embedding.model_name` | `meta.model_name` | Respaldo para tramos de incrustación |

Para los tramos `llm` y `embedding`, los valores de proveedor o modelo faltantes se establecen en `unknown`.

#### Métricas de uso de tokens {#token-usage-metrics-2}

| OpenInference Attribute | Campo de Agent Observability |
|-------------------------|---------------------------|
| `llm.token_count.prompt` | `metrics.prompt_tokens` |
| `llm.token_count.completion` | `metrics.completion_tokens` |
| `llm.token_count.total` | `metrics.total_tokens` |
| `llm.token_count.prompt_details.cache_read` | `metrics.cache_read_input_tokens` |
| `llm.token_count.prompt_details.cache_write` | `metrics.cache_write_input_tokens` |
| `llm.token_count.completion_details.reasoning` | `metrics.reasoning_output_tokens` |

#### Sesión, usuario y metadatos {#session-user-and-metadata}

| OpenInference Attribute | Campo de Agent Observability | Notas |
|-------------------------|---------------------------|-------|
| `session.id` | `session_id` | También añade las etiquetas `session_id` y `conversation_id` y propaga la sesión a la raíz de la traza |
| `user.id` | `tags` | Añadido como `user_id:<value>` |
| `tag.tags` | `tags` | Cada elemento de la lista se convierte en una etiqueta de tramo |
| `llm.invocation_parameters` | `meta.metadata` | Analizado como un objeto JSON |
| `metadata` | `meta.metadata` | Analizado como un objeto JSON |

Los campos reservados de Agent Observability en `llm.invocation_parameters` y `metadata` no anulan los campos de tramo dedicados.

#### Atributos de herramienta {#tool-attributes-1}

| OpenInference Attribute | Campo de Agent Observability | Notas |
|-------------------------|---------------------------|-------|
| `tool.name` | `name` | Anula el nombre del tramo |
| `tool.id` | `meta.metadata.tool_id` | |
| `tool.description` | `meta.metadata.tool_description` | |
| `tool.parameters` | `meta.metadata.tool_parameters` | |
| `input.value` | `meta.input.value` | Se utiliza directamente para los tramos `tool`, `agent` y `workflow` |
| `output.value` | `meta.output.value` | Se utiliza directamente para los tramos `tool`, `agent` y `workflow` |

#### Mensajes de entrada y salida {#input-and-output-messages-2}

En estos atributos, `<direction>` es `input` o `output`.
La entrada y la salida se extraen de las siguientes fuentes, en orden de prioridad:

1. OpenTelemetry `gen_ai.*` atributos directos y eventos de tramo
2. Atributos indexados de OpenLLMetry
3. Atributos indexados de OpenInference
4. OpenInference `input.value` y `output.value`

| OpenInference Source | Campo de Agent Observability |
|----------------------|---------------------------|
| `llm.input_messages.<index>.*` | `meta.input.messages` (llm) / `meta.input.value` (otros tipos de tramo) |
| `llm.output_messages.<index>.*` | `meta.output.messages` (llm) / `meta.output.value` (otros tipos de tramo) |
| `input.value` | Respaldo de entrada |
| `output.value` | Respaldo de salida |

Se admiten los siguientes atributos de mensaje indexados:

| Atributo de OpenInference | Asignación |
|-------------------------|---------|
| `llm.<direction>_messages.<message-index>.message.role` | Rol del mensaje |
| `llm.<direction>_messages.<message-index>.message.content` | Contenido de texto |
| `llm.<direction>_messages.<message-index>.message.contents.<content-index>.message_content.text` | Contenido de texto ordenado |
| `llm.<direction>_messages.<message-index>.message.contents.<content-index>.message_content.image.image.url` | Contenido de imagen ordenado |
| `llm.<direction>_messages.<message-index>.message.tool_calls.<tool-index>.tool_call.*` | ID, nombre y argumentos de la llamada a la herramienta |
| `llm.<direction>_messages.<message-index>.message.contents.<content-index>.tool_call.*` | Llamada a la herramienta dentro del contenido ordenado |
| `llm.<direction>_messages.<message-index>.message.tool_call_id` | ID del resultado de la herramienta cuando el rol del mensaje es `tool` |

El contenido de la imagen se asigna a un URI de imagen mientras conserva su posición entre otro contenido del mensaje.

#### Tramos de incrustación {#embedding-spans-2}

| OpenInference Source | Campo de Agent Observability |
|----------------------|---------------------------|
| `embedding.embeddings.<index>.embedding.text` | `meta.input.documents[].text` |
| N/A | `meta.output.value` = `[N embedding(s) returned]` |

#### Tramos de recuperación {#retrieval-spans}

| OpenInference Source | Campo de Agent Observability |
|----------------------|---------------------------|
| `input.value` | `meta.input.value` |
| `retrieval.documents.<index>.document.content` | `meta.output.documents[].text` |
| `retrieval.documents.<index>.document.id` | `meta.output.documents[].id` |
| `retrieval.documents.<index>.document.score` | `meta.output.documents[].score` |
| `retrieval.documents.<index>.document.metadata` | `meta.output.documents[].metadata` (objeto JSON analizado) |

#### Filtrado de etiquetas {#tags-filtering-1}

Los atributos de OpenInference con los prefijos `llm.*`, `retrieval.*`, `embedding.*` y `reranker.*` se excluyen de las etiquetas. Los valores asignados específicamente, tales como `input.value`, `output.value`, `metadata`, `tag.tags` y `tool.parameters`, también se excluyen de las etiquetas duplicadas.

Otros atributos de OpenInference que no estén vacíos y tengan valores de 256 caracteres o menos se agregan como etiquetas `key:value`. La lista `tag.tags` se promueve directamente a etiquetas de tramo.

### Asignaciones de atributos de Langfuse {#langfuse-attribute-mappings}

Esta sección documenta las asignaciones de atributos específicas de Langfuse para aplicaciones que utilizan la [instrumentación nativa de OpenTelemetry de Langfuse][13].

#### Detección {#detection}

Un tramo se trata como un tramo de Langfuse cuando contiene un atributo `langfuse.observation.type` que no está vacío. Este atributo también se utiliza como alternativa para la resolución del tipo de tramo cuando `gen_ai.operation.name` no está presente.

#### Resolución del tipo de tramo {#span-kind-resolution-3}

| `langfuse.observation.type` | Agent Observability `span.kind` |
|------------------------------|-------------------|
| `generation` | `llm` |
| `embedding` | `embedding` |
| `tool` | `tool` |
| `agent` | `agent` |
| `retriever` | `retrieval` |
| `span`, `event`, `chain`, `evaluator`, `guardrail`, *(predeterminado)* | `workflow` |

#### Información del modelo {#model-information-3}

| Atributo de Langfuse | Campo de Agent Observability | Notas |
|---------------------|--------------|-------|
| `langfuse.observation.metadata.ls_provider` | `meta.model_provider` | |
| `langfuse.observation.model.name` | `meta.model_name` | Alternativa cuando `gen_ai.response.model` y `gen_ai.request.model` están ausentes |

#### Métricas de uso de tokens {#token-usage-metrics-3}

`langfuse.observation.usage_details` es un objeto JSON. Cada clave se asigna a una métrica de Agent Observability, utilizada como alternativa para cualquier métrica que no esté ya establecida a partir de los atributos `gen_ai.usage.*`:

| Clave de uso de Langfuse | Campo de Agent Observability |
|----------------------|--------------|
| `input`, `input_tokens` | `metrics.input_tokens` |
| `output`, `output_tokens` | `metrics.output_tokens` |
| `total`, `total_tokens` | `metrics.total_tokens` |
| `prompt_tokens` | `metrics.prompt_tokens` |
| `completion_tokens` | `metrics.completion_tokens` |
| `cache_creation_input_tokens` | `metrics.cache_write_input_tokens` |
| `cache_read_input_tokens`, `cached_tokens` | `metrics.cache_read_input_tokens` |
| `reasoning_tokens` | `metrics.reasoning_output_tokens` |

#### Mensajes de entrada y salida {#input-and-output-messages-3}

`langfuse.observation.input` y `langfuse.observation.output` contienen un valor codificado en JSON que puede ser una matriz de mensajes de chat, un objeto de mensaje único o contenido JSON/cadena arbitrario. Estas son las fuentes de menor prioridad y solo se utilizan cuando no existen atributos de mensaje `gen_ai.*`.

Cada mensaje se convierte a la forma de mensaje basada en partes:

- Una cadena `content` se convierte en una parte `text`.
- Una matriz `content` de bloques convierte los bloques `image_url` en partes `uri` y los bloques `text` en partes `text`; cualquier otro bloque se mantiene como texto serializado.
- Una matriz `tool_calls` en un mensaje se convierte en `tool_call` partes.
- Un mensaje con `role: tool` y un `tool_call_id` se convierte en una `tool_result` parte.

##### Tramos de herramienta {#tool-spans}

Para los tramos de `tool`, `agent` y `workflow`, `langfuse.observation.input`/`langfuse.observation.output` se utilizan directamente como `input.value`/`output.value`, después de la reserva estándar de `gen_ai.tool.call.*`.

##### Tramos de recuperación {#retrieval-spans-1}

Para los tramos de `retrieval`, `langfuse.observation.input` se utiliza como el valor de consulta en `meta.input.value`. `langfuse.observation.output` se analiza como una colección de documentos (una matriz de objetos de documento, una matriz de cadenas o un solo objeto de documento) en `meta.output.documents`. La clave `text`, `content` o `page_content` de cada objeto de documento (verificada en ese orden) se asigna a `text`, junto con cualquier clave `id`, `score` y `metadata`.

##### Tramos de incrustación {#embedding-spans-3}

Para `embedding` tramos, `langfuse.observation.input` se analiza de la misma manera que los documentos de recuperación en `meta.input.documents[].text`, conservando solo los documentos que contienen texto no vacío.

#### Sesión, usuario, metadatos y etiquetas {#session-user-metadata-and-tags}

| Atributo de Langfuse | Campo de Agent Observability | Notas |
|-----------------------|--------------|-------|
| `langfuse.session.id` | `session_id` | Reserva cuando `gen_ai.conversation.id` está ausente |
| `langfuse.user.id` | `user_id:` etiqueta | Reserva cuando el atributo de ID de usuario estándar está ausente |
| `langfuse.observation.model.parameters` | `meta.metadata.*` | Objeto JSON, fusionado en los metadatos, omitiendo las claves reservadas (`model_name`, `model_provider`) |
| `langfuse.trace.metadata.*`, `langfuse.observation.metadata.*` | `meta.metadata.*` | Prefijo eliminado, fusionado en los metadatos, omitiendo las claves reservadas |
| `langfuse.trace.tags` | Anexado a las etiquetas | Matriz JSON de cadenas |

#### Filtrado de etiquetas {#tags-filtering-2}

Los siguientes atributos específicos de Langfuse se filtran de las etiquetas porque se consumen en otra parte:

- `langfuse.internal.*`, `langfuse.observation.metadata.*`, `langfuse.trace.metadata.*` (prefijos)
- `langfuse.observation.input`, `langfuse.observation.output`, `langfuse.observation.model.name`, `langfuse.observation.model.parameters`, `langfuse.observation.usage_details`, `langfuse.observation.cost_details`, `langfuse.observation.completion_start_time`
- `langfuse.trace.input`, `langfuse.trace.output`, `langfuse.trace.metadata`, `langfuse.trace.tags`
- `langfuse.experiment.item.expected_output`, `langfuse.experiment.item.metadata`, `langfuse.experiment.metadata`

## Solución de problemas de advertencias de mapeo {#troubleshooting-mapping-warnings}

Durante la ingesta, Agent Observability detecta problemas de mapeo de tramos, como mensajes de entrada faltantes o un conteo de tokens que no se puede analizar. Marca los tramos afectados en lugar de fallar silenciosamente.

Los tramos marcados muestran un indicador de **Advertencias de mapeo** en el panel de detalles del tramo. Seleccione el indicador para abrir las advertencias de mapeo del tramo. Cada entrada enumera el atributo afectado, una solución sugerida y un enlace a la [referencia de mapeo de atributos](#attribute-mapping-reference).

Cada advertencia también incluye una breve descripción de su efecto posterior, como evaluaciones omitidas o estimación de costos no disponible.

Las advertencias de mapeo se detectan durante la ingesta. No afectan la facturación ni la retención de tramos.

### Referencia de advertencias de mapeo {#mapping-warning-reference}

Un tramo puede mostrar advertencias que no aparecen en la siguiente tabla si Datadog añade verificaciones. Estos se renderizan con un título generado basado en la verificación que activó la advertencia.

**Valor de búsqueda** muestra el valor almacenado en el tramo. Úselo con el atributo `@collection_errors` para encontrar tramos marcados, por ejemplo `@collection_errors:otel_warning_missing_model_name`.

| Advertencia | Valor de búsqueda (`@collection_errors:`) | Atributo | Solución |
|---------|--------------------------------------|-----------|-----|
| Falta el nombre del modelo | `otel_warning_missing_model_name` | Esperado `gen_ai.response.model` | Emita `gen_ai.response.model` directamente, por lo que el nombre del modelo no necesita ser extraído de `gen_ai.request.model`. |
| Falta el proveedor del modelo | `otel_warning_missing_model_provider` | Esperado `gen_ai.provider.name` | Emita `gen_ai.provider.name` directamente, por lo que el proveedor no necesita ser inferido desde `gen_ai.system`. |
| Identificador de modelo mal formado | `otel_warning_strands_model_malformed` | En `gen_ai.request.model` | Emita `gen_ai.response.model` directamente, por lo que el nombre del modelo no necesita ser extraído de `gen_ai.request.model`. |
| Entrada mal formada | `otel_warning_input_malformed` | En `gen_ai.input.messages` | Emita `gen_ai.input.messages` como una matriz JSON válida de mensajes. |
| Salida mal formada | `otel_warning_output_malformed` | En `gen_ai.output.messages` | Emita `gen_ai.output.messages` como una matriz JSON válida de mensajes. |
| Mensaje mal formado | `otel_warning_message_malformed` | En `gen_ai.input.messages` | Emita cada mensaje con un campo `role` y `content`. |
| Contenido de mensaje vacío | `otel_warning_invalid_parts` | En `gen_ai.output.messages` | Emita una cadena `content`, o entradas `parts` con un `type` reconocido, por ejemplo `text`, `tool_call`, `tool_call_response`. |
| Falta la entrada de incrustación | `otel_warning_embedding_input_missing` | Esperado `gen_ai.input.messages` | Establezca `gen_ai.input.messages` en el texto incrustado. |
| Entrada de incrustación mal formada | `otel_warning_embedding_input_malformed` | En `gen_ai.input.messages` | Emita `gen_ai.input.messages` como una matriz JSON válida de mensajes. |
| Recuentos de tokens ilegibles | `otel_warning_token_usage_unparseable` | En `gen_ai.usage.input_tokens` | Emita los recuentos de tokens como números enteros, no como cadenas u objetos. |
| Recuentos de tokens no válidos | `otel_warning_token_usage_invalid` | En `gen_ai.usage.input_tokens` | Emita recuentos de tokens que sean números enteros no negativos. |
| Métricas de costo ilegibles | `otel_warning_cost_metrics_unparseable` | En `gen_ai.cost.estimated_total` | Emita las métricas de costo como números enteros o de punto flotante, no como cadenas u objetos. |
| Métricas de costo no válidas | `otel_warning_cost_metrics_invalid` | En `gen_ai.cost.estimated_total` | Emita valores de costo no negativos. |
| Parámetros de invocación mal formados | `otel_warning_params_malformed` | En los parámetros de invocación | Emita los parámetros de invocación como un objeto JSON válido, o establézcalos individualmente como atributos `gen_ai.request.*` (tales como `temperature`, `top_p` y `max_tokens`). |
| Definiciones de herramienta mal formadas | `otel_warning_tool_definitions_malformed` | En `gen_ai.tool.definitions` | Emita `gen_ai.tool.definitions` como un arreglo JSON válido de definiciones de herramienta. |
| Definición de herramienta mal formada | `otel_warning_tool_definition_entry_malformed` | En `gen_ai.tool.definitions` | Proporcione a cada definición de herramienta un `name`, y haga que su `parameters` sea un objeto JSON. |
| Nombre de herramienta faltante | `otel_warning_tool_span_name_missing` | Esperado `gen_ai.tool.name` | Establezca `gen_ai.tool.name` en los tramos de herramienta. |
| Nombre de llamada de herramienta faltante | `otel_warning_tool_call_name_missing` | En `gen_ai.output.messages` | Proporcione a cada llamada de herramienta un `name`. |
| Nombre de operación faltante | `otel_warning_operation_missing` | Esperado `gen_ai.operation.name` | Establezca `gen_ai.operation.name` en uno de `chat`, `text_completion`, `embeddings`, `execute_tool`, `invoke_agent` o `retriever`. |
| Eventos de tramo mal formados | `otel_warning_failed_to_parse_span_events` | En `events` | Emita JSON válido en los eventos de tramo, o establezca `gen_ai.input.messages` y `gen_ai.output.messages` directamente. |
| Puntaje de documento ilegible | `otel_warning_failed_to_parse_document_score` | En `output.documents` | Emita cada puntaje de documento como un número. |
| Metadatos de documento mal formados | `otel_warning_document_metadata_malformed` | En `output.documents` | Emita los metadatos de cada documento como un objeto JSON. |
| Instrumentación no reconocida | `otel_warning_spec_version_unknown` | Esperado `gen_ai.operation.name` | Establezca `gen_ai.operation.name` y `gen_ai.system` para que Datadog pueda identificar la instrumentación. |

### Encuentre los atributos de tramo sin procesar para un tramo marcado {#find-raw-span-attributes-for-a-flagged-span}

Para encontrar los atributos sin procesar que Datadog recibió para un tramo marcado:

- Si APM está habilitado, los mismos datos también se escriben en la traza de APM correspondiente. Abra la traza de APM vinculada para inspeccionar los atributos de tramo sin procesar.
- Compare los atributos sin procesar con el atributo esperado de la [referencia de advertencia de mapeo](#mapping-warning-reference) o la [referencia de mapeo de atributos](#attribute-mapping-reference) completa. Consulte [Correlación de Agent Observability y APM][14] para ver cómo se relacionan las dos vistas.
- Para una advertencia de formato incorrecto, verifique si el valor del atributo es un JSON válido. Las causas comunes incluyen doble codificación, truncamiento y la emisión de una cadena u otro valor que no sea un objeto donde se espera un objeto.
- Para una advertencia de atributo faltante, verifique la versión de su biblioteca de instrumentación con la tabla de [marcos y bibliotecas probados](#tested-frameworks-and-libraries), y confirme que `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental` esté configurado si su biblioteca lo requiere.

## Convenciones semánticas admitidas {#supported-semantic-conventions}

Agent Observability admite tramos que siguen las convenciones semánticas de OpenTelemetry 1.37+ para IA generativa, incluyendo:

- Operaciones de LLM con `gen_ai.provider.name`, `"gen_ai.operation.name"`, `gen_ai.request.model` y otros atributos de gen_ai
- Entradas/salidas de operación en atributos de tramo directos o mediante eventos de tramo
- Métricas de uso de tokens (`gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`)
- Parámetros y metadatos del modelo

Para obtener la lista completa de atributos admitidos y sus especificaciones, consulte la [documentación de convenciones semánticas de OpenTelemetry para IA generativa][1].

## Deshabilitación de la conversión de Agent Observability {#disabling-agent-observability-conversion}

Si solo desea que sus tramos de IA generativa permanezcan en APM y no aparezcan en Agent Observability, puede deshabilitar la conversión automática estableciendo el atributo `dd_llmobs_enabled` en `false`. Establecer este atributo en cualquier tramo de una traza evita que toda la traza se convierta en Agent Observability.

### Uso de variables de entorno {#using-environment-variables}

Agregue el atributo `dd_llmobs_enabled=false` a su variable de entorno `OTEL_RESOURCE_ATTRIBUTES`:

```
OTEL_RESOURCE_ATTRIBUTES=dd_llmobs_enabled=false
```

### Uso de código {#using-code}

También puede establecer el atributo mediante programación en cualquier tramo de su traza:

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
[4]: /es/help/
[5]: https://pypi.org/project/strands-agents/
[6]: /es/llm_observability/investigate/evaluations/external_evaluations
[7]: https://strandsagents.com/latest/
[8]: /es/account_management/rbac/data_access/
[9]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[10]: /es/opentelemetry/compatibility/#feature-compatibility
[11]: https://arize-ai.github.io/openinference/python/instrumentation/openinference-instrumentation-openai/
[12]: https://arize-ai.github.io/openinference/spec/semantic_conventions.html
[13]: https://langfuse.com/integrations/native/opentelemetry
[14]: /es/llm_observability/instrument/agent_observability_and_apm/