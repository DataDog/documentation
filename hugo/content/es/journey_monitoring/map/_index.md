---
description: Visualice y haga un seguimiento del rendimiento de sus recorridos en
  el mapa de Journey Monitoring.
further_reading:
- link: /journey_monitoring
  tag: Documentación
  text: Obtenga información sobre Journey Monitoring
- link: /journey_monitoring/map/suggested_journeys/
  tag: Documentación
  text: Obtenga información sobre los recorridos sugeridos
- link: /journey_monitoring/details_report/
  tag: Documentación
  text: Obtenga información sobre los informes de detalles de recorridos
- link: /journey_monitoring/details_report/variants/
  tag: Documentación
  text: Obtenga información sobre las variantes de recorridos
- link: /journey_monitoring/uptime/
  tag: Documentación
  text: Obtenga información sobre el tiempo de actividad de los recorridos
title: Mapa
---
{{< callout url="https://www.datadoghq.com/product-preview/journey-monitoring/" btn_hidden="false" header="¡Únase a la vista previa!">}}
Journey Monitoring está en vista previa.
{{< /callout >}}

## Descripción general {#overview}

El **mapa de Journey Monitoring** muestra todos los recorridos creados y sugeridos en una aplicación frontend. Cada mosaico en el mapa muestra métricas sobre el volumen y la tasa de conversión de un recorrido. Si el recorrido tiene al menos una prueba Synthetic definida, el mosaico también muestra la métrica de tiempo de actividad del [conjunto de pruebas Synthetic][1] del recorrido.

<div class="alert alert-danger"><p>Solo las aplicaciones frontend que están instrumentadas con RUM without Limits, Synthetic Monitoring & Testing o Product Analytics son elegibles para Journey Monitoring.</p></div>

## Explore y administre recorridos {#explore-and-manage-journeys}

Utilice el mapa para explorar y administrar sus recorridos:
- Cambie el nivel de zoom en el mapa
- Pase el cursor sobre un recorrido para ver su descripción, inicio y definición final
- Haga clic en un recorrido en el catálogo para navegar al [informe de detalles][2] del recorrido
- Utilice los filtros y la barra de búsqueda para limitar los recorridos mostrados en el catálogo y el mapa
- Haga clic en el menú de tres puntos de un recorrido para editarlo o eliminarlo

## Estados del recorrido {#journey-states}

Los recorridos en el mapa y el catálogo pueden estar codificados por colores según su configuración y rendimiento:
- Los recorridos sugeridos son **morados** y están etiquetados con una píldora de "Sugerencia"
- Los recorridos con una tasa de conversión en descenso son **naranjas** y contienen un cheurón rojo
- Los recorridos con pruebas fallidas son **rojos**
- Los recorridos sin pruebas en su conjunto de pruebas Synthetic contienen una **advertencia** en la información sobre herramientas

## Flujos de usuario en el mapa {#user-flows-in-the-map}

El nodo más a la izquierda en el mapa representa el punto de inicio para todas las sesiones de usuario en su aplicación. Todos los demás nodos en el mapa son páginas o recorridos. Un nodo de página puede representar una ruta principal que se expande para mostrar sus páginas anidadas.

{{< img src="journey_monitoring/journey-monitoring-map-zoom-1.png" alt="El mapa de Journey Monitoring muestra un catálogo de recorridos a la izquierda con métricas de tráfico y conversión, y un mapa de flujo visual a la derecha que muestra las rutas de los usuarios entre las vistas y acciones de la aplicación." style="width:100%;" >}}

Cuanto más gruesa sea la línea de conexión, mayor será el tráfico que fluye entre dos nodos. Los recorridos que no están conectados al nodo de inicio de sesión son recorridos a los que los usuarios navegan solo después de que una sesión ya ha comenzado, en lugar de ser un punto de entrada a la aplicación.

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/test_suites/
[2]: /es/journey_monitoring/details_report/