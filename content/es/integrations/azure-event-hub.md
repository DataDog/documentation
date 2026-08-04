---
aliases:
- /es/integrations/azure_event_hub
app_id: azure-event-hub
categories:
- azure
- nube
- recopilación de logs
- notificaciones
custom_kind: integración
description: Azure Event Hub es un servicio gestionado de flujo de datos a gran escala
media: []
title: Azure Event Hub
---
## Información general

Azure Event Hub es un servicio gestionado de flujo (stream) de datos a gran escala.

Obtén métricas de Azure Event Hub para:

- Visualizar el rendimiento de tus Event Hubs
- Correlacionar el rendimiento de tus Event Hubs con tus aplicaciones

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración con Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún otro paso de instalación.

### Recopilación de métricas

En el [cuadro de integración de Azure](https://docs.datadoghq.com/integrations/azure/), asegúrate de que `Event Hub` está marcado en la recopilación de métricas.

### Recopilación de logs

Para recopilar logs de Event Hubs, sigue este proceso general:

- Crea un Azure Event Hub desde el portal de Azure, la CLI de Azure o PowerShell.
- Configura la función Azure de Datadog que reenvía logs desde su centro de eventos a Datadog.
- Reenvía tus logs de Event Hubs al Event Hub recién creado.

Para obtener instrucciones detalladas, sigue la [documentación principal de logs de Azure](https://docs.datadoghq.com/integrations/azure/#log-collection).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.eventhub_namespaces.active_connections** <br>(count) | Total de conexiones activas para Microsoft.EventHub.<br>_Se muestra como conexión_ |
| **azure.eventhub_namespaces.archive_backlog_messages** <br>(count) | Event Hub archiva mensajes en backlog para un espacio de nombres (Obsoleto)<br>_Se muestra como mensaje_ |
| **azure.eventhub_namespaces.archive_message_throughput** <br>(rate) | Rendimiento de mensajes archivados de Event Hub en un espacio de nombres (Obsoleto)<br>_Se muestra como byte_ |
| **azure.eventhub_namespaces.archive_messages** <br>(count) | Mensajes archivados de Event Hub en un espacio de nombres (Obsoleto)<br>_Se muestra como mensaje_ |
| **azure.eventhub_namespaces.capture_backlog.** <br>(count) | Captura backlog para Microsoft.EventHub.|
| **azure.eventhub_namespaces.captured_bytes.** <br>(gauge) | Bytes capturados para Microsoft.EventHub.<br>_Se muestra como byte_ |
| **azure.eventhub_namespaces.captured_messages.** <br>(count) | Mensajes capturados para Microsoft.EventHub.<br>_Se muestra como mensaje_ |
| **azure.eventhub_namespaces.connections_closed.** <br>(count) | Conexiones cerradas para Microsoft.EventHub.<br>_Se muestra como conexión_ |
| **azure.eventhub_namespaces.connections_opened.** <br>(count) | Conexiones abiertas para Microsoft.EventHub.<br>_Se muestra como conexión_ |
| **azure.eventhub_namespaces.failed_requests** <br>(count) | Total de solicitudes fallidas para un espacio de nombres (Obsoleto)<br>_Se muestra como solicitud_ |
| **azure.eventhub_namespaces.incoming_bytes_deprecated** <br>(gauge) | Rendimiento de mensajes entrantes de Event Hub para un espacio de nombres (Obsoleto)<br>_Se muestra como byte_ |
| **azure.eventhub_namespaces.incoming_bytes_per_sec** <br>(gauge) | Bytes entrantes por segundo para Microsoft.EventHub.<br>_Se muestra como byte_ |
| **azure.eventhub_namespaces.incoming_bytes.** <br>(gauge) | Bytes entrantes para Microsoft.EventHub.<br>_Se muestra como byte_ |
| **azure.eventhub_namespaces.incoming_messages** <br>(count) | Mensajes entrantes para Microsoft.EventHub.<br>_Se muestra como mensaje_ |
| **azure.eventhub_namespaces.incoming_messages_deprecated** <br>(count) | Total de mensajes entrantes para un espacio de nombres (Obsoleto)<br>_Se muestra como mensaje_ |
| **azure.eventhub_namespaces.incoming_messages_count** <br>(count) | Total de mensajes entrantes para un espacio de nombres. Esta métrica está obsoleta.<br>_Se muestra como mensaje_ |
| **azure.eventhub_namespaces.incoming_requests** <br>(count) | Solicitudes entrantes para Microsoft.EventHub.<br>_Se muestra como solicitud_ |
| **azure.eventhub_namespaces.incoming_requests_deprecated** <br>(count) | Total de solicitudes de envío entrantes para un espacio de nombres (Obsoleto).<br>_Se muestra como solicitud_ |
| **azure.eventhub_namespaces.internal_server_errors** <br>(count) | Total de errores internos del servidor para un espacio de nombres (Obsoleto)<br>_Se muestra como error_ |
| **azure.eventhub_namespaces.other_errors** <br>(count) | Total de solicitudes fallidas para un espacio de nombres (obsoleto)<br>_Se muestra como error_ |
| **azure.eventhub_namespaces.outgoing_bytes_deprecated** <br>(gauge) | Rendimiento de mensajes salientes del Event Hub para un espacio de nombres (Obsoleto)<br>_Se muestra como byte_ |
| **azure.eventhub_namespaces.outgoing_bytes_per_sec** <br>(rate) | Bytes salientes por segundo para Microsoft.EventHub.<br>_Se muestra como byte_ |
| **azure.eventhub_namespaces.outgoing_bytes.** <br>(gauge) | Bytes salientes para Microsoft.EventHub.<br>_Se muestra como byte_ |
| **azure.eventhub_namespaces.outgoing_messages** <br>(count) | Mensajes salientes para Microsoft.EventHub.<br>_Se muestra como mensaje_ |
| **azure.eventhub_namespaces.outgoing_messages_count** <br>(count) | Total de mensajes salientes para un espacio de nombres. Esta métrica está obsoleta.<br>_Se muestra como mensaje_ |
| **azure.eventhub_namespaces.outgoing_messages_deprecated** <br>(count) | Total de mensajes salientes para un espacio de nombres (Obsoleto)<br>_Se muestra como mensaje_ |
| **azure.eventhub_namespaces.quota_exceeded_errors.** <br>(count) | Errores de cuota excedida para Microsoft.EventHub.<br>_Se muestra como error_ |
| **azure.eventhub_namespaces.server_busy_errors** <br>(count) | Total de errores de servidor ocupado para un espacio de nombres (Obsoleto)<br>_Se muestra como error_ |
| **azure.eventhub_namespaces.server_errors.** <br>(count) | Errores del servidor para Microsoft.EventHub.<br>_Se muestra como error_ |
| **azure.eventhub_namespaces.size** <br>(gauge) | Tamaño de un EventHub en bytes.<br>_Se muestra como byte_ |
| **azure.eventhub_namespaces.count** <br>(count) | Recuento de la integración de Azure Event Hub|
| **azure.eventhub_namespaces.successful_requests** <br>(count) | Solicitudes con éxito para Microsoft.EventHub.<br>_Se muestra como solicitud_ |
| **azure.eventhub_namespaces.successful_requests_deprecated** <br>(count) | Total de solicitudes correctas para un espacio de nombres (obsoleto)<br>_Se muestra como solicitud_ |
| **azure.eventhub_namespaces.throttled_requests.** <br>(count) | Solicitudes limitadas para Microsoft.EventHub.<br>_Se muestra como solicitud_ |
| **azure.eventhub_namespaces.user_errors.** <br>(count) | Errores de usuario para Microsoft.EventHub.<br>_Se muestra como error_ |
| **azure.eventhub_clusters.active_connections** <br>(count) | El total de conexiones activas para Microsoft EventHub.<br>_Se muestra como conexión_ |
| **azure.eventhub_clusters.available_memory** <br>(gauge) | La memoria disponible para el clúster de EventHub como porcentaje de la memoria total.<br>_Se muestra como porcentaje_ |
| **azure.eventhub_clusters.capture_backlog** <br>(count) | El número de captura de backlogs para Microsoft EventHub.|
| **azure.eventhub_clusters.captured_bytes** <br>(gauge) | Los bytes capturados para Microsoft EventHub.<br>_Se muestra como byte_ |
| **azure.eventhub_clusters.captured_messages** <br>(count) | El número de mensajes capturados para Microsoft EventHub.<br>_Se muestra como mensaje_ |
| **azure.eventhub_clusters.connections_closed** <br>(count) | El número de conexiones cerradas para Microsoft EventHub.<br>_Se muestra como conexión_ |
| **azure.eventhub_clusters.connections_opened** <br>(count) | El número de conexiones abiertas para Microsoft EventHub.<br>_Se muestra como conexión_ |
| **azure.eventhub_clusters.cpu** <br>(gauge) | La utilización de la CPU para el clúster de EventHub como porcentaje<br>_Se muestra como porcentaje_ |
| **azure.eventhub_clusters.incoming_bytes** <br>(gauge) | Los bytes entrantes para Microsoft EventHub.<br>_Se muestra como byte_ |
| **azure.eventhub_clusters.incoming_messages** <br>(count) | El número de mensajes entrantes para Microsoft EventHub.<br>_Se muestra como mensaje_ |
| **azure.eventhub_clusters.incoming_requests** <br>(count) | El número de solicitudes entrantes para Microsoft EventHub.<br>_Se muestra como solicitud_ |
| **azure.eventhub_clusters.outgoing_bytes** <br>(gauge) | Los bytes salientes para Microsoft EventHub.<br>_Se muestra como byte_ |
| **azure.eventhub_clusters.outgoing_messages** <br>(count) | El número de mensajes salientes para Microsoft EventHub.<br>_Se muestra como mensaje_ |
| **azure.eventhub_clusters.quota_exceeded_errors** <br>(count) | El número de errores de cuota excedida para Microsoft EventHub.<br>_Se muestra como error_ |
| **azure.eventhub_clusters.server_errors** <br>(count) | El número de errores de servidor para Microsoft EventHub.<br>_Se muestra como error_ |
| **azure.eventhub_clusters.size** <br>(gauge) | El tamaño de un EventHub en bytes.<br>_Se muestra como byte_ |
| **azure.eventhub_clusters.successful_requests** <br>(count) | El número de solicitudes exitosas para Microsoft EventHub.<br>_Se muestra como solicitud_ |
| **azure.eventhub_clusters.throttled_requests** <br>(count) | El número de solicitudes limitadas para Microsoft EventHub.<br>_Se muestra como solicitud_ |
| **azure.eventhub_clusters.user_errors** <br>(count) | El número de errores de usuario para Microsoft EventHub.<br>_Se muestra como error_ |
| **azure.eventhub_clusters.count** <br>(gauge) | El recuento de la integración de clústeres de Azure EventHub|

### Eventos

La integración Azure Event Hub no incluye eventos.

### Checks de servicio

La integración Azure Event Hub no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).