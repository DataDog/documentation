---
aliases:
- /es/integrations/awskinesis/
categories:
- aws
- cloud
- log collection
custom_kind: integration
dependencies: []
description: Seguimiento de métricas Amazon Kinesis clave.
doc_link: https://docs.datadoghq.com/integrations/amazon_kinesis/
draft: false
git_integration_title: amazon_kinesis
has_logo: true
integration_id: ''
integration_title: Amazon Kinesis
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_kinesis
public_title: Integración de Amazon Kinesis en Datadog
short_description: Seguimiento de métricas Amazon Kinesis clave.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Amazon Kinesis es un servicio totalmente gestionado, basado en la nube utilizado para procesar grandes flujos de datos distribuidos en tiempo real.

Habilita esta integración para ver en Datadog todas tus métricas Kinesis y recopilar etiquetas (tags) personalizadas de Kinesis.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Amazon Web Services][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de métricas

1. En la [página de la integración AWS][2], asegúrate de que `Kinesis` está habilitado en la pestaña `Metric Collection`.
2. Añade estos permisos a tu [política IAM de Datadog][3] para recopilar métricas Amazon Kinesis:

    - `kinesis:ListStreams`: Enumera los flujos (flows) disponibles.
    - `kinesis:DescribeStream`: Añade etiquetas y nuevas métricas para flujos Kinesis.
    - `kinesis:ListTagsForStream`: Añade etiquetas personalizadas.

    Para obtener más información, consulta las [políticas de Kinesis][4] en el sitio web AWS.

3. Instala la [integración Amazon Kinesis en Datadog][5].

### APM

#### Activar logging

Datadog es uno de los destinos predeterminados para los flujos de entrega de Amazon Data Firehose. AWS gestiona enteramente Amazon Data Firehose, por lo que no es necesario mantener ninguna configuración adicional de infraestructura o de reenvío para la transmisión de logs.

Puedes configurar un flujo de entrega de Amazon Data Firehose en la consola de AWS Firehose o puedes configurar automáticamente el destino utilizando una plantilla de CloudFormation:

- [Consola de AWS Firehose][6]
- [Plantilla de CloudFormation][7]

Sin embargo, si generas logs en un bucket de S3, utiliza la función AWS Lambda y asegúrate de que `amazon_kinesis` esté configurado como Prefijo de destino.

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder[8].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon Kinesis en la consola de AWS.

    - [Añadir un activador manual en el bucket de S3][9]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][10]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_kinesis" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración Amazon Kinesis no incluye eventos.

### Checks de servicios

La integración Amazon Kinesis no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con [Soporte técnico de Datadog][12].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/es/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/streams/latest/dev/controlling-access.html
[5]: https://app.datadoghq.com/integrations/amazon-kinesis
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=amazondatafirehosedeliverystream
[7]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=cloudformationtemplate
[8]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[9]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[10]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_kinesis/amazon_kinesis_metadata.csv
[12]: https://docs.datadoghq.com/es/help/