---
app_id: blue-matador
app_uuid: b1cfb279-ab1a-4f63-a04f-9c6508d06588
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: bluematador.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10071
    source_type_name: Blue Matador
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Blue Matador
  sales_email: support@bluematador.com
  support_email: support@bluematador.com
categories:
- events
- automatización
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bluematador/README.md
display_on_public_website: true
draft: false
git_integration_title: bluematador
integration_id: blue-matador
integration_title: Blue Matador
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: bluematador
public_title: Blue Matador
short_description: Blue Matador configura automáticamente y mantiene dinámicamente
  cientos de alertas
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Alertar
  - Categoría::Automatización
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Blue Matador configura automáticamente y mantiene dinámicamente cientos
    de alertas
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Blue Matador
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

La integración de Datadog de Blue Matador te permite enviar eventos de Blue Matador al flujo de eventos en Datadog.

![eventstream_from_blue_matador][1]

Puedes utilizarlo para mejorar tus dashboards existentes o para correlacionarlo con métricas que estás recopilando en Datadog.

![dashboard][2]

Para obtener una lista completa de eventos y métricas que Blue Matador monitoriza y que puedes importar a Datadog, consulta su [página de monitores][3].

## Configuración

Para obtener eventos de Blue Matador en Datadog, usa una [clave API de Datadog][4] para crear un nuevo método de notificación en Blue Matador.

**Nota**: Los eventos ya existentes no se importan a Datadog, pero los nuevos eventos aparecen a medida que ocurren.

## Datos recopilados

### Métricas

La integración Blue Matador no incluye ninguna métrica.

### Eventos

Todos los eventos se envían al flujo (stream) de eventos de Datadog.

### Checks de servicios

La integración Blue Matador no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [encargado de mantenimiento][5] de esta integración.

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bluematador/images/eventstream.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bluematador/images/dashboard.png
[3]: https://www.bluematador.com/monitored-events
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://github.com/DataDog/integrations-extras/blob/master/bluematador/manifest.json