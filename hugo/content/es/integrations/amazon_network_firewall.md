---
app_id: amazon_network_firewall
categories:
- nube
- aws
custom_kind: integración
description: Monitoriza tu AWS Network Firewall.
title: AWS Network Firewall
---
## Información general

AWS Network Firewall es un servicio con estado que permite a los clientes filtrar el tráfico en el perímetro de su VPC.

Habilita esta integración para ver todas tus métricas de AWS Network Firewall en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Network Firewall` está habilitado en la pestaña `Metric Collection`.

1. Instala la [integración de Datadog y AWS Network Firewall](https://app.datadoghq.com/integrations/amazon-network-firewall).

### Recopilación de logs

#### Activar logging

Configura AWS Network Firewall para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si generas logs en un bucket de S3, asegúrate de que `amazon_network_firewall` esté configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS Network Firewall en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.networkfirewall.dropped_packets** <br>(gauge) | El número de paquetes descartados por una regla de firewall.<br>_Se muestra como paquete_ |
| **aws.networkfirewall.passed_packets** <br>(gauge) | Número de paquetes reenviados por el firewall.<br>_Se muestra como paquete_ |
| **aws.networkfirewall.received_packets** <br>(gauge) | El número de paquetes recibidos por el firewall.<br>_Se muestra como paquete_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración de AWS Network Firewall no incluye ningún evento.

### Checks de servicio

La integración de AWS Network Firewall no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}