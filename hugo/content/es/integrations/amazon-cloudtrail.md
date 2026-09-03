---
aliases:
- /es/integrations/amazon_cloudtrail
app_id: amazon-cloudtrail
categories:
- aws
- nube
- recopilación de logs
- seguridad
custom_kind: integración
description: Amazon CloudTrail es un servicio web que registra las llamadas a la API
  de AWS de tu cuenta y te entrega archivos de log.
media: []
title: AWS CloudTrail
---
## Información general

<div class="alert alert-warning">
Si estás configurando AWS CloudTrail para Cloud SIEM, consulta la guía <a href="https://docs.datadoghq.com/security_platform/cloud_siem/guide/aws-config-guide-for-cloud-siem/">Configuración de AWS para Cloud SIEM</a>.
</div>

AWS CloudTrail proporciona un registro de auditoría de tu cuenta de AWS. Datadog lee este registro de auditoría y crea eventos. Busca estos eventos con el Datadog Event Explorer o utilízalos para la correlación en tus dashboards. El siguiente es un ejemplo de evento de CloudTrail:

![Cloudtrail Event](images/cloudtrail_event.png)

Para obtener información de otros servicios de AWS, consulta la [página de la integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/)

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://app.datadoghq.com/integrations/amazon-web-services).

### Recopilación de eventos

**Nota**: La integración CloudTrail en Datadog requiere que se recopilen eventos en un bucket de CloudTrail.

1. Añade los siguientes permisos a tu política de Datadog IAM para recopilar eventos de AWS CloudTrail. Para obtener más información sobre las políticas de CloudTrail, consulta la [referencia de la API de AWS CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_Operations.html). CloudTrail también requiere algunos permisos de S3 para acceder a los registros. **Solo se requieren para buckets de CloudTrail**. Para obtener más información sobre las políticas de Amazon S3, consulta la [referencia de la API de Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/API/API_Operations.html).

   | Permiso AWS                  | Descripción |
   | --------------------------- | --------------------------------------------------------------- |
   | `cloudtrail:DescribeTrails` | Enumera los registros y el bucket de S3 en el que están almacenados.        |
   | `cloudtrail:GetTrailStatus` | Omite los registros inactivos.                                          |
   | `s3:ListBucket` | Enumera los objetos en el bucket de CloudTrail para obtener los registros disponibles. |
   | `s3:GetBucketLocation` | Obtiene la región del bucket para descargar registros.                 |
   | `s3:GetObject` | Busca los registros disponibles.                                       |
   | `organizations:DescribeOrganization` | Devuelve información sobre la organización de una cuenta (necesaria para los registros de la organización). |

   Añade esta política a tu principal política IAM de Datadog existente:

   ```json
   {
       "Sid": "AWSDatadogPermissionsForCloudtrail",
       "Effect": "Allow",
       "Principal": {
           "AWS": "<ARN_FROM_MAIN_AWS_INTEGRATION_SETUP>"
       },
       "Action": ["s3:ListBucket", "s3:GetBucketLocation", "s3:GetObject"],
       "Resource": [
           "arn:aws:s3:::<YOUR_S3_CLOUDTRAIL_BUCKET_NAME>",
           "arn:aws:s3:::<YOUR_S3_CLOUDTRAIL_BUCKET_NAME>/*"
       ]
   }
   ```

   **Nota**: El ARN principal es el que aparece durante el proceso de instalación de la integración principal de AWS. Consulta la sección Recursos [Cómo funciona AWS CloudTrail con IAM](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/security_iam_service-with-iam.html#security_iam_service-with-iam-id-based-policies-resources) para obtener más información sobre los ARN de recursos de CloudTrail. Si estás actualizando tu política (en lugar de añadir una nueva), no necesitas el `SID` o el `Principal`.

1. Instala la integración [Datadog - AWS CloudTrail](https://app.datadoghq.com/integrations/amazon-cloudtrail):
   En la página de la integración, elige los tipos de eventos que quieres mostrar como prioridad normal (el filtro predeterminado) en el Datadog Event Explorer. Las cuentas configuradas en la página de Amazon Web Services también se muestran aquí. Si quieres ver otros eventos que no se mencionan aquí, ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

### Recopilación de logs

#### Activar logging

En AWS CloudTrail, [crea un registro](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html) y selecciona un bucket S3 en el que escribir los logs.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/) en tu cuenta de AWS.
1. Una vez configurada, ve a la función de Lambda del Datadog Forwarder. En la sección Información general de la función, haz clic en **Add Trigger** (Añadir activador).
1. Para configurar un activador, selecciona el activador **S3**.
1. Selecciona el bucket de S3 que contiene tus logs de CloudTrail.
1. Deja el tipo de evento como `All object create events`.
1. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Ve al [Log Explorer](https://app.datadoghq.com/logs) para empezar a explorar tus logs.

Para obtener más información sobre la recopilación de logs de servicios de AWS, consulta [Enviar logs de servicios de AWS con la función Lambda de Datadog](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/).

## Datos recopilados

### Métricas

La integración AWS CloudTrail no incluye métricas.

### Eventos

La integración de AWS CloudTrail crea muchos eventos diferentes basados en el registro de auditoría de AWS CloudTrail. Todos los eventos se etiquetan con `#cloudtrail` en tu Datadog [Event Explorer](https://docs.datadoghq.com/events/).. Puedes definir su prioridad en la configuración de la integración.

Eventos de CloudTrail que se pueden configurar con una prioridad normal (aparecen en el Explorador de eventos bajo el filtro por defecto):

- apigateway
- autoscaling
- cloudformation
- cloudfront
- cloudsearch
- cloudtrail
- codedeploy
- codepipeline
- config
- datapipeline
- ds
- ec2
- ecs
- elasticache
- elasticbeanstalk
- elasticfilesystem
- elasticloadbalancing
- elasticmapreduce
- iam
- kinesis
- lambda
- monitoring
- opsworks
- rds
- redshift
- route53
- s3
- ses
- signin
- ssm

### Checks de servicio

La integración AWS CloudTrail no incluye checks de servicios.

## Solucionar problemas

### El cuadro de CloudTrail no está presente o no hay cuentas enumeradas

En primer lugar, debes configurar la integración [Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/). A continuación, podrás configurar el cuadro de CloudTrail.