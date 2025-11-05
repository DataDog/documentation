---
app_id: amazon-opensearch-serverless
app_uuid: d9d5508c-1d26-4923-a49e-e679eec28d53
assets:
  dashboards:
    amazon-opensearch-serverless: assets/dashboards/amazon_opensearch_serverless_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.aoss.active_collection
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.aoss.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 17708826
    source_type_name: Amazon OpenSearch Serverless
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- nube
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_opensearch_serverless
integration_id: amazon-opensearch-serverless
integration_title: Amazon OpenSearch Serverless
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_opensearch_serverless
public_title: Amazon OpenSearch Serverless
short_description: Amazon OpenSearch Serverless es una configuración de búsqueda que
  se ajusta automáticamente para manejar las cargas de trabajo versátiles.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon OpenSearch Serverless es una configuración de búsqueda que se
    ajusta automáticamente para manejar las cargas de trabajo versátiles.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon OpenSearch Serverless
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Amazon OpenSearch Serverless es una configuración serverless bajo demanda para OpenSearch, que proporciona una forma sencilla de consultar y analizar grandes volúmenes de datos. Las colecciones de OpenSearch Serverless ofrecen las mismas ventajas que los clústeres autogestionados, sin sumar configuración adicional y ajustes complejos.

Las colecciones vectoriales de búsqueda están diseñadas específicamente para búsquedas de similitudes de alto rendimiento en aplicaciones de Machine Learning (ML) e inteligencia artificial (IA) y pueden utilizarse para crear automáticamente bases de conocimiento en Bedrock.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Configuración

1. En la [página de integración de AWS][2], asegúrate de que OpenSearch Serverless está activado en la pestaña **Metric Collection** (Recopilación de métricas).
2. Instala la [integración de Datadog y Amazon OpenSearch Serverless][3].


## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_opensearch_serverless" >}}


### Checks de servicio

Amazon OpenSearch Serverless no incluye ningún check de servicio.

### Eventos

Amazon OpenSearch Serverless no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-opensearch-serverless
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_opensearch_serverless/assets/metrics/metric-spec.yaml
[5]: https://docs.datadoghq.com/es/help/