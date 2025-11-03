---
app_id: amazon_nat_gateway
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de AWS NAT Gateway.
title: AWS NAT Gateway
---
## Información general

Utiliza AWS NAT Gateway para permitir que las instancias de una subred privada se conecten a Internet, pero impedir que Internet inicie conexiones con las instancias.

Habilita esta integración para ver todas tus métricas de NAT Gateway en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `NATGateway` está habilitado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y AWS NAT Gateway](https://app.datadoghq.com/integrations/amazon-nat-gateway).

### Recopilación de logs

#### Activar logging

Configura AWS NAT Gateway para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si generas logs en un bucket de S3, asegúrate de que `amazon_nat_gateway` esté configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS NAT Gateway en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.natgateway.active_connection_count** <br>(count) | El número total de conexiones TCP concurrentes activas a través de la gateway NAT.<br>_Se muestra como conexión_ |
| **aws.natgateway.active_connection_count.maximum** <br>(count) | El número máximo de conexiones TCP activas concurrentes a través de la gateway NAT.<br>_Se muestra como conexión_ |
| **aws.natgateway.active_connection_count.minimum** <br>(count) | El número mínimo de conexiones TCP concurrentes activas a través de la gateway NAT.<br>_Se muestra como conexión_ |
| **aws.natgateway.bytes_in_from_destination** <br>(gauge) | Número de bytes recibidos por la gateway NAT desde el destino.<br>_Se muestra como byte_ |
| **aws.natgateway.bytes_in_from_destination.sum** <br>(gauge) | La suma de bytes recibidos por la gateway NAT desde el destino.<br>_Se muestra como byte_ |
| **aws.natgateway.bytes_in_from_source** <br>(gauge) | El número de bytes recibidos por la gateway NAT de los clientes de VPC.<br>_Se muestra como byte_ |
| **aws.natgateway.bytes_in_from_source.sum** <br>(gauge) | La suma de bytes recibidos por la gateway NAT de los clientes de VPC.<br>_Se muestra como byte_ |
| **aws.natgateway.bytes_out_to_destination** <br>(gauge) | Número de bytes enviados a través de la gateway NAT al destino.<br>_Se muestra como byte_ |
| **aws.natgateway.bytes_out_to_destination.sum** <br>(gauge) | La suma de bytes enviados a través de la gateway NAT al destino.<br>_Se muestra como byte_ |
| **aws.natgateway.bytes_out_to_source** <br>(gauge) | El número de bytes enviados a través de la gateway NAT a los clientes de VPC.<br>_Se muestra como byte_ |
| **aws.natgateway.bytes_out_to_source.sum** <br>(gauge) | La suma de bytes enviados a través de la gateway NAT a los clientes de VPC.<br>_Se muestra como byte_ |
| **aws.natgateway.connection_attempt_count** <br>(count) | El número de intentos de conexión realizados a través de la gateway NAT.<br>_Se muestra como intento_ |
| **aws.natgateway.connection_attempt_count.sum** <br>(count) | La suma de los intentos de conexión realizados a través de la gateway NAT.<br>_Se muestra como intento_ |
| **aws.natgateway.connection_established_count** <br>(count) | El número de conexiones establecidas a través de la gateway NAT.<br>_Se muestra como conexión_ |
| **aws.natgateway.connection_established_count.sum** <br>(count) | La suma de conexiones establecidas a través de la gateway NAT.|
| **aws.natgateway.error_port_allocation** <br>(count) | El número de veces que la gateway NAT no pudo asignar un puerto fuente.<br>_Se muestra como error_ |
| **aws.natgateway.error_port_allocation.sum** <br>(count) | La suma de veces que la gateway NAT no pudo asignar un puerto fuente.<br>_Se muestra como error_ |
| **aws.natgateway.idle_timeout_count** <br>(count) | El número de tiempos de espera causados por conexiones que pasan del estado activo al inactivo.<br>_Se muestra como tiempo de espera_ |
| **aws.natgateway.idle_timeout_count.sum** <br>(count) | La suma de los tiempos de espera causados por las conexiones que pasan del estado activo al inactivo.<br>_Se muestra como tiempo de espera_ |
| **aws.natgateway.packets_drop_count** <br>(count) | Número de paquetes descartados por la gateway NAT.<br>_Se muestra como paquete_ |
| **aws.natgateway.packets_drop_count.sum** <br>(count) | La suma de paquetes descartados por la gateway NAT.<br>_Se muestra como paquete_ |
| **aws.natgateway.packets_in_from_destination** <br>(count) | Número de paquetes recibidos por la gateway NAT desde el destino.<br>_Se muestra como paquete_ |
| **aws.natgateway.packets_in_from_destination.sum** <br>(count) | La suma de paquetes recibidos por la gateway NAT desde el destino.<br>_Se muestra como paquete_ |
| **aws.natgateway.packets_in_from_source** <br>(count) | Número de paquetes recibidos por la gateway NAT de los clientes de VPC.<br>_Se muestra como paquete_ |
| **aws.natgateway.packets_in_from_source.sum** <br>(count) | La suma de paquetes recibidos por la gateway NAT de los clientes de VPC.<br>_Se muestra como paquete_ |
| **aws.natgateway.packets_out_to_destination** <br>(count) | Número de paquetes enviados a través de la gateway NAT al destino.<br>_Se muestra como paquete_ |
| **aws.natgateway.packets_out_to_destination.sum** <br>(count) | La suma de paquetes enviados a través de la gateway NAT al destino.<br>_Se muestra como paquete_ |
| **aws.natgateway.packets_out_to_source** <br>(count) | Número de paquetes enviados a través de la gateway NAT a los clientes de VPC.<br>_Se muestra como paquete_ |
| **aws.natgateway.packets_out_to_source.sum** <br>(count) | La suma de paquetes enviados a través de la gateway NAT a los clientes de VPC.<br>_Se muestra como paquete_ |

### Eventos

La integración de AWS NAT Gateway no incluye ningún evento.

### Checks de servicio

La integración de AWS NAT Gateway no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).