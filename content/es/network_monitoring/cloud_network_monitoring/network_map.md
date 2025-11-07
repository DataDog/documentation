---
aliases:
- /es/network_performance_monitoring/network_map/
- /es/network_monitoring/performance/network_map
description: Asigna tus datos de red a todas tus etiquetas (tags).
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Monitorización de redes en la nube
- link: https://www.datadoghq.com/blog/datadog-npm-search-map-updates/
  tag: Blog
  text: Agilizar las investigaciones de red con una experiencia mejorada de consulta
    y mapas
- link: /network_monitoring/devices
  tag: Documentación
  text: Network Device Monitoring
- link: /network_monitoring/cloud_network_monitoring/setup
  tag: Documentación
  text: Recopila tus datos de red con el Datadog Agent.
title: Mapa de red
---

## Información general

El [mapa de red][1] ofrece una vista topológica de tu red para ayudar a visualizar particiones de red, dependencias y cuellos de botella. Al consolidar los datos de red en un mapa direccional, esta página puede utilizarse para eliminar el ruido y aislar las áreas problemáticas.

{{< img src="network_performance_monitoring/network_map/network_map_3.png" alt="network_map" >}}

## Configuración

El mapa de red visualiza automáticamente los datos recopilados por el Datadog Agent. Una vez instalado, no es necesario realizar ningún paso adicional.

## Utilización

Selecciona la pestaña **Map** (Mapa) para configurar tu mapa de red:

{{< img src="network_performance_monitoring/network_map/network_map_search.png" alt="Barra de búsqueda de la página Mapa de red" >}}

1. Elige la etiqueta que quieres que representen tus **Nodos** con el primer selector de la parte superior de la página. Las etiquetas (tags) disponibles son las mismas que las ofrecidas en la página de red.

    {{< img src="network_performance_monitoring/network_map/network_map_search_additional_filter.png" alt="Barra de búsqueda de la página Mapa de red" >}}

    - Si hay demasiados nodos, se añade automáticamente una segunda etiqueta al grupo. Puedes cambiar la etiquetar en el menú desplegable **By** (Por). Consulta [Agrupación en clústeres](#map-clusters) para obtener más información.
2. Selecciona la métrica que deseas que represente tus **Periferias**:

    - Rendimiento enviado
    - Rendimiento recibido
    - Retransmisiones TCP
    - Latencia TCP
    - Fluctuación TCP
    - Conexiones establecidas
    - Conexiones cerradas

3. Filtra las conexiones que deseas visualizar. Puedes elegir si deseas o no:

    - Filtrar el tráfico a un determinado entorno, espacio de nombres, o cualquier otra etiqueta(s)
    - Filtra tus etiquetas según una coincidencia de cadena difusa.
      {{< img src="network_performance_monitoring/network_map/filtering_npm_map_search.mp4" alt="Filtro de mapa de red con la búsqueda" video="true" >}}

    - **Mostrar tráfico no resuelto**.
    - Ocultar el tráfico de red fuera de un rango percentil especificado de la métrica de red activa.
        {{< img src="network_performance_monitoring/network_map/filtering_network_map.mp4" alt="Filtrado de flujos del mapa de red" video="true" width="50%" >}}

## Inspección

Al pasar el ratón por encima de un nodo, se resalta y anima la direccionalidad del tráfico de red que envía y recibe:

{{< img src="network_performance_monitoring/network_map/network_map_highlight.mp4" alt="Mapa de red" video="true" width="70%" >}}

Haz clic en un nodo y selecciona _Inspect_ (Inspeccionar) en el menú para contextualizarlo dentro de la red más grande:

{{< img src="network_performance_monitoring/network_map/network_entity_zoom.mp4" alt="Ampliar la entidad de red" video="true" width="70%">}}

## Clústeres de mapa

Para las redes complejas, el editor de consultas del mapa incluye campos de agrupación adicionales. Esto permite representar conjuntos de datos que, de otro modo, tendrían demasiados nodos para mostrarse a la vez en el mapa. El uso de los campos de agrupación adicionales también mejora el rendimiento de las consultas de cardinalidad alta.

 {{< img src="network_performance_monitoring/network_map/network_map_search_additional_filter.png" alt="Barra de búsqueda de la página Mapa de red" >}}

{{< img src="network_performance_monitoring/network_map/network_map_3.png" alt="network_map" >}}

La agrupación en clústeres añade una dimensión adicional para agrupar los nodos en el mapa. Los mapas grandes se agrupan automáticamente en clústeres para mejorar el tiempo de carga y la legibilidad del mapa. Para ver los nodos dentro de un clúster, haz clic en el clúster para expandirlo. Para contraer el clúster, haz clic en el área gris que rodea los nodos.

Un borde rojo alrededor de un clúster indica que al menos un monitor de alerta tiene una etiqueta que coincide con la etiqueta por la que se agrupan los nodos. Por ejemplo, si el mapa está agrupado por servicio, entonces el mapa busca monitores con la etiqueta `service:<nodeName>`. Si el monitor está en estado de alerta, el mapa contornea cualquier clúster que contenga `<nodeName>` en rojo. 

{{< img src="network_performance_monitoring/network_map/expanded_network_cluster.png" alt="vista del mapa de clúster de red expandida" >}}

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/map