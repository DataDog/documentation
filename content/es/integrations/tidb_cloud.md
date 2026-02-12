---
app_id: tidb-cloud
app_uuid: 9ed710d3-49d4-41fa-a304-0b27f289bdb7
assets:
  dashboards:
    TiDB Cloud Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: tidb_cloud.db_queries_total
      metadata_path: metadata.csv
      prefix: tidb_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10247
    source_type_name: TiDB Cloud
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: PingCAP
  sales_email: xuyifan02@pingcap.com
  support_email: xuyifan02@pingcap.com
categories:
- nube
- almacenes de datos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/tidb_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: tidb_cloud
integration_id: tidb-cloud
integration_title: TiDB Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: tidb_cloud
public_title: TiDB Cloud
short_description: Monitorización de clústeres TiDB Cloud con Datadog
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Categoría::Nube
  - Categoría::Almacenes de datos
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorización de clústeres TiDB Cloud con Datadog
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: TiDB Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

[TiDB Cloud][1] es un servicio de nube de TiDB totalmente gestionado y una base de datos de código abierto.

Utiliza la integración TiDB Cloud en Datadog para exportar métricas desde clústeres TiDB Cloud a Datadog.

> **Nota:**
>
> - Para clústeres TiDB on premises, consulta la [integración TiDB][2].

## Configuración

Para configurar la integración TiDB Cloud en Datadog para tu clúster, proporciona una clave de API Datadog y una región a TiDB Cloud.

Para configurar la integración Datadog para tu proyecto TiDB Cloud, consulta [Preferencias de TiDB Cloud][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "tidb-cloud" >}}


### Checks de servicio

La integración TiDB Cloud no incluye checks de servicio.

### Eventos

La integración TiDB Cloud no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://tidbcloud.com
[2]: https://docs.datadoghq.com/es/integrations/tidb/
[3]: https://tidbcloud.com/console/preferences
[4]: https://github.com/DataDog/integrations-extras/blob/master/tidb_cloud/metadata.csv
[5]: https://docs.datadoghq.com/es/help/