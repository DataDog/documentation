---
aliases:
- /es/network_performance_monitoring/network_table
- /es/network_performance_monitoring/dns_monitoring
description: Diagnosticar y depurar problemas del servidor DNS
further_reading:
- link: https://www.datadoghq.com/blog/monitor-dns-with-datadog/
  tag: Blog
  text: Monitorizar DNS con Datadog
- link: https://www.datadoghq.com/blog/monitor-coredns-with-datadog/
  tag: Blog
  text: Monitorizar CoreDNS con Datadog
- link: /network_monitoring/performance/network_analytics
  tag: Documentación
  text: Explora datos de red entre cada origen y destino.
- link: https://www.datadoghq.com/blog/dns-resolution-datadog/
  tag: Blog
  text: Utilizar la resolución DNS para monitorizar endpoints en la nube y externos
title: Monitorización de DNS
---

{{< img src="network_performance_monitoring/dns_monitoring/dns_overview.png" alt="La página de monitorización de DNS en Datadog" >}}

<div class="alert alert-info">
Actualiza al Agent versión 7.33 o posterior para habilitar la monitorización de DNS.
</div>

La Monitorización de DNS proporciona una visión general del rendimiento del servidor DNS para ayudar a identificar problemas de DNS del lado del servidor y del lado del cliente. Mediante la recopilación y visualización de métricas de DNS a nivel de flujo, esta página se puede utilizar para identificar:

* Los pods o servicios que realizan solicitudes DNS y los servidores que reciben dichas solicitudes.
* Los endpoints que realizan el mayor número de solicitudes o que las realizan a mayor velocidad.
* Si el tiempo de respuesta de un servidor DNS a las solicitudes ha aumentado gradual o repentinamente.
* Los servidores DNS con una alta tasa de errores y el tipo de errores que se emiten.
* Qué dominios se están resolviendo.

## Ajustes

Antes de empezar a utilizar la Monitorización de DNS, [configura Network Performance Monitoring][1]. Asegúrate también de que estás utilizando la última versión del Agent, o al menos Agent v7.23+ para el sistema operativo Linux, y v7.28+ para Windows Server. Una vez instalado, se puede acceder a una pestaña **DNS** en el producto Network Performance Monitoring.

¿Prefieres Network Device Monitoring? Consulta las [Instrucciones de configuración de NDM][2].

## Consultas

Utiliza la barra búsqueda situada en la parte superior de la página para buscar relaciones entre un cliente (que realiza la solicitud DNS) y un servidor DNS (que responde a la solicitud DNS). El puerto de destino se asigna automáticamente al puerto DNS 53 para que todas las relaciones resultantes coincidan con este formato (cliente → servidor DNS).

Para refinar tu búsqueda a un cliente en particular, agrega y filtra el tráfico DNS usando etiquetas (tags) de cliente en la barra de búsqueda. En la vista por defecto, el cliente se agrupa automáticamente por las etiquetas más comunes. En consecuencia, cada fila de la tabla representa un servicio que está realizando solicitudes DNS a algún servidor DNS.

{{< img src="network_performance_monitoring/dns_monitoring/dns_client_search.png" alt="La página de monitorización de DNS con client_service:ad-server en la barra de búsqueda, pod_name en Ver clientes como y network.dns_query en Ver servidores como" style="width:100%;">}}

Para refinar tu búsqueda a un servidor DNS en particular, filtra la barra de búsqueda utilizando las etiquetas de servidor. Configura tu visualización del servidor con una de las siguientes opciones del menú desplegable **Group by** (Agrupar por):

* `dns_server`: el servidor que recibe las solicitudes DNS. Esta etiqueta tiene el mismo valor que `pod_name` o `task_name`. Si esas etiquetas no están disponibles, se utiliza `host_name`.
* `host`: el nombre de host del servidor DNS.
* `service`: el servicio que se ejecuta en el servidor DNS.
* `IP`: la IP del servidor DNS.
* `dns_query`: (requiere Agent versión 7.33 o posterior) El dominio consultado.

Este ejemplo muestra todos los flujos desde pods en la zona de disponibilidad del entorno de producción a hosts que reciben solicitudes DNS:

{{< img src="network_performance_monitoring/dns_monitoring/dns_query_example.png" alt="Consulta con client_availability_zone:us-central1-b y client_env: prod en la Búsqueda por campo, pod_name seleccionado en Ver clientes con menú desplegables y host seleccionado en Ver servidores como menú desplegable" style="width:100%;">}}

### Consultas recomendados

{{< img src="network_performance_monitoring/dns_monitoring/recommended_queries_dns.png" alt="Consultas recomendadas en la página de monitorización de DNS que muestra la descripción de una consulta" style="width:100%;">}}

Hay tres consultas recomendadas en la parte superior de la página DNS, similar a la página [Network Analytics][4]. Se trata de consultas estáticas que se suelen utilizar para investigar el estado del DNS y ver las métricas más generales de DNS. Utiliza las consultas recomendadas como punto de partida para obtener más información sobre tu configuración de DNS y solucionar problemas de DNS. 

Puedes pasar el ratón por encima de una consulta recomendada para ver una breve descripción de lo que significan los resultados de la consulta. Haz clic en la consulta para ejecutarla y en **Clear query** (Borrar consulta) para eliminarla. Cada consulta recomendada tiene también su propio conjunto de gráficos recomendado; al borrar la consulta recomendada se restablecen los gráficos a su configuración por defecto. 

## Métricas

Tus métricas de DNS se muestran a través de los gráficos y la tabla asociada.

**Nota**: Los datos se recopilan cada 30 segundos, se agregan en buckets de cinco minutos y se conservan durante 14 días.

Las siguientes métricas de DNS están disponibles:

| Métrica                   | Descripción                                                                                                             |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------|
| **Solicitudes DNS**         | Número de solicitudes DNS realizadas desde el cliente.                                                                         |
| **Solicitudes DNS por segundo** | La tasa de solicitudes DNS realizadas por el cliente.                                                                             |
| **Tiempo de respuesta DNS**    | Tiempo medio de respuesta del servidor DNS a una solicitud del cliente.                                                |
| **Tiempos de inactividad**             | Número de solicitudes DNS del cliente que han expirado (mostrado como porcentaje de todas las respuestas DNS). <br  /><br />**Nota**: Estos tiempos de inactividad son métricas calculadas internamente por NPM, y pueden no coincidir con los tiempos de inactividad de DNS reportados desde fuera de NPM. No son los mismos que los tiempos de inactividad de DNS reportados por los clientes o servidores DNS.                |
| **Errores**               | El número de solicitudes del cliente que generaron códigos de error DNS (mostrado como porcentaje de todas las respuestas DNS).   |
| **SERVFAIL**             | El número de solicitudes del cliente que generaron códigos SERVFAIL (el servidor DNS no respondió) (mostrado como porcentaje de todas las respuestas DNS).   |
| **NXDOMAIN**             | El número de solicitudes del cliente que generaron códigos NXDOMAIN (el nombre de dominio no existe) (mostrado como porcentaje de todas las respuestas DNS).   |
| **OTHER**                | El número de solicitudes del cliente que generaron códigos de error que no son NXDOMAIN o SERVFAIL (mostrado como porcentaje de todas las respuestas DNS).   |
| **Fallos**             | El número total de tiempos de inactividad y errores en las solicitudes DNS del cliente (mostrado como porcentaje de todas las respuestas DNS). |

## Tabla

La tabla de red desglosa las métricas anteriores por cada dependencia de _cliente_ y _servidor_ definida por tu consulta.

Configura las columnas de tu tabla utilizando el botón **Customize** (Personalizar) situado en la parte superior derecha de la tabla.

Restringe el tráfico en tu vista con las [opciones][3] de **Filter Traffic** (Filtrar tráfico).

## Panel lateral

El panel lateral proporciona telemetría contextual para ayudar a depurar rápidamente las dependencias del servidor DNS. Utiliza las pestañas flujos, logs, trazas y procesos para determinar si el elevado número de solicitudes entrantes, el tiempo de respuesta o la tasa de fallos de un servidor DNS se deben a:

* Procesos intensos que consumen los recursos de la infraestructura subyacente
* Errores de aplicación en el código del lado del cliente
* Un elevado número de solicitudes procedentes de un puerto o IP determinados

{{< img src="network_performance_monitoring/dns_monitoring/dns_sidepanel.png" alt="Panel lateral de la Monitorización de DNS" style="width:100%;">}}

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/network_monitoring/performance/
[2]: /es/network_monitoring/devices/snmp_metrics/?tab=snmpv2
[3]: /es/network_monitoring/performance/network_analytics#table
[4]: /es/network_monitoring/performance/network_analytics/#recommended-queries