---
app_id: azure-db-for-mysql
app_uuid: e0f71c73-4783-4ada-8bcf-d7f870a7b933
assets:
  dashboards:
    azure_db_for_mysql: assets/dashboards/azure_db_for_mysql.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.dbformysql_servers.storage_used
      - azure.dbformysql_flexibleservers.cpu_percent
      metadata_path: metadata.csv
      prefix: azure.dbformysql
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 225
    source_type_name: Azure DB para MySQL
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
git_integration_title: azure_db_for_mysql
integration_id: azure-db-for-mysql
integration_title: Azure DB para MySQL
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_db_for_mysql
public_title: Azure DB para MySQL
short_description: Rastrea las métricas principales de Azure DB for MySQL.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas principales de Azure DB for MySQL.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure DB para MySQL
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Database for MySQL proporciona una base de datos como servicio MySQL comunitaria, totalmente gestionada y preparada para empresas.

Obtén métricas de Azure Database for MySQL para:

- Visualizar el rendimiento de tus bases de datos MySQL.
- Correlacionar el rendimiento de tus bases de datos MySQL con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_db_for_mysql" >}}


### Eventos

La integración Azure Database for MySQL no incluye eventos.

### Checks de servicio

La integración Azure Database for MySQL no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_mysql/azure_db_for_mysql_metadata.csv
[3]: https://docs.datadoghq.com/es/help/