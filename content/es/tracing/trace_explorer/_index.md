---
aliases:
- /es/tracing/tracing_without_limits/
- /es/tracing/livesearch/
- /es/tracing/trace_search_and_analytics/
description: Trace Explorer
further_reading:
- link: tracing/trace_explorer/search
  tag: Documentación
  text: Buscar Tramos
- link: https://learn.datadoghq.com/courses/getting-started-apm
  tag: Centro de Aprendizaje
  text: Introducción a las Métricas y Trazas de APM
- link: https://learn.datadoghq.com/courses/diagnosing-bugs-with-apm
  tag: Centro de Aprendizaje
  text: Diagnóstico de Errores de Aplicación con Datadog APM
title: Trace Explorer
---
{{< img src="tracing/apm_lifecycle/trace_explorer.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Explorer" >}}

## Descripción General {#overview}

El [Trace Explorer][1] le brinda la capacidad de buscar todos los tramos ingeridos o indexados utilizando cualquier etiqueta en cualquier tramo. Los tramos encontrados por su consulta cambian dependiendo de si está buscando en Live (todos los tramos ingeridos en los últimos 15 minutos, en forma continua) o tramos indexados (tramos retenidos durante 15 días por sus filtros personalizados).

Las aplicaciones instrumentadas envían trazas a Datadog basadas en sus [controles de ingestión][2] configurados. Las trazas ingeridas están disponibles como trazas en vivo durante una ventana móvil de 15 minutos.

El Trace Explorer muestra un indicador de **Búsqueda en Vivo - Todos los datos ingeridos** cada vez que esté en modo en vivo:

{{< img src="tracing/trace_explorer/live_search.png" alt="Indicador de Búsqueda en Vivo" style="width:75%;" >}}

Todas las trazas ingeridas son luego procesadas a través de:
- [Filtros de retención personalizados][3] que puede crear para determinar qué tramos indexar. Una vez indexadas a través de un filtro de retención personalizado, las trazas se retienen durante **15 días**.
- El [filtro de retención inteligente][4] por defecto que retiene un conjunto diverso de trazas. Cuando se indexan a través del filtro de retención inteligente, las trazas se retienen durante **30 días**.

El Trace Explorer muestra un indicador de **Búsqueda - Solo Datos Indexados** cada vez que busque [tramos indexados][5]:

{{< img src="tracing/trace_explorer/historical_search.png" alt="Indicador de Solo Datos Indexados" style="width:75%;" >}}

La Búsqueda en Vivo es la vista predeterminada en la página de Trazas. Cambie de Búsqueda en Vivo a Búsqueda de Datos Indexados utilizando el selector de tiempo en la esquina superior derecha.

### Trace Patterns {#trace-patterns}

{{< callout url="https://www.datadoghq.com/product-preview/apm-trace-patterns/" btn_hidden="false" header="¡Únase a la Vista Previa!" >}}
Trace Patterns está en Vista Previa. Utilice este formulario para enviar su solicitud hoy.
{{< /callout >}}

Trace Patterns agrupa tramos con una estructura y atributos similares en patrones recurrentes, para que pueda analizar el comportamiento a través de miles de trazas a la vez en lugar de leerlas individualmente. Utilice Trace Patterns cuando una consulta devuelva demasiados tramos para escanear traza por traza, por ejemplo, para identificar qué formas de error son nuevas esta semana o qué patrones de latencia han cambiado después de un despliegue. 

### Control de volumen de trazas {#trace-volume-control}

Puede personalizar la configuración tanto para [ingestión y retención][6] para enviar y mantener exactamente los datos que son más relevantes para usted.

#### Ingestión {#ingestion}

Controle su volumen globalmente con [opciones de configuración del Datadog Agent][7] o establezca [reglas de ingestión][8] precisas por servicio instrumentado con Datadog APM.


#### Indexación {#indexing}

Después de instrumentar sus servicios e ingerir trazas, establezca filtros de retención basados en etiquetas dentro de la aplicación de Datadog para que Datadog retenga los tramos que sean relevantes para usted.

**Nota:** Tanto los tramos ingeridos como los indexados pueden afectar su factura. Para más información, consulte [Facturación de APM][9].

## Búsqueda en Vivo por 15 minutos {#live-search-for-15-minutes}

{{< img src="tracing/apm_lifecycle/trace_explorer_live_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Búsqueda en Vivo" >}}

Cuando utiliza Búsqueda en Vivo, Datadog muestra tramos tan pronto como son enviados por el Datadog Agent y antes de que hayan sido indexados por sus filtros de retención. Todos los tramos ingeridos están disponibles para los últimos 15 minutos (ventana móvil), mostrados sin ningún muestreo.

{{< tabs >}}
{{% tab "Vista de lista" %}}

{{< img src="tracing/live_search/live-search.mp4" alt="Vista de lista de búsqueda en vivo" video="true" >}}

Con la **Vista de lista**, puede:

- Verifique si un nuevo despliegue se realizó sin problemas filtrando por `version_id` de todas las etiquetas.
- Ver información relacionada con interrupciones en tiempo real buscando el 100% de las trazas ingeridas para un tramo particular `org_id` o `customer_id` que esté asociado con un tramo hijo problemático.
- Verifique si un proceso ha comenzado correctamente escribiendo `process_id` y autocompletando el nuevo ID de proceso como una etiqueta en los tramos hijos.
- Monitoree la prueba de carga y el impacto en el rendimiento en sus puntos de conexión filtrando por la duración de un recurso hijo.
- Ejecute consultas de búsqueda con un clic en cualquier tramo o etiqueta directamente desde la vista del panel de traza.
- Agregue, elimine y ordene columnas de etiquetas de tramo para una vista personalizada.

El número de tramos recibidos por segundo se muestra en la parte superior de la tabla de trazas. Dado que un flujo de miles de tramos por segundo no es legible para los humanos, los flujos de tramos de alto rendimiento muestran algunos tramos para mayor claridad visual. Puede buscar todos los tramos disponibles en la consulta de búsqueda. Utilice las funciones de filtrado de la barra de consulta de Búsqueda en Vivo para filtrar el flujo de tramos y el botón **Pausar/Reproducir** en la parte superior derecha de la pantalla para pausar o reanudar el flujo.

{{< img src="tracing/live_search/play-pause-button.png" alt="Pausar o Reproducir el Flujo en Vivo" style="width:75%;" >}}

**Nota**: Seleccionar cualquier tramo pausa el flujo y muestra más detalles sobre el tramo seleccionado en el panel lateral de traza.

{{% /tab %}}
{{% tab "Vista de series temporales" %}}

{{< img src="tracing/live_search/live-analytics.mp4" alt="Vista de series temporales de búsqueda en vivo" video="true" >}}

Visualice sus tramos como series temporales en lugar de una lista utilizando la **Vista de series temporales**. La vista de series temporales de búsqueda en vivo es útil para graficar solicitudes o errores que corresponden a criterios especificados, tales como:

- Errores para el `ShoppingCart##checkout` servicio y punto de conexión, con un valor de cart de al menos `$100`, con la capacidad de ver trazas que coincidan individualmente con estos criterios.

- Realice seguimiento de un despliegue canario de una actualización crítica de la aplicación en tiempo real.

- Comparar la latencia entre regiones geográficas limitadas a la última versión de su aplicación iOS.

Además de mostrar series temporales para las solicitudes que coinciden con sus consultas, también puede visualizar sus tramos como una lista de los clientes más afectados, Availability Zones, o cualquier otra etiqueta durante una interrupción o investigación.

**Nota:** La exportación a Dashboards y Monitors solo es posible utilizando tramos retenidos.

{{% /tab %}}
{{< /tabs >}}

### Filtrando {#filtering}

{{< img src="tracing/live_search/service_entry_root_spans.mp4" alt="Buscando todos los tramos" video="true" >}}

Una consulta válida en la barra de búsqueda muestra trazas que coinciden con sus criterios de búsqueda en **todos los tramos**. La sintaxis de búsqueda es la misma en las vistas de Búsqueda en Vivo que en las otras vistas de trazas, pero aquí, su consulta se compara con todas las trazas ingeridas en **cualquier tramo** y **cualquier etiqueta**, y no solo con las indexadas.

Puede elegir consultar los [tramos de entrada del servicio][10], los [tramos raíz][11], o todos los tramos cambiando la selección en el cuadro sobre la tabla de trazas. Utilice esta función en aplicaciones de alto tráfico para reducir el número de tramos mostrados y ver solo los tramos de punto de entrada de los servicios o el punto de entrada de la traza. Seleccionar este cuadro solo filtra los tramos mostrados en la lista; los otros aún se muestran en el gráfico de llamas al hacer clic en un tramo para ver los detalles de la traza.

También puede filtrar por atributos que no están definidos como facetas. Por ejemplo, para filtrar por el `cart.value` atributo, hay dos opciones:

- Haga clic en el `cart.value` atributo en el panel de detalles de la traza y agréguelo a la consulta de búsqueda:
{{< img src="tracing/live_search/add-attribute-to-query.mp4" alt="Agregando un atributo a la consulta" video="true" >}}

- Filtrar en todos los tramos con un `cart.value` atributo escribiendo "cart.value" en la barra de consulta de búsqueda:
{{< img src="tracing/live_search/filter-by-attribute2.mp4" alt="Filtro de Búsqueda en Vivo por atributo" video="true" >}}

### Analizando anomalías con información integrada {#analyzing-anomalies-with-integrated-insights}

Trace Explorer combina la detección automática de valores anómalos de Watchdog con el Análisis de etiquetas para ayudarle a identificar rápidamente la causa raíz de los problemas. Cuando Watchdog detecta etiquetas que están estadísticamente sobrerrepresentadas en errores o tramos de alta latencia, estos insights se muestran en múltiples lugares:

- **Sugerencias de búsqueda**: A medida que escribe en la barra de búsqueda, los valores anómalos de etiquetas aparecen como sugerencias con un indicador que muestra que están correlacionados con errores o problemas de latencia.
- **Recomendaciones de agrupación**: Al seleccionar atributos para agrupar, las facetas de valores anómalos se destacan para guiar su investigación.
- **Barra lateral de facetas**: Las etiquetas de valores anómalos se promueven a la parte superior de la lista de facetas en una sección dedicada de "VALORES ANÓMALOS".
- **Métricas RED**: El botón "Analizar" junto a los gráficos de errores y latencia se resalta cuando se detectan valores anómalos relevantes.

{{< img src="tracing/trace_explorer/visualize/trace_explorer_outliers.mp4" alt="Analizando anomalías con información integrada" video="true" >}}

## Búsqueda de tramos indexados con retención de 15 días {#indexed-spans-search-with-15-day-retention}

{{< img src="tracing/apm_lifecycle/trace_explorer_indexed_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Búsqueda indexada" >}}

Puede buscar trazas retenidas de la misma manera que realiza una Búsqueda en Vivo. Para cambiar de buscar datos en vivo a buscar datos retenidos, cambie el selector de tiempo a cualquier período de tiempo mayor a 15 minutos. Todos los tramos que están indexados por filtros de retención son accesibles desde la búsqueda. Estos tramos son mantenidos por Datadog durante 15 días después de ser indexados por un filtro de retención.

{{< img src="tracing/live_search/searching-retained-traces.mp4" alt="Buscando trazas retenidas" video="true" >}}

{{< tabs >}}
{{% tab "Vista de lista" %}}

Todos los tramos indexados por filtros de retención personalizados *y* el filtro de retención inteligente están disponibles para ser buscados en la vista de lista. Sin embargo, si filtra por una etiqueta que aparece únicamente en tramos que no están indexados por ningún filtro de retención, su búsqueda no devuelve resultados, a diferencia de cuando utiliza [Búsqueda en Vivo](#live-search-for-15-minutes).

{{% /tab %}}
{{% tab "Vista de series temporales" %}}

Todos los tramos indexados por filtros de retención personalizados o el filtro de retención inteligente están disponibles para ser buscados al usar análisis de trazas.

Desde la vista de series temporales, exporte su consulta a un [dashboard][1], [monitor][2] o [notebook][3] para investigar más a fondo o para alertar automáticamente cuando un número agregado de tramos cruza un umbral específico.

**Nota**: Los tramos indexados por el filtro de retención inteligente están excluidos de las evaluaciones de monitores de análisis de trazas APM. Para más información, consulte [Retención de Trazas][4].

[1]: /es/dashboards/widgets/timeseries/
[2]: /es/monitors/types/apm/?tab=analytics
[3]: /es/notebooks
[4]: /es/tracing/trace_pipeline/trace_retention/#trace-search-and-analytics-on-indexed-spans

{{% /tab %}}
{{< /tabs >}}

### Configuración de retención {#retention-configuration}

Puede personalizar qué tramos se retienen y a qué tasas de retención. Por defecto, se aplica [el filtro de retención inteligente de Datadog][4], que retiene automáticamente trazas con diversidad de errores y latencia, así como recursos de bajo rendimiento. Para aprender más sobre el filtro de retención inteligente por defecto y cómo crear sus propios filtros adicionales, consulte la [documentación de filtros de retención][3]. Vaya a la [página de Filtros de Retención][12] dentro de la aplicación de Datadog para crear o modificar sus propios filtros.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces
[2]: /es/tracing/trace_pipeline/ingestion_controls
[3]: /es/tracing/trace_pipeline/trace_retention/#retention-filters
[4]: /es/tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter
[5]: /es/tracing/glossary/#indexed-span
[6]: /es/tracing/trace_pipeline/
[7]: /es/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[8]: /es/tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[9]: /es/account_management/billing/apm_distributed_tracing/
[10]: /es/glossary/#service-entry-span
[11]: /es/glossary/#trace-root-span
[12]: https://app.datadoghq.com/apm/traces/retention-filters