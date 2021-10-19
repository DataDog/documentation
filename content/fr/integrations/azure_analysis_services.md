---
aliases:
  - /fr/integrations/azure_analysisservices
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Azure Analysis Services.
doc_link: 'https://docs.datadoghq.com/integrations/azure_analysis_services/'
draft: false
git_integration_title: azure_analysis_services
has_logo: true
integration_id: azure-analysisservices
integration_title: Microsoft Azure Analysis Services
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_analysis_services
public_title: Intégration Datadog/Microsoft Azure Analysis Services
short_description: Surveillez des métriques clés d'Azure Analysis Services.
version: '1.0'
---
## Présentation

Azure Analysis Services est une plateforme entièrement gérée en tant que service (PaaS) qui fournit des modèles de données de qualité professionnelle dans le cloud.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure Analysis Services.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_analysis_services" >}}


### Événements

L'intégration Azure Analysis Services n'inclut aucun événement.

### Checks de service

L'intégration Azure Analysis Service n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_analysis_services/azure_analysis_services_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/