---
aliases:
- /es/integrations/azure_api_management
app_id: azure-apimanagement
categories:
- nube
- azure
custom_kind: integración
description: Rastrea las métricas principales de Azure API Management.
media: []
title: Azure API Management
---
## Información general

Azure API Management es un servicio totalmente gestionado que permite a los clientes publicar, proteger, transformar, mantener y monitorizar las API.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure API Management.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.apimanagement_service.failed_requests** <br>(count) | El número de fallos en las solicitudes de gateway<br>_Se muestra como solicitud_ |
| **azure.apimanagement_service.other_requests** <br>(count) | El número de otras solicitudes de gateway<br>_Se muestra como solicitud_ |
| **azure.apimanagement_service.overall_duration_of_gateway_requests** <br>(gauge) | La duración total de las solicitudes de gateway en milisegundos<br>_Se muestra en milisegundos_ |
| **azure.apimanagement_service.duration_of_backend_requests** <br>(gauge) | La duración de las solicitudes de gateway en milisegundos<br>_Se muestra como milisegundo_ |
| **azure.apimanagement_service.count** <br>(gauge) | El recuento de recursos de Azure API Management Service|
| **azure.apimanagement_service.network_connectivity_status_of_resources** <br>(gauge) | El estado de conectividad de red de los tipos de recursos dependientes|
| **azure.apimanagement_service.successful_requests** <br>(count) | El número de solicitudes de gateway realizadas con éxito<br>_Se muestra como solicitud_ |
| **azure.apimanagement_service.total_requests** <br>(count) | El número de solicitudes de gateway<br>_Se muestra como solicitud_ |
| **azure.apimanagement_service.unauthorized_requests** <br>(count) | El número de solicitudes de gateway no autorizadas<br>_Se muestra como solicitud_ |
| **azure.apimanagement_service.requests** <br>(count) | El número de solicitudes con dimensiones<br>_Se muestra como solicitud_ |
| **azure.apimanagement_service.capacity** <br>(gauge) | La métrica de utilización del servicio API Management<br>_Se muestra en porcentaje_ |
| **azure.apimanagement_service.total_event_hub_events** <br>(count) | El número de eventos enviados a EventHub<br>_Se muestra como evento_ |
| **azure.apimanagement_service.failed_event_hub_events** <br>(count) | El número de eventos EventHub fallidos<br>_Se muestra como evento_ |
| **azure.apimanagement_service.dropped_event_hub_events** <br>(count) | El número de eventos omitidos debido al límite de tamaño de la cola<br>_Se muestra como evento_ |
| **azure.apimanagement_service.rejected_event_hub_events** <br>(count) | El número de eventos rechazados<br>_Se muestra como evento_ |
| **azure.apimanagement_service.throttled_event_hub_events** <br>(count) | El número de eventos EventHub limitados<br>_Se muestra como evento_ |
| **azure.apimanagement_service.timed_out_event_hub_events** <br>(count) | El número de eventos EventHub temporizados<br>_Se muestra como evento_ |
| **azure.apimanagement_service.successful_event_hub_events** <br>(count) | Número de eventos EventHub realizados con éxito<br>_Se muestra como evento_ |
| **azure.apimanagement_service.size_of_event_hub_events** <br>(count) | El tamaño total de los eventos EventHub en bytes<br>_Se muestra como byte_ |

### Eventos

La integración Azure API Management no incluye ningún evento.

### Checks de servicio

La integración Azure API Management no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).