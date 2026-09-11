---
algolia:
  tags:
  - trace metrics
aliases:
- /es/tracing/getting_further/metrics_namespace
- /es/tracing/guide/metrics_namespace
description: Guía completa sobre métricas de traza APM, incluyendo espacio de nombres,
  tipos (aciertos, errores, latencia, Apdex) y cómo se calculan a partir del tráfico
  de la aplicación.
further_reading:
- link: tracing/trace_pipeline/generate_metrics/
  tag: Documentación
  text: Cree métricas personalizadas a partir de los tramos ingeridos
- link: tracing/trace_collection/
  tag: Documentación
  text: Aprenda cómo configurar el trazado APM con su aplicación
- link: tracing/software_catalog/
  tag: Documentación
  text: Descubra y catalogue los servicios que reportan a Datadog
- link: tracing/services/service_page
  tag: Documentación
  text: Aprenda más sobre los servicios en Datadog
- link: tracing/services/resource_page
  tag: Documentación
  text: Profundice en el rendimiento de sus recursos y trazas
- link: tracing/trace_explorer/trace_view/
  tag: Documentación
  text: Entienda cómo leer una traza de Datadog
title: Métricas de traza
---
## Resumen {#overview}

Las métricas de trazado de la aplicación se recopilan después de que [habilite la recopilación de trazas e instrumente su aplicación][1].

{{< img src="tracing/apm_lifecycle/trace_metrics.png" style="width:70%; background:none; border:none; box-shadow:none;" alt="Métricas de traza" >}}

Estas métricas capturan el conteo de solicitudes, el conteo de errores y las medidas de latencia. Se calculan en base al 100% del tráfico de la aplicación, independientemente de cualquier configuración de [muestreo de ingestión de trazas][2]. Asegúrese de tener visibilidad completa del tráfico de su aplicación utilizando estas métricas para detectar posibles errores en un servicio o recurso, y creando tableros, seguimientos y SLOs.

**Nota**: Si sus aplicaciones están instrumentadas con bibliotecas de OpenTelemetry, y el muestreo está configurado a nivel de SDK, las métricas APM se calculan en base al conjunto de datos muestreados. Sin embargo, si el muestreo está configurado a nivel del recolector de OpenTelemetry y el procesador de muestreo está aguas arriba del conector de Datadog, las métricas APM se calculan en base al 100% del tráfico de la aplicación.

Las métricas de traza se generan para tramos de entrada de servicio y para ciertas operaciones, dependiendo del lenguaje de integración. Por ejemplo, la integración de Django produce métricas de traza a partir de tramos que representan varias operaciones (1 tramo raíz para la solicitud de Django, 1 para cada middleware y 1 para la visualización).

El espacio de nombres de [métricas de traza][3] está formateado como:

- `trace.<SPAN_NAME>.<METRIC_SUFFIX>`

Con las siguientes definiciones:

`<SPAN_NAME>`
: El nombre de la operación o `span.name` (ejemplos: `redis.command`, `pylons.request`, `rails.request`, `mysql.query`).

`<METRIC_SUFFIX>`
: El nombre de la métrica (ejemplos: `hits`, `errors`, `apdex`, `duration`). Vea la sección a continuación.

`<TAGS>`
: Etiquetas de métricas de traza, las etiquetas posibles son: `env`, `service`, `version`, `resource`, `http.status_code`, `http.status_class`, `rpc.grpc.status_code`(requiere Datadog Agent v7.65.0+) y etiquetas del Datadog Agent (incluyendo el host y [etiquetas primarias adicionales][4]). 
: **Nota:** Otras etiquetas establecidas en tramos no están disponibles como etiquetas en métricas de traza.

## Sufijo de métrica {#metric-suffix}

### Hits {#hits}

`trace.<SPAN_NAME>.hits`
: **Prerequisito:** Esta métrica existe para cualquier servicio APM.<br>
**Descripción:** Representa el conteo de spans creados con un nombre específico (por ejemplo, `redis.command`, `pylons.request`, `rails.request` o `mysql.query`).<br>
**Tipo de métrica:** [COUNT][5].<br>
**Etiquetas:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_code`, `rpc.grpc.status_code`, todas las etiquetas de host del Datadog Host Agent, y [etiquetas primarias adicionales][4].

`trace.<SPAN_NAME>.hits.by_http_status`
: **Prerequisito:** Esta métrica existe para servicios APM HTTP/WEB si existen metadatos HTTP.<br>
**Descripción:** Representa el conteo de hits para un tramo dado, desglosado por código de estado HTTP.<br>
**Tipo de métrica:** [COUNT][5].<br>
**Etiquetas:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_class`, `http.status_code`, todas las etiquetas de host del Agente de Host de Datadog, y [etiquetas primarias adicionales][4].

### Distribución de latencia {#latency-distribution}

`trace.<SPAN_NAME>`
: **Prerequisito:** Esta métrica existe para cualquier servicio APM.<br>
**Descripción:** Representa la distribución de latencia para todos los servicios, recursos y versiones en diferentes entornos y etiquetas primarias adicionales. **Recomendado para todos los casos de uso de medición de latencia.**<br>
**Tipo de métrica:** [DISTRIBUTION][6].<br>
**Etiquetas:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_code`, `rpc.grpc.status_code`, `synthetics`, y [etiquetas primarias adicionales][4].

### Errores {#errors}

`trace.<SPAN_NAME>.errors`
: **Prerequisito:** Esta métrica existe para cualquier servicio APM.<br>
**Descripción:** Representa el conteo de errores para un tramo dado.<br>
**Tipo de métrica:** [COUNT][5].<br>
**Etiquetas:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_code`, `rpc.grpc.status_code`, todas las etiquetas de host del Agente de Host de Datadog, y [etiquetas primarias adicionales][4].

`trace.<SPAN_NAME>.errors.by_http_status`
: **Requisito previo:** Esta métrica existe para cualquier servicio APM.<br>
**Descripción:** Representa el conteo de errores para un tramo dado.<br>
**Tipo de métrica:** [COUNT][5].<br>
**Etiquetas:** `env`, `service`, `version`, `resource`, `http.status_class`, `http.status_code`, todas las etiquetas de host del Datadog Host Agent, y [etiquetas primarias adicionales][4].

### Apdex {#apdex}

`trace.<SPAN_NAME>.apdex`
: **Prerequisito:** Esta métrica existe para cualquier servicio APM basado en HTTP o web.<br>
**Descripción:** Mide el puntaje [Apdex][10] para cada servicio web.<br>
**Tipo de métrica:** [GAUGE][7].<br>
**Etiquetas:** `env`, `service`, `version`, `resource` / `resource_name`, `synthetics`, y [etiquetas primarias adicionales][4].

## Métricas heredadas {#legacy-metrics}

Las siguientes métricas se mantienen para compatibilidad hacia atrás. Para todos los casos de uso de medición de latencia, Datadog recomienda encarecidamente usar [métricas de distribución de latencia](#latency-distribution) en su lugar.

### Duración (Heredada) {#duration-legacy}

<div class="alert alert-danger">
<strong>Importante:</strong> Las métricas de duración se mantienen solo para compatibilidad hacia atrás. Para todos los casos de uso de medición de latencia, Datadog recomienda encarecidamente usar <a href="#latency-distribution">métricas de distribución de latencia</a> en su lugar, ya que proporcionan mejor precisión para cálculos de percentiles y análisis de rendimiento general.
</div>

`trace.<SPAN_NAME>.duration`
: **Prerequisito:** Esta métrica existe para cualquier servicio APM.<br>
**Descripción:** Mide el tiempo total para una colección de tramos dentro de un intervalo de tiempo, incluyendo tramos hijos vistos en el servicio de recolección. Para la mayoría de los casos de uso, Datadog recomienda usar [la distribución de latencia](#latency-distribution) para el cálculo de la latencia promedio o percentiles. Para calcular la latencia promedio con filtros de etiquetas de host, puede usar esta métrica con la siguiente fórmula: <br>
`sum:trace.<SPAN_NAME>.duration{<FILTER>}.rollup(sum).fill(zero) / sum:trace.<SPAN_NAME>.hits{<FILTER>}.rollup(sum).fill(zero)` <br>
Esta métrica no soporta agregaciones de percentiles. Lea la sección [Distribución de Latencia](#latency-distribution) para más información. <br>
**Tipo de métrica:** [GAUGE][7].<br>
**Etiquetas:** `env`, `service`, `resource`, `http.status_code`, todas las etiquetas de host del Datadog Host Agent, y [etiquetas primarias adicionales][4].

### Duración por (Heredada) {#duration-by-legacy}

<div class="alert alert-danger">
<strong>Importante:</strong> Las métricas de duración se mantienen solo para compatibilidad hacia atrás. Para todos los casos de uso de medición de latencia, Datadog recomienda encarecidamente usar <a href="#latency-distribution">métricas de distribución de latencia</a> en su lugar, ya que proporcionan mejor precisión para cálculos de percentiles y análisis de rendimiento general.
</div>

`trace.<SPAN_NAME>.duration.by_http_status`
: **Requisito previo:** Esta métrica existe para servicios de APM HTTP/WEB si existen metadatos http.<br>
**Descripción:** Mide el tiempo total para una colección de tramos para cada estado HTTP. Específicamente, es la participación relativa del tiempo gastado por todos los tramos durante un intervalo y un estado HTTP dado, incluyendo el tiempo gastado esperando en procesos hijos.<br>
**Tipo de métrica:** [GAUGE][7].<br>
**Etiquetas:** `env`, `service`, `resource`, `http.status_class`, `http.status_code`, todas las etiquetas de servidor del Datadog Host Agent, y [etiquetas primarias adicionales][4].

## Impacto del muestreo en las métricas de traza {#sampling-impact-on-trace-metrics}

En la mayoría de los casos, las métricas de traza se calculan en función de todo el tráfico de la aplicación. Sin embargo, con ciertas configuraciones de muestreo de ingestión de trazas, las métricas de traza representan solo un subconjunto de todas las solicitudes.

### Muestreo del lado de la aplicación {#application-side-sampling}

Algunos SDKs admiten el muestreo del lado de la aplicación, lo que reduce el número de tramos antes de que se envíen al Agente de Datadog. Por ejemplo, el SDK de Ruby ofrece muestreo del lado de la aplicación para reducir la sobrecarga de rendimiento. Sin embargo, esto puede afectar las métricas de traza, ya que el Agente de Datadog necesita todos los tramos para calcular métricas precisas. 

Muy pocos SDKs admiten esta configuración y, en general, no se recomienda su uso.

### Muestreo de OpenTelemetry {#opentelemetry-sampling}

Los mecanismos nativos de muestreo del SDK de OpenTelemetry reducen el número de tramos enviados al recolector de Datadog, lo que resulta en métricas de traza muestreadas y potencialmente inexactas.

### Muestreo de X-Ray {#x-ray-sampling}

Los tramos de X-Ray se muestrean antes de ser enviados a Datadog, lo que significa que las métricas de traza pueden no reflejar todo el tráfico.


## Lectura adicional {#further-reading}

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