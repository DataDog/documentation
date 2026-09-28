---
aliases:
- /es/llm_observability/monitoring/metrics/
description: Obtenga información sobre las métricas útiles que puede generar a partir
  de los datos de Agent Observability.
further_reading:
- link: llm_observability/
  tag: Documentación
  text: Obtenga más información sobre Agent Observability
- link: monitors/
  tag: Documentación
  text: Cree y administre monitores para notificar a sus equipos cuando sea importante.
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Realice un seguimiento, compare y optimice sus prompts de LLM con Datadog
    LLM Observability
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: Centro de aprendizaje
  text: Investigue con LLM Observability
title: Métricas de Agent Observability
---
Después de instrumentar su aplicación con Agent Observability, puede acceder a las métricas de Agent Observability para su uso en dashboards y monitores. Estas métricas capturan recuentos de tramos, recuentos de errores, uso de tokens y medidas de latencia para sus aplicaciones LLM. Estas métricas se calculan en función del 100% del tráfico de la aplicación.

<div class="alert alert-info">
El <code>ml_obs.*</code> Las entradas en esta página son <a href="/metrics/">Métricas de Datadog</a>: valores numéricos que describen un aspecto de su aplicación LLM a lo largo del tiempo, derivados de sus tramos de LLM (recuentos, distribuciones de costo, tokens, latencia, errores). Están muestreadas al 100%, siguen la <a href="/developers/guide/data-collection-resolution-retention/">retención de métricas de Datadog</a> estándar (15 meses con granularidad completa) y se pueden consultar desde dashboards, monitores y notebooks como cualquier otra métrica de Datadog.
<br><br>
Son distintos de otras dos cosas en Agent Observability:
<ul>
<li><strong>Datos operativos por tramo</strong> (costo, tokens, latencia, errores en cada traza o tramo individual): los valores sin procesar que estas métricas consolidan. Se almacenan con los tramos, siguen la <a href="/llm_observability/setup/#data-retention">retención de trazas de Agent Observability</a> y se consultan desde el explorador de trazas en lugar de como métricas.</li>
<li><strong><a href="/llm_observability/investigate/evaluations/">Puntuaciones de evaluación</a></strong> (también llamadas "evals"): juicios de calidad y seguridad (por ejemplo, alucinación, fidelidad, LLM-as-a-judge personalizado) adjuntos a tramos individuales o filas de experimentos. Estos no se derivan de la telemetría operativa y siguen la retención de trazas y experimentos de Agent Observability en lugar de la retención de métricas de Datadog.</li>
</ul>
</div>

<div class="alert alert-info">Otras etiquetas establecidas en los tramos no están disponibles como etiquetas en las métricas de Agent Observability.</div>

### Métricas de tramos {#span-metrics}

| Nombre de la métrica | Descripción | Tipo de métrica | Etiquetas |
|-------------|-------------|-------------|------|
| `ml_obs.span` | Número total de tramos con un tipo de tramo | Recuento | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |
| `ml_obs.span.duration` | Duración total de los tramos en segundos | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |
| `ml_obs.span.error` | Número de errores que ocurrieron en el tramo | Recuento | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |

### Métricas de tokens de LLM {#llm-token-metrics}

| Nombre de la métrica | Descripción | Tipo de métrica | Etiquetas |
|-------------|-------------|-------------|------|
| `ml_obs.span.llm.input.tokens` | Número de tokens en la entrada enviada al LLM | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.tokens` | Número de tokens en la salida | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.reasoning.tokens` | Número de tokens de razonamiento en la salida | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.prompt.tokens` | Número de tokens utilizados en el prompt | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.completion.tokens` | Tokens generados como finalización durante el tramo | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.total.tokens` | Total de tokens consumidos durante el tramo (entrada + salida + prompt) | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.cache_write.tokens` | Número de tokens de entrada escritos en la caché de prompts en un tramo de LLM | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.cache_read.tokens` | Número de tokens de entrada servidos desde la caché de prompts en un tramo de LLM | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.non_cached.tokens` | Número de tokens de entrada que no interactuaron con la caché de prompts en un tramo de LLM | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.characters` | Número de caracteres en la entrada enviada al LLM | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.characters` | Número de caracteres en la salida | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |

### Métricas de incrustación {#embedding-metrics}

| Nombre de la métrica | Descripción | Tipo de métrica | Etiquetas |
|-------------|-------------|-------------|------|
| `ml_obs.span.embedding.input.tokens` | Número de tokens de entrada utilizados para generar una incrustación | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |

### Métricas de costo de LLM {#llm-cost-metrics}

<div class="alert alert-info">
La unidad para las métricas de costo estimado de Agent Observability es <strong>nanodólares</strong>.
</div>

| Nombre de la métrica | Descripción | Tipo de métrica | Etiquetas |
|-------------|-------------|-------------|------|
| `ml_obs.span.llm.input.cost` | Costo estimado de entrada en un tramo de LLM | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.embedding.input.cost` | Costo estimado de entrada en un tramo de incrustación | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.reasoning.cost` | Costo estimado de salida de razonamiento en un tramo de LLM | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.cost` | Costo estimado de salida en un tramo de LLM | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.total.cost` | Costo total estimado en un tramo de LLM o de incrustación | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.cache_write.cost` | Costo estimado de entrada de escritura en caché en un tramo de LLM | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.cache_read.cost` | Costo estimado de entrada de lectura de caché en un tramo de LLM | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.non_cached.cost` | Costo estimado de entrada sin caché en un tramo de LLM | Distribución | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |

### Métricas de traza {#trace-metrics}

| Nombre de la métrica | Descripción | Tipo de métrica | Etiquetas |
|-------------|-------------|-------------|------|
| `ml_obs.trace` | Cantidad de trazas | Recuento | `env`, `error`, `ml_app`, `service`, `span_kind`, `version` |
| `ml_obs.trace.duration` | Duración total de todas las trazas en todos los tramos | Distribución | `env`, `error`, `ml_app`, `service`, `span_kind`, `version` |
| `ml_obs.trace.error` | Cantidad de errores que ocurrieron durante la traza | Recuento | `env`, `error`, `ml_app`, `service`, `span_kind`, `version` |

### Métricas de uso estimado {#estimated-usage-metrics}

| Nombre de la métrica | Descripción | Tipo de métrica | Etiquetas |
|-------------|-------------|-------------|------|
| `ml_obs.estimated_usage.llm.input.tokens` | Número estimado de tokens de entrada usados | Distribución | `evaluation_name`, `ml_app`, `model_name`, `model_provider`, `model_server` |

### Métricas obsoletas {#deprecated-metrics}

<div class="alert alert-warning">
Las siguientes métricas están obsoletas y se mantienen solo por compatibilidad con versiones anteriores. Datadog recomienda encarecidamente utilizar métricas de tokens que no estén obsoletas para todos los casos de uso de medición de consumo de tokens.
</div>

| Nombre de la métrica | Descripción | Tipo de métrica | Etiquetas |
|-------------|-------------|-------------|------|
| `ml_obs.estimated_usage.llm.output.tokens` | Número estimado de tokens de salida generados | Distribución | `evaluation_name`, `ml_app`, `model_name`, `model_provider`, `model_server` |
| `ml_obs.estimated_usage.llm.total.tokens` | Total de tokens estimados (entrada + salida) usados | Distribución | `evaluation_name`, `ml_app`, `model_name`, `model_provider`, `model_server` |

## Próximos pasos {#next-steps}

{{< whatsnext desc="Utilice sus métricas de Agent Observability:" >}}
    {{< nextlink href="dashboards/" >}}Cree un tablero para rastrear y correlacionar las métricas de Agent Observability{{< /nextlink >}}
    {{< nextlink href="monitors/create/" >}}Cree un monitor para alertas y notificaciones{{< /nextlink >}}
{{< /whatsnext >}}


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}