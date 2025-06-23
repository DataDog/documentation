---
description: Investigar las rutas del tráfico de redes
further_reading:
- link: /network_monitoring/network_path/list_view
  tag: Documentación
  text: Más información sobre la Vista de lista en la Ruta de red
- link: /network_monitoring/network_path/path_view
  tag: Documentación
  text: Más información sobre la Vista de ruta en la Ruta de red
- link: /network_monitoring/network_path/setup
  tag: Documentación
  text: Configurar la ruta de red
- link: https://www.datadoghq.com/blog/datadog-network-path-monitoring/
  tag: Blog
  text: Obtener visibilidad de extremo a extremo de la red con la Ruta de red de Datadog
is_beta: true
title: Ruta de red
---

<div class="alert alert-info">La Ruta de red para Datadog Cloud Network Monitoring tiene disponibilidad limitada. Ponte en contacto con tu representante de Datadog para inscribirte.</div>

## Información general

La Ruta de red ilustra la ruta que sigue el tráfico de red desde su origen hasta su destino. Esto proporciona a los administradores de red la capacidad de identificar con precisión el origen de los problemas de red, ya sean internos o de un proveedor de servicios de Internet (ISP), o debido a otros problemas como un enrutamiento erróneo. Cada fila significa una ruta desde un origen hasta su destino, como se muestra en el panel de facetas `source` y `destination`.

**Nota**: [Cloud Network Monitoring][2] debe estar habilitado para utilizar la funcionalidad de ruta de red.

{{< img src="network_performance_monitoring/network_path/network_path_default_view_3.png" alt="La vista predeterminada de Ruta de red, que muestra la ruta desde el origen al destino" >}}

## Cómo funciona

Datadog realiza una `traceroute` a nivel de host para ilustrar el recorrido del paquete y la latencia en cada salto desde un origen hasta su destino. Cada host ejecuta su propia `traceroute`, y la ruta mostrada es una representación visual de esta lista. La ruta de red envía automáticamente paquetes TCP o UDP a las aplicaciones en ejecución.

El siguiente diagrama representa el flujo típico de una ruta de red desde un origen (host) hasta su destino.

{{< img src="network_performance_monitoring/network_path/network_path_diagram.png" alt="Diagrama de cómo funciona la ruta de red" >}}

**Nota**: Por defecto, Datadog ejecuta una `traceroute` cada cinco minutos.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /es/network_monitoring/cloud_network_monitoring/