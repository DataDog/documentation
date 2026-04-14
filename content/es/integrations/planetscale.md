---
app_id: planetscale
app_uuid: ea670b69-7322-4c75-afbc-4ef1a6cf286c
assets:
  dashboards:
    planetscale_overview: assets/dashboards/planetscale_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: planetscale.tables.storage
      metadata_path: metadata.csv
      prefix: planetscale.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10264
    source_type_name: PlanetScale
author:
  homepage: http://www.planetscale.com
  name: PlanetScale
  sales_email: sales@planetscale.com
  support_email: support@planetscale.com
categories:
- almacenes de datos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/planetscale/README.md
display_on_public_website: true
draft: false
git_integration_title: planetscale
integration_id: planetscale
integration_title: PlanetScale
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: planetscale
public_title: PlanetScale
short_description: Envía tus métricas PlanetScale a Datadog.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenes de datos
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Envía tus métricas PlanetScale a Datadog.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: PlanetScale
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

PlanetScale puede enviar métricas a Datadog para ayudar a tu equipo a comprender el uso y el rendimiento de la base de datos.

## Configuración

Sigue los siguientes pasos para configurar PlanetScale en tu organización para enviar métricas a Datadog.

1. Crea una clave de API Datadog en tus [parámetros de organización de Datadog][1].
2. Proporciona a PlanetScale la clave de API Datadog en tus [parámetros de organización de Datadog][2].

![Parámetros de organización de Datadog][3]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "planetscale" >}}


### Checks de servicio

PlanetScale no incluye checks de servicios.

### Eventos

PlanetScale no incluye eventos.

## Compatibilidad

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.planetscale.com/settings/integrations
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/planetscale/images/planetscale.png
[4]: https://github.com/DataDog/integrations-extras/blob/master/planetscale/metadata.csv
[5]: https://docs.datadoghq.com/es/help/