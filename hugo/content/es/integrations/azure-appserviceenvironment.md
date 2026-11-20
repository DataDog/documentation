---
aliases:
- /es/integrations/azure_app_service_environment
app_id: azure-appserviceenvironment
categories:
- nube
- azure
custom_kind: integración
description: Rastrea las métricas principales de Azure App Service Environment.
media: []
title: Entorno de Azure App Service
---
## Información general

Azure App Service Environment es una característica de Azure App Service que proporciona un entorno totalmente aislado y dedicado para ejecutar de forma segura aplicaciones de App Service a gran escala.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure App Service Environment.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.web_hostingenvironments.active_requests** <br>(count) | Solicitudes activas<br>_Se muestra como solicitud_ |
| **azure.web_hostingenvironments.average_response_time** <br>(gauge) | Tiempo medio de respuesta<br>_Se muestra en segundos_ |
| **azure.web_hostingenviHTTPronments.bytes_sent** <br>(gauge) | Datos salientes<br>_Se muestra como byte_ |
| **azure.web_hostingenvironments.cpu_percentage** <br>(gauge) | Porcentaje de CPU<br>_Se muestra como porcentaje_ |
| **azure.web_hostingenvironments.disk_queue_length** <br>(gauge) | Longitud de la cola de disco|
| **azure.web_hostingenvironments.http_queue_length** <br>(gauge) | Longitud de la cola HTTP|
| **azure.web_hostingenvironments.http_response_time** <br>(gauge) | El tiempo medio de respuesta del frontend para enviar las solicitudes<br>_Se muestra en segundos_ |
| **azure.web_hostingenvironments.http101** <br>(count) | HTTP 101|
| **azure.web_hostingenvironments.http2xx** <br>(count) | HTTP 2xx|
| **azure.web_hostingenvironments.http3xx** <br>(count) | HTTP 3xx|
| **azure.web_hostingenvironments.http401** <br>(count) | HTTP 401|
| **azure.web_hostingenvironments.http403** <br>(count) | HTTP 403|
| **azure.web_hostingenvironments.http404** <br>(count) | HTTP 404|
| **azure.web_hostingenvironments.http406** <br>(count) | HTTP 406|
| **azure.web_hostingenvironments.http4xx** <br>(count) | HTTP 4xx|
| **azure.web_hostingenvironments.http5xx** <br>(count) | Errores del servidor HTTP|
| **azure.web_hostingenvironments.large_app_service_plan_instances** <br>(count) | Workers grandes de App Service Plan<br>_Se muestra como instancia_ |
| **azure.web_hostingenvironments.medium_app_service_plan_instances** <br>(count) | Workers medios de App Service Plan<br>_Se muestra como instancia_ |
| **azure.web_hostingenvironments.memory_percentage** <br>(gauge) | Porcentaje de memoria<br>_Se muestra en porcentaje_ |
| **azure.web_hostingenvironments.requests** <br>(count) | Solicitudes<br>_Se muestra como solicitud_ |
| **azure.web_hostingenvironments.small_app_service_plan_instances** <br>(count) | Workers pequeños de App Service Plan<br>_Se muestra como instancia_ |
| **azure.web_hostingenvironments.total_front_ends** <br>(count) | Total de frontends|
| **azure.web_hostingenvironments_multirolepools.active_requests** <br>(count) | Solicitudes activas<br>_Se muestra como solicitud_ |
| **azure.web_hostingenvironments_multirolepools.average_response_time** <br>(gauge) | Tiempo medio de respuesta<br>_Se muestra en segundos_ |
| **azure.web_hostingenvironments_multirolepools.bytes_received** <br>(gauge) | Datos entrantes<br>_Se muestra como byte_ |
| **azure.web_hostingenvironments_multirolepools.bytes_sent** <br>(gauge) | Datos salientes<br>_Se muestra como byte_ |
| **azure.web_hostingenvironments_multirolepools.cpu_percentage** <br>(gauge) | Porcentaje de CPU<br>_Se muestra como porcentaje_ |
| **azure.web_hostingenvironments_multirolepools.disk_queue_length** <br>(gauge) | Longitud de la cola de disco|
| **azure.web_hostingenvironments_multirolepools.http_queue_length** <br>(gauge) | Longitud de la cola HTTP|
| **azure.web_hostingenvironments_multirolepools.http_response_time** <br>(gauge) | El tiempo medio de respuesta del frontend para enviar las solicitudes<br>_Se muestra en segundos_ |
| **azure.web_hostingenvironments_multirolepools.http101** <br>(count) | HTTP 101|
| **azure.web_hostingenvironments_multirolepools.http2xx** <br>(count) | HTTP 2xx|
| **azure.web_hostingenvironments_multirolepools.http3xx** <br>(count) | HTTP 3xx|
| **azure.web_hostingenvironments_multirolepools.http401** <br>(count) | HTTP 401|
| **azure.web_hostingenvironments_multirolepools.http403** <br>(count) | HTTP 403|
| **azure.web_hostingenvironments_multirolepools.http404** <br>(count) | HTTP 404|
| **azure.web_hostingenvironments_multirolepools.http406** <br>(count) | HTTP 406|
| **azure.web_hostingenvironments_multirolepools.http4xx** <br>(count) | HTTP 4xx|
| **azure.web_hostingenvironments_multirolepools.http5xx** <br>(count) | Errores del servidor HTTP|
| **azure.web_hostingenvironments_multirolepools.large_app_service_plan_instances** <br>(count) | Workers grandes de App Service Plan<br>_Se muestra como instancia_ |
| **azure.web_hostingenvironments_multirolepools.medium_app_service_plan_instances** <br>(count) | Workers medios de App Service Plan<br>_Se muestra como instancia_ |
| **azure.web_hostingenvironments_multirolepools.memory_percentage** <br>(gauge) | Porcentaje de memoria<br>_Se muestra en porcentaje_ |
| **azure.web_hostingenvironments_multirolepools.requests** <br>(count) | Solicitudes<br>_Se muestra como solicitud_ |
| **azure.web_hostingenvironments_multirolepools.small_app_service_plan_instances** <br>(count) | Workers pequeños de App Service Plan<br>_Se muestra como instancia_ |
| **azure.web_hostingenvironments_multirolepools.total_front_ends** <br>(count) | Total de frontends|
| **azure.web_hostingenvironments_workerpools.cpu_percentage** <br>(gauge) | Porcentaje de CPU<br>_Se muestra como porcentaje_ |
| **azure.web_hostingenvironments_workerpools.memory_percentage** <br>(gauge) | Porcentaje de memoria<br>_Se muestra en porcentaje_ |
| **azure.web_hostingenvironments_workerpools.workers_available** <br>(count) | Workers disponibles<br>_Se muestra como worker_ |
| **azure.web_hostingenvironments_workerpools.workers_total** <br>(count) | Total de workers<br>_Se muestra como worker_ |
| **azure.web_hostingenvironments_workerpools.workers_used** <br>(count) | Workers utilizados<br>_Se muestra como worker_ |

### Eventos

La integración Azure App Service Environment no incluye ningún evento.

### Checks de servicio

La integración Azure App Service Environment no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).