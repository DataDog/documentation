---
aliases:
  - /fr/integrations/azure_cognitiveservices
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés Azure Cognitive Services.
doc_link: 'https://docs.datadoghq.com/integrations/azure_cognitive_services/'
draft: false
git_integration_title: azure_cognitive_services
has_logo: true
integration_id: azure-cognitiveservices
integration_title: Microsoft Azure Cognitive Services
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_cognitive_services
public_title: Intégration Datadog/Microsoft Azure Cognitive Services
short_description: Surveillez des métriques clés Azure Cognitive Services.
version: '1.0'
---
## Présentation

Azure Cognitive Services proposent des API, des kits de développement et des services conçus pour aider les développeurs à créer des applications intelligentes sans disposer directement de l'intelligence artificielle ni de connaissances ou compétences en science des données.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques d'Azure Cognitive Services.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_cognitive_services" >}}


### Événements

L'intégration Azure Cognitive Services n'inclut aucun événement.

### Checks de service

L'intégration Azure Cognitive Services n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cognitive_services/azure_cognitive_services_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/