---
description: Investigue Network Path - Vista de ruta
further_reading:
- link: /network_monitoring/network_path/setup
  tag: Documentación
  text: Configure Network Path
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: Blog
  text: Haga un seguimiento de la arquitectura en la nube y de las dependencias de
    las aplicaciones con Datadog NPM
title: Vista de ruta
---
## Descripción general {#overview}

La sección Vista de ruta en Network Path permite un examen detallado de una ruta en particular, ayudando a resolver posibles problemas que podrían ocurrir desde la fuente hasta el destino. Ofrece datos completos tanto sobre la latencia de extremo a extremo como sobre la pérdida de paquetes a lo largo de la ruta.

Para acceder a la página de vista de ruta, haga clic en una ruta desde la [Vista de lista][2] o la [Vista de AS][3]. En esta página, usted tiene la capacidad de cambiar los colores del umbral de latencia y visualizar el estado de cada salto.

{{< img src="network_performance_monitoring/network_path/network_path_view_5.png" alt="Vista de Network Path que muestra un destino alcanzable con 0% de pérdida de paquetes, 103ms de latencia y el historial de latencia y accesibilidad" >}}

Haga clic en cualquier ruta desde el salto entre la fuente y el destino para observar detalles adicionales como `Hop TTL`, `Hop Latency` y `Traversed count`. Luego, haga clic en {{< ui >}}View Device Details{{< /ui >}} para navegar a los detalles del dispositivo en [NDM][4] para el dispositivo seleccionado.

{{< img src="network_performance_monitoring/network_path/path_details.png" alt="Vista de ruta en Network Path resaltando los detalles de la ruta." style="width:30%;" >}}

## Leyenda {#legend}

La leyenda proporciona detalles adicionales sobre el estado de cada salto.

{{< img src="network_performance_monitoring/network_path/legend.png" alt="Vista de ruta en Network Path mostrando la leyenda." style="width:30%;" >}}

Recuento de recorridos 
: Número de `traceroutes` que han pasado por el salto.

Finalización del recorrido 
: Representa si el `traceroute` pudo llegar con éxito al destino o no.

Accesibilidad
: El nivel de pérdida de paquetes que experimenta el destino.

Latencia 
: Cuánto tiempo tardó el `traceroute` en llegar desde una fuente hasta su destino.

**Nota**: La latencia salto a salto puede mostrar `N/A` para los saltos que estuvieron incompletos.

## Barra de estado {#health-bar}

Arrastre la barra de estado de latencia y accesibilidad para observar una instantánea de la latencia de extremo a extremo y la pérdida de paquetes de extremo a extremo para un intervalo de tiempo específico a lo largo de la ruta.

**Nota**: Cambiar la barra de estado no afecta el rango de tiempo global en la parte superior de la página.

{{< img src="network_performance_monitoring/network_path/latency_health_bar_3.mp4" alt="Video de Network Path, seleccionando la barra de estado de latencia y arrastrándola a un período de tiempo." video="true" >}}

## Analice con Bits AI {#analyze-with-bits-ai}

Haga clic en {{< ui >}}Analyze with Bits AI{{< /ui >}} en la vista de ruta para abrir [Bits AI][5] con la ruta actual cargada. Bits AI analiza la latencia, la pérdida de paquetes y la fluctuación a lo largo de la ruta, por lo que puede devolver un desglose generado por IA de dónde ocurren los problemas.

También puede consultar las ejecuciones de prueba de Network Path, incluidos los datos salto a salto, desde un agente de IA con la herramienta [`get_network_path_test_runs`][6] en el Datadog MCP Server.

## Comparación visual {#visual-comparison}

Utilice la vista de comparación visual para comparar dos visualizaciones de ruta lado a lado e identificar qué cambió antes y después de un incidente.

La vista de comparación proporciona:

- Instantáneas lado a lado de la misma Network Path en diferentes marcos de tiempo.
- Instantáneas lado a lado de dos Network Paths diferentes (diferentes pares de fuente y destino).
- Un diseño vertical que resalta la diferencia entre las dos consultas.
- Identificación automática de saltos comunes y únicos.
- Un gráfico de series temporales superpuesto que compara la latencia RTT, la pérdida de paquetes, la fluctuación y el recuento de saltos.

{{< img src="network_performance_monitoring/network_path/visual_comparison_paths_2.png" alt="Vista de comparación visual que muestra la ruta A con un destino alcanzable sobre la ruta B con un destino inalcanzable, y una línea de tiempo de latencia RTT en la parte superior" style="width:100%;" >}}

### Abra la vista de comparación {#open-the-comparison-view}

Para abrir la vista de comparación, haga clic en {{< ui >}}Compare{{< /ui >}} cerca de los controles de rango de tiempo en la vista de Network Path. De forma predeterminada, la vista se completa con el rango de tiempo seleccionado anteriormente y lo compara con el bloque de tiempo equivalente anterior. Por ejemplo, un rango de 3 horas se compara con el rango de 3 horas anterior. Utilice los controles superiores para ajustar los rangos de tiempo comparados.

### Navegue por la comparación {#navigate-the-comparison}

Navegue por las rutas divididas de forma independiente utilizando los controles de zoom, el minimapa o manteniendo presionada la tecla ⌘/Ctrl y desplazándose con el mouse.

Haga clic en {{< ui >}}Inspect{{< /ui >}} en un salto compartido para abrir una barra lateral que detalla los metadatos y confirma que el salto está presente en ambas vistas. Los saltos únicos están envueltos en un color distinto para indicar que existen solo en una vista.

La pestaña {{< ui >}}Analysis{{< /ui >}} proporciona un desglose detallado salto por salto de los paquetes y la latencia RTT para cada intervalo de tiempo.

{{< img src="network_performance_monitoring/network_path/network_path_analysis_comparison.png" alt="Pestaña de análisis de la vista de comparación visual que muestra una tabla de latencia RTT de salto lado a lado para las rutas A y B" style="width:100%;" >}}

### Compare rutas con Bits AI {#compare-paths-with-bits-ai}

Desde la vista de comparación, haga clic en el botón Bits AI para abrir [Bits AI][5] con ambas rutas cargadas. Bits AI devuelve una comparación generada por IA de las dos rutas.

## Gráficos {#graphs}

La sección inferior de la página de vista de ruta proporciona información adicional sobre cada ruta a través de una serie de gráficos.  

### Gráfico de métricas de extremo a extremo {#end-to-end-metrics-graph}

El gráfico de métricas de extremo a extremo presenta una representación visual tanto de la latencia de extremo a extremo como de la pérdida de paquetes de extremo a extremo para cada ruta, lo que le permite compararlas y analizarlas de manera efectiva.


{{< img src="network_performance_monitoring/network_path/end-to-end-metrics-graph.png" alt="Página de vista de ruta que muestra el gráfico de métricas de extremo a extremo." >}}

### Gráfico de latencia de salto a salto {#hop-to-hop-latency-graph}

El gráfico de latencia salto a salto proporciona una vista detallada de la latencia de cada salto a lo largo de la ruta, lo que facilita la identificación de posibles cuellos de botella o áreas problemáticas.


{{< img src="network_performance_monitoring/network_path/hop-to-hop-latency-graph_3.png" alt="Página de vista de ruta que muestra el gráfico de latencia salto a salto." >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /es/network_monitoring/network_path/list_view
[3]: /es/network_monitoring/network_path/as_view/
[4]: /es/network_monitoring/devices
[5]: /es/bits_ai/
[6]: /es/mcp_server/tools/#get_network_path_test_runs