---
app_id: azure-db-for-postgresql
app_uuid: 6306388c-c569-497a-ba36-c584c74cfffc
assets:
  dashboards:
    azure_db_for_postgresql: assets/dashboards/azure_db_for_postgresql.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.dbforpostgresql_servers.storage_used
      - azure.dbforpostgresql_flexibleservers.cpu_percent
      metadata_path: metadata.csv
      prefix: azure.dbforpostgresql
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 223
    source_type_name: Azure DB para PostgreSQL
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_db_for_postgresql
integration_id: azure-db-for-postgresql
integration_title: Azure DB para PostgreSQL
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_db_for_postgresql
public_title: Azure DB para PostgreSQL
short_description: Rastrea las métricas principales de Azure DB for PostgreSQL.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas principales de Azure DB for PostgreSQL.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure DB para PostgreSQL
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Database for PostgreSQL proporciona una base de datos como servicio PostgreSQL comunitaria, totalmente gestionada y preparada para empresas.

Obtén métricas de Azure DB for PostgreSQL para:

- Visualizar el rendimiento de tus bases de datos PostgreSQL
- Correlacionar el rendimiento de tus bases de datos PostgreSQL con tus aplicaciones

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_db_for_postgresql" >}}


### Eventos

La integración Azure DB for PostgreSQL no incluye eventos.

### Checks de servicio

La integración Azure DB for PostgreSQL no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_postgresql/azure_db_for_postgresql_metadata.csv
[3]: https://docs.datadoghq.com/es/help/