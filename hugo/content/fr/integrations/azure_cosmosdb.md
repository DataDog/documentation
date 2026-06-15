---
app_id: azure-cosmosdb
app_uuid: 57c2e89b-5ad8-4bef-8012-96087b66b6bb
assets:
  dashboards:
    azure_cosmosdb: assets/dashboards/azure_cosmosdb.json
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
- cloud
- data stores
custom_kind: integration
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
short_description: Suivre les indicateurs clés d'Azure CosmosDB.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Suivre les indicateurs clés d'Azure CosmosDB.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/azure-cosmos-db-integrated-cache-datadog/
  support: README.md#Support
  title: Azure CosmosDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure Cosmos DB est un service de base de données multi-modèle distribué dans le monde entier qui prend en charge les bases de données clé-valeur, de documents, en colonnes et graphiques.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques de Cosmos DB.

## Configuration

### Installation

Si vous ne l'avez pas encore fait, configurez l'[intégration Microsoft Azure][1]. Aucune étape supplémentaire n'est nécessaire.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure-cosmosdb" >}}


### Événements

L'intégration Azure Cosmos DB n'inclut aucun événement.

### Checks de service

L'intégration Azure Cosmos DB n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cosmosdb/azure_cosmosdb_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/