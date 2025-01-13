---
app_id: insightfinder
app_uuid: 144b8c72-b842-4257-9815-93aa63ad2da1
assets:
  dashboards:
    InsightFinder Dashboard: assets/dashboards/ifdashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: insightfinder.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10253
    source_type_name: InsightFinder
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: InsightFinder
  sales_email: support@insightfinder.com
  support_email: support@insightfinder.com
categories:
- events
- automatización
- rum
- notificaciones
- ia/ml
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/insightfinder/README.md
display_on_public_website: true
draft: false
git_integration_title: insightfinder
integration_id: insightfinder
integration_title: InsightFinder
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: insightfinder
public_title: InsightFinder
short_description: Integra los datos de Datadog para su análisis con InsightFinder.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Alertas
  - Categoría::Automatización
  - Categoría::Incidentes
  - Categoría::Notificaciones
  - Categoría::IA/ML
  - SO compatible::Linux
  - SO compatible::Windows
  - SO compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Integra los datos de Datadog para su análisis con InsightFinder.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: InsightFinder
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

[InsightFinder][1] AIOps identifica los problemas de sistemas y aplicaciones antes de que afecten a los usuarios. Gracias a la tecnología no supervisada de machine learning, InsightFinder aprende continuamente de eventos, logs, métricas y cambios para detectar anomalías, predecir incidentes y corregir errores.

Esta integración bidireccional brinda capacidades avanzadas de AIOps. InsightFinder recibe datos de Datadog a través de las API estándar y detecta anomalías en los eventos antes de que tu negocio se vea afectado. Las alertas de estos eventos anómalos pueden enviarse a Datadog para notificar a tu equipo.

## Configuración

### Instalación

Para configurar la integración y enviar datos a InsightFinder, consulta la [Integración de InsightFinder y Datadog][2]. Debes contar con una [clave de API y de aplicación][3] de Datadog.


## Compatibilidad

Ponte en contacto con el [servicio de asistencia de Datadog][4] o envía un correo electrónico al [servicio de asistencia de InsightFinder][5].


[1]: https://insightfinder.com/
[2]: https://insightfinder.com/datadog-integration/
[3]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[4]: https://docs.datadoghq.com/es/help/
[5]: mailto:support@insightfinder.com