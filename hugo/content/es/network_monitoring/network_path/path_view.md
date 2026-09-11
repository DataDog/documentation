---
description: Investigar Network Path - Vista de ruta
further_reading:
- link: /network_monitoring/network_path/setup
  tag: Documentación
  text: Configurar Network Path
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: Blog
  text: Monitorear la arquitectura en la nube y las dependencias de la aplicación
    con Datadog NPM
title: Vista de ruta
---
## Resumen {#overview}

La sección Vista de ruta en Network Path permite un examen detallado de una ruta particular, ayudando a resolver problemas potenciales que puedan ocurrir desde la fuente hasta el destino. Ofrece datos completos sobre la latencia de extremo a extremo y la pérdida de paquetes a lo largo de la ruta.

Para acceder a la página de Vista de ruta, haga clic en una ruta desde la [vista de lista][2] o [vista de AS][3]. En esta página, tiene la capacidad de cambiar los colores del umbral de latencia y ver el estado de cada salto.

{{< img src="network_performance_monitoring/network_path/network_path_view_5.png" alt="Vista de ruta de Network Path mostrando un destino alcanzable con 0% de pérdida de paquetes, 103 ms de latencia y el historial de latencia y alcanzabilidad." >}}

Haga clic en cualquier ruta del salto entre la fuente y el destino para observar detalles adicionales como `Hop TTL`, `Hop Latency` y `Traversed count`. Luego, haga clic en **Ver Detalles del Dispositivo** para navegar a los detalles del dispositivo en [NDM][4] para el dispositivo seleccionado.

{{< img src="network_performance_monitoring/network_path/path_details.png" alt="Vista de ruta en Network Path destacando los detalles de la ruta." style="width:30%;" >}}

## Leyenda {#legend}

La leyenda proporciona detalles adicionales sobre el estado de cada salto.

{{< img src="network_performance_monitoring/network_path/legend.png" alt="Vista de ruta en Network Path mostrando la leyenda." style="width:30%;" >}}

Conteo de recorridos 
: Número de `traceroutes` que han pasado por el salto.

Finalización del recorrido 
: Representa si el `traceroute` pudo alcanzar con éxito el destino.

Alcanzabilidad
: El nivel de pérdida de paquetes que está experimentando el destino.

Latencia 
: Cuánto tiempo tomó el `traceroute` para ir de una fuente a su destino.

**Nota**: La latencia de salto a salto puede mostrar `N/A` para saltos que fueron incompletos.

## Barra de salud {#health-bar}

Arrastre la barra de salud de latencia y alcanzabilidad para observar una instantánea de la latencia de extremo a extremo y la pérdida de paquetes de extremo a extremo durante un intervalo de tiempo específico a lo largo del camino.

**Nota**: Cambiar la barra de salud no afecta el rango de tiempo global en la parte superior de la página.

{{< img src="network_performance_monitoring/network_path/latency_health_bar_3.mp4" alt="Video de Network Path, seleccionando la barra de salud de latencia y arrastrando a un período de tiempo." video="true" >}}

## Comparación visual {#visual-comparison}

Utilice la vista de comparación visual para comparar dos visualizaciones de rutas lado a lado e identificar qué cambió antes y después de un incidente.

La vista de comparación proporciona:

- Instantáneas lado a lado del mismo Network Path a través de diferentes marcos de tiempo.
- Instantáneas lado a lado de dos Network Path diferentes (pares de fuente y destino diferentes).
- Un diseño vertical que resalta la diferencia entre las dos consultas.
- Identificación automática de saltos comunes y únicos.
- Un gráfico de series temporales superpuesto que compara la latencia RTT, la pérdida de paquetes, el jitter y el conteo de saltos.

{{< img src="network_performance_monitoring/network_path/visual_comparison_paths_2.png" alt="Visualización de comparación visual mostrando el camino A con un destino alcanzable sobre el camino B con un destino inaccesible, y una línea de tiempo de latencia RTT en la parte superior" style="width:100%;" >}}

### Abra la visualización de comparación {#open-the-comparison-view}

Para abrir la visualización de comparación, haga clic en **Comparar** cerca de los controles del rango de tiempo en la visualización de Network Path. Por defecto, la visualización se llena con su rango de tiempo previamente seleccionado y lo compara con el bloque de tiempo equivalente anterior. Por ejemplo, un rango de 3 horas se compara con el rango de 3 horas anterior. Utilice los controles superiores para ajustar los rangos de tiempo comparados.

### Navegue la visualización de comparación {#navigate-the-comparison}

Navegue las rutas divididas de manera independiente utilizando los controles de zoom, el minimapa o manteniendo ⌘/Ctrl y desplazándose con su ratón.

Haga clic en **Inspeccionar** en un salto compartido para abrir una barra lateral que detalla los metadatos y confirma que el salto está presente en ambas visualizaciones. Los saltos únicos están envueltos en un color distinto para indicar que existen en solo una visualización.

La pestaña **Análisis** proporciona un desglose lado a lado, salto por salto, de paquetes y latencia RTT para cada rango de tiempo.

{{< img src="network_performance_monitoring/network_path/network_path_analysis_comparison.png" alt="Pestaña de Análisis de la visualización de comparación visual mostrando una tabla de latencia RTT de salto a salto lado a lado para los caminos A y B." style="width:100%;" >}}

## Gráficas {#graphs}

La sección inferior de la página de visualización de camino proporciona información adicional sobre cada camino a través de una serie de gráficas.  

### Gráfica de métricas de extremo a extremo {#end-to-end-metrics-graph}

La gráfica de métricas de extremo a extremo presenta una representación visual tanto de la latencia de extremo a extremo como de la pérdida de paquetes de extremo a extremo para cada camino, permitiéndole compararlos y analizarlos de manera efectiva.


{{< img src="network_performance_monitoring/network_path/end-to-end-metrics-graph.png" alt="Página de visualización de camino mostrando la gráfica de métricas de extremo a extremo." >}}

### Gráfica de latencia de salto a salto {#hop-to-hop-latency-graph}

La gráfica de latencia de salto a salto proporciona una visualización detallada de la latencia para cada salto a lo largo del camino, facilitando la identificación de posibles cuellos de botella o áreas problemáticas.


{{< img src="network_performance_monitoring/network_path/hop-to-hop-latency-graph_3.png" alt="Página de visualización de camino mostrando la gráfica de latencia de salto a salto." >}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /es/network_monitoring/network_path/list_view
[3]: /es/network_monitoring/network_path/as_view/
[4]: /es/network_monitoring/devices