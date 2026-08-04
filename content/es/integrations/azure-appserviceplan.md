---
aliases:
- /es/integrations/azure_app_service_plan
app_id: azure-appserviceplan
categories:
- nube
- azure
custom_kind: integración
description: Rastrea las métricas principales de Azure App Service Plan.
media: []
title: Azure App Service Plan
---
## Información general

Azure App Service Plan define un conjunto de recursos informáticos utilizados para ejecutar una aplicación web, similar a una granja de servidores en el alojamiento web tradicional.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure App Service Plan.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración con Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No se requiere ningún paso de instalación adicional.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.web_serverfarms.bytes_received** <br>(gauge) | Datos entrantes<br>_Se muestra como byte_ |
| **azure.web_serverfarms.bytes_received.max** <br>(gauge) | Máximo de datos entrantes (Max Aggregated)<br>_Se muestra como byte_ |
| **azure.web_serverfarms.bytes_sent** <br>(gauge) | Datos salientes<br>_Se muestra como byte_ |
| **azure.web_serverfarms.bytes_sent.max** <br>(gauge) | Máximo de datos salientes (Max Aggregated)<br>_Se muestra como byte_ |
| **azure.web_serverfarms.count** <br>(gauge) | Recuento de todos los recursos del App Service Plan|
| **azure.web_serverfarms.current_instance_count** <br>(gauge) | El número actual de instancias que se ejecutan dentro de un App Service Plan|
| **azure.web_serverfarms.cpu_percentage** <br>(gauge) | Porcentaje de CPU<br>_Se muestra como porcentaje_ |
| **azure.web_serverfarms.cpu_percentage.max** <br>(gauge) | Porcentaje máximo de CPU (Max Aggregated)<br>_Se muestra como porcentaje_ |
| **azure.web_serverfarms.disk_queue_length** <br>(gauge) | Longitud de la cola de disco|
| **azure.web_serverfarms.http_queue_length** <br>(gauge) | Longitud de la cola http|
| **azure.web_serverfarms.maximum_number_of_workers** <br>(gauge) | El número máximo de workers configurados para un App Service Plan|
| **azure.web_serverfarms.memory_percentage** <br>(gauge) | Porcentaje de memoria<br>_Se muestra en porcentaje_ |
| **azure.web_serverfarms.memory_percentage.max** <br>(gauge) | Porcentaje máximo de memoria (Max Aggregated)<br>_Se muestra como porcentaje_ |
| **azure.web_serverfarms.number_of_sites** <br>(gauge) | El número de sitios configurados para un App Service Plan|
| **azure.web_serverfarms.socket_inbound_all** <br>(gauge) | El recuento de sockets para las solicitudes entrantes|
| **azure.web_serverfarms.socket_loopback** <br>(gauge) | El recuento de sockets para conexiones loopback|
| **azure.web_serverfarms.socket_outbound_all** <br>(gauge) | El recuento de sockets de las solicitudes salientes|
| **azure.web_serverfarms.socket_outbound_established** <br>(gauge) | El recuento de sockets establecido para las solicitudes salientes|
| **azure.web_serverfarms.socket_outbound_time_wait** <br>(gauge) | Recuento de sockets en espera para solicitudes salientes|
| **azure.web_serverfarms.target_worker_count** <br>(gauge) | El número objetivo de workers configurados para un App Service Plan|
| **azure.web_serverfarms.tcp_close_wait** <br>(gauge) | Espera del cierre TCP|
| **azure.web_serverfarms.tcp_closing** <br>(gauge) | Cierre del TCP|
| **azure.web_serverfarms.tcp_established** <br>(gauge) | TCP establecido|
| **azure.web_serverfarms.tcp_fin_wait1** <br>(gauge) | TCP Fin Wait 1|
| **azure.web_serverfarms.tcp_fin_wait2** <br>(gauge) | TCP Fin Wait 2|
| **azure.web_serverfarms.tcp_last_ack** <br>(gauge) | TCP Last Ack|
| **azure.web_serverfarms.tcp_syn_received** <br>(gauge) | TCP Syn Received|
| **azure.web_serverfarms.tcp_syn_sent** <br>(gauge) | TCP Syn Sent|
| **azure.web_serverfarms.tcp_time_wait** <br>(gauge) | Tiempo de espera de TCP|
| **azure.web_serverfarms.count** <br>(gauge) | El recuento de los recursos del App Service Plan|

### Eventos

La integración Azure App Service Plan no incluye ningún evento.

### Checks de servicio

La integración Azure App Service Plan no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).