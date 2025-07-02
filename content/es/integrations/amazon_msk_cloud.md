---
app_id: amazon-msk
app_uuid: 1d3bab8a-f99a-45ad-b1c6-69e919125029
assets:
  dashboards:
    amazon_msk: assets/dashboards/amazon_msk.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: aws.kafka.zoo_keeper_request_latency_ms_mean
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.kafka.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 235
    source_type_name: Amazon MSK
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_msk_cloud
integration_id: amazon-msk
integration_title: Amazon MSK
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_msk_cloud
public_title: Amazon MSK
short_description: Simplifica la creación y ejecución de aplicaciones que procesan
  datos de transmisión.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Category::AWS
  - Category::Log Collection
  - Offering::Integration
  - Product::Data Streams Monitoring
  configuration: README.md#Setup
  description: Simplifica la creación y ejecución de aplicaciones que procesan datos
    de transmisión.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-amazon-msk/
  support: README.md#Support
  title: Amazon MSK
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Amazon Managed Streaming para Apache Kafka (MSK) es un servicio totalmente gestionado que facilita la creación y ejecución de aplicaciones que utilizan Apache Kafka para procesar datos de streaming.

Esta integración utiliza un rastreador que recopila métricas de CloudWatch. Lee la página de [Amazon MSK (Agent)][1] para obtener información sobre la monitorización de MSK a través del Datadog Agent.

## Configuración

Habilita el rastreador de Amazon MSK para ver las métricas de MSK desde CloudWatch en Datadog.

### Instalación

Si aún no lo has hecho, primero configura la [integración de Amazon Web Services][2].

### Recopilación de métricas

1. En la [página de la integración de AWS][3], asegúrate de que `Kafka` está activada en la pestaña `Metric Collection`.

2. Instala la [integración de Amazon MSK][4].

### Recopilación de logs

#### Activar logging

Configura Amazon MSK para enviar logs a un bucket de S3 o a CloudWatch.

**Notas**:
- Si vas a loguear en un bucket de S3, asegúrate de que `amazon_msk` está configurado como _Target prefix_ (Prefijo de destino).
- Si vas a loguear en un grupo de logs de CloudWatch, asegúrate de que tu nombre contiene la subcadena `msk`.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][5].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de Amazon MSK en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][6]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][7]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon-msk" >}}


### Eventos

El rastreador de Amazon MSK no incluye ningún evento.

### Checks de servicio

La integración de Amazon MSK no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/amazon_msk/
[2]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-msk
[5]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_msk_cloud/assets/metrics/metric-spec.yaml
[9]: https://docs.datadoghq.com/es/help/
