---
description: Utilice el seguimiento de prompts para rastrear sus plantillas de prompts
  y sus versiones.
further_reading:
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Rastree, compare y optimice sus prompts de LLM con Datadog LLM Observability
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: Centro de aprendizaje
  text: Investigue con LLM Observability
title: Seguimiento de prompts
---
## Descripción general {#overview}

El seguimiento de prompts vincula las plantillas y versiones de prompts con las llamadas de LLM. El seguimiento de prompts funciona junto con las trazas, tramos y Playground de Agent Observability, así como con [Prompt Management][8], que proporciona un registro centralizado para crear y versionar prompts.

El seguimiento de prompts le permite:
- Ver todos los prompts utilizados por su aplicación o agente de LLM, con el volumen de llamadas y la latencia a lo largo del tiempo
- Comparar prompts o versiones por llamadas, latencia, tokens utilizados y costo
- Ver información detallada sobre un prompt: revisar su historial de versiones, ver una diferencia de texto y saltar a las trazas utilizando una versión específica
- Filtrar [Trace Explorer][1] por nombre, ID o versión de prompt para aislar las solicitudes afectadas
- Reproducir una ejecución completando [Agent Observability Playground][2] con la plantilla y las variables de plantilla exactas de cualquier tramo

{{< img src="llm_observability/monitoring/llm-prompt-tracking-hero.png" alt="Vista de prompts para una aplicación en Agent Observability." style="width:100%;" >}}

## Configurar el seguimiento de prompts {#set-up-prompt-tracking}

Cuando Agent Observability está habilitado, los prompts obtenidos del registro de [Prompt Management][8] con `LLMObs.get_prompt()` se rastrean automáticamente si el valor devuelto por `prompt.format()` se pasa directamente a una llamada de LLM compatible e instrumentada automáticamente. Si el valor formateado se copia o transforma, utilice `LLMObs.annotation_context()` como se describe en la documentación de Prompt Management. Las siguientes opciones de configuración se aplican a los prompts definidos fuera del registro.

### Con metadatos de prompt estructurados {#with-structured-prompt-metadata}
Para usar el Seguimiento de Prompts, puede enviar metadatos de prompt estructurados (ID, versión opcional, plantilla, variables de plantilla).

#### SDK de Python para Agent Observability {#agent-observability-python-sdk}
Si utiliza el SDK de Python para Agent Observability (`dd-trace` v3.16.0+), adjunte los metadatos del prompt al tramo de LLM usando el argumento o asistente `prompt`. Consulte la [documentación del SDK de Python para Agent Observability][3].

#### SDK de Node.js para Agent Observability {#agent-observability-nodejs-sdk}
Si utiliza el SDK de Node.js para Agent Observability (`dd-trace` v5.83.0+), adjunte los metadatos del prompt al tramo de LLM usando la opción `prompt`. Consulte la [documentación del SDK de Node.js para Agent Observability][6].

#### API de Agent Observability {#agent-observability-api}
Si utiliza la ingesta de la API de Agent Observability, envíe los metadatos del prompt al endpoint de la API de Tramos. Consulte la [documentación de referencia de la Agent Observability HTTP API][4].

#### Instrumentación de OpenTelemetry {#opentelemetry-instrumentation}
Si utiliza [instrumentación de OpenTelemetry][7], puede adjuntar metadatos de prompt a sus tramos de LLM configurando el atributo `_dd.ml_obs.prompt_tracking` con una cadena JSON que contenga la información de su prompt.

Configure el atributo en cualquier tramo de LLM:

{{< tabs >}}
{{% tab "Python" %}}

```python
import json

span.set_attribute("_dd.ml_obs.prompt_tracking", json.dumps({
    "name": "greeting-prompt",
    "version": "v1",
    "template": "Hello {{name}}, tell me about {{topic}}",
    "variables": {"name": "Alice", "topic": "weather"}
}))
```
{{% /tab %}}
{{% tab "JavaScript" %}}

```javascript
span.setAttribute("_dd.ml_obs.prompt_tracking", JSON.stringify({
    name: "greeting-prompt",
    version: "v1",
    template: "Hello {{name}}, tell me about {{topic}}",
    variables: { name: "Alice", topic: "weather" }
}));
```
{{% /tab %}}
{{% tab "Go" %}}

```go
span.SetAttributes(attribute.String("_dd.ml_obs.prompt_tracking",
    `{"name":"greeting-prompt","version":"v1","template":"Hello {{name}}, tell me about {{topic}}","variables":{"name":"Alice","topic":"weather"}}`,
))
```
{{% /tab %}}
{{< /tabs >}}

Los siguientes campos son compatibles en el JSON de seguimiento de prompts:

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|----------|-------------|
| `template` | cadena | Sí (o `chat_template`) | Cadena de plantilla para prompts de un solo mensaje |
| `chat_template` | matriz | Sí (o `template`) | Lista de `{"role": "...", "content": "..."}` plantillas de mensaje |
| `id` | cadena | No | Identificador único para el prompt. El valor predeterminado es `{ml_app}_unnamed-prompt` si se omite |
| `name` | cadena | No | Nombre del prompt. Se utiliza como alternativa para `id` si se omite `id` |
| `version` | cadena | No | Etiqueta de versión proporcionada por el usuario |
| `variables` | objeto | No | Sustituciones de variables de plantilla |
| `rag_context_variables` | matriz de cadenas | No | Nombres de variables en `variables` que contienen contexto RAG (verdad fundamental). Utilizado por evaluadores de RAG |
| `rag_query_variables` | matriz de cadenas | No | Nombres de variables en `variables` que contienen la consulta del usuario. Utilizado por evaluadores de RAG |

<div class="alert alert-info">Si utiliza plantillas de prompt, Agent Observability puede adjuntar automáticamente información de versión basada en el contenido del prompt.</div>

### Con plantillas de LangChain {#with-langchain-templates}
Si utiliza plantillas de prompt de LangChain, Datadog captura automáticamente los metadatos del prompt sin cambios en el código. Los ID se derivan de los nombres de los módulos o plantillas. Para anular estos ID, consulte [Agent Observability Auto-instrumentation: LangChain][5].

## Utilice el seguimiento de prompts en Agent Observability {#use-prompt-tracking-in-agent-observability}

Vea su aplicación en Agent Observability y seleccione {{< ui >}}Prompts{{< /ui >}} a la izquierda. La _vista de Prompts_ presenta la siguiente información:

- {{< ui >}}Prompt Call Count{{< /ui >}}: Un gráfico de series temporales que muestra las llamadas por prompt (o por versión) a lo largo del tiempo
- {{< ui >}}Recent Prompt Updates{{< /ui >}}: Información sobre actualizaciones recientes de prompts, incluyendo la hora de la última actualización, el número de llamadas, la latencia promedio y el promedio de tokens por llamada
- {{< ui >}}Most Tokens Used{{< /ui >}}: Prompts clasificados por el total de tokens (de entrada o salida)
- {{< ui >}}Highest Latency Prompts{{< /ui >}}: Prompts clasificados por duración promedio

{{< img src="llm_observability/monitoring/prompt_details.png" alt="Vista detallada de un solo prompt." style="width:100%;" >}}

Haga clic en un prompt para abrir una vista de panel lateral detallada que presenta información sobre la actividad de la versión y varias métricas. También puede ver una vista diff de dos versiones, abrir Trace Explorer prefiltrado a los tramos que utilizan una versión seleccionada, o iniciar una sesión de Playground precargada con la plantilla y las variables de plantilla de la versión seleccionada.

{{< img src="llm_observability/monitoring/prompt_tracking_trace_explorer3.png" alt="Vista de prompts para una aplicación en Agent Observability." style="width:100%;" >}}

Puede utilizar Trace Explorer de Agent Observability para localizar solicitudes por uso de prompts. Puede utilizar el nombre, el ID y la versión de un prompt como facetas para la búsqueda a nivel de traza y a nivel de tramo. Haga clic en cualquier tramo de LLM para ver el prompt que lo generó.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: https://app.datadoghq.com/llm/playground
[3]: /es/llm_observability/instrumentation/sdk/?tab=python#prompt-tracking
[4]: /es/llm_observability/instrumentation/api/?tab=model#prompt
[5]: /es/llm_observability/instrumentation/auto_instrumentation?tab=python#langchain
[6]: /es/llm_observability/instrumentation/sdk/?tab=nodejs#prompt-tracking
[7]: /es/llm_observability/instrumentation/otel_instrumentation
[8]: /es/llm_observability/monitoring/prompt_management