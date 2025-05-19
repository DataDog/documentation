---
categories:
- azure
- cloud
- data stores
custom_kind: integration
dependencies: []
description: Surveillez des métriques clés d'Azure Cosmos DB.
doc_link: https://docs.datadoghq.com/integrations/azure_cosmosdb/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-cosmos-db-integrated-cache-datadog/
  tag: Blog
  text: Surveiller le cache intégré Azure Cosmos DB avec Datadog
git_integration_title: azure_cosmosdb
has_logo: true
integration_id: azure-cosmosdb
integration_title: Microsoft Azure Cosmos DB
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_cosmosdb
public_title: Intégration Datadog/Microsoft Azure Cosmos DB
short_description: Surveillez des métriques clés d'Azure Cosmos DB.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Section Overview

Azure Cosmos DB est un service de base de données multi-modèle distribué dans le monde entier qui prend en charge les bases de données clé-valeur, de documents, en colonnes et graphiques.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques de Cosmos DB.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_cosmosdb" >}}


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