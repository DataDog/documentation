---
app_id: statsig
app_uuid: 57fb9235-151d-4ed9-b15e-a3e6f918dcca
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: statsig.log_event.count
      metadata_path: metadata.csv
      prefix: statsig.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10180
    source_type_name: Statsig
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Statsig
  sales_email: support@statsig.com
  support_email: support@statsig.com
categories:
- configuración y despliegue
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/statsig/README.md
display_on_public_website: true
draft: false
git_integration_title: statsig
integration_id: statsig
integration_title: Statsig
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: statsig
public_title: Statsig
short_description: Monitorización de cambios de Statsig en Datadog
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Configuración y despliegue
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorización de cambios de Statsig en Datadog
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/feature-monitoring-statsig-datadog-marketplace/
  support: README.md#Soporte
  title: Statsig
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

La integración Statsig en Datadog permite a Statsig enviar eventos y métricas para ayudarte a monitorizar tu producto y tus servicios y también a observar cómo los despliegues de feature gates o los cambios de configuración afectan al resto de tu ecosistema.

## Configuración

### Instalación

No es necesaria ninguna instalación para configurar la integración Statsig.

### Configuración

1. Copia tu clave de API Datadog.
2. [Ve a la pestaña Integraciones en la consola Statsig][1].
3. Haz clic en la tarjeta Datadog.
4. Introduce tu clave de API en el campo superior y haz clic en Confirm (Confirmar).

## Datos recopilados

La integración Statsig no recopila datos de Datadog.

### Métricas
{{< get-metrics-from-git "statsig" >}}


### Checks de servicio

La integración Statsig no incluye checks de servicio.

### Eventos

La integración Statsig envía eventos de cambio de configuración en Statsig a Datadog. Por ejemplo, feature gates actualizadas o nuevas integraciones.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Statsig][3] o visita el [sitio web de Statsig][4].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización de versiones de funciones con la oferta de Statsig en el Marketplace de Datadog][5]

[1]: https://console.statsig.com/integrations
[2]: https://github.com/DataDog/integrations-extras/blob/master/statsig/metadata.csv
[3]: mailto:support@statsig.com
[4]: https://www.statsig.com/contact
[5]: https://www.datadoghq.com/blog/feature-monitoring-statsig-datadog-marketplace/