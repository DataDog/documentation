---
aliases:
- /es/llm_observability/monitoring/querying/
description: Aprenda a consultar tramos y trazas de Agent Observability en el Trace
  Explorer, incluyendo cómo buscar por atributo, etiquetas y propiedades a nivel de
  traza.
further_reading:
- link: tracing/trace_explorer/query_syntax/
  tag: Documentación
  text: Sintaxis de consulta del Trace Explorer
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: Centro de aprendizaje
  text: Investigue con Agent Observability
title: Consulta de tramos y trazas
---
## Descripción general {#overview}
Esta página trata sobre el uso del [Agent Observability Trace Explorer][1] de Datadog para consultar los tramos y trazas de su aplicación de LLM.

#### Consultar entre tramos y trazas {#querying-across-spans-versus-traces}
En Agent Observability, un _tramo_ representa una unidad de trabajo que representa una sola operación en su aplicación de LLM. Un _traza_ representa las operaciones de extremo a extremo involucradas en el procesamiento de una solicitud en su aplicación de LLM, que a menudo consiste en uno o más tramos anidados. Para obtener más información sobre esta terminología, consulte [Términos y conceptos de Agent Observability][2].

En el [Agent Observability Trace Explorer][1], elija si desea buscar entre trazas o tramos:
- Seleccione {{< ui >}}Traces{{< /ui >}} para encontrar trazas donde el tramo raíz coincida con su consulta.
- Seleccione {{< ui >}}Spans{{< /ui >}} para buscar entre todos sus tramos, incluidos los tramos anidados.

Algunos términos de búsqueda solo son aplicables a las trazas. Para ver ejemplos, consulte [Consultas a nivel de traza](#trace-level-queries).

### Consultar por atributo {#query-by-attribute}
_Los atributos de tramo_ son pares clave-valor adjuntos directamente a cada tramo. Los atributos capturan detalles sobre la ejecución del tramo, como métricas de rendimiento, identificadores de recursos o valores de parámetros.

Las consultas de atributos tienen la forma `@key:value`. Todas las claves de atributo tienen el prefijo `@`.

| Consultar | Coincidir |
| ----- | ----- |
| `@duration:>5s` | Tramos que tardaron más de 5 segundos en completarse |

### Consultar por etiqueta {#query-by-tag}
_Las etiquetas de tramo_ son pares clave-valor que se utilizan para agrupar, segmentar y correlacionar datos de telemetría entre tramos, servicios o entornos. Las etiquetas a menudo indican un contexto más amplio, como el nombre de la aplicación, el entorno o la región de implementación, y se adjuntan a los tramos para facilitar la búsqueda y agregación eficientes.

Las consultas de etiquetas tienen la forma `key:value`. A diferencia de las claves de atributo, las claves de etiqueta no tienen el prefijo `@`.

| Consultar | Coincidir |
| ----- | ----- |
| `ml_app:my_llm_app` | Tramos de una aplicación llamada `my_llm_app` |

### Consultar entrada y salida de LLM {#query-llm-input-and-output}
También puede usar consultas de texto libre para buscar palabras clave, frases o cadenas específicas en cualquier tramo que tenga un par de entrada o salida. Para usar la búsqueda de texto libre, encierre su consulta entre `"`.

| Consultar | Coincidir |
| ----- | ----- |
| `"what's the weather"` | Tramos de agente, flujo de trabajo o LLM que contienen la cadena `what's the weather` en la entrada o salida |

<div class="alert alert-info">Las consultas de texto libre están limitadas a los primeros 20,500 caracteres de la entrada o salida de un tramo.</div>

### Operadores {#operators}

Puede combinar varios términos de búsqueda usando los operadores booleanos `AND` (intersección), `OR` (unión) y `-` (exclusión).

| Consultar | Coincidir |
| ----- | ----- |
| `@duration:>5s AND -"foo"` | Tramos que tardaron más de 5 segundos en completarse y **no** contienen la cadena `foo` en la entrada o salida |

### Sintaxis de consulta {#query-syntax}

Agent Observability Trace Explorer comparte la misma sintaxis de consulta que el [APM Trace Explorer][6] de Datadog. Para obtener detalles sobre la sintaxis de consulta, incluida la búsqueda con comodines, el manejo de valores numéricos, el escape de caracteres especiales y más, consulte [Trace Explorer Query Syntax][6].

## Ejemplos de consultas {#example-queries}

| Consultar | Coincidir |
| ----- | ----- |
| `@status:error` | Tramos o trazas que tienen un estado de `error` |
| `@meta.error.type:"Max turns exceeded"` | Tramos o trazas que tienen el tipo de error `Max turns exceeded` |
| `@duration:>5s` | Tramos o trazas que tardaron más de 5 segundos en completarse |
| `@trace.total_tokens:>=1000` | Trazas que consumieron 1000 o más tokens en total |
| `ml_app:my_llm_app` | Tramos o trazas de una aplicación llamada `my_llm_app` |
| `"what's the weather"` | Tramos de agente, flujo de trabajo o LLM que contienen la cadena `what's the weather` en la entrada o salida |

### Consultas de evaluaciones {#evaluation-queries}

Utilice el atributo `@evaluation` para encontrar tramos o trazas por resultado de [evaluación][3].

#### Evaluaciones {#evaluations}
Puede buscar tramos por los resultados de [evaluaciones][4]. Por ejemplo, si tiene una evaluación llamada `user_mood` con valores categóricos `happy`, `sad` y `tired`, podría usar la consulta: `@evaluation.user_mood.value:happy`.

| Consultar | Coincidir |
| ----- | ----- |
| `@evaluation.user_satisfaction.value:>5` | Tramos o trazas que obtuvieron una puntuación superior a 5 según una evaluación llamada `user_satisfaction` |
| `@evaluation.user_mood.value:happy` | Tramos o trazas que fueron evaluados como `happy` según una evaluación llamada `user_mood` que tiene los valores categóricos `happy`, `sad` y `tired` |

### Consultas de retroalimentación {#feedback-queries}

Utilice el atributo `@feedback` para encontrar tramos o trazas mediante envíos de [retroalimentación del usuario final][8]. Por ejemplo, si sus usuarios envían retroalimentación bajo la etiqueta `user_satisfaction` con valores categóricos `thumbs_up` o `thumbs_down`, podría utilizar la consulta: `@feedback.user_satisfaction.value:thumbs_down`.

| Consultar | Coincidir |
| ----- | ----- |
| `@feedback.user_satisfaction.value:thumbs_down` | Tramos o trazas que recibieron una calificación de pulgar hacia abajo para una etiqueta de retroalimentación llamada `user_satisfaction` |
| `@feedback.user_comment.assessment:fail` | Tramos o trazas con una evaluación fallida para una etiqueta de retroalimentación llamada `user_comment` |
| `@feedback.user_score.value:<2` | Tramos o trazas con una puntuación menor a 2 para una etiqueta de retroalimentación llamada `user_score` |

### Consultas de metadatos {#metadata-queries}

Utilice el atributo `@meta` para encontrar tramos mediante información de metadatos.

| Consultar | Coincidir |
| ----- | ----- |
| `@meta.span.kind:llm` | Tramos del `llm` [_tipo de tramo_][5]. |
| `@meta.model_provider:openai` | Tramos o trazas donde el proveedor del modelo es OpenAI |
| `@meta.model_name:gpt-4.1` | Tramos o trazas donde el modelo es GPT-4.1 |

#### Metadatos personalizados {#custom-metadata}

Puede consultar tramos y trazas mediante [campos de metadatos personalizados][7] adjuntos durante la instrumentación. Los campos de metadatos personalizados son accesibles en `@meta.metadata.<key>`.

| Consultar | Coincidir |
| ----- | ----- |
| `@meta.metadata.config.debug_mode:false` | Tramos o trazas con el campo de metadatos personalizado `config.debug_mode` establecido en `false` |
| `@meta.metadata.job_id:job_14fb81c3` | Tramos o trazas con el campo de metadatos personalizado `job_id` establecido en `job_14fb81c3` |

### Consultas a nivel de traza {#trace-level-queries}

Para buscar trazas basadas en atributos de sus tramos anidados, utilice el atributo `@child`.

| Consultar | Coincidir |
| ----- | ----- |
| `@child.@evaluation.hallucination.value:"hallucination found"` | Trazas con un subtramo que alucina |
| `@child.@meta.span.kind:retrieval AND @meta.span.kind:workflow`| Trazas de flujo de trabajo que contienen un tramo de recuperación |

Utilice el atributo `@trace` para acceder a información a nivel de traza, como el costo total estimado, el número de llamadas a LLM o el número de herramientas.

| Consultar | Coincidir |
| ----- | ----- |
| `@trace.llm_calls:>3` | Trazas con más de 3 llamadas a LLM |
| `@trace.tool_calls:>=4` | Trazas con 4 o más llamadas a herramientas |
| `@trace.number_of_tools:<5` | Trazas que llaman a menos de 5 herramientas diferentes |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /es/llm_observability/quickstart/terms/
[3]: /es/llm_observability/investigate/evaluations/
[4]: /es/llm_observability/investigate/evaluations/external_evaluations
[5]: /es/llm_observability/quickstart/terms/#span-kinds
[6]: /es/tracing/trace_explorer/query_syntax/
[7]: /es/llm_observability/instrument/sdk/#annotating-metadata
[8]: /es/llm_observability/investigate/evaluations/end_user_feedback