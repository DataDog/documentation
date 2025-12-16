---
aliases:
- /es/tracing/llm_observability/api
- /es/llm_observability/api
- /es/llm_observability/setup/api
further_reading:
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog LLM Observability admite de forma nativa las convenciones semánticas
    GenAI de OpenTelemetry
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Realizar un seguimiento, comparar y optimizar tus mensajes de LLM con Datadog
    LLM Observability
title: Referencia de la API HTTP
---

## Información general

La API HTTP de LLM Observability proporciona una interfaz para que los desarrolladores envíen trazas (traces) y tramos (spans) relacionados con LLM a Datadog. Si tu aplicación está escrita en Python, Node.js o Java, puedes utilizar los [SDK de LLM Observability][1].

La API acepta tramos con marcas de tiempo de no más de 24 horas de antigüedad, lo que permite un relleno limitado de datos atrasados.

## API de tramos

Utiliza este endpoint para enviar tramos a Datadog. Para obtener más información sobre los tipos disponibles de tramos, consulta [Tipos de tramo][2].

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v1/trace/spans`

Método
: `POST`

### Solicitud

#### Encabezados (obligatorios)
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `Content-Type="application/json"`

#### Datos del cuerpo de texto (obligatorios)

{{< tabs >}}
{{% tab "Modelo" %}}
| Campo | Tipo | Descripción |
|-------|------------------------------|------|
| datos [*obligatorio*]| [SpansRequestData](#spansrequestdata) | Punto de entrada en el cuerpo de solicitud. |
{{% /tab %}}

{{% tab "Ejemplo" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "span",
    "attributes": {
      "ml_app": "weather-bot",
      "session_id": "1",
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

### Respuesta
Si la solicitud tiene éxito, la API responde con un código de red 202 y un cuerpo vacío.

### Normas de la API

#### Error
| Campo   | Tipo   | Descripción        |
|---------|--------|--------------------|
| mensaje | cadena | El mensaje de error. |
| stack   | cadena | El stack trace.   |
| tipo    | cadena | El tipo de error.    |

#### E/S
| Campo   | Tipo   | Descripción  |
|---------|--------|--------------|
| value   | cadena | Valor de entrada o salida. Si no se establece, este valor se deduce de los mensajes o documentos. |
| messages| [Mensaje](#message) | Lista de mensajes. Sólo debe utilizarse para tramos de LLM. |
| documents| [Documento](#document) | Lista de documentos. Esto sólo debe utilizarse como salida para los tramos de recuperación |
| mensaje | [Mensaje](#prompt) | Metadatos estructurados que incluyen la plantilla y las variables utilizadas para la entrada LLM. Solo debe utilizarse para la entrada E/S en tramos LLM. |


**Nota**: Cuando sólo se establece `input.messages` para un tramo de LLM, Datadog infiere `input.value` a partir de `input.messages` y utiliza la siguiente lógica de inferencia:

1. Si existe un mensaje con `role=user`, se utiliza el contenido del último mensaje como `input.value`.
1. Si no hay ningún mensaje con función `user`, `input.value` se deduce concatenando los campos de contenido de todos los mensajes, independientemente de sus roles.

#### Mensaje

| Campo                | Tipo   | Descripción              |
|----------------------|--------|--------------------------|
| content [*obligatorio*] | cadena | El cuerpo del mensaje. |
| rol                 | cadena | El rol de la entidad.  |

#### Documento
| Campo                | Tipo   | Descripción              |
|----------------------|--------|--------------------------|
| texto | cadena | El texto del documento. |
| nombre    | cadena | El nombre del documento.  |
| score | float | La puntuación asociada a este documento. |
| id    | cadena | El ID de este documento.  |

#### Mensaje

<div class="alert alert-info">LLM Observability registra las nuevas versiones de las plantillas cuando se actualiza el valor de <code>template</code> o <code>chat_template</code>. Si se espera que la entrada cambie entre invocaciones, extrae las partes dinámicas en una variable.</div>

{{< tabs >}}
{{% tab "Modelo" %}}
| Campo | Tipo | Descripción |
|----------------------|--------|--------------------------|
| id | string | Identificador lógico para este modelo de solicitud. Debe ser único por `ml_app`.|
| version | string | Etiqueta de versión para el mensaje (por ejemplo, "1.0.0"). Si no se proporciona, LLM Observability genera automáticamente una versión calculando un hash del contenido de la plantilla.|
| template | string | Formulario de plantilla de cadena única. Utiliza la sintaxis de parámetros (como `{{variable_name}}`) para incrustar variables. No debe configurarse con `chat_template`.|
| chat_template | [[Mensaje]](#mensaje) | Formulario de plantilla multimensaje. Utiliza la sintaxis de parámetros (como `{{variable_name}}`) para incrustar variables en el contenido del mensaje. No debe configurarse con `template`. |
| variables | Dict[key (string), string] | Variables utilizadas para representar la plantilla. Las claves corresponden a los nombres de los parámetros de la plantilla. |
| query_variable_keys | [string] | Claves variables que contienen la consulta del usuario. Se utiliza para la detección de alucinaciones. |
| context_variable_keys | [string] | Claves variables que contienen la verdad básica o el contenido del contexto. Utilizadas para la detección de alucinaciones. |
| tags | Dict[key (string), [string] | Etiquetas para adjuntar a la ejecución del mensaje. |

{{% /tab %}}
{{% tab "Example" %}}
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

#### Meta
| Campo       | Tipo              | Descripción  |
|-------------|-------------------|--------------|
| kind [*obligatorio*]    | cadena | El [tipo de tramo][2]: `"agent"`, `"workflow"`, `"llm"`, `"tool"`, `"task"`, `"embedding"`, o `"retrieval"`.      |
| error       | [Error](#error)             | Información sobre errores en el tramo.              |
| input       | [IO](#io)                | La información de entrada del tramo.               |
| output      | [IO](#io)                | La información de salida del tramo.              |
| metadata    | Dict[key (string), value] donde el valor es un valor float, bool o string | Datos sobre el tramo que no están relacionados con la entrada o la salida. Utiliza las siguientes claves de metadatos para tramos de LLM: `temperature`, `max_tokens`, `model_name` y `model_provider`. |

#### Métricas
| Campo                  | Tipo    | Descripción  |
|------------------------|---------|--------------|
| input_tokens           | float64 | El número de tokens de entrada. **Sólo válido para tramos de LLM.**      |
| output_tokens          | float64 | El número de tokens de salida. **Sólo válido para tramos de LLM.**     |
| total_tokens           | float64 | El número total de tokens asociados al tramo. **Sólo válido para tramos de LLM.**   |
| time_to_first_token    | float64 | El tiempo en segundos que tarda en devolverse el primer token de salida en aplicaciones LLM basadas en streaming. Establecido para tramos raíz. |
| time_per_output_token  | float64 | El tiempo en segundos que tarda en devolverse el token de salida en aplicaciones de LLM basadas en streaming. Establecido para tramos raíz. |
| input_cost             | float64 | Coste de entrada en dólares. **Solo válido para tramos LLM y de incrustación.** |
| output_cost            | float64 | Coste de salida en dólares. **Solo válido para tramos LLM.** |
| total_cost             | float64 | Coste total en dólares. **Solo válido para tramos LLM.** |
| non_cached_input_cost  | float64 | Coste de entrada no almacenado en caché en dólares. **Solo válido para tramos LLM.** |
| cache_read_input_cost  | float64 | Coste de entrada de lectura de la caché en dólares. **Solo válido para tramos LLM.** |
| cache_write_input_cost | float64 | Coste de entrada de escritura en caché en dólares. **Solo válido para tramos LLM.** |

#### Tramo

| Campo       | Tipo              | Descripción         |
|-------------|-------------------|---------------------|
| name [*obligatorio*]       | cadena            | El nombre del tramo.          |
| span_id [*obligatorio*]     | cadena            | Un ID exclusivo de tramo.       |
| trace_id [*obligatorio*]   | cadena            | Un identificador único compartido por todos los tramos de la misma traza.     |
| parent_id [*obligatorio*]    | cadena | ID de la entidad principal directa del tramo. Si el tramo es un tramo raíz, `parent_id` debe ser `undefined`. |
| start_ns [*obligatorio*]     | uint64            | La hora de inicio del tramo en nanosegundos.     |
| duration  [*obligatorio*]     | float64           | La duración del tramo en nanosegundos.          |
| meta [*obligatorio*]         | [Meta](#meta)              | El contenido básico relativo al tramo.       |
| status      | cadena            | Estado de error (`"ok"` o `"error"`). Por defecto `"ok"`.      |
| apm_trace_id | cadena      | ID de la traza APM asociada. Por defecto coincide con el campo `trace_id`.   |
| métricas     | [Métricas](#metrics)           | Métricas de Datadog para recopilar.         |
| session_id  | cadena     | El campo `session_id` del tramo. Anula el campo de nivel superior `session_id`.    |
| tags        | [[Etiqueta](#tag)] | Una lista de etiquetas para aplicar a este tramo concreto.       |

#### SpansRequestData
| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| type [*obligatorio*]        | cadena                        | Identificador de la solicitud. Establecido en `span`. |
| attributes [*obligatorio*]  | [SpansPayload](#spanspayload) | El cuerpo de la solicitud.  |

#### SpansPayload
| Campo    | Tipo                | Descripción  |
|----------|---------------------|--------------|
| ml_app [*obligatorio*] | cadena              | El nombre de tu solicitud de LLM. Consulta [Directrices para la denominación de solicitudes](#application-naming-guidelines).     |
| spans [*obligatorio*]  | [[Tramo](#span)] | Una lista de tramos.           |
| tags                | [[Etiqueta](#tag)]   | Una lista de etiquetas de nivel superior para aplicar a cada tramo.        |
| session_id          | cadena              | La sesión a la que pertenece la lista de tramos. También se puede anular o establecer en tramos individuales. |

#### Etiqueta (tag)

Las etiquetas deben formatearse como una lista de cadenas (por ejemplo, `["user_handle:dog@gmail.com", "app_version:1.0.0"]`). Su finalidad es almacenar información contextual en torno al tramo.

Para más información sobre etiquetas, consulta [Empezando con etiquetas][3].

#### Directrices de denominación de aplicaciones

El nombre de tu aplicación (el valor de `DD_LLMOBS_ML_APP`) debe ser una cadena Unicode en minúsculas. Puede contener los caracteres que se indican abajo:

- Caracteres alfanuméricos
- Guiones bajos
- Signos de resta
- Dos puntos
- Puntos
- Barras

El nombre puede tener hasta 193 caracteres y no puede contener guiones bajos contiguos ni finales.

## API de evaluaciones

Utiliza este endpoint para enviar evaluaciones asociadas a un determinado tramo a Datadog.

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v2/eval-metric`

Método
: `POST`

Las evaluaciones deben unirse a un tramo único. Puedes identificar el destino del tramo utilizando cualquiera de estos dos métodos:
1. Unión basada en etiquetas - Une una evaluación utilizando un par clave-valor de etiqueta personalizado que identifique de forma exclusiva un tramo único.
2. Referencia directa al tramo - Une una evaluación utilizando la combinación única de ID de traza y ID de tramo del tramo.


### Solicitud

#### Encabezados (obligatorios)
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `Content-Type="application/json"`

#### Datos del cuerpo de texto (obligatorios)

{{< tabs >}}
{{% tab "Modelo" %}}
| Campo | Tipo | Descripción |
|-------|------------------------------|------|
| data [*obligatorio*] | [EvalMetricsRequestData](#evalmetricsrequestdata) | Punto de entrada en el cuerpo de la solicitud. |
{{% /tab %}}

{{% tab "Example" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "attributes": {
      "metrics": [
        {
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
          "categorical_value": "Positive",
        },
        {
          "join_on": {
            "tag": {
              "key": "msg_id",
              "value": "1123132"
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
          "join_on": {
            "tag": {
              "key": "msg_id",
              "value": "1123132"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "boolean",
          "label": "Topic Relevancy",
          "boolean_value": true,
        }
      ]
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Respuesta

{{< tabs >}}
{{% tab "Modelo" %}}
| Campo | Tipo | Descripción | Asegurado |
|---------|-----------------------------|------------------------------------------|------------|
| ID | cadena | UUID de respuesta generado al enviar. | Sí
| métricas | [[EvalMetric](#evalmetric)] | Una lista de evaluaciones.                   | Sí |
{{% /tab %}}

{{% tab "Example" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "id": "456f4567-e89b-12d3-a456-426655440000",
    "attributes": {
      "metrics": [
        {
          "id": "d4f36434-f0cd-47fc-884d-6996cee26da4",
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
          "join_on": {
            "tag": {
              "key": "msg_id",
              "value": "1123132"
            }
          },
          "span_id": "20245611112024561111",
          "trace_id": "13932955089405749200",
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
          "join_on": {
            "tag": {
              "key": "msg_id",
              "value": "1123132"
            }
          },
          "span_id": "20245611112024561111",
          "trace_id": "13932955089405749200",
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "boolean",
          "label": "Topic Relevancy",
          "boolean_value": true,
        }
      ]
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Normas de la API

#### Atributos

| Campo   | Tipo         | Descripción                                         |
|---------|--------------|-----------------------------------------------------|
| metrics [*obligatorio*] | [[EvalMetric](#evalmetric)] | Una lista de evaluaciones cada una asociada a un tramo. |
| tags        | [[Etiqueta](#tag)] | Una lista de etiquetas para aplicar a todas las evaluaciones de la carga útil.       |

#### EvalMetric

| Campo                                                              | Tipo                | Descripción                                                                                            |
|--------------------------------------------------------------------|---------------------|--------------------------------------------------------------------------------------------------------|
| ID                                                                 | cadena              | Evaluación métrica UUID (generada en el momento de la presentación).                                                    |
| join_on [*obligatorio*]                                               | [[JoinOn](#joinon)] | Cómo se une la evaluación a un tramo.                                                                |
| timestamp_ms [*obligatorio*]                                          | int64               | Una marca temporal UTC UNIX en milisegundos que representa la hora a la que se envió la solicitud.                       |
| ml_app [*obligatorio*]                                                | cadena              | El nombre de tu solicitud de LLM. Consulta [Directrices para la denominación de solicitudes](#application-naming-guidelines). |
| metric_type [*obligatorio*]                                           | cadena              | Tipo de evaluación: `"categorical"`, `"score"` o `"boolean"`.                                    |
| label [*obligatorio*]                                                 | cadena              | El nombre único o etiqueta para la evaluación proporcionada.                                                 |
| categorical_value [*obligatorio si metric_type es "categorical"*] | cadena              | Cadena que representa la categoría a la que pertenece la evaluación.                                     |
| score_value [*obligatorio si metric_type es "score"*]             | número              | Un valor de puntuación de la evaluación.                                                                       |
| valor_booleano [*obligatorio si metric_type es "boolean"*].         | booleano             | Valor booleano de la evaluación.                                                                     |
| evaluación                                                         | cadena              | Valoración de esta evaluación. Los valores aceptados son `pass` y `fail`.                               |
| razonamiento                                                          | cadena              | Texto explicativo del resultado de la evaluación.                                                           |
| tags                                                               | [[Etiqueta](#tag)]       | Una lista de etiquetas para aplicar a esta métrica de evaluación concreta.                                          |

#### JoinOn

| Campo      | Tipo            | Descripción  |
|------------|-----------------|--------------|
| span | [[Tramo](#SpanContext)] | Identifica de forma única el tramo asociado a esta evaluación utilizando el ID de tramo y el ID de traza. |
| etiqueta | [[Etiqueta (Tag)](#TagContext)] | Identifica de forma única el tramo asociado a esta evaluación utilizando un par clave-valor de etiqueta. |

#### SpanContext

| Campo      | Tipo            | Descripción  |
|------------|-----------------|--------------|
| span_id | cadena | ID de tramo al que está asociada esta evaluación. |
| trace_id | cadena | ID de traza del tramo al que está asociada esta evaluación. |

#### TagContext

| Campo      | Tipo            | Descripción  |
|------------|-----------------|--------------|
| clave | cadena | Nombre de la clave de la etiqueta. Debe ser la misma clave utilizada al configurar la etiqueta en el tramo.  |
| value | cadena | Valor de la etiqueta. Este valor debe hacer coincidir exactamente un tramo con el par clave/valor de etiqueta especificado. |


#### EvalMetricsRequestData

| Campo      | Tipo            | Descripción  |
|------------|-----------------|--------------|
| type [*obligatorio*]      | cadena | Identificador de la solicitud. Establecido en `evaluation_metric`. |
| attributes [*obligatorio*] | [[Atributos](#attributes)] | El cuerpo de la solicitud. |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/setup/sdk/
[2]: /es/llm_observability/terms/
[3]: /es/getting_started/tagging/