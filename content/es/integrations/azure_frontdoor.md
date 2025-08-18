---
app_id: azure_frontdoor
categories:
- nube
- azure
custom_kind: integración
description: Rastrea las métricas principales de Azure Front Door.
title: Microsoft Azure Front Door
---
## Información general

Azure Front Door es la moderna Content Delivery Network (CDN) en la nube de Microsoft que proporciona acceso rápido, confiable y seguro entre tus usuarios y el contenido web estático y dinámico de tus aplicaciones en todo el mundo.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Front Door.

**Nota**: El nivel Clásico utiliza el espacio de nombres `azure.network_frontdoors.*` como se muestra a continuación. En los niveles Estándar y Premium, las métricas aparecen en el espacio de nombres `azure.cdn_profiles.*`.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.network_frontdoors.backend_health_percentage** <br>(gauge) | Porcentaje de sondeos de salud exitosos desde el proxy HTTP/S a los backends<br>_Se muestra como porcentaje_. |
| **azure.network_frontdoors.backend_request_count** <br>(count) | Número de solicitudes enviadas desde el proxy HTTP/S a los backends|
| **azure.network_frontdoors.backend_request_latency** <br>(gauge) | Tiempo calculado desde que la solicitud fue enviada por el proxy HTTP/S al backend hasta que el proxy HTTP/S recibió el último byte de respuesta del backend<br>_Se muestra como milisegundo_ |
| **azure.network_frontdoors.billable_response_size** <br>(count) | Número de bytes facturables (mínimo 2 KB por solicitud) enviados como respuestas desde el proxy HTTP/S a los clientes<br>_Se muestra como byte_ |
| **azure.network_frontdoors.request_count** <br>(count) | Número de solicitudes de clientes entregadas por el proxy HTTP/S|
| **azure.network_frontdoors.request_size** <br>(count) | Número de bytes enviados como solicitudes de clientes al proxy HTTP/S<br>_Se muestra como byte_ |
| **azure.network_frontdoors.response_size** <br>(count) | Número de bytes enviados como respuestas del proxy HTTP/S al cliente<br>_Se muestra como byte_ |
| **azure.network_frontdoors.total_latency** <br>(gauge) | Tiempo calculado desde que la solicitud del cliente fue recibida por el proxy HTTP/S hasta que el cliente confirmó recepción del último byte de respuesta del proxy HTTP/S<br>_Se muestra como milisegundo_ |
| **azure.network_frontdoors.web_application_firewall_request_count** <br>(count) | Número de solicitudes de clientes procesadas por el Web Application Firewall|

### Eventos

La integración Azure Front Door no incluye eventos.

### Checks de servicio

La integración Azure Front Door no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).