---
aliases:
  - /fr/integrations/azure_loadbalancer
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Azure Load Balancer.
doc_link: https://docs.datadoghq.com/integrations/azure_load_balancer/
draft: false
git_integration_title: azure_load_balancer
has_logo: true
integration_id: azure-load-balancer
integration_title: Microsoft Azure Load Balancer
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_load_balancer
public_title: Intégration Datadog/Microsoft Azure Load Balancer
short_description: Surveillez des métriques clés d'Azure Load Balancer.
version: '1.0'
---
## Présentation

Azure Load Balancer prend en charge les scénarios entrants et sortants, offre une latence faible et un débit élevé, et peut augmenter l'échelle jusqu'à des millions de flux pour toutes les applications TCP et UDP.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure Load Balancer.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_load_balancer" >}}


### Événements

L'intégration Azure Load Balancer n'inclut aucun événement.

### Checks de service

L'intégration Azure Load Balancer n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_load_balancer/azure_load_balancer_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/