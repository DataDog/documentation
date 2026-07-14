---
aliases:
- /es/integrations/amazon_codebuild
app_id: amazon-codebuild
categories:
- aws
- nube
- configuración y despliegue
- recopilación de logs
custom_kind: integración
description: AWS CodeBuild compila el código de fuente, ejecuta tests y prepara paquetes
  de software para despliegues.
media: []
title: AWS CodeBuild
---
## Información general

AWS CodeBuild es un servicio de compilación que compila el código fuente, ejecuta tests y genera paquetes de software listos para su despliegue.

Instala la integración de Datadog y AWS CodeBuild para:

- Rastrear las compilaciones por proyecto
- Recopilar métricas sobre tus compilaciones
- Correlacionar las compilaciones con el resto de tus métricas de Datadog

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `CodeBuild` está habilitado en la pestaña `Metric Collection`.

1. Instala la integración [Datadog - AWS CodeBuild](https://app.datadoghq.com/integrations/amazon-codebuild).

### Recopilación de logs

#### Activar logging

Configura AWS CodeBuild para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_codebuild` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS CodeBuild en la consola de AWS:

   - [Añadir un activador manual en el bucket S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.codebuild.builds** <br>(count) | Mide el número de compilaciones activadas.<br>_Se muestra como compilación_ |
| **aws.codebuild.duration** <br>(gauge) | Mide la duración total de todas las compilaciones a lo largo del tiempo.<br>_Se muestra como segundos_ |
| **aws.codebuild.duration.maximum** <br>(gauge) | Mide la duración máxima de todas las compilaciones a lo largo del tiempo.<br>_Se muestra como segundos_ |
| **aws.codebuild.duration.minimum** <br>(gauge) | Mide la duración mínima de todas las compilaciones a lo largo del tiempo.<br>_Se muestra como segundos_ |
| **aws.codebuild.failed_builds** <br>(count) | Mide el número de compilaciones fallidas debido a errores del cliente o tiempos de espera.<br>_Se muestra como compilación_ |
| **aws.codebuild.succeeded_builds** <br>(count) | Mide el número de compilaciones exitosas.<br>_Se muestra como compilación_ |
| **aws.codebuild.build_duration** <br>(gauge) | Mide la duración de la fase BUILD de la compilación.<br>_Se muestra como segundos_ |
| **aws.codebuild.download_source_duration** <br>(gauge) | Mide la duración de la fase DOWNLOAD_SOURCE de la compilación.<br>_Se muestra como segundos_ |
| **aws.codebuild.finalizing_duration** <br>(gauge) | Mide la duración de la fase FINALIZING de la compilación.<br>_Se muestra como segundos_ |
| **aws.codebuild.install_duration** <br>(gauge) | Mide la duración de la fase INSTALL de la compilación.<br>_Se muestra como segundos_ |
| **aws.codebuild.post_build_duration** <br>(gauge) | Mide la duración de la fase POST_BUILD de la compilación.<br>_Se muestra como segundos_ |
| **aws.codebuild.pre_build_duration** <br>(gauge) | Mide la duración de la fase PRE_BUILD de la compilación.<br>_Se muestra como segundos_ |
| **aws.codebuild.provisioning_duration** <br>(gauge) | Mide la duración de la fase PROVISIONING de la compilación.<br>_Se muestra como segundos_ |
| **aws.codebuild.queued_duration** <br>(gauge) | Mide la duración de la fase QUEUED de la compilación.<br>_Se muestra como segundos_ |
| **aws.codebuild.submitted_duration** <br>(gauge) | Mide la duración de la fase SUBMITTED de la compilación.<br>_Se muestra como segundos_ |
| **aws.codebuild.upload_artifacts_duration** <br>(gauge) | Mide la duración de la fase UPLOAD_ARTIFACTS de la compilación.<br>_Se muestra como segundos_ |

### Eventos

La integración de AWS CodeBuild no incluye ningún evento.

### Checks de servicio

La integración de AWS CodeBuild no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).