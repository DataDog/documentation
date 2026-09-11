---
app_id: amazon-network-monitor
app_uuid: 6130fd16-af31-4424-bf08-80e01ec1846d
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - aws.networkmonitor.health_indicator
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.networkmonitor.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10444
    source_type_name: Amazon CloudWatch Network Monitor
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
git_integration_title: amazon_network_monitor
integration_id: amazon-network-monitor
integration_title: Amazon CloudWatch Network Monitor
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_network_monitor
public_title: Amazon CloudWatch Network Monitor
short_description: Amazon CloudWatch Network Monitor proporciona monitorización para
  las redes globales.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon CloudWatch Network Monitor proporciona monitorización para las
    redes globales.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/amazon-cloudwatch-network-monitor-datadog/
  support: README.md#Support
  title: Amazon CloudWatch Network Monitor
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Amazon CloudWatch Network Monitor es un servicio que proporciona administración centralizada y monitorización para redes globales en AWS u on-premises.

Habilita esta integración para obtener visibilidad de las métricas en Amazon CloudWatch Network Monitor.

## Configuración

### Instalación

Si aún no lo has hecho, configura [la integración de Amazon Web Services][1].

### Recopilación de métricas

Instala la [integración de Datadog y CloudWatch Network Monitor][2].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon-network-monitor" >}}


### Eventos

La integración de CloudWatch Network Monitor no incluye ningún evento.

### Checks de servicio

La integración de CloudWatch Network Monitor no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Rastreo y alerta en las métricas de Amazon CloudWatch Network Monitor con Datadog][5]

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-network-monitor
[3]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_network_monitor/assets/metrics/metric-spec.yaml
[4]: https://docs.datadoghq.com/es/help/
[5]: https://www.datadoghq.com/blog/amazon-cloudwatch-network-monitor-datadog/