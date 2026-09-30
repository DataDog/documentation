---
aliases:
- /es/integrations/avi_vantage
app_id: avi-vantage
categories:
- nube
- red
custom_kind: integración
description: Monitorizar el mantenimiento y el rendimiento de tus instancias de Avi
  Vantage
integration_version: 6.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Avi Vantage
---
## Información general

Este check monitoriza [Avi Vantage](https://avinetworks.com/why-avi/multi-cloud-load-balancing/) a través del Datadog Agent.

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Avi Vantage se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `avi_vantage.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento avi_vantage. Consulta el [avi_vantage.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/avi_vantage/datadog_checks/avi_vantage/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `avi_vantage` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **avi_vantage.controller_stats.avg_cpu_usage** <br>(gauge) | La vista del host del uso de la CPU como cantidad de CPU virtual utilizada activamente, como porcentaje de la CPU total disponible<br>_Se muestra como porcentaje_ |
| **avi_vantage.controller_stats.avg_disk_usage** <br>(gauge) | Uso medio del disco<br>_Se muestra en porcentaje_ |
| **avi_vantage.controller_stats.avg_disk_write_bytes** <br>(gauge) | Número medio de bytes por segundo escritos en disco.<br>_Se muestra como byte_ |
| **avi_vantage.controller_stats.avg_mem_usage** <br>(gauge) | Uso de memoria como porcentaje de la memoria total configurada o disponible<br>_Se muestra como porcentaje_ |
| **avi_vantage.l4_client.apdexc** <br>(gauge) | apdex que mide la calidad de las conexiones de red a los servidores|
| **avi_vantage.l4_client.avg_application_dos_attacks** <br>(gauge) | Número de ataques DDoS a aplicaciones|
| **avi_vantage.l4_client.avg_bandwidth** <br>(gauge) | Ancho de banda medio de la red de transmisión y recepción entre el cliente y el servicio virtual.|
| **avi_vantage.l4_client.avg_complete_conns** <br>(gauge) | Tasa de conexiones totales por segundo<br>_Se muestra como conexión_ |
| **avi_vantage.l4_client.avg_connections_dropped** <br>(gauge) | Tasa de conexiones perdidas por segundo<br>_Se muestra como conexión_ |
| **avi_vantage.l4_client.avg_lossy_connections** <br>(gauge) | Tasa de conexiones con pérdida por segundo<br>_Se muestra como conexión_ |
| **avi_vantage.l4_client.avg_new_established_conns** <br>(gauge) | Tasa media de nuevas conexiones de clientes por segundo.<br>_Se muestra como conexión_ |
| **avi_vantage.l4_client.avg_policy_drops** <br>(gauge) | Tasa de conexiones totales perdidas debido a la política de VS por segundo. Incluye caídas debidas a límites de velocidad, caídas de la política de seguridad, límites de conexión, etc.<br>_Se muestra como conexión_ |
| **avi_vantage.l4_client.avg_rx_bytes** <br>(gauge) | Tasa media de bytes recibidos por segundo<br>_Se muestra como byte_ |
| **avi_vantage.l4_client.avg_rx_pkts** <br>(gauge) | Tasa media de paquetes recibidos por segundo<br>_Se muestra como paquete_ |
| **avi_vantage.l4_client.avg_tx_bytes** <br>(gauge) | Tasa media de bytes transmitidos por segundo<br>_Se muestra como byte_ |
| **avi_vantage.l4_client.avg_tx_pkts** <br>(gauge) | Tasa media de paquetes transmitidos por segundo<br>_Se muestra como paquete_ |
| **avi_vantage.l4_client.max_open_conns** <br>(gauge) | Número máximo de conexiones abiertas<br>_Se muestra como conexión_ |
| **avi_vantage.l4_client.sum_end_to_end_rtt** <br>(gauge) | Suma de los RTT de extremo a extremo de la red experimentados por los clientes finales. Un valor más alto aumenta los tiempos de respuesta para los clientes.|
| **avi_vantage.l4_server.avg_bandwidth** <br>(gauge) | Ancho de banda medio de la red de transmisión y recepción entre el cliente y el servicio virtual.|
| **avi_vantage.l4_server.avg_errored_connections** <br>(gauge) | Tasa de conexiones con errores totales por segundo<br>_Se muestra como conexión_ |
| **avi_vantage.l4_server.avg_new_established_conns** <br>(gauge) | Tasa media de nuevas conexiones al servidor de grupos establecidas por segundo<br>_Se muestra como conexión_ |
| **avi_vantage.l4_server.avg_open_conns** <br>(gauge) | Número medio de conexiones abiertas<br>_Se muestra como conexión_ |
| **avi_vantage.l4_server.avg_pool_complete_conns** <br>(gauge) | Tasa media de conexiones totales por segundo en todos los servidores<br>_Se muestra como conexión_ |
| **avi_vantage.l4_server.avg_pool_open_conns** <br>(gauge) | Media por servidor de conexiones abiertas en el grupo<br>_Se muestra como conexión_ |
| **avi_vantage.l4_server.avg_rx_bytes** <br>(gauge) | Tasa media de bytes recibidos por segundo<br>_Se muestra como byte_ |
| **avi_vantage.l4_server.avg_rx_pkts** <br>(gauge) | Tasa media de paquetes recibidos por segundo<br>_Se muestra como paquete_ |
| **avi_vantage.l4_server.avg_tx_bytes** <br>(gauge) | Tasa media de bytes transmitidos por segundo<br>_Se muestra como byte_ |
| **avi_vantage.l4_server.avg_tx_pkts** <br>(gauge) | Tasa media de paquetes transmitidos por segundo<br>_Se muestra como paquete_ |
| **avi_vantage.l4_server.max_open_conns** <br>(gauge) | Número máximo de conexiones abiertas<br>_Se muestra como conexión_ |
| **avi_vantage.l4_server.sum_rtt** <br>(gauge) | RTT total en todas las conexiones|
| **avi_vantage.l7_client.apdexr** <br>(gauge) | Medida de la calidad de la respuesta del servidor basada en la latencia|
| **avi_vantage.l7_client.avg_client_txn_latency** <br>(gauge) | Latencia media de la transacción del cliente calculada sumando las latencias de respuesta de todas las solicitudes HTTP.<br>_Se muestra como segundo_ |
| **avi_vantage.l7_client.avg_complete_responses** <br>(gauge) | Tasa de respuestas HTTP enviadas por segundo<br>_Se muestra como respuesta_ |
| **avi_vantage.l7_client.avg_error_responses** <br>(gauge) | Tasa de respuestas de error HTTP por segundo enviadas a los clientes. No incluye los códigos de error que se han excluido en el perfil de análisis.<br>_Se muestra como error_ |
| **avi_vantage.l7_client.avg_frustrated_responses** <br>(gauge) | Número medio de solicitudes HTTP que se completaron dentro de la latencia frustrada<br>_Se muestra como solicitud_ |
| **avi_vantage.l7_client.avg_resp_2xx** <br>(gauge) | Tasa de respuestas HTTP 2xx enviadas por segundo<br>_Se muestra como respuesta_ |
| **avi_vantage.l7_client.avg_resp_4xx** <br>(gauge) | Tasa de respuestas HTTP 4xx enviadas por segundo<br>_Se muestra como respuesta_ |
| **avi_vantage.l7_client.avg_resp_4xx_avi_errors** <br>(gauge) | Tasa de respuestas HTTP 4xx como errores enviados por avi. No incluye ningún código de error excluido en el perfil de análisis y errores del servidor de grupo<br>_Se muestra como respuesta_ |
| **avi_vantage.l7_client.avg_resp_5xx** <br>(gauge) | Tasa de respuestas HTTP 5xx enviadas por segundo<br>_Se muestra como respuesta_ |
| **avi_vantage.l7_client.avg_resp_5xx_avi_errors** <br>(gauge) | Tasa de respuestas HTTP 5xx como errores enviados por avi. No incluye ningún código de error excluido en el perfil de análisis y errores del servidor de grupo<br>_Se muestra como respuesta_ |
| **avi_vantage.l7_client.avg_ssl_connections** <br>(gauge) | Media de sesiones SSL|
| **avi_vantage.l7_client.avg_ssl_errors** <br>(gauge) | Errores de conexión SSL por segundo debidos a clientes, errores de protocolo, errores de red y tiempos de espera de conexión<br>_Se muestra como error_ |
| **avi_vantage.l7_client.avg_ssl_handshakes_new** <br>(gauge) | Promedio de nuevas sesiones SSL exitosas|
| **avi_vantage.l7_client.avg_waf_attacks** <br>(gauge) | Número medio de transacciones por segundo identificadas por el WAF como ataques.<br>_Se muestra como transacción_ |
| **avi_vantage.l7_client.avg_waf_disabled** <br>(gauge) | Número medio de transacciones por segundo que eluden el WAF.<br>_Se muestra como transacción_ |
| **avi_vantage.l7_client.avg_waf_evaluated** <br>(gauge) | Número medio de transacciones por segundo evaluadas por el WAF.<br>_Se muestra como transacción_ |
| **avi_vantage.l7_client.avg_waf_matched** <br>(gauge) | Número medio de transacciones por segundo coincidentes con la regla o reglas WAF.<br>_Se muestra como transacción_ |
| **avi_vantage.l7_client.avg_waf_rejected** <br>(gauge) | Número medio de transacciones por segundo rechazadas por WAF.<br>_Se muestra como transacción_ |
| **avi_vantage.l7_client.pct_get_reqs** <br>(gauge) | Número de solicitudes HTTP GET como porcentaje del total de solicitudes recibidas.<br>_Se muestra como porcentaje_ |
| **avi_vantage.l7_client.pct_post_reqs** <br>(gauge) | Número de solicitudes HTTP POST como porcentaje del total de solicitudes recibidas.<br>_Se muestra como porcentaje_ |
| **avi_vantage.l7_client.pct_response_errors** <br>(gauge) | Porcentaje de respuestas 4xx y 5xx<br>_Se muestra como porcentaje_ |
| **avi_vantage.l7_client.pct_waf_attacks** <br>(gauge) | Transacciones maliciosas (ataques) identificadas por el WAF como porcentaje del total de solicitudes recibidas.<br>_Se muestra como porcentaje_ |
| **avi_vantage.l7_client.pct_waf_disabled** <br>(gauge) | Transacciones que eluden el WAF como porcentaje del total de solicitudes recibidas.<br>_Se muestra como porcentaje_ |
| **avi_vantage.l7_client.sum_application_response_time** <br>(gauge) | Tiempo total que tarda el servidor en responder a la solicitud.<br>_Se muestra como segundo_ |
| **avi_vantage.l7_client.sum_client_data_transfer_time** <br>(gauge) | Tiempo medio de transferencia de datos del cliente calculado sumando las latencias de respuesta de todas las solicitudes HTTP.<br>_Se muestra en segundos_ |
| **avi_vantage.l7_client.sum_get_reqs** <br>(gauge) | Número total de solicitudes HTTP GET<br>_Se muestra como solicitud_ |
| **avi_vantage.l7_client.sum_http_headers_bytes** <br>(gauge) | Tamaño total de los encabezados de las solicitudes HTTP.<br>_Se muestra como byte_ |
| **avi_vantage.l7_client.sum_http_headers_count** <br>(gauge) | Número total de encabezados HTTP en todas las solicitudes en un intervalo de métricas determinado.|
| **avi_vantage.l7_client.sum_http_params_count** <br>(gauge) | Número total de parámetros de solicitud HTTP.|
| **avi_vantage.l7_client.sum_other_reqs** <br>(gauge) | Número total de solicitudes HTTP que no son solicitudes GET o POST<br>_Se muestra como solicitud_ |
| **avi_vantage.l7_client.sum_page_load_time** <br>(gauge) | Total de tiempo de carga de la página comunicado por el cliente<br>_Se muestra en segundos_ |
| **avi_vantage.l7_client.sum_post_bytes** <br>(gauge) | Tamaño total de las solicitudes HTTP POST.<br>_Se muestra como byte_ |
| **avi_vantage.l7_client.sum_post_reqs** <br>(gauge) | Número total de solicitudes HTTP POST<br>_Se muestra como solicitud_ |
| **avi_vantage.l7_client.sum_total_responses** <br>(gauge) | Número total de respuestas HTTP enviadas<br>_Se muestra como respuesta_ |
| **avi_vantage.l7_client.sum_uri_length** <br>(gauge) | Longitud total de los URIs de solicitud HTTP.|
| **avi_vantage.l7_server.avg_complete_responses** <br>(gauge) | Tasa de respuestas HTTP enviadas por segundo<br>_Se muestra como respuesta_ |
| **avi_vantage.l7_server.avg_error_responses** <br>(gauge) | Tasa de respuestas de error HTTP enviadas por segundo. No incluye los errores excluidos en el perfil de análisis.<br>_Se muestra como respuesta_ |
| **avi_vantage.l7_server.avg_frustrated_responses** <br>(gauge) | Número medio de solicitudes HTTP que se han completado dentro de una latencia frustrada<br>_Se muestra como solicitud_ |
| **avi_vantage.l7_server.avg_resp_4xx** <br>(gauge) | Tasa de respuestas HTTP 4xx enviadas por segundo<br>_Se muestra como respuesta_ |
| **avi_vantage.l7_server.avg_resp_5xx** <br>(gauge) | Tasa de respuestas HTTP 5xx enviadas por segundo<br>_Se muestra como respuesta_ |
| **avi_vantage.l7_server.avg_total_requests** <br>(gauge) | Tasa media de solicitudes HTTP recibidas por el servidor de un grupo por segundo.<br>_Se muestra como solicitud_ |
| **avi_vantage.l7_server.sum_application_response_time** <br>(gauge) | Latencia media medida para el servidor de grupo<br>_Se muestra en segundos_ |
| **avi_vantage.l7_server.sum_get_resp_latency** <br>(gauge) | Latencia total de las respuestas a todas las solicitudes GET<br>_Se muestra en segundos_ |
| **avi_vantage.l7_server.sum_other_resp_latency** <br>(gauge) | Latencia total de las respuestas a todas las solicitudes que no sean GET o POST<br>_Se muestra en segundos_. |
| **avi_vantage.l7_server.sum_post_resp_latency** <br>(gauge) | Latencia total de las respuestas a todas las solicitudes POST<br>_Se muestra en segundos_ |
| **avi_vantage.pool_healthscore** <br>(gauge) | Valor de la puntuación de estado|
| **avi_vantage.se_stats.avg_connection_mem_usage** <br>(gauge) | Uso de memoria de conexión como porcentaje del total permitido para las conexiones<br>_Se muestra como porcentaje_ |
| **avi_vantage.se_stats.avg_connections** <br>(gauge) | Número medio de conexiones, incluidas las caídas por política. Esto sería lo mismo que el número de SYNS visto por SE en cualquier VS<br>_Se muestra como conexión_ |
| **avi_vantage.se_stats.avg_connections_dropped** <br>(gauge) | Número total de conexiones perdidas, excluidas las conexiones perdidas y las debidas a políticas. Esto sería lo mismo que el número de SYNS visto por SE en cualquier VS. Incluye las conexiones que no se han podido establecer<br>_Se muestra como conexión_ |
| **avi_vantage.se_stats.avg_cpu_usage** <br>(gauge) | La vista del host del uso de la CPU como cantidad de CPU virtual utilizada activamente, como porcentaje de la CPU total disponible<br>_Se muestra como porcentaje_ |
| **avi_vantage.se_stats.avg_disk1_usage** <br>(gauge) | Utilización de la capacidad del disco SE 1.|
| **avi_vantage.se_stats.avg_dynamic_mem_usage** <br>(gauge) | Porcentaje de uso de la memoria dinámica de SE.<br>_Se muestra como porcentaje_ |
| **avi_vantage.se_stats.avg_mem_usage** <br>(gauge) | Uso de memoria como porcentaje de la memoria total configurada o disponible<br>_Se muestra como porcentaje_ |
| **avi_vantage.se_stats.avg_packet_buffer_header_usage** <br>(gauge) | Uso del búfer de paquetes como porcentaje del total de encabezados del búfer de paquetes<br>_Se muestra como porcentaje_ |
| **avi_vantage.se_stats.avg_packet_buffer_large_usage** <br>(gauge) | Uso del búfer de paquetes como porcentaje del total de búferes de paquetes grandes<br>_Se muestra como porcentaje_ |
| **avi_vantage.se_stats.avg_packet_buffer_small_usage** <br>(gauge) | Uso del búfer de paquetes como porcentaje del total de búferes de paquetes pequeños<br>_Se muestra como porcentaje_ |
| **avi_vantage.se_stats.avg_packet_buffer_usage** <br>(gauge) | Uso del búfer de paquetes como porcentaje del total de búferes de paquetes configurados<br>_Se muestra como porcentaje_ |
| **avi_vantage.se_stats.avg_persistent_table_usage** <br>(gauge) | Porcentaje de uso de las entradas de la tabla de sesión persistente<br>_Se muestra como porcentaje_ |
| **avi_vantage.se_stats.avg_ssl_session_cache** <br>(gauge) | caché de sesión ssl|
| **avi_vantage.se_stats.pct_syn_cache_usage** <br>(gauge) | Porcentaje de uso de la caché SYN. Un mayor uso indica demasiados intentos de conexión y abierto en el motor de servicio<br>_Se muestra como porcentaje_ |
| **avi_vantage.service_engine_healthscore** <br>(gauge) | Valor de la puntuación de estado|
| **avi_vantage.virtual_service_healthscore** <br>(gauge) | Valor de la puntuación de estado|

### Checks de servicio

**avi_vantage.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse a la instancia de Avi Vantage monitorizada. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

### Eventos

Avi Vantage no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).