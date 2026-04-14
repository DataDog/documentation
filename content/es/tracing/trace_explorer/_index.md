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
title: Trace Explorer
---

{{< img src="tracing/apm_lifecycle/trace_explorer.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Explorer" >}}

## Información general

El [Trace Explorer][1] te ofrece la posibilidad de buscar todos los tramos (spans) ingeridos o indexados mediante cualquier etiqueta en cualquier tramo. Los tramos encontrados por tu consulta cambian según si estás buscando tramos en Live (todos los tramos ingeridos en los últimos 15 minutos, de forma continua) o tramos indexados (tramos retenidos durante 15 días por tus filtros personalizados).

Las aplicaciones instrumentadas envían trazas a Datadog en función de los [controles de ingesta][2] configurados. Las trazas ingestadas están disponibles como trazas en directo durante un periodo de 15 minutos.

El Trace Explorer muestra un indicador **Live Search - All ingested data** (Live Search: todos los datos ingeridos) siempre que se encuentre en el modo Live:

{{< img src="tracing/trace_explorer/live_search.png" alt="Indicador de Live Search" style="width:75%;" >}}

Todas las trazas ingeridas se pasan mediante:
- [Filtros de retención personalizados][3] que puedes crear para determinar qué tramos indexar. Una vez indexadas a través de un filtro de retención personalizado, las trazas se conservan durante **15 días**.
- El [filtro de retención inteligente][4] predeterminado que retiene un conjunto diverso de trazas. Cuando se indexa a través del filtro de retención inteligente, las trazas se retienen durante **30 días**.

El Trace Explorer muestra un indicador **Search - Only Indexed Data** (Búsqueda: solo los datos indexados) siempre que buscas [tramos indexados][5]:

{{< img src="tracing/trace_explorer/historical_search.png" alt="Indicador Solo datos indexados" style="width:75%;" >}}

Live Search es la vista por defecto en la página Traces (Trazas). Cambia de Live Search a Indexed Data Search (Búsqueda de datos indexados) utilizando el selector de tiempo situado en la esquina superior derecha.

### Control del volumen de traza

Puedes personalizar la configuración tanto de [ingesta como de retención][6] para enviar y conservar exactamente los datos que más te interesan.

#### Ingesta

Controla tu volumen globalmente con [las opciones de configuración del Datadog Agent][7] o establece [reglas de ingesta][8] precisas por servicio instrumentado con Datadog APM.


#### Indexación

Después de instrumentar servicios e ingerir trazas, establece etiquetas basadas en [filtros de retención][3] dentro de la aplicación de Datadog para que Datadog retenga tramos que sean relevantes para ti.

**Nota:** Tanto la ingesta como la indexación de tramos pueden afectar a tu factura. Para más información, consulta [Facturación de APM][9].

## Live Search durante 15 minutos

{{< img src="tracing/apm_lifecycle/trace_explorer_live_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Live Search" >}}

Cuando se utiliza Live Search, Datadog muestra tramos tan pronto como son enviados por el Datadog Agent y antes de que hayan sido indexados por tus filtros de retención. Todos los tramos ingeridos están disponibles para los últimos 15 minutos (intervalo fijo), mostrados sin ningún muestreo.

{{< tabs >}}
{{% tab "List view" %}}

{{< img src="tracing/live_search/live-search.mp4" alt="Vista de Lista de Live Search" video="true" >}}

Con la **Vista de lista**, puedes:

- Monitoriza si un nuevo despliegue ha funcionado correctamente al filtrar en `version_id` todas las etiquetas.
- Ve la información relacionada con las interrupciones en tiempo real al buscar en el 100% de las trazas ingeridas un `org_id` o `customer_id` concreto que esté asociado a un tramo secundario problemático.
- Comprueba si un proceso se ha iniciado correctamente al escribir `process_id` y autocompletar el nuevo ID de proceso como una etiquetar en los tramos secundarios.
- Monitoriza la prueba de carga y el impacto en el rendimiento de tus endpoints al filtrar por la duración de un recurso secundario.
- Ejecuta consultas de búsqueda con un solo clic en cualquier tramo o etiqueta directamente desde la vista del panel de traza.
- Añade, elimina y ordena columnas de span tags para obtener una vista personalizada.

El número de tramos recibidos por segundo se muestra en la parte superior de la tabla de trazas. Dado que un flujo (stream) de miles de tramos por segundo no es legible para las personas, los flujos de tramos de alto rendimiento muestran algunos tramos para mayor claridad visual. Puedes buscar todos los tramos disponibles en la consulta de búsqueda. Utiliza las funciones de filtrado de la barra de consulta de Live Search para filtrar el flujo de tramos y el botón **Pause/Play** (Pausa/Reproducción) situado en la parte superior derecha de la pantalla para pausar o reanudar el flujo.

{{< img src="tracing/live_search/play-pause-button.png" alt="Pausar o reproducir el flujo" style="width:75%;" >}}

**Nota**: Al seleccionar cualquier tramo, se pausa el flujo y se muestran más detalles sobre el tramo seleccionado en el panel lateral de la traza.

{{% /tab %}}
{{% tab "Timeseries View" %}}

{{< img src="tracing/live_search/live-analytics.mp4" alt="Ventana de series temporales en Live Search" video="true" >}}

Visualiza tus tramos como series temporales en lugar de una lista utilizando la **vista de series temporales**. La vista de series temporales de Live Search es útil para crear gráficas de solicitudes o errores que corresponden a criterios especificados, como:

- Errores para el servicio `ShoppingCart##checkout` y el endpoint, con un valor de carrito de al menos `$100`, con la posibilidad de ver trazas que coincidan con estos criterios individualmente.

- Monitoriza un despliegue canary de una actualización de aplicación crítica en tiempo real.

- Compara la latencia entre regiones geográficas con la última versión de tu aplicación para iOS.

Además de mostrar las series temporales de las solicitudes que coinciden con tus consultas, también puedes visualizar tus tramos como una lista de principales clientes más afectados, zonas de disponibilidad o cualquier otra etiqueta durante una interrupción o investigación.

**Nota:** La exportación a dashboards y monitores solo es posible utilizando tramos conservados.

{{% /tab %}}
{{< /tabs >}}

### Filtrado

{{< img src="tracing/live_search/service_entry_root_spans.mp4" alt="Buscar todos los tramos" video="true" >}}

Una consulta válida en la barra de búsqueda muestra trazas que coinciden con tus criterios de búsqueda en **todos los tramos**. La sintaxis de búsqueda es la misma en las vistas de Live Search que en las otras vistas de traza, pero aquí la consulta se compara con todas las entradas de trazas en **cualquier tramo** y **cualquier etiqueta**, y no solo con las indexadas.

Puedes elegir consultar los [tramos de entrada del servicio][10], los [tramos raíz][11], o todos los tramos cambiando la selección de la casilla situada encima de la tabla de traza. Utiliza esta función en aplicaciones con mucho tráfico para reducir el número de tramos mostrados y para ver solo los tramos de punto de entrada de los servicios o el punto de entrada de la traza. Al seleccionar esta casilla, solo se filtran los tramos mostrados en la lista; los demás se siguen mostrando en la gráfica de llamas al hacer clic en un tramo para ver los detalles de traza.

También puedes filtrar por atributos que no estén definidos como facetas. Por ejemplo, para filtrar en el atributo `cart.value`, hay dos opciones:

- Haz clic en el atributo `cart.value` del panel de detalles de traza y añádelo a la consulta de búsqueda:
{{< img src="tracing/live_search/add-attribute-to-query.mp4" alt="Añadir un atributo a la consulta" video="true" >}}

- Filtra en todos los tramos con un atributo `cart.value` al escribir "cart.value" en la barra de consulta de búsqueda:
{{< img src="tracing/live_search/filter-by-attribute2.mp4" alt="Filtro Live Search por atributo" video="true" >}}

## Búsqueda de tramos indexados con 15 días de retención

{{< img src="tracing/apm_lifecycle/trace_explorer_indexed_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Búsqueda indexada" >}}

Puedes buscar trazas retenidas de la misma manera que en Live Search. Para pasar de buscar datos en directo a buscar datos retenidos, cambia el selector de tiempo a cualquier periodo superior a 15 minutos. Todos los tramos indexados por filtros de retención son accesibles desde la búsqueda. Estos tramos son conservados por Datadog durante 15 días después de ser indexados por un filtro de retención.

{{< img src="tracing/live_search/searching-retained-traces.mp4" alt="Buscar trazas retenidas" video="true" >}}

{{< tabs >}}
{{% tab "List view" %}}

Todos los tramos indexados por filtros de retención personalizados *y* el filtro de retención inteligente están disponibles para su búsqueda en la Vista de lista. Sin embargo, si filtras por una etiqueta que aparece solo en tramos que no están indexados por ningún filtro de retención, tu búsqueda no devuelve ningún resultado, a diferencia de cuando se utiliza [Live Search](#live-search-for-15-minutes).

{{% /tab %}}
{{% tab "Timeseries View" %}}

Todos los tramos indexados por filtros de retención personalizados o el filtro de retención inteligente están disponibles para su búsqueda cuando se utiliza el análisis de trazas.

Desde la vista de series temporales, exporta tu consulta a un [dashboard][1], [monitor][2], o [notebook][3] para investigar más en detalle o para alertar automáticamente cuando un número agregado de tramos cruce un umbral específico.

**Nota**: Los tramos indexados por el filtro de retención inteligente se excluyen de las evaluaciones del monitor de análisis de trazas de APM. Para obtener más información, consulta [Retención de trazas][4].

[1]: /es/dashboards/widgets/timeseries/
[2]: /es/monitors/types/apm/?tab=analytics
[3]: /es/notebooks
[4]: /es/tracing/trace_pipeline/trace_retention/#trace-search-and-analytics-on-indexed-spans

{{% /tab %}}
{{< /tabs >}}

### Configuración de retención

Puedes personalizar qué tramos se retienen y con qué frecuencia de retención. Por defecto, se aplica [el filtro de retención inteligente de Datadog ][4], que retiene automáticamente trazas con diversidad de errores y latencia, así como recursos de bajo rendimiento. Para obtener más información sobre el filtro de retención inteligente predeterminado y sobre cómo crear tus propios filtros adicionales, consulta la [documentación sobre filtros de retención][3]. Ve a la página [Filtros de retención][12] dentro de la aplicación de Datadog para crear o modificar tus propios filtros.

## Referencias adicionales

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
