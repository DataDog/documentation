---
aliases:
- /es/integrations/awscloudtrail/
- /es/integrations/faq/i-think-i-m-missing-some-of-my-cloudtrail-events/
categories:
- aws
- cloud
- log collection
- security
custom_kind: integration
dependencies: []
description: Alerta sobre actividad sospechosa en una cuenta AWS.
doc_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
draft: false
git_integration_title: amazon_cloudtrail
has_logo: true
integration_id: amazon-cloudtrail
integration_title: AWS CloudTrail
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_cloudtrail
public_title: Integración AWS CloudTrail en Datadog
short_description: Alerta sobre actividad sospechosa en una cuenta AWS.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

<div class="alert alert-warning">
Si estás configurando AWS CloudTrail para Cloud SIEM, consulta la guía <a href="https://docs.datadoghq.com/security_platform/cloud_siem/guide/aws-config-guide-for-cloud-siem/">Configuración de AWS para Cloud SIEM</a>.
</div>

AWS CloudTrail proporciona una ruta de auditoría para tu cuenta AWS. Datadog lee esta ruta de auditoría y crea eventos. Busca estos eventos con el Explorador de eventos de Datadog o utilízalos para la correlación en tus dashboards. El siguiente es un ejemplo de un evento CloudTrail:

{{< img src="integrations/amazon_cloudtrail/cloudtrail_event.png" alt="Evento de CloudTrail" popup="true">}}

Para obtener información sobre otros servicios AWS, consulta la [página de la integración Amazon Web Services][1].


## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Amazon Web Services][2].

### Recopilación de eventos

**Nota**: La integración CloudTrail en Datadog requiere que se recopilen eventos en un bucket de CloudTrail.

1. Añade los siguientes permisos a tu política IAM Datadog para recopilar eventos de CloudTrail AWS. Para obtener más información sobre las políticas de CloudTrail, consulta la [referencia de la API de CloudTrail AWS][3]. CloudTrail también requiere algunos permisos de S3 para acceder a las rutas. **Sólo se requieren para buckets de CloudTrail**. Para obtener más información sobre las políticas de Amazon S3, consulta la [referencia de la API de Amazon S3][4].

    | Permiso AWS                  | Descripción |
    | --------------------------- | --------------------------------------------------------------- |
    | `cloudtrail:DescribeTrails` | Enumera las rutas y el bucket de s3 en el que están almacenadas.        |
    | `cloudtrail:GetTrailStatus` | Omite las rutas inactivas.                                          |
    | `s3:ListBucket` | Enumera los objetos en el bucket de CloudTrail para obtener las rutas disponibles. |
    | `s3:GetBucketLocation` | Obtiene la región del bucket para descargar rutas.                 |
    | `s3:GetObject` | Busca las rutas disponibles.                                               |
    | `organizations:DescribeOrganization` | Devuelve información sobre la organización de una cuenta (necesario para rutas de organizaciones). |

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

   **Nota**: El ARN principal es el que se muestra durante el proceso de instalación para la integración AWS principal. Para obtener más información sobre los ARN de recursos CloudTrail, consulta el [funcionamiento de AWS CloudTrail con IAM][5] en la sección Recursos. Si estás actualizando tu política (en lugar de añadir una nueva), no necesitas `SID` ni `Principal`.

2. Instala la [integración AWS CloudTrail en Datadog][6].
   En la página de la integración, elige los tipos de eventos que quieres mostrar con prioridad normal (filtro predeterminado) en el Explorador de eventos de Datadog. Las cuentas que has configurado en la página de Amazon Web Services también se muestran aquí. Si quieres ver otros eventos que no se mencionan aquí, ponte en contacto con el [servicio de asistencia de Datadog][7].

### APM

#### Activar logging

En AWS CloudTrail, [crea una ruta][8] y selecciona un bucket de S3 en el que escribir logs.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder[9] en tu cuenta AWS.
2. Una vez configurada, ve a la función Lambda del Datadog Forwarder. En la sección Información general de la función, haz clic en **Add Trigger** (Añadir activador).
3. Para configurar un activador, selecciona el activador **S3**.
4. Selecciona el bucket de S3 que contiene tus logs de CloudTrail.
5. Deja el tipo evento como `All object create events`.
6. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Para empezar a explorar tus logs, ve al [Explorador de logs][10].

Para obtener más información sobre la recopilación de logs de servicios AWS, consulta [Enviar logs de servicios AWS con la función Lambda en Datadog][11].

## Datos recopilados

### Métricas

La integración AWS CloudTrail no incluye métricas.

### Eventos

La integración AWS CloudTrail crea muchos eventos diferentes basados en la ruta de auditoría de AWS CloudTrail. Todos los eventos están etiquetados con `#cloudtrail` en tu [Explorador de eventos][12] de Datadog. Puedes definir su prioridad en la configuración de la integración.

Eventos de CloudTrail que se pueden configurar con una prioridad normal (aparecen en el Explorador de eventos bajo el filtro por defecto):

* apigateway 
* autoescalado 
* cloudformation 
* cloudfront 
* cloudsearch 
* cloudtrail 
* codedeploy 
* codepipeline 
* config 
* datapipeline  
* ds 
* ec2 
* ecs 
* elasticache 
* elasticbeanstalk 
* elasticfilesystem 
* elasticloadbalancing 
* elasticmapreduce 
* iam 
* kinesis 
* lambda 
* monitorización 
* opsworks 
* rds 
* redshift 
* route53 
* s3 
* ses 
* firmar 
* ssm

### Checks de servicios

La integración AWS CloudTrail no incluye checks de servicios.

## Resolución de problemas

### El cuadro de CloudTrail no está presente o no hay cuentas enumeradas

En primer lugar, debes configurar la integración [Amazon Web Services][13]. Luego podrás configurar el cuadro de CloudTrail.

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_Operations.html
[4]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_Operations.html
[5]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/security_iam_service-with-iam.html#security_iam_service-with-iam-id-based-policies-resources
[6]: https://app.datadoghq.com/integrations/amazon-cloudtrail
[7]: https://docs.datadoghq.com/es/help/
[8]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html
[9]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[10]: https://app.datadoghq.com/logs
[11]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://docs.datadoghq.com/es/events/
[13]: https://docs.datadoghq.com/es/integrations/aws/