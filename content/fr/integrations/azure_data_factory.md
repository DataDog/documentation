---
aliases:
  - /fr/integrations/azure_datafactory
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Azure Data Factory.
doc_link: https://docs.datadoghq.com/integrations/azure_data_factory/
draft: false
git_integration_title: azure_data_factory
has_logo: true
integration_id: azure-datafactory
integration_title: Microsoft Azure Data Factory
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_data_factory
public_title: Intégration Datadog/Microsoft Azure Data Factory
short_description: Surveillez des métriques Azure Data Factory.
version: '1.0'
---
## Présentation

Azure Data Factory est un service d'intégration des données cloud, pour composer des services de stockage, de déplacement et de traitement des données au sein de pipelines de données automatisés.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques de Data Factory.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_data_factory" >}}


### Événements

L'intégration Azure Data Factory n'inclut aucun événement.

### Checks de service

L'intégration Azure Data Factory n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_factory/azure_data_factory_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/