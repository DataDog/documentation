---
description: Investigar la Vista de lista de Network Path
further_reading:
- link: /network_monitoring/network_path/path_view
  tag: Documentación
  text: Más información sobre la Vista de rutas en Network Path
- link: /network_monitoring/network_path/setup
  tag: Documentación
  text: Configurar Network Path
is_beta: true
title: Vista de lista
---

## Información general

La Vista de lista de Network Path es la vista por defecto para explorar varias rutas. Agrupa por fuentes como `hostname` y `service`.
Utiliza la barra de búsqueda para buscar ubicaciones de endpoints, orígenes o destinos específicas.

Por ejemplo, busca por `source.service` y `destination.service` específicos para delimitar tus resultados:

{{< img src="network_performance_monitoring/network_path/network_path_list_search_2.png" alt="Vista de Network Path, utilizando la barra de búsqueda para ordenar por un servicio de origen o de destino específico" >}}

Además, busca rutas específicas utilizando los paneles de facetas **Destino** y **Origen** de la parte izquierda, como `Destination AS Name`, `Destination Service` o `Source Hostname`.

{{< img src="network_performance_monitoring/network_path/path_destination_facet_2.png" alt="Vista de Network Path, utilizando el panel de facetas de destino para ordenar por un servicio de destino específico" >}}

## Controles de filtro

La parte superior de la página Vista de lista también contiene controles de filtro que puedes utilizar para realizar una búsqueda más granular del estado general de tu red:

{{< img src="network_performance_monitoring/network_path/reachable_unreachable.png" alt="Imagen de los conmutadores accesibles e inaccesibles" >}}

Inaccesible
: Filtra las rutas en las que `traceroute` no llegó correctamente al destino. Este control de filtro puede ser útil para profundizar en un salto específico y determinar dónde se está produciendo el fallo.

Accesible
: Filtra las rutas en las que `traceroute` llegó correctamente al destino.


## Mapa de rutas múltiples

Utiliza el botón **Mapa de rutas múltiples** para crear un mapa de rutas basado en una o más rutas seleccionadas:

{{< img src="network_performance_monitoring/network_path/multi_path.png" alt="Vista de rutas múltiples que muestra 3 rutas seleccionadas" >}}

Desde esta vista, puedes ver la latencia y la accesibilidad de las rutas seleccionadas, así como investigar la pérdida de paquetes de extremo a extremo y la latencia de salto a salto.
Para obtener más información sobre esta vista, consulta la documentación [Vista de rutas][1].



## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/network_monitoring/network_path/path_view
[2]: https://app.datadoghq.com/network/path