---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Azure\_Cosmos\_DB."
doc_link: 'https://docs.datadoghq.com/integrations/azure_cosmosdb/'
draft: false
git_integration_title: azure_cosmosdb
has_logo: true
integration_id: azure-cosmosdb
integration_title: "Microsoft\_Azure\_Cosmos\_DB"
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_cosmosdb
public_title: "Intégration Datadog/Microsoft\_Azure\_Cosmos\_DB"
short_description: "Surveillez des métriques clés d'Azure\_Cosmos\_DB."
version: '1.0'
---
## Présentation

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

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cosmosdb/azure_cosmosdb_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/