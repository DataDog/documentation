---
description: Investigue las rutas de tráfico de red
further_reading:
- link: network_monitoring/network_path/glossary
  tag: Documentación
  text: Términos y conceptos de Network Path
- link: /monitors/types/network_path/
  tag: Documentación
  text: Network Path Monitor
- link: https://www.datadoghq.com/blog/datadog-network-path-monitoring/
  tag: Blog
  text: Obtenga visibilidad de red de extremo a extremo con Datadog Network Path
- link: https://www.datadoghq.com/blog/network-path/
  tag: Blog
  text: Identifique ralentizaciones en toda su red con Datadog Network Path
is_beta: true
title: Network Path
---
## Descripción general {#overview}

Network Path ilustra la ruta que sigue el tráfico de red desde su origen hasta su destino. Esto proporciona a los administradores de red la capacidad de identificar con precisión la fuente de los problemas de red, ya sean internos, de un proveedor de servicios de Internet (ISP) o debidos a otros problemas como el enrutamiento incorrecto. Cada fila representa una ruta desde una fuente hasta su destino, como se muestra en el panel de facetas `source` y `destination`.

{{< img src="network_performance_monitoring/network_path/network_path_landing_page.png" alt="Explorador de Network Path que muestra una lista de rutas con columnas de fuente, destino, etiquetas, protocolo, puerto, alcanzabilidad promedio y RTT promedio" >}}

## Cómo funciona {#how-it-works}

Datadog realiza un `traceroute` a nivel de servidor para ilustrar el recorrido del paquete y la latencia en cada salto desde una fuente hasta su destino. Cada servidor ejecuta su propio `traceroute`, y la ruta mostrada es una representación visual de esta lista. Network Path envía automáticamente paquetes TCP o UDP a las aplicaciones en ejecución.

El siguiente diagrama representa el flujo típico de una ruta de red desde una fuente (servidor) hasta su destino.

{{< img src="network_performance_monitoring/network_path/network_path_diagram.png" alt="Diagrama de cómo funciona Network Path" >}}

## Métodos de configuración {#setup-methods}

Puede configurar las pruebas de Network Path de dos maneras:

- **En la interfaz de usuario** (Vista previa): Cree y actualice pruebas programadas y filtros de prueba dinámicos desde la interfaz de usuario de [Network Path][1]. Cada Agent al que apunte necesita primero una [configuración que se realiza una sola vez][12]. Datadog entrega las pruebas a sus Agents a través de Remote Configuration.
- **En los archivos de configuración del Agent**: Utilice uno o más de los siguientes métodos de recopilación:
  - **[Pruebas programadas][6]**: Supervise rutas de red específicas definiendo pares de fuente-destino en el archivo de configuración del Agent. Utilice pruebas programadas para monitorear continuamente un conjunto conocido de endpoints, como API críticas o servicios de socios.
  - **[Pruebas dinámicas][7]**: Descubra y monitoree automáticamente las rutas de red según el tráfico de red real observado por [Cloud Network Monitoring][8]. Utilice pruebas dinámicas para una visibilidad amplia sin tener que enumerar manualmente cada destino.
  - **[Pruebas dinámicas para NetFlow][10]**: Ejecute automáticamente pruebas de Network Path desde el servidor del Agent hasta las IP de destino observadas en [NetFlow Monitoring][11]. Utilice las pruebas dinámicas para NetFlow para agregar visibilidad de rutas salto a salto al tráfico de NetFlow sin configurar manualmente destinos individuales.

Puede utilizar ambos métodos en el mismo Agent.

Para crear pruebas de Network Path en Synthetic Monitoring en su lugar, consulte [Network Path Testing in Synthetic Monitoring][9].

## Próximos pasos {#next-steps}

Utilice las siguientes vistas y herramientas para configurar Network Path e investigar problemas de rendimiento y conectividad de red:

- [Configuración][4]: Configure y ajuste Network Path en sus entornos.
- [List View][2]: Una descripción general completa de todas las rutas de red monitoreadas, lo que le permite detectar problemas de conectividad, analizar métricas de rendimiento y filtrar las rutas que necesitan atención.
- [Path View][3]: Una visualización de la ruta de red entre una fuente y un destino, lo que le permite identificar dónde surgen los problemas, ya sea dentro de su propia infraestructura o con proveedores externos.
- [Variantes de Traceroute][5]: Aprenda a utilizar los comandos `traceroute` y `tracert` para diagnosticar y resolver problemas de red.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /es/network_monitoring/network_path/list_view
[3]: /es/network_monitoring/network_path/path_view
[4]: /es/network_monitoring/network_path/setup
[5]: /es/network_monitoring/network_path/guide/traceroute_variants
[6]: /es/network_monitoring/network_path/setup/#scheduled-tests
[7]: /es/network_monitoring/network_path/setup/#dynamic-tests
[8]: /es/network_monitoring/cloud_network_monitoring/
[9]: /es/synthetics/network_path_tests/
[10]: /es/network_monitoring/network_path/setup/#dynamic-tests-for-netflow-experimental
[11]: /es/network_monitoring/netflow/
[12]: /es/network_monitoring/network_path/setup/#create-tests-in-the-ui