---
app_id: amazon-es
app_uuid: c00f4e38-7cc5-42ae-9ea1-519776f5f350
assets:
  dashboards:
    aws_es: assets/dashboards/amazon_es_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.es.cpuutilization
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.es.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 148
    source_type_name: Amazon ES
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_es
integration_id: amazon-es
integration_title: Amazon OpenSearch Service
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_es
public_title: Amazon OpenSearch Service
short_description: Amazon OpenSearch Service facilita el despliegue y el funcionamiento
  de OpenSearch.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon OpenSearch Service facilita el despliegue y el funcionamiento
    de OpenSearch.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon OpenSearch Service
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Amazon OpenSearch Service es un servicio administrado que facilita el despliegue, el funcionamiento y el escalado de clústeres de OpenSearch en la nube de AWS. OpenSearch es un motor de análisis y búsqueda de código abierto para casos de uso como análisis de logs, monitorización de aplicaciones en tiempo real y análisis de secuencias de clics.

Habilita esta integración para ver en Datadog todas tus etiquetas (tags) personalizadas de OpenSearch Service. Ten en cuenta que esta integración es para Amazon AWS OpenSearch Service y NO para una instancia independiente de Elasticsearch alojada fuera de Amazon AWS. (Para dichas instancias, utiliza en su lugar la [integración de Elasticsearch][1]).

Nota: Esta integración requiere que los permisos 'es:ListTags', 'es:ListDomainNames' y 'es:DescribeElasticsearchDomains' estén totalmente habilitados.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración de Amazon Web Services][2].

### Recopilación de métricas

1. En la [página de la integración de AWS][3], asegúrate de que `ES` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon OpenSearch Service][4].

### Recopilación de logs

#### Activar logging

Configura Amazon OpenSearch Service para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_elasticsearch` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][5].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon Elasticsearch en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][6]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][7]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_es" >}}


### Eventos

La integración de Amazon OpenSearch Service no incluye ningún evento.

### Checks de servicios

La integración de Amazon OpenSearch Service no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

[1]: https://docs.datadoghq.com/es/integrations/elastic
[2]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-es
[5]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#manually-set-up-triggers
[8]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_es/assets/metrics/metric-spec.yaml
[9]: https://docs.datadoghq.com/es/help/