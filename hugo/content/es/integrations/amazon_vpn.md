---
app_id: amazon_vpn
categories:
- aws
- nube
- recopilación de logs
- network
custom_kind: integración
description: Rastrea métricas clave de AWS VPN.
title: AWS VPN
---
## Información general

AWS VPN te permite establecer un túnel seguro y privado desde tu red o dispositivo hasta la red global de AWS.

Habilita esta integración para ver todas tus métricas de VPN en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `VPN` está activado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y AWS VPN](https://app.datadoghq.com/integrations/amazon-vpn).

### Recopilación de logs

#### Activar logging

Configura AWS VPN para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si generas logs en un bucket de S3, asegúrate de que `amazon_vpn` esté configurado como _Prefijo de destino_.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de AWS VPN en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.vpn.tunnel_data_in** <br>(count) | El número medio de bytes que han entrado a través del túnel de VPN<br>_Se muestra como byte_ |
| **aws.vpn.tunnel_data_in.sum** <br>(count) | El número total de bytes que han entrado a través del túnel de VPN<br>_Se muestra como byte_ |
| **aws.vpn.tunnel_data_out** <br>(count) | El número medio de bytes que han salido a través del túnel de VPN<br>_Se muestra como byte_ |
| **aws.vpn.tunnel_data_out.sum** <br>(count) | El número total de bytes que han salido a través del túnel de VPN<br>_Se muestra como byte_ |
| **aws.vpn.tunnel_state** <br>(gauge) | Esta métrica es 1 cuando todos los túneles de la VPN están activos y 0 cuando todos los túneles están inactivos. Los valores entre 0 y 1 indican que algunos túneles de la VPN están activos.|
| **aws.vpn.tunnel_state.maximum** <br>(gauge) | Esta métrica es 1 cuando cualquier túnel de la VPN está activo y 0 cuando todos los túneles están inactivos.|
| **aws.vpn.tunnel_state.minimum** <br>(gauge) | Esta métrica es 1 cuando todos los túneles de la VPN están activos y 0 cuando alguno de ellos está inactivo.|

### Eventos

La integración de AWS VPN no incluye eventos.

### Checks de servicio

La integración de AWS VPN no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).