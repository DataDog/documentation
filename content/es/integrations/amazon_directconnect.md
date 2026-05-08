---
aliases:
- /es/integrations/awsdirectconnect/
app_id: amazon_directconnect
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Realiza un seguimiento de las métricas clave de AWS Direct Connect.
title: AWS Direct Connect
---
## Información general

Esta integración recopila métricas de AWS Direct Connect, como el estado de la conexión, la tasa de bits de entrada y salida, la tasa de paquetes de entrada y salida, etc.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `DirectConnect` está habilitado en la pestaña `Metric Collection`.

1. Añade estos permisos a tu [política IAM de Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para poder recopilar las métricas de AWS Direct Connect:

   - `directconnect:DescribeConnections`: se utiliza para hacer una lista de conexiones de Direct Connect disponibles.
   - `directconnect:DescribeTags`: se utiliza para recopilar etiquetas (tags) personalizadas aplicadas a las conexiones de Direct Connect.

   Para obtener más información, consulta las [políticas de Direct Connect](https://docs.aws.amazon.com/directconnect/latest/UserGuide/security-iam.html) en el sitio web AWS.

1. Instala la integración [Datadog - AWS Direct Connect](https://app.datadoghq.com/integrations/amazon-directconnect).

### Recopilación de logs

#### Activar la generación de logs

Configura AWS Direct Connect para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_directconnect` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon Direct Connect en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.dx.connection_bps_egress** <br>(rate) | Tasa de bits de los datos salientes del lado AWS de la conexión.<br>_Se muestra como bit_ |
| **aws.dx.connection_bps_ingress** <br>(rate) | Tasa de bits de los datos entrantes al lado AWS de la conexión.<br>_Se muestra como bit_ |
| **aws.dx.connection_error_count** <br>(count) | Recuento total de errores de todos los tipos de errores de nivel MAC en el dispositivo AWS. El total incluye los errores de comprobación de redundancia cíclica (CRC).<br>_Se muestra como error_ |
| **aws.dx.connection_light_level_rx** <br>(gauge) | Indica el estado de la conexión de fibra óptica para el tráfico de entrada (entrante) al lado AWS de la conexión.|
| **aws.dx.connection_light_level_tx** <br>(gauge) | Indica el estado de la conexión de fibra óptica para el tráfico de salida (saliente) del lado AWS de la conexión.|
| **aws.dx.connection_pps_egress** <br>(rate) | Tasa de paquetes de los datos salientes del lado AWS de la conexión.<br>_Se muestra como paquete_ |
| **aws.dx.connection_pps_ingress** <br>(rate) | Tasa de paquetes de los datos entrantes al lado AWS de la conexión.<br>_Se muestra como paquete_ |
| **aws.dx.connection_state** <br>(gauge) | Estado de la conexión. 0 indica ABAJO y 1 indica ARRIBA.|
| **aws.dx.virtual_interface_bps_egress** <br>(rate) | Tasa de bits de los datos salientes del lado AWS de la interfaz virtual.<br>_Se muestra como bit_ |
| **aws.dx.virtual_interface_bps_ingress** <br>(rate) | Tasa de bits de los datos entrantes al lado AWS de la interfaz virtual.<br>_Se muestra como bit_ |
| **aws.dx.virtual_interface_pps_egress** <br>(rate) | Tasa de paquetes de los datos salientes del lado AWS de la interfaz virtual.<br>_Se muestra como paquete_ |
| **aws.dx.virtual_interface_pps_ingress** <br>(rate) | Tasa de paquetes de los datos entrantes al lado AWS de la interfaz virtual.<br>_Se muestra como paquete_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración de AWS Direct Connect no incluye eventos.

### Checks de servicio

La integración de AWS Direct Connect no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).