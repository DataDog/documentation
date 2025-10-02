---
app_id: azure-cosmosdb
app_uuid: 57c2e89b-5ad8-4bef-8012-96087b66b6bb
assets:
  dashboards:
    azure_cosmosdb: assets/dashboard/azure_cosmosdb.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.cosmosdb.data_usage
      metadata_path: metadata.csv
      prefix: azur.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 285
    source_type_name: Azure CosmosDB
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
git_integration_title: azure_cosmosdb
integration_id: azure-cosmosdb
integration_title: Azure CosmosDB
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_cosmosdb
public_title: Azure CosmosDB
short_description: Realice un seguimiento de las métricas clave de Azure CosmosDB.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Realice un seguimiento de las métricas clave de Azure CosmosDB.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/azure-cosmos-db-integrated-cache-datadog/
  support: README.md#Support
  title: Azure CosmosDB
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Cosmos DB es un servicio de base de datos multimodelo distribuido globalmente que admite bases de datos de documentos, clave-valor, columnas anchas y gráficos.

Utiliza la integración de Azure con Datadog para recopilar métricas de Cosmos DB.

## Configuración

### Instalación

Si aún no lo ha hecho, configure [Microsoft Azure integración][1]. No se requieren pasos adicionales.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-cosmosdb" >}}


### Eventos

La integración Azure Cosmos DB no incluye ningún evento.

### Checks de servicio

La integración de Azure Cosmos DB no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cosmosdb/azure_cosmosdb_metadata.csv
[3]: https://docs.datadoghq.com/es/help/