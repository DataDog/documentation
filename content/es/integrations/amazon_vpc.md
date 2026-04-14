---
aliases: []
app_id: amazon_vpc
categories:
- aws
- nube
- recopilación de logs
- red
custom_kind: integración
description: Reúne tus logs de Amazon VPC.
further_reading:
- link: https://www.datadoghq.com/blog/vpc-security-flowlogs/
  tag: Blog
  text: Monitorizar logs de flujo para garantizar la seguridad de la VPC con Datadog
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-vpc-peering/
  tag: Centro de arquitectura
  text: Conéctate a Datadog a través de AWS PrivateLink mediante la interconexión
    de VPC de AWS
title: Amazon VPC
---
## Información general

Amazon Virtual Private Cloud (Amazon VPC) te permite lanzar recursos AWS en tu red virtual. Los logs de flujo de VPC son una característica que te permite capturar información sobre el tráfico IP que entra y sale en las interfaces de red de tu VPC.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

No se requieren pasos adicionales para recopilar métricas de Amazon VPC que no son `aws.vpc.flowlogs.*`. Las métricas con el prefijo `aws.vpc.flowlogs.*` son generadas por la integración de [logs de flujo de VPC en Datadog](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:464622532012:applications~Datadog-VPC-Flow-Logs). Para habilitar la recopilación de métricas de logs de flujo, consulta la sección de [recopilación de logs](#log-collection) a continuación.

Para las métricas `aws.vpc.subnet.*`:

1. Asegúrate de que la integración [Amazon EC2](https://docs.datadoghq.com/integrations/amazon_ec2/) esté instalada y que la recopilación de métricas de EC2 esté habilitada en la pestaña **Recopilación de métricas** en la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services).
1. Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/) para habilitar la recopilación en tu cuenta.

### Recopilación de logs

#### Buscar o crear el recurso de destino en AWS para tus logs de flujo de VPC

Los logs de flujo de VPC deben enviarse primero a un destino intermedio, antes de enviarse a Datadog. Puedes enviarlos directamente a Amazon Data Firehose o puedes almacenarlos en un bucket de S3 o en un grupo de CloudWatch Logs.

Amazon Data Firehose es la opción recomendada para enviar logs de flujo de VPC a Datadog, ya que tiene menos gastos operativos y puede ser más rentable. Para obtener más información, consulta [Introducción a los logs de flujo de Amazon VPC en Kinesis Data Firehose](https://aws.amazon.com/blogs/networking-and-content-delivery/introducing-amazon-vpc-flow-logs-kinesis-data-firehose/).

1. Crea uno nuevo o elige uno existente:
   - Amazon Data Firehose (recomendado). Si aún no dispones de un flujo de entrega existente en Amazon Data Firehose para enviar logs a Datadog, sigue las instrucciones de la guía [Enviar logs de servicios AWS con el destino Datadog Amazon Firehose](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/) para crear uno. **Nota:** Opcionalmente, puedes elegir un flujo de entrega de otra cuenta AWS, independiente de tu VPC, para la recopilación y la entrega centralizada de logs.
   - Bucket de S3 o ruta de carpeta.
   - Grupo de CloudWatch Logs.

**Nota**: Especifica `vpc` como prefijo de la ruta S3 o nombre del grupo de CloudWatch Logs para que Lambda etiquete automáticamente el origen `vpc` en los logs.

#### Habilitar la generación de logs de flujo de VPC

1. En la consola de AWS, ve a la VPC que quieres monitorizar.
1. Ve a la pestaña **Logs de flujo**.
1. Haz clic en **Create flow log** (Crear log de flujo).
1. Selecciona el filtro `All` para obtener las conexiones autorizadas y también las rechazadas.
1. Selecciona el tipo de destino deseado (Amazon Data Firehose, bucket de S3 o grupo de CloudWatch Logs) para los logs.
1. Rellena la información del recurso de destino.
1. Haz clic en **Create flow log** (Crear log de flujo).

#### Enviar logs a Datadog

Si has seleccionado Amazon Data Firehose como destino, ya está todo listo.

Si has seleccionado un bucket de S3 o el grupo de CloudWatch Logs como destino:

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/) en tu cuenta de AWS.
1. Una vez configurada, ve a la función de Lambda del Datadog Forwarder. En la sección Información general de la función, haz clic en **Add Trigger** (Añadir activador).
1. Para configurar un activador, selecciona el activador **S3** o **CloudWatch Logs**.
1. Selecciona el bucket de S3 o el grupo de CloudWatch Logs que contiene los logs de tu VPC.
1. Para S3, deja el tipo evento como `All object create events`.
1. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Ve al [Explorador de logs](https://docs.datadoghq.com/logs/explorer/) para empezar a explorar tus logs.

Para obtener más información sobre la recopilación de logs de servicios de AWS, consulta [Enviar logs de servicios de AWS con la función Lambda de Datadog](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.transitgateway.bytes_in** <br>(count) | Número de bytes recibidos puerta de enlace de red.<br>_Se muestra como byte_ |
| **aws.transitgateway.bytes_out** <br>(count) | Número de bytes enviados desde la puerta de enlace de red.<br>_Se muestra como byte_ |
| **aws.transitgateway.packet_drop_count_blackhole** <br>(count) | Número de paquetes descartados por coincidir con una ruta blackhole.<br>_Se muestra como paquete_ |
| **aws.transitgateway.packet_drop_count_no_route** <br>(count) | Número de paquetes descartados por no coincidir con una ruta.<br>_Se muestra como paquete_ |
| **aws.transitgateway.packets_in** <br>(count) | Número de paquetes recibidos por la puerta de enlace de red.<br>_Se muestra como paquete_ |
| **aws.transitgateway.packets_out** <br>(count) | Número de paquetes envidos por la puerta de enlace de red.<br>_Se muestra como paquete_ |
| **aws.vpc.flowlogs.action** <br>(count) | ACCEPT o REJECT si el tráfico ha sido o no autorizado por los grupos de seguridad o las ACL de red|
| **aws.vpc.flowlogs.bytes.per_request.max** <br>(gauge) | Número máximo de bytes transferidos por solicitud durante la ventana de captura<br>_Se muestra como byte_ |
| **aws.vpc.flowlogs.bytes.per_request.median** <br>(gauge) | Número medio de bytes transferidos por solicitud durante la ventana de captura<br>_Se muestra como byte_ |
| **aws.vpc.flowlogs.bytes.per_request.min** <br>(gauge) | Número mínimo de bytes transferidos por solicitud durante la ventana de captura<br>_Se muestra como byte_ |
| **aws.vpc.flowlogs.bytes.per_request.p90** <br>(gauge) | Percentil 90 del número de bytes transferidos por solicitud durante la ventana de captura<br>_Se muestra como byte_ |
| **aws.vpc.flowlogs.bytes.per_request.p95** <br>(gauge) | Percentil 95 del número de bytes transferidos por solicitud durante la ventana de captura<br>_Se muestra como byte_ |
| **aws.vpc.flowlogs.bytes.per_request.p99** <br>(gauge) | Percentil 99 del número de bytes transferidos por solicitud durante la ventana de captura<br>_Se muestra como byte_ |
| **aws.vpc.flowlogs.bytes.total** <br>(count) | Número total de bytes transferidos durante la ventana de captura<br>_Se muestra como byte_ |
| **aws.vpc.flowlogs.duration.per_request.max** <br>(gauge) | Duración máxima por solicitud durante la ventana de captura<br>_Se muestra como segundo_ |
| **aws.vpc.flowlogs.duration.per_request.median** <br>(gauge) | Duración media por solicitud durante la ventana de captura<br>_Se muestra como segundo_ |
| **aws.vpc.flowlogs.duration.per_request.min** <br>(gauge) | Duración mínima por solicitud durante la ventana de captura<br>_Se muestra como segundo_ |
| **aws.vpc.flowlogs.duration.per_request.p90** <br>(gauge) | Duración del percentil 90 por solicitud durante la ventana de captura<br>_Se muestra como segundo_ |
| **aws.vpc.flowlogs.duration.per_request.p95** <br>(gauge) | Duración del percentil 95 por solicitud durante la ventana de captura<br>_Se muestra como segundo_ |
| **aws.vpc.flowlogs.duration.per_request.p99** <br>(gauge) | Duración del percentil 99 por solicitud durante la ventana de captura<br>_Se muestra como segundo_ |
| **aws.vpc.flowlogs.log_status** <br>(count) | Estado de registro del log de flujo: OK NODATA o SKIPDATA|
| **aws.vpc.flowlogs.packets.per_request.max** <br>(gauge) | Número máximo de paquetes transferidos por solicitud durante la ventana de captura<br>_Se muestra como paquete_ |
| **aws.vpc.flowlogs.packets.per_request.median** <br>(gauge) | Número medio de paquetes transferidos por solicitud durante la ventana de captura<br>_Se muestra como paquete_ |
| **aws.vpc.flowlogs.packets.per_request.min** <br>(gauge) | Número mínimo de paquetes transferidos por solicitud durante la ventana de captura<br>_Se muestra como paquete_ |
| **aws.vpc.flowlogs.packets.per_request.p90** <br>(gauge) | Percentil 90 del número de paquetes transferidos por solicitud durante la ventana de captura<br>_Se muestra como paquete_ |
| **aws.vpc.flowlogs.packets.per_request.p95** <br>(gauge) | Percentil 95 del número de paquetes transferidos por solicitud durante la ventana de captura<br>_Se muestra como paquete_ |
| **aws.vpc.flowlogs.packets.per_request.p99** <br>(gauge) | Percentil 99 del número de paquetes transferidos por solicitud durante la ventana de captura<br>_Se muestra como paquete_ |
| **aws.vpc.flowlogs.packets.total** <br>(count) | Número total de paquetes transferidos durante la ventana de captura<br>_Se muestra como paquete_ |
| **aws.vpc.subnet.available_ip_address_count** <br>(gauge) | Número de direcciones IP disponibles en la subred|
| **aws.vpc.subnet.total_ip_address_count** <br>(gauge) | Número total de direcciones IP contenidas en la subred|

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, incluidos, entre otros, el nombre del host y los grupos de seguridad.

### Eventos

La integración de Amazon VPC no incluye eventos.

### Checks de servicio

La integración de Amazon VPC no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}