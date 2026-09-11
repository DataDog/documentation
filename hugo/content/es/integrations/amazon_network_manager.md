---
app_id: amazon-network-manager
app_uuid: 294d91c5-7746-40f1-a314-103f7b6ffd9f
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - aws.ec2.infrastructureperformance.aggregate_aws_network_performance
      - aws.networkmanager.bytes_drop_count_blackhole
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10414
    source_type_name: AWS Network Manager
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- métricas
- nube
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_network_manager
integration_id: amazon-network-manager
integration_title: AWS Network Manager
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_network_manager
public_title: AWS Network Manager
short_description: AWS Network Manager proporciona monitorización centralizada para
  redes globales.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Offering::Integration
  configuration: README.md#Setup
  description: AWS Network Manager proporciona monitorización centralizada para redes
    globales.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS Network Manager
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

AWS Network Manager es un servicio de monitorización centralizado para gestionar tu red central WAN en la nube de AWS y tu red de AWS Transit Gateway a través de cuentas, regiones y localizaciones on-premises de AWS.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Configuración

1. En la [página de integración de AWS][2], asegúrate de que Network Manager está activado en la pestaña **Metric Collection** (Recopilación de métricas).
2. Instala la [integración de Datadog y Amazon Network Manager][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon-network-manager" >}}


### Checks de servicio

Amazon Network Manager no incluye ningún check de servicio.

### Eventos

Amazon Network Manager no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-network-manager
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_network_manager/assets/metrics/metric-spec.yaml
[5]: https://docs.datadoghq.com/es/help/