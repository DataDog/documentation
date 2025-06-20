---
aliases:
- /es/integrations/awsefs/
categories:
- aws
- cloud
- data stores
- log collection
- os & system
custom_kind: integration
dependencies: []
description: Seguimiento de métricas clave de Amazon Elastic File System.
doc_link: https://docs.datadoghq.com/integrations/amazon_efs/
draft: false
git_integration_title: amazon_efs
has_logo: true
integration_id: ''
integration_title: Amazon Elastic File System
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_efs
public_title: Integración de Amazon Elastic Filesystem en Datadog
short_description: Seguimiento de métricas clave de Amazon Elastic File System.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Amazon EFS proporciona un almacenamiento de archivos sencillo y escalable para su uso con funciones AWS Lambda o instancias de Amazon EC2.

Habilita esta integración para recopilar tus métricas EFS en Datadog.

## Configuración

### Instalación

Si todavía no lo has hecho, configura la [integración de Amazon Web Services primero][1].

### Recopilación de métricas

1. En la [página de la integración AWS][2], asegúrate de que `EFS` está habilitado en la pestaña `Metric Collection`.
2. Añade estos permisos a tu [política IAM de Datadog][3] para recopilar métricas Amazon EFS:

    - `elasticfilesystem:DescribeTags`: Obtiene las etiquetas (tags) personalizadas aplicadas a sistemas de archivos
    - `elasticfilesystem:DescribeFileSystems`: Proporciona una lista de los sistemas de archivos activos

    Para obtener más información, consulta las [políticas de EFS][4] en el sitio web AWS.

3. Instala la [integración Amazon EFS en Datadog][5].

### APM

#### Activar logging

Configura Amazon EFS para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si generas logs en un bucket de S3, asegúrate de que `amazon_efs` esté configurado como Prefijo de destino.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder[6].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon EFS en la consola de AWS.

    - [Añadir un activador manual en el bucket de S3][7]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][8]

### Amazon EFS para Lambda

[Amazon EFS para Lambda][9] te permite conectar un EFS a tus funciones Lambda. Las organizaciones pueden utilizar EFS para Lambda para simplificar sus cargas de trabajo de Machine Learning y el procesamiento de datos para que sean completamente serverless. Para dividir métricas y logs Lambda por EFS:

1. Instala la [integración AWS Lambda][10] y habilita la recopilación de métricas.
2. Añade este permiso a tu [política IAM de Datadog][3]:

    - `elasticfilesystem:DescribeAccessPoints`: Enumera los EFS activos conectados a funciones Lambda

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_efs" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración Amazon Elastic File System no incluye eventos.

### Checks de servicios

La integración Amazon Elastic File System no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con [Soporte técnico de Datadog][12].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/es/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/efs/latest/ug/auth-and-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-efs
[6]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[9]: /es/integrations/amazon_lambda/#amazon-efs-for-lambda
[10]: https://docs.datadoghq.com/es/integrations/amazon_lambda/#aws-lambda-metrics
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_efs/amazon_efs_metadata.csv
[12]: https://docs.datadoghq.com/es/help/