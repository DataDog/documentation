---
app_id: agora-analytics
app_uuid: a752523e-9c3d-458c-a91a-af0c9fae5adc
assets:
  dashboards:
    Agora Analytics Overview: assets/dashboards/agora_analytics_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - agora.rtc.app_id.online_user
      - agora.rtc.app_id.online_channel
      - agora.rtc.app_id.audio_freeze_rate
      - agora.rtc.app_id.video_freeze_rate
      - agora.rtc.app_id.network_delay_rate
      - agora.rtc.app_id.join_attempt
      - agora.rtc.app_id.join_success_count
      - agora.rtc.app_id.join_success_rate
      - agora.rtc.app_id.join_success_in_5s_rate
      metadata_path: metadata.csv
      prefix: agora.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10335
    source_type_name: Agora Analytics
author:
  homepage: https://www.agora.io
  name: Agora
  sales_email: sales-us@agora.io
  support_email: support@agora.io
categories:
- colaboración
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/agora_analytics/README.md
display_on_public_website: true
draft: false
git_integration_title: agora_analytics
integration_id: agora-analytics
integration_title: Agora Analytics
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: agora_analytics
public_title: Agora Analytics
short_description: Ver métricas del recopilador de Agora Analytics en Datadog
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Ver métricas del recopilador de Agora Analytics en Datadog
  media:
  - caption: 'Información general de Agora Analytics: dashboard'
    image_url: images/agora_analytics_dashboard.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Agora Analytics
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Agora Analytics rastrea e interpreta el uso, la calidad y el rendimiento del chat, la voz en tiempo real y el vídeo. Analytics es una extensión para Voice Calling, Video Calling, Interactive Live Streaming y el chat de Agora que ayuda a localizar problemas de calidad, encontrar las causas raíz y solucionar problemas para mejorar la experiencia del usuario final.

Esta integración envía métricas incluyendo datos de uso, calidad y rendimiento directamente a tu cuenta de Datadog.

## Configuración

Consulta la [documentación][1] de la integración de Agora Analytics para obtener información detallada sobre la configuración del conector de Agora Analytics Datadog.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "agora-analytics" >}}


### Eventos

Agora Analytics no incluye ningún evento.

### Checks de servicio

Agora Analytics no incluye ningún check de servicio.

## Agent

¿Necesitas ayuda? Ponte en contacto con el [soporte de Agora][3].

[1]: https://docs.agora.io/en/agora-analytics/analyze/video-voice-sdk/datadog-integration
[2]: https://github.com/DataDog/integrations-extras/blob/master/agora_analytics/metadata.csv
[3]: mailto:support@agora.io