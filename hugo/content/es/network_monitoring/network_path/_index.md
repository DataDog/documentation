---
description: Investigar las rutas del tráfico de redes
further_reading:
- link: https://www.datadoghq.com/blog/datadog-network-path-monitoring/
  tag: Blog
  text: Obtener visibilidad de extremo a extremo de la red con la Ruta de red de Datadog
- link: https://www.datadoghq.com/blog/network-path/
  tag: Blog
  text: Identifica las ralentizaciones en toda la red con Datadog Network Path
is_beta: true
title: Ruta de red
---

## Información general

La Ruta de red ilustra la ruta que sigue el tráfico de red desde su origen hasta su destino. Esto proporciona a los administradores de red la capacidad de identificar con precisión el origen de los problemas de red, ya sean internos o de un proveedor de servicios de Internet (ISP), o debido a otros problemas como un enrutamiento erróneo. Cada fila significa una ruta desde un origen hasta su destino, como se muestra en el panel de facetas `source` y `destination`.


{{< img src="network_performance_monitoring/network_path/network_path_default_view_4.png" alt="La vista predeterminada de Network Path, que muestra la ruta desde la fuente al destino, con la leyenda ampliada" >}}

## Cómo funciona

Datadog realiza una `traceroute` a nivel de host para ilustrar el recorrido del paquete y la latencia en cada salto desde un origen hasta su destino. Cada host ejecuta su propia `traceroute`, y la ruta mostrada es una representación visual de esta lista. La ruta de red envía automáticamente paquetes TCP o UDP a las aplicaciones en ejecución.

El siguiente diagrama representa el flujo típico de una ruta de red desde un origen (host) hasta su destino.

{{< img src="network_performance_monitoring/network_path/network_path_diagram.png" alt="Diagrama de cómo funciona la ruta de red" >}}

## Siguientes pasos

Utiliza las siguientes vistas y herramientas para configurar Network Path e investigar el rendimiento de la red y los problemas de conectividad:

- [Configuración][4]: Instala y configura Network Path en tus entornos.
- [Vista de lista][2]: Información global general de todas las rutas de red monitorizadas, que permite detectar problemas de conectividad, analizar métricas de rendimiento y filtrar las rutas que necesitan atención.
- [Vista de ruta][3]: Información visual de la ruta de red entre una fuente y el destino, lo que te permite identificar problemas en tu propia infraestructura o de proveedores externos.
- [Variantes de Traceroute][5]: Aprende a utilizar los comandos `traceroute` y `tracert` para diagnosticar y resolver problemas de red.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /es/network_monitoring/network_path/list_view
[3]: /es/network_monitoring/network_path/path_view
[4]: /es/network_monitoring/network_path/setup
[5]: /es/network_monitoring/network_path/guide/traceroute_variants