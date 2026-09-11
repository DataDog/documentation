---
app_id: segment
app_uuid: e5d343b7-3687-442c-b0ca-6f6b53687fd3
assets:
  dashboards:
    Segment-Overview: assets/dashboards/Segment-Overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: segment.event_delivery.successes
      metadata_path: metadata.csv
      prefix: segment.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 231
    source_type_name: Segment
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- notificaciones
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: segment
integration_id: segment
integration_title: Segment
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: segment
public_title: Segment
short_description: Recopila, unifica y enriquece los datos de los clientes en cualquier
  aplicación o dispositivo.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Notificaciones
  - Offering::Integration
  configuration: README.md#Setup
  description: Recopila, unifica y enriquece los datos de los clientes en cualquier
    aplicación o dispositivo.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-segment-datadog/
  support: README.md#Support
  title: Segment
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->

## Información general

Segment es una infraestructura de datos de clientes que facilita la limpieza, la recopilación y el control de los datos de clientes de origen. Segment recopila datos de fuentes como sitios web o aplicaciones móviles y los envía a uno o varios destinos (por ejemplo, Google Analytics y Amazon Redshift).

Utiliza el dashboard predefinido de Datadog y monitores para:
- Visualizar métricas de entrega de eventos para destinos de modo nube.
- Analizar datos (por ejemplo, dividiendo métricas por espacio de trabajo o por destino) mediante el sistema de etiquetas (tags) de Datadog.
- Automatizar alertas de cualquier problema de entrega para saber cuándo dejan de funcionar los pipelines de datos críticos.

**Nota**: Estas métricas están pensadas para la entrega a destinos como Snowflake o Amplitude, no para la entrega a Segment desde aplicaciones instrumentadas.

## Configuración

### Instalación

Ve al [cuadro de la integración][1] y concede a Datadog `workspace:read` acceso a un espacio de trabajo haciendo clic en el enlace `Add WorkSpace` para iniciar un flujo OAuth2.
El usuario de Segment que concede a Datadog acceso a un espacio de trabajo debe tener el rol `workspace owner`.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "segment" >}}


### Checks de servicio

Segment no incluye checks de servicio.

### Eventos

Segment no incluye eventos.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://app.datadoghq.com/integrations/segment
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/segment/segment_metadata.csv
[3]: https://docs.datadoghq.com/es/help/