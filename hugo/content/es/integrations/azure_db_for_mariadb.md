---
app_id: azure-dbformariadb
app_uuid: 7d232ca6-3098-473a-8d53-e6c3e22653bd
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.dbformariadb_servers.active_connections
      metadata_path: metadata.csv
      prefix: azure.dbformariadb_servers
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 290
    source_type_name: Azure DB para MariaDB
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
git_integration_title: azure_db_for_mariadb
integration_id: azure-dbformariadb
integration_title: Azure DB para MariaDB
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_db_for_mariadb
public_title: Azure DB para MariaDB
short_description: Rastrea las métricas principales de Azure DB for MariaDB.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Azure
  - Categoría::Nube
  - Categoría::Almacenes de datos
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Rastrea las métricas principales de Azure DB for MariaDB.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Azure DB para MariaDB
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Database for MariaDB proporciona una base de datos como servicio MariaDB comunitaria, totalmente gestionada y preparada para empresas.

Obtén métricas de Azure Database for MariaDB para:

- Visualizar el rendimiento de tus bases de datos MariaDB
- Correlacionar el rendimiento de tus bases de datos MariaDB con tus aplicaciones

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_db_for_mariadb" >}}


### Eventos

La integración Azure Database for MariaDB no incluye eventos.

### Checks de servicio

La integración Azure Database for MariaDB no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_mariadb/azure_db_for_mariadb_metadata.csv
[3]: https://docs.datadoghq.com/es/help/