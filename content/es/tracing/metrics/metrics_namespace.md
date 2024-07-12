---
algolia:
  tags:
  - métricas de traza
aliases:
- /es/tracing/getting_further/metrics_namespace
- /es/tracing/guide/metrics_namespace
further_reading:
- link: tracing/trace_collection/
  tag: Documentación
  text: Aprender a configurar el rastreo de APM con tu aplicación
- link: tracing/service_catalog/
  tag: Documentación
  text: Descubrir y catalogar los servicios que informan a Datadog
- link: tracing/services/service_page
  tag: Documentación
  text: Más información sobre servicios en Datadog
- link: tracing/services/resource_page
  tag: Documentación
  text: Profundiza en el rendimiento de tus recursos y trazas
- link: tracing/trace_explorer/trace_view/
  tag: Documentación
  text: Comprender cómo leer una traza de Datadog
title: Métricas de trazas
---

## Información general

Las métricas de rastreo de aplicación se recopilan después de [activar la recopilación de traza e instrumentar tu aplicación][1].

{{< img src="tracing/apm_lifecycle/trace_metrics.png" style="width:70%; background:none; border:none; box-shadow:none;" alt="Métricas de traza" >}}

Estas métricas capturan recuentos de solicitud, error y medidas de latencia. Se calculan basándose en el 100% del tráfico de la aplicación, independientemente de cualquier configuración [de muestreo de ingesta de traza][2]. Asegúrate de tener una visibilidad completa del tráfico de tu aplicación con estas métricas para detectar posibles errores en un servicio o un recurso, y creando dashboards, monitores y SLOs.

**Nota**: Si tus aplicaciones y servicios están instrumentados con bibliotecas de OpenTelemetry y configuras el muestreo en el nivel del SDK o en el nivel del Collector, las métricas de APM se calculan basándose en el conjunto de datos muestreados.

Las métricas de traza se generan para los tramos de entrada del servicio y ciertas operaciones según el lenguaje de la integración. Por ejemplo, la integración de Django produce métricas de traza a partir de tramos que representan varias operaciones (1 tramo raíz para la solicitud de Django, 1 para cada middleware y 1 para la vista).

El espacio de nombre de las [métricas de traza][3] se formatea de esta manera:

- `trace.<SPAN_NAME>.<METRIC_SUFFIX>`

Con las siguientes definiciones:

`<SPAN_NAME>`
: el nombre de la operación o `span.name` (ejemplos: `redis.command`, `pylons.request`, `rails.request`, `mysql.query`).

`<METRIC_SUFFIX>`
: el nombre de la métrica (ejemplos: `hits`, `errors`, `apdex`, `duration`). Consulta la sección siguiente.

`<TAGS>`
: etiquetas de métricas de traza, las posibles etiquetas son: `env`, `service`, `version`, `resource`, `http.status_code`, `http.status_class` y etiquetas del Datadog Agent (incluyendo el host y la segunda etiqueta primaria). 
**Nota:** Otras etiquetas establecidas en tramos no están disponibles como etiquetas en métricas de trazas.

## Sufijo de métrica

### Resultados

`trace.<SPAN_NAME>.hits`
: **Requisito previo:** esta métrica existe para cualquier servicio de APM .<br>
**Descripción:** representa el recuento de tramos creados con un nombre específico (por ejemplo, `redis.command`, `pylons.request`, `rails.request`, o `mysql.query`).<br>
**Tipo de métrica:** [COUNT][5].<br>
**Etiquetas:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_code`, todas las etiquetas de host del Datadog host Agent y [la segunda etiqueta primaria][4].

`trace.<SPAN_NAME>.hits.by_http_status`
: **Requisito:** esta métrica existe para servicios HTTP/WEB de APM si existen metadatos http.<br>
**Descripción:** representa el recuento de resultados para un determinado tramo desglosado por código de estado de HTTP.<br>
**Tipo de métrica:** [COUNT][5].<br>
**Etiquetas:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_class`, `http.status_code`, todas las etiquetas de host del Datadog Host Agent y [la segunda etiqueta primaria][4].

### Distribución de la latencia

`trace.<SPAN_NAME>`
: **Requisito:** esta métrica existe para cualquier servicio de APM.<br>
**Descripción:** representa la distribución de latencia para todos los servicios, recursos y versiones a través de diferentes entornos y segundas etiquetas primarias.<br>
**Tipo de métrica:** [DISTRIBUTING][6].<br>
**Etiquetas:** `env`, `service`,`version`, `resource`, `resource_name`, `http.status_code`, `synthetics` y [la segunda etiqueta primaria][4].

### Errores

`trace.<SPAN_NAME>.errors`
: **Requisito:** esta métrica existe para cualquier APM servicio .<br>
**Descripción:** representa el recuento de errores para un determinado tramo (span).<br>
**Tipo de métrica:** [COUNT][5].<br>
**Etiquetas:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_code`, todos host etiquetas (tags) del Datadog host Agent , y [el segundo primario etiquetar][4].

`trace.<SPAN_NAME>.errors.by_http_status`
: **Requisito:** esta métrica existe para cualquier servicio de APM.<br>
**Descripción:** representa el recuento de errores para un determinado tramo.<br>
**Tipo de métrica:** [COUNT][5].<br>
**Etiquetas:** `env`, `service`, `version`, `resource`, `http.status_class`, `http.status_code`, todas las etiquetas de host del Datadog Host Agent , y [la segunda etiqueta primaria][4].

### Apdex

`trace.<SPAN_NAME>.apdex`
: **Requisito:** esta métrica existe para cualquier servicio HTTP o web de APM.<br>
**Descripción:** mide la puntuación [Apdex][10] de cada servicio web.<br>
** Tipo de métrica:** [GAUGE][7].<br>
**Etiquetas:** `env`, `service`, `version`, `resource`/`resource_name`, `synthetics` y [la segunda etiqueta primaria][4].

### Duración

<div class="alert alert-warning">Datadog recomienda <a href="/tracing/guide/ddsketch_trace_metrics/">rastrear las métricas de distribución utilizando DDSketch</a>.</div>

`trace.<SPAN_NAME>.duration`
: **Requisito:** esta métrica existe para cualquier servicio de APM.<br>
**Descripción:** mide el tiempo total para una colección de tramos dentro de un intervalo de tiempo, incluyendo los tramos secundarios vistos en el servicio de recopilación. Para la mayoría de los casos de uso, Datadog recomienda utilizar la [Distribución de latencia](#latency-distribution) para calcular la latencia media o los percentiles. Para calcular la latencia media con filtros de etiqueta de host, puedes utilizar esta métrica con la siguiente fórmula: <br>
`sum:trace.<SPAN_NAME>.duration{<FILTER>}.rollup(sum).fill(zero) / sum:trace.<SPAN_NAME>.hits{<FILTER>}` <br>
Este métrica no admite agregaciones de percentiles. Lee la sección [Distribución de latencia](#latency-distribution) para obtener más información.
**Tipo de métrica:** [GAUGE][7].<br>
**Etiquetas:** `env`, `service`, `resource`, `http.status_code`, todas las etiquetas de host del Datadog Host Agent , y [la segunda etiqueta primaria][4].

### Duración por

<div class="alert alert-warning">Datadog recomienda <a href="/tracing/guide/ddsketch_trace_metrics/">rastrear las métricas de distribución utilizando DDSketch</a>.</div>

`trace.<SPAN_NAME>.duration.by_http_status`
: **Requisito:** esta métrica existe para servicios HTTP/WEB de APM si existen metadatos http.<br>
**Descripción:** mide el tiempo total de un conjunto de tramos para cada estado HTTP. Específicamente, es la parte relativa del tiempo empleado por todos los tramos durante un intervalo y un estado HTTP dado; incluyendo el tiempo de espera en los procesos secundarios.<br>
**Tipo de métrica:** [GAUGE][7].<br>
**Etiquetas:** `env`, `service`, `resource`, `http.status_class`, `http.status_code`, todas las etiquetas del Datadog Host Agent y [la segunda etiqueta primaria][4].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/
[2]: /es/tracing/trace_pipeline/ingestion_mechanisms
[3]: /es/tracing/glossary/#trace-metrics
[4]: /es/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[5]: /es/metrics/types/?tab=count#metric-types
[6]: /es/metrics/types/?tab=distribution#metric-types
[7]: /es/metrics/types/?tab=gauge#metric-types
[8]: /es/tracing/service_catalog/#services-types
[9]: /es/tracing/glossary/#services
[10]: /es/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/