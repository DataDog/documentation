---
aliases:
- /es/integrations/azure_container_apps
app_id: azure-container-apps
categories:
- azure
- nube
- rastreo
custom_kind: integración
description: Rastrea las métricas clave de Azure Container Apps.
media: []
title: Azure Container Apps
---
## Información general

Azure Container Apps permite crear e implementar aplicaciones y microservicios modernos mediante contenedores sin servidor. Para obtener más información, consulta la [documentación de Microsoft](https://docs.microsoft.com/en-us/azure/container-apps/overview) para Azure Container Apps.

## Configuración

### Instalación

Si aún no lo has hecho, configura [primero la integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.app_containerapps.count** <br>(gauge) | El recuento de aplicaciones de contenedores.|
| **azure.app_containerapps.replicas** <br>(gauge) | Número de réplicas de la aplicación de contenedores|
| **azure.app_containerapps.requests** <br>(count) | Solicitudes procesadas<br>_Se muestra como solicitud_ |
| **azure.app_containerapps.restart_count** <br>(gauge) | Recuento de reinicios de réplicas de aplicaciones de contenedores|
| **azure.app_containerapps.rx_bytes** <br>(count) | Bytes de red recibidos<br>_Se muestra como byte_ |
| **azure.app_containerapps.tx_bytes** <br>(count) | Bytes transmitidos por la red<br>_Se muestra como byte_ |
| **azure.app_containerapps.usage_nano_cores** <br>(gauge) | CPU consumida por la aplicación de contenedores; en nanonúcleos. 1;000;000;000 nano núcleos = 1 núcleo<br>_Se muestra como nanonúcleo_ |
| **azure.app_containerapps.working_set_bytes** <br>(gauge) | Memoria del conjunto de trabajo de Container App utilizada en bytes.<br>_Se muestra como byte_ |

### Eventos

La integración Azure Container Apps no incluye eventos.

### Checks de servicio

La integración Azure Container Apps no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).