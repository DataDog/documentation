---
aliases:
- /fr/integrations/azure_cognitiveservices
categories:
- cloud
- azure
dependencies: []
description: Surveillez des métriques clés Azure Cognitive Services.
doc_link: https://docs.datadoghq.com/integrations/azure_cognitive_services/
draft: false
git_integration_title: azure_cognitive_services
has_logo: true
integration_id: azure-cognitiveservices
integration_title: Microsoft Azure Cognitive Services
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_cognitive_services
public_title: Intégration Datadog/Microsoft Azure Cognitive Services
short_description: Surveillez des métriques clés Azure Cognitive Services.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure Cognitive Services proposent des API, des kits de développement et des services conçus pour aider les développeurs à créer des applications intelligentes sans disposer directement de l'intelligence artificielle ni de connaissances ou compétences en science des données.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques d'Azure Cognitive Services.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_cognitive_services" >}}


### Aide

L'intégration Azure Cognitive Services n'inclut aucun événement.

### Aide

L'intégration Azure Cognitive Services n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cognitive_services/azure_cognitive_services_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/