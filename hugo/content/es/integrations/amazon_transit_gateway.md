---
app_id: amazon_transit_gateway
categories:
- aws
- nube
- la red
custom_kind: integración
description: Rastrea métricas clave de AWS Transit Gateway.
further_reading:
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-transit-gateway/
  tag: Centro de arquitectura
  text: Conéctate a Datadog a través de AWS PrivateLink mediante AWS Transit Gateway
title: AWS Transit Gateway
---
## Información general

Usa AWS Transit Gateway para interconectar tus nubes privadas virtuales (VPCs) y redes locales.

Habilita esta integración para ver todas tus métricas de Transit Gateway en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de recursos y métricas

1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `TransitGateway` está activado en la pestaña `Metric Collection`.
1. Añade los siguientes permisos a tu [política de IAM de Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para recopilar recursos de AWS Transit Gateway.

| Permiso de AWS                                | Descripción                                                                                          |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `ec2:DescribeTransitGateways`                 | Concede permiso para describir una o varias transit gateways                                             |
| `ec2:DescribeTransitGatewayVPCAttachments`    | Concede permiso para describir uno o más adjuntos de VPC en una transit gateway.                      |
| `ec2:DescribeTransitGatewayRouteTables`       | Concede permiso para describir una o más tablas de rutas de transit gateway.                              |
| `ec2:GetTransitGatewayPrefixListReferences`   | Concede permiso para obtener información sobre referencias de listas de prefijos para una tabla de ruta de transit gateway. |
| `ec2:SearchTransitGatewayRoutes`              | Concede permiso para buscar rutas en la tabla de rutas de una transit gateway.                             |

3. Instala la [integración de Datadog y AWS Transit Gateway](https://app.datadoghq.com/integrations/amazon-transit-gateway).

### Recopilación de logs

#### Habilitar el registro de logs de flujo de Transit Gateway

Los logs de flujo de Transit Gateway pueden enviarse a un bucket de S3 o a un grupo de logs de CloudWatch.

1. En la consola de AWS, dirígete al Transit Gateway que quieras monitorizar.
1. Ve a la pestaña **Flow logs** (Logs de flujo).
1. Haz clic en **Create flow log** (Crear log de flujo).
1. Selecciona el bucket de S3 o el grupo de logs de CloudWatch al que enviar los logs.

**Nota**: Incluye la cadena `transit-gateway` en el nombre del bucket de S3 para habilitar el parseo automático de logs.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/) en tu cuenta de AWS.
1. Dirígete a la función de Lambda del Datadog Forwarder en tu cuenta de AWS. En la sección Function Overview (información general de la función), haz clic en **Add Trigger** (Añadir activador).
1. Para configurar un activador, selecciona el activador **S3** o **CloudWatch Logs**.
1. Selecciona el bucket de S3 o el grupo de logs de CloudWatch que contiene tus logs de Transit Gateway.
1. Para S3, deja el tipo evento como `All object create events`.
1. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Transcurridos unos minutos, los logs de flujo de Transit Gateway aparecerán en tu [Log Explorer](https://docs.datadoghq.com/logs/explorer/).

Para obtener más información sobre la recopilación de logs de servicios de AWS, consulta [Envío de logs de servicios de AWS con la función de Datadog Lambda](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.transitgateway.bytes_in** <br>(count) | El número de bytes recibidos por la transit gateway.<br>_Se muestra como byte_ |
| **aws.transitgateway.bytes_out** <br>(count) | El número de bytes enviados desde la transit gateway.<br>_Se muestra como byte_ |
| **aws.transitgateway.packet_drop_count_blackhole** <br>(count) | Número de paquetes descartados por coincidir con una ruta blackhole.<br>_Se muestra como paquete_ |
| **aws.transitgateway.packet_drop_count_no_route** <br>(count) | Número de paquetes descartados por no coincidir con una ruta.<br>_Se muestra como paquete_ |
| **aws.transitgateway.packets_in** <br>(count) | Número de paquetes recibidos por la transit gateway.<br>_Se muestra como paquete_ |
| **aws.transitgateway.packets_out** <br>(count) | El número de paquetes enviados por la transit gateway.<br>_Se muestra como paquete_ |

### Eventos

La integración de AWS Transit Gateway no incluye ningún evento.

### Checks de servicio

La integración de AWS Transit Gateway no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}