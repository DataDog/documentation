---
aliases:
- /es/tracing/tracing_without_limits/
- /es/tracing/livesearch/
- /es/tracing/trace_search_and_analytics/
description: Trace Explorer
further_reading:
- link: tracing/trace_explorer/search
  tag: Documentación
  text: Buscar tramos
- link: https://learn.datadoghq.com/courses/getting-started-apm
  tag: Centro de aprendizaje
  text: Introducción a las métricas y trazas de APM
- link: https://learn.datadoghq.com/courses/diagnosing-bugs-with-apm
  tag: Centro de aprendizaje
  text: Diagnóstico de errores de aplicación con Datadog APM
title: Trace Explorer
---
{{< img src="tracing/apm_lifecycle/trace_explorer.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Explorer" >}}

## Descripción general {#overview}

El Trace Explorer le brinda la capacidad de buscar todos los tramos ingeridos o indexados utilizando cualquier etiqueta en cualquier tramo. Los tramos encontrados por su consulta cambian dependiendo de si está buscando en vivo (todos los tramos ingeridos en los últimos 15 minutos, de forma continua) o tramos indexados (tramos conservados durante 15 días por sus filtros personalizados).

Las aplicaciones instrumentadas envían trazas a Datadog según sus [controles de ingestión][2] configurados. Las trazas ingeridas están disponibles como trazas en vivo durante una ventana continua de 15 minutos.

El Trace Explorer muestra un indicador {{< ui >}}Live Search - All ingested data{{< /ui >}} siempre que se encuentre en Live mode:

{{< img src="tracing/trace_explorer/live_search.png" alt="Indicador de Live Search" style="width:75%;" >}}

Todas las trazas ingeridas pasan luego a través de:
- [Filtros de retención personalizados][3] que puede crear para determinar qué tramos indexar. Una vez indexados mediante un filtro de retención personalizado, las trazas se conservan durante **15 días**.
- El [filtro de retención inteligente][4] predeterminado que conserva un conjunto diverso de trazas. Cuando se indexan mediante el filtro de retención inteligente, las trazas se conservan durante **30 días**.

El Trace Explorer muestra un indicador {{< ui >}}Search - Only Indexed Data{{< /ui >}} siempre que busca [tramos indexados][5]:

{{< img src="tracing/trace_explorer/historical_search.png" alt="Indicador de Solo datos indexados" style="width:75%;" >}}

Live Search es la vista predeterminada en la página de Traces. Cambie de Live Search a Indexed Data Search mediante el selector de tiempo en la esquina superior derecha.

### Trace Patterns {#trace-patterns}

{{< callout url="https://www.datadoghq.com/product-preview/apm-trace-patterns/" btn_hidden="false" header="¡Únase a la vista previa!" >}}
Trace Patterns está en versión preliminar. Utilice este formulario para enviar su solicitud hoy mismo.
{{< /callout >}}

Trace Patterns agrupa tramos con estructuras y atributos similares en patrones recurrentes, para que pueda analizar el comportamiento en miles de trazas a la vez en lugar de leerlos individualmente. Utilice Trace Patterns cuando una consulta devuelva demasiados tramos para analizar traza por traza, como para encontrar qué formas de error son nuevas esta semana o qué patrones de latencia cambiaron después de una implementación. 

### Control de volumen de trazas {#trace-volume-control}

Puede personalizar la configuración tanto para la [ingestión como para la retención][6] para enviar y conservar exactamente los datos que sean más relevantes para usted.

#### Ingestión {#ingestion}

Controle su volumen globalmente con las [opciones de configuración del Datadog Agent][7] o establezca [reglas de ingestión][8] precisas por servicio instrumentado con Datadog APM.


#### Indexación {#indexing}

Después de instrumentar sus servicios e ingerir trazas, establezca [filtros de retención][3] basados en etiquetas dentro de la aplicación de Datadog para que Datadog retenga los tramos que sean relevantes para usted.

**Nota:** Tanto los tramos ingeridos como los indexados pueden afectar su factura. Para obtener más información, consulte [APM Billing][9].

## Live Search for 15 minutes {#live-search-for-15-minutes}

{{< img src="tracing/apm_lifecycle/trace_explorer_live_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Live Search" >}}

Cuando utiliza Live Search, Datadog muestra los tramos tan pronto como son enviados por el Datadog Agent y antes de que hayan sido indexados por sus filtros de retención. Todos los tramos ingeridos están disponibles durante los últimos 15 minutos (ventana móvil), mostrados sin ningún muestreo.

{{< tabs >}}
{{% tab "Visualización de lista" %}}

{{< img src="tracing/live_search/live-search.mp4" alt="Vista de lista de Live Search" video="true" >}}

Con {{< ui >}}List view{{< /ui >}}, usted puede:

- Hacer un seguimiento de si una nueva implementación se realizó sin problemas filtrando por `version_id` de todas las etiquetas.
- Visualizar información relacionada con interrupciones en tiempo real buscando en el 100% de las trazas ingeridas un `org_id` o `customer_id` particular que esté asociado con un tramo secundario problemático.
- Verificar si un proceso se ha iniciado correctamente escribiendo `process_id` y autocompletando el nuevo ID de proceso como una etiqueta en los tramos secundarios.
- Hacer un seguimiento de la prueba de carga y el impacto en el rendimiento de sus puntos de conexión filtrando por la duración de un recurso secundario.
- Ejecute consultas de búsqueda con un solo clic en cualquier tramo o etiqueta directamente desde la vista del panel de trazas.
- Agregue, elimine y ordene columnas de etiquetas de tramo para una vista personalizada.

El número de tramos recibidos por segundo se muestra en la parte superior de la tabla de trazas. Dado que un flujo de miles de tramos por segundo no es legible para los humanos, los flujos de tramos de alto rendimiento muestran algunos tramos para mayor claridad visual. Puede buscar todos los tramos disponibles en la consulta de búsqueda. Utilice las funciones de filtrado de la barra de consulta de Live Search para filtrar el flujo de tramos y el botón {{< ui >}}Pause/Play{{< /ui >}} en la parte superior derecha de la pantalla para pausar o reanudar el flujo.

{{< img src="tracing/live_search/play-pause-button.png" alt="Pausar o reproducir el flujo en vivo" style="width:75%;" >}}

**Nota**: Seleccionar cualquier tramo pausa el flujo y muestra más detalles sobre el tramo seleccionado en el panel lateral de trazas.

{{% /tab %}}
{{% tab "Vista de series temporales" %}}

{{< img src="tracing/live_search/live-analytics.mp4" alt="Vista de series temporales de Live Search" video="true" >}}

Visualice sus tramos como series temporales en lugar de una lista usando {{< ui >}}Timeseries view{{< /ui >}}. La vista de series temporales de Live Search es útil para graficar solicitudes o errores que corresponden a criterios especificados, tales como:

- Errores para el servicio y punto de conexión `ShoppingCart##checkout`, con un valor de carrito de al menos `$100`, con la capacidad de visualizar individualmente las trazas que coinciden con estos criterios.

- Haga un seguimiento de una implementación canary de una actualización de aplicación crítica en tiempo real.

- Compare la latencia entre regiones geográficas delimitadas a la última versión de su aplicación iOS.

Además de mostrar series temporales para las solicitudes que coinciden con sus consultas, también puede visualizar sus tramos como una lista principal de los clientes, zonas de disponibilidad o cualquier otra etiqueta durante una interrupción o investigación.

**Nota:** La exportación a dashboards y monitors solo es posible utilizando tramos retenidos.

{{% /tab %}}
{{< /tabs >}}

### Filtrado {#filtering}

{{< img src="tracing/live_search/service_entry_root_spans.mp4" alt="Búsqueda de todos los tramos" video="true" >}}

Una consulta válida en la barra de búsqueda muestra las trazas que coinciden con sus criterios de búsqueda en **todos los tramos**. La sintaxis de búsqueda es la misma en las vistas de Live Search que en las otras vistas de trazas, pero aquí, su consulta se compara con todas las trazas ingeridas en **cualquier tramo** y **cualquier etiqueta**, y no solo con las indexadas.

Puede elegir consultar los [tramos de entrada de servicio][10], los [tramos raíz][11] o todos los tramos cambiando la selección en el cuadro sobre la tabla de trazas. Utilice esta función en aplicaciones de alto tráfico para reducir la cantidad de tramos mostrados y ver solo los tramos de punto de entrada de los servicios o el punto de entrada de la traza. Seleccionar este cuadro solo filtra los tramos que se muestran en la lista; los demás se siguen mostrando en el flame graph al hacer clic en un tramo para ver los detalles de la traza.

También puede filtrar por atributos que no están definidos como facetas. Por ejemplo, para filtrar por el atributo `cart.value`, hay dos opciones:

- Haga clic en el atributo `cart.value` en el panel de detalles de la traza y agréguelo a la consulta de búsqueda:
{{< img src="tracing/live_search/add-attribute-to-query.mp4" alt="Agregar un atributo a la consulta" video="true" >}}

- Filtre todos los tramos con un atributo `cart.value` escribiendo "cart.value" en la barra de consulta de búsqueda:
{{< img src="tracing/live_search/filter-by-attribute2.mp4" alt="Filtro de Live Search por atributo" video="true" >}}

### Análisis de anomalías con información integrada {#analyzing-anomalies-with-integrated-insights}

El Trace Explorer combina la detección automatizada de valores anómalos de Watchdog con el análisis de etiquetas para ayudarle a identificar rápidamente la causa raíz de los problemas. Cuando Watchdog detecta etiquetas que están estadísticamente sobrerrepresentadas en errores o tramos de alta latencia, esta información aparece en varios lugares:

- **Sugerencias de búsqueda**: A medida que escribe en la barra de búsqueda, las etiquetas de valores anómalos aparecen como sugerencias con un indicador que muestra que están correlacionadas con errores o problemas de latencia.
- **Recomendaciones de agrupación**: Al seleccionar atributos para agrupar, las facetas de valores anómalos se resaltan para guiar su investigación.
- **Barra lateral de facetas**: Las etiquetas de valores anómalos se promocionan a la parte superior de la lista de facetas en una sección dedicada de "VALORES ANÓMALOS".
- **Métricas RED**: El botón "Analizar" junto a los gráficos de error y latencia se resalta cuando se detectan valores anómalos relevantes.

{{< img src="tracing/trace_explorer/visualize/trace_explorer_outliers.mp4" alt="Análisis de anomalías con información integrada" video="true" >}}

<div class="alert alert-tip">Cuando ordene la lista de trazas por <strong>Duración</strong>, haga clic en <strong>Investigar con Bits AI</strong> para iniciar una investigación automatizada de latencia. Bits AI analiza los cuellos de botella y la divergencia de etiquetas en las trazas mostradas. Para obtener más información, consulte <a href="/bits_ai/bits_chat/">Bits Chat</a>.</div>

## Búsqueda de tramos indexados con retención de 15 días {#indexed-spans-search-with-15-day-retention}

{{< img src="tracing/apm_lifecycle/trace_explorer_indexed_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Búsqueda indexada" >}}

Puede buscar trazas retenidas de la misma manera que lo hace con una búsqueda en vivo (Live Search). Para cambiar de la búsqueda de datos en vivo a la búsqueda de datos retenidos, cambie el selector de tiempo a cualquier período superior a 15 minutos. Todos los tramos que están indexados por filtros de retención son accesibles desde la búsqueda. Estos tramos son conservados por Datadog durante 15 días después de ser indexados por un filtro de retención.

{{< img src="tracing/live_search/searching-retained-traces.mp4" alt="Búsqueda de trazas retenidas" video="true" >}}

{{< tabs >}}
{{% tab "Visualización de lista" %}}

Todos los tramos indexados por filtros de retención personalizados *y* el filtro de retención inteligente están disponibles para ser buscados en la vista de lista. Sin embargo, si filtra por una etiqueta que aparece solo en tramos que no están indexados por ningún filtro de retención, su búsqueda no devuelve ningún resultado, a diferencia de cuando utiliza [Live Search](#live-search-for-15-minutes).

{{% /tab %}}
{{% tab "Vista de series temporales" %}}

Todas las trazas indexadas por filtros de retención personalizados o el filtro de retención inteligente están disponibles para ser buscadas al utilizar el análisis de trazas.

Desde la vista de series temporales, exporte su consulta a un [dashboard][1], [monitor][2] o [notebook][3] para investigar más a fondo o para alertar automáticamente cuando un número agregado de trazas supere un umbral específico.

**Nota**: Las trazas indexadas por el filtro de retención inteligente están excluidas de las evaluaciones de monitor de análisis de trazas de APM. Para obtener más información, consulte [Retención de trazas][4].

[1]: /es/dashboards/widgets/timeseries/
[2]: /es/monitors/types/apm/?tab=analytics
[3]: /es/notebooks
[4]: /es/tracing/trace_pipeline/trace_retention/#trace-search-and-analytics-on-indexed-spans

{{% /tab %}}
{{< /tabs >}}

### Configuración de retención {#retention-configuration}

Puede personalizar qué trazas se retienen y a qué tasas de retención. De forma predeterminada, se aplica [el filtro de retención inteligente de Datadog][4], el cual conserva automáticamente las trazas con errores y diversidad de latencia, así como los recursos de bajo rendimiento. Para obtener más información sobre el filtro de retención inteligente predeterminado y cómo crear sus propios filtros adicionales, consulte la [documentación de filtros de retención][3]. Vaya a la [página de Filtros de retención][12] dentro de la aplicación de Datadog para crear o modificar sus propios filtros.

## Lecturas adicionales {#further-reading}

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