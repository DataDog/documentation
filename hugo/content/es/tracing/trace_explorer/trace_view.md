---
algolia:
  tags:
  - trace view
aliases:
- /es/tracing/visualization/trace/
description: Visualice y analice trazas individuales usando Flame Graphs, Span Lists,
  Waterfall y Trace Map con información detallada de tramos.
further_reading:
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: Blog
  text: 'Del rendimiento al impacto: conectando a los equipos de frontend a través
    de un contexto compartido.'
- link: /tracing/trace_collection/
  tag: Documentación
  text: Aprenda a configurar el trazado de APM con su aplicación
- link: /internal_developer_portal/catalog/
  tag: Documentación
  text: Descubra y catalogue los servicios que reportan a Datadog
- link: /tracing/services/service_page/
  tag: Documentación
  text: Obtenga más información sobre los servicios en Datadog
- link: /tracing/services/resource_page/
  tag: Documentación
  text: Profundice en el rendimiento y las trazas de sus recursos
- link: /tracing/trace_explorer/trace_view/
  tag: Documentación
  text: Entienda cómo leer una traza de Datadog
title: Vista de traza
---
{{< img src="tracing/trace_view/trace_view.png" alt="Vista de traza" style="width:90%;">}}

## Descripción general {#overview}

Visualice una [traza][1] individual para observar todos sus [tramos][2] y los metadatos asociados. Cada traza puede visualizarse como un Flame Graph, un Span List, un Waterfall o un Trace Map.

El encabezado de la traza muestra información crítica de la traza, incluido el nombre del servicio del tramo raíz, el nombre del recurso, el ID de traza, la duración de extremo a extremo de la traza y la hora de inicio de la traza. Para obtener un enlace permanente a la traza, haga clic en {{< ui >}}Open Full Page{{< /ui >}} y guarde la URL.

{{< img src="tracing/trace_view/trace_header.png" alt="Encabezado de la traza" style="width:90%;">}}


## Trace Visualizations {#trace-visualizations}

{{< tabs >}}
{{% tab "Flame Graph" %}}

{{< img src="tracing/trace_view/flamegraph.png" alt="Flame Graph" style="width:90%;">}}

El Flame Graph es la visualización predeterminada que muestra todos los tramos codificados por colores de una traza en una línea de tiempo. Esto es útil para comprender la ruta de ejecución de una solicitud y dónde se invirtió el tiempo en una traza.

Para navegar por el gráfico, desplácese para hacer zoom, haga clic y arrastre para moverse, y use el minimapa para acercar el tramo seleccionado o alejar la vista a la traza completa.

La leyenda detalla la codificación por colores del Flame Graph. Agrupe los tramos por {{< ui >}}Service{{< /ui >}} (predeterminado), {{< ui >}}[Base service][1]{{< /ui >}} (servicio desde el cual se emite el tramo), {{< ui >}}Host{{< /ui >}} o {{< ui >}}Container{{< /ui >}}. Elija mostrar el porcentaje del tiempo de ejecución de la traza ({{< ui >}}% Exec Time{{< /ui >}}) o el recuento de tramos ({{< ui >}}Spans{{< /ui >}}) por grupo. Si existen errores en los tramos de la traza, resáltelos en el flame graph seleccionando la casilla de verificación {{< ui >}}Errors{{< /ui >}} en {{< ui >}}Filter Spans{{< /ui >}}.

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
Los tramos de [servicios inferidos][2] se representan con un contorno discontinuo.

[2]: /es/tracing/services/inferred_services
{{< /site-region >}}

{{< img src="tracing/trace_view/flamegraph_legend.mp4" alt="Leyenda del Flame Graph" video="true" style="width:90%;">}}

[1]: /es/tracing/guide/service_overrides#base-service
{{% /tab %}}
{{% tab "Span List" %}}

{{< img src="tracing/trace_view/spanlist.png" alt="Vista de traza" style="width:90%;">}}

Muestra los [recursos][1] por grupo ([servicio][2] de forma predeterminada) y los ordena según su recuento de tramos. Esta visualización es útil para analizar la información de latencia por recurso o agrupación.

Filtre los recursos por tipo o información de nombre utilizando los botones correspondientes y la búsqueda basada en texto.

{{< img src="tracing/trace_view/spanlist_headers.png" alt="Encabezados del Span List" style="width:90%;">}}

Los grupos se pueden ordenar haciendo clic en el encabezado de columna correspondiente: {{< ui >}}RESOURCE{{< /ui >}}, {{< ui >}}SPANS{{< /ui >}}, duración promedio ({{< ui >}}AVG DURATION{{< /ui >}}), tiempo de ejecución ({{< ui >}}EXEC TIME{{< /ui >}}) o porcentaje del tiempo de ejecución de la traza ({{< ui >}}% EXEC TIME{{< /ui >}}).

[1]: /es/tracing/glossary/#resources
[2]: /es/tracing/glossary/#services
{{% /tab %}}
{{% tab "Waterfall" %}}

{{< img src="tracing/trace_view/waterfall2.png" alt="Waterfall" style="width:100%;">}}

Muestra todos los tramos de una traza en una línea de tiempo donde cada fila corresponde a un tramo. Esta visualización es útil para aislar y centrarse en las partes relevantes de una traza.

Cada fila (tramo) indica lo siguiente:

- **Duración relativa del tramo**: La longitud de la barra codificada por colores corresponde al porcentaje de la duración total de la traza.
- **Duración absoluta del tramo**: El tiempo absoluto en milisegundos (ms).
- **Detalles del tramo**: Se muestran el nombre del servicio y el nombre del recurso correspondientes.
- **Estados**: Cuando corresponde, se muestra un código de estado HTTP.
- **Codificación por colores**: Los tramos están codificados por colores según el servicio (predeterminado), el servidor o el contenedor. Para cambiar la forma en que se codifican los tramos por colores, utilice el menú desplegable {{< ui >}}Color by{{< /ui >}}.

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
Los tramos de [servicios inferidos][1] se representan con un subrayado discontinuo.

[1]: /es/tracing/services/inferred_services
{{< /site-region >}}

Para expandir o contraer los descendientes de un tramo, haga clic en el icono de chevron (>) en una fila. Para expandir o contraer todos los tramos, haga clic en los botones {{< ui >}}Expand all{{< /ui >}} (+) o {{< ui >}}Collapse all{{< /ui >}} (-).

{{% /tab %}}
{{% tab "Mapa" %}}

{{< img src="tracing/trace_view/trace-map.png" alt="Trace Map" style="width:100%;">}}

El Trace Map muestra una representación de todos los servicios involucrados en una sola traza. Proporciona una descripción general del ciclo de vida de la transacción a nivel de servicio y muestra las dependencias del servicio.

Cada nodo en el Trace Map representa un servicio en el ciclo de vida de la transacción. Para evitar dependencias cíclicas en el Trace Map, los servicios que llaman a otro servicio que ya había sido invocado por el servicio original, se representan mediante nodos duplicados. Los [servicios inferidos][2] se representan con un contorno discontinuo y un fondo morado.

Los nodos de servicio muestran explícitamente el porcentaje del {{< ui >}}total execution time{{< /ui >}}, que muestra el desglose de la duración de la traza a nivel de servicio.

Si un [tramo de entrada de servicio][1] está en estado de error, el nodo de servicio correspondiente se marca con un borde rojo para resaltar los servicios defectuosos. Si ocurre un error en un tramo de salida de servicio, la línea que indica la llamada al siguiente servicio también se resalta en rojo.

Para ver información adicional sobre los tramos de entrada de servicio para cada nodo, coloque el cursor sobre el estado de error. El tooltip muestra detalles sobre la operación y el nombre del recurso del tramo de entrada de servicio, junto con cualquier mensaje de error. Para una investigación más profunda, haga clic en {{< ui >}}View Entry Span{{< /ui >}} para visualizar la vista Waterfall.

[1]: /es/glossary/#service-entry-span
[2]: /es/tracing/services/inferred_services
{{% /tab %}}
{{< /tabs >}}

### Enfocarse en un tramo {#focus-on-a-span}
En las visualizaciones de cascada y de gráfico de llama, puede enfocarse en un tramo para limitar la vista a ese tramo y sus elementos secundarios. Esto es útil para trazas grandes, donde enfocarse le permite aislar e investigar un grupo específico de operaciones sin que el resto de la traza añada ruido.

En el gráfico de llama, seleccione un tramo y luego haga clic en el icono de enfoque junto al minimapa. En la cascada, coloque el cursor sobre un tramo y haga clic en el icono de enfoque en su lado derecho. La visualización se reescala con el tramo seleccionado como la nueva raíz, y sus descendientes llenan la línea de tiempo. Para volver a la traza completa, restablezca el enfoque.

{{< img src="/tracing/trace_view/flamegraph-focus-on-span.mp4" alt="Enfoque de Flame Graph en el tramo" video="true" style="width:90%;">}}
{{< img src="tracing/trace_view/waterfall-focus-on-spans.mp4" alt="Enfoque de Waterfall en el tramo" video="true" style="width:90%;">}}

<div class="alert alert-info">El enfoque solo cambia lo que se muestra. No filtra los tramos de los resultados de búsqueda ni altera la traza subyacente.</div>

### Trace Preview {#trace-preview}
Cuando el tamaño de una traza supera los 100 MB, no se puede visualizar completamente utilizando el panel lateral de traza predeterminado. En tales casos, se habilita el modo de Vista previa de traza. Este modo devuelve solo los tramos más críticos para ayudarle a continuar su investigación. Estas incluyen:

- Tramos de nivel de entrada de servicio
- Tramos de error
- Tramos de larga duración
- Tramos vinculados a otros tramos o trazas

Las opciones de visualización disponibles para trazas grandes se limitan a las vistas Waterfall y Trace Map. En el modo de vista previa, la vista Waterfall proporciona una opción adicional para obtener tramos que no se incluyen de forma predeterminada. Estos tramos se agrupan y representan mediante indicadores numerados. Cada indicador muestra el número total de tramos disponibles en ese grupo. Puede hacer clic en un indicador numérico para expandir y ver todos los tramos dentro de ese grupo.

{{< img src="tracing/visualization/trace/trace-preview.png" alt="Trace Preview" style="width:100%;">}}

## Span Search {#span-search}

En las visualizaciones de Waterfall y Flamegraph, la opción de búsqueda le permite encontrar los tramos que cumplen con consultas específicas. Los tramos que coinciden con la consulta de búsqueda se resaltan en la vista de traza y puede navegar entre estas coincidencias usando las flechas junto a la barra de búsqueda.

<img src="https://github.com/user-attachments/assets/4c6fc35a-65b7-42ee-bc24-fcb9adb9d0b8" alt="Search bar" style="width:90%;">

**Nota**: Cuando se selecciona la casilla de verificación `Error`, los resultados de la búsqueda devuelven tramos que coinciden con la consulta y se encuentran en un estado de error.

La consulta de búsqueda en el panel lateral de traza admite las siguientes opciones:

- **Free text search:**
La búsqueda de texto de forma libre permite filtrar por nombre de servicio, recurso u operación. Resalta los tramos que contienen el texto especificado dentro de estas categorías.
Ejemplo: `web`
- **Búsqueda de clave-valor:**
Use la expresión clave:valor para filtrar tramos con pares clave-valor específicos.
Ejemplo: `service:web-ui`

**Nota**: Los comodines no son compatibles en la barra de búsqueda de traza.

**Expresiones admitidas:**
- Expresión de grupo: `language:(go OR python)`
- Expresión booleana: `service:event-query OR terminator`
- Expresión de rango: `duration:>200ms`

**Nota**: Los valores numéricos admiten expresiones `<`, `>`, `<=` y `>=`.


## Más información {#more-information}

La parte inferior de altura ajustable de la Trace View muestra información sobre la traza y el tramo seleccionados.

<div class="alert alert-tip">En las trazas que contienen errores, haga clic en <strong>Investigate With Bits AI</strong> en el panel de detalles de la traza para iniciar una investigación automatizada. Bits AI recorre el árbol de tramos para identificar dónde falló la solicitud y correlaciona los hallazgos con los registros asociados. Para obtener más información, consulte <a href="/bits_ai/bits_chat/">Bits Chat</a>.</div>

El encabezado del tramo contiene los nombres del servicio, la operación y el recurso del tramo seleccionado, así como información sobre la latencia. Cambie a otras partes de la plataforma o limite su búsqueda en el [Trace Explorer][5] haciendo clic en la píldora de nombre.

{{< img src="tracing/trace_view/span_header.png" alt="Encabezado del tramo" style="width:90%;">}}

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
Cuando el tramo representa una llamada de cliente desde un servicio instrumentado a una base de datos, una cola o un servicio de terceros, el encabezado del tramo muestra el servicio y la entidad inferida.

{{< img src="tracing/trace_view/span_header_inferred.png" alt="Encabezado del tramo inferido" style="width:90%;">}}
{{< /site-region >}}

{{< tabs >}}
{{% tab "Información del tramo" %}} 

Vea todos los metadatos del tramo, incluidas las etiquetas personalizadas. Haga clic en una etiqueta de tramo para actualizar la consulta de búsqueda en el Trace Explorer o copiar el valor de la etiqueta al portapapeles.

Es posible que se muestre otra información bajo diversas condiciones:
- Mensaje de error y traza de pila (en tramo con error)
- Marcado de consulta SQL (en tramo de base de datos)
- Contexto y metadatos de RUM (en tramo de RUM)
- Spark Metrics (en tramos de trabajo de Spark)
- Un mensaje de advertencia de git (cuando falta información de git en una prueba de CI)

{{< img src="tracing/trace_view/info_tab.png" alt="Pestaña de información del tramo" style="width:90%;">}}

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
Cuando el nombre del servicio es una anulación del nombre del servicio base, la parte superior de la sección de información muestra:
- {{< ui >}}[Base service][2]{{< /ui >}}: servicio desde el cual se emite el tramo, identificado por el atributo `@base_service`.
- {{< ui >}}[Service override][3]{{< /ui >}}: nombre del servicio, diferente del nombre del servicio base, establecido automáticamente en las integraciones de Datadog o cambiado a través de la API programática. La anulación del servicio se identifica mediante el atributo reservado `service`.
- {{< ui >}}[Inferred service][4]{{< /ui >}} (_cuando corresponda_): nombre de la entidad inferida a la que llama el servicio base, identificado por uno de los [atributos del par][5].

{{< img src="tracing/trace_view/base_override_inferred_service.png" alt="Servicio base, de anulación e inferido" style="width:80%;">}}

[2]: /es/tracing/guide/service_overrides#base-service
[3]: /es/tracing/guide/service_overrides
[4]: /es/tracing/services/inferred_services
[5]: /es/tracing/services/inferred_services#peer-tags
{{< /site-region >}}

[1]: /es/tracing/glossary/#trace
{{% /tab %}}
{{% tab "Infraestructura" %}}

Alterne entre la información de infraestructura a nivel de servidor y a nivel de contenedor (cuando esté disponible) para el tramo seleccionado.

Consulte las etiquetas asociadas, así como los gráficos de métricas críticas de servidor/contenedor, incluidos CPU, memoria y E/S, con una superposición de cuándo ocurrió la traza.

{{< img src="tracing/trace_view/infrastructure_tab.png" alt="Pestaña Infraestructura" style="width:90%;">}}

{{% /tab %}}
{{% tab "Registros" %}}

Consulte los registros relacionados con su servicio en el momento de la traza. Cuando pasa el cursor sobre un registro, se muestra una línea que indica su marca de tiempo en el gráfico de llama de la traza. Al hacer clic en el registro, accederá a la [Log Explorer search][1].

{{< img src="tracing/connect_logs_and_traces/logs-trace-correlation.png" alt="Registros en trazas" style="width:100%;">}}


[1]: /es/logs/explorer/search/
{{% /tab %}}
{{% tab "Procesos" %}}

Haga clic en el tramo de un servicio para ver los procesos que se ejecutan en su infraestructura subyacente. Los procesos del tramo de un servicio se correlacionan con los servidores o pods en los que se ejecuta el servicio en el momento de la solicitud. Puede analizar métricas de procesos como CPU y memoria RSS junto con errores a nivel de código para distinguir entre problemas específicos de la aplicación y problemas de infraestructura más amplios. Al hacer clic en un proceso, accederá a la [Live Processes page][1]. Para ver los procesos específicos del tramo, habilite la [recopilación de procesos][2]. Los procesos relacionados no son compatibles actualmente con las trazas de serverless y de navegador. 

{{< img src="tracing/trace_view/processes_tab.png" alt="Pestaña Live Processes" style="width:90%;">}}

[1]: https://docs.datadoghq.com/es/infrastructure/process/?tab=linuxwindows
[2]: https://docs.datadoghq.com/es/infrastructure/process/?tab=linuxwindows#installation
{{% /tab %}}

{{% tab "Red" %}}

Haga clic en el tramo de un servicio para ver las dependencias de red del servicio que realiza la solicitud. Utilice métricas clave de rendimiento de red como volumen, errores (retransmisiones TCP) y latencia de red (tiempo de ida y vuelta TCP) para diferenciar entre problemas específicos de la aplicación y problemas de red generalizados, especialmente cuando no se han generado errores de código. Por ejemplo, puede utilizar la telemetría de red para determinar si la alta latencia de las solicitudes se debe a una sobrecarga de tráfico de la aplicación relevante, o a dependencias defectuosas con un pod, grupo de seguridad o cualquier otro punto de conexión etiquetado descendente. Al hacer clic en un proceso, accederá a la página de [Network Analytics][1]. Para ver los procesos específicos del tramo, habilite [Cloud Network Monitoring][2].

**Nota**: La telemetría de red relacionada no es compatible actualmente con las serverless traces.

{{< img src="tracing/trace_view/network_tab.png" alt="Pestaña de red" style="width:90%;">}}

[1]: /es/network_monitoring/performance/network_analytics
[2]: /es/network_monitoring/performance/setup
{{% /tab %}}

{{% tab "Security" %}}

Vea los intentos de ataque dirigidos a los servicios de la traza distribuida. Puede ver el patrón utilizado por el atacante, la regla que detecta el ataque y si el atacante encontró una vulnerabilidad en su servicio.

Haga clic en {{< ui >}}View in AAP{{< /ui >}} para investigar más a fondo utilizando [Datadog App and API Protection][1].

{{< img src="tracing/trace_view/security_tab.png" alt="Pestaña de seguridad" style="width:90%;">}}

[1]: /es/security/application_security/how-it-works/
{{% /tab %}}
{{% tab "Perfiles" %}}

Vea [Profiles][1] para identificar líneas de código relacionadas con problemas de rendimiento. Los valores en el lado izquierdo representan el tiempo dedicado a cada llamada de método durante el tramo seleccionado.

{{< img src="profiler/profiles_tab.png" alt="Pestaña de perfiles que muestra el tiempo dedicado a cada método para un tramo seleccionado" style="width:90%;">}}

[1]: /es/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces

{{% /tab %}}
{{% tab "Enlaces de tramo" %}}

Los [enlaces de tramo][4] correlacionan uno o más tramos que están relacionados causalmente pero que no tienen una relación típica de padre-hijo.

Haga clic en un tramo en el gráfico de llama para mostrar los tramos conectados con enlaces de tramo:

{{< img src="tracing/span_links/span_links_tab_2.png" alt="Pestaña de enlaces de tramo" style="width:90%;">}}

**Nota**: Los enlaces de tramo solo se muestran cuando los tramos correspondientes se ingieren e indexan, por ejemplo, con un [filtro de retención][1].

Para obtener más información sobre los enlaces de tramo y cómo agregarlos con instrumentación personalizada, lea [Span Links][4].

[1]: /es/tracing/trace_pipeline/trace_retention/
[2]: /es/tracing/trace_collection/custom_instrumentation/php#adding-span-links-beta
[3]: /es/tracing/trace_collection/otel_instrumentation/java#requirements-and-limitations
[4]: /es/tracing/trace_collection/span_links/

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#trace
[2]: /es/tracing/glossary/#spans
[3]: /es/tracing/glossary/#services
[4]: /es/tracing/glossary/#resources
[5]: /es/tracing/trace_explorer
[6]: /es/glossary/#service-entry-span