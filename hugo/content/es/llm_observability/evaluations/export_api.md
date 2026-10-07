---
title: API de exportación
---

## Información general

La API de exportación de LLM Observability proporciona endpoints para recuperar datos de tramos (spans). Estos endpoints te permiten acceder mediante programación a tus datos de LLM Observability para ejecutar evaluaciones externas y exportar tramos para su almacenamiento sin conexión.

<div class="alert alert-info">Por defecto, exportamos tramos de los últimos 15 minutos. Si necesitas buscar fuera de este intervalo de tiempo, especifica un intervalo de tiempo en tu solicitud.</div>

## Buscar tramos

Utiliza este endpoint para buscar y filtrar tramos de LLM Observability utilizando criterios específicos.

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/llm-obs/v1/spans/events/search`

Método
: `POST`

### Solicitud

#### Encabezados (obligatorios)
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `DD-APPLICATION-KEY=<YOUR_DATADOG_APPLICATION_KEY>`
- `Content-Type="application/vnd.api+json"`

#### Datos del cuerpo de texto (obligatorios)

{{< tabs >}}
{{% tab "Modelo" %}}
| Campo | Tipo | Descripción |
|-------|------------------------------|------|
| data[required] | [SearchSpansRequest](#searchspansrequest) | Punto de entrada al cuerpo de la solicitud. |
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

#### Ejemplo de código

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

## Lista de tramos

Utiliza este endpoint para recuperar una lista de tramos de LLM Observability.

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/llm-obs/v1/spans/events`

Método
: `GET`

### Solicitud

#### Encabezados (obligatorios)
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `DD-APPLICATION-KEY=<YOUR_DATADOG_APPLICATION_KEY>`

#### Parámetros de consulta

| Parámetro | Tipo | Descripción                  |
|-------|------------------------------|------|
| filter[query] | cadena | Busca tramos utilizando la sintaxis genérica de consulta EVP. Si no se proporciona ningún filtro de consulta, los demás filtros tienen prioridad. |
| filter[span_id] | cadena | Busca un tramo específico por su ID de tramo. |
| filter[trace_id] | cadena | Busca tramos por su ID de traza (trace). |
| filter[tag][key] | cadena | Busca tramos por pares clave/valor de etiqueta (tag). |
| filter[span_kind] | cadena | Tipo de tramo: "agent", "workflow", "llm", "tool", "task", "embedding" o "retrieval". |
| filter[span_name] | cadena | Busca tramos basándose en el nombre proporcionado. |
| filter[ml_app] | cadena | Busca tramos enviados mediante una aplicación ML específica. |
| filter[from] | cadena | Marca de tiempo mínima de los tramos solicitados. Admite fecha-hora ISO8601, fecha matemática y marcas de tiempo frecuentes (milisegundos). Por defecto, es la hora actual menos 15 minutos. |
| filter[to] | cadena | Marca de tiempo máxima de los tramos solicitados. Admite fecha-hora ISO8601, fecha matemática y marcas de tiempo frecuentes (milisegundos). Por defecto, es la hora actual. |
| sort | cadena | Orden de clasificación. Valores permitidos: timestamp, -timestamp. |
| page[cursor] | cadena | Lista de los siguientes resultados con un cursor proporcionado en la consulta anterior. |
| page[limit] | entero | Número máximo de tramos en la respuesta. Por defecto: 10. Límite máximo configurable: 5000. |

#### Ejemplo de código

{{< tabs >}}
{{% tab "Curl" %}}
{{< code-block lang="bash" >}}
curl -G "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events" \
-H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
# Busca intervalos de los últimos 15 minutos.
--data-urlencode "filter[trace_id]=6903738200000000af2d3775dfc70530"
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Respuesta

Ambos endpoints tienen el mismo formato de respuesta. [Los resultados están paginados](/logs/guide/collect-multiple-logs-with-pagination/).

{{< tabs >}}
{{% tab "Modelo" %}}
| Campo | Tipo | Descripción                                       |
|---------|-----------------------------|------------------------------------------|
| data | [[SearchedSpanResource](#searchedspanresource)]             | Lista de tramos que coinciden con los criterios de búsqueda. |
| meta | [Meta](#meta) | Metadatos sobre la respuesta.             |
| links | [Links](#links) | Atributos de los enlaces.            |
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


## Normas de la API

### SearchSpansRequest

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| type [*obligatorio*]        | cadena                        | Identificador de la solicitud. Configurado como `spans`. |
| attributes [*obligatorio*]  | [SearchSpansPayload](#searchspanspayload) | El cuerpo de la solicitud.  |

### SearchSpansPayload

| Campo | Tipo | Descripción                  |
|-------|------------------------------|------|
| filter | [Filter](#filter) | Parámetros de las consultas de búsqueda y filtrado. |
| options | [Options](#options) | Opciones globales de consulta que se utilizan durante la consulta. |
| page | [PageQuery](#pagequery) | Atributos de paginación para el listado de tramos. |
| sort | cadena | Orden de clasificación. Valores permitidos: timestamp, -timestamp. |

### Filtro

| Campo | Tipo | Descripción |
|-------|------|-------------|
| query | cadena | Busca tramos utilizando la sintaxis genérica de consulta EVP. Si no se proporciona ningún filtro de consulta, los demás filtros tienen prioridad. |
| span_id | cadena | Busca un tramo específico por su ID de tramo. |
| trace_id | cadena | Busca tramos por su ID de traza. |
| tags | Dict[key (string), string] | Búsqueda de tramos por pares clave/valor de etiqueta. |
| span_kind | cadena | Tipo de tramo: "agent", "workflow", "llm", "tool", "task", "embedding" o "retrieval". |
| span_name | cadena | Busca tramos basándose en el nombre proporcionado. |
| ml_app | cadena | Busca tramos enviados mediante una aplicación ML específica. |
| from | cadena | Marca de tiempo mínima de los tramos solicitados. Admite fecha-hora ISO8601, fecha matemática y marcas de tiempo frecuentes (milisegundos). Por defecto, es la hora actual menos 15 minutos. |
| to | cadena | Marca de tiempo máxima de los tramos solicitados. Admite fecha-hora ISO8601, fecha matemática y marcas de tiempo frecuentes (milisegundos). Por defecto, es la hora actual. |

### Opciones

| Campo | Tipo | Descripción |
|-------|------|-------------|
| time_offset | entero | Desfase temporal (en segundos) para aplicar a la consulta. |

### PageQuery

| Campo | Tipo | Descripción |
|-------|------|-------------|
| limit | entero | Número máximo de tramos en la respuesta. Por defecto: 10. Límite máximo configurable: 5000. |
| cursor | cadena | Lista de los siguientes resultados con un cursor proporcionado en la consulta anterior. |

### SearchedSpanResource

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| tipo        | cadena                        | Tipo de tramo. Valores permitidos: span. Por defecto: span. |
| id       | cadena                        | ID único del tramo. |
| attributes  | [SearchedSpan](#searchedspan) | Objeto que contiene todos los atributos de tramos y sus valores asociados.  |

### SearchedSpan

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| span_id        | cadena                        | Un ID exclusivo de tramo. |
| trace_id        | cadena                        | Un identificador único compartido por todos los tramos de la misma traza. |
| parent_id        | cadena                        | ID del elemento principal directo del tramo. |
| tags        | [cadena]                        | Matriz de etiquetas asociadas a tu tramo. |
| nombre        | cadena                       | El nombre del tramo. |
| status        | cadena                       | Estado del error ("ok" o "error"). |
| start_ns        | entero                       | Hora de inicio del tramo en nanosegundos. |
| duration        | float                       | Duración del tramo en nanosegundos. |
| ml_app        | cadena                       | Nombre de la aplicación LLM del tramo. |
| metadata        | Dict[key (string), any]                       | Datos del tramo que no están relacionados con entradas o salidas. |
| span_kind        | cadena                       | Tipo de tramo: "agent", "workflow", "llm", "tool", "task", "embedding" o "retrieval". |
| model_name        | cadena                       | Nombre del modelo utilizado en la solicitud. Solo se aplica a tramos LLM. |
| model_provider        | cadena                       | Proveedor del modelo utilizado en la solicitud. Solo se aplica a tramos LLM. |
| input        | [SearchedIO](#searchedio)                      | Información de entrada del tramo. |
| output        | [SearchedIO](#searchedio)                       | Información de salida del tramo. |
| tool_definitions        | [[ToolDefinition](#tooldefinition)]                       | Lista de herramientas disponibles en una solicitud LLM. |
| métricas        | Dict[key (string), float]                      | Métricas de Datadog para recopilar. |
| evaluation        | Dict[key (string), [SpanEvalMetric](#spanevalmetric)]                      | Mapa de las evaluaciones asociadas al tramo. |

### SearchedIO

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| value        | cadena                        | Valor de entrada o salida. |
| messages        | [[Message](#message)]                        | Lista de mensajes. Solo es relevante para tramos LLM. |

### Mensaje

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| content        | cadena                        | El cuerpo del mensaje. |
| rol        | cadena                        | El rol de la entidad. |

### ToolDefinition

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| nombre        | cadena                        | Nombre de la herramienta. |
| descripción        | cadena                       | Descripción de la función de la herramienta. |
| esquema        | Dict[key (string), any]                       | Datos sobre los argumentos aceptados por una herramienta. |

### SpanEvalMetric

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| eval_metric_type        | cadena                        | Tipo de métrica de evaluación. Los valores válidos son `categorical`, `score`, `boolean` y `json`.  |
| value        | cualquier                       | Resultado de la evaluación. Puede ser un valor de cadena, flotante, booleano o JSON. |
| razonamiento        | cadena                       | Razonamiento del resultado de la evaluación. |
| evaluación        | cadena                       | Si la evaluación ha sido aprobada o no. Los valores válidos son `pass` y `fail`. |
| status        | cadena                       | Estado del proceso de evaluación. Los valores válidos son `OK`, `WARN` y `ERROR`. |
| error        | [EvalMetricError](#evalmetricerror)                       | Información sobre el error que se ha producido al ejecutar la evaluación (si se ha producido). |
| tags        | [cadena]                       | Pares clave-valor asociados a la métrica de evaluación. |
| acción        | cadena                       | Acción tomada en respuesta al resultado de la evaluación para las evaluaciones enviadas por el usuario. |
| eval_metric_metadata        | Dict[key (string), any]                        | Datos JSON arbitrarios asociados a la evaluación. |
| llm_output        | cadena                       | Salida sin procesar de la llamada LLM utilizada para determinar el resultado de la evaluación. |

### EvalMetricError

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| mensaje        | cadena                        | Descripción del error. Puede incluir las razones por las que se omitió la evaluación o un mensaje de error generado durante la ejecución de la evaluación. |
| stack        | cadena                        | Traza de stack tecnológico asociada al error de evaluación. |
| tipo        | cadena                        | Categoría del error. Una de un conjunto fijo de razones que indican por qué se ha omitido o ha fallado la evaluación. |
| recommended_resolution        | cadena                        | Pasos necesarios para resolver el error. |

### Meta

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| elapsed        | entero                        | Tiempo transcurrido en milisegundos. |
| page        | [Page](#page)                        | Atributos de paginación. |
| request_id        | cadena                       | Identificador de la solicitud. |
| status        | cadena                       | Estado de la respuesta. Valores permitidos: done, timeout. |

### Page

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| after        | cadena                        | El cursor a utilizar para obtener los resultados siguientes, si los hay. Para realizar la solicitud siguiente, utiliza los mismos parámetros añadiendo el campo `page[cursor]`. |

### Enlaces

| Campo      | Tipo                          | Descripción                                |
|------------|-------------------------------|--------------------------------------------|
| next        | cadena                        | Enlace al siguiente grupo de resultados. Consulta [Paginación][1]. |




[1]: https://jsonapi.org/format/#fetching-pagination