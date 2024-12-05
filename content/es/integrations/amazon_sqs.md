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
      metadata_path: metadata.csv
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
custom_kind: integration
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

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/amazon_sqs/sqsdashboard.png" alt="Dashboard de SQS" popup="true">}}

## Información general

"Amazon Simple Queue Service (SQS) es un servicio de cola de mensajes totalmente gestionado, rápido, fiable y escalable."

Habilite este integración para ver todos sus SQS métricas en Datadog.

## Configuración

### Instalación

Si todavía no lo has hecho, configura la [integración de Amazon Web Services primero][1].

### Recopilación de métricas

1. En la [página de la integración AWS][2], asegúrate de que `SQS` está habilitado en la pestaña `Metric Collection`.
2. Añade estos permisos a tu [política IAM de Datadog][3] para recopilar métricas Amazon SQS:

    - `sqs:ListQueues`: Se utiliza para enumerar colas activas.
    - `tag:GetResources`: Obtén etiquetas (tags) personalizadas aplicadas a las colas SQS.

    Para obtener más información, consulta las [políticas de SQS][4] en el sitio web AWS.

3. Instale [Datadog - Amazon SQS integración][5].

### Recopilación de logs

#### Habilitar el registro SQS

Para configurar tu ruta, consulta [Registro de llamadas a la API de Amazon SQS mediante AWS CloudTrail][6]. Cuando definas tus rutas, selecciona un bucket de S3 en el que escribir los logs:

{{< img src="integraciones/amazon_cloudtrail/cloudtrail_logging.png" alt="Registro CloudTrail" popup="true" style="width:70%;">}}

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función AWS Lambda de recopilación de logs de Datadog][7].
2. Una vez instalada la función Lambda, añade manualmente un activador en el bucket de S3 que contiene tus logs Amazon SQS en la consola de AWS. En tu Lambda, haz clic en S3 en la lista de activadores:
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="Configuración de un activador en S3" popup="true" style="width:70%;">}}
   Configura tu activador eligiendo el bucket de S3 que contiene tus logs Amazon SQS y cambia el tipo de evento a `Object Created (All)`. A continuación, haz clic en el botón Add (Añadir).
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="Configuración de un activador Lambda en S3" popup="true" style="width:70%;">}}

Una vez añadido el activador, utilice el [Datadog loguear Explorer][8] para ver su Logs.

## Recopilación de datos

### Métricas
{{< get-metrics-from-git "amazon_sqs" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, donde se incluyen, entre otros, el nombre del host, los grupos de seguridad y más.

### Eventos

Amazon SQS integración no incluye ninguna eventos.

### Checks de servicios

La integración Amazon SQS no incluye checks de servicios.

## Monitorización predefinida

La integración de Amazon SQS proporciona capacidades de monitorización listas para utilizar para monitorizar y optimizar el rendimiento.

- Dashboard de Amazon SQS: Obtén información general global de tus colas SQS utilizando el [dashboard de Amazon SQS][10] predefinido.
- recomendado Monitors: Habilite [recomendado Amazon SQS monitors][11] para detectar proactivamente los problemas y recibir alertas oportunas.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [Soporte técnico de Datadog][12].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/es/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-authentication-and-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-sqs
[6]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/logging-using-cloudtrail.html
[7]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[8]: https://app.datadoghq.com/logs
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sqs/amazon_sqs_metadata.csv
[10]: https://app.datadoghq.com/dash/integration/6/aws-sqs
[11]: https://app.datadoghq.com/monitors/recommended
[12]: https://docs.datadoghq.com/es/help/