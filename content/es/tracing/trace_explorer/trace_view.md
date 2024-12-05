---
algolia:
  tags:
  - vista de trazas
aliases:
- /es/tracing/visualization/trace/
further_reading:
- link: /tracing/trace_collection/
  tag: Documentación
  text: Aprender a configurar el rastreo de APM con tu aplicación
- link: /tracing/service_catalog/
  tag: Documentación
  text: Descubrir y catalogar los servicios que informan a Datadog
- link: /tracing/services/service_page/
  tag: Documentación
  text: Más información sobre servicios en Datadog
- link: /tracing/services/resource_page/
  tag: Documentación
  text: Profundizar en el rendimiento de tus recursos y trazas
- link: /tracing/trace_explorer/trace_view/
  tag: Documentación
  text: Comprender cómo leer una traza de Datadog
title: Vista de trazas
---

{{< img src="tracing/trace_view/trace_view.png" alt="Vista de trazas" style="width:90%;">}}

## Información general

Visualiza una [traza][1] (trace) individual para ver todos sus [tramos][2] (spans) y metadatos asociados. Cada traza puede visualizarse como gráfica de llamas, lista de tramos, cascada o mapa.

El encabezado de traza muestra información crítica de la traza, como el nombre de servicio del tramo raíz, el nombre del recurso, ID de traza, la duración de extremo a extremo de la traza y la hora de inicio de la traza. Para obtener un enlace permanente a la traza, haz clic en **Open Full Page** (Abrir página completa) y guarda la URL.

{{< img src="tracing/trace_view/trace_header.png" alt="Encabezado de traza" style="width:90%;">}}


## Visualizaciones de traza

{{< tabs >}}
{{% tab "Flame Graph" %}}

{{< img src="tracing/trace_view/flamegraph.png" alt="Gráfica de llamas" style="width:90%;">}}

La gráfica de llamas es la visualización por defecto que muestra todos los tramos codificados por colores de una traza en una línea de tiempo. Esto resulta útil para comprender la ruta de ejecución de una solicitud y en qué se empleó el tiempo en una traza.

Para navegar por la gráfica, desplázate para ampliar, haz clic y arrastra para desplazarte, y utiliza el minimapa para ampliar en el tramo seleccionado o para alejarte hacia la traza completa.

La leyenda detalla el código de colores de la gráfica de llamas. Agrupa tramos por **servicio** (por defecto), **host** o **contenedor**. Elige mostrar el porcentaje de tiempo de ejecución de la traza (**% Exec Time**) o el recuento de tramos (**Spans**) por grupo. Si existen errores en tramos en la traza, resáltalos en la gráfica de llamas seleccionando la casilla **Errors** (Errores) en **Filter Spans** (Filtrar tramos).

{{< img src="tracing/trace_view/flamegraph_legend.mp4" alt="Leyenda de la gráfica de llamas" video="true" style="width:90%;">}}


{{% /tab %}}
{{% tab "Span List" %}}

{{< img src="tracing/trace_view/spanlist.png" alt="Vista de trazas" style="width:90%;">}}

Muestra [recursos][1] por grupo ([servicio][2] por defecto) y los ordena según su recuento de tramos. Esta visualización es útil para explorar la información de latencia por recurso o agrupación.

Filtra los recursos por tipo o información de nomenclatura mediante los botones correspondientes y la búsqueda basada en texto.

{{< img src="tracing/trace_view/spanlist_headers.png" alt="Encabezados de lista de tramo" style="width:90%;">}}

Los grupos pueden ordenarse haciendo clic en el encabezado de columna correspondiente: **RESOURCE**, **SPANS**, duración media (**AVG DURATION**), tiempo de ejecución (**EXEC TIME**) o porcentaje del tiempo de ejecución de la traza (**% EXEC TIME**).

[1]: /es/tracing/glossary/#resources
[2]: /es/tracing/glossary/#services
{{% /tab %}}
{{% tab "Waterfall" %}}

{{< img src="tracing/trace_view/waterfall2.png" alt="Cascada" style="width:100%;">}}

Muestra todos los tramos de una traza en una línea de tiempo en la que cada fila corresponde a un tramo. Esta visualización es útil para aislar y centrarse en las partes relevantes de una traza.

Cada fila (tramo) indica lo siguiente:

- **Duración relativa del tramo**: la longitud de la barra coloreada corresponde al porcentaje de la duración total de la traza.
- **Duración absoluta del tramo**: el tiempo absoluto en milisegundos (ms).
- **Detalles de tramo**: se muestran el nombre de servicio y el nombre del recurso correspondientes.
- **Estados**: cuando corresponda, se mostrará un código de estado HTTP.
- **Codificación por colores**: los tramos se codifican por colores según el servicio (por defecto), host o contenedor. Para cambiar la codificación por colores de los tramos, utiliza el menú desplegable **Color by** (Codificación de color por).

Para expandir u ocultar los descendientes de tramo, haz clic en el icono de chevrón (>) de una fila. Para expandir o contraer todos los tramos, haz clic en los botones **Expand all** (+) (Expandir todo) o **Collapse all** (-) (Colapsar todo).

{{% /tab %}}
{{% tab "Map" %}}

{{< img src="tracing/trace_view/map.png" alt="Mapa" style="width:90%;">}}

Muestra una representación de todos los servicios involucrados en la traza. Esta visualización es útil para obtener una visión general de las dependencias del servicio y el ciclo de vida de las transacciones a nivel de servicio.

Pasa el ratón por encima de un servicio para resaltar el tramo principal y los secundarios, y haz clic en él para centrarte en el tramo de entrada del servicio.

{{% /tab %}}
{{< /tabs >}}

## Más información

La parte inferior ajustable en altura de la vista de traza muestra la información seleccionada del tramo y la traza.

El encabezado de tramo contiene nombres de servicio, operaciones y recursos del tramo seleccionado, así como información sobre la latencia. Desplázate a otras partes de la plataforma o acota tu búsqueda de [Trace Explorer][5] haciendo clic en la píldora de nomenclatura.

{{< img src="tracing/trace_view/span_header.png" alt="Encabezado de tramo" style="width:90%;">}}

{{< tabs >}}
{{% tab "Span Info" %}} 

Ve todos los metadatos del tramo, incluidas las etiquetas personalizadas. Haz clic en una etiqueta de tramo para actualizar la consulta de búsqueda de Trace Explorer o copia el valor de la etiqueta en el portapapeles.

Se puede mostrar otra información en diversas condiciones:
- Un mensaje de advertencia git (cuando falta información git en un CI Test)
- Marcas de consulta SQL (en una consulta SQL)
- Contexto y metadatos RUM (en un tramo RUM)
- Métricas de Spark (en un tramo de trabajo de Spark)

{{< img src="tracing/trace_view/info_tab.png" alt="Pestaña de información del tramo" style="width:90%;">}}

[1]: /es/tracing/glossary/#trace
{{% /tab %}}
{{% tab "Infrastructure" %}}

Alterna entre información de infraestructura de nivel de host y nivel de contenedor (cuando esté disponible) para el tramo seleccionado.

Ve las etiquetas asociadas, así como los gráficos de métricas críticas de host/contenedor, incluyendo CPU, Memoria y E/S con una superposición de cuándo ocurrió la traza.

{{< img src="tracing/trace_view/infrastructure_tab.png" alt="Pestaña de infraestructura" style="width:90%;">}}

{{% /tab %}}
{{% tab "Logs" %}}

Ve logs relacionados con tu servicio en el momento de la traza. Cuando pasas el ratón por encima de un log, aparece una línea que muestra su marca temporal en el gráfico de llamas de la traza. Si haces clic en el log, accederás a la [búsqueda del Log Explorer][1].

{{< img src="tracing/trace_view/logs_tab.png" alt="Pestaña de logs" style="width:90%;">}}


[1]: /es/logs/explorer/search/
{{% /tab %}}
{{% tab "Processes" %}}

Haz clic en el tramo de un servicio para ver los procesos que se ejecutan en la infraestructura subyacente. Los procesos de tramo de un servicio se correlacionan con los hosts o pods en los que se ejecuta el servicio en el momento de la solicitud. Analiza métricas de proceso como CPU y memoria RSS junto con errores a nivel de código para distinguir entre problemas de infraestructura específicos de la aplicación y más amplios. Al hacer clic en un proceso, accederás a la [página de Live Processes][1]. Para ver los procesos específicos del tramo, activa la [recopilación de procesos][2]. Los procesos relacionados no son compatibles con trazas de navegador y serverless.

{{< img src="tracing/trace_view/processes_tab.png" alt="Pestaña de procesos" style="width:90%;">}}

[1]: https://docs.datadoghq.com/es/infrastructure/process/?tab=linuxwindows
[2]: https://docs.datadoghq.com/es/infrastructure/process/?tab=linuxwindows#installation
{{% /tab %}}

{{% tab "Network" %}}

Haz clic en un tramo del servicio para ver dependencias de red del servicio que realiza la solicitud. Utiliza las métricas de rendimiento de red claves como el volumen, los errores (retransmisiones TCP) y latencia de red (tiempo de ida y vuelta TCP) para diferenciar entre problemas específicos de la aplicación y generales de la red, especialmente cuando no se han generado errores de código. Por ejemplo, puedes utilizar la telemetría de red para determinar si una alta latencia de solicitud se debe a una sobrecarga de tráfico de la aplicación pertinente, o a dependencias defectuosas con un pod de descarga, grupo de seguridad o cualquier otro endpoint etiquetado. Si haces clic en el proceso, accederás a la página [Network Analytics][1]. Para ver procesos específicos del tramo, activa [Network Performance Monitoring][2].

**Nota**: La telemetría relacionada con la red no es compatible actualmente con las trazas serverless.

{{< img src="tracing/trace_view/network_tab.png" alt="Pestaña de red" style="width:90%;">}}

[1]: /es/network_monitoring/performance/network_analytics
[2]: /es/network_monitoring/performance/setup
{{% /tab %}}

{{% tab "Security" %}}

Consulta los intentos de ataque dirigidos a los servicios de la traza distribuida. Puedes ver el patrón utilizado por el atacante, la regla que detecta el ataque y si el atacante encontró una vulnerabilidad en tu servicio.

Haz clic en **View in ASM** (Ver en ASM) para investigar más en detalle con [Datadog Application Security Management][1].

{{< img src="tracing/trace_view/security_tab.png" alt="Pestaña de seguridad" style="width:90%;">}}

[1]: /es/security/application_security/how-appsec-works/
{{% /tab %}}
{{% tab "Code Hotspots" %}}

Ve [Hotspots de código][1] para identificar las líneas de código relacionadas con problemas de rendimiento. Los valores de la izquierda representan el tiempo empleado en cada llamada al método durante el tramo seleccionado.

{{< img src="profiler/code_hotspots_tab.png" alt="Pestaña Hotspots de código que muestra el tiempo empleado en cada método para un tramo seleccionado" style="width:90%;">}}

[1]: /es/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces

{{% /tab %}}
{{% tab "Span Links (Beta)" %}}

<div class="alert alert-info">La compatibilidad con enlaces de tramo está en fase beta.</div>

[Los enlaces de tramo][4] correlacionan uno o más tramos juntos que están causalmente relacionados, pero no tienen una relación típica principal-secundario.

Haz clic en un tramo en la gráfica de llamas para mostrar tramos conectados con enlaces de tramo:

{{< img src="tracing/span_links/span_links_tab.png" alt="Pestaña de enlace de tramo" style="width:90%;">}}

**Nota**: Los enlaces de tramo solo se muestran cuando los tramos correspondientes se ingieren e indexan, por ejemplo, con un [filtro de retención][1].

Para saber más sobre los enlaces de tramo y cómo añadirlos con instrumentación personalizada, lee [Enlaces de tramo][4].

[1]: /es/tracing/trace_pipeline/trace_retention/
[2]: /es/tracing/trace_collection/custom_instrumentation/php#adding-span-links-beta
[3]: /es/tracing/trace_collection/otel_instrumentation/java#requirements-and-limitations
[4]: /es/tracing/trace_collection/span_links/

{{% /tab %}}
{{< /tabs >}}

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#trace
[2]: /es/tracing/glossary/#spans
[3]: /es/tracing/glossary/#services
[4]: /es/tracing/glossary/#resources
[5]: /es/tracing/trace_explorer