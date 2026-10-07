---
aliases:
- /es/tracing/llm_observability/api
- /es/llm_observability/api
- /es/llm_observability/setup/api
- /es/llm_observability/instrumentation/api/
description: Documentación de referencia para la API HTTP de Agent Observability,
  utilizada para enviar trazas y tramos de LLM a Datadog desde aplicaciones en cualquier
  idioma.
further_reading:
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog LLM Observability admite de forma nativa las convenciones semánticas
    de GenAI de OpenTelemetry
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Realice un seguimiento, compare y optimice sus prompts de LLM con Datadog
    LLM Observability
title: Referencia de la API HTTP
---
## Descripción general {#overview}

La API HTTP de Agent Observability proporciona una interfaz para que los desarrolladores envíen trazas y tramos relacionados con LLM a Datadog. Si su aplicación está escrita en Python, Node.js o Java, puede usar los [Agent Observability SDKs][1].

La API acepta tramos con marcas de tiempo de no más de 24 horas de antigüedad, lo que permite un rellenado limitado de datos retrasados.

## API de tramos {#spans-api}

Utilice este punto de conexión para enviar tramos a Datadog. Para obtener detalles sobre los tipos de tramos disponibles, consulte [Span Kinds][2].

Punto de conexión
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v1/trace/spans`

Método
: `POST`

### Solicitud {#request}

#### Encabezados (obligatorio) {#headers-required}
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `Content-Type="application/json"`

#### Datos del cuerpo (obligatorio) {#body-data-required}

{{< tabs >}}
{{% tab "Model" %}}
| Campo | Tipo | Descripción                  |
|-------|------------------------------|------|
| datos [*obligatorio*]|  [SpansRequestData](#spansrequestdata) | Punto de entrada al cuerpo de la solicitud. |
{{% /tab %}}

{{% tab "Ejemplo" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "span",
    "attributes": {
      "ml_app": "weather-bot",
      "session_id": "1",
      "feedback_join_key": "weather-request-123",
      "tags": [
        "service:weather-bot",
        "env:staging",
        "user_handle:example-user@example.com",
        "user_id:1234"
      ],
      "spans": [
        {
          "parent_id": "undefined",
          "trace_id": "<TEST_TRACE_ID>",
          "span_id": "<AGENT_SPAN_ID>",
          "name": "health_coach_agent",
          "meta": {
            "kind": "agent",
            "input": {
              "value": "What is the weather like today and do i wear a jacket?"
            },
            "output": {
              "value": "It's very hot and sunny, there is no need for a jacket"
            }
          },
          "start_ns": 1713889389104152000,
          "duration": 10000000000
        },
        {
          "parent_id": "<AGENT_SPAN_ID>",
          "trace_id": "<TEST_TRACE_ID>",
          "span_id": "<WORKFLOW_ID>",
          "name": "qa_workflow",
          "meta": {
            "kind": "workflow",
            "input": {
              "value": "What is the weather like today and do i wear a jacket?"
            },
            "output": {
              "value":  "It's very hot and sunny, there is no need for a jacket"
            }
          },
          "start_ns": 1713889389104152000,
          "duration": 5000000000
        },
        {
          "parent_id": "<WORKFLOW_SPAN_ID>",
          "trace_id": "<TEST_TRACE_ID>",
          "span_id": "<LLM_SPAN_ID>",
          "name": "generate_response",
          "meta": {
            "kind": "llm",
            "input": {
              "messages": [
                {
                  "role": "system",
                  "content": "Your role is to ..."
                },
                {
                  "role": "user",
                  "content": "What is the weather like today and do i wear a jacket?"
                }
              ]
            },
            "output": {
              "messages": [
                {
                  "content": "It's very hot and sunny, there is no need for a jacket",
                  "role": "assistant"
                }
              ]
            }
          },
          "start_ns": 1713889389104152000,
          "duration": 2000000000
        }
      ]
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Respuesta {#response}
Si la solicitud es exitosa, la API responde con un código de red 202 y un cuerpo vacío.

### Estándares de API {#api-standards}

#### Error {#error}
| Campo   | Tipo   | Descripción        |
|---------|--------|--------------------|
| mensaje | cadena | El mensaje de error. |
| pila    | cadena | La traza de pila.   |
| tipo    | cadena | El tipo de error.    |

#### IO {#io}
| Campo   | Tipo   | Descripción  |
|---------|--------|--------------|
| valor   | cadena | Valor de entrada o salida. Si no se establece, este valor se infiere de los mensajes o documentos. |
| mensajes| [[Mensaje](#message)] | Lista de mensajes. Utilizar solo para tramos de LLM. |
| documentos| [[Documento](#document)] | Lista de documentos. Úselo solo como salida para tramos de recuperación. |
| prompt | [Prompt](#prompt) | Metadatos de prompt estructurados que incluyen la plantilla y las variables utilizadas para la entrada del LLM. Esto solo debe usarse para E/S de entrada en tramos de LLM. |
| incrustación | [float] | Lista de valores de incrustación. |
| parámetros | Dict[clave (cadena), valor] | Parámetros adicionales para la entrada o salida. |


**Nota**: Cuando solo se establece `input.messages` para un tramo de LLM, Datadog infiere `input.value` a partir de `input.messages` y utiliza la siguiente lógica de inferencia:

1. Si existe un mensaje con `role=user`, el contenido del último mensaje se utiliza como `input.value`.
1. Si no hay un mensaje con rol `user`, `input.value` se infiere concatenando los campos de contenido de todos los mensajes, independientemente de sus roles.

#### Mensaje {#message}

| Campo                | Tipo   | Descripción              |
|----------------------|--------|--------------------------|
| contenido [*obligatorio*] | cadena | El cuerpo del mensaje. |
| rol                 | cadena | El rol de la entidad.  |
| llamadas_de_herramienta | [[LlamadaDeHerramienta](#toolcall)] | Lista de llamadas de herramienta realizadas en este mensaje. |
| resultados_de_herramienta | [[ResultadoDeHerramienta](#toolresult)] | Lista de resultados de ejecución de herramientas en este mensaje. |
| partes_de_audio | [[ParteDeAudio](#audiopart)] | Lista de segmentos de audio adjuntos a este mensaje. Úselo para tramos de LLM multimodales (voz). |
| partes_de_imagen | [[ParteDeImagen](#imagepart)] | Lista de segmentos de imagen adjuntos a este mensaje. Úselo para tramos de LLM multimodales (visión). |

#### Documento {#document}
| Campo                | Tipo   | Descripción              |
|----------------------|--------|--------------------------|
| text | string | El texto del documento. |
| name    | string | El nombre del documento.  |
| score | float | La puntuación asociada con este documento. |
| id    | string | El id de este documento.  |
| ranking | integer | La clasificación de este documento. |
| metadata | Dict[key (string), value] | Metadatos adicionales para este documento. |

#### ToolCall {#toolcall}

| Campo | Tipo | Descripción |
|-------|------|-------------|
| name | string | El nombre de la herramienta que se está llamando. |
| arguments | Dict[key (string), value] | Los argumentos pasados a la herramienta. |
| tool_id | string | Identificador único para esta llamada de herramienta. |
| type | string | El tipo de llamada de herramienta. |

#### ToolResult {#toolresult}

| Campo | Tipo | Descripción |
|-------|------|-------------|
| name | string | El nombre de la herramienta que fue llamada. |
| result | string | El resultado devuelto por la herramienta. |
| tool_id | string | Identificador único que coincide con la llamada de herramienta correspondiente. |
| type | string | El tipo de resultado de la herramienta. |

#### AudioPart {#audiopart}

Un segmento de audio en un mensaje. Proporcione `content` o `attachment_key`.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| mime_type [*obligatorio*] | string | El tipo de medio del audio, como `audio/wav` o `audio/pcm`. |
| content | string | El audio codificado en base64, transportado en línea con el mensaje. |
| attachment_key | string | Una referencia al audio almacenado fuera de la carga útil del tramo, en lugar de en línea `content`. |

#### ImagePart {#imagepart}

Una imagen en un mensaje. Proporcione `content` o `attachment_key`.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| mime_type [*obligatorio*] | string | El tipo de medio de la imagen, como `image/png` o `image/jpeg`. |
| content | string | La imagen codificada en base64, transportada en línea con el mensaje. |
| attachment_key | string | Una referencia a una imagen almacenada fuera de la carga útil del tramo, en lugar de en línea `content`. |

#### ToolDefinition {#tooldefinition}

| Campo | Tipo | Descripción |
|-------|------|-------------|
| name | string | The name of the tool. |
| description | string | A description of what the tool does. |
| schema | Dict[key (string), value] | El schema que define los parámetros de la herramienta. |

#### SpanField {#spanfield}

| Campo | Tipo | Descripción |
|-------|------|-------------|
| tipo | cadena | El tipo de campo de tramo. |

#### Prompt {#prompt}

<div class="alert alert-info">Agent Observability registra nuevas versiones de plantillas cuando el <code>template</code> o <code>chat_template</code> valor se actualiza. Si se espera que la entrada cambie entre invocaciones, extraiga las partes dinámicas en una variable.</div>

{{< tabs >}}
{{% tab "Model" %}}
| Campo                | Tipo   | Descripción              |
|----------------------|--------|--------------------------|
| id    | cadena | Identificador lógico para esta plantilla de prompt. Debe ser único por `ml_app`.  |
| nombre | cadena | Nombre legible por humanos para el prompt. |
| versión | cadena | Etiqueta de versión para el prompt (por ejemplo, "1.0.0"). Si no se proporciona, Agent Observability genera automáticamente una versión calculando un hash del contenido de la plantilla. |
| plantilla | cadena | Forma de plantilla de cadena única. Utilice la sintaxis de marcador de posición (como `{{variable_name}}`) to embed variables. This should not be set with `chat_template`. |
| chat_template | [[Message]](#message) | Multi-message template form. Use placeholder syntax (like `{{variable_name}}`) to embed variables in message content. This should not be set with `template`. |
| variables | Dict[key (string), string] | Variables utilizadas para renderizar la plantilla. Las claves corresponden a los nombres de los marcadores de posición en la plantilla. |
| query_variable_keys | [string] | Claves de variables que contienen la consulta del usuario. Se utiliza para la detección de alucinaciones. |
| context_variable_keys | [string] | Claves de variables que contienen contenido de contexto o verdad fundamental. Se utiliza para la detección de alucinaciones. |
| tags | Dict[key (string), string] | Etiquetas para adjuntar a la ejecución del prompt. |

{{% /tab %}}
{{% tab "Ejemplo" %}}
{{< code-block lang="json" >}}
{
  "id": "translation-prompt",
  "chat_template": [
    {
      "role": "system",
      "content": "You are a translation service. You translate to {{language}}."
    }, {
      "role": "user",
      "content": "{{user_input}}"
    }
  ],
  "variables": {
    "language": "french",
    "user_input": "<USER_INPUT_TEXT>"
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### Meta {#meta}
| Campo       | Tipo              | Descripción  |
|-------------|-------------------|--------------|
| tipo [*obligatorio*]    | cadena | El [tipo de tramo][2]: `"agent"`, `"workflow"`, `"llm"`, `"tool"`, `"task"`, `"embedding"` o `"retrieval"`.      |
| error       | [Error](#error)             | Información de error sobre el tramo.              |
| input       | [IO](#io)                | La información de entrada del tramo.               |
| output      | [IO](#io)                | La información de salida del tramo.              |
| metadata                 | Dict[key (string), value] donde el valor es un float, bool o string | Datos sobre el tramo que no están relacionados con la entrada o salida. Por ejemplo, puede pasar `temperature` y `max_tokens` para tramos de LLM. |
| model_name | string | El nombre del modelo utilizado para tramos de LLM. |
| model_provider | string | El proveedor del modelo utilizado para tramos de LLM. |
| model_version | string | La versión del modelo utilizado para tramos de LLM. |
| embedding_for_prompt_idx | integer | El índice del prompt para el cual se calcularon los embeddings. |
| span | [SpanField](#spanfield) | Información del campo tramo. |
| tool_definitions | [[ToolDefinition](#tooldefinition)] | lista de definiciones de herramientas disponibles. |
| expected_output | [IO](#io) | La información de salida esperada del tramo. |
| intent | string | La intención del tramo. |

#### Métricas {#metrics}

Un diccionario de métricas a recopilar para el tramo. Las claves son nombres de métricas (cadenas) y los valores son valores de métricas (punteros float64). Las métricas comunes incluyen:
- `input_tokens` - El número de tokens de entrada (tramos de LLM)
- `output_tokens` - El número de tokens de salida (tramos de LLM)
- `total_tokens` - El número total de tokens (tramos de LLM)
- `non_cached_input_tokens` - El número de tokens de entrada no almacenados en caché (tramos de LLM)
- `cache_read_input_tokens` - El número de tokens de entrada leídos de la caché (tramos de LLM)
- `cache_write_input_tokens` - El número de tokens de entrada escritos en la caché (tramos de LLM)
- `reasoning_output_tokens` - El número de tokens de razonamiento (tramos de LLM)
- `time_to_first_token` - Tiempo en segundos para el primer token de salida (LLM en streaming, tramos raíz)
- `time_per_output_token` - Tiempo en segundos por token de salida (LLM en streaming, tramos raíz)
- `input_cost` - Costo de entrada en dólares (tramos de LLM y embedding)
- `output_cost` - Costo de salida en dólares (tramos de LLM)
- `total_cost` - Costo total en dólares (tramos de LLM)
- `non_cached_input_cost` - Costo de entrada sin caché en dólares (tramos de LLM)
- `cache_read_input_cost` - Costo de entrada de lectura de caché en dólares (tramos de LLM)
- `cache_write_input_cost` - Costo de entrada de escritura de caché en dólares (tramos de LLM)
- `reasoning_output_cost`- Costo de salida de razonamiento en dólares (tramos de LLM)

Tipo: `Dict[key (string), float64]`

#### Tramo {#span}

| Campo       | Tipo              | Descripción         |
|-------------|-------------------|---------------------|
| name [*obligatorio*]       | string            | El nombre del tramo.          |
| span_id [*obligatorio*]     | string            | Un ID único para el tramo.       |
| trace_id  [*obligatorio*]   | string            | Un ID único compartido por todos los tramos en la misma traza.     |
| parent_id  [*obligatorio*]    | string | ID del padre directo del tramo. Si el tramo es un tramo raíz, el `parent_id` debe ser `undefined`. |
| start_ns [*obligatorio*]     | uint64            | La hora de inicio del tramo en nanosegundos.     |
| duration  [*obligatorio*]     | float64           | La duración del tramo en nanosegundos.          |
| meta [*obligatorio*]         | [Meta](#meta)              | El contenido principal relativo al tramo.       |
| status      | string            | Estado de error (`"ok"` o `"error"`). El valor predeterminado es `"ok"`.      |
| apm_trace_id | string      | El ID de la traza de APM asociada. El valor predeterminado coincide con el campo `trace_id`.   |
| metrics     | Dict[key (string), float64]           | Métricas de Datadog para recopilar. Consulte [Métricas](#metrics) para ver los nombres de métricas comunes.         |
| session_id  | string     | El `session_id` del tramo. Anula el campo `session_id` de nivel superior.    |
| feedback_join_key | string | Una clave definida por el cliente que se utiliza para conectar los comentarios a este tramo. Anula el campo `feedback_join_key` de nivel superior. Para obtener más detalles, consulte [Comentarios del usuario final][4]. |
| tags        | [[Tag](#tag)] | Una lista de etiquetas para aplicar a este tramo en particular.       |
| service | string | El nombre del servicio. |
| ml_app | string | El nombre de la aplicación LLM para este tramo. Anula el campo `ml_app` de nivel superior. |

#### SpansRequestData {#spansrequestdata}
| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| type [*obligatorio*]        | string                        | Identificador de la solicitud. Establecer en `span`. |
| attributes [*obligatorio*]  | [SpansPayload](#spanspayload) | El cuerpo de la solicitud.  |

#### SpansPayload {#spanspayload}
| Campo    | Tipo                | Descripción  |
|----------|---------------------|--------------|
| ml_app [*obligatorio*] | cadena              | El nombre de su aplicación de LLM. Consulte [Pautas para nombrar aplicaciones](#application-naming-guidelines).     |
| spans [*obligatorio*]  | [[Span](#span)] | Una lista de tramos.           |
| tags                | [[Etiqueta](#tag)]   | Una lista de etiquetas de nivel superior para aplicar a cada tramo.        |
| session_id          | cadena              | La sesión a la que pertenece la lista de tramos. También se puede anular o establecer en tramos individuales. |
| feedback_join_key   | cadena              | Una clave definida por el cliente que se utiliza para conectar los comentarios con los tramos en la carga útil. También se puede anular o establecer en tramos individuales. Para obtener más detalles, consulte [Comentarios del usuario final][4]. |

#### Etiqueta {#tag}

Las etiquetas deben tener el formato de una lista de cadenas (por ejemplo, `["user_handle:dog@gmail.com", "app_version:1.0.0"]`). Están destinadas a almacenar información contextual relacionada con el tramo.

Para obtener más información sobre las etiquetas, consulte [Getting Started with Tags][3].

#### Pautas para nombrar aplicaciones {#application-naming-guidelines}

El nombre de su aplicación (el valor de `DD_LLMOBS_ML_APP`) debe ser una cadena Unicode en minúsculas. Puede contener los caracteres enumerados a continuación:

- Alfanuméricos
- Guiones bajos
- Guiones
- Dos puntos
- Puntos
- Barras

El nombre puede tener hasta 193 caracteres de longitud y no puede contener guiones bajos contiguos o al final.

## API de evaluaciones {#evaluations-api}

<div class="alert alert-info">Para obtener ejemplos completos y orientación sobre cómo crear evaluadores personalizados, consulte la <a href="/llm_observability/guide/evaluation_developer_guide/">Guía para desarrolladores de evaluación</a>.</div>

Utilice este punto de conexión para enviar evaluaciones y comentarios de los usuarios finales a Datadog. Las evaluaciones pueden asociarse con tramos, trazas o sesiones. Los comentarios de los usuarios finales pueden asociarse con tramos, trazas, sesiones o una clave de unión de comentarios definida por el cliente.

Punto de conexión
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v2/eval-metric`

Método
: `POST`

Use el campo `eval_scope` para establecer la granularidad de una evaluación:

- **`span`** (predeterminado): La evaluación está asociada con un tramo específico. Use `join_on` para identificar el tramo de destino con un par clave-valor de etiqueta o una combinación de ID de tramo e ID de traza.
- **`trace`**: La evaluación está asociada con una traza completa. Use `join_on` para identificar el tramo raíz de la traza.
- **`session`**: La evaluación está asociada con una sesión. Proporcione `session_id` en lugar de `join_on`.

Para enviar comentarios, configure `event_kind` en `feedback`. Los eventos de retroalimentación deben incluir `submitter.id`, omitir `join_on` y proporcionar exactamente un campo de destino: `span_id`, `trace_id`, `session_id` o `feedback_join_key`. Si se omite `eval_scope`, Datadog lo infiere del campo de destino.

Use `feedback_join_key` cuando los comentarios se apliquen a una entidad externa, como un ID de incidente, ID de informe, ID de tarea o ID de verificación de lanzamiento, en lugar de a un solo tramo, traza o sesión. Para que los comentarios aparezcan con la telemetría relacionada, establezca el mismo `feedback_join_key` en los tramos relacionados cuando los envíe con la [API de tramos](#spans-api) o añadiendo una etiqueta `feedback_join_key:incident-1234` a través de [Enriquecer tramos][5].

Para crear widgets de tablero a partir de la retroalimentación, cree el widget como lo haría para una evaluación y añada el filtro `@event_kind:feedback`.

<div class="alert alert-info">La compatibilidad para filtrar tramos, trazas o sesiones por comentarios no está disponible. Por ejemplo, todavía no puede filtrar trazas solo para aquellas con comentarios de pulgar hacia abajo. Utilice tableros con alcance a <code>@event_kind:feedback</code> en su lugar.</div>

### Solicitud {#request-1}

#### Encabezados (obligatorio) {#headers-required-1}
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `Content-Type="application/json"`

#### Datos del cuerpo (obligatorio) {#body-data-required-1}

{{< tabs >}}
{{% tab "Model" %}}
| Campo | Tipo | Descripción                  |
|-------|------------------------------|------|
| datos [*obligatorio*] | [EvalMetricsRequestData](#evalmetricsrequestdata) | Punto de entrada al cuerpo de la solicitud. |
{{% /tab %}}

{{% tab "Ejemplo" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "attributes": {
      "metrics": [
        {
          "eval_scope": "span",
          "join_on": {
            "span": {
              "span_id": "20245611112024561111",
              "trace_id": "13932955089405749200"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609459200,
          "metric_type": "categorical",
          "label": "Sentiment",
          "categorical_value": "Positive"
        },
        {
          "eval_scope": "trace",
          "join_on": {
            "span": {
              "span_id": "20245611112024561111",
              "trace_id": "13932955089405749200"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "score",
          "label": "Accuracy",
          "score_value": 3,
          "assessment": "fail",
          "reasoning": "The response provided incorrect information about the weather forecast."
        },
        {
          "eval_scope": "session",
          "session_id": "abc123def456",
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "boolean",
          "label": "Topic Relevancy",
          "boolean_value": true
        },
        {
          "eval_scope": "span",
          "join_on": {
            "tag": {
              "key": "msg_id",
              "value": "1123132"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "json",
          "label": "Custom Evaluation",
          "json_value": {
            "verdict": "pass",
            "confidence": 0.95,
            "is_valid": true,
            "metrics": {
              "accuracy": 0.92,
              "precision": 0.88
            },
            "passed_checks": ["coherence", "relevance", "factuality"]
          }
        },
        {
          "event_kind": "feedback",
          "feedback_join_key": "weather-request-123",
          "ml_app": "weather-bot",
          "timestamp_ms": 1765990800016,
          "metric_type": "text",
          "label": "user_comment",
          "text_value": "The response did not answer whether I needed a jacket.",
          "assessment": "fail",
          "submitter": {
            "id": "user-123",
            "type": "user"
          }
        }
      ]
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Respuesta {#response-1}

{{< tabs >}}
{{% tab "Model" %}}
| Campo | Tipo | Descripción | Garantizado |
|---------|-----------------------------|------------------------------------------|------------|
| ID | cadena | UUID de respuesta generado al momento del envío. | Sí |
| métricas | [[EvalMetric](#evalmetric)] | Una lista de evaluaciones o eventos de retroalimentación. | Sí |
{{% /tab %}}

{{% tab "Ejemplo" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "id": "456f4567-e89b-12d3-a456-426655440000",
    "attributes": {
      "metrics": [
        {
          "id": "d4f36434-f0cd-47fc-884d-6996cee26da4",
          "eval_scope": "span",
          "join_on": {
            "span": {
              "span_id": "20245611112024561111",
              "trace_id": "13932955089405749200"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609459200,
          "metric_type": "categorical",
          "label": "Sentiment",
          "categorical_value": "Positive"
        },
        {
          "id": "cdfc4fc7-e2f6-4149-9c35-edc4bbf7b525",
          "eval_scope": "trace",
          "join_on": {
            "span": {
              "span_id": "20245611112024561111",
              "trace_id": "13932955089405749200"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "score",
          "label": "Accuracy",
          "score_value": 3,
          "assessment": "fail",
          "reasoning": "The response provided incorrect information about the weather forecast."
        },
        {
          "id": "haz3fc7-g3p2-1s37-8m12-ndk4hbf7a522",
          "eval_scope": "session",
          "session_id": "abc123def456",
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "boolean",
          "label": "Topic Relevancy",
          "boolean_value": true
        },
        {
          "id": "abc1234-h4i5-6j78-9k01-lmn2opq3rst4",
          "eval_scope": "span",
          "join_on": {
            "tag": {
              "key": "msg_id",
              "value": "1123132"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "json",
          "label": "Custom Evaluation",
          "json_value": {
            "verdict": "pass",
            "confidence": 0.95,
            "is_valid": true,
            "metrics": {
              "accuracy": 0.92,
              "precision": 0.88
            },
            "passed_checks": ["coherence", "relevance", "factuality"]
          }
        },
        {
          "id": "fedbk34-h4i5-6j78-9k01-lmn2opq3rst4",
          "event_kind": "feedback",
          "eval_scope": "external",
          "feedback_join_key": "weather-request-123",
          "ml_app": "weather-bot",
          "timestamp_ms": 1765990800016,
          "metric_type": "text",
          "label": "user_comment",
          "text_value": "The response did not answer whether I needed a jacket.",
          "assessment": "fail",
          "submitter": {
            "id": "user-123",
            "type": "user"
          }
        }
      ]
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Estándares de API {#api-standards-1}

#### Atributos {#attributes}

| Campo | Tipo | Descripción |
|---------|--------------|-----------------------------------------------------|
| métricas [*obligatorio*] | [[EvalMetric](#evalmetric)] | Una lista de evaluaciones o eventos de retroalimentación. |
| etiquetas        | [[Tag](#tag)] | Una lista de etiquetas para aplicar a todas las evaluaciones o eventos de retroalimentación en la carga útil. |

#### EvalMetric {#evalmetric}

| Campo                                                              | Tipo                | Descripción                                                                                            |
|--------------------------------------------------------------------|---------------------|--------------------------------------------------------------------------------------------------------|
| ID                                                                 | string              | UUID de la métrica de evaluación (generado al enviar).                                                    |
| event_kind                                                         | string              | El tipo de evento. Los valores aceptados son `"evaluation"` y `"feedback"`. El valor predeterminado es `"evaluation"` cuando se omite. |
| eval_scope                                                         | string              | La granularidad del evento: `"span"` (predeterminado para evaluaciones), `"trace"`, `"session"`, o `"external"` para retroalimentación dirigida por `feedback_join_key`. Para la retroalimentación, esto puede omitirse e inferirse del campo de destino. |
| join_on [*obligatorio para evaluaciones con contexto de tramo y traza*]          | [[JoinOn](#joinon)] | Cómo se vincula una evaluación a un tramo o traza. Obligatorio para evaluaciones cuando `eval_scope` es `"span"` o `"trace"`. Debe estar ausente para la retroalimentación y para las evaluaciones de sesión. |
| span_id                                                            | string              | Para la retroalimentación, el ID del tramo con el que se asocia la retroalimentación. Use esto como uno de los campos de destino de la retroalimentación. |
| trace_id                                                           | string              | Para la retroalimentación, el ID de traza con el que se asocia la retroalimentación. Use esto como uno de los campos de destino de la retroalimentación. |
| session_id [*obligatorio para evaluaciones con contexto de sesión*]              | string              | El ID de sesión con el que se asocia el evento. Obligatorio para evaluaciones cuando `eval_scope` es `"session"`. Para la retroalimentación, use esto como uno de los campos de destino de la retroalimentación. Debe estar ausente cuando `eval_scope` que no es de retroalimentación es `"span"` o `"trace"`. |
| feedback_join_key                                                  | string              | Para comentarios, una clave definida por el cliente para comentarios que se aplica a una entidad externa en lugar de a un solo tramo, traza o sesión. Debe estar ausente para las evaluaciones. |
| submitter [*requerido para comentarios*]                                | [Submitter](#submitter) | El usuario, agente u otra entidad que envió los comentarios. |
| timestamp_ms [*requerido*]                                          | int64               | Una marca de tiempo UNIX UTC en milisegundos que representa la hora en que se envió la solicitud.                       |
| ml_app [*requerido*]                                                | string              | El nombre de su aplicación de LLM. Consulte [Pautas para nombrar aplicaciones](#application-naming-guidelines). |
| metric_type [*requerido*]                                           | string              | El tipo de valor: `"categorical"`, `"score"`, `"boolean"`, `"json"` o `"text"`. El tipo `"text"` solo es compatible con eventos de retroalimentación. |
| label [*requerido*]                                                 | string              | El nombre o etiqueta único para la evaluación o retroalimentación proporcionada.                                      |
| categorical_value [*requerido si metric_type es \"categorical\"*] | string              | Una cadena que representa el valor de la categoría. No es requerido cuando `status` es `"WARN"` o `"ERROR"`. |
| score_value [*requerido si metric_type es \"score\"*]             | number              | Un valor de puntuación. No es requerido cuando `status` es `"WARN"` o `"ERROR"`. |
| boolean_value [*requerido si metric_type es \"boolean\"*]         | boolean             | Un valor booleano. No es requerido cuando `status` es `"WARN"` o `"ERROR"`. |
| json_value [*requerido si metric_type es \"json\"*]               | Dict[key (string), value] | Un valor de objeto JSON. No es requerido cuando `status` es `"WARN"` o `"ERROR"`. |
| text_value [*requerido si metric_type es \"text\"*]               | string              | Un valor de texto. Esto solo es compatible con eventos de comentarios y es útil para comentarios de texto libre.          |
| status                                                             | string              | El resultado de la ejecución del evaluador. Los valores aceptados son `"OK"`, `"WARN"` y `"ERROR"`. Cuando `"WARN"` o `"ERROR"`, el evaluador se omitió o falló, y no se requiere ningún campo de valor escrito (`categorical_value`, `score_value`, etcétera). |
| error                                                              | [EvalMetricError](#evalmetricerror) | Detalles estructurados del error. Obligatorio cuando `status` es `"WARN"` o `"ERROR"`. |
| evaluación                                                         | cadena              | Una evaluación de esta evaluación. Los valores aceptados son `pass` y `fail`.                               |
| razonamiento                                                          | cadena              | Una explicación textual del resultado de la evaluación.                                                           |
| etiquetas                                                               | [[Etiqueta](#tag)]       | Una lista de etiquetas para aplicar a esta métrica de evaluación en particular.                                          |

Para eventos de comentarios, proporcione exactamente uno de `span_id`, `trace_id`, `session_id` o `feedback_join_key`. Si proporciona `eval_scope`, debe coincidir con el campo de destino: `span_id` se asigna a `"span"`, `trace_id` se asigna a `"trace"`, `session_id` se asigna a `"session"` y `feedback_join_key` se asigna a `"external"`.

#### Remitente {#submitter}

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id [*obligatorio*] | cadena | Identificador del usuario, agente u otra entidad que envió los comentarios. |
| tipo | cadena | Categoría del remitente. Los valores recomendados son `user` y `agent`. |

#### JoinOn {#joinon}

| Campo      | Tipo            | Descripción  |
|------------|-----------------|--------------|
| tramo | [[SpanContext](#spancontext)] | Identifica de forma única el tramo asociado con esta evaluación mediante el ID de tramo y el ID de traza. |
| etiqueta | [[TagContext](#tagcontext)] | Identifica de forma única el tramo asociado con esta evaluación mediante un par de clave-valor de etiqueta. |

#### SpanContext {#spancontext}

| Campo      | Tipo            | Descripción  |
|------------|-----------------|--------------|
| span_id [*obligatorio*] | string | El ID de tramo con el que está asociada esta evaluación. Debe ser una cadena decimal (por ejemplo, `"20245611112024561111"`). Si su instrumentación produce ID de tramo hexadecimales (como OpenTelemetry), conviértalos a decimal antes de enviarlos. |
| trace_id [*obligatorio*] | string | El ID de traza del tramo con el que está asociada esta evaluación. Debe ser una cadena decimal (por ejemplo, `"13932955089405749200"`) o una cadena hexadecimal en minúsculas de 32 caracteres para IDs de traza de 128 bits. |

#### TagContext {#tagcontext}

| Campo      | Tipo            | Descripción  |
|------------|-----------------|--------------|
| key [*obligatorio*] | string | El nombre de la clave de etiqueta. Esta debe ser la misma clave utilizada al establecer la etiqueta en el tramo.  |
| value [*obligatorio*] | string | El valor de la etiqueta. Este valor debe coincidir exactamente con un tramo con el par clave/valor de etiqueta especificado. |


#### EvalMetricsRequestData {#evalmetricsrequestdata}

| Campo      | Tipo            | Descripción  |
|------------|-----------------|--------------|
| tipo [*obligatorio*]      | string | Identificador para la solicitud. Establecer en `evaluation_metric`. |
| atributos [*obligatorio*] | [[Atributos](#attributes)] | El cuerpo de la solicitud. |

#### EvalMetricError {#evalmetricerror}

| Campo   | Tipo   | Descripción                                                |
|---------|--------|------------------------------------------------------------|
| tipo    | cadena | El tipo de error o excepción (por ejemplo, `"ValueError"`). |
| mensaje | cadena | Una descripción del error legible por humanos.                 |
| traza de pila   | string | La traza de pila, si está disponible.                             |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/setup/sdk/
[2]: /es/llm_observability/quickstart/terms/
[3]: /es/getting_started/tagging/
[4]: /es/llm_observability/configure/evaluations/end_user_feedback
[5]: /es/llm_observability/instrument/sdk/?tab=python#enriching-spans