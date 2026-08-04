---
app_id: azure_app_configuration
categories:
- nube
- azure
custom_kind: integración
description: Realiza el seguimiento de métricas clave de Azure App Configuration.
title: Microsoft Azure App Configuration
---
## Información general

Azure App Configuration proporciona un servicio central para gestionar parámetros y marcadores de características de aplicaciones. App Configuration te permite almacenar todos los parámetros de tu aplicación y asegurar su acceso en un solo lugar.

Mediante el uso de [la integración de Datadog y Azure](https://docs.datadoghq.com/integrations/azure/), puedes recopilar métricas de Azure App Configuration para monitorizar solicitudes entrantes, latencia y errores de limitación.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración de Microsoft Azure](https://app.datadoghq.com/integrations/azure). No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.appconfiguration_configurationstores.http_incoming_request_count** <br>(count) | Número total de solicitudes HTTP entrantes.<br>_Se muestra como solicitud_ |
| **azure.appconfiguration_configurationstores.http_incoming_request_duration** <br>(gauge) | Latencia de una solicitud HTTP.<br>_Se muestra en milisegundos_ |
| **azure.appconfiguration_configurationstores.throttled_http_request_count** <br>(count) | Solicitudes HTTP limitadas.<br>_Se muestra como solicitud_ |
| **azure.appconfiguration_configurationstores.count** <br>(gauge) | Recuento de AppConfiguration configurationStores.|

### Eventos

La integración Azure App Configuration no incluye eventos.

### Checks de servicio

La integración Azure App Configuration no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).