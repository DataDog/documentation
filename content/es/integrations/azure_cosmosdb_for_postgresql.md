---
app_id: azure-cosmosdb-for-postgresql
app_uuid: 7eccbb2b-2d28-4540-bcd0-8a1880bfd27b
assets:
  dashboards:
    azure_cosmosdb_for_postgresql: assets/dashboards/azure_cosmosdb_for_postgresql.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.dbforpostgresql_servergroupsv2.storage_used
      metadata_path: metadata.csv
      prefix: azure.dbforpostgresql_servergroupsv2
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 353
    source_type_name: Azure CosmosDB para PostgreSQL
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
git_integration_title: azure_cosmosdb_for_postgresql
integration_id: azure-cosmosdb-for-postgresql
integration_title: Azure CosmosDB para PostgreSQL
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_cosmosdb_for_postgresql
public_title: Azure CosmosDB para PostgreSQL
short_description: Rastrea las métricas clave de Azure CosmosDB para PostgreSQL.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas clave de Azure CosmosDB para PostgreSQL.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure CosmosDB para PostgreSQL
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Cosmos DB for PostgreSQL es PostgreSQL ampliado gracias a la potencia de las "tablas distribuidas". Esto te permite crear aplicaciones relacionales altamente escalables. Comienza a crear aplicaciones en un único clúster de nodo, del mismo modo que lo harías con PostgreSQL. A medida que crecen los requisitos de escalabilidad y de rendimiento de tu aplicación, puedes escalar sin problemas a varios nodos mediante la distribución transparente de tus tablas.

Utiliza la integración Datadog Azure para recopilar métricas y logs de Azure Cosmos DB for PostgreSQL. También puedes utilizar el dashboard predefinido para obtener información inmediata.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_cosmosdb_for_postgresql" >}}


### Eventos

La integración Azure Cosmos DB for PostgreSQL no incluye eventos.

### Checks de servicio

La integración Azure Cosmos DB for PostgreSQL no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cosmosdb_for_postgresql/azure_cosmosdb_for_postgresql_metadata.csv
[3]: https://docs.datadoghq.com/es/help/