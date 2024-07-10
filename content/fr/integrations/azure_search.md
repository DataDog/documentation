---
categories:
- cloud
- azure
dependencies: []
description: Surveillez des métriques clés d'Azure Cognitive Search.
doc_link: https://docs.datadoghq.com/integrations/azure_search/
draft: false
git_integration_title: azure_search
has_logo: true
integration_id: azure-search
integration_title: Microsoft Azure Cognitive Search
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_search
public_title: Intégration Datadog/Microsoft Azure Cognitive Search
short_description: Surveillez des métriques clés d'Azure Cognitive Search.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure Cognitive Search est une solution cloud de recherche en tant que service, qui offre aux développeurs des API et des outils permettant d'ajouter une expérience de recherche riche concernant du contenu privé et hétérogène dans les applications web, mobiles et d'entreprise.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure Cognitive Search.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_search" >}}


### Aide

L'intégration Azure Cognitive Search n'inclut aucun événement.

### Aide

L'intégration Azure Cognitive Search n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_search/azure_search_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/