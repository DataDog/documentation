---
aliases:
- /es/integrations/awscloudtrail/
- /es/integrations/faq/i-think-i-m-missing-some-of-my-cloudtrail-events/
app_id: amazon-cloudtrail
app_uuid: 9e036ee0-0b9d-4798-af43-a2f160cceec2
assets:
  dashboards:
    aws_cloudtrail: assets/dashboards/aws_cloudtrail.json
  integration:
    auto_install: false
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 83
    source_type_name: Amazon Cloudtrail
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- nube
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
description: Alerta sobre actividades sospechosas en la cuenta de AWS.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
draft: false
git_integration_title: amazon_cloudtrail
has_logo: true
integration_id: amazon-cloudtrail
integration_title: AWS CloudTrail
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_cloudtrail
public_title: AWS CloudTrail
short_description: Amazon CloudTrail es un servicio web que registra las llamadas
  a la API de AWS de tu cuenta y te entrega archivos de log.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::AWS
  - Categoría::Nube
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  configuration: README.md#Configuración
  description: Amazon CloudTrail es un servicio web que registra las llamadas a la
    API de AWS de tu cuenta y te entrega archivos de log.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: AWS CloudTrail
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

<div class="alert alert-danger">
Si estás configurando AWS CloudTrail para Cloud SIEM, consulta la guía <a href="https://docs.datadoghq.com/security_platform/cloud_siem/guide/aws-config-guide-for-cloud-siem/">Configuración de AWS para Cloud SIEM</a>.
</div>

AWS CloudTrail proporciona una ruta de auditoría para tu cuenta AWS. Datadog lee esta ruta de auditoría y crea eventos. Busca estos eventos con el Explorador de eventos de Datadog o utilízalos para la correlación en tus dashboards. El siguiente es un ejemplo de un evento CloudTrail:

![Evento de Cloudtrail][1]

Para obtener información sobre otros servicios de AWS, consulta la [página de la integración de Amazon Web Services][2]


## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Amazon Web Services][3].

### Recopilación de eventos

**Nota**: La integración CloudTrail en Datadog requiere que se recopilen eventos en un bucket de CloudTrail.

1. Añade los siguientes permisos a tu política de Datadog IAM para recopilar eventos de AWS CloudTrail. Para obtener más información sobre las políticas de CloudTrail, consulta la [referencia de la API de AWS CloudTrail][4]. CloudTrail también requiere algunos permisos de S3 para acceder a las rutas. **Sólo se requieren para buckets de CloudTrail**. Para obtener más información sobre las políticas de Amazon S3, consulta la [referencia de la API de Amazon S3][5].

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

    **Nota**: El ARN principal es el que aparece durante el proceso de instalación para la integración principal de AWS. Consulte la sección Recursos de [Cómo funciona AWS CloudTrail con IAM][6] para obtener más información sobre los ARN de recursos de CloudTrail. Si está actualizando su política (en lugar de añadir una nueva), no necesita el `SID` o el `Principal`.

2. Instala la [integración de Datadog y AWS CloudTrail][7]:
   En la página de la integración, elige los tipos de eventos que deseas mostrar como prioridad normal (el filtro predeterminado) en los eventos del Datadog Explorer. Las cuentas que configuraste en la página de Amazon Web Service también se muestran aquí. Si deseas ver otros eventos que no se mencionan aquí, ponte en contacto con el [soporte de Datadog][8].

### Recopilación de logs

#### Activar logging

En AWS CloudTrail, [crea un Seguimiento][9] y selecciona un bucket de S3 en el que escribir los logs.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Datadog Forwarder Lambda][10] en tu cuenta de AWS.
2. Una vez configurada, ve a la función de Lambda del Datadog Forwarder. En la sección Información general de la función, haz clic en **Add Trigger** (Añadir activador).
3. Para configurar un activador, selecciona el activador **S3**.
4. Selecciona el bucket de S3 que contiene tus logs de CloudTrail.
5. Deja el tipo de evento como `All object create events`.
6. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Ve al [Log Explorer][11] para empezar a explorar tus logs.

Para obtener más información sobre la recopilación de logs de AWS Services, consulta [Enviar registros de AWS Services con la función de Datadog Lambda][12].

## Datos recopilados

### Métricas

La integración AWS CloudTrail no incluye métricas.

### Eventos

La integración de AWS CloudTrail crea muchos eventos diferentes basados en la pista de auditoría de AWS CloudTrail. Todos los eventos se etiquetan con `#cloudtrail` en su Datadog [eventos Explorer][13]. Puedes establecer su prioridad en la configuración de la integración.

Eventos de CloudTrail que se pueden configurar con una prioridad normal (aparecen en el Explorador de eventos bajo el filtro por defecto):

* apigateway
* autoscaling
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
* monitoring
* opsworks
* rds
* redshift
* route53
* s3
* ses
* signin
* ssm

### Checks de servicio

La integración AWS CloudTrail no incluye checks de servicios.

## Solucionar problemas

### El cuadro de CloudTrail no está presente o no hay cuentas enumeradas

Primero hay que configurar la integración de [Amazon Web Services][2]. A continuación, se puede configurar el cuadro de CloudTrail.

[1]: images/cloudtrail_event.png
[2]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_Operations.html
[5]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_Operations.html
[6]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/security_iam_service-with-iam.html#security_iam_service-with-iam-id-based-policies-resources
[7]: https://app.datadoghq.com/integrations/amazon-cloudtrail
[8]: https://docs.datadoghq.com/es/help/
[9]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html
[10]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[11]: https://app.datadoghq.com/logs
[12]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[13]: https://docs.datadoghq.com/es/events/