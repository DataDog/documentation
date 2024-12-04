---
description: Aprende a crear monitores, SLOs y dashboards utilizando tus métricas
  de USM.
further_reading:
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: Blog
  text: Descubre, asigna y monitoriza automáticamente todos tus servicios en segundos
    con Universal Service Monitoring
- link: /universal_service_monitoring
  tag: Documentación
  text: Más información sobre Universal Service Monitoring
- link: /tracing/metrics
  tag: Documentación
  text: Más información sobre métricas de APM
title: Utilización de métricas de USM en monitores, SLOs y dashboards
---

## Información general

[Universal Service Monitoring][1] detecta servicios mediante etiquetas (tags) de contenedor populares (como `app`, `short_image` y `kube_deployment`) y genera entradas en el [Catálogo de servicios][2] para esos servicios.

Puedes acceder a las métricas de solicitud, error y duración en Datadog tanto para el tráfico entrante como saliente en todos los servicios detectados con Universal Service Monitoring. Estas métricas de estado del servicio son útiles para crear alertas, [rastrear despliegues][3] y comenzar con [objetivos de nivel de servicio (SLOs)][4] para que puedas obtener una amplia visibilidad de todos los servicios en ejecución en tu infraestructura. 

{{< img src="universal_service_monitoring/guide/usm_slo.png" alt="SLOs de Universal Service Monitoring para BITSBOUTIQUE" style="width:100%;" >}}

Esta guía describe cómo buscar métricas de USM como `universal.http.*` y utilizarlas en tus monitores, SLOs y dashboards.

## Métricas de USM frente a métricas de APM

| Nombre de la métrica                 | Unidades   | Tipo         | Descripción                                       |
|-----------------------------|---------|--------------|---------------------------------------------------|
| universal.http.client       | Segundos | Distribución | Latencia de las solicitudes salientes, recuentos, errores y tasas.                |
| universal.http.client.hits  | Resultados    | Recuento        | Número total de solicitudes salientes y errores.                |
| universal.http.client.apdex | Puntuación   | Gauge        | La puntuación de Apdex de las solicitudes salientes para este servicio.                |
| universal.http.server       | Segundos | Distribución | Latencia de las solicitudes entrantes, recuentos, errores y tasas.  |
| universal.http.server.hits  | Resultados    | Recuento        | Número total de solicitudes entrantes y errores.                 |
| universal.http.server.Apdex | Puntuación   | Gauge        | La puntuación de Apdex para este servicio web.             |

A diferencia de métricas de APM, los errores están disponibles en la etiqueta `error:true` en lugar de en una métrica aparte.

**Nota:** Las métricas `.hits` tienen todas tus etiquetas de infraestructura y son la forma recomendada de consultar solicitudes y recuentos de errores. También puedes añadir [etiquetas primarias secundarias][5] a todas las métricas de USM.

### Sintaxis de métrica

La sintaxis de consulta de métrica de USM difiere de la [sintaxis de consulta de métrica de APM][6], que utiliza `trace.*`. Las métricas de USM se agrupan bajo un mismo nombre de métrica de distribución.

Por ejemplo:

| APM                                             | USM                                                  |
|-------------------------------------------------|------------------------------------------------------|
| trace.universal.http.client.hits{*}             | count:universal.http.client{*}                       |
| trace.universal.http.client.errors              | count:universal.http.client{error:true}              |
| trace.universal.http.client.hits.by_http_status | count:universal.http.client{*} by http_status_family |
| pXX:trace.universal.http.client{*}              | pXX:universal.http.client{*}                         |
| trace.universal.http.client.apdex{*}            | universal.http.client.apdex{*}                       |

Las mismas traducciones se aplican a la operación `universal.http.server` que captura el tráfico entrante. Para más información sobre las métricas de distribución, consulta [Métricas basadas en DDSketch en APM][7].

## Uso

Navega hasta [**Infrastructure > Universal Service Monitoring**][8] (Infraestructura > Universal Service Monitoring), filtra por tipo de telemetría de Universal Service Monitoring y haz clic en un servicio. La pestaña **Performance** (Rendimiento) muestra gráficos a nivel de servicio sobre accesos, latencia, peticiones, errores y más. También puedes acceder a estas métricas al crear un [Monitor](#create-a-monitor) o un [SLO](#create-an-slo), o consultando un [dashboard](#access-a-defined-dashboard) en el [Catálogo de servicios][2].

### Crear un monitor

Puedes crear un [**Monitor de APM**][9] para activar una alerta cuando una métrica de USM como `universal.http.client` cruce un umbral o se desvíe de un patrón esperado.

1. Ve a [**Monitors > New Monitor**][10] (Monitores > Nuevo monitor) y haz clic en [**APM**][9].
2. Selecciona **APM Metrics** (Métricas de APM) y define un `env` de servicio o recurso y cualquier otra [etiqueta primaria][11]. Selecciona un servicio o recurso para monitorizar y define el intervalo de tiempo para que el monitor evalúe la consulta. 
3. Selecciona **Threshold Alert** (Umbral de alerta) y selecciona una métrica de USM como `Requests per Second` para que se active el monitor. A continuación, define si el valor debe estar **por encima** o **por debajo** de los umbrales de alerta y advertencia. Introduce un valor para el umbral de alerta y, opcionalmente, para el umbral de aviso.
4. La sección de notificación contiene un mensaje rellenado previamente para el monitor. Personaliza el nombre y el mensaje de la alerta y define los permisos para este monitor.
5. Haz clic en **Create** (Crear).

{{< img src="universal_service_monitoring/guide/usm_monitor.png" alt="Universal Service Monitoring Monitor para BITSBOUTIQUE" style="width:100%;" >}}

Para más información, consulta la [documentación de monitor de APM][12].

### Crear un SLO

Puedes crear un [**SLO**][13] por servicio para asegurarte de que cumple los objetivos establecidos por las métricas de USM y mejorando la disponibilidad a lo largo del tiempo. Datadog recomienda [crear un SLO programáticamente][14] para cubrir una gran cantidad de servicios.

Para crear un SLO desde el Catálogo de servicios:

1. Navega hasta la pestaña **Reliability** (Confiabilidad) del [Catálogo de servicios][8].
2. En la columna **SLOs**, posa el cursor sobre un servicio y haz clic en **+ Create Availability SLO** (+ Crear SLO de disponibilidad) o **+ Create Latency SLO** (+ Crear SLO de latencia).

{{< img src="universal_service_monitoring/guide/service_catalog_slo_setup.png" alt="Configurar un SLO de Universal Service Monitoring para BITSBOUTIQUE" style="width:100%;" >}}

Opcionalmente, para crear un SLO manualmente con métricas de USM:

1. Ve a [**Service Management > SLOs**][15] (Gestión de servicios > SLOs) y haz clic en [**New SLO**][13] (Nuevo SLO).
2. Selecciona **Metric Based** (Basado en métrica) y crea dos consultas en la sección **Good events (numerator)** (Eventos correctos (numerador)):

   * Consulta A: introduce una métrica de USM como `universal.http.server`, filtra por un servicio específico añadiendo etiquetas `service` y `env` primarias en el campo `from`, y selecciona `count` en el campo `as`.
   * Consulta A: introduce una métrica de USM como `universal.http.server`, filtra por un servicio específico añadiendo etiquetas `service` y `env` primarias, además de una etiqueta `error:true` en el campo `from`, y selecciona `count` en el campo `as`.

3. Haz clic en **+ Add Formula** (Añadir fórmula) e introduce `a-b`.
4. En la sección **Total events (denominator)** (Eventos totales (denominador)), introduce una métrica de USM como `universal.http.server`, filtra por un servicio específico añadiendo etiquetas`service` y `env` primarias en el campo `from`, y selecciona `count` en el campo `as`.
5. Haz clic en **+ New Target** (+ Nuevo objetivo) para crear un umbral objetivo con la siguiente configuración:

   * El intervalo de tiempo es `7 Days`, el umbral objetivo es `95%` y el umbral de alerta es `99.5%`. Datadog recomienda establecer el mismo umbral objetivo en todos los intervalos de tiempo.

6. Introduce un nombre y una descripción para este SLO. Establece las etiquetas `env` y `service` primarias, además de la etiqueta `team`.
7. Haz clic en **Save and Set Alert** (Guardar y establecer alerta).

{{< img src="universal_service_monitoring/guide/usm_slo_setup.png" alt="Establecer un SLO de Universal Service Monitoring para BITSBOUTIQUE" style="width:100%;" >}}

Para más información, consulta la [documentación Objetivos de nivel de servicio (SLO)][17].

### Acceder a un dashboard definido

El [Catálogo de servicios][2] identifica los dashboards definidos en tu archivo de definición de servicio y los enumera en la pestaña **Dashboards**. Haz clic en **Manage dashboards** (Administrar dashboards) para acceder y editar la definición de servicio directamente en GitHub.

{{< img src="universal_service_monitoring/guide/manage_dashboards.png" alt="Administra el botón de dashboards en la pestaña Dashboards de un servicio en el Catálogo de servicios" style="width:90%;" >}}

Para más información, consulta la [documentación de dashboards][16].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/universal_service_monitoring
[2]: /es/tracing/service_catalog
[3]: /es/tracing/services/deployment_tracking/
[4]: /es/service_management/service_level_objectives
[5]: /es/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-a-second-primary-tag-in-datadog
[6]: /es/tracing/metrics/metrics_namespace
[7]: /es/tracing/guide/ddsketch_trace_metrics/
[8]: https://app.datadoghq.com/services
[9]: https://app.datadoghq.com/monitors/create/apm
[10]: https://app.datadoghq.com/monitors/create
[11]: /es/metrics/advanced-filtering/
[12]: /es/monitors/create/types/apm
[13]: https://app.datadoghq.com/slo/new
[14]: /es/api/latest/service-level-objectives/
[15]: https://app.datadoghq.com/slo/manage
[16]: /es/dashboards
[17]: /es/service_management/service_level_objectives/