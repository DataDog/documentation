---
algolia:
  tags:
  - métricas de rastreo
aliases:
- /es/tracing/getting_further/metrics_namespace
- /es/tracing/guide/metrics_namespace
description: Guía completa de las métricas de trazas de APM, incluido el espacio de
  nombres, los tipos (aciertos, errores, latencia, Apdex) y cómo se calculan a partir
  del tráfico de la aplicación.
further_reading:
- link: tracing/trace_collection/
  tag: Documentación
  text: Aprender a configurar el rastreo de APM con tu aplicación
- link: tracing/software_catalog/
  tag: Documentación
  text: Descubrir y catalogar los servicios que informan a Datadog
- link: tracing/services/service_page
  tag: Documentación
  text: Más información sobre servicios en Datadog
- link: tracing/services/resource_page
  tag: Documentación
  text: Profundizar en el rendimiento de tus recursos y trazas (traces)
- link: tracing/trace_explorer/trace_view/
  tag: Documentación
  text: Comprender cómo leer una traza de Datadog
title: Métricas de rastreo
---

## Información general

Las métricas de aplicaciones de rastreo se recopilan después de [activar la recopilación de trazas e instrumentar tu aplicación][1].

{{< img src="tracing/apm_lifecycle/trace_metrics.png" style="width:70%; background:none; border:none; box-shadow:none;" alt="Métricas de rastreo" >}}

Estas métricas capturan recuentos de solicitud, error y medidas de latencia. Se calculan basándose en el 100% del tráfico de la aplicación, independientemente de cualquier configuración [de muestreo de ingesta de traza][2]. Asegúrate de tener una visibilidad completa del tráfico de tu aplicación con estas métricas para detectar posibles errores en un servicio o un recurso, y creando dashboards, monitores y SLOs.

**Nota**: Si tus aplicaciones se instrumentan con bibliotecas de OpenTelemetry y el muestreo está configurado a nivel de SDK, las métricas de APM se calculan en función del conjunto de datos muestreados. Sin embargo, si el muestreo se configura a nivel de OpenTelemetry Collector y el procesador del muestreador está aguas arriba del conector Datadog, las métricas APM se calculan basándose en el 100% del tráfico de la aplicación.

Las métricas de traza se generan para los tramos (spans) de entrada del servicio y ciertas operaciones según el lenguaje de la integración. Por ejemplo, la integración de Django produce métricas de traza a partir de tramos que representan varias operaciones (1 tramo raíz para la solicitud de Django, 1 para cada middleware y 1 para la vista).

El espacio de nombre de las [métricas de traza][3] se formatea de esta manera:

- `trace.<SPAN_NAME>.<METRIC_SUFFIX>`

Con las siguientes definiciones:

`<SPAN_NAME>`
: Nombre de la operación o `span.name` (ejemplos: `redis.command`, `pylons.request`, `rails.request`, `mysql.query`).

`<METRIC_SUFFIX>`
: Nombre de la métrica (ejemplos: `hits`, `errors`, `apdex`, `duration`). Consulta la sección siguiente.

`<TAGS>`
: Rastrea etiquetas (tags) de métricas. Las etiquetas posibles son: `env`, `service`, `version`, `resource`, `http.status_code`, `http.status_class`, `rpc.grpc.status_code`(requiere el Datadog Agent v7.65.0 o posterior) y etiquetas del Datadog Agent (incluyendo [etiquetas primarias adicionales][4] y del host). 
: **Nota:** Otras etiquetas configuradas en tramos no están disponibles como etiquetas en métricas de rastreo.

## Sufijo de métrica

### Solicitudes

`trace (traza).<SPAN_NAME>.hits`
: **Requisito previo:** Esta métrica está disponible para cualquier servicio APM.<br>
**Descripción:** Representa el recuento de tramos creados con un nombre específico (por ejemplo, `redis.command`, `pylons.request`, `rails.request`, o `MySQL.query`).<br>
**Tipo de métrica:** [COUNT][5].<br>
**Etiquetas:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_code`, `rpc.grpc.status_code`, todas las etiquetas de host del Datadog Host Agent y las [etiquetas primarias adicionales][4].

`trace.<SPAN_NAME>.hits.by_http_status`
: **Requisito previo:** Esta métrica está disponible para servicios HTTP/WEB APM si existen metadatos http.<br>
**Descripción:** Representa el recuento de solicitudes de un determinado desglose de tramo por código de estado HTTP.<br>
**Tipo de métrica:** [COUNT][5].<br>
**Etiquetas:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_class`, `http.status_code`, todas las etiquetas de host del Datadog Agent y [las etiquetas primarias adicionales][4].

### Distribución de la latencia

`trace.<SPAN_NAME>`
: **Requisito previo:** Esta métrica está disponible para cualquier servicio APM.<br>
**Descripción:** Representa la distribución de la latencia de todos los servicios, recursos y versiones en diferentes entornos y etiquetas primarias adicionales. **Recomendado para todos los casos de uso de medición de la latencia.**<br>
**Tipo de métrica:** [DISTRIBUTION][6].<br>
**Etiquetas:** `env`, `service`,`version`, `resource`, `resource_name`, `http.status_code`, `synthetics` y [las etiquetas primarias adicionales][4].

### Errores

`trace (traza).<SPAN_NAME>.errors`
: **Requisito previo:** Esta métrica está disponible para cualquier servicio APM.<br>
**Descripción:** Representa el recuento de errores de un determinado tramo.<br>
**Tipo de métrica:** [COUNT][5].<br>
**Etiquetas:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_code`, `rpc.grpc.status_code`, todas las etiquetas de host del host Datadog Agent y las [etiquetas primarias adicionales][4].

`trace.<SPAN_NAME>.errors.by_http_status`
: **Requisito previo:** Esta métrica está disponible para cualquier servicio APM.<br>
**Descripción:** Representa el recuento de errores de un determinado tramo.<br>
**Tipo de métrica:** [COUNT][5].<br>
**Etiquetas:** `env`, `service`, `version`, `resource`, `http.status_class`, `http.status_code`, todas las etiquetas de host del Datadog Agent y [las etiquetas primarias adicionales][4].

### Apdex

`trace.<SPAN_NAME>.apdex`
: **Requisito previo:** Esta métrica está disponible para cualquier servicio HTTP o APM web.<br>
**Descripción:** Mide la puntuación [Apdex][10] de cada servicio web.<br>
**Tipo de métrica:** [GAUGE][7].<br>
**Etiquetas:** `env`, `service`, `version`, `resource` / `resource_name`, `synthetics` y [las etiquetas primarias adicionales][4].

## Métricas legacy

Las siguientes métricas se mantienen con fines de compatibilidad con versiones anteriores. Para todos los casos de uso de medición de la latencia, Datadog recomienda especialmente utilizar [métricas de distribución de la latencia](#latency-distribution).

### Duración (legacy)

<div class="alert alert-danger">
<strong>Importante:</strong> Las métricas de duración se mantienen solo por compatibilidad con versiones anteriores. Para todos los casos de uso de medición de latencia, Datadog recomienda encarecidamente utilizar <a href="#latency-distribution">las métricas de distribución de latencia</a> en su lugar, ya que proporcionan una mayor precisión para los cálculos de percentiles y el análisis general del rendimiento.
</div>

`trace.<SPAN_NAME>.duration`
: **Requisito previo:** Esta métrica está disponible para cualquier servicio APM.<br>
**Descripción:** Mide el tiempo total de una recopilación de tramos dentro de un intervalo de tiempo, incluyendo los tramos secundarios vistos en el servicio de recopilación. Para la mayoría de los casos de uso, Datadog recomienda utilizar la [distribución de la latencia](#latency-distribution) para el cálculo de la latencia media o de los percentiles. Para calcular la latencia media con filtros de etiqueta de host, puedes utilizar esta métrica con la siguiente fórmula: <br>
`sum:trace.<SPAN_NAME>.duration{<FILTER>}.rollup(sum).fill(zero) / sum:trace.<SPAN_NAME>.hits{<FILTER>}.rollup(sum).fill(zero)` <br>
Esta métrica no admite agregaciones de percentiles. Para obtener más información, consulta la sección [Distribución de la latencia](#latency-distribution). <br>
**Tipo de métrica:** [GAUGE][7].<br>
**Etiquetas:** `env`, `service`, `resource`, `http.status_code`, todas las etiquetas de host del Datadog Agent y [las etiquetas primarias adicionales][4].

### Duración (legacy)

<div class="alert alert-danger">
<strong>Importante:</strong> Las métricas de duración se mantienen solo por compatibilidad con versiones anteriores. Para todos los casos de uso de medición de latencia, Datadog recomienda encarecidamente utilizar <a href="#latency-distribution">las métricas de distribución de latencia</a> en su lugar, ya que proporcionan una mayor precisión para los cálculos de percentiles y el análisis general del rendimiento.
</div>

`trace.<SPAN_NAME>.duration.by_http_status`
: **Requisito:** Esta métrica existe para servicios APM HTTP/WEB si existen metadatos http.<br>
**Descripción:** Mide el tiempo total de recopilación de tramos de cada estado HTTP. Específicamente, es la parte relativa del tiempo empleado por todos los tramos durante un intervalo y un estado HTTP concreto, incluyendo el tiempo de espera de los procesos secundarios.<br>
**Tipo de métrica:** [GAUGE][7].<br>
**Etiquetas:** `env`, `service`, `resource`, `http.status_class`, `http.status_code`, todas las etiquetas del Datadog Host Agent y [las etiquetas primarias adicionales][4].

## Impacto del muestreo en métricas de rastreo

En la mayoría de los casos, las métricas de rastreo se calculan sobre la base de todo el tráfico de la aplicación. Sin embargo, con determinadas configuraciones de muestreo de la ingesta de trazas, las métricas representan solo un subconjunto de todas las solicitudes.

### Muestreo del lado de la aplicación 

Algunas bibliotecas de rastreo admiten el muestreo del lado de la aplicación, que reduce el número de tramos antes de que se envíen al Datadog Agent. Por ejemplo, la biblioteca de rastreo Ruby proporciona un muestreo del lado de la aplicación para reducir la sobrecarga de rendimiento. Sin embargo, esto puede afectar a las métricas de rastreo, ya que el Datadog Agent necesita todos los tramos para calcular métricas precisas.

Muy pocas bibliotecas de rastreo admiten esta configuración y por lo general no se recomienda su uso.

### Muestreo OpenTelemetry

Los mecanismos de muestreo nativos del SDK de OpenTelemetry reducen el número de tramos enviados al Datadog Collector, lo que resulta en métricas de rastreo muestreadas y potencialmente imprecisas.

### Muestreo X-Ray

Los tramos X-Ray se muestrean antes de enviarse a Datadog, lo que significa que las métricas de rastreo podrían no reflejar la totalidad del tráfico.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/
[2]: /es/tracing/trace_pipeline/ingestion_mechanisms
[3]: /es/tracing/glossary/#trace-metrics
[4]: /es/tracing/guide/setting_primary_tags_to_scope/#add-additional-primary-tags-in-datadog
[5]: /es/metrics/types/?tab=count#metric-types
[6]: /es/metrics/types/?tab=distribution#metric-types
[7]: /es/metrics/types/?tab=gauge#metric-types
[8]: /es/tracing/software_catalog/#services-types
[9]: /es/tracing/glossary/#services
[10]: /es/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/