---
app_id: datazoom
app_uuid: 3c289cc6-b148-4e99-98ae-66c01386f767
assets:
  dashboards:
    Datazoom Overview: assets/dashboards/datazoom_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: datazoom.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10260
    source_type_name: Datazoom
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/datazoom/README.md
display_on_public_website: true
draft: false
git_integration_title: datazoom
integration_id: datazoom
integration_title: Datazoom
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: datazoom
public_title: Datazoom
short_description: Visualiza los datos del recopilador de Datazoom en el Explorador
  de logs.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Visualiza los datos del recopilador de Datazoom en el Explorador de
    logs.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-datazoom/
  support: README.md#Soporte
  title: Datazoom
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Datazoom es una plataforma de datos de vídeo que recopila datos de endpoints a través de un ecosistema de recopiladores.

El [Conector Datazoom Datadog][1] envía datos de los recopiladores a Datadog y podrás consultarlos en tu [Explorador de logs][2].

Datazoom envía datos configurados en el nivel INFO.

## Configuración

### Instalación

La integración Datazoom emite logs a Datadog. No es necesaria ninguna instalación del lado de Datadog.

### Configuración

- Para obtener más información sobre cómo configurar el conector Datazoom Datadog, consulta la [documentación][1] de la integración Datazoom.

### Dashboard

Consulta el [dashboard de logs de Datazoom][3].

## Datos recopilados

### Métricas

Datazoom no incluye métricas.

### Checks de servicio

Datazoom no incluye checks de servicio.

### Eventos

Datazoom no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Blog: Monitorización de la telemetría de Datazoom con Datadog][5]

[1]: https://help.datazoom.io/hc/en-us/articles/360042494512-Datadog
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/dashboard/lists/preset/3?q=datazoom
[4]: https://docs.datadoghq.com/es/help/
[5]: https://www.datadoghq.com/blog/monitor-datazoom/