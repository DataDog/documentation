---
aliases:
- /es/integrations/amazon_network_manager
app_id: amazon-network-manager
categories:
- aws
- métricas
- nube
custom_kind: integración
description: AWS Network Manager proporciona monitorización centralizada para redes
  globales.
integration_version: 1.0.0
media: []
title: AWS Network Manager
---
## Información general

AWS Network Manager es un servicio de monitorización centralizado para gestionar tu red WAN central en la nube de AWS y tu red de AWS Transit Gateway en todas las cuentas de AWS, regiones y ubicaciones on-premises.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuración

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que Network Manager está habilitado en la pestaña **Metric Collection** (Recopilación de métricas).
1. Instala la integración de [Datadog y Amazon Network Manager](https://app.datadoghq.com/integrations/amazon-network-manager).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.ec2.infrastructureperformance.aggregate_aws_network_performance** <br>(gauge) | Latencia media entre regiones, zonas de interdisponibilidad o zonas de intradisponibilidad.<br>_Se muestra en milisegundos_ |
| **aws.networkmanager.bytes_in** <br>(count) | El número de bytes recibidos por un recurso.<br>_Se muestra como byte_ |
| **aws.networkmanager.bytes_out** <br>(count) | El número de bytes enviados desde un recurso.<br>_Se muestra como byte_ |
| **aws.networkmanager.packets_in** <br>(count) | El número de paquetes recibidos por un recurso.<br>_Se muestra como paquete_ |
| **aws.networkmanager.packets_out** <br>(count) | El número de paquetes enviados desde un recurso.<br>_Se muestra como paquete_ |
| **aws.networkmanager.data_in** <br>(count) | El número de bytes recibidos por un recurso.<br>_Se muestra como byte_ |
| **aws.networkmanager.data_out** <br>(count) | El número de bytes enviados desde un recurso.<br>_Se muestra como byte_ |
| **aws.networkmanager.tunnel_down_count** <br>(gauge) | El número de túneles de VPN que tienen un estado DOWN (CAÍDO). En el recuento se incluyen los túneles de VPN estáticos con estado DOWN (CAÍDO) y los túneles de VPN BGP con cualquier estado que no sea ESTABLISHED (ESTABLECIDO).|
| **aws.networkmanager.bytes_drop_count_blackhole** <br>(count) | Número de bytes descartados de un recurso porque coincidía con una ruta de agujero negro.<br>_Se muestra como byte_ |
| **aws.networkmanager.bytes_drop_count_no_route** <br>(count) | Número de bytes descartados de un recurso por no coincidir con una ruta.<br>_Se muestra como byte_ |
| **aws.networkmanager.packet_drop_count_blackhole** <br>(count) | Número de paquetes descartados de un recurso porque coincidía con una ruta de agujero negro.<br>_Se muestra como paquete_ |
| **aws.networkmanager.packet_drop_count_no_route** <br>(count) | Número de paquetes descartados de un recurso por no coincidir con una ruta.<br>_Se muestra como paquete_ |

### Checks de servicio

Amazon Network Manager no incluye ningún check de servicio.

### Eventos

Amazon Network Manager no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).