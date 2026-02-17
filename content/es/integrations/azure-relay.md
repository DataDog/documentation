---
aliases:
- /es/integrations/azure_relay
app_id: azure-relay
categories:
- azure
- nube
- red
custom_kind: integración
description: Rastrea las métricas principales de Azure Relay.
media: []
title: Azure Relay
---
## Información general

El servicio Azure Relay te permite exponer de forma segura los servicios que se ejecutan en tu red corporativa a la nube pública sin abrir un puerto en tu firewall ni realizar cambios intrusivos en la infraestructura de tu red corporativa.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Relay.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft y Azure](https://docs.datadoghq.com/integrations/azure/). No hay más pasos de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.relay_namespaces.active_connections** <br>(count) | Total de conexiones activas<br>_Mostrado como connection (conexión)_ |
| **azure.relay_namespaces.active_listeners** <br>(count) | Total de ActiveListeners|
| **azure.relay_namespaces.bytes_transferred** <br>(count) | Total de bytes transferidos<br>_Mostrado como byte_ |
| **azure.relay_namespaces.listener_connections_client_error** <br>(count) | ClientError en ListenerConnections|
| **azure.relay_namespaces.listener_connections_server_error** <br>(count) | ServerError en ListenerConnections|
| **azure.relay_namespaces.listener_connections_success** <br>(count) | ListenerConnections con éxito<br>_Mostrado como connection (conexión)_ |
| **azure.relay_namespaces.listener_connections_total_requests** <br>(count) | Total de ListenerConnections<br>_Mostrado como connection (conexión)_ |
| **azure.relay_namespaces.listener_disconnects** <br>(count) | Total de ListenerDisconnects|
| **azure.relay_namespaces.sender_connections_client_error** <br>(count) | ClientError en SenderConnections|
| **azure.relay_namespaces.sender_connections_server_error** <br>(count) | ServerError en SenderConnections|
| **azure.relay_namespaces.sender_connections_success** <br>(count) | SenderConnections con éxito<br>_Mostrado como connection (conexión)_ |
| **azure.relay_namespaces.sender_connections_total_requests** <br>(count) | Total de solicitudes SenderConnections<br>_Mostrado como connection (conexión)_ |
| **azure.relay_namespaces.sender_disconnects** <br>(count) | Total de SenderDisconnects|
| **azure.relay_namespaces.count** <br>(gauge) | El count de todos los recursos de Azure Relay|

### Eventos

La integración Azure Relay no incluye eventos.

### Checks de servicio

La integración de Azure Relay no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).