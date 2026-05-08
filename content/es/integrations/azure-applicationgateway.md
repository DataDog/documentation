---
aliases:
- /es/integrations/azure_application_gateway
app_id: azure-applicationgateway
categories:
- nube
- azure
custom_kind: integración
description: Rastrea las métricas principales de Azure Application Gateway.
media: []
title: Azure Application Gateway
---
## Información general

Azure Application Gateway es un equilibrador de carga de tráfico web que te permite gestionar el tráfico a tus aplicaciones web.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Application Gateway.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.network_applicationgateways.cpu_utilization** <br>(gauge) | Utilización actual de la CPU del Application Gateway. Disponible solo para SKU V1.<br>_Se muestra como porcentaje_ |
| **azure.network_applicationgateways.current_connections** <br>(gauge) | Recuento de conexiones actuales establecidas con Application Gateway<br>_Se muestra como conexión_ |
| **azure.network_applicationgateways.failed_requests** <br>(count) | Recuento de solicitudes fallidas que Application Gateway ha enviado<br>_Se muestra como solicitud_ |
| **azure.network_applicationgateways.response_status** <br>(count) | Estado de la respuesta HTTP devuelta por el Application Gateway|
| **azure.network_applicationgateways.throughput** <br>(rate) | Número de bytes por segundo que el Application Gateway ha enviado<br>_Se muestra como byte_ |
| **azure.network_applicationgateways.total_requests** <br>(count) | Recuento de solicitudes atendidas con éxito por el Application Gateway<br>_Se muestra como solicitud_ |
| **azure.network_applicationgateways.healthy_host_count** <br>(gauge) | Número de hosts de backend en buen estado<br>_Se muestra como host_ |
| **azure.network_applicationgateways.unhealthy_host_count** <br>(gauge) | Número de hosts de backend en mal estado<br>_Se muestra como host_ |
| **azure.network_applicationgateways.avg_request_count_per_healthy_host** <br>(gauge) | Recuento medio de solicitudes por minuto por host de backend en buen estado en un grupo.<br>_Se muestra como solicitud_ |
| **azure.network_applicationgateways.backend_connect_time** <br>(gauge) | Tiempo empleado en establecer una conexión con un servidor de backend. Disponible solo para SKU V2.<br>_Se muestra como milisegundo_ |
| **azure.network_applicationgateways.backend_first_byte_response_time** <br>(gauge) | Intervalo de tiempo entre el inicio del establecimiento de una conexión al servidor de backend y la recepción del primer byte del encabezado de respuesta. Disponible solo para SKU V2.<br>_Se muestra como milisegundo_ |
| **azure.network_applicationgateways.backend_last_byte_response_time** <br>(gauge) | Intervalo de tiempo entre el inicio del establecimiento de una conexión al servidor de backend y la recepción del último byte del cuerpo de la respuesta. Disponible solo para SKU V2.<br>_Se muestra como milisegundo_ |
| **azure.network_applicationgateways.application_gateway_total_time** <br>(gauge) | Tiempo medio que tarda en procesarse una solicitud y enviarse su respuesta. Disponible solo para SKU V2.<br>_Se muestra en milisegundos_ |
| **azure.network_applicationgateways.client_rtt** <br>(gauge) | Tiempo medio de ida y vuelta entre los clientes y el Application Gateway. Disponible solo para SKU V2.<br>_Se muestra en milisegundos_ |
| **azure.network_applicationgateways.bytes_sent** <br>(count) | Número de bytes enviados a través del Application Gateway. Disponible solo para SKU V2.<br>_Se muestra como byte_ |
| **azure.network_applicationgateways.bytes_received** <br>(count) | Número de bytes recibidos a través del Application Gateway. Disponible solo para SKU V2.<br>_Se muestra como byte_ |
| **azure.network_applicationgateways.tls_protocol** <br>(count) | Número de solicitudes TLS y no TLS iniciadas por el cliente que estableció conexión con el Application Gateway. Disponible solo para SKU V2.|
| **azure.network_applicationgateways.compute_units** <br>(gauge) | Unidades de cálculo consumidas. Disponible solo para SKU V2.|
| **azure.network_applicationgateways.capacity_units** <br>(gauge) | Unidades de capacidad consumidas. Disponible solo para V2 SKU.|
| **azure.network_applicationgateways.estimated_billed_capacity_units** <br>(gauge) | Unidades de capacidad estimada que se cargarán. Disponible solo para V2 SKU.|
| **azure.network_applicationgateways.fixed_billable_capacity_units** <br>(gauge) | Unidades de capacidad mínima que se cargarán. Disponible solo para V2 SKU.|
| **azure.network_applicationgateways.new_connections_per_second** <br>(rate) | Nuevas conexiones por segundo establecidas con Application Gateway. Disponible solo para SKU V2.<br>_Se muestra como conexión_. |
| **azure.network_applicationgateways.backend_response_status** <br>(count) | Estado de la respuesta del backend. Disponible solo para V2 SKU.|
| **azure.network_applicationgateways.matched_count** <br>(count) | Distribución total de reglas del Web Application Firewall para el tráfico entrante|
| **azure.network_applicationgateways.blocked_req_count** <br>(count) | Recuento de solicitudes bloqueadas por el Web Application Firewall|
| **azure.network_applicationgateways.blocked_count** <br>(count) | Distribución de reglas de solicitudes bloqueadas del Web Application Firewall|
| **azure.network_applicationgateways.azwaf_total_requests** <br>(count) | Número de solicitudes enviadas correctamente por el motor WAF (WAF v2)|
| **azure.network_applicationgateways.azwaf_sec_rule** <br>(count) | Recuento del total de coincidencias de reglas gestionadas (WAF v2)|
| **azure.network_applicationgateways.azwaf_custom_rule** <br>(count) | Recuento de coincidencias de reglas personalizadas (WAF v2)|
| **azure.network_applicationgateways.azwaf_bot_protection** <br>(count) | Recuento del total de coincidencias de reglas de protección contra bots que se bloquearon o registraron desde direcciones IP maliciosas procedentes de la fuente de Microsoft Threat Intelligence (WAF v2).|
| **azure.network_applicationgateways.backend_tls_negotiation_error** <br>(count) | Errores de conexión TLS para el Application Gateway Backend|
| **azure.network_applicationgateways.rejected_connections** <br>(count) | El recuento de conexiones rechazadas para el Application Gateway Frontend<br>_Se muestra como conexión_ |
| **azure.network_applicationgateways.count** <br>(gauge) | Recuento de todos los recursos del Application Gateway|

### Eventos

La integración Azure Application Gateway no incluye ningún evento.

### Checks de servicio

La integración Azure Application Gateway no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).