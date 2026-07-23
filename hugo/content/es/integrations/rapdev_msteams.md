---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-msteams
app_uuid: 38da0072-43b5-44e8-a303-1e504bcc0879
assets:
  dashboards:
    MS Teams CQ Call Overview: assets/dashboards/ms_teams_cq_call_overview.json
    MS Teams CQ Lookup Metadata: assets/dashboards/ms_teams_cq_lookup_metadata.json
    MS Teams CQ Lookup Performance Classifiers: assets/dashboards/ms_teams_cq_lookup_performance_classifiers.json
    MS Teams CQ User Devices: assets/dashboards/ms_teams_cq_user_devices.json
    MS Teams CQ User Experience: assets/dashboards/ms_teams_cq_user_experience.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.msteams.call.duration
      metadata_path: metadata.csv
      prefix: rapdev.msteams.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10297
    source_type_name: RapDev MSTeams
  logs:
    source: rapdev_msteams
  monitors:
    Call session packet utilization is poor: assets/monitors/performance_audio_packet_utilization.json
    Network jitter is too high: assets/monitors/performance_audio_average_jitter.json
    Packet loss rate is too high: assets/monitors/performance_audio_packet_loss.json
    Roundtrip time is too high: assets/monitors/performance_audio_rtt.json
    Video frame loss is too high: assets/monitors/performance_video_frame_loss_percentage.json
    Video frame rate is too low: assets/monitors/performance_video_average_frame_rate.json
    Video packet loss is too high after packet corrections: assets/monitors/performance_video_fecplr.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- colaboración
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_msteams
integration_id: rapdev-msteams
integration_title: Microsoft Teams
integration_version: ''
is_public: true
legal_terms:
  eula: activos/EULA.pdf
manifest_version: 2.0.0
name: rapdev_msteams
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.msteams
  product_id: msteams
  short_description: Precio unitario por participante de una reunión
  tag: participante_de_reunión
  unit_label: Participante de una reunión
  unit_price: 0.1
public_title: Microsoft Teams
short_description: Monitorizar la calidad de las llamadas de Microsoft Teams para
  usuarios y dispositivos
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Colaboración
  - Categoría::Marketplace
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitorizar la calidad de las llamadas de Microsoft Teams para usuarios
    y dispositivos
  media:
  - caption: Calidad de las llamadas
    image_url: images/1.jpg
    media_type: imagen
  - caption: Información general de la experiencia del usuario con la calidad de las
      llamadas
    image_url: images/2.jpg
    media_type: imagen
  - caption: Experiencia del usuario con la calidad de audio y vídeo de la llamada
    image_url: images/3.jpg
    media_type: imagen
  - caption: Calidad de las llamadas con los dispositivos del usuario
    image_url: images/4.jpg
    media_type: imagen
  - caption: Tabla de búsqueda de calificadores de rendimiento
    image_url: images/5.jpg
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Microsoft Teams
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->
## Información general

La integración RapDev Microsoft Teams monitoriza los informes de calidad de las llamadas y proporciona métricas, monitores y dashboards que ofrecen información sobre la actividad y la experiencia de las llamadas. 

Esta integración incluye 
1. Varios dashboards
2. Monitores recomendados de las métricas de calidad de las llamadas
3. Tablas de consulta de métricas de metadatos de llamadas y calificadores de rendimiento

La integración Microsoft Teams requiere permisos mínimos en tu inquilino de Active Directory y es fácil de instalar, lo que permite a tu organización desplegarla rápidamente y comenzar a generar informes sobre la calidad de las llamadas de Microsoft Teams.

## Compatibilidad
Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con RapDev.io a través de los siguientes canales: 

 - Correo electrónico: support@rapdev.io 
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Teléfono: 855-857-0222 

---

Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una [nota](mailto:support@rapdev.io) y la crearemos.*


---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-msteams" target="_blank">adquiere esta aplicación en el Marketplace</a>.