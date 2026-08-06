---
app_id: amazon-sqs
app_uuid: 3a036cf4-b953-441a-ad13-a99f2b8a684e
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.sqs.sent_message_size
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.sqs.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 102
    source_type_name: Amazon SQS
  monitors:
    SQS Message Processing Time Monitor: assets/monitors/sqs_message_processing_time.json
    SQS Message Queue Anomaly Monitor: assets/monitors/sqs_message_queue_anomaly.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- metrics
- cloud
- log collection
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_sqs
integration_id: amazon-sqs
integration_title: Amazon SQS
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_sqs
public_title: Amazon SQS
short_description: Amazon Simple Queue Service (SQS) es un servicio de cola de mensajes
  totalmente gestionado, rápido, fiable y escalable.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Métricas
  - Category::Nube
  - Category::Recopilación de logs
  - Offering::Integración
  - Product::Monitorización de flujos de datos
  configuration: README.md#Configuración
  description: Amazon Simple Queue servicio (SQS) es una cola de mensajes rápida,
    fiable, escalable, Totalmente gestionado servicio .
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Amazon SQS
---

<!--  EXTRAIDO DE https://github.com/DataDog/integrations-internal-core -->
![SQS Dashboard][1]

## Información general

"Amazon Simple Queue Service (SQS) es un servicio de cola de mensajes totalmente gestionado, rápido, fiable y escalable."

Habilite este integración para ver todos sus SQS métricas en Datadog.

## Configuración

### Instalación

Si todavía no lo has hecho, configura la [integración de Amazon Web Services primero][2].

### Recopilación de métricas

1. En la [página de integración de AWS][3], asegúrate de que `SQS` está activado en la pestaña`Metric Collection`.
2. Añade estos permisos a tu [política de IAM de Datadog][4] para recopilar métricas de Amazon SQS:

    - `sqs:ListQueues`: Se utiliza para enumerar colas activas.
    - `tag:GetResources`: Obtén etiquetas (tags) personalizadas aplicadas a las colas SQS.

    Para obtener más información, consulta las [políticas de SQS][5] en el sitio web de AWS.

3. Instala [la integración de Datadog y Amazon SQS][6].

### Recopilación de logs

#### Habilitar el registro SQS

Para configurar tu seguimiento, consulta [Registro de llamadas a la API de Amazon SQS mediante AWS CloudTrail][6]. Cuando definas tus seguimientos, selecciona un bucket de S3 en el que escribir los logs:

![Registro de CloudTrail][8]

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de AWS Lambda de recopilación de logs de Datadog][9].
2. Una vez instalada la función Lambda, añade manualmente un activador en el bucket de S3 que contiene tus logs Amazon SQS en la consola de AWS. En tu Lambda, haz clic en S3 en la lista de activadores:
   ![Configuración del desencadenante de S3][10]
   Configura tu activador eligiendo el bucket de S3 que contiene tus logs Amazon SQS y cambia el tipo de evento a `Object Created (All)`. A continuación, haz clic en el botón Add (Añadir).
   ![Configuración del desencadenante de S3 Lambda][11]

Una vez añadido el desencadenante, utiliza el [Datadog Log Explorer][12] para ver tus logs.

## Recopilación de datos

### Métricas
{{< get-metrics-from-git "amazon-sqs" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, donde se incluyen, entre otros, el nombre del host, los grupos de seguridad y más.

### Eventos

Amazon SQS integración no incluye ninguna eventos.

### Checks de servicios

La integración Amazon SQS no incluye checks de servicios.

## Monitorización predefinida

La integración de Amazon SQS proporciona capacidades de monitorización listas para utilizar para monitorizar y optimizar el rendimiento.

- Dashboardde Amazon SQS: obtén una visión completa de tus colas de SQS utilizando la herramienta predefinida [dashboard de Amazon SQS][14].
- Monitores recomendados: habilita los [monitores recomendados de Amazon SQS][15] para detectar problemas de forma proactiva y recibir alertas oportunas.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [el soporte de Datadog][16].

[1]: images/sqsdashboard.png
[2]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://docs.datadoghq.com/es/integrations/amazon_web_services/#installation
[5]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-authentication-and-access-control.html
[6]: https://app.datadoghq.com/integrations/amazon-sqs
[7]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/logging-using-cloudtrail.html
[8]: images/cloudtrail_logging.png
[9]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[10]: images/s3_trigger_configuration.png
[11]: images/s3_lambda_trigger_configuration.png
[12]: https://app.datadoghq.com/logs
[13]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_sqs/assets/metrics/metric-spec.yaml
[14]: https://app.datadoghq.com/dash/integration/6/aws-sqs
[15]: https://app.datadoghq.com/monitors/recommended
[16]: https://docs.datadoghq.com/es/help/