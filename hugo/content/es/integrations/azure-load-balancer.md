---
aliases:
- /es/integrations/azure_load_balancer
app_id: azure-load-balancer
categories:
- nube
- azure
custom_kind: integración
description: Rastrea las métricas clave de Azure Load Balancer.
media: []
title: Equilibrador de carga Azure
---
## Información general

Azure Load Balancer admite escenarios entrantes y salientes, proporciona baja latencia y alto rendimiento, y escala hasta millones de flujos para todas las aplicaciones TCP y UDP.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Load Balancer.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.network_loadbalancers.allocated_snat_ports** <br>(count) | Número total de puertos SNAT asignados dentro del periodo de tiempo|
| **azure.network_loadbalancers.backend_pool_host_count** <br>(gauge) | Número total de hosts en el grupo de backend respaldados para el Load Balancer<br>_Se muestra como host_ |
| **azure.network_loadbalancers.byte_count** <br>(count) | Número total de bytes transmitidos en el periodo de tiempo<br>_Se muestra como byte_ |
| **azure.network_loadbalancers.health_probe_status** <br>(gauge) | Promedio del estado del probe de estado del Load Balancer por tiempo de duración<br>_Se muestra como porcentaje_ |
| **azure.network_loadbalancers.packet_count** <br>(count) | Número total de paquetes transmitidos en el periodo de tiempo<br>_Se muestra como paquete_ |
| **azure.network_loadbalancers.snat_connection_count** <br>(count) | Número total de nuevas conexiones SNAT creadas en el periodo de tiempo<br>_Se muestra como conexión_ |
| **azure.network_loadbalancers.count** <br>(gauge) | Recuento de Azure Load Balancer|
| **azure.network_loadbalancers.syn_count** <br>(count) | Número total de paquetes SYN transmitidos en el periodo de tiempo<br>_Se muestra como paquete_ |
| **azure.network_loadbalancers.used_snat_ports** <br>(count) | Número total de puertos SNAT utilizados en el periodo de tiempo|
| **azure.network_loadbalancers.data_path_availability** <br>(gauge) | Disponibilidad media de la ruta de datos del Load Balancer por tiempo de duración<br>_Se muestra en porcentaje_ |

### Eventos

La integración Azure Load Balancer no incluye eventos.

### Checks de servicio

La integración Azure Load Balancer no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).