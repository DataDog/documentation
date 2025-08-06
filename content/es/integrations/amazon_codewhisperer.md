---
app_id: amazon-codewhisperer
app_uuid: 63669bbe-096f-4391-9654-bc0cae65fc73
assets:
  dashboards:
    amazon-codewhisperer: assets/dashboards/amazon_codewhisperer_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - aws.codewhisperer.invocations
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.codewhisperer.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 369
    source_type_name: Amazon CodeWhisperer
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- métricas
- nube
- ia/ml
- herramientas para desarrolladores
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_codewhisperer
integration_id: amazon-codewhisperer
integration_title: Amazon CodeWhisperer
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_codewhisperer
public_title: Amazon CodeWhisperer
short_description: Amazon CodeWhisperer es un servicio de recomendación de código
  basado en ML.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Category::AI/ML
  - Category::Developer Tools
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon CodeWhisperer es un servicio de recomendación de código basado
    en ML.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon CodeWhisperer
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Amazon CodeWhisperer es un servicio con tecnología de machine learning que ayuda a mejorar la productividad de los desarrolladores generando recomendaciones de código basadas en sus comentarios en lenguaje natural y el código en el entorno de desarrollo integrado (IDE).

Activa esta integración para ver todas tus métricas de CodeWhisperer en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `CodeWhisperer` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon CodeWhisperer][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon-codewhisperer" >}}


### Eventos

La integración de Amazon CodeWhisperer no incluye ningún evento.

### Checks de servicio

La integración de Amazon CodeWhisperer no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-codewhisperer
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_codewhisperer/assets/metrics/metric-spec.yaml
[5]: https://docs.datadoghq.com/es/help/