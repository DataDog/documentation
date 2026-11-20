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
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: Monitorizar logs de DNS para análisis de red y seguridad
title: DNS Monitoring
---

## Información general

DNS Monitoring proporciona visibilidad del rendimiento del servidor DNS para ayudarte a identificar problemas de DNS del lado del servidor y del lado del cliente. Mediante la recopilación y visualización de métricas de DNS a nivel de flujo, puedes identificar:

* Los pods o servicios que están realizando solicitudes DNS y los servidores que las están gestionando.
* Los principales solicitantes y sus índices de consulta.
* Los servidores DNS que experimentan picos de tiempo de respuesta graduales o repentinos.
* Los índices de error elevados y los tipos de error específicos de los servidores DNS.
* Los patrones de resolución de dominios en toda tu infraestructura.

{{< img src="network_performance_monitoring/dns_monitoring/dns_overview_2.png" alt="Página de CNM Analytics con el interruptor de DNS toggle activado." >}}

## Requisitos previos

- Agent versión 7.33 o posterior
- Habilitar [Cloud Network Monitoring][1] (CNM)

<div class="alert alert-info"> Esta documentación se aplica a la monitorización DNS en CNM. Para obtener información sobre Network Device Monitroring (NDM), consulta las <a href="/network_monitoring/devices/setup/">instrucciones de configuración de NDM</a>.
</div>

## Consultas

En la opción **DNS** de [**CNM > Analytics**][5], utiliza la barra de búsqueda para buscar relaciones entre un cliente (que realiza la solicitud DNS) y un servidor DNS (que responde a la solicitud DNS). El puerto de destino se asigna automáticamente al puerto DNS `53` para que todas las relaciones resultantes coincidan con este formato **cliente → servidor DNS**.

Para limitar la búsqueda a un cliente específico, utiliza etiquetas (tags) de cliente en la barra de búsqueda para filtrar el tráfico DNS. Por defecto, los clientes se agrupan por las etiquetas más frecuentes, y cada fila representa un servicio que realiza solicitudes DNS a un servidor DNS.

   {{< img src="network_performance_monitoring/dns_monitoring/dns_client_search_2.png" alt="Página de DNS Monitoring con client_service:web-store ingresado en la barra de búsqueda y `network.dns_query` ingresado en Ver servidores como" style="width:100%;">}}

Para refinar tu búsqueda a un servidor DNS en particular, filtra la barra de búsqueda utilizando las etiquetas de servidor. Configura tu visualización del servidor con una de las siguientes opciones del menú desplegable **Group by** (Agrupar por):

   * `dns_server`: el servidor que recibe las solicitudes DNS. Esta etiqueta tiene el mismo valor que `pod_name` o `task_name`. Si esas etiquetas no están disponibles, se utiliza `host_name`.
   * `host`: el nombre de host del servidor DNS.
   * `service`: el servicio que se ejecuta en el servidor DNS.
   * `IP`: la IP del servidor DNS.
   * `dns_query`: El dominio consultado.

### Consultas recomendados

{{< img src="network_performance_monitoring/dns_monitoring/recommended_queries_dns_2.png" alt="Consultas recomendadas en la página de DNS Monitoring que muestra la descripción de una consulta de los tiempos de espera de DNS." style="width:100%;">}}

Hay tres consultas recomendadas en la parte superior de la página DNS, similar a la página [Network Analytics][4]. Se trata de consultas estáticas que se suelen utilizar para investigar el estado del DNS y ver las métricas más generales de DNS. Utiliza las consultas recomendadas como punto de partida para obtener más información sobre tu configuración de DNS y solucionar problemas de DNS. 

Puedes pasar el ratón por encima de una consulta recomendada para ver una breve descripción de lo que significan los resultados de la consulta. Haz clic en la consulta para ejecutarla y en **Clear query** (Borrar consulta) para eliminarla. Cada consulta recomendada tiene también su propio conjunto de gráficos recomendado; al borrar la consulta recomendada se restablecen los gráficos a su configuración por defecto. 

## Métricas

Las siguientes métricas de DNS están disponibles:

**Nota**: Los datos se recopilan cada 30 segundos, se agregan en buckets de cinco minutos y se conservan durante 14 días.

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

La tabla de red desglosa las métricas anteriores por cada dependencia _cliente_ y _servidor_ definida por tu consulta. Puedes configurar las columnas de la tabla mediante el icono de engranaje Personalizar (⚙️) situado en la parte superior derecha de la tabla.

Restringe el tráfico en tu vista con las [opciones][3] de **Filter Traffic** (Filtrar tráfico).

{{< img src="network_performance_monitoring/dns_monitoring/dns_table_view.png" alt="Página de CNM Analytics que muestra la vista de tabla del tráfico de red DNS." >}}

## Panel lateral

El panel lateral proporciona telemetría contextual para ayudar a depurar rápidamente las dependencias del servidor DNS. Utiliza las pestañas flujos, logs, trazas (traces) y procesos para determinar si el elevado número de solicitudes entrantes, el tiempo de respuesta o la tasa de fallos de un servidor DNS se deben a:

* Procesos intensos que consumen los recursos de la infraestructura subyacente
* Errores de aplicación en el código del lado del cliente
* Un elevado número de solicitudes procedentes de un puerto o IP determinados

{{< img src="network_performance_monitoring/dns_monitoring/dns_sidepanel_3.png" alt="Panel lateral de DNS Monitoring" style="width:100%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/network_monitoring/cloud_network_monitoring/setup
[2]: /es/network_monitoring/devices/snmp_metrics/?tab=snmpv2
[3]: /es/network_monitoring/cloud_network_monitoring/network_analytics#table
[4]: /es/network_monitoring/cloud_network_monitoring/network_analytics/#recommended-queries
[5]: https://app.datadoghq.com/network