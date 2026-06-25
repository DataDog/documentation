---
description: Instrumenta aplicaciones LLM con OpenTelemetry utilizando convenciones
  semánticas de GenAI y envía trazas a Datadog Agent Observability sin el SDK de Datadog.
title: Instrumentación de OpenTelemetry
---
## Descripción general {#overview}
Al utilizar las convenciones semánticas estandarizadas de OpenTelemetry para operaciones de inteligencia artificial generativa, puedes instrumentar tus aplicaciones LLM con cualquier biblioteca o marco compatible con OpenTelemetry y visualizar las trazas en Agent Observability.

Agent Observability admite la ingestión de trazas de OpenTelemetry que siguen las [convenciones semánticas de OpenTelemetry 1.37+ para inteligencia artificial generativa][1]. Esto te permite enviar trazas LLM directamente desde aplicaciones instrumentadas con OpenTelemetry a Datadog sin requerir el SDK de Datadog Agent Observability o un Agente de Datadog.

## Requisitos previos {#prerequisites}

- Una [clave de API de Datadog][2]
- Una aplicación instrumentada con OpenTelemetry que emite trazas siguiendo las [convenciones semánticas de OpenTelemetry 1.37+ para inteligencia artificial generativa][1]

Para enviar <a href="/llm_observability/evaluations/external_evaluations#submitting-external-evaluations-with-the-api">evaluaciones externas directamente a la API</a> para spans de OpenTelemetry, debes incluir el <code>source:otel</code> etiqueta en la evaluación. Al referenciar spans, proporciona <code>span_id</code> y <code>trace_id</code> como cadenas decimales. OpenTelemetry utiliza IDs hexadecimales de forma nativa, así que conviértelos a decimal antes de enviar evaluaciones. Por ejemplo, utiliza el <code>int(hex_span_id, 16)</code> de Python para convertir un ID de span hexadecimal a su equivalente decimal.

Para información sobre el uso de Seguimiento de Prompts con spans de OpenTelemetry, consulta <a href="/llm_observability/monitoring/prompt_tracking#opentelemetry-instrumentation">Seguimiento de Prompts - Instrumentación de OpenTelemetry</a>.

También puedes usar spans de OpenTelemetry dentro de <a href="/llm_observability/experiments/setup#using-opentelemetry-spans-inside-experiments">Experimentos de Agent Observability</a>. Al establecer <code>DD_TRACE_OTEL_ENABLED=1</code>, OTel spans creados dentro de una tarea de experimento aparecen automáticamente como hijos del span del experimento.

## Configuración {#setup}

Para enviar trazas de OpenTelemetry a Agent Observability, configura tu exportador de OpenTelemetry con los siguientes ajustes:

### Configuración {#configuration}

Establece las siguientes variables de entorno en tu aplicación:

```
OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT={{< region-param key="otlp_trace_endpoint" code="true" >}}
OTEL_EXPORTER_OTLP_TRACES_HEADERS=dd-api-key=<YOUR_API_KEY>,dd-otlp-source=llmobs
```

Reemplaza `<YOUR_API_KEY>` con tu [clave API de Datadog][2].

Si tu marco de trabajo anteriormente soportaba una versión de especificación de OpenTelemetry anterior a la 1.37, también necesitas establecer:

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

Esta variable de entorno habilita trazas de OpenTelemetry compatibles con la versión 1.37+ para marcos que ahora soportan las convenciones semánticas de la versión 1.37+, pero que anteriormente soportaban versiones más antiguas (como [strands-agents][5]).

**Nota**:
* Si estás utilizando una biblioteca de OpenTelemetry diferente al SDK de OpenTelemetry por defecto, es posible que necesites configurar el endpoint, el protocolo y los encabezados de manera diferente dependiendo de la API de la biblioteca. Consulta la documentación de tu biblioteca para el método de configuración apropiado.
* Al utilizar instrumentación de OpenTelemetry, algunos datos enviados a Agent Observability también pueden ser escritos en las trazas APM correspondientes. Si estás protegiendo datos sensibles, considera también configurar un Conjunto de Datos Restringido en APM para que coincida con tus controles de acceso de Agent Observability. Consulta [Control de Acceso a Datos][8] para más información.

#### Usando strands-agents {#using-strands-agents}

Si estás utilizando la [`strands-agents` biblioteca][5], necesitas establecer una variable de entorno adicional para habilitar trazas que sean compatibles con OpenTelemetry v1.37+:

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

Esta variable de entorno asegura que `strands-agents` emita trazas siguiendo las convenciones semánticas de OpenTelemetry v1.37+ para IA generativa, que son requeridas por Agent Observability.

### Instrumentación {#instrumentation}

Para generar trazas compatibles con Agent Observability, haz una de las siguientes opciones:

- Usa una biblioteca de OpenTelemetry o un paquete de instrumentación que emita spans siguiendo las [convenciones semánticas de OpenTelemetry 1.37+ para IA generativa][1].
- Cree instrumentación personalizada de OpenTelemetry que produzca spans con los atributos requeridos `gen_ai.*`, según lo definido en las convenciones semánticas.

Después de que tu aplicación comience a enviar datos, las trazas aparecerán automáticamente en la página [**Trazas de Observabilidad LLM**][3]. Para buscar tus trazas en la interfaz de usuario, utiliza el atributo `ml_app`, que se establece automáticamente en el valor del atributo `service` de tu span raíz de OpenTelemetry.

<div class="alert alert-danger">
<ul>
<li/> <a href="https://traceloop.com/docs/openllmetry/getting-started-python">OpenLLMetry</a> versión 0.47+ es compatible. Vea el <a href="#using-openllmetry">ejemplo de OpenLLMetry</a>.
<li/> OpenInference no es compatible.
<li/> Puede haber un retraso de 3 a 5 minutos entre el envío de trazas y su aparición en la página de Trazas de Observabilidad LLM. Si tienes APM habilitado, las trazas aparecen inmediatamente en la página de Trazas APM.
</ul>
</div>

## Frameworks y bibliotecas probados {#tested-frameworks-and-libraries}

Estos frameworks y bibliotecas han sido probados con la Observabilidad LLM de Datadog. Cualquier framework que emita spans compatibles con la [convención semántica GenAI de OpenTelemetry 1.37+][1] es compatible.

{{< tabs >}}
{{% tab "Python" %}}
| Framework | Instrumentación | Versiones Soportadas |
|-----------|----------------|--------------------|
| [OpenAI][20] | [`opentelemetry-instrumentation-openai-v2`][21] | >= 1.26.0 |
| [Anthropic][22] | [`opentelemetry-instrumentation-anthropic`][23] | >= 0.51.0 |
| [Google GenAI][24] | [`opentelemetry-instrumentation-google-genai`][25] | >= 1.32.0 |
| [Google Vertex AI][26] | [`opentelemetry-instrumentation-vertexai`][27] | >= 1.64.0 |
| [AWS Bedrock][28] | [`opentelemetry-instrumentation-botocore`][29] | >= 1.31.57 |
| [LangChain][30] | [`opentelemetry-instrumentation-langchain`][31] | >= 0.3.21 |
| [LlamaIndex][32] | [`opentelemetry-instrumentation-llamaindex`][33] | >= 0.14.12 |
| [Strands Agents][5] | Nativo | >= 1.11.0 |
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
{{% /tab %}}
{{% tab "Node.js" %}}
| Framework | Instrumentación | Versiones Soportadas |
|-----------|----------------|--------------------|
| [OpenAI][40] | [`@opentelemetry/instrumentation-openai`][41] | >= 4.19.0 |

[40]: https://platform.openai.com/docs/api-reference/introduction
[41]: https://www.npmjs.com/package/@opentelemetry/instrumentation-openai
{{% /tab %}}
{{% tab "Java" %}}
| Framework | Instrumentación | Versiones Soportadas |
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

### Usando Agentes Strands {#using-strands-agents-1}

El siguiente ejemplo demuestra una aplicación completa utilizando [Strands Agents][7] con la integración de OpenTelemetry. Este mismo enfoque funciona con cualquier marco que soporte las convenciones semánticas de OpenTelemetry versión 1.37+ para inteligencia artificial generativa.

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

# Configure OTLP endpoint to send traces to Datadog Agent Observability
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

El siguiente ejemplo demuestra cómo instrumentar tu aplicación LLM utilizando código personalizado de OpenTelemetry. Este enfoque te da control completo sobre las trazas y tramos emitidos por tu aplicación.

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

Después de ejecutar este ejemplo, busca `ml_app:simple-llm-example` en la interfaz de usuario de Observabilidad LLM para encontrar la traza generada.

### Usando OpenLLMetry {#using-openllmetry}

El siguiente ejemplo demuestra el uso de [OpenLLMetry](https://github.com/traceloop/openllmetry) para instrumentar automáticamente las llamadas a OpenAI con OpenTelemetry.

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

Después de ejecutar este ejemplo, busca `ml_app:simple-openllmetry-test` en la interfaz de usuario de Observabilidad LLM para encontrar la traza generada.

## Referencia de mapeo de atributos {#attribute-mapping-reference}

Esta sección proporciona el mapeo entre las convenciones semánticas de OpenTelemetry GenAI (v1.37+) así como OpenLLMetry al esquema de span de Observabilidad LLM de Datadog.

<div class="alert alert-info">Los mapeos específicos de OpenLLMetry están documentados por separado en la sección <a href="#openllmetry-attribute-mappings">mapeos de atributos de OpenLLMetry</a>.</div>

### Mapeos de atributos de OpenTelemetry 1.37+ {#opentelemetry-137-attribute-mappings}

#### Atributos base de span {#base-span-attributes}

| Campo OTLP | Campo de Observabilidad LLM | Notas |
|------------|--------------|-------|
| `resource.attributes.service.name` | `ml_app`, `tags.service` | |
| `name` | `name` | Anulado por `gen_ai.tool.name` si está presente |
| `parent_span_id` | `parent_id` | |
| `start_time_unix_nano` | `start_ns` | |
| `end_time_unix_nano` | `duration` | Calculado: fin - inicio |
| `status.code` | `status` | `error` si > 0, de lo contrario `ok` |
| `status.message` | `meta.error.message` | |
| `attributes.error.type` | `meta.error.type` | |

#### Resolución del tipo de Span {#span-kind-resolution}

| `gen_ai.operation.name` | Observabilidad de LLM `span.kind` |
|-------------------------|-------------------|
| `generate_content`, `chat`, `text_completion`, `completion` | `llm` |
| `embeddings`, `embedding` | `embedding` |
| `execute_tool` | `tool` |
| `invoke_agent`, `create_agent` | `agent` |
| `rerank`, `unknown`, *(predeterminado)* | `workflow` |

#### Información del modelo {#model-information}

| Atributo de OTEL | Campo de observabilidad de LLM | Notas |
|----------------|--------------|-------|
| `gen_ai.operation.name` | `meta.span.kind` | Ver tabla de resolución arriba |
| `gen_ai.provider.name` | `meta.model_provider` | Recurre a `gen_ai.system`, luego a `custom` |
| `gen_ai.response.model` | `meta.model_name` | |
| `gen_ai.request.model` | `meta.model_name` | Recurso si `response.model` está ausente |

#### Métricas de uso de tokens {#token-usage-metrics}

| Atributo de OTEL | Campo de observabilidad de LLM |
|----------------|--------------|
| `gen_ai.usage.input_tokens` | `metrics.input_tokens` |
| `gen_ai.usage.output_tokens` | `metrics.output_tokens` |
| `gen_ai.usage.prompt_tokens` | `metrics.prompt_tokens` |
| `gen_ai.usage.completion_tokens` | `metrics.completion_tokens` |
| `gen_ai.usage.total_tokens` | `metrics.total_tokens` |

#### Parámetros de solicitud {#request-parameters}

Todos los `gen_ai.request.*` parámetros se mapean a `meta.metadata.*` con el prefijo eliminado.

| Atributo de OTEL | Campo de observabilidad de LLM |
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
| `gen_ai.tool.name` | `name` | Sobrescribe el nombre del span |
| `gen_ai.tool.call.id` | `metadata.tool_id` | |
| `gen_ai.tool.description` | `metadata.tool_description` | |
| `gen_ai.tool.type` | `metadata.tool_type` | |
| `gen_ai.tool.definitions` | `meta.tool_definitions` | Array JSON analizado |
| `gen_ai.tool.call.arguments` | `input.value` | |
| `gen_ai.tool.call.result` | `output.value` | |

#### Sesión y conversación {#session-and-conversation}

| Atributo de OTel | Campo de Agent Observability | Notas |
|----------------|--------------|-------|
| `gen_ai.conversation.id` | `session_id` | También agregado a `metadata.conversation_id` y etiquetas |

#### Atributos de respuesta {#response-attributes}

| Atributo de OTel | Campo de Agent Observability |
|----------------|--------------|
| `gen_ai.response.model` | `meta.model_name` |
| `gen_ai.response.finish_reasons` | `metadata.finish_reasons` |

#### Mensajes de entrada y salida {#input-and-output-messages}

Los mensajes de entrada y salida se extraen de las siguientes fuentes, en orden de prioridad:

1. Atributos directos: `gen_ai.input.messages`, `gen_ai.output.messages`, `gen_ai.system_instructions`
2. Eventos de tramo (`meta["events"]`) con nombre `gen_ai.client.inference.operation.details`

| Fuente de OTel | Campo de Agent Observability | Notas |
|-------------|--------------|-------|
| `gen_ai.input.messages` | `meta.input.messages` (llm) / `meta.input.value` (otros) | |
| `gen_ai.output.messages` | `meta.output.messages` (llm) / `meta.output.value` (otros) | |
| `gen_ai.system_instructions` | Precedido por entrada | Agregado como mensajes de rol del sistema |

##### Tramos de incrustación {#embedding-spans}

| Fuente OTEL | Campo de Observabilidad LLM |
|-------------|--------------|
| `gen_ai.input.messages` | `meta.input.documents` |
| N/A | `meta.output.value` = `[N embedding(s) returned]` |

#### Etiquetas {#tags}

Las etiquetas se colocan directamente en el span:

- Atributos no-`gen_ai.*` se convierten en etiquetas `key:value`
- Claves desconocidas `gen_ai.*` se añaden con el prefijo eliminado
Filtrado: - , `_dd.*`, `llm.*`, `ddtags`, `events`, y claves `gen_ai.*` ya mapeadas específicamente

<div class="alert alert-info">Cualquiera <code>gen_ai.*</code> los atributos que no están explícitamente mapeados a los campos de span de Agent Observability se colocan en las etiquetas del span de LLM, con un límite de 256 caracteres por valor. Los valores que exceden este límite son truncados. Todos los demás no-<code>gen_ai</code> atributos son eliminados.</div>

### Mapeo de atributos de OpenLLMetry {#openllmetry-attribute-mappings}

Esta sección documenta los mapeos de atributos específicos de OpenLLMetry que difieren o extienden las convenciones semánticas estándar de OpenTelemetry GenAI.

#### Resolución del tipo de span {#span-kind-resolution-1}

`llm.request.type` se utiliza como respaldo cuando `gen_ai.operation.name` está ausente.

| `llm.request.type` | Agent Observability `span.kind` |
|--------------------|-------------------|
| `chat` | `llm` |
| `completion` | `llm` |
| `embedding` | `embedding` |
| `rerank` | `workflow` |
| `unknown`, *(predeterminado)* | `workflow` |

#### Información del modelo {#model-information-1}

| Atributo de OpenLLMetry | Campo de Observabilidad de LLM | Notas |
|-----------------------|--------------|-------|
| `gen_ai.system` | `meta.model_provider` | Reemplazo cuando `gen_ai.provider.name` está ausente |

#### Métricas de uso de tokens {#token-usage-metrics-1}

| Atributo de OpenLLMetry | Campo de Observabilidad de LLM | Notas |
|-----------------------|--------------|-------|
| `llm.usage.total_tokens` | `metrics.total_tokens` | Reemplazo cuando `gen_ai.usage.total_tokens` está ausente |

#### Mensajes de entrada y salida {#input-and-output-messages-1}

OpenLLMetry utiliza atributos indexados en lugar de arreglos JSON. Estas son las fuentes de menor prioridad y solo se utilizan cuando no existen fuentes estándar de OTel.

##### Atributos de prompt (entrada) {#prompt-attributes-input}

| Atributo de OpenLLMetry | Descripción |
|-----------------------|-------------|
| `gen_ai.prompt.<index>.role` | Rol del mensaje (usuario, sistema, asistente, herramienta) |
| `gen_ai.prompt.<index>.content` | Contenido del mensaje |
| `gen_ai.prompt.<index>.tool_call_id` | ID de llamada de herramienta para mensajes de respuesta de herramienta |

##### Atributos de finalización (salida) {#completion-attributes-output}

| Atributo de OpenLLMetry | Descripción |
|-----------------------|-------------|
| `gen_ai.completion.<index>.role` | Rol del mensaje |
| `gen_ai.completion.<index>.content` | Contenido del mensaje |
| `gen_ai.completion.<index>.finish_reason` | Razón de finalización de la tarea |

##### Mapeo {#mapping}

Los mensajes se convierten al formato compatible con OTel y se procesan normalmente:

| Fuente de OpenLLMetry | Campo de LLMObs |
|--------------------|--------------|
| `gen_ai.prompt.*` | `meta.input.messages` (llm) / `meta.input.value` (otros) |
| `gen_ai.completion.*` | `meta.output.messages` (llm) / `meta.output.value` (otros) |

#### Llamadas a herramientas {#tool-calls}

Las llamadas a herramientas están anidadas dentro de los atributos de finalización.

| Atributo de OpenLLMetry | Se mapea a |
|-----------------------|---------|
| `gen_ai.completion.<index>.tool_calls.<idx>.name` | `tool_calls[].name` |
| `gen_ai.completion.<index>.tool_calls.<idx>.id` | `tool_calls[].tool_id` |
| `gen_ai.completion.<index>.tool_calls.<idx>.arguments` | `tool_calls[].arguments` |

##### Mensajes de respuesta de herramientas {#tool-response-messages}

Cuando `role = "tool"` y `tool_call_id` están presentes, el mensaje se convierte en un resultado de herramienta:

| Atributo de OpenLLMetry | Se mapea a |
|-----------------------|---------|
| `gen_ai.prompt.<index>.tool_call_id` | `tool_results[].tool_id` |
| `gen_ai.prompt.<index>.content` | `tool_results[].result` |

#### Tramos de embedding {#embedding-spans-1}

Para los tramos de embedding, los documentos se extraen de los atributos de contenido del prompt.

| Fuente de OpenLLMetry | Campo de Observabilidad de LLM |
|--------------------|--------------|
| `gen_ai.prompt.<index>.content` | `meta.input.documents[].text` |

#### Filtrado de etiquetas {#tags-filtering}

Los siguientes atributos específicos de OpenLLMetry se filtran de las etiquetas:

- `gen_ai.prompt.*`
- `gen_ai.completion.*`
- `llm.*`

## Convenciones semánticas soportadas {#supported-semantic-conventions}

Agent Observability soporta tramos que siguen las convenciones semánticas de OpenTelemetry 1.37+ para IA generativa, incluyendo:

- Operaciones de LLM con `gen_ai.provider.name`, `"gen_ai.operation.name"`, `gen_ai.request.model` y otros atributos de gen_ai
- Entradas/salidas de operación en atributos directos de tramo o mediante eventos de tramo
- Métricas de uso de tokens (`gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`)
- Parámetros y metadatos del modelo

Para la lista completa de atributos soportados y sus especificaciones, consulte la [documentación de convenciones semánticas de OpenTelemetry para IA generativa][1].

## Deshabilitando la conversión de Agent Observability {#disabling-llm-observability-conversion}

Si solo desea que sus tramos de IA generativa permanezcan en APM y no aparezcan en Agent Observability, puede deshabilitar la conversión automática configurando el atributo `dd_llmobs_enabled` a `false`. Configurar este atributo en cualquier tramo de una traza impide que toda la traza se convierta en Agent Observability.

### Usando variables de entorno {#using-environment-variables}

Agregue el atributo `dd_llmobs_enabled=false` a su variable de entorno `OTEL_RESOURCE_ATTRIBUTES`:

```
OTEL_RESOURCE_ATTRIBUTES=dd_llmobs_enabled=false
```

### Usando código {#using-code}

También puede establecer el atributo programáticamente en cualquier tramo de su traza:

```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("my-span") as span:
    # Disable Agent Observability conversion for this entire trace
    span.set_attribute("dd_llmobs_enabled", False)
```

[1]: https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-agent-spans/#spans
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/llm/traces
[4]: /es/help/
[5]: https://pypi.org/project/strands-agents/
[6]: /es/llm_observability/evaluations/external_evaluations
[7]: https://strandsagents.com/latest/
[8]: /es/account_management/rbac/data_access/