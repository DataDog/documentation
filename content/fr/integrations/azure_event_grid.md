---
aliases:
  - /fr/integrations/azure_eventgrid
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez les métriques clés d'Azure Event Grid.
doc_link: 'https://docs.datadoghq.com/integrations/azure_event_grid/'
draft: false
git_integration_title: azure_event_grid
has_logo: true
integration_id: azure-eventgrid
integration_title: Microsoft Azure Event Grid
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_event_grid
public_title: Intégration Datadog/Microsoft Azure Event Grid
short_description: Surveillez les métriques clés d'Azure Event Grid.
version: '1.0'
---
## Présentation

Azure Event Grid est un service intelligent entièrement géré pour le routage des événements qui permet une consommation d'événements uniforme à l'aide d'un modèle de publication et d'abonnement.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques d'Azure Event Grid.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_event_grid" >}}


### Événements

L'intégration Azure Event Grid n'inclut aucun événement.

### Checks de service

L'intégration Azure Event Grid n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_event_grid/azure_event_grid_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/