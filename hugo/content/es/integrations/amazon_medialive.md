---
app_id: amazon-medialive
app_uuid: f1068638-b7c6-448a-bc57-0267f94d4edd
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - aws.medialive.active_alerts
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.medialive.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 354
    source_type_name: Amazon MediaLive
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
git_integration_title: amazon_medialive
integration_id: amazon-medialive
integration_title: Amazon MediaLive
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_medialive
public_title: Amazon MediaLive
short_description: AWS Elemental MediaLive es un servicio de procesamiento de vídeo
  de transmisión en directo.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Offering::Integration
  configuration: README.md#Setup
  description: AWS Elemental MediaLive es un servicio de procesamiento de vídeo de
    transmisión en directo.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon MediaLive
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

AWS Elemental MediaLive es un servicio de procesamiento de vídeo de transmisión en directo.

Habilita esta integración para ver todas tus métricas de MediaLive en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En el [cuadro de la integración de AWS][2], asegúrate de que `MediaLive` está habilitado
   en la pestaña de recopilación de métricas.
2. Instala la [integración de Datadog y MediaLive][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon-medialive" >}}


### Eventos

La integración de MediaLive no incluye ningún evento.

### Checks de servicio

La integración de MediaLive no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-medialive
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_medialive/assets/metrics/metric-spec.yaml
[5]: https://docs.datadoghq.com/es/help/