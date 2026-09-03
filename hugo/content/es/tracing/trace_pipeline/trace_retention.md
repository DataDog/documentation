---
aliases:
- /es/tracing/trace_retention/
- /es/tracing/trace_queries/one_percent_flat_sampling/
description: Aprenda a controlar la retención de trazas con filtros de retención.
further_reading:
- link: https://www.datadoghq.com/blog/rum-apm-retention-filters
  tag: Blog
  text: Unifique y correlacione datos de frontend y backend con filtros de retención
- link: /tracing/trace_pipeline/ingestion_mechanisms
  tag: Documentación
  text: Mecanismos de ingesta
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentación
  text: Ingestion Control
- link: /tracing/trace_pipeline/metrics/
  tag: Documentación
  text: Métricas de uso
- link: https://learn.datadoghq.com/courses/apm-rate-limit-retention
  tag: Centro de aprendizaje
  text: Limitación de tasa y retención de APM
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Centro de arquitectura
  text: 'Dominio del rastreo distribuido: desafíos de volumen de datos y el enfoque
    de Datadog para un muestreo eficiente'
title: Retención de trazas
---
{{< img src="tracing/apm_lifecycle/retention_filters.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Filtros de retención" >}}

Con Datadog APM, [la ingesta y la retención de trazas durante 15 días][1] son totalmente personalizables.

Para hacer un seguimiento de su volumen de datos ingeridos e indexados, consulte la documentación de [Métricas de uso][2].

## Filtros de retención {#retention-filters}

Después de que los tramos han sido ingeridos, algunos se conservan durante 15 días de acuerdo con los filtros de retención que están configurados en su cuenta:
1. El **[Filtro de retención inteligente](#datadog-intelligent-retention-filter)** retiene tramos para cada entorno, servicio, operación y recurso para diferentes distribuciones de latencia.
2. Se crean varios **[Filtros de retención predeterminados](#default-retention-filters)** para garantizar que mantenga la visibilidad sobre todos sus servicios y endpoints, así como errores y trazas de alta latencia. 
3. Puede crear cualquier cantidad de **[Filtros de retención personalizados](#create-your-own-retention-filter)** para sus servicios, para capturar las trazas que más le importan a su negocio, según cualquier atributo de tramo o filtro de etiqueta.

**Nota**: Se requiere el permiso `apm_retention_filter_write` para crear, eliminar, modificar, habilitar o deshabilitar filtros de retención.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filters.png" style="width:100%;" alt="Página de filtros de retención" >}}

En Datadog, en la página de configuración de [Filtros de retención][3], puede ver una lista de todos los filtros de retención:

Nombre del filtro
: El nombre de cada filtro de retención utilizado para indexar tramos.

Consulta de filtro
: La consulta basada en etiquetas para cada filtro.

Tasa de retención
: Un porcentaje de 0 a 100% de cuántos tramos coincidentes se indexan. Los tramos retenidos se eligen de manera uniforme entre los tramos que coinciden con la consulta de filtro.

Tramos indexados
: La cantidad de tramos indexados por el filtro durante el período de tiempo seleccionado.

Última actualización
: La fecha y el usuario que modificó por última vez el filtro de retención.

Interruptor de habilitación
: Permite activar y desactivar los filtros.

**Nota**: El orden de la lista de filtros de retención cambia el comportamiento de indexación. Si un tramo coincide con un filtro de retención al principio de la lista, el tramo se conserva o se descarta. Cualquier filtro de retención personalizado coincidente que se encuentre más abajo en la lista no captura el tramo ya procesado.

La columna `Spans Indexed` para cada filtro de retención funciona con la métrica `datadog.estimated_usage.apm.indexed_spans`, que puede utilizar para realizar un seguimiento del uso de sus tramos indexados. Para obtener más información, lea [Métricas de uso][2] o explore el [panel de control de uso preconfigurado][4] disponible en su cuenta.

<div class="alert alert-info">Los filtros de retención no afectan qué trazas son recopiladas por el Agent y enviadas a Datadog ("ingeridas"). Para controlar la ingesta, utilice <a href="/tracing/trace_pipeline/ingestion_controls/">controles de ingesta</a> dedicados.</div>


### Tipos de filtros de retención {#retention-filter-types}

Existen dos tipos de filtros de retención:

1. **Filtros de retención a nivel de tramo**: indexan solo los tramos específicos que coinciden con sus criterios de filtro.
2. **Filtros de retención a nivel de traza**: indexan trazas completas que contienen tramos que coinciden con sus criterios de filtro, lo que hace que las trazas completas sean buscables en Trace Queries.

| Característica | Filtros de retención estándar | Filtros de retención a nivel de traza |
| ------- | ------------------------- | ----------------------------- |
| **Consulta de tramo** | Consulta de tramo + tasa de retención de tramo | Consulta de tramo + tasa de retención de tramo + tasa de retención de traza |
| **Qué se indexa** | Solo los tramos seleccionados por la consulta | Todos los tramos que pertenecen a trazas que contienen tramos que coinciden con la consulta |
| **Donde se puede consultar** | Span Explorer| Span Explorer y Trace Queries |

**Nota**: Los tramos indexados indirectamente que conservan los filtros de retención a nivel de traza (es decir, los tramos que no coinciden directamente con la consulta pero pertenecen a trazas que sí lo hacen) no son evaluados por [monitores de análisis de trazas][19].

### Filtros de retención predeterminados {#default-retention-filters}

Los siguientes filtros de retención están habilitados de forma predeterminada: 
- El filtro de retención `Error Default` indexa los tramos de error con `status:error`. La tasa de retención y la consulta son configurables. Por ejemplo, para capturar errores de producción, establezca la consulta en `status:error, env:production`. Deshabilite el filtro de retención si no desea capturar los errores de forma predeterminada.
- El filtro de retención `App and API Protection Default` está habilitado si utiliza [App and API Protection][16]. Garantiza la retención de todos los tramos en las trazas que se han identificado como de impacto en la seguridad de la aplicación (un intento de ataque).
- El filtro de retención `Synthetics Default` está habilitado si utiliza Synthetic Monitoring. Garantiza que las trazas generadas a partir de pruebas sintéticas de API y de navegador permanezcan disponibles de forma predeterminada. Consulte [Synthetic APM][15] para obtener más información, incluido cómo correlacionar trazas con pruebas Synthetic.
- El filtro de retención `Dynamic Instrumentation Default` está habilitado si utiliza [Dynamic Instrumentation][17]. Garantiza que los tramos creados dinámicamente con Dynamic Instrumentation permanezcan disponibles a largo plazo de forma predeterminada.

### Filtro de retención inteligente de Datadog {#datadog-intelligent-retention-filter}

El filtro de retención inteligente de Datadog siempre está activo para sus servicios y mantiene una selección representativa de trazas sin que tenga que crear docenas de filtros de retención personalizados. Se compone de: 
- [Muestreo de diversidad](#diversity-sampling)
- [Muestreo plano del uno por ciento](#one-percent-flat-sampling)

**Nota:** [Consultas de trazas][11] se basan en los datos indexados por el filtro de Retención inteligente.

Los tramos indexados por el filtro de Retención inteligente (muestreo de diversidad y muestreo plano del 1%) **no se cuentan para el uso** de tramos indexados y, por lo tanto, **no afectan su factura**.

Si hay etiquetas o atributos específicos para los cuales desea indexar más tramos de los que retiene el filtro de Retención inteligente, entonces [cree su propio filtro de retención](#create-your-own-retention-filter).

#### Muestreo de diversidad {#diversity-sampling}

El muestreo de diversidad escanea los **tramos de entrada de servicio** y los retiene durante 30 días:

- Al menos un tramo (y la traza asociada) para cada combinación de entorno, servicio, operación y recurso cada 15 minutos como máximo, para garantizar que siempre pueda encontrar trazas de ejemplo en las páginas de [servicio][9] y [recurso][10], incluso para puntos finales de bajo tráfico.
- Tramos de alta latencia para los tramos del `p75`, `p90` y `p95` percentil (y la traza asociada) para cada combinación de entorno, servicio, operación y recurso.
- Una selección representativa de errores, garantizando la diversidad de errores (por ejemplo, códigos de estado de respuesta 400, 500).

El conjunto de datos capturado por el muestreo de diversidad no se muestrea de manera uniforme (es decir, no es proporcionalmente representativo de todo el tráfico). Está sesgado hacia errores y rastreos de alta latencia. 

#### Muestreo plano del 1% {#one-percent-flat-sampling}

El muestreo plano del 1% captura:
1. Todas las trazas correlacionadas con el 1% de las sesiones RUM ingeridas**que tuvieron trazas ingeridas**, lo que garantiza que siempre pueda encontrar algunas sesiones indexadas que tengan datos de rastreo asociados. Esto mejora la [correlación entre APM y RUM][20], lo que le permite depurar problemas de usuario al visualizar tanto las sesiones de frontend como las trazas de backend juntas. La muestra se aplica según el `session_id`, lo que significa que todas las trazas vinculadas a la misma sesión RUM comparten una decisión de indexación coherente.
2. Una **muestra uniforme del 1%** de los [tramos ingeridos][12], aplicada según el `trace_id` para que todos los tramos en la misma traza compartan la misma decisión de muestreo. Utilice esta muestra para el monitoreo general del estado del sistema y el análisis de tendencias.

Este mecanismo de muestreo es uniforme y es proporcionalmente representativo de todo el tráfico ingerido. Como resultado, es posible que los servicios y puntos finales de bajo tráfico no aparezcan en ese conjunto de datos si filtra en un período de tiempo corto.

### Cree su propio filtro de retención {#create-your-own-retention-filter}

Cree filtros de retención personalizados para conservar datos de traza específicos durante 15 días. Utilice cualquier etiqueta de tramo o atributo en la consulta de filtro para seleccionar y conservar los tramos que son más importantes para su negocio. 

Por ejemplo, puede crear filtros para conservar todas las trazas de:

- Transacciones con tarjeta de crédito superiores a $100: `@transaction_amount:>100`
- Tramos de operación de pago que tengan una duración superior a 2 segundos en el entorno de producción: `resource_name:"GET /checkout" @duration:>2s env:prod`
- Versiones específicas de una aplicación de servicio de entrega en línea: `service:delivery-api @version:v2.0`

Cuando indexa un tramo mediante un filtro de retención:

- **Capacidad de búsqueda**: El tramo indexado se puede encontrar en Trace Explorer, paneles y se monitoriza durante 15 días.

- **Contexto de visualización**: Cuando hace clic en cualquier tramo indexado en Trace Explorer, siempre ve su contexto de traza completo (todos los tramos principales y secundarios) en flame graph o en waterfall view, independientemente de si esos otros tramos fueron indexados.

- **Contexto de búsqueda**: Aunque puede visualizar una traza completa, solo los tramos que fueron indexados específicamente por los filtros de retención se podrán buscar en Trace Explorer.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filter_create.png" style="width:90%;" alt="Crear filtro de retención">}}

Para crear un filtro de retención:
1. Vaya a [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Retention Filters{{< /ui >}}][18].
1. Haga clic en {{< ui >}}Add Retention Filter{{< /ui >}}.
1. Defina el {{< ui >}}Retention Query{{< /ui >}} para seleccionar los tramos que desea conservar. Utilice cualquier tramo o atributo para filtrar tramos, tal como escribiría una consulta en [Trace Explorer][7].
1. Establezca un {{< ui >}}Span rate{{< /ui >}} para definir el porcentaje de tramos que coinciden con esta consulta que deben indexarse.
1. Opcionalmente, establezca un {{< ui >}}Trace rate{{< /ui >}} para definir el porcentaje de trazas completas asociadas con los tramos que deben indexarse. Esto garantiza que otros tramos de las trazas asociadas con el tramo seleccionado por la consulta de retención también se indexen, de modo que los datos indexados se puedan consultar en [Consultas de traza][11]. 
1. Establezca un nombre para el filtro.
1. Haga clic en {{< ui >}}Add Filter{{< /ui >}} para guardar el filtro.

<div class="alert alert-warning">Configurar una tasa de trazas puede aumentar significativamente el uso de sus tramos indexados.</div>

Por ejemplo, si configura un filtro de retención para indexar tramos de `service:my-service`:
- Configurar una tasa de tramos de `50%` ayuda a garantizar que aproximadamente el 50% de las trazas que contienen tramos que coinciden con `service:my-service` sean seleccionadas. Para las trazas seleccionadas, todos los tramos que coinciden con `service:my-service` son indexados.
- Configurar una tasa de trazas de `10%` ayuda a garantizar que el 10% de las trazas seleccionadas por la tasa de tramos sean indexadas completamente. Para esas trazas, todos los tramos de la traza (no solo los de `service:my-service`) son indexados. Suponiendo que las trazas tienen 100 tramos en promedio y 5 tramos de `service:my-service`, configurar una tasa de trazas indexa los 95 tramos restantes de la traza para el porcentaje configurado de trazas seleccionadas.
- La tasa de tramos se evalúa primero, y la tasa de trazas se aplica solo a las trazas seleccionadas por la tasa de tramos.

Cuando crea un nuevo filtro o edita la tasa de retención de un filtro existente, Datadog muestra una estimación del cambio porcentual en el volumen de indexación global.

Los filtros se conservan en orden secuencial. Si tiene un filtro ascendente que conserva tramos con la etiqueta `resource:POST /hello_world`, esos tramos no aparecen en la ventana {{< ui >}}Edit{{< /ui >}} de un filtro descendente que busca tramos con la misma etiqueta porque ya han sido conservados por el filtro ascendente.

## Búsqueda de trazas y análisis en tramos indexados {#trace-search-and-analytics-on-indexed-spans}

### En Trace Explorer, paneles y notebooks {#in-the-trace-explorer-dashboards-and-notebooks}

De forma predeterminada, los tramos indexados por filtros de retención personalizados **y** el filtro de retención inteligente se incluyen en las [vistas agregadas][6] de Trace Explorer (series temporales, toplist, tabla), así como en las consultas de paneles y notebook.


El atributo `retained_by` está presente en todos los tramos conservados. Su valor es: 
- `retained_by:retention_filter` si el tramo fue capturado por un [filtro de retención personalizado](#create-your-own-retention-filter), incluidos los [filtros de retención predeterminados](#default-retention-filters) y **no se configuró ninguna tasa de trazas**. Estos tramos no se incluyen en las consultas de trazas, ya que las consultas de trazas requieren que todos los tramos de una traza estén indexados.
- `retained_by:trace_retention_filter` si el tramo es capturado por un filtro de retención para el cual se configuró una tasa de trazas.
- `retained_by:diversity_sampling` si el tramo fue capturado por [muestreo de diversidad](#diversity-sampling) (parte del [filtro de retención inteligente](#datadog-intelligent-retention-filter)).
- `retained_by:flat_sampled` si el tramo fue indexado por el [muestreo fijo del 1%](#one-percent-flat-sampling). Filtrar más por motivo de retención:
  - `@retention_reason:rum` para trazas vinculadas a sesiones de RUM muestreadas según el `session_id`. Use esto para analizar trazas correlacionadas con sesiones de usuario.
  - `@retention_reason:trace` para trazas muestreadas uniformemente según el `trace_id`. Use esto para tendencias generales de rendimiento y análisis de todo el sistema.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/trace_analytics.png" style="width:100%;" alt="Faceta Retenido por" >}}

### En los monitores de análisis de trazas{#in-trace-analytics-monitors}

Los tramos indexados por el filtro de retención inteligente están **excluidos** de la evaluación de monitores de análisis de trazas de APM.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_pipeline/
[2]: /es/tracing/trace_pipeline/metrics
[3]: https://app.datadoghq.com/apm/traces/retention-filters
[4]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[5]: /es/tracing/glossary/#service-entry-span
[6]: /es/tracing/trace_explorer/?tab=timeseriesview#indexed-spans-search-with-15-day-retention
[7]: /es/tracing/trace_explorer/?tab=listview#indexed-spans-search-with-15-day-retention
[8]: /es/tracing/glossary/#trace-root-span
[9]: /es/tracing/services/service_page/
[10]: /es/tracing/services/resource_page/
[11]: /es/tracing/trace_explorer/trace_queries
[12]: /es/tracing/trace_pipeline/ingestion_controls/
[13]: /es/tracing/trace_explorer/
[14]: /es/monitors/types/apm/?tab=traceanalytics
[15]: /es/synthetics/apm/
[16]: /es/security/application_security/
[17]: /es/dynamic_instrumentation/
[18]: https://app.datadoghq.com/apm/traces/retention-filters
[19]: /es/monitors/types/apm/?tab=traceanalytics
[20]: /es/tracing/other_telemetry/rum/