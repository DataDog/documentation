---
aliases:
- /es/llm_observability/evaluations/export_api/
description: Referencia para la Agent Observability Export API, que proporciona puntos
  de conexión para buscar y recuperar datos de tramos para evaluaciones externas o
  almacenamiento sin conexión.
title: Export API
---
## Descripción general {#overview}

La Agent Observability Export API proporciona puntos de conexión para recuperar datos de tramos. Estos puntos de conexión le permiten acceder programáticamente a sus datos de Agent Observability para ejecutar evaluaciones externas y exportar tramos para almacenamiento sin conexión.

<div class="alert alert-info">De forma predeterminada, exportamos los tramos de los últimos 15 minutos. Si necesita buscar fuera de este periodo de tiempo, especifique un rango de tiempo en su solicitud.</div>

## Buscar tramos {#search-spans}

Utilice este punto de conexión para buscar y filtrar tramos de Agent Observability según criterios específicos.

Punto de conexión
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/llm-obs/v1/spans/events/search`

Método
: `POST`

### Solicitud {#request}

#### Encabezados (obligatorio) {#headers-required}
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `DD-APPLICATION-KEY=<YOUR_DATADOG_APPLICATION_KEY>`
- `Content-Type="application/vnd.api+json"`

#### Datos del cuerpo (obligatorio) {#body-data-required}

{{< tabs >}}
{{% tab "Model" %}}
| Campo | Tipo | Descripción                  |
|-------|------------------------------|------|
| datos[obligatorio] | [SearchSpansRequest](#searchspansrequest) | Punto de entrada al cuerpo de la solicitud. |
{{% /tab %}}

{{% tab "Ejemplo" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "spans",
    "attributes": {
      "filter": {
        "from": "2025-10-27T00:00:00Z",
        "to": "2025-10-29T23:59:59Z",
        "trace_id": "123456789",
        "span_kind": "llm",
        "tags": {
          "test-key": "correct-test-value"
        }
      },
      "page": {
        "limit": 2
      },
      "options": {
        "time_offset": 3600
      },
      "sort": "timestamp"
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### Ejemplo de código {#code-example}

{{< tabs >}}
{{% tab "Curl" %}}
{{< code-block lang="bash" >}}
curl -X POST "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events/search" \
-H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
-H "Content-Type: application/vnd.api+json" \
-d @- << EOF
{
  "data": {
    "type": "spans",
    "attributes": {
      "filter": {
        "from": "2025-10-27T00:00:00Z",
        "to": "2025-10-29T23:59:59Z",
        "span_id": "14624140233640368324"
      }
    }
  }
}
EOF
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Listar spans {#list-spans}

Utilice este punto de conexión para recuperar una lista de tramos de Agent Observability.

Punto de conexión
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/llm-obs/v1/spans/events`

Método
: `GET`

### Solicitud {#request-1}

#### Encabezados (obligatorio) {#headers-required-1}
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `DD-APPLICATION-KEY=<YOUR_DATADOG_APPLICATION_KEY>`

#### Parámetros de consulta {#query-parameters}

| Parámetro | Tipo | Descripción                  |
|-------|------------------------------|------|
| filter[query] | string | Busca tramos utilizando la sintaxis de consulta EVP genérica. Si no se proporciona ningún filtro de consulta, los otros filtros tienen prioridad. |
| filter[span_id] | string | Busca un tramo específico por su ID de tramo. |
| filter[trace_id] | string | Busca tramos por su ID de traza. |
| filter[tag][key] | string | Busca tramos por pares de clave de etiqueta / valor de etiqueta. |
| filter[span_kind] | string | El tipo de tramo: "agent", "flujo de trabajo", "llm", "tool", "task", "embedding" o "retrieval". |
| filter[span_name] | string | Busca tramos según su nombre proporcionado. |
| filter[ml_app] | string | Busca tramos enviados bajo una aplicación de ML específica. |
| filter[from] | string | Marca de tiempo mínima para los tramos solicitados. Admite fecha y hora ISO8601, cálculos de fecha y marcas de tiempo regulares (milisegundos). El valor predeterminado es la hora actual menos 15 minutos. |
| filter[to] | string | Marca de tiempo máxima para los tramos solicitados. Admite fecha y hora ISO8601, cálculos de fecha y marcas de tiempo regulares (milisegundos). El valor predeterminado es la hora actual. |
| sort | string | Orden de clasificación. Valores permitidos: timestamp, -timestamp |
| include_attachments | boolean | Indica si se debe recuperar el contenido de entrada y salida truncado. El valor predeterminado es True. |
| page[cursor] | string | Enumere los resultados siguientes con un cursor proporcionado en la consulta anterior. |
| page[limit] | integer | Número máximo de tramos en la respuesta. Predeterminado: 10. Límite máximo configurable: 5000. <br>**Nota:** Las respuestas están sujetas a un límite de tamaño de 50 MB. Los límites grandes (100+) pueden aumentar el tiempo de respuesta. Si sus tramos contienen entradas o salidas grandes, utilice un límite menor y pagine con `page[cursor]`. |

#### Ejemplo de código {#code-example-1}

{{< tabs >}}
{{% tab "Curl" %}}
{{< code-block lang="bash" >}}
curl -G "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events" \
-H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
# searches for spans from the past 15 minutes
--data-urlencode "filter[trace_id]=6903738200000000af2d3775dfc70530"
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Respuesta {#response}

Ambos puntos de conexión tienen el mismo formato de respuesta. [Los resultados están paginados](/logs/guide/collect-multiple-logs-with-pagination/).

{{< tabs >}}
{{% tab "Model" %}}
| Campo   | Tipo                        | Descripción                              |
|---------|-----------------------------|------------------------------------------|
| data    | [[SearchedSpanResource](#searchedspanresource)]             | Lista de tramos que coinciden con los criterios de búsqueda. |
| meta    | [Meta](#meta)       | Metadatos sobre la respuesta.             |
| links    | [Links](#links)       | Atributos de enlaces.            |
{{% /tab %}}

{{% tab "Ejemplo" %}}
{{< code-block lang="json" >}}
{
  "data": [
    {
      "id": "14624140233640368324",
      "type": "span",
      "attributes": {
        "duration": 83000,
        "evaluation": {
          "failure_to_answer": {
              "eval_metric_type": "categorical",
              "value": "answered",
              "assessment": "pass",
              "status": "OK",
              "metadata": {
                  "_dd": {
                      "evaluation_kind": "failure_to_answer"
                  }
              },
              "llm_output": "answered"
          }
        },
        "input": {
          "value": "hi",
          "messages": [
            {
              "content": "hi",
              "role": "user"
            }
          ]
        },
        "metadata": {
          "test-key": "test-value"
        },
        "metrics": {
          "cache_read_input_tokens": 0,
          "cache_write_input_tokens": 0,
          "estimated_cache_read_input_cost": 0,
          "estimated_cache_write_input_cost": 0,
          "estimated_input_cost": 1500,
          "estimated_non_cached_input_cost": 1500,
          "estimated_output_cost": 6000,
          "estimated_total_cost": 7500,
          "input_tokens": 10,
          "non_cached_input_tokens": 10,
          "output_tokens": 10,
          "total_tokens": 20
        },
        "ml_app": "test-ml-app",
        "model_name": "gpt-4o-mini",
        "model_provider": "openai",
        "name": "llm_call_enriched",
        "output": {
          "value": "hello there",
          "messages": [
            {
              "content": "hello there",
              "role": "assistant"
            }
          ]
        },
        "parent_id": "undefined",
        "span_id": "14624140233640368324",
        "span_kind": "llm",
        "start_ns": 1761833858897,
        "status": "ok",
        "tags": [
          "service:test-service",
          "env:prod",
          "ddtrace.version:3.17",
          "test-key:test-value",
          "error:0",
          "source:llm-observability",
          "source:integration",
          "ml_app:test-ml-app",
          "version:",
          "language:python"
        ],
        "tool_definitions": [
          {
            "name": "test-tool",
            "description": "A test tool",
            "schema": {
              "test-key": "test-value"
            }
          }
        ],
        "trace_id": "6903738200000000af2d3775dfc70530"
      }
    }
  ],
  "meta": {
    "elapsed": 336,
    "request_id": "pddv1ChZucHRwTW96NFNfT3Z4bWFLTFBDWkR3Ii0KHYhY65R_1R21AyDpavSaeO2sul_V6omQLAyWutrzEgx-GnVDrZaMu-lW-Yc",
    "status": "done",
    "page": null
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}


## Estándares de API {#api-standards}

### SearchSpansRequest {#searchspansrequest}

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| type [*obligatorio*]        | string                        | Identificador de la solicitud. Establecer en `spans`. |
| attributes [*obligatorio*]  | [SearchSpansPayload](#searchspanspayload) | El cuerpo de la solicitud.  |

### SearchSpansPayload {#searchspanspayload}

| Campo | Tipo | Descripción                  |
|-------|------------------------------|------|
| filter | [Filter](#filter) | La configuración de la consulta de búsqueda y filtro. |
| opciones | [Opciones](#options) | Opciones de consulta globales que se utilizan durante la consulta. |
| página | [PageQuery](#pagequery) | Atributos de paginación para listar tramos. |
| sort | string | Orden de clasificación. Valores permitidos: timestamp, -timestamp |

### Filtro {#filter}

| Campo | Tipo | Descripción |
|-------|------|-------------|
| consulta | string | Busca tramos utilizando la sintaxis de consulta EVP genérica. Si no se proporciona ningún filtro de consulta, los otros filtros tienen prioridad. |
| span_id | string | Busca un tramo específico por su ID de tramo. |
| trace_id | string | Busca tramos por su ID de traza. |
| tags | Dict[key (string), string] | Buscar tramos por pares de clave de etiqueta / valor. |
| span_kind | string | El tipo de tramo: "agent", "workflow", "llm", "tool", "task", "embedding" o "retrieval". |
| span_name | string | Busca tramos según el nombre proporcionado. |
| ml_app | string | Buscar tramos enviados bajo una aplicación de ML particular. |
| from | string | Marca de tiempo mínima para los tramos solicitados. Admite fecha y hora ISO8601, cálculos de fecha y marcas de tiempo regulares (milisegundos). El valor predeterminado es la hora actual menos 15 minutos. |
| hasta | string | Marca de tiempo máxima para los tramos solicitados. Admite fecha y hora ISO8601, cálculos de fecha y marcas de tiempo regulares (milisegundos). El valor predeterminado es la hora actual. |

### Opciones {#options}

| Campo | Tipo | Descripción |
|-------|------|-------------|
| time_offset | integer | El desplazamiento de tiempo (en segundos) que se aplicará a la consulta. |
| include_attachments | boolean | Indica si se debe recuperar el contenido de entrada y salida truncado. El valor predeterminado es True. |

### PageQuery {#pagequery}

| Campo | Tipo | Descripción |
|-------|------|-------------|
| limit | integer | Número máximo de tramos en la respuesta. Predeterminado: 10. Límite máximo configurable: 5000. <br>**Nota:** Las respuestas están sujetas a un límite de tamaño de 50 MB. Los límites grandes (100+) pueden aumentar el tiempo de respuesta. Si sus tramos contienen entradas o salidas grandes, utilice un límite menor y pagine con `cursor`. |
| cursor | string | Enumere los siguientes resultados con un cursor proporcionado en la consulta anterior. |

### SearchedSpanResource {#searchedspanresource}

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| type        | string                        | Tipo del tramo. Valores permitidos: tramo. Predeterminado: tramo. |
| id       | string                        | ID único del tramo. |
| attributes  | [SearchedSpan](#searchedspan) | Objeto que contiene todos los atributos del tramo y sus valores asociados.  |

### SearchedSpan {#searchedspan}

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| span_id        | string                        | Un ID único para el tramo. |
| trace_id        | string                        | Un ID único compartido por todos los tramos en la misma traza. |
| parent_id        | string                        | ID del padre directo del tramo. |
| tags        | [string]                        | Matriz de etiquetas asociadas con su tramo. |
| name        | string                       | El nombre del tramo. |
| status        | string                       | Estado de error ("ok" o "error"). |
| start_ns        | integer                       | La hora de inicio del tramo en nanosegundos. |
| duración        | float                       | La duración del tramo en nanosegundos. |
| ml_app        | string                       | El nombre de la aplicación LLM del tramo. |
| metadata        | Dict[key (string), any]                       | Datos sobre el tramo que no están relacionados con la entrada o salida. |
| span_kind        | string                       | El tipo de tramo: "agent", "workflow", "llm", "tool", "task", "embedding" o "retrieval". |
| model_name        | string                       | El nombre del modelo utilizado en la solicitud. Solo aplicable a tramos de LLM. |
| model_provider        | string                       | El proveedor del modelo utilizado en la solicitud. Solo aplicable a tramos de LLM. |
| input        | [SearchedIO](#searchedio)                      | La información de entrada del tramo. |
| output        | [SearchedIO](#searchedio)                       | La información de salida del tramo. |
| tool_definitions        | [[ToolDefinition](#tooldefinition)]                       | Lista de herramientas disponibles en una solicitud de LLM. |
| metrics        | Dict[key (string), float]                      | Métricas de Datadog para recopilar. |
| evaluation        | Dict[key (string), [SpanEvalMetric](#spanevalmetric)]                      | Un mapa de evaluaciones asociadas con el tramo. |
| intent        | string                       | La intención de una llamada de herramienta MCP. |

### SearchedIO {#searchedio}

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| value        | string                        | Valor de entrada o salida. |
| messages        | [[Message](#message)]                        | Lista de mensajes. Esto solo es relevante para tramos de LLM. |

### Mensaje {#message}

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| content        | string                        | El cuerpo del mensaje. |
| role        | string                        | El rol de la entidad. |
| tool_calls        | [[ToolCall](#toolcall)]                     | Lista de llamadas de herramienta realizadas en este mensaje. |
| tool_results        | [[ToolResults](#toolresult)]                     | Lista de resultados de ejecución de herramientas en este mensaje. |

### ToolCall {#toolcall}

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| name        | string                        | El nombre de la herramienta que se está llamando. |
| arguments        | Dict[key (string), any]                         | Los argumentos pasados a la herramienta. |
| tool_id        | string                        | Identificador único para esta llamada de herramienta. |
| type        | string                        | El tipo de llamada de herramienta. |

### ToolResult {#toolresult}

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| name        | string                        | El nombre de la herramienta que fue llamada. |
| result        | string                        | El resultado devuelto por la herramienta. |
| tool_id        | string                        | Identificador único que coincide con la llamada de herramienta correspondiente. |
| type        | string                        | El tipo de resultado de la herramienta. |

### ToolDefinition {#tooldefinition}

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| name        | string                        | El nombre de la herramienta. |
| description        | string                       | La descripción de la función de la herramienta. |
| schema        | Dict[key (string), any]                       | Datos sobre los argumentos que acepta una herramienta. |

### SpanEvalMetric {#spanevalmetric}

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| eval_metric_type        | string                        | El tipo de métrica de evaluación. Los valores válidos son `categorical`, `score`, `boolean` y `json`.  |
| value        | any                       | El resultado de la evaluación. Puede ser una cadena, un número de punto flotante, un booleano o un valor JSON. |
| reasoning        | string                       | Razonamiento para el resultado de la evaluación. |
| assessment        | string                       | Si la evaluación fue aprobada o fallida. Los valores válidos son `pass` y `fail`. |
| status        | string                       | El estado de la ejecución de la evaluación. Los valores válidos son `OK`, `WARN` y `ERROR`. |
| error        | [EvalMetricError](#evalmetricerror)                       | Información sobre el error que ocurrió al ejecutar la evaluación (si hubo alguno). |
| tags        | [string]                       | Pares clave-valor asociados con la métrica de evaluación. |
| action        | string                       | La acción tomada en respuesta al resultado de la evaluación para las evaluaciones enviadas por el usuario. |
| eval_metric_metadata        | Dict[key (string), any]                        | Datos JSON arbitrarios asociados con la evaluación. |
| llm_output        | string                       | La salida sin procesar de la llamada al LLM utilizada para determinar el resultado de la evaluación. |

### EvalMetricError {#evalmetricerror}

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| message        | string                        | Una descripción del error. Esto puede incluir razones por las que se omitió la evaluación o un mensaje de error generado durante la ejecución de la evaluación. |
| stack        | string                        | La traza de pila asociada con el error de evaluación. |
| type        | string                        | La categoría del error. Uno de un conjunto fijo de razones que indican por qué se omitió o falló la evaluación. |
| recommended_resolution        | string                        | Los pasos necesarios para resolver el error. |

### Meta {#meta}

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| elapsed        | integer                        | El tiempo transcurrido en milisegundos. |
| page        | [Page](#page)                        | Atributos de paginación. |
| request_id        | string                       | El identificador de la solicitud. |
| status        | string                       | El estado de la respuesta. Valores permitidos: done,timeout |

### Page {#page}

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| after        | string                        | El cursor que se debe usar para obtener los siguientes resultados, si los hay. Para realizar la siguiente solicitud, use los mismos parámetros con la adición del campo `page[cursor]`. |

### Enlaces {#links}

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| next        | string                        | Enlace para el siguiente conjunto de resultados. Consulte [Pagination][1]. |




[1]: https://jsonapi.org/format/#fetching-pagination