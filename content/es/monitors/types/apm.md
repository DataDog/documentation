---
aliases:
- /es/monitors/monitor_types/app_analytics
- /es/monitors/monitor_types/trace_search
- /es/tracing/guide/resource_monitor/
- /es/monitors/monitor_types/apm
- /es/monitors/create/types/apm/
description: Comparar una métrica de APM con el umbral definido por el usuario
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar un tiempo de inactividad para silenciar un monitor
- link: /monitors/manage/status/
  tag: Documentación
  text: Comprobar el estado de tu monitor
kind: Documentación
title: Monitor de APM
---

## Información general

Los monitores de métricas de APM funcionan como los [monitores de métricas][1] normales, pero con controles adaptados específicamente a APM. Utiliza estos monitores para recibir alertas a nivel de servicio sobre ocurrencias, errores y una variedad de medidas de latencia.

Los monitores Analytics te permite visualizar los datos de APM a lo largo del tiempo y configurar alertas basadas en tramos (spans) indexados. Por ejemplo, utiliza el monitor Analytics para recibir alertas sobre un pico de solicitudes lentas.

## Creación de un monitor

Para crear un [monitor de APM][2] en Datadog, utiliza la navegación principal: *Monitors --> New Monitor --> APM* (Monitores > Nuevo monitor > APM).

Elige entre un monitor de **métricas de APM** o un monitor de **rastreo Analytics**:

{{< tabs >}}
{{% tab "APM Metrics" (Métricas de APM) %}}

### Seleccionar un contexto para el monitor

Elige tus [etiquetas (tags) principales][1], tu [servicio][2] y tu [recurso][3] en los menús desplegables.

### Definir las condiciones de alerta

Elige una alerta de **Umbral** o de **Anomalía**:

#### Alerta de umbral

Se activa una alerta cada vez que una métrica supera un umbral.

* Alerta en los casos en que `Requests per second`, `Errors per second`, `Apdex`, `Error rate`, `Avg latency`, `p50 latency`, `p75 latency`, `p90 latency` o `p99 latency`
* es `above`, `above or equal to`, `below` o `below or equal to`
* Umbral de alerta `<NUMBER>`
* Umbral de advertencia `<NUMBER>`
* durante los últimos `5 minutes`, `15 minutes`, `1 hour`, etc. o `custom` para configurar un valor entre 1 minuto y 48 horas.

#### Alerta de anomalía

Se activa una alerta cada vez que una métrica se desvía de un patrón esperado.

* En los casos en que `Requests per second`, `Errors per second`, `Apdex`, `Error rate`, `Avg latency`, `p50 latency`, `p75 latency`, `p90 latency` o `p99 latency`
* Alerta cuando el `<ALERT_THRESHOLD>`%, el `<WARNING_THRESHOLD>`%
* de los valores son desviaciones de `<NUMBER>` que están `above or below`, `above` o `below`
* la predicción durante los últimos `5 minutes`, `15 minutes`, `1 hour`, etc. o `custom` para configurar un valor entre 1 minuto y 48 horas.

#### Condiciones de alerta avanzadas

Para obtener instrucciones detalladas sobre las opciones avanzadas de alerta (resolución automática, retraso de la evaluación, etc.), consulta la página [Configuración de monitores][8]. Para la opción de ventana de datos de métricas completa, consulta la página [Monitor de métricas][9].

[1]: /es/tracing/guide/setting_primary_tags_to_scope/#environment
[2]: /es/tracing/services/service_page/
[3]: /es/tracing/services/resource_page/
[4]: /es/monitors/configuration/#advanced-alert-conditions
[5]: /es/monitors/types/metric/#data-window
{{% /tab %}}
{{% tab "Trace Analytics" (Rastreo Analytics) %}}

<div class="alert alert-info"><strong>Nota</strong>: Existe un límite predeterminado de 1000 monitores de rastreo Analytics por cada cuenta. Si estás por alcanzar este límite, considera la posibilidad de utilizar <a href="/monitors/configuration/?tab=thresholdalert#alert-grouping">alertas múltiples</a> o <a href="/help/">ponte en contacto con el servicio de asistencia</a>.</div>

### Definir la consulta de búsqueda

1. Crea una consulta de búsqueda utilizando la misma lógica que en una [búsqueda de trazas][3].
2. Elige monitorizar en base a un recuento de trazas, una [faceta][4] o una [medida][5]:
    * **Monitorizar en base a un recuento de trazas**: utiliza la barra de búsqueda (opcional) y **no** selecciones una faceta o medida. Datadog evalúa el número de trazas en un marco temporal seleccionado y luego lo compara con las condiciones del umbral.
    * **Monitorizar en base a una faceta o medida**: si seleccionas una faceta, el monitor alerta sobre el `Unique value count` de la faceta. Si seleccionas una medida, es similar al monitor de métricas, y tienes que seleccionar una agregación (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` o `max`).
3. Agrupar trazas por múltiples dimensiones (opcional):
   Todas las trazas que coinciden con la consulta se agregan a grupos basados en el valor de hasta cuatro facetas.
4. Configura la estrategia de agrupación de alertas (opcional):
    * **Alerta simple**: agrega alertas de todas las fuentes de información. Recibirás una alerta cuando el valor agregado cumple las condiciones establecidas.</br>
    Si la consulta tiene un `group by` y seleccionas el modo de alerta simple, obtendrás **una** alerta cuando los valores de uno o varios grupos superen el umbral. Esta estrategia puede seleccionarse para reducir el ruido de notificación.
    * **Alerta múltiple**: las alertas múltiples aplican la alerta a cada fuente en función de tus parámetros de grupo. Se genera un evento de alerta para cada grupo que cumple las condiciones establecidas. Por ejemplo, puedes agrupar una consulta por `@resource.name` para recibir una alerta distinta por cada recurso, cuando la tasa de error de un tramo es elevada.

{{< img src="monitors/monitor_types/apm/define-the-search-query.png" alt="Definir la consulta de la búsqueda" style="width:80%;" >}}

**Nota:** Los monitores Analytics sólo pueden crearse en base a tramos retenidos por [filtros de retención personalizados][6] (no el filtro de retención inteligente).

### Seleccionar condiciones de alerta

* Se activa cuando el resultado de la consulta es `above`, `above or equal to`, `below` o `below or equal to`.
* El umbral durante los últimos `5 minutes`, `15 minutes`, `1 hour` o `custom` para configurar un valor entre 5 minutos y 48 horas.
* Umbral de alerta: `<NUMBER>`
* Umbral de advertencia: `<NUMBER>`

#### Alertas en escenarios sin datos y por debajo del umbral

Para recibir una notificación cuando un grupo que coincide con una consulta específica deja de enviar tramos, establece la condición por debajo de `1`. Esto te notifica cuando ningún tramo coincide con la consulta del monitor durante el periodo de evaluación definido para el grupo.

#### Condiciones de alerta avanzadas

Para obtener instrucciones detalladas sobre las opciones avanzadas de alerta (retraso de la evaluación, etc.), consulta la página [Configurar monitores][5].

[1]: /es/tracing/trace_explorer/query_syntax/#search-bar
[2]: /es/tracing/trace_explorer/query_syntax/#facet-search
[3]: /es/tracing/trace_explorer/query_syntax/#numerical-values
[4]: /es/tracing/glossary/#indexed-span
[5]: /es/monitors/configuration/#advanced-alert-conditions
[6]: /es/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
{{% /tab %}}
{{< /tabs >}}

### Notificaciones

Para obtener instrucciones detalladas sobre la sección **Configurar notificaciones y automatizaciones**, consulta la página [Notificaciones][6].

**Nota**: Busca monitores de nivel de servicio en el [Catálogo de servicios][4] y en el [Mapa de servicios][5], y encuentra monitores de nivel de recurso en las páginas de recursos individuales (puedes acceder a ellas haciendo clic en el recurso específico que aparece en la página de detalles del servicio).

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/metric/
[2]: https://app.datadoghq.com/monitors#create/apm
[3]: /es/monitors/notify/
[4]: https://app.datadoghq.com/services
[5]: https://app.datadoghq.com/apm/map