---
aliases:
- /fr/integrations/azure_apimanagement
categories:
- cloud
- azure
dependencies: []
description: Surveillez des métriques clés du service Gestion des API Azure.
doc_link: https://docs.datadoghq.com/integrations/azure_api_management/
draft: false
git_integration_title: azure_api_management
has_logo: true
integration_id: azure-apimanagement
integration_title: Gestion des API de Microsoft Azure
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_api_management
public_title: Intégration Datadog/Gestion des API de Microsoft Azure
short_description: Surveillez des métriques clés du service Gestion des API Azure.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Le service Gestion des API Azure est un service entièrement géré qui permet aux clients de publier, sécuriser, transformer, gérer et surveiller leurs API.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques du service Gestion des API Azure.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_api_management" >}}


### Aide

L'intégration Gestion des API Azure n'inclut aucun événement.

### Aide

L'intégration Gestion des API Azure n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_api_management/azure_api_management_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/