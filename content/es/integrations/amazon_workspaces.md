---
aliases:
- /es/integrations/awsworkspaces/
app_id: amazon_workspaces
categories:
- cloud
- aws
- log collection
custom_kind: integración
description: Seguimiento de conexiones fallidas, latencia de sesión, espacios de trabajo
  no saludables y more.
title: Amazon WorkSpaces
---
## Información general

Amazon WorkSpaces es un servicio informático de escritorio totalmente gestionado y seguro que se ejecuta en la nube de AWS.

Habilita esta integración para ver en Datadog todas tus métricas de Amazon WorkSpaces.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/). No es necesario realizar ningún otro paso de instalación.

### Recopilación de métricas

1. En la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `WorkSpaces` está habilitado en la pestaña `Metric Collection`.
1. Instala la [integración Datadog - Amazon WorkSpaces](https://app.datadoghq.com/integrations/amazon-workspaces).

### Recopilación de logs

#### Activar la generación de logs

Configura Amazon WorkSpaces para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si generas logs en un bucket de S3, asegúrate de que `amazon_workspace` esté configurado como _Prefijo de destino_.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon WorkSpaces en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.workspaces.available** <br>(gauge) | Número de WorkSpaces que han devuelto un estado saludable.|
| **aws.workspaces.connection_attempt** <br>(count) | Número de intentos de conexión.|
| **aws.workspaces.connection_failure** <br>(count) | Número de conexiones fallidas.|
| **aws.workspaces.connection_success** <br>(count) | Número de conexiones realizadas con éxito.|
| **aws.workspaces.in_session_latency** <br>(gauge) | Tiempo de ida y vuelta entre el cliente WorkSpaces y el WorkSpace.<br>_Se muestra como milisegundo_ |
| **aws.workspaces.maintenance** <br>(gauge) | Número de WorkSpaces en mantenimiento.|
| **aws.workspaces.session_disconnect** <br>(count) | Número de conexiones cerradas, incluidas las iniciadas por el usuario y las fallidas.|
| **aws.workspaces.session_launch_time** <br>(gauge) | Cantidad de tiempo que se tarda en iniciar una sesión de WorkSpaces.<br>_Se muestra como segundo_ |
| **aws.workspaces.stopped** <br>(gauge) | Número de WorkSpaces detenidos.|
| **aws.workspaces.unhealthy** <br>(gauge) | Número de WorkSpaces que devolvieron un estado no saludable.|
| **aws.workspaces.user_connected** <br>(gauge) | Número de WorkSpaces que tienen un usuario conectado.|

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración Amazon WorkSpaces no incluye eventos.

### Checks de servicio

La integración Amazon WorkSpaces no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).