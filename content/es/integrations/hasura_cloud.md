---
app_id: hasura-cloud
app_uuid: d7eb9597-f00b-48dc-9100-7afda5fe4bce
assets:
  dashboards:
    Hasura Cloud Datadog Integration Dashboard: assets/dashboards/hasura_cloud.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - hasura_cloud.requests_per_minute
      - hasura_cloud.average_execution_time
      - hasura_cloud.success_rate
      metadata_path: metadata.csv
      prefix: hasura_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10175
    source_type_name: Hasura Cloud
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Hasura
  sales_email: support@hasura.io
  support_email: support@hasura.io
categories:
- nube
- recopilación de logs
- rastreo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/hasura_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: hasura_cloud
integration_id: hasura-cloud
integration_title: Hasura Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: hasura_cloud
public_title: Hasura Cloud
short_description: Monitorización de tu proyecto Hasura Cloud
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Recopilación de logs
  - Categoría::Rastreo
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorización de tu proyecto Hasura Cloud
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Hasura Cloud
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[Hasura Cloud][1] proporciona una API GraphQL escalable, altamente disponible, distribuida globalmente,
segura y lista para la producción para tus fuentes de datos.

La integración Datadog es una función de observabilidad de Hasura Cloud que exporta
logs, métricas y trazas (traces) de operación de tu proyecto Hasura Cloud a tu dashboard de Datadog. 

## Configuración

Para configurar la integración Hasura Cloud en Datadog para tu proyecto Hasura Cloud, proporciona una clave de API Datadog y una región a Hasura Cloud.

Para saber cómo configurar la integración Datadog para tu proyecto Hasura Cloud, consulta la [documentación de Hasura Cloud][2].

Una vez realizado lo anterior, ve a la [sección Logs][3] en Datadog y crea facetas para los siguientes campos de nivel superior:

* `operation_name`
* `operation_type`
* `error_code`
* `is_error`

Para obtener información sobre la creación de facetas a partir de logs, consulta la [documentation de las facetas de logs de Datadog][4].

Los logs, las métricas, y las trazas de tu proyecto Hasura Cloud se envían automáticamente a Datadog cuando tu proyecto recibe tráfico.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "hasura-cloud" >}}


### Checks de servicios

La integración Hasura Cloud no incluye checks de servicio.

### Eventos

La integración Hasura Cloud no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://hasura.io/cloud/
[2]: https://hasura.io/docs/latest/observability/integrations/datadog/
[3]: https://app.datadoghq.com/logs
[4]: https://docs.datadoghq.com/es/logs/explorer/facets/#create-facets
[5]: https://docs.datadoghq.com/es/help/